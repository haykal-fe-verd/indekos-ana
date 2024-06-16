import React from "react";
import { Head } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { KamarResponse } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CardKamarSaya from "@/components/card-kamar-saya";

function PageKamarSaya({ kamarSaya }: { kamarSaya: KamarResponse }) {
  return (
    <AuthLayout>
      <Head title="Kamar Saya" />
      <Card className={cn("w-full border-none")}>
        <CardContent className={cn("p-6 space-y-4")}>
          <div>
            <h2 className="text-2xl font-bold md:text-4xl">Kamar Saya</h2>
          </div>
          <Separator />
          <div className="w-full">
            <div className="grid w-full grid-cols-4 gap-5">
              {kamarSaya?.data?.length === 0 ? (
                <div className="col-span-4">
                  <Alert variant="destructive">
                    <AlertCircle className="" />
                    <AlertTitle>Ops!</AlertTitle>
                    <AlertDescription>
                      Belum ada data kamar untuk ditampilkan, silahkan lakukan sewa kamar terlebih dahulu.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                kamarSaya?.data?.map((item, index) => {
                  return <CardKamarSaya key={index} item={item} />;
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default PageKamarSaya;
