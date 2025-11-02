'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  brand: string;
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
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 899,
    rating: 4.7,
    image: '/products/galaxys23.jpg',
    description: '6.8-inch Dynamic AMOLED display',
    brand: 'Samsung',
  },
  {
    id: 3,
    name: 'Google Pixel 7',
    price: 599,
    rating: 4.6,
    image: '/products/pixel7.jpg',
    description: '6.3-inch OLED display',
    brand: 'Google',
  },
  {
    id: 4,
    name: 'OnePlus 11',
    price: 699,
    rating: 4.5,
    image: '/products/oneplus11.jpg',
    description: '6.7-inch AMOLED display',
    brand: 'OnePlus',
  },
  {
    id: 5,
    name: 'iPhone 13',
    price: 799,
    rating: 4.7,
    image: '/products/iphone14pro.jpg',
    description: '6.1-inch Liquid Retina display',
    brand: 'Apple',
  },
  {
    id: 6,
    name: 'Samsung Galaxy A54',
    price: 499,
    rating: 4.4,
    image: '/products/galaxys23.jpg',
    description: '6.4-inch Super AMOLED display',
    brand: 'Samsung',
  },
  {
    id: 7,
    name: 'Google Pixel 6a',
    price: 449,
    rating: 4.5,
    image: '/products/pixel7.jpg',
    description: '6.1-inch OLED display',
    brand: 'Google',
  },
  {
    id: 8,
    name: 'OnePlus Nord 2T',
    price: 399,
    rating: 4.3,
    image: '/products/oneplus11.jpg',
    description: '6.43-inch AMOLED display',
    brand: 'OnePlus',
  },
  {
    id: 9,
    name: 'iPhone 12',
    price: 649,
    rating: 4.6,
    image: '/products/iphone14pro.jpg',
    description: '6.1-inch Super Retina XDR display',
    brand: 'Apple',
  },
  {
    id: 10,
    name: 'Samsung Galaxy Note 20',
    price: 749,
    rating: 4.6,
    image: '/products/galaxys23.jpg',
    description: '6.7-inch Dynamic AMOLED display',
    brand: 'Samsung',
  },
  {
    id: 11,
    name: 'Google Pixel 5a',
    price: 399,
    rating: 4.4,
    image: '/products/pixel7.jpg',
    description: '6.34-inch OLED display',
    brand: 'Google',
  },
  {
    id: 12,
    name: 'OnePlus 9 Pro',
    price: 799,
    rating: 4.7,
    image: '/products/oneplus11.jpg',
    description: '6.7-inch Fluid AMOLED display',
    brand: 'OnePlus',
  },
];

export default function ProductsPage() {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'name'>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load cart from localStorage on mount (client-side only)
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

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cart.length > 0 || localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }, [cart]);

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

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(allProducts.map(p => p.brand)));
    return uniqueBrands;
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      
      return matchesSearch && matchesPrice && matchesBrand;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, priceRange, selectedBrand]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Browse our complete collection of mobile devices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as typeof sortBy);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating: Highest</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => {
                    setPriceRange([priceRange[0], parseInt(e.target.value)]);
                    setCurrentPage(1);
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <Link href={`/products/${product.id}`} className="relative h-48 w-full bg-gray-100 block">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                        {product.brand}
                      </span>
                    </div>
                    <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                      <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-900">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 w-4 h-4" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                    {cart.find(item => item.id === product.id) && (
                      <div className="mt-2 text-sm text-green-600 text-center">
                        {cart.find(item => item.id === product.id)?.quantity} in cart
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mb-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-300'
                  } transition-colors duration-200`}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-300'
                  } transition-colors duration-200`}
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">No products found</p>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setPriceRange([0, 1500]);
                setSelectedBrand('all');
                setCurrentPage(1);
              }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

