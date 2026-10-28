"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { markIntroDone } from "@/lib/intro";

const DURATION = 1600;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reduced motion: CSS already hides the overlay, so finish on the first frame.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : DURATION;
    let frame = 0;
    let finish: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const step = (now: number) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(step);
      } else {
        finish = setTimeout(() => {
          setVisible(false);
          markIntroDone();
        }, duration ? 250 : 0);
      }
    };
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="preloader fixed inset-0 z-[90] flex items-center justify-center bg-parchment"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: [-45, 0, 0, 90], scale: [0.6, 1, 1, 1], opacity: 1 }}
            transition={{ duration: DURATION / 1000, times: [0, 0.35, 0.7, 1], ease: [0.76, 0, 0.24, 1] }}
          >
            <Image src="/brand/logos/closecall-diamond.png" alt="" width={1498} height={1488} priority className="h-[72px] w-auto" />
          </motion.div>
          <p className="label absolute bottom-[30px] left-4 md:left-8">CloseCall</p>
          <p className="label absolute bottom-[30px] right-4 tabular-nums md:right-8">
            Loading {String(count).padStart(3, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
