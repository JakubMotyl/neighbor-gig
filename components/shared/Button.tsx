import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    ariaLabel?: string;
    variant?: "primary" | "outline" | "ghost";
}

export default function Button({
    children,
    href,
    onClick,
    className = "",
    ariaLabel,
    variant = "primary",
}: ButtonProps) {
    const baseClasses = `inline-flex items-center justify-center rounded-md px-4 py-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer duration-300`;

    const variants = {
        primary:
            "bg-primary border border-primary text-surface hover:border-primary-hover hover:bg-primary-hover",
        outline:
            "bg-transparent text-text-main border border-text-muted hover:text-primary hover:border-primary",
        ghost: "bg-transparent text-text-main hover:bg-gray-100 border border-transparent",
    };

    const finalClasses = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} aria-label={ariaLabel} className={finalClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={finalClasses}
        >
            {children}
        </button>
    );
}
