import { useEffect, useRef, useState } from "react";

type AnimatedStatisticProps = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

function AnimatedStatistic({ value, suffix = "", label, description }: AnimatedStatisticProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      setCount(value);
      return;
    }

    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      observer.disconnect();
      const startTime = performance.now();
      const duration = 1400;
      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return (
    <article className="about-card about-stat-card">
      <p className="about-stat-label">{label}</p>
      <p className="about-stat-value" aria-label={`${value}${suffix} ${label}`}>
        <span ref={counterRef} aria-hidden="true">{count}</span>{suffix}
      </p>
      <p className="about-stat-description">{description}</p>
    </article>
  );
}

export default function AboutUs() {
  return (
    <section className="about-section" aria-labelledby="about-heading">
      <div className="about-grid">
        <article className="about-card about-story-card">
          <p className="about-eyebrow">About Rajanigandha International</p>
          <h2 id="about-heading">Supporting better diagnostics, every step of the way.</h2>
          <p>
            We supply medical equipment and diagnostic reagents to healthcare
            providers across Bangladesh. For 16 years, we have focused on
            dependable products and responsive support that help hospitals and
            diagnostic centers serve their communities.
          </p>
        </article>
        <AnimatedStatistic
          value={37}
          label="Years of experience"
          description="Building trusted partnerships in healthcare."
        />
        <AnimatedStatistic
          value={400}
          suffix="+"
          label="Healthcare providers"
          description="Hospitals and diagnostic centers use our products."
        />
        <AnimatedStatistic
          value={29}
          label="Branches"
          description="Here to support customers across the country."
        />
      </div>
    </section>
  );
}
