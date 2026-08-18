"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    children: React.ReactNode;
    pendingLabel?: string;
    disabled?: boolean;
    className?: string;
}

export default function SubmitButton({
    children,
    pendingLabel = "Zapisywanie...",
    disabled = false,
    className = "",
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || disabled}
            className={`w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-md shadow-slate-900/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {pending ? pendingLabel : children}
        </button>
    );
}
