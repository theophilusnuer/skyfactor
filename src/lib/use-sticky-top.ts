"use client";

import { useEffect, useRef, useState } from "react";

// Pins a section by its bottom edge when it is taller than the viewport, so
// the whole section is seen before the next one slides up over it.
export function useStickyTop<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, top };
}
