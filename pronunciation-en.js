/* English IPA guides for Greek mythology names.
 * These are practical General American approximations; pronunciations vary by dialect and reference.
 * Audio uses the browser's built-in speech synthesis voice, not a studio recording.
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
