"use client";
import Image from "next/image";
import { MapPin, Star, Clock, CheckCircle, Wrench, Sparkles, Dog, Package } from "lucide-react";

const FloatingCard = ({ 
    children, 
    className = "", 
    delay = 0 
}: { 
    children: React.ReactNode; 
    className?: string;
    delay?: number;
}) => (
    <div 
        className={`absolute bg-surface/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 ${className}`}
        style={{ 
            animationDelay: `${delay}s`,
        }}
    >
        {children}
    </div>
);

const TaskCard = ({ 
    icon: Icon, 
    title, 
    price, 
    distance, 
    isNew = false,
    className = "",
    delay = 0
}: { 
    icon: React.ElementType;
    title: string; 
    price: string; 
    distance: string;
    isNew?: boolean;
    className?: string;
    delay?: number;
}) => (
    <FloatingCard className={`p-4 animate-float ${className}`} delay={delay}>
        <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-main text-sm truncate">{title}</span>
                    {isNew && (
                        <span className="px-2 py-0.5 bg-gig/10 text-gig text-xs font-bold rounded-full shrink-0">
                            NOWE
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span className="font-bold text-community">{price}</span>
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {distance}
                    </span>
                </div>
            </div>
        </div>
    </FloatingCard>
);

const UserBubble = ({ 
    name, 
    rating, 
    verified = false,
    className = "",
    delay = 0
}: { 
    name: string; 
    rating: number;
    verified?: boolean;
    className?: string;
    delay?: number;
}) => (
    <FloatingCard className={`px-4 py-3 animate-float-delayed ${className}`} delay={delay}>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
                {name.charAt(0)}
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-text-main text-sm">{name}</span>
                    {verified && <CheckCircle className="w-4 h-4 text-community fill-community/20" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-text-muted">{rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    </FloatingCard>
);

const StatBubble = ({ 
    value, 
    label,
    className = "",
    delay = 0
}: { 
    value: string; 
    label: string;
    className?: string;
    delay?: number;
}) => (
    <FloatingCard className={`px-5 py-4 animate-float ${className}`} delay={delay}>
        <div className="text-center">
            <div className="text-2xl font-extrabold text-primary">{value}</div>
            <div className="text-xs text-text-muted mt-0.5">{label}</div>
        </div>
    </FloatingCard>
);

export default function HeroVisual() {
    return (
        <div className="relative w-full aspect-square lg:aspect-[4/5] max-h-[600px] 2xl:max-h-[700px]">
            {/* Main Map Container */}
            <div className="absolute inset-8 md:inset-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 animate-glow">
                <Image
                    src="/images/hero-map.webp"
                    alt="Mapa okolicy z przykładowymi zleceniami sąsiedzkimi"
                    fill
                    priority
                    fetchPriority="high"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Map overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
                
                {/* Location Pins on Map */}
                <div className="absolute top-1/4 left-1/3 animate-pulse-ring">
                    <div className="w-4 h-4 bg-gig rounded-full shadow-lg shadow-gig/50" />
                </div>
                <div className="absolute top-1/2 right-1/4 animate-pulse-ring" style={{ animationDelay: '0.5s' }}>
                    <div className="w-3 h-3 bg-community rounded-full shadow-lg shadow-community/50" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 animate-pulse-ring" style={{ animationDelay: '1s' }}>
                    <div className="w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
                </div>
            </div>

            {/* Floating Task Cards */}
            <TaskCard
                icon={Wrench}
                title="Montaż mebli"
                price="80 - 150 zł"
                distance="1.2 km"
                isNew
                className="top-0 left-0 md:-left-4 w-52 md:w-56 z-20"
                delay={0}
            />
            
            <TaskCard
                icon={Dog}
                title="Spacer z psem"
                price="30 - 50 zł"
                distance="0.8 km"
                className="bottom-4 md:bottom-8 right-0 md:-right-4 w-48 md:w-52 z-20"
                delay={0.3}
            />

            <TaskCard
                icon={Package}
                title="Odbiór paczki"
                price="20 - 40 zł"
                distance="0.5 km"
                className="top-1/3 -right-2 md:-right-6 w-48 md:w-52 z-20 hidden sm:block"
                delay={0.6}
            />

            {/* User Bubbles */}
            <UserBubble
                name="Anna K."
                rating={4.9}
                verified
                className="bottom-1/4 -left-2 md:-left-6 z-20"
                delay={0.2}
            />

            {/* Stats Bubble */}
            <StatBubble
                value="98%"
                label="zadowolonych"
                className="top-1/4 -right-2 md:-right-8 z-20"
                delay={0.4}
            />

            {/* Live Activity Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 px-4 py-2 bg-surface/95 backdrop-blur-xl rounded-full shadow-xl border border-gray-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-community opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-community"></span>
                    </span>
                    <span className="text-xs font-medium text-text-muted flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>12 aktywnych zleceń w okolicy</span>
                    </span>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 right-1/4 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 left-1/4 w-24 h-24 bg-gig/5 rounded-full blur-2xl" />
            
            {/* Sparkle decorations */}
            <Sparkles className="absolute top-8 right-8 w-5 h-5 text-primary/30 animate-pulse" />
            <Sparkles className="absolute bottom-16 left-8 w-4 h-4 text-gig/30 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
    );
}
