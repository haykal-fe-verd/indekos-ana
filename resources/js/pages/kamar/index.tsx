import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import { Kamar, KamarResponse } from "@/types";
import AuthLayout from "@/layouts/auth-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DotsHorizontalIcon,
  EyeOpenIcon,
  Pencil1Icon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DataTable from "@/components/data-table";
import currentcyFormatter from "@/lib/currentcy-formatter";

function PageKamar({ kamar }: { kamar: KamarResponse }) {
  //! hooks
  const { delete: destroy, reset } = useForm();

  //! events
  const handleDelete = (item: Kamar) => {
    destroy(route("kamar.destroy", item.id));
    reset();
  };

  //! table
  const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Nama Kamar", className: "" },
    { name: "Deskripsi Kamar", className: "" },
    { name: "Kategori", className: "" },
    { name: "Luas Kamar", className: "" },
    { name: "Harga Kamar", className: "" },
    { name: "@", className: "text-center w-20" },
  ];

  return (
    <AuthLayout>
      <Head title="Kamar" />
      <Card className={cn("w-full border-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <h2 className="text-2xl font-bold md:text-4xl">Kamar</h2>
          <Separator />

          <div className="w-full space-y-4">
            <Link
              href={route("kamar.create")}
              className={buttonVariants({
                variant: "default",
                className: "gap-2",
              })}
            >
              <PlusCircledIcon className="w-5 h-5" />
              <span>Tambah Kamar</span>
            </Link>

            <DataTable data={kamar} header={header} link={"kamar.index"}>
              {kamar.data.length !== 0 ? (
                kamar.data.map((item, index) => (
                  <TableRow key={kamar.from + index}>
                    <TableCell className="text-center">
                      {kamar.from + index}
                    </TableCell>
                    <TableCell>{item.nama_kamar}</TableCell>
                    <TableCell>
                      {item.deskripsi_kamar.substring(0, 20) + "..."}
                    </TableCell>
                    <TableCell>{item.kategori?.nama_kategori}</TableCell>
                    <TableCell>{item.luas_kamar} m</TableCell>
                    <TableCell>
                      {currentcyFormatter.format(item.harga_kamar)} ,-
                    </TableCell>

                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <DotsHorizontalIcon className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link
                              href={route("kamar.show", item.id)}
                              className="inline-flex items-center"
                            >
                              <EyeOpenIcon className="w-4 h-4 mr-3" />
                              <span>Lihat</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              href={route("kamar.edit", item.id)}
                              className="inline-flex items-center"
                            >
                              <Pencil1Icon className="w-4 h-4 mr-3" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger className="inline-flex items-center px-2 py-1.5 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-default select-none rounded-md hover:bg-secondary w-full ">
                              <TrashIcon className="w-4 h-4 mr-3" />
                              <span>Hapus</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin ingin menghapus? 😟
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Setelah dihapus data tidak dapat dikembalikan!
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item)}
                                >
                                  Ya
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={header.length}>
                    Tidak ada data untuk ditampilkan
                  </TableCell>
                </TableRow>
              )}
            </DataTable>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default PageKamar;
