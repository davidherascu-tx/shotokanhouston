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

export function loadPhotos(dir: string, options: Options = {}): GalleryItem[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", dir));
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
    }));
}
