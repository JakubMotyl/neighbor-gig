"use client";
import Link from "next/link";
import Button from "../shared/Button";
import Logo from "../shared/Logo";
import { useState } from "react";

const NAV_LINKS: Record<string, string>[] = [
    { link: "/zlecenia", name: "Oferty" },
    { link: "/jak-to-dziala", name: "Jak to działa" },
    { link: "/kontakt", name: "Kontakt" },
];

const navLinkClasses =
    "relative text-base font-medium text-text-main transition-colors duration-300 hover:text-primary after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="px-default relative h-16 md:h-18 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-8 h-full">
                <Logo />
                {/* Show Links on MD+ Devices */}
                <ul className="hidden md:flex items-center space-x-5">
                    {NAV_LINKS.map((link, index) => (
                        <li key={index}>
                            <Link href={link.link} className={navLinkClasses}>
                                {link.name}
                            </Link>
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
            <div className="md:hidden flex">
                <Button
                    onClick={toggleMenu}
                    className="w-9 h-8 rounded-full! p-2! flex! flex-col! justify-between! bg-primary"
                    ariaLabel={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                >
                    <div
                        className={`w-full h-0.5 bg-surface rounded-full transition-all duration-300 origin-center ${
                            isMenuOpen ? "rotate-45 translate-y-1.25" : ""
                        }`}
                    ></div>
                    <div
                        className={`w-full h-0.5 bg-surface rounded-full transition-all duration-300 ${
                            isMenuOpen ? "opacity-0" : "opacity-100"
                        }`}
                    ></div>
                    <div
                        className={`w-full h-0.5 bg-surface rounded-full transition-all duration-300 origin-center ${
                            isMenuOpen ? "-rotate-45 -translate-y-1.75" : ""
                        }`}
                    ></div>
                </Button>
            </div>

            {/* Hamburger Menu - MD- Devices */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-background border-b border-gray-200 md:hidden flex flex-col p-4 shadow-lg z-50">
                    <ul className="flex flex-col space-y-5">
                        {NAV_LINKS.map((link, index) => (
                            <li key={index} className=" text-center">
                                <Link
                                    href={link.link}
                                    onClick={toggleMenu}
                                    className={navLinkClasses}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex flex-col space-y-3">
                        <Button
                            href="/logowanie"
                            className="w-full"
                            variant="outline"
                        >
                            Logowanie
                        </Button>
                        <Button
                            href="/rejestracja"
                            className="w-full"
                            variant="primary"
                        >
                            Dołącz
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
