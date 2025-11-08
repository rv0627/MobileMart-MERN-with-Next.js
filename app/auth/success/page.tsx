"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../(component)/AuthProvider";

export default function AuthSuccess() {
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const userId = params.get("userId");

    if (token) {
      try {
        localStorage.setItem("mm_token", token);
        const userObj = {
          name: name || "",
          email: email || "",
          userId: userId || "",
        };
        localStorage.setItem("mm_user", JSON.stringify(userObj));
        try {
          setUser(userObj);
        } catch (err) {
          /* ignore if context not available */
        }
      } catch (err) {
        console.error("Failed to save token/user to localStorage", err);
      }
    }

    // Navigate to home after storing token
    router.replace("/");
  }, [router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Signing you in...</h2>
        <p className="mt-4">You will be redirected to the home page shortly.</p>
      </div>
    </div>
  );
}