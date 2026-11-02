"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type ProductTab = { id: string; label: string; count?: number; content: ReactNode };

/** Pill-style tabs. Every panel is rendered (hidden ones too) so all content stays in the page HTML. */
export default function ProductTabs({ tabs, label }: { tabs: ProductTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  // Arrow keys, Home and End move between tabs, as screen reader users expect
  const onKeyDown = (event: KeyboardEvent) => {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="pg-tabs">
      <div className="pg-filters pg-tablist" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((tab, index) => (
          <button
            aria-controls={`${baseId}-${tab.id}-panel`}
            aria-selected={index === active}
            className="pg-pill"
            id={`${baseId}-${tab.id}-tab`}
            key={tab.id}
            onClick={() => setActive(index)}
            ref={(node) => { buttons.current[index] = node; }}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            type="button"
          >
            {tab.label}
            {tab.count !== undefined && <span className="pg-pill-count">{tab.count}</span>}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          className="pg-panel pg-tabpanel"
          hidden={index !== active}
          id={`${baseId}-${tab.id}-panel`}
          key={tab.id}
          role="tabpanel"
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
