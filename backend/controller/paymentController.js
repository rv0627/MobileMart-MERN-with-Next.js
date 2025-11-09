const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const mongoose = require("mongoose");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { cartItems, success_url, cancel_url } = req.body;

        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'lkr',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Store cart items in metadata for stock update and order creation after payment
        const metadata = {
            cartItems: JSON.stringify(cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || ''
            })))
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
            metadata: metadata,
        });

        res.json({sessionId: session.id, url: session.url});

    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const verifySession = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Check if order already exists to prevent duplicate orders
            const existingOrder = await Order.findOne({ stripeSessionId: session.id });
            
            if (!existingOrder) {
                // Update stock quantities and save order details
                try {
                    if (session.metadata && session.metadata.cartItems) {
                        const cartItems = JSON.parse(session.metadata.cartItems);
                        
                        // Calculate total amount
                        const totalAmount = cartItems.reduce((sum, item) => {
                            return sum + (item.price * item.quantity);
                        }, 0);
                        
                        // Update stock for each product and prepare order items
                        const orderItems = [];
                        for (const item of cartItems) {
                            const product = await Product.findOne({ productId: item.productId });
                            
                            if (product) {
                                // Decrease stock by purchased quantity
                                const newStock = Math.max(0, product.stock - item.quantity);
                                await Product.updateOne(
                                    { productId: item.productId },
                                    { $set: { stock: newStock } }
                                );
                                console.log(`Updated stock for product ${item.productId}: ${product.stock} -> ${newStock}`);
                                
                                // Add to order items
                                orderItems.push({
                                    productId: item.productId,
                                    name: item.name || product.name,
                                    price: item.price || product.price,
                                    quantity: item.quantity,
                                    image: item.image || product.image || ''
                                });
                            } else {
                                console.warn(`Product with productId ${item.productId} not found`);
                                // Still add to order items even if product not found
                                orderItems.push({
                                    productId: item.productId,
                                    name: item.name || 'Unknown Product',
                                    price: item.price || 0,
                                    quantity: item.quantity,
                                    image: item.image || ''
                                });
                            }
                        }
                        
                        // Create order record
                        const order = new Order({
                            orderId: `ORD-${Date.now()}-${session.id.substring(0, 8)}`,
                            stripeSessionId: session.id,
                            items: orderItems,
                            totalAmount: totalAmount,
                            currency: session.currency || 'usd',
                            paymentStatus: session.payment_status,
                            customerEmail: session.customer_details?.email || null,
                            customerName: session.customer_details?.name || null,
                        });
                        
                        await order.save();
                        console.log(`Order saved: ${order.orderId}`);
                    }
                } catch (orderError) {
                    console.error("Error saving order or updating stock:", orderError);
                    // Don't fail the verification if order save fails
                }
            } else {
                console.log(`Order already exists for session ${session.id}`);
            }

            res.json({ 
                verified: true, 
                sessionId: session.id,
                paymentStatus: session.payment_status 
            });
        } else {
            res.status(400).json({ 
                verified: false, 
                paymentStatus: session.payment_status 
            });
        }
    } catch (error) {
        console.error("Error verifying session:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createPaymentIntent,
    verifySession,
};