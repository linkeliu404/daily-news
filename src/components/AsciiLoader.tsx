"use client";
import { useState, useEffect } from "react";

interface AsciiLoaderProps {
  progress?: number;
}

export default function AsciiLoader({ progress = 0 }: AsciiLoaderProps) {
  const [frame, setFrame] = useState(0);
  const frames = [
    `
    ╔══════════════════════════════════════════════════════════════╗
    ║                    LOADING...                                ║
    ║                                                              ║
    ║                    [    ] 0%                                 ║
    ╚══════════════════════════════════════════════════════════════╝
    `,
    `
    ╔══════════════════════════════════════════════════════════════╗
    ║                    LOADING...                                ║
    ║                                                              ║
    ║                    [=   ] 25%                                ║
    ╚══════════════════════════════════════════════════════════════╝
    `,
    `
    ╔══════════════════════════════════════════════════════════════╗
    ║                    LOADING...                                ║
    ║                                                              ║
    ║                    [==  ] 50%                                ║
    ╚══════════════════════════════════════════════════════════════╝
    `,
    `
    ╔══════════════════════════════════════════════════════════════╗
    ║                    LOADING...                                ║
    ║                                                              ║
    ║                    [=== ] 75%                                ║
    ╚══════════════════════════════════════════════════════════════╝
    `,
    `
    ╔══════════════════════════════════════════════════════════════╗
    ║                    COMPLETE!                                 ║
    ║                                                              ║
    ║                    [====] 100%                               ║
    ╚══════════════════════════════════════════════════════════════╝
    `,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 500);

    return () => clearInterval(interval);
  }, [frames.length]);

  // Use progress prop if provided, otherwise use frame-based animation
  const currentProgress = progress > 0 ? progress : frame * 25;
  const progressBar =
    progress > 0
      ? `[${"=".repeat(Math.floor(currentProgress / 25))}${" ".repeat(
          4 - Math.floor(currentProgress / 25)
        )}] ${currentProgress}%`
      : frames[frame].split("\n")[3];

  return (
    <div className="text-center">
      <div className="text-sm sm:text-base ascii-glow">
        Loading Binance news feed...{" "}
        {progress > 0 ? `${progress}%` : `${currentProgress}%`}
      </div>
    </div>
  );
}
