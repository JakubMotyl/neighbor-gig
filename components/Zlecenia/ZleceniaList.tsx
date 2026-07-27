"use client";

import ZlecenieCard from "./ZlecenieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedTasks } from "@/app/actions/tasks";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ZleceniaList() {
    const searchParams = useSearchParams();

    const category = searchParams.get("category") || undefined;
    const keyword = searchParams.get("keyword") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ["zlecenia", category, keyword, sort],
        queryFn: ({ pageParam = 0 }) =>
            getPaginatedTasks(pageParam, 6, category, keyword, sort),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextSkip,
    });

    const allTasks = data?.pages.flatMap((page) => page.tasks) ?? [];
    const totalTasksCount = data?.pages[0]?.totalTasks ?? 0;

    if (isLoading) {
        return (
            <div
                className="w-full py-12 flex justify-center items-center text-text-muted"
                role="status"
                aria-live="polite"
            >
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Ładowanie zleceń...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full py-8 text-center text-red-500" role="alert">
                Wystąpił błąd podczas pobierania zleceń. Spróbuj odświeżyć
                stronę.
            </div>
        );
    }

    return (
        <section className="w-full mx-auto py-4">
            <div className="mb-6 flex justify-between items-center text-sm font-semibold text-text-muted">
                <h2>Dostępne zlecenia ({totalTasksCount})</h2>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                aria-busy={isFetchingNextPage}
            >
                {allTasks.map((task) => (
                    <ZlecenieCard key={task.id} task={task} />
                ))}
            </div>
            {hasNextPage && (
                <div className="mt-10 flex justify-center">
                    <button
                        type="button"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        aria-label="Załaduj więcej zleceń z bazy"
                        className="px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-semibold text-sm text-text-main shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <Loader2
                                    className="w-4 h-4 animate-spin"
                                    aria-hidden="true"
                                />
                                <span>Ładowanie...</span>
                            </>
                        ) : (
                            <span>Załaduj więcej zleceń</span>
                        )}
                    </button>
                </div>
            )}
            <div className="sr-only" role="status" aria-live="polite">
                {isFetchingNextPage && "Wczytywanie kolejnych zleceń..."}
                {!isFetchingNextPage &&
                    `Wyświetlono ${allTasks.length} z ${totalTasksCount} zleceń.`}
            </div>
        </section>
    );
}
