"use client";
import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate initial loading
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-4 sm:px-8 md:px-18 py-8 sm:py-12 md:py-18 crt-effect">
      {/* Matrix rain background */}
      <div className="matrix-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="matrix-char absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))}
          </div>
        ))}
      </div>

      {/* Scan lines effect */}
      <div className="scan-lines"></div>

      {/* Greeting Section */}
      <div className="p-2 sm:p-4 mb-4 sm:mb-6">
        <div className="text-center">
          <h1 className="text-lg sm:text-xl ascii-glow mb-2">Hello Linke 👋</h1>
          <p className="text-green-300 text-sm sm:text-base">
            {loading
              ? `Loading Binance news feed... ${loadingProgress}%`
              : "Binance news feed"}
            <span className="terminal-cursor ml-1 text-sm sm:text-base">█</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-2 sm:p-4">
        <Timeline />
      </div>
    </div>
  );
}
