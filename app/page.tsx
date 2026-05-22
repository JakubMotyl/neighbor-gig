import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Home/Hero";
import PopularTasks from "@/components/Home/PopularTasks";
import TrustAndPro from "@/components/Home/TrustAndPro";
import HowItWorks from "@/components/Home/HowItWorks";
import ScrollHandler from "@/components/Home/ScrollHandler";

export default function HomePage() {
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
        </>
    );
}
