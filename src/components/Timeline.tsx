"use client";
import { useEffect, useState } from "react";
import AnnouncementCard, { Announcement } from "@/components/AnnouncementCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Timeline() {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  async function fetchNews() {
    setLoading(true);
    const res = await fetch("/api/news");
    const data = await res.json();
    setAnnouncements(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-0">
      <h1 className="text-2xl font-bold my-6">Binance Alpha News Timeline</h1>
      <div className="w-full max-w-2xl">
        {loading && (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded" />
            ))}
          </div>
        )}
        {announcements && announcements.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No announcements found.
          </div>
        )}
        {announcements &&
          announcements.map((a, i) => (
            <div key={a.id} className="relative">
              <AnnouncementCard announcement={a} />
              {i < announcements.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
      </div>
    </div>
  );
}
