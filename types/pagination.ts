import { Task } from "@/lib/generated/prisma/client";

export interface TasksPaginatedResponse {
    tasks: Task[];
    nextSkip: number | null;
    hasMore: boolean;
}
