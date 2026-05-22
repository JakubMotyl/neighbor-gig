"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeroActions from "./HeroActions";
import { MapPin, Star, CheckCircle, Wrench, Dog, Package, Clock, Sparkles } from "lucide-react";

interface FloatingCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const FloatingCard = ({ children, className = "", style }: FloatingCardProps) => (
    <div
        className={`absolute bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 ${className}`}
        style={style}
    >
        {children}
    </div>
);

interface TaskCardProps {
    icon: React.ElementType;
    title: string;
    price: string;
    distance: string;
    isNew?: boolean;
    className?: string;
    animationClass?: string;
}

const TaskCard = ({
    icon: Icon,
    title,
    price,
    distance,
    isNew = false,
    className = "",
    animationClass = "animate-float",
}: TaskCardProps) => (
    <FloatingCard className={`p-4 ${animationClass} ${className}`}>
        <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/30 flex items-center justify-center shrink-0 shadow-inner">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-main text-sm">{title}</span>
                    {isNew && (
                        <span className="px-2 py-0.5 bg-gig/15 text-gig text-[10px] font-bold rounded-full uppercase tracking-wide">
                            Nowe
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
                    <span className="font-bold text-community text-sm">{price}</span>
                    <span className="flex items-center gap-1 opacity-70">
                        <MapPin className="w-3 h-3" />
                        {distance}
                    </span>
                </div>
            </div>
        </div>
    </FloatingCard>
);

interface UserBubbleProps {
    name: string;
    rating: number;
    verified?: boolean;
    className?: string;
    animationClass?: string;
}

const UserBubble = ({
    name,
    rating,
    verified = false,
    className = "",
    animationClass = "animate-float-delayed",
}: UserBubbleProps) => (
    <FloatingCard className={`px-4 py-3 ${animationClass} ${className}`}>
        <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30">
                {name.charAt(0)}
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-text-main text-sm">{name}</span>
                    {verified && <CheckCircle className="w-4 h-4 text-community fill-community/20" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-text-muted">{rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    </FloatingCard>
);

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="relative min-h-[100dvh] w-full overflow-hidden">
            {/* Full-Width Map Background */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-map.webp"
                    alt="Mapa okolicy"
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover scale-110"
                    sizes="100vw"
                />
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
                {/* Radial spotlight effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(30,58,138,0.4)_100%)]" />
            </div>

            {/* Animated Background Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-cyan/20 rounded-full blur-[120px] animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gig/15 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            {/* Floating Gig Cards - Positioned around the edges */}
            <div
                className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
                {/* Top Left Card */}
                <TaskCard
                    icon={Wrench}
                    title="Montaż mebli"
                    price="80-150 zł"
                    distance="1.2 km"
                    isNew
                    className="top-24 left-4 md:top-28 md:left-8 lg:top-32 lg:left-16 xl:left-24 w-56 z-20 hidden sm:block"
                    animationClass="animate-float"
                />

                {/* Top Right Card */}
                <TaskCard
                    icon={Package}
                    title="Odbiór paczki"
                    price="20-40 zł"
                    distance="0.5 km"
                    className="top-36 right-4 md:top-40 md:right-8 lg:top-44 lg:right-16 xl:right-24 w-52 z-20 hidden md:block"
                    animationClass="animate-float-delayed"
                />

                {/* Bottom Left Card */}
                <UserBubble
                    name="Anna K."
                    rating={4.9}
                    verified
                    className="bottom-32 left-4 md:bottom-36 md:left-8 lg:bottom-40 lg:left-16 xl:left-24 z-20 hidden sm:block"
                    animationClass="animate-float-delayed"
                />

                {/* Bottom Right Card */}
                <TaskCard
                    icon={Dog}
                    title="Spacer z psem"
                    price="30-50 zł"
                    distance="0.8 km"
                    className="bottom-24 right-4 md:bottom-28 md:right-8 lg:bottom-32 lg:right-16 xl:right-24 w-52 z-20 hidden sm:block"
                    animationClass="animate-float"
                />

                {/* Extra decorative elements */}
                <Sparkles className="absolute top-20 right-1/3 w-6 h-6 text-white/30 animate-pulse hidden lg:block" />
                <Sparkles
                    className="absolute bottom-40 left-1/3 w-5 h-5 text-white/20 animate-pulse hidden lg:block"
                    style={{ animationDelay: "1.5s" }}
                />
            </div>

            {/* Center Content - Glassmorphism Container */}
            <div className="relative z-30 min-h-[100dvh] flex items-center justify-center px-4 md:px-8">
                <div
                    className={`relative w-full max-w-3xl transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                    }`}
                >
                    {/* Main Glass Card */}
                    <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)]">
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8">
                            {/* Badge */}
                            <div
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl transition-all duration-700 delay-200 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                                }`}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-community opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-community"></span>
                                </span>
                                <span className="text-sm font-medium text-white/90">
                                    Lokalna platforma zaufanych usług
                                </span>
                            </div>

                            {/* Headline */}
                            <h1
                                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight transition-all duration-700 delay-300 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                            >
                                <span className="text-balance">
                                    Zleć to komuś
                                    <br />
                                    z okolicy.
                                </span>
                                <br />
                                <span className="relative inline-block mt-2">
                                    <span className="bg-gradient-to-r from-gig-light via-gig to-amber-400 bg-clip-text text-transparent">
                                        Odzyskaj swój czas.
                                    </span>
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p
                                className={`text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-xl transition-all duration-700 delay-400 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                            >
                                Połącz się ze sprawdzonymi wykonawcami z Twojego sąsiedztwa, wyceń zadanie i
                                pozbądź się codziennych obowiązków.
                            </p>

                            {/* CTA Buttons */}
                            <div
                                className={`transition-all duration-700 delay-500 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                            >
                                <HeroActions variant="glass" />
                            </div>

                            {/* Trust Indicators */}
                            <div
                                className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-4 transition-all duration-700 delay-700 ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/30 flex items-center justify-center text-xs font-bold text-white backdrop-blur-sm"
                                        >
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm text-white/70">
                                    <span className="font-bold text-white">2,500+</span> wykonawców w Twojej
                                    okolicy
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Activity Indicator - Below the glass card */}
                    <div
                        className={`flex justify-center mt-6 transition-all duration-700 delay-700 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-community opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-community"></span>
                            </span>
                            <span className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>12 aktywnych zleceń w okolicy</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        </main>
    );
}
