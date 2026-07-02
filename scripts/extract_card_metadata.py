"""Extract metadata from exhibition PDF cards."""
import fitz
import glob
import json
import os
import re
import unicodedata

BASE = r"c:\Users\antonio.santese\iCloudDrive\Santese Art\Giardini del Salento\Cartoncini\New"

TITLE_EN = {
    "Abbraccio di Luce": "Embrace of Light",
    "Aurora Rustica": "Rustic Dawn",
    "Calice Selvaggio": "Wild Chalice",
    "Campana del Bosco": "Bell of the Forest",
    "Cavalli del Tempo": "Horses of Time",
    "Cimasa di Fiori": "Floral Cornice",
    "Corona di Fuoco": "Crown of Fire",
    "Dorso di Cavallo Selvatico": "Wild Horse Back",
    "Essenza Antica": "Ancient Essence",
    "Fenice d'Ulivo": "Olive Phoenix",
    "Fiammella del Bosco": "Little Flame of the Forest",
    "Fiori e Luce": "Flowers and Light",
    "Goccia d'Oro": "Golden Drop",
    "La Druida": "The Druid",
    "Lanterna del Viandante": "Wayfarer's Lantern",
    "Luce dell'Ulivo": "Olive Light",
    "L'alba del legno": "The Dawn of Wood",
    "Regno delle Due Sicilie": "Kingdom of the Two Sicilies",
    "Sentinella del Bosco": "Sentinel of the Forest",
    "Torre di Ulivo": "Olive Tower",
    "Volute del Bosco": "Forest Scrolls",
}

EN_START = re.compile(
    r"(?:^|\n)("
    r"Door insert|Rustic Dawn|Wild Chalice|Hand-carved|Cimasa in chestnut|Table lamp|"
    r"Crown of Fire|Floor lamp|Lamp in olive|Little Flame|Pair of|The Druid|"
    r"Lantern in|Electric lamp|Kingdom of|Jewelry holder"
    r")"
)


def normalize_title(title: str) -> str:
    return (
        title.replace("\ufffd", "'")
        .replace("\u2019", "'")
        .replace("libert\u00e0", "libertà")
        .replace("L\u2019", "L'")
        .replace("l\u2019", "l'")
        .strip()
)


def stem_to_slug(stem: str) -> str:
    s = stem.replace("'", "").replace("\u2019", "")
    return s.replace("_", "-").lower() + ".jpg"


def normalize_dimensions(dims: str) -> str:
    dims = dims.replace("\ufffd", "Ø")
    dims = re.sub(r"\s+", " ", dims)
    dims = re.sub(r"Ø\s*Ø", "Ø ×", dims)
    dims = re.sub(r"cm\s*Ø\s*(\d)", r"cm Ø × \1", dims)
    return dims.strip()


def split_descriptions(body: str) -> tuple[str, str]:
    match = EN_START.search(body)
    if not match:
        return body.strip(), ""

    split_at = match.start()
    if body[split_at] == "\n":
        split_at += 1

    desc_it = body[:split_at].strip()
    desc_en = body[split_at:].strip()
    return desc_it, desc_en


def parse_card(pdf_path: str) -> dict:
    doc = fitz.open(pdf_path)
    text = doc[0].get_text().strip()
    doc.close()

    lines = [line.strip() for line in text.split("\n") if line.strip()]
    stem = os.path.basename(pdf_path).replace("_card_14x14cm.pdf", "")
    title_it = normalize_title(lines[0])
    dims = normalize_dimensions(lines[1])
    body = "\n".join(lines[2:])
    desc_it, desc_en = split_descriptions(body)

    return {
        "stem": stem,
        "slug": stem_to_slug(stem),
        "titleIt": title_it,
        "titleEn": TITLE_EN.get(title_it, title_it),
        "dimensions": dims,
        "descriptionIt": desc_it,
        "descriptionEn": desc_en,
    }


def main() -> None:
    results = [parse_card(path) for path in sorted(glob.glob(os.path.join(BASE, "*.pdf")))]
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
