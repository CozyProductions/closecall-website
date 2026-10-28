"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/nav";

export default function SiteNav() {
  const pathname = usePathname();
  // On the homepage the nav floats over the full-screen stage.
  const position = pathname === "/" ? "absolute inset-x-0 top-0" : "relative";

  return (
    <header className={`${position} z-20 mx-auto grid w-full max-w-[1400px] grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 px-4 py-5 md:flex md:px-8`}>
      <Link href="/" aria-label="CloseCall home" className="rounded-[10px] md:mr-auto">
        <Image src="/brand/logos/closecall-wordmark.png" alt="CloseCall" width={1600} height={171} priority className="h-[14px] w-auto md:h-[17px]" />
      </Link>
      <Link href="/events#coming-up" className="pill pill-solid pill-lg md:order-last">
        Get Tickets <span aria-hidden>→</span>
      </Link>
      <nav aria-label="Main" className="col-span-2 grid grid-cols-5 gap-1.5 md:flex md:gap-2">
        {navLinks.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname.startsWith(href) ? "page" : undefined}
            className="pill pill-lg justify-center bg-paper aria-[current=page]:bg-ink aria-[current=page]:text-parchment"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
