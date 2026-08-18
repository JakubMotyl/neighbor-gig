import { MapPin, Calendar, Clock, Tag } from "lucide-react";
import { Task } from "@/lib/generated/prisma/client";
import { EXECUTION_TIME_LABELS } from "./ZlecenieCard";
import { GIG_CATEGORIES } from "@/constants/categories";

export default function TaskHeader({ task }: { task: Task }) {
    const categoryObj = GIG_CATEGORIES.find(
        (c) => c.slug === task.categorySlug,
    );
    const categoryName = categoryObj?.name || "Usługa";
    return (
        <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                {task.isBoosted && (
                    <span className="text-xs uppercase tracking-wider font-extrabold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-xl">
                        Promowane
                    </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-text-muted bg-gray-100 px-3 py-1 rounded-xl">
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="uppercase">{categoryName}</span>
                </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-main leading-tight wrap-break-word">
                {task.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-text-muted border-b border-gray-100 pb-6">
                <div className="flex items-center gap-1.5">
                    <MapPin
                        className="w-4 h-4 text-primary shrink-0"
                        aria-hidden="true"
                    />
                    <span>{task.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Calendar
                        className="w-4 h-4 text-primary shrink-0"
                        aria-hidden="true"
                    />
                    <time dateTime={task.createdAt.toISOString()}>
                        {new Date(task.createdAt).toLocaleDateString("pl-PL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </time>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock
                        className="w-4 h-4 text-primary shrink-0"
                        aria-hidden="true"
                    />
                    <span>{EXECUTION_TIME_LABELS[task.executionTime]}</span>
                </div>
            </div>
        </header>
    );
}
