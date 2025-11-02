'use client';

import  { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiArrowLeft } from 'react-icons/fi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

const products = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 999,
    rating: 4.8,
    image: '/products/iphone14pro.jpg',
    description: '6.1-inch Super Retina XDR display',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 899,
    rating: 4.7,
    image: '/products/galaxys23.jpg',
    description: '6.8-inch Dynamic AMOLED display',
  },
  {
    id: 3,
    name: 'Google Pixel 7',
    price: 599,
    rating: 4.6,
    image: '/products/pixel7.jpg',
    description: '6.3-inch OLED display',
  },
  {
    id: 4,
    name: 'OnePlus 11',
    price: 699,
    rating: 4.5,
    image: '/products/oneplus11.jpg',
    description: '6.7-inch AMOLED display',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          const itemsWithDetails: CartItem[] = cartData
            .map((item: { id: number; quantity: number }) => {
              const product = products.find((p) => p.id === item.id);
              if (product) {
                return {
                  ...product,
                  quantity: item.quantity,
                };
              }
              return null;
            })
            .filter((item: CartItem | null) => item !== null);
          setCartItems(itemsWithDetails);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    // Save to localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const cartToSave = updatedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
      localStorage.setItem('cart', JSON.stringify(cartToSave));
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    updateCart(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCart(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.13; // 13% tax
  const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 50) : 0;
  const total = subtotal + tax + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition"
          >
            <FiArrowLeft className="mr-2" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiShoppingCart className="mx-auto text-gray-400 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start adding products to see them here</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="relative w-full sm:w-48 h-48 sm:h-48 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">
                            Rs. {item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-6 flex items-center justify-between border-t pt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold text-gray-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-200"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="mt-4 text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (13%)</span>
                    <span>Rs. {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        `Rs. ${shipping}`
                      )}
                    </span>
                  </div>
                  {subtotal < 500 && subtotal > 0 && (
                    <p className="text-sm text-gray-500">
                      Add Rs. {(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      Rs. {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 mb-4"
                  onClick={() => alert('Checkout functionality coming soon!')}
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/"
                  className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2 transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}