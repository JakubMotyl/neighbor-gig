import { Briefcase } from "lucide-react";
import { Task } from "@/lib/generated/prisma/client";
import TaskListItem from "../shared/TaskListItem";

interface ProfileTasksProps {
    tasks: Task[];
}

export default function ProfileTasks({ tasks }: ProfileTasksProps) {
    return (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold text-text-main">
                        Aktywne zlecenia
                    </h2>
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                    {tasks.length}
                </span>
            </div>

            {tasks.length > 0 ? (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <TaskListItem key={task.id} task={task} />
                    ))}
                </div>
            ) : (
                <div className="w-full py-10 flex flex-col items-center justify-center text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
                    <Briefcase className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-text-muted">
                        Użytkownik nie posiada obecnie aktywnych zleceń.
                    </p>
                </div>
            )}
        </div>
    );
}
