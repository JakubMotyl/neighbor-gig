import { MessageSquare } from "lucide-react";

export default function DashboardInbox() {
    const MOCKUP_MESSAGES = [
        {
            id: 0,
            name: "Marek Monter",
            time: "12:30",
            message:
                "Będę jutro o 15:00 z własnymi narzędziami, tak jak się umawialiśmy!",
        },
        {
            id: 1,
            name: "System Gigo",
            time: "Wczoraj",
            message: `Twoje zlecenie "Skoszenie trawnika" zostało zakończone.`,
        },
    ];

    return (
        <section className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-text-main flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" /> Skrzynka
            </h2>
            <div className="space-y-3">
                {/* Mockup messages */}
                {MOCKUP_MESSAGES.map((message) => (
                    <div
                        key={message.id}
                        className="p-3 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-bold text-text-main">
                                {message.name}
                            </span>
                            <span className="text-[10px] font-medium text-text-muted">
                                {message.time}
                            </span>
                        </div>
                        <p className="text-xs text-text-muted line-clamp-2">
                            {message.message}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
