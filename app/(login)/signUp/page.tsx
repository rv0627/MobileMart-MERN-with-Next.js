"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import styles from "../login.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  type Errors = {
    name?: string;
    mobile?: string;
    email?: string;
    password?: string;
  };

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/createuser",
        formData
      );
      router.push("/signIn");
      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
      });
    } catch (err: any) {
      if (err.response && err.status === 400) {
        alert("User already exists with this email or mobile.");
      } else {
        console.error("Error creating user:", err);
        alert("Failed to create user. Please try again.");
      }
    }
  };

  return (
    <main className={styles.bgImage}>
      <div className="flex items-center justify-center min-h-screen px-4 py-2 font-sans text-gray-700">
        <div className="w-full max-w-2xl">
          <div className="bg-blue-200/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg">
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-black text-center mb-6">
              Join With Us...
            </h1>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-2">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobile && (
                    <p className="text-red-600 text-sm">{errors.mobile}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="grid-flow-row">
                  <label className="block font-medium mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg mb-4 border border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="grid-flow-row flex justify-center">
                  <button
                    type="submit"
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

              
            </form>
            <div className="grid-cols-12 mt-3">
                <div className="grid-flow-row flex justify-center">
                  <a href="http://localhost:3001/auth/google">
                    <button
                      className="hoverEffect cursor-pointer bg-white p-3 w-100 gap-3 rounded-full font-sans flex items-center justify-center"
                      style={{ fontSize: "18px" }}
                    >
                      <FcGoogle size={24} />
                      <span className="text-gray-700">Sign up with Google</span>
                    </button>
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
}
