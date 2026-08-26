"use client";

import { startTransition, useCallback, useOptimistic, useState } from "react";
import Image from "next/image";
import {
    MessageSquare,
    Check,
    X,
    Clock,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { Offer, Task, User } from "@/lib/generated/prisma/client";
import Button from "@/components/shared/Button";
import { respondToOffer } from "@/app/actions/inbox";

export type SentOffer = Offer & {
    task: Task;
};

export type ReceivedOffer = Offer & {
    user: User;
    task: Task;
};

interface DashboardInboxProps {
    sentOffers: SentOffer[];
    receivedOffers: ReceivedOffer[];
}

export default function DashboardInbox({
    sentOffers,
    receivedOffers,
}: DashboardInboxProps) {
    const [activeTab, setActiveTab] = useState<"received" | "sent">("received");

    const [optimisticReceivedOffers, setOptimisticReceivedOffers] =
        useOptimistic(
            receivedOffers,
            (
                currentReceivedOffers,
                update: { offerId: string; status: "ACCEPTED" | "REJECTED" },
            ) => {
                const targetOffer = currentReceivedOffers.find(
                    (o) => o.id === update.offerId,
                );
                if (!targetOffer) return currentReceivedOffers;

                return currentReceivedOffers.map((offer) => {
                    if (offer.id === update.offerId) {
                        return { ...offer, status: update.status };
                    }

                    if (
                        update.status === "ACCEPTED" &&
                        offer.taskId === targetOffer.taskId
                    ) {
                        return { ...offer, status: "REJECTED" };
                    }

                    return offer;
                });
            },
        );

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "ACCEPTED":
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Zaakceptowane
                    </span>
                );
            case "REJECTED":
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3 h-3" /> Odrzucone
                    </span>
                );
            default: // PENDING
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" /> Oczekujące
                    </span>
                );
        }
    };

    const handleRespond = useCallback(
        (offerId: string, status: "ACCEPTED" | "REJECTED") => {
            startTransition(async () => {
                setOptimisticReceivedOffers({ offerId, status });
                await respondToOffer(offerId, status);
            });
        },
        [],
    );

    return (
        <section className="bg-surface rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
            <header className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" /> Centrum
                    Zgłoszeń
                </h2>
            </header>

            <div className="flex bg-slate-100/50 p-1 rounded-xl mb-6">
                <button
                    onClick={() => setActiveTab("received")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                        activeTab === "received"
                            ? "bg-white text-primary shadow-sm"
                            : "text-text-muted hover:text-text-main"
                    }`}
                >
                    Otrzymane ({optimisticReceivedOffers.length})
                </button>
                <button
                    onClick={() => setActiveTab("sent")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                        activeTab === "sent"
                            ? "bg-white text-primary shadow-sm"
                            : "text-text-muted hover:text-text-main"
                    }`}
                >
                    Wysłane ({sentOffers.length})
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-100 custom-scrollbar">
                {activeTab === "received" && (
                    <>
                        {optimisticReceivedOffers.length === 0 ? (
                            <div className="h-full min-h-50 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-slate-50">
                                <p className="text-sm text-text-muted font-medium">
                                    Brak nowych zgłoszeń. <br /> Dodaj zlecenie,
                                    aby przyciągnąć wykonawców!
                                </p>
                            </div>
                        ) : (
                            optimisticReceivedOffers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                                {offer.user.image ? (
                                                    <Image
                                                        src={offer.user.image}
                                                        alt={
                                                            offer.user.name ||
                                                            "Użytkownik"
                                                        }
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="flex items-center justify-center w-full h-full text-sm font-bold text-slate-500">
                                                        {offer.user.name?.charAt(
                                                            0,
                                                        ) || "U"}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-text-main">
                                                    {offer.user.name ||
                                                        "Anonim"}
                                                </h3>
                                                <p className="text-[11px] font-medium text-text-muted line-clamp-1">
                                                    Zlecenie: {offer.task.title}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="block text-lg font-black text-text-main leading-none">
                                                {offer.price} PLN
                                            </span>
                                            <span className="text-[10px] text-text-muted">
                                                Propozycja
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-text-muted bg-white p-3 rounded-xl border border-slate-100">
                                        "{offer.message}"
                                    </p>

                                    {offer.status === "PENDING" ? (
                                        <div className="flex gap-2 pt-1">
                                            <Button
                                                onClick={() =>
                                                    handleRespond(
                                                        offer.id,
                                                        "ACCEPTED",
                                                    )
                                                }
                                                variant="primary"
                                                className="flex-1 py-2 text-xs font-bold gap-1 shadow-sm"
                                            >
                                                <Check className="w-3.5 h-3.5" />{" "}
                                                Akceptuj
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleRespond(
                                                        offer.id,
                                                        "REJECTED",
                                                    )
                                                }
                                                variant="outline"
                                                className="flex-1 py-2 text-xs font-bold gap-1 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                            >
                                                <X className="w-3.5 h-3.5" />{" "}
                                                Odrzuć
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="pt-1 flex justify-end">
                                            {renderStatusBadge(offer.status)}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </>
                )}

                {activeTab === "sent" && (
                    <>
                        {sentOffers.length === 0 ? (
                            <div className="h-full min-h-50 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-slate-50">
                                <p className="text-sm text-text-muted font-medium">
                                    Brak wysłanych zgłoszeń. <br /> Przejrzyj
                                    tablicę i znajdź zadanie dla siebie!
                                </p>
                            </div>
                        ) : (
                            sentOffers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-sm font-bold text-text-main line-clamp-1 mb-1">
                                                {offer.task.title}
                                            </h3>
                                            <span className="text-xs font-semibold text-text-muted bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                                Twoja kwota: {offer.price} PLN
                                            </span>
                                        </div>
                                        <div className="shrink-0 mt-0.5">
                                            {renderStatusBadge(offer.status)}
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-muted line-clamp-2 italic border-l-2 border-primary/20 pl-2">
                                        "{offer.message}"
                                    </p>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
