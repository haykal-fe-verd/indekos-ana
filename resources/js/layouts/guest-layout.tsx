import React from "react";
import { usePage } from "@inertiajs/react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/layouts/shared/navbar";
import { PageProps } from "@/types";

function GuestLayout({ children }: { children: React.ReactNode }) {
  //! hooks
  const { sessions, auth } = usePage<PageProps>().props;
  const { toast } = useToast();

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
    <main>
      <Navbar />

      {children}
      <Toaster />
      <SonnerToaster />
    </main>
  );
}

export default GuestLayout;
