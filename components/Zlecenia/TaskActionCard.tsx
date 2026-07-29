"use client";

import Button from "@/components/shared/Button";
import { CheckCircle2, MessageSquare } from "lucide-react";

interface TaskActionCardProps {
    price: number;
    taskId: string;
}

export default function TaskActionCard({ price, taskId }: TaskActionCardProps) {
    const handleApply = () => {
        alert(
            `Aplikujesz na zlecenie o ID: ${taskId}. Miejsce na modal zgłoszenia!`,
        );
    };

    return (
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
    );
}
