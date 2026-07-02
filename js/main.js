(function () {
  "use strict";

  // ---------- Sticky header shadow ----------
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Scroll reveal animations ----------
  var revealTargets = document.querySelectorAll(
    ".hero-text, .hero-visual, .about-photo, .about-text, .card, .step, .testimonial, .faq-item, .contact-info, .contact-form, .section-heading"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (index % 3) * 90;
            setTimeout(function () {
              el.classList.add("is-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      var answer = button.nextElementSibling;

      document.querySelectorAll(".faq-question").forEach(function (other) {
        if (other !== button) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      button.setAttribute("aria-expanded", expanded ? "false" : "true");
      answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
    });
  });

  // ---------- Contact form (client-side only demo) ----------
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = "Bitte füllen Sie alle Pflichtfelder korrekt aus.";
        status.className = "form-status error";
        return;
      }

      status.textContent = "Danke für Ihre Nachricht! Ich melde mich zeitnah bei Ihnen zurück.";
      status.className = "form-status success";
      form.reset();
    });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
