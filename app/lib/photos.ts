import fs from "node:fs";
import path from "node:path";
import { type GalleryItem } from "../components/gallery/Lightbox";

/**
 * Lists the images in a folder under `public/`, in natural order so that
 * `photo_2` sorts before `photo_10` rather than after it.
 *
 * This reads the directory at build time, so newly dropped-in files only
 * appear after a rebuild.
 */
type Options = {
  /** Visible label in the lightbox footer. */
  caption?: string;
  /** Alt text applied to every photo in the folder. */
  alt?: string;
};

type Size = { width: number; height: number };

/**
 * Enough of the file to cover a JPEG's SOF marker, which can sit behind a
 * large EXIF block. Every other format we handle answers within 32 bytes.
 */
const HEADER_BYTES = 65536;

function readHeader(file: string): Buffer | null {
  let fd: number | undefined;
  try {
    fd = fs.openSync(file, "r");
    const buf = Buffer.alloc(HEADER_BYTES);
    const read = fs.readSync(fd, buf, 0, HEADER_BYTES, 0);
    return buf.subarray(0, read);
  } catch {
    return null;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

function webpSize(b: Buffer): Size | null {
  if (b.length < 30) return null;
  if (b.toString("ascii", 0, 4) !== "RIFF") return null;
  if (b.toString("ascii", 8, 12) !== "WEBP") return null;

  switch (b.toString("ascii", 12, 16)) {
    // Extended format: 24-bit canvas dimensions, stored minus one.
    case "VP8X":
      return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
    // Lossy: 14-bit dimensions after the 3-byte start code.
    case "VP8 ":
      return {
        width: b.readUInt16LE(26) & 0x3fff,
        height: b.readUInt16LE(28) & 0x3fff,
      };
    // Lossless: 14 bits each, packed into one little-endian word, minus one.
    case "VP8L": {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    default:
      return null;
  }
}

function pngSize(b: Buffer): Size | null {
  if (b.length < 24) return null;
  if (b.readUInt32BE(0) !== 0x89504e47) return null;
  if (b.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

function gifSize(b: Buffer): Size | null {
  if (b.length < 10 || b.toString("ascii", 0, 3) !== "GIF") return null;
  return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
}

function jpegSize(b: Buffer): Size | null {
  if (b.length < 4 || b.readUInt16BE(0) !== 0xffd8) return null;

  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = b[i + 1];
    // Padding and standalone markers carry no length payload.
    if (marker === 0xff || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      i += 2;
      continue;
    }
    // SOF0-SOF15 hold the frame size. 0xc4/0xc8/0xcc fall in that range but
    // are DHT/JPG/DAC, so they have to be skipped rather than decoded.
    const isFrameHeader =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isFrameHeader) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

/**
 * Intrinsic pixel size straight from the file header. Without this every photo
 * would have to be given an assumed aspect ratio, and each one correcting
 * itself on load re-balances the masonry columns — which reads as the grid
 * twitching while you scroll. AVIF is not decoded here; those fall back to the
 * caller's default.
 */
function imageSize(file: string): Size | null {
  const b = readHeader(file);
  if (!b) return null;
  const size = webpSize(b) ?? pngSize(b) ?? gifSize(b) ?? jpegSize(b);
  if (!size || !size.width || !size.height) return null;
  return size;
}

export function loadPhotos(dir: string, options: Options = {}): GalleryItem[] {
  const root = path.join(process.cwd(), "public", dir);

  let files: string[] = [];
  try {
    files = fs.readdirSync(root);
  } catch {
    return [];
  }

  return files
    .filter((file) => /\.(webp|jpe?g|png|gif|avif)$/i.test(file))
    .sort((a, b) => {
      const na = Number(a.match(/(\d+)/)?.[1] ?? 0);
      const nb = Number(b.match(/(\d+)/)?.[1] ?? 0);
      return na - nb || a.localeCompare(b);
    })
    .map((file) => ({
      src: `/${dir}/${file}`,
      file,
      caption: options.caption,
      alt: options.alt,
      ...(imageSize(path.join(root, file)) ?? {}),
    }));
}
