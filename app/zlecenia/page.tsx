import { Suspense } from "react";
import ZleceniaSearch from "@/components/Zlecenia/ZleceniaSearch";
import { theme } from "@/styles/theme";
import SortTabs from "@/components/Zlecenia/SortTabs";
import ZleceniaList from "@/components/Zlecenia/ZleceniaList";
import { Toast } from "@/components/auth/Toast";
import ZlecenieCardSkeleton from "@/components/shared/ZlecenieCardSkeleton";

function ZleceniaListFallback() {
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

export default async function Zlecenia({
    searchParams,
}: {
    searchParams: Promise<{ error: string; success: string }>;
}) {
    const resolvedSearchParams = await searchParams;

    return (
        <>
            <main
                className={`${theme.layout.sectionSpacing} flex flex-col flex-1`}
            >
                <Suspense
                    fallback={
                        <div className="h-20 animate-pulse bg-gray-100 rounded-3xl max-w-5xl mx-auto" />
                    }
                >
                    <ZleceniaSearch />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="h-12 animate-pulse bg-gray-50 rounded-2xl max-w-5xl mx-auto" />
                    }
                >
                    <SortTabs />
                </Suspense>
                <Suspense fallback={<ZleceniaListFallback />}>
                    <ZleceniaList />
                </Suspense>
            </main>
            <Toast
                errorType={resolvedSearchParams.error}
                successType={resolvedSearchParams.success}
            />
        </>
    );
}
