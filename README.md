# YKItie — YKI prep landing page

Domain: **ykitie.com**

Static landing page for **YKItie**, a mobile app (iOS & Android) that takes learners from **A0 to B1 in six months** to pass the Finnish **YKI** language test, in **Finnish or Swedish**.

Each daily lesson is **30 minutes**: Words (spaced-repetition flashcards, 8 min) → Read (7 min) → Listen (7 min) → Speak (AI tutor, 8 min).

![App mockups](mockups/ykitie-mockups-fi.png)

## Pages

| File | What it is |
|---|---|
| `index.html` | The landing page. All six app screens are built in HTML/CSS inside it. |
| `privacy.html` | Privacy policy (GDPR). Contact: info@ykitie.com. |
| `mockups.html` | Design board showing the six screens side by side (loads them from `index.html`). |
| `assets/styles.css` | Site styles and phone-mockup styles. |
| `assets/app.js` | FI/SV language toggle, generated waveform/heatmap, scroll reveal. |
| `mockups/*.png` | Exported mockup images. |

No build step and no dependencies apart from Google Fonts.

When you change `assets/styles.css` or `assets/app.js`, bump the `?v=` number where they're linked in `index.html` and `mockups.html`, so visitors don't get a stale cached copy.

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000 (`mockups.html` needs a server because it fetches `index.html`).

## Deploy to GitHub Pages

Served by GitHub Pages from `main` / root at **https://ykitie.com** (the `CNAME` file holds the domain). DNS is at Namecheap: 4 A records `185.199.108–111.153`, 4 AAAA records `2606:50c0:8000–8003::153`, and `www` CNAME → `prisikarm.github.io`.

## Analytics

The site uses [GoatCounter](https://www.goatcounter.com): free, open source, no cookies, so no cookie banner is needed under GDPR.

**Dashboard:** https://polku.goatcounter.com. To change accounts, edit `GOATCOUNTER_CODE` at the top of `assets/app.js` and push. While the code is empty, no analytics script loads at all. Local visits (`localhost`) are never counted.

**What gets counted**

| Event | Meaning |
|---|---|
| page views | Visitors and pages, plus referrers, countries, devices (automatic) |
| `download-ios-hero` / `download-ios-cta` | App Store button, top of page / bottom of page |
| `download-android-hero` / `download-android-cta` | Google Play button, top / bottom |
| `trial-click-pricing` | “Start 3-day free trial” in the pricing card |
| `nav-get-app` | “Get the app” in the top menu |
| `lang-fi` / `lang-sv` | Visitor switched the language preview (interest in Finnish vs Swedish) |

| `waitlist-open-<source>` | Waitlist form opened, and from which button |
| `waitlist-signup` / `waitlist-signup-<language>-<platform>` | Someone joined the waitlist (e.g. `waitlist-signup-finnish-ios`) |

### Google Tag Manager

Container `GTM-MH88VLHT` loads on `index.html` and `privacy.html`, using **Google Consent Mode v2**: everything defaults to `denied`. A banner (`assets/consent.js`) asks for consent, and a “Cookie settings” footer link reopens it. `analytics_storage` becomes `granted` only after the visitor clicks Accept. Advertising consent stays denied.

Every site event is also pushed to the dataLayer as `{ event: "ykitie_event", event_name: "<name>" }` (same names as in the table above), plus `consent_granted` / `consent_denied`. In GTM, create a Custom Event trigger on `ykitie_event` and use a Data Layer Variable `event_name`.

## Launch waitlist (email collection)

While the store links are placeholders, the Download buttons, the “Start 3-day free trial” button and a “Get launch updates by email” link open a **waitlist form**. It asks for an email, Finnish or Swedish, and iPhone or Android, plus a required consent checkbox. It also records which button opened it.

Signups go to [Formspree](https://formspree.io) (the free plan takes 50 a month). Each one is emailed to you and can be exported as CSV.

**Setup:** create a form on Formspree, copy its ID (the part after `/f/`), set `FORMSPREE_ID` near the top of `assets/app.js`, and push. While it's empty, buttons show a “coming soon” toast and the email link is hidden.

**At launch:** set the real store URLs in the `href` of each `class="store"` link. Buttons with a real link go straight to the store.

## TODO before launch

- Replace the `href="#"` store links (search for `class="store"`) with real App Store / Google Play URLs.
- Use official Apple / Google badge artwork per their brand guidelines.
- Terms page (footer link is still a placeholder).
