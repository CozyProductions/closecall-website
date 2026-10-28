"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Grey dot that inverts whatever it passes over; grows on anything clickable.
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [shown, setShown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 600, damping: 40, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
      setHover(!!(e.target as Element).closest?.("a, button, [role=button], input, textarea, select, label"));
    };
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-[#8f8f8f] mix-blend-difference"
      style={{ x: reduce ? x : sx, y: reduce ? y : sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: hover ? 44 : 12, height: hover ? 44 : 12, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
