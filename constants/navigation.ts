export interface SiteLink {
    name: string;
    href: string;
}

export const NAV_LINKS: SiteLink[] = [
    { name: "Oferty", href: "/zlecenia" },
    { name: "Jak to działa", href: "/#jak-to-dziala" },
    { name: "Kontakt", href: "/kontakt" },
];
