import Link from "next/link"
import type { Project } from "@/data/projects"

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex h-full flex-col justify-between border border-line bg-white/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
    >
      <div>
        <p className="text-sm text-muted">{p.category}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">{p.title}</h3>
        <p className="mt-3 text-muted">{p.tagline}</p>
      </div>
      <p className="mt-10 text-sm">{p.stack.join(", ")}</p>
    </Link>
  )
}
