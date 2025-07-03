"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("devAuth");
      setIsAuthenticated(auth === "true");
    }
  }, []);

  const handleNavigation = () => {
    router.push(isAuthenticated ? "/transcribe" : "/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-4 md:p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            onClick={handleNavigation}
            className="text-xs md:text-sm hover:underline transition-all duration-300 hover:scale-105"
          >
            {isAuthenticated ? "TRANSCRIBE" : "GET IN"}
          </button>
          <button className="flex flex-col space-y-1 hover:scale-110 transition-transform duration-300">
            <span className="h-0.5 w-4 md:w-6 bg-black"></span>
            <span className="h-0.5 w-4 md:w-6 bg-black"></span>
          </button>
        </div>
      </header>

      <main className="relative px-4 md:px-6 pt-8 md:pt-12">
        {/* Gradient blob */}
        <div
          className="absolute right-0 top-0 h-[200px] w-[200px] md:h-[300px] md:w-[300px] animate-pulse rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <h1 className="max-w-full md:max-w-3xl text-4xl md:text-6xl font-light leading-tight tracking-tight animate-fade-in">
            <span className="inline-block animate-bounce-slow">YOUTUBE</span>
            <br />
            <span className="inline-block animate-pulse">TRANSCRIPTION</span>
            <br />
            <span className="inline-block animate-bounce-slow animation-delay-300">
              MAGIC.
            </span>
          </h1>

          <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 animate-slide-up">
            <div className="max-w-md">
              <Button
                variant="outline"
                className="rounded-full border-2 px-6 md:px-8 bg-transparent hover:bg-black hover:text-white transition-all duration-500 group w-full md:w-auto"
              >
                <span className="relative text-sm md:text-base">
                  NOPE. MINE ONLY.
                  <div className="absolute -left-4 -right-4 -top-4 -bottom-4 animate-spin-slow rounded-full border border-black opacity-50 group-hover:opacity-100"></div>
                </span>
              </Button>
              <p className="mt-6 md:mt-8 text-sm leading-relaxed text-gray-600 animate-fade-in-delayed">
                PERSONAL TOOL.
                <br />
                BUILD YOUR OWN.
              </p>
            </div>

            <div className="flex items-end animate-slide-left">
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                <span className="text-xs md:text-sm">DEV ONLY</span>
                <span className="h-px w-8 md:w-12 bg-black animate-expand"></span>
              </div>
            </div>
          </div>

          <p className="mt-16 md:mt-24 max-w-xl text-sm leading-relaxed text-gray-600 animate-fade-in-slow">
            YouTube → Text. Fast. Simple. Mine.
          </p>
        </div>
      </main>
    </div>
  );
}
