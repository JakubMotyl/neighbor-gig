import Link from "next/link";
import Logo from "../shared/Logo";

interface FooterLink {
    name: string;
    href: string;
}

interface FooterGroup {
    title: string;
    links: FooterLink[];
}

const FOOTER_LINKS: FooterGroup[] = [
    {
        title: "Platforma",
        links: [
            { name: "Jak to działa", href: "/jak-to-dziala" },
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

export default function Footer() {
    return (
        <footer className="px-default pt-4 md:pt-6 pb-2 md:pb-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 mb-12">
                {FOOTER_LINKS.map((group) => (
                    <div key={group.title} className="flex flex-col space-y-4">
                        <p className="text-base font-bold text-text-main">
                            {group.title}
                        </p>
                        <ul className="flex flex-col space-y-3">
                            {group.links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2 border-t border-gray-200">
                <Logo />

                <p className="text-sm text-text-muted text-center md:text-left">
                    © {new Date().getFullYear()} Gigo. Wszystkie prawa
                    zastrzeżone.
                </p>
            </div>
        </footer>
    );
}
