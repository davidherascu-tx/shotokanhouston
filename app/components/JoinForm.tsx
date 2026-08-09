"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

// Only open-enrollment slots — the Monday/Wednesday intermediate classes and
// both Advanced slots are invitation only, so they aren't offered here.
const CLASS_OPTIONS = [
  "Tuesday 5:00 – 6:00 PM · Beginners (6–12)",
  "Thursday 5:00 – 6:00 PM · Beginners (6–12)",
  "Tuesday 6:00 – 7:00 PM · Intermediate (12+)",
  "Thursday 6:00 – 7:00 PM · Intermediate (12+)",
  "Saturday 10:30 – 11:15 AM · Kata, all students (12+)",
];

const GRADES = [
  "10th Kyu",
  "9th Kyu",
  "8th Kyu",
  "7th Kyu",
  "6th Kyu",
  "5th Kyu",
  "4th Kyu",
  "3rd Kyu",
  "2nd Kyu",
  "1st Kyu",
  "1st Dan (Shodan)",
  "2nd Dan (Nidan)",
  "3rd Dan (Sandan)",
  "4th Dan (Yondan)",
  "5th Dan (Godan)",
  "6th Dan or higher",
];

const initialForm = {
  studentName: "",
  dob: "",
  gender: "",
  guardianName: "",
  guardianRelationship: "",
  guardianEmail: "",
  guardianPhone: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  program: "",
  startDate: "",
  experience: "No — complete beginner",
  years: "",
  grade: "",
  style: "",
  previousDojo: "",
  skifNumber: "",
  ymcaMember: "",
  ymcaMemberId: "",
  ymcaBranch: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  medical: "",
  heardFrom: "",
  notes: "",
};

const labelClass = "block text-xs uppercase tracking-[0.25em] text-gold";
const controlClass =
  "mt-2 block w-full border border-bone/15 bg-charcoal px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-gold";

function ageFrom(dob: string) {
  if (!dob) return null;
  const born = new Date(dob);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  const monthDelta = now.getMonth() - born.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < born.getDate())) {
    age -= 1;
  }
  return age >= 0 && age < 120 ? age : null;
}

function Section({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-bone/10 pt-8">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xs tracking-[0.3em] text-crimson-light">
          {step}
        </span>
        <h3 className="font-display text-lg font-bold uppercase tracking-wider text-bone">
          {title}
        </h3>
      </div>
      {subtitle ? (
        <p className="mt-1 text-sm text-bone/50">{subtitle}</p>
      ) : null}
      <div className="mt-5 space-y-4">{children}</div>
    </fieldset>
  );
}

export default function JoinForm() {
  const [form, setForm] = useState(initialForm);
  const [classes, setClasses] = useState<string[]>([]);
  const [waiverAgreed, setWaiverAgreed] = useState(false);
  const [photoRelease, setPhotoRelease] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentName, setSentName] = useState("");

  const age = ageFrom(form.dob);
  const isMinor = age !== null && age < 18;
  const hasExperience = form.experience.startsWith("Yes");
  const isYmcaMember = form.ymcaMember.startsWith("Yes");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleClass(option: string) {
    setClasses((prev) =>
      prev.includes(option)
        ? prev.filter((c) => c !== option)
        : [...prev, option],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, classes, waiverAgreed, photoRelease }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSentName(form.studentName.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
      setForm(initialForm);
      setClasses([]);
      setWaiverAgreed(false);
      setPhotoRelease(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto flex max-w-2xl flex-col items-center border border-gold/30 bg-ink-soft/60 p-8 text-center backdrop-blur lg:p-12"
        style={{ animation: "successFadeIn 400ms ease-out both" }}
      >
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gold/40"
            style={{ animation: "successRing 900ms ease-out 200ms both" }}
          />
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gold/15 ring-2 ring-gold/70 shadow-[0_0_40px_-8px_rgba(201,162,74,0.6)]"
            style={{
              animation: "successPop 500ms cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            <svg className="h-12 w-12 text-gold" viewBox="0 0 52 52" fill="none">
              <path
                d="M13 27 L22 36 L39 18"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 50,
                  strokeDashoffset: 50,
                  animation: "checkmarkDraw 450ms 350ms ease-out forwards",
                }}
              />
            </svg>
          </div>
        </div>

        <h3 className="font-display mt-7 text-3xl font-bold uppercase tracking-wider text-bone sm:text-4xl">
          Application Received
        </h3>
        <div className="mt-4 h-px w-16 bg-gold" />
        <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80">
          Thank you
          {sentName ? (
            <>
              , <span className="font-semibold text-gold">{sentName}</span>
            </>
          ) : null}
          . We&apos;ve received your registration and will be in touch within 24
          hours to confirm your first class — which is free.
        </p>
        <p className="mt-3 font-display text-xs uppercase tracking-[0.4em] text-bone/40">
          ありがとうございました
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSentName("");
          }}
          className="mt-8 inline-flex items-center gap-2 border border-bone/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-bone/80 transition-colors hover:border-gold hover:text-gold"
        >
          Register Someone Else
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl border border-bone/10 bg-ink-soft/60 p-8 backdrop-blur lg:p-12"
    >
      <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-bone sm:text-3xl">
        Registration Form
      </h2>
      <p className="mt-2 text-sm text-bone/60">
        Fields marked <span className="text-crimson-light">*</span> are required.
        Everything else helps us place you in the right class.
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-bone/80"
        >
          {errorMsg}
        </div>
      )}

      <div className="mt-10 space-y-10">
        <Section step="01" title="Student Information">
          <div>
            <label htmlFor="studentName" className={labelClass}>
              Full Name <span className="text-crimson-light">*</span>
            </label>
            <input
              id="studentName"
              type="text"
              name="studentName"
              required
              value={form.studentName}
              onChange={handleChange}
              className={controlClass}
              placeholder="Student's full name"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="dob" className={labelClass}>
                Date of Birth <span className="text-crimson-light">*</span>
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                required
                value={form.dob}
                onChange={handleChange}
                className={`${controlClass} [color-scheme:dark]`}
              />
              <p className="mt-1.5 text-xs text-bone/40">
                {age === null ? "Used to place you in the right class." : `Age ${age}`}
              </p>
            </div>
            <div>
              <label htmlFor="gender" className={labelClass}>
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={controlClass}
              >
                <option value="">Prefer not to say</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
              <p className="mt-1.5 text-xs text-bone/40">
                Optional — used only for tournament divisions.
              </p>
            </div>
          </div>
        </Section>

        {isMinor ? (
          <Section
            step="02"
            title="Parent / Guardian"
            subtitle={`The student is ${age}, so we need a guardian on file.`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="guardianName" className={labelClass}>
                  Guardian Name
                </label>
                <input
                  id="guardianName"
                  type="text"
                  name="guardianName"
                  value={form.guardianName}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="guardianRelationship" className={labelClass}>
                  Relationship
                </label>
                <input
                  id="guardianRelationship"
                  type="text"
                  name="guardianRelationship"
                  value={form.guardianRelationship}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="Mother, father, guardian…"
                />
              </div>
              <div>
                <label htmlFor="guardianEmail" className={labelClass}>
                  Guardian Email
                </label>
                <input
                  id="guardianEmail"
                  type="email"
                  name="guardianEmail"
                  value={form.guardianEmail}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="guardianPhone" className={labelClass}>
                  Guardian Phone
                </label>
                <input
                  id="guardianPhone"
                  type="tel"
                  name="guardianPhone"
                  value={form.guardianPhone}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="(832) 555-0123"
                />
              </div>
            </div>
          </Section>
        ) : null}

        <Section step={isMinor ? "03" : "02"} title="Contact Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-crimson-light">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className={controlClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="text-crimson-light">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className={controlClass}
                placeholder="(832) 555-0123"
              />
            </div>
          </div>

          <div>
            <label htmlFor="street" className={labelClass}>
              Street Address
            </label>
            <input
              id="street"
              type="text"
              name="street"
              value={form.street}
              onChange={handleChange}
              className={controlClass}
              placeholder="1331 Augusta Dr"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={controlClass}
                placeholder="Houston"
              />
            </div>
            <div>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={controlClass}
                placeholder="TX"
              />
            </div>
            <div>
              <label htmlFor="zip" className={labelClass}>
                ZIP
              </label>
              <input
                id="zip"
                type="text"
                inputMode="numeric"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className={controlClass}
                placeholder="77057"
              />
            </div>
          </div>
        </Section>

        <Section step={isMinor ? "04" : "03"} title="Program & Classes">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="program" className={labelClass}>
                Program <span className="text-crimson-light">*</span>
              </label>
              <select
                id="program"
                name="program"
                required
                value={form.program}
                onChange={handleChange}
                className={controlClass}
              >
                <option value="">Choose a program</option>
                <option>Kids Karate (6 – 11)</option>
                <option>Youth Program (12+)</option>
                <option>Adult Karate</option>
                <option>Not sure — please advise</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className={labelClass}>
                Preferred Start Date
              </label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className={`${controlClass} [color-scheme:dark]`}
              />
            </div>
          </div>

          <div>
            <span className={labelClass}>Classes You&apos;d Like to Attend</span>
            <ul className="mt-3 space-y-2">
              {CLASS_OPTIONS.map((option) => (
                <li key={option}>
                  <label className="flex cursor-pointer items-start gap-3 border border-bone/10 bg-charcoal/60 px-4 py-3 text-sm text-bone/80 transition-colors hover:border-gold/50">
                    <input
                      type="checkbox"
                      checked={classes.includes(option)}
                      onChange={() => toggleClass(option)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-crimson"
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-bone/40">
              Monday/Wednesday intermediate and all advanced classes are
              invitation only.
            </p>
          </div>
        </Section>

        <Section
          step={isMinor ? "05" : "04"}
          title="Karate Experience"
          subtitle="Beginners are welcome — skip ahead if you're brand new."
        >
          <div>
            <label htmlFor="experience" className={labelClass}>
              Have You Trained Before?
            </label>
            <select
              id="experience"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className={controlClass}
            >
              <option>No — complete beginner</option>
              <option>Yes — I have previous experience</option>
            </select>
          </div>

          {hasExperience ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="grade" className={labelClass}>
                    Current Grade
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    className={controlClass}
                  >
                    <option value="">Not graded / unknown</option>
                    {GRADES.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="years" className={labelClass}>
                    Years Training
                  </label>
                  <input
                    id="years"
                    type="number"
                    min="0"
                    max="80"
                    name="years"
                    value={form.years}
                    onChange={handleChange}
                    className={controlClass}
                    placeholder="3"
                  />
                </div>
                <div>
                  <label htmlFor="style" className={labelClass}>
                    Style
                  </label>
                  <input
                    id="style"
                    type="text"
                    name="style"
                    value={form.style}
                    onChange={handleChange}
                    className={controlClass}
                    placeholder="Shotokan, Goju-Ryu…"
                  />
                </div>
                <div>
                  <label htmlFor="skifNumber" className={labelClass}>
                    S.K.I.F. Number
                  </label>
                  <input
                    id="skifNumber"
                    type="text"
                    name="skifNumber"
                    value={form.skifNumber}
                    onChange={handleChange}
                    className={controlClass}
                    placeholder="If you have one"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="previousDojo" className={labelClass}>
                  Previous Dojo
                </label>
                <input
                  id="previousDojo"
                  type="text"
                  name="previousDojo"
                  value={form.previousDojo}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="Dojo name and city"
                />
              </div>
            </>
          ) : null}
        </Section>

        <Section
          step={isMinor ? "06" : "05"}
          title="YMCA Membership"
          subtitle="We train inside the Trotter Family YMCA of Greater Houston."
        >
          <div>
            <label htmlFor="ymcaMember" className={labelClass}>
              Are You Already a YMCA Member?
            </label>
            <select
              id="ymcaMember"
              name="ymcaMember"
              value={form.ymcaMember}
              onChange={handleChange}
              className={controlClass}
            >
              <option value="">Choose one</option>
              <option>Yes — I&apos;m a current member</option>
              <option>No — not a member</option>
              <option>Not sure</option>
            </select>
          </div>

          {isYmcaMember ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ymcaMemberId" className={labelClass}>
                  Member ID
                </label>
                <input
                  id="ymcaMemberId"
                  type="text"
                  name="ymcaMemberId"
                  value={form.ymcaMemberId}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="If you have it handy"
                />
              </div>
              <div>
                <label htmlFor="ymcaBranch" className={labelClass}>
                  Home Branch
                </label>
                <input
                  id="ymcaBranch"
                  type="text"
                  name="ymcaBranch"
                  value={form.ymcaBranch}
                  onChange={handleChange}
                  className={controlClass}
                  placeholder="Trotter Family YMCA"
                />
              </div>
            </div>
          ) : null}
        </Section>

        <Section step={isMinor ? "07" : "06"} title="Emergency Contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="emergencyName" className={labelClass}>
                Name <span className="text-crimson-light">*</span>
              </label>
              <input
                id="emergencyName"
                type="text"
                name="emergencyName"
                required
                value={form.emergencyName}
                onChange={handleChange}
                className={controlClass}
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className={labelClass}>
                Phone <span className="text-crimson-light">*</span>
              </label>
              <input
                id="emergencyPhone"
                type="tel"
                name="emergencyPhone"
                required
                value={form.emergencyPhone}
                onChange={handleChange}
                className={controlClass}
                placeholder="(832) 555-0123"
              />
            </div>
          </div>
          <div>
            <label htmlFor="emergencyRelationship" className={labelClass}>
              Relationship
            </label>
            <input
              id="emergencyRelationship"
              type="text"
              name="emergencyRelationship"
              value={form.emergencyRelationship}
              onChange={handleChange}
              className={controlClass}
              placeholder="Spouse, parent, sibling…"
            />
          </div>
        </Section>

        <Section
          step={isMinor ? "08" : "07"}
          title="Health & Safety"
          subtitle="Anything our instructors should know to keep training safe."
        >
          <div>
            <label htmlFor="medical" className={labelClass}>
              Medical Conditions, Allergies or Injuries
            </label>
            <textarea
              id="medical"
              name="medical"
              rows={3}
              value={form.medical}
              onChange={handleChange}
              className={`${controlClass} resize-none`}
              placeholder="Asthma, past knee injury, allergies… or write “none”."
            />
          </div>
        </Section>

        <Section step={isMinor ? "09" : "08"} title="Final Details">
          <div>
            <label htmlFor="heardFrom" className={labelClass}>
              How Did You Hear About Us?
            </label>
            <select
              id="heardFrom"
              name="heardFrom"
              value={form.heardFrom}
              onChange={handleChange}
              className={controlClass}
            >
              <option value="">Choose one</option>
              <option>Google or web search</option>
              <option>Facebook</option>
              <option>Friend or family</option>
              <option>Current student</option>
              <option>At the YMCA</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>
              Anything Else?
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className={`${controlClass} resize-none`}
              placeholder="Questions, scheduling notes, siblings joining too…"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-bone/75">
              <input
                type="checkbox"
                required
                checked={waiverAgreed}
                onChange={(e) => setWaiverAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-crimson"
              />
              <span>
                <span className="text-crimson-light">*</span> I understand that
                karate is a physical contact activity carrying a risk of injury,
                and I confirm the information above is accurate. A full waiver
                will be signed in person before the first class.
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-bone/75">
              <input
                type="checkbox"
                checked={photoRelease}
                onChange={(e) => setPhotoRelease(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-crimson"
              />
              <span>
                I give permission for photos or video taken in class to be used
                on the dojo&apos;s website and social media. (Optional)
              </span>
            </label>
          </div>
        </Section>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-crimson px-6 py-4 text-sm font-semibold uppercase tracking-widest text-bone shadow-lg transition-all hover:bg-crimson-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Registration"}
        </button>

        <p className="text-center text-xs text-bone/40">
          Your first class is free. We&apos;ll confirm your spot by email within
          24 hours.
        </p>
      </div>
    </form>
  );
}
