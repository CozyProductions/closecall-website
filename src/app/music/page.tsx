import { SOUNDCLOUD } from "@/data/links";

const player = `https://w.soundcloud.com/player/?${new URLSearchParams({
  url: SOUNDCLOUD,
  color: "#000000",
  auto_play: "false",
  hide_related: "true",
  show_comments: "false",
  show_reposts: "false",
  visual: "false",
})}`;

export default function MusicPage() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pt-[76px] md:px-8">
      <h1 className="display text-[clamp(3rem,10vw,103px)]">Music</h1>
      <div className="mt-[76px] grid gap-[19px] md:grid-cols-[1.6fr_1fr]">
        <div className="border border-ink bg-paper">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink px-5 py-4 md:px-[30px]">
            <h2 className="display text-[30px] md:text-[46px]">SoundCloud</h2>
            <a href={SOUNDCLOUD} target="_blank" rel="noreferrer" className="pill pill-lg pill-solid">
              Open SoundCloud ↗
            </a>
          </div>
          <iframe title="CloseCall on SoundCloud" src={player} className="block h-[450px] w-full" loading="lazy" allow="autoplay" />
        </div>
        <div className="grid-paper self-start border border-ink p-5 md:p-[30px]">
          <h2 className="display text-[30px] md:text-[46px]">Spotify</h2>
          <p className="mt-[19px] text-[15px]">Coming soon.</p>
        </div>
      </div>
    </section>
  );
}
