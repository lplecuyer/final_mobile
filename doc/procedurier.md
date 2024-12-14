
# Procedurier

### Utilisateurs de test
- username: _test_ password: _test_
- username: _Louis_ password: _Allo_

### Menu Principal
| Action | Consequence |
|--------|-------------|
| Bouton Connexion | navigue vers la page de connexion
| bouton S'inscrire | navigue vers la page d'inscription |
| bouton Comment obtenir sa cle d'API Steam | navigue vers un cours tutoriel pou obtenir sa cle d'API |

### Menu D'inscription
| Action | Consequence |
|--------|-------------|
| nom vide | Toast erreur |
| mot de passe moins de 4 caracteres | Toast erreur |
| mot de passe et confirmation differents | Toast erreur |
| Cle d'api ou steam_id invalide | Toast erreur |
| bouton S'inscrire avec tous les champs bons | creation de compte et navigue vers menu principal |

### Menu de connexion
| Action | Consequence |
|--------|-------------|
| bouton connexion avec infos incorrectes | Toast erreur |
| bouton connexion avec bonnes infos | navigue vers liste de jeux |

### Liste de jeu (Louis-Philippe)
| Action | Consequence |
|--------|-------------|
| Picker de tri de la liste | Choix entre alphabetique ou alphabetique inverse, tri la liste en fonction du choix de l'utilisateur |
| barre de recherche | permet de rechercher les jeux voulu |
| Bouton Shtweam en haut a gauche | navigue un ecran en arriere (ce bouton est sur toutes les vues et ne fera rien si on appuie dessus a la premiere vue (menu principal)) |
| Clique sur un jeu | Navigue a la page des reviews du jeu |

### Nav Bar (Charles-Thomas, Louis-Philippe)
| Action | Consequence |
|--------|-------------|
| bouton Games List | Navigue a la liste de jeux |
| bouton Discover | Navigue a la liste d'un review d'un jeu au hazard |
| bouton My account | Navigue a la page de l'utilisateur |

### Menu utilisateur (Louis-Philippe)
| Action | Consequence |
|--------|-------------|
| Bouton Se deconnecter | nevigue au menu principal et vide le "loggedinUser" |
| clique sur un review de la liste | navigue vers la page de commentaires du review |
| clique sur un jeu SANS ETRE IMPORTÉ | Toast warn |
| bouton Importer mes jeux steam | les jeux dont l'utilisateur est proprietaire sur son compte Steam officiel s'importe dans la bd martha |
| bouton Unimport | supprime le jeu de la table Users_Games (le jeu reste dans la bd mais il "n'appartient plus" a l'utilisateur) |
| clique sur un jeu apres importation | navigue a la page de modification de completion du jeu |

### Page de modification de completion du jeu (Louis-Philippe)
| Action | Consequence |
|--------|-------------|
| picker niveau de completion | l'utilisateur choisi le niveau de completion pour le jeu |
| bouton Sauvegarder le status | sauvegarde l'etat du jeu et navigue au menu utilisateur |

### Liste de reviews pour un jeu (Louis-Philippe)
| Action | Consequence |
|--------|-------------|
| Si le jeu appartient a l'utilisateur | affiche texte "Vous possedez ce jeu" |
| Si le jeu appartient a l'utilisateur ET n'a pas fait de review | bouton "Ajouter une Review" devient disponible |
| Bouton "Ajouter une Review | navigue vers la page d'ajout |
| si un autre utilisateur ou l'utilisateur courrant a deja review | peux cliquer sur la review |
| clique une review | navigue vers la page de commentaires de la review |
| si l'utilisateur a deja Review | offre les options suivantes |
| Bouton modifier | navigue vers la page de modification (la meme page qu'ajout) |
| bouton Supprimer | Alert de confirmation |
| Confirme la suppression | Supprime le review et tous ses commentaires sous-jacents |

### Page de modification/ajout de Review (Louis-Philippe)
| Action | Consequence |
|--------|-------------|
| titre moins de 5 caracteres | alert erreur |
| Bouton Sauvegarder | ajoute ou enregistre les modifications dependament des arguments recus, navigue a la page precedente |

### Page de commentaires pour un Review (Charles-Thomas)
| Action | Consequence |
|--------|-------------|
| champ de texte vide | le commentaire ne s'ajoutera pas |
| champ de texte non vide et clique sur Ajouter | ajoute le commentaire a la fin e la liste en dessous du review |
| si le commentaire appartient a l'utilisateur courant | obtien l'option bouton modifier |
|bouton modifier | navigue vers la page de modification de commentaire |
| champ de texte vide | le commentaire ne sera pas modifier |
| bouton Sauvegarder | sauvegarde le nouveau texxte du commentaire |