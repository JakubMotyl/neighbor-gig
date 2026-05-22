"use client";

import { useEffect } from "react";

// Manages smooth scrolling based on URL search params without deoptimizing SSR
export default function ScrollHandler() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const scrollToId = params.get("scroll");

            if (scrollToId) {
                const element = document.getElementById(scrollToId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    // Cleans up the URL to maintain a clean browser history state
                    window.history.replaceState(null, "", "/");
                }
            }
        }
    }, []);

    return null;
}
