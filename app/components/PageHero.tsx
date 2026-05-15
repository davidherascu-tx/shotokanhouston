import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
};

export default function PageHero({ eyebrow, title, subtitle, image }: Props) {
  return (
    <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-charcoal">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        preload
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full items-end pb-16">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold uppercase leading-tight text-bone drop-shadow-lg sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base text-bone/85 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-6 h-px w-24 bg-gold" />
        </div>
      </div>
    </section>
  );
}
