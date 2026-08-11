import { CalendarDays, Clock, User } from "lucide-react";
import { ExecutionTime } from "@/lib/generated/prisma/enums";
import { EXECUTION_TIME_LABELS } from "@/components/Zlecenia/ZlecenieCard";

export interface CalendarEvent {
    id: string;
    title: string;
    date: ExecutionTime;
    role: "zleceniodawca" | "wykonawca";
    personName: string;
}

interface DashboardCalendarProps {
    events: CalendarEvent[];
}

export default function DashboardCalendar({ events }: DashboardCalendarProps) {
    return (
        <section className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
            <header className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />{" "}
                    Nadchodzące zlecenia
                </h2>
            </header>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {events.length === 0 ? (
                    <div className="h-full min-h-50 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-slate-50">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Brak zaplanowanych prac
                        </span>
                        <span className="text-[11px] font-medium text-text-muted">
                            Gdy zaakceptujesz wykonawcę lub zostaniesz
                            zatrudniony, zadanie pojawi się tutaj.
                        </span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-sm font-bold text-text-main line-clamp-2">
                                        {event.title}
                                    </h3>
                                    <span
                                        className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                                            event.role === "zleceniodawca"
                                                ? "text-blue-700 bg-blue-100"
                                                : "text-purple-700 bg-purple-100"
                                        }`}
                                    >
                                        {event.role}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 pt-3 border-t border-slate-200/60">
                                    <div className="flex items-center gap-2 text-xs font-bold text-text-main">
                                        <Clock className="w-4 h-4 text-primary" />
                                        Termin:{" "}
                                        {EXECUTION_TIME_LABELS[event.date] ||
                                            "Do ustalenia"}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-text-muted">
                                        <User className="w-4 h-4 text-slate-400" />
                                        {event.role === "zleceniodawca"
                                            ? "Wykonawca:"
                                            : "Zleceniodawca:"}{" "}
                                        <strong className="text-text-main">
                                            {event.personName}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
