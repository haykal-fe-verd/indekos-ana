import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { pickBy } from "lodash";

import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Pagination from "@/components/pagination";
import AuthLayout from "@/layouts/auth-layout";
import CardKamarPenyewa from "@/components/card-kamar-penyewa";

function DashboardPenyewa({ kamar }: any) {
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
    router.get(route("dashboard"), pickBy({ search }), {
      preserveScroll: true,
      preserveState: true,
      onFinish: () => setIsLoading(false),
    });
  };
  return (
    <AuthLayout>
      <Head title="Dashboard" />
      <section id="daftar-kamar" className="bg-slate-50">
        <div className="px-10 py-10">
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
                : kamar?.data?.map((item: any, index: number) => {
                    return <CardKamarPenyewa key={index} item={item} />;
                  })}
            </div>
          </div>

          <div className="w-full mt-10">
            <Pagination links={kamar.links} />
          </div>
        </div>
      </section>
    </AuthLayout>
  );
}

export default DashboardPenyewa;
