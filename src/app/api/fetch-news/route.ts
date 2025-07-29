import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BINANCE_API =
  "https://www.binance.com/bapi/composite/v1/public/cms/article/list/query?type=1&catalogId=48c8c2b0c7b045bfa2b1bcb6b1c0c0c0&pageNo=1&pageSize=20";

export async function POST() {
  try {
    const res = await fetch(BINANCE_API);
    const data = await res.json();
    const articles = data?.data?.articles || [];

    for (const article of articles) {
      const binanceId = article.id || article.code;
      if (!binanceId) continue;
      await prisma.announcement.upsert({
        where: { binanceId },
        update: {},
        create: {
          binanceId,
          title: article.title,
          url: `https://www.binance.com/en/support/announcement/${article.code}`,
          summary: article.summary || article.desc || null,
          coverImage: article.coverImage || null,
          publishedAt: new Date(
            article.releaseDate || article.publishedAt || article.createdAt
          ),
        },
      });
    }
    return NextResponse.json({ ok: true, count: articles.length });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
