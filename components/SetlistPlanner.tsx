"use client";

import { useState } from "react";
import LiveInfo from "./LiveInfo";
import SongList from "./SongList";
import type { Song, SongMood } from "../types/song";
import { formatDuration } from "../utils/formatDuration";
import {
  createSong,
  deleteSong as deleteSongAction,
} from "../app/actions/songActions";
import { saveLiveSetlist } from "../app/actions/liveSetlistActions";
import Link from "next/link";

type SetlistPlannerProps = {
  initialSongs: Song[];
};

export default function SetlistPlanner({ initialSongs }: SetlistPlannerProps) {
  const appName = "Live Setlist Planner";

  const [liveTitle, setLiveTitle] = useState("");
  const [liveDate, setLiveDate] = useState("");
  const [liveMemo, setLiveMemo] = useState("");

  const [venue, setVenue] = useState("");
  const [songs, setSongs] = useState<Song[]>(initialSongs);

  const [inputSongTitle, setInputSongTitle] = useState("");
  const [inputSongMood, setInputSongMood] = useState<SongMood>("未設定");
  const [inputSongDuration, setInputSongDuration] = useState("");
  const [inputSongMemo, setInputSongMemo] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const addSong = async () => {
    // 曲名が空なら、ここで処理を止める
    if (inputSongTitle.trim() === "") {
      setErrorMessage("曲名を入力してください");
      return;
    }

    // 演奏時間が空なら、ここで処理を止める
    if (inputSongDuration.trim() === "") {
      setErrorMessage("演奏時間を入力してください");
      return;
    }

    // inputの値は文字列なので、数字に変換する
    const durationNumber = Number(inputSongDuration);

    if (Number.isNaN(durationNumber)) {
      setErrorMessage("演奏時間は数字で入力してください");
      return;
    }

    if (durationNumber <= 0) {
      setErrorMessage("演奏時間は1分以上で入力してください");
      return;
    }

    // 既存のsongsに、新しい曲データを追加した配列を作る
    const createdSong = await createSong({
      title: inputSongTitle,
      mood: inputSongMood,
      durationMinutes: durationNumber,
      memo: inputSongMemo || "メモなし",
    });

    setSongs([...songs, createdSong]);

    // 追加後は入力欄を空にする
    setInputSongTitle("");
    setInputSongMood("未設定");
    setInputSongDuration("");
    setInputSongMemo("");
    setErrorMessage("");
  };

  const saveSetlist = async () => {
    if (liveTitle.trim() === "") {
      setErrorMessage("ライブタイトルを入力してください");
      return;
    }

    if (venue.trim() === "") {
      setErrorMessage("会場名を入力してください");
      return;
    }

    if (songs.length === 0) {
      setErrorMessage("曲を1曲以上追加してください");
      return;
    }

    await saveLiveSetlist({
      title: liveTitle,
      venue,
      liveDate: liveDate ? new Date(liveDate) : null,
      memo: liveMemo || "メモなし",
      songs,
    });

    setErrorMessage("");
  };

  const deleteSong = async (id: string) => {
    try {
      await deleteSongAction(id);

      // 削除したいid以外の曲だけを残す
      setSongs(songs.filter((song) => song.id !== id));
      setErrorMessage("");
    } catch {
      setErrorMessage("曲の削除に失敗しました");
    }
  };

  // songsのdurationMinutesを合計して、合計演奏時間を作る
  const totalDurationMinutes = songs.reduce((total, item) => {
    return total + item.durationMinutes;
  }, 0);

  const formattedTotalDuration = formatDuration(totalDurationMinutes);

  // 90分を超えたら注意メッセージを表示するための判定
  const isLongSetlist = totalDurationMinutes > 90;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-sky-500">
            Setlist Tool
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {appName}
          </h1>

          <p className="mt-3 text-slate-500">
            ライブの曲順・雰囲気・演奏時間・メモを管理するアプリ
          </p>
        </header>
        <Link
          href="/lives"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
        >
          保存済みライブ一覧を見る
        </Link>
        <LiveInfo liveTitle={liveTitle} venue={venue} />
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">ライブ情報</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={liveTitle}
              onChange={(event) => setLiveTitle(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="ライブタイトル"
            />

            <input
              type="date"
              value={liveDate}
              onChange={(event) => setLiveDate(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

            <input
              type="text"
              value={venue}
              onChange={(event) => setVenue(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="会場"
            />

            <input
              type="text"
              value={liveMemo}
              onChange={(event) => setLiveMemo(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3"
              placeholder="ライブメモ"
            />
          </div>
        </div>

        <section className="rounded-3xl bg-sky-50 p-6 shadow-sm shadow-sky-100/70">
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
                  全{songs.length}曲
                </span>

                <span className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                  合計時間 {formattedTotalDuration}
                </span>
              </div>
            </div>

            {isLongSetlist && (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold leading-relaxed text-amber-700">
                ちょっと長めのセットリストです。MCや転換時間も考えて調整しましょう。
              </p>
            )}
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={inputSongTitle}
              onChange={(e) => setInputSongTitle(e.target.value)}
              placeholder="曲名"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />

            <select
              value={inputSongMood}
              onChange={(e) => setInputSongMood(e.target.value as SongMood)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="未設定">楽曲の雰囲気</option>
              <option value="静か">静か</option>
              <option value="穏やか">穏やか</option>
              <option value="あたたかい">あたたかい</option>
              <option value="楽しい">楽しい</option>
              <option value="切ない">切ない</option>
            </select>

            <input
              type="number"
              value={inputSongDuration}
              onChange={(e) => setInputSongDuration(e.target.value)}
              placeholder="演奏時間（分）"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />

            <input
              type="text"
              value={inputSongMemo}
              onChange={(e) => setInputSongMemo(e.target.value)}
              placeholder="メモ"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />
          </div>

          <button
            onClick={addSong}
            className="mb-4 w-full rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
          >
            曲を追加
          </button>

          {errorMessage && (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
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

          <button
            type="button"
            onClick={saveSetlist}
            className="mt-6 w-full rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
          >
            このライブを保存
          </button>
        </section>
      </div>
    </main>
  );
}
