# Kuhring Stillberatung

Statische Landingpage für Birgit Kuhring (Stillberatung, Bindung, frühe
Kindheit und Kleinkindentwicklung). Reines HTML/CSS/JS, kein Build-Prozess
nötig.

## Struktur

- `index.html` – Startseite (Hero, Über mich, Leistungen, Preise, Ablauf, Stimmen, FAQ, Kontakt)
- `impressum.html`, `datenschutz.html` – rechtliche Seiten (Platzhaltertexte, müssen vor Veröffentlichung ersetzt werden)
- `css/style.css` – Styles
- `js/main.js` – mobiles Menü, Scroll-/Parallax-Animationen, FAQ-Akkordeon, Kontaktformular
- `assets/` – Logo (Icon- und Vollversion, aus dem Instagram-Auftritt extrahiert und freigestellt)
- `kuhring-stillberatung-single.html` – **Alles-in-einer-Datei-Version**: CSS, JS und Logos sind inline eingebettet, Impressum/Datenschutz sind Abschnitte auf derselben Seite. Ideal zum einfachen Hochladen/Weitergeben ohne Ordnerstruktur.
- `build-single-file.py` – erzeugt `kuhring-stillberatung-single.html` neu aus den Quelldateien (`python3 build-single-file.py` nach Änderungen ausführen)

## Lokal ansehen

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Vor dem Livegang anpassen

- Echte Adresse und Öffnungszeiten in `index.html` (Abschnitt `#kontakt`) sowie im Impressum eintragen (Telefon, E-Mail und Instagram sind bereits echt hinterlegt)
- Platzhaltertexte in `impressum.html` / `datenschutz.html` (bzw. den entsprechenden Abschnitten in der Single-File-Version) durch rechtsgeprüfte Inhalte ersetzen
- Echtes Foto von Birgit Kuhring anstelle des „BK“-Platzhalters einbinden (`.photo-frame` im Abschnitt „Über mich“)
- Beispiel-Testimonials durch echtes Kundenfeedback ersetzen
- Das Kontaktformular sendet bereits per FormSubmit.co an `info@kuhring-stillberatung.de`. **Beim ersten eingehenden Testformular schickt FormSubmit eine Bestätigungsmail an diese Adresse – der Link darin muss einmal angeklickt werden**, sonst kommen keine weiteren Nachrichten an.
