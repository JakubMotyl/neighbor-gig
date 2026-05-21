import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { theme } from "@/styles/theme";

export default function GigBoostSection() {
    return (
        <div className={`${theme.layout.gridSplit} py-12 md:py-16`}>
            {/* LEFT SIDE - IMAGE */}

            <div
                className={`${theme.components.imageWrapper} aspect-square md:aspect-video lg:aspect-square lg:order-first max-h-112.5`}
            >
                <Image
                    src="/images/gig-boost.webp"
                    alt="Zadowolony wykonawca sprawdzający nowe zlecenia na smartfonie"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* RIGHT SIDE - TEXT */}

            <div className="flex flex-col justify-center items-start space-y-5 md:space-y-6 lg:order-last">
                <div
                    className={`${theme.typography.sectionBadge} text-text-main`}
                >
                    <Zap className="w-5 h-5 fill-gig text-gig" />
                    Dla Aktywnych Wykonawców
                </div>

                <h2 className={theme.typography.sectionTitle}>
                    Zarabiaj więcej z <br />{" "}
                    <span className="text-gig">Gig-Boost</span>
                </h2>

                <p className={theme.typography.sectionSubtitle}>
                    Chcesz być pierwszy w kolejce do nowych, najlepiej płatnych
                    zadań w okolicy? Gig-Boost to opcja dla giggerów, którzy
                    chcą maksymalnie zwiększyć swoje codzienne dochody, promować
                    swoje oferty i zyskać pierwszeństwo zgłoszeń.
                </p>

                <div className="flex sm:flex-row flex-col sm:items-center items-start gap-6 pt-4">
                    <Link
                        href="/gig-boost"
                        className="sm:px-8 sm:py-3 px-6 py-2.5 bg-gig hover:bg-gig-hover text-surface text-base sm:text-[19px] font-bold sm:font-extrabold tracking-wide rounded-xl shadow-lg shadow-gig/25 hover:shadow-gig-hover/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Aktywuj teraz
                    </Link>
                    <Link
                        href="/jak-to-dziala/boost"
                        className="group flex items-center gap-1 text-sm font-bold text-text-main hover:text-gig transition-colors duration-200"
                    >
                        Dowiedz się więcej
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
