import { theme } from "@/styles/theme";
import ProfileMainCard from "@/components/Profile/ProfileMainCard";
import ProfileBio from "@/components/Profile/ProfileBio";
import ProfileSkills from "@/components/Profile/ProfileSkills";
import ProfileTasks from "@/components/Profile/ProfileTasks";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PublicProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // TODO:
    // 1. Zrób destrukcję `params` i wyciągnij `id` z URL
    const { id } = await params;

    // 2. Jeśli potrzebujesz, wyodrębnij samo ID z formatu "jan-kowalski-id" używając .split("-")
    // 3. Połącz się z bazą używając Prisma: await prisma.user.findUnique({ ... })

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            tasks: true,
        },
    });

    if (!user) notFound();

    // 4. Załącz tabelę powiązaną (include: { tasks: true })
    // 5. Obsłuż przypadek, w którym usera nie ma w bazie (np. funkcja notFound() z Next.js)

    return (
        <main
            className={`${theme.layout.sectionSpacing} max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full`}
        >
            <div className="flex flex-col space-y-8">
                {/* TODO: Przekaż z bazy odpowiednie propsy do każdego z tych komponentów */}

                <ProfileMainCard user={user} />

                <ProfileBio bio={user.bio} />

                <ProfileSkills skills={user.skills} />

                <ProfileTasks tasks={user.tasks} />
            </div>
        </main>
    );
}
