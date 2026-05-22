"use client";
import Button from "../shared/Button";
import { ArrowRight, Play } from "lucide-react";

export default function HeroActions() {
    const scrollToHowItWorks = () => {
        const element = document.getElementById("jak-to-dziala");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 pt-4 2xl:pt-6 w-full sm:w-auto">
            <Button
                href="/zlecenia"
                variant="primary"
                className="group text-base md:text-lg 2xl:text-xl px-8 py-4 2xl:py-5 w-full sm:w-auto shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 relative overflow-hidden"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    Znajdź pomoc
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>

            <button
                onClick={scrollToHowItWorks}
                className="group inline-flex items-center justify-center gap-3 text-base md:text-lg 2xl:text-xl px-8 py-4 2xl:py-5 w-full sm:w-auto rounded-md font-medium text-text-main bg-surface border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Play className="w-4 h-4 text-primary fill-primary/30" />
                </span>
                Jak to działa?
            </button>
        </div>
    );
}
