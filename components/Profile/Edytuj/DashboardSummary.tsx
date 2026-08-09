import { ShieldCheck, Mail, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
import { calculateAge } from "@/lib/utils";

export default function DashboardSummary({ user }: { user: any }) {
    const age = calculateAge(user.dateOfBirth);
    return (
        <section
            aria-label="Podsumowanie profilu"
            className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center"
        >
            <div className="relative w-24 h-24 mb-4">
                <div className="w-full h-full rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-3xl font-bold text-slate-500">
                            {user.name?.charAt(0)}
                        </span>
                    )}
                </div>
                {user.isVerified && (
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                        <ShieldCheck
                            className="w-5 h-5 text-primary"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>

            <h2 className="text-xl font-bold text-text-main mb-1">
                {user.name || "Brak imienia"}
            </h2>
            <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                Zleceniodawca
            </p>

            <div className="w-full space-y-3 mt-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3 text-sm text-text-muted">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-muted">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{user.location || "Brak lokalizacji"}</span>
                </div>
                {age && (
                    <div className="flex items-center gap-3 text-sm text-text-muted">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{age} lat</span>
                    </div>
                )}
            </div>
        </section>
    );
}
