export type EventItem = {
  title: string;
  venue: string;
  city: string;
  /** YYYY-MM-DD, used to split upcoming from past */
  day: string;
  date: string;
  lineup: string[];
  flyer?: string;
  /** Where to buy a ticket or claim an RSVP */
  ticketUrl?: string;
  rsvp?: boolean;
  eventUrl?: string;
  note?: string;
};

// Newest first.
export const closecallEvents: EventItem[] = [
  {
    title: "TBA",
    venue: "TBA",
    city: "Amsterdam",
    day: "2026-10-24",
    date: "24 October 2026",
    lineup: ["TBA"],
    note: "ADE",
  },
  {
    title: "DANN All Night: 2 Year Anniversary",
    venue: "The Barberhood",
    city: "Amsterdam",
    day: "2026-10-23",
    date: "23 October 2026 · 19:00–23:00",
    lineup: ["DANN (all night)"],
    flyer: "/events/dann-all-night-2026-10-23.jpg",
    ticketUrl: "https://events.blackbirdrsvp.com/closecall-ade-two-year-anniversary",
    rsvp: true,
    eventUrl: "https://www.instagram.com/p/Ddjds_jqLmz/",
    note: "ADE · RSVP only",
  },
  {
    title: "P-Rallel & CloseCall present: Nevermind",
    venue: "Jimmy Woo",
    city: "Amsterdam",
    day: "2026-10-22",
    date: "22 October 2026 · 22:00–04:00",
    lineup: ["ARTHI", "DANN", "JAEL", "KILIMANJARO", "LAMSI", "P-RALLEL", "SAY LEZ", "YEMZ"],
    flyer: "/events/nevermind-jimmy-woo-2026-10-22.jpg",
    ticketUrl: "https://www.jimmywoo.com/tickets?eventId=e_8fb8c",
    eventUrl: "https://www.instagram.com/p/Dd6fxfjC4rr/",
    note: "ADE",
  },
  {
    title: "CloseCall",
    venue: "Skatecafe",
    city: "Amsterdam",
    day: "2026-02-27",
    date: "27 February 2026 · 22:00–03:00",
    lineup: ["YEMZ", "DANN", "SAY LEZ", "DAVE NUNES", "MAEY", "BLACKSTA", "PASSION DEEZ"],
    flyer: "/events/closecall-2026-02-27.png",
    eventUrl: "https://skatecafe.weticket.io/closecall",
  },
  {
    title: "KUMO invites: CloseCall",
    venue: "Parallel",
    city: "Amsterdam",
    day: "2025-12-05",
    date: "5 December 2025 · 23:59–05:00",
    lineup: ["Ryota", "Yung Singh", "21-L", "DANN", "SAY LEZ", "Aures"],
    flyer: "/events/kumo-invites-closecall-2025-12-05.jpg",
    eventUrl: "https://parallel.am/programme/kumo-invites-closecall",
  },
];

// Display pieces shared by the event block and the ticket bars.
export function eventParts(event: EventItem) {
  const tba = event.title === "TBA";
  const [day, time] = event.date.split(" · ");
  const weekday = new Date(`${event.day}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });
  const action = event.ticketUrl ? (event.rsvp ? "RSVP" : "Get tickets") : event.eventUrl ? "More info" : "Soon";
  return { tba, title: tba ? "To be announced" : event.title, weekday, day, time: time ?? "", href: event.ticketUrl ?? event.eventUrl, action };
}

const today = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Amsterdam" });

// Soonest first.
export const upcomingEvents = () => closecallEvents.filter((e) => e.day >= today()).reverse();
export const pastEvents = () => closecallEvents.filter((e) => e.day < today());

// Everyone who has played, deduplicated across lineups (case-insensitive), "(all night)" notes dropped.
export const closecallArtists = () => [
  ...new Set(
    pastEvents()
      .flatMap((e) => e.lineup)
      .map((name) => name.replace(/\s*\(.*\)$/, "").toUpperCase())
      .filter((name) => name !== "TBA"),
  ),
];
