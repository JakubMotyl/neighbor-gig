"use client";
import { useEffect, useState } from "react";
import HeroVisual from "./HeroVisual";
import HeroActions from "./HeroActions";

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="px-default min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.5rem)] flex items-center py-8 md:py-12 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Primary gradient orb */}
                <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                {/* Gig accent orb */}
                <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-gig/5 rounded-full blur-3xl" />
                {/* Subtle grid pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #1e3a8a 1px, transparent 1px),
                            linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 2xl:gap-20 items-center relative z-10">
                {/* LEFT SIDE - TEXT */}
                <div 
                    className={`flex flex-col justify-center items-start space-y-6 2xl:space-y-8 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-community opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-community"></span>
                        </span>
                        <span className="text-sm font-medium text-primary">Lokalna platforma zaufanych usług</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold text-text-main leading-[1.1] tracking-tight">
                        Zleć to komuś{" "}
                        <br className="hidden sm:block" />
                        <span className="text-text-main">z okolicy.</span>{" "}
                        <br className="hidden lg:block" />
                        <span className="relative inline-block mt-2">
                            <span className="relative z-10 bg-gradient-to-r from-gig to-gig-light bg-clip-text text-transparent">
                                Odzyskaj swój czas.
                            </span>
                            <svg
                                className="absolute left-0 w-full h-3 -bottom-1 2xl:h-4 2xl:-bottom-2"
                                viewBox="0 0 200 12"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2,8 Q50,2 100,8 T198,8"
                                    stroke="url(#underline-gradient)"
                                    strokeWidth="3"
                                    fill="transparent"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#1e3a8a" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl 2xl:text-2xl text-text-muted leading-relaxed max-w-xl">
                        Połącz się ze sprawdzonymi wykonawcami z Twojego sąsiedztwa, 
                        wyceń zadanie i pozbądź się codziennych obowiązków.
                    </p>

                    <HeroActions />

                    {/* Trust Indicators */}
                    <div 
                        className={`flex items-center gap-6 pt-4 transition-all duration-1000 delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-surface flex items-center justify-center text-xs font-bold text-primary"
                                >
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-text-muted">
                            <span className="font-bold text-text-main">2,500+</span> wykonawców w Twojej okolicy
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - VISUAL COMPOSITION */}
                <div 
                    className={`transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                >
                    <HeroVisual />
                </div>
            </div>
        </main>
    );
}
