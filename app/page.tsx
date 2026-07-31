import Hero from "@/components/Home/Hero";
import PopularTasks from "@/components/Home/PopularTasks";
import TrustAndPro from "@/components/Home/TrustAndPro";
import HowItWorks from "@/components/Home/HowItWorks";
import ScrollHandler from "@/components/Home/ScrollHandler";
import FaqSection from "@/components/Home/FaqSection";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
    return (
        <>
            <ScrollHandler />
            <Hero />
            <PopularTasks />
            <TrustAndPro />
            <HowItWorks />
            <FaqSection />
        </>
    );
}
