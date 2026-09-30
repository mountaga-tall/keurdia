# Keur Ndeye Anta Dia — KeurDia

Site statique de présentation et de réservation de Keur Ndeye Anta Dia à Dakar.

## Architecture

Le projet est composé de pages HTML statiques, d'un fichier CSS partagé (`style.css`), d'un script client (`script.js`), d'un service worker (`sw.js`) et d'un manifeste PWA (`manifest.json`).

Les pages principales sont :

- `index.html` : accueil
- `appartements.html` : catalogue des 13 appartements
- `experience.html` : expérience et services
- `contact.html` : formulaire de demande de réservation
- `*.html` : pages détaillées de chaque appartement

## Authentification : état actuel

Il n'y a **pas de système d'authentification applicatif** dans ce dépôt.

Il n'y a pas de :

- compte utilisateur / mot de passe ;
- endpoint `/login`, `/signup` ou `/logout` ;
- session serveur ;
- JWT, access token ou refresh token ;
- stockage de credentials côté serveur ;
- base de données d'utilisateurs.

Le terme « authentification » ne doit donc pas être utilisé pour décrire le parcours actuel : le site est un frontend statique public.

### Composants du parcours de réservation

`contact.html` affiche le formulaire. `script.js` :

1. valide les champs dans le navigateur ;
2. vérifie les dates d'arrivée/départ ;
3. vérifie le format de l'e-mail ;
4. vérifie que le téléphone contient un nombre raisonnable de chiffres ;
5. construit un message texte ;
6. redirige vers une URL `wa.me` avec le message encodé en query string.

### Flux de requête

```text
Navigateur
   |
   | GET page HTML / CSS / JS
   v
Hébergement statique
   |
   | formulaire localement validé
   v
script.js
   |
   | création d'une URL https://wa.me/...
   v
WhatsApp
```

Il n'existe donc pas de requête d'authentification vers un backend KeurDia.

## Credentials, données personnelles et tokens

Les données saisies dans le formulaire (nom, prénom, téléphone, e-mail, appartement, dates et message) sont assemblées **dans le navigateur** puis placées dans le message WhatsApp.

Le dépôt ne contient pas de secret serveur pour traiter ces données et ne persiste pas localement un mot de passe ou un token d'utilisateur.

Le numéro WhatsApp de destination est codé dans `script.js`. Ce n'est pas un credential d'authentification : c'est simplement le numéro public de contact utilisé pour la réservation.

## Multilingue FR / EN

Le site supporte désormais le français et l'anglais sans dupliquer les pages.

Le sélecteur **FR / EN** est injecté par `script.js`. La langue choisie est mémorisée dans `localStorage` sous la clé `keurdia-lang`.

Le changement de langue met à jour :

- les libellés de navigation ;
- les titres et textes principaux ;
- les libellés/erreurs du formulaire ;
- les placeholders et attributs d'accessibilité connus ;
- le titre et la meta-description de la page ;
- le message WhatsApp généré pour une réservation.

## Corrections récentes

- validation e-mail corrigée ;
- validation du numéro de téléphone renforcée ;
- gestion des dates d'arrivée/départ conservée et sécurisée ;
- chargement de galerie rendu résistant aux changements rapides de photo ;
- suppression du `src` de l'image de galerie en cas d'erreur pour éviter un état visuel incohérent ;
- cache du service worker passé en `keurdia-v14` pour forcer la prise en compte des nouveaux assets ;
- ajout du sélecteur FR / EN et persistance de la langue.

## Déploiement

Le dépôt contient également `wrangler.jsonc` pour un déploiement d'assets statiques avec Cloudflare Workers/Pages-compatible tooling.

Le domaine déclaré dans `CNAME` est `keurdia.sn`.

## Sécurité

Le site ne collecte actuellement pas les credentials d'un compte utilisateur. Si une authentification réelle doit être ajoutée plus tard, elle devra être conçue comme un backend séparé avec gestion sécurisée des mots de passe (hash côté serveur), cookies de session sécurisés ou tokens avec durée de vie/révocation adaptées, et sans exposer de secrets dans le JavaScript public.
