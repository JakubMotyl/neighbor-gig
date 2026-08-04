"use server";

import { executeAction } from "./executeAction";
import { prisma } from "./prisma";
import { schema } from "./schemas";
import bcrypt from "bcryptjs";
import { signIn } from "./auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

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

            if (existingUser) {
                return redirect("/rejestracja?error=UserExists");
            }

            await prisma.user.create({
                data: {
                    name: validatedData.email.split("@")[0],
                    email: validatedData.email.toLowerCase(),
                    password: hashedPassword,
                },
            });

            await signIn("credentials", {
                email: validatedData.email,
                password: validatedData.password,
                redirectTo: "/",
            });
        },
    });
};

const signInWithCredentials = async (formData: FormData) => {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError)
            redirect(`/logowanie?error=InvalidCredentials`);

        throw error;
    }
};

export { signUp, signInWithCredentials };
