import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TaskForm } from "@/components/Dodaj-zlecenie/TaskForm";

export default async function AddTaskPage() {
    const session = await auth();

    if (!session?.user) redirect("/logowanie");

    return (
        <main className="min-h-[calc(100dvh-4rem)] bg-slate-50 py-12 md:py-20 px-4 flex items-start justify-center">
            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TaskForm />
            </div>
        </main>
    );
}
