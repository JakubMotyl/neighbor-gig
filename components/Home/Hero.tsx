import HeroMap from "./HeroMap";
import Button from "../shared/Button";

export default function Hero() {
    return (
        <main className="px-default min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-4.5rem)] flex items-center py-8 md:py-12">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 2xl:gap-16 items-center">
                {/* LEFT SIDE - TEXT */}

                <div className="flex flex-col justify-center items-start space-y-8 2xl:space-y-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-text-main leading-[1.15] tracking-tighter">
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

                    <p className="text-base md:text-lg 2xl:text-xl text-text-muted max-w-lg 2xl:max-w-xl leading-relaxed">
                        Lokalna platforma drobnych usług. Połącz się ze
                        sprawdzonymi wykonawcami z Twojego sąsiedztwa, wyceń
                        zadanie i pozbądź się codziennych obowiązków.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2 2xl:pt-4 w-full sm:w-auto">
                        <Button
                            href="/zlecenia"
                            variant="primary"
                            className="text-base md:text-lg 2xl:text-xl px-8 py-3 2xl:py-4 w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/40"
                        >
                            Znajdź pomoc
                        </Button>
                        <Button
                            href="/jak-to-dziala"
                            variant="outline"
                            className="text-base md:text-lg 2xl:text-xl px-8 py-3 2xl:py-4 w-full sm:w-auto bg-surface"
                        >
                            Jak to działa?
                        </Button>
                    </div>
                </div>

                {/* RIGHT SIDE - MAP */}
                <div>
                    <HeroMap />
                </div>
            </div>
        </main>
    );
}
