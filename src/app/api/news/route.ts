import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
    take: 50,
  });
  await prisma.$disconnect();
  return NextResponse.json(announcements);
}
