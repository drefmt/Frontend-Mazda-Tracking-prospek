# Pengembangan Sistem Majanemen Prospek, Spk, Dan Penjualan Kendaraan (Studi Kasus Mazda Banjararu)

Frontend aplikasi untuk mengelola prospek, test drive, SPK, dan retail.  
Mendukung dashboard untuk **Sales** dan **Supervisor**, reminder follow-up, laporan PDF, dan feedback pelanggan.

---

## 📦 Requirements

Sebelum menjalankan aplikasi ini, pastikan sudah terpasang:

- [Node.js](https://nodejs.org/) **v22.14.0** atau lebih baru
- [npm](https://www.npmjs.com/) v10 atau lebih baru
- Backend API berjalan (lihat dokumentasi backend)

---

## 🛠️ Teknologi yang Digunakan

- **React.js v19** – Library utama frontend
- **Vite** – Build tool untuk development dan production
- **Tailwind CSS** – Framework Css
- **ShadCN UI + Radix UI** – Komponen UI
- **TanStack Query & TanStack Table** – Data fetching & tabel 
- **Formik + Yup** – Form handling & validasi
- **React Router v7** – Routing halaman
- **Date-fns** – Manipulasi tanggal
- **Recharts** – Visualisasi data
- **Axios** – HTTP client untuk komunikasi API
- **Zustand** – State management
- **JsPDF + AutoTable** – Export laporan ke PDF


---

## ⚙️ Konfigurasi Environment

Buat file `.env` di root folder `frontend`:

```env
VITE_API_URL=http://localhost:5000/api
```


## 1. Instalasi & Menjalankan Aplikasi

```bash
git clone https://github.com/drefmt/Frontend-Mazda-Tracking-prospek
cd NAMA_REPO
```
## 2. Install Dependencies
```
npm install
```

## 3. Jalankan Development Server
```
npm run dev
```

## Fitur Utama
- CRUD Prospek – Tambah, edit, hapus prospek
- CRUD Test Drive, SPK, dan Retail
- Reminder Follow-up – Notifikasi otomatis untuk prospek yang - harus di-follow-up
- Dashboard Sales & Supervisor
- Laporan PDF
-Feedback Pelanggan – Kirim link feedback aman dengan masa berlaku


```
frontend/
├── public/                # Asset publik
├── src/
│   ├── assets/            # Gambar, ikon, dan file statis lain
│   ├── components/        # Komponen UI reusable
│   ├── helpers/           # Fungsi helper/utilitas
│   ├── hooks/              # Custom hooks (React Query)
│   ├── interface/         # TypeScript interface
│   ├── layouts/           # Layout halaman
│   ├── lib/               # Library utilitas
│   ├── pages/             # Halaman aplikasi
│   ├── stores/            # Zustand store
│   ├── types/             # TypeScript types global
│   ├── utils/             # Utility functions
│   ├── App.css
│   ├── App.tsx
│   ├── fonts.d.ts
│   ├── main.tsx
│   ├── routes.ts
│   └── vite-env.d.ts
├── .env                   # Konfigurasi environment
├── .env.example           # Contoh konfigurasi environment
├── .gitignore
└── package.json    

```

MIT License © 2025 drefmt