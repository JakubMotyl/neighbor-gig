import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nie znaleziono strony | Gigo",
    description: "Niestety, strona której szukasz nie istnieje.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
            <div className="max-w-md w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                <h1 className="text-9xl font-black text-gray-200 tracking-tighter mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-bold text-text-main mb-3">
                    Zgubiliśmy się?
                </h2>
                <p className="text-text-muted mb-8 text-base">
                    Strona, której szukasz, mogła zostać usunięta, zmieniła
                    adres lub nigdy nie istniała.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Wróć na stronę główną
                </Link>
            </div>
        </main>
    );
}
