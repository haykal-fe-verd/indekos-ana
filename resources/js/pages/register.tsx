import React from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import {
    EnterIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    UpdateIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function PageRegister() {
    //! hooks
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        umur: "",
        no_hp: "",
        email: "",
        password: "",
        alamat: "",
        password_confirmation: "",
    });

    //! states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);

    //! events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    //! mounted
    React.useEffect(() => {
        reset("password", "password_confirmation");
    }, []);

    return (
        <GuestLayout>
            <Head title="Registrasi Akun" />

            <div className="min-h-screen flex flex-col sm:justify-center items-center">
                <Link href="/" className="flex flex-col items-center gap-3">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="w-20 h-20 fill-current"
                    />
                    <h1 className="font-bold text-2xl text-primary">Indekos</h1>
                </Link>

                <Card className={cn("w-full sm:max-w-2xl mt-6 shadow-md")}>
                    <CardContent className={cn("p-6")}>
                        <form
                            method="post"
                            onSubmit={onSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <Label htmlFor="nama">Nama Lengkap</Label>
                                <Input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    placeholder="Nama Lengkap"
                                    autoFocus
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />
                                <InputError message={errors.nama} />
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="mail@indekos.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            name="password"
                                            placeholder="••••••••"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
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
                                <div className="col-span-2 lg:col-span-1">
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
                            </div>

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                <div className="col-span-2 space-y-5 lg:col-span-1">
                                    <div className="w-full">
                                        <Label htmlFor="no_hp">No HP</Label>
                                        <Input
                                            type="text"
                                            id="no_hp"
                                            name="no_hp"
                                            placeholder="0812 3456 7890"
                                            value={data.no_hp}
                                            onChange={(e) =>
                                                setData("no_hp", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.no_hp} />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="tanggal_lahir">
                                            Tanggal Lahir
                                        </Label>
                                        <Input
                                            type="date"
                                            id="tanggal_lahir"
                                            name="tanggal_lahir"
                                            value={data.tanggal_lahir}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_lahir",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.tanggal_lahir}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2 space-y-5 lg:col-span-1">
                                    <div className="w-full">
                                        <Label htmlFor="jenis_kelamin">
                                            Jenis Kelamin
                                        </Label>
                                        <Select
                                            onValueChange={(e) =>
                                                setData("jenis_kelamin", e)
                                            }
                                            defaultValue={data.jenis_kelamin}
                                        >
                                            <SelectTrigger
                                                className="w-full"
                                                id="jenis_kelamin"
                                                name="jenis_kelamin"
                                            >
                                                <SelectValue placeholder="Jenis Kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pria">
                                                    Pria
                                                </SelectItem>
                                                <SelectItem value="wanita">
                                                    Wanita
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.jenis_kelamin}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="umur">Umur</Label>
                                        <Input
                                            type="number"
                                            id="umur"
                                            name="umur"
                                            value={data.umur}
                                            onChange={(e) =>
                                                setData("umur", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.umur} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="alamat">Alamat</Label>
                                <Textarea
                                    className="mt-2 bg-white"
                                    id="alamat"
                                    name="alamat"
                                    value={data.alamat}
                                    onChange={(e) =>
                                        setData("alamat", e.target.value)
                                    }
                                />

                                <InputError message={errors.alamat} />
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
                                    <span>Daftar</span>
                                </Button>
                                <Link
                                    href={route("login")}
                                    className={buttonVariants({
                                        variant: "link",
                                    })}
                                >
                                    Sudah punya akun? Masuk disini
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}

export default PageRegister;
