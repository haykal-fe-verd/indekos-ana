import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function PageVerifyEmail({ status }: { status?: string }) {
    console.log("🚀  status ==>", status === "verification-link-sent");
    //! hooks
    const { post, processing } = useForm({});
    const { toast } = useToast();

    //! events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    //! mounted
    React.useEffect(() => {
        if (status) {
            toast({
                title: "😎",
                description:
                    "Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran",
            });
        }
    }, [status]);

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center">
                <Link href="/" className="flex flex-col items-center gap-3">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-20 h-20 fill-current"
                    />
                    <h1 className="font-bold text-2xl text-primary">Indekos</h1>
                </Link>

                <Card className={cn("w-full sm:max-w-md mt-6 shadow-md")}>
                    <CardContent className={cn("p-6 space-y-4")}>
                        <div className="text-sm text-muted-foreground text-justify">
                            Terima kasih telah mendaftar! Sebelum memulai,
                            bisakah Anda memverifikasi alamat email Anda dengan
                            mengeklik tautan yang baru saja kami kirimkan
                            melalui email kepada Anda? Jika Anda tidak menerima
                            email tersebut, kami dengan senang hati akan
                            mengirimkan email lainnya kepada Anda.
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                Tautan verifikasi baru telah dikirim ke alamat
                                email yang Anda berikan saat pendaftaran.
                            </div>
                        )}

                        <form onSubmit={onSubmit}>
                            <div className="mt-4 flex items-center justify-between">
                                <Button type="submit" disabled={processing}>
                                    Kirim ulang email verifikasi
                                </Button>

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className={buttonVariants({
                                        variant: "link",
                                    })}
                                >
                                    Logout
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default PageVerifyEmail;
