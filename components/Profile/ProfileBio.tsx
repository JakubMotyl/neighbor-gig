import { User } from "@/lib/generated/prisma/client";

interface ProfileBioProps {
    bio: User["bio"];
}

export default function ProfileBio({ bio }: ProfileBioProps) {
    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-main shadow-sm">
            <h2 className="text-lg font-bold text-text-main mb-3">O mnie</h2>
            <p className="text-text-main leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {bio ? bio : "Użytkownik nie dodał jeszcze opisu."}
            </p>
        </div>
    );
}
