"use server";

import { prisma } from "@/lib/prisma";
import type { Song, SongMood } from "@/types/song";

// DBに保存されている曲一覧を取得する
export async function getSongs(): Promise<Song[]> {
  const songs = await prisma.song.findMany({
    where: {
      deletedAt: null,
    },
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

  // DB上ではmoodがstringなので、画面側で使うSongMood型として返す
  return songs.map((song) => ({
    ...song,
    mood: song.mood as SongMood,
  }));
}

// 画面から受け取った曲データをDBに保存する
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

  // 保存した曲データを画面側で使うSong型として返す
  return {
    ...song,
    mood: song.mood as SongMood,
  };
}

export async function updateSong(
  id: string,
  input: {
    title: string;
    mood: SongMood;
    durationMinutes: number;
    memo: string;
  },
): Promise<Song> {
  const song = await prisma.song.update({
    where: {
      id,
    },
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

// 受け取ったidと一致する曲に削除日時を入れて、削除済み扱いにする
export async function deleteSong(id: string): Promise<void> {
  await prisma.song.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
