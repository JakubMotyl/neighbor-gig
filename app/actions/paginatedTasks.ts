"use server";

import { prisma } from "@/lib/prisma";
import { TasksPaginatedResponse } from "@/types/pagination";
import { Prisma } from "@/lib/generated/prisma/client";

export async function getPaginatedTasks(
    skip: number = 0,
    take: number = 10,
    category?: string,
    keyword?: string,
    sort?: string,
): Promise<TasksPaginatedResponse> {
    let where: Prisma.TaskWhereInput = {
        offers: {
            none: {
                status: "ACCEPTED",
            },
        },
    };

    if (category) {
        where.categorySlug = category;
    }

    if (keyword) {
        where.title = {
            contains: keyword,
            mode: "insensitive",
        };
    }

    if (sort === "verified") {
        where.author = {
            isVerified: true,
        };
    }

    let orderBy: Prisma.TaskOrderByWithRelationInput[] = [
        { isBoosted: "desc" },
        { createdAt: "desc" },
    ];

    if (sort === "rating") {
        orderBy = [{ isBoosted: "desc" }, { author: { rating: "desc" } }];
    }

    const tasks = await prisma.task.findMany({
        where,
        skip,
        take,
        orderBy,

        include: {
            author: true,
        },
    });

    const totalTasks = await prisma.task.count({ where });

    const nextSkip = skip + take;
    const hasMore = nextSkip < totalTasks;

    return {
        tasks,
        nextSkip: hasMore ? nextSkip : null,
        hasMore,
        totalTasks,
    };
}
