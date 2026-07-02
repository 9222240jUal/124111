#!/usr/bin/env python3
"""Bundle index.html + css/style.css + js/main.js + assets/*.png + the legal
pages (impressum.html, datenschutz.html) into one self-contained HTML file:
kuhring-stillberatung-single.html

Run after editing the source files (index.html, css/style.css, js/main.js,
impressum.html, datenschutz.html) to regenerate the single-file version:

    python3 build-single-file.py
"""
import re
import base64

def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

def b64_img(path, mime="image/png"):
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode("ascii")
    return f"data:{mime};base64,{data}"

def extract_main(html):
    m = re.search(r'<main class="container legal-page">(.*?)</main>', html, re.S)
    return m.group(1)

def build():
    index = read("index.html")
    css = read("css/style.css")
    js = read("js/main.js")
    impressum = read("impressum.html")
    datenschutz = read("datenschutz.html")

    logo_mark = b64_img("assets/logo-mark.png")
    logo_mark_cream = b64_img("assets/logo-mark-cream.png")
    logo_full = b64_img("assets/logo-full.png")

    index = index.replace("assets/logo-mark-cream.png", logo_mark_cream)
    index = index.replace("assets/logo-mark.png", logo_mark)
    index = index.replace("assets/logo-full.png", logo_full)

    index = index.replace(
        '<link rel="stylesheet" href="css/style.css">',
        f"<style>\n{css}\n</style>",
    )
    index = index.replace(
        '<script src="js/main.js"></script>',
        f"<script>\n{js}\n</script>",
    )

    impressum_body = extract_main(impressum)
    datenschutz_body = extract_main(datenschutz)

    back_link_re = r'\s*<a href="index\.html" class="back-link">.*?</a>\s*'
    impressum_body = re.sub(back_link_re, "\n  ", impressum_body, flags=re.S)
    datenschutz_body = re.sub(back_link_re, "\n  ", datenschutz_body, flags=re.S)

    legal_sections = f'''
  <!-- IMPRESSUM -->
  <section class="section legal-section" id="impressum">
    <div class="container legal-page">
      {impressum_body.strip()}
    </div>
  </section>

  <!-- DATENSCHUTZ -->
  <section class="section section-alt legal-section" id="datenschutz">
    <div class="container legal-page">
      {datenschutz_body.strip()}
    </div>
  </section>
'''

    index = index.replace("</main>", legal_sections + "\n</main>")
    index = index.replace('href="impressum.html"', 'href="#impressum"')
    index = index.replace('href="datenschutz.html"', 'href="#datenschutz"')

    out_path = "kuhring-stillberatung-single.html"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(index)
    print(f"Wrote {out_path} ({len(index):,} bytes)")

if __name__ == "__main__":
    build()
