"use server";
import { offerSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export const createOffer = async (formData: FormData) => {
    const session = await auth();
    if (!session?.user?.id) redirect("/logowanie");

    const userId = session.user.id;

    // Validation

    const rawData = Object.fromEntries(formData.entries());
    const validatedOffer = offerSchema.safeParse(rawData);

    if (!validatedOffer.success) redirect("/zlecenia?error=InvalidMessage");

    // Fetch task details

    const task = await prisma.task.findUnique({
        where: {
            id: validatedOffer.data.taskId,
        },
    });

    if (!task) throw new Error("Zlecenie nie istnieje");

    const taskSlug = slugify(task.title);
    const fullTaskPath = `/zlecenia/${taskSlug}-${task.id}`;

    // Prevent users from bidding on their own tasks

    if (task.authorId === userId) {
        redirect(`${fullTaskPath}?error=OwnTask`);
    }

    // Check if the user has already submitted an offer

    const existingOffer = await prisma.offer.findFirst({
        where: {
            taskId: validatedOffer.data.taskId,
            userId: userId,
        },
    });

    if (existingOffer) redirect(`${fullTaskPath}?error=OfferExists`);

    await prisma.offer.create({
        data: {
            message: validatedOffer.data.message,
            taskId: validatedOffer.data.taskId,
            price: validatedOffer.data.price,
            userId: userId,
        },
    });

    revalidatePath(fullTaskPath);
    redirect(`${fullTaskPath}?success=OfferSent`);
};

export const deleteTask = async (taskId: string) => {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Brak autoryzacji");
    }

    const userId = session.user.id;

    await prisma.task.delete({
        where: {
            id: taskId,
            authorId: userId,
        },
    });

    revalidatePath("/profil/edytuj");
    revalidatePath("/zlecenia");
};
