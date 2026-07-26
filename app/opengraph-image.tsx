import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Shotokan Karate-Do Center, Houston, TX — S.K.I.F. Member Dojo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public", "shotokan_houston_logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #15110d 0%, #1a1714 55%, #7a1612 100%)",
          color: "#ffffff",
        }}
      >
        <img
          src={logoSrc}
          width={190}
          height={190}
          style={{
            borderRadius: "9999px",
            border: "6px solid #c9a24a",
          }}
        />
        <div
          style={{
            marginTop: 44,
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Shotokan Karate-Do Center
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c9a24a",
          }}
        >
          Houston, TX · S.K.I.F. Member Dojo
        </div>
      </div>
    ),
    { ...size }
  );
}
