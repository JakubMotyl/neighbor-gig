import Link from "next/link";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";
import { Toast } from "@/components/auth/Toast";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const session = await auth();
    if (session) redirect("/");

    const params = await searchParams;

    return (
        <main className="relative min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Witaj z powrotem
                    </h1>
                    <p className="text-sm text-slate-500">
                        Zaloguj się do swojego konta w Gigger
                    </p>
                </div>

                <div className="space-y-4">
                    <GoogleSignIn />

                    <div className="relative flex items-center justify-center">
                        <div className="w-full border-t border-gray-200" />
                        <span className="absolute bg-white px-3 text-xs uppercase text-slate-400 font-medium">
                            lub kontynuuj e-mailem
                        </span>
                    </div>
                </div>

                <LoginForm />

                <div className="text-center pt-2 border-t border-gray-50">
                    <p className="text-sm text-slate-500">
                        Nie masz jeszcze konta?{" "}
                        <Link
                            href="/rejestracja"
                            className="font-semibold text-primary hover:underline transition-all"
                        >
                            Zarejestruj się
                        </Link>
                    </p>
                </div>
            </div>

            <Toast errorType={params?.error} />
        </main>
    );
}
