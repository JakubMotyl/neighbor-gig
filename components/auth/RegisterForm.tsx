"use client";

import { useMemo, useState } from "react";
import { signUp } from "@/lib/actions";
import { CheckCircle2, X, Eye, EyeOff } from "lucide-react";
import SubmitButton from "./SubmitButton";

function RegisterForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { hasLength, hasUpper, hasDigit, hasSign, isPasswordPerfect } =
        useMemo(() => {
            const hasLength = passwordValue.length >= 8;
            const hasUpper = /[A-Z]/.test(passwordValue);
            const hasDigit = /\d/.test(passwordValue);
            const hasSign = /[^A-Za-z0-9]/.test(passwordValue);
            const isPasswordPerfect =
                hasLength && hasUpper && hasDigit && hasSign;
            return {
                hasLength,
                hasUpper,
                hasDigit,
                hasSign,
                isPasswordPerfect,
            };
        }, [passwordValue]);

    return (
        <form
            className="space-y-4"
            action={async (formData: FormData) => {
                await signUp(formData);
            }}
        >
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
                <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                >
                    Hasło
                </label>

                <div className="relative flex items-center">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        onChange={(e) => setPasswordValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
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

                {/* Error section shows when input[password] is focused or password length is equal to 0 */}
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isFocused || passwordValue.length > 0
                            ? "max-h-64 opacity-100 mt-4"
                            : "max-h-0 opacity-0 mt-0"
                    }`}
                >
                    <ul
                        className={`p-4 space-y-1 rounded-xl border transition-colors duration-300 ${
                            isPasswordPerfect
                                ? "bg-emerald-50/50 border-emerald-100"
                                : "bg-red-50/50 border-red-100"
                        }`}
                    >
                        {/* Length */}
                        <li
                            className={`flex items-center gap-2.5 text-xs sm:text-sm font-medium text-red-500 overflow-hidden transition-all duration-300 ${
                                hasLength
                                    ? "max-h-0 opacity-0 m-0"
                                    : "max-h-10 opacity-100"
                            }`}
                        >
                            <X className="w-4 h-4 shrink-0" />
                            <span>Brakuje minimum 8 znaków</span>
                        </li>

                        {/* Big letter */}
                        <li
                            className={`flex items-center gap-2.5 text-xs sm:text-sm font-medium text-red-500 overflow-hidden transition-all duration-300 ${
                                hasUpper
                                    ? "max-h-0 opacity-0 m-0"
                                    : "max-h-10 opacity-100"
                            }`}
                        >
                            <X className="w-4 h-4 shrink-0" />
                            <span>Brakuje wielkiej litery</span>
                        </li>

                        {/* Digit */}
                        <li
                            className={`flex items-center gap-2.5 text-xs sm:text-sm font-medium text-red-500 overflow-hidden transition-all duration-300 ${
                                hasDigit
                                    ? "max-h-0 opacity-0 m-0"
                                    : "max-h-10 opacity-100"
                            }`}
                        >
                            <X className="w-4 h-4 shrink-0" />
                            <span>Brakuje cyfry</span>
                        </li>

                        {/* Sign */}
                        <li
                            className={`flex items-center gap-2.5 text-xs sm:text-sm font-medium text-red-500 overflow-hidden transition-all duration-300 ${
                                hasSign
                                    ? "max-h-0 opacity-0 m-0"
                                    : "max-h-10 opacity-100"
                            }`}
                        >
                            <X className="w-4 h-4 shrink-0" />
                            <span>Brakuje znaku specjalnego (np. !, @, #)</span>
                        </li>

                        {/* Success */}
                        <li
                            className={`flex items-center gap-2.5 text-xs sm:text-sm font-bold text-emerald-600 overflow-hidden transition-all duration-300 ${
                                isPasswordPerfect
                                    ? "max-h-10 opacity-100"
                                    : "max-h-0 opacity-0 m-0"
                            }`}
                        >
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Hasło jest idealne!</span>
                        </li>
                    </ul>
                </div>
            </div>

            <SubmitButton pendingLabel="Tworzenie konta...">
                Zarejestruj się
            </SubmitButton>
        </form>
    );
}

export default RegisterForm;
