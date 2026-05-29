"use client";
import { LucideIcon, Clock, Star, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface SortTabOptions {
    id: string;
    label: string;
    icon: LucideIcon;
}

const SORT_OPTIONS: SortTabOptions[] = [
    {
        id: "latest",
        label: "Najnowsze",
        icon: Clock,
    },
    {
        id: "rating",
        label: "Najwyższa ocena",
        icon: Star,
    },
    {
        id: "verified",
        label: "Zweryfikowani",
        icon: ShieldCheck,
    },
];

export default function SortTabs() {
    const router = useRouter();
    const params = useSearchParams();
    const currentSort: string = params.get("sort") || "latest";

    const handleTabChange = (tabId: string) => {
        const existingParams = params.toString();
        const updatedParams = new URLSearchParams(existingParams);

        if (tabId === "latest") {
            updatedParams.delete("sort");
        } else {
            updatedParams.set("sort", tabId);
        }

        const queryString = updatedParams.toString();

        router.push(`/zlecenia${queryString ? `?${queryString}` : ""}`);
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-default">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {SORT_OPTIONS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentSort === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                                isActive
                                    ? "bg-primary border-primary text-white shadow-sm shadow-primary/20"
                                    : "bg-surface border-gray-100 text-text-main hover:border-gray-300 hover:bg-gray-50/50"
                            }`}
                        >
                            <Icon
                                className={`h-4 w-4 shrink-0 transition-colors ${
                                    isActive ? "text-white" : "text-text-muted"
                                }`}
                                aria-hidden="true"
                            />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
