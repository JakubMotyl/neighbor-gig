import { Suspense } from "react";
import ZleceniaSearch from "@/components/Zlecenia/ZleceniaSearch";
import Navbar from "@/components/layout/Navbar";
import { theme } from "@/styles/theme";
import { MOCK_TASKS } from "@/constants/mocks";
import SortTabs from "@/components/Zlecenia/SortTabs";
import ZleceniaList from "@/components/Zlecenia/ZleceniaList";

export default function Zlecenia() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className={`${theme.layout.sectionSpacing} flex flex-col`}>
                <Suspense
                    fallback={
                        <div className="h-20 animate-pulse bg-gray-100 rounded-3xl max-w-5xl mx-auto" />
                    }
                >
                    <ZleceniaSearch />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="h-12 animate-pulse bg-gray-50 rounded-2xl max-w-5xl mx-auto" />
                    }
                >
                    <SortTabs />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="h-12 animate-pulse bg-gray-50 rounded-2xl max-w-5xl mx-auto" />
                    }
                >
                    <ZleceniaList mock={MOCK_TASKS} />
                </Suspense>
            </main>
        </>
    );
}
