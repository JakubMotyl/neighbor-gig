import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Task } from "@/lib/generated/prisma/client";
import { GIG_CATEGORIES } from "@/constants/categories";
import { slugify } from "@/lib/utils";

interface TaskListItemProps {
    task: Task;
}

export default function TaskListItem({ task }: TaskListItemProps) {
    // Formatted Data
    const formattedJoinDate = new Date(task.createdAt).toLocaleDateString(
        "pl-PL",
        {
            month: "long",
            year: "numeric",
        },
    );

    // Category
    const category = GIG_CATEGORIES.find(
        (cat) => cat.slug === task.categorySlug,
    );
    const categoryDisplayName = category ? category.name : task.categorySlug;

    // Custom slug
    const taskSlug = slugify(task.title);
    const taskUrl = `/zlecenia/${taskSlug}-${task.id}`;

    return (
        <Link
            href={taskUrl}
            className="group p-4 rounded-2xl border border-slate-100 hover:border-primary/30 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
            <div>
                <h3 className="font-semibold text-text-main group-hover:text-primary transition-colors text-sm sm:text-base mb-1 whitespace-nowrap">
                    {task.title}
                </h3>
                <span className="inline-block text-xs font-medium text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 group-hover:border-primary/20 transition-colors">
                    {categoryDisplayName}
                </span>
            </div>
            <div className="text-right shrink-0 flex items-center gap-3">
                <div>
                    <span className="font-bold text-blue-600 text-sm sm:text-base block">
                        {task.price} PLN
                    </span>
                    <span className="text-[11px] text-text-muted capitalize">
                        {formattedJoinDate}
                    </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-all duration-200 group-hover:translate-x-1 hidden sm:block" />
            </div>
        </Link>
    );
}
