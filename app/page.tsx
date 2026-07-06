"use client";

import { useState } from "react";
import type { Song } from "../types/song";
import LiveInfo from "../components/LiveInfo";
import SongList from "../components/SongList";

export default function Home() {
  const appName = "Live Setlist Planner";
  const liveTitle = "7月ワンマンライブ";

  const [venue, setVenue] = useState("王子MusicLounge");
  const [inputVenue, setInputVenue] = useState("");

  const [songs, setSongs] = useState<Song[]>([
    {
      id: 1,
      title: "Morning Rain",
      mood: "静か",
      durationMinutes: 5,
      memo: "最初は静かに入る",
    },
    {
      id: 2,
      title: "calm",
      mood: "穏やか",
      durationMinutes: 4,
      memo: "空気を整える",
    },
    {
      id: 3,
      title: "幸せになるのよ",
      mood: "あたたかい",
      durationMinutes: 6,
      memo: "ラスト候補",
    },
  ]);

  const [nextSongId, setNextSongId] = useState(4);
  const [inputSongTitle, setInputSongTitle] = useState("");
  const [inputSongMood, setInputSongMood] = useState("");
  const [inputSongDuration, setInputSongDuration] = useState("");
  const [inputSongMemo, setInputSongMemo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addSong = () => {
    if (inputSongTitle.trim() === "") {
      setErrorMessage("曲名を入力してください");
      return;
    }

    if (inputSongDuration.trim() === "") {
      setErrorMessage("演奏時間を入力してください");
      return;
    }

    const durationNumber = Number(inputSongDuration);

    if (Number.isNaN(durationNumber)) {
      setErrorMessage("演奏時間は数字で入力してください");
      return;
    }

    if (durationNumber <= 0) {
      setErrorMessage("演奏時間は1分以上で入力してください");
      return;
    }

    setSongs([
      ...songs,
      {
        id: nextSongId,
        title: inputSongTitle,
        mood: inputSongMood || "未設定",
        durationMinutes: durationNumber,
        memo: inputSongMemo || "メモなし",
      },
    ]);

    setNextSongId(nextSongId + 1);
    setInputSongTitle("");
    setInputSongMood("");
    setInputSongDuration("");
    setInputSongMemo("");
    setErrorMessage("");
  };

  const deleteSong = (id: number) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const totalDurationMinutes = songs.reduce((total, song) => {
    return total + song.durationMinutes;
  }, 0);

  const totalHours = Math.floor(totalDurationMinutes / 60);
  const remainingMinutes = totalDurationMinutes % 60;

  let formattedTotalDuration = "";

  if (totalHours > 0 && remainingMinutes > 0) {
    formattedTotalDuration = `${totalHours}時間${remainingMinutes}分`;
  } else if (totalHours > 0) {
    formattedTotalDuration = `${totalHours}時間`;
  } else {
    formattedTotalDuration = `${remainingMinutes}分`;
  }

  const isLongSetlist = totalDurationMinutes > 90;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-gray-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white/90 p-8 shadow-xl shadow-slate-200/70 backdrop-blur">
        <div className="mb-8">
          <p className="mb-2 inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
            🎤 Live planning app
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {appName}
          </h1>

          <p className="mt-2 text-slate-500">
            ライブの会場・曲順・雰囲気をまとめて整理しよう
          </p>
        </div>

        <div className="mb-8">
          <LiveInfo liveTitle={liveTitle} venue={venue} />
        </div>

        <section className="mb-8 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <h2 className="text-xl font-bold text-slate-800">会場情報</h2>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={inputVenue}
              onChange={(e) => setInputVenue(e.target.value)}
              placeholder="会場名を入力"
              className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />

            <button
              onClick={() => setVenue(inputVenue)}
              className="rounded-full bg-sky-600 px-6 py-3 font-bold text-white shadow-md shadow-sky-200 transition hover:bg-sky-700"
            >
              反映する
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-sky-100 bg-sky-50/70 p-5">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎵</span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  セットリスト
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
                  {songs.length}曲
                </span>

                <span className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                  合計 {formattedTotalDuration}
                </span>
              </div>
            </div>

            {isLongSetlist && (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold leading-relaxed text-amber-700">
                ちょっと長めのセットリストです。MCや転換時間も考えて調整しましょう。
              </p>
            )}
          </div>

          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_1fr_120px_auto]">
            <input
              value={inputSongTitle}
              onChange={(e) => setInputSongTitle(e.target.value)}
              placeholder="曲名を入力"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />

            <input
              value={inputSongMood}
              onChange={(e) => setInputSongMood(e.target.value)}
              placeholder="雰囲気を入力"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />

            <input
              type="number"
              value={inputSongDuration}
              onChange={(e) => setInputSongDuration(e.target.value)}
              placeholder="分"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />

            <input
              type="text"
              value={inputSongMemo}
              onChange={(e) => setInputSongMemo(e.target.value)}
              placeholder="メモ"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />

            <button
              onClick={addSong}
              className="rounded-full bg-slate-800 px-6 py-3 font-bold text-white shadow-md shadow-slate-200 transition hover:bg-slate-900"
            >
              追加する
            </button>
          </div>

          {errorMessage && (
            <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {errorMessage}
            </p>
          )}

          {songs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
              まだ曲が追加されていません。
              <br />
              曲名・雰囲気・演奏時間を入力して、セットリストを作りましょう。
            </div>
          )}

          {songs.length > 0 && (
            <SongList songs={songs} onDeleteSong={deleteSong} />
          )}
        </section>
      </div>
    </main>
  );
}
