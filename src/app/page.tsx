import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import HomeStage from "@/components/motion/HomeStage";
import { closecallArtists, pastEvents, upcomingEvents } from "@/data/events";

// Re-render hourly so events move from "upcoming" to "past" on their own.
export const revalidate = 3600;

export default function Homepage() {
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const artists = closecallArtists();

  return (
    <>
      <HomeStage
        events={upcoming.length ? upcoming : past.slice(0, 1)}
        eventsLabel={upcoming.length ? "ADE 2026" : "Latest edition"}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="border-t border-ash py-[76px]">
            <div className="mb-[30px] flex items-end justify-between gap-4">
              <h2 className="display text-[34px] md:text-[70px]">Coming up</h2>
              <p className="label">ADE 2026</p>
            </div>
            <div className="grid gap-[19px]">
              {upcoming.map((event) => (
                <EventCard key={event.day + event.title} event={event} upcoming />
              ))}
            </div>
          </section>
        )}

        {/* Artists */}
        <section className="py-[76px]">
          <p className="label mb-[30px]">Played at CloseCall</p>
          <ul className="plus-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {artists.map((name) => (
              <li key={name} className="flex aspect-[5/3] items-center justify-center p-3 text-center">
                <span className="display text-[13px] leading-none md:text-[15px]">{name}</span>
              </li>
            ))}
            <li className="flex aspect-[5/3] items-center justify-center">
              <Image src="/brand/logos/closecall-diamond.png" alt="" width={1498} height={1488} className="h-[60%] w-auto" />
            </li>
          </ul>
        </section>

        {/* Events */}
        <section className="py-[76px]">
          <div className="mb-[30px] flex items-end justify-between gap-4">
            <h2 className="display text-[34px] md:text-[70px]">Past events</h2>
            <Link href="/events" className="pill">All events →</Link>
          </div>
          <div className="grid items-stretch gap-[19px] lg:grid-cols-2">
            {past.map((event) => (
              <EventCard key={event.day + event.title} event={event} />
            ))}
          </div>
        </section>

        {/* Sign-off */}
        <section className="py-[76px]">
          <Image src="/brand/logos/closecall-wordmark-fuzzy.png" alt="CloseCall" width={1600} height={193} className="h-auto w-full" />
        </section>
      </div>
    </>
  );
}
