import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Home/Hero";
import PopularTasks from "@/components/Home/PopularTasks";
import TrustAndPro from "@/components/Home/TrustAndPro";
import HowItWorks from "@/components/Home/HowItWorks";
import ScrollHandler from "@/components/Home/ScrollHandler";
import FaqSection from "@/components/Home/FaqSection";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await auth();
    if (!session) redirect("/rejestracja");

    return (
        <>
            <ScrollHandler />
            <header className="min-h-dvh">
                <Navbar />
                <Hero />
            </header>
            <PopularTasks />
            <TrustAndPro />
            <HowItWorks />
            <FaqSection />
        </>
    );
}
