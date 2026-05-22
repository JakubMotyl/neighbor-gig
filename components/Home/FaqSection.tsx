import { theme } from "@/styles/theme";

interface FaqItemsProps {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FaqItemsProps[] = [
    {
        question: "Czy korzystanie z Gigo jest płatne?",
        answer: "Dla osób zlecających zadania platforma jest w 100% darmowa. Wykonawcy płacą jedynie drobną prowizję od zrealizowanego zlecenia lub mogą skorzystać z opcji Gig-Boost, aby wyróżnić swoje oferty.",
    },
    {
        question: "Jak dbacie o bezpieczeństwo transakcji?",
        answer: "Korzystamy z integracji ze Stripe Identity. Każdy użytkownik może zweryfikować swoją tożsamość, zdobywając niebieski znaczek zaufania. Dodatkowo nasz system opinii pomaga budować bezpieczną społeczność.",
    },
    {
        question: "Kto może zostać wykonawcą (Giggerem)?",
        answer: "Każda pełnoletnia osoba, która chce dorobić w wolnym czasie i potrafi pomóc w codziennych sprawach – od składania mebli, przez wyprowadzanie psów, po drobne naprawy.",
    },
    {
        question: "Co zrobić, jeśli wykonawca nie wykona zadania?",
        answer: "Twój spokój to nasz priorytet. W przypadku sporów nasz zespół wsparcia pomaga w mediacjach, a niewywiązanie się z umowy skutkuje obniżeniem oceny lub blokadą konta wykonawcy.",
    },
];

export default function FaqSection() {
    return (
        <section id="faq" className={theme.layout.sectionSpacing}>
            <div className="text-center max-w-2xl mx-auto space-y-5 flex flex-col items-center mb-12">
                <span
                    className={`${theme.typography.sectionBadge} text-primary`}
                >
                    FAQ
                </span>
                <h2 className={theme.typography.sectionTitle}>
                    Często zadawane pytania
                </h2>
                <p className={theme.typography.sectionSubtitle}>
                    Masz wątpliwości? Zobacz odpowiedzi na najpopularniejsze
                    pytania naszej społeczności.
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {FAQ_ITEMS.map((item, index) => (
                    <details
                        key={index}
                        name="faq-accordion"
                        className="group border border-gray-100 rounded-2xl bg-surface [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:shadow-md open:border-primary/20"
                    >
                        <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer focus:outline-none select-none">
                            <p className="text-base md:text-lg font-bold text-text-main group-hover:text-primary transition-colors duration-200">
                                {item.question}
                            </p>
                            <span className="relative shrink-0 w-6 h-6 text-text-muted group-hover:text-primary transition-colors duration-200">
                                <span className="absolute inset-0 flex items-center justify-center text-xl font-medium leading-none transition-transform duration-300 group-open:rotate-45">
                                    +
                                </span>
                            </span>
                        </summary>
                        <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-gray-50 pt-4">
                            <p className="text-sm md:text-base text-text-muted leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
