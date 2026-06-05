# BMN
# 📋 SIM-ASSET BMN
### Sistem Informasi Manajemen Daftar Barang Ruangan
**UIN Syekh Wasil Kediri**

---

## Tentang

SIM-ASSET BMN adalah aplikasi inventaris aset yang digunakan untuk mengelola Barang Milik Negara (BMN) di lingkungan UIN Syekh Wasil Kediri.

Sistem ini dirancang untuk memudahkan pengelolaan aset mulai dari pendataan aset, lokasi aset, mutasi antar ruangan, penyusunan Daftar Barang Ruangan (DBR), hingga penyajian statistik aset secara real-time.

Konsep utama sistem adalah Master Aset sebagai pusat data, sehingga seluruh informasi aset tersimpan pada satu sumber data yang terintegrasi.. Dibangun sebagai aplikasi single-page yang ringan, bisa diakses dari browser maupun HP.

Tujuan Sistem
Mengetahui lokasi aset saat ini.
Mengetahui aset yang berada pada setiap ruangan.
Menyimpan riwayat mutasi aset.
Menyajikan Daftar Barang Ruangan (DBR) secara otomatis.
Mengetahui nilai aset per gedung dan ruangan.
Menyediakan statistik aset untuk kebutuhan pengambilan keputusan.

Modul Utama
🏢 Gedung

Mengelola data gedung.

Data yang disimpan:

ID Gedung
Nama Gedung
🚪 Ruangan

Mengelola data ruangan.

Data yang disimpan:

ID Ruangan
Nama Ruangan
Gedung
Jenis Ruangan
Penanggung Jawab
📦 Master Aset

Database utama seluruh aset.

Satu baris mewakili satu aset.

Data yang disimpan:

ID Aset
Kode Barang
NUP
Nama Barang
Merk
Nomor Seri
Tahun Perolehan
Nilai Perolehan
Sumber Dana
Gedung
Ruangan Saat Ini
Status
Usia
Keterangan

Status aset:

Baik
Dipinjam
Perbaikan
Rusak Berat
Dihapus
🔄 Mutasi

Mencatat seluruh perpindahan aset.

Data yang disimpan:

Tanggal
ID Aset
Dari Ruangan
Ke Ruangan
Nomor Dokumen
Link Dokumen
Keterangan

Fungsi:

Menyimpan riwayat perpindahan aset.
Memperbarui lokasi aset pada Master Aset secara otomatis.
📄 DBR (Daftar Barang Ruangan)

DBR merupakan laporan otomatis yang menampilkan daftar aset berdasarkan lokasi ruangan saat ini.

Informasi yang ditampilkan:

ID Aset
Nama Barang
Status
Nilai Perolehan
📊 Statistik

Dashboard statistik aset.

Laporan yang tersedia:

Jumlah aset
Jumlah aset per gedung
Jumlah aset per ruangan
Jumlah aset per status
Nilai aset per gedung
Nilai aset per ruangan
Pengadaan aset per tahun
Aset yang sering dipindahkan
Aset yang sering diperbaiki
Aset yang sering mengalami kerusakan
Aset layak penggantian
Alur Sistem
Input Aset Baru
Operator menambahkan data pada Master Aset.
Sistem menyimpan lokasi awal aset.
Mutasi Aset
Operator membuat data mutasi.
Riwayat mutasi tersimpan.
Lokasi aset pada Master Aset diperbarui otomatis.
DBR
Pengguna memilih ruangan.
Sistem menampilkan seluruh aset pada ruangan tersebut.
Statistik
Sistem membaca data Master Aset dan Mutasi.
Dashboard diperbarui secara otomatis.
Hak Akses
Role	Hak Akses
Super Admin	Kelola seluruh data sistem
Operator	Kelola aset dan mutasi
Verifikator	Verifikasi dan monitoring data
Viewer	Melihat laporan dan statistik
Teknologi
Layer	Teknologi
Frontend	HTML, CSS, JavaScript
Backend	Supabase
Database	PostgreSQL
Hosting	GitHub Pages
Authentication	Supabase Auth
Struktur Project
sim-asset-bmn/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── gedung.js
│   ├── ruangan.js
│   ├── aset.js
│   ├── mutasi.js
│   ├── dbr.js
│   └── statistik.js
│
├── images/
│   └── logo-uin.png
│
├── supabase_schema.sql
│
└── README.md
Fitur Utama
Master Aset Terpusat
Mutasi Otomatis
DBR Otomatis
Dashboard Statistik
Multi User
Responsive Mobile
Dark Mode
Export PDF
Riwayat Mutasi Aset
Monitoring Kondisi Aset
Roadmap
Versi 1.0
Master Aset
Gedung
Ruangan
Mutasi
DBR
Statistik
Versi 2.0
QR Code Aset
Upload Dokumen
Upload Foto Aset
Tracking Pemeliharaan
Notifikasi Aset Layak Penggantian
Pengembang

Bagian Umum dan BMN

UIN Syekh Wasil Kediri
---

## Fitur

- **Dashboard** — ringkasan total aset, kondisi baik/perbaikan/rusak per unit
- **Master Data** — kelola barang, lokasi ruangan, PIC/Kasub Bag, dan user
- **Input DBR** — input dan verifikasi kondisi barang per ruangan
- **Laporan** — rekap per ruangan dengan export PDF berkop UIN
- **Multi role** — Super Admin (Bagian Umum) dan Admin Fakultas
- **Responsive** — bisa dipakai di HP maupun desktop
- **Dark/Light mode**

---

## Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | HTML + Vanilla JS (single file) |
| Database | Supabase (PostgreSQL) |
| Hosting | GitHub Pages |

---

## Role & Akses

| Role | Siapa | Akses |
|------|-------|-------|
| `superadmin` | Bagian Umum | Penuh — semua unit, kelola user |
| `admin_fakultas` | Admin per unit | Edit data unit sendiri saja |

---

## Struktur Project

```
sim-dbr/
├── index.html              ← Aplikasi utama
├── images/
│   └── uin.png             ← Logo UIN Syekh Wasil Kediri
├── supabase_schema.sql     ← Schema database Supabase
└── README.md
```

---

## Setup

### 1. Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → paste isi `supabase_schema.sql` → Run
3. Catat **Project URL** dan **Anon Key** dari Settings → API

### 2. Konfigurasi

Buka `index.html`, cari dan ganti:

```js
const SB_URL = "https://your-project.supabase.co";
const SB_KEY = "your-anon-key";
```

### 3. Deploy

Push ke GitHub → aktifkan **GitHub Pages** di Settings → Pages → Source: `main`

### 4. Login Pertama

Default user sudah tersedia di database (`supabase_schema.sql`):

| Username | Password | Role |
|----------|----------|------|
| `admin` | *(kosong, isi saat login pertama)* | Super Admin |

---

## Penggunaan
