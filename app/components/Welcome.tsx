import Image from "next/image";

const pillars = [
  {
    kanji: "礼",
    title: "Respect",
    text: "Every class begins and ends with a bow. Respect for instructors, training partners, and oneself is the soul of karate-do.",
  },
  {
    kanji: "心",
    title: "Spirit",
    text: "We train the mind alongside the body. Focus, perseverance, and a calm spirit carry students well beyond the dojo floor.",
  },
  {
    kanji: "力",
    title: "Strength",
    text: "Through kihon, kata, and kumite, students build real-world strength, conditioning, and confidence at every level.",
  },
];

export default function Welcome() {
  return (
    <section className="bg-paper relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden h-full w-full border-2 border-crimson/30 lg:block" />
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal shadow-2xl">
              <Image
                src="/about_training.webp"
                alt="Training at the Shotokan Karate-Do Center, Houston, TX dojo"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden bg-crimson px-6 py-4 text-bone shadow-xl lg:block">
              <div className="font-display text-3xl font-bold leading-none">
                松濤館
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
                Shōtōkan · S.K.I.F.
              </div>
            </div>
          </div>

          <div>
            <p className="font-display text-xs uppercase tracking-[0.4em] text-crimson">
              Welcome to the Dojo
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold uppercase leading-tight text-ink sm:text-5xl">
              Traditional Karate, <span className="text-crimson">Right Here in Houston</span>
            </h2>
            <div className="stitch-divider mt-6 w-32" />
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              Shotokan Karate-Do Center, Houston, TX is a proud member of the{" "}
              <strong className="text-ink">
                Shotokan Karate International Federation (S.K.I.F.)
              </strong>
              , the worldwide federation founded by the legendary{" "}
              <em>Soke</em> Hirokazu Kanazawa. We teach karate the way it was
              meant to be taught — with deep respect for tradition, technical
              precision, and the spirit of <em>budo</em>.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Whether you are stepping onto the mat for the very first time or
              continuing a lifelong journey, you will find a welcoming family of
              karateka and dedicated instructors ready to guide you, push you,
              and celebrate every belt you earn.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="group border-l-2 border-crimson/60 pl-4 transition-all hover:border-gold"
                >
                  <div className="font-display text-3xl text-crimson transition-colors group-hover:text-gold">
                    {p.kanji}
                  </div>
                  <div className="mt-2 font-display text-sm font-bold uppercase tracking-widest text-ink">
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
