"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Button from "@/components/shared/Button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Aplikacja napotkała błąd:", error);
    }, [error]);

    return (
        <main className="min-h-[calc(100dvh-10rem)] flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
            <div className="max-w-md w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500 bg-surface p-8 rounded-3xl border border-red-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-7 h-7" />
                </div>

                <h1 className="text-2xl font-black text-text-main mb-2">
                    Coś poszło nie tak!
                </h1>

                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                    Wystąpił nieoczekiwany problem podczas ładowania tej strony.
                    Możesz spróbować załadować ją ponownie.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button
                        onClick={() => reset()}
                        variant="primary"
                        className="flex-1 py-3 text-sm font-bold gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Spróbuj ponownie
                    </Button>
                    <Link
                        href="/"
                        className="flex-1 inline-flex items-center justify-center py-3 px-4 rounded-xl border border-gray-200 text-sm font-bold text-text-main hover:bg-slate-100 transition-colors gap-2"
                    >
                        <Home className="w-4 h-4" /> Strona główna
                    </Link>
                </div>
            </div>
        </main>
    );
}
