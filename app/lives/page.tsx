import Link from "next/link";
import { getSavedLives } from "@/app/actions/liveSetlistActions";

export const dynamic = "force-dynamic";

export default async function LivesPage() {
  const lives = await getSavedLives();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl space-y-8">
        <header>
          <Link href="/" className="text-sm font-bold text-sky-600 underline">
            ← セットリスト作成へ戻る
          </Link>

          <h1 className="mt-4 text-3xl font-extrabold">保存済みライブ一覧</h1>
          <p className="mt-2 text-slate-500">
            保存したライブのセットリストを確認できます。
          </p>
        </header>

        {lives.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            まだ保存済みライブはありません。
          </div>
        ) : (
          <ul className="space-y-4">
            {lives.map((live) => (
              <li key={live.id} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">{live.title}</h2>

                    <div className="mt-2 space-y-1 text-sm text-slate-600">
                      <p>会場：{live.venue}</p>
                      <p>
                        日付：
                        {live.liveDate
                          ? live.liveDate.toLocaleDateString("ja-JP")
                          : "未定"}
                      </p>
                      <p>曲数：{live.songs.length}曲</p>
                      <p>メモ：{live.memo}</p>
                    </div>
                  </div>

                  <Link
                    href={`/lives/${live.id}`}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-slate-700"
                  >
                    開く
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
