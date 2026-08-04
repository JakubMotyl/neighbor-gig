import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { schema } from "./schemas";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";
import bcrypt from "bcryptjs";

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
                const validatedCredentials = schema.parse(credentials);

                const user = await prisma.user.findUnique({
                    where: { email: validatedCredentials.email },
                });

                if (!user || !user.password) {
                    throw new Error("Nieprawidłowy e-mail lub hasło.");
                }

                const passwordsMatch = await bcrypt.compare(
                    validatedCredentials.password,
                    user?.password,
                );

                if (!passwordsMatch) {
                    throw new Error("Nieprawidłowy e-mail lub hasło.");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user ID found in token");
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });

                if (!createdSession) {
                    throw new Error("Failed to create session");
                }

                return sessionToken;
            }
            return encode(params);
        },
    },
});
