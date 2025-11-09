"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SuccessPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get session_id from URL on client side only
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('session_id');
      setSessionId(id);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      // Optional: Verify payment on backend
      axios
        .post('http://localhost:3001/api/checkout/verify-session', { sessionId })
        .then(() => {
          // Clear cart
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
        })
        .catch(console.error);
    }
  }, [sessionId]);

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-gray-700">Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700">Thank you for your purchase.</p>
        <button
          onClick={() => router.push('/products')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          suppressHydrationWarning
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}