// Semua konten project ada di sini. Edit teksnya sesuai kenyataan project-mu.
export type Project = {
  slug: string
  title: string
  tagline: string
  category: string
  problem: string
  solution: string
  highlights: string[]
  stack: string[]
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: "dialogen",
    title: "Dialogen",
    tagline: "Kuis multiplayer real-time untuk belajar bahasa daerah Indonesia.",
    category: "Game mobile dengan AI",
    problem: "Bahasa daerah makin jarang dipakai, dan belajar lewat materi statis terasa membosankan.",
    solution: "Game kuis multiplayer di mana pemain bertanding langsung, dengan fitur berbasis AI yang membantu proses belajarnya.",
    highlights: [
      "Pertandingan multiplayer real-time lewat WebSocket",
      "Integrasi OpenAI API untuk fitur AI",
      "Aplikasi Flutter dengan backend Laravel",
    ],
    stack: ["Flutter", "Laravel", "MySQL", "Laravel Reverb", "OpenAI API"],
  },
  {
    slug: "artindo",
    title: "Artindo",
    tagline: "Sistem manajemen absensi dan aktivitas karyawan.",
    category: "Sistem internal",
    problem: "Absensi dan aktivitas karyawan perlu dicatat dan dipantau di satu tempat.",
    solution: "Aplikasi web dengan pembagian peran dan modul untuk absensi serta aktivitas harian.",
    highlights: [
      "Hak akses berdasarkan peran",
      "Modul absensi dan aktivitas karyawan",
      "Autentikasi dan manajemen pengguna",
    ],
    stack: ["Laravel", "MySQL"],
  },
  {
    slug: "sportly-center",
    title: "Sportly Center",
    tagline: "Admin panel untuk reservasi lapangan olahraga.",
    category: "Admin panel",
    problem: "Pengelola lapangan butuh cara rapi untuk mengatur jadwal, pemesanan, dan pembayaran.",
    solution: "Admin panel untuk mengelola reservasi lapangan, pembayaran, dan laporan.",
    highlights: [
      "Manajemen reservasi dan jadwal lapangan",
      "Pencatatan pembayaran",
      "Laporan untuk pengelola",
    ],
    stack: ["Laravel", "MySQL"],
  },
  {
    slug: "belanjaanpasar",
    title: "BelanjaanPasar",
    tagline: "Marketplace pasar dengan layanan titip belanja, Ngebelanjain.",
    category: "Marketplace",
    problem: "Belanja di pasar tradisional sulit dilakukan secara online, dan tidak semua orang sempat datang langsung.",
    solution: "Marketplace pasar yang juga punya layanan titip belanja, supaya pembeli bisa menitipkan daftar belanjaannya.",
    highlights: [
      "Marketplace pasar",
      "Alur titip belanja",
      "Backend Laravel dengan rancangan database terstruktur",
    ],
    stack: ["Laravel", "MySQL"],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
