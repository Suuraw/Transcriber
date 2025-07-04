"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Icon imports

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      localStorage.setItem("devAuth", "true");
      window.location.href = "/transcribe";
    } else {
      setError("Nope. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
      {/* Gradient blob */}
      <div
        className="absolute right-1/4 top-1/4 h-[200px] w-[200px] md:h-[400px] md:w-[400px] animate-pulse rounded-full bg-gradient-to-br from-red-400 via-pink-300 to-purple-200 opacity-70 blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-sm relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-light mb-2">DEV ACCESS</h1>
          <p className="text-sm text-gray-500">Personal use only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none w-full h-12 text-center pr-10 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-black transition-colors duration-300"
            />

            {/* Show Eye icon only when typing */}
            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-400 hover:text-black transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center animate-bounce">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full"
          >
            GET IN
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-black transition-colors duration-300"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}
