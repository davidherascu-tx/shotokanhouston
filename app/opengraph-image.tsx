import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DEFAULT_TITLE } from "./lib/seo";

export const alt = DEFAULT_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Natural size of the logo asset (805x358). Kept in proportion so the emblem
// isn't squashed, and sat on a light card because the artwork has dark text
// that would otherwise vanish into the dark background.
const LOGO_WIDTH = 520;
const LOGO_HEIGHT = Math.round((520 * 358) / 805);

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
        <div
          style={{
            display: "flex",
            padding: "30px 46px",
            borderRadius: 18,
            background: "#ffffff",
            border: "4px solid #c9a24a",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- next/image is unsupported inside ImageResponse (satori) */}
          <img src={logoSrc} width={LOGO_WIDTH} height={LOGO_HEIGHT} alt="" />
        </div>

        <div
          style={{
            marginTop: 46,
            fontSize: 56,
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
            marginTop: 18,
            fontSize: 28,
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
