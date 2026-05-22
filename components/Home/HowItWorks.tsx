import { theme } from "@/styles/theme";
import { GIGGER_STEPS, CLIENT_STEPS } from "@/constants/how-it-works";

// constants for CONTAINER
const COLUMN_CONTAINER =
    "space-y-8 relative flex flex-col items-center lg:items-stretch";
const CARD_LIST_WRAPPER =
    "relative space-y-8 w-full flex flex-col items-center lg:pr-8";
const ITEM_GROUP_WRAPPER =
    "relative flex flex-col items-center text-center w-full group";

// constant for BADGE
const BADGE_BASE =
    "text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full";
const CLIENT_BADGE = `${BADGE_BASE} text-primary-hover bg-primary/10`;
const GIGGER_BADGE = `${BADGE_BASE} text-gig-hover bg-gig/10`;

// constants for CARD_CONTENT
const CARD_CONTENT_BASE = `${theme.components.card} max-w-md w-full p-6 items-center text-center`;
const CLIENT_CARD_CONTENT = `${CARD_CONTENT_BASE} lg:items-end lg:text-right`;
const GIGGER_CARD_CONTENT = `${CARD_CONTENT_BASE} lg:items-start lg:text-left`;

// constants for ICON
const ICON_WRAPPER_BASE =
    "inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3";
const CLIENT_ICON_WRAPPER = `${ICON_WRAPPER_BASE} bg-primary/10 text-primary`;
const GIGGER_ICON_WRAPPER = `${ICON_WRAPPER_BASE} bg-gig/10 text-gig`;

export default function HowItWorks() {
    return (
        <section id="jak-to-dziala" className={theme.layout.sectionSpacing}>
            <div className="text-center max-w-2xl mx-auto space-y-5 flex flex-col items-center">
                <span
                    className={`${theme.typography.sectionBadge} text-primary`}
                >
                    Krok po kroku
                </span>
                <h2 className={theme.typography.sectionTitle}>
                    Jak to działa?
                </h2>
                <p className={theme.typography.sectionSubtitle}>
                    Jedna platforma, dwie perspektywy. Zobacz, jakie to proste
                    niezależnie od tego, czy szukasz pomocy, czy chcesz dorobić.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative pt-8">
                {/* VERTICAL DIVIDER */}
                <div
                    className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-community/30 -translate-x-1/2 z-0"
                    aria-hidden="true"
                ></div>

                {/* LEFT SIDE */}
                <div className={COLUMN_CONTAINER}>
                    <div className="text-center lg:text-right lg:pr-8">
                        <span className={CLIENT_BADGE}>
                            Chcę zlecić zadanie
                        </span>
                    </div>

                    <div className={CARD_LIST_WRAPPER}>
                        {CLIENT_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className={ITEM_GROUP_WRAPPER}>
                                    <div className={CLIENT_CARD_CONTENT}>
                                        <div className={CLIENT_ICON_WRAPPER}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-main mb-1.5">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-text-muted leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* HORIZONTAL DIVIDER */}
                <div
                    className="lg:hidden col-span-1 w-full flex justify-center py-4"
                    aria-hidden="true"
                >
                    <div className="h-0.5 bg-community/30 max-w-md w-full rounded-full"></div>
                </div>

                {/* RIGHT SIDE */}
                <div className={COLUMN_CONTAINER}>
                    <div className="text-center lg:text-left lg:pl-8">
                        <span className={GIGGER_BADGE}>Chcę zarabiać</span>
                    </div>

                    <div className={`${CARD_LIST_WRAPPER} lg:pr-0 lg:pl-8`}>
                        {GIGGER_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className={ITEM_GROUP_WRAPPER}>
                                    <div className={GIGGER_CARD_CONTENT}>
                                        <div className={GIGGER_ICON_WRAPPER}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-text-main mb-1.5">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-text-muted leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
