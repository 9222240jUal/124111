# Kuhring Stillberatung

Statische Landingpage für Birgit Kuhring (Stillberatung, Bindung, frühe
Kindheit und Kleinkindentwicklung). Reines HTML/CSS/JS, kein Build-Prozess
nötig.

## Struktur

- `index.html` – Startseite (Hero, Über mich, Leistungen, Ablauf, Stimmen, FAQ, Kontakt)
- `impressum.html`, `datenschutz.html` – rechtliche Seiten (Platzhaltertexte, müssen vor Veröffentlichung ersetzt werden)
- `css/style.css` – Styles
- `js/main.js` – mobiles Menü, Scroll-Animationen, FAQ-Akkordeon, Kontaktformular (Client-seitig, ohne Backend)

## Lokal ansehen

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Vor dem Livegang anpassen

- Echte Kontaktdaten, Adresse und Öffnungszeiten in `index.html` (Abschnitt `#kontakt`) sowie im Impressum eintragen
- Platzhaltertexte in `impressum.html` und `datenschutz.html` durch rechtsgeprüfte Inhalte ersetzen
- Foto von Birgit Kuhring anstelle des Platzhalter-Kreises einbinden (`.hero-photo-placeholder`, `.photo-frame`)
- Beispiel-Testimonials durch echtes Kundenfeedback ersetzen
- Kontaktformular an ein Backend oder einen Formular-Dienst (z. B. Formspree) anbinden, damit Nachrichten tatsächlich ankommen
