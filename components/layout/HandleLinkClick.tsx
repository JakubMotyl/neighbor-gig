"use client";
import Link from "next/link";
import type { FooterLink } from "@/constants/footer-navigation";
import { usePathname, useRouter } from "next/navigation";

interface HandleLinkClickProps {
    link: FooterLink;
}

// Intercepts anchor links to enable smooth scrolling and prevent URL hash pollution
export default function HandleLinkClick({ link }: HandleLinkClickProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        if (href === "/#jak-to-dziala") {
            e.preventDefault();

            if (pathname === "/") {
                const element = document.getElementById("jak-to-dziala");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                router.push("/?scroll=jak-to-dziala");
            }
        }
    };

    return (
        <Link
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="text-sm text-text-muted hover:text-primary transition-colors duration-200"
        >
            {link.name}
        </Link>
    );
}
