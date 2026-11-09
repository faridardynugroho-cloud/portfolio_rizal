import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Reveal } from "@/components/reveal"
import { Skills } from "@/components/skills"
import { site } from "@/data/site"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />

      <section id="contact" className="section scroll-mt-16 border-t border-line">
        <div className="wrap">
          <Reveal>
            <h2 className="h2">Ada project atau lowongan?</h2>
            <a href={`mailto:${site.email}`} className="mt-8 block break-all font-display text-[clamp(1.5rem,5vw,3.5rem)] font-medium tracking-tight underline decoration-line underline-offset-8 transition-colors hover:text-accent hover:decoration-accent">
              {site.email}
            </a>
            <ul className="mt-8 flex flex-wrap gap-6 text-muted">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">{s.label}</a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
