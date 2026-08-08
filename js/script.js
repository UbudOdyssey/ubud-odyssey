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