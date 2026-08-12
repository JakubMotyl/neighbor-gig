"use server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema, forgotPasswordSchema } from "@/lib/zod";
import { Resend } from "resend";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const forgotPassword = async (prevState: any, formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const formattedData = forgotPasswordSchema.safeParse(rawData);

    if (!formattedData.success) {
        return { error: "Nieprawidłowy adres e-mail." };
    }

    const user = await prisma.user.findUnique({
        where: {
            email: formattedData.data.email,
        },
    });

    // Prevents hakers from checking if some emails exist
    if (!user)
        return {
            success:
                "Jeśli e-mail istnieje w naszej bazie, wysłaliśmy link do resetu hasła.",
        };

    const cryptoToken = crypto.randomUUID();

    try {
        await prisma.passwordResetToken.create({
            data: {
                email: formattedData.data.email,
                token: cryptoToken,
                expires: new Date(Date.now() + 900000), //Reset password link is activated for 15 mins
            },
        });

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: formattedData.data.email,
            subject: "Reset hasła",
            html: `<p>Kliknij <a href="http://localhost:3000/nowe-haslo?token=${cryptoToken}">tutaj</a>, aby zresetować hasło. Link wygasa za 15 minut.</p>`,
        });
    } catch (error) {
        return { error: "Coś poszło nie tak" };
    }

    return {
        success:
            "Jeśli e-mail istnieje w naszej bazie, wysłaliśmy link do resetu hasła.",
    };
};

export const resetPassword = async (prevState: any, formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries());
    const formattedData = resetPasswordSchema.safeParse(rawData);

    if (!formattedData.success)
        return {
            error: "Niepoprawne hasło",
        };

    const tokenRecord = await prisma.passwordResetToken.findUnique({
        where: {
            token: formattedData.data.token,
        },
    });
    if (!tokenRecord) return { error: "Nieprawidłowy token." };
    if (tokenRecord.expires < new Date())
        return { error: "Token wygasł. Wygeneruj nowy link." };

    const hashedPassowrd = await bcrypt.hash(formattedData.data.password, 10);

    await prisma.user.update({
        where: {
            email: tokenRecord.email,
        },
        data: {
            password: hashedPassowrd,
        },
    });

    await prisma.passwordResetToken.delete({
        where: {
            token: tokenRecord.token,
        },
    });

    return { success: "Hasło zostało pomyślnie zmienione!" };
};
