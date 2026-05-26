import {
    Wrench,
    Sparkles,
    Truck,
    Dog,
    TreePine,
    ShoppingBag,
    MoreHorizontal,
    type LucideIcon,
} from "lucide-react";

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: LucideIcon;
}

export const GIG_CATEGORIES: Category[] = [
    {
        id: "repairs",
        name: "Montaż i naprawy",
        slug: "montaz-i-naprawy",
        icon: Wrench,
    },
    {
        id: "cleaning",
        name: "Sprzątanie",
        slug: "sprzatanie",
        icon: Sparkles,
    },
    {
        id: "transport",
        name: "Transport",
        slug: "transport",
        icon: Truck,
    },
    {
        id: "pets",
        name: "Zwierzęta",
        slug: "zwierzeta",
        icon: Dog,
    },
    {
        id: "garden",
        name: "Ogród",
        slug: "ogrod",
        icon: TreePine,
    },
    {
        id: "shopping",
        name: "Zakupy",
        slug: "zakupy",
        icon: ShoppingBag,
    },
    {
        id: "other",
        name: "Inne zadania",
        slug: "inne",
        icon: MoreHorizontal,
    },
];
