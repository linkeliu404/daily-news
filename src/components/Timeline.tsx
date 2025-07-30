"use client";
import { useEffect, useState } from "react";
import AnnouncementCard, { Announcement } from "@/components/AnnouncementCard";
import AsciiLoader from "@/components/AsciiLoader";

export default function Timeline() {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10);
  const [loadingProgress, setLoadingProgress] = useState(0);

  async function fetchNews() {
    setLoading(true);
    setLoadingProgress(0);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    const res = await fetch("/api/news");
    const data = await res.json();
    setAnnouncements(data);
    setLoadingProgress(100);
    setLoading(false);
    clearInterval(progressInterval);
  }

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  const displayedAnnouncements = announcements?.slice(0, displayCount) || [];
  const hasMore = announcements && announcements.length > displayCount;

  return (
    <div className="w-full">
      <div className="w-full max-w-[760px] mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-4 sm:py-8">
            <AsciiLoader progress={loadingProgress} />
          </div>
        )}

        {/* ASCII Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-2 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-green-300 to-transparent ascii-glow" />

          <div className="space-y-3 sm:space-y-4">
            {announcements && announcements.length === 0 && !loading && (
              <div className="text-center text-green-300 py-4 sm:py-8">
                <pre className="text-xs sm:text-sm">
                  {`
╔══════════════════════════════════════════════════════════════╗
║                    NO NEWS FOUND                             ║
║                 Check back later...                          ║
╚══════════════════════════════════════════════════════════════╝
`}
                </pre>
              </div>
            )}

            {displayedAnnouncements.map((a, i) => (
              <div key={a.id} className="flex items-start group">
                <div className="flex-1 ml-8 sm:ml-8">
                  <AnnouncementCard announcement={a} />
                </div>
              </div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center py-4">
                <button
                  onClick={handleLoadMore}
                  className="ascii-border px-4 sm:px-6 py-2 text-green-400 hover:ascii-glow transition-all duration-300 text-sm sm:text-base"
                >
                  LOAD MORE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
