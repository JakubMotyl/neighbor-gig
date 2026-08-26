"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/shared/Button";

export default function TaskDetailsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Błąd szczegółów zlecenia:", error);
    }, [error]);

    return (
        <main className="min-h-[calc(100dvh-10rem)] flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
            <div className="max-w-md w-full flex flex-col items-center bg-surface p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6" />
                </div>

                <h1 className="text-xl font-bold text-text-main mb-2">
                    Nie udało się wczytać zlecenia
                </h1>

                <p className="text-sm text-text-muted mb-6">
                    Wystąpił problem z pobraniem danych tego zlecenia z bazy.
                </p>

                <div className="flex flex-col gap-3 w-full">
                    <Button
                        onClick={() => reset()}
                        variant="primary"
                        className="w-full py-3 text-sm font-bold gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Ponów próbę
                    </Button>
                    <Link
                        href="/zlecenia"
                        className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors py-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Wróć do listy zleceń
                    </Link>
                </div>
            </div>
        </main>
    );
}
