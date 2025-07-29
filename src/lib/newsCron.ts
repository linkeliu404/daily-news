import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const BINANCE_API =
  "https://www.binance.com/bapi/composite/v1/public/cms/article/list/query?type=1&catalogId=48&pageNo=1&pageSize=50";

async function fetchRealNews() {
  const res = await fetch(BINANCE_API, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    console.error(`[news-cron] 拉取公告失败: ${res.status} ${res.statusText}`);
    return 0;
  }
  const data = await res.json();
  const articles = data?.data?.catalogs?.[0]?.articles || [];
  const now = Date.now();
  let count = 0;
  let prisma = new PrismaClient();
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const binanceId = String(article.id || article.code);
    if (!binanceId) continue;
    const publishedAt = new Date(
      article.releaseDate || article.publishedAt || article.createdAt
    );
    if (isNaN(publishedAt.getTime())) continue;
    if (now - publishedAt.getTime() > 7 * 24 * 60 * 60 * 1000) continue;
    try {
      await prisma.announcement.upsert({
        where: { binanceId },
        update: {},
        create: {
          binanceId,
          title: article.title,
          url: `https://www.binance.com/en/support/announcement/${article.code}`,
          summary: article.summary || article.desc || null,
          coverImage: article.coverImage || null,
          publishedAt,
        },
      });
      count++;
    } catch (e) {
      console.error(`[news-cron] upsert error:`, e);
    }
    // 每10条断开重连一次，防止连接被云服务断开
    if ((i + 1) % 10 === 0) {
      await prisma.$disconnect();
      prisma = new PrismaClient();
    }
  }
  await prisma.$disconnect();
  console.log(`[news-cron] API同步公告 ${count} 条`);
  return count;
}

async function updateNews() {
  const count = await fetchRealNews();
  if (count > 0) {
    console.log(`[news-cron] API同步公告 ${count} 条`);
  } else {
    console.log("[news-cron] 7天内无新公告");
  }
}

cron.schedule("0 * * * *", updateNews);
updateNews();

console.log("[news-cron] 定时任务已启动");
