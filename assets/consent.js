/* YKItie cookie consent for Google Tag Manager (Consent Mode v2).
   Defaults to "denied" in the page <head>; this shows the banner and records the visitor's choice. */
(function () {
  "use strict";
  var KEY = "ykitie-consent";
  var banner = document.getElementById("consent");
  if (!banner) return;

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable */ } }

  function apply(choice) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: choice === "granted" ? "granted" : "denied" });
    }
    window.dataLayer && window.dataLayer.push({ event: "consent_" + choice });
  }

  function show() { banner.hidden = false; requestAnimationFrame(function () { banner.classList.add("show"); }); }
  function hide() { banner.classList.remove("show"); setTimeout(function () { banner.hidden = true; }, 300); }

  banner.addEventListener("click", function (e) {
    var b = e.target.closest("[data-consent]");
    if (!b) return;
    var choice = b.dataset.consent;
    save(choice); apply(choice); hide();
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); show(); }
  });

  if (!read()) show();
})();
