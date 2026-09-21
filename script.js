```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       KEUR NDEYE ANTA DIA
       SCRIPT COMMUN FR / EN
    ========================================================== */

    const WHATSAPP_NUMBER = "33695198679";

    /* ----------------------------------------------------------
       LANGUE ACTIVE
       Détectée automatiquement depuis <html lang="fr"> / <html lang="en">
    ---------------------------------------------------------- */

    const currentLanguage =
        document.documentElement.lang.toLowerCase().startsWith("en")
            ? "en"
            : "fr";

    const isEnglish = currentLanguage === "en";

    /* ----------------------------------------------------------
       ANNÉE
    ---------------------------------------------------------- */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------
       HEADER
    ---------------------------------------------------------- */

    const header = document.getElementById("header");

    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    /* ----------------------------------------------------------
       MENU MOBILE / DESKTOP
    ---------------------------------------------------------- */

    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const sideMenu = document.getElementById("sideMenu");
    const menuBackdrop = document.getElementById("menuBackdrop");

    const sideMenuLinks =
        document.querySelectorAll(".side-nav-link");

    let lastFocusedElement = null;

    const openMenu = () => {

        if (!sideMenu || !menuToggle) {
            return;
        }

        lastFocusedElement = document.activeElement;

        sideMenu.classList.add("open");
        menuBackdrop?.classList.add("open");

        document.body.classList.add("menu-open");

        sideMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            isEnglish
                ? "Close menu"
                : "Fermer le menu"
        );

        setTimeout(() => {
            menuClose?.focus();
        }, 150);
    };

    const closeMenu = () => {

        if (!sideMenu || !menuToggle) {
            return;
        }

        sideMenu.classList.remove("open");
        menuBackdrop?.classList.remove("open");

        document.body.classList.remove("menu-open");

        sideMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isEnglish
                ? "Open menu"
                : "Ouvrir le menu"
        );

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            setTimeout(() => {
                lastFocusedElement.focus();
            }, 100);
        }
    };

    menuToggle?.addEventListener("click", () => {

        if (sideMenu?.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    menuClose?.addEventListener(
        "click",
        closeMenu
    );

    menuBackdrop?.addEventListener(
        "click",
        closeMenu
    );

    sideMenuLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                sideMenu?.classList.contains("open")
            ) {
                closeMenu();
            }

        }
    );

    /* ----------------------------------------------------------
       SMOOTH SCROLL
    ---------------------------------------------------------- */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    /* ----------------------------------------------------------
       HERO SLIDESHOW
    ---------------------------------------------------------- */

    const slides =
        document.querySelectorAll(".hero-slide");

    if (slides.length > 1) {

        let current = 0;
        let timer = null;

        const next = () => {

            slides[current].classList.remove(
                "active"
            );

            current =
                (current + 1) % slides.length;

            slides[current].classList.add(
                "active"
            );
        };

        const start = () => {

            clearInterval(timer);

            timer = setInterval(
                next,
                5500
            );
        };

        const stop = () => {

            clearInterval(timer);

            timer = null;
        };

        start();

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {
                    stop();
                } else {
                    start();
                }

            }
        );
    }

    /* ----------------------------------------------------------
       REVEAL ANIMATIONS
    ---------------------------------------------------------- */

    const reveals =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, ob) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            ob.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    root: null,
                    rootMargin:
                        "0px 0px -8% 0px",
                    threshold: 0.12
                }
            );

        reveals.forEach(element => {
            observer.observe(element);
        });

    } else {

        reveals.forEach(element => {
            element.classList.add("active");
        });

    }

    /* ==========================================================
       WHATSAPP
    ========================================================== */

    const createWhatsAppLink = message => {

        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    };

    const whatsappMessages = isEnglish
        ? {
            reservation:
                "Hello Keur Ndeye Anta Dia, I would like to book an apartment.",

            disponibilites:
                "Hello Keur Ndeye Anta Dia, I would like to know your availability and rates.",

            contact:
                "Hello Keur Ndeye Anta Dia, I would like more information about the residence."
        }
        : {
            reservation:
                "Bonjour Keur Ndeye Anta Dia, je souhaite réserver un appartement.",

            disponibilites:
                "Bonjour Keur Ndeye Anta Dia, je souhaite connaître vos disponibilités et vos tarifs.",

            contact:
                "Bonjour Keur Ndeye Anta Dia, je souhaite obtenir plus d'informations sur la résidence."
        };

    /* ----------------------------------------------------------
       BOUTONS WHATSAPP GÉNÉRAUX
       Ex: menu, CTA, bouton flottant
    ---------------------------------------------------------- */

    document
        .querySelectorAll("[data-whatsapp]")
        .forEach(link => {

            /* Les liens d'appartement sont gérés séparément */
            if (
                link.hasAttribute("data-apartment")
            ) {
                return;
            }

            const type =
                link.getAttribute(
                    "data-whatsapp"
                );

            link.href =
                createWhatsAppLink(
                    whatsappMessages[type] ||
                    whatsappMessages.reservation
                );

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";
        });

    /* ----------------------------------------------------------
       RÉSERVATION D'UN APPARTEMENT
       Important : on cible uniquement les liens/boutons
    ---------------------------------------------------------- */

    document
        .querySelectorAll(
            "a[data-apartment], button[data-apartment]"
        )
        .forEach(link => {

            const apartment =
                link.getAttribute(
                    "data-apartment"
                );

            if (!apartment) {
                return;
            }

            const message = isEnglish
                ? `Hello Keur Ndeye Anta Dia, I would like to book the ${apartment} apartment.`
                : `Bonjour Keur Ndeye Anta Dia, je souhaite réserver l'appartement ${apartment}.`;

            link.href =
                createWhatsAppLink(message);

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";

            link.setAttribute(
                "aria-label",
                isEnglish
                    ? `Book the ${apartment} apartment directly on WhatsApp`
                    : `Réserver directement l'appartement ${apartment} sur WhatsApp`
            );
        });

    /* ----------------------------------------------------------
       FOCUS ACCESSIBILITY
    ---------------------------------------------------------- */

    document
        .querySelectorAll(
            "a, button, input, select, textarea"
        )
        .forEach(element => {

            element.addEventListener(
                "focus",
                () => {

                    element.style.outline =
                        "2px solid #D4AF37";

                    element.style.outlineOffset =
                        "3px";
                }
            );

            element.addEventListener(
                "blur",
                () => {

                    element.style.outline = "";
                    element.style.outlineOffset = "";
                }
            );

        });

    /* ==========================================================
       GALERIE
    ========================================================== */

    const galleryModal =
        document.getElementById(
            "galleryModal"
        );

    const galleryTitle =
        document.getElementById(
            "galleryTitle"
        );

    const galleryImage =
        document.getElementById(
            "galleryMainImage"
        );

    const galleryCounter =
        document.getElementById(
            "galleryCounter"
        );

    const galleryThumbs =
        document.getElementById(
            "galleryThumbs"
        );

    const galleryLoading =
        document.getElementById(
            "galleryLoading"
        );

    const galleryEmpty =
        document.getElementById(
            "galleryEmpty"
        );

    const galleryPrev =
        document.getElementById(
            "galleryPrev"
        );

    const galleryNext =
        document.getElementById(
            "galleryNext"
        );

    const galleryTriggers =
        document.querySelectorAll(
            "[data-gallery], .gallery-btn, .gallery-trigger"
        );

    const galleryCloseBtns =
        document.querySelectorAll(
            "[data-gallery-close], [data-close-gallery], .gallery-backdrop, .gallery-close"
        );

    let galleryPhotos = [];
    let galleryIndex = 0;
    let galleryPrefix = "";
    let galleryExt = "";
    let galleryLoadingId = 0;

    const emptyGalleryText = isEnglish
        ? "No photo available."
        : "Aucune photo disponible.";

    const loadingGalleryText = isEnglish
        ? "Loading photos..."
        : "Chargement des photos...";

    const galleryAltText = isEnglish
        ? "Photo"
        : "Photo";

    const thumbnailAltText = isEnglish
        ? "Thumbnail"
        : "Miniature";

    const showGalleryEmpty = () => {

        if (galleryLoading) {
            galleryLoading.style.display =
                "none";
        }

        if (galleryEmpty) {
            galleryEmpty.style.display =
                "block";

            galleryEmpty.textContent =
                emptyGalleryText;
        }

        if (galleryImage) {
            galleryImage.style.display =
                "none";
        }

        if (galleryCounter) {
            galleryCounter.textContent =
                "0 / 0";
        }

        if (galleryPrev) {
            galleryPrev.style.visibility =
                "hidden";
        }

        if (galleryNext) {
            galleryNext.style.visibility =
                "hidden";
        }

    };

    const showGalleryImage = () => {

        if (
            !galleryPhotos.length ||
            !galleryImage
        ) {
            return;
        }

        if (galleryEmpty) {
            galleryEmpty.style.display =
                "none";
        }

        galleryImage.style.display =
            "block";

        if (galleryLoading) {
            galleryLoading.style.display =
                "block";

            galleryLoading.textContent =
                loadingGalleryText;
        }

        galleryImage.classList.remove(
            "loaded"
        );

        const photo =
            galleryPhotos[galleryIndex];

        galleryImage.src =
            photo.src;

        galleryImage.alt =
            `${galleryAltText} ${galleryIndex + 1} ${isEnglish ? "of" : "de"} ${galleryTitle?.textContent || (isEnglish ? "Gallery" : "Galerie")}`;

        if (galleryCounter) {
            galleryCounter.textContent =
                `${galleryIndex + 1} / ${galleryPhotos.length}`;
        }

        const visible =
            galleryPhotos.length > 1;

        if (galleryPrev) {
            galleryPrev.style.visibility =
                visible
                    ? "visible"
                    : "hidden";
        }

        if (galleryNext) {
            galleryNext.style.visibility =
                visible
                    ? "visible"
                    : "hidden";
        }

        galleryImage.onload = () => {

            if (galleryLoading) {
                galleryLoading.style.display =
                    "none";
            }

            galleryImage.classList.add(
                "loaded"
            );
        };

        document
            .querySelectorAll(".gallery-thumb")
            .forEach((thumb, index) => {

                thumb.classList.toggle(
                    "active",
                    index === galleryIndex
                );

            });

        document
            .querySelector(
                ".gallery-thumb.active"
            )
            ?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

    };

    const renderThumbs = () => {

        if (!galleryThumbs) {
            return;
        }

        galleryThumbs.innerHTML = "";

        galleryPhotos.forEach(
            (photo, index) => {

                const thumb =
                    document.createElement(
                        "img"
                    );

                thumb.className =
                    "gallery-thumb";

                thumb.src =
                    photo.src;

                thumb.alt =
                    `${thumbnailAltText} ${index + 1}`;

                thumb.loading =
                    "lazy";

                thumb.addEventListener(
                    "click",
                    () => {

                        galleryIndex =
                            index;

                        showGalleryImage();
                    }
                );

                galleryThumbs.appendChild(
                    thumb
                );
            }
        );
    };

    const findGalleryPhotos =
        (
            count = 0,
            skipSet = new Set()
        ) =>
            new Promise(resolve => {

                const photos = [];

                const max =
                    Math.max(
                        0,
                        Math.min(
                            Number(count) || 0,
                            100
                        )
                    );

                let number = 1;
                let missing = 0;

                const check = () => {

                    if (number > max) {

                        resolve(photos);
                        return;
                    }

                    const current =
                        number++;

                    if (
                        skipSet.has(current)
                    ) {
                        check();
                        return;
                    }

                    const src =
                        `${galleryPrefix}${current}.${galleryExt}`;

                    const image =
                        new Image();

                    image.onload = () => {

                        photos.push({
                            src,
                            number: current
                        });

                        missing = 0;

                        check();
                    };

                    image.onerror = () => {

                        missing++;

                        check();
                    };

                    image.src = src;
                };

                check();
            });

    const openGallery = async trigger => {

        if (!galleryModal) {
            return;
        }

        const card =
            trigger.closest(
                ".apartment-card"
            );

        const title =
            trigger.dataset.galleryTitle ||
            card?.dataset.apartment ||
            (isEnglish
                ? "Apartment"
                : "Appartement");

        if (galleryTitle) {
            galleryTitle.textContent =
                title;
        }

        galleryPrefix =
            trigger.dataset.galleryPrefix ||
            card?.dataset.galleryPrefix ||
            "";

        galleryExt =
            trigger.dataset.galleryExt ||
            card?.dataset.galleryExt ||
            "webp";

        const galleryCount =
            Number(
                trigger.dataset.galleryCount ||
                card?.dataset.galleryCount ||
                0
            );

        const gallerySkipRaw =
            trigger.dataset.gallerySkip ||
            card?.dataset.gallerySkip ||
            "";

        const gallerySkip =
            new Set(
                gallerySkipRaw
                    .split(",")
                    .map(value =>
                        Number(
                            value.trim()
                        )
                    )
                    .filter(Boolean)
            );

        galleryPhotos = [];
        galleryIndex = 0;

        if (galleryThumbs) {
            galleryThumbs.innerHTML = "";
        }

        if (galleryImage) {

            galleryImage.style.display =
                "none";

            galleryImage.classList.remove(
                "loaded"
            );
        }

        if (galleryLoading) {

            galleryLoading.style.display =
                "block";

            galleryLoading.textContent =
                loadingGalleryText;
        }

        if (galleryEmpty) {
            galleryEmpty.style.display =
                "none";
        }

        if (galleryCounter) {
            galleryCounter.textContent =
                "";
        }

        galleryModal.classList.add(
            "open"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        const current =
            ++galleryLoadingId;

        galleryPhotos =
            await findGalleryPhotos(
                galleryCount,
                gallerySkip
            );

        if (
            current !==
            galleryLoadingId
        ) {
            return;
        }

        if (
            !galleryPhotos.length
        ) {
            showGalleryEmpty();
            return;
        }

        renderThumbs();

        showGalleryImage();
    };

    const closeGallery = () => {

        if (!galleryModal) {
            return;
        }

        galleryLoadingId++;

        galleryModal.classList.remove(
            "open"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        if (galleryImage) {
            galleryImage.src = "";
        }

        if (galleryThumbs) {
            galleryThumbs.innerHTML = "";
        }
    };

    galleryTriggers.forEach(
        trigger => {

            trigger.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openGallery(trigger);
                }
            );
        }
    );

    galleryCloseBtns.forEach(
        button => {

            button.addEventListener(
                "click",
                closeGallery
            );
        }
    );

    galleryPrev?.addEventListener(
        "click",
        () => {

            if (
                galleryPhotos.length
            ) {

                galleryIndex =
                    (
                        galleryIndex -
                        1 +
                        galleryPhotos.length
                    ) %
                    galleryPhotos.length;

                showGalleryImage();
            }
        }
    );

    galleryNext?.addEventListener(
        "click",
        () => {

            if (
                galleryPhotos.length
            ) {

                galleryIndex =
                    (
                        galleryIndex +
                        1
                    ) %
                    galleryPhotos.length;

                showGalleryImage();
            }
        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (
                !galleryModal?.classList.contains(
                    "open"
                )
            ) {
                return;
            }

            if (
                event.key === "Escape"
            ) {
                closeGallery();
            }

            if (
                event.key === "ArrowLeft" &&
                galleryPhotos.length
            ) {

                galleryIndex =
                    (
                        galleryIndex -
                        1 +
                        galleryPhotos.length
                    ) %
                    galleryPhotos.length;

                showGalleryImage();
            }

            if (
                event.key === "ArrowRight" &&
                galleryPhotos.length
            ) {

                galleryIndex =
                    (
                        galleryIndex +
                        1
                    ) %
                    galleryPhotos.length;

                showGalleryImage();
            }

        }
    );

    /* ==========================================================
       FORMULAIRE DE RÉSERVATION
    ========================================================== */

    const form =
        document.getElementById(
            "reservationForm"
        );

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
            .map(id =>
                document.getElementById(id)
            )
            .filter(Boolean);

        const arrival =
            document.getElementById(
                "arrival"
            );

        const departure =
            document.getElementById(
                "departure"
            );

        const today =
            new Date();

        const localToday =
            new Date(
                today.getTime() -
                today.getTimezoneOffset() *
                60000
            )
                .toISOString()
                .split("T")[0];

        if (arrival) {
            arrival.min =
                localToday;
        }

        if (departure) {
            departure.min =
                localToday;
        }

        arrival?.addEventListener(
            "change",
            () => {

                if (departure) {

                    departure.min =
                        arrival.value ||
                        localToday;

                    if (
                        departure.value &&
                        departure.value <=
                        arrival.value
                    ) {
                        departure.value =
                            "";
                    }
                }

            }
        );

        const invalid = element => {

            const group =
                element.closest(
                    ".form-group"
                );

            group?.classList.add(
                "invalid"
            );
        };

        const valid = element => {

            element
                .closest(".form-group")
                ?.classList.remove(
                    "invalid"
                );
        };

        fields.forEach(
            element => {

                element.addEventListener(
                    "input",
                    () => valid(element)
                );

                element.addEventListener(
                    "change",
                    () => valid(element)
                );
            }
        );

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                let ok = true;

                fields.forEach(
                    valid
                );

                fields.forEach(
                    element => {

                        if (
                            !element.value.trim()
                        ) {

                            invalid(
                                element
                            );

                            ok = false;
                        }
                    }
                );

                const email =
                    document.getElementById(
                        "email"
                    );

                if (
                    !email ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        email.value.trim()
                    )
                ) {

                    if (email) {
                        invalid(email);
                    }

                    ok = false;
                }

                if (
                    arrival?.value &&
                    departure?.value &&
                    departure.value <=
                    arrival.value
                ) {

                    invalid(
                        departure
                    );

                    ok = false;
                }

                if (!ok) {
                    return;
                }

                const firstName =
                    document.getElementById(
                        "firstName"
                    );

                const lastName =
                    document.getElementById(
                        "lastName"
                    );

                const phone =
                    document.getElementById(
                        "phone"
                    );

                const countryCode =
                    document.getElementById(
                        "countryCode"
                    );

                const residence =
                    document.getElementById(
                        "residence"
                    );

                const message =
                    document.getElementById(
                        "message"
                    );

                const data = {

                    firstName:
                        firstName?.value.trim() ||
                        "",

                    lastName:
                        lastName?.value.trim() ||
                        "",

                    phone:
                        `${countryCode?.value || ""} ${phone?.value.trim() || ""}`.trim(),

                    email:
                        email?.value.trim() ||
                        "",

                    residence:
                        residence?.value ||
                        "",

                    arrival:
                        arrival?.value ||
                        "",

                    departure:
                        departure?.value ||
                        "",

                    message:
                        message?.value.trim() ||
                        (
                            isEnglish
                                ? "No additional message"
                                : "Aucun message supplémentaire"
                        )
                };

                const text = isEnglish

                    ? `Hello Keur Ndeye Anta Dia, I would like to make a booking request.

*Last name:* ${data.lastName}
*First name:* ${data.firstName}
*Phone:* ${data.phone}
*Email:* ${data.email}
*Residence requested:* ${data.residence}
*Arrival date:* ${data.arrival}
*Departure date:* ${data.departure}
*Message:* ${data.message}`

                    : `Bonjour Keur Ndeye Anta Dia, je souhaite faire une demande de réservation.

*Nom :* ${data.lastName}
*Prénom :* ${data.firstName}
*Tél :* ${data.phone}
*Email :* ${data.email}
*Résidence souhaitée :* ${data.residence}
*Date d'arrivée :* ${data.arrival}
*Date de départ :* ${data.departure}
*Message :* ${data.message}`;

                const url =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

                const success =
                    document.getElementById(
                        "formSuccess"
                    );

                if (success) {

                    success.style.display =
                        "block";

                    success.textContent =
                        isEnglish
                            ? "Your request is ready. WhatsApp will open in a new tab."
                            : "Votre demande est prête. WhatsApp va s'ouvrir dans un nouvel onglet.";
                }

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );
    }

    /* ==========================================================
       SERVICE WORKER
       Un seul SW commun FR + EN
    ========================================================== */

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register(
                        "/sw.js",
                        {
                            scope: "/"
                        }
                    )
                    .then(registration => {

                        registration.addEventListener(
                            "updatefound",
                            () => {

                                const worker =
                                    registration.installing;

                                if (!worker) {
                                    return;
                                }

                                worker.addEventListener(
                                    "statechange",
                                    () => {

                                        if (
                                            worker.state ===
                                            "installed" &&
                                            navigator
                                                .serviceWorker
                                                .controller
                                        ) {

                                            worker.postMessage({
                                                type:
                                                    "SKIP_WAITING"
                                            });
                                        }
                                    }
                                );
                            }
                        );
                    })
                    .catch(error => {

                        console.error(
                            "[Keur Dia] Service Worker error:",
                            error
                        );

                    });

            }
        );
    }

});
```
