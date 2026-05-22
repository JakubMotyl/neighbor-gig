export interface FooterLink {
    name: string;
    href: string;
}

interface FooterGroup {
    title: string;
    links: FooterLink[];
}

export const FOOTER_LINKS: FooterGroup[] = [
    {
        title: "Platforma",
        links: [
            { name: "Jak to działa", href: "/#jak-to-dziala" },
            { name: "FAQ", href: "/#faq" },
            { name: "Kontakt", href: "/kontakt" },
        ],
    },
    {
        title: "Dla Użytkowników",
        links: [
            { name: "Zlecaj zadania", href: "/zlecenia" },
            { name: "Zostań Wykonawcą", href: "/rejestracja" },
            { name: "Gig-Boost", href: "/gig-boost" },
            { name: "Bezpieczeństwo", href: "/bezpieczenstwo" },
        ],
    },
    {
        title: "Informacje prawne",
        links: [
            { name: "Regulamin", href: "/regulamin" },
            { name: "Polityka prywatności", href: "/polityka-prywatnosci" },
            { name: "Polityka Cookies", href: "/cookies" },
        ],
    },
];
