import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center justify-center shrink-0 h-10 md:h-12 w-24 md:w-28 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Gigo - strona główna"
        >
            <Image
                src="/images/gigo-logo.png"
                alt="Gigo Logo"
                width={160}
                height={80}
                priority
                className="w-full h-full object-contain scale-[1.7] translate-y-px"
            />
        </Link>
    );
}
