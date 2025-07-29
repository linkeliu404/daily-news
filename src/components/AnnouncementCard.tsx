import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Megaphone, Rocket } from "lucide-react";
import Link from "next/link";

export type Announcement = {
  id: string;
  binanceId: string;
  title: string;
  url: string;
  summary?: string | null;
  coverImage?: string | null;
  publishedAt: string;
};

export default function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement;
}) {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 shadow-sm">
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <Megaphone className="w-4 h-4" />
          <span>{new Date(announcement.publishedAt).toLocaleString()}</span>
        </div>
        <Link
          href={announcement.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold hover:underline"
        >
          {announcement.title}
        </Link>
        {announcement.summary && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {announcement.summary}
          </div>
        )}
        {announcement.coverImage && (
          <img
            src={announcement.coverImage}
            alt="cover"
            className="rounded mt-2 max-h-40 object-cover"
          />
        )}
      </CardContent>
    </Card>
  );
}
