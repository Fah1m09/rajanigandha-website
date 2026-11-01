"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { iEquipment } from "../../types/Equipment";
import { ProductCard } from "../ui";
import { Reveal } from "./motion";

const AUTOPLAY_MS = 3500;

export default function FeaturedSlider({ featured, total }: { featured: iEquipment[]; total: number }) {
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const [tick, setTick] = useState(0); // bumping this restarts the autoplay timer after a manual click

  // Move one card at a time and wrap around at either end.
  const scroll = (direction: 1 | -1) => {
    const element = track.current;
    const card = element?.firstElementChild as HTMLElement | null;
    if (!element || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(element).columnGap || "0");
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 4;
    const atStart = element.scrollLeft <= 4;
    if (direction === 1 && atEnd) element.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction === -1 && atStart) element.scrollTo({ left: element.scrollWidth, behavior: "smooth" });
    else element.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) scroll(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [tick]);

  const manual = (direction: 1 | -1) => {
    scroll(direction);
    setTick((t) => t + 1);
  };
  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };

  return (
    <section className="hm-section" aria-labelledby="hm-featured-title">
      <div className="hm-wrap">
        <div className="hm-heading-row">
          <Reveal>
            <p className="hm-eyebrow">Product catalogue</p>
            <h2 className="hm-h2" id="hm-featured-title">Featured equipment</h2>
          </Reveal>
          <div className="hm-slider-nav">
            <button type="button" onClick={() => manual(-1)} aria-label="Previous products"><ArrowLeft /></button>
            <button type="button" onClick={() => manual(1)} aria-label="Next products"><ArrowRight /></button>
          </div>
        </div>
      </div>
      <ul
        className="hm-slider"
        ref={track}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {featured.map((item, index) => (
          <Reveal as="li" className="hm-product" delay={index * 70} key={item.slug}>
            <ProductCard item={item} />
          </Reveal>
        ))}
        <li className="hm-product hm-product-more">
          <Link href="/equipments">
            <span>See all {total} products</span>
            <span className="hm-round-arrow" aria-hidden="true"><ArrowUpRight /></span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
