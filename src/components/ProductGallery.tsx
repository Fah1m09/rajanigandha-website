import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

type Props = { images: string[]; alt: string; badge?: string };

// Horizontal swipe distance (px) that counts as a slide change
const SWIPE = 50;

/** Tracks a horizontal swipe and calls back with -1 (next) or 1 (previous). */
function useSwipe(onSwipe: (direction: 1 | -1) => void, enabled = true) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const moved = useRef(false);

  const onPointerDown = (event: ReactPointerEvent) => {
    if (!enabled || event.pointerType === "mouse") return;
    start.current = { x: event.clientX, y: event.clientY };
    moved.current = false;
  };
  const onPointerUp = (event: ReactPointerEvent) => {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy)) {
      moved.current = true;
      onSwipe(dx < 0 ? -1 : 1);
    }
  };
  const onPointerCancel = () => { start.current = null; };

  // Lets click handlers ignore the click that ends a swipe
  const wasSwipe = () => {
    const value = moved.current;
    moved.current = false;
    return value;
  };

  return { handlers: { onPointerDown, onPointerUp, onPointerCancel }, wasSwipe };
}

/** Thumbnail strip; keeps the active thumbnail scrolled into view. */
function Thumbs({ images, active, onSelect, className }: { images: string[]; active: number; onSelect: (index: number) => void; className: string }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const button = list?.children[active] as HTMLElement | undefined;
    if (!list || !button) return;
    // Scroll only the strip, never the page
    const left = button.offsetLeft - (list.clientWidth - button.clientWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div className={className} ref={listRef}>
      {images.map((src, index) => (
        <button
          aria-current={index === active ? "true" : undefined}
          aria-label={`Show image ${index + 1} of ${images.length}`}
          key={`${src}-${index}`}
          onClick={() => onSelect(index)}
          type="button"
        >
          <img src={src} alt="" loading="lazy" />
        </button>
      ))}
    </div>
  );
}

export default function ProductGallery({ images, alt, badge }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = images.length;
  const multiple = count > 1;

  const go = useCallback((index: number) => {
    setZoom(null);
    setActive((index + count) % count);
  }, [count]);
  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  const mainSwipe = useSwipe((dir) => (dir === -1 ? next() : prev()), multiple);
  const boxSwipe = useSwipe((dir) => (dir === -1 ? next() : prev()), multiple && !zoom);

  // Open/close the native dialog (gives Esc, focus trapping and a top-layer overlay for free)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  // Arrow keys in the full-screen view
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && multiple) next();
      if (event.key === "ArrowLeft" && multiple) prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, multiple, next, prev]);

  const close = () => { setOpen(false); setZoom(null); };

  const toggleZoom = (event: ReactMouseEvent<HTMLImageElement>) => {
    if (boxSwipe.wasSwipe()) return;
    if (zoom) return setZoom(null);
    const rect = event.currentTarget.getBoundingClientRect();
    setZoom({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="pg-gallery pg-rise">
      <div className="pg-gallery-main" aria-roledescription="carousel" aria-label={`${alt} images`}>
        <div className="pg-slider" {...mainSwipe.handlers}>
          <div className="pg-slider-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {images.map((src, index) => (
              <button
                aria-hidden={index !== active}
                aria-label={`View ${alt} full screen`}
                className="pg-slide"
                key={`${src}-${index}`}
                onClick={() => { if (!mainSwipe.wasSwipe()) setOpen(true); }}
                tabIndex={index === active ? 0 : -1}
                type="button"
              >
                <img
                  src={src}
                  alt={multiple ? `${alt}, image ${index + 1} of ${count}` : alt}
                  draggable={false}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </div>

        {badge && <span className="hm-sticker">{badge}</span>}
        <button aria-label="Open full screen" className="pg-gallery-expand" onClick={() => setOpen(true)} type="button">
          <Maximize2 aria-hidden="true" />
        </button>

        {multiple && (
          <>
            <button aria-label="Previous image" className="pg-gallery-arrow is-prev" onClick={prev} type="button">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button aria-label="Next image" className="pg-gallery-arrow is-next" onClick={next} type="button">
              <ChevronRight aria-hidden="true" />
            </button>
            <span className="pg-gallery-count" aria-live="polite">{active + 1} / {count}</span>
          </>
        )}
      </div>

      {multiple && <Thumbs className="pg-thumbs" images={images} active={active} onSelect={go} />}

      <dialog
        aria-label={`${alt} full screen images`}
        className="pg-lightbox"
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        ref={dialogRef}
      >
        {open && (
          <div className="pg-lightbox-inner">
            <div className="pg-lightbox-bar">
              <span>{alt}{multiple && <span className="pg-lightbox-count"> · {active + 1} / {count}</span>}</span>
              <div className="pg-lightbox-tools">
                <button aria-label={zoom ? "Zoom out" : "Zoom in"} onClick={() => setZoom(zoom ? null : { x: 50, y: 50 })} type="button">
                  {zoom ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
                </button>
                <button aria-label="Close full screen" onClick={close} type="button" autoFocus>
                  <X aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="pg-lightbox-stage"
              {...boxSwipe.handlers}
              // Clicking the empty area around the image closes the viewer
              onClick={(event) => { if (event.target === event.currentTarget && !boxSwipe.wasSwipe()) close(); }}
            >
              <img
                alt={multiple ? `${alt}, image ${active + 1} of ${count}` : alt}
                className={zoom ? "is-zoomed" : undefined}
                draggable={false}
                key={active}
                onClick={toggleZoom}
                src={images[active]}
                style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
              {multiple && (
                <>
                  <button aria-label="Previous image" className="pg-lightbox-arrow is-prev" onClick={prev} type="button">
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button aria-label="Next image" className="pg-lightbox-arrow is-next" onClick={next} type="button">
                    <ChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {multiple && <Thumbs className="pg-lightbox-thumbs" images={images} active={active} onSelect={go} />}
          </div>
        )}
      </dialog>
    </div>
  );
}
