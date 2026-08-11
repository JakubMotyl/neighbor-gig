"use client";

import Button from "@/components/shared/Button";
import { CheckCircle2, MessageSquare, X } from "lucide-react";
import { createOffer } from "@/app/actions/offers";
import { useState } from "react";
import SubmitButton from "../auth/SubmitButton";

interface TaskActionCardProps {
    price: number;
    taskId: string;
    isAuthor?: boolean;
}

export default function TaskActionCard({
    price,
    taskId,
    isAuthor,
}: TaskActionCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApply = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <section
                aria-label="Podsumowanie oferty i akcje"
                className="rounded-3xl bg-surface border border-gray-100 p-6 shadow-sm space-y-6"
            >
                <div>
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">
                        Budżet zlecenia
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-text-main">
                            {price}
                        </span>
                        <span className="text-lg font-bold text-text-main">
                            PLN
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    {isAuthor ? (
                        <div className="w-full py-4 px-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
                            <span className="text-sm font-bold text-primary block mb-1">
                                To jest Twoje zlecenie
                            </span>
                            <span className="text-xs font-medium text-primary/80">
                                Oczekuj na zgłoszenia wykonawców w zakładce
                                Profil.
                            </span>
                        </div>
                    ) : (
                        <>
                            <Button
                                onClick={handleApply}
                                variant="primary"
                                className="w-full py-3.5 text-base font-bold rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/30 cursor-pointer"
                                ariaLabel="Zgłoś się do wykonania tego zlecenia"
                            >
                                Zgłoś się do zadania
                            </Button>

                            <Button
                                onClick={() =>
                                    alert(
                                        "Wkrótce udostępnimy bezpośredni czat ze zlecającym!",
                                    )
                                }
                                variant="outline"
                                className="w-full py-3.5 text-base font-bold rounded-xl cursor-pointer"
                                ariaLabel="Zadaj pytanie zleceniodawcy"
                            >
                                <MessageSquare
                                    className="w-4 h-4 mr-2"
                                    aria-hidden="true"
                                />
                                Zadaj pytanie
                            </Button>
                        </>
                    )}
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-3 text-xs text-text-muted">
                    <div className="flex items-start gap-2.5">
                        <CheckCircle2
                            className="w-4 h-4 text-community shrink-0 mt-0.5"
                            aria-hidden="true"
                        />
                        <span>Bezpłatne zgłoszenie bez ukrytych opłat</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <CheckCircle2
                            className="w-4 h-4 text-community shrink-0 mt-0.5"
                            aria-hidden="true"
                        />
                        <span>Bezpieczne ustalanie szczegółów na czacie</span>
                    </div>
                </div>
            </section>

            {isModalOpen && !isAuthor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-surface w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 p-2 text-text-muted hover:text-text-main hover:bg-slate-100 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label="Zamknij modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <header className="mb-6 pr-8">
                            <h2 className="text-xl font-bold text-text-main mb-1.5">
                                Złóż ofertę
                            </h2>
                            <p className="text-sm text-text-muted">
                                Zaproponuj stawkę i napisz krótką wiadomość do
                                zleceniodawcy.
                            </p>
                        </header>

                        <form action={createOffer} className="space-y-5">
                            <input type="hidden" name="taskId" value={taskId} />

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-semibold text-text-main"
                                >
                                    Proponowana kwota
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        required
                                        min={1}
                                        max={100000}
                                        defaultValue={price}
                                        className="w-full px-4 py-3 pr-14 rounded-xl border border-gray-200 bg-slate-50 text-text-main focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                    />
                                    <span className="absolute right-4 text-xs font-bold text-text-muted pointer-events-none">
                                        PLN
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold text-text-main"
                                >
                                    Wiadomość dla zlecającego (zaproponuj dzień
                                    i godzinę)
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    minLength={10}
                                    maxLength={200}
                                    placeholder="Napisz, dlaczego to Ty powinieneś wykonać to zlecenie i zaproponuj dokładny termin (np. 'Mogę być w sobotę o 10:00')."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 text-text-main focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                                />
                                <p className="text-[11px] text-text-muted text-right">
                                    Od 10 do 200 znaków
                                </p>
                            </div>

                            <div className="pt-2">
                                <SubmitButton pendingLabel="Wysyłanie oferty...">
                                    Wyślij ofertę
                                </SubmitButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
