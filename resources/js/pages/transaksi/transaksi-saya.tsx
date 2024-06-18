import React from "react";
import { Head, router } from "@inertiajs/react";
import moment from "moment/moment";
import ReactToPrint from "react-to-print";

import AuthLayout from "@/layouts/auth-layout";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/data-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { DollarSign, Loader2, Printer } from "lucide-react";
import handlPayment from "@/lib/handle-payment";
import currentcyFormatter from "@/lib/currentcy-formatter";
import PrintComponent from "./print-component";
import { on } from "events";

function PageTransaksiSaya({ transaksi }: any) {
  //! events
  const onBayar = (item: any) => {
    handlPayment(item.snap_token);
  };

  //! table
  const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "Invoice", className: "" },
    { name: "Tanggal dibuat", className: "" },
    { name: "Nama Kamar", className: "" },
    { name: "Harga Kamar", className: "" },
    { name: "Jenis Sewa", className: "" },
    { name: "Harga Total", className: "" },
    { name: "Status", className: "text-center" },
    { name: "Aksi", className: "text-center w-40" },
  ];

  // set midtrans
  React.useEffect(() => {
    const midtransUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // print
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef<(value: null) => void | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showData, setShowData] = React.useState(null);

  const handleOnBeforeGetContent = React.useCallback(
    (item: any) => {
      setShowData(item);
      setLoading(true);
      return new Promise((resolve) => {
        // @ts-ignore
        onBeforeGetContentResolve.current = resolve;
        setTimeout(() => {
          setLoading(false);
          setShowData(item);
          if (onBeforeGetContentResolve.current) {
            onBeforeGetContentResolve.current(null);
          }
        }, 2000);
      });
    },
    [setLoading, setShowData]
  );

  const handleBeforePrint = React.useCallback((item: any) => {
    setShowData(item);
    console.log("`onBeforePrint` called");
  }, []);

  React.useEffect(() => {
    if (!showData && typeof onBeforeGetContentResolve.current === "function") {
      onBeforeGetContentResolve.current?.(null);
    }
  }, [onBeforeGetContentResolve.current, showData]);

  React.useEffect(() => {
    // Parse query parameters dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const order_id = urlParams.get("order_id");
    const status_code = urlParams.get("status_code");
    const transaction_status = urlParams.get("transaction_status");

    // Jika parameter ada, lakukan fetch ke route
    if (order_id && status_code && transaction_status) {
      router.post(route("midtrans.callback"), {
        order_id,
        status_code,
        transaction_status,
      });
    }

    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  return (
    <AuthLayout>
      <Head title="Transaksi Saya" />
      <Card className={cn("relative")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <div>
            <h2 className="text-2xl font-bold md:text-4xl">Transaksi Saya</h2>
          </div>
          <Separator />
          <div className="w-full">
            <DataTable data={transaksi} header={header} link={"transaksi.index"}>
              {transaksi.data.length !== 0 ? (
                transaksi.data.map((item: any, index: number) => (
                  <TableRow key={transaksi.from + index}>
                    <TableCell className="text-center">{transaksi.from + index}</TableCell>

                    <TableCell>{item.invoice}</TableCell>
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

                    <TableCell>
                      {item.status === "1" ? (
                        <button
                          onClick={() => onBayar(item)}
                          className="flex items-center justify-center gap-2 px-3 py-1 text-center text-white rounded-md bg-primary"
                        >
                          <DollarSign className="w-4 h-4 mr-3" />
                          Bayar
                        </button>
                      ) : item.status === "2" ? (
                        <ReactToPrint
                          onBeforeGetContent={() => handleOnBeforeGetContent(item)}
                          onBeforePrint={() => handleBeforePrint(item)}
                          trigger={() => (
                            <button
                              className="flex items-center justify-center gap-2 px-3 py-1 text-center text-white rounded-md bg-primary"
                              onClick={() => setShowData(item)}
                            >
                              <>
                                <Printer className="w-4 h-4 mr-3" />
                                <span>Cetak</span>
                              </>
                            </button>
                          )}
                          content={() => componentRef.current}
                        />
                      ) : null}
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

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {/* @ts-ignore */}
        <PrintComponent ref={componentRef} data={showData} />
      </Card>
    </AuthLayout>
  );
}

export default PageTransaksiSaya;
