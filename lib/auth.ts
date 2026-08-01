import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn } = NextAuth({
    adapter,
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password,
                    },
                });

                if (!user) {
                    throw new Error("Invalid credentials.");
                }
                return user;
            },
        }),
    ],
});
