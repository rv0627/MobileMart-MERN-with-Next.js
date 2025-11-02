'use client';

import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: 'tel:+15551234567',
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      details: ['support@mobilemart.com', 'sales@mobilemart.com'],
      link: 'mailto:support@mobilemart.com',
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Address',
      details: ['123 Tech Street', 'Digital City, DC 12345', 'United States'],
      link: '#',
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Sat - Sun: 10:00 AM - 6:00 PM'],
      link: '#',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon
            as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <FiMessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="order">Order Status</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    suppressHydrationWarning
                  >
                    <FiSend className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
              </form>
            )}
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FiMapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">123 Tech Street, Digital City</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
              <p className="text-gray-600 mb-6">
                Stay connected with us on social media for the latest updates, deals, and tech news.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h3>
              <div className="space-y-4">
                <a href="/faq" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Frequently Asked Questions
                </a>
                <a href="/shipping" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Shipping Information
                </a>
                <a href="/returns" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Returns & Refunds
                </a>
                <a href="/privacy" className="block text-blue-600 hover:text-blue-700 transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

