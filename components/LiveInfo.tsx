"use client";

export default function LiveInfo(props: {
  liveTitle: string;
  venue: string;
}) {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-sky-500 to-slate-700 p-6 text-white shadow-lg shadow-sky-200/60">
      <p className="mb-2 text-sm font-bold opacity-90">Upcoming Live</p>

      <h2 className="text-2xl font-extrabold">{props.liveTitle}</h2>

      <p className="mt-3 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
        会場：{props.venue}
      </p>
    </section>
  );
}