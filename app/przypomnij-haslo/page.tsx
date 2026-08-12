import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function PrzypomnijHasloPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
            <div className="w-full max-w-md bg-surface p-8 rounded-3xl border border-gray-100 shadow-sm">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-text-main mb-2">
                        Nie pamiętasz hasła?
                    </h1>
                    <p className="text-sm text-text-muted">
                        Podaj adres email powiązany z kontem, a wyślemy Ci link
                        do jego zresetowania.
                    </p>
                </header>

                <ForgotPasswordForm />
            </div>
        </main>
    );
}
