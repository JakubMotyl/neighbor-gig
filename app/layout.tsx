import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin", "latin-ext"],
    variable: "--font-inter",
    display: "swap",
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
        <html lang="pl" className={`${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
