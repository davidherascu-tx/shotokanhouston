"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", program: "", message: "" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section className="relative bg-charcoal py-24 lg:py-32">
      <div className="absolute inset-0 [background-image:radial-gradient(ellipse_at_top_left,rgba(180,30,30,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

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
              We train inside the Trotter Family YMCA of Greater Houston. Drop by to observe a
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
                  <div className="mt-1 text-bone">Trotter Family YMCA of Greater Houston</div>
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
                    href="tel:+18325130058"
                    className="mt-1 block text-bone hover:text-gold"
                  >
                    (832) 513-0058
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
                    href="mailto:shotokankaratedocenter@gmail.com"
                    className="mt-1 block text-bone hover:text-gold"
                  >
                    shotokankaratedocenter@gmail.com
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

              <div className="flex items-start gap-4">
                <a
                  href="https://www.facebook.com/ShotokanKarateDoCenterHoustonTexas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shotokan Karate-Do Center on Facebook"
                  className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/40 bg-crimson/10 text-gold transition-colors hover:border-gold hover:text-bone"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.6H7.6V14h2.7v8h3.2z" />
                  </svg>
                </a>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gold">
                    Follow
                  </div>
                  <a
                    href="https://www.facebook.com/ShotokanKarateDoCenterHoustonTexas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-bone hover:text-gold"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden border border-bone/10 shadow-lg">
              <iframe
                title="Map to Shotokan Karate-Do Center, Houston, TX at the YMCA"
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
            onSubmit={handleSubmit}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-bone">
              Send a Message
            </h3>
            <p className="mt-1 text-sm text-bone/60">
              Tell us a bit about yourself and we&apos;ll be in touch.
            </p>

            {status === "success" && (
              <div className="mt-4 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
                Thank you! Your message has been sent. We&apos;ll be in touch soon.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-bone/80">
                {errorMsg}
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
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
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
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
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold"
                    placeholder="(832) 513-0058"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-gold">
                  Program of Interest
                </label>
                <select
                  name="program"
                  value={form.program}
                  onChange={handleChange}
                  className="mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors focus:border-gold"
                >
                  <option value="">Choose a program</option>
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
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 block w-full resize-none border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold"
                  placeholder="Tell us about yourself or your child..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-crimson px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
