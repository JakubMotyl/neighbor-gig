"use client";

import { ShieldCheck, MapPin, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { slugify } from "@/lib/utils";
import { Task, User, ExecutionTime } from "@/lib/generated/prisma/client";

interface ZlecenieCardProps {
    task: Task & { author: User };
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

    return (
        <article
            className="group rounded-3xl bg-surface border border-gray-100 p-5 md:p-6 flex flex-col justify-between h-full cursor-pointer hover:border-gray-300"
            onClick={handleCardClick}
            role="link"
            aria-label={`Przejdź do strony zlecenia ${task.title}`}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleCardClick();
                }
            }}
        >
            <div>
                <div className="flex items-center justify-between gap-3 mb-3 min-h-6.5">
                    <div className="flex items-center gap-2">
                        {task.isBoosted && (
                            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                                Promowane
                            </span>
                        )}
                    </div>

                    {task.author?.isVerified && (
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

                <h3 className="text-lg font-bold text-text-main line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">
                    {task.title}
                </h3>

                <p className="text-sm font-medium text-text-muted line-clamp-2 mb-5 leading-relaxed">
                    {task.description}
                </p>

                <div className="flex sm:flex-row flex-col justify-between w-full text-xs font-semibold text-text-muted mb-5">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">{task.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
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

            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    {task.author?.image ? (
                        <Image
                            src={task.author.image}
                            alt={authorName}
                            className="rounded-full object-cover border border-gray-100"
                            width={32}
                            height={32}
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                            {authorName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-bold text-xs text-text-main leading-none mb-1">
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
                                <span className="text-text-muted font-medium text-[10px]">
                                    Brak ocen
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-[20px] font-black text-text-main block leading-none mb-1">
                        {task.price} PLN
                    </span>
                    <span className="text-[10px] font-medium text-text-muted block leading-none">
                        {EXECUTION_TIME_LABELS[task.executionTime]}
                    </span>
                </div>
            </div>
        </article>
    );
}
