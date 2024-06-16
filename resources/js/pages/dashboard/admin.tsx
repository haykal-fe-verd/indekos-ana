import React from "react";
import { Head } from "@inertiajs/react";
import { ArchiveRestore, Bed, FileText, User2 } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

function DashboardAdmin({ totalKamar, totalKategori, totalPenyewa, totalTransaksi }: any) {
  const dataDashboard = [
    {
      id: 1,
      title: "Total Kamar",
      desc: totalKamar,
      icons: <Bed className="w-10 h-10 " />,
    },
    {
      id: 2,
      title: "Total Kategori",
      desc: totalKategori,
      icons: <ArchiveRestore className="w-10 h-10 " />,
    },
    {
      id: 3,
      title: "Total Penyewa",
      desc: totalPenyewa,
      icons: <User2 className="w-10 h-10 " />,
    },
    {
      id: 4,
      title: "Total Transaksi",
      desc: totalTransaksi,
      icons: <FileText className="w-10 h-10 " />,
    },
  ];

  return (
    <AuthLayout>
      <Head title="Dashboard" />
      <Card className={cn("w-full border-none bg-slate-50 shadow-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <h2 className="text-2xl font-bold md:text-4xl">Dashboard</h2>
          <Separator />

          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-5">
              {dataDashboard.map((item) => (
                <div key={item.id} className="relative col-span-4 py-5 bg-white rounded-md shadow-lg lg:col-span-1">
                  <div className="absolute inset-y-0 flex items-center justify-center px-6 text-white bg-primary rounded-tl-md rounded-bl-md">
                    {item.icons}
                  </div>
                  <h2 className="text-2xl font-semibold pl-28">{item.title}</h2>
                  <p className="mt-5 text-4xl font-bold pl-28 text-primary">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default DashboardAdmin;
