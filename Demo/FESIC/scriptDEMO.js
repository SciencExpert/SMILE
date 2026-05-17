/*
 * script.js — Trivial Pursuit Cinéma
 * SciencExpert Edition 2025 — Gérard Bacquet
 *
 * CORRECTIONS APPORTÉES :
 *  1. circuitIndices réinitialisé à chaque appel de createBoard()
 *  2. dice est un <div> → disabled ne fonctionne pas ; on utilise un flag diceBlocked
 *  3. answersContainer → id "answers" (cohérent avec le HTML)
 *  4. Questions Vrai/Faux sans r3 : on ne génère pas de bouton undefined
 *  5. playerCountSelect.value='0' remplacé par reset propre de l'affichage
 *  6. imageacceuil → id "imagaccueil" (cohérent avec le HTML)
 *  7. forceWin corrigé pour remplir la performance selon la vraie structure
 *  8. resetGame() remet bien tous les états visuels
 */

"use strict";

/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTES & VARIABLES GLOBALES
═══════════════════════════════════════════════════════════════════════ */
const boardSize       = 8;
const totalCells      = boardSize * boardSize;
const numberOfFamilies = Object.keys(questionsPerFamily).length;   // défini dans questions.js

// Familles attribuées aux cases en boucle (1 à numberOfFamilies)
const familyPerCell = Array.from(
  { length: totalCells },
  (_, i) => (i % numberOfFamilies) + 1
);

let players        = [];
let currentPlayer  = 0;
let gameEnded      = false;
let lastRoll       = 0;
let extraTurns     = 0;
let questionsAvailable = {};
let diceBlocked    = false;   // ← remplace dice.disabled (div n'a pas disabled)

/* Sons & Avatars ─────────────────────────────────────────────────── */
const soundYES = "https://cdn.pixabay.com/audio/2023/05/23/audio_be0f539f1f.mp3";
const soundTOC = "https://cdn.pixabay.com/audio/2024/07/04/audio_158ac3701c.mp3";

const avatarImages = [
  'images/pion1.png', 
  'images/pion2.png', 
  'images/pion3.png', 
  'images/pion4.png',   
];

/* Texte d'accueil ─────────────────────────────────────────────────── 
const TXT0 = `
  Bienvenue au Quiz <strong>Cinéma</strong> — entrez vos prénoms puis lancez le dé !<br>
  Répondez à la question selon votre famille de case :<br>
  <strong>🎬</strong> Mais qu'est-ce que je viens de regarder ??<br>
  <strong>🍅</strong> Les navets cultes !<br>
  <strong>🎙️</strong> Répliques et scènes célèbres &nbsp;<br>
  <strong>♿</strong> Le handicap au cinéma<br>
  <strong>🎤</strong> Le ciné Karaoké &nbsp;<br>
  <strong>🦁</strong> Le carnaval des animaux<br><br>
  <h2><center><strong>🎲 Cliquez sur le dé pour commencer !</strong></center><h2>
`;
*/

const TXT0 = buildWelcomeText(familyNames);

/* image de fond ─────────────────────────────────────────────────── */
const backgrounds = [
  "images/black.png",
  "images/coverDT.png",
  "images/cover2.png"
];

document.body.style.backgroundImage = `url(${backgrounds[1]})`
/* ═══════════════════════════════════════════════════════════════════════
   RACCOURCIS DOM  (tous les getElementById en un seul endroit)
═══════════════════════════════════════════════════════════════════════ */
const activePlayerDiv    = document.getElementById('activePlayerDiv');
const answersContainer   = document.getElementById('answers');
const board              = document.getElementById('board');
const diceEl             = document.getElementById('dice');
const familleTitle       = document.getElementById('familleTitle');
const imageAccueil       = document.getElementById('imagaccueil');
const logBox             = document.getElementById('log');
const clientLogo         = document.getElementById('client');
const playerCountSelect  = document.getElementById('playerCount');
const playerTeamContainer= document.getElementById('PlayerTeam');
const mainContainer      = document.getElementById('mainContainer');
const questionBox        = document.getElementById('questionBox');
const questionText       = document.getElementById('questionText');
const restartButton      = document.getElementById('restartGame');
const scoreGraphsDiv     = document.getElementById('scoreGraphs');
const startGameBtn       = document.getElementById('startGame');
const setupScreen        = document.getElementById('setupScreen');

/* ═══════════════════════════════════════════════════════════════════════
   UTILITAIRES CIRCUIT PLATEAU
═══════════════════════════════════════════════════════════════════════ */
function buildCircuit() {
  // Construit la liste des indices des cases du bord (sens horaire)
  const ci = [];
  for (let c = 0; c < boardSize; c++) ci.push(c);                              // haut gauche → droite
  for (let r = 1; r < boardSize; r++) ci.push(r * boardSize + (boardSize - 1));// droite haut → bas
  for (let c = boardSize - 2; c >= 0; c--) ci.push((boardSize - 1) * boardSize + c); // bas droite → gauche
  for (let r = boardSize - 2; r > 0; r--) ci.push(r * boardSize);             // gauche bas → haut
  return ci;
}

function getCircuitBoardIndex(posOnCircuit) {
  const ci = buildCircuit();
  return ci[posOnCircuit % ci.length];
}

/* ═══════════════════════════════════════════════════════════════════════
   RESET DES QUESTIONS
═══════════════════════════════════════════════════════════════════════ */
function resetQuestions() {
  questionsAvailable = {};
  for (let fam = 1; fam <= numberOfFamilies; fam++) {
    questionsAvailable[fam] = [...questionsPerFamily[fam]];
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   INITIALISATION DES JOUEURS
═══════════════════════════════════════════════════════════════════════ */
function initPlayers(count) {
  players = [];
  playerTeamContainer.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const player = {
      name: `Joueur ${i + 1}`,
      pos: 0,
      image: avatarImages[i],
      performance: Array(numberOfFamilies).fill(0).map(() => [false, false, false]),
      wrongAnswers: Array(numberOfFamilies).fill(0),
    };
    players.push(player);

    // Fiche visuelle du joueur
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-entry';

    const img = document.createElement('img');
    img.src = player.image;
    img.alt = `Avatar ${player.name}`;

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = player.name;
    nameInput.placeholder = `Joueur ${i + 1}`;
    nameInput.oninput = e => {
      player.name = e.target.value.trim() || `Joueur ${i + 1}`;
      updateActivePlayerDisplay();
    };

    playerDiv.appendChild(img);
    playerDiv.appendChild(nameInput);
    playerTeamContainer.appendChild(playerDiv);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   CRÉATION DU PLATEAU
═══════════════════════════════════════════════════════════════════════ */
function createBoard() {
  board.innerHTML = '';
  // CORRECTION : on rebuild le circuit localement (pas de variable globale partagée)
  const ci = buildCircuit();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    const circuitPos = ci.indexOf(i);
    if (circuitPos >= 0) {
      const fam = familyPerCell[circuitPos % numberOfFamilies];
      cell.style.backgroundColor = familiesColors[fam];
      cell.dataset.family = fam;
      cell.style.border = '1px solid rgba(0,0,0,.2)';
    } else {
      cell.style.backgroundColor = 'transparent';
    }

    board.appendChild(cell);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   MISE À JOUR DU PLATEAU (positions des joueurs)
═══════════════════════════════════════════════════════════════════════ */
function updateBoard() {
  const cells = board.children;
  const ci = buildCircuit();

  // Effacer les anciens avatars
  for (let i = 0; i < totalCells; i++) {
    Array.from(cells[i].querySelectorAll('.player-avatar')).forEach(el => el.remove());
    cells[i].style.position = 'relative';
  }

  // Placer chaque joueur
  players.forEach((p) => {
    const posOnCircuit = p.pos % ci.length;
    const boardIndex   = ci[posOnCircuit];
    const cell         = board.children[boardIndex];
    if (!cell) return;

    const avatarImg = document.createElement('img');
    avatarImg.src       = p.image;
    avatarImg.alt       = p.name;
    avatarImg.title     = p.name;
    avatarImg.className = 'player-avatar';
    cell.appendChild(avatarImg);
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   JOUEUR ACTIF
═══════════════════════════════════════════════════════════════════════ */
function updateActivePlayerDisplay() {
  const p = players[currentPlayer];
  if (!p) return;
  activePlayerDiv.innerHTML = `
    <strong>À toi de jouer,<img src="${p.image}" alt="Avatar de ${p.name}" style="width:48px;height:48px;border-radius:50%;margin-top:6px;"> ${p.name} !</strong>

  `;
}

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATION DE DÉPLACEMENT
═══════════════════════════════════════════════════════════════════════ */
async function animateMove(player, steps) {
  const cells = board.children;
  const ci = buildCircuit();

  for (let i = 0; i < steps; i++) {
    const prevIdx = ci[player.pos % ci.length];
    if (prevIdx >= 0 && prevIdx < cells.length) cells[prevIdx].classList.remove('highlight');

    player.pos++;

    const currIdx = ci[player.pos % ci.length];
    if (currIdx >= 0 && currIdx < cells.length) cells[currIdx].classList.add('highlight');

    updateBoard();

    const audio = new Audio(soundTOC);
    audio.play().catch(() => {});
    await new Promise(r => setTimeout(r, 300));
  }

  const finalIdx = ci[player.pos % ci.length];
  if (finalIdx >= 0 && finalIdx < cells.length) cells[finalIdx].classList.remove('highlight');
}

/* ═══════════════════════════════════════════════════════════════════════
   FAMILLE DE LA CASE COURANTE
═══════════════════════════════════════════════════════════════════════ */
function getPlayerFamily(playerIndex) {
  const ci = buildCircuit();
  const posOnCircuit = players[playerIndex].pos % ci.length;
  const boardIndex   = ci[posOnCircuit];
  return parseInt(board.children[boardIndex].dataset.family, 10);
}

/* ═══════════════════════════════════════════════════════════════════════
   POSER UNE QUESTION
═══════════════════════════════════════════════════════════════════════ */
function askQuestion(fam) {
  // Recharger le pool si vide
  if (!questionsAvailable[fam] || questionsAvailable[fam].length === 0) {
    questionsAvailable[fam] = [...questionsPerFamily[fam]];
  }

  const idx = Math.floor(Math.random() * questionsAvailable[fam].length);
  const q   = questionsAvailable[fam][idx];
  questionsAvailable[fam].splice(idx, 1);

  // Afficher famille + question
  familleTitle.textContent       = familyNames[fam] || `Famille ${fam}`;
  questionBox.style.backgroundColor = familiesColors[fam];
  questionText.textContent       = q.q;
  answersContainer.innerHTML     = '';

  // CORRECTION : ne créer que les réponses présentes (Vrai/Faux n'a pas r3)
  const rawAnswers = [
    { text: q.r1, correct: true },
    q.r2 ? { text: q.r2, correct: false } : null,
    q.r3 ? { text: q.r3, correct: false } : null,
  ].filter(Boolean);

  // Mélanger
  for (let i = rawAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rawAnswers[i], rawAnswers[j]] = [rawAnswers[j], rawAnswers[i]];
  }

  rawAnswers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans.text;
    btn.className   = 'answer-button';
    btn.onclick     = () => handleAnswer(ans.correct, fam, q.r1);
    answersContainer.appendChild(btn);
  });

  questionBox.style.display  = 'block';
  setDiceActive(false);
}

/* ═══════════════════════════════════════════════════════════════════════
   GESTION DE LA RÉPONSE
═══════════════════════════════════════════════════════════════════════ */
function handleAnswer(correct, fam, correctAnswer) {
  questionBox.style.display = 'none';
  setDiceActive(true);

  if (correct) {
    log(`✅ Bonne réponse, ${players[currentPlayer].name} !`);
    addGoodAnswer(currentPlayer, fam);

    if (checkFamilyComplete(currentPlayer, fam)) {
      log(`🌟 ${players[currentPlayer].name} a complété la famille "${familyNames[fam]}" !`);
      updateScoreGraphs();
      extraTurns++;
      if (extraTurns < 2) {
        log(`${players[currentPlayer].name} rejoue (${extraTurns}/2).`);
        if (checkGameEnd()) return;
        return; // rejoue sans passer au joueur suivant
      } else {
        log(`${players[currentPlayer].name} ne peut plus rejouer cette famille.`);
        extraTurns = 0;
        if (checkGameEnd()) return;
        nextPlayer();
        return;
      }
    }

    if (checkGameEnd()) return;
  } else {
    log(`❌ Mauvaise réponse. La bonne réponse était : "${correctAnswer}"`);
    if (players[currentPlayer].wrongAnswers) {
      players[currentPlayer].wrongAnswers[fam - 1]++;
    }
  }

  if (checkGameEnd()) return;
  nextPlayer();
  updateScoreGraphs();
}

/* ═══════════════════════════════════════════════════════════════════════
   PERFORMANCE (matrice des bonnes réponses)
═══════════════════════════════════════════════════════════════════════ */
function addGoodAnswer(playerIdx, fam) {
  const perf = players[playerIdx].performance[fam - 1];
  for (let i = 0; i < 3; i++) {
    if (!perf[i]) { perf[i] = true; break; }
  }
}

function checkFamilyComplete(playerIdx, fam) {
  return players[playerIdx].performance[fam - 1].every(v => v === true);
}

/* ═══════════════════════════════════════════════════════════════════════
   JOUEUR SUIVANT
═══════════════════════════════════════════════════════════════════════ */
function nextPlayer() {
  if (gameEnded) return;
  extraTurns = 0;
  currentPlayer = (currentPlayer + 1) % players.length;
  updateActivePlayerDisplay();
}

/* ═══════════════════════════════════════════════════════════════════════
   JOURNAL
═══════════════════════════════════════════════════════════════════════ */
function log(msg) {
  logBox.innerHTML = '';
  const p = document.createElement('p');
  p.innerHTML = msg;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}

/* ═══════════════════════════════════════════════════════════════════════
   GRAPHIQUES SCORES (camembert)
═══════════════════════════════════════════════════════════════════════ */
function updateScoreGraphs() {
  scoreGraphsDiv.innerHTML = '';

  players.forEach((p, i) => {
    const container = document.createElement('div');
    container.style.cssText = 'margin-bottom:8px;display:inline-block;text-align:center;margin-right:10px;';

    // Header : avatar + nom
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;margin-bottom:5px;';
    const avatar = document.createElement('img');
    avatar.src = p.image;
    avatar.alt = p.name;
    avatar.style.cssText = 'width:26px;height:26px;border-radius:50%;border:2px solid #f5c518;';
    const name = document.createElement('span');
    name.textContent = p.name;
    name.style.color = '#eaeaea';
    header.appendChild(avatar);
    header.appendChild(name);
    container.appendChild(header);

    // Canvas camembert
    const canvas = document.createElement('canvas');
    const size   = 90;
    canvas.width  = size;
    canvas.height = size;
    container.appendChild(canvas);

    const ctx         = canvas.getContext('2d');
    const center      = size / 2;
    const radius      = center - 3;
    const totalSectors= numberOfFamilies * 3;
    const sliceAngle  = (2 * Math.PI) / totalSectors;
    let   startAngle  = -Math.PI / 2; // partir du haut

    for (let fam = 0; fam < numberOfFamilies; fam++) {
      for (let j = 0; j < 3; j++) {
        const isGood = p.performance[fam][j];
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = isGood ? familiesColors[fam + 1] : 'rgba(255,255,255,.15)';
        ctx.fill();
        startAngle += sliceAngle;
      }
    }

    // Séparateurs entre familles
    for (let k = 0; k < numberOfFamilies; k++) {
      const angle = -Math.PI / 2 + k * sliceAngle * 3;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + radius * Math.cos(angle), center + radius * Math.sin(angle));
      ctx.strokeStyle = 'rgba(0,0,0,.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Bordure externe
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,.3)';
    ctx.stroke();

    scoreGraphsDiv.appendChild(container);
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   FIN DE PARTIE
═══════════════════════════════════════════════════════════════════════ */
function checkGameEnd() {

  for (let i = 0; i < players.length; i++) {

    const player = players[i];

    const completed = player.performance
      .slice(0, numberOfFamilies)
      .every(famPerf => famPerf.every(v => v));

    if (completed) {

      // ── Titre gagnant ──────────────────────────────────────────────
      let message = `
        <div style="white-space:nowrap;"><h1>🎉 <strong style="color:black;">${player.name}</strong> a gagné la partie ! 🎉</h1></div>
 
        <div style="
          color:black;
          font-size:1.2rem;
          font-weight:bold;
          margin-bottom:12px;
        ">
          Scores des joueurs selon les bonnes ✅ et les mauvaises ❌ réponses par catégories :
        </div>
         `;

      // ── Construction des cartes joueurs ────────────────────────────
      const famNames = Object.values(familyNames);

      function buildPlayerCard(p, idx) {
        const score = p.performance.flat().filter(v => v).length;
        let tableRows = '';
        for (let f = 0; f < numberOfFamilies; f++) {
          const good  = p.performance[f].filter(v => v).length;
          const wrong = (p.wrongAnswers && p.wrongAnswers[f]) ? p.wrongAnswers[f] : 0;
          const color = Object.values(familiesColors)[f] || '#ccc';
          tableRows += `
            <tr>
              <td style="padding:3px 8px;text-align:left;">
                <span style="display:inline-block;width:12px;height:12px;background:${color};border-radius:3px;margin-right:4px;vertical-align:middle;"></span>
                ${famNames[f] || 'Catégorie ' + (f + 1)}
              </td>
              <td style="padding:3px 8px;text-align:center;color:#1a7a1a;font-weight:bold;">✅ ${good}</td>
              <td style="padding:3px 8px;text-align:center;color:#a30000;font-weight:bold;">❌ ${wrong}</td>
            </tr>`;
        }
        return `
          <div style="color:black;font-size:0.9rem;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <img src="${avatarImages[idx]}" style="width:30px;height:30px;border-radius:50%;flex-shrink:0;">
              <strong>${p.name} : ${score} pts</strong>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:0.82rem;background:rgba(255,255,255,0.6);border-radius:6px;overflow:hidden;">
              <thead>
                <tr style="background:rgba(0,0,0,0.08);">
                  <th style="padding:3px 8px;text-align:left;">Catégories</th>
                  <th style="padding:3px 8px;">&nbsp;</th>
                  <th style="padding:3px 8px;">&nbsp;</th>
                </tr>
              </thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>`;
      }

      // ── Colonne gauche : joueurs 0 et 1 ───────────────────────────
      let colLeft  = '';
      let colRight = '';

      [0, 1].forEach(idx => {
        if (players[idx]) colLeft  += buildPlayerCard(players[idx], idx);
      });
      [2, 3].forEach(idx => {
        if (players[idx]) colRight += buildPlayerCard(players[idx], idx);
      });

      message += `
        <div style="display:flex;gap:16px;width:100%;align-items:flex-start;">
          <div style="flex:1;display:flex;flex-direction:column;gap:14px;">${colLeft}</div>
          ${colRight ? `<div style="flex:1;display:flex;flex-direction:column;gap:14px;">${colRight}</div>` : ''}
        </div>
      `;

      activePlayerDiv.innerHTML = message;
      activePlayerDiv.classList.add("win");

      // UI cleanup (si tu veux cacher les éléments de jeu)
      diceEl.style.visibility = 'hidden';
      questionBox.style.display = 'none';

      gameEnded = true;

      return true;
    }
  }

  return false;
}

/* ═══════════════════════════════════════════════════════════════════════
   DÉ : affichage des points
═══════════════════════════════════════════════════════════════════════ */
function displayDice(value) {
  diceEl.className = 'dice show-' + value;
}

function setDiceActive(active) {
  diceBlocked = !active;
  diceEl.style.opacity        = active ? '1' : '0.3';
  diceEl.style.pointerEvents  = active ? 'auto' : 'none';
}

/* ═══════════════════════════════════════════════════════════════════════
   LANCER LE DÉ
═══════════════════════════════════════════════════════════════════════ */
async function rollDice() {
  if (diceBlocked || gameEnded) return;

  diceBlocked = true;

  // Animation 500 ms
  const intervalDelay = 50;
  const duration = 500;
  let elapsed = 0;
  while (elapsed < duration) {
    displayDice(Math.floor(Math.random() * 6) + 1);
    await new Promise(r => setTimeout(r, intervalDelay));
    elapsed += intervalDelay;
  }

  // Résultat final
  lastRoll = Math.floor(Math.random() * 6) + 1;
  displayDice(lastRoll);
  log(`🎲 ${players[currentPlayer].name} lance le dé : <strong>${lastRoll}</strong>`);

  // Déplacement
  await animateMove(players[currentPlayer], lastRoll);
  updateActivePlayerDisplay();

  // Question
  const fam = getPlayerFamily(currentPlayer);
  askQuestion(fam);

  // diceBlocked sera remis à false dans handleAnswer via setDiceActive(true)
}

/* ═══════════════════════════════════════════════════════════════════════
   RESET DU JEU
═══════════════════════════════════════════════════════════════════════ */
function resetGame() {
  players       = [];
  currentPlayer = 0;
  gameEnded     = false;
  lastRoll      = 0;
  extraTurns    = 0;
  diceBlocked   = false;
document.body.style.backgroundImage = `url(${backgrounds[1]})`;
document.getElementById("header").innerHTML = '<h1>'+Title[1]+'</h1>';
  diceEl.style.display      = 'none';
  diceEl.style.visibility   = 'visible';
  logBox.innerHTML           = '';
client.style.display= 'none';
  restartButton.style.display= 'none';
  scoreGraphsDiv.innerHTML   = '';
  questionBox.style.display  = 'none';
  playerTeamContainer.innerHTML = '';
  board.innerHTML            = '';
  activePlayerDiv.innerHTML  = '';

  resetQuestions();

  // Remettre l'écran de setup
activePlayerDiv.classList.remove("win");
  setupScreen.style.display     = 'flex';
  imageAccueil.style.display    = '';
  playerCountSelect.style.display = '';
  startGameBtn.style.display    = 'none';
  playerCountSelect.selectedIndex = 0; // CORRECTION : selectedIndex=0 au lieu de value='0'
}

/* ═══════════════════════════════════════════════════════════════════════
   PROTOCOLE DE TRICHE (debug)
═══════════════════════════════════════════════════════════════════════ */
document.getElementById('forceWin').addEventListener('click', () => {
  if (!players[0]) { log('❌ Lancez d\'abord le jeu !'); return; }
  // CORRECTION : on remplit performance[fam][j] pour fam de 0 à numberOfFamilies-1
  for (let fam = 0; fam < numberOfFamilies; fam++) {
    players[0].performance[fam] = [true, true, true];
  }
  updateScoreGraphs();
  updateBoard();
  updateActivePlayerDisplay();
  log('🎯 Victoire forcée pour ' + players[0].name + ' !');
  checkGameEnd();
});

/* ═══════════════════════════════════════════════════════════════════════
   SÉLECTION DU NOMBRE DE JOUEURS
═══════════════════════════════════════════════════════════════════════ */
playerCountSelect.addEventListener('change', () => {
  const count = parseInt(playerCountSelect.value, 10);
  if (count >= 2) {
    startGameBtn.textContent    = `JOUER (${count} joueurs)`;
    startGameBtn.style.display  = 'inline-flex';
  } else {
    startGameBtn.style.display  = 'none';
  }
});

/* ═══════════════════════════════════════════════════════════════════════
   DÉMARRAGE DU JEU
═══════════════════════════════════════════════════════════════════════ */
startGameBtn.addEventListener('click', () => {
document.body.style.backgroundImage = `url(${backgrounds[1]})`;
  const count = parseInt(playerCountSelect.value, 10);
document.getElementById("header").innerHTML = '<h1>'+Title[2]+'</h1>';
client.style.display= 'block';
  if (!count || count < 2) return;

  // Masquer l'écran de setup
  setupScreen.style.display    = 'none';

  // Initialiser
  initPlayers(count);
  createBoard();
  resetQuestions();
  currentPlayer = 0;
  gameEnded     = false;
  extraTurns    = 0;
  diceBlocked   = false;

  updateBoard();
  updateActivePlayerDisplay();
  updateScoreGraphs();

  // Afficher éléments de jeu
  diceEl.style.display      = 'block';
  diceEl.style.visibility   = 'visible';
  logBox.innerHTML           = TXT0;
  restartButton.style.display= 'inline-flex';
  questionBox.style.display  = 'none';
  logBox.style.display  = 'block';

  displayDice(1);
  setDiceActive(true);
});

function buildWelcomeText(familyNames) {
  return `
    Bienvenue au questionnaire `+Title[1]+`! <br><br>
    Voici les thèmes abordés :<br><span style="color:white">
    ${Object.values(familyNames).map(theme => `<strong>${theme}</strong>`).join("<br></span>")}
  `;
}

document.getElementById("welcomeText").innerHTML = buildWelcomeText(familyNames);
document.getElementById("header").innerHTML = '<h1>'+Title[1]+'</h1>';

/* ═══════════════════════════════════════════════════════════════════════
   EVENTS
═══════════════════════════════════════════════════════════════════════ */
diceEl.addEventListener('click', rollDice);
restartButton.addEventListener('click', resetGame);

/* ═══════════════════════════════════════════════════════════════════════
   INITIALISATION AU CHARGEMENT
═══════════════════════════════════════════════════════════════════════ */
(function init() {
  diceEl.style.display       = 'none';
  startGameBtn.style.display = 'none';
  restartButton.style.display= 'none';
  questionBox.style.display  = 'none';
  logBox.style.display  = 'none';
  resetQuestions();
})();
buildWelcomeText(familyNames);