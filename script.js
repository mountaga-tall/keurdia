document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const WHATSAPP_NUMBER = "33695198679";
    const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
    const GALLERY_CONFIG = {
        Baol:       { prefix: "./images/baol/baol",       start: 1, end: 68 },
        Cayor:      { prefix: "./images/cayor/cayor",     start: 1, end: 25 },
        Damel:      { prefix: "./images/damel/damel",     start: 1, end: 61 },
        "Fouta Toro": { prefix: "./images/foutahto/foutahto", start: 1, end: 85 },
        Niani:      { prefix: "./images/niani/niani",     start: 1, end: 67 },
        Ndiambour:  { prefix: "./images/ndiambour/ndiambour", start: 1, end: 71 },
        Sine:       { prefix: "./images/sine/sine",       start: 1, end: 71 },
        Saloum:     { prefix: "./images/saloum/saloum",   start: 1, end: 54 },
        Waalo:      { prefix: "./images/waalo/waalo",     start: 1, end: 79 },
        Djolof:     { prefix: "./images/djolof/djolof",   start: 1, end: 32, exclude: [30] },
        Thiossane:  { prefix: "./images/thiossane/thiossane", start: 1, end: 50 },
        Wuri:       { prefix: "./images/wuri/wuri",       start: 1, end: 69 },
        Farafina:   { prefix: "./images/farafina/farafina", start: 2, end: 70 }
    };
    const qs = selector => document.querySelector(selector);
    const qsa = selector => document.querySelectorAll(selector);
    const year = qs("#year");
    if (year) year.textContent = new Date().getFullYear();
    const createWhatsAppLink = message => {
        const text = String(message || "").trim();
        return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
    };
    const openWhatsApp = url => {
        const popup = window.open(url, "_blank", "noopener,noreferrer");
        if (!popup) window.location.href = url;
    };
    const whatsappMessages = {
        reservation: "Bonjour Keur Ndeye Anta Dia, je souhaite réserver un appartement.",
        disponibilites: "Bonjour Keur Ndeye Anta Dia, je souhaite connaître vos disponibilités et vos tarifs.",
        contact: "Bonjour Keur Ndeye Anta Dia, je souhaite obtenir plus d'informations sur la résidence."
    };
    qsa("[data-whatsapp]").forEach(link => {
        const type = link.getAttribute("data-whatsapp") || "reservation";
        const apartment = link.getAttribute("data-apartment");
        const message = apartment ? `Bonjour Keur Ndeye Anta Dia, je souhaite réserver l'appartement ${apartment}.` : (whatsappMessages[type] || whatsappMessages.reservation);
        const url = createWhatsAppLink(message);
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        if (apartment) {
            link.setAttribute("aria-label", `Réserver directement l'appartement ${apartment} sur WhatsApp`);
        }
    });
    qsa(".floating-whatsapp").forEach(link => {
        link.addEventListener("click", event => {
            const url = link.getAttribute("href");
            if (!url) return;
            event.preventDefault();
            openWhatsApp(url);
        });
    });
    const header = qs("#header");
    const updateHeader = () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 40);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    const menuToggle = qs("#menuToggle");
    const menuClose = qs("#menuClose");
    const sideMenu = qs("#sideMenu");
    const menuBackdrop = qs("#menuBackdrop");
    const sideMenuLinks = qsa(".side-nav-link");
    let lastFocusedElement = null;
    const openMenu = () => {
        if (!sideMenu || !menuToggle) return;
        lastFocusedElement = document.activeElement;
        sideMenu.classList.add("open");
        menuBackdrop?.classList.add("open");
        document.body.classList.add("menu-open");
        sideMenu.setAttribute("aria-hidden", "false");
        menuBackdrop?.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Fermer le menu");
        setTimeout(() => menuClose?.focus(), 120);
    };
    const closeMenu = () => {
        if (!sideMenu || !menuToggle) return;
        sideMenu.classList.remove("open");
        menuBackdrop?.classList.remove("open");
        document.body.classList.remove("menu-open");
        sideMenu.setAttribute("aria-hidden", "true");
        menuBackdrop?.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        if (lastFocusedElement?.focus) {
            setTimeout(() => lastFocusedElement.focus(), 80);
        }
    };
    menuToggle?.addEventListener("click", () => {
        sideMenu?.classList.contains("open") ? closeMenu() : openMenu();
    });
    menuClose?.addEventListener("click", closeMenu);
    menuBackdrop?.addEventListener("click", closeMenu);
    sideMenuLinks.forEach(link => link.addEventListener("click", closeMenu));
    qsa('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
    const reveals = qsa(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, instance) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                instance.unobserve(entry.target);
            });
        }, { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        reveals.forEach(element => observer.observe(element));
    } else {
        reveals.forEach(element => element.classList.add("active"));
    }
    const galleryModal = qs("#galleryModal");
    const galleryTitle = qs("#galleryTitle");
    const galleryImage = qs("#galleryMainImage");
    const galleryCounter = qs("#galleryCounter");
    const galleryThumbs = qs("#galleryThumbs");
    const galleryLoading = qs("#galleryLoading");
    const galleryEmpty = qs("#galleryEmpty");
    const galleryPrev = qs("#galleryPrev");
    const galleryNext = qs("#galleryNext");
    const galleryTriggers = qsa("[data-gallery], .gallery-btn, .gallery-trigger");
    const galleryCloseBtns = qsa("[data-gallery-close], [data-close-gallery], .gallery-backdrop, .gallery-close");
    let galleryPhotos = [];
    let galleryIndex = 0;
    let galleryLoadingId = 0;
    let galleryPreviousFocus = null;
    const buildGalleryPhotos = apartment => {
        const config = GALLERY_CONFIG[apartment];
        if (!config) return [];
        const excluded = new Set(config.exclude || []);
        const photos = [];
        for (let number = config.start; number <= config.end; number += 1) {
            if (excluded.has(number)) continue;
            photos.push({ number, src: `${config.prefix}${number}.webp` });
        }
        return photos;
    };
    const setGalleryLoading = visible => {
        if (galleryLoading) galleryLoading.style.display = visible ? "block" : "none";
    };
    const updateGalleryControls = () => {
        const count = galleryPhotos.length;
        const hasMany = count > 1;
        if (galleryCounter) {
            galleryCounter.textContent = count ? `${galleryIndex + 1} / ${count}` : "0 / 0";
        }
        if (galleryPrev) galleryPrev.style.visibility = hasMany ? "visible" : "hidden";
        if (galleryNext) galleryNext.style.visibility = hasMany ? "visible" : "hidden";
    };
    const preloadNextPhoto = () => {
        if (galleryPhotos.length < 2) return;
        const nextIndex = (galleryIndex + 1) % galleryPhotos.length;
        const image = new Image();
        image.decoding = "async";
        image.src = galleryPhotos[nextIndex].src;
    };
    const renderThumbs = () => {
        if (!galleryThumbs) return;
        galleryThumbs.innerHTML = "";
        const total = galleryPhotos.length;
        if (!total) return;
        const windowSize = Math.min(5, total);
        let start = Math.max(0, galleryIndex - Math.floor(windowSize / 2));
        start = Math.min(start, Math.max(0, total - windowSize));
        const end = Math.min(total, start + windowSize);
        for (let index = start; index < end; index += 1) {
            const photo = galleryPhotos[index];
            const button = document.createElement("button");
            button.type = "button";
            button.className = `gallery-thumb${index === galleryIndex ? " active" : ""}`;
            button.setAttribute("aria-label", `Afficher la photo ${index + 1}`);
            button.setAttribute("aria-current", index === galleryIndex ? "true" : "false");
            const img = document.createElement("img");
            img.src = photo.src;
            img.alt = "";
            img.loading = index === galleryIndex ? "eager" : "lazy";
            img.decoding = "async";
            button.appendChild(img);
            button.addEventListener("click", () => {
                galleryIndex = index;
                showGalleryImage();
            });
            galleryThumbs.appendChild(button);
        }
    };
    const showGalleryEmpty = () => {
        if (galleryImage) {
            galleryImage.removeAttribute("src");
            galleryImage.style.display = "none";
        }
        if (galleryEmpty) galleryEmpty.style.display = "block";
        setGalleryLoading(false);
        updateGalleryControls();
        if (galleryThumbs) galleryThumbs.innerHTML = "";
    };
    const showGalleryImage = () => {
        if (!galleryImage || !galleryPhotos.length) {
            showGalleryEmpty();
            return;
        }
        const photo = galleryPhotos[galleryIndex];
        galleryImage.style.display = "block";
        galleryImage.classList.remove("loaded");
        galleryImage.src = photo.src;
        galleryImage.alt = `Photo ${galleryIndex + 1} de ${galleryTitle?.textContent || "Galerie"}`;
        setGalleryLoading(true);
        if (galleryEmpty) galleryEmpty.style.display = "none";
        updateGalleryControls();
        renderThumbs();
        galleryImage.onload = () => {
            galleryImage.classList.add("loaded");
            setGalleryLoading(false);
            preloadNextPhoto();
        };
        galleryImage.onerror = () => {
            setGalleryLoading(false);
            if (galleryEmpty) {
                galleryEmpty.textContent = "Cette photo est momentanément indisponible.";
                galleryEmpty.style.display = "block";
            }
        };
    };
    const openGallery = trigger => {
        if (!galleryModal) return;
        const card = trigger.closest(".apartment-card");
        const title = trigger.dataset.galleryTitle || card?.dataset.apartment || "Appartement";
        galleryPreviousFocus = document.activeElement;
        galleryTitle && (galleryTitle.textContent = title);
        galleryPhotos = buildGalleryPhotos(title);
        galleryIndex = 0;
        if (galleryEmpty) {
            galleryEmpty.textContent = "Aucune photo disponible.";
            galleryEmpty.style.display = "none";
        }
        if (galleryImage) {
            galleryImage.style.display = "none";
            galleryImage.classList.remove("loaded");
            galleryImage.removeAttribute("src");
        }
        if (galleryThumbs) galleryThumbs.innerHTML = "";
        galleryModal.classList.add("open");
        galleryModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        galleryLoadingId += 1;
        if (!galleryPhotos.length) {
            showGalleryEmpty();
            return;
        }
        updateGalleryControls();
        showGalleryImage();
        setTimeout(() => qs(".gallery-close")?.focus(), 80);
    };
    const closeGallery = () => {
        if (!galleryModal) return;
        galleryLoadingId += 1;
        galleryModal.classList.remove("open");
        galleryModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (galleryImage) {
            galleryImage.removeAttribute("src");
            galleryImage.onload = null;
            galleryImage.onerror = null;
        }
        if (galleryThumbs) galleryThumbs.innerHTML = "";
        if (galleryPreviousFocus?.focus) galleryPreviousFocus.focus();
        galleryPreviousFocus = null;
    };
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener("click", event => {
            event.preventDefault();
            openGallery(trigger);
        });
    });
    galleryCloseBtns.forEach(button => button.addEventListener("click", closeGallery));
    galleryPrev?.addEventListener("click", () => {
        if (!galleryPhotos.length) return;
        galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
        showGalleryImage();
    });
    galleryNext?.addEventListener("click", () => {
        if (!galleryPhotos.length) return;
        galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
        showGalleryImage();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (galleryModal?.classList.contains("open")) closeGallery();
            if (sideMenu?.classList.contains("open")) closeMenu();
            return;
        }
        if (!galleryModal?.classList.contains("open") || !galleryPhotos.length) return;
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
            showGalleryImage();
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
            showGalleryImage();
        }
    });
    const form = qs("#reservationForm");
    if (form) {
        const firstName = qs("#firstName");
        const lastName = qs("#lastName");
        const phone = qs("#phone");
        const email = qs("#email");
        const countryCode = qs("#countryCode");
        const residence = qs("#residence");
        const arrival = qs("#arrival");
        const departure = qs("#departure");
        const message = qs("#message");
        const success = qs("#formSuccess");
        const fields = [firstName, lastName, phone, email, residence, arrival, departure].filter(Boolean);
        const today = new Date();
        const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
        if (arrival) arrival.min = localToday;
        if (departure) departure.min = localToday;
        arrival?.addEventListener("change", () => {
            if (!departure) return;
            departure.min = arrival.value || localToday;
            if (departure.value && departure.value <= arrival.value) {
                departure.value = "";
            }
        });
        const invalid = element => element?.closest(".form-group")?.classList.add("invalid");
        const valid = element => element?.closest(".form-group")?.classList.remove("invalid");
        fields.forEach(element => {
            element.addEventListener("input", () => valid(element));
            element.addEventListener("change", () => valid(element));
        });
        phone?.addEventListener("input", () => {
            phone.value = phone.value.replace(/[^0-9\s().-]/g, "");
        });
        form.addEventListener("submit", event => {
            event.preventDefault();
            fields.forEach(valid);
            const values = {
                firstName: firstName?.value.trim() || "",
                lastName: lastName?.value.trim() || "",
                phone: phone?.value.trim() || "",
                email: email?.value.trim() || "",
                residence: residence?.value || "",
                arrival: arrival?.value || "",
                departure: departure?.value || "",
                message: message?.value.trim() || "Aucun message supplémentaire"
            };
            let ok = true;
            fields.forEach(element => {
                if (!String(element.value || "").trim()) {
                    invalid(element);
                    ok = false;
                }
            });
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                invalid(email);
                ok = false;
            }
            if (values.phone.replace(/\D/g, "").length < 6) {
                invalid(phone);
                ok = false;
            }
            if (values.departure <= values.arrival) {
                invalid(departure);
                ok = false;
            }
            if (!ok) {
                form.querySelector(".form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea")?.focus();
                return;
            }
            const telephone = `${countryCode?.value || "+221"} ${values.phone}`;
            const reservationText = [
                "Bonjour Keur Ndeye Anta Dia, je souhaite faire une demande de réservation.",
                "",
                `*Nom :* ${values.lastName}`,
                `*Prénom :* ${values.firstName}`,
                `*Tél :* ${telephone}`,
                `*Email :* ${values.email}`,
                `*Résidence souhaitée :* ${values.residence}`,
                `*Date d'arrivée :* ${values.arrival}`,
                `*Date de départ :* ${values.departure}`,
                `*Message :* ${values.message}`
            ].join("\n");
            const url = createWhatsAppLink(reservationText);
            if (success) {
                success.style.display = "block";
                success.textContent = "Votre demande est prête. WhatsApp va s'ouvrir. Si le nouvel onglet est bloqué, WhatsApp sera ouvert dans cette page.";
            }
            openWhatsApp(url);
        });
    }
    qsa("a, button, input, select, textarea").forEach(element => {
        element.addEventListener("keydown", event => {
            if (event.key === "Enter" && element.matches(".floating-whatsapp")) {
                element.click();
            }
        });
    });
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("./sw.js").catch(error => console.error("[Keur Dia] Service Worker :", error));
        });
    }
});
