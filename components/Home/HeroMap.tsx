import React from "react";
import Image from "next/image";

export default function HeroMap() {
    return (
        <div className="relative w-full aspect-square lg:max-h-125 rounded-3xl overflow-hidden shadow-2xl border border-primary/25 select-none">
            <Image
                src="/images/hero-map.png"
                alt="Mapa okolicy z przykładowymi zleceniami sąsiedzkimi"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    );
}
