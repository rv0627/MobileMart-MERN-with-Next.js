"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function userLoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  type Errors = {
    email?: string;
    password?: string;
    invalid?: string;
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
    const newErrors: Errors = {};
    if (!validate()) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/userLogin",
        formData
      );
      if (res?.data) {
        const { userId, name, email } = res.data;
        try {
          localStorage.setItem(
            "mm_user",
            JSON.stringify({ userId, name, email })
          );
        } catch {}
        setUser({ userId, name, email });
      }
      router.push("/");
      setFormData({
        email: "",
        password: "",
      });
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        newErrors.invalid = "Invalid email or password";
      } else {
        console.error("Error creating user:", err);
        alert("Failed to create user. Please try again.");
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-4">
      <form className="mt-4 sm:mt-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your email"
            suppressHydrationWarning={true}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your password"
            suppressHydrationWarning={true}
          />
          {errors.password || errors.invalid ? (
            <p className="text-red-600 text-sm">
              {errors.password || errors.invalid}
            </p>
          ) : null}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 p-3 rounded-full font-sans text-white text-lg transition-colors duration-200 ease-in-out cursor-pointer"
            suppressHydrationWarning={true}
          >
            Sign In
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signUp"
              className="text-blue-800 hover:text-blue-900 font-medium"
            >
              Sign Up
            </Link>
          </span>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-blue-200/90 px-4 text-gray-600 text-lg">
              or
            </span>
          </div>
        </div>
      </form>
      <a href="http://localhost:3001/auth/google">
        <button
          type="button"
          className="cursor-pointer w-full bg-white hover:bg-gray-50 p-3 rounded-full font-sans flex items-center justify-center gap-3 transition-colors duration-200 ease-in-out border border-gray-300"
          suppressHydrationWarning={true}
        >
          <FcGoogle size={24} />
          <span className="text-gray-700 text-lg">Sign in with Google</span>
        </button>
      </a>
    </div>
  );
}
