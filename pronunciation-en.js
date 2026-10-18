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


/* Look up English IPA and recordings from Wikidata/Wikimedia Commons.
   Browser speech synthesis remains the fallback when no suitable recording exists. */
const wikimediaPronunciationCache = new Map();

async function fetchWikimediaPronunciation(name) {
  const cacheKey = String(name || "").trim().toLowerCase();
  if (wikimediaPronunciationCache.has(cacheKey)) return wikimediaPronunciationCache.get(cacheKey);

  const request = (async () => {
    try {
      const searchUrl = "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" +
        encodeURIComponent(name) + "&language=en&uselang=en&type=item&limit=10&format=json&origin=*";
      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) return null;
      const searchData = await searchResponse.json();
      const match = (searchData.search || []).find(item =>
        String(item.label || "").trim().toLowerCase() === cacheKey
      );
      if (!match) return null;

      const entityUrl = "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" +
        encodeURIComponent(match.id) + "&props=claims&format=json&origin=*";
      const entityResponse = await fetch(entityUrl);
      if (!entityResponse.ok) return null;
      const entityData = await entityResponse.json();
      const entity = entityData.entities && entityData.entities[match.id];
      const claims = entity && entity.claims ? entity.claims : {};
      const isEnglish = statement => {
        const languages = statement.qualifiers && statement.qualifiers.P407;
        return Array.isArray(languages) && languages.some(value =>
          value.datavalue && value.datavalue.value && value.datavalue.value.id === "Q1860"
        );
      };

      let ipa = "";
      for (const statement of (claims.P898 || [])) {
        if (isEnglish(statement) && statement.mainsnak && statement.mainsnak.datavalue) {
          ipa = String(statement.mainsnak.datavalue.value || "");
          if (ipa) break;
        }
      }

      let audioFile = "";
      for (const statement of (claims.P443 || [])) {
        const value = statement.mainsnak && statement.mainsnak.datavalue &&
          statement.mainsnak.datavalue.value;
        if (!value || typeof value !== "string") continue;
        const filenameLooksEnglish = /^(en[-_]|en-us[-_]|ll-q1860\s*\(eng\))/i.test(value);
        if (isEnglish(statement) || filenameLooksEnglish) {
          audioFile = value;
          break;
        }
      }

      if (!ipa && !audioFile) return null;
      return {
        ipa: ipa,
        audioUrl: audioFile
          ? "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(audioFile)
          : "",
        sourceUrl: audioFile
          ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(audioFile.replace(/ /g, "_"))
          : "https://www.wikidata.org/wiki/" + match.id,
        sourceLabel: audioFile ? "Audio via Wikimedia Commons" : "IPA via Wikidata"
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
      audio.onended = () => { if (button) button.disabled = false; };
      audio.onerror = () => {
        if (button) button.disabled = false;
        speakDeityName(name, null);
      };
      try {
        await audio.play();
      } catch (error) {
        if (button) button.disabled = false;
        speakDeityName(name, null);
      }
      return;
    }
    speakDeityName(name, null);
  } finally {
    if (button && button.disabled) button.disabled = false;
  }
}

function updatePronunciationDisplay(name, result) {
  if (!result) return;
  const ipaElement = document.getElementById("pronunciationIpa-" + name);
  const source = document.getElementById("pronunciationSource-" + name);
  if (result.ipa && ipaElement) ipaElement.textContent = "English IPA: " + result.ipa;
  if (result.sourceUrl && source) {
    const link = document.createElement("a");
    link.href = result.sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = result.sourceLabel;
    source.replaceChildren(link);
  }
}

async function loadWikimediaPronunciationForModal(name) {
  const result = await fetchWikimediaPronunciation(name);
  updatePronunciationDisplay(name, result);
}
