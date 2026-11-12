/* Polku landing page — small, dependency-free enhancements */
(function () {
  "use strict";

  // ---------- Finnish / Swedish content for the mockups ----------
  var T = {
    fi: {
      hello: "hei",
      langName: "Finnish",
      greet: "Huomenta!",
      topic: "Asiointi virastossa",
      floatWord: "kirjasto",
      fcWord: "kirjasto",
      fcIpa: "/ˈkirjɑsto/",
      fcEx: "Menen <b>kirjastoon</b> lauantaina.",
      rdTitle: "Uusi työpaikka",
      rdText: "Mari aloitti uudessa työpaikassa maanantaina. Toimisto on lähellä <mark>rautatieasemaa</mark>, joten hän kulkee töihin junalla. Kollegat ovat ystävällisiä, ja lounas syödään yhdessä kello yksitoista.",
      rdPopW: "rautatieasema",
      rdQ: "Miten Mari kulkee töihin?",
      rdA: "Bussilla", rdB: "Junalla", rdC: "Pyörällä",
      lsTitle: "Kuulutus rautatieasemalla",
      lsQ: "Mihin aikaan juna lähtee?",
      spPrompt: "Kerro, mitä teit viime viikonloppuna.",
      spAnswer: "Lauantaina kävin torilla ja <u>ostin</u> mansikoita. Illalla katsoin elokuvan."
    },
    sv: {
      hello: "hej",
      langName: "Swedish",
      greet: "God morgon!",
      topic: "Att uträtta ärenden",
      floatWord: "bibliotek",
      fcWord: "bibliotek",
      fcIpa: "/bɪblɪʊˈteːk/",
      fcEx: "Jag går till <b>biblioteket</b> på lördag.",
      rdTitle: "Ett nytt jobb",
      rdText: "Mari började på ett nytt jobb i måndags. Kontoret ligger nära <mark>järnvägsstationen</mark>, så hon åker tåg till jobbet. Kollegorna är vänliga och de äter lunch tillsammans klockan elva.",
      rdPopW: "järnvägsstation",
      rdQ: "Hur tar sig Mari till jobbet?",
      rdA: "Med buss", rdB: "Med tåg", rdC: "Med cykel",
      lsTitle: "Utrop på järnvägsstationen",
      lsQ: "När går tåget?",
      spPrompt: "Berätta vad du gjorde förra helgen.",
      spAnswer: "På lördagen gick jag till torget och <u>köpte</u> jordgubbar. På kvällen såg jag en film."
    }
  };

  function setLang(lang) {
    var dict = T[lang] || T.fi;
    document.querySelectorAll("[data-t]").forEach(function (el) {
      var key = el.getAttribute("data-t");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    try { localStorage.setItem("polku-lang", lang); } catch (e) { /* storage unavailable */ }
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-lang]");
    if (!t) return;
    e.preventDefault();
    setLang(t.dataset.lang);
  });

  // ---------- Generated mockup details ----------
  // Audio waveform
  document.querySelectorAll(".wave").forEach(function (w) {
    var n = +w.dataset.bars || 36, on = +w.dataset.on || 0.4, html = "";
    for (var i = 0; i < n; i++) {
      var h = 18 + Math.round(Math.abs(Math.sin(i * 1.7) * 0.6 + Math.sin(i * 0.43) * 0.4) * 82);
      html += '<i class="' + (i / n < on ? "on" : "") + '" style="height:' + h + '%"></i>';
    }
    w.innerHTML = html;
  });

  // Live speaking equaliser
  document.querySelectorAll(".livewave").forEach(function (w) {
    var n = +w.dataset.live || 14, html = "";
    for (var i = 0; i < n; i++) {
      var h = 30 + Math.round(Math.abs(Math.sin(i * 1.3)) * 70);
      html += '<i style="height:' + h + '%;animation-delay:-' + (i * 0.13).toFixed(2) + 's"></i>';
    }
    w.innerHTML = html;
  });

  // Study streak heatmap (one missed day)
  document.querySelectorAll(".heat").forEach(function (w) {
    var n = +w.dataset.heat || 42, html = "";
    for (var i = 0; i < n; i++) {
      var lvl = i === 17 ? "" : "l" + (1 + ((i * 7 + 3) % 5 > 1 ? ((i * 5) % 3) : 0));
      if (i > n - 8 && lvl) lvl = "l3";
      html += '<i class="' + lvl + '"></i>';
    }
    w.innerHTML = html;
  });

  // "Ready by" = six months from today
  var ready = new Date(); ready.setMonth(ready.getMonth() + 6);
  var readyStr = ready.toLocaleString("en", { month: "long", year: "numeric" });
  T.fi.readyBy = T.sv.readyBy = readyStr;

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Initial language (remembered per visitor)
  var saved = "fi";
  try { saved = localStorage.getItem("polku-lang") || "fi"; } catch (e) { /* ignore */ }
  setLang(saved);

  // ---------- Reveal on scroll ----------
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
})();
