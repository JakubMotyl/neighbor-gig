"use client";

import { signOut } from "next-auth/react";

export function SignOut() {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <button
            type="button"
            onClick={handleSignOut}
            className="text-sm cursor-pointer flex justify-center font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors w-full text-left"
        >
            Sign Out
        </button>
    );
}
