"use client";

import { useEffect, useRef } from "react";

function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export default function ScrollEffects({ children }) {
  const ioRef = useRef(null);
  const observedRef = useRef(new Set());
  const mutationRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const createObserver = (main) => {
      if (!main) return;

      if (ioRef.current) {
        try { ioRef.current.disconnect(); } catch (e) {}
      }
      observedRef.current = new Set();

      ioRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("is-in-view");
          });
        },
        { threshold: 0.25 }
      );

      const syncObserved = () => {
        const nodes = Array.from(main.querySelectorAll("section, footer, [data-section]"));
        // observe new nodes
        nodes.forEach((node) => {
          if (!observedRef.current.has(node)) {
            try {
              ioRef.current.observe(node);
              observedRef.current.add(node);
            } catch (e) {}
          }
        });
        // unobserve removed nodes
        Array.from(observedRef.current).forEach((node) => {
          if (!document.contains(node)) {
            try {
              ioRef.current.unobserve(node);
            } catch (e) {}
            observedRef.current.delete(node);
          }
        });
      };

      syncObserved();

      // watch for DOM changes inside <main> so newly-mounted lazy sections are picked up
      mutationRef.current = new MutationObserver(debounce(syncObserved, 100));
      mutationRef.current.observe(main, { childList: true, subtree: true });
    };

    const waitForMain = () => {
      const main = document.querySelector("main");
      if (!main && !cancelled) {
        requestAnimationFrame(waitForMain);
      } else if (main && !cancelled) {
        createObserver(main);
      }
    };
    waitForMain();

    const navByKey = (e) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
      const main = document.querySelector("main");
      if (!main) return;
      const viewportSections = Array.from(main.querySelectorAll("section, footer, [data-section]"));
      if (!viewportSections.length) return;

      const mid = window.scrollY + window.innerHeight / 2;
      const idx = Math.max(
        0,
        viewportSections.findIndex((s) => s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid)
      );

      let next = idx;
      if (e.key === "ArrowDown" || e.key === "PageDown") next = Math.min(idx + 1, viewportSections.length - 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") next = Math.max(idx - 1, 0);
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = viewportSections.length - 1;

      viewportSections[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", navByKey);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", navByKey);
      if (ioRef.current) try { ioRef.current.disconnect(); } catch (e) {}
      if (mutationRef.current) mutationRef.current.disconnect();
    };
  }, []);

  return children;
}
