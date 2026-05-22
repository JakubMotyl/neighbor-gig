import Image from "next/image";
import { theme } from "@/styles/theme";

export default function HeroMap() {
    return (
        <div
            className={`${theme.components.imageWrapper} aspect-square lg:max-h-125 border-primary/25`}
        >
            <Image
                src="/images/hero-map.webp"
                alt="Mapa okolicy z przykładowymi zleceniami sąsiedzkimi"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    );
}
