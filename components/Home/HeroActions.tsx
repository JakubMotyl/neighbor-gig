"use client";
import Button from "../shared/Button";

export default function HeroActions() {
    const scrollToHowItWorks = () => {        
        const element = document.getElementById("jak-to-dziala");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 pt-2 2xl:pt-4 w-full sm:w-auto">
            <Button
                href="/zlecenia"
                variant="primary"
                className="text-base md:text-lg 2xl:text-xl px-8 py-3 2xl:py-4 w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
                Znajdź pomoc
            </Button>

            <Button
                onClick={scrollToHowItWorks}
                variant="outline"
                className="text-base md:text-lg 2xl:text-xl px-8 py-3 2xl:py-4 w-full sm:w-auto bg-surface"
            >
                Jak to działa?
            </Button>
        </div>
    );
}
