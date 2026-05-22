import HeroMap from "./HeroMap";
import Button from "../shared/Button";
import { theme } from "@/styles/theme";
import HeroActions from "./HeroActions";

export default function Hero() {
    return (
        <main className="px-default min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.5rem)] flex items-center py-8 md:py-12">
            <div className={theme.layout.gridSplit}>
                {/* LEFT SIDE - TEXT */}
                <div className="flex flex-col justify-center items-start space-y-8 2xl:space-y-10">
                    <h1 className={theme.typography.heroTitle}>
                        Zleć to komuś z okolicy.{" "}
                        <br className="hidden lg:block" />
                        <span className="relative sm:whitespace-nowrap block sm:inline mt-2 sm:mt-0">
                            <span className="relative z-10 text-gig">
                                Odzyskaj swój czas.
                            </span>
                            <svg
                                className="absolute left-0 w-full h-3 -bottom-2 2xl:h-4 2xl:-bottom-3 text-primary"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2,8 Q50,0 98,8"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    fill="transparent"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h1>

                    <p className={theme.typography.sectionSubtitle}>
                        Lokalna platforma drobnych usług. Połącz się ze
                        sprawdzonymi wykonawcami z Twojego sąsiedztwa, wyceń
                        zadanie i pozbądź się codziennych obowiązków.
                    </p>

                    <HeroActions />
                </div>

                {/* RIGHT SIDE - MAP */}
                <div>
                    <HeroMap />
                </div>
            </div>
        </main>
    );
}
