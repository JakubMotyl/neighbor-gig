"use client";

import { GigTask } from "@/constants/mocks";
import { ShieldCheck, MapPin, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { GIG_CATEGORIES } from "@/constants/categories";
import { useRouter } from "next/navigation";

interface ZlecenieCardProps {
    task: GigTask;
}

export default function ZlecenieCard({ task }: ZlecenieCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/zlecenia/${task.id}`);
    };
    return (
        <article
            className="group rounded-3xl bg-surface border border-gray-100 p-5 md:p-6 flex flex-col justify-between h-full cursor-pointer hover:border-gray-300"
            onClick={handleCardClick}
        >
            <div>
                {/* 1. TOP ROW: Promowanie po lewej, Weryfikacja po prawej */}
                <div className="flex items-center justify-between gap-3 mb-3 min-h-[26px]">
                    <div className="flex items-center gap-2">
                        {task.isBoosted && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                                Promowane
                            </span>
                        )}
                    </div>

                    {/* Tarcza weryfikacji przeniesiona na prawą flankę */}
                    {task.authorVerified && (
                        <div className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-primary fill-primary/10 shrink-0" />
                            <Link
                                href="/bezpieczenstwo"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[10px] font-medium text-text-muted hover:text-primary underline transition-colors"
                            >
                                Zweryfikowany
                            </Link>
                        </div>
                    )}
                </div>

                {/* 2. TITLE: Główny nagłówek zlecenia */}
                <h3 className="text-lg font-bold text-text-main line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">
                    {task.title}
                </h3>

                {/* 3. DESCRIPTION: Od razu pod tytułem (czystszy środek karty) */}
                <p className="text-sm font-medium text-text-muted line-clamp-2 mb-5 leading-relaxed">
                    {task.description}
                </p>

                {/* 4. METADATA: Lokalizacja i termin */}
                <div className="flex sm:flex-row flex-col justify-between w-full text-xs font-semibold text-text-muted mb-5">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{task.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Zlecę od zaraz</span>
                    </div>
                </div>
            </div>

            {/* 5. FOOTER: Dane autora i ocena po lewej, budżet po prawej */}
            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between gap-3">
                {/* Profil wykonawcy: awatar, nazwa i opinie sklejone ze sobą */}
                <div className="flex items-center gap-2.5">
                    <img
                        src={task.authorAvatar}
                        alt={task.authorName}
                        className="w-8 h-8 rounded-full object-cover border border-gray-100"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-xs text-text-main leading-none mb-1">
                            {task.authorName}
                        </span>

                        {/* Gwiazdka i opinie profilu przeniesione pod imię */}
                        <div className="flex items-center gap-1 text-[11px] font-bold text-text-main leading-none">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                            <span>{task.authorRating.toFixed(1)}</span>
                            <span className="text-text-muted font-medium text-[10px]">
                                (1.2K)
                            </span>
                        </div>
                    </div>
                </div>

                {/* Cena i czas wykonania */}
                <div className="text-right">
                    <span className="text-[20px] font-black text-text-main block leading-none mb-1">
                        {task.price} PLN
                    </span>
                    <span className="text-[10px] font-medium text-text-muted block leading-none">
                        Wykonanie w 2 dni
                    </span>
                </div>
            </div>
        </article>
    );
}
