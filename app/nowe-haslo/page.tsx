import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { prisma } from "@/lib/prisma"; // Importujemy prismę

export default async function NoweHasloPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const params = await searchParams;
    const token = params.token;

    let isValid = false;
    if (token) {
        const tokenRecord = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (tokenRecord && tokenRecord.expires > new Date()) {
            isValid = true;
        }
    }

    if (!isValid) {
        return (
            <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <div className="bg-surface p-8 rounded-3xl border border-red-100 shadow-sm text-center max-w-md w-full">
                    <h1 className="text-xl font-bold text-red-600 mb-2">
                        Token wygasł lub jest nieprawidłowy
                    </h1>
                    <p className="text-sm text-text-muted mb-6">
                        Twój link resetujący nie jest już aktywny. Proszę
                        wygeneruj nowy.
                    </p>
                    <Link
                        href="/przypomnij-haslo"
                        className="text-sm font-bold text-primary hover:underline"
                    >
                        Wygeneruj nowy link
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
            <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-gray-100 shadow-sm">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-text-main mb-2">
                        Ustaw nowe hasło
                    </h1>
                </header>
                <ResetPasswordForm token={token!} />
            </div>
        </main>
    );
}
