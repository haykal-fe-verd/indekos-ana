import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { DotsHorizontalIcon, Pencil1Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { User, UserResponse } from "@/types";
import AuthLayout from "@/layouts/auth-layout";
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import UserForm from "./form";

function PageUser({ user }: { user: UserResponse }) {
  //! hooks
  const {
    data,
    setData,
    post,
    put,
    delete: destroy,
    processing,
    errors,
    reset,
  } = useForm({
    id: "",
    nama: "",
    tanggal_lahir: "",
    no_hp: "",
    alamat: "",
    email: "",
    role: "",
    jenis_kelamin: "",
  });

  //! states
  const [openModal, setOpenModal] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  //! events
  const handleEdit = (item: User) => {
    setIsEdit(true);
    setOpenModal(true);
    setData({
      id: item.id,
      nama: item.nama,
      email: item.email,
      role: item.role,
      tanggal_lahir: item.tanggal_lahir,
      no_hp: item.no_hp,
      alamat: item.alamat,
      jenis_kelamin: item.jenis_kelamin,
    });
  };

  const handleDelete = (item: User) => {
    destroy(route("user.destroy", item.id));
    reset();
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route("user.update", data.id), {
        onSuccess: () => {
          setOpenModal(false), setIsEdit(false), reset();
        },
      });
    } else {
      post(route("user.store"), {
        onSuccess: () => {
          setOpenModal(false), reset();
        },
      });
    }
  };

  //! table
  const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Nama", className: "" },
    { name: "Email", className: "" },
    { name: "Role", className: "" },
    { name: "Status", className: "" },
    { name: "@", className: "text-center w-20" },
  ];

  return (
    <AuthLayout>
      <Head title="Daftar User" />
      <Dialog
        open={openModal}
        onOpenChange={(isOpen) => {
          setOpenModal(isOpen);
          if (!isOpen) {
            setIsEdit(false);
            reset();
          }
        }}
      >
        <Card className={cn("w-full border-none")}>
          <CardContent className={cn("p-6 space-y-4")}>
            <h2 className="text-2xl font-bold md:text-4xl">Daftar User</h2>
            <Separator />

            <div className="w-full space-y-4">
              <Button className={cn("gap-2")} onClick={() => setOpenModal(true)}>
                <PlusCircledIcon className="w-5 h-5" />
                <span>Tambah User</span>
              </Button>

              <DataTable data={user} header={header} link={"user.index"}>
                {user.data.length !== 0 ? (
                  user.data.map((item, index) => (
                    <TableRow key={user.from + index}>
                      <TableCell className="text-center">{user.from + index}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.email}</TableCell>

                      <TableCell>
                        {item.role === "admin" ? (
                          <Badge className="bg-violet-500 hover:bg-violet-500">admin</Badge>
                        ) : (
                          <Badge className="bg-yellow-500 hover:bg-yellow-500">penyewa</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.email_verified_at ? (
                          <Badge className="bg-green-500 hover:bg-green-500">Terverifikasi</Badge>
                        ) : (
                          <Badge className="bg-red-500 hover:bg-red-500">Belum Terverifikasi</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <DotsHorizontalIcon className="w-5 h-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <Pencil1Icon className="w-4 h-4 mr-3" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger className="inline-flex items-center px-2 py-1.5 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-default select-none rounded-md hover:bg-secondary w-full ">
                                <TrashIcon className="w-4 h-4 mr-3" />
                                <span>Hapus</span>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Apakah anda yakin ingin menghapus? 😟</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Setelah dihapus data tidak dapat dikembalikan!
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Tidak</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(item)}>Ya</AlertDialogAction>
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

        {/* modal form */}
        <UserForm
          isEdit={isEdit}
          onSubmit={onSubmit}
          setData={setData}
          data={data}
          errors={errors}
          processing={processing}
        />
      </Dialog>
    </AuthLayout>
  );
}

export default PageUser;
