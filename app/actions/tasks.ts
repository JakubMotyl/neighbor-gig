"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTaskSchema } from "../../lib/zod";

const createTask = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user?.id) redirect("/logowanie");

    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        location: formData.get("location"),
        price: formData.get("price"),
        categorySlug: formData.get("categorySlug"),
        executionTime: formData.get("executionTime"),
    };

    const validatedTask = createTaskSchema.safeParse(rawData);

    if (!validatedTask.success) {
        console.error("Zod Validation Error:", validatedTask.error);
        redirect("/dodaj-zlecenie?error=InvalidData");
    }

    await prisma.task.create({
        data: {
            authorId: session.user.id,
            ...validatedTask.data,
        },
    });

    revalidatePath("/", "layout");
    redirect("/?success=TaskCreated");
};

export { createTask };
