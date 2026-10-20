# ALIEN – Lanceur de dés

Lanceur de dés pour le JDR **ALIEN**, sans dés physiques.

## Demo

[Try Alien RPG Dice Roller](https://erwan-warenghem.github.io/alien-rpg-dice-roller/)

This is my modified version of the original project.
Original repository: jkottler/myz-roller (licence MIT, voir `LICENSE`).


## Les dés

- **Dé de base (noir)** : face 6 = réticule (succès), les autres faces sont vierges.
- **Dé de stress (jaune)** : face 6 = réticule (succès), face 1 = facehugger, les autres faces sont vierges.

## Fonctionnement

- **Niveau de stress** : saisir le niveau ajoute automatiquement le même nombre de dés de stress à la pool.
- Les deux types de dés restent ajustables à la main (boutons −/+ ou saisie).
- **Pousser** (une seule fois par jet) : relance tous les dés qui ne montrent pas un 6, ajoute 1 au niveau de stress et 1 dé de stress. Impossible si un facehugger est sorti.
- **Jet passif** (interrupteur stress désactivé) : les dés de stress ne sont pas ajoutés à la pool, pas de push possible, donc pas de risque de panique. Les valeurs de stress sont conservées pour la réactivation.
- **Résultat** : nombre total de succès (6 sur tous les dés) et nombre de facehuggers.
- **Jet de panique** : si un facehugger sort, un bouton lance un D6 (affiché aussi avec le niveau de stress ajouté).
- **Dés classiques** : D6, 2D6 additionnés (2-12) et D66 (dizaine + unité, 11-66).

## Logos

Le réticule (`src/components/reticle.svg`) et le logo des dés de stress (`src/components/facehugger.svg`) sont des SVG vectorisés à partir d'icônes provenant de https://game-icons.net (licence CC BY 3.0). Pour les remplacer par les logos officiels, garder les mêmes noms de fichiers et utiliser `fill="currentColor"` pour que la couleur s'adapte au dé (blanc sur noir, noir sur jaune).

## Développement

```
npm install
npm start        # serveur de dev
npm test         # tests
npm run build    # build de production (dossier build/, chemins relatifs)
npm run deploy   # publication sur GitHub Pages (gh-pages)
```
