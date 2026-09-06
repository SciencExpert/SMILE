/*********************************************************************
 * MANUAL MODAL SYSTEM – DropMate / SciencExpert
 * Modal autonome :
 * - injection HTML
 * - ouverture / fermeture
 * - bouton de fermeture
 * - touche Escape
 * - clic à l'extérieur
 * - gestion du focus clavier
 * - verrouillage du défilement de la page
 *********************************************************************/

(() => {
    "use strict";

    const MODAL_ID = "Manuel_User";
    const STYLE_ID = "manual-modal-style";

    let previouslyFocusedElement = null;
    let modalInitialized = false;

    /*
     * Contenu du manuel.
     * Le contenu français et anglais doit être placé ici une seule fois.
     */
    const manualHTML = `
        <div class="notice">
            <strong>Objectif du jeu :</strong>
            explorez les différents décors, répondez aux questions,
            réussissez les quiz, récupérez les objets nécessaires et
            déverrouillez les passages afin de progresser dans l'aventure.
        </div>

        <h3>1. Présentation</h3>

        <p>
            <strong>La quête de l'HEADHEALER</strong> est un jeu éducatif
            d'exploration. Le joueur déplace un personnage dans plusieurs
            mondes et interagit avec différentes zones présentes dans les décors.
       <br/>
            Les interactions peuvent prendre la forme d'une question à réponse
            libre, d'un quiz à choix multiples, d'un dialogue explicatif,
            d'un objet à récupérer ou d'un passage verrouillé.
        </p>

        <h3>2. Démarrage</h3>

        <ol>
            <li>Ouvrez le fichier HTML principal dans un navigateur récent.</li>
            <li>Attendez le chargement du décor et de l'interface.</li>
            <li>Le personnage apparaît automatiquement dans le monde de départ.</li>
            <li>Cliquez dans le décor pour indiquer la destination du personnage.</li>
            <li>Suivez les zones et répondez aux activités rencontrées.</li>
        </ol>

        <div class="warning">
            <strong>Remarque :</strong>
            le son peut nécessiter une première interaction avec la page.
            Cliquez dans le jeu si la musique ne démarre pas automatiquement.</br>
	Si celui-ci vous gene, vous pouvez le retirer en cliquant sur l'icone 🔊
        </div>

        <h3>3. Déplacement du personnage</h3>

        <p>
            Le déplacement s'effectue à la souris. Le personnage se dirige
            automatiquement vers le point indiqué par un clic gauche.
        </p>

        <div class="controls">
            <div class="control">
                <strong>🖱️ Clic gauche</strong><br>
                Définit la destination du personnage.
            </div>

 <p> Des zones peuvent bloquer le déplacement, temporairement en répondant à une question ou définitivement. </p>


        <p>
            Un repère visuel peut apparaître à l'endroit cliqué. Le personnage
            s'arrête lorsqu'il atteint la destination ou rencontre un obstacle.
        </p>
</div>

        <h3>4. Interface de jeu</h3>

        <table>
            <thead>
                <tr>
                    <th>Élément</th>
                    <th>Fonction</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>❤️ Points de vie</td>
                    <td>Indique le nombre de points de vie restants.</td>
                </tr>
                <tr>
                    <td>Zone</td>
                    <td>Affiche le nom du décor actuellement chargé.</td>
                </tr>
                <tr>
                    <td>💰 Score</td>
                    <td>Affiche le score obtenu pendant la partie.</td>
                </tr>
                <tr>
                    <td>🎒 Inventaire</td>
                    <td>
                        Affiche le nombre d'objets possédés et permet
                        d'ouvrir l'inventaire.
                    </td>
                </tr>
                <tr>
                    <td>📘 Manuel utilisateur</td>
                    <td>Ouvre le présent manuel.</td>
                </tr>
                <tr>
                    <td>📕 Ebook</td>
                    <td>
                        Ouvre le livre électronique associé au programme
                        dans une nouvelle fenêtre.
                    </td>
                </tr>
                <tr>
                    <td>♻️ Reset</td>
                    <td>Recharge la page et réinitialise la partie.</td>
                </tr>
                <tr>
                    <td>🔊</td>
                    <td>Coupe ou active le son.</td>
                </tr>
            </tbody>
        </table>

        <h3>5. Signification des zones</h3>

        <table>
            <thead>
                <tr>

                    <th>Signification</th>
                    <th>Action à effectuer</th>
                </tr>
            </thead>
            <tbody>
                <tr>

                    <td>Obstacle infranchissable.</td>
                    <td>Contournez la zone.</td>
                </tr>
                <tr>

                    <td>Question à réponse libre.</td>
                    <td>
                        Atteignez le centre, puis saisissez la réponse.
                    </td>
                </tr>
                <tr>

                    <td>Quiz à choix multiples.</td>
                    <td>
                        Choisissez l'une des cinq réponses proposées.
                    </td>
                </tr>
                <tr>

                    <td>Transition vers un autre décor.</td>
                    <td>Entrez dans la zone.</td>
                </tr>
                <tr>

                    <td>Passage verrouillé.</td>
                    <td>Réunissez les conditions nécessaires.</td>
                </tr>
                <tr>

                    <td>Information ou dialogue.</td>
                    <td>
                        Lisez le message, puis cliquez sur <strong>OK</strong>.
                    </td>
                </tr>
                <tr>

                    <td>Objet à récupérer.</td>
                    <td>
                        Ouvrez la zone et choisissez
                        <strong>Oui</strong> ou <strong>Non</strong>.
                    </td>
                </tr>
            </tbody>
        </table>

        <h3>6. Questions à réponse libre</h3>

        <p>
            Pour déclencher une question, le personnage doit généralement
            atteindre le centre de la zone bleue correspondante.
        </p>

        <ol>
            <li>Lisez attentivement la question affichée.</li>
            <li>Observez le chronomètre de 30 secondes.</li>
            <li>Saisissez votre réponse dans le champ prévu à cet effet.</li>
            <li>
                Cliquez sur <strong>Répondre</strong> ou appuyez sur
                la touche <kbd>Entrée</kbd>.
            </li>
        </ol>

        <div class="success">
            <strong>Bonne réponse :</strong>
            la zone est validée, le score augmente généralement de 100 points
            et l'indicateur associé progresse.
        </div>

        <div class="danger">
            <strong>Mauvaise réponse :</strong>
            un point de vie est retiré. Lorsque les points de vie atteignent
            zéro, la partie est interrompue et le jeu revient à un état initial.
        </div>

        <p>
            Si le temps est écoulé, la question est considérée comme non résolue
            et le programme peut proposer une question suivante.
        </p>

        <h3>7. Quiz à choix multiples</h3>

        <p>
            Les quiz proposent cinq boutons de réponse. La position de la bonne
            réponse est mélangée à chaque ouverture afin qu'elle ne soit pas
            toujours située au même endroit.
        </p>

        <ol>
            <li>Lisez la question du quiz.</li>
            <li>Cliquez sur la réponse qui vous semble correcte.</li>
            <li>Attendez le retour visuel du programme.</li>
        </ol>

        <p>
            Une bonne réponse colore le bouton correspondant et valide la zone.
            Une mauvaise réponse colore la réponse sélectionnée, affiche la
            bonne réponse et retire un point de vie.
        </p>

        <h3>8. Passages verrouillés</h3>

        <p>
            Une zone peut empêcher le personnage de progresser.
            Lorsqu'un déplacement tente de franchir une zone encore verrouillée,
            un message explicatif est affiché.
        </p>

        <p>
            Un verrou peut dépendre d'un indicateur de progression ou d'une
            liste d'objets requis. Le passage est automatiquement actualisé
            lorsqu'une condition est remplie.
        </p>

        <div class="notice">
            <strong>Conseil :</strong>
            lisez attentivement le message de verrouillage afin d'identifier
            la question à résoudre ou les objets à récupérer.
        </div>

        <h3>9. Informations et dialogues</h3>

        <p>
            Les zones info affichent une explication, un dialogue ou une
            information accompagnée éventuellement d'une illustration.
        </p>

        <p>
            Pour fermer le message, cliquez sur <strong>OK</strong> ou sur le
            bouton <strong>×</strong> situé dans l'angle de la fenêtre.
        </p>

        <h3>10. Objets et inventaire</h3>

        <p>
            Lorsqu'un objet est trouvé, une fenêtre propose de le récupérer.
            Cliquez sur <strong>Oui</strong> pour commencer l'activité associée
            à l'objet, ou sur <strong>Non</strong> pour le laisser sur place.
        </p>

        <ol>
            <li>Entrez dans la zone de l'objet.</li>
            <li>Lisez sa description.</li>
            <li>
                Cliquez sur <strong>Oui</strong> si vous souhaitez le récupérer.
            </li>
            <li>Répondez correctement à la question proposée.</li>
            <li>
                L'objet est ajouté à l'inventaire en cas de réussite.
            </li>
        </ol>

        <p>
            L'inventaire peut contenir au maximum <strong>10 objets</strong>.
            Le compteur est affiché sous la forme <code>nombre/10</code>.
        </p>

        <h3>11. Gestion de l'inventaire</h3>

        <p>
            Cliquez sur l'icône <strong>🎒 Inventaire</strong> pour afficher
            la liste des objets possédés.
        </p>

        <ul>
            <li>Chaque objet apparaît avec son nom.</li>
            <li>
                Le bouton <strong>Jeter</strong> retire l'objet
                de l'inventaire.
            </li>
            <li>
                Après la suppression, les passages verrouillés
                sont réévalués.
            </li>
            <li>
                Un <b>inventaire plein</b> doit être libéré avant de récupérer
                un nouvel objet.
            </li>
        </ul>

        <div class="warning">
            <strong>Attention :</strong>
            ne jetez pas un objet nécessaire à l'ouverture d'un passage,
            sauf si vous pouvez le récupérer ultérieurement.
        </div>

        <h3>12. Score, indicateurs et progression</h3>

        <p>
            Les réponses correctes aux questions et aux quiz augmentent le score.
            Elles peuvent également modifier des indicateurs internes utilisés
            pour sélectionner les questions suivantes ou déverrouiller certaines zones.
        </p>

        <p>
            Les zones déjà réussies disparaissent généralement du décor et ne
            peuvent plus être déclenchées pendant la partie en cours.
        </p>

        <h3>13. Changement de décor</h3>

        <p>
            Entrez dans une zone de sortie (généralement au centre en bas ou sur les milieux des bords) pour changer automatiquement de monde.
            Vous pouvez également utiliser les triangles situés sur les bords
            du décor.
        </p>
<h3>14. Points de vie et réponses incorrectes</h3>

<p>
    Le joueur commence la partie avec <strong>10 points de vie</strong>.
    Le nombre de vies restantes est affiché en permanence dans l'interface,
    à côté du symbole <strong>❤️</strong>.
</p>

<p>
    Chaque réponse incorrecte à une question ou à un quiz fait perdre
    <strong>1 point de vie</strong>.
</p>

<table>
    <thead>
        <tr>
            <th>Situation</th>
            <th>Conséquence</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Bonne réponse</td>
            <td>La zone est validée et le score augmente.</td>
        </tr>
        <tr>
            <td>Mauvaise réponse à une question</td>
            <td>Le joueur perd 1 point de vie.</td>
        </tr>
        <tr>
            <td>Mauvaise réponse à un quiz</td>
            <td>Le joueur perd 1 point de vie.</td>
        </tr>
        <tr>
            <td>Temps écoulé</td>
            <td>
                La question n'est pas validée et le programme passe à la
                question suivante prévue.
            </td>
        </tr>
        <tr>
            <td>0 point de vie</td>
            <td>La partie est terminée : Game Over.</td>
        </tr>
    </tbody>
</table>

<div class="danger">
    <strong>Attention :</strong>
    le joueur dispose de 10 vies au début de la partie. Après dix réponses
    incorrectes, il atteint normalement zéro vie et déclenche la fin de partie,
    sauf si certaines règles du scénario modifient ce comportement.
</div>

<p>
    Après un <strong>Game Over</strong>, le score et les points de vie sont
    réinitialisés, puis le joueur est replacé dans le monde de départ.
</p>

        <h3>16. Les différents mondes</h3>
<b>🏠 Monde 0 — Début</b> <p>L'aventure commence sur une plateforme mystérieuse. Le voyageur est invité à explorer les différents lieux, à résoudre les énigmes et à trouver son chemin vers le château.</p> <b>🌳 Monde 1 — La Contrée</b> <p>La Contrée constitue le carrefour principal de l'aventure. Elle permet d'accéder au village, à la carrière, à la fontaine et au château. Plusieurs questions doivent être résolues pour progresser.</p> <b>🏘️ Monde 2 — Village du Porge</b> <p>Le village est le cœur de la rencontre avec les habitants. Le joueur peut visiter les maisons d'Aden, Gerhard, Lily, Yin et des gardes. Il y découvre une clef et de nombreux indices concernant la quête de l'HeadHealer.</p> <b>⛏️ Monde 3 — La Carrière</b> <p>La carrière est gardée et son accès nécessite une autorisation. Aden surveille l'entrée. Le joueur doit résoudre une question pour obtenir le mot de passe, puis peut explorer les carrières Ouest et Est.</p> <b>⛲ Monde 4 — La Fontaine</b> <p>La fontaine est un lieu essentiel de l'aventure. Le joueur y trouve de l'eau pure et découvre quatre menhirs : Sud, Ouest, Nord et Est. Les trois premiers contiennent des énigmes permettant de découvrir le mot magique nécessaire pour accéder au dernier menhir.</p> <b>🏰 Monde 5 — Le Château</b> <p>Le château est protégé par Hildebrand. Le joueur doit réunir les objets nécessaires avant de pouvoir poursuivre son aventure. Le château permet également d'accéder à la grotte de l'Honorable.</p> <b>🕯️ Monde 6 — Grotte du Château</b> <p>Dans la grotte, le joueur doit résoudre deux énigmes liées à l'eau et au livre avant de pouvoir parler à l'Honorable. Ces épreuves réussies permettent de poursuivre l'aventure.</p> <b>🗿 Monde 7 — L'Honorable</b> <p>L'Honorable est prisonnier d'un puissant sortilège. Quatre menhirs — bleu, pourpre, orange et vert — se sont rebellés. Pour le libérer, le joueur doit répondre correctement aux questions des quatre menhirs et briser leurs chaînes.</p> <b>🏡 Monde 8 — Maison de Gerhard</b> <p>Gerhard et Liva accueillent le voyageur. Gerhard explique que la quête consiste à retrouver la formule et les ingrédients de l'HeadHealer. Le joueur peut récupérer plusieurs objets utiles, notamment des feuilles de laurier, de la farine et des ustensiles.</p> <b>🌸 Monde 9 — Maison de Lily</b> <p>Lily cueille des fleurs de sauge et prépare des sirops appréciés des gardes. Elle fournit au joueur des fleurs de sauge. Lysandre explique également l'utilisation du vinaigre de vin et des fibres de tiges de sauge pour fabriquer des filtres.</p> <b>🍵 Monde 10 — Maison de Yin</b> <p>Madame Yin fabrique des thés aux vertus médicinales. Le joueur découvre l'importance de l'eau pure et peut récupérer une recette de thé et un mortier. Yang apporte également des informations mystérieuses sur l'eau de la fontaine et les inscriptions des menhirs.</p> <b>🛡️ Monde 11 — Maison des Gardes</b> <p>Les gardes recherchent le grimoire perdu de l'Honorable, probablement abandonné dans les carrières. Le joueur découvre une carte de la carrière, des livres, des armes et une bouteille de vinaigre de vin. Les gardes donnent également le mot de passe permettant d'accéder à la carrière.</p> <b>⛏️ Monde 12 — Carrière Ouest</b> <p>La carrière Ouest est une zone dangereuse. Le joueur y découvre finalement le grimoire crypté de l'Honorable ainsi que des outils de mine. Le grimoire constitue un élément essentiel de la quête de l'HeadHealer.</p> <b>⚗️ Monde 13 — Carrière Est</b> <p>La carrière Est contient plusieurs objets importants pour la quête scientifique : des livres de chimie et d'extraction, des armes et un coffret de bijoux. Les ouvrages introduisent notamment les notions d'extraction, de solubilité, de broyage, de filtration et de purification.</p> <b>🗿 Monde 14 — Menhir du Sud</b> <p>Le joueur découvre le premier des quatre menhirs et doit résoudre son énigme. Cette étape fournit un élément nécessaire à la découverte du mot magique.</p> <b>🗿 Monde 15 — Menhir de l'Ouest</b> <p>Le deuxième menhir propose une nouvelle énigme. Ses informations, combinées à celles des autres menhirs, permettent de progresser dans la quête du mot magique.</p> <b>🗿 Monde 16 — Menhir du Nord</b> <p>Le troisième menhir contient une nouvelle énigme. Les indices réunis auprès des trois premiers menhirs permettent de découvrir le mot magique donnant accès au menhir de l'Est.</p> <b>🌿 Monde 17 — Menhir de l'Est</b> <p>Le dernier menhir révèle le secret scientifique de l'aventure. Le joueur comprend que le trésor recherché est caché dans l'écorce d'un arbre et que son extraction nécessite notamment de l'écorce, de l'eau pure, un acide issu du vin, un mortier et un filtre.</p> <p><em>Le message rappelle qu'extraire un trésor naturel ne signifie pas le fabriquer : la nature l'avait caché, et le joueur apprend simplement à le révéler.</em></p> <b>🏆 Monde 18 — Final</b> <p>Après avoir accompli les différentes étapes de la quête, le joueur atteint la fin de l'aventure.</p> <b>📜 Monde 20 — Crédits</b> <p>Le dernier espace présente les crédits du jeu : auteur, illustration et web design, musiques et projet SciencExpert / SMILE.</p>


        <h3>17. Fin de partie et réinitialisation</h3>

        <p>
            Si les points de vie atteignent zéro, un message de fin de partie
            est affiché. Le programme réinitialise alors le score et les points
            de vie, puis recharge un décor de départ.
        </p>

        <p>
            Pour recommencer manuellement, cliquez sur le bouton
            <strong>♻️ Reset</strong> situé dans le pied de page.
        </p>

<h2> Les solutions de la quête</h2>
<p> Pour découvrir le secret de l’<strong>HEADHEALER</strong>, le joueur doit explorer le village, la maison des gardes et les carrières afin de réunir plusieurs objets essentiels. </p>
<h3>📜 1. Le Grimoire</h3>
<p><b>Quoi ?</b>  Le <strong>Grimoire de l’Honorable</strong> est un ancien livre crypté. Il contient vraisemblablement la recette secrète de l’HEADHEALER. </p>
<p><b>Où ?</b> Dans la <strong>Carrière Ouest</strong>. </p>
<p><b>Comment l'obtenir ?</b> Il faut d’abord obtenir l’autorisation d’entrer dans les carrières. Le gardien indique que le mot de passe doit être obtenu auprès d’<strong>Aden</strong>. Une fois dans la carrière Ouest, le joueur trouve le grimoire et peut le prendre. </p>
<hr>
<h3>🌿 2. La Sauge</h3><p>
<b>Quoi ?</b>  La <strong>sauge</strong> est la plante au cœur de la quête scientifique. Lily cueille ses fleurs et le jeu révèle ensuite que son écorce renferme le précieux secret recherché. </p>
<p><b>Où ?</b>  Dans la <strong>Maison de Lily</strong>, dans le village. </p>
<p><b>Comment l'obtenir ?</b>  Lily autorise le joueur à prendre le <strong>bouquet de fleurs de sauge</strong>. Il suffit d’entrer dans la zone correspondante et d’accepter de récupérer l’objet. </p>
<hr>
<h3>⚗️ 3. Le Mortier</h3><p>
<b>Quoi ?</b>  Le <strong>mortier</strong> est un outil permettant de broyer la matière végétale afin de favoriser la diffusion des substances dans l’eau. </p>
<p><b>Où ?</b> Dans la <strong>Maison de Yin</strong>. </p>
<p><b>Comment l'obtenir ?</b> Le mortier se trouve dans la maison de Yin. Le joueur doit entrer dans sa zone et accepter de le prendre. Le jeu explique qu’il sert à broyer les feuilles et à favoriser leur diffusion dans l’eau pure. </p>
<hr>
<h3>💧 4. L'eau pure</h3>
<p><b>Quoi ?</b> L’<strong>eau pure</strong> provient de la fontaine. Elle constitue l’un des éléments indispensables de la quête. </p>
<p><b>Où ?</b> À la <strong>Fontaine</strong>, dans le monde 4. </p>
<p><b>Comment l'obtenir ?</b> Le joueur doit se rendre à la fontaine et récupérer l’objet <strong>« Eau Pure »</strong>. La fontaine est également liée aux quatre menhirs et à l’énigme du mot magique. </p>
<hr>
<h3>🍷 5. Le vinaigre</h3>
<p><b>Quoi ?</b> Il s’agit de <strong>vinaigre de vin</strong>, présenté dans le jeu comme l’acide provenant du vin. Il constitue l’élément acide utilisé dans la quête d’extraction. </p>
<p><b>Où ?</b>  Dans la <strong>Maison des Gardes</strong>, dans le village. </p>
<p><b>Comment l'obtenir ?</b>  Le joueur trouve une bouteille de vinaigre de vin. Le gardien explique qu’elle était normalement destinée au château, mais qu’elle n’est plus livrée depuis que l’Honorable est malade. Le joueur peut alors la prendre. </p>
<hr>
<h3>🧵 6. Le filtre</h3>
<p><b>Quoi ?</b>  Les <strong>filtres</strong> sont fabriqués à partir des fibres des tiges de sauge. Ils permettent, dans la quête scientifique, de séparer le précieux extrait du reste de la matière. </p>
<p><b>Où ?</b>  Dans la <strong>Maison de Lily</strong>. </p>
<p><b>Comment l'obtenir ?</b>  Lily propose au joueur des filtres fabriqués à partir des fibres des tiges de sauge. Il suffit d’entrer dans la zone de l’objet et d’accepter de les récupérer. </p>
<hr>
<h3>🧩 Résumé de la quête</h3>
<table border="1" cellpadding="8" cellspacing="0"> <thead> <tr> <th>Objet</th> <th>Où ?</th> <th>Comment l'obtenir ?</th> </tr> </thead> <tbody> <tr> <td>📜 Grimoire</td> <td>Carrière Ouest</td> <td>Explorer la carrière et le récupérer</td> </tr> <tr> <td>🌿 Sauge</td> <td>Maison de Lily</td> <td>Lily autorise le joueur à prendre le bouquet</td> </tr> <tr> <td>⚗️ Mortier</td> <td>Maison de Yin</td> <td>Le récupérer dans la maison</td> </tr> <tr> <td>💧 Eau pure</td> <td>Fontaine</td> <td>La récupérer à la fontaine</td> </tr> <tr> <td>🍷 Vinaigre</td> <td>Maison des Gardes</td> <td>Prendre la bouteille proposée par le garde</td> </tr> <tr> <td>🧵 Filtre</td> <td>Maison de Lily</td> <td>Récupérer les filtres fabriqués avec les fibres de sauge</td> </tr> </tbody> </table>
<h3>🔬 Le secret final</h3>
<p> Lorsque les indices sont réunis, le joueur comprend que la quête repose sur l’association de plusieurs éléments : </p>
<p style="font-size:1.2em; text-align:center;"> 🌿 <strong>Sauge</strong> + 💧 <strong>Eau pure</strong> + 🍷 <strong>Vinaigre</strong> + ⚗️ <strong>Mortier</strong> + 🧵 <strong>Filtre</strong> </p>
<p> Le dernier menhir explique que l’écorce renferme un trésor invisible et que l’eau, l’acide, le broyage et la filtration permettent de le révéler. Le jeu précise également que <strong>extraire un trésor n’est pas le fabriquer</strong> : il s’agit de révéler ce que la nature avait déjà caché. </p>









    `;

    /*==================================================================================================================
     * Version anglaise.
     * =================================================================================================================
     */
    const manualEnglishHTML = `
        <div class="notice">
            <strong>Game objective:</strong>
            explore the different worlds, answer questions, complete quizzes,
            collect the required items and unlock blocked passages to progress
            through the adventure.
        </div>

        <h3>1. Overview</h3>

        <p>
            <strong>HEADHEALER Quest</strong> is an educational exploration game.
            The player moves a character through several worlds and interacts
            with different zones displayed in the scenery.
        </p>

        <p>
            Interactions may consist of an open-answer question, a multiple-choice
            quiz, an explanatory dialogue, an item to collect or a locked passage.
        </p>

        <h3>2. Starting the game</h3>

        <ol>
            <li>Open the main HTML file in a recent web browser.</li>
            <li>Wait for the scenery and interface to load.</li>
            <li>The character appears automatically in the starting world.</li>
            <li>Click inside the game area to choose the character's destination.</li>
            <li>Explore the zones and complete the activities you encounter.</li>
        </ol>

        <div class="warning">
            <strong>Note:</strong>
            audio playback may require an initial interaction with the page.
            Click inside the game area if the music does not start automatically.
	If it bothers you, you can remove it by clicking the 🔊 icon.

        </div>

        <h3>3. Moving the character</h3>

        <p>
            Character movement is controlled with the mouse. The character
            automatically moves toward the location selected with a left click.
        </p>

        <div class="controls">
            <div class="control">
                <strong>🖱️ Left click</strong><br>
                Sets the character's destination.
            </div>


 <p>Movement can be blocked in certain areas, either temporarily by requiring a question to be answered, or permanently. </p>


        <p>
A visual cue may appear at the location where the user clicks. The character stops when it reaches its destination or encounters an obstacle.
        </p>
        </div>

        <h3>4. Questions and quizzes</h3>

        <p>
            Reach the centre of a question zone and type the answer before
            the 30-second timer expires.
        </p>

        <p>
            Quiz zones display five answer buttons. The answer order is shuffled
            each time the quiz opens.
        </p>

        <h3>5. Locked passages</h3>

        <p>
            Locked passage may require a
            progress indicator or one or more items in the inventory.
        </p>

        <h3>6. Items and inventory</h3>

        <p>
            When an item is found, choose <strong>Yes</strong> to collect it.
            The item is added to the inventory after the associated question
            has been answered correctly.
        </p>

        <p>
            The inventory can contain a maximum of <strong>10 items</strong>.
            Use the <strong>Drop</strong> button to remove an item.
        </p>



<h3>7.Health points and incorrect answers</h3>

<p>
    The player starts the game with <strong>10 health points</strong>.
    The remaining health is permanently displayed in the interface next to
    the <strong>❤️</strong> symbol.
</p>

<p>
    Each incorrect answer to a question or quiz removes
    <strong>1 health point</strong>.
</p>

<table>
    <thead>
        <tr>
            <th>Situation</th>
            <th>Consequence</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Correct answer</td>
            <td>The zone is completed and the score increases.</td>
        </tr>
        <tr>
            <td>Incorrect answer to a question</td>
            <td>The player loses 1 health point.</td>
        </tr>
        <tr>
            <td>Incorrect answer to a quiz</td>
            <td>The player loses 1 health point.</td>
        </tr>
        <tr>
            <td>Timer expires</td>
            <td>
                The question is not completed and the program moves to the
                next scheduled question.
            </td>
        </tr>
        <tr>
            <td>0 health points</td>
            <td>The game ends with a Game Over state.</td>
        </tr>
    </tbody>
</table>

<div class="danger">
    <strong>Warning:</strong>
    the player has 10 lives at the beginning of the game. After ten incorrect
    answers, health normally reaches zero and the game ends, unless a scenario
    rule changes this behaviour.
</div>

<p>
    After a <strong>Game Over</strong>, the score and health points are reset,
    and the player is returned to the starting world.
</p>



<h3>8. The Worlds of the Adventure</h2>

<b>🏠 World 0 — Start</b>
<p>The adventure begins on a mysterious platform. The traveller is invited to explore the different locations, solve the puzzles and find the way to the castle.</p>

<b>🌳 World 1 — The Countryside</b><p>
The Countryside is the main crossroads of the adventure. It provides access to the village, the quarry, the fountain and the castle. Several questions must be solved in order to progress.</p>

<b>🏘️ World 2 — Porge Village</b>
<p>The village is the heart of the encounters with the inhabitants. The player can visit the houses of Aden, Gerhard, Lily, Yin and the guards. A key and many clues about the HeadHealer quest can be found here.</p>

<b>⛏️ World 3 — The Quarry</b>
<p>The quarry is guarded and requires permission to enter. Aden guards the entrance. The player must solve a question to obtain the password and can then explore the West and East quarries.</p>

<b>⛲ World 4 — The Fountain</b>
<p>The fountain is a key location in the adventure. The player can collect pure water and discover four menhirs: South, West, North and East. The first three contain puzzles that reveal the magic word needed to access the final menhir.</p>

<b>🏰 World 5 — The Castle</b>
<p>The castle is guarded by Hildebrand. The player must gather the required objects before being allowed to continue the adventure. The castle also provides access to the Honorable One's cave.</p>

<b>🕯️ World 6 — Castle Cave</b>
<p>Inside the cave, the player must solve two puzzles related to water and the book before being able to speak to the Honorable One. Once these challenges are completed, the adventure can continue.</p>

<b>🗿 World 7 — The Honorable One</b>
<p>The Honorable One is trapped by a powerful spell. Four menhirs — blue, purple, orange and green — have rebelled. To free him, the player must correctly answer the questions of all four menhirs and break their chains.</p>

<b>🏡 World 8 — Gerhard's House</b>
<p>Gerhard and Liva welcome the traveller. Gerhard explains that the quest is to discover the formula and ingredients of the HeadHealer. The player can collect several useful items, including bay leaves, flour and utensils.</p>

<b>🌸 World 9 — Lily's House</b>
<p>Lily collects sage flowers and prepares syrups enjoyed by the guards. She gives the player sage flowers. Lysandre also explains the use of wine vinegar and sage-stalk fibres for making filters.</p>

<b>🍵 World 10 — Yin's House</b>
<p>Madame Yin makes medicinal teas. The player discovers the importance of pure water and can collect a tea recipe and a mortar. Yang also provides mysterious information about the fountain water and the inscriptions on the menhirs.</p>

<b>🛡️ World 11 — Guards' House</b>
<p>The guards are searching for the Honorable One's lost grimoire, which was probably left in the quarries. The player finds a quarry map, books, weapons and a bottle of wine vinegar. The guards also provide the password needed to enter the quarry.</p>

<b>⛏️ World 12 — West Quarry</b>
<p>The West Quarry is a dangerous area. The player eventually discovers the Honorable One's encrypted grimoire, as well as mining tools. The grimoire is an essential element of the HeadHealer quest.</p>

<b>⚗️ World 13 — East Quarry</b>
<p>The East Quarry contains several important objects for the scientific quest: chemistry and extraction books, weapons and a jewellery box. The books introduce concepts such as extraction, solubility, grinding, filtration and purification.</p>

<b>🗿 World 14 — South Menhir</b>
<p>The player discovers the first of the four menhirs and must solve its puzzle. This stage provides an element needed to discover the magic word.</p>

<b>🗿 World 15 — West Menhir</b>
<p>The second menhir presents another puzzle. Its information, combined with the clues from the other menhirs, allows the player to progress towards discovering the magic word.</p>

<b>🗿 World 16 — North Menhir</b>
<p>The third menhir contains another puzzle. The clues gathered from the first three menhirs reveal the magic word that grants access to the East Menhir.</p>

<b>🌿 World 17 — East Menhir</b>
<p>The final menhir reveals the scientific secret of the adventure. The player learns that the treasure being sought is hidden in tree bark and that its extraction requires several elements, including bark, pure water, an acid derived from wine, a mortar and a filter.</p>

<p><em>The message reminds the player that extracting a natural treasure is not the same as creating it: nature hid it, and the player simply learns how to reveal it.</em></p>

<b>🏆 World 18 — Final</b>
<p>After completing the different stages of the quest, the player reaches the end of the adventure.</p>

<b>📜 World 20 — Credits</b>
<p>The final area presents the game credits: author, illustration and web design, music and the SciencExpert / SMILE project.</p>





        <h3>8. Game over and reset</h3>

        <p>
            Incorrect answers remove health points. When health reaches zero,
            the program resets the game state.
        </p>

        <p>
            Click the <strong>♻️ Reset</strong> button to reload the game manually.
        </p>

<h2>🗝️ Quest Solutions</h2>
<p> To discover the secret of <strong>HEADHEALER</strong>, the player must explore the village, the guards' house and the quarries in order to gather several essential objects. </p>
<h3>📜 1. The Grimoire</h3>
<p><b>What?</b>  The <strong>Honourable One's Grimoire</strong> is an ancient encrypted book. It apparently contains the secret recipe for HEADHEALER. </p>
<p><b>Where?</b>  In the <strong>West Quarry</strong>. </p>
<p><b>How do you get it?</b>  First, the player must obtain permission to enter the quarries. The guard explains that the password must be obtained from <strong>Aden</strong>. Once inside the West Quarry, the player finds the grimoire and can take it. </p>
<hr>
<h3>🌿 2. Sage</h3>
<p><b>What?</b> <strong>Sage</strong> is the plant at the heart of the scientific quest. Lily collects its flowers, while the final clue reveals that the bark contains the precious secret being sought. </p>
<p><b>Where?</b>  In <strong>Lily's House</strong>, in the village. </p>
<p><b>How do you get it?</b> Lily allows the player to take the <strong>bouquet of sage flowers</strong>. The player simply enters the corresponding item zone and accepts the object. </p>
<hr>
<h3>⚗️ 3. The Mortar</h3>
<p><b>What?</b>  The <strong>mortar</strong> is a tool used to grind plant material and help substances diffuse into water. </p>
<p><b>Where?</b>  In <strong>Yin's House</strong>. </p>
<p><b>How do you get it?</b> The mortar is located inside Yin's house. The player enters the item zone and accepts the object. The game explains that it is used to grind leaves and enhance their diffusion in pure water. </p>
<hr>
<h3>💧 4. Pure Water</h3>
<p><b>What?</b> The <strong>pure water</strong> comes from the fountain. It is one of the essential elements of the quest. </p>
<p><b>Where?</b>  At the <strong>Fountain</strong>, in World 4. </p>
<p><b>How do you get it?</b>  The player must go to the fountain and collect the <strong>“Pure Water”</strong> item. The fountain is also connected to the four menhirs and the magical-word puzzle. </p>
<hr>
<h3>🍷 5. Vinegar</h3>
<p><b>What?</b>  It is <strong>wine vinegar</strong>, presented in the game as the acid derived from wine. It provides the acidic element used in the extraction quest. </p>
<p><b>Where?</b>  In the <strong>Guards' House</strong>, in the village. </p>
<p><b>How do you get it?</b> The player finds a bottle of wine vinegar. The guard explains that it was normally intended for the castle, but deliveries stopped after the Honourable One became ill. The player can then take the bottle. </p>
<hr>
<h3>🧵 6. The Filter</h3>
<p><b>What?</b>  The <strong>filters</strong> are made from fibres obtained from sage stalks. In the scientific quest, they are used to separate the valuable extract from the remaining material. </p>
<p><b>Where?</b>  In <strong>Lily's House</strong>. </p>
<p><b>How do you get it?</b>  Lily offers the player filters made from sage-stalk fibres. The player enters the item zone and accepts them. </p>
<hr>
<h3>🧩 Quest Summary</h3>
<table border="1" cellpadding="8" cellspacing="0"> <thead> <tr> <th>Object</th> <th>Where?</th> <th>How to obtain it?</th> </tr> </thead> <tbody> <tr> <td>📜 Grimoire</td> <td>West Quarry</td> <td>Explore the quarry and collect it</td> </tr> <tr> <td>🌿 Sage</td> <td>Lily's House</td> <td>Lily allows the player to take the bouquet</td> </tr> <tr> <td>⚗️ Mortar</td> <td>Yin's House</td> <td>Collect it inside the house</td> </tr> <tr> <td>💧 Pure Water</td> <td>Fountain</td> <td>Collect it at the fountain</td> </tr> <tr> <td>🍷 Vinegar</td> <td>Guards' House</td> <td>Take the bottle offered by the guard</td> </tr> <tr> <td>🧵 Filter</td> <td>Lily's House</td> <td>Collect the filters made from sage fibres</td> </tr> </tbody> </table>
<h3>🔬 The Final Secret</h3>
<p> When the clues have been gathered, the player understands that the quest combines several elements: </p>
<p style="font-size:1.2em; text-align:center;"> 🌿 <strong>Sage</strong> + 💧 <strong>Pure Water</strong> + 🍷 <strong>Vinegar</strong> + ⚗️ <strong>Mortar</strong> + 🧵 <strong>Filter</strong> </p>
<p> The final menhir explains that the bark contains an invisible treasure and that water, acid, grinding and filtration reveal it. The game also emphasizes that <strong>extracting a treasure is not the same as creating it</strong>: the treasure was already hidden in nature; the player only learns how to reveal it. </p>



    `;

    /*
     * Injection des styles.
     */
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement("style");
        style.id = STYLE_ID;

        style.textContent = `
            .manual-overlay {
                position: fixed;
                inset: 0;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(0, 0, 0, 0.68);
                z-index: 99999;
            }

            .manual-overlay.is-open {
                display: flex;
            }

            .manual-window {
                position: relative;
                width: min(1000px, 96vw);
                max-height: 90vh;
                overflow: hidden;
                color: #20252b;
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
            }

            .manual-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                padding: 16px 22px;
                color: #ffffff;
                background: #17324d;
            }

            .manual-title {
                margin: 0;
                font-size: clamp(1.15rem, 2.5vw, 1.65rem);
                line-height: 1.25;
            }

            .manual-close {
                flex: 0 0 auto;
                width: 38px;
                height: 38px;
                padding: 0;
                color: #ffffff;
                font-size: 25px;
                line-height: 1;
                cursor: pointer;
                background: #c0392b;
                border: 0;
                border-radius: 6px;
            }

            .manual-close:hover,
            .manual-close:focus-visible {
                background: #962d22;
                outline: 3px solid #f2c94c;
                outline-offset: 2px;
            }

            .manual-content {
                max-height: calc(90vh - 75px);
                overflow-y: auto;
                padding: 24px;
                line-height: 1.6;
            }

            .manual-content h3 {
                margin: 28px 0 10px;
                padding-bottom: 6px;
                color: #2f80ed;
                border-bottom: 2px solid #f2c94c;
            }

            .manual-content table {
                width: 100%;
                margin: 15px 0;
                border-collapse: collapse;
            }

            .manual-content th,
            .manual-content td {
                padding: 9px;
                text-align: left;
                vertical-align: top;
                border: 1px solid #d8e0ea;
            }

            .manual-content th {
                color: #ffffff;
                background: #17324d;
            }

            .manual-content tr:nth-child(even) {
                background: #f6f9fc;
            }

            .manual-content .notice,
            .manual-content .warning,
            .manual-content .success,
            .manual-content .danger {
                margin: 15px 0;
                padding: 14px;
                border-left: 5px solid #2f80ed;
                background: #edf4ff;
            }

            .manual-content .warning {
                border-left-color: #ad6b00;
                background: #fff7df;
            }

            .manual-content .success {
                border-left-color: #218739;
                background: #edf9ef;
            }

            .manual-content .danger {
                border-left-color: #b52b2b;
                background: #fff0f0;
            }

            .manual-content .controls {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
                gap: 10px;
            }

            .manual-content .control {
                padding: 12px;
                background: #fbfdff;
                border: 1px solid #d8e0ea;
                border-radius: 7px;
            }

            .manual-content .tag {
                display: inline-block;
                min-width: 85px;
                padding: 3px 7px;
                color: #ffffff;
                font-size: 0.85em;
                font-weight: bold;
                text-align: center;
                border-radius: 4px;
            }

            .manual-content .red {
                background: #d64545;
            }

            .manual-content .blue {
                background: #3478c9;
            }

            .manual-content .gold {
                color: #3f3200;
                background: #e5bd3c;
            }

            .manual-content .purple {
                background: #8054b8;
            }

            .manual-content .orange {
                color: #402400;
                background: #e99c35;
            }

            .manual-content .pink {
                color: #55001d;
                background: #ea8fae;
            }

            .manual-content kbd {
                display: inline-block;
                padding: 2px 6px;
                color: #ffffff;
                font-family: monospace;
                background: #333333;
                border-radius: 4px;
            }

            .manual-language-switch {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 20px;
            }

            .manual-language-switch button {
                padding: 8px 13px;
                cursor: pointer;
                background: #edf4ff;
                border: 1px solid #2f80ed;
                border-radius: 5px;
            }

            .manual-language-switch button[aria-selected="true"] {
                color: #ffffff;
                background: #2f80ed;
            }

            @media (max-width: 650px) {
                .manual-overlay {
                    padding: 8px;
                }

                .manual-content {
                    padding: 16px;
                }

                .manual-content table {
                    display: block;
                    overflow-x: auto;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /*
     * Création du modal.
     */
    function createModal() {
        if (document.getElementById(MODAL_ID)) {
            return document.getElementById(MODAL_ID);
        }

        const modalHTML = `
            <div
                id="${MODAL_ID}"
                class="manual-overlay"
                aria-hidden="true"
                hidden
            >
                <div
                    class="manual-window"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="manualTitle"
                    tabindex="-1"
                >
                    <header class="manual-header">
                        <h2 id="manualTitle" class="manual-title">
                            Manuel utilisateur / User Manual
                        </h2>

                        <button
                            id="manualCloseBtn"
                            class="manual-close"
                            type="button"
                            aria-label="Fermer le manuel"
                            title="Fermer / Close"
                        >
                            ×
                        </button>
                    </header>

                    <div class="manual-content">
                        <div
                            class="manual-language-switch"
                            role="tablist"
                            aria-label="Choix de la langue"
                        >
                            <button
                                id="manualFrBtn"
                                type="button"
                                role="tab"
                                aria-selected="true"
                                aria-controls="manualFr"
                            >
                                Français
                            </button>

                            <button
                                id="manualEnBtn"
                                type="button"
                                role="tab"
                                aria-selected="false"
                                aria-controls="manualEn"
                            >
                                English
                            </button>
                        </div>

                        <section
                            id="manualFr"
                            role="tabpanel"
                            lang="fr"
                            aria-labelledby="manualFrBtn"
                        >
                            ${manualHTML}
                        </section>

                        <section
                            id="manualEn"
                            role="tabpanel"
                            lang="en"
                            hidden
                            aria-labelledby="manualEnBtn"
                        >
                            ${manualEnglishHTML}
                        </section>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", modalHTML);

        return document.getElementById(MODAL_ID);
    }

    /*
     * Retourne les éléments pouvant recevoir le focus dans le modal.
     */
    function getFocusableElements(modal) {
        return [
            ...modal.querySelectorAll(
                [
                    "button:not([disabled])",
                    "a[href]",
                    "input:not([disabled])",
                    "select:not([disabled])",
                    "textarea:not([disabled])",
                    "[tabindex]:not([tabindex='-1'])"
                ].join(",")
            )
        ].filter(element => {
            return element.offsetWidth > 0 ||
                   element.offsetHeight > 0 ||
                   element === document.activeElement;
        });
    }

    /*
     * Gestion du focus clavier à l'intérieur du modal.
     */
    function trapFocus(event) {
        const overlay = document.getElementById(MODAL_ID);

        if (!overlay || !overlay.classList.contains("is-open")) {
            return;
        }

        if (event.key !== "Tab") {
            return;
        }

        const focusableElements = getFocusableElements(overlay);

        if (focusableElements.length === 0) {
            event.preventDefault();
            overlay.querySelector(".manual-window")?.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    /*
     * Bascule entre le manuel français et le manuel anglais.
     */
    function setLanguage(language) {
        const frenchPanel = document.getElementById("manualFr");
        const englishPanel = document.getElementById("manualEn");
        const frenchButton = document.getElementById("manualFrBtn");
        const englishButton = document.getElementById("manualEnBtn");

        if (
            !frenchPanel ||
            !englishPanel ||
            !frenchButton ||
            !englishButton
        ) {
            return;
        }

        const isFrench = language === "fr";

        frenchPanel.hidden = !isFrench;
        englishPanel.hidden = isFrench;

        frenchButton.setAttribute("aria-selected", String(isFrench));
        englishButton.setAttribute("aria-selected", String(!isFrench));
    }

    /*
     * Ouvre le modal.
     */
    function openManualPopup() {
        const overlay = document.getElementById(MODAL_ID);

        if (!overlay) {
            console.error(
                "Manuel_User introuvable. Le modal n'a pas été initialisé."
            );
            return;
        }

        previouslyFocusedElement = document.activeElement;

        overlay.hidden = false;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const closeButton = overlay.querySelector("#manualCloseBtn");

        window.setTimeout(() => {
            closeButton?.focus();
        }, 0);
    }

    /*
     * Ferme le modal.
     */
    function closeManualPopup() {
        const overlay = document.getElementById(MODAL_ID);

        if (!overlay) {
            return;
        }

        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        overlay.hidden = true;

        document.body.style.overflow = "";

        if (
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === "function"
        ) {
            previouslyFocusedElement.focus();
        }

        previouslyFocusedElement = null;
    }

    /*
     * Fonction publique utilisée par l'attribut onclick du bouton existant.
     *
     * Exemples :
     * toggleManualPopup(true);
     * toggleManualPopup(false);
     * toggleManualPopup();
     */
    function toggleManualPopup(forceState) {
        const overlay = document.getElementById(MODAL_ID);

        if (!overlay) {
            console.error(
                "Manuel_User introuvable dans toggleManualPopup()."
            );
            return;
        }

        const isOpen = overlay.classList.contains("is-open");

        const shouldOpen =
            typeof forceState === "boolean"
                ? forceState
                : !isOpen;

        if (shouldOpen) {
            openManualPopup();
        } else {
            closeManualPopup();
        }
    }

    /*
     * Initialisation.
     */
    function initializeManualModal() {
        if (modalInitialized) {
            return;
        }

        modalInitialized = true;

        injectStyles();

        const overlay = createModal();

        if (!overlay) {
            console.error("Impossible de créer le modal utilisateur.");
            return;
        }

        const closeButton = overlay.querySelector("#manualCloseBtn");
        const frenchButton = overlay.querySelector("#manualFrBtn");
        const englishButton = overlay.querySelector("#manualEnBtn");

        closeButton?.addEventListener("click", event => {
            event.stopPropagation();
            closeManualPopup();
        });

        overlay.addEventListener("click", event => {
            if (event.target === overlay) {
                closeManualPopup();
            }
        });

        frenchButton?.addEventListener("click", () => {
            setLanguage("fr");
        });

        englishButton?.addEventListener("click", () => {
            setLanguage("en");
        });

        document.addEventListener("keydown", event => {
            const currentOverlay = document.getElementById(MODAL_ID);

            if (
                !currentOverlay ||
                !currentOverlay.classList.contains("is-open")
            ) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                closeManualPopup();
                return;
            }

            trapFocus(event);
        });

        window.toggleManualPopup = toggleManualPopup;
    }

    /*
     * Rend la fonction disponible immédiatement si possible.
     */
    window.toggleManualPopup = toggleManualPopup;

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeManualModal,
            { once: true }
        );
    } else {
        initializeManualModal();
    }
})();