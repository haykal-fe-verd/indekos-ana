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

function PageResetPassword({ token, email }: { token: string; email: string }) {
    //! hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    //! states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);

    //! events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    //! mounted
    React.useEffect(() => {
        reset("password", "password_confirmation");
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
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="mail@transgo.com"
                                    autoFocus
                                    readOnly
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

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

                            <div>
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPasswordConfirm
                                                ? "text"
                                                : "password"
                                        }
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        type="button"
                                        id="showPasswordConfirm"
                                        name="showPasswordConfirm"
                                        aria-label="showPasswordConfirm"
                                        className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                        onClick={() =>
                                            setShowPasswordConfirm(
                                                !showPasswordConfirm
                                            )
                                        }
                                    >
                                        {showPasswordConfirm ? (
                                            <EyeOpenIcon className="w-4 h-4" />
                                        ) : (
                                            <EyeClosedIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <Button className="ms-4" disabled={processing}>
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default PageResetPassword;
