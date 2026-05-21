import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { theme } from "@/styles/theme";

export default function StripeVerification() {
    return (
        <div className={`${theme.layout.gridSplit} py-12 md:py-16`}>
            {/* LEFT SIDE - TEXT */}
            <div className="flex flex-col justify-center items-start space-y-5 md:space-y-6">
                <div
                    className={`${theme.typography.sectionBadge} text-primary`}
                >
                    <ShieldCheck className="w-5 h-5 text-gig" />
                    Bezpieczeństwo i Zaufanie
                </div>

                <h2 className={theme.typography.sectionTitle}>
                    Niebieski znaczek to <br /> Twoja gwarancja
                </h2>

                <p className={theme.typography.sectionSubtitle}>
                    Każdy użytkownik platformy może przejść bezpieczną
                    weryfikację tożsamości oraz potwierdzenie wieku 18+. To
                    oznacza, że współpracujesz wyłącznie ze sprawdzonymi i
                    realnymi osobami z Twojego sąsiedztwa.
                </p>

                <div className="pt-2 flex items-center gap-3 border border-gray-100 rounded-xl px-4 py-3 bg-surface select-none">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Weryfikacja przez:
                    </span>
                    <span className="text-xl font-bold tracking-tight text-[#635BFF]">
                        stripe{" "}
                        <span className="text-xs font-medium text-text-muted">
                            Identity
                        </span>
                    </span>
                </div>

                <div className="flex sm:flex-row flex-col sm:items-center items-start gap-6 pt-4">
                    <Link
                        href="/weryfikacja"
                        className="sm:px-8 sm:py-3 px-6 py-2.5 bg-primary hover:bg-primary-hover text-surface text-base sm:text-[19px] font-bold sm:font-extrabold tracking-wide rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Zweryfikuj się teraz
                    </Link>
                    <Link
                        href="/bezpieczenstwo"
                        className="group flex items-center gap-1 text-sm font-bold text-text-main hover:text-primary transition-colors duration-200"
                    >
                        Jak dbamy o bezpieczeństwo?
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div
                className={`${theme.components.imageWrapper} aspect-square md:aspect-video lg:aspect-square max-h-112.5`}
            >
                <Image
                    src="/images/trust-verification.webp"
                    alt="Trzech uśmiechniętych sąsiadów witających się w progu domu"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
}
