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
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

function PageUpdatePassword({ auth, status }: PageProps<{ status?: string }>) {
  //! hooks
  const { data, setData, errors, put, reset, processing } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const { toast } = useToast();

  //! states
  const [showCurrentPassword, setShowCurrentPassword] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState<boolean>(false);

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
            <h2 className="text-2xl font-bold md:text-4xl">Ganti Password</h2>
            <p className="text-sm font-light text-muted-foreground md:text-lg">Halaman Ganti Password</p>
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
                  <div className="relative mt-2">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      id="current_password"
                      name="current_password"
                      placeholder="••••••••"
                      value={data.current_password}
                      onChange={(e) => setData("current_password", e.target.value)}
                    />
                    <button
                      type="button"
                      id="showCurrentPassword"
                      name="showCurrentPassword"
                      aria-label="showCurrentPassword"
                      className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOpenIcon className="w-4 h-4" />
                      ) : (
                        <EyeClosedIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <InputError message={errors.current_password} />
                </div>

                <div>
                  <Label htmlFor="password">
                    <span className="text-rose-500">*</span>
                    Password Baru
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                    />
                    <button
                      type="button"
                      id="showPassword"
                      name="showPassword"
                      aria-label="showPassword"
                      className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOpenIcon className="w-4 h-4" /> : <EyeClosedIcon className="w-4 h-4" />}
                    </button>
                  </div>

                  <InputError message={errors.password} />
                </div>

                <div>
                  <Label htmlFor="password_confirmation">
                    <span className="text-rose-500">*</span>
                    Konfirmasi Password Baru
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      type={showPasswordConfirm ? "text" : "password"}
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="••••••••"
                      value={data.password_confirmation}
                      onChange={(e) => setData("password_confirmation", e.target.value)}
                    />
                    <button
                      type="button"
                      id="showPasswordConfirm"
                      name="showPasswordConfirm"
                      aria-label="showPasswordConfirm"
                      className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    >
                      {showPasswordConfirm ? (
                        <EyeOpenIcon className="w-4 h-4" />
                      ) : (
                        <EyeClosedIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <InputError message={errors.password_confirmation} />
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
