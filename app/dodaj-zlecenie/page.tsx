import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TaskForm } from "@/components/Dodaj-zlecenie/TaskForm";

async function page() {
    const session = await auth();

    if (!session?.user) redirect("/logowanie");

    return (
        <main>
            <TaskForm />
        </main>
    );
}

export default page;
