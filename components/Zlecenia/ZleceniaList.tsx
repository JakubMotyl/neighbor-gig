"use client";

import { GigTask } from "@/constants/mocks";
import ZlecenieCard from "./ZlecenieCard";

interface ZleceniaListProps {
    mock: GigTask[];
}

export default function ZleceniaList({ mock }: ZleceniaListProps) {
    // Miejsce na Twoją logikę filtrowania:
    // const filteredTasks = mock.filter(...)

    return (
        <section className="w-full mx-auto px-default py-4">
            <div className="mb-6 flex justify-between items-center text-sm font-semibold text-text-muted">
                <span>Dostępne zlecenia ({mock.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mock.map((task) => (
                    <ZlecenieCard key={task.id} task={task} />
                ))}
            </div>
        </section>
    );
}
