import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import styles from "../login.module.css";

export default function SignUp() {
  return (
    <main className={styles.bgImage}>
      <div className="flex items-center justify-center min-h-screen px-4 py-2 font-sans text-gray-700">
        <div className="w-full max-w-2xl">
          <div className="bg-blue-200/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg">
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-black text-center mb-6">
              Join With Us...
            </h1>
            <form className="mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Mobile</label>
                  <input
                    type="tel"
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid-flow-row">
                  <label className="block font-medium mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="grid-flow-row flex justify-center">
                  <button
                    className="hoverEffect cursor-pointer bg-blue-800 p-3 w-100 rounded-full font-sans text-white"
                    style={{ fontSize: "18px" }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="grid-flow-row flex justify-center">
                  <span>
                    Do you have an account?
                    <Link href="/signIn"> Sign In</Link>
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <div className="grid-flow-row flex justify-center">
                  <span className="text-black" style={{ fontSize: "18px" }}>
                    or
                  </span>
                </div>
              </div>

              <div className="grid-cols-12 mt-3">
                <div className="grid-flow-row flex justify-center">
                  <button
                    className="hoverEffect cursor-pointer bg-white p-3 w-100 gap-3 rounded-full font-sans flex items-center justify-center"
                    style={{ fontSize: "18px" }}
                  >
                    <FcGoogle size={24} />
                    <span className="text-gray-700">Sign up with Google</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
