import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Task } from "@/lib/generated/prisma/client";
import TaskListItem from "@/components/shared/TaskListItem";

interface DashboardTasksProps {
    tasks: Task[];
}

export default function DashboardTasks({ tasks }: DashboardTasksProps) {
    return (
        <section
            aria-labelledby="tasks-heading"
            className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-full"
        >
            <div className="flex items-center justify-between mb-6">
                <h2
                    id="tasks-heading"
                    className="text-lg font-bold text-text-main flex items-center gap-2"
                >
                    <Briefcase className="w-5 h-5 text-primary" /> Moje zlecenia
                </h2>
                <Link
                    href="/dodaj-zlecenie"
                    className="text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl transition-colors"
                >
                    + Nowe
                </Link>
            </div>

            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskListItem key={task.id} task={task} />
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50 p-6">
                    <p className="text-sm text-text-muted font-medium">
                        Brak aktywnych zleceń. Dodaj swoje pierwsze zadanie!
                    </p>
                </div>
            )}
        </section>
    );
}
