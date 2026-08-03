"use client";

import Link from "next/link";
import { signInWithCredentials } from "@/lib/actions";
import SubmitButton from "./SubmitButton";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function LoginForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <form className="space-y-4" action={signInWithCredentials}>
            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                    Adres e-mail
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jan@kowalski.pl"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                />
            </div>

            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                        Hasło
                    </label>

                    <Link
                        href="/przypomnij-haslo"
                        className="text-xs text-primary hover:underline font-medium"
                    >
                        Nie pamiętasz hasła?
                    </Link>
                </div>
                <div className="relative flex items-center">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors p-1 rounded-lg"
                        aria-label={
                            showPassword ? "Ukryj hasło" : "Pokaż hasło"
                        }
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 transition-all duration-200 cursor-pointer" />
                        ) : (
                            <Eye className="w-5 h-5 transition-all duration-200 cursor-pointer" />
                        )}
                    </button>
                </div>
            </div>

            <SubmitButton pendingLabel="Logowanie...">Zaloguj się</SubmitButton>
        </form>
    );
}

export default LoginForm;
