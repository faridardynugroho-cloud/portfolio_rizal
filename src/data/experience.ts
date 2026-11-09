// Isi photo dengan path file di folder public, misal "/pengalaman-att.jpg". Kosong = tampil kotak placeholder.
export type Experience = {
  role: string
  company: string
  location: string
  period: string
  bullets: string[]
  photo: string
}

export const experiences: Experience[] = [
  {
    role: "IT Support",
    company: "PT Anugerah Tangkas Transportindo (ATT Group)",
    location: "Jakarta",
    period: "Okt 2025 – Jan 2026",
    bullets: [
      "Memberikan dukungan IT untuk 150+ pengguna di ATT Group dan perusahaan mitra Alibaba Group di gedung yang sama.",
      "Troubleshooting, perbaikan, dan pemeliharaan laptop serta PC.",
      "Instalasi, konfigurasi, dan troubleshooting jaringan untuk mendukung konektivitas pengguna.",
      "Memperbarui data inventaris 260+ aset IT secara berkala dengan Microsoft Excel.",
      "Memproses pengajuan pembelian perangkat IT dan perangkat pendukung untuk memenuhi kebutuhan operasional.",
    ],
    photo: "/pengalaman-1.jpeg",
  },
  {
    role: "Content Writer",
    company: "PT Strategi Indonesia Intermedia (Okeguys.com)",
    location: "Jakarta",
    period: "Mei 2023 – Mei 2024",
    bullets: [
      "Riset topik dengan Google Trends sebagai referensi menentukan ide konten.",
      "Menghasilkan sekitar 2000+ artikel yang informatif dalam satu tahun.",
    ],
    photo: "/pengalaman-2.jpeg",
  },
]
