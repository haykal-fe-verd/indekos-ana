import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Bitcoin } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import currentcyFormatter from "@/lib/currentcy-formatter";

import GuestLayout from "@/layouts/guest-layout";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Footer from "@/layouts/shared/footer";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

function DetailKamarGuest({ kamar }) {
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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
    <GuestLayout>
      <Head title="Detail Kamar" />
      <section id="detail-kamar" className="bg-white">
        <div className="container flex flex-col gap-10 py-10 mx-auto lg:px-24 lg:flex-row">
          <div className="w-full h-full rounded-md shadow-lg lg:w-1/2">
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
          </div>
          <div className="flex flex-col w-full text-stone-600">
            <h1 className="text-3xl font-semibold ">{kamar.nama_kamar}</h1>
            <h2>{kamar.lokasi_kamar}</h2>
            <p className="text-xs text-gray-400">
              {kamar.fasilitas_kamar?.map((i, idx) => {
                return <span key={idx}> {i.nama_fasilitas} &#x2022;</span>;
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
              <span>{currentcyFormatter.format(kamar.harga_kamar)}</span>
            </p>

            <Separator className="my-5" />

            <Link
              href={route("payment.index", kamar.id)}
              className={cn(
                "gap-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              )}
            >
              <Bitcoin />
              <span className="font-semibold">Sewa Sekarang</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </GuestLayout>
  );
}

export default DetailKamarGuest;
