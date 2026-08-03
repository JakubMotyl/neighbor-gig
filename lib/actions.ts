import { executeAction } from "./executeAction";
import { prisma } from "./prisma";
import { schema } from "./schema";
import bcrypt from "bcryptjs";

const signUp = async (formData: FormData) => {
    return executeAction({
        actionFn: async () => {
            const email = formData.get("email");
            const password = formData.get("password");
            const validatedData = schema.parse({ email, password });
            const hashedPassword = await bcrypt.hash(
                validatedData.password,
                10,
            );

            const existingUser = await prisma.user.findUnique({
                where: { email: validatedData.email.toLowerCase() },
            });

            if (existingUser)
                throw new Error(
                    "Użytkownik o podanym adresie e-mail już istnieje.",
                );

            await prisma.user.create({
                data: {
                    name: validatedData.email.split("@")[0],
                    email: validatedData.email.toLowerCase(),
                    password: hashedPassword,
                },
            });
        },
    });
};

export { signUp };
