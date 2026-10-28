"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = Array.from({ length: 14 }, (_, i) => `/slides/2026-03-03-closecall-${String(i + 1).padStart(2, "0")}.jpg`);

export default function ReferenceSquareSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const nextIn = 550 + Math.floor(Math.random() * 700); // 0.55s - 1.25s
      timer = setTimeout(() => {
        // random jump instead of a pre-shuffled list: keeps server and client render identical
        setIndex((prev) => (prev + 1 + Math.floor(Math.random() * (slides.length - 1))) % slides.length);
        tick();
      }, nextIn);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-ink">
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          priority={i < 2}
          className={`object-cover ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
