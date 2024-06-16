import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import GuestLayout from "@/layouts/guest-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function PageConfirmPassword() {
    //! hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    //! states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    //! events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    //! mounted
    React.useEffect(() => {
        reset("password");
    }, []);

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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
                        <div className="mb-4 text-sm text-muted-foreground">
                            Ini adalah area aplikasi yang aman. Harap konfirmasi
                            kata sandi Anda sebelum melanjutkan.
                        </div>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        id="showPassword"
                                        name="showPassword"
                                        aria-label="showPassword"
                                        className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOpenIcon className="w-4 h-4" />
                                        ) : (
                                            <EyeClosedIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-end">
                                <Button className="ms-4" disabled={processing}>
                                    Konfirmasi
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default PageConfirmPassword;
