import React from "react";
import { Head, useForm } from "@inertiajs/react";

import AuthLayout from "@/layouts/auth-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Kategori } from "@/types";
import { EnterIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
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
import { PlusCircle, Trash2 } from "lucide-react";

interface KamarData {
  nama_kamar: string;
  luas_kamar: string;
  harga_kamar: string;
  kategori_id: string;
  deskripsi_kamar: string;
  lokasi_kamar: string;
  foto_kamar: File[];
  fasilitas_kamar: string[];
}

function PageKamarCreate({ kategori }: { kategori: Kategori[] }) {
  //! hooks
  const { data, setData, post, processing, errors, reset } = useForm<KamarData>(
    {
      nama_kamar: "",
      luas_kamar: "",
      harga_kamar: "",
      kategori_id: "",
      deskripsi_kamar: "",
      lokasi_kamar: "",
      foto_kamar: [],
      fasilitas_kamar: [],
    }
  );

  //! states
  const [foto, setFoto] = React.useState<File[]>([]);
  const [fasilitas, setFasilitas] = React.useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);

  //! events
  const addFasilitas = () => {
    setFasilitas([...fasilitas, ""]);
  };

  const handleFasilitasChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFasilitas = [...fasilitas];
    newFasilitas[index] = e.target.value;
    setFasilitas(newFasilitas);

    const newData = { ...data };
    newData.fasilitas_kamar = newFasilitas;
    setData(newData);
  };

  // Fungsi untuk menghapus fasilitas
  const handleRemoveFasilitas = (index: number) => {
    const newFasilitas = fasilitas.filter((_, i) => i !== index);
    setFasilitas(newFasilitas);

    const newData = { ...data };
    newData.fasilitas_kamar = newFasilitas;
    setData(newData);
  };

  const addFoto = () => {
    setFoto([...foto, null as unknown as File]);
  };

  const handleFotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const newFoto = [...foto];
      newFoto[index] = file;
      setFoto(newFoto);

      const newData = { ...data };
      newData.foto_kamar = newFoto;
      setData(newData);

      const imageUrl = URL.createObjectURL(file);
      const newImagePreviews = [...imagePreviews];
      newImagePreviews[index] = imageUrl;
      setImagePreviews(newImagePreviews);
    }
  };

  const handleRemoveFoto = (index: number) => {
    const newFoto = foto.filter((_, i) => i !== index);
    setFoto(newFoto);

    const newImagePreviews = [...imagePreviews];
    newImagePreviews[index] = null as unknown as string;
    setImagePreviews(newImagePreviews);

    const newData = { ...data };
    newData.foto_kamar = newFoto;
    setData(newData);
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < fasilitas.length; i++) {
      formData.append("fasilitas_kamar[]", fasilitas[i]);
    }

    for (let i = 0; i < foto.length; i++) {
      formData.append("foto_kamar[]", foto[i]);
    }

    post(route("kamar.store"), {
      data: formData,
      onSuccess: () => reset(),
      errorBag: "kamar.store",
    });
  };

  return (
    <AuthLayout>
      <Head title="Tambah Kamar" />
      <Card className={cn("w-full border-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <h2 className="text-2xl font-bold md:text-4xl">Tambah Kamar</h2>
          <Separator />

          <form onSubmit={onSubmit} className="w-full space-y-4">
            <div className="grid grid-cols-4 gap-5">
              {/* nama_kamar */}
              <div className="col-span-4 lg:col-span-2">
                <Label htmlFor="nama_kamar">
                  Nama Kamar
                  <span className="text-rose-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="nama_kamar"
                  name="nama_kamar"
                  placeholder="Indekos Kamar 001"
                  className="mt-2"
                  value={data.nama_kamar}
                  onChange={(e) => setData("nama_kamar", e.target.value)}
                />
                <InputError message={errors.nama_kamar} />
              </div>

              {/* luas_kamar */}
              <div className="col-span-4 lg:col-span-1">
                <Label htmlFor="luas_kamar">
                  Luas
                  <span className="text-rose-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    type="text"
                    id="luas_kamar"
                    name="luas_kamar"
                    placeholder="3x3"
                    className="pr-20"
                    value={data.luas_kamar}
                    onChange={(e) => setData("luas_kamar", e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary">
                    m
                  </span>
                </div>
                <InputError message={errors.luas_kamar} />
              </div>

              {/* harga_kamar */}
              <div className="col-span-4 lg:col-span-1">
                <Label htmlFor="harga_kamar">
                  Harga
                  <span className="text-rose-500">*</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    type="number"
                    min={0}
                    id="harga_kamar"
                    name="harga_kamar"
                    placeholder="550000"
                    className="pl-12"
                    value={data.harga_kamar}
                    onChange={(e) => setData("harga_kamar", e.target.value)}
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center p-3 text-white rounded-tl-md rounded-bl-md bg-primary">
                    Rp.
                  </span>
                </div>
                <InputError message={errors.harga_kamar} />
              </div>

              {/* kategori_id */}
              <div className="col-span-4 lg:col-span-2">
                <Label htmlFor="kategori_id">
                  Kategori
                  <span className="text-rose-500">*</span>
                </Label>
                <Select
                  name="kategori_id"
                  onValueChange={(e) => setData("kategori_id", e)}
                  defaultValue={data.kategori_id}
                >
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {kategori.map((item) => {
                      return (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.nama_kategori}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <InputError message={errors.kategori_id} />
              </div>

              {/* blank */}
              <div className="col-span-4 lg:col-span-2"></div>

              {/* deskripsi_kamar */}
              <div className="col-span-4 lg:col-span-2">
                <Label htmlFor="deskripsi_kamar">
                  Deskripsi
                  <span className="text-rose-500">*</span>
                </Label>
                <Textarea
                  className="mt-2 bg-white"
                  id="deskripsi_kamar"
                  name="deskripsi_kamar"
                  placeholder="Ini adalah kamar untuk pria yang sangat cocok untuk anak kuliah, karena dekat dengan kampus POLITEKNIK ACEH"
                  value={data.deskripsi_kamar}
                  onChange={(e) => setData("deskripsi_kamar", e.target.value)}
                />

                <InputError message={errors.deskripsi_kamar} />
              </div>

              {/* lokasi_kamar */}
              <div className="col-span-4 lg:col-span-2">
                <Label htmlFor="lokasi_kamar">
                  Lokasi
                  <span className="text-rose-500">*</span>
                </Label>
                <Textarea
                  className="mt-2 bg-white"
                  id="lokasi_kamar"
                  name="lokasi_kamar"
                  placeholder="Jln. Contoh No. 10, Pango, Kec. Ule Kareng, Kota Banda Aceh, 29111"
                  value={data.lokasi_kamar}
                  onChange={(e) => setData("lokasi_kamar", e.target.value)}
                />

                <InputError message={errors.lokasi_kamar} />
              </div>
            </div>

            <Separator className="my-10" />

            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 lg:col-span-1">
                {/* foto */}
                <div className="flex flex-col gap-5">
                  <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">
                    Foto Kamar
                  </h1>
                  {foto.map((item, index) => (
                    <div key={index}>
                      <Label htmlFor={`foto_kamar${index}`}>
                        Foto {index + 1}
                        <span className="text-rose-500">*</span>
                      </Label>
                      <div className="flex flex-col items-center space-x-2">
                        {imagePreviews[index] && (
                          <div className="">
                            <img
                              src={imagePreviews[index]}
                              alt={`Preview${index}`}
                              className="w-full h-40"
                            />
                          </div>
                        )}
                        <div className="flex flex-row items-center w-full space-x-2">
                          <Input
                            type="file"
                            id={`foto_kamar${index}`}
                            name={`foto_kamar${index}`}
                            className="flex-1 mt-2"
                            accept="image/*"
                            onChange={(e) => handleFotoChange(e, index)}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveFoto(index)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                      <InputError message={errors.foto_kamar} />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="p-2 text-white rounded-full w-fit bg-primary"
                    onClick={addFoto}
                  >
                    <PlusCircle />
                  </button>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                {/* fasilitas kamar */}
                <div className="flex flex-col gap-5">
                  <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">
                    Fasilitas Kamar
                  </h1>
                  {fasilitas.map((item, index) => (
                    <div key={index}>
                      <Label htmlFor={`fasilitas_kamar${index}`}>
                        Fasilitas {index + 1}
                        <span className="text-rose-500">*</span>
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          id={`fasilitas_kamar${index}`}
                          name={`fasilitas_kamar${index}`}
                          placeholder="Contoh fasilitas"
                          className="flex-1 mt-2"
                          value={item}
                          onChange={(e) => handleFasilitasChange(e, index)}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveFasilitas(index)}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                      <InputError message={errors.fasilitas_kamar} />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="p-2 text-white rounded-full w-fit bg-primary"
                    onClick={addFasilitas}
                  >
                    <PlusCircle />
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={processing}
              className={cn("inline-flex flex-row gap-3")}
            >
              {processing && <UpdateIcon className="w-5 h-5 animate-spin" />}
              <span>Simpan</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default PageKamarCreate;
