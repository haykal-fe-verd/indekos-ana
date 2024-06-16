import React from "react";
import { Head, useForm } from "@inertiajs/react";

import { PageProps } from "@/types";
import AuthLayout from "@/layouts/auth-layout";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

function PageUpdatePassword({ auth, status }: PageProps<{ status?: string }>) {
    console.log("🚀  status ==>", status);
    //! hooks
    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const { toast } = useToast();

    //! events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: (response) => {
                reset();
                toast({
                    title: "Berhasil 😆",
                    description: "Password berhasil diganti",
                });
            },
        });
    };

    return (
        <AuthLayout>
            <Head title="Ganti Password" />

            <Card className={cn("w-full border-none")}>
                <CardContent className={cn("p-6 space-y-4")}>
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Ganti Password
                        </h2>
                        <p className="text-sm font-light text-muted-foreground md:text-lg">
                            Halaman Ganti Password
                        </p>
                    </div>
                    <Separator />

                    <div className="w-full">
                        <form onSubmit={onSubmit}>
                            <div className="mt-6 space-y-5">
                                <div>
                                    <Label htmlFor="current_password">
                                        <span className="text-rose-500">*</span>
                                        Password Lama
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="current_password"
                                        type="password"
                                        name="current_password"
                                        value={data.current_password}
                                        onChange={(e) =>
                                            setData(
                                                "current_password",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.current_password}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password">
                                        <span className="text-rose-500">*</span>
                                        Password Baru
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">
                                        <span className="text-rose-500">*</span>
                                        Konfirmasi Password Baru
                                    </Label>
                                    <Input
                                        className="mt-2"
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <Button className="mt-5" disabled={processing}>
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}

export default PageUpdatePassword;
