/* Approximate General American IPA fallback for Greek mythology names.
 * English IPA and pronunciation audio are looked up from Wikidata/Wikimedia Commons when available.
 * Browser speech synthesis is used when no suitable English recording is found.
 */
const pronunciationEn = {
  chaos:"/ˈkeɪ.ɑːs/", gaia:"/ˈɡaɪ.ə/", tartarus:"/ˈtɑːr.tər.əs/", eroselder:"/ˈɪr.ɑːs/",
  erebus:"/ˈɛr.ə.bəs/", nyx:"/nɪks/", uranus:"/jʊˈreɪ.nəs/", ourea:"/ˈʊr.i.ə/",
  pontus:"/ˈpɑːn.təs/", oceanus:"/oʊˈsiː.ə.nəs/", tethys:"/ˈtiː.θɪs/", hyperion:"/haɪˈpɪr.i.ən/",
  theia:"/ˈθiː.ə/", crius:"/ˈkraɪ.əs/", kronos:"/ˈkroʊ.nəs/", rhea:"/ˈriː.ə/",
  themis:"/ˈθiː.mɪs/", iapetus:"/aɪˈæp.ɪ.təs/", mnmosyne:"/nɪˈmɑː.sɪ.ni/", mnemosyne:"/nɪˈmɑː.sɪ.ni/",
  coeus:"/ˈsiː.əs/", phoebe:"/ˈfiː.bi/", poseidon:"/poʊˈsaɪ.dən/", demeter:"/dɪˈmiː.tər/",
  zeus:"/zuːs/", hera:"/ˈhɛr.ə/", hades:"/ˈheɪ.diːz/", hestia:"/ˈhɛs.ti.ə/",
  triton:"/ˈtraɪ.tɑːn/", athena:"/əˈθiː.nə/", hebe:"/ˈhiː.bi/", hephaestus:"/hɪˈfɛs.təs/",
  ares:"/ˈɛr.iːz/", aphrodite:"/ˌæf.rəˈdaɪ.ti/", adonis:"/əˈdɑː.nɪs/", hermes:"/ˈhɜːr.miːz/",
  apollo:"/əˈpɑː.loʊ/", artemis:"/ˈɑːr.tə.mɪs/", ganymede:"/ˈɡæn.ə.miːd/", persephone:"/pərˈsɛf.ə.ni/",
  charities:"/ˈkær.ɪ.tiːz/", dike:"/ˈdaɪ.kiː/", eunomia:"/juːˈnoʊ.mi.ə/", eirene:"/aɪˈriː.ni/",
  eros:"/ˈɪr.ɑːs/", psyche:"/ˈsaɪ.ki/", hermaphodites:"/hərˌmæf.rəˈdaɪ.təs/", muses:"/ˈmjuː.zɪz/",
  hecate:"/ˈhɛk.ə.ti/", typhon:"/ˈtaɪ.fɑːn/", echidna:"/ɪˈkɪd.nə/", orthrus:"/ˈɔːr.θrəs/",
  cerebus:"/ˈsɛr.ə.bəs/", cerberus:"/ˈsɜːr.bər.əs/", chimera:"/kaɪˈmɪr.ə/", hydra:"/ˈhaɪ.drə/",
  sphinx:"/sfɪŋks/", aether:"/ˈiː.θər/", hemera:"/ˈhɛm.ər.ə/", thalassa:"/θəˈlæs.ə/",
  charon:"/ˈkɛr.ən/", thanatos:"/ˈθæn.ə.tɑːs/", hypnos:"/ˈhɪp.nɑːs/", nemesis:"/ˈnɛm.ə.sɪs/",
  eris:"/ˈɪr.ɪs/", moirai:"/ˈmɔɪ.raɪ/", hesperides:"/hɛˈspɛr.ɪ.diːz/", cyclops:"/ˈsaɪ.klɑːps/",
  hecatoncheires:"/ˌhɛk.ə.tɑːnˈkaɪ.riːz/", erinyes:"/ɪˈrɪn.iːz/", phorcys:"/ˈfɔːr.sɪs/",
  ceto:"/ˈsiː.toʊ/", iris:"/ˈaɪ.rɪs/", scylla:"/ˈsɪl.ə/", nereus:"/ˈnɪr.i.əs/",
  amphitrite:"/æm.fɪˈtraɪ.ti/", helios:"/ˈhiː.li.ɑːs/", selene:"/sɪˈliː.ni/", eos:"/ˈiː.ɑːs/",
  atlas:"/ˈæt.ləs/", prometheus:"/prəˈmiː.θi.əs/", epimetheus:"/ˌɛp.ɪˈmiː.θi.əs/", pandora:"/pænˈdɔːr.ə/",
  styx:"/stɪks/", nike:"/ˈnaɪ.ki/", kratos:"/ˈkreɪ.tɑːs/", maia:"/ˈmaɪ.ə/", leto:"/ˈliː.toʊ/",
  thetis:"/ˈθiː.tɪs/", achilles:"/əˈkɪl.iːz/", theseus:"/ˈθiː.siː.əs/", perseus:"/ˈpɜːr.si.əs/",
  heracles:"/ˈhɛr.ə.kliːz/", helen:"/ˈhɛl.ən/", minos:"/ˈmaɪ.nɑːs/", pasiphae:"/pəˈsɪf.i.iː/",
  dionysus:"/ˌdaɪ.əˈnaɪ.səs/", ariadne:"/ˌɛr.iˈæd.ni/", tyche:"/ˈtaɪ.ki/", circe:"/ˈsɜːr.si/",
  minotaur:"/ˈmɪn.ə.tɔːr/"
};
function getEnglishPronunciation(name) {
  const key = String(name || "").toLowerCase().replace(/[^a-z]/g, "");
  return pronunciationEn[key] ? { ipa: pronunciationEn[key] } : null;
}
function speakDeityName(name, button) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    alert("Audio playback is not supported in this browser. Try a recent version of Chrome, Edge, or Safari.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(name);
  utterance.lang = "en-US";
  utterance.rate = 0.82;
  if (button) {
    button.disabled = true;
    utterance.onend = () => { button.disabled = false; };
    utterance.onerror = () => { button.disabled = false; };
  }
  window.speechSynthesis.speak(utterance);
}


/* Read the English entry on Wiktionary itself. Its audio links point to
   pronunciation files hosted on Wikimedia Commons. Use browser speech only if
   the entry has no US-English recording or the file cannot play. */
const wikimediaPronunciationCache = new Map();

async function fetchWikimediaPronunciation(name) {
  const cacheKey = String(name || "").trim().toLowerCase();
  if (wikimediaPronunciationCache.has(cacheKey)) return wikimediaPronunciationCache.get(cacheKey);

  const request = (async () => {
    try {
      const title = String(name || "").trim().replace(/ /g, "_");
      const apiUrl = "https://en.wiktionary.org/w/api.php?action=parse&page=" +
        encodeURIComponent(title) + "&prop=text&format=json&formatversion=2&origin=*";
      const response = await fetch(apiUrl);
      if (!response.ok) return null;
      const data = await response.json();
      const html = data && data.parse && data.parse.text;
      if (!html || typeof html !== "string") return null;

      const doc = new DOMParser().parseFromString(html, "text/html");
      const audioCandidates = [];
      // Wiktionary's pronunciation templates expose the linked Commons filename.
      for (const link of doc.querySelectorAll('a[href*="/wiki/File:"], a[href*="/wiki/Media:"]')) {
        const href = link.getAttribute("href") || "";
        const match = href.match(/\/(?:wiki)\/(?:File|Media):([^?#]+)/i);
        if (!match) continue;
        let fileName = decodeURIComponent(match[1]).replace(/_/g, " ");
        if (!/\.ogg$/i.test(fileName)) continue;
        if (/^en-us-/i.test(fileName)) audioCandidates.unshift(fileName);
        else if (/^en-/i.test(fileName) || /ll-q1860\s*\(eng\)/i.test(fileName)) audioCandidates.push(fileName);
      }

      // Some rendered entries expose the direct audio source instead of a File link.
      for (const audio of doc.querySelectorAll("audio source[src], audio[src]")) {
        const src = audio.getAttribute("src") || "";
        if (!src) continue;
        const fileMatch = src.match(/\/([^/?#]+\.ogg)(?:[?#]|$)/i);
        if (fileMatch) {
          const fileName = decodeURIComponent(fileMatch[1]);
          if (/^en-us-/i.test(fileName)) audioCandidates.unshift(fileName);
          else if (/^en-/i.test(fileName) || /ll-q1860\s*\(eng\)/i.test(fileName)) audioCandidates.push(fileName);
        }
      }

      const audioFile = [...new Set(audioCandidates)][0] || "";
      const ipaNode = doc.querySelector(".IPA");
      const ipa = ipaNode ? (ipaNode.textContent || "").trim() : "";
      if (!audioFile && !ipa) return null;

      return {
        ipa,
        audioUrl: audioFile
          ? "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(audioFile)
          : "",
        sourceUrl: audioFile
          ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(audioFile.replace(/ /g, "_"))
          : "https://en.wiktionary.org/wiki/" + encodeURIComponent(title),
        sourceLabel: audioFile ? "Audio via Wiktionary / Wikimedia Commons" : "IPA via Wiktionary",
        wiktionaryUrl: "https://en.wiktionary.org/wiki/" + encodeURIComponent(title)
      };
    } catch (error) {
      return null;
    }
  })();

  wikimediaPronunciationCache.set(cacheKey, request);
  return request;
}

async function playDeityPronunciation(name, button) {
  if (button) button.disabled = true;
  try {
    const result = await fetchWikimediaPronunciation(name);
    updatePronunciationDisplay(name, result);
    if (result && result.audioUrl) {
      const audio = new Audio(result.audioUrl);
      let finished = false;
      const restoreButton = () => {
        if (!finished && button) button.disabled = false;
        finished = true;
      };
      audio.onended = restoreButton;
      audio.onerror = () => {
        restoreButton();
        speakDeityName(name, null);
      };
      try {
        await audio.play();
      } catch (error) {
        restoreButton();
        speakDeityName(name, null);
      }
      return;
    }
    speakDeityName(name, null);
  } finally {
    if (button) button.disabled = false;
  }
}

function updatePronunciationDisplay(name, result) {
  const ipaElement = document.getElementById("pronunciationIpa-" + name);
  const source = document.getElementById("pronunciationSource-" + name);
  if (result && result.ipa && ipaElement) ipaElement.textContent = "English IPA: " + result.ipa;
  if (source) {
    source.replaceChildren();
    if (result && result.sourceUrl) {
      const link = document.createElement("a");
      link.href = result.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = result.sourceLabel;
      source.appendChild(link);
    } else {
      source.textContent = "Using browser-generated pronunciation if no recording is available";
    }
  }
}

async function loadWikimediaPronunciationForModal(name) {
  const result = await fetchWikimediaPronunciation(name);
  updatePronunciationDisplay(name, result);
}
