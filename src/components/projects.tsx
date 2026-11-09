import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { networkProjects } from "@/data/network-projects"

export function Projects() {
  const content = networkProjects.map((p) => ({
    title: p.title,
    description: p.description,
    content: p.photo ? (
      <Image
        src={p.photo}
        alt={`Foto project ${p.title}`}
        width={640}
        height={480}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-sm text-white/70">Foto menyusul</div>
    ),
  }))

  return (
    <section id="projects" className="section scroll-mt-16 border-t border-line">
      <div className="wrap">
        <Reveal>
          <h2 className="h2">Project</h2>
          <p className="mt-4 max-w-xl text-muted">Project jaringan yang pernah saya rancang dan uji, dari failover dual ISP sampai jaringan kantor pusat-cabang.</p>
        </Reveal>
        <Reveal className="mt-12">
          <StickyScroll content={content} />
        </Reveal>
      </div>
    </section>
  )
}
