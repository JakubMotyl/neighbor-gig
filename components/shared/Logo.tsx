import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link
            href={"/"}
            aria-label="Strona główna Gigo"
            className="shrink-0 max-w-34 block"
        >
            <Image
                src={"/images/gigo-logo.png"}
                alt="Gigo logo"
                width={160}
                height={50}
                priority
                fetchPriority="high"
                className="w-auto h-auto"
            />
        </Link>
    );
}
