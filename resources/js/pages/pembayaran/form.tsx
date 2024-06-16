import React from "react";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import currentcyFormatter from "@/lib/currentcy-formatter";
import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";

function FormPayment({ onSubmit, setData, tanggalBerakhir, processing, totalHarga, jenisSewa, setJenisSewa }: any) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Konfirmasi Pembayaran</DialogTitle>
        <form onSubmit={onSubmit} className="w-full">
          <Select
            defaultValue={jenisSewa}
            onValueChange={(e) => {
              setJenisSewa(e);
              setData("jenis_sewa", e);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Jenis Sewa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Bulanan</SelectItem>
              <SelectItem value="2">Tahunan</SelectItem>
            </SelectContent>
          </Select>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold text-cut">{currentcyFormatter.format(totalHarga)},-</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Berakhir</p>
              <p className="text-lg font-semibold text-cut">{tanggalBerakhir}</p>
            </div>
          </div>

          <Button type="submit" className="w-full mt-5 inline-flex gap-2 items-center" disabled={processing}>
            {processing && <UpdateIcon className="w-5 h-5 animate-spin" />} Bayar
          </Button>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}

export default FormPayment;
