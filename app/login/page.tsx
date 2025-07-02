"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "iamthedeveloper123") {
      localStorage.setItem("devAuth", "true")
      window.location.href = "/transcribe"
    } else {
      setError("Nope. Try again.")
    }
  }

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
          <Input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 text-center border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-black transition-colors duration-300"
          />

          {error && <p className="text-red-500 text-sm text-center animate-bounce">{error}</p>}

          <Button
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full"
          >
            GET IN
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-black transition-colors duration-300">
            ← Back
          </Link>
        </div>
      </div>
    </div>
  )
}
