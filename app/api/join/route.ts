import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Signups normally go to the dojo rather than to whoever fields general
// inquiries, so allow an override without touching code.
const TO = process.env.JOIN_NOTIFICATION_EMAIL ?? "jcbering@gmail.com";

type Payload = Record<string, unknown>;

function str(payload: Payload, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function bool(payload: Payload, key: string) {
  return payload[key] === true;
}

function ageFrom(dob: string) {
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

/** Renders "Label: value" lines, dropping anything the applicant left blank. */
function section(title: string, rows: [string, string][]) {
  const filled = rows.filter(([, value]) => value);
  if (!filled.length) return null;
  const width = Math.max(...filled.map(([label]) => label.length));
  return [
    title.toUpperCase(),
    "-".repeat(title.length),
    ...filled.map(([label, value]) => `${label.padEnd(width)}  ${value}`),
  ].join("\n");
}

export async function POST(req: NextRequest) {
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const studentName = str(payload, "studentName");
  const dob = str(payload, "dob");
  const email = str(payload, "email");
  const phone = str(payload, "phone");
  const program = str(payload, "program");
  const emergencyName = str(payload, "emergencyName");
  const emergencyPhone = str(payload, "emergencyPhone");

  const missing = [
    !studentName && "student name",
    !dob && "date of birth",
    !email && "email",
    !phone && "phone",
    !program && "program",
    !emergencyName && "emergency contact name",
    !emergencyPhone && "emergency contact phone",
  ].filter(Boolean);

  if (missing.length) {
    return NextResponse.json(
      { error: `Please complete: ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  if (!bool(payload, "waiverAgreed")) {
    return NextResponse.json(
      { error: "Please acknowledge the participation agreement." },
      { status: 400 },
    );
  }

  const age = ageFrom(dob);
  const isMinor = age !== null && age < 18;

  const classes = Array.isArray(payload.classes)
    ? payload.classes.filter((c): c is string => typeof c === "string")
    : [];

  const body = [
    section("Student", [
      ["Name", studentName],
      ["Date of birth", age === null ? dob : `${dob}  (age ${age})`],
      ["Gender", str(payload, "gender")],
    ]),
    isMinor
      ? section("Parent / Guardian", [
          ["Name", str(payload, "guardianName")],
          ["Relationship", str(payload, "guardianRelationship")],
          ["Email", str(payload, "guardianEmail")],
          ["Phone", str(payload, "guardianPhone")],
        ])
      : null,
    section("Contact", [
      ["Email", email],
      ["Phone", phone],
      ["Address", str(payload, "street")],
      [
        "City / State / ZIP",
        [str(payload, "city"), str(payload, "state"), str(payload, "zip")]
          .filter(Boolean)
          .join(", "),
      ],
    ]),
    section("Program", [
      ["Program", program],
      ["Classes", classes.join("; ")],
      ["Preferred start", str(payload, "startDate")],
    ]),
    section("Karate experience", [
      ["Trained before", str(payload, "experience")],
      ["Years training", str(payload, "years")],
      ["Current grade", str(payload, "grade")],
      ["Style", str(payload, "style")],
      ["Previous dojo", str(payload, "previousDojo")],
      ["S.K.I.F. number", str(payload, "skifNumber")],
    ]),
    section("YMCA membership", [
      ["Already a member", str(payload, "ymcaMember")],
      ["Member ID", str(payload, "ymcaMemberId")],
      ["Home branch", str(payload, "ymcaBranch")],
    ]),
    section("Emergency contact", [
      ["Name", emergencyName],
      ["Relationship", str(payload, "emergencyRelationship")],
      ["Phone", emergencyPhone],
    ]),
    section("Medical notes", [["Details", str(payload, "medical")]]),
    section("Consent", [
      ["Participation agreement", "Acknowledged"],
      ["Photo / media release", bool(payload, "photoRelease") ? "Granted" : "Declined"],
      ["Heard about us via", str(payload, "heardFrom")],
    ]),
    section("Additional notes", [["Notes", str(payload, "notes")]]),
  ]
    .filter(Boolean)
    .join("\n\n");

  const { error } = await resend.emails.send({
    from: "Join Form <onboarding@resend.dev>",
    to: [TO],
    replyTo: isMinor ? str(payload, "guardianEmail") || email : email,
    subject: `Signup: ${studentName}${age === null ? "" : ` (${age})`} — ${program}`,
    text: body,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
