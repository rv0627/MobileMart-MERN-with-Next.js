'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

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
  // Add more products as needed
];

export default function Home() {
  const images = [
    '/carousel/c1.webp',
    '/carousel/c2.jpg',
    '/carousel/c3.webp',
    // add more images if you have them
  ];

  const [current, setCurrent] = useState(0);
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cartData = JSON.parse(savedCart);
          setCart(cartData);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      if (cart.length > 0 || localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }, [cart, mounted]);

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  useEffect(() => {
    // autoplay (client-side only)
    if (typeof window !== 'undefined') {
      intervalRef.current = window.setInterval(() => {
        setCurrent((p) => (p + 1) % images.length);
      }, 3000);

      return () => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      };
    }
  }, [images.length]);

  // touch handling for swipe on mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const dx = touchStartX.current - touchEndX.current;
    if (Math.abs(dx) > 50) {
      // swipe left -> next
      if (dx > 0) setCurrent((p) => (p + 1) % images.length);
      // swipe right -> prev
      else setCurrent((p) => (p - 1 + images.length) % images.length);
      // reset autoplay timer
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          setCurrent((p) => (p + 1) % images.length);
        }, 3000);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Carousel */}
      <div
        className="relative w-full mb-8 overflow-hidden rounded-lg h-[220px] sm:h-[300px] md:h-[420px] lg:h-[520px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            priority={i === 0}
            className={`object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Prev/Next buttons (visible on sm+) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 sm:px-6">
          <button
            type="button"
            onClick={() => {
              setCurrent((p) => (p - 1 + images.length) % images.length);
              if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
              }
            }}
            className="pointer-events-auto hidden sm:inline-flex items-center justify-center bg-black/30 text-white p-2 rounded-full"
            aria-label="Previous slide"
            suppressHydrationWarning
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrent((p) => (p + 1) % images.length);
              if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
              }
            }}
            className="pointer-events-auto hidden sm:inline-flex items-center justify-center bg-black/30 text-white p-2 rounded-full"
            aria-label="Next slide"
            suppressHydrationWarning
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'bg-white w-6 h-2.5' : 'bg-white/60 w-2 h-2'
              }`}
              aria-label={`Go to slide ${i + 1}`}
              suppressHydrationWarning
            />
          ))}
        </div>
      </div>

      {/* Content below carousel */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Mobile Mart</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/signIn"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/signUp"
            className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium px-8 py-3 rounded-full transition-colors duration-200"
          >
            Sign Up
          </Link>
        </div>

        {/* Products Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/products/${product.id}`} className="relative h-48 w-full bg-gray-100 block">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {product.price}
                    </span>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 w-4 h-4" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-200"
                    suppressHydrationWarning
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  {cart.find(item => item.id === product.id) && (
                    <div className="mt-2 text-sm text-green-600">
                      {cart.find(item => item.id === product.id)?.quantity} in cart
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
