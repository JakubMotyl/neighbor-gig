export default function ZlecenieCardSkeleton() {
    return (
        <div className="rounded-3xl bg-surface border border-gray-100 p-4 md:p-5 flex flex-col h-full animate-pulse">
            <div className="flex flex-col flex-1">
                {/* Badge Skeleton */}
                <div className="flex items-center justify-between mb-3">
                    <div className="h-5 w-20 bg-gray-200 rounded-lg" />
                    <div className="h-4 w-16 bg-gray-100 rounded" />
                </div>

                {/* Title Skeleton */}
                <div className="h-5 bg-gray-200 rounded-md w-4/5 mb-2" />
                <div className="h-5 bg-gray-200 rounded-md w-2/3 mb-4" />

                {/* Description Skeleton */}
                <div className="space-y-1.5 mb-6">
                    <div className="h-3.5 bg-gray-100 rounded w-full" />
                    <div className="h-3.5 bg-gray-100 rounded w-5/6" />
                </div>

                {/* Meta info (Location, Date) */}
                <div className="mt-auto flex items-center gap-4 mb-4">
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                </div>
            </div>

            {/* Footer / Author & Price */}
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                    <div className="space-y-1">
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                        <div className="h-2.5 w-12 bg-gray-100 rounded" />
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                    <div className="h-5 w-16 bg-gray-200 rounded" />
                    <div className="h-2.5 w-10 bg-gray-100 rounded" />
                </div>
            </div>
        </div>
    );
}
