# Cloud Native Platform — Site vitrine

Site vitrine du **MVP** de Cloud Native Platform (CNP), une plateforme interne
de développement *repository-first*. Le site présente, en une seule page, ce que
le MVP fait, comment il fonctionne et ce qui a été validé de bout en bout.

🔗 Démo : [cnp.mindsept.fr](https://cnp.mindsept.fr) · Vidéo : [youtu.be/oktI_UPA9Bk](https://youtu.be/oktI_UPA9Bk)

## Ce que montre le site

- **Hero** — pitch du produit, badge MVP, et un aperçu vidéo (miniature) qui ouvre
  la démo complète dans une modale.
- **MVP outcome** — les 8 étapes validées de bout en bout, sous forme de registre
  de validation.
- **Product flow** — le parcours complet : login → analyse → CI → image GHCR →
  CD → déploiement AKS → URL publique, chaque changement passant par une Pull Request.
- **Architecture** — l'architecture de production (frontend Vercel, Nginx OVH,
  FastAPI, PostgreSQL, worker, intégrations GitHub / Azure).
- **CI / CD** — génération déterministe de la CI (détection de stack → template),
  aperçu des fichiers générés (`ci.yml`, `cd.yml`, `deployment.yaml`), et le dossier
  `k8s/` généré présenté comme une arborescence GitHub.
- **Secrets & registry** — comment les secrets sont chiffrés et synchronisés sans
  jamais être exposés.
- **Sécurité** — le modèle de contrôle (auth JWT, tokens d'installation GitHub,
  approbations humaines, audit, etc.).
- **Roadmap** — les 6 itérations du MVP et la suite (multi-cloud Azure / AWS / GCP),
  en distinguant clairement ce qui est validé de ce qui est prévu.
- **Stack & démo** — la stack technique du produit et un récapitulatif du
  déploiement validé.

## Lancer le site

```bash
npm install
npm run dev      # développement
npm run build    # build de production → dist/
```
