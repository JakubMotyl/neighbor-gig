import Image from "next/image";
import { ShieldCheck, Star } from "lucide-react";
import { Task, User } from "@/lib/generated/prisma/client";

export default function TaskAuthorCard({
    task,
}: {
    task: Task & { author: User };
}) {
    const authorName = task.author?.name || "Użytkownik";

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
                    {task.author?.image ? (
                        <Image
                            src={task.author.image}
                            alt={`Zdjęcie profilowe użytkownika ${authorName}`}
                            width={56}
                            height={56}
                            className="rounded-full object-cover border border-gray-100"
                        />
                    ) : (
                        <div
                            className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xl"
                            aria-hidden="true"
                        >
                            {authorName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-text-main">
                                {authorName}
                            </span>

                            {task.author?.isVerified && (
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

                            {task.author?.ratingCount > 0 ? (
                                <>
                                    <span>{task.author.rating.toFixed(1)}</span>
                                    <span className="text-text-muted font-normal text-xs">
                                        ({task.author.ratingCount} ocen)
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
