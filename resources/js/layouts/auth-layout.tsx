import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useToast } from "@/components/ui/use-toast";
import { PageProps, Sessions, User } from "@/types";
import Sidebar from "@/layouts/shared/sidebar";
import Topbar from "@/layouts/shared/topbar";
import { usePage } from "@inertiajs/react";

function AuthLayout({
    children,
}: React.PropsWithChildren<{
    children: React.ReactNode;
}>) {
    //! hooks
    const { sessions, auth } = usePage<PageProps>().props;
    const { toast } = useToast();

    //! status
    const { user } = auth;

    //!mounted
    React.useEffect(() => {
        if (sessions?.success) {
            toast({
                title: "Berhasil 😚",
                description: sessions.success,
            });
        }

        if (sessions?.error) {
            toast({
                variant: "destructive",
                title: "Oops 😣",
                description: sessions.success,
            });
        }
    }, [sessions]);

    return (
        <div className="relative h-full">
            <div className="hidden h-full lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[50]">
                <Sidebar user={user} />
            </div>
            <main className="lg:pl-72">
                <Topbar user={user} />
                <div className="m-5">{children}</div>
                <Toaster />
                <SonnerToaster />
            </main>
        </div>
    );
}

export default AuthLayout;
