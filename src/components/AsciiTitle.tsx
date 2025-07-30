"use client";
import { useState, useEffect } from "react";

export default function AsciiTitle() {
  const [currentChar, setCurrentChar] = useState(0);
  const title = "DAILY NEWS TERMINAL";
  const subtitle = "AI NEWS FEED v1.0";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChar(
        (prev) => (prev + 1) % (title.length + subtitle.length + 10)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [title.length, subtitle.length]);

  return (
    <div className="ascii-border p-4 mb-6 ascii-flicker">
      <pre className="text-center text-sm leading-tight">
        {`
╔══════════════════════════════════════════════════════════════╗
║                    ${title}                       ║
║                     ${subtitle}                        ║
╚══════════════════════════════════════════════════════════════╝
`}
      </pre>
      <div className="text-center mt-2">
        <span className="text-green-400 text-xs">
          &gt; System initialized successfully
        </span>
        <span className="terminal-cursor ml-1">█</span>
      </div>
    </div>
  );
}
