import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    children: React.ReactNode;
    pendingLabel: string;
}

function SubmitButton({ children, pendingLabel }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-md shadow-slate-900/10 cursor-pointer"
        >
            {pending ? pendingLabel : children}
        </button>
    );
}

export default SubmitButton;
