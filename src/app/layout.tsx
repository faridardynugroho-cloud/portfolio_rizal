import type { Metadata } from "next"
import Link from "next/link"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { site } from "@/data/site"
import "./globals.css"

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" })
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" })

export const metadata: Metadata = {
  title: `${site.name} | Developer Flutter dan Laravel`,
  description: site.intro,
}

const links = [
  { href: "/#projects", label: "Project" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "Tentang" },
  { href: "/#contact", label: "Kontak" },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`}>
      <body>
        <header className="sticky top-0 z-30 border-b border-line bg-paper/80 backdrop-blur">
          {/* <nav className="wrap flex h-16 items-center justify-between">
            <Link href="/" className="font-display text-lg font-semibold">{site.name}</Link>
            <ul className="flex gap-5 text-sm sm:gap-8">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav> */}
        </header>
        <main>{children}</main>
        <footer className="border-t border-line py-8 text-sm text-muted">
          <div className="wrap">© 2026 {site.name}</div>
        </footer>
      </body>
    </html>
  )
}
