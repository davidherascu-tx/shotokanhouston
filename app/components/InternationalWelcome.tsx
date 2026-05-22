type Props = {
  variant?: "dark" | "light";
  eyebrow?: string;
  headlineLead?: string;
  headlineAccent?: string;
  body?: string;
  pillars?: [string, string, string];
};

const DEFAULTS = {
  eyebrow: "An International Dojo",
  headlineLead: "All Karatekas Are",
  headlineAccent: "Welcome",
  body: "Whatever federation, whatever flag — every Shotokan karateka is welcome on our floor. Our doors are open to practitioners from all organizations around the world. We train together, share the tradition, and honor the spirit of Funakoshi's teaching as one global karate family.",
  pillars: ["One Dojo", "One Spirit", "One World"] as [string, string, string],
};

// 空手道 — Karate-Do ("Empty Hand Way")
const KARATE_DO = "空手道";

export default function InternationalWelcome({
  variant = "dark",
  eyebrow = DEFAULTS.eyebrow,
  headlineLead = DEFAULTS.headlineLead,
  headlineAccent = DEFAULTS.headlineAccent,
  body = DEFAULTS.body,
  pillars = DEFAULTS.pillars,
}: Props) {
  if (variant === "light") {
    // About page — light, editorial, two-column layout
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-paper via-bone to-paper py-24 lg:py-28">
        {/* Soft radial highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55),transparent_70%)]"
        />

        {/* 空手道 watermark — Karate-Do */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="font-display whitespace-nowrap text-[14rem] leading-none text-crimson/[0.06] sm:text-[22rem] lg:text-[28rem]">
            {KARATE_DO}
          </span>
        </div>

        {/* Top + bottom crimson accent borders */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Kanji block */}
            <div className="lg:col-span-2">
              <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center border-2 border-crimson/30 bg-white shadow-md">
                <div className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.3em] text-crimson/70">
                  松涛館
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.3em] text-crimson/70">
                  Shōtōkan
                </div>
                <div className="flex flex-col items-center font-display text-[5.5rem] leading-[0.95] text-crimson sm:text-[6.5rem]">
                  <span>松</span>
                  <span>涛</span>
                  <span>館</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-3">
              <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
                {eyebrow}
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
                {headlineLead}{" "}
                <span className="text-crimson">{headlineAccent}</span>
              </h2>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-crimson via-crimson/40 to-transparent" />
              <p className="mt-8 text-base leading-relaxed text-ink-soft sm:text-lg">
                {body}
              </p>
              <ul className="mt-8 grid gap-3 text-sm uppercase tracking-[0.25em] text-ink-soft sm:grid-cols-3">
                {pillars.map((p) => (
                  <li key={p} className="border-l-2 border-crimson pl-3">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Home page — dark, centered, dramatic
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 lg:py-28">
      {/* Radial gradient for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,0.6),transparent_70%)]"
      />

      {/* 空手道 watermark — Karate-Do */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-display whitespace-nowrap text-[14rem] leading-none text-gold/[0.07] sm:text-[22rem] lg:text-[28rem]">
          {KARATE_DO}
        </span>
      </div>

      {/* Decorative gold corner brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-gold/50 sm:left-10 sm:top-10 sm:h-14 sm:w-14"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2 border-gold/50 sm:right-10 sm:top-10 sm:h-14 sm:w-14"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-gold/50 sm:bottom-10 sm:left-10 sm:h-14 sm:w-14"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-gold/50 sm:bottom-10 sm:right-10 sm:h-14 sm:w-14"
      />

      {/* Top + bottom gold accent borders */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div className="font-display text-5xl text-gold">松涛館</div>
        <p className="mt-6 font-display text-xs uppercase tracking-[0.4em] text-gold">
          {eyebrow}
        </p>
        <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-bone sm:text-5xl">
          {headlineLead}{" "}
          <span className="text-crimson-light">{headlineAccent}</span>
        </h2>
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="mt-8 text-base leading-relaxed text-bone/80 sm:text-lg">
          {body}
        </p>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-bone/50">
          {pillars.join(" · ")}
        </p>
      </div>
    </section>
  );
}
