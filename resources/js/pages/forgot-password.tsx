import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function PageForgotPassword({ status }: { status?: string }) {
    //! hooks
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const { toast } = useToast();

    //! events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    //! mounted
    React.useEffect(() => {
        if (status) {
            toast({
                title: "😎",
                description: status,
            });
        }
    }, [status]);

    return (
        <GuestLayout>
            <Head title="Login" />

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
                            Lupa kata sandi Anda? Tidak masalah. Cukup beri tahu
                            kami alamat email Anda dan kami akan mengirimkan
                            kata sandi melalui email setel ulang tautan yang
                            memungkinkan Anda memilih yang baru.
                        </div>

                        <form onSubmit={onSubmit}>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="mail@transgo.com"
                                autoFocus
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />

                            <div className="flex items-center justify-end mt-4">
                                <Button className="ms-4" disabled={processing}>
                                    Email Password Reset Link
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default PageForgotPassword;
