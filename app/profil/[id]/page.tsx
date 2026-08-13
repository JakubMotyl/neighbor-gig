import { theme } from "@/styles/theme";
import ProfileMainCard from "@/components/Profile/ProfileMainCard";
import ProfileBio from "@/components/Profile/ProfileBio";
import ProfileTasks from "@/components/Profile/ProfileTasks";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PublicProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const userId = id.split("-").pop();

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            tasks: true,
        },
    });

    if (!user) notFound();

    return (
        <main
            className={`${theme.layout.sectionSpacing} max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full`}
        >
            <div className="flex flex-col space-y-8">
                <ProfileMainCard user={user} />

                <ProfileBio bio={user.bio} />

                <ProfileTasks tasks={user.tasks} />
            </div>
        </main>
    );
}
