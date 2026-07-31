import Link from "next/link";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const session = await auth();
    if (session) redirect("/");

    return (
        <main className="min-h-screen w-full bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Dołącz do Gigger
                    </h1>
                    <p className="text-sm text-slate-500">
                        Utwórz konto, aby zlecać lub przyjmować zadania
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

                <form className="space-y-4">
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                        >
                            Adres e-mail
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="jan@kowalski.pl"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                        >
                            Hasło
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-md shadow-slate-900/10"
                    >
                        Zarejestruj się
                    </button>
                </form>

                <div className="text-center pt-2 border-t border-gray-50">
                    <p className="text-sm text-slate-500">
                        Masz już konto?{" "}
                        <Link
                            href="/logowanie"
                            className="font-semibold text-primary hover:underline transition-all"
                        >
                            Zaloguj się
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
