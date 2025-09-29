"use client";
import { useEffect, useRef } from "react";

export default function ScrollEffects({ children }) {
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main > section, main > footer"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in-view");
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((s) => observer.observe(s));

    let scrollTimeout;
    const snapToSection = (e) => {
      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const mid = window.scrollY + window.innerHeight / 2;
      const idx = Math.max(
        0,
        sections.findIndex((s) => s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid)
      );
      const next = Math.min(Math.max(idx + direction, 0), sections.length - 1);

      isScrollingRef.current = true;
      sections[next].scrollIntoView({ behavior: "smooth", block: "start" });

      const checkScrollEnd = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      };
      window.addEventListener("scroll", checkScrollEnd, { once: true });
      e.preventDefault();
    };

    const navByKey = (e) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
      const mid = window.scrollY + window.innerHeight / 2;
      const idx = Math.max(
        0,
        sections.findIndex((s) => s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid)
      );
      let next = idx;
      if (e.key === "ArrowDown" || e.key === "PageDown") next = Math.min(idx + 1, sections.length - 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") next = Math.max(idx - 1, 0);
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = sections.length - 1;
      sections[next].scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("wheel", snapToSection, { passive: false });
    window.addEventListener("keydown", navByKey);

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", snapToSection);
      window.removeEventListener("keydown", navByKey);
    };
  }, []);

  return children;
}
