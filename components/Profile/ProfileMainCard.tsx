import Image from "next/image";
import {
    BadgeCheck,
    CalendarDays,
    Star,
    MapPin,
    MessageSquare,
} from "lucide-react";
import { User } from "@/lib/generated/prisma/client";
import { calculateAge } from "@/lib/utils";

interface ProfileMainCardProps {
    user: User;
}

export default function ProfileMainCard({ user }: ProfileMainCardProps) {
    const formattedJoinDate = new Date(user.createdAt).toLocaleDateString(
        "pl-PL",
        {
            month: "long",
            year: "numeric",
        },
    );

    return (
        <div className="bg-surface rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-5">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-110" />
                <div className="w-full h-full bg-slate-100 rounded-full border-4 border-surface overflow-hidden flex items-center justify-center relative shadow-sm">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "Użytkownik"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-4xl text-slate-400 font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex item-center gap-1.5 justify-center mb-2">
                <h1 className="text-2xl font-black text-text-main tracking-tight">
                    {user.name || "Użytkownik"}
                </h1>
                {user.isVerified && (
                    <BadgeCheck className="w-6 h-6 text-emerald-500 fill-emerald-100 shrink-0" />
                )}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm font-medium text-text-muted mb-5 flex-wrap">
                <span>
                    {user.dateOfBirth
                        ? `${calculateAge(user.dateOfBirth)} lat`
                        : "Wiek nieznany"}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user.location ? user.location : "Brak lokalizacji"}
                </span>
            </div>

            <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20 mb-7 text-sm transition-transform hover:scale-105">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-amber-700">
                    {user.rating.toFixed(1)}
                </span>
                <span className="text-amber-600/80 font-medium">
                    ({user.ratingCount} ocen)
                </span>
            </div>

            <button className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/20 cursor-pointer">
                <MessageSquare className="w-5 h-5" />
                Napisz wiadomość
            </button>

            <div className="w-full border-t border-gray-100 my-6" />

            <div className="w-full text-xs font-semibold text-text-muted flex items-center justify-center gap-1.5 uppercase tracking-wider">
                <CalendarDays className="w-4 h-4" />
                <span>Na Gigo od: {formattedJoinDate}</span>
            </div>
        </div>
    );
}
