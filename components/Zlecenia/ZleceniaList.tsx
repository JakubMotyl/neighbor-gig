"use client";

import { Task } from "@/lib/generated/prisma/client";
import ZlecenieCard from "./ZlecenieCard";

interface ZleceniaListProps {
    tasks: Task[];
}

export default function ZleceniaList({ tasks }: ZleceniaListProps) {
    return (
        <section className="w-full mx-auto py-4">
            <div className="mb-6 flex justify-between items-center text-sm font-semibold text-text-muted">
                <span>Dostępne zlecenia ({tasks.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <ZlecenieCard key={task.id} task={task} />
                ))}
            </div>
        </section>
    );
}
