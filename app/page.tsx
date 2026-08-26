import Hero from "@/components/Home/Hero";
import PopularTasks from "@/components/Home/PopularTasks";
import TrustAndPro from "@/components/Home/TrustAndPro";
import HowItWorks from "@/components/Home/HowItWorks";
import ScrollHandler from "@/components/Home/ScrollHandler";
import FaqSection from "@/components/Home/FaqSection";
import { Toast } from "@/components/auth/Toast";
import { Suspense } from "react";

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ success?: string }>;
}) {
    const params = await searchParams;
    return (
        <>
            <Suspense fallback={null}>
                <ScrollHandler />
            </Suspense>
            <Hero />
            <PopularTasks />
            <TrustAndPro />
            <HowItWorks />
            <FaqSection />
            <Toast successType={params.success} />
        </>
    );
}
