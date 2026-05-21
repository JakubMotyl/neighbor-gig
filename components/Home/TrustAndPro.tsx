import { theme } from "@/styles/theme";
import StripeVerification from "./StripeVerification";
import GigBoostSection from "./GigBoostSection";

export default function TrustAndPro() {
    return (
        <section>
            <div className={theme.layout.sectionSpacing}>
                <StripeVerification />
            </div>

            <div
                className={`${theme.layout.sectionSpacing} bg-primary/5 border-t border-b border-gray-100/50`}
            >
                <GigBoostSection />
            </div>
        </section>
    );
}
