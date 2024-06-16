import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { pickBy } from "lodash";

import GuestLayout from "@/layouts/guest-layout";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CardKamar from "@/components/card-kamar";
import Pagination from "@/components/pagination";
import Footer from "@/layouts/shared/footer";

function DaftarKamar({ kamar }: any) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchChanged, setSearchChanged] = React.useState(false);

  React.useEffect(() => {
    if (searchChanged) {
      const delaySearch = setTimeout(() => {
        getData();
      }, 500);

      return () => {
        clearTimeout(delaySearch);
      };
    }
    setSearchChanged(true);
  }, [search, setSearchChanged]);

  const getData = () => {
    setIsLoading(true);
    router.get(route("daftar.kamar"), pickBy({ search }), {
      preserveScroll: true,
      preserveState: true,
      onFinish: () => setIsLoading(false),
    });
  };

  return (
    <GuestLayout>
      <Head title="Daftar Kamar" />
      <section id="daftar-kamar" className="bg-white">
        <div className="container py-10 mx-auto md:px-24 md:flex-row">
          <div className="w-full">
            <div className="relative w-full rounded-md lg:w-1/2">
              <div className="absolute inset-y-0 left-0 flex items-center p-2 rounded-tl-md rounded-bl-md bg-primary">
                <Search className="text-white" />
              </div>
              <Input
                type="search"
                id="search"
                name="search"
                placeholder="Cari nama atau alamat kos ..."
                className={cn("h-10  shadow-lg pl-14")}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full mt-10">
            <div className="grid grid-cols-4 gap-5">
              {kamar?.data?.length === 0
                ? "Tidak ada data untuk ditampilkan"
                : kamar?.data?.map((item, index) => {
                    return <CardKamar item={item} index={index} />;
                  })}
            </div>
          </div>

          <div className="w-full mt-10">
            <Pagination links={kamar.links} />
          </div>
        </div>
      </section>
      <Footer />
    </GuestLayout>
  );
}

export default DaftarKamar;
