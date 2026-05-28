import ZleceniaSearch from "@/components/Zlecenia/ZleceniaSearch";
import Navbar from "@/components/layout/Navbar";
import { theme } from "@/styles/theme";
import { MOCK_TASKS } from "@/constants/categories";

export default function Zlecenia() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className={`${theme.layout.sectionSpacing} flex flex-col`}>
                <ZleceniaSearch />
            </main>
        </>
    );
}
