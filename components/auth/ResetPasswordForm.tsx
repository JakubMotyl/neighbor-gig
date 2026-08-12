"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/auth/SubmitButton";
import { resetPassword } from "@/app/actions/password";
import Link from "next/link";

interface ResetPasswordFormProps {
    token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [state, formAction] = useActionState(resetPassword, undefined);

    return (
        <form action={formAction} className="space-y-5">
            <input type="hidden" name="token" value={token} />

            {state?.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium animate-in fade-in zoom-in-95">
                    {state.error}
                </div>
            )}

            {state?.success && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl font-medium animate-in fade-in zoom-in-95 text-center flex flex-col gap-3">
                    <p>{state.success}</p>
                    <Link
                        href="/logowanie"
                        className="font-bold text-green-800 hover:underline bg-green-100/50 py-2 rounded-lg"
                    >
                        Przejdź do logowania
                    </Link>
                </div>
            )}

            {!state?.success && (
                <>
                    <div className="space-y-1.5">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-text-main"
                        >
                            Nowe hasło
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            placeholder="Wpisz nowe hasło"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                        />
                    </div>

                    <SubmitButton pendingLabel="Zmienianie hasła...">
                        Zapisz nowe hasło
                    </SubmitButton>
                </>
            )}
        </form>
    );
}
