import React from "react";
import { Head } from "@inertiajs/react";
import moment from "moment/moment";

import currentcyFormatter from "@/lib/currentcy-formatter";
import AuthLayout from "@/layouts/auth-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import DataTable from "@/components/data-table";

function PageAdminTransaksi({ transaksi }: any) {
  console.log("🚀  transaksi ==>", transaksi);
  //! tables
  const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Invoice", className: "" },
    { name: "Nama", className: "" },
    { name: "Tanggal dibuat", className: "" },
    { name: "Nama Kamar", className: "" },
    { name: "Harga Kamar", className: "" },
    { name: "Jenis Sewa", className: "" },
    { name: "Total Bayar", className: "" },
    { name: "Status", className: "text-center" },
  ];

  return (
    <AuthLayout>
      <Head title="Transaksi" />
      <Card className={cn("w-full border-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <div>
            <h2 className="text-2xl font-bold md:text-4xl">Transaksi</h2>
          </div>
          <Separator />
          <div className="w-full">
            <DataTable data={transaksi} header={header} link={"transaksi.index"}>
              {transaksi.data.length !== 0 ? (
                transaksi.data.map((item, index) => (
                  <TableRow key={transaksi.from + index}>
                    <TableCell className="text-center">{transaksi.from + index}</TableCell>
                    <TableCell>{item.invoice}</TableCell>
                    <TableCell>{item.user.nama}</TableCell>
                    <TableCell>{moment(item.created_at).format("DD-MM-YYYY")}</TableCell>
                    <TableCell>{item.kamar.nama_kamar}</TableCell>
                    <TableCell>{currentcyFormatter.format(item.kamar.harga_kamar)}</TableCell>
                    <TableCell className="capitalize">{item.jenis_sewa === "1" ? "Bulanan" : "Tahunan"}</TableCell>
                    <TableCell>{currentcyFormatter.format(item.total_harga)}</TableCell>
                    <TableCell className="text-center">
                      {item.status === "1" && (
                        <span className="px-4 py-1 text-white bg-yellow-500 rounded-md">Menunggu</span>
                      )}

                      {item.status === "2" && (
                        <span className="px-4 py-1 text-white bg-blue-500 rounded-md">Berhasil</span>
                      )}

                      {item.status === "3" && (
                        <span className="px-4 py-1 text-white rounded-md bg-violet-500">Kadaluarsa</span>
                      )}

                      {item.status === "4" && <span className="px-4 py-1 text-white bg-red-500 rounded-md">Batal</span>}
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
      PageAdminTransaksi
    </AuthLayout>
  );
}

export default PageAdminTransaksi;
