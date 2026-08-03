"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface AuthToastProps {
    errorType?: string;
}

export function AuthToast({ errorType }: AuthToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (errorType) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [errorType]);

    if (!isVisible || !errorType) return null;

    const getErrorMessage = (type: string) => {
        switch (type) {
            case "InvalidCredentials":
                return {
                    title: "Błąd logowania",
                    message: "Nieprawidłowy adres e-mail lub hasło.",
                };
            case "UserExists":
                return {
                    title: "Błąd rejestracji",
                    message:
                        "Użytkownik o podanym adresie e-mail już istnieje.",
                };
            default:
                return {
                    title: "Coś poszło nie tak",
                    message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
                };
        }
    };

    const { title, message } = getErrorMessage(errorType);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-red-600 text-white px-5 py-4 rounded-2xl shadow-2xl border border-red-500 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <AlertCircle className="w-5 h-5 shrink-0" />

            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-red-100">{message}</p>
            </div>

            <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="ml-2 text-red-200 hover:text-white transition-colors p-1 rounded-lg focus:outline-none"
                aria-label="Zamknij"
            >
                <X className="w-4 h-4 cursor-pointer" />
            </button>
        </div>
    );
}
