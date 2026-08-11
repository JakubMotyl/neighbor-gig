"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const respondToOffer = async (
    offerId: string,
    status: "ACCEPTED" | "REJECTED",
) => {
    const session = await auth();
    if (!session?.user?.id) redirect("/logowanie");
    const userId = session.user.id;

    // Verify that the offer exists and the current user is the author of the task
    const verifiedOffer = await prisma.offer.findFirst({
        include: {
            task: true,
        },
        where: {
            id: offerId,
            task: {
                authorId: userId,
            },
        },
    });

    if (!verifiedOffer) {
        throw new Error("Brak autoryzacji do zmiany tej oferty");
    }

    // If user accept the offer, other offers are automatically rejected
    if (status === "ACCEPTED") {
        await prisma.$transaction([
            prisma.offer.update({
                where: { id: offerId },
                data: { status: "ACCEPTED" },
            }),
            prisma.offer.updateMany({
                where: {
                    taskId: verifiedOffer.taskId,
                    id: { not: offerId },
                },
                data: { status: "REJECTED" },
            }),
        ]);
    } else {
        // If rejected: update the status of this specific offer only
        await prisma.offer.update({
            where: { id: offerId },
            data: { status: "REJECTED" },
        });
    }

    revalidatePath("/profil/edytuj");
};
