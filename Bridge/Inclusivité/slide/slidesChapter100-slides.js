/**
*Sous-titres-Chapitre100 - Manuel User
*ConférenceBRIDGE-BridgingResearchandInclusiveDigitalEducation
*
*Format:{start,end,image}-timecodesensecondes(float)
*Lestermestechniquesliésàl'inclusionsontsurlignésenjaune
*via<fontcolor="#FFFF00">...</font>
*9; 48; 124; 182
*Languesdisponibles:FR(originale),EN,ES,IT
**/

var SLIDES_CH100 = [
{ start: 1.000, end: 2.999, image:'image/Bridge.jpg'},
	{ start: 3.000, end: 12.000, image:'image/Chapter100/Diapositive2.jpg'}, 
	{ start: 12.001, end: 34.000, image:'image/Chapter100/Diapositive4.jpg'}, 
	{ start: 34.001, end: 56.000, image:'image/Chapter100/Diapositive2.jpg'}, 
  	{ start: 56.001, end: 96.000, image:'image/Chapter100/Diapositive3.jpg'},	
	{ start: 96.001, end: 131.000, image:'image/Chapter100/Diapositive5.jpg'},	
	{ start: 131.001, end: 160.000, image:'image/Chapter100/Diapositive6.jpg'},
	{ start: 160.001, end: 198.000, image:'image/Chapter100/Diapositive7.jpg'},
  	{ start: 198.001, end: 220.000, image:'image/Chapter100/Diapositive8.jpg'},
  	{ start: 220.001, end: 250.000, image:'image/Chapter100/Diapositive9.jpg'},
	{ start: 250.001, end: 327.000, image:'image/Chapter100/Diapositive10.jpg'},
{start:327.001,end:330.000,image:'image/Thankyou.JPG'},

];


/*
const SUBTITLES_FR_CH100 = [
  { start: 0.000, end: 6.000, text: 'Bienvenue dans ce mode d’emploi audio-visuel du lecteur de cours BRIDGE.' },
  { start: 6.000, end: 12.000, text: 'Cette vidéo présente le fonctionnement du lecteur et de son menu contextuel.' },
  
diapo 4
{ start: 12.000, end: 20.000, text: 'Le menu s’ouvre avec un clic droit de la souris sur la zone principale du lecteur.' },
  { start: 20.000, end: 27.000, text: 'Sur un écran tactile, maintenez le doigt environ une seconde sur la diapositive.' },
  { start: 27.000, end: 34.000, text: 'Pour afficher le menu natif du navigateur, utilisez plutôt Maj plus clic droit.' },

Diapo 2
  { start: 34.000, end: 41.000, text: 'Le menu regroupe les commandes essentielles sans remplacer l’interface habituelle du lecteur.' },
  { start: 41.000, end: 48.000, text: 'Les réglages effectués dans ce menu sont appliqués et enregistrés par le lecteur.' },
  { start: 48.000, end: 56.000, text: 'La première commande permet de lire ou de mettre en pause la présentation.' },

diapo 3
 { start: 56.000, end: 64.000, text: 'Vous pouvez changer la langue audio et des sous-titres' },
  { start: 64.000, end: 72.000, text: 'Vous pouvez changer la langue des commandes, de l\'audio et des sous-titres' },
  { start: 72.000, end: 80.000, text: '20 langues sont disponibles pour changer les commandes' },
  { start: 80.000, end: 88.000, text: 'Uniquement certaines sont disponibles pour l\'audio et les sous-titres' },
  { start: 88.000, end: 96.000, text: 'Les options non disponibles basculent automatiquement en francais.' },
  
diapo 5
{ start: 96.000, end: 103.000, text: 'Juste en dessous, la commande Loupe active une loupe d’écran.' },
  { start: 103.000, end: 111.000, text: 'Lorsque la loupe est active, une lentille circulaire suit le curseur de la souris.' },
  { start: 111.000, end: 118.000, text: 'Elle agrandit la zone survolée, ce qui facilite la lecture des textes et des détails.' },
  { start: 118.000, end: 125.000, text: 'Pour retirer la loupe, effectuez un nouveau clic droit.' },
  { start: 125.000, end: 131.000, text: 'Vous pouvez également appuyer sur la touche Échap.' },

Diapo 6
  { start: 131.000, end: 139.000, text: 'Les boutons suivants permettent de reculer ou d’avancer de cinq secondes.' },
  { start: 139.000, end: 146.000, text: 'La commande Début du chapitre ramène la lecture au commencement du chapitre.' },
  { start: 146.000, end: 153.000, text: 'La commande Son permet de couper ou de réactiver le son.' },
  { start: 153.000, end: 160.000, text: 'Le raccourci clavier M effectue la même action.' },

Diapo 7
  { start: 160.000, end: 168.000, text: 'Dans la section Chapitres, vous pouvez passer au chapitre précédent ou suivant.' },
  { start: 168.000, end: 176.000, text: 'La liste affiche également tous les chapitres du cours.' },
  { start: 176.000, end: 183.000, text: 'Cliquez sur un chapitre pour vous y rendre directement.' },
  { start: 183.000, end: 191.000, text: 'La section Sous-titres permet de choisir la langue des sous-titres.' },
  { start: 191.000, end: 198.000, text: 'L’option Aucun désactive l’affichage des sous-titres.' },
  

Diapo 8
{ start: 198.000, end: 206.000, text: 'Dans la partie Accessibilité, vous pouvez modifier la taille des sous-titres.' },
  { start: 206.000, end: 213.000, text: 'Trois tailles sont proposées : petite, normale et grande.' },
  { start: 213.000, end: 220.000, text: 'Vous pouvez aussi augmenter le contraste pour améliorer la lisibilité.' },

Diapo 9
  { start: 220.000, end: 227.000, text: 'La commande Vitesse permet de changer la vitesse de lecture.' },
  { start: 227.000, end: 234.000, text: 'Les vitesses disponibles correspondent aux boutons de vitesse du lecteur.' },
  { start: 234.000, end: 242.000, text: 'La commande Transcription ouvre ou ferme le panneau de transcription.' },
  { start: 242.000, end: 250.000, text: 'Vous pouvez y sélectionner et copier le texte de la transcription.' },

Diapo 10
  { start: 250.000, end: 258.000, text: 'Si l’assistant du cours est disponible, la commande Assistant ouvre sa fenêtre.' },
  { start: 258.000, end: 266.000, text: 'La commande Barre de commandes affiche ou masque la barre de contrôle du lecteur.' },
  { start: 266.000, end: 274.000, text: 'Enfin, la commande Plein écran affiche le lecteur en plein écran.' },
  { start: 274.000, end: 281.000, text: 'Un nouveau clic sur cette commande quitte le mode plein écran.' },
  { start: 281.000, end: 289.000, text: 'Le menu peut être fermé en cliquant en dehors de celui-ci.' },
  { start: 289.000, end: 296.000, text: 'Vous pouvez aussi le fermer avec la touche Échap ou Tab.' },
  { start: 296.000, end: 304.000, text: 'Les flèches haut et bas permettent de naviguer dans les commandes du menu.' },
  { start: 304.000, end: 311.000, text: 'Les touches Début et Fin vont respectivement au premier et au dernier élément.' },
  { start: 311.000, end: 319.000, text: 'La flèche droite ouvre un sous-menu lorsqu’il est disponible.' },
  { start: 319.000, end: 327.000, text: 'Ce menu contextuel rend le lecteur plus rapide à utiliser et plus accessible.' },
  { start: 327.000, end: 335.000, text: 'Merci d’avoir suivi ce mode d’emploi du lecteur BRIDGE.' }
];
*/

