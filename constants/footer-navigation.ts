import type { SiteLink } from "./navigation";

interface FooterGroup {
    title: string;
    links: SiteLink[];
}

export const FOOTER_LINKS: FooterGroup[] = [
    {
        title: "Platforma",
        links: [
            { name: "Jak to działa", href: "/#jak-to-dziala" },
            { name: "FAQ", href: "/#faq" },
            { name: "Kontakt", href: "#" },
        ],
    },
    {
        title: "Dla Użytkowników",
        links: [
            { name: "Zlecaj zadania", href: "/zlecenia" },
            { name: "Zostań Wykonawcą", href: "#" },
            { name: "Gig-Boost", href: "#" },
            { name: "Bezpieczeństwo", href: "#" },
        ],
    },
    {
        title: "Informacje prawne",
        links: [
            { name: "Regulamin", href: "#" },
            { name: "Polityka prywatności", href: "#" },
            { name: "Polityka Cookies", href: "#" },
        ],
    },
];
