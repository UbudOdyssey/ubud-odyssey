document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.getElementById("page-loader");
  const heroImage = document.querySelector(".hero-media");

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navigationItems = document.querySelectorAll(".nav-links a");

  const faqItems = document.querySelectorAll(".faq-item");
  const yearElement = document.getElementById("current-year");

  /* =========================
     LOADING SCREEN
  ========================== */

  let loaderHidden = false;

  function hideLoader() {
    if (loaderHidden) {
      return;
    }

    loaderHidden = true;

    if (heroImage) {
      heroImage.classList.add("is-loaded");
    }

    setTimeout(() => {
      body.classList.remove("page-loading");

      if (loader) {
        loader.setAttribute("aria-hidden", "true");
      }
    }, 180);
  }

  if (heroImage) {
    if (heroImage.complete && heroImage.naturalWidth > 0) {
      hideLoader();
    } else {
      heroImage.addEventListener("load", hideLoader, {
        once: true
      });

      heroImage.addEventListener(
        "error",
        () => {
          console.warn("Hero image could not be loaded.");
          hideLoader();
        },
        {
          once: true
        }
      );
    }
  } else {
    hideLoader();
  }

  window.addEventListener("load", hideLoader, {
    once: true
  });

  /* Pengaman agar loading tidak pernah macet */
  setTimeout(hideLoader, 2500);

  /* =========================
     MOBILE MENU
  ========================== */

  function closeMenu() {
    if (!hamburger || !navLinks) {
      return;
    }

    hamburger.classList.remove("active");
    navLinks.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!hamburger || !navLinks) {
      return;
    }

    hamburger.classList.add("active");
    navLinks.classList.add("active");

    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

    body.classList.add("menu-open");
  }

  function toggleMenu() {
    if (!navLinks) {
      return;
    }

    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", toggleMenu);

    navigationItems.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedNavigation =
        navLinks.contains(event.target);

      const clickedHamburger =
        hamburger.contains(event.target);

      if (!clickedNavigation && !clickedHamburger) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  /* =========================
     FAQ
  ========================== */

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });
    });
  });

  /* =========================
     COPYRIGHT YEAR
  ========================== */

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }
});

/* =========================================================
   UBUD ODYSSEY — WHATSAPP CONVERSION TRACKING
   GA4: G-KZEE7SNSSL
   Event: whatsapp_click
   ========================================================= */

(function () {

  const MEASUREMENT_ID = 'G-KZEE7SNSSL';

  // =========================
  // GOOGLE ANALYTICS
  // =========================

  window.dataLayer = window.dataLayer || [];

  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  const existingGoogleTag = document.querySelector(
    'script[src*="googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID + '"]'
  );

  if (!existingGoogleTag) {

    const googleTag = document.createElement('script');

    googleTag.async = true;

    googleTag.src =
      'https://www.googletagmanager.com/gtag/js?id=' +
      MEASUREMENT_ID;

    document.head.appendChild(googleTag);

    gtag('js', new Date());

    gtag('config', MEASUREMENT_ID);

  }


  // =========================
  // SEND WHATSAPP EVENT
  // =========================

  function sendWhatsAppEvent(source, linkUrl, linkText) {

    if (typeof window.gtag !== 'function') return;

    gtag('event', 'whatsapp_click', {

      source: source || 'website',

      link_url: linkUrl || '',

      link_text:
        (linkText || '')
        .trim()
        .slice(0, 100),

      page_path:
        window.location.pathname,

      page_title:
        document.title

    });

  }


  // =========================
  // TRACK WHATSAPP LINKS
  // =========================

  document.addEventListener('click', function (event) {

    if (
      !event.target ||
      typeof event.target.closest !== 'function'
    ) {
      return;
    }

    const link = event.target.closest(
      'a[href*="wa.me/"],' +
      'a[href*="api.whatsapp.com/"],' +
      'a[href*="whatsapp.com/"]'
    );

    if (!link) return;

    sendWhatsAppEvent(

      'whatsapp_link',

      link.href,

      link.textContent ||
      link.getAttribute('aria-label') ||
      'WhatsApp'

    );

  });


  // =========================
  // TRACK CONTACT FORM
  // =========================

  document.addEventListener('submit', function (event) {

    if (
      event.target &&
      event.target.id === 'contactForm'
    ) {

      sendWhatsAppEvent(

        'contact_form',

        'https://wa.me/6281337780066',

        'Contact Form to WhatsApp'

      );

    }

  });

})();