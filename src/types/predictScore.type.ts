// types/predictScoreTypes.ts

export type Demografi = {
  usia: number;
  pekerjaan: string;
  penghasilan: number;
};

export type Psikografis = {
  minat: string[]; // contoh: ["Mobil Sport", "Hemat BBM"]
  gayaHidup: string; // contoh: "Aktif", "Santai", "Modern"
  motivasi: string; // contoh: "Gengsi", "Kebutuhan Keluarga"
};

export type Perilaku = {
  frekuensiKontak: number; // jumlah follow-up
  responAwal: string; // contoh: "Cepat", "Lambat"
  interaksiFavorit: string; // contoh: "WhatsApp"
};

export type Lingkungan = {
  sumber: string; // contoh: "Teman", "Keluarga", "Iklan"
};
