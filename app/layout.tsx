import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin", "latin-ext"],
    variable: "--font-jakarta",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
    title: "Gigo | Szybka pomoc w twojej okolicy",
    description:
        "Znajdź zaufanych sąsiadów do drobnych prac, montażu mebli i wyprowadzania psów. Bezpiecznie, szybko i lokalnie.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl" className={`${jakarta.variable} h-full antialiased bg-background`}>
            <body className="min-h-dvh flex flex-col">
                {children}
                <Footer />
            </body>
        </html>
    );
}
