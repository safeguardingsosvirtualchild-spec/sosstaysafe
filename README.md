# SOS StaySafe website

A static website for young people about staying safe, their rights, preventing and reporting abuse, cyber safeguarding, and fairness and integrity. It is published by SOS Children's Villages and hosted on GitHub Pages.

- **Address (when the domain is connected):** https://sos-staysafe.com
- **Languages:** English, Spanish, French, Arabic (right to left), Portuguese, Russian
- **Reporting channel (used on every page):** https://soscvi.speakup.report/en-GB/databreach/home

## Files

| File | What it is |
|---|---|
| `index.html`, `your-rights.html`, `preventing-abuse.html`, `reporting-abuse.html`, `cyber-safeguarding.html`, `fairness-integrity.html`, `privacy-policy.html` | The seven pages. Each page holds its own English text in the HTML and its translations near the bottom, in `window.STAYSAFE_PAGE = { translations: {...} }`. |
| `site.css` | The shared design for every page: colours, type, header, footer and the assistant. |
| `site.js` | The shared behaviour for every page. It handles the language choice, the menu, the videos, the motion switch, the "Ask SOS StaySafe" assistant and offline use. It also holds the translations for the menu, footer and interface text (`SHARED`). |
| `assistant.json` | The answers for "Ask SOS StaySafe", taken from the pages' own text in six languages. See `CHATBOT.md`. |
| `manifest.webmanifest`, `sw.js`, `offline.html` | Let people add the site to their phone's home screen and read pages they have opened before without internet. |
| `404.html` | The page shown for addresses that don't exist, including old WordPress addresses. |
| `Images/`, `Videos/` | All pictures and the header videos (`<page>-banner-<language>.mp4`). |
| `CHATBOT.md` | How the assistant works and what is needed before connecting an AI service. |

## How the language is chosen

1. `?lang=xx` in the address (for example `index.html?lang=fr`).
2. Otherwise, the language the visitor chose before on this site. This is the only thing the site saves: `sos-staysafe-lang` in the browser.
3. Otherwise, the visitor's browser languages.
4. Otherwise, English.

If a text has no translation yet, it is shown in English and marked as English for screen readers.

## Common changes

### Change a sentence

1. Open the page and find the sentence. It has a `data-i18n="key"` attribute.
2. Change the English in the HTML.
3. Find the same `"key"` in that page's `translations` (once for each of `es`, `fr`, `ar`, `pt`, `ru`) and update each language.
4. Menu, footer and button text appear on every page. Change those in `site.js`: the `SHARED` block for translations and the `ENGLISH` block for English. Also change the English in the HTML of all seven pages.
5. If the sentence is also an assistant answer, update it in `assistant.json` (under `entries` → `answer` → language).

### Publish any change (important for phones)

Phones that added the site keep a saved copy. To make them fetch your changes:

- Replace the date `2026-11-25` with today's date **everywhere it appears**:
  - in all `.html` files (`site.css?v=...` and `site.js?v=...`);
  - in `sw.js` (`VERSION` and the two `?v=` lines).
- Use the same new date in every place.

### Add or change an image

- Keep the file name and size if you can. Upload to `Images/` with the same name.
- If an image is new and shown on a page, add it to the `PRECACHE` list in `sw.js` only if it is small (under about 100 KB). Large images and all videos are not saved for offline use, on purpose.

## Rules for this site

- No cookies, analytics, tracking or advertising tools.
- No forms that collect personal information. Reports go to SOS SpeakUp only.
- Do not put passwords, API keys or tokens in any file in this repository. Everything here is public.
- Use only the official SpeakUp address above. Do not add other reporting contacts unless the safeguarding team approves them.
- Any change to safety messages (in `assistant.json` → `messages`) needs safeguarding approval.
- Test before publishing to the live domain: check every page in two languages (one of them Arabic) and on a phone.

## Accessibility

- The site aims to meet WCAG 2.1 AA.
- It uses the shared skip link, keyboard-reachable menus, touch targets of at least 44 px, and a pause button for motion.
- When the visitor's device asks for reduced motion, header videos don't load and animated pictures are shown still.
- With data saver on, the videos and the animated illustrations are skipped.
- Keep these features when editing.
