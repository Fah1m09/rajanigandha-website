import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

const prefersReducedMotion = () =>
  typeof window === "undefined"
  || window.matchMedia("(prefers-reduced-motion: reduce)").matches
  || !("IntersectionObserver" in window);

/** Calls back once when the element first scrolls into view. */
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin: "0px 0px -8% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

type RevealProps = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
};

/** Fades and lifts its children into place when scrolled into view. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`hm-reveal${inView ? " is-in" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Counts up from 0 to `value` once visible. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setCount(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1600, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span aria-label={`${value}${suffix}`}>
      <span ref={ref} aria-hidden="true">{count}</span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}

/** Infinite horizontal ticker. Content is duplicated so the loop is seamless. */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul className="hm-marquee-row" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          {item}
          <span className="hm-marquee-star" aria-hidden="true">✱</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`hm-marquee${reverse ? " is-reverse" : ""}`}>
      <div className="hm-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
