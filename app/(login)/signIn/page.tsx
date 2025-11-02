import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import styles from "../login.module.css";
import { FormEvent } from "react";

export default function SignIn() {
  
  return (
    <main className={styles.bgImage}>
      <div className="flex items-center justify-center min-h-screen px-4 py-2 font-sans text-gray-700">
        <div className="w-full max-w-md">
          <div className="bg-blue-200/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg">
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-black text-center mb-6">
              Welcome Back
            </h1>
            <form className="mt-4 sm:mt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block font-medium mb-2">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-900 p-3 rounded-full font-sans text-white text-lg transition-colors duration-200 ease-in-out cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>

                <div className="text-center mt-4">
                  <span className="text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signUp" className="text-blue-800 hover:text-blue-900 font-medium">
                      Sign Up
                    </Link>
                  </span>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-400"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-blue-200/90 px-4 text-gray-600 text-lg">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-white hover:bg-gray-50 p-3 rounded-full font-sans flex items-center justify-center gap-3 transition-colors duration-200 ease-in-out border border-gray-300"
                >
                  <FcGoogle size={24} />
                  <span className="text-gray-700 text-lg">Sign in with Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
