import Button from "../shared/Button";
import Logo from "../shared/Logo";
import MobileMenu from "./MobileMenu";
import { theme } from "@/styles/theme";
import { NAV_LINKS } from "@/constants/navigation";
import HandleLinkClick from "./HandleLinkClick";
import { auth } from "@/lib/auth";
import { SignOut } from "../auth/SignOut";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
    const session = await auth();

    const userInitial = (session?.user?.name || session?.user?.email || "U")
        .charAt(0)
        .toUpperCase();

    return (
        <nav className="px-default relative z-50 h-16 md:h-18 flex items-center justify-between border-b bg-background">
            {/* Left side */}
            <div className="flex items-center gap-6 xl:gap-8 h-full">
                <Logo />
                <ul className="hidden md:flex items-center space-x-5">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href} className="whitespace-nowrap">
                            <HandleLinkClick
                                link={link}
                                className={theme.interactions.navLink}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-3 h-full">
                <Button
                    href="/dodaj-zlecenie"
                    variant="primary"
                    className="text-xs py-2 px-3.5 font-bold whitespace-nowrap shadow-sm shadow-primary/20 hover:translate-y-0"
                >
                    + Dodaj zlecenie
                </Button>

                <div className="h-4 w-px bg-gray-200 mx-1" aria-hidden="true" />

                {session?.user ? (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/profil/edytuj"
                            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm hover:opacity-80 transition-opacity shrink-0 overflow-hidden"
                            title={
                                session.user.name ||
                                session.user.email ||
                                "Profil"
                            }
                        >
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
                        </Link>
                        <SignOut />
                    </div>
                ) : (
                    <Button
                        href="/logowanie"
                        variant="outline"
                        className="text-xs py-2 px-3.5 whitespace-nowrap hover:translate-y-0"
                    >
                        Logowanie
                    </Button>
                )}
            </div>

            {/* MobileMenu */}
            <div className="md:hidden flex items-center gap-2">
                <MobileMenu session={session} />
            </div>
        </nav>
    );
}
