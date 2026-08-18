"use client";

import ZlecenieCard from "./ZlecenieCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedTasks } from "@/app/actions/paginatedTasks";
import ZlecenieCardSkeleton from "../shared/ZlecenieCardSkeleton";
import { Loader2, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ZleceniaList() {
    const searchParams = useSearchParams();

    const category = searchParams.get("category") || undefined;
    const keyword = searchParams.get("keyword") || undefined;
    const sort = searchParams.get("sort") || undefined;

    // Check if user has active filters
    const hasActiveFilters = !!(category || keyword || sort);

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
            getPaginatedTasks(pageParam, 10, category, keyword, sort),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextSkip,
    });

    const allTasks = data?.pages.flatMap((page) => page.tasks) ?? [];
    const totalTasksCount = data?.pages[0]?.totalTasks ?? 0;

    if (isLoading) {
        return (
            <section className="w-full mx-auto py-4">
                <div className="mb-6 flex justify-between items-center">
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ZlecenieCardSkeleton key={index} />
                    ))}
                </div>
            </section>
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

            {allTasks.length === 0 ? (
                <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-surface border border-gray-100 rounded-3xl animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
                        <SearchX className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-text-main mb-2">
                        Brak wyników
                    </h3>
                    <p className="text-sm font-medium text-text-muted max-w-md mx-auto mb-6">
                        {sort === "verified"
                            ? "Obecnie nie ma żadnych dostępnych zleceń wyłącznie od zweryfikowanych użytkowników."
                            : "Nie znaleźliśmy żadnych zleceń spełniających Twoje kryteria. Spróbuj zmienić parametry wyszukiwania."}
                    </p>

                    {hasActiveFilters && (
                        <Link
                            href="/zlecenia"
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
                        >
                            Wyczyść filtry i pokaż wszystko
                        </Link>
                    )}
                </div>
            ) : (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    aria-busy={isFetchingNextPage}
                >
                    {allTasks.map((task) => (
                        <ZlecenieCard key={task.id} task={task} />
                    ))}
                </div>
            )}

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
                    allTasks.length > 0 &&
                    `Wyświetlono ${allTasks.length} z ${totalTasksCount} zleceń.`}
            </div>
        </section>
    );
}
