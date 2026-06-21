"""Generate exhibit entries for page.tsx from PDF metadata."""
import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from extract_card_metadata import parse_card, BASE


def clean_text(text: str) -> str:
    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("\ufffd", "'")
    text = text.replace("libert e", "libertà e")
    text = text.replace("L alba del legno", "L'alba del legno")
    text = text.replace("come l aurora", "come l'aurora")
    return text


def clean_dims(dims: str) -> str:
    dims = dims.replace("\ufffd", "Ø")
    dims = re.sub(r"\s+", " ", dims)
    dims = re.sub(r"Ø\s*Ø", "Ø ×", dims)
    dims = re.sub(r"cm Ø (\d)", r"cm Ø × \1", dims)
    if dims.endswith("cm") and "×" not in dims and dims.count("Ø") == 1:
        pass
    elif dims == "38 cm Ø":
        pass
    return dims.strip()


def main() -> None:
    items = [parse_card(path) for path in sorted(glob.glob(os.path.join(BASE, "*.pdf")))]

    for index, item in enumerate(items, start=11):
        title_it = clean_text(item["titleIt"])
        desc_it = clean_text(item["descriptionIt"])
        desc_en = clean_text(item["descriptionEn"])
        dims = clean_dims(item["dimensions"])
        print(
            f'  {{ id: {index}, titleIt: "{title_it}", titleEn: "{item["titleEn"]}", '
            f'dimensions: "{dims}", descriptionIt: "{desc_it}", '
            f'descriptionEn: "{desc_en}", image: "{item["slug"]}" }},'
        )


if __name__ == "__main__":
    main()
