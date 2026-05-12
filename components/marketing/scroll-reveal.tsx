"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "@/lib/utils";

function subscribeReducedMotion(cb: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function reducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function reducedMotionServerSnapshot(): boolean {
  return false;
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Задержка появления после пересечения viewport (мс). */
  delayMs?: number;
};

export function ScrollReveal({ children, className, delayMs = 0 }: Props) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    reducedMotionServerSnapshot,
  );

  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  const visible = reduceMotion || revealed;

  return (
    <div
      ref={ref}
      className={cn(
        visible
          ? "translate-y-0 opacity-100 motion-safe:duration-700 motion-safe:ease-out"
          : "translate-y-5 opacity-0 motion-safe:duration-700 motion-safe:ease-out",
        !reduceMotion && "motion-safe:transition-[opacity,transform]",
        className,
      )}
      style={
        visible && !reduceMotion && delayMs > 0
          ? { transitionDelay: `${delayMs}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
