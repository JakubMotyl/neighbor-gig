"use client";

import Link from "next/link";
import type { SiteLink } from "@/constants/navigation";
import { usePathname, useRouter } from "next/navigation";

const DEFAULT_LINK_CLASS =
    "text-sm text-text-muted hover:text-primary transition-colors duration-200";

interface HandleLinkClickProps {
    link: SiteLink;
    className?: string;
}

// Intercepts anchor links to enable smooth scrolling and prevent URL hash pollution
export default function HandleLinkClick({
    link,
    className = DEFAULT_LINK_CLASS,
}: HandleLinkClickProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!link.href.startsWith("/#")) return;

        const id = link.href.replace("/#", "");

        if (id !== "jak-to-dziala" && id !== "faq") return;

        e.preventDefault();

        if (pathname === "/") {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/?scroll=${id}`);
        }
    };

    return (
        <Link href={link.href} onClick={handleClick} className={className}>
            {link.name}
        </Link>
    );
}
