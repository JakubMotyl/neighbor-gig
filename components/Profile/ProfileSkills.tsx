import { User } from "@/lib/generated/prisma/client";
import { Wrench } from "lucide-react";

interface ProfileSkillsProps {
    skills: User["skills"];
}

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-main shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-text-main">
                    Umiejętności i kategorie
                </h2>
            </div>

            {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            className="bg-slate-100 text-slate-700 font-medium px-3.5 py-1.5 rounded-xl text-sm border border-slate-200/50"
                            key={skill}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-text-muted italic">
                    Brak wskazanych umiejętności.
                </p>
            )}
        </div>
    );
}
