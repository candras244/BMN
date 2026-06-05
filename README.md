# 📋 SIM-DBR

### Sistem Informasi Manajemen Daftar Barang Ruangan dan Inventaris Aset

### UIN Syekh Wasil Kediri

---

## Tentang

SIM-DBR adalah aplikasi untuk mengelola inventaris aset dan Daftar Barang Ruangan (DBR) di lingkungan UIN Syekh Wasil Kediri.

Sistem ini digunakan untuk mencatat data aset, lokasi aset, mutasi antar ruangan, penyusunan DBR, serta penyajian statistik aset secara terpusat.

Konsep utama sistem adalah **Master Aset sebagai pusat data**, sehingga seluruh informasi aset tersimpan dalam satu database dan digunakan oleh seluruh modul sistem.

Dibangun sebagai aplikasi single-page yang ringan, bisa diakses dari browser maupun HP.

---

## Fitur Utama

### 📦 Master Aset

Database utama seluruh aset.

Menyimpan:

* ID Aset
* Kode Barang
* NUP
* Nama Barang
* Merk
* Nomor Seri
* Tahun Perolehan
* Nilai Perolehan
* Sumber Dana
* Gedung
* Ruangan Saat Ini
* Status
* Usia
* Keterangan

---

### 🏢 Gedung

Mengelola data gedung.

---

### 🚪 Ruangan

Mengelola data ruangan dan penanggung jawab ruangan.

---

### 🔄 Mutasi

Mencatat seluruh perpindahan aset.

Fungsi:

* Menyimpan riwayat mutasi.
* Memperbarui lokasi aset.
* Mengetahui perpindahan aset antar ruangan.

---

### 📄 DBR (Daftar Barang Ruangan)

Menampilkan daftar aset berdasarkan ruangan saat ini.

Informasi yang ditampilkan:

* ID Aset
* Nama Barang
* Status
* Nilai Perolehan

---

### 📊 Statistik

Menyediakan laporan:

* Jumlah aset
* Aset per gedung
* Aset per ruangan
* Aset per status
* Nilai aset per gedung
* Nilai aset per ruangan
* Pengadaan per tahun
* Aset yang sering dipindahkan
* Aset yang sering diperbaiki
* Aset yang sering rusak
* Aset layak penggantian

---

## Tujuan Sistem

1. Mengetahui lokasi aset saat ini.
2. Mengetahui aset yang berada pada setiap ruangan.
3. Mengetahui riwayat mutasi aset.
4. Menyediakan DBR secara otomatis.
5. Menyediakan statistik aset.
6. Memudahkan monitoring dan pelaporan BMN.

---

## Teknologi

| Layer    | Teknologi             |
| -------- | --------------------- |
| Frontend | HTML, CSS, JavaScript |
| Backend  | Supabase              |
| Database | PostgreSQL            |
| Hosting  | GitHub Pages          |

---

## Struktur Project

```text
sim-dbr/
│
├── index.html
├── css/
├── js/
├── images/
├── supabase_schema.sql
└── README.md
```

---

## Status Pengembangan

🚧 Dalam Pengembangan

Modul yang direncanakan:

* Master Aset
* Gedung
* Ruangan
* Mutasi
* DBR
* Statistik
* Export PDF
* Upload Dokumen
* QR Code Aset

---

## Pengembang

Bagian Umum dan BMN

UIN Syekh Wasil Kediri
