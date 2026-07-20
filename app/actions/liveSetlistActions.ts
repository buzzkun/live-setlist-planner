"use server";

import { prisma } from "@/lib/prisma";
import type { Song } from "@/types/song";

type SaveLiveSetlistInput = {
  title: string;
  venue: string;
  liveDate: Date | null;
  memo: string;
  songs: Song[];
};

export async function saveLiveSetlist(input: SaveLiveSetlistInput) {
  const live = await prisma.live.create({
    data: {
      title: input.title,
      venue: input.venue,
      liveDate: input.liveDate,
      memo: input.memo,
      songs: {
        create: input.songs.map((song, index) => ({
          position: index + 1,
          title: song.title,
          mood: song.mood,
          durationMinutes: song.durationMinutes,
          memo: song.memo,
        })),
      },
    },
    include: {
      songs: true,
    },
  });

  return live;
}

export async function getSavedLives() {
  const lives = await prisma.live.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      venue: true,
      liveDate: true,
      memo: true,
      createdAt: true,
      songs: {
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return lives;
}

export async function getSavedLiveById(id: string) {
  const live = await prisma.live.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      venue: true,
      liveDate: true,
      memo: true,
      songs: {
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          position: true,
          title: true,
          mood: true,
          durationMinutes: true,
          memo: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return live;
}
