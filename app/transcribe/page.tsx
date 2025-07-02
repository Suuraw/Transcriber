"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function TranscribePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("devAuth")
    if (auth !== "true") {
      window.location.href = "/login"
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  const handleTranscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setTranscription(`TRANSCRIPTION COMPLETE

Video: ${youtubeUrl}

"Welcome to my YouTube channel! Today we're going to talk about building amazing web applications with Next.js and React. First, let's start with the basics..."

[Demo transcription - integrate with real API for actual functionality]

---
Personal tool by dev. Not for public use.`)
      setIsLoading(false)
    }, 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem("devAuth")
    window.location.href = "/"
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Link href="/" className="flex space-x-2 hover:scale-105 transition-transform duration-300">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </Link>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-sm hover:bg-black hover:text-white transition-all duration-300"
        >
          OUT
        </Button>
      </header>

      {/* Gradient blob */}
      <div
        className="absolute right-0 top-0 h-[200px] w-[200px] md:h-[300px] md:w-[300px] animate-pulse rounded-full bg-gradient-to-br from-green-400 via-blue-300 to-purple-200 opacity-70 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Content */}
      <main className="px-4 md:px-6 pt-8 md:pt-12">
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light leading-tight tracking-tight mb-8 md:mb-12 animate-fade-in">
            TRANSCRIBE
          </h1>

          {/* URL Input */}
          <div className="mb-8 md:mb-12">
            <form onSubmit={handleTranscribe} className="space-y-6">
              <Input
                type="url"
                placeholder="YouTube URL..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
                className="w-full h-12 md:h-14 text-center border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-black transition-colors duration-300 text-sm md:text-base"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 md:h-14 bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>PROCESSING...</span>
                  </div>
                ) : (
                  "TRANSCRIBE"
                )}
              </Button>
            </form>
          </div>

          {/* Transcription Output */}
          {transcription && (
            <div className="animate-fade-in">
              <h2 className="text-lg md:text-xl font-light mb-4">OUTPUT</h2>
              <Textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="min-h-[200px] md:min-h-[300px] font-mono text-xs md:text-sm border-2 border-gray-200 focus:border-black transition-colors duration-300 rounded-lg"
                placeholder="Transcription will appear here..."
              />
              <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(transcription)}
                  className="flex-1 h-10 border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  COPY
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTranscription("")}
                  className="flex-1 h-10 border-gray-300 hover:bg-gray-100 transition-all duration-300"
                >
                  CLEAR
                </Button>
              </div>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-xs text-gray-400">Personal tool. Dev use only.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
