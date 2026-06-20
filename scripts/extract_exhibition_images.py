"""Extract images from exhibition PDF cards and save as JPG for the website."""
import os
import re
import fitz
from PIL import Image
import io

EXHIBITION_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "exhibition")

# PDF filename stem -> website image filename
PDF_TO_IMAGE = {
    "Lampada_Wormhole": "lampada-wormhole.jpg",
    "Tris_di_Radiche": "tris-di-radiche.jpg",
    "Centrotavola_di_Radiche": "centrotavola-di-radiche.jpg",
    "Raggiera_Solare": "raggiera-solare.jpg",
    "Tris_di_Fiori": "tris-di-fiori.jpg",
    "Saturno_di_Radiche": "saturno-di-radiche.jpg",
    "Quintetto_di_Essenze": "quintetto-di-essenze.jpg",
    "Scrigno_di_Radiche": "scrigno-di-radiche.jpg",
    "Quartetto_di_Radiche": "quartetto-di-radiche.jpg",
    "Cerchi_di_Luce": "cerchi-di-luce.jpg",
}


def pdf_stem(filename: str) -> str | None:
    match = re.match(r"^(.+)_card_14x14cm\.pdf$", filename, re.IGNORECASE)
    return match.group(1) if match else None


def extract_best_image(doc: fitz.Document) -> tuple[bytes, str]:
    """Return the largest embedded image from the first page, or render the page."""
    page = doc[0]
    images = page.get_images(full=True)

    if images:
        best = None
        best_area = 0
        for img in images:
            xref = img[0]
            base = doc.extract_image(xref)
            area = base["width"] * base["height"]
            if area > best_area:
                best_area = area
                best = base
        if best:
            return best["image"], best["ext"]

    # Fallback: render page at high resolution
    matrix = fitz.Matrix(300 / 72, 300 / 72)
    pix = page.get_pixmap(matrix=matrix, alpha=False)
    return pix.tobytes("png"), "png"


def to_jpeg(image_bytes: bytes, ext: str, out_path: str) -> None:
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    img.save(out_path, "JPEG", quality=92, optimize=True)


def main() -> None:
    exhibition_dir = os.path.abspath(EXHIBITION_DIR)
    for filename in sorted(os.listdir(exhibition_dir)):
        if not filename.lower().endswith(".pdf"):
            continue

        stem = pdf_stem(filename)
        if not stem or stem not in PDF_TO_IMAGE:
            print(f"SKIP (no mapping): {filename}")
            continue

        out_name = PDF_TO_IMAGE[stem]
        pdf_path = os.path.join(exhibition_dir, filename)
        out_path = os.path.join(exhibition_dir, out_name)

        doc = fitz.open(pdf_path)
        image_bytes, ext = extract_best_image(doc)
        doc.close()

        to_jpeg(image_bytes, ext, out_path)
        size_kb = os.path.getsize(out_path) // 1024
        print(f"OK: {filename} -> {out_name} ({size_kb} KB)")


if __name__ == "__main__":
    main()
