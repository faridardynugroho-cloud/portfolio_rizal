import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="section scroll-mt-16">
      <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-5">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[350px] aspect-[9/12] overflow-hidden rounded-xl bg-line/50">
            {site.photo ? (
              <Image
                src={site.photo}
                alt={`Foto ${site.fullName}`}
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Foto menyusul
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="h2">Tentang saya</h2>
          <div className="mt-6 max-w-lg space-y-4 text-lg leading-relaxed text-muted">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
