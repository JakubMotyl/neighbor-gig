"use client";
import { GIG_CATEGORIES } from "@/constants/categories";
import Button from "../shared/Button";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ERROR_TIME = 1500;

export default function HomeSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect handling the 'Click outside' pattern to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Calculated on the fly on every render
    const { filteredCategories, displayCategories } = useMemo(() => {
        const filteredCategories = GIG_CATEGORIES.filter((category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        // Fallback UI logic: show "Other" category if search yields no results
        const displayCategories =
            filteredCategories.length > 0
                ? filteredCategories
                : GIG_CATEGORIES.filter((cat) => cat.id === "other");

        return { filteredCategories, displayCategories };
    }, [searchQuery]);

    // Handler for direct clicks on dropdown suggestions
    const handleSelectCategory = (category: (typeof GIG_CATEGORIES)[0]) => {
        setSearchQuery("");
        setIsOpen(false);
        router.push(`/zlecenia?category=${category.slug}`);
    };

    // Form submission handler
    const handleSearch = () => {
        setIsOpen(false);
        const query = searchQuery.trim();

        const showError = (message: string) => {
            setCategoryError(message);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setCategoryError(null);
            }, ERROR_TIME);
        };

        if (!query) {
            showError("Wpisz, z czym potrzebujesz pomocy.");
            return;
        }

        // Exact match validation: check if user input strictly matches any category name or slug
        const matchedCategory = GIG_CATEGORIES.find(
            (cat) =>
                query.toLocaleLowerCase() ===
                    cat.name.trim().toLocaleLowerCase() ||
                query.toLocaleLowerCase() ===
                    cat.slug.trim().toLocaleLowerCase(),
        );

        // Routing logic based on validation result
        if (matchedCategory) {
            setCategoryError(null);
            router.push(`/zlecenia?category=${matchedCategory.slug}`);
        } else {
            showError(
                "Błędna kategoria. Wybierz sugestię z listy lub „Inne zadania”.",
            );
            setIsOpen(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-2xl flex flex-col items-center gap-4"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
                className="flex w-full flex-col gap-3 md:flex-row md:items-center bg-surface p-2 rounded-2xl shadow-sm border border-gray-200 transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"
            >
                <div className="flex flex-1 items-center px-4 gap-3">
                    <input
                        type="search"
                        name="query"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCategoryError(null);
                        }}
                        autoComplete="off"
                        onFocus={() => setIsOpen(true)}
                        placeholder="Z czym potrzebujesz pomocy?"
                        className="w-full h-12 bg-transparent outline-none text-base md:text-lg text-text-main placeholder:text-gray-400 font-medium [&::-webkit-search-cancel-button]:appearance-none"
                        aria-label="Wyszukaj usługę"
                        aria-invalid={categoryError ? true : undefined}
                    />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    className="h-12 px-6 rounded-xl hover:translate-y-0 w-full md:w-auto shrink-0"
                >
                    Znajdź pomoc
                </Button>
            </form>

            {/* Error feedback UI */}
            {categoryError && (
                <p
                    role="alert"
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {categoryError}
                </p>
            )}

            {/* Autocomplete dropdown UI */}
            {isOpen && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-surface border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {filteredCategories.length > 0 ? (
                        <div className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Sugerowane kategorie
                        </div>
                    ) : (
                        <p className="px-5 py-3 text-sm text-gray-500">
                            Nie znaleziono takiej kategorii
                        </p>
                    )}

                    <ul className="flex flex-col">
                        {displayCategories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <li key={cat.id}>
                                    <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() =>
                                            handleSelectCategory(cat)
                                        }
                                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-left transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary/10 text-gray-500 group-hover:text-primary transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-base font-semibold text-gray-700 group-hover:text-primary transition-colors">
                                            {cat.name}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
