"use server";

import { prisma } from "@/lib/prisma";

export async function getSongs() {
  return await prisma.song.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}
