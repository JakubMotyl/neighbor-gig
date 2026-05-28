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
    const [keyword, setKeyword] = useState<string>("");

    const [selectedCategory, setSelectedCategory] = useState<string>(() => {
        return params.get("category") || "";
    });

    useEffect(() => {
        setSelectedCategory(params.get("category") || "");
    }, [params]);

    const handleSelect = (category: string) => {
        setSelectedCategory(category);
        setIsListOpen(false);
    };

    const handleSearch = (formData: FormData) => {
        setIsListOpen(false);
        const catValue = formData.get("category")?.toString().trim();
        const keyValue = formData.get("keyword")?.toString().trim();

        // Create a clean URL link
        const newParams = new URLSearchParams();

        if (catValue) {
            newParams.set("category", catValue);
        }
        if (keyValue) {
            newParams.set("keyword", keyValue);
        }

        const queryString = newParams.toString();

        queryString
            ? router.push("/zlecenia?" + queryString)
            : router.push("/zlecenia");
    };

    // Update category name after switching
    const currentCategoryObj = GIG_CATEGORIES.find(
        (el) => el.slug === selectedCategory,
    );

    const displayLabel = currentCategoryObj
        ? currentCategoryObj.name
        : "Wszystkie kategorie";

    return (
        <section className="px-default">
            <div className="w-full max-w-5xl mx-auto">
                <div className="rounded-3xl bg-surface shadow-sm border border-gray-100">
                    <form
                        action={handleSearch}
                        className="flex flex-col md:flex-row md:items-stretch divide-y divide-gray-100 md:divide-y-0 md:divide-x border-gray-100"
                        aria-label="Wyszukaj usługę"
                    >
                        <div className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4 md:min-w-[260px] relative">
                            <label htmlFor="category" className="sr-only">
                                Kategoria
                            </label>

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

                        <div className="px-4 py-3 md:px-5 md:py-4 flex items-center md:min-w-[160px]">
                            <Button
                                type="submit"
                                variant="primary"
                                className="hover:translate-y-0!"
                            >
                                Szukaj
                            </Button>
                        </div>

                        {/* Hidden input for managing category in URLSearchParams */}
                        <input
                            type="hidden"
                            name="category"
                            value={selectedCategory}
                        />
                    </form>
                </div>
            </div>
        </section>
    );
}
