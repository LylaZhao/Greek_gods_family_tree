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


/* Pronunciation audio is bundled with the site. The browser reads only the
   local manifest and local .ogg files; it does not query Wiktionary at playback time. */
let localPronunciationManifestPromise;

function normalizePronunciationKey(name) {
  return String(name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

async function fetchWikimediaPronunciation(name) {
  if (!localPronunciationManifestPromise) {
    localPronunciationManifestPromise = fetch("pronunciation-audio/manifest.json")
      .then(response => response.ok ? response.json() : null)
      .catch(() => null);
  }
  const manifest = await localPronunciationManifestPromise;
  const key = normalizePronunciationKey(name);
  const item = manifest && manifest.items && manifest.items[key];
  if (!item) {
    const fallback = getEnglishPronunciation(name);
    return fallback ? { ipa: fallback.ipa, audioUrl: "", sourceUrl: "", sourceLabel: "" } : null;
  }
  return {
    ipa: item.ipa || (getEnglishPronunciation(name) || {}).ipa || "",
    audioUrl: item.path || "",
    sourceUrl: item.source_url || "",
    sourceLabel: "Audio: Wikimedia Commons (" + (item.license || "license details") + ")",
    wiktionaryUrl: "https://en.wiktionary.org/wiki/" + encodeURIComponent(item.name || name)
  };
}

async function playDeityPronunciation(name, button) {
  if (button) button.disabled = true;
  try {
    const result = await fetchWikimediaPronunciation(name);
    updatePronunciationDisplay(name, result, false);
    if (result && result.audioUrl) {
      const audio = new Audio(result.audioUrl);
      let finished = false;
      const restoreButton = () => {
        if (finished) return;
        finished = true;
        if (button) button.disabled = false;
      };
      audio.onended = restoreButton;
      audio.onerror = () => {
        updatePronunciationDisplay(name, null, true);
        restoreButton();
        speakDeityName(name, null);
      };
      try {
        await audio.play();
        updatePronunciationDisplay(name, result, true);
      } catch (error) {
        updatePronunciationDisplay(name, null, true);
        speakDeityName(name, null);
      }
      return;
    }
    updatePronunciationDisplay(name, result, true);
    speakDeityName(name, null);
  } finally {
    if (button) button.disabled = false;
  }
}

function updatePronunciationDisplay(name, result, audioPlayed = false) {
  const ipaElement = document.getElementById("pronunciationIpa-" + name);
  const source = document.getElementById("pronunciationSource-" + name);
  if (result && result.ipa && ipaElement) ipaElement.textContent = "English IPA: " + result.ipa;
  if (source) {
    source.replaceChildren();
    if (result && result.sourceUrl && result.audioUrl && audioPlayed) {
      const link = document.createElement("a");
      link.href = result.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = result.sourceLabel;
      source.appendChild(link);
    } else if (result && result.audioUrl && !audioPlayed) {
      source.textContent = "Bundled English recording";
    } else {
      source.textContent = "Browser-generated pronunciation (no bundled recording found)";
    }
  }
}

async function loadWikimediaPronunciationForModal(name) {
  const result = await fetchWikimediaPronunciation(name);
  updatePronunciationDisplay(name, result, false);
}
