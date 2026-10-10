"use client";

import { useLayoutEffect } from "react";

/** Starts the page at the top when arriving from a link further down another page. */
export default function ScrollToTop() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
