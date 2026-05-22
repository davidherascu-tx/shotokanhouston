import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone/70">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bone p-1.5 shadow ring-1 ring-gold/30">
                <Image
                  src="/shotokan_houston_logo.webp"
                  alt="Shotokan Karate-Do Center, Houston, TX — Tiger emblem"
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div>
                <div className="font-display text-base font-bold uppercase tracking-widest text-bone">
                  Shotokan Karate-Do Center, Houston, TX
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  松濤館 · S.K.I.F. Member Dojo
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed">
              Traditional Shotokan karate in the style of the Shotokan Karate
              International Federation — for every age and every spirit, in the
              heart of Houston, Texas.
            </p>

            <address className="mt-5 not-italic text-sm leading-relaxed">
              <div className="text-bone">Trotter Family YMCA of Greater Houston</div>
              <div>1331 Augusta Dr</div>
              <div>Houston, TX 77057</div>
            </address>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/ShotokanKarateDoCenterHoustonTexas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shotokan Karate-Do Center on Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-gold hover:text-gold"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.6H7.6V14h2.7v8h3.2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="font-display text-xs uppercase tracking-[0.3em] text-gold">
              Explore
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold">
                  About the Dojo
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-gold">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-gold">
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-display text-xs uppercase tracking-[0.3em] text-gold">
              Dojo Kun
            </div>
            <ul className="mt-4 space-y-1.5 text-sm italic">
              <li>Seek perfection of character</li>
              <li>Be faithful</li>
              <li>Endeavor</li>
              <li>Respect others</li>
              <li>Refrain from violent behavior</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-bone/40 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} Shotokan Karate-Do Center, Houston, TX
            · S.K.I.F. Member Dojo. All rights reserved.
          </div>
          <div className="font-display uppercase tracking-[0.3em]">
            一生懸命 · Do your very best
          </div>
        </div>
      </div>
    </footer>
  );
}
