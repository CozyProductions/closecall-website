"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import SplitHero from "@/components/motion/SplitHero";
import { useIntroDone } from "@/lib/intro";
import { eventParts, type EventItem } from "@/data/events";
import { SOUNDCLOUD } from "@/data/links";

const EASE = [0.76, 0, 0.24, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

// Long enough for the letters to land and the line to be read at a normal pace.
const INTRO_HOLD = 4600;
const INTRO_VIDEO = { video: "closecall-crowd", webm: true, tone: 0.55 } as const;

const SLIDES = [
  // Mostly black frames: keep it faint so the dates stay readable.
  { label: "Tickets", video: "closecall-shapes", webm: true, tone: 0.22 },
  // The line clip compresses better as h264, so it has no webm.
  { label: "About", video: "closecall-lines", webm: false, tone: 0.55 },
  { label: "Music", video: "closecall-runners", webm: true, tone: 0.55 },
  { label: "Highlights", video: null, webm: false, tone: 0 },
] as const;
const N = SLIDES.length;

const HIGHLIGHTS = ["02", "03", "05", "08", "11", "14"].map((n) => `/slides/2026-03-03-closecall-${n}.jpg`);

// "Don't make it a CloseCall" plays once as an intro and never comes back.
// After it the previews are driven by scroll: each viewport of scroll is one slide.
export default function HomeStage({ events, eventsLabel }: { events: EventItem[]; eventsLabel: string }) {
  const ready = useIntroDone();
  const track = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!ready || !intro) return;
    const timer = setTimeout(() => setIntro(false), INTRO_HOLD);
    return () => clearTimeout(timer);
  }, [ready, intro]);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (intro && p > 0.01) setIntro(false); // the visitor started scrolling
    setIndex(Math.min(N - 1, Math.floor(p * N)));
  });

  function goTo(i: number) {
    const el = track.current;
    if (!el) return;
    setIntro(false);
    setIndex(i);
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (range * (i + 0.5)) / N, behavior: "instant" });
  }

  const media = intro ? INTRO_VIDEO : SLIDES[index];

  return (
    <section ref={track} aria-label="CloseCall in short" className="relative" style={{ height: `${N * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-parchment">
        {/* Background clip per slide, wiped in from below */}
        <AnimatePresence initial={false}>
          {media.video && (
            <motion.div
              key={media.video}
              aria-hidden
              className="stage-video absolute inset-0"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 1, ease: EASE }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={`/video/${media.video}-poster.jpg`}
                style={{ opacity: media.tone }}
                className="h-full w-full max-w-none object-cover"
              >
                {media.webm && <source src={`/video/${media.video}.webm`} type="video/webm" />}
                <source src={`/video/${media.video}.mp4`} type="video/mp4" />
              </video>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide content */}
        <div className="relative mx-auto h-full w-full max-w-[1400px] px-4 md:px-8">
          <AnimatePresence initial={false}>
            <motion.div
              key={intro ? "intro" : index}
              className="absolute inset-x-4 bottom-[96px] top-[132px] flex flex-col justify-center md:inset-x-8 md:top-[90px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.25 } }}
              exit={{ opacity: 0, y: "-6%", transition: { duration: 0.5, ease: EASE } }}
            >
              {intro && <TitleSlide />}
              {!intro && index === 0 && <TicketsSlide events={events} label={eventsLabel} />}
              {!intro && index === 1 && <AboutSlide />}
              {!intro && index === 2 && <MusicSlide />}
              {!intro && index === 3 && <HighlightsSlide />}
            </motion.div>
          </AnimatePresence>

          {/* Scroll cue, while there is a next slide */}
          {index < N - 1 && (
            <div aria-hidden className="absolute bottom-[86px] right-4 hidden flex-col items-center gap-3 md:right-8 md:flex">
              <p className="label">Scroll</p>
              <span className="scroll-line" />
            </div>
          )}

          {/* Slide index, doubles as jump links */}
          <nav
            aria-label="Previews"
            className={`absolute inset-x-4 bottom-[26px] transition-opacity duration-500 md:inset-x-8 ${intro ? "opacity-0" : ""}`}
          >
            <ol className="grid grid-cols-4 gap-2 md:gap-4">
              {SLIDES.map((s, i) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    tabIndex={intro ? -1 : undefined}
                    aria-current={!intro && i === index ? "step" : undefined}
                    className="group block w-full rounded-none text-left"
                  >
                    <span className="relative block h-px bg-ash">
                      <span
                        className="absolute inset-y-0 left-0 w-full origin-left bg-ink transition-transform duration-500"
                        style={{ transform: `scaleX(${!intro && i <= index ? 1 : 0})` }}
                      />
                    </span>
                    <span className={`label mt-2 block transition-opacity ${!intro && i === index ? "" : "opacity-45 group-hover:opacity-100"}`}>
                      {pad(i + 1)}
                      <span className="hidden sm:inline"> {s.label}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

function SlideLabel({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="label mb-[24px] flex items-center gap-3">
      <span className="tabular-nums">{pad(n)} / {pad(N)}</span>
      <span className="h-px w-10 bg-ink" />
      {children}
    </p>
  );
}

const slideHeading = "display text-[14vw] md:text-[clamp(3rem,7.4vw,8.5rem)]";

function TitleSlide() {
  return (
    <>
      <SplitHero lines={["Don’t make it", "a CloseCall"]} className="display text-[10vw] md:text-[clamp(3rem,7.4vw,8.5rem)]" />
      <p className="label mt-[30px]">UK(G) Focused Organization</p>
    </>
  );
}

// Events as text bars, stacked. The flyer opens up inside its own row on hover or focus;
// on small screens it sits in the row as a thumbnail.
function TicketsSlide({ events, label }: { events: EventItem[]; label: string }) {
  return (
    <>
      <SlideLabel n={1}>{label}</SlideLabel>
      <SplitHero as="h2" lines={["Get Tickets"]} className={slideHeading} />
      <ul className="mt-[24px] border-t border-ink md:mt-[36px]">
        {events.slice(0, 4).map((event) => {
          const { tba, title, weekday, day, time, href, action } = eventParts(event);
          return (
            <li key={event.day + event.title} className="border-b border-ink">
              <a
                href={href ?? "/events#coming-up"}
                {...(href ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group grid grid-cols-[48px_1fr] items-center gap-x-3 gap-y-1 px-1 py-3 transition-colors duration-300 hover:bg-ink hover:text-parchment focus-visible:bg-ink focus-visible:text-parchment md:grid-cols-[auto_230px_1fr_190px_auto] md:gap-x-4 md:px-3 md:py-[16px]"
              >
                <span className="row-span-2 block h-[60px] w-[48px] overflow-hidden transition-[width,height] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:row-span-1 md:h-0 md:w-0 md:group-hover:h-[150px] md:group-hover:w-[120px] md:group-focus-visible:h-[150px] md:group-focus-visible:w-[120px]">
                  {event.flyer ? (
                    <Image src={event.flyer} alt="" width={240} height={300} className="h-[60px] w-[48px] max-w-none object-cover md:h-[150px] md:w-[120px]" />
                  ) : (
                    <span className="flex h-[60px] w-[48px] items-center justify-center bg-parchment md:h-[150px] md:w-[120px]">
                      <Image src="/brand/logos/closecall-diamond.png" alt="" width={1498} height={1488} className="w-[40%]" />
                    </span>
                  )}
                </span>
                <p className="text-[16px] leading-[1.15] md:text-[20px]">
                  <span className="label mr-2 opacity-60">{weekday.slice(0, 3)}</span>
                  {day.replace(/ \d{4}$/, "")}
                  {time && <span className="block text-[14px] opacity-60 md:text-[15px]">{time}</span>}
                  {event.note && <span className="label mt-1 block">{event.note}</span>}
                </p>
                <p className="display col-start-2 text-[18px] leading-[0.95] md:col-start-auto md:text-[clamp(18px,1.9vw,28px)]">{title}</p>
                <p className="label hidden md:block">{tba ? "Amsterdam" : `${event.venue}, ${event.city}`}</p>
                <span className="label hidden whitespace-nowrap md:block">
                  {action}
                  {href && " ↗"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <Link href="/events#coming-up" className="pill pill-lg mt-[24px] self-start">All events →</Link>
    </>
  );
}

function AboutSlide() {
  return (
    <>
      <SlideLabel n={2}>About</SlideLabel>
      <SplitHero as="h2" lines={["About", "CloseCall"]} className="display text-[10vw] md:text-[clamp(3rem,7.4vw,8.5rem)]" />
      <div className="mt-[30px] flex flex-col gap-[19px] md:flex-row md:items-end md:justify-between">
        <p className="max-w-[40ch] text-[clamp(1.1rem,1.6vw,1.5rem)] leading-[1.2]">
          An Amsterdam-born, UK(G) focused organization. Underground rhythm, club edits and genre-fluid energy, with every event treated as a
          full creative drop.
        </p>
        <Link href="/about" className="pill pill-lg self-start md:self-auto">Read more →</Link>
      </div>
    </>
  );
}

function MusicSlide() {
  return (
    <>
      <SlideLabel n={3}>Music</SlideLabel>
      <SplitHero as="h2" lines={["Music"]} className={slideHeading} />
      <div className="mt-[30px] flex flex-col gap-[19px] md:flex-row md:items-end md:justify-between">
        <p className="max-w-[40ch] text-[clamp(1.1rem,1.6vw,1.5rem)] leading-[1.2]">Sets and mixes from the CloseCall booth, now on SoundCloud.</p>
        <div className="flex flex-wrap gap-2">
          <a href={SOUNDCLOUD} target="_blank" rel="noreferrer" className="pill pill-lg pill-solid">
            Listen on SoundCloud ↗
          </a>
          <Link href="/music" className="pill pill-lg">Music →</Link>
        </div>
      </div>
    </>
  );
}

function HighlightsSlide() {
  return (
    <>
      <SlideLabel n={4}>From the floor</SlideLabel>
      <SplitHero as="h2" lines={["Highlights"]} className="display text-[10vw] md:text-[clamp(3rem,7.4vw,8.5rem)]" />
      <ul className="mt-[24px] grid grid-cols-3 gap-2 md:mt-[36px] md:grid-cols-6 md:gap-3">
        {HIGHLIGHTS.map((src, i) => (
          <motion.li
            key={src}
            className="overflow-hidden"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.9, delay: 0.35 + i * 0.08, ease: EASE }}
          >
            <Image
              src={src}
              alt="CloseCall night"
              width={724}
              height={1086}
              sizes="(min-width: 768px) 16vw, 33vw"
              className="aspect-[3/4] h-auto w-full object-cover transition-transform duration-700 hover:scale-105 md:aspect-[2/3]"
            />
          </motion.li>
        ))}
      </ul>
      <Link href="/events" className="pill pill-lg mt-[24px] self-start">Past events →</Link>
    </>
  );
}
