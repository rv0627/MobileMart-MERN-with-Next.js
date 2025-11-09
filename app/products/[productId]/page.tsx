"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiCheck,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import axios from "axios";

interface Product {
  id: number;
  productId: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  brand: string;
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.productId as string);

  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching all products data:", error);
      });
  }, []);

  // Load cart from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          setCart(cartData);
        } catch (error) {
          console.error("Error loading cart:", error);
        }
      }
    }
  }, []);

  // Save cart to localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (cart.length > 0 || localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }, [cart]);

  //Payment Process
  const handleBuyNow = async () => {
    const cartItem = {
      id: product?.id,
      productId: product?.productId,
      name: product?.name,
      price: product?.price,
      quantity: quantity,
      image: product?.image,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/checkout/create-session",
        {
          cartItems: [cartItem],
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/products/${productId}`,
        }
      );

      const { url } = response.data;

      if (url) {
        window.location.href = url;
      } else {
        console.error("No checkout URL received from server");
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const addToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id: product.id, quantity }];
    });
  };

  const cartQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;
  const images = [product.image, product.image, product.image]; // Using same image multiple times as placeholder

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition"
          >
            <FiArrowLeft className="mr-2" />
            <span>Back to Products</span>
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={`/uploads/${images[selectedImage]}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Images */}
              {/* <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-600 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div> */}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Brand & Name */}
              <div className="mb-4">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {product.brand}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <span className="ml-1 text-lg font-semibold text-gray-900">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-gray-500">(Based on 128 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  LKR {product.price.toLocaleString()} .00
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiTruck className="w-5 h-5 text-blue-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiShield className="w-5 h-5 text-blue-600" />
                  <span>1 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiRefreshCw className="w-5 h-5 text-blue-600" />
                  <span>7 Day Returns</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiCheck className="w-5 h-5 text-green-600" />
                  {product.stock <= 5 && product.stock >= 1 ? (
                    <span className="text-yellow-600">
                      Only {product.stock} left in stock!
                    </span>
                  ) : product.stock > 0 ? (
                    <span>In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mb-4"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              {cartQuantity > 0 && (
                <div className="text-center text-sm text-green-600 mb-4">
                  {cartQuantity} {cartQuantity === 1 ? "item" : "items"} in cart
                </div>
              )}

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.filter(
              (p) =>
                p.brand === product.brand && p.productId !== product.productId
            ).length === 0 ? (
              <p className="text-gray-500 text-lg">No related items...</p>
            ) : (
              allProducts
                .filter(
                  (p) =>
                    p.brand === product.brand &&
                    p.productId !== product.productId
                )
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.productId}
                    href={`/products/${relatedProduct.productId}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={`/uploads/${relatedProduct.image}`}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                        {relatedProduct.brand}
                      </span>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                        {relatedProduct.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          LKR {relatedProduct.price.toLocaleString()} .00
                        </span>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <span className="ml-1 text-sm text-gray-600">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
