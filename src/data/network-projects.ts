// Isi photo dengan path file di folder public, misal "/project-failover.jpg". Kosong = tampil placeholder.
export type NetworkProject = {
  title: string
  description: string
  photo: string
}

export const networkProjects: NetworkProject[] = [
  {
    title: "Merancang Failover Recursive Gateway pada Jaringan Dual ISP",
    description:
      "Perancangan dan pengujian mekanisme failover otomatis berbasis MikroTik untuk meningkatkan ketersediaan koneksi internet melalui dua ISP di PT Anugerah Tangkas Transportindo.",
    photo: "/project-1.jpeg",
  },
  {
    title: "Desain dan Konfigurasi Jaringan Kantor Pusat-Cabang",
    description:
      "Merancang jaringan untuk kantor pusat dan cabang dengan 3 divisi. Mencakup subnetting, VLAN dan trunk, wireless, routing OSPF dalam satu AS, BGP antar AS, ACL pembatasan akses antar divisi, serta backup dan restore konfigurasi.",
    photo: "/project-2.jpeg",
  },
]
