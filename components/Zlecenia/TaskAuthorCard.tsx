import Image from "next/image";
import { ShieldCheck, Star } from "lucide-react";
import { Task } from "@/lib/generated/prisma/client";

export default function TaskAuthorCard({ task }: { task: Task }) {
    return (
        <section
            aria-labelledby="author-heading"
            className="p-6 rounded-3xl bg-surface border border-gray-100 space-y-4"
        >
            <h2
                id="author-heading"
                className="text-lg font-bold text-text-main"
            >
                Zleceniodawca
            </h2>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    {task.authorAvatar ? (
                        <Image
                            src={task.authorAvatar}
                            alt={`Zdjęcie profilowe użytkownika ${task.authorName}`}
                            width={56}
                            height={56}
                            className="rounded-full object-cover border border-gray-100"
                        />
                    ) : (
                        <div
                            className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xl"
                            aria-hidden="true"
                        >
                            {task.authorName.charAt(0)}
                        </div>
                    )}

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-text-main">
                                {task.authorName}
                            </span>
                            {task.authorVerified && (
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg">
                                    <ShieldCheck
                                        className="w-3.5 h-3.5"
                                        aria-hidden="true"
                                    />
                                    <span>Zweryfikowany</span>
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 text-sm font-semibold text-text-main">
                            <Star
                                className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0"
                                aria-hidden="true"
                            />
                            {task.authorRatingCount > 0 ? (
                                <>
                                    <span>{task.authorRating.toFixed(1)}</span>
                                    <span className="text-text-muted font-normal text-xs">
                                        ({task.authorRatingCount} ocen)
                                    </span>
                                </>
                            ) : (
                                <span className="text-text-muted font-normal text-xs">
                                    Brak ocen
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
