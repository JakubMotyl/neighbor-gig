import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Home/Hero";
import PopularTasks from "@/components/Home/PopularTasks";
import TrustAndPro from "@/components/Home/TrustAndPro";

export default function Home() {
    return (
        <>
            <header className="min-h-dvh">
                <Navbar />
                <Hero />
            </header>
            <PopularTasks />
            <TrustAndPro />
        </>
    );
}
