import React from "react";
import { UpdateIcon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function UserForm({
    isEdit,
    onSubmit,
    setData,
    data,
    errors,
    processing,
}: {
    isEdit: boolean;
    onSubmit: any;
    setData: any;
    data: any;
    errors: any;
    processing: boolean;
}) {
    //! states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
        <DialogContent
            className={cn(
                "max-h-[calc(100vh-100px)] overflow-y-auto no-scrollbar"
            )}
        >
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} User
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* nama */}
                    <div>
                        <Label htmlFor="nama">
                            Nama
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="nama"
                            name="nama"
                            className="mt-2"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                        />
                        <InputError message={errors.nama} />
                    </div>

                    {/* email */}
                    <div>
                        <Label htmlFor="email">
                            Email
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    {!isEdit && (
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
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
                    )}

                    {/* jenis kelamin */}
                    <div className="w-full">
                        <Label htmlFor="jenis_kelamin">
                            Jenis Kelamin
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Select
                            onValueChange={(e) => setData("jenis_kelamin", e)}
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
                                <SelectItem value="pria">Pria</SelectItem>
                                <SelectItem value="wanita">Wanita</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.jenis_kelamin} />
                    </div>

                    {/* tanggal_lahir */}
                    <div>
                        <Label htmlFor="tanggal_lahir">
                            Tanggal Lahir
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="date"
                            id="tanggal_lahir"
                            name="tanggal_lahir"
                            className="mt-2"
                            value={data.tanggal_lahir}
                            onChange={(e) =>
                                setData("tanggal_lahir", e.target.value)
                            }
                        />
                        <InputError message={errors.tanggal_lahir} />
                    </div>

                    {/* umur */}
                    <div>
                        <Label htmlFor="umur">
                            Umur
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="number"
                            id="umur"
                            name="umur"
                            min={0}
                            className="mt-2"
                            value={parseInt(data.umur)}
                            onChange={(e) => setData("umur", e.target.value)}
                        />
                        <InputError message={errors.umur} />
                    </div>

                    {/* no_hp */}
                    <div>
                        <Label htmlFor="no_hp">
                            No HP
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="no_hp"
                            name="no_hp"
                            className="mt-2"
                            value={data.no_hp}
                            onChange={(e) => setData("no_hp", e.target.value)}
                        />
                        <InputError message={errors.no_hp} />
                    </div>

                    {/* role */}
                    <div>
                        <Label htmlFor="role">
                            Role
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Select
                            onValueChange={(e) => setData("role", e)}
                            defaultValue={data.role}
                        >
                            <SelectTrigger
                                className="w-full"
                                id="role"
                                name="role"
                            >
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="penyewa">Penyewa</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    {/* alamat */}
                    <div>
                        <Label htmlFor="alamat">
                            Alamat
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="alamat"
                            name="alamat"
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                        />

                        <InputError message={errors.alamat} />
                    </div>

                    <Button
                        className="flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <UpdateIcon className="animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </DialogHeader>
        </DialogContent>
    );
}

export default UserForm;
