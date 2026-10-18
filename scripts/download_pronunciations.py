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

# Names in the site's data are not always the canonical Wiktionary headword.
# Keep these aliases explicit so we don't accidentally download a homophone.
ALIASES = {
    "ErosElder": ["Eros"],
    "Cerebus": ["Cerberus"],
    "Oneriroi": ["Oneiroi", "Oneiros"],
    "Mnmosyne": ["Mnemosyne"],
    "Methis": ["Metis"],
    "Giantes": ["Gigantes"],
    "Hermaphodites": ["Hermaphroditus"],
    "Uranus": ["Uranus", "Ouranos"],
    "Gaia": ["Gaia", "Gaea"],
    "Kronos": ["Kronos", "Cronus"],
    "Tartarus": ["Tartarus", "Tartaros"],
    "Erebus": ["Erebus", "Erebos"],
    "Tyche": ["Tyche", "Tykhe"],
}


class AudioLinkParser(HTMLParser):
    """Capture rendered audio sources and file links, not only /wiki/File: links."""
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for attr in ("href", "src", "data-src", "resource"):
            value = attrs.get(attr, "")
            if value and (
                re.search(r"\.ogg(?:[?#]|$)", value, re.I)
                or re.search(r"(?:/wiki/(?:File|Media):|Special:Redirect/file/)", value, re.I)
                or "upload.wikimedia.org" in value.lower()
            ):
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
    match = re.search(r"let\s+domain\s*=\s*\{(.*?)\n\s*\};", source, re.S)
    if not match:
        raise RuntimeError("Could not find the domain-name object in sketch.js")
    names = re.findall(r"^\s*([A-Za-z][A-Za-z0-9_]*)\s*:", match.group(1), re.M)
    # Keep original displayed names, while avoiding duplicate case-insensitive entries.
    unique = {}
    for name in names:
        unique.setdefault(name.lower(), name)
    return list(unique.values())


AUDIO_EXTENSIONS = (".ogg", ".oga", ".wav", ".mp3", ".flac", ".opus", ".m4a")


def wiktionary_audio_candidates(title: str):
    """Find audio references from both page wikitext and Wiktionary's linked files."""
    params = urllib.parse.urlencode({
        "action": "query",
        "prop": "revisions|images",
        "titles": title,
        "rvprop": "content",
        "rvslots": "main",
        "imlimit": "max",
        "format": "json",
    })
    data = get_json(WIKTIONARY_API + "?" + params)
    pages = data.get("query", {}).get("pages", {})
    page = next(iter(pages.values()), {})
    revisions = page.get("revisions") or []
    wikitext = ""
    if revisions:
        wikitext = revisions[0].get("slots", {}).get("main", {}).get("content", "")
        if not wikitext:
            wikitext = revisions[0].get("*", "")

    candidates = []
    # Wiktionary templates vary: {{audio|en|File.wav}}, {{audio|en-us-File.ogg|...}},
    # and {{audio|File.ogg|a=US}}. Capture every audio template then inspect its args.
    for template in re.finditer(r"\{\{\s*(?:audio|audio-ipa)\s*\|([^{}]*?)\}\}", wikitext, re.I | re.S):
        args = [part.strip() for part in template.group(1).split("|")]
        for arg in args:
            arg = re.sub(r"^(?:1|2|file|audio|lang|a|q)\s*=", "", arg, flags=re.I).strip()
            if arg.lower().endswith(AUDIO_EXTENSIONS):
                candidates.append(arg)
    # Direct file links are also used in some entries, including community recordings.
    for match in re.finditer(r"\[\[(?:File|Media):([^]|]+\.(?:ogg|oga|wav|mp3|flac|opus|m4a))", wikitext, re.I):
        candidates.append(match.group(1))

    # The API's images list catches file links even if their syntax wasn't matched above.
    for image in page.get("images", []):
        filename = image.get("title", "").removeprefix("File:")
        if filename.lower().endswith(AUDIO_EXTENSIONS):
            candidates.append(filename)

    # Fallback to rendered HTML for links generated by templates.
    try:
        html_params = urllib.parse.urlencode({
            "action": "parse", "page": title, "prop": "text",
            "format": "json", "formatversion": "2",
        })
        parsed_data = get_json(WIKTIONARY_API + "?" + html_params)
        page_html = parsed_data.get("parse", {}).get("text", "")
        parser = AudioLinkParser()
        parser.feed(page_html)
        for value in parser.links:
            value = html.unescape(urllib.parse.unquote(value)).replace("&amp;", "&")
            match = re.search(r"(?:File|Media):([^?#]+)", value, re.I)
            if match:
                filename = match.group(1)
            else:
                match = re.search(r"(?:Special:Redirect/file/|/)([^/?#]+\.(?:ogg|oga|wav|mp3|flac|opus|m4a))(?:[?#]|$)", value, re.I)
                if not match:
                    continue
                filename = match.group(1)
            candidates.append(urllib.parse.unquote(filename).replace("_", " "))
    except (urllib.error.URLError, TimeoutError, ValueError, KeyError):
        pass

    cleaned = []
    for candidate in candidates:
        candidate = html.unescape(candidate).strip().strip(" ' \"")
        if candidate.lower().endswith(AUDIO_EXTENSIONS):
            cleaned.append(candidate.replace("_", " "))

    # English-specific Commons recording prefixes first. Generic files are retained
    # only when the Wiktionary page explicitly links them, which is a trusted match.
    us = [x for x in cleaned if re.match(r"^en-us-", x, re.I)]
    other_english = [
        x for x in cleaned
        if re.match(r"^en-(?:uk|gb|au|ca)-", x, re.I)
        or re.match(r"^en-", x, re.I)
        or "ll-q1860 (eng)" in x.lower()
    ]
    generic = [x for x in cleaned if x not in us and x not in other_english]
    return list(dict.fromkeys(us + other_english + generic))


def commons_audio_search_candidates(title: str):
    """Fallback to Commons file-title search if the Wiktionary entry has no audio."""
    params = urllib.parse.urlencode({
        "action": "query", "list": "search", "srnamespace": 6,
        "srsearch": f'intitle:"{title}" filetype:audio',
        "srlimit": 30, "format": "json",
    })
    data = get_json(COMMONS_API + "?" + params)
    titles = [
        page.get("title", "").removeprefix("File:")
        for page in data.get("query", {}).get("search", [])
    ]
    normalized = re.sub(r"[^a-z0-9]", "", title.lower())
    scored = []
    for filename in titles:
        if not filename.lower().endswith(AUDIO_EXTENSIONS):
            continue
        stem = re.sub(r"[^a-z0-9]", "", filename.rsplit(".", 1)[0].lower())
        english = bool(re.match(r"^(?:en-us-|en-)", filename, re.I) or "ll-q1860 (eng)" in filename.lower())
        if normalized not in stem or not english:
            continue
        score = 0 if re.match(r"^en-us-", filename, re.I) else 1
        if stem.endswith(normalized):
            score -= 1
        scored.append((score, filename))
    return [filename for _, filename in sorted(scored)]


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
            search_terms = list(dict.fromkeys([name] + ALIASES.get(name, [])))
            candidates = []
            for search_term in search_terms:
                try:
                    candidates.extend(wiktionary_audio_candidates(search_term))
                except (urllib.error.URLError, TimeoutError, ValueError, KeyError) as exc:
                    print(f"  Wiktionary lookup failed for {search_term}: {exc}", file=sys.stderr)
            # Deduplicate without losing the en-US-first ordering from each entry.
            candidates = list(dict.fromkeys(candidates))
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
                # Wiktionary entries may omit an audio widget even if Commons has
                # a suitable pronunciation recording. Search Commons as a fallback.
                try:
                    for search_term in search_terms:
                        for candidate in commons_audio_search_candidates(search_term):
                            candidate_info = commons_file_info(candidate)
                            if candidate_info:
                                selected, info = candidate, candidate_info
                                break
                        if selected:
                            break
                except (urllib.error.URLError, TimeoutError, ValueError, KeyError) as exc:
                    print(f"  Commons fallback search failed: {exc}", file=sys.stderr)

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
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\nSaved {len(items)} recordings to {OUT_DIR}")
    if missing:
        print("No suitable recording found for: " + ", ".join(missing))
        print("These names will use browser speech synthesis.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
