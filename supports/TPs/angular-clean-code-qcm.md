### QCM - Clean Code et Angular

#### 1. Que signifie le principe de "Single Responsibility" dans le Clean Code appliqué à Angular ?
   - A) Une fonction ou une classe doit avoir plusieurs responsabilités
   - B) Une fonction ou une classe doit avoir une seule responsabilité X
   - C) Une fonction Angular doit gérer tous les services
   - D) Un composant doit gérer la logique métier et la présentation

#### 2. Quel est le rôle des **services** dans l'application Angular par rapport au Clean Code ?
   - A) Centraliser la logique métier pour éviter sa duplication dans les composants X
   - B) Gérer les templates des composants
   - C) Créer et gérer des modules Angular
   - D) Contenir la logique de style CSS

#### 3. Quelle est la bonne pratique pour nommer les classes et fichiers en Angular ?
   - A) Utiliser des abréviations partout
   - B) Utiliser des noms explicites et représentatifs X
   - C) Utiliser des noms courts pour réduire la taille des fichiers
   - D) Mélanger les conventions de nommage

#### 4. Pourquoi est-il important d'avoir des **fonctions courtes** et **claires** dans le développement Angular ?
   - A) Cela permet de réduire le nombre de fichiers nécessaires
   - B) Cela améliore la lisibilité et la maintenabilité du code x
   - C) Cela empêche l'optimisation du code par Angular
   - D) Cela rend le code plus performant

#### 5. Comment le principe **DRY (Don’t Repeat Yourself)** s'applique-t-il dans une application Angular ?
   - A) En évitant de répéter la logique métier dans plusieurs composants X
   - B) En répétant le même code dans tous les services pour la cohérence
   - C) En créant des composants identiques pour chaque vue
   - D) En utilisant le même nom de fonction dans différents services

#### 6. Quel est le risque d'un composant Angular avec trop de responsabilités ?
   - A) Le composant devient plus performant
   - B) Le composant devient difficile à maintenir et à tester X
   - C) Le composant est plus facile à réutiliser
   - D) Il n'y a aucun risque

#### 7. Dans Angular, quelle est la bonne pratique concernant les imports de services dans les modules ?
   - A) Importer tous les services dans chaque composant
   - B) Déclarer les services dans `providers` au niveau du module pour éviter les duplications X
   - C) Importer les services directement dans le fichier `main.ts`
   - D) Ajouter les services dans chaque fichier de test

#### 8. Quel est le rôle des **intercepteurs HTTP** en termes de Clean Code dans une application Angular ?
   - A) Répéter le code dans chaque requête pour la traçabilité
   - B) Centraliser la gestion des requêtes HTTP (ex. : gestion des erreurs, authentification) X
   - C) Transformer les réponses HTTP uniquement
   - D) Remplacer les services Angular

#### 9. Quel principe encourage à ne pas écrire de fonctionnalités tant qu'elles ne sont pas nécessaires ?
   - A) KISS
   - B) YAGNI (You Aren't Gonna Need It) X
   - C) DRY
   - D) SOLID

#### 10. Pourquoi est-il recommandé d’utiliser des **interfaces** ou **types** en Angular ?
   - A) Pour rendre le code plus abstrait et difficile à comprendre
   - B) Pour s'assurer que les données sont typées correctement, facilitant la lisibilité et la détection des erreurs X
   - C) Pour permettre à Angular de générer automatiquement les composants
   - D) Pour rendre le code plus long

#### 11. Qu'est-ce qu'une **fonction pure** dans le cadre du Clean Code ?
   - A) Une fonction qui modifie l’état global de l’application
   - B) Une fonction qui n'a pas d'effets de bord et retourne toujours la même valeur pour les mêmes arguments X
   - C) Une fonction qui peut être appelée sans être importée
   - D) Une fonction qui change les variables globales

#### 12. Comment appliquer le principe de **séparation des préoccupations** dans un projet Angular ?
   - A) Regrouper toute la logique métier, les appels API et la présentation dans les mêmes composants
   - B) Séparer la logique métier dans les services et la logique de présentation dans les composants X
   - C) Créer un seul fichier pour toute l'application
   - D) Centraliser toute la logique dans un seul module

#### 13. Quel est l'avantage d'utiliser des **modèles (models)** bien définis dans un projet Angular ?
   - A) Ils simplifient l'import des données depuis les composants
   - B) Ils permettent de structurer les données de manière claire et cohérente dans toute l'application X
   - C) Ils améliorent les performances réseau
   - D) Ils réduisent la quantité de code TypeScript

#### 14. Comment le principe **KISS (Keep It Simple, Stupid)** s'applique-t-il à Angular ?
   - A) Simplifier autant que possible le code et les composants pour qu'ils soient facilement compréhensibles X
   - B) Utiliser un seul fichier pour toute l'application
   - C) Éviter d'utiliser des services et centraliser toute la logique dans les composants
   - D) Ne pas écrire de tests pour ne pas compliquer le développement

#### 15. Quelle est la principale utilité des **modules partagés (Shared Modules)** en Angular ?
   - A) Réduire la taille des fichiers HTML
   - B) Partager des composants, directives et services communs à plusieurs modules X
   - C) Partager les templates entre les différentes applications
   - D) Gérer l'authentification

#### 16. Pourquoi est-il important d’avoir des **tests unitaires** pour les services et composants Angular ?
   - A) Pour rendre l'application plus rapide
   - B) Pour garantir que les fonctionnalités fonctionnent comme prévu et pour faciliter les futures modifications X
   - C) Pour générer automatiquement de la documentation
   - D) Pour ne pas avoir à écrire de code

#### 17. Quel est le **principe SOLID** qui stipule qu’une classe doit pouvoir être étendue, mais non modifiée ?
   - A) Principe de responsabilité unique
   - B) Principe d'ouverture/fermeture (Open/Closed Principle) B
   - C) Principe de substitution de Liskov
   - D) Principe de ségrégation des interfaces

#### 18. Pourquoi éviter les **fonctions trop longues** dans un composant Angular ?
   - A) Cela complique la lisibilité et la réutilisation du code X
   - B) Cela rend le composant plus rapide
   - C) Cela rend les tests unitaires inutiles
   - D) Cela est nécessaire pour éviter les dépendances multiples

#### 19. Quelle est la meilleure manière d'organiser les **routes** dans une grande application Angular ?
   - A) Regrouper toutes les routes dans un seul fichier
   - B) Utiliser le lazy loading et les modules de fonctionnalités pour organiser les routes X
   - C) Ne pas utiliser de routes dans une grande application
   - D) Utiliser uniquement un seul module pour toutes les routes

#### 20. Quel est l’intérêt de **découper un composant Angular en sous-composants** ?
   - A) Pour rendre le projet plus complexe
   - B) Pour faciliter la réutilisation et la maintenabilité du code X
   - C) Pour réduire la taille de l’application
   - D) Pour éviter les tests unitaires

#### 21. Que signifie le principe **YAGNI** en Angular ?
   - A) Implémenter toujours toutes les fonctionnalités au début d'un projet
   - B) Ne pas développer de fonctionnalités inutiles avant qu'elles ne soient nécessaires X
   - C) Ne jamais écrire de tests pour des fonctionnalités existantes
   - D) Toujours importer tous les modules Angular

#### 22. Comment pouvez-vous gérer les **dépendances circulaires** dans un projet Angular propre ?
   - A) Ignorer les dépendances circulaires
   - B) Utiliser des services pour découpler les dépendances et éviter les références croisées X
   - C) Toujours utiliser `NgModule` pour toutes les dépendances
   - D) Ajouter toutes les dépendances dans un seul fichier

#### 23. Que signifie **l'injection de dépendances** en Angular ?
   - A) Centraliser toute la logique dans les composants
   - B) Injecter automatiquement des services et autres dépendances dans les composants et services X
   - C) Ne pas avoir besoin d’importer les modules
   - D) Utiliser uniquement les dépendances internes d’Angular

#### 24. Pourquoi est-il important d'utiliser des **pipes** dans Angular pour formater les données dans un template ?
   - A) Pour rendre le code plus long
   - B) Pour éviter de formater les données directement dans le composant X
   - C) Pour augmenter la performance du composant
   - D) Pour éviter les appels réseau

#### 25. Pourquoi le **refactoring** est-il important dans le Clean Code ?
   - A) Pour ajouter plus de fonctionnalités au code
   - B) Pour améliorer la lisibilité, la performance et réduire la complexité du code X
   - C) Pour supprimer des tests unitaires inutiles
   - D) Pour rendre le code plus long

#### 26. En Clean Code, comment structurer un projet Angular ?
   - A) En regroupant toutes les fonctions et services dans un seul fichier
   - B) En organisant les modules par fonctionnalités, avec des composants et services spécifiques X
   - C) En écrivant le moins de code possible dans chaque fichier
   - D) En n’utilisant que des fichiers `.html`

#### 27. Quelle est l'utilité des **directives structurelles** comme `ngFor` et `ngIf` dans un projet Angular propre ?
   - A) Elles permettent de manipuler le DOM de manière déclarative, rendant le code plus lisible et maintenable X
   - B) Elles réduisent la quantité de TypeScript nécessaire dans les services
   - C) Elles sont utilisées pour valider les formulaires
   - D) Elles simplifient la création de modules

#### 28. Pourquoi est-il déconseillé d’utiliser des **variables globales** dans une application Angular ?
   - A) Cela complique les tests et la maintenabilité du code X
   - B) Cela ralentit l’application
   - C) Cela augmente la taille des fichiers `.ts`
   - D) Cela permet de créer des services plus rapidement

#### 29. Quel est l'avantage de l'utilisation de **Lazy Loading** en Angular ?
   - A) Cela améliore les performances en chargeant uniquement les modules nécessaires à l'affichage des pages X
   - B) Cela rend le code plus difficile à lire
   - C) Cela empêche l'application d'avoir plusieurs modules
   - D) Cela est utilisé uniquement pour les applications monolithiques

#### 30. Pourquoi utiliser des **tests unitaires** et **tests d'intégration** dans une application Angular ?
   - A) Pour améliorer les performances de l'application
   - B) Pour s'assurer que les fonctionnalités fonctionnent comme prévu et que l'intégration des modules est correcte X
   - C) Pour écrire moins de code
   - D) Pour rendre l'application plus difficile à maintenir

