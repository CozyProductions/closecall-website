const pillars = ["Curated lineups", "Graphic-heavy visual identity", "Intimate, energetic dance floors", "Community and culture driven"];

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pt-[76px] md:px-8">
      <h1 className="display text-[clamp(3rem,10vw,103px)]">About</h1>
      <div className="mt-[76px] grid gap-[46px] border-t border-ash pt-[46px] md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-[62ch] space-y-5">
          <p>
            CloseCall is an Amsterdam-born, UK(G) focused organization built on underground rhythm, high visual direction, and lineups that move between
            UK sounds, club edits, and genre-fluid energy.
          </p>
          <p>
            We treat each event as a full creative drop: artwork, social rollout, music direction, room flow, and community-first curation.
          </p>
        </div>
        <div className="bg-paper p-[30px]">
          <p className="label">What we stand for</p>
          <ul className="mt-[19px] divide-y divide-ash">
            {pillars.map((p) => (
              <li key={p} className="py-3 text-[15px]">{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
