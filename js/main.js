(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    ".hero-text, .hero-visual, .about-photo, .about-text, .card, .step, .price-card, .testimonial, .faq-item, .contact-info, .contact-form, .section-heading"
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

  // ---------- Parallax on scroll ----------
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  if (parallaxEls.length && !reducedMotion) {
    var ticking = false;

    function updateParallax() {
      var viewportH = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
        var rect = el.getBoundingClientRect();
        var centerOffset = rect.top + rect.height / 2 - viewportH / 2;
        var translateY = centerOffset * speed * -1;
        el.style.transform = "translateY(" + translateY.toFixed(1) + "px)";
      });
      ticking = false;
    }

    function requestParallaxUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    requestParallaxUpdate();
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

  // ---------- Contact form (FormSubmit.co via AJAX) ----------
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

      var submitBtn = form.querySelector("button[type=submit]");
      var actionUrl = form.getAttribute("action").replace(
        "https://formsubmit.co/",
        "https://formsubmit.co/ajax/"
      );

      submitBtn.disabled = true;
      status.textContent = "Ihre Nachricht wird gesendet …";
      status.className = "form-status";

      fetch(actionUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Versand fehlgeschlagen");
          status.textContent = "Danke für Ihre Nachricht! Ich melde mich zeitnah bei Ihnen zurück.";
          status.className = "form-status success";
          form.reset();
        })
        .catch(function () {
          status.textContent =
            "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt per E-Mail.";
          status.className = "form-status error";
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

  // ---------- Footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
