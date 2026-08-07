import { Briefcase } from "lucide-react";
import { Task } from "@/lib/generated/prisma/client";
import { GIG_CATEGORIES } from "@/constants/categories";

interface ProfileTasksProps {
    tasks: Task[];
}

export default function ProfileTasks({ tasks }: ProfileTasksProps) {
    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-main shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-text-main">
                        Dodane zlecenia
                    </h2>
                </div>
                <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                    {tasks.length}
                </span>
            </div>

            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map((task) => {
                        const formattedJoinDate = new Date(
                            task.createdAt,
                        ).toLocaleDateString("pl-PL", {
                            month: "long",
                            year: "numeric",
                        });

                        const category = GIG_CATEGORIES.find(
                            (cat) => cat.slug === task.categorySlug,
                        );

                        const categoryDisplayName = category
                            ? category.name
                            : task.categorySlug;

                        return (
                            <div
                                className="p-4 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-4"
                                key={task.id}
                            >
                                <div>
                                    <h3 className="font-semibold text-text-main text-sm sm:text-base mb-1 whitespace-nowrap">
                                        {task.title}
                                    </h3>
                                    <span className="inline-block text-xs font-medium text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                                        {categoryDisplayName}
                                    </span>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="font-bold text-blue-600 text-sm sm:text-base block">
                                        {task.price} PLN
                                    </span>
                                    <span className="text-[11px] text-text-muted capitalize">
                                        {formattedJoinDate}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-text-muted italic">
                    Użytkownik nie dodał jeszcze żadnych zleceń.
                </p>
            )}
        </div>
    );
}
