import React from "react";
import { Head, Link } from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";

import AuthLayout from "@/layouts/auth-layout";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Kamar } from "@/types";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import currentcyFormatter from "@/lib/currentcy-formatter";
import { buttonVariants } from "@/components/ui/button";

function PageKamarShow({ kamar }: { kamar: Kamar }) {
  //! states
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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

  return (
    <AuthLayout>
      <Head title="Detail Kamar" />
      <Card className={cn("w-full border-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <h2 className="text-2xl font-bold md:text-4xl">Detail Kamar</h2>
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
                        alt={`FotoKamar${index}`}
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
                    <DotFilledIcon key={index} className="text-primary" />
                  ) : (
                    <DotIcon key={index} />
                  )
                )}
            </div>
            <Separator className="my-10" />
            <div className="w-full">
              <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">Info Kamar :</h1>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={cn("w-1/4")}>Nama Kamar</TableCell>
                    <TableCell>: {kamar?.nama_kamar}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={cn("w-1/4")}>Kategori</TableCell>
                    <TableCell>: {kamar?.kategori?.nama_kategori}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={cn("w-1/4")}>Luas</TableCell>
                    <TableCell>: {kamar?.luas_kamar} m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={cn("w-1/4")}>Harga</TableCell>
                    <TableCell>: {currentcyFormatter.format(kamar?.harga_kamar)} ,-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={cn("w-1/4")}>Lokasi</TableCell>
                    <TableCell>: {kamar?.lokasi_kamar}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={cn("w-1/4")}>Deskripsi</TableCell>
                    <TableCell>: {kamar?.deskripsi_kamar}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <Separator className="my-10" />
            <div className="w-full">
              <h1 className="text-2xl font-bold underline decoration-dashed decoration-primary">Fasilitas :</h1>
              <ul className="mt-5 ml-5 list-decimal">
                {kamar?.fasilitas_kamar &&
                  kamar?.fasilitas_kamar.map((item, index) => {
                    return <li key={index}>{item.nama_fasilitas}</li>;
                  })}
              </ul>
            </div>
            <div className="w-full mt-20">
              <Link
                href={route("kamar.index")}
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                })}
              >
                Kembali
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default PageKamarShow;
