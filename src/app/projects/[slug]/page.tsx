import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Reveal } from "@/components/reveal"
import { getProject, projects } from "@/data/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug)
  return p ? { title: `${p.title} | Ardy`, description: p.tagline } : {}
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug)
  if (!p) notFound()
  const next = projects[(projects.indexOf(p) + 1) % projects.length]

  return (
    <article className="section">
      <div className="wrap max-w-4xl">
        <Link href="/#projects" className="text-sm text-muted transition-colors hover:text-accent">Kembali ke semua project</Link>

        <Reveal className="mt-10">
          <p className="text-muted">{p.category}</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-none tracking-tight">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-xl text-muted">{p.tagline}</p>
          {p.links && (
            <ul className="mt-6 flex gap-6">
              {p.links.map((l) => (
                <li key={l.href}><a href={l.href} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">{l.label}</a></li>
              ))}
            </ul>
          )}
        </Reveal>

        <div className="mt-16 border-t border-line">
          {[
            { label: "Masalah", body: <p>{p.problem}</p> },
            { label: "Solusi", body: <p>{p.solution}</p> },
            { label: "Fitur utama", body: <ul className="list-disc space-y-2 pl-5">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul> },
            { label: "Stack", body: <p>{p.stack.join(", ")}</p> },
          ].map((row) => (
            <Reveal key={row.label}>
              <div className="grid gap-3 border-b border-line py-8 md:grid-cols-[12rem_1fr]">
                <h2 className="font-display text-lg font-medium">{row.label}</h2>
                <div className="max-w-xl text-lg leading-relaxed">{row.body}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Link href={`/projects/${next.slug}`} className="group mt-12 block">
          <span className="text-sm text-muted">Project berikutnya</span>
          <span className="mt-1 block font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent">{next.title}</span>
        </Link>
      </div>
    </article>
  )
}
