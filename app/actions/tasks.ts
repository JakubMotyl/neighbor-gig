"use server";

import { prisma } from "@/lib/prisma";
import { TasksPaginatedResponse } from "@/types/pagination";

export async function getPaginatedTasks(
    skip: number = 0,
    take: number = 6,
): Promise<TasksPaginatedResponse> {
    const tasks = await prisma.task.findMany({
        skip,
        take,
        orderBy: {
            createdAt: "desc",
        },
    });

    const totalTasks = await prisma.task.count();
    const nextSkip = skip + take;
    const hasMore = nextSkip < totalTasks;

    return {
        tasks,
        nextSkip: hasMore ? nextSkip : null,
        hasMore,
    };
}
