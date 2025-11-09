'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { FiShoppingCart } from "react-icons/fi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-gray-300 px-4 py-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          <Image
                          src="/logo.png"
                          alt="Mobile Mart Logo"
                          width={40}
                          height={40}
                          className="mr-2"
                        />
            <span className="text-2xl md:text-3xl font-bold text-white">
              Mobile Mart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-100 transition">Home</Link>
            <Link href="/products" className="text-white hover:text-blue-100 transition">Product</Link>
            <Link href="/about" className="text-white hover:text-blue-100 transition">About</Link>
            <Link href="/contact" className="text-white hover:text-blue-100 transition">Contact Us</Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                  {user.name}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg z-20">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/addProduct"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Add Product
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signIn" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                Login
              </Link>
            )}
            <Link href='/cart'><FiShoppingCart className="w-5 h-5 text-white" /></Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-100 focus:outline-none"
              type="button"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-blue-100 transition">Home</Link>
              <Link href="/products" className="text-white hover:text-blue-100 transition">Product</Link>
              <Link href="/about" className="text-white hover:text-blue-100 transition">About</Link>
              <Link href="/contact" className="text-white hover:text-blue-100 transition">Contact Us</Link>
              {user ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-white">{user.name}</span>
                  <Link href="/profile" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block transition">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg inline-block transition text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/signIn" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg inline-block transition">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
