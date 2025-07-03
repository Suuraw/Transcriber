"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { X, Copy, Trash2, CheckCircle } from "lucide-react";

export default function TranscribePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("devAuth");
    if (auth !== "true") {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showPanel) {
        setShowPanel(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showPanel]);

  const handleTranscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(new Date().getSeconds().toLocaleString());

    try {
      const res = await fetch("http://127.0.0.1:8000/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // secure token
        },
        body: JSON.stringify({ videoId: extractVideoId(youtubeUrl) }), // backend expects videoId
      });

      const data = await res.json();

      if (data.success) {
        setTranscription(
          `TRANSCRIPTION COMPLETE\n\nVideo: ${youtubeUrl}\n\n${data.transcript}`
        );
      } else {
        setTranscription(`Error: ${data.error}`);
      }

      setShowPanel(true);
    } catch (err) {
      setTranscription("An unexpected error occurred.");
      setShowPanel(true);
    } finally {
      setIsLoading(false);
    }
  };
  function extractVideoId(url: string): string | null {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match?.[1] || null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("devAuth");
    window.location.href = "/";
  };

  const handleClear = () => {
    if (isClosing) return;
    setIsClosing(true);
    setShowPanel(false);
    setTimeout(() => {
      setTranscription("");
      setIsClosing(false);
    }, 2000);
  };

  const handleClosePanel = () => {
    if (isClosing) return;
    setIsClosing(true);
    setShowPanel(false);
    setTimeout(() => {
      setIsClosing(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-4 md:p-6 ">
        <Link
          href="/"
          className="flex space-x-2 hover:scale-105 transition-transform duration-300"
        >
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </Link>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-sm hover:underline transition-all duration-300 hover:scale-105"
        >
          OUT
        </Button>
      </header>

      <div
        className="absolute right-0 top-0 h-[200px] w-[200px] md:h-[300px] md:w-[300px] animate-pulse rounded-full bg-gradient-to-br from-green-400 via-blue-300 to-purple-200 opacity-70 blur-3xl"
        aria-hidden="true"
      />

      <main className="px-4 md:px-6 pt-8 md:pt-12">
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light leading-tight tracking-tight mb-8 md:mb-12 animate-fade-in">
            TRANSCRIBE
          </h1>

          <form onSubmit={handleTranscribe} className="space-y-6 mb-8 md:mb-12">
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

          {/* Mobile inline output */}
          {transcription && showPanel && (
            <div className="block md:hidden bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Transcription Output
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 max-h-60 overflow-y-auto mb-4">
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {transcription}
                </pre>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleCopy}
                  className="w-full h-11 bg-black text-white rounded-xl font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
                >
                  {copySuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleClear}
                  className="w-full h-11 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>
          )}

          <div className="mt-12 md:mt-16 text-center">
            <p className="text-xs text-gray-400">
              Personal tool. Dev use only.
            </p>
          </div>
        </div>
      </main>

      {/* Desktop floating output */}
      {transcription && showPanel && (
        <div className="hidden md:fixed md:inset-0 md:z-50 md:flex md:items-center md:justify-center md:p-4 lg:p-8 md:bg-black md:bg-opacity-20 md:backdrop-blur-sm">
          <div className="w-full max-w-2xl lg:max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">
                Transcription Output
              </h2>
              <button
                onClick={handleClosePanel}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="bg-gray-50 rounded-xl p-4 max-h-80 overflow-y-auto">
                  <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {transcription}
                  </pre>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleCopy}
                  className="flex-1 h-11 bg-black text-white rounded-xl font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
                >
                  {copySuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleClear}
                  className="flex-1 h-11 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl px-4 py-3 shadow-lg w-fit max-w-xs sm:px-6 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-900 font-medium">
                Processing...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
