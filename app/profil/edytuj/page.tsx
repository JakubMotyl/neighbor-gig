import { theme } from "@/styles/theme";
import DashboardCalendar from "@/components/Profile/Edytuj/DashboardCalendar";
import DashboardInbox from "@/components/Profile/Edytuj/DashboardInbox";
import DashboardSummary from "@/components/Profile/Edytuj/DashboardSummary";
import EditProfileForm from "@/components/Profile/Edytuj/EditProfileForm";
import DashboardTasks from "@/components/Profile/Edytuj/DashboardTasks";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Toast } from "@/components/auth/Toast";

export default async function EditProfilePage({
    searchParams,
}: {
    searchParams: Promise<{ error: string; success: string }>;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect("/logowanie");

    const params = await searchParams;

    // Get user id
    const userId = session.user.id;

    // Get user data
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            tasks: true,
        },
    });

    if (!user) redirect("/logowanie");

    return (
        <main
            className={`${theme.layout.sectionSpacing} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full`}
        >
            <header className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-text-main">
                    Mój Dashboard
                </h1>
                <p className="text-text-muted mt-1">
                    Zarządzaj swoim profilem, zleceniami i wiadomościami.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <DashboardSummary user={user} />
                    <EditProfileForm user={user} />
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                    <DashboardTasks tasks={user.tasks} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DashboardCalendar />
                        <DashboardInbox />
                    </div>
                </div>
            </div>
            <Toast errorType={params.error} successType={params.success} />
        </main>
    );
}
