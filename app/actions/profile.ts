"use server";
import { editProfileSchema } from "@/lib/zod";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateProfile = async (formData: FormData) => {
    const session = await auth();
    if (!session?.user?.id) redirect("/logowanie");
    const userId = session.user.id;

    const rawData = Object.fromEntries(formData.entries());

    const updatedData = editProfileSchema.safeParse(rawData);

    if (!updatedData.success) {
        redirect("/profil/edytuj?error=InvalidData");
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            name: updatedData.data.name,
            location: updatedData.data.location,
            bio: updatedData.data.bio,
            dateOfBirth: updatedData.data.dateOfBirth,
        },
    });

    revalidatePath("/", "layout");
    redirect("/profil/edytuj?success=InformationUpdated");
};
