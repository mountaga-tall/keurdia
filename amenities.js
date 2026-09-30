(function () {
  const categoryEN = {
    "Salle de bain":"Bathroom","Chambre et linge":"Bedroom & laundry","Divertissement":"Entertainment",
    "Famille":"Family","Chauffage et climatisation":"Heating & air conditioning","Sécurité à la maison":"Home safety",
    "Internet et bureau":"Internet & office","Cuisine et salle à manger":"Kitchen & dining",
    "Caractéristiques de l'emplacement":"Location features","Parking et installations":"Parking & facilities",
    "Services":"Services","Non inclus":"Not included"
  };

  const en = {
    "Ce que propose ce logement":"What this property offers","Équipements":"Amenities",
    "Les équipements et services pensés pour un séjour confortable.":"Thoughtful amenities and services for a comfortable stay.",
    "Sèche-cheveux":"Hair dryer","Produits de nettoyage":"Cleaning products","Shampoing":"Shampoo","Après-shampoing":"Conditioner",
    "Savon pour le corps":"Body soap","Eau chaude":"Hot water","Gel douche":"Shower gel","Lave-linge":"Washing machine",
    "Sèche-linge":"Dryer","Produits de base":"Essentials","Serviettes, draps, savon et papier toilette":"Towels, bed sheets, soap and toilet paper",
    "Cintres":"Hangers","Linge de lit":"Bed linen","Linge de lit en coton":"Cotton bed linen",
    "Oreillers et couvertures supplémentaires":"Extra pillows and blankets","Stores ou rideaux occultants":"Blackout shades or curtains",
    "Fer à repasser":"Iron","Étendoir à linge":"Drying rack","Espace de rangement pour les vêtements":"Clothes storage space",
    "Télévision":"TV","Lit pour bébé":"Baby cot","Climatisation":"Air conditioning",
    "Climatisation : système split sans évacuation":"Air conditioning: split system without ducting",
    "Ventilateurs portables":"Portable fans","Caméras de surveillance extérieures présentes sur place":"Outdoor security cameras on site",
    "Détecteur de fumée":"Smoke alarm","Extincteur":"Fire extinguisher","Trousse de premiers secours":"First aid kit","Wifi":"Wi-Fi",
    "Cuisine":"Kitchen","Réfrigérateur":"Refrigerator","Congélateur":"Freezer","Four à micro-ondes":"Microwave",
    "Tout le nécessaire pour cuisiner":"Cooking essentials","Vaisselle et couverts":"Dishes and silverware","Cuisinière":"Stove",
    "Cuisinière à gaz Other":"Gas stove — other","Four":"Oven","Four en acier inoxydable":"Stainless steel oven",
    "Bouilloire électrique":"Electric kettle","Cafetière":"Coffee maker","Cafetière : machine à expresso":"Coffee maker: espresso machine",
    "Verres à vin":"Wine glasses","Plaques de cuisson":"Hob","Blender":"Blender","Café":"Coffee",
    "Laverie automatique à proximité":"Laundromat nearby","Stationnement gratuit sur place":"Free parking on site",
    "Stationnement gratuit dans la rue":"Free street parking","Jacuzzi privé : disponible toute l'année":"Private hot tub: available year-round",
    "Dépôt de bagages autorisé":"Luggage drop-off allowed","Séjours longue durée autorisés":"Long-term stays allowed",
    "Arrivée autonome":"Self check-in","Boîte à clé sécurisée":"Secure key box","Personnel de l'immeuble":"Building staff",
    "Ménage disponible pendant le séjour":"Cleaning available during the stay","Animaux acceptés":"Pets allowed","Logement fumeur":"Smoking allowed",
    "Détecteur de monoxyde de carbone":"Carbon monoxide alarm","Chauffage":"Heating",
    "Une personne est sur place 24h/24 pour permettre l'accès aux voyageurs.":"Someone is on site 24/7 to provide guest access.",
    "Pour le confort des voyageurs en cas d'arrivée anticipée ou de départ tardif":"For guest convenience in case of early arrival or late departure",
    "Séjours de 28 jours ou plus autorisés":"Stays of 28 days or longer are allowed",
    "Espace où les voyageurs peuvent cuisiner":"Space where guests can cook",
    "Casseroles et poêles, huile, sel et poivre":"Pots and pans, oil, salt and pepper",
    "Assiettes, bols, tasses, couverts et autres ustensiles.":"Plates, bowls, cups, cutlery and other utensils.",
    "boîtier de caméra à l'extérieur":"camera housing outside","exterieure et Gardiennage 24/24":"outdoor cameras and 24/7 security",
    "Exterieure":"Outdoors","Exterieur":"Outdoors","extérieur":"outdoors","exterieur":"outdoors",
    "dans le logement":"in the property","exterieure":"outdoors",
    "TV HD 43 pouces avec Amazon Prime Video, Fire TV, Netflix":"43-inch HD TV with Amazon Prime Video, Fire TV, Netflix",
    "TV HD 43 pouces avec Apple TV, Amazon Prime Video, Disney+, Fire TV, Netflix":"43-inch HD TV with Apple TV, Amazon Prime Video, Disney+, Fire TV, Netflix",
    "TV HD 65 pouces avec Amazon Prime Video, Fire TV, Netflix":"65-inch HD TV with Amazon Prime Video, Fire TV, Netflix",
    "TV HD avec Amazon Prime Video, Netflix, télévision par câble haut de gamme":"HD TV with Amazon Prime Video, Netflix, premium cable TV",
    "Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone. Contactez l'hôte si vous avez des questions.":"This property may not have a carbon monoxide alarm. Contact the host if you have questions.",
    "Le logement n'est pas équipé de détecteur de fumée.":"The property is not equipped with a smoke alarm.",
    "Les animaux d'assistance sont toujours autorisés":"Assistance animals are always allowed"
  };

  const basicBath=["Sèche-cheveux","Produits de nettoyage","Shampoing","Savon pour le corps","Eau chaude"];
  const basicBathFull=["Sèche-cheveux","Produits de nettoyage","Shampoing","Après-shampoing","Savon pour le corps","Eau chaude","Gel douche"];
  const basicBed=[["Lave-linge"],["Produits de base","Serviettes, draps, savon et papier toilette"],["Cintres"],["Linge de lit"],["Oreillers et couvertures supplémentaires"],["Fer à repasser"],["Étendoir à linge"],["Espace de rangement pour les vêtements"]];
  const longService=[["Dépôt de bagages autorisé","Pour le confort des voyageurs en cas d'arrivée anticipée ou de départ tardif"],["Séjours longue durée autorisés","Séjours de 28 jours ou plus autorisés"],["Arrivée autonome"],["Boîte à clé sécurisée"],["Ménage disponible pendant le séjour"]];
  const commonKitchen=[["Cuisine","Espace où les voyageurs peuvent cuisiner"],["Four à micro-ondes"],["Tout le nécessaire pour cuisiner","Casseroles et poêles, huile, sel et poivre"],["Vaisselle et couverts","Assiettes, bols, tasses, couverts et autres ustensiles."],["Four"],["Bouilloire électrique"],["Cafetière"],["Verres à vin"],["Plaques de cuisson"],["Blender"],["Café"]];
  const unavailableCommon=[["Sèche-linge","",true],["Détecteur de monoxyde de carbone","Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone. Contactez l'hôte si vous avez des questions.",true],["Chauffage","",true]];

  const catalog = {
    "niani.html":[
      ["Salle de bain",basicBath],["Chambre et linge",basicBed],["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],
      ["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","boîtier de caméra à l'extérieur"],["Détecteur de fumée"],["Extincteur"],["Trousse de premiers secours"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen.concat([["Réfrigérateur"],["Cuisinière à gaz Other"]])],
      ["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],["Parking et installations",[["Stationnement gratuit sur place"]]],
      ["Services",longService],["Non inclus",unavailableCommon]
    ],
    "wuri.html":[
      ["Salle de bain",[["Sèche-cheveux"]]],["Chambre et linge",[["Produits de base","Serviettes, draps, savon et papier toilette"],["Linge de lit"],["Oreillers et couvertures supplémentaires"],["Fer à repasser"]]],
      ["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],["Chauffage et climatisation",[["Climatisation"]]],["Sécurité à la maison",[["Détecteur de fumée"],["Extincteur"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",[["Cuisine","Espace où les voyageurs peuvent cuisiner"]]],["Parking et installations",[["Stationnement gratuit sur place"]]],
      ["Services",[["Arrivée autonome"],["Personnel de l'immeuble","Une personne est sur place 24h/24 pour permettre l'accès aux voyageurs."]]],
      ["Non inclus",[["Caméras de surveillance extérieures présentes sur place","",true],["Lave-linge","",true],["Sèche-linge","",true],["Détecteur de monoxyde de carbone","Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone. Contactez l'hôte si vous avez des questions.",true],["Chauffage","",true],["Eau chaude","",true]]]
    ],
    "baol.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed.concat([["Stores ou rideaux occultants"]])],
      ["Divertissement",[["TV HD 43 pouces avec Amazon Prime Video, Fire TV, Netflix"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],
      ["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","exterieure et Gardiennage 24/24"],["Détecteur de fumée"],["Extincteur"],["Trousse de premiers secours"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],
      ["Parking et installations",[["Stationnement gratuit sur place"]]],["Services",longService],["Non inclus",unavailableCommon]
    ],
    "damel.html":[
      ["Salle de bain",basicBath],["Chambre et linge",basicBed],["Divertissement",[["TV HD 43 pouces avec Apple TV, Amazon Prime Video, Disney+, Fire TV, Netflix"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],
      ["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","extérieur"],["Détecteur de fumée"],["Extincteur"],["Trousse de premiers secours"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],
      ["Parking et installations",[["Stationnement gratuit sur place"]]],["Services",[["Animaux acceptés","Les animaux d'assistance sont toujours autorisés"],["Dépôt de bagages autorisé","Pour le confort des voyageurs en cas d'arrivée anticipée ou de départ tardif"],["Logement fumeur"],["Séjours longue durée autorisés","Séjours de 28 jours ou plus autorisés"],["Arrivée autonome"],["Boîte à clé sécurisée"],["Ménage disponible pendant le séjour"]]],
      ["Non inclus",unavailableCommon]
    ],
    "ndiambour.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed],["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","extérieur"],["Détecteur de fumée"],["Extincteur"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen.concat([["Réfrigérateur"],["Cuisinière"]])],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],
      ["Parking et installations",[["Stationnement gratuit sur place"]]],["Services",longService],["Non inclus",unavailableCommon]
    ],
    "saloum.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed],["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation : système split sans évacuation"],["Ventilateurs portables"]]],["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","Exterieure"],["Détecteur de fumée"],["Extincteur"],["Trousse de premiers secours"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],
      ["Parking et installations",[["Stationnement gratuit sur place"]]],["Services",longService],["Non inclus",unavailableCommon]
    ],
    "waalo.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed],["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","Exterieur"],["Détecteur de fumée"],["Extincteur"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",[["Cuisine","Espace où les voyageurs peuvent cuisiner"],["Four à micro-ondes"],["Tout le nécessaire pour cuisiner","Casseroles et poêles, huile, sel et poivre"],["Vaisselle et couverts","Assiettes, bols, tasses, couverts et autres ustensiles."],["Congélateur"],["Four"],["Bouilloire électrique"],["Cafetière"],["Verres à vin"],["Blender"],["Café"]]],
      ["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],["Parking et installations",[["Stationnement gratuit sur place"],["Stationnement gratuit dans la rue"]]],["Services",longService],["Non inclus",unavailableCommon]
    ],
    "cayor.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed.concat([["Linge de lit","Linge de lit en coton"]])],
      ["Divertissement",[["TV HD 65 pouces avec Amazon Prime Video, Fire TV, Netflix"]]],["Famille",[["Lit pour bébé"]]],["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],
      ["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","extérieur"],["Détecteur de fumée"],["Extincteur"]]],["Internet et bureau",[["Wifi"]]],
      ["Cuisine et salle à manger",[["Cuisine","Espace où les voyageurs peuvent cuisiner"],["Four à micro-ondes"],["Tout le nécessaire pour cuisiner","Casseroles et poêles, huile, sel et poivre"],["Vaisselle et couverts","Assiettes, bols, tasses, couverts et autres ustensiles."],["Four en acier inoxydable"],["Bouilloire électrique"],["Cafetière : machine à expresso"],["Verres à vin"],["Plaques de cuisson"],["Blender"],["Café"]]],
      ["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],["Parking et installations",[["Stationnement gratuit sur place"]]],["Services",longService],["Non inclus",unavailableCommon]
    ],
    "djolof.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",[["Lave-linge"],["Produits de base","Serviettes, draps, savon et papier toilette"],["Cintres"],["Linge de lit"],["Oreillers et couvertures supplémentaires"],["Fer à repasser"],["Étendoir à linge"]]],
      ["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],
      ["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","exterieur"],["Détecteur de fumée"],["Extincteur"]]],["Internet et bureau",[["Wifi"]]],
      ["Cuisine et salle à manger",commonKitchen],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],["Parking et installations",[["Stationnement gratuit sur place"],["Stationnement gratuit dans la rue"]]],
      ["Services",longService],["Non inclus",unavailableCommon]
    ],
    "foutahto.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed.concat([["Stores ou rideaux occultants"]])],["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","Extérieur"],["Détecteur de fumée"],["Extincteur"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],
      ["Parking et installations",[["Stationnement gratuit sur place"],["Stationnement gratuit dans la rue"],["Jacuzzi privé : disponible toute l'année"]]],
      ["Services",[["Dépôt de bagages autorisé","Pour le confort des voyageurs en cas d'arrivée anticipée ou de départ tardif"],["Logement fumeur"],["Séjours longue durée autorisés","Séjours de 28 jours ou plus autorisés"],["Arrivée autonome"],["Boîte à clé sécurisée"],["Ménage disponible pendant le séjour"]]],
      ["Non inclus",unavailableCommon]
    ],
    "thiossane.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed],["Divertissement",[["TV HD avec Amazon Prime Video, Netflix, télévision par câble haut de gamme"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],["Internet et bureau",[["Wifi"]]],
      ["Cuisine et salle à manger",commonKitchen],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],["Parking et installations",[["Stationnement gratuit sur place"],["Stationnement gratuit dans la rue"]]],
      ["Services",[["Dépôt de bagages autorisé","Pour le confort des voyageurs en cas d'arrivée anticipée ou de départ tardif"],["Séjours longue durée autorisés","Séjours de 28 jours ou plus autorisés"],["Arrivée autonome"],["Personnel de l'immeuble","Une personne est sur place 24h/24 pour permettre l'accès aux voyageurs."],["Ménage disponible pendant le séjour"]]],
      ["Non inclus",[["Caméras de surveillance extérieures présentes sur place","",true],["Sèche-linge","",true],["Détecteur de fumée","Le logement n'est pas équipé de détecteur de fumée.",true],["Détecteur de monoxyde de carbone","Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone. Contactez l'hôte si vous avez des questions.",true],["Chauffage","",true]]]
    ],
    "sine.html":[
      ["Salle de bain",basicBathFull],["Chambre et linge",basicBed.concat([["Sèche-linge","dans le logement"]])],["Divertissement",[["Télévision"]]],["Famille",[["Lit pour bébé"]]],
      ["Chauffage et climatisation",[["Climatisation"],["Ventilateurs portables"]]],["Sécurité à la maison",[["Caméras de surveillance extérieures présentes sur place","extérieur"],["Détecteur de fumée"],["Extincteur"]]],
      ["Internet et bureau",[["Wifi"]]],["Cuisine et salle à manger",commonKitchen.concat([["Réfrigérateur"],["Cuisinière à gaz Other"]])],["Caractéristiques de l'emplacement",[["Laverie automatique à proximité"]]],
      ["Parking et installations",[["Stationnement gratuit sur place"],["Stationnement gratuit dans la rue"]]],
      ["Services",[["Dépôt de bagages autorisé","Pour le confort des voyageurs en cas d'arrivée anticipée ou de départ tardif"],["Séjours longue durée autorisés","Séjours de 28 jours ou plus autorisés"],["Arrivée autonome"],["Personnel de l'immeuble","Une personne est sur place 24h/24 pour permettre l'accès aux voyageurs."],["Ménage disponible pendant le séjour"]]],
      ["Non inclus",[["Détecteur de monoxyde de carbone","Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone. Contactez l'hôte si vous avez des questions.",true],["Chauffage","",true]]]
    ]
  };

  function t(value, language) {
    if (!value) return "";
    return language === "en" ? (en[value] || value) : value;
  }

  function render(language) {
    const host = document.getElementById("amenitiesGrid");
    const section = document.getElementById("amenities");
    if (!host || !section) return;
    const key = location.pathname.split("/").pop() || "index.html";
    const data = catalog[key];
    if (!data) { section.hidden = true; host.innerHTML = ""; return; }
    section.hidden = false;
    let html = '<div class="amenities-heading"><span class="eyebrow">' + (language === "en" ? "Amenities" : "Équipements") + '</span><h2>' + t("Ce que propose ce logement",language) + '</h2><p>' + t("Les équipements et services pensés pour un séjour confortable.",language) + '</p></div><div class="amenities-grid">';
    data.forEach(function (cat, index) {
      html += '<article class="amenity-card"><div class="amenity-card-head"><span class="amenity-index">' + String(index+1).padStart(2,"0") + '</span><h3>' + (language === "en" ? (categoryEN[cat[0]] || cat[0]) : cat[0]) + '</h3></div><ul>';
      cat[1].forEach(function (item) {
        const name=item[0], note=item[1] || "", unavailable=!!item[2];
        html += '<li class="' + (unavailable ? "is-unavailable" : "") + '"><span class="amenity-dot" aria-hidden="true"></span><div><strong>' + (unavailable ? (language === "en" ? "Unavailable: " : "Indisponible : ") : "") + t(name,language) + '</strong>' + (note ? '<small>' + t(note,language) + '</small>' : '') + '</div></li>';
      });
      html += '</ul></article>';
    });
    html += '</div>';
    host.innerHTML = html;
  }

  window.KeurDiaAmenities = { render: render };
})();