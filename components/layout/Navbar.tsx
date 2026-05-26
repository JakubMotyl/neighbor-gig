import Button from "../shared/Button";
import Logo from "../shared/Logo";
import MobileMenu from "./MobileMenu";
import { theme } from "@/styles/theme";
import { NAV_LINKS } from "@/constants/navigation";
import HandleLinkClick from "./HandleLinkClick";

export default function Navbar() {
    return (
        <nav className="px-default relative h-16 md:h-18 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-8 h-full">
                <Logo />
                {/* Show Links on MD+ Devices */}
                <ul className="hidden md:flex items-center space-x-5">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <HandleLinkClick
                                link={link}
                                className={theme.interactions.navLink}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            {/* Right Side - MD+ Devices */}
            <div className="hidden md:flex items-center space-x-4 h-full">
                <Button href="/logowanie" variant="outline">
                    Logowanie
                </Button>
                <Button href="/rejestracja" variant="primary">
                    Dołącz
                </Button>
            </div>

            {/* Right Side - MD- Devices */}
            <MobileMenu />
        </nav>
    );
}
