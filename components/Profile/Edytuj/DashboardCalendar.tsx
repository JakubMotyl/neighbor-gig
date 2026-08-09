import { CalendarDays } from "lucide-react";

export default function DashboardCalendar() {
    return (
        <section className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-text-main flex items-center gap-2 mb-6">
                <CalendarDays className="w-5 h-5 text-primary" /> Nadchodzące
            </h2>
            <div className="w-full aspect-square border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50 flex items-center justify-center flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Kalendarz
                </span>
                <span className="text-[10px] text-slate-400 text-center px-4">
                    Wkrótce pojawi się tu widok miesiąca
                </span>
            </div>
        </section>
    );
}
