import Image from "next/image";
// Dodaliśmy ChevronRight do importów z lucide-react
import { ShieldCheck, Star, ChevronRight } from "lucide-react";
import { Task, User } from "@/lib/generated/prisma/client";
import { slugify } from "@/lib/utils";
import Link from "next/link";

export default function TaskAuthorCard({
    task,
}: {
    task: Task & { author: User };
}) {
    const authorName = task.author?.name || "Użytkownik";

    const nameSlug = slugify(authorName);
    const profileUrl = `/profil/${nameSlug}-${task.author.id}`;

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

            <Link
                href={profileUrl}
                className="group flex items-center justify-between w-full p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Przejdź do profilu użytkownika ${authorName}`}
            >
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        {task.author?.image ? (
                            <Image
                                src={task.author.image}
                                alt={`Zdjęcie profilowe użytkownika ${authorName}`}
                                width={56}
                                height={56}
                                className="rounded-full object-cover border border-gray-100 group-hover:border-primary/30 transition-colors duration-200"
                            />
                        ) : (
                            <div
                                className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xl group-hover:bg-slate-300 transition-colors duration-200"
                                aria-hidden="true"
                            >
                                {authorName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-base text-text-main group-hover:text-primary transition-colors duration-200">
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

                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-200 shrink-0 text-text-muted group-hover:text-primary">
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
            </Link>
        </section>
    );
}
