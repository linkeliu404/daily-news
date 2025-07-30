"use client";
import { useState, useEffect } from "react";

export default function AsciiStatusBar() {
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="ascii-border p-2 mb-4">
      <div className="flex justify-between items-center text-xs">
        <div className="flex space-x-4">
          <span className="text-green-400">
            &gt; UPTIME: {formatUptime(uptime)}
          </span>
          <span className="text-green-300">&gt; CPU: 23%</span>
          <span className="text-green-300">&gt; MEM: 1.2GB</span>
        </div>
        <div className="flex space-x-4">
          <span className="text-green-300">
            &gt; {time.toLocaleDateString()}
          </span>
          <span className="text-green-300">
            &gt; {time.toLocaleTimeString()}
          </span>
          <span className="text-green-400 terminal-cursor">█</span>
        </div>
      </div>
    </div>
  );
}
