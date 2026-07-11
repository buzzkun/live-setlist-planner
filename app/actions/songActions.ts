"use server";

import { prisma } from "@/lib/prisma";
import type { Song, SongMood } from "@/types/song";

export async function getSongs(): Promise<Song[]> {
  const songs = await prisma.song.findMany({
    select: {
      id: true,
      title: true,
      mood: true,
      durationMinutes: true,
      memo: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return songs.map((song) => ({
    ...song,
    mood: song.mood as SongMood,
  }));
}

export async function createSong(input: {
  title: string;
  mood: SongMood;
  durationMinutes: number;
  memo: string;
}): Promise<Song> {
  const song = await prisma.song.create({
    data: {
      title: input.title,
      mood: input.mood,
      durationMinutes: input.durationMinutes,
      memo: input.memo,
    },
    select: {
      id: true,
      title: true,
      mood: true,
      durationMinutes: true,
      memo: true,
    },
  });

  return {
    ...song,
    mood: song.mood as SongMood,
  };
}
