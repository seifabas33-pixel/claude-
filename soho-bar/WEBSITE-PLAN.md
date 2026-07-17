# Soho Bar Port Ghalib — Website Project Plan

Goal: a full website for Soho Bar with all information, all services, and **online guest reservations**.
Data source: `RESEARCH.md` (dossier) and `data.json` (structured, ready to power the pages).

## Site map

1. **Home / Hero** — night shot of the marina terrace, "SOHO BAR — Tapas & Grill · Port Ghalib Marina", tagline, ★5.0 TripAdvisor #1 badge, primary CTA "Reserve a Table", secondary CTA "See the Menu".
2. **Our Story** — the brand story (European soul, Mediterranean tapas bars, lounge culture).
3. **Menu** — tabs: From the Grill / Tapas / Pizzas / Vegan / Bar & Cocktails. Signature call-outs: camel steak, fried squid, Neapolitan pizza. (Prices pending from owner.)
4. **Services & Entertainment** — free hotel transportation with reservation, live football & F1 on multiple screens, free billiards, bottomless brunch, date-night tapas tasting, lounge music, waterfront seating.
5. **Gallery** — food, cocktails, venue, marina views (need owner photos; Instagram embed as interim).
6. **Reviews** — score badges (TripAdvisor 5.0 · Google 4.9 · Restaurant Guru 5.0) + rotating quotes.
7. **Reservations** — the core feature (below).
8. **Find Us** — map of Port Ghalib Marina next to Marina Residence Suites, "5 minutes from Marsa Alam International Airport", opening hours, phone/WhatsApp/email, socials.
9. **Footer** — contact, hours, social links, language switcher.

## Reservation flow (v1 — no backend needed)

Form fields: name · phone or WhatsApp · date · time · party size · hotel/resort (for **free pick-up**) · special requests (birthday, vegan, terrace…).

On submit, generate a pre-filled **WhatsApp deep link** to the bar's booking number
(`https://wa.me/201065367667?text=...` with all form details) — this matches exactly how
Soho Bar takes bookings today (WhatsApp/Instagram), works with zero server cost, and the
staff confirm in chat. Optionally also `mailto:` fallback to bar@sohobaregypt.com.

**v2 upgrade path:** form posts to a small backend (or a service like a Google Form/Sheet,
Formspree, or a booking widget) with email + WhatsApp notification, then later a real
availability calendar if the owner wants automatic confirmation.

## Languages

Tourist base is European — launch **English**, then German and Italian (structure copy in JSON dictionaries from day one).

## Tech

Static site (HTML/CSS/JS) consistent with this repo — fast, hostable on GitHub Pages (CNAME already present), no server required for v1. All content read from `soho-bar/data.json` or baked in at build time. Mobile-first (guests browse from phones at the marina), JSON-LD `Restaurant` schema for SEO with hours/geo/ratings.

## Blockers awaiting owner input

Menu with prices · high-res photos & logo · confirmed hours · reservation policy (party size, cancellation, pick-up zones) · events calendar · booking contact for form notifications.
