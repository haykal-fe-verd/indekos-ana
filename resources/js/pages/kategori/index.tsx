import React from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    DotsHorizontalIcon,
    Pencil1Icon,
    PlusCircledIcon,
    TrashIcon,
} from "@radix-ui/react-icons";

import { Kategori, KategoriResponse } from "@/types";
import AuthLayout from "@/layouts/auth-layout";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
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

import KategoriForm from "./form";

function PageKategori({ kategori }: { kategori: KategoriResponse }) {
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
        nama_kategori: "",
    });

    //! states
    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    //! events
    const handleEdit = (item: Kategori) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            nama_kategori: item.nama_kategori,
        });
    };

    const handleDelete = (item: Kategori) => {
        destroy(route("kategori.destroy", item.id));
        reset();
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("kategori.update", data.id), {
                onSuccess: () => {
                    setOpenModal(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("kategori.store"), {
                onSuccess: () => {
                    setOpenModal(false), reset();
                },
            });
        }
    };

    //! table
    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Kategori", className: "" },
        { name: "@", className: "text-center w-20" },
    ];

    return (
        <AuthLayout>
            <Head title="Kategori" />
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
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Kategori
                        </h2>
                        <Separator />

                        <div className="w-full space-y-4">
                            <Button
                                className={cn("gap-2")}
                                onClick={() => setOpenModal(true)}
                            >
                                <PlusCircledIcon className="w-5 h-5" />
                                <span>Tambah Kategori</span>
                            </Button>

                            <DataTable
                                data={kategori}
                                header={header}
                                link={"kategori.index"}
                            >
                                {kategori.data.length !== 0 ? (
                                    kategori.data.map((item, index) => (
                                        <TableRow key={kategori.from + index}>
                                            <TableCell className="text-center">
                                                {kategori.from + index}
                                            </TableCell>
                                            <TableCell>
                                                {item.nama_kategori}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <DotsHorizontalIcon className="w-5 h-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                        >
                                                            <Pencil1Icon className="w-4 h-4 mr-3" />
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger className="inline-flex items-center px-2 py-1.5 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-default select-none rounded-md hover:bg-secondary w-full ">
                                                                <TrashIcon className="w-4 h-4 mr-3" />
                                                                <span>
                                                                    Hapus
                                                                </span>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        Apakah
                                                                        anda
                                                                        yakin
                                                                        ingin
                                                                        menghapus?
                                                                        😟
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Setelah
                                                                        dihapus
                                                                        data
                                                                        tidak
                                                                        dapat
                                                                        dikembalikan!
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>
                                                                        Tidak
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                item
                                                                            )
                                                                        }
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
                                        <TableCell
                                            className="text-center"
                                            colSpan={header.length}
                                        >
                                            Tidak ada data untuk ditampilkan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </DataTable>
                        </div>
                    </CardContent>
                </Card>

                {/* modal form */}
                <KategoriForm
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

export default PageKategori;
