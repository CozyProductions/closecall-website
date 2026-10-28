import EventCard from "@/components/EventCard";
import { pastEvents, upcomingEvents } from "@/data/events";

// Re-render hourly so events move from "upcoming" to "past" on their own.
export const revalidate = 3600;

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents();

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pt-[76px] md:px-8">
      <h1 className="display text-[clamp(3rem,10vw,103px)]">Events</h1>

      {upcoming.length > 0 && (
        <div id="coming-up" className="scroll-mt-6">
          <p className="label mt-[76px]">Coming up</p>
          <div className="mt-[30px] grid gap-[19px]">
            {upcoming.map((event) => (
              <EventCard key={event.day + event.title} event={event} upcoming />
            ))}
          </div>
        </div>
      )}

      <p className="label mt-[76px]">Past</p>
      <div className="mt-[30px] grid items-stretch gap-[19px] lg:grid-cols-2">
        {past.map((event) => (
          <EventCard key={event.day + event.title} event={event} />
        ))}
      </div>
    </section>
  );
}
