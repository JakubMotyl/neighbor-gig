import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import { theme } from "@/styles/theme";

import TaskHeader from "@/components/Zlecenia/TaskHeader";
import TaskDescription from "@/components/Zlecenia/TaskDescription";
import TaskAuthorCard from "@/components/Zlecenia/TaskAuthorCard";
import TaskActionCard from "@/components/Zlecenia/TaskActionCard";

interface TaskDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export default async function TaskDetailsPage({
    params,
}: TaskDetailsPageProps) {
    const { slug } = await params;

    const taskId = slug.slice(-36);

    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            author: true,
        },
    });

    if (!task) notFound();

    return (
        <>
            <main
                className={`${theme.layout.sectionSpacing} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full`}
            >
                <nav aria-label="Nawigacja powrotna" className="mb-6">
                    <Link
                        href="/zlecenia"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 py-1 -ml-2"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        <span>Wróć do listy zleceń</span>
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <article className="lg:col-span-2 space-y-8">
                        <TaskHeader task={task} />
                        <TaskDescription description={task.description} />
                        <TaskAuthorCard task={task} />
                    </article>

                    <aside className="lg:col-span-1">
                        <TaskActionCard price={task.price} taskId={task.id} />
                    </aside>
                </div>
            </main>
        </>
    );
}
