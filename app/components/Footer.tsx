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
                  src="/shotokan_houston_logo.png"
                  alt="Shotokan Karate Houston — Tiger emblem"
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div>
                <div className="font-display text-base font-bold uppercase tracking-widest text-bone">
                  Shotokan Karate Houston
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
            © {new Date().getFullYear()} Shotokan Karate Houston · S.K.I.F.
            Member Dojo. All rights reserved.
          </div>
          <div className="font-display uppercase tracking-[0.3em]">
            一生懸命 · Do your very best
          </div>
        </div>
      </div>
    </footer>
  );
}
