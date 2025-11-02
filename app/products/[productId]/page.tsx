'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FiShoppingCart, FiPlus, FiMinus, FiArrowLeft, FiCheck, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  brand: string;
  specifications?: {
    display?: string;
    storage?: string;
    camera?: string;
    battery?: string;
    processor?: string;
    ram?: string;
  };
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 999,
    rating: 4.8,
    image: '/products/iphone14pro.jpg',
    description: '6.1-inch Super Retina XDR display',
    brand: 'Apple',
    specifications: {
      display: '6.1-inch Super Retina XDR',
      storage: '128GB / 256GB / 512GB / 1TB',
      camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      battery: 'Up to 23 hours video playback',
      processor: 'A16 Bionic chip',
      ram: '6GB',
    },
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 899,
    rating: 4.7,
    image: '/products/galaxys23.jpg',
    description: '6.8-inch Dynamic AMOLED display',
    brand: 'Samsung',
    specifications: {
      display: '6.8-inch Dynamic AMOLED 2X',
      storage: '256GB / 512GB',
      camera: '200MP Main, 10MP Telephoto, 12MP Ultra Wide',
      battery: '5000mAh, 45W fast charging',
      processor: 'Snapdragon 8 Gen 2',
      ram: '8GB / 12GB',
    },
  },
  {
    id: 3,
    name: 'Google Pixel 7',
    price: 599,
    rating: 4.6,
    image: '/products/pixel7.jpg',
    description: '6.3-inch OLED display',
    brand: 'Google',
    specifications: {
      display: '6.3-inch OLED',
      storage: '128GB / 256GB',
      camera: '50MP Main, 12MP Ultra Wide',
      battery: '4355mAh, 20W fast charging',
      processor: 'Google Tensor G2',
      ram: '8GB',
    },
  },
  {
    id: 4,
    name: 'OnePlus 11',
    price: 699,
    rating: 4.5,
    image: '/products/oneplus11.jpg',
    description: '6.7-inch AMOLED display',
    brand: 'OnePlus',
    specifications: {
      display: '6.7-inch Fluid AMOLED',
      storage: '128GB / 256GB',
      camera: '50MP Main, 48MP Ultra Wide, 32MP Portrait',
      battery: '5000mAh, 100W SuperVOOC',
      processor: 'Snapdragon 8 Gen 2',
      ram: '8GB / 16GB',
    },
  },
  {
    id: 5,
    name: 'iPhone 13',
    price: 799,
    rating: 4.7,
    image: '/products/iphone14pro.jpg',
    description: '6.1-inch Liquid Retina display',
    brand: 'Apple',
    specifications: {
      display: '6.1-inch Liquid Retina',
      storage: '128GB / 256GB / 512GB',
      camera: '12MP Dual Camera System',
      battery: 'Up to 19 hours video playback',
      processor: 'A15 Bionic chip',
      ram: '4GB',
    },
  },
  {
    id: 6,
    name: 'Samsung Galaxy A54',
    price: 499,
    rating: 4.4,
    image: '/products/galaxys23.jpg',
    description: '6.4-inch Super AMOLED display',
    brand: 'Samsung',
    specifications: {
      display: '6.4-inch Super AMOLED',
      storage: '128GB / 256GB',
      camera: '50MP Main, 12MP Ultra Wide, 5MP Macro',
      battery: '5000mAh, 25W fast charging',
      processor: 'Exynos 1380',
      ram: '6GB / 8GB',
    },
  },
  {
    id: 7,
    name: 'Google Pixel 6a',
    price: 449,
    rating: 4.5,
    image: '/products/pixel7.jpg',
    description: '6.1-inch OLED display',
    brand: 'Google',
    specifications: {
      display: '6.1-inch OLED',
      storage: '128GB',
      camera: '12.2MP Main, 12MP Ultra Wide',
      battery: '4410mAh, 18W fast charging',
      processor: 'Google Tensor',
      ram: '6GB',
    },
  },
  {
    id: 8,
    name: 'OnePlus Nord 2T',
    price: 399,
    rating: 4.3,
    image: '/products/oneplus11.jpg',
    description: '6.43-inch AMOLED display',
    brand: 'OnePlus',
    specifications: {
      display: '6.43-inch Fluid AMOLED',
      storage: '128GB / 256GB',
      camera: '50MP Main, 8MP Ultra Wide, 2MP Macro',
      battery: '4500mAh, 80W SuperVOOC',
      processor: 'MediaTek Dimensity 1300',
      ram: '8GB / 12GB',
    },
  },
  {
    id: 9,
    name: 'iPhone 12',
    price: 649,
    rating: 4.6,
    image: '/products/iphone14pro.jpg',
    description: '6.1-inch Super Retina XDR display',
    brand: 'Apple',
    specifications: {
      display: '6.1-inch Super Retina XDR',
      storage: '64GB / 128GB / 256GB',
      camera: '12MP Dual Camera System',
      battery: 'Up to 17 hours video playback',
      processor: 'A14 Bionic chip',
      ram: '4GB',
    },
  },
  {
    id: 10,
    name: 'Samsung Galaxy Note 20',
    price: 749,
    rating: 4.6,
    image: '/products/galaxys23.jpg',
    description: '6.7-inch Dynamic AMOLED display',
    brand: 'Samsung',
    specifications: {
      display: '6.7-inch Dynamic AMOLED 2X',
      storage: '256GB',
      camera: '64MP Telephoto, 12MP Main, 12MP Ultra Wide',
      battery: '4300mAh, 25W fast charging',
      processor: 'Exynos 990',
      ram: '8GB',
    },
  },
  {
    id: 11,
    name: 'Google Pixel 5a',
    price: 399,
    rating: 4.4,
    image: '/products/pixel7.jpg',
    description: '6.34-inch OLED display',
    brand: 'Google',
    specifications: {
      display: '6.34-inch OLED',
      storage: '128GB',
      camera: '12.2MP Main, 16MP Ultra Wide',
      battery: '4680mAh, 18W fast charging',
      processor: 'Snapdragon 765G',
      ram: '6GB',
    },
  },
  {
    id: 12,
    name: 'OnePlus 9 Pro',
    price: 799,
    rating: 4.7,
    image: '/products/oneplus11.jpg',
    description: '6.7-inch Fluid AMOLED display',
    brand: 'OnePlus',
    specifications: {
      display: '6.7-inch Fluid AMOLED',
      storage: '128GB / 256GB',
      camera: '48MP Main, 50MP Ultra Wide, 8MP Telephoto',
      battery: '4500mAh, 65W Warp Charge',
      processor: 'Snapdragon 888',
      ram: '8GB / 12GB',
    },
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.productId as string);
  
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = allProducts.find(p => p.id === productId);

  // Load cart from localStorage (client-side only)
  useEffect(() => {
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

  // Save cart to localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cart.length > 0 || localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }, [cart]);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
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
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id: product.id, quantity }];
    });
  };

  const cartQuantity = cart.find(item => item.id === product.id)?.quantity || 0;
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
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
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
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
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
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Brand & Name */}
              <div className="mb-4">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {product.brand}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <span className="ml-1 text-lg font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">(Based on 128 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
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
                  <span>In Stock</span>
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
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
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
                  {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'} in cart
                </div>
              )}

              {/* Buy Now Button */}
              <button
                onClick={() => router.push('/cart')}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <div className="bg-white rounded-lg shadow-md p-6 lg:p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specifications.display && (
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Display</h3>
                  <p className="text-lg text-gray-900">{product.specifications.display}</p>
                </div>
              )}
              {product.specifications.processor && (
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Processor</h3>
                  <p className="text-lg text-gray-900">{product.specifications.processor}</p>
                </div>
              )}
              {product.specifications.ram && (
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">RAM</h3>
                  <p className="text-lg text-gray-900">{product.specifications.ram}</p>
                </div>
              )}
              {product.specifications.storage && (
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Storage</h3>
                  <p className="text-lg text-gray-900">{product.specifications.storage}</p>
                </div>
              )}
              {product.specifications.camera && (
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Camera</h3>
                  <p className="text-lg text-gray-900">{product.specifications.camera}</p>
                </div>
              )}
              {product.specifications.battery && (
                <div className="border-b pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Battery</h3>
                  <p className="text-lg text-gray-900">{product.specifications.battery}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts
              .filter(p => p.brand === product.brand && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                      {relatedProduct.brand}
                    </span>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        Rs. {relatedProduct.price.toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 w-4 h-4" />
                        <span className="ml-1 text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

