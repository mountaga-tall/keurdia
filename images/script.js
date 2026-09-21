document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // Numéro WhatsApp déjà utilisé par le site (format international, sans + ni espaces).
    const WHATSAPP_NUMBER = "33695198679";
    const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* =========================================================
       HELPERS
    ========================================================= */
    const cleanPhone = value => String(value || "").replace(/[^0-9+]/g, "");

    const createWhatsAppLink = message => {
        const text = String(message || "").trim();
        return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
    };

    const openWhatsApp = url => {
        // window.open peut être bloqué par certains navigateurs : on prévoit
        // un vrai fallback dans le même onglet.
        const popup = window.open(url, "_blank", "noopener,noreferrer");
        if (!popup) window.location.assign(url);
    };

    /* =========================================================
       HEADER
    ========================================================= */
    const header = document.getElementById("header");
    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 40);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* =========================================================
       MENU LATÉRAL
    ========================================================= */
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const sideMenu = document.getElementById("sideMenu");
    const menuBackdrop = document.getElementById("menuBackdrop");
    const sideMenuLinks = document.querySelectorAll(".side-nav-link");
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
        setTimeout(() => menuClose?.focus(), 150);
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
            setTimeout(() => lastFocusedElement.focus(), 100);
        }
    };

    menuToggle?.addEventListener("click", () => {
        sideMenu?.classList.contains("open") ? closeMenu() : openMenu();
    });
    menuClose?.addEventListener("click", closeMenu);
    menuBackdrop?.addEventListener("click", closeMenu);
    sideMenuLinks.forEach(link => link.addEventListener("click", closeMenu));

    /* =========================================================
       NAVIGATION DOUCE
    ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    /* =========================================================
       HERO SLIDER
    ========================================================= */
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length > 1) {
        let current = 0;
        let timer = null;

        const next = () => {
            slides[current].classList.remove("active");
            current = (current + 1) % slides.length;
            slides[current].classList.add("active");
        };

        const start = () => {
            clearInterval(timer);
            timer = window.setInterval(next, 5500);
        };

        const stop = () => {
            clearInterval(timer);
            timer = null;
        };

        start();
        document.addEventListener("visibilitychange", () => {
            document.hidden ? stop() : start();
        });
    }

    /* =========================================================
       REVEAL AU SCROLL
    ========================================================= */
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, instance) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("active");
                    instance.unobserve(entry.target);
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -8% 0px",
                threshold: 0.12
            }
        );
        reveals.forEach(element => observer.observe(element));
    } else {
        reveals.forEach(element => element.classList.add("active"));
    }

    /* =========================================================
       WHATSAPP
    ========================================================= */
    const whatsappMessages = {
        reservation:
            "Bonjour Keur Ndeye Anta Dia, je souhaite réserver un appartement.",
        disponibilites:
            "Bonjour Keur Ndeye Anta Dia, je souhaite connaître vos disponibilités et vos tarifs.",
        contact:
            "Bonjour Keur Ndeye Anta Dia, je souhaite obtenir plus d'informations sur la résidence."
    };

    document.querySelectorAll("[data-whatsapp]").forEach(link => {
        const type = link.getAttribute("data-whatsapp") || "reservation";
        const apartment = link.getAttribute("data-apartment");
        const message = apartment
            ? `Bonjour Keur Ndeye Anta Dia, je souhaite réserver l'appartement ${apartment}.`
            : (whatsappMessages[type] || whatsappMessages.reservation);

        link.setAttribute("href", createWhatsAppLink(message));
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");

        if (apartment) {
            link.setAttribute(
                "aria-label",
                `Réserver directement l'appartement ${apartment} sur WhatsApp`
            );
        }
    });

    /* =========================================================
       ACCESSIBILITÉ DES ÉLÉMENTS FOCUS
    ========================================================= */
    document
        .querySelectorAll("a,button,input,select,textarea")
        .forEach(element => {
            element.addEventListener("focus", () => {
                element.style.outline = "2px solid #D4AF37";
                element.style.outlineOffset = "3px";
            });
            element.addEventListener("blur", () => {
                element.style.outline = "";
                element.style.outlineOffset = "";
            });
        });

    /* =========================================================
       GALERIE PHOTOS
       Les nouveaux fichiers sont tous en .webp.
       On autorise jusqu'à 120 photos par appartement.
    ========================================================= */
    const galleryModal = document.getElementById("galleryModal");
    const galleryTitle = document.getElementById("galleryTitle");
    const galleryImage = document.getElementById("galleryMainImage");
    const galleryCounter = document.getElementById("galleryCounter");
    const galleryThumbs = document.getElementById("galleryThumbs");
    const galleryLoading = document.getElementById("galleryLoading");
    const galleryEmpty = document.getElementById("galleryEmpty");
    const galleryPrev = document.getElementById("galleryPrev");
    const galleryNext = document.getElementById("galleryNext");
    const galleryTriggers = document.querySelectorAll(
        "[data-gallery],.gallery-btn,.gallery-trigger"
    );
    const galleryCloseBtns = document.querySelectorAll(
        "[data-gallery-close],[data-close-gallery],.gallery-backdrop,.gallery-close"
    );

    let galleryPhotos = [];
    let galleryIndex = 0;
    let galleryPrefix = "";
    let galleryExt = "webp";
    let galleryLoadingId = 0;
    const MAX_GALLERY_PHOTOS = 120;
    const MAX_CONSECUTIVE_MISSING = 5;

    const showGalleryEmpty = () => {
        if (galleryLoading) galleryLoading.style.display = "none";
        if (galleryEmpty) galleryEmpty.style.display = "block";
        if (galleryImage) galleryImage.style.display = "none";
        if (galleryCounter) galleryCounter.textContent = "0 / 0";
        if (galleryPrev) galleryPrev.style.visibility = "hidden";
        if (galleryNext) galleryNext.style.visibility = "hidden";
    };

    const showGalleryImage = () => {
        if (!galleryPhotos.length || !galleryImage) return;

        if (galleryEmpty) galleryEmpty.style.display = "none";
        galleryImage.style.display = "block";
        if (galleryLoading) galleryLoading.style.display = "block";
        galleryImage.classList.remove("loaded");

        const photo = galleryPhotos[galleryIndex];
        galleryImage.src = photo.src;
        galleryImage.alt = `Photo ${galleryIndex + 1} de ${galleryTitle?.textContent || "Galerie"}`;

        if (galleryCounter) {
            galleryCounter.textContent = `${galleryIndex + 1} / ${galleryPhotos.length}`;
        }

        const visible = galleryPhotos.length > 1;
        if (galleryPrev) galleryPrev.style.visibility = visible ? "visible" : "hidden";
        if (galleryNext) galleryNext.style.visibility = visible ? "visible" : "hidden";

        galleryImage.onload = () => {
            if (galleryLoading) galleryLoading.style.display = "none";
            galleryImage.classList.add("loaded");
        };

        document.querySelectorAll(".gallery-thumb").forEach((thumb, index) => {
            thumb.classList.toggle("active", index === galleryIndex);
        });

        document
            .querySelector(".gallery-thumb.active")
            ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    const renderThumbs = () => {
        if (!galleryThumbs) return;
        galleryThumbs.innerHTML = "";

        galleryPhotos.forEach((photo, index) => {
            const thumb = document.createElement("img");
            thumb.className = "gallery-thumb";
            thumb.src = photo.src;
            thumb.alt = `Miniature ${index + 1}`;
            thumb.loading = "lazy";
            thumb.decoding = "async";
            thumb.addEventListener("click", () => {
                galleryIndex = index;
                showGalleryImage();
            });
            galleryThumbs.appendChild(thumb);
        });
    };

    const findGalleryPhotos = () =>
        new Promise(resolve => {
            const photos = [];
            let number = 1;
            let missing = 0;

            const check = () => {
                if (number > MAX_GALLERY_PHOTOS || missing >= MAX_CONSECUTIVE_MISSING) {
                    resolve(photos);
                    return;
                }

                const src = `${galleryPrefix}${number}.${galleryExt}`;
                const image = new Image();

                image.onload = () => {
                    photos.push({ src, number });
                    missing = 0;
                    number += 1;
                    check();
                };

                image.onerror = () => {
                    missing += 1;
                    number += 1;
                    check();
                };

                image.src = src;
            };

            check();
        });

    const openGallery = async trigger => {
        if (!galleryModal) return;

        const card = trigger.closest(".apartment-card");
        const title =
            trigger.dataset.galleryTitle ||
            card?.dataset.apartment ||
            "Appartement";

        galleryTitle && (galleryTitle.textContent = title);
        galleryPrefix =
            trigger.dataset.galleryPrefix || card?.dataset.galleryPrefix || "";
        galleryExt = trigger.dataset.galleryExt || card?.dataset.galleryExt || "webp";
        galleryPhotos = [];
        galleryIndex = 0;

        if (galleryThumbs) galleryThumbs.innerHTML = "";
        if (galleryImage) {
            galleryImage.style.display = "none";
            galleryImage.classList.remove("loaded");
            galleryImage.removeAttribute("src");
        }
        if (galleryLoading) galleryLoading.style.display = "block";
        if (galleryEmpty) galleryEmpty.style.display = "none";
        if (galleryCounter) galleryCounter.textContent = "";

        galleryModal.classList.add("open");
        galleryModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const current = ++galleryLoadingId;
        galleryPhotos = await findGalleryPhotos();
        if (current !== galleryLoadingId) return;

        if (!galleryPhotos.length) {
            showGalleryEmpty();
            return;
        }

        renderThumbs();
        showGalleryImage();
    };

    const closeGallery = () => {
        if (!galleryModal) return;
        galleryLoadingId += 1;
        galleryModal.classList.remove("open");
        galleryModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (galleryImage) galleryImage.removeAttribute("src");
        if (galleryThumbs) galleryThumbs.innerHTML = "";
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

    /* =========================================================
       FERMETURE CLAVIER
    ========================================================= */
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (galleryModal?.classList.contains("open")) closeGallery();
            if (sideMenu?.classList.contains("open")) closeMenu();
            return;
        }

        if (!galleryModal?.classList.contains("open") || !galleryPhotos.length) return;

        if (event.key === "ArrowLeft") {
            galleryIndex = (galleryIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
            showGalleryImage();
        }

        if (event.key === "ArrowRight") {
            galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
            showGalleryImage();
        }
    });

    /* =========================================================
       FORMULAIRE DE RÉSERVATION
    ========================================================= */
    const form = document.getElementById("reservationForm");

    if (form) {
        const fields = [
            "firstName",
            "lastName",
            "phone",
            "email",
            "residence",
            "arrival",
            "departure"
        ]
            .map(id => document.getElementById(id))
            .filter(Boolean);

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const countryCode = document.getElementById("countryCode");
        const residence = document.getElementById("residence");
        const arrival = document.getElementById("arrival");
        const departure = document.getElementById("departure");
        const message = document.getElementById("message");
        const success = document.getElementById("formSuccess");

        const today = new Date();
        const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0];

        if (arrival) arrival.min = localToday;
        if (departure) departure.min = localToday;

        arrival?.addEventListener("change", () => {
            if (!departure || !arrival) return;
            departure.min = arrival.value || localToday;
            if (departure.value && departure.value <= arrival.value) {
                departure.value = "";
            }
        });

        const invalid = element => {
            element?.closest(".form-group")?.classList.add("invalid");
        };

        const valid = element => {
            element?.closest(".form-group")?.classList.remove("invalid");
        };

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
            let ok = true;

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

            fields.forEach(element => {
                if (!String(element.value || "").trim()) {
                    invalid(element);
                    ok = false;
                }
            });

            if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                invalid(email);
                ok = false;
            }

            const digits = cleanPhone(values.phone);
            if (digits.replace(/\D/g, "").length < 6) {
                invalid(phone);
                ok = false;
            }

            if (
                values.arrival &&
                values.departure &&
                values.departure <= values.arrival
            ) {
                invalid(departure);
                ok = false;
            }

            if (!ok) {
                const firstInvalid = form.querySelector(".form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea");
                firstInvalid?.focus();
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
                success.textContent = "Votre demande est prête. WhatsApp va s'ouvrir dans un nouvel onglet. Si rien ne s'ouvre, le lien sera ouvert dans cette page.";
            }

            openWhatsApp(url);
        });
    }

    /* =========================================================
       SERVICE WORKER
    ========================================================= */
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("./sw.js")
                .then(registration => {
                    registration.addEventListener("updatefound", () => {
                        const worker = registration.installing;
                        if (!worker) return;

                        worker.addEventListener("statechange", () => {
                            if (
                                worker.state === "installed" &&
                                navigator.serviceWorker.controller
                            ) {
                                worker.postMessage({ type: "SKIP_WAITING" });
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error("[Keur Dia] Erreur Service Worker :", error);
                });
        });
    }
});
