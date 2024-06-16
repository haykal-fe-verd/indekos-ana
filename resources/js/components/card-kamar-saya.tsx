import React from "react";
import currentcyFormatter from "@/lib/currentcy-formatter";

function CardKamarSaya({ item }: any) {
  //! states
  const [tanggalBerakhir, setTanggalBerakhir] = React.useState<string>("");
  const [jenisSewa, setJenisSewa] = React.useState<string>("perbulan");

  React.useEffect(() => {
    if (item?.jenis_sewa === "1") {
      setJenisSewa("Bulanan");
    } else {
      setJenisSewa("Tahunan");
    }

    const dateObj = new Date(item?.tgl_kadaluarsa);
    const formattedDate = dateObj.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setTanggalBerakhir(formattedDate);
  }, [item?.tgl_kadaluarsa, item?.jenis_sewa]);

  return (
    <div className="flex flex-col col-span-4 leading-relaxed lg:col-span-1 text-stone-600 w-full rounded-md overflow-hidden p-2 shadow-md">
      <div className="relative mb-3">
        <img
          src={`/foto/${item?.kamar.foto_kamar?.[0]?.foto}`}
          alt="Foto Kamar"
          loading="lazy"
          className="object-cover w-full rounded-md h-[170px]"
        />
        <span className="absolute z-10 px-3 py-1 text-xs text-white rounded-md top-2 left-2 bg-primary ">
          {item.kamar.kategori.nama_kategori}
        </span>
      </div>
      <h2 className="font-semibold text-cut">{item.nama_kamar}</h2>
      <h3 className="text-cut">{item.lokasi_kamar}</h3>
      <p className="text-xs text-gray-400 text-cut">
        {item.kamar.fasilitas_kamar?.map((i: any, idx: number) => {
          return <span key={idx}> {i.nama_fasilitas} &#x2022;</span>;
        })}
      </p>
      <p className="mt-3 text-lg font-semibold text-cut">
        {currentcyFormatter.format(item.kamar.harga_kamar)} / <span className="text-xs text-primary">bulan</span>
      </p>
      <p className="mt-3 text-lg font-semibold text-cut">{jenisSewa}</p>
      <p className="mt-3 text-lg font-semibold text-cut">
        Berakhir Pada <span className="text-primary">{tanggalBerakhir}</span>
      </p>
    </div>
  );
}

export default CardKamarSaya;
