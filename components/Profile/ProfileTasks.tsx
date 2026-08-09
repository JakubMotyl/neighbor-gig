import { Briefcase, ChevronRight } from "lucide-react"; // Dodałem ChevronRight dla fajnego UX!
import { Task } from "@/lib/generated/prisma/client";
import { GIG_CATEGORIES } from "@/constants/categories";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import TaskListItem from "../shared/TaskListItem";

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
                    {tasks.map((task) => (
                        <TaskListItem key={task.id} task={task} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-text-muted italic">
                    Użytkownik nie dodał jeszcze żadnych zleceń.
                </p>
            )}
        </div>
    );
}
