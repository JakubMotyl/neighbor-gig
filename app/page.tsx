import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Home/Hero";
import PopularTasks from "@/components/Home/PopularTasks";

export default function Home() {
    return (
        <header className="min-h-dvh">
            <Navbar />
            <Hero />
            <PopularTasks />
        </header>
    );
}
