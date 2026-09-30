(() => {
  "use strict";

  const WA = "33695198679";
  const wa = message => `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;
  const state = { language: localStorage.getItem("keurdia-lang") === "en" ? "en" : "fr" };

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const header = document.getElementById("header");
  const menu = document.getElementById("sideMenu");
  const backdrop = document.getElementById("menuBackdrop");
  const toggle = document.getElementById("menuToggle");
  const close = document.getElementById("menuClose");

  const setMenu = open => {
    if (!menu) return;
    menu.classList.toggle("open", open);
    backdrop?.classList.toggle("open", open);
    document.body.classList.toggle("lock", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle?.setAttribute("aria-expanded", String(open));
    if (open) close?.focus();
  };

  toggle?.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  close?.addEventListener("click", () => setMenu(false));
  backdrop?.addEventListener("click", () => setMenu(false));
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 30), { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const target = a.getAttribute("href");
    if (!target || target === "#") return;
    const el = document.querySelector(target);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }));

  const reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        io.unobserve(entry.target);
      }
    }), { rootMargin: "0px 0px -8% 0px" });
    reveal.forEach(node => io.observe(node));
  } else {
    reveal.forEach(node => node.classList.add("active"));
  }

  const translationHtml = new Map([
    ["Menu", "Menu"],
    ["Résidence premium · Dakar", "Premium residence · Dakar"],
    ["Accueil", "Home"],
    ["Appartements", "Apartments"],
    ["Expérience", "Experience"],
    ["Contact", "Contact"],
    ["Réserver sur WhatsApp", "Book on WhatsApp"],
    ["Nos espaces", "Our spaces"],
    ["13 appartements", "13 apartments"],
    ["Chaque page ne charge qu'une seule photo au départ. La galerie charge une photo à la fois.", "Each page loads one photo initially. The gallery loads one photo at a time."],
    ["Découvrir les appartements", "Discover the apartments"],
    ["Réserver", "Book now"],
    ["Confort & élégance", "Comfort & elegance"],
    ["Bienvenue chez Keur Dia", "Welcome to Keur Dia"],
    ["Un lieu pensé pour vous", "A place designed for you"],
    ["Keur Ndeye Anta Dia vous accueille dans une résidence pensée pour offrir confort, élégance et sérénité au cœur de Dakar.", "Keur Ndeye Anta Dia welcomes you to a residence designed for comfort, elegance and serenity in the heart of Dakar."],
    ["Nos appartements portent les noms des grandes régions historiques du Sénégal.", "Our apartments are named after Senegal's great historic regions."],
    ["Appartements", "Apartments"],
    ["Hospitalité", "Hospitality"],
    ["Explorer les appartements", "Explore the apartments"],
    ["13 univers, une seule adresse", "13 worlds, one address"],
    ["Une sélection de résidences pour vos séjours à Dakar.", "A selection of residences for your stays in Dakar."],
    ["Appartement", "Apartment"],
    ["Découvrir", "Discover"],
    ["Voir les 13 appartements", "See all 13 apartments"],
    ["Votre prochaine adresse", "Your next address"],
    ["Prêt à découvrir Keur Dia ?", "Ready to discover Keur Dia?"],
    ["Contactez-nous directement pour connaître nos disponibilités.", "Contact us directly for availability."],
    ["Une adresse élégante où l'hospitalité sénégalaise rencontre le confort contemporain.", "An elegant address where Senegalese hospitality meets contemporary comfort."],
    ["Votre séjour", "Your stay"],
    ["Choisissez votre appartement", "Choose your apartment"],
    ["Voir les appartements", "View apartments"],
    ["L'expérience Keur Dia", "The Keur Dia experience"],
    ["Plus qu'un séjour,", "More than a stay,"],
    ["une sensation.", "a feeling."],
    ["Le confort moderne rencontre l'âme et l'hospitalité du Sénégal.", "Modern comfort meets the soul and hospitality of Senegal."],
    ["Des espaces pensés pour vous", "Spaces designed for you"],
    ["Des espaces soignés jusque dans les moindres détails.", "Thoughtful spaces down to the smallest detail."],
    ["Tout ce qu'il faut pour vous sentir immédiatement chez vous.", "Everything you need to feel at home right away."],
    ["Une attention portée à chaque moment de votre séjour.", "Care devoted to every moment of your stay."],
    ["Élégance", "Elegance"],
    ["Confort", "Comfort"],
    ["Hospitalité sénégalaise", "Senegalese hospitality"],
    ["Une résidence au rythme de Dakar, pensée pour des séjours agréables et sereins.", "A Dakar residence designed for pleasant, peaceful stays."],
    ["Votre demande est préparée directement dans WhatsApp.", "Your request is prepared directly in WhatsApp."],
    ["Disponibilités", "Availability"],
    ["Une réponse directe", "A direct response"],
    ["Remplissez les informations ci-dessous. Votre demande est envoyée dans votre conversation WhatsApp.", "Fill in the details below. Your request is sent to your WhatsApp conversation."],
    ["Prénom *", "First name *"],
    ["Nom *", "Last name *"],
    ["Téléphone *", "Phone *"],
    ["Email *", "Email *"],
    ["Appartement *", "Apartment *"],
    ["Arrivée *", "Arrival *"],
    ["Départ *", "Departure *"],
    ["Message", "Message"],
    ["Choisir", "Choose"],
    ["Peu importe", "Any apartment"],
    ["Envoyer sur WhatsApp →", "Send on WhatsApp →"],
    ["WhatsApp s'ouvre avec votre demande préremplie.", "WhatsApp opens with your pre-filled request."],
    ["Demande préparée.", "Request prepared."],
    ["Prénom requis.", "First name is required."],
    ["Nom requis.", "Last name is required."],
    ["Téléphone requis.", "Phone is required."],
    ["Email invalide.", "Invalid email."],
    ["Choisissez un appartement.", "Choose an apartment."],
    ["Date requise.", "Date is required."],
    ["Nombre de personnes, demande particulière...", "Number of guests, special request..."],
    ["Bonjour Keur Ndeye Anta Dia, je souhaite connaître vos disponibilités et tarifs.", "Hello Keur Ndeye Anta Dia, I would like to know your availability and rates."],
    ["Bonjour Keur Ndeye Anta Dia, je souhaite faire une demande de réservation.", "Hello Keur Ndeye Anta Dia, I would like to request a booking."],
    ["Nom :", "Last name:"],
    ["Prénom :", "First name:"],
    ["Tél :", "Phone:"],
    ["Résidence :", "Apartment:"],
    ["Arrivée :", "Arrival:"],
    ["Départ :", "Departure:"],
    ["Message :", "Message:"],
    ["Aucun message supplémentaire", "No additional message"],
    ["Voir la galerie →", "View gallery →"],
    ["Galerie", "Gallery"],
    ["Photo indisponible.", "Photo unavailable."],
    ["photos", "photos"],
    ["photo chargée", "photo loaded"],
    ["Fermer", "Close"],
    ["Précédente", "Previous"],
    ["Suivante", "Next"],
    ["Un espace élégant et chaleureux pensé pour un séjour confortable.", "An elegant, welcoming space designed for a comfortable stay."],
    ["Une atmosphère raffinée associant modernité et authenticité.", "A refined atmosphere combining modernity and authenticity."],
    ["Un cocon contemporain avec une identité élégante et chaleureuse.", "A contemporary cocoon with an elegant, welcoming identity."],
    ["Un espace lumineux offrant une expérience douce et reposante.", "A bright space offering a gentle, restful experience."],
    ["Une ambiance élégante inspirée par les richesses du patrimoine sénégalais.", "An elegant atmosphere inspired by Senegal's rich heritage."],
    ["Un cadre confortable pour profiter pleinement de votre séjour.", "A comfortable setting to make the most of your stay."],
    ["Un univers apaisant où chaque détail invite à la détente.", "A peaceful world where every detail invites relaxation."],
    ["Une atmosphère chaleureuse entre élégance, confort et caractère.", "A warm atmosphere combining elegance, comfort and character."],
    ["Un espace moderne et accueillant pour vivre Dakar autrement.", "A modern, welcoming space for experiencing Dakar differently."],
    ["Un cadre de caractère qui mêle authenticité et confort contemporain.", "A distinctive setting blending authenticity with contemporary comfort."],
    ["Une parenthèse élégante conçue pour votre bien-être.", "An elegant pause designed for your wellbeing."],
    ["Un espace pensé pour offrir sérénité, intimité et confort.", "A space designed to offer serenity, privacy and comfort."],
    ["Notre nouvelle adresse, pensée comme une expérience élégante, moderne et chaleureuse.", "Our newest address, designed as an elegant, modern and welcoming experience."]
  ]);

  const complexTranslations = new Map([
    ["Un lieu pensé pour vous", "Un lieu pensé pour <em>vous</em>"],
    ["13 univers, une seule adresse", "13 worlds, <em>one address</em>"],
    ["Prêt à découvrir Keur Dia ?", "Ready to discover <em>Keur Dia</em>?"],
    ["Choisissez votre appartement", "Choose your <em>apartment</em>"],
    ["Une réponse directe", "A direct <em>response</em>"],
    ["Réservez votre expérience", "Book your <em>experience</em>"],
    ["Plus qu'un séjour, une sensation.", "More than a stay,<br><em>a feeling.</em>"],
    ["Choisissez votre appartement →", "Choose your apartment →"],
    ["Voir les appartements →", "View apartments →"],
    ["Explorer les appartements →", "Explore the apartments →"],
    ["Voir la galerie →", "View gallery →"],
    ["Ouvrir →", "Open →"]
  ]);

  const originalNodes = new Map();
  const complexOriginals = new Map();
  document.querySelectorAll("body *:not(script):not(style)").forEach(el => {
    if (el.children.length === 0 && el.textContent.trim()) originalNodes.set(el, el.innerHTML);
  });

  document.querySelectorAll("h1,h2,h3,h4,a,button").forEach(el => {
    if (el.children.length > 0) complexOriginals.set(el, el.innerHTML);
  });

  const originalAttrs = new Map();
  document.querySelectorAll("input,textarea,button,a,[aria-label]").forEach(el => {
    const attrs = {};
    ["placeholder", "aria-label", "title"].forEach(name => {
      if (el.hasAttribute(name)) attrs[name] = el.getAttribute(name);
    });
    if (Object.keys(attrs).length) originalAttrs.set(el, attrs);
  });

  const pageCopy = {
    "/": {
      title: ["Keur Ndeye Anta Dia — Résidence Premium à Dakar", "Keur Ndeye Anta Dia — Premium Residence in Dakar"],
      description: ["Keur Ndeye Anta Dia, résidence premium à Dakar.", "Keur Ndeye Anta Dia, premium residence in Dakar."]
    },
    "/index.html": {
      title: ["Keur Ndeye Anta Dia — Résidence Premium à Dakar", "Keur Ndeye Anta Dia — Premium Residence in Dakar"],
      description: ["Keur Ndeye Anta Dia, résidence premium à Dakar.", "Keur Ndeye Anta Dia, premium residence in Dakar."]
    },
    "/appartements.html": {
      title: ["Appartements — Keur Ndeye Anta Dia", "Apartments — Keur Ndeye Anta Dia"],
      description: ["Les 13 appartements de Keur Ndeye Anta Dia à Dakar.", "The 13 apartments of Keur Ndeye Anta Dia in Dakar."]
    },
    "/experience.html": {
      title: ["Expérience — Keur Ndeye Anta Dia", "Experience — Keur Ndeye Anta Dia"],
      description: ["L'expérience Keur Ndeye Anta Dia à Dakar.", "The Keur Ndeye Anta Dia experience in Dakar."]
    },
    "/contact.html": {
      title: ["Réservation — Keur Ndeye Anta Dia", "Booking — Keur Ndeye Anta Dia"],
      description: ["Réserver un appartement à Keur Ndeye Anta Dia à Dakar.", "Book an apartment at Keur Ndeye Anta Dia in Dakar."]
    }
  };

  function originalText(el) {
    return (originalNodes.get(el) || el.innerHTML || el.textContent).trim();
  }

  function translateSource(source) {
    if (translationHtml.has(source)) return translationHtml.get(source);
    const apartmentNumber = source.match(/^Appartement (\d+)$/);
    if (apartmentNumber) return `Apartment ${apartmentNumber[1]}`;
    const loaded = source.match(/^(\d+) photo chargée$/);
    if (loaded) return `${loaded[1]} photo loaded`;
    return null;
  }

  function translateContent(language) {
    originalNodes.forEach((html, el) => {
      const source = html.replace(/<[^>]+>/g, "").trim();
      const translated = translateSource(source);
      if (!translated) {
        el.innerHTML = html;
        return;
      }
      el.innerHTML = language === "en" ? translated : html;
    });

    complexOriginals.forEach((html, el) => {
      if (language === "fr") {
        el.innerHTML = html;
        return;
      }
      const source = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const translated = complexTranslations.get(source) || translateSource(source);
      if (translated) el.innerHTML = translated;
    });

    originalAttrs.forEach((attrs, el) => {
      Object.entries(attrs).forEach(([name, value]) => {
        if (language === "fr") {
          el.setAttribute(name, value);
          return;
        }
        const translated = translateSource(value.trim());
        if (translated) el.setAttribute(name, translated.replace(/<[^>]+>/g, ""));
      });
    });

    document.documentElement.lang = language;
    const path = location.pathname.replace(/index\.html$/, "/") || "/";
    const meta = document.querySelector('meta[name="description"]');
    const copy = pageCopy[path];
    if (copy) {
      document.title = language === "en" ? copy.title[1] : copy.title[0];
      if (meta) meta.content = language === "en" ? copy.description[1] : copy.description[0];
    }

    const langButtons = document.querySelectorAll("[data-lang]");
    langButtons.forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    localStorage.setItem("keurdia-lang", language);
    state.language = language;
    updateWhatsAppLinks();
  }

  function ensureLanguageStyles() {
    if (document.getElementById("keurdia-lang-styles")) return;
    const style = document.createElement("style");
    style.id = "keurdia-lang-styles";
    style.textContent = `
      .lang-switch{display:flex;align-items:center;gap:3px;margin-left:auto;margin-right:12px;padding:3px;border:1px solid rgba(212,175,55,.4);background:rgba(8,8,8,.5)}
      .lang-switch button{border:0;background:transparent;color:#aaa;padding:7px 8px;font-size:9px;font-weight:600;letter-spacing:1.2px;cursor:pointer}
      .lang-switch button.active{background:#D4AF37;color:#121212}
      @media(max-width:620px){.lang-switch{margin-right:7px}.lang-switch button{padding:6px 7px}}
    `;
    document.head.appendChild(style);
  }

  function ensureLanguageSwitch() {
    if (!toggle || document.getElementById("langSwitch")) return;
    ensureLanguageStyles();
    const wrap = document.createElement("div");
    wrap.id = "langSwitch";
    wrap.className = "lang-switch";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language / Langue");
    wrap.innerHTML = '<button type="button" data-lang="fr">FR</button><button type="button" data-lang="en">EN</button>';
    toggle.before(wrap);
    wrap.querySelectorAll("[data-lang]").forEach(button => {
      button.addEventListener("click", () => translateContent(button.dataset.lang));
    });
  }

  function updateWhatsAppLinks() {
    const bookingMessage = state.language === "en"
      ? "Hello Keur Ndeye Anta Dia, I would like to know your availability and rates."
      : "Bonjour Keur Ndeye Anta Dia, je souhaite connaître vos disponibilités et tarifs.";
    const apartmentMessage = room => state.language === "en"
      ? `Hello Keur Ndeye Anta Dia, I would like to book apartment ${room}.`
      : `Bonjour Keur Ndeye Anta Dia, je souhaite réserver l'appartement ${room}.`;
    document.querySelectorAll("[data-whatsapp]").forEach(link => {
      const room = link.dataset.apartment;
      link.href = wa(room ? apartmentMessage(room) : bookingMessage);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  const modal = document.getElementById("galleryModal");
  const image = document.getElementById("galleryMainImage");
  const title = document.getElementById("galleryTitle");
  const counter = document.getElementById("galleryCounter");
  const loading = document.getElementById("galleryLoading");
  const empty = document.getElementById("galleryEmpty");
  const prev = document.getElementById("galleryPrev");
  const next = document.getElementById("galleryNext");
  let gallery = { prefix: "", ext: "webp", images: [], pos: 0, requestId: 0 };

  const loadPhoto = pos => {
    if (!modal || !image || !gallery.images.length) return;
    gallery.pos = (pos + gallery.images.length) % gallery.images.length;
    const requestId = ++gallery.requestId;
    const n = gallery.images[gallery.pos];

    counter.textContent = `${gallery.pos + 1} / ${gallery.images.length}`;
    loading.style.display = "grid";
    empty.style.display = "none";
    image.style.opacity = "0";

    image.onload = () => {
      if (requestId !== gallery.requestId) return;
      loading.style.display = "none";
      image.style.opacity = "1";
      const nextNumber = gallery.images[gallery.pos + 1];
      if (nextNumber !== undefined) {
        const preloader = new Image();
        preloader.src = `${gallery.prefix}${nextNumber}.${gallery.ext}`;
      }
    };

    image.onerror = () => {
      if (requestId !== gallery.requestId) return;
      loading.style.display = "none";
      empty.style.display = "grid";
      image.removeAttribute("src");
    };

    image.src = `${gallery.prefix}${n}.${gallery.ext}`;
  };

  const openGallery = trigger => {
    if (!modal) return;
    const card = trigger.closest("[data-gallery-prefix]") || trigger;
    gallery.prefix = card.dataset.galleryPrefix || "";
    gallery.ext = card.dataset.galleryExt || "webp";
    gallery.images = (card.dataset.galleryList || "")
      .split(",")
      .map(value => Number(value.trim()))
      .filter(value => Number.isInteger(value) && value > 0);
    title.textContent = card.dataset.apartment || trigger.dataset.galleryTitle || "Appartement";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    loadPhoto(0);
    next?.focus();
  };

  document.querySelectorAll("[data-gallery]").forEach(button =>
    button.addEventListener("click", e => {
      e.preventDefault();
      openGallery(button);
    })
  );

  const closeGallery = () => {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
    gallery.requestId++;
    if (image) {
      image.removeAttribute("src");
      image.style.opacity = "0";
    }
  };

  document.querySelectorAll("[data-gallery-close]").forEach(button =>
    button.addEventListener("click", closeGallery)
  );
  prev?.addEventListener("click", () => loadPhoto(gallery.pos - 1));
  next?.addEventListener("click", () => loadPhoto(gallery.pos + 1));
  document.addEventListener("keydown", e => {
    if (!modal?.classList.contains("open")) return;
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowLeft") loadPhoto(gallery.pos - 1);
    if (e.key === "ArrowRight") loadPhoto(gallery.pos + 1);
  });

  const form = document.getElementById("reservationForm");
  if (form) {
    const ids = ["firstName", "lastName", "phone", "email", "residence", "arrival", "departure"];
    const fields = ids.map(id => document.getElementById(id)).filter(Boolean);
    const arrival = document.getElementById("arrival");
    const departure = document.getElementById("departure");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

    if (arrival && departure) {
      arrival.min = localToday;
      departure.min = localToday;
      arrival.addEventListener("change", () => {
        departure.min = arrival.value || localToday;
        if (departure.value && departure.value <= arrival.value) departure.value = "";
      });
    }

    const valid = el => el.closest(".form-group")?.classList.remove("invalid");
    const invalid = el => el.closest(".form-group")?.classList.add("invalid");

    fields.forEach(el => el.addEventListener("input", () => valid(el)));

    form.addEventListener("submit", e => {
      e.preventDefault();
      fields.forEach(valid);

      let ok = true;
      fields.forEach(el => {
        if (!el.value.trim()) {
          invalid(el);
          ok = false;
        }
      });

      const email = document.getElementById("email");
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (email) invalid(email);
        ok = false;
      }

      const phone = document.getElementById("phone");
      const digits = phone?.value.replace(/\D/g, "") || "";
      if (digits.length < 6 || digits.length > 15) {
        if (phone) invalid(phone);
        ok = false;
      }

      if (arrival?.value && departure?.value && departure.value <= arrival.value) {
        invalid(departure);
        ok = false;
      }

      if (!ok) return;

      const code = document.getElementById("countryCode")?.value || "+221";
      const roomValue = document.getElementById("residence")?.value || "";
      const messageValue = document.getElementById("message")?.value.trim() || (state.language === "en" ? "No additional message" : "Aucun message supplémentaire");

      const labels = state.language === "en"
        ? ["Hello Keur Ndeye Anta Dia, I would like to request a booking.", "Last name:", "First name:", "Phone:", "Email:", "Apartment:", "Arrival:", "Departure:", "Message:"]
        : ["Bonjour Keur Ndeye Anta Dia, je souhaite faire une demande de réservation.", "Nom :", "Prénom :", "Tél :", "Email :", "Résidence :", "Arrivée :", "Départ :", "Message :"];

      const text = [
        labels[0],
        `${labels[1]} ${document.getElementById("lastName")?.value.trim() || ""}`,
        `${labels[2]} ${document.getElementById("firstName")?.value.trim() || ""}`,
        `${labels[3]} ${code} ${phone?.value.trim() || ""}`,
        `${labels[4]} ${email?.value.trim() || ""}`,
        `${labels[5]} ${roomValue}`,
        `${labels[6]} ${arrival?.value || ""}`,
        `${labels[7]} ${departure?.value || ""}`,
        `${labels[8]} ${messageValue}`
      ].join("\n");

      const success = document.getElementById("formSuccess");
      if (success) success.style.display = "block";
      window.location.assign(wa(text));
    });
  }

  ensureLanguageSwitch();
  translateContent(state.language);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
})();