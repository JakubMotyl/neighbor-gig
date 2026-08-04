"use client";
import Button from "../shared/Button";
import { useState } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { theme } from "@/styles/theme";
import HandleLinkClick from "./HandleLinkClick";
import { SignOut } from "../auth/SignOut";
import Image from "next/image";
import Link from "next/link";

export default function MobileMenu({ session }: { session: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const userInitial = (session?.user?.name || session?.user?.email || "U")
        .charAt(0)
        .toUpperCase();

    return (
        <div className="md:hidden flex">
            <Button
                onClick={() => setIsMenuOpen((prev) => !prev)}
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
                <div className="absolute top-full left-0 right-0 w-full bg-background opacity-100 border-b border-gray-200 shadow-2xl p-6 flex flex-col space-y-6 z-50">
                    <ul className="flex flex-col space-y-4">
                        {NAV_LINKS.map((link) => (
                            <li
                                key={link.href}
                                className="text-center"
                                onClick={closeMenu}
                            >
                                <HandleLinkClick
                                    link={link}
                                    className={theme.interactions.navLink}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                        <Button
                            href="/dodaj-zlecenie"
                            className="w-full text-sm py-2.5 font-bold shadow-sm shadow-primary/20"
                            variant="primary"
                            onClick={closeMenu}
                        >
                            + Dodaj zlecenie
                        </Button>

                        {session?.user ? (
                            <div className="flex flex-col items-center gap-3 pt-2">
                                <Link
                                    href="/profil"
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl max-w-full hover:bg-gray-200/70 transition-colors"
                                >
                                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs shrink-0 overflow-hidden">
                                        {session.user.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt="Avatar"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span>{userInitial}</span>
                                        )}
                                    </div>
                                    <span className="text-xs font-semibold text-text-main truncate">
                                        {session.user.name ||
                                            session.user.email}
                                    </span>
                                </Link>

                                <div onClick={closeMenu} className="w-full">
                                    <SignOut />
                                </div>
                            </div>
                        ) : (
                            <Button
                                href="/logowanie"
                                className="w-full text-xs py-2 px-3 font-semibold"
                                variant="outline"
                                onClick={closeMenu}
                            >
                                Logowanie
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
