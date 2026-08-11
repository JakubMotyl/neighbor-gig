"use client";

import SubmitButton from "@/components/auth/SubmitButton";
import { createTask } from "@/app/actions/tasks";
import { GIG_CATEGORIES } from "@/constants/categories";
import { EXECUTION_TIME_LABELS } from "../Zlecenia/ZlecenieCard";

export function TaskForm() {
    return (
        <form
            action={createTask}
            className="bg-surface border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6"
        >
            <header className="space-y-1">
                <h2 className="text-2xl font-bold text-text-main">
                    Stwórz nowe zlecenie
                </h2>
                <p className="text-sm text-text-muted">
                    Wypełnij poniższe pola, aby dotrzeć do najlepszych
                    wykonawców w okolicy.
                </p>
            </header>

            <div className="space-y-4">
                <div className="space-y-1">
                    <label
                        htmlFor="title"
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                        Tytuł zlecenia
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        minLength={5}
                        maxLength={40}
                        placeholder="Naprawa cieknącego kranu w kuchni"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-main placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium bg-transparent"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label
                            htmlFor="categorySlug"
                            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                        >
                            Kategoria
                        </label>
                        <select
                            id="categorySlug"
                            name="categorySlug"
                            required
                            defaultValue=""
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-main bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium cursor-pointer"
                        >
                            <option value="" disabled>
                                Wybierz kategorie
                            </option>
                            {GIG_CATEGORIES.map((category) => (
                                <option key={category.id} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="location"
                            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                        >
                            Lokalizacja
                        </label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            required
                            minLength={2}
                            maxLength={30}
                            placeholder="Warszawa, Mokotów"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-main placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium bg-transparent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label
                            htmlFor="price"
                            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                        >
                            Budżet (PLN)
                        </label>
                        <div className="relative flex items-center">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                required
                                min={1}
                                max={100000}
                                placeholder="200"
                                className="w-full px-4 py-3 pr-14 rounded-xl border border-gray-200 text-text-main placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium bg-transparent"
                            />
                            <span className="absolute right-4 text-xs font-bold text-text-muted pointer-events-none">
                                PLN
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="executionTime"
                            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                        >
                            Kiedy wykonać?
                        </label>
                        <select
                            id="executionTime"
                            name="executionTime"
                            required
                            defaultValue="FLEXIBLE"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-main bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium cursor-pointer"
                        >
                            {Object.entries(EXECUTION_TIME_LABELS).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="description"
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                        Szczegółowy opis
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={5}
                        minLength={20}
                        maxLength={200}
                        placeholder="Opisz zakres prac, wymagania oraz preferowane terminy realizacji..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-text-main placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium bg-transparent resize-none"
                    />
                </div>
            </div>

            <div className="pt-2">
                <SubmitButton pendingLabel="Publikowanie zlecenia...">
                    Opublikuj zlecenie
                </SubmitButton>
            </div>
        </form>
    );
}
