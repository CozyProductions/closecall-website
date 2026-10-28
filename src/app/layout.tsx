import type { Metadata } from "next";
import "./globals.css";
import TransitionShell from "@/components/TransitionShell";
import SiteNav from "@/components/SiteNav";
import Preloader from "@/components/motion/Preloader";
import Cursor from "@/components/motion/Cursor";
import { EMAIL, INSTAGRAM, SOUNDCLOUD } from "@/data/links";

export const metadata: Metadata = {
  title: "CloseCall",
  description: "CloseCall, UK(G) focused organization from Amsterdam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Preloader />
        <SiteNav />
        <main>
          <TransitionShell>{children}</TransitionShell>
        </main>
        <footer className="mx-auto mt-[119px] flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-6 border-t border-ash px-4 py-8 md:px-8">
          <p className="label">CloseCall · Amsterdam</p>
          <div className="flex flex-wrap gap-x-6">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="ghost-link">Instagram ↗</a>
            <a href={SOUNDCLOUD} target="_blank" rel="noreferrer" className="ghost-link">SoundCloud ↗</a>
            <a href={`mailto:${EMAIL}`} className="ghost-link">{EMAIL}</a>
          </div>
        </footer>
        <Cursor />
      </body>
    </html>
  );
}
