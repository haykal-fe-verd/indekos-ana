import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { CameraIcon, PaperPlaneIcon, RocketIcon, UpdateIcon } from "@radix-ui/react-icons";

import AuthLayout from "@/layouts/auth-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageProps } from "@/types";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PageProfile({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail?: boolean; status?: string }>) {
  //! hooks
  const { auth } = usePage<PageProps>().props;
  const { user } = auth;
  const { data, setData, post, processing, errors } = useForm({
    nama: user?.nama || "",
    email: user?.email || "",
    photo: user?.photo || "",
    tanggal_lahir: user?.tanggal_lahir || "",
    no_hp: user?.no_hp || "",
    alamat: user?.alamat || "",
    jenis_kelamin: user?.jenis_kelamin || "",
  });
  const { toast } = useToast();

  //! states
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  //! events
  const browse = () => {
    inputRef.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setData("photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    post(route("profile.update"), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  //! mounted
  React.useEffect(() => {
    if (status === "verification-link-sent") {
      toast({
        title: "😎",
        description: "Tautan verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran",
      });
    }
  }, [status]);
  return (
    <AuthLayout>
      <Head title="Profil" />

      <Card className={cn("w-full border-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <div>
            <h2 className="text-2xl font-bold md:text-4xl">Profile</h2>
            <p className="text-sm font-light text-muted-foreground md:text-lg">Halaman edit profile</p>
          </div>
          <Separator />

          <form onSubmit={onSubmit} encType="multipart/form-data" className="w-full space-y-5">
            <div className="relative w-full h-60 justify-center items-center flex">
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={onChange}
              />
              <Avatar className={cn("absolute object-cover border-2 rounded-full w-60 h-60")}>
                {previewUrl ? (
                  <AvatarImage id="photoPreview" src={previewUrl} />
                ) : (
                  <AvatarImage id="photoPreview" src={`/avatars/${auth?.user?.photo}`} />
                )}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={browse}
                className="absolute flex items-center justify-center text-white transition-opacity duration-300 bg-black rounded-full opacity-50 w-60 h-60 hover:opacity-80"
              >
                <CameraIcon className="w-5 h-5" />
              </button>
              <div className="text-center -bottom-5 absolute">
                <InputError message={errors.photo} />
              </div>
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Alert className="cols-span-1 border-red-500">
                  <RocketIcon className="h-4 w-4" />
                  <AlertTitle>Email kamu belum terverifikasi</AlertTitle>
                  <AlertDescription>
                    <Link
                      href={route("verification.send")}
                      method="post"
                      as="button"
                      className={buttonVariants({
                        variant: "link",
                        className: "px-0",
                      })}
                    >
                      Klik di sini untuk mengirim ulang verifikasi email.
                    </Link>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="col-span-2 lg:col-span-1">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  type="text"
                  id="nama"
                  name="nama"
                  value={data.nama}
                  onChange={(e) => setData("nama", e.target.value)}
                />
                <InputError message={errors.nama} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label htmlFor="no_hp">No HP</Label>
                <Input
                  type="text"
                  id="no_hp"
                  name="no_hp"
                  value={data.no_hp}
                  onChange={(e) => setData("no_hp", e.target.value)}
                />
                <InputError message={errors.no_hp} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                <Input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  value={data.tanggal_lahir}
                  onChange={(e) => setData("tanggal_lahir", e.target.value)}
                />
                <InputError message={errors.tanggal_lahir} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                <Select onValueChange={(e) => setData("jenis_kelamin", e)} defaultValue={data.jenis_kelamin}>
                  <SelectTrigger className="w-full" id="jenis_kelamin" name="jenis_kelamin">
                    <SelectValue placeholder="Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pria">Pria</SelectItem>
                    <SelectItem value="wanita">Wanita</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.jenis_kelamin} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label htmlFor="umur">Umur</Label>
                <Input type="number" id="umur" name="umur" min={0} value={user?.umur} disabled />
              </div>
              <div className="col-span-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Textarea
                  className="mt-2 bg-white"
                  id="alamat"
                  name="alamat"
                  value={data.alamat}
                  onChange={(e) => setData("alamat", e.target.value)}
                />
                <InputError message={errors.alamat} />
              </div>
              <Button type="submit" disabled={processing} className={cn("inline-flex flex-row gap-3 col-span-2 w-fit")}>
                {processing ? <UpdateIcon className="w-5 h-5 animate-spin" /> : <PaperPlaneIcon className="w-5 h-5" />}
                <span>Simpan</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default PageProfile;
