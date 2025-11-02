'use client';

import React from 'react';
import Image from 'next/image';
import { FiAward, FiUsers, FiTarget, FiHeart, FiTrendingUp, FiShield } from 'react-icons/fi';

export default function AboutPage() {
  const features = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: 'Quality Products',
      description: 'We source only the finest mobile devices from trusted manufacturers worldwide.',
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Our knowledgeable team is always ready to help you find the perfect device.',
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and discounts on premium products.',
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond for our customers.',
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Latest Technology',
      description: 'Stay ahead with the newest releases and cutting-edge mobile technology.',
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Warranty & Support',
      description: 'Comprehensive warranty coverage and dedicated customer support service.',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products Available' },
    { number: '15+', label: 'Years of Experience' },
    { number: '24/7', label: 'Customer Support' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Mobile Mart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted destination for premium mobile devices and exceptional shopping experience
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2010, Mobile Mart has grown from a small local store into one of the
                  leading mobile device retailers in the region. We started with a simple mission:
                  to provide customers with access to the latest mobile technology at affordable prices.
                </p>
                <p>
                  Over the years, we've built strong relationships with major manufacturers and
                  distributors, allowing us to offer an extensive selection of smartphones, tablets,
                  and accessories from top brands like Apple, Samsung, Google, and OnePlus.
                </p>
                <p>
                  Today, Mobile Mart serves thousands of satisfied customers both online and in-store,
                  maintaining our commitment to quality, service, and value that has defined us
                  since day one.
                </p>
              </div>
            </div>
            <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/abstract-blur-shopping-mall.jpg"
                alt="Mobile Mart Store"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FiTarget className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To democratize access to cutting-edge mobile technology by offering premium devices
              at competitive prices, backed by exceptional customer service and support. We strive
              to make the latest technology accessible to everyone while maintaining the highest
              standards of quality and reliability.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FiTrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted and innovative mobile technology retailer, recognized for
              our commitment to customer satisfaction, product quality, and industry-leading service.
              We envision a future where every customer finds their perfect mobile device effortlessly
              through our platform.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 rounded-lg shadow-md p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-8 lg:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We conduct our business with honesty, transparency, and ethical practices in
                  everything we do.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously evolve to bring you the latest technology and improve your
                  shopping experience.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in product quality, customer service, and every
                  interaction we have.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Focus</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. Your satisfaction is our
                  ultimate goal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop with Us?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Explore our extensive collection of premium mobile devices and find your perfect match
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Products
            </a>
            <a
              href="/contact"
              className="bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

