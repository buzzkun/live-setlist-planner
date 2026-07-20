import Link from "next/link";
import { notFound } from "next/navigation";
import { getSavedLiveById } from "@/app/actions/liveSetlistActions";
import { formatDuration } from "@/utils/formatDuration";

export const dynamic = "force-dynamic";

type LiveDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LiveDetailPage({ params }: LiveDetailPageProps) {
  const { id } = await params;

  const live = await getSavedLiveById(id);

  if (!live) {
    notFound();
  }

  const totalDurationMinutes = live.songs.reduce((total, song) => {
    return total + song.durationMinutes;
  }, 0);

  const formattedTotalDuration = formatDuration(totalDurationMinutes);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <Link
            href="/lives"
            className="text-sm font-bold text-sky-600 underline"
          >
            ← 保存済みライブ一覧へ戻る
          </Link>

          <div className="mt-4 rounded-3xl bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-extrabold">{live.title}</h1>

            <div className="mt-4 space-y-2 text-slate-600">
              <p>会場：{live.venue}</p>
              <p>
                日付：
                {live.liveDate
                  ? live.liveDate.toLocaleDateString("ja-JP")
                  : "未定"}
              </p>
              <p>メモ：{live.memo}</p>
            </div>
          </div>
        </header>

        <section className="rounded-3xl bg-sky-50 p-6 shadow-sm shadow-sky-100/70">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-extrabold">セットリスト</h2>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
                {live.songs.length}曲
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                合計 {formattedTotalDuration}
              </span>
            </div>
          </div>

          {live.songs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
              このライブにはまだ曲が登録されていません。
            </div>
          ) : (
            <ul className="space-y-3">
              {live.songs.map((song) => (
                <li
                  key={song.id}
                  className="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <span className="text-lg font-extrabold text-sky-600">
                      {song.position}
                    </span>

                    <div>
                      <h3 className="font-bold">{song.title}</h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {song.mood} / {song.durationMinutes}分
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        メモ：{song.memo}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
