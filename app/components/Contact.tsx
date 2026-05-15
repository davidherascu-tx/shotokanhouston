"use client";

export default function Contact() {
  return (
    <section className="relative bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(45deg,#fff_0,#fff_1px,transparent_1px,transparent_12px)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
              Visit the Dojo
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone sm:text-5xl">
              Get In <span className="text-crimson-light">Touch</span>
            </h2>
            <div className="mt-6 h-px w-24 bg-gold" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/75">
              We train inside the YMCA of Greater Houston. Drop by to observe a
              class, meet our instructors, or sign up for your first free
              session.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-crimson/10 text-gold">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 22s7-7 7-13a7 7 0 0 0-14 0c0 6 7 13 7 13z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">
                    Location
                  </div>
                  <div className="mt-1 text-bone">YMCA of Greater Houston</div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1331+Augusta+Dr+Houston+TX+77057"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bone/70 hover:text-gold"
                  >
                    1331 Augusta Dr, Houston, TX 77057
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-crimson/10 text-gold">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M22 16.92V21a1 1 0 0 1-1.09 1 19 19 0 0 1-8.27-2.93 18.5 18.5 0 0 1-5.7-5.7A19 19 0 0 1 4.01 5.09 1 1 0 0 1 5 4h4.09a1 1 0 0 1 1 .75c.12.86.34 1.7.66 2.5a1 1 0 0 1-.23 1.06L8.91 9.91a16 16 0 0 0 5.18 5.18l1.6-1.6a1 1 0 0 1 1.06-.23c.8.32 1.64.54 2.5.66a1 1 0 0 1 .75 1z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">
                    Phone
                  </div>
                  <a
                    href="tel:+18325550100"
                    className="mt-1 block text-bone hover:text-gold"
                  >
                    (832) 555-0100
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-crimson/10 text-gold">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">
                    Email
                  </div>
                  <a
                    href="mailto:info@shotokanhouston.com"
                    className="mt-1 block text-bone hover:text-gold"
                  >
                    info@shotokanhouston.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-crimson/10 text-gold">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">
                    Federation
                  </div>
                  <div className="mt-1 text-bone">S.K.I.F.</div>
                  <div className="text-sm text-bone/60">
                    Shotokan Karate International Federation
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden border border-bone/10 shadow-lg">
              <iframe
                title="Map to Shotokan Karate Houston at the YMCA"
                src="https://www.google.com/maps?q=1331+Augusta+Dr,+Houston,+TX+77057&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
              />
            </div>
          </div>

          <form
            className="border border-bone/10 bg-ink-soft/60 p-8 backdrop-blur lg:p-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-bone">
              Send a Message
            </h3>
            <p className="mt-1 text-sm text-bone/60">
              Tell us a bit about yourself and we&apos;ll be in touch.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold"
                    placeholder="(832) 555-0100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                  Program of Interest
                </label>
                <select
                  className="mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors focus:border-gold"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a program
                  </option>
                  <option>Kids Karate (6 – 11)</option>
                  <option>Youth Program (12+)</option>
                  <option>Adult Karate</option>
                  <option>Not sure — please advise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-2 block w-full resize-none border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold"
                  placeholder="Tell us about yourself or your child..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-crimson px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
