"use client";

import { GIG_CATEGORIES } from "@/constants/categories";
import Button from "@/components/shared/Button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ZleceniaSearch() {
    const params = useSearchParams();
    const router = useRouter();
    const [isListOpen, setIsListOpen] = useState(false);
    const [keyword, setKeyword] = useState<string>(
        () => params.get("keyword") || "",
    );
    const [selectedCategory, setSelectedCategory] = useState<string>(() => {
        return params.get("category") || "";
    });

    useEffect(() => {
        setSelectedCategory(params.get("category") || "");
        setKeyword(params.get("keyword") || "");
    }, [params]);

    const handleSelect = (category: string) => {
        setSelectedCategory(category);
        setIsListOpen(false);
    };

    const handleSearchSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsListOpen(false);

        const newParams = new URLSearchParams(params.toString());
        const trimmedKeyword = keyword.trim();

        if (trimmedKeyword) {
            newParams.set("keyword", trimmedKeyword);
        } else {
            newParams.delete("keyword");
        }

        if (selectedCategory) {
            newParams.set("category", selectedCategory);
        } else {
            newParams.delete("category");
        }

        const queryString = newParams.toString();
        router.push(queryString ? `/zlecenia?${queryString}` : "/zlecenia");
    };

    const currentCategoryObj = GIG_CATEGORIES.find(
        (el) => el.slug === selectedCategory,
    );
    const displayLabel = currentCategoryObj
        ? currentCategoryObj.name
        : "Wszystkie kategorie";

    return (
        <section>
            <div className="w-full max-w-5xl mx-auto">
                <div className="rounded-3xl bg-surface shadow-sm border border-gray-100">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="flex flex-col md:flex-row md:items-stretch divide-y divide-gray-100 md:divide-y-0 md:divide-x border-gray-100"
                        aria-label="Wyszukaj usługi"
                    >
                        <div className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 md:min-w-65 relative">
                            <button
                                type="button"
                                onClick={() => setIsListOpen((prev) => !prev)}
                                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-surface px-1 py-1 transition-colors text-left cursor-pointer"
                            >
                                <span className="text-base font-semibold text-text-main">
                                    {displayLabel}
                                </span>
                                <ChevronDown
                                    className={`h-5 w-5 text-text-muted transition-transform duration-200 ${
                                        isListOpen ? "rotate-180" : ""
                                    }`}
                                    aria-hidden="true"
                                />
                            </button>
                            {isListOpen && (
                                <div className="absolute top-full left-4 right-4 md:left-5 md:right-5 z-50 mt-2 rounded-2xl bg-surface shadow-xl border border-gray-100 p-2 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                                    <button
                                        type="button"
                                        onClick={() => handleSelect("")}
                                        className={`w-full text-left rounded-xl px-3 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                                            selectedCategory === ""
                                                ? "bg-primary/10 text-primary"
                                                : "text-text-main hover:bg-primary/5"
                                        }`}
                                    >
                                        Wszystkie kategorie
                                    </button>
                                    {GIG_CATEGORIES.map((category) => {
                                        const Icon = category.icon;
                                        const isSelected =
                                            selectedCategory === category.slug;
                                        return (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() =>
                                                    handleSelect(category.slug)
                                                }
                                                className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                                                    isSelected
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-text-main hover:bg-primary/5"
                                                }`}
                                            >
                                                <Icon
                                                    className="h-4 w-4 shrink-0"
                                                    aria-hidden="true"
                                                />
                                                <span>{category.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 flex-1">
                            <label htmlFor="keyword" className="sr-only">
                                Szukaj po tytule
                            </label>
                            <input
                                id="keyword"
                                name="keyword"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Czego szukasz?"
                                className="w-full bg-transparent text-base md:text-lg font-semibold text-text-main outline-none placeholder:text-text-muted/70 placeholder:font-normal focus-visible:outline-none"
                            />
                        </div>
                        <div className="px-4 py-3 md:px-5 md:py-4 flex items-center md:min-w-40">
                            <Button
                                type="submit"
                                variant="primary"
                                className="hover:translate-y-0! w-full"
                            >
                                Szukaj
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
