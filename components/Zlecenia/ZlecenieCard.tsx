"use client";

import { ShieldCheck, MapPin, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { slugify } from "@/lib/utils";
import { Task, User, ExecutionTime } from "@/lib/generated/prisma/client";
import { GIG_CATEGORIES } from "@/constants/categories";

interface ZlecenieCardProps {
    task: Task & {
        author: User;
        category?: { name: string };
    };
}

export const EXECUTION_TIME_LABELS: Record<ExecutionTime, string> = {
    ASAP: "Od zaraz",
    WITHIN_FEW_DAYS: "W ciągu 2-3 dni",
    THIS_WEEKEND: "W ten weekend",
    FLEXIBLE: "Termin do uzgodnienia",
};

export default function ZlecenieCard({ task }: ZlecenieCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        const taskSlug = slugify(task.title);
        router.push(`/zlecenia/${taskSlug}-${task.id}`);
    };

    const authorName = task.author?.name || "Użytkownik";

    const categoryObj = GIG_CATEGORIES.find(
        (c) => c.slug === task.categorySlug,
    );
    const categoryName = categoryObj?.name || "Usługa";

    return (
        <article
            className="group rounded-3xl bg-surface border border-gray-100 p-4 md:p-5 flex flex-col h-full cursor-pointer hover:border-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
            onClick={handleCardClick}
            role="link"
            aria-label={`Przejdź do strony zlecenia ${task.title}`}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick();
                }
            }}
        >
            <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3 mb-2.5 min-h-6">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-lg shrink-0">
                            {categoryName}
                        </span>

                        {task.isBoosted && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded-lg shrink-0">
                                Promowane
                            </span>
                        )}
                    </div>

                    {task.author?.isVerified && (
                        <div className="flex items-center gap-1 shrink-0">
                            <ShieldCheck className="w-4 h-4 text-primary fill-primary/10 shrink-0" />
                            <Link
                                href="/bezpieczenstwo"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[10px] font-medium text-text-muted hover:text-primary underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                            >
                                Zweryfikowany
                            </Link>
                        </div>
                    )}
                </div>

                <h3 className="text-base md:text-lg font-bold text-text-main line-clamp-2 wrap-break-word mb-1.5 group-hover:text-primary transition-colors leading-snug">
                    {task.title}
                </h3>

                <p className="text-sm font-medium text-text-muted line-clamp-2 wrap-break-word mb-4 leading-relaxed">
                    {task.description}
                </p>

                <div className="mt-auto flex flex-row flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-text-muted mb-4">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-30">
                            {task.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span className="shrink-0">
                            {new Date(task.createdAt).toLocaleDateString(
                                "pl-PL",
                                {
                                    day: "numeric",
                                    month: "short",
                                },
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2.5">
                    {task.author?.image ? (
                        <Image
                            src={task.author.image}
                            alt={`Avatar użytkownika ${authorName}`}
                            className="rounded-full object-cover border border-gray-100 shrink-0"
                            width={32}
                            height={32}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                            {authorName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs text-text-main leading-none mb-1 line-clamp-1 break-all">
                            {authorName}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] font-bold text-text-main leading-none">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />

                            {task.author?.ratingCount > 0 ? (
                                <>
                                    <span>{task.author.rating.toFixed(1)}</span>
                                    <span className="text-text-muted font-medium text-[10px]">
                                        ({task.author.ratingCount})
                                    </span>
                                </>
                            ) : (
                                <span className="text-text-muted font-medium text-[10px] whitespace-nowrap">
                                    Brak ocen
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-right flex flex-col items-end shrink-0 pl-2">
                    <span className="text-lg md:text-[20px] font-black text-text-main block leading-none mb-1">
                        {task.price} PLN
                    </span>
                    <span className="text-[10px] font-medium text-text-muted block leading-none text-right">
                        {EXECUTION_TIME_LABELS[task.executionTime]}
                    </span>
                </div>
            </div>
        </article>
    );
}
