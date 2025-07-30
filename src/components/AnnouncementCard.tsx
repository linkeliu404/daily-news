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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="w-full">
      <div className="p-2 sm:p-4 hover:ascii-glow transition-all duration-300">
        <a
          href={announcement.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="text-green-400 hover:text-green-300 transition-colors">
            <div className="text-green-300 text-xs mb-1">
              {formatDate(announcement.publishedAt)}
            </div>
            <div className="mb-2">
              <span className="hover:underline cursor-pointer text-sm sm:text-base">
                {announcement.title}
              </span>
            </div>

            {announcement.summary && (
              <div className="text-green-300 text-xs sm:text-sm mt-2">
                <span className="text-green-500">└─</span>{" "}
                {announcement.summary}
              </div>
            )}

            <div className="text-green-500 text-xs mt-2">
              └─ Click to read more...
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
