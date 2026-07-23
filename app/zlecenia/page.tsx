import { Suspense } from "react";
import ZleceniaSearch from "@/components/Zlecenia/ZleceniaSearch";
import Navbar from "@/components/layout/Navbar";
import { theme } from "@/styles/theme";
import SortTabs from "@/components/Zlecenia/SortTabs";
import ZleceniaList from "@/components/Zlecenia/ZleceniaList";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

export default async function Zlecenia({
    searchParams,
}: {
    searchParams: Promise<{
        sort?: string;
        keyword?: string;
        category?: string;
    }>;
}) {
    const resolvedParams = await searchParams;
    const sort = resolvedParams.sort;
    const keyword = resolvedParams.keyword;
    const category = resolvedParams.category;

    let whereConditions: Prisma.TaskWhereInput = {};

    if (keyword) {
        whereConditions.title = {
            contains: keyword,
            mode: "insensitive",
        };
    }

    if (category) {
        whereConditions.categorySlug = category;
    }

    if (sort === "verified") {
        whereConditions.authorVerified = true;
    }

    let orderByConditions: Prisma.TaskOrderByWithRelationInput[] = [
        { isBoosted: "desc" },
        { authorRating: "desc" },
    ];

    if (sort === "rating") {
        orderByConditions = [{ isBoosted: "desc" }, { authorRating: "desc" }];
    }

    const tasks = await prisma.task.findMany({
        where: whereConditions,
        orderBy: orderByConditions,
    });

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className={`${theme.layout.sectionSpacing} flex flex-col`}>
                <Suspense
                    fallback={
                        <div className="h-20 animate-pulse bg-gray-100 rounded-3xl max-w-5xl mx-auto" />
                    }
                >
                    <ZleceniaSearch />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="h-12 animate-pulse bg-gray-50 rounded-2xl max-w-5xl mx-auto" />
                    }
                >
                    <SortTabs />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="h-12 animate-pulse bg-gray-50 rounded-2xl max-w-5xl mx-auto" />
                    }
                >
                    <ZleceniaList tasks={tasks} />
                </Suspense>
            </main>
        </>
    );
}
