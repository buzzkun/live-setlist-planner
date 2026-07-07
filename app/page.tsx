"use client";

import { useState } from "react";
import LiveInfo from "../components/LiveInfo";
import SongList from "../components/SongList";
import type { Song } from "../types/song";
import { formatDuration } from "../utils/formatDuration";
import SongForm from "../components/SongForm";

export default function Home() {
  const appName = "Live Setlist Planner";
  const liveTitle = "7月ワンマンライブ";

  const [venue, setVenue] = useState("下北沢 Music Hall");
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

  // 初期データで id:1〜3 を使っているので、次に追加する曲は id:4 から始める
  const [nextSongId, setNextSongId] = useState(4);

  const [inputSongTitle, setInputSongTitle] = useState("");
  const [inputSongMood, setInputSongMood] = useState("");
  const [inputSongDuration, setInputSongDuration] = useState("");
  const [inputSongMemo, setInputSongMemo] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const addSong = () => {
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

    // 次に追加する曲用にidを1つ進める
    setNextSongId(nextSongId + 1);

    // 追加後は入力欄を空にする
    setInputSongTitle("");
    setInputSongMood("");
    setInputSongDuration("");
    setInputSongMemo("");
    setErrorMessage("");
  };

  const deleteSong = (id: number) => {
    // 削除したいid以外の曲だけを残す
    setSongs(songs.filter((song) => song.id !== id));
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

        <LiveInfo liveTitle={liveTitle} venue={venue} />

        <section className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/70">
          <h2 className="mb-4 text-xl font-extrabold text-slate-900">
            会場を変更
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={inputVenue}
              onChange={(e) => setInputVenue(e.target.value)}
              placeholder="会場名を入力"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
            />

            <button
              onClick={() => setVenue(inputVenue || venue)}
              className="rounded-xl bg-sky-500 px-5 py-3 font-bold text-white transition hover:bg-sky-600"
            >
              反映
            </button>
          </div>
        </section>

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

          <SongForm
            inputSongTitle={inputSongTitle}
            setInputSongTitle={setInputSongTitle}
            inputSongMood={inputSongMood}
            setInputSongMood={setInputSongMood}
            inputSongDuration={inputSongDuration}
            setInputSongDuration={setInputSongDuration}
            inputSongMemo={inputSongMemo}
            setInputSongMemo={setInputSongMemo}
            onAddSong={addSong}
          />

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
        </section>
      </div>
    </main>
  );
}
