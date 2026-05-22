import Logo from "../shared/Logo";
import HandleLinkClick from "./HandleLinkClick";
import { FOOTER_LINKS } from "@/constants/footer-navigation";

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
                                    <HandleLinkClick link={link} />
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
