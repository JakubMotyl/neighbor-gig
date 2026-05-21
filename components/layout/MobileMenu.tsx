"use client";
import Button from "../shared/Button";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { theme } from "@/styles/theme";

export default function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    return (
        <div className="md:hidden flex">
            <Button
                onClick={toggleMenu}
                className="w-9 h-8 rounded-full! p-2! flex! flex-col! justify-between! bg-primary hover:translate-y-0!"
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

            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-background border-b border-gray-200 md:hidden flex flex-col p-4 shadow-lg z-50">
                    <ul className="flex flex-col space-y-5">
                        {NAV_LINKS.map((link, index) => (
                            <li key={index} className=" text-center">
                                <Link
                                    href={link.link}
                                    onClick={toggleMenu}
                                    className={theme.interactions.navLink}
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
        </div>
    );
}
