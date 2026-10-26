# ALIEN – Lanceur de dés

Lanceur de dés pour le JDR **ALIEN**, sans dés physiques.
Dérivé de [jkottler/myz-roller](https://github.com/jkottler/myz-roller) (licence MIT, voir `LICENSE`).

## Les dés

- **Dé de base (noir)** : face 6 = réticule (succès), les autres faces sont vierges.
- **Dé de stress (jaune)** : face 6 = réticule (succès), face 1 = facehugger, les autres faces sont vierges.

## Fonctionnement

- **Stress (dés jaunes)** : un seul compteur. Le niveau de stress est le nombre de dés de stress lancés avec la pool.
- **Pousser** (une seule fois par jet) : relance tous les dés qui ne montrent pas un 6 et ajoute 1 au stress, donc 1 dé de stress. Impossible si un facehugger est sorti.
- **Jet passif** (interrupteur stress désactivé) : les dés de stress ne sont pas ajoutés à la pool, pas de push possible, donc pas de panique. Le niveau est conservé pour la réactivation.
- **Résultat** : nombre total de succès (6 sur tous les dés) et nombre de facehuggers.
- **Jet de panique** : lancé automatiquement quand un facehugger sort. Affiche le D6 et le D6 + niveau de stress.
- **Dés classiques** (onglet) : D6, 2D6 additionnés (2-12) et D66 (dizaine + unité, 11-66), avec un bouton pour réinitialiser l'affichage.
- **Réserve** (onglet) : lance autant de dés jaunes que le niveau de réserve (air, nourriture, eau, batterie…). Le niveau baisse de 1 par facehugger.

## Logos

Le réticule (`src/components/reticle.svg`) et le logo des dés de stress (`src/components/facehugger.svg`) sont des SVG vectorisés à partir d'icônes fournies. Pour les remplacer par les logos officiels, garder les mêmes noms de fichiers et utiliser `fill="currentColor"` pour que la couleur s'adapte au dé (blanc sur noir, noir sur jaune).
Si les icônes viennent de [game-icons.net](https://game-icons.net) (licence CC BY 3.0), penser à créditer leurs auteurs.

## Développement

```
npm install
npm start        # serveur de dev
npm test         # tests
npm run build    # build de production (dossier build/, chemins relatifs)
npm run deploy   # publication sur GitHub Pages (gh-pages)
```
