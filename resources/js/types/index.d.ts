export interface User {
  id: string;
  nama: string;
  tanggal_lahir: string;
  umur: number;
  no_hp: string;
  alamat: string;
  email: string;
  role: string;
  jenis_kelamin: string;
  photo: any;
  email_verified_at: string;
}

export interface Sessions {
  message?: string;
  success?: string;
  error?: string;
  snapToken?: string;
}

export interface Ziggy {
  routes: {
    [name: string]: string;
  };
  location: string;
}

export interface Kategori {
  id: string;
  nama_kategori: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Kamar {
  id: string;
  nama_kamar: string;
  deskripsi_kamar: string;
  luas_kamar: string;
  lokasi_kamar: string;
  harga_kamar: number;
  kategori: Kategori;
  fasilitas_kamar: FasilitasKamar[] | null;
  foto_kamar: FotoKamar[] | null;
  jenis_sewa: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface FotoKamar {
  id: string;
  kamar_id: string;
  foto: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface FasilitasKamar {
  id: string;
  kamar_id: string;
  nama_fasilitas: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface UserResponse {
  data: User[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  links: Link[];
}
export interface KategoriResponse {
  data: Kategori[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  links: Link[];
}

export interface KamarResponse {
  data: Kamar[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
  links: Link[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  sessions: Sessions;
  ziggy: Ziggy;
  kategori: Kategori;
};
