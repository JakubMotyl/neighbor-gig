import { theme } from "@/styles/theme";
import HomeSearch from "./HeroSearch";

export default function Hero() {
    return (
        <main className="relative px-default min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.5rem)] flex items-center justify-center py-24 md:py-32 lg:py-40">
            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center gap-10 md:gap-12 lg:gap-14">
                <div className="flex flex-col items-center gap-5 md:gap-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-text-main leading-[1.15] tracking-tight text-center max-w-2xl">
                        Zleć to komuś z okolicy. Odzyskaj swój czas.
                    </h1>

                    <p
                        className={`${theme.typography.sectionSubtitle} tracking-tight text-center max-w-xl mx-auto`}
                    >
                        Lokalna platforma drobnych usług. Połącz się ze
                        sprawdzonymi wykonawcami z Twojego sąsiedztwa, wyceń
                        zadanie i pozbądź się codziennych obowiązków.
                    </p>
                </div>

                <HomeSearch />
            </div>
        </main>
    );
}
