# Live status / public QA checkpoint — 2026-09-21

Author/Agent: CHATGPT-COORD

## Fixed in this pass

The home card previously used the configured seasonal schedule but labelled the museum “Открыто” for the entire non-Monday day, including outside working hours.

Runtime now:
- evaluates the museum day/time in `Europe/Kaliningrad`, independent of the visitor device timezone;
- reads the canonical `MUSEUM_INFO.openingHours` values;
- parses the configured seasonal opening/closing interval;
- reports `Открыто` only while the current Kaliningrad time is inside that interval;
- reports `Закрыто` outside the interval and on Monday;
- reports `Уточнить` rather than inventing status if a usable schedule is missing.

## Public QA boundary

Fresh automated opens of both:
- `https://vishtynets.ru/`
- `https://yumis84.github.io/vishtynets-eco-museum/`

still fail at the current external fetch-tool boundary. This is not evidence that the sites are down; it means this environment cannot certify deployed-browser behaviour.

Repository-level checks remain green for:
- all direct relative CSS/JS references in `index.html`;
- legacy runtime bundle ordering;
- article-media loader wiring;
- finite-coordinate filtering before Leaflet markers;
- current visitor-hours source-of-truth and live-status logic.

## Completion state

No further repository mutation is justified solely to compensate for the unavailable external browser. The next meaningful QA evidence must come from an actual deployed browser/mobile session or a browser-capable execution environment.
