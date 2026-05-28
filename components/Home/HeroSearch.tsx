"use client";
import { GIG_CATEGORIES } from "@/constants/categories";
import Button from "../shared/Button";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const ERROR_TIME = 1500;

export default function HomeSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const filteredCategories = GIG_CATEGORIES.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const displayCategories =
        filteredCategories.length > 0
            ? filteredCategories
            : GIG_CATEGORIES.filter((cat) => cat.id === "other");

    const handleSelectCategory = (category: (typeof GIG_CATEGORIES)[0]) => {
        setSearchQuery("");
        setIsOpen(false);
        router.push(`/zlecenia?category=${category.slug}`);
    };

    const handleSearch = (formData: FormData) => {
        setIsOpen(false);

        const query = formData.get("query")?.toString().trim() || "";

        // showError function shows a message and resets the timer
        const showError = (message: string) => {
            setCategoryError(message);
            if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear an old timer
            timeoutRef.current = setTimeout(() => {
                setCategoryError(null);
            }, ERROR_TIME);
        };

        if (!query) {
            showError("Wpisz, z czym potrzebujesz pomocy.");
            return;
        }

        // Check if searchQuery matches the categories name or slug
        const matchedCategory = GIG_CATEGORIES.find(
            (cat) =>
                query.toLocaleLowerCase() ===
                    cat.name.trim().toLocaleLowerCase() ||
                query.toLocaleLowerCase() ===
                    cat.slug.trim().toLocaleLowerCase(),
        );

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
        <div className="relative w-full max-w-2xl flex flex-col items-center gap-5">
            <form
                action={handleSearch}
                className="flex w-full flex-col gap-3 md:flex-row md:items-stretch items-center"
            >
                <div className="flex min-h-12 flex-1 items-center rounded-md border border-gray-200 bg-surface px-4 py-2 w-full transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
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
                        className="w-full flex-1 bg-transparent outline-none focus-visible:outline-none md:text-lg text-base text-text-main placeholder:text-text-muted/70 placeholder:font-normal font-medium [&::-webkit-search-cancel-button]:appearance-none"
                        aria-label="Wyszukaj usługę"
                        aria-invalid={categoryError ? true : undefined}
                        aria-describedby={
                            categoryError ? "search-error" : undefined
                        }
                    />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    className="hover:translate-y-0! w-fit"
                >
                    Znajdź pomoc
                </Button>
            </form>
            {categoryError && (
                <p
                    id="search-error"
                    role="alert"
                    className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {categoryError}
                </p>
            )}
            {isOpen && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Render right message */}
                    {filteredCategories.length > 0 ? (
                        <div className="px-4 py-2 text-xs font-bold text-text-muted uppercase tracking-wider">
                            Sugerowane kategorie
                        </div>
                    ) : (
                        <p className="px-4 py-3 text-sm text-text-muted">
                            Nie znaleziono takiej kategorii
                        </p>
                    )}

                    {/* Map through available categories */}
                    <ul className="flex flex-col">
                        {displayCategories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <li key={cat.id}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleSelectCategory(cat)
                                        }
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 text-left transition-colors group cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-primary/10 text-text-muted group-hover:text-primary transition-colors">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-base font-medium text-text-main group-hover:text-primary transition-colors">
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
