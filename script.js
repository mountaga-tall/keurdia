(() => {
  const WA = "33695198679";
  const wa = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
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
  };
  toggle?.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  close?.addEventListener("click", () => setMenu(false));
  backdrop?.addEventListener("click", () => setMenu(false));
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", scrollY > 30), {passive:true});

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const el = document.querySelector(a.getAttribute("href"));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth", block:"start"});
  }));

  const reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add("active"); io.unobserve(x.target); }
    }), {rootMargin:"0px 0px -8% 0px"});
    reveal.forEach(x => io.observe(x));
  } else reveal.forEach(x => x.classList.add("active"));

  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    if (link.classList.contains("floating-whatsapp")) return;
    if (link.dataset.apartment) {
      const room = link.dataset.apartment;
      link.href = wa(`Bonjour Keur Ndeye Anta Dia, je souhaite réserver l'appartement ${room}.`);
    } else {
      link.href = wa("Bonjour Keur Ndeye Anta Dia, je souhaite connaître vos disponibilités et tarifs.");
    }
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const modal=document.getElementById("galleryModal");
  const image=document.getElementById("galleryMainImage");
  const title=document.getElementById("galleryTitle");
  const counter=document.getElementById("galleryCounter");
  const loading=document.getElementById("galleryLoading");
  const empty=document.getElementById("galleryEmpty");
  const prev=document.getElementById("galleryPrev");
  const next=document.getElementById("galleryNext");
  let gallery={prefix:"",ext:"webp",images:[],pos:0};
  const loadPhoto=pos=>{
    if(!modal||!image||!gallery.images.length)return;
    gallery.pos=(pos+gallery.images.length)%gallery.images.length;
    const n=gallery.images[gallery.pos];
    counter.textContent=`${gallery.pos+1} / ${gallery.images.length}`;
    loading.style.display="grid";empty.style.display="none";image.style.opacity="0";
    image.src=`${gallery.prefix}${n}.${gallery.ext}`;
    image.onload=()=>{
      loading.style.display="none";image.style.opacity="1";
      const n2=gallery.images[gallery.pos+1];
      if(n2!==undefined){const p=new Image();p.src=`${gallery.prefix}${n2}.${gallery.ext}`;}
    };
    image.onerror=()=>{loading.style.display="none";empty.style.display="grid";};
  };
  const openGallery=trigger=>{
    if(!modal)return;
    const card=trigger.closest("[data-gallery-prefix]")||trigger;
    gallery.prefix=card.dataset.galleryPrefix||"";
    gallery.ext=card.dataset.galleryExt||"webp";
    gallery.images=(card.dataset.galleryList||"").split(",").map(Number).filter(Number.isFinite);
    title.textContent=card.dataset.apartment||trigger.dataset.galleryTitle||"Appartement";
    modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.classList.add("lock");
    loadPhoto(0);
  };
  document.querySelectorAll("[data-gallery]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();openGallery(b);}));
  const closeGallery=()=>{modal?.classList.remove("open");modal?.setAttribute("aria-hidden","true");document.body.classList.remove("lock");if(image)image.removeAttribute("src");};
  document.querySelectorAll("[data-gallery-close]").forEach(b=>b.addEventListener("click",closeGallery));
  prev?.addEventListener("click",()=>loadPhoto(gallery.pos-1));
  next?.addEventListener("click",()=>loadPhoto(gallery.pos+1));
  document.addEventListener("keydown",e=>{if(!modal?.classList.contains("open"))return;if(e.key==="Escape")closeGallery();if(e.key==="ArrowLeft")prev?.click();if(e.key==="ArrowRight")next?.click();});

  const form = document.getElementById("reservationForm");
  if (form) {
    const ids = ["firstName","lastName","phone","email","residence","arrival","departure"];
    const fields = ids.map(id => document.getElementById(id)).filter(Boolean);
    const arrival = document.getElementById("arrival");
    const departure = document.getElementById("departure");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
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
      fields.forEach(el => { if (!el.value.trim()) { invalid(el); ok = false; } });
      const email = document.getElementById("email");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { invalid(email); ok = false; }
      if (arrival?.value && departure?.value && departure.value <= arrival.value) { invalid(departure); ok = false; }
      if (!ok) return;
      const code = document.getElementById("countryCode")?.value || "+221";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const text = [
        "Bonjour Keur Ndeye Anta Dia, je souhaite faire une demande de réservation.",
        `Nom : ${document.getElementById("lastName").value.trim()}`,
        `Prénom : ${document.getElementById("firstName").value.trim()}`,
        `Tél : ${code} ${phone}`,
        `Email : ${email.value.trim()}`,
        `Résidence : ${document.getElementById("residence").value}`,
        `Arrivée : ${arrival.value}`,
        `Départ : ${departure.value}`,
        `Message : ${document.getElementById("message")?.value.trim() || "Aucun message supplémentaire"}`
      ].join("\n");
      const success = document.getElementById("formSuccess");
      if (success) success.style.display = "block";
      window.location.href = wa(text);
    });
  }

  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
})();
