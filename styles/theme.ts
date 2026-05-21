// src/styles/theme.ts

export const theme = {
    // 1. TYPOGRAPHY
    typography: {
        heroTitle:
            "text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-extrabold text-text-main leading-[1.15] tracking-tighter",

        sectionTitle:
            "text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-text-main tracking-tight leading-[1.15]",

        sectionSubtitle:
            "text-base md:text-lg 2xl:text-xl text-text-muted leading-relaxed max-w-xl",

        sectionBadge:
            "text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-2",
    },

    // 2. LAYOUT
    layout: {
        gridSplit:
            "w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 2xl:gap-16 items-center",

        sectionSpacing:
            "px-default py-16 md:py-24 max-w-7xl mx-auto space-y-12 md:space-y-16",
    },

    // 3. COMPONENTS
    components: {
        card: "group relative flex flex-col justify-between p-6 lg:p-8 bg-surface rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 select-none",

        imageWrapper:
            "relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl select-none",
    },

    // 4. INTERACTIONS
    interactions: {
        actionLink:
            "pt-6 flex items-center text-sm font-bold text-gig group-hover:text-gig-hover gap-1 group-hover:gap-2 transition-all duration-200",
    },
};
