"use client";
import Button from "@/components/shared/Button";
import { Save, ExternalLink } from "lucide-react";
import { User } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { updateProfile } from "@/app/actions/profile";

interface EditProfileFormProps {
    user: User;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
    const nameSlug = slugify(user.name || "uzytkownik");
    const profileUrl = `/profil/${nameSlug}-${user.id}`;

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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                    />
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
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer"
                    >
                        <Save className="w-4 h-4" />
                        Zapisz zmiany
                    </Button>

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
