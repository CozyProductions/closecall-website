import Image from "next/image";
import { eventParts, type EventItem } from "@/data/events";

// One event as a framed information block: date header, details in labelled rows, flyer on the side.
export default function EventCard({ event, upcoming = false }: { event: EventItem; upcoming?: boolean }) {
  const { tba, title, weekday, day, time, href, action } = eventParts(event);
  const tags = [upcoming && "Coming up", event.note].filter(Boolean);
  const rows = [
    ["Time", time],
    ["Venue", tba ? "To be announced" : `${event.venue}, ${event.city}`],
    ["Line-up", tba ? "To be announced" : event.lineup.join(", ")],
  ].filter(([, value]) => value) as [string, string][];

  return (
    <article className="flex flex-col border border-ink bg-paper">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-ink px-5 py-4 md:px-[30px]">
        <div>
          <p className="label">{weekday}</p>
          <p className="text-[26px] leading-[1.05] tracking-[-0.01em] md:text-[32px]">{day}</p>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag as string} className="label rounded-[10px] border border-ink px-2 py-[2px]">{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="grid flex-1 md:grid-cols-[1fr_min(38%,360px)]">
        <div className="flex flex-col px-5 py-6 md:px-[30px]">
          <h3 className="display text-[28px] md:text-[clamp(24px,2.6vw,40px)]">{title}</h3>
          <dl className="mt-6 border-t border-ash text-[16px] leading-[1.35]">
            {rows.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[84px_1fr] gap-3 border-b border-ash py-3">
                <dt className="label pt-[3px]">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {upcoming && href && (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href={href} target="_blank" rel="noreferrer" className="pill pill-lg pill-solid">
                {action} <span aria-hidden>↗</span>
              </a>
              {event.ticketUrl && event.eventUrl && (
                <a href={event.eventUrl} target="_blank" rel="noreferrer" className="ghost-link">
                  Instagram post ↗
                </a>
              )}
            </div>
          )}
          {!upcoming && event.eventUrl && (
            <a href={event.eventUrl} target="_blank" rel="noreferrer" className="pill pill-lg mt-6 self-start">
              Event page <span aria-hidden>↗</span>
            </a>
          )}
        </div>

        <div className="border-t border-ink md:border-l md:border-t-0">
          {event.flyer ? (
            <Image src={event.flyer} alt={`${title} flyer`} width={1200} height={1500} sizes="(min-width: 768px) 30vw, 100vw" className="h-auto w-full" />
          ) : (
            <div className="flex aspect-[4/5] h-full w-full items-center justify-center bg-parchment">
              <Image src="/brand/logos/closecall-diamond.png" alt="" width={1498} height={1488} className="w-[26%] opacity-90" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
