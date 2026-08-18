"use client";

import SubmitButton from "@/components/auth/SubmitButton";
import { Save, ExternalLink, AlertCircle } from "lucide-react";
import { User } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { slugify, calculateAge } from "@/lib/utils";
import { updateProfile } from "@/app/actions/profile";
import { useState } from "react";

interface EditProfileFormProps {
    user: User;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
    const [ageError, setAgeError] = useState<string | null>(null);

    const nameSlug = slugify(user.name || "uzytkownik");
    const profileUrl = `/profil/${nameSlug}-${user.id}`;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!val) {
            setAgeError(null);
            return;
        }

        const age = calculateAge(new Date(val));
        if (age !== null && age < 18) {
            setAgeError("Musisz mieć ukończone co najmniej 18 lat.");
        } else {
            setAgeError(null);
        }
    };

    return (
        <section
            aria-label="Edycja danych profilowych"
            className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm"
        >
            <h2 className="text-lg font-bold text-text-main mb-5">
                Dane podstawowe
            </h2>

            <form className="space-y-4" action={updateProfile}>
                <div className="space-y-1.5">
                    <label
                        htmlFor="name"
                        className="text-sm font-semibold text-text-main"
                    >
                        Imię i nazwisko
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={user.name || ""}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                        placeholder="Np. Jan Kowalski"
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="dateOfBirth"
                        className="text-sm font-semibold text-text-main"
                    >
                        Data urodzenia
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        defaultValue={
                            user.dateOfBirth
                                ? user.dateOfBirth.toISOString().split("T")[0]
                                : ""
                        }
                        onChange={handleDateChange}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all text-sm font-medium outline-none ${
                            ageError
                                ? "border-red-500 bg-red-50/20"
                                : "border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        }`}
                    />
                    {ageError && (
                        <p className="text-xs font-semibold text-red-500 flex items-center gap-1 pt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{ageError}</span>
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="location"
                        className="text-sm font-semibold text-text-main"
                    >
                        Lokalizacja
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        defaultValue={user.location || ""}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                        placeholder="Np. Warszawa"
                    />
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="bio"
                        className="text-sm font-semibold text-text-main"
                    >
                        O mnie (Bio)
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        defaultValue={user.bio || ""}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium resize-none"
                        placeholder="Napisz kilka słów o sobie..."
                    />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                    <SubmitButton
                        disabled={!!ageError}
                        pendingLabel="Zapisywanie danych..."
                        className="flex items-center justify-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Zapisz zmiany
                    </SubmitButton>

                    <div className="text-center border-t border-gray-100 pt-3 mt-1">
                        <Link
                            href={profileUrl}
                            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Podgląd profilu
                        </Link>
                    </div>
                </div>
            </form>
        </section>
    );
}
