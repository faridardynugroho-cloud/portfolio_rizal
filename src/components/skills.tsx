import { Reveal } from "@/components/reveal"
import { Marquee } from "@/components/ui/marquee"
import { skills } from "@/data/skills"

export function Skills() {
  return (
    <section id="skills" className="section scroll-mt-16 border-t border-line">
      <div className="wrap">
        <Reveal>
          <h2 className="h2">Keahlian</h2>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <Marquee pauseOnHover draggable duration={45} gap="1.25rem" repeat={3} label="Daftar keahlian" className="py-4">
          {skills.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex w-[19rem] shrink-0 gap-4 self-stretch rounded-2xl border border-line bg-white p-5 shadow-sm sm:w-[23rem] sm:p-6"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-lg font-medium leading-snug">{title}</h3>
                <p className="mt-1 text-muted">{description}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
