# HalalCrave

Find halal restaurants near you in San Diego. A responsive React + TypeScript discovery app with an interactive Google map, search radius, ratings, reviews, routes, cuisine and area filters, and saved favorites.

HalalCrave is a sibling to UCSD Cafe Finder, built on the same Google Maps and Places stack. It starts local: La Jolla and greater San Diego first, done well, before any wider coverage.

## How halal status works

This is the part the app takes seriously. Every restaurant in the offline directory carries one of two labels:

- **Fully halal**: the whole menu is halal, confirmed by the restaurant's own website or menu, a Zabihah listing, or a credible review.
- **Halal options**: only some dishes are halal, and the entry says which ones, for example halal chicken only, or halal beef only.

A place is never labelled fully halal on a guess. If the halal status cannot be verified from a real source, the place is left out of the directory. Live Google Places results are shown as **Halal status not verified** until they are checked, because a text search match is not proof.

Halal status can change, and menus differ by location. Always confirm with the restaurant before visiting, especially for the places marked halal options.

## Important: two operating modes

**Directory preview (no key):** Opens immediately and displays the verified San Diego directory. Pins are **approximate**, opening hours and ratings are not fabricated, and the live Google map is unavailable. Links to Google Maps still work.

**Live Google Places mode (site owner configures once):** Map, nearby and text searches, Google photos, ratings, reviews, opening hours, amenity fields, and on-map directions. Visitors never enter an API key. Google results depend on API coverage and quotas; Google does not guarantee every restaurant is returned.

## Requirements

- Node.js 20+
- A Google Cloud project with billing enabled (only for live mode)

## Google Cloud setup (live mode only)

1. Open https://console.cloud.google.com/ and create/select a project.
2. Configure billing in **Billing**. Google Maps usage may incur charges.
3. In **APIs & Services → Library**, enable **Maps JavaScript API**, **Places API (New)** and **Directions API**. The app uses the Maps JavaScript DirectionsService; depending on the Cloud project, enable the relevant **Directions API (Legacy)** as required for DirectionsService. Google's APIs and billing product names can change.
4. In **APIs & Services → Credentials**, create an API key.
5. Set **Application restrictions → Websites (HTTP referrers)**. Add `http://localhost:5173/*` for development and `https://your-domain.example/*` for production. Do not leave the production key unrestricted.
6. Set **API restrictions** to the Google Maps Platform APIs the application uses. Verify that the Places API (New) and Directions functionality are permitted.
7. Copy `.env.example` to `.env` and replace the sample value with your key:

   ```bash
   cp .env.example .env
   ```

8. Install and run:

   ```bash
   npm install
   npm run dev
   ```

9. Open http://localhost:5173. The app automatically displays Google Maps and live Places when the key and APIs work.

Directory mode needs no key and no billing. If a key is configured but billing is off, the app detects the failed map and falls back to the directory automatically.

## Scripts

- `npm run dev` — local Vite server
- `npm run build` — TypeScript check and production bundle
- `npm run preview` — preview the built bundle

## Deployment

**Vercel:** Import the Git repository, select Vite, set build command `npm run build`, output directory `dist`, and add `VITE_GOOGLE_MAPS_API_KEY` under Environment Variables only if live mode is wanted. Deploy and add the production domain to your key's referrer allowlist. Without the key, the site still works in directory mode.

**Netlify:** Import repository, build command `npm run build`, publish directory `dist`. Add the same environment variable and allowed referrer. Configure an SPA redirect if deploying with client-side routing in future versions.

Vite embeds `VITE_` variables in browser assets. **Browser keys are public identifiers, not secrets**. Restrict by HTTP referrer and API, and set Google Cloud quotas and budgets. Never use an unrestricted server-side key in frontend code.

## Troubleshooting

- **Map says directory mode:** `.env` is missing, blank or dev server not restarted.
- **Map error / `RefererNotAllowedMapError`:** Add the exact localhost/production domain to key restrictions.
- **API denied / missing live results:** Check Places API (New), billing, API restrictions and quota in Google Cloud.
- **Directions unavailable:** Check Directions API enablement, billing and whether the route mode is supported for that origin/destination.
- **Location denied:** Browser falls back to UCSD campus. Geolocation typically requires HTTPS (localhost is an exception).
- **Some restaurants missing:** Google nearby search is capped; the app supplements with text searches but cannot guarantee exhaustive coverage. Try a larger radius.
- **No ratings/reviews:** Google may omit fields for some businesses; the directory never fabricates data.

## Structure

```text
src/
  components/MapView.tsx  Google map, radius, markers, clusters and directions
  components/Details.tsx  Place details, halal status, reviews, hours and navigation
  services/google.ts     Places search, details and short-lived in-memory cache
  services/directory.ts  Offline verified directory (approximate pins)
  types/index.ts         Domain types
  utils/geo.ts           Distances and map links
  App.tsx                Search, filters, favorites and page layout
  styles.css             Responsive light/dark UI
  main.tsx               React entry point
```

## Known limitations / roadmap

- **Not a verified list of every halal restaurant:** The directory is hand verified and grows one checked place at a time. Google Nearby/Text Search results are capped and coverage changes.
- **Halal status is a snapshot:** Menus, suppliers and ownership change. The app labels what was verified and when, and always asks users to confirm with the restaurant.
- **Campus filter is approximate:** Uses a geographic bounding box, not the official UCSD property polygon.
- **Walking times on cards are estimates:** Based on straight-line distance at 3 mph; actual route time appears only after requesting directions.
- **Rating breakdown:** Google Places does not provide star-count distributions; the UI shows the overall rating, not an invented histogram.
- **Mobile bottom sheet:** Slides open/closed but does not implement touch drag-to-resize.
- **Shareable state:** Radius, fully-halal-only filter, and selected restaurant are encoded in the URL; other filters are not.
- **Review policy:** Review text is fetched on demand for the detail panel, not persisted. Keep Google attribution visible and follow current Google Maps Platform policies.
