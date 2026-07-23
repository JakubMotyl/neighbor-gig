import { prisma } from "@/lib/prisma";
import { MOCK_TASKS } from "@/constants/mocks";

async function main() {
    console.log("Seeding the database...");

    await prisma.task.deleteMany();

    console.log("The old database has been cleaned.");

    for (const task of MOCK_TASKS) {
        const { id, ...dataToSave } = task;

        await prisma.task.create({
            data: { ...dataToSave },
        });

        console.log(`${task.title} has been added.`);
    }

    console.log("Database has been seeded.");
}

main()
    .catch((e) => {
        console.error("Error while seeding the database", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
