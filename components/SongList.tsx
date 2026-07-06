"use client";

import type { Song } from "../types/song";

export default function SongList(props: {
  songs: Song[];
  onDeleteSong: (id: number) => void;
}) {
  return (
    <ul className="space-y-3">
      {props.songs.map((songData, index) => (
        <li
          key={songData.id}
          className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-1 gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
                {index + 1}
              </span>

              <div className="min-w-0">
                <p className="break-words font-bold text-slate-900">
                  {songData.title}
                </p>

                <div className="mt-1 flex flex-wrap gap-2 text-sm text-slate-500">
                  <span>mood：{songData.mood}</span>
                  <span>time：{songData.durationMinutes}分</span>
                </div>

                <p className="mt-2 break-words text-sm text-slate-500">
                  memo：{songData.memo}
                </p>
              </div>
            </div>

            <button
              onClick={() => props.onDeleteSong(songData.id)}
              className="self-start rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-500"
            >
              削除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
