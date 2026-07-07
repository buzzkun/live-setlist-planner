"use client";

type SongFormProps = {
  inputSongTitle: string;
  setInputSongTitle: (value: string) => void;

  inputSongMood: string;
  setInputSongMood: (value: string) => void;

  inputSongDuration: string;
  setInputSongDuration: (value: string) => void;

  inputSongMemo: string;
  setInputSongMemo: (value: string) => void;

  onAddSong: () => void;
};

export default function SongForm({
  inputSongTitle,
  setInputSongTitle,
  inputSongMood,
  setInputSongMood,
  inputSongDuration,
  setInputSongDuration,
  inputSongMemo,
  setInputSongMemo,
  onAddSong,
}: SongFormProps) {
  return (
    <>
      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={inputSongTitle}
          onChange={(e) => setInputSongTitle(e.target.value)}
          placeholder="曲名"
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
        />

        <input
          type="text"
          value={inputSongMood}
          onChange={(e) => setInputSongMood(e.target.value)}
          placeholder="雰囲気"
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
        />

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
        onClick={onAddSong}
        className="mb-4 w-full rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
      >
        曲を追加
      </button>
    </>
  );
}
