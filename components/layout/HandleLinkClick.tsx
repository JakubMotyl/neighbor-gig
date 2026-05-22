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
        // Dynamic handling for all homepage internal anchor links
        if (href.startsWith("/#")) {
            const id = href.replace("/#", "");

            // Supporting both dynamic sections seamlessly
            if (id === "jak-to-dziala" || id === "faq") {
                e.preventDefault(); // Stop native navigation

                if (pathname === "/") {
                    // Already on homepage -> execute smooth scroll immediately
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                } else {
                    // On another page -> push to homepage with clean query param
                    router.push(`/?scroll=${id}`);
                }
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
