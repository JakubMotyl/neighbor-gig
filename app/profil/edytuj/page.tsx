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
            // Zleceniodawca (Received offers)
            tasks: {
                include: {
                    offers: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
            // Wykonawca (Sent offers)
            offers: {
                include: {
                    task: {
                        include: {
                            author: {
                                select: { name: true },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!user) redirect("/logowanie");

    const sentOffers = user?.offers;

    const receivedOffers = user.tasks.flatMap((task) =>
        task.offers.map((offer) => ({
            ...offer,
            task: task,
        })),
    );

    const bossEvents = user.tasks
        .filter((task) =>
            task.offers.some((offer) => offer.status === "ACCEPTED"),
        )
        .map((task) => {
            const acceptedOffer = task.offers.find(
                (offer) => offer.status === "ACCEPTED",
            );
            return {
                id: task.id,
                title: task.title,
                date: task.executionTime,
                role: "zleceniodawca" as const,
                personName: acceptedOffer?.user?.name || "Nieznany wykonawca",
            };
        });

    const workerEvents = user.offers
        .filter((offer) => offer.status === "ACCEPTED")
        .map((offer) => {
            return {
                id: offer.task.id,
                title: offer.task.title,
                date: offer.task.executionTime,
                role: "wykonawca" as const,
                personName: offer.task.author?.name || "Nieznany zleceniodawca",
            };
        });

    // Time weight variable to ease sorting based on enum ExecutionTime
    const timeWeight: Record<string, number> = {
        ASAP: 1,
        WITHIN_FEW_DAYS: 2,
        THIS_WEEKEND: 3,
        FLEXIBLE: 4,
    };

    const calendarEvents = [...bossEvents, ...workerEvents].sort(
        (a, b) => timeWeight[a.date] - timeWeight[b.date],
    );

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
                        <DashboardCalendar events={calendarEvents} />
                        <DashboardInbox
                            sentOffers={sentOffers}
                            receivedOffers={receivedOffers}
                        />
                    </div>
                </div>
            </div>
            <Toast errorType={params.error} successType={params.success} />
        </main>
    );
}
