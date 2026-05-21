import React from "react";
import Link from "next/link";
import { Hammer, Heart, Truck, ArrowRight } from "lucide-react";
import { theme } from "@/styles/theme";

interface TaskCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    slug: string;
}

const POPULAR_CATEGORIES: TaskCategory[] = [
    {
        id: "1",
        title: "Dom i Naprawy",
        description: "Montaż mebli, drobne usterki, malowanie, cieknący kran",
        icon: Hammer,
        slug: "repairs",
    },
    {
        id: "2",
        title: "Opieka i Zwierzęta",
        description: "Spacer z psem, karmienie kota, opieka nad domem",
        icon: Heart,
        slug: "pets",
    },
    {
        id: "3",
        title: "Transport",
        description: "Przeprowadzki, przewóz gabarytów, wnoszenie rzeczy",
        icon: Truck,
        slug: "transport",
    },
];

export default function PopularTasks() {
    return (
        <section className={theme.layout.sectionSpacing}>
            <div className="text-center max-w-2xl mx-auto space-y-5 flex flex-col items-center">
                <span
                    className={`${theme.typography.sectionBadge} text-primary`}
                >
                    Popularne
                </span>
                <h2 className={theme.typography.sectionTitle}>
                    Zadania czekające na Ciebie
                </h2>
                <p className={theme.typography.sectionSubtitle}>
                    Wybierz interesujący Cię obszar i zobacz aktywne zlecenia od
                    sąsiadów z okolicy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {POPULAR_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.id}
                            href={`/zlecenia?category=${category.slug}`}
                            className={`${theme.components.card} hover:border-primary/20 hover:-translate-y-1`}
                        >
                            <div className="space-y-4">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-gig-hover group-hover:bg-gig group-hover:text-surface transition-colors duration-300"
                                    aria-hidden="true"
                                >
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-text-main transition-colors duration-300">
                                        {category.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-text-muted leading-relaxed">
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 flex items-center text-base font-bold text-gig-hover group-hover:text-gig gap-1 group-hover:gap-2 transition-all duration-200">
                                Przeglądaj zlecenia
                                <span className="sr-only">
                                    z kategorii - {category.title}
                                </span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
