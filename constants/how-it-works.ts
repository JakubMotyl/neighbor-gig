import {
    ClipboardPlus,
    Users,
    CheckCircle2,
    Search,
    Wallet,
    Star,
} from "lucide-react";

interface StepsProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

export const CLIENT_STEPS: StepsProps[] = [
    {
        icon: ClipboardPlus,
        title: "Dodaj zadanie",
        description:
            "Opisz krótko, co masz do zrobienia, określ budżet i ramy czasowe.",
    },
    {
        icon: Users,
        title: "Wybierz sąsiada",
        description:
            "Przeglądaj zgłoszenia od zweryfikowanych wykonawców i wybierz najlepszą ofertę.",
    },
    {
        icon: CheckCircle2,
        title: "Odzyskaj czas",
        description:
            "Zlecenie zostaje wykonane, a Ty bezpiecznie rozliczasz się przez platformę.",
    },
];

export const GIGGER_STEPS: StepsProps[] = [
    {
        icon: Search,
        title: "Przeglądaj zlecenia",
        description:
            "Filtruj aktywne zadania w Twojej okolicy i zgłaszaj chęć do pomocy.",
    },
    {
        icon: Wallet,
        title: "Zarabiaj lokalnie",
        description:
            "Realizuj zadania na własnych warunkach i buduj swój portfel dochodów.",
    },
    {
        icon: Star,
        title: "Zbieraj opinie",
        description:
            "Wykonuj świetną robotę, zdobywaj gwiazdki i zyskuj więcej stałych klientów.",
    },
];
