import {
  Cable,
  DatabaseBackup,
  FileText,
  Network,
  Router,
  Wrench,
  type LucideIcon,
} from "lucide-react"

export type Skill = { title: string; description: string; icon: LucideIcon }

export const skills: Skill[] = [
  {
    title: "Troubleshooting networking, software, hardware",
    description: "Mendiagnosis dan memperbaiki masalah pada jaringan, software, dan perangkat keras.",
    icon: Wrench,
  },
  {
    title: "Laptop/PC Setup & Backup Recovery Data",
    description: "Instalasi dan konfigurasi laptop atau PC, serta pemulihan data dari backup.",
    icon: DatabaseBackup,
  },
  {
    title: "Konfigurasi Mikrotik",
    description: "NAT, DHCP, Routing, ACL, dan VLAN.",
    icon: Router,
  },
  {
    title: "Cisco Packet Tracer",
    description: "Merancang dan mensimulasikan topologi jaringan sebelum diterapkan.",
    icon: Network,
  },
  {
    title: "Setup & troubleshooting jaringan LAN/WAN",
    description: "Instalasi, konfigurasi, dan penanganan gangguan konektivitas jaringan.",
    icon: Cable,
  },
  {
    title: "Microsoft Office",
    description: "Mengolah dokumen, data, dan presentasi, termasuk inventaris aset dengan Excel.",
    icon: FileText,
  },
]
