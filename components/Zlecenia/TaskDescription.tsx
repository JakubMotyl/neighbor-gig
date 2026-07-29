export default function TaskDescription({
    description,
}: {
    description: string;
}) {
    return (
        <section aria-labelledby="description-heading" className="space-y-3">
            <h2
                id="description-heading"
                className="text-xl font-bold text-text-main"
            >
                Opis zadania
            </h2>
            <p className="text-text-muted leading-relaxed whitespace-pre-line text-base sm:text-lg">
                {description}
            </p>
        </section>
    );
}
