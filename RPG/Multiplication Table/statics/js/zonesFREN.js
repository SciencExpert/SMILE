



/* =========================================================================
   1) CONFIGURATION DES MONDES
0 = fin de jeu
1= start, plateforme centrale
2= village
   ========================================================================= */
const WORLDS = [



    { image: "img/img0.gif",	name: "Debut/Start", 				sound: "sound/Intrigue.mp3", 		start: { x: 500,  y: 580 } },    
    { image: "img/img1.gif", 	name: "Contée/Country", 			sound: "sound/garden.mp3",     		start: { x: 500,  y: 300 } },
    { image: "img/img2.gif", 	name: "Village Le Porge/Porge Village", 	sound: "sound/village.mp3",       	start: { x: 500,  y: 300 } },
    { image: "img/img3.gif", 	name: "Carriere/Quarry",			sound: "sound/Industrial.mp3",  	start: { x: 850,  y: 200 } },
    { image: "img/img4.gif", 	name: "Fontaine/Fountain", 			sound: "sound/water.mp3",       	start: { x: 450,  y: 400 } },
    { image: "img/img5.gif", 	name: "Chateau/Castel", 			sound: "sound/wind.mp3",       		start: { x: 130,  y: 500 } },
    { image: "img/img6.gif", 	name: "Grotte du Chateau/Castle Cave",		sound: "sound/singing-in-a-cave.mp3",	start: { x: 500,  y: 500 } },
    { image: "img/img7.gif", 	name: "Honorable",				sound: "sound/Intrigue.mp3",		start: { x: 500,  y: 520 } },
    { image: "img/img8.png", 	name: "Maison Gerhard/Gerhard House",		sound: "sound/chemine.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img9.png", 	name: "Maison Lily/Lily House",			sound: "sound/chemine.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img10.png", 	name: "Maison Yin/Yin House",			sound: "sound/sakura.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img11.png", 	name: "Maison Gardes/Gard House",		sound: "sound/pub.mp3",			start: { x: 500,  y: 500 } },
    { image: "img/img12.png", 	name: "Caverne Ouest/ West Quarry",		sound: "sound/cave.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img13.png", 	name: "Caverne Est/East Quarry",		sound: "sound/cave.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img14.gif", 	name: "Menhir du Sud/South Menhir",		sound: "sound/water.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img15.gif", 	name: "Menhir de l'Ouest/West Menhir",		sound: "sound/water.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img16.gif", 	name: "Menhir du Nord/North Menhir",		sound: "sound/water.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img17.gif", 	name: "Menhir de l'Est/East Menhir",		sound: "sound/water.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img18.gif", 	name: "Final",					sound: "sound/victory.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/game_over.gif", name: "Final",				sound: "sound/souffrance.mp3",		start: { x: 500,  y: 500 } },
    { image: "img/img20.png", 	name: "Credit",					sound: "Keyboard.mp3",			start: { x: 500,  y: 300 } },
];

const WIDTH = 1000, HEIGHT = 600;

/* =========================================================================
   2) ZONES DE CHAQUE MONDE
   Format d'une zone :

------------------------------------------------------------

     ["block",      x, y, largeur, hauteur, label]

       -> Les block sont toujours infranchissable.
------------------------------------------------------------
     ["question",   x, y, largeur, hauteur, label, idDuJeuDeQuestions, idIndicateur]

       -> Les questions sont traversables ; le joueur qui atteint le centre déclenche la question (réponse libre).

------------------------------------------------------------

     ["quiz",       x, y, largeur, hauteur, label, "QUIZi", idIndicateur]
       -> traversable ; le joueur qui atteint le centre déclenche un QCM à 5 réponses
          (voir QUIZ_SETS). La bonne réponse est toujours écrite en 1ère position dans
          les données, mais affichée à une position aléatoire parmi les 5 boutons.
     ["transition", x, y, largeur, hauteur, label, indexDuMondeCible]

       -> les quizs sont traversables ; le joueur qui y entre change de décor.
 --------------------------------------------------    
["lock",    250,    150,    90,    30,    { (le nom du div)sous la forme:  "Porte d'Aden/"Aden's Door"    },
    "k1",
    1,
    { (le commentaire)
        fr: "Arrête de frapper à la porte ! Aden n'est pas là.",
        en: "Stop knocking on the door! Aden is not here."
    }
]
-------------------------------------------------------------

     ["info",       x, y, largeur, hauteur, "label", "cheminImage", 
    {
        fr: "Bienvenue voyageur ! Explore la plateforme, résous les énigmes du village et trouve ton chemin vers le château.",
        en: "Welcome traveller! Explore the platform, solve the village puzzles and find your way to the castle."
    }]

       -> Les info sont traversables ; dès que le joueur ENTRE dedans, un popup s'affiche avec
          l'image "cheminImage" à gauche et le texte "message" à droite (dialogue,
          explication, indice...). Se ferme avec le bouton OK ou le ×.
-------------------------------------------------------------
     ["item", x, y, Largeur, Hauteur, "Nom de l'item", "Label sur le div",

    {
        fr: "Text Francais en Html",
        en: Text Anglais en Html",
    },
 "Chemin de l'image",
],

       -> les items sont traversables ; dès que le joueur ENTRE dedans (et n'a pas déjà cet objet),
          un popup propose de le ramasser (OUI/NON). Si OUI et que l'inventaire
          (limité à 5 objets, compteur kObjet) n'est pas plein, "nomDeLObjet" est
          mémorisé dans l'inventaire. Si l'inventaire est plein, le joueur est
          alerté et doit d'abord en jeter un via le bouton "🎒 Inventaire".
   ========================================================================= */
const zonesByWorld = {
//   ====================================================================================================================Acceuil 
    0: [
        ["transition", 730, 300, 250, 150, "", 1],
//-------------------------------------------------------------------------------------
	["info", 725, 295, 245, 145, "Bienvenue", "img/face2.png", 
    	{
        fr: "Bienvenue voyageur ! Explore la plateforme, résous les énigmes du village et trouve ton chemin vers le château.",
        en: "Welcome traveller! Explore the platform, solve the village puzzles and find your way to the castle."
	  }],
    ],
//   ====================================================================================================================contrée 
    1: [
        ["block", 200, 80, 130, 250, "Block"],
        ["block", 600, 150, 350, 350, "Block"],
        ["block", 400, 350, 200, 50, "Block"],
        ["block", 100, 500, 900, 80, "Block"],
//-------------------------------------------------------------------------------------
        ["question", 400, 150, 190, 50, "Question Village", "RubiqueQ1", "k1"],
        ["question", 100, 300, 90, 90, "Question Carriere/Quarry", "RubiqueQ1", "k1"],
        ["question", 400, 400, 100, 100, "Question Fontaine/Fountain", "RubiqueQ1", "k1"],
        ["question", 600, 50, 150, 50, "Question Chateau/Castel", "RubiqueQ1", "k1"],
//-------------------------------------------------------------------------------------
        ["transition", 100, 200, 90, 90, "Carriere/Quarry", 3],
        ["transition", 520, 400, 90, 90, "Fontaine/Fountain", 4],
        ["transition", 400, 50, 150, 90, "Village Le Porge", 2],
        ["transition", 800, 50, 200, 90, "Chateau/Castel", 5],
        ["transition", 0,500, 100,100, "Debut/Start", 0],
    ],
//   ==================================================================================================================== Village 
    2: [
        ["transition", 300,350, 150, 150, "Maison des GARDES/Gatekeeper's lodge", 11],
        ["transition", 480,50, 100, 100, "Maison de YIN/Yin House", 10],
        ["transition", 550, 350, 150, 100, "Maison de GERHARD/GERHARD House", 8],
        ["transition", 630,100,100, 80, "Maison de LILY/ Lily House", 9],
        ["transition", 450, 560, 90, 30, "Contrée/County", 1],
        ["transition", 900, 100, 90, 30, "Chateau/Castel", 5],
//-------------------------------------------------------------------------------------
        ["block", 5, 5, 995, 50, "Block"],
        ["block", 300, 400, 150, 100, "Block"],
        ["block", 550, 400, 150, 100, "Block"],
//-------------------------------------------------------------------------------------
 ["item", 700, 250, 90, 70, "Clef/Key", "Clef/key",

    {
        fr: "Il y a une clef au sol. Quelqu'un l'un perdu ! La prends-tu ?.",
        en: "There's a key on the ground! Someone has lost it! Do you take it ?",
    },
 "img/key.png",
],
//-------------------------------------------------------------------------------------
        ["info", 850, 70, 90, 100, "Chateau/Chatel","img/Gerhard.png",
    {
        fr: "Le garde Hilderbrand bloque le passage si tu n'as pas les objets et le grimoire. Es tu sur de vouloir y aller ?.",
        en: "Guard Hilderbrand will block your way if you don't have the required items and grimoire. Are you sure you want to go there?"
    }],
//-------------------------------------------------------------------------------------

        ["lock", 50, 250, 90, 100, "Latrines", "k100", 100,
    {
        fr: "Hey, c'est les latrines ici. Tu peux y aller si tu as une envie pressante ...",
        en: "Hey, this is the latrine. You can go there if you need to use the toilet urgently."
    }],

        ["lock",250,50, 90, 150, "Aden Camp Site","k100",100,
    {
        fr: "Arrête de frapper à la porte ! Aden n'est pas là. Tu le trouveras à la Carriere",
        en: "Stop knocking on the door! Aden is not here. You will find him at the Quary"
    }],
        ["lock",0,350, 300, 150, "campsite","k100",100,
    {
        fr: "C'est les touristes locaux. Tu n'as rien a faire ici.",
        en: "It's the local tourists. You have no business here..."
    }],
        ["lock",700,350, 250, 150, "Grenier", "k100", 100, 
    {
        fr: "C'est les greniers du village ici. Tu ne trouveras rien d'interessant",
        en: "These are the village granaries here. You won't find anything interesting..",
    }],

    ],
//   ==================================================================================================================== Carriere //Quarry
    3: [      
	["transition", 850, 280, 150, 60, "Contrée/County", 1],
//-------------------------------------------------------------------------------------  

        ["transition", 150,300, 150, 30, "Carriere Ouest", 12],
        ["transition", 550, 350, 150, 30, "Carriere Est", 13],
//-------------------------------------------------------------------------------------  
        ["question", 700, 150, 90, 80, "ADEN", "GARDE", "kGARDE"],
//-------------------------------------------------------------------------------------  
         /*  la carriere est vérrouillée sans le mot de passe du gardien: 23. */
        ["lock",150,50, 550, 450, "Mot de passe/Pass word", "kGARDE", 1, 
    {
        fr: "Vous n'avez pas le droit de rentrer dans la carrier sans l'autorisation des gardiens. Allez voir Aden pour avoir l'autorisation",
        en: "You are not allowed to enter the quarry without permission from the guards. Go and see Aden to get authorisation.",
    }],

    ],
// ====================================================================================================================  La fontaine /fountain 
    4: [
        ["transition", 0, 500,150, 100, "Contrée/County", 1],
        ["transition", 300, 280, 90, 50, "Mehnir Sud/South Mehnir", 14],
        ["transition", 700, 150, 90, 50, "Mehnir Nord/North Mehnir", 16],
        ["transition", 320, 100, 90, 50, "Mehnir Ouest/West Mehnir", 15],
        ["transition",  560, 380, 90, 50, "Mehnir Est/East Mehnir", 17],
//-------------------------------------------------------------------------------------   
         /*  le Mehnir est vérrouillée sans le mot de passe du gardien: Sauge/sage. */
        ["question", 500, 160, 80, 50, "Fontaine/Fountain ", "MENHIR", "kMEHNIR"],
//-------------------------------------------------------------------------------------
 ["item", 400, 200, 90, 70, "Eau Pure/Pure Water", "Eau Pure/Pure Water",

    {
        fr: "Oh de l'eau pure. Idéal pour se ressourcer ou pour faire des lotions! La prends-tu ?.",
        en: "Oh, pure water! It's ideal for revitalising yourself or making lotions! Do you take it ?",
    },
 "img/Eau.png",
],

//------------------------------------------------------------------------------------- 
        ["lock", 550, 350, 100, 100, "Sortilege/Blocking Spell", "kMEHNIR", 1,
  {
        fr: "Un puissant sortilege vous bloque. Touvez le mot magique pour voir le Menhir de l'arbre. Il est inscrit dans les Menhir du Sud, de l'Ouest et du Nord !"+
	"\n Ensuite, buvez l'eau de la fontaine et crier le nom",
        en: "A powerful spell is blocking your path. Find the magic word to reveal the Tree Menhir. It is inscribed on the South, West, and North Menhirs! Then, drink the water from the fountain and shout the name.",
    }],

],

//=================================================================================================================================== Chateau 
   5: [

        ["transition", 60, 550, 90, 30, "Fontaine/Fountain", 4],
        ["transition", 5, 450, 90, 30, "Village Le Porge/Le Porge Village", 2],
        ["transition", 450, 200, 90, 30, "Grotte de l'Honorable/Honorable One's Cave", 6],
//------------------------------------------------------------------------------------- 
        ["block", 0, 0, 150, 400, "Forêt/Forest"],
        ["block", 350, 400, 650, 200, "Forêt/Forest"],
//------------------------------------------------------------------------------------- 	
	["lock", 150, 250, 200, 150, "Hildebrand",
 	{
     	items: [
"Eau Pure/Pure Water",
"Filtres/Filters",
"Sauge/Sage", 
"Mortier/Mortar",
"Vinaigre/Vinegar",
"Grimoire",

      ]
 },
  {
 	fr:  "Bonjour. Je suis HILDEBRAND le garde du château. " +"Vous devez réunir tous les objets nécessaires avant d'entrer !",
        en:"Hello. I am HILDEBRAND, the castle guard." + "You must gather all the necessary items before entering!",
    }],

  ],

//=================================================================================================================================== Grotte du Chateau 
   6: [
        ["transition", 450, 560, 90, 30, "Chateau/Castel", 5],
        ["transition", 450, 180, 100, 100, "Honorable", 7],
//------------------------------------------------------------------------------------- 
        ["question", 0, 360, 150, 150, "Eau/Water", "RubiqueQ3", "k3"],
        ["question", 800,360, 200, 150, "Livre/Book", "RubiqueQ3", "k3"],
//------------------------------------------------------------------------------------- 
        ["block", 150, 80, 250, 300, "Gardes/Gardians"],
        ["block", 600, 80, 200, 300, "Gardes/Gardians"],
//-------------------------------------------------------------------------------------   	
["lock", 400, 150, 200, 150, "Sortilege/Blocking Spell","k3", 2, 
  {
 	fr:  "Avant de nous parler, résoud les énigmes de l'eau et des livres qui sont à ta gauche et à  ta droite",
        en:"Solve the water and book puzzles to your left and right before speaking to us.",
    }],

  ],

//=================================================================================================================================== Honorable
   7: [ 
	["transition", 350, 570, 250, 30, "Grotte de l'Honorable/Honorable One's Cave", 6],
	["transition", 480, 255, 40,30, "Honorable", 18],
//-------------------------------------------------------------------------------------
 	["quiz", 225, 250, 50, 80, "Menhir Bleu/Blue Menhir", "QUIZ1", "kquiz"],
 	["quiz", 350, 150, 50, 80, "Menhir Pourpre/Purple Menhir", "QUIZ1", "kquiz"],
 	["quiz", 620, 150, 50, 80, "Menhir Orange/Orange Menhir", "QUIZ1", "kquiz"],
 	["quiz", 730, 225, 50, 80, "Menhir Vert/Green Menhir", "QUIZ1", "kquiz"],
//-------------------------------------------------------------------------------------
        ["block", 00, 000, 200, 600, "Gardes/Gardians"],
        ["block", 800,000, 200, 600, "Gardes/Gardians"],
//------------------------------------------------------------------------------------- 
	["lock", 475, 250, 50, 50, "HonorableLock","kquiz", 4,   
{
 	fr:  "Tu arrives trop tard ...Arghhh.....Les menhirs se sont rebellés "+
"\nLibere moi en brisant les chaines des 4 mehnirs (Bleu, Pourpre, Orange, Vert) en répondant à leur question.",
        en:  "You're too late... The menhirs have rebelled! "+
"\nFree me by answering the questions of the four menhirs (blue, purple, orange and green) and breaking their chains.",
    }],

    ],
//=================================================================================================================================== Maison Gerhart 
   8: [
        ["transition", 300, 570, 300, 30, "Village Le Porge/ Porge Village", 2],
//-------------------------------------------------------------------------------------

  ["item", 550, 140, 90, 70, "Feuilles de Laurier/Bay Leaves", "Feuilles de Laurier/Bay Leaves", 
    {
        fr: "Hum, c'est bon le laurier. Parfait pour aromatiser les ragouts !  Le prends tu ?",
        en: "Mmm, bay leaf is delicious. Perfect for flavoring stews! Do you use it?",
    },
 "img/Laurier.png",
    ],

  ["item", 100, 480, 90, 70, "Sac de Farine/Sack of Flour", "Sac de Farine/Sack of Flour", 
    {
        fr: "Ce sac de farine est indispensable pour faire de long voyage!  Le prends tu ?",
        en: "This bag of flour is a must-have for a long journey! Are you taking it with you?",
    },
"img/Farine.png",
],
  ["item", 310, 180, 90, 70, "Ustensile/Ustensil", "Ustensile/Ustensil", 
    {
        fr: "C'est bien si vous ne voulez pas manger avec vos doigts ! Les prends tu ? ",
        en: "If you're not a fan of eating with your fingers, this is perfect for you! Are you taking it with you?",
    },

"img/ustensile.png",
],
//-------------------------------------------------------------------------------------
  ["info", 880, 300, 90, 70, "Coffre", "img/Gerhard.png", 
   {
        fr: "Eh, tout n'est pas permis! Tu n'as pas besoin de nos affaires personnelles ....",
        en: "Hey, there are limits! You don't need our personal belongings..."
    }],

  ["info", 650, 300, 130, 80, "Table", "img/Gerharde.png",
   {
        fr: "Installez vous si vous souhaitez manger avec nous. On n'a pas grand chose, cela sera frugal mais c'est avec plaisir car vous avez un long chemin à faire.",
        en: "Please make yourself comfortable if you would like to join us for a meal. We don't have much, so it will be a simple meal, but we would be pleased to share it with you, given the long journey you have ahead of you.",
    }],
 
 ["info", 460, 200, 70, 75, "Liva", "img/Gerharde.png", 
  {
        fr: "Bonjour, je suis Liva. Servez-vous de ce que nous avons pour faire votre voyage. Je suis à votre service.",
        en: "Hello, I'm Liva. Make use of what we have to help you on your journey. It is my pleasure to serve you.",
    }],


  ["info", 200, 200, 70, 70, "Gerhard", "img/Gerhard.png", 
  {
        fr: "Bonjour, je suis Gerhard. J'ai entendu parlé de vous. j'ai cru comprendre que vous voulez retrouver la formule et les ingrédients de l'HeadHealer ? "
+"\n Pour cela, tu dois pouvoir déchiffer les rhunes de la fontaine, trouver la recette et enfin collecter les ingédients. Je te souhaite un bon courage dans ta quete !  ",
        en: "Hello, I'm Gerhard. I've heard about you. I understand you want to find the formula and ingredients for HeadHealer?"
+"\n To do that, you'll need to decipher the runes on the fountain, find the recipe, and finally gather the ingredients. Good luck on your quest!"
    }],

  
["info", 100, 300, 70, 50, "Outil", "img/Gerhard.png",
  {
        fr: "S'il te plait, ne prend pas mes outils ! j'en ai besoin pour vivre ... ",
        en: "Please don't take my tools! I need them to pay the bills.",
    }],
],

//===================================================================================================================================  Maison Lily 
   9: [
        ["transition", 300, 570, 300, 30, "Village Le Porge/ Porge Village", 2],
//-------------------------------------------------------------------------------------
	["info", 460, 200, 70, 75, "Lily", "img/Lily.png", 
  {
        fr: "Bonjour, je suis Lily. Je cueille des fleurs de sauge et je fais des sirops que les gardes raffolent!" 
+"\nJe livre aussi au chateau mais depuis que l'Honorable est malade, je n'ai plus de commande."+"\n Bizarre... ",

        en: "Hello, I'm Lily. I pick sage blossoms and make syrups that the guards absolutely love. " 
+"\nI also deliver to the castle, but I haven't had any orders since the Honourable fell ill."+"\n It's strange..."
    }],


	["info", 880, 300, 90, 70, "Coffre", "img/LilyBoy.png", 
   {
        fr: "Eh, tout n'est pas permis! Tu n'as pas besoin de nos affaires personnelles ....",
        en: "Hey, there are limits! You don't need our personal belongings..."
    }],

	["info", 210, 200, 70, 100, "Lysandre", "img/LilyBoy.png", 
   {
        fr: "Bonjour, je suis Lysandre. Je fais des jarres pour la garde. Elles servent à stocker le vinaigre de vin que les gardes amenent au chateau"+"\n Ils sont belles mes jarres n'est ce pas ?.",
        en: "Hello, I am Lysandre. I make jars for the guard. They are used to store the wine vinegar that the guards bring to the castle"+"\n My jars are beautiful, aren't they?."
    }],
    
//-------------------------------------------------------------------------------------
  	["item",50, 300, 90, 70, "Filtres/Filters", "Filtres/Filters",  
    {
        fr: "Les fibres des tiges du sauge nous servent pour faire des tissus et des filtres. Veux-tu des filtres de tige de sauge ?  ",
        en: "We use fibres from sage stalks to make fabrics and filters. Would you like sage-stalk filters?",
    },
"img/Filtres.png",
],

  	["item", 310, 180, 90, 70, "Pots de Fleurs/Flower pots", "Pots de Fleurs/Flower pots",
   {
        fr: "C'est des pots pour les fleurs, en veux tu ? ",
        en: "These are flower pots — you can have as many as you like!",
    },
"img/ustensile.png",
],

	["item", 580, 300, 130, 100, "Sauge/Sage","Sauge/Sage", 
   {
        fr: "Oh le joli bouquet de fleur de sauge. Lily vous autorise à le prendre.",
        en: "Oh, what a lovely bouquet of sage flowers! Lily has given you permission to take them.",
    },
"img/LilyFlower.png", 
    ],
],

//=================================================================================================================================== Maison Yin 
   

10: [
        ["transition", 300, 570, 300, 30, "Village Le Porge/ Porge Village", 2],
//-------------------------------------------------------------------------------------

	["info", 390, 200, 70, 100, "Yin", "img/Yin.png", 
   {
        fr: "Bonjour, je suis Madame Yin. J'excelle dans la fabrication de thé à vertus médicinale. L'important c'est d'utiliser l'eau pure et du bon thé ! Mon mari ne parle pas le francais",
        en: "Hello, I am Madame Yin. I specialise in making medicinal teas. The secret is to use pure water and high-quality tea leaves! My husbant can not speak english",
    }],

  	["info", 0, 150, 90, 130, "Tsubaki", "img/Tsubaki.png",
   {
        fr: "Il s'agit du camélia du Japon, ou Tsubaki, marque la transition vers le printemps où il se couvre de fleurs généreuses aux teintes rouges, roses ou blanches qui captent la lumière et soulignent la finesse de ses formes."+"\n Désolé, il vient de notre ville natale et il n'est pas à vendre.",
        en: "This is the Japanese camellia, or *Tsubaki*; it marks the transition to spring, becoming covered in lavish red, pink, or white blossoms that catch the light and accentuate the delicacy of its form."+"\n I’m afraid it comes from our hometown and is not for sale.",
    }],


["info", 700, 200, 70, 100, "LilyBoy", "img/Yang.png", "「ご挨拶申し上げます。私はヤン。インの夫にございます。妻の言葉を信じてはなりませぬぞ。奴の淹れる茶など、何一つ癒やしはせぬのですから。…されど、あの女の汲む清らかな水だけは、御館様が秘薬を調合される際にたいそう重宝されております。私は、妻の茶の葉を摘みに泉の周りへ赴くのです。そこには何やら文字が刻まれておるのですが、私にはどうしても読めませぬのだ。」"],    
    
//-------------------------------------------------------------------------------------
  		["item", 780, 400, 90, 90, "Recette de the/Tea reciepe","Recette de the/Tea reciepe", 
   {
        fr: "Livre de recettes. Les 1001 façons de préparer le thé médicinal"+"\n Prenez le si vous le voulez.",
        en: "Recipe book. 1,001 ways to prepare medicinal tea"+"\nFeel free to take it.",
    },
"img/Recette.png", 
    ],

  		["item", 280, 300, 90, 90, "Mortier/Mortar","Mortier/Mortar",
   {
        fr: " C'est un superbe mortier qui sert à broyer les feuilles de thé et ainsi amplifier leur diffusion dans l'eau pure"+"\n Prenez le si vous le voulez.",
        en: "This superb mortar is used to grind tea leaves, enhancing their infusion in pure water."+"\nFeel free to take it.",
    },
"img/Mortier.png", 
    ],
  		 

  	["item", 150, 350, 90, 90, "Guitare/Guitar","Guitare/Guitar", 
   {
        fr: " C'est une guitare japonaise ancestrale qui est jouée pour mieux diffuser les essences essentielles du thé dans l'eau pure."+"\n Prenez le si vous le voulez.",
        en: "It is an ancient Japanese guitar played to better infuse the essential essences of the tea into the pure water."+"\nFeel free to take it.",
    },
"img/Guitare.png",
    ],
  ],



//=================================================================================================================================== Maison Gardes 
   11: [
        ["transition", 300, 570, 300, 30, "Village Le Porge/ Porge Village", 2],
	
//-------------------------------------------------------------------------------------
	["info", 360, 200, 70, 150, "Gardien Femme/Female Gardian", "img/MilitaireF.png", 
    	   {
        fr: "Bonjour c'est pour quoi ??? Vous ne voyez pas qu'on est occupé a chercher le grimoire de l'Honorable sur la carte. Il l'aurait perdu dans les carrieres...\n "+" Quelle tête en l'air ces érudits !",
        en: "Hello! What's this all about? Can't you see that we're busy searching for the Honourable One's grimoire on the map? Apparently, he lost it in the quarries.'\n "+"Those scholars are such scatterbrains!",
    }],

	["info", 700, 200, 70, 100, "Gardien Homme/Male Gardian", "img/MilitaireH.png", 
   {
        fr: "Vous voulez allez à la carriere ???? Ben non, je suis trop occupé pour cela. Allez y vous même. Aden garde l'entrée. Dites lui que vous venez de ma part, le mot de passe est la solution de \n "+
	"<span style='font-size:2em'><center>(3x7)+2</center></span>",

        en: "Do you want to go to the quarry? No, I'm too busy. Go yourself. Aden is guarding the entrance. Tell him I sent you and the password is 'the solution to...'\n "+
	"<span style='font-size:2em'><center>(3x7)+2</center></span>",
    }],

  
    	["info", 900, 200, 70, 100, "Gardien Homme/Male Gardian",  "img/MilitaireH.png", 

   {
        fr: "Je ne parle pas au étranger... Vois avec la Cheffe.",
        en: "I don't talk to outsiders... Check with the boss.",
    }],

	["info", 50, 200, 70, 150, "Gardien Femme/Female Gardian", "img/MilitaireF.png", 
   {
        fr: "Je m'occupe des armes. Tu peux en prendre une si tu le veux.",
        en: "I'll take care of the weapons. Feel free to take one if you want.",
    }],


   	
//-------------------------------------------------------------------------------------

  	["item", 780, 400, 90, 90, "Livre/Book","Livre/Book",  
   {
        fr: "L'Art de la guerre  de Sun Tzu. Le livre fournit des traits biographiques mêlés de légendes."+"\n Prenez le si vous le voulez.",
        en: "Sun Tzu's The Art of War. The book interweaves biographical details with legends."+"\nFeel free to take it.",
    },
"img/Recette.png",
    ],

  	["item", 260, 300, 90, 90, "Carte/Map","Carte/Map",  
   {
        fr: "C'est la carte de la carriere. On y voit les deux carrieres Ouest et Est et la maison de Aden qui garde l'endroit."+"\n Prenez la si vous le voulez.",
        en: "This is a map of the quarry. It shows the two quarries, West and East, as well as the house of Aden, who guards the site."+"\nFeel free to take it.",
    },
"img/Carte.png",
    ],

    	["item", 150, 350, 90, 90, "Armes/Weapons","Armes/Weapons", 
   {
        fr: "Es tu sur de vouloir des armes ? Tu n'es pas un soldat et ici il n'y a pas de bandit ou de combatant. Enfin, tu fais bien ce que tu veux."+"\n Prenez les si vous le voulez.",
        en: "Are you sure you need weapons? After all, you aren't a soldier and there are no bandits or fighters here. But do whatever you like."+"\nFeel free to take them.",
    },
 "img/Armes.png",
    ],

    	["item", 550, 150, 90, 90, "Vinaigre/Vinegar","Vinaigre/Vinegar", 
   {
        fr: "C'est la dernière bouteille de vinaigre de vin. D'habitude on livre au chateau pour l'Honorable mais depuis qu'il est malade et qu'il a perdu son grimoire nous n'avons plus le temps de livrer."+
	"\n  Tu peux la prendre si tu veux. Pour nous, cela ne sert à rien !",
        en: "This is the last bottle of wine vinegar. We usually deliver to the château for the Honourable One, but we no longer have the time to do so since he fell ill and lost his grimoire."+
	"\n You can have it if you want. It's no use to us.",
    },
"img/Vinaigre.png",
    ],
  	
],

//===================================================================================================================================Carriere Ouest
   12: [
        ["transition", 300, 570, 300, 30, "Carriere/Quarry", 3],

//-------------------------------------------------------------------------------------
        ["block", 0, 0, 1000,200, "Danger"],

//-------------------------------------------------------------------------------------
	["info", 200, 300, 130, 80, "Pierre/Stones", "img/faceYes.png", 
   {
        fr: "Non serieux, tu veux vraiment prendre des pierres ? c'est beaucoup trop lourd pour toi !",
        en: "No, seriously—do you really want to carry stones? They're way too heavy for you!.",
    }],

	["info", 800, 150, 90, 150, "Torche/Torch", "img/faceYes.png",
   {
        fr: "Mais laisse donc cette torche ... si tu l'as prend tu ne verra plus rien !",
        en: "Leave that torch alone! If you pick it up, you won't be able to see a thing.",
    }],

//-------------------------------------------------------------------------------------
 	
    	["item", 600,450, 90, 80, "Grimoire","Grimoire",
   {
        fr: "👏BRAVO, tu as trouvé le Grimoire de l'Honorable. Tu pourras lui rapporter."+
	"\n Impossible à lire car il est crypté dans le language des anciens mais je suis sûr que c'est la recette secrète de l'HEADHEALER !"+
	"\n  Prend le, c'est l'un des objets demandé !",
        en: "👏Bravo! You have found the Honourable One's Grimoire. You can now return it to him."+
	"\n Take it! it's one of the items that was requested!",
    },
"img/Grimoire.png",
    ],

    	["item",350,350, 150, 50, "Outils/Tools","Outils/Tools",
   {
        fr: "⚒️ Ce sont des outils de la mine. Tres utile pour faire des trous dans ton jardin."+"\n Prenez les si vous le voulez.",
        en: "These are mining tools. They are useful for digging holes in your garden."+"\nFeel free to take them.",
    },
"img/Outil.png",
    ],
   	
],

//=================================================================================================================================== Carriere EST
   13: [
        ["transition", 300, 570, 300, 30, "Carriere/Quarry", 3],

//-------------------------------------------------------------------------------------
        ["block", 0, 0, 1000,200, "Danger"],
//-------------------------------------------------------------------------------------

	["info", 800, 150, 90, 150, "Torche/Torch", "img/faceYes.png",
   {
        fr: "Mais laisse donc cette torche ... si tu l'as prend tu ne verra plus rien !",
        en: "Leave that torch alone! If you pick it up, you won't be able to see a thing.",
    }],

//-------------------------------------------------------------------------------------
    	["item", 500,390, 90, 50, "Armes/Weapons","Armes/Weapons", 
   {
        fr: "Es tu sur de vouloir des armes ? Tu n'es pas un soldat et ici il n'y a pas de bandit ou de combatant. Enfin, tu fais bien ce que tu veux."+"\n Prenez les si vous le voulez.",
        en: "Are you sure you need weapons? After all, you aren't a soldier and there are no bandits or fighters here. But do whatever you like."+"\nFeel free to take them.",
    },
 "img/Armes.png",
    ],

    	["item", 600,480, 90, 50, "Livre de chimie/Books on Chemistry","Livre de chimie/Books on Chemistry",
   {
        fr: "📓 Il s'agit d'un vieux livre de chimie. 'Les plantes médicinales'. C'est bizarre, il ne parle pas des feuilles de thé! Par contre il y a tout un chapitre sur les vertus de l'écorce du sauge 🌼. Mais je ne suis pas chimiste et je ne comprends pas grand chose dans ce charabia ..."+
"\n Prenez les si vous le voulez.",
        en: "📓It’s an old chemistry book.' 'Medicinal Plants.' It’s strange — it doesn’t mention tea leaves! On the other hand, there’s a whole chapter on the properties of sage🌼.. But I’m no chemist and I can't make sense of any of this..."
+"\nFeel free to take them.",
    },
"img/livre.png",
    ],

    	["item", 300,430, 90, 80, "Livre de Procedé/Books on Processing","Livre de Procedé/Books on Processing",
   {
        fr:  "📓 Il s'agit d'un livre sur les techniques d'extraction. voici les chapitres : Comprendre l'extraction - Qu'est-ce qu'extraire ? (Soluté, solvant, matrice - Solubilité, polarité, diffusion - Préparer la matière première) / Séchage (Broyage et granulométrie,Surface de contact) - Extraction des feuilles de thé par l'eau pure (Infusion,Décoction, Macération aqueuse,) - Exemple : extraction des composés du saule (Extraction par les solutions acides - Acide acétique-Effet du pH sur la solubilité- Extraction acido-dépendante) - Eau + acide acétique : pourquoi le mélange peut extraire différemment de l'eau seule. Séparer et purifier l'extrait (Filtration-Décantation-Centrifugation-Évaporation-Cristallisation-Précipitation) - Exemple final : saule → salicylates → acide salicylique → aspirine"
  	+"\n Prenez les si vous le voulez.",
        en: "This book covers extraction techniques. Here are the chapters: Understanding Extraction: What is Extraction? Solute, solvent and matrix; solubility, polarity and diffusion; preparing the raw material.Drying: grinding and particle size; surface area.Extracting tea leaves using pure water: infusion, decoction and aqueous maceration.Example: extracting compounds from sage.Extraction using acidic solutions: acetic acid; effect of pH on solubility; acid-dependent extraction.Water and acetic acid: why the mixture extracts differently to water alone. Separating and Purifying the Extract (Filtration, Decantation, Centrifugation, Evaporation, Crystallisation, Precipitation) – Final Example: Sage → Salicylates → Salicylic Acid → Aspirin."
+"\nFeel free to take them.",
    },
"img/livre.png",
    ],
    	["item", 600,390, 90, 50, "Coffre à bijoux/Jewelry box","Coffre à bijoux/Jewelry box",
   {
        fr:  "Un écrin poussiéreux contenant quelques bijoux anciens : une bague sertie d’une pierre, un collier délicat et plusieurs pièces d’or ternies par le temps."
  	+"\n Prenez les si vous le voulez.",
        en: "A dusty case containing a few antique pieces of jewelry: a stone-set ring, a delicate necklace, and several gold coins tarnished by time."
	+"\nFeel free to take them.",
    },
"img/bijoux.png"
    ],

],


//=================================================================================================================================== Mehnir du SUD 
   14: [
        ["transition", 300, 570, 300, 30, "Fontaine/Foutain", 4],
        ["transition", 10,300, 90, 60, "Mehnir de l'EST/ EAST Menhir", 17],
        ["transition", 880,300, 90, 60, "Mehnir de l'OUEST/WEST Menhir", 15],
//-------------------------------------------------------------------------------------
        ["question", 400, 50, 150, 350, "ENIGME", "ENIGME", "kenigme"],
    ],

//=================================================================================================================================== Mehnir du Ouest 
   15: [
        ["transition", 300, 570, 300, 30, "Fontaine/Foutain", 4],
        ["transition", 10,300, 90, 60, "Mehnir du SUD/SOUTH Menhir", 14],
        ["transition", 880,300, 90, 60, "Mehnir du NORD/NORTH Menhir", 16],
//-------------------------------------------------------------------------------------
        ["question", 400, 50, 150, 350, "ENIGME", "ENIGME", "kenigme"],
    ],

//===================================================================================================================================  Mehnir Nord 
   16: [
        ["transition", 300, 570, 300, 30,  "Fontaine/Foutain", 4],
        ["transition", 10,300, 90, 60, "Mehnir de l'OUEST/WEST Menhir", 15],
        ["transition", 880,300, 90, 60, "Mehnir de l'EST/ EAST Menhir", 17],
//-------------------------------------------------------------------------------------
        ["question", 400, 50, 150, 350, "ENIGME", "ENIGME", "kenigme"],
//-------------------------------------------------------------------------------------
          ["lock", 860, 250, 120, 150, "MenhirLock", "kMEHNIR", 1,  
{
 	fr:  "Un puissant sortilege vous bloque. Touvez le mot magique pour voir le Menhir de l'EST. Il est inscrit dans les Menhir du Sud, de l'Ouest et du Nord ! Ensuite, buvez l'eau de la fontaine et crier le nom.",
        en:  "A powerful spell is blocking your path. Find the magic word to reveal the east menhir. It is inscribed on the south, west and north menhirs. Then drink the water from the fountain and shout its name.",
    }],

    ],

//===================================================================================================================================  Mehnir WEST
   17: [
        ["transition", 300, 570, 300, 30,  "Fontaine/Foutain", 4],
//-------------------------------------------------------------------------------------
	["info",400, 50, 150, 350, "Sage", "img/mehnirEST.png", 
   {
        fr: "Celui qui cherche le remède doit d'abord trouver l'arbre. Son écorce renferme un trésor invisible, caché dans ses fibres.Que l'eau pure de la fontaine lui serve de rivière, que l'acide né du vin lui prête sa force acide.Mais rien ne se révèle au mortier seul : il faut broyer, laisser les eaux pénétrer la matière,puis séparer le précieux du reste grâce à la toile du filtre. L'écorce du saule, l'eau de la fontaine, l'acide du vieux vin, le mortier et la toile…Réunis, ils permettront de faire apparaître le salicylate dit aussi HEADHEALER,le secret caché dans l'écorce.Souviens-toi cependant : extraire un trésor n'est pas le fabriquer.La nature l'avait caché ; toi, tu dois seulement apprendre à le révéler. » ",
        en: "'He who seeks the remedy must first find the tree.' Its bark contains an invisible treasure hidden within its fibres. Let the pure spring water serve as the river and let the acid from wine lend its strength. Yet the mortar alone reveals nothing: One must grind it, allow the water to permeate the mixture and then filter out the precious essence. Sage bark, spring water, the acid from aged wine, the mortar and the cloth... Together, they reveal salicylate, also known as HEADHEALER, the secret hidden within the bark. Remember, however, that extracting a treasure is not the same as creating it. Nature hid it; you need only learn how to reveal it.",
    }],	

],

//===================================================================================================================================  Final 
   18: [
        ["transition", 300, 570, 300, 30,  "Credit", 20],
    ],
//===================================================================================================================================  Credit 
   19: [
        ["transition", 450, 560, 90, 30, "Restart", 0],
    ],
//===================================================================================================================================  Credit 
   20: [

["info", 700, 300, 200, 200, "Image & web design", "img/img1.png", 
   {
        fr: "<span style='font-size:2em'>Image et web design</span>"+"\n Licence CC BY 4.0 (Attribution) :Illustration et Web design par Gerard Bacquet, créées avec l'aide de Gemini (Google), sous licence CC BY 4.0.",
        en: "<span style='font-size:2em'>Image & web design</span>"+"\n CC BY 4.0 License (Attribution): Illustration and web design by Gerard Bacquet, created with the assistance of Gemini (Google), under the CC BY 4.0 license.",
    }],
        

["info", 700, 25, 200, 200, "Audio/Music& background", "img/audio.png", 
   {
        fr: "<span style='font-size:2em'>Musiques et fonds sonore</span>"+"\n Crédits audio : Effets sonores fournis par <a style='color:white' href='https://pixabay.com/fr/sound-effects/' target='_blank' rel='noopener noreferrer'>Pixabay</a>",
        en: "<span style='font-size:2em'>Music and background audio</span>"+"\n Audio credits: Sound effects provided by  <a style='color:white' href='https://pixabay.com/fr/sound-effects/' target='_blank' rel='noopener noreferrer'>Pixabay</a>",
    }],

["info",100, 25, 200, 200, "Auteur/Author", "img/identité.JPG", 
   {
        fr: "<span style='font-size:2em'>A propos de l'Auteur</span>"
+"\n Gérard Bacquet a travaillé comme ingénieur de recherche chez Rhône-Poulenc de 1989 à 1995. Il a ensuite occupé successivement des postes de direction en R&D chez Raisio-Rhodia, avant d'exercer les fonctions de directeur scientifique adjoint du centre de recherche d'Aubervilliers de 2004 à 2006. Il a par la suite été directeur R&D pour Novecare Europe et le centre technique de Birmingham (2004-2008), puis directeur technique et enfin directeur scientifique chez Nexans (2008-2016). Depuis 2016, il dirige l'ESCOM, école d'ingénieurs française spécialisée en chimie. Il enseigne également à l'ESPCI Paris et au CNAM depuis 2011. "
+"\n Il a fondé SciencExpert, une entreprise française à mission dédiée à créer un pont entre l'enseignement des sciences et la recherche. L'entreprise se concentre sur l'instrumentation scientifique open source à faible coût, la pédagogie expérimentale et la démocratisation de l'accès à la pratique scientifique. Ses travaux actuels portent sur des instruments de laboratoire pouvant être assemblés par les étudiants et sur l'apprentissage par investigation, tant dans le secondaire que dans l'enseignement supérieur."
+"\n Il est l'auteur de 95 travaux de recherche cités plus de 738 fois dans les domaines de la science des matériaux, de la physique et de l'enseignement des sciences."
+"\n <a style='color:white' href='https://www.linkedin.com/in/bacquetgerard/' target='_blank' rel='noopener noreferrer'>Profil LinkedIn</a>",

en: "<span style='font-size:2em'>About the Author</span>"
+"\n Gérard Bacquet worked as a research engineer at Rhône-Poulenc from 1989 to 1995. He then held successive R&D management roles at Raisio-Rhodia before serving as Deputy Scientific Director at the Aubervilliers Research Centre from 2004 to 2006. He was then R&D Director for Novecare Europe and the Birmingham Technical Centre from 2004 to 2008 and Technical and then Scientific Director at Nexans from 2008 to 2016. Since 2016, he has directed ESCOM, the French engineering school specialising in chemistry. He has also taught at ESPCI Paris and CNAM since 2011. "
+"\n He founded SciencExpert, a French mission-driven company dedicated to bridging science education and research. The company focuses on low-cost, open-source scientific instrumentation, experimental pedagogy and democratising access to hands-on science. His current work centres on student-buildable laboratory instruments and inquiry-based learning across secondary and higher education."
+"\n He is the author of 95 research works that have been cited over 738 times in the fields of materials science, physics, and science education."
+"\n <a style='color:white' href='https://www.linkedin.com/in/bacquetgerard/' target='_blank' rel='noopener noreferrer'>Linked In Profil</a>",
    }],
        


["info",100, 300, 200, 200, "Editeur/Editor", "img/Sciencexpert logo.jpg", 
   {
        fr: "<span style='font-size:2em'>SciencExpert et le projet SMILE</span>"
+"\n Fondée en 2007 par Gérard Bacquet, SciencExpert est aujourd’hui une société à mission spécialisée dans le conseil, l’expertise et le développement de projets scientifiques, éducatifs et technologiques à fort impact sociétal."
+"\n SciencExpert s’appuie sur un réseau de plus de vingt experts scientifiques issus de domaines variés, ainsi que sur des start-ups innovantes, des PME reconnues, des centres de formation et d’excellence, et des acteurs majeurs de l’économie de l’innovation et du financement."
+"\n Ce jeu fait parti du projet SMILE! (It is time to Share Moment In Learning Experience !) où le jeu est un formidable moteur d’apprentissage! "
+"\n <span style='font-size:2em'><center><a style='color:white' href='https://payhip.com/SciencExpert/smile' target='_blank' rel='noopener noreferrer'>SMILE</a></center></span>",


en: "<span style='font-size:2em'>SciencExpert and SMILE project</span>"
+"\n Founded in 2007 by Gérard Bacquet, SciencExpert is now a mission-driven company specializing in consulting, expertise, and the development of scientific, educational, and technological projects with significant societal impact."
+"\n SciencExpert draws on a network of over twenty scientific experts from diverse fields, as well as innovative start-ups, established SMEs, centers of excellence and training, and key players in the innovation economy and finance sectors."
+"\n This game is part of the SMILE! project (It is time to Share Moment In Learning Experience!), where gaming serves as a powerful driver of learning!"
+"\n <span style='font-size:2em'><center><a style='color:white' href='https://payhip.com/SciencExpert/smile' target='_blank' rel='noopener noreferrer'>SMILE</a></center></span>",
    }],


   ],
};