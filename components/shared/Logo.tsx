import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link
            href={"/"}
            aria-label="Strona główna Gigo"
            className="shrink-0 block"
        >
            <Image
                src={"/images/gigo-logo.png"}
                alt="Gigo logo"
                width={180}
                height={55}
                priority
                fetchPriority="high"
                className="object-contain"
            />
        </Link>
    );
}
