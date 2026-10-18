#!/usr/bin/env python3
"""Download English pronunciation recordings from Wiktionary/Wikimedia Commons.

Run from the repository root:
    python3 scripts/download_pronunciations.py

Audio files and attribution metadata are saved under pronunciation-audio/.
Only English recordings are selected, preferring en-US filenames. Missing entries
are reported and can continue to use browser speech synthesis.
"""
from __future__ import annotations

import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKETCH = ROOT / "sketch.js"
OUT_DIR = ROOT / "pronunciation-audio"
MANIFEST_PATH = OUT_DIR / "manifest.json"
USER_AGENT = "GreekGodsFamilyTreePronunciationAssets/1.0 (open-source educational project)"
WIKTIONARY_API = "https://en.wiktionary.org/w/api.php"
COMMONS_API = "https://commons.wikimedia.org/w/api.php"


class AudioLinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        href = attrs.get("href", "")
        src = attrs.get("src", "")
        for value in (href, src):
            if value and ("/wiki/File:" in value or "/wiki/Media:" in value or value.lower().endswith(".ogg")):
                self.links.append(value)


def get_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def download(url: str, path: Path):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        path.write_bytes(response.read())


def extract_names():
    source = SKETCH.read_text(encoding="utf-8")
    match = re.search(r"let\\s+domain\\s*=\\s*\\{(.*?)\\n\\s*\\};", source, re.S)
    if not match:
        raise RuntimeError("Could not find the domain-name object in sketch.js")
    names = re.findall(r"^\\s*([A-Za-z][A-Za-z0-9_]*)\\s*:", match.group(1), re.M)
    # Keep original displayed names, while avoiding duplicate case-insensitive entries.
    unique = {}
    for name in names:
        unique.setdefault(name.lower(), name)
    return list(unique.values())


def wiktionary_audio_candidates(title: str):
    params = urllib.parse.urlencode({
        "action": "parse", "page": title, "prop": "text",
        "format": "json", "formatversion": "2",
    })
    data = get_json(WIKTIONARY_API + "?" + params)
    page_html = data.get("parse", {}).get("text", "")
    parser = AudioLinkParser()
    parser.feed(page_html)
    candidates = []
    for value in parser.links:
        value = html.unescape(urllib.parse.unquote(value))
        match = re.search(r"(?:File|Media):([^?#]+)", value, re.I)
        if match:
            filename = urllib.parse.unquote(match.group(1)).replace("_", " ")
        else:
            match = re.search(r"/([^/?#]+\\.ogg)(?:[?#]|$)", value, re.I)
            if not match:
                continue
            filename = match.group(1)
        if not filename.lower().endswith(".ogg"):
            continue
        if re.match(r"^en-us-", filename, re.I):
            candidates.insert(0, filename)
        elif re.match(r"^en-", filename, re.I) or "ll-q1860 (eng)" in filename.lower():
            candidates.append(filename)
    # Keep order but remove duplicates.
    return list(dict.fromkeys(candidates))


def commons_file_info(filename: str):
    params = urllib.parse.urlencode({
        "action": "query", "titles": "File:" + filename,
        "prop": "imageinfo", "iiprop": "url|extmetadata", "format": "json",
    })
    data = get_json(COMMONS_API + "?" + params)
    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()), {})
    info = (page.get("imageinfo") or [{}])[0]
    if not info.get("url"):
        return None
    meta = info.get("extmetadata") or {}

    def meta_value(key):
        value = meta.get(key, {}).get("value", "")
        return re.sub(r"<[^>]+>", "", html.unescape(value)).strip()

    return {
        "url": info["url"],
        "description_page": "https://commons.wikimedia.org/wiki/" + urllib.parse.quote("File:" + filename.replace(" ", "_"), safe=":"),
        "license": meta_value("LicenseShortName") or meta_value("UsageTerms") or "See Wikimedia Commons file page",
        "artist": meta_value("Artist"),
        "credit": meta_value("Credit"),
        "attribution": meta_value("Attribution"),
        "license_url": meta_value("LicenseUrl"),
    }


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    try:
        names = extract_names()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    old_manifest = {}
    if MANIFEST_PATH.exists():
        try:
            old_manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8")).get("items", {})
        except (ValueError, OSError):
            pass

    items = {}
    missing = []
    for index, name in enumerate(names, start=1):
        key = re.sub(r"[^a-z0-9]+", "", name.lower())
        print(f"[{index}/{len(names)}] {name}")
        try:
            candidates = wiktionary_audio_candidates(name)
            selected = None
            info = None
            for candidate in candidates:
                try:
                    candidate_info = commons_file_info(candidate)
                    if candidate_info:
                        selected, info = candidate, candidate_info
                        break
                except (urllib.error.URLError, TimeoutError, ValueError, KeyError):
                    continue

            if not selected or not info:
                # Preserve a previously downloaded file if a temporary API issue occurs.
                existing = old_manifest.get(key)
                if existing and (ROOT / existing.get("path", "")).is_file():
                    items[key] = existing
                else:
                    missing.append(name)
                continue

            filename = key + ".ogg"
            local_path = OUT_DIR / filename
            if not local_path.exists() or old_manifest.get(key, {}).get("source_file") != selected:
                download(info["url"], local_path)
            items[key] = {
                "name": name,
                "path": "pronunciation-audio/" + filename,
                "source_file": selected,
                "source_url": info["description_page"],
                "license": info["license"],
                "license_url": info["license_url"],
                "artist": info["artist"],
                "credit": info["credit"],
                "attribution": info["attribution"],
            }
            time.sleep(0.15)
        except (urllib.error.URLError, TimeoutError, ValueError, KeyError) as exc:
            existing = old_manifest.get(key)
            if existing and (ROOT / existing.get("path", "")).is_file():
                items[key] = existing
            else:
                missing.append(name)
            print(f"  Warning: {exc}", file=sys.stderr)

    manifest = {
        "generated_by": "scripts/download_pronunciations.py",
        "source_policy": "English recordings from Wiktionary entries, audio hosted by Wikimedia Commons; en-US preferred.",
        "items": items,
        "missing": missing,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
    print(f"\\nSaved {len(items)} recordings to {OUT_DIR}")
    if missing:
        print("No suitable recording found for: " + ", ".join(missing))
        print("These names will use browser speech synthesis.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
