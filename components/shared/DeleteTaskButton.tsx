"use client";

import { useState, memo } from "react";
import { Trash2, AlertCircle } from "lucide-react";

interface DeleteTaskButtonProps {
    taskId: string;
    onDelete: (taskId: string) => void;
}

function DeleteTaskButton({ taskId, onDelete }: DeleteTaskButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(false);
        onDelete(taskId);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Usuń ogłoszenie"
                aria-label="Usuń ogłoszenie"
            >
                <Trash2 className="w-4 h-4" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-dialog-title"
                >
                    <div className="bg-surface w-full max-w-sm rounded-3xl p-6 border border-gray-100 shadow-xl space-y-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                            <AlertCircle className="w-6 h-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3
                                id="delete-dialog-title"
                                className="text-lg font-bold text-text-main"
                            >
                                Usunąć to zlecenie?
                            </h3>
                            <p className="text-xs text-text-muted leading-relaxed">
                                Ta operacja jest nieodwracalna. Wszystkie
                                powiązane zgłoszenia i wiadomości zostaną trwale
                                skasowane.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-text-main font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                            >
                                Anuluj
                            </button>

                            <button
                                type="button"
                                onClick={handleClick}
                                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-red-600/20 cursor-pointer"
                            >
                                Usuń
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(DeleteTaskButton);
