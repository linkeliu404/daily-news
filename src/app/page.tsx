"use client";
import { useState, useEffect } from "react";
import Timeline from "@/components/Timeline";
import AsciiTitle from "@/components/AsciiTitle";

function MatrixRain() {
  const [matrixItems, setMatrixItems] = useState<
    {
      left: string;
      animationDelay: string;
      animationDuration: string;
      char: string;
      key: number;
    }[]
  >([]);
  useEffect(() => {
    const items = Array.from({ length: 50 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      char: String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)),
      key: i,
    }));
    setMatrixItems(items);
  }, []);
  return (
    <div className="matrix-bg">
      {matrixItems.map((item) => (
        <div
          key={item.key}
          className="matrix-char absolute"
          style={{
            left: item.left,
            animationDelay: item.animationDelay,
            animationDuration: item.animationDuration,
          }}
        >
          {item.char}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Typewriter step state
  const [showTitle, setShowTitle] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showNews, setShowNews] = useState(false);

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

  // Typewriter effect for each step
  useEffect(() => {
    setShowTitle(true);
    const titleTimer = setTimeout(() => {
      setShowGreeting(true);
      const greetingTimer = setTimeout(() => {
        setShowNews(true);
      }, 1200); // greeting typewriter duration
      return () => clearTimeout(greetingTimer);
    }, 1800); // title typewriter duration
    return () => clearTimeout(titleTimer);
  }, []);

  // Typewriter for greeting
  const greetingText = "Hello Linke 👋";
  const [greetingTyped, setGreetingTyped] = useState("");
  const [greetingDone, setGreetingDone] = useState(false);
  useEffect(() => {
    if (!showGreeting) return;
    setGreetingTyped("");
    setGreetingDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setGreetingTyped(greetingText.slice(0, i + 1));
      i++;
      if (i >= greetingText.length) {
        clearInterval(interval);
        setGreetingDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [showGreeting]);

  // Terminal typing effect for loading
  const loadingText = "Binance news feed";
  const [loadingTyped, setLoadingTyped] = useState("");
  useEffect(() => {
    if (!showGreeting) return;
    setLoadingTyped("");
    let i = 0;
    const interval = setInterval(() => {
      setLoadingTyped(loadingText.slice(0, i + 1));
      i++;
      if (i > loadingText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [showGreeting]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-4 sm:px-8 md:px-18 py-8 sm:py-12 md:py-18 crt-effect">
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Scan lines effect */}
      <div className="scan-lines"></div>

      {/* Title Section */}
      {showTitle && <AsciiTitle />}

      {/* Greeting Section */}
      {showGreeting && (
        <div className="p-2 sm:p-4 mb-4 sm:mb-6">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl ascii-glow mb-2">
              {greetingTyped}
              {!greetingDone && (
                <span className="terminal-cursor ml-1 text-sm sm:text-base">
                  █
                </span>
              )}
            </h1>
            <p className="text-green-300 text-sm sm:text-base">
              {loadingTyped}
              {loadingTyped.length < loadingText.length && (
                <span className="terminal-cursor ml-1 text-sm sm:text-base">
                  █
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-2 sm:p-4">{showNews && <Timeline />}</div>
    </div>
  );
}
