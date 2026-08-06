import { Task, User } from "@/lib/generated/prisma/client";

export interface TasksPaginatedResponse {
    tasks: (Task & { author: User })[];
    nextSkip: number | null;
    hasMore: boolean;
    totalTasks: number;
}
