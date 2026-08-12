"use client";

import Link from "next/link";
import SubmitButton from "@/components/auth/SubmitButton";
import { forgotPassword } from "@/app/actions/password";
import { useActionState } from "react";

export default function ForgotPasswordForm() {
    const [state, formAction] = useActionState(forgotPassword, undefined);

    return (
        <form action={formAction} className="space-y-5">
            {state?.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium animate-in fade-in zoom-in-95">
                    {state.error}
                </div>
            )}

            {state?.success && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl font-medium animate-in fade-in zoom-in-95">
                    {state.success}
                </div>
            )}

            <div className="space-y-1.5">
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-text-main"
                >
                    Adres email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jan@kowalski.pl"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                />
            </div>

            <SubmitButton pendingLabel="Wysyłanie linku...">
                Wyślij link resetujący
            </SubmitButton>

            <footer className="mt-6 text-center">
                <Link
                    href="/logowanie"
                    className="text-sm font-bold text-primary hover:underline"
                >
                    Wróć do logowania
                </Link>
            </footer>
        </form>
    );
}
