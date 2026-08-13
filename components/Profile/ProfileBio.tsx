// ProfileBio.tsx
import { User } from "@/lib/generated/prisma/client";
import { UserCircle } from "lucide-react";

interface ProfileBioProps {
    bio: User["bio"];
}

export default function ProfileBio({ bio }: ProfileBioProps) {
    return (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <UserCircle className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-text-main">O mnie</h2>
            </div>
            {bio ? (
                <p className="text-text-muted font-medium leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {bio}
                </p>
            ) : (
                <p className="text-sm font-medium text-gray-400 italic bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
                    Użytkownik nie dodał jeszcze opisu.
                </p>
            )}
        </div>
    );
}
