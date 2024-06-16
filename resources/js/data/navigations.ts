import { ArchiveRestore, Bed, FileText, LayoutDashboard, LucideIcon, UploadCloud, Users } from "lucide-react";

export type NavigationType = {
  label: string;
  href: string;
  icon: LucideIcon;
  role: string[];
};

export const navigations: NavigationType[] = [
  {
    label: "Dashboard",
    href: route("dashboard"),
    icon: LayoutDashboard,
    role: ["admin", "penyewa"],
  },
  {
    label: "Kamar",
    href: route("kamar.index"),
    icon: Bed,
    role: ["admin"],
  },
  {
    label: "Transaksi",
    href: route("admin.index"),
    icon: FileText,
    role: ["admin"],
  },
  {
    label: "Kategori",
    href: route("kategori.index"),
    icon: ArchiveRestore,
    role: ["admin"],
  },
  {
    label: "Daftar User",
    href: route("user.index"),
    icon: Users,
    role: ["admin"],
  },

  // penyewa
  {
    label: "Kamar Saya",
    href: route("kamar.saya.index"),
    icon: UploadCloud,
    role: ["penyewa"],
  },
  {
    label: "Transaksi Saya",
    href: route("transaksi.index"),
    icon: FileText,
    role: ["penyewa"],
  },
];
