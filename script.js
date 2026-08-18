/* ===================================================================
   CARLOS MARTÍNEZ — PORTFOLIO
   JavaScript vanilla — sin dependencias externas
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================
     1. NAVBAR :: cambio de fondo al hacer scroll
     ============================================ */
  const navbar = document.getElementById("navbar");

  const handleNavbarScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };
  if (navbar) {
    handleNavbarScroll();
    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  }

  /* ============================================
     2. NAVBAR :: menú móvil
     ============================================ */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú",
      );
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Cerrar el menú al elegir una opción
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ============================================
     3. REVEAL ON SCROLL
     Anima los elementos marcados con [data-reveal]
     cuando entran al viewport.
     ============================================ */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: si no hay soporte, mostrar todo de inmediato
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ============================================
     4. CONTADOR ANIMADO :: sección de métricas
     ============================================ */
  const counters = document.querySelectorAll("[data-counter]");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400; // ms
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic para una desaceleración elegante
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = el.dataset.target;
    });
  }

  /* ============================================
     5. FORMULARIO DE CONTACTO
     Validación básica + estado simulado de envío.
     (Conectar a un backend o servicio de email real
     en producción, p. ej. Formspree, Resend, etc.)
     ============================================ */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    const emailJsAvailable = typeof emailjs !== "undefined";

    if (emailJsAvailable) {
      emailjs.init({
        publicKey: "AX-rGwetu0hgfosF5",
      });
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        showFormStatus("Por favor completa todos los campos.", "error");
        return;
      }

      if (!emailPattern.test(email)) {
        showFormStatus("Ingresa un correo electrónico válido.", "error");
        return;
      }

      if (!emailJsAvailable) {
        showFormStatus(
          "El envío no está disponible ahora. Escríbeme por WhatsApp.",
          "error",
        );
        return;
      }

      const submitBtn = contactForm.querySelector(".contact-form__submit");
      const btnText = submitBtn.querySelector(".btn__text");
      const originalText = btnText.textContent;

      submitBtn.disabled = true;
      btnText.textContent = "Enviando...";

      emailjs
        .sendForm("service_5hl7ybl", "template_zqq55hr", contactForm)
        .then(() => {
          showFormStatus(
            "¡Mensaje enviado! Te responderé muy pronto.",
            "success",
          );
          contactForm.reset();
          sendGAEvent("formulario_enviado", {
            metodo: "emailjs",
            page: location.pathname,
          });
        })
        .catch((error) => {
          console.error(error);
          showFormStatus("Ocurrió un error al enviar el mensaje.", "error");
        })
        .finally(() => {
          submitBtn.disabled = false;
          btnText.textContent = originalText;
        });
    });
  }

  function showFormStatus(text, type) {
    if (!formStatus) return;

    formStatus.textContent = text;
    formStatus.classList.remove("is-success", "is-error");
    formStatus.classList.add(type === "success" ? "is-success" : "is-error");
  }

  /* ============================================
     6. PORTAFOLIO :: filtros por categoría
     (solo aplica si existen estos elementos en la página)
     ============================================ */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  if (filterButtons.length && portfolioCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        portfolioCards.forEach((card) => {
          const categories = card.dataset.category || "";
          const matches = filter === "todos" || categories.includes(filter);
          card.classList.toggle("is-hidden", !matches);
        });
      });
    });
  }

  /* ============================================
     7. AVISO DE COOKIES
     Muestra el banner de consentimiento si el
     usuario aún no ha decidido y aplica la
     decisión al modo de consentimiento de gtag
     (Google Analytics).
     ============================================ */
  const COOKIE_CONSENT_KEY = "cmw_cookie_consent";

  const getStoredConsent = () => {
    try {
      return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch (e) {
      return null;
    }
  };

  const setStoredConsent = (value) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch (e) {
      /* almacenamiento no disponible */
    }
  };

  const applyConsent = (decision) => {
    if (typeof gtag !== "function") return;
    const granted = decision === "accepted";
    gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      personalization_storage: granted ? "granted" : "denied",
    });
  };

  const getPrivacyUrl = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    let depth = 0;
    if (parts.length) {
      const last = parts[parts.length - 1];
      // Páginas de proyectos con URL tipo /proyectos/xxx/ (sin archivo)
      depth = /\.html?$/i.test(last) ? parts.length - 1 : parts.length;
    }
    return "../".repeat(depth) + "aviso-de-privacidad.html";
  };

  const showCookieBanner = () => {
    const privacyUrl = getPrivacyUrl();

    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Aviso de uso de cookies");

    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
      '<button type="button" class="cookie-banner__close" data-cookie-action="accepted" aria-label="Cerrar y aceptar cookies">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      "</button>" +
      '<div class="cookie-banner__content">' +
      '<p class="cookie-banner__title">Este sitio usa cookies</p>' +
      '<p class="cookie-banner__text">' +
      'Uso cookies de analítica (Google Analytics) para medir y mejorar la ' +
      'experiencia del sitio. Puedes aceptarlas o rechazarlas. Conoce más en el ' +
      '<a href="' +
      privacyUrl +
      '" class="cookie-banner__link">aviso de privacidad y cookies</a>.' +
      "</p>" +
      "</div>" +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--ghost" data-cookie-action="rejected">Rechazar</button>' +
      '<button type="button" class="cookie-banner__btn cookie-banner__btn--primary" data-cookie-action="accepted">Aceptar</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(banner);

    // Entrada suave en el siguiente frame
    requestAnimationFrame(() => banner.classList.add("is-visible"));

    banner.querySelectorAll("[data-cookie-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const decision = btn.dataset.cookieAction;
        setStoredConsent(decision);
        applyConsent(decision);
        banner.classList.remove("is-visible");
        setTimeout(() => banner.remove(), 400);
      });
    });
  };

  const storedConsent = getStoredConsent();
  if (storedConsent === "accepted" || storedConsent === "rejected") {
    applyConsent(storedConsent);
  } else {
    showCookieBanner();
  }

  /* ============================================
     8. GOOGLE ANALYTICS :: eventos personalizados
     ============================================ */
  const sendGAEvent = (eventName, params = {}) => {
    if (typeof gtag === "function") {
      gtag("event", eventName, params);
    }
  };

  // Cualquier enlace a WhatsApp (flotante, CTAs, planes y proyectos)
  document.addEventListener("click", (e) => {
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      sendGAEvent("Envio_de_WhatsApp", {
        source: waLink.className || "enlace",
        page: location.pathname,
      });
    }
  });
});