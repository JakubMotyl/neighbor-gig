"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

interface ToastProps {
    errorType?: string;
    successType?: string;
}

export function Toast({ errorType, successType }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (errorType || successType) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [errorType, successType]);

    if (!isVisible || (!errorType && !successType)) return null;

    const isSuccess = Boolean(successType);
    const activeType = successType || errorType || "";

    const getToastContent = (type: string) => {
        switch (type) {
            case "TaskCreated":
                return {
                    title: "Zlecenie opublikowane!",
                    message: "Twoje ogłoszenie jest widoczne dla wykonawców.",
                };
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
            case "InformationUpdated":
                return {
                    title: "Profil zaktualizowany!",
                    message: "Twoje dane zostały pomyślnie zapisane.",
                };
            case "InvalidData":
                return {
                    title: "Niepoprawne dane",
                    message: "Twoje dane nie zostały zaktualizowane.",
                };
            default:
                return {
                    title: "Coś poszło nie tak",
                    message: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
                };
        }
    };

    const { title, message } = getToastContent(activeType);

    const containerStyles = isSuccess
        ? "bg-emerald-600 border-emerald-500 text-white"
        : "bg-red-600 border-red-500 text-white";

    const textSubColor = isSuccess ? "text-emerald-100" : "text-red-100";
    const closeBtnColor = isSuccess
        ? "text-emerald-200 hover:text-white"
        : "text-red-200 hover:text-white";

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-bottom-5 fade-in duration-300 ${containerStyles}`}
        >
            {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
            )}

            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className={`text-xs ${textSubColor}`}>{message}</p>
            </div>

            <button
                type="button"
                onClick={() => setIsVisible(false)}
                className={`ml-2 transition-colors p-1 rounded-lg focus:outline-none ${closeBtnColor}`}
                aria-label="Zamknij"
            >
                <X className="w-4 h-4 cursor-pointer" />
            </button>
        </div>
    );
}
