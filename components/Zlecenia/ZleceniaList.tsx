"use client";

import { GigTask } from "@/constants/mocks";
import ZlecenieCard from "./ZlecenieCard";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface ZleceniaListProps {
    mock: GigTask[];
}

export default function ZleceniaList({ mock }: ZleceniaListProps) {
    const params = useSearchParams();
    const sort = params.get("sort") || "latest";
    const keyword = params.get("keyword") || "";
    const category = params.get("category") || "";

    const processedTasks = useMemo(() => {
        return mock
            .filter((task) => {
                const matchesKeyword = task.title
                    .toLocaleLowerCase()
                    .includes(keyword.toLocaleLowerCase());
                const matchesCategory = category
                    ? task.categorySlug === category
                    : true;

                const isVerified =
                    sort === "verified" ? task.authorVerified : true;
                return matchesKeyword && matchesCategory && isVerified;
            })
            .sort((a, b) => {
                if (a.isBoosted && !b.isBoosted) return -1;
                if (!a.isBoosted && b.isBoosted) return 1;
                if (sort === "latest") {
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                } else if (sort === "rating") {
                    return b.authorRating - a.authorRating;
                }
                return 0;
            });
    }, [mock, sort, keyword, category]);

    return (
        <section className="w-full mx-auto py-4">
            <div className="mb-6 flex justify-between items-center text-sm font-semibold text-text-muted">
                <span>Dostępne zlecenia ({processedTasks.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedTasks.map((task) => (
                    <ZlecenieCard key={task.id} task={task} />
                ))}
            </div>
        </section>
    );
}
