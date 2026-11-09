import Image from "next/image"
import { Reveal } from "@/components/reveal"
import StackingCards, { StackingCardItem } from "@/components/ui/stacking-cards"
import { experiences } from "@/data/experience"

const tones = ["bg-accent", "bg-ink"]

export function Experience() {
  return (
    <section id="experience" className="section scroll-mt-16 border-t border-line">
      <div className="wrap">
        <Reveal>
          <h2 className="h2">Pengalaman</h2>
        </Reveal>

        <StackingCards totalCards={experiences.length} scaleMultiplier={0.05} className="mt-12">
          {experiences.map((e, i) => (
            <StackingCardItem key={e.role} index={i} className="top-20 h-[48rem] md:h-[32rem]">
              <div
                className={`${tones[i % tones.length]} flex h-[92%] flex-col gap-6 rounded-xl p-6 text-white md:h-[88%] md:flex-row md:gap-10 md:p-10`}
              >
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-sm text-white/70">{e.period}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{e.role}</h3>
                  <p className="mt-1 text-white/80">
                    {e.company}, {e.location}
                  </p>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/90 md:text-base">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-white/20 bg-white/10 md:aspect-auto md:w-2/5">
                  {e.photo ? (
                    <Image
                      src={e.photo}
                      alt={`Foto pengalaman ${e.role}`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/70">Foto menyusul</div>
                  )}
                </div>
              </div>
            </StackingCardItem>
          ))}
        </StackingCards>
      </div>
    </section>
  )
}
