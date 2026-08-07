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
        <div className="bg-white rounded-3xl p-6 border border-border-main shadow-sm flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative w-28 h-28 mb-4">
                <div className="w-full h-full bg-slate-100 rounded-full border-4 border-slate-50 overflow-hidden flex items-center justify-center relative shadow-inner">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "Użytkownik"}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-3xl text-slate-400 font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            {/* Full Name & Status */}
            <div className="flex items-center gap-1.5 justify-center mb-1">
                <h1 className="text-xl font-bold text-text-main">
                    {user.name || "Użytkownik"}
                </h1>

                {user.isVerified && (
                    <BadgeCheck className="w-5 h-5 text-green-600 fill-green-100 shrink-0" />
                )}
            </div>

            {/* Age & Location */}
            <div className="flex items-center justify-center gap-2 text-sm text-text-muted mb-4 flex-wrap">
                <span>
                    {user.dateOfBirth
                        ? `${calculateAge(user.dateOfBirth)} l.`
                        : "Wiek nieznany"}
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />

                    {user.location ? user.location : "Brak lokalizacji"}
                </span>
            </div>

            {/* Opinion */}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60 mb-6 text-sm">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-text-main">
                    {user.rating.toFixed(1)}
                </span>
                <span className="text-text-muted">({user.ratingCount})</span>
            </div>

            {/* Action buttons */}
            <button className="w-full sm:w-auto min-w-62.5 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm mx-auto cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                Wyślij wiadomość
            </button>

            <div className="w-full border-t border-slate-100 my-5" />

            {/* Meta info */}
            <div className="w-full text-xs text-text-muted flex items-center justify-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                <span className="capitalize">
                    Na platformie od: {formattedJoinDate}
                </span>
            </div>
        </div>
    );
}
