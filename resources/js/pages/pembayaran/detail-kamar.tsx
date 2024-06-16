import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { DotFilledIcon, DotIcon, UpdateIcon } from "@radix-ui/react-icons";
import Autoplay from "embla-carousel-autoplay";

import AuthLayout from "@/layouts/auth-layout";
import { Kamar, PageProps } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import currentcyFormatter from "@/lib/currentcy-formatter";
import { Bitcoin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormPayment from "./form";
import handlPayment from "@/lib/handle-payment";

function PageDetailKamarPembayaran({ kamar }: { kamar: Kamar }) {
  //! hooks
  const { sessions } = usePage<PageProps>().props;
  const { data, setData, post, reset, processing, errors } = useForm({
    kamar_id: kamar.id,
    jenis_sewa: "1",
    tgl_kadaluarsa: "",
    total_harga: kamar.harga_kamar,
  });

  //! states
  const [showFullDescription, setShowFullDescription] = React.useState<boolean>(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const [jenisSewa, setJenisSewa] = React.useState<string>("1");
  const [tanggalBerakhir, setTanggalBerakhir] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  //! events
  const totalHarga = React.useMemo(() => {
    const harga = kamar.harga_kamar || 0;
    return jenisSewa === "2" ? harga * 12 : harga;
  }, [kamar.harga_kamar, jenisSewa]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("payment.store"), {
      onSuccess: () => {
        setOpenModal(false), reset();
      },
    });
  };

  //! mounted
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    const today = new Date();
    if (jenisSewa === "1") {
      today.setMonth(today.getMonth() + 1);
    } else {
      today.setFullYear(today.getFullYear() + 1);
    }

    const formattedDate = today.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const mysqlDate = `${year}-${month}-${day}`;

    setData({
      ...data,
      tgl_kadaluarsa: mysqlDate,
      total_harga: totalHarga,
    });

    setTanggalBerakhir(formattedDate);
  }, [jenisSewa]);

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

  // open snap
  React.useEffect(() => {
    if (sessions?.snapToken && typeof window.snap === "object" && typeof window.snap.pay === "function") {
      handlPayment(sessions.snapToken);
    }
  }, [sessions?.snapToken]);

  return (
    <AuthLayout>
      <Head title="Detail Kamar" />

      <Dialog
        open={openModal}
        onOpenChange={(isOpen) => {
          setOpenModal(isOpen);
          if (!isOpen) {
            reset();
          }
        }}
      >
        <Card className={cn("w-full border-none")}>
          <CardContent className={cn("p-6 space-y-4")}>
            <div>
              <h2 className="text-2xl font-bold md:text-4xl">Detail {kamar.nama_kamar}</h2>
            </div>
            <Separator />

            <div className="w-full">
              <Carousel
                setApi={setApi}
                plugins={[
                  // @ts-ignore
                  Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                  }),
                ]}
              >
                <CarouselContent>
                  {kamar.foto_kamar &&
                    kamar.foto_kamar.map((item, index) => (
                      <CarouselItem className="w-full max-h-[300px] rounded-md overflow-hidden">
                        <img
                          src={`/foto/${item?.foto}`}
                          alt={`FotoKamar-${index}`}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
              <div className="w-full flex items-center justify-center gap-1s">
                {kamar.foto_kamar &&
                  kamar.foto_kamar.map((item, index) =>
                    current === index + 1 ? (
                      <DotFilledIcon key={item.id} className="text-primary" />
                    ) : (
                      <DotIcon key={item.id} />
                    )
                  )}
              </div>

              <div className=" flex flex-col gap-10 mx-auto lg:flex-row">
                <div className="flex flex-col w-full text-stone-600">
                  <h1 className="text-3xl font-semibold ">{kamar.nama_kamar}</h1>
                  <h2>{kamar.lokasi_kamar}</h2>
                  <p className="text-xs text-gray-400">
                    {kamar.fasilitas_kamar?.map((i) => {
                      return <span key={i.id}> {i.nama_fasilitas} &#x2022;</span>;
                    })}
                  </p>
                  <Separator className="my-5" />

                  <p>
                    <span className="font-semibold">Luas &ensp;&ensp;&ensp;&ensp;&ensp;: </span>
                    {kamar.luas_kamar} m
                  </p>
                  <p className="font-semibold">Deskripsi &ensp;:</p>
                  <p className="text-justify">
                    {showFullDescription
                      ? kamar?.deskripsi_kamar
                      : `${kamar?.deskripsi_kamar.slice(0, 150)}${kamar?.deskripsi_kamar.length > 150 ? "..." : ""}`}
                  </p>
                  {kamar?.deskripsi_kamar.length > 150 && (
                    <button
                      type="button"
                      onClick={toggleDescription}
                      className="my-3 underline cursor-pointer text-primary w-fit"
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <p className="mt-3 text-lg font-semibold text-cut">
                    {currentcyFormatter.format(kamar.harga_kamar)},-
                  </p>

                  <Separator className="my-5" />

                  <Button type="button" className={cn("gap-3 flex flex-row")} onClick={() => setOpenModal(true)}>
                    <Bitcoin />
                    <span className="font-semibold">Sewa Sekarang</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FormPayment
          onSubmit={onSubmit}
          setData={setData}
          tanggalBerakhir={tanggalBerakhir}
          processing={processing}
          totalHarga={totalHarga}
          jenisSewa={jenisSewa}
          setJenisSewa={setJenisSewa}
        />
      </Dialog>
    </AuthLayout>
  );
}

export default PageDetailKamarPembayaran;
