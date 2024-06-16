import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import {
    EnterIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    UpdateIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import InputError from "@/components/input-error";
import GuestLayout from "@/layouts/guest-layout";

function PageLogin({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    //! hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const { toast } = useToast();

    //! states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    //!events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    //! mounted
    React.useEffect(() => {
        if (status) {
            toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
            });
        }

        reset("password");
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
                    <CardContent className={cn("p-6")}>
                        <form
                            method="post"
                            onSubmit={onSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="indekos@mail.com"
                                    autoComplete="username"
                                    autoFocus
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        onCheckedChange={(e) =>
                                            setData("remember", Boolean(e))
                                        }
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Ingat saya
                                    </label>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className={buttonVariants({
                                            variant: "link",
                                        })}
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className={cn("inline-flex flex-row gap-3")}
                                >
                                    {processing ? (
                                        <UpdateIcon className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <EnterIcon className="w-5 h-5" />
                                    )}
                                    <span>Login</span>
                                </Button>
                                <Link
                                    href={route("register")}
                                    className={buttonVariants({
                                        variant: "link",
                                    })}
                                >
                                    Belum punya akun? Daftar disini
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default PageLogin;
