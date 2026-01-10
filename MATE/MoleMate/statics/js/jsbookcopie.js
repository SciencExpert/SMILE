let tempo = 300;
// On détecte toutes les pages via les templates (id commençant par "page-")
const allTemplates = Array.from(document.querySelectorAll('template[id^="page-"]'));
//===========================================================
// Trier les templates par index numérique (extrait de l'id)
//===========================================================
allTemplates.sort((a, b) => {
  const aNum = parseInt(a.id.replace('page-', ''), 10);
  const bNum = parseInt(b.id.replace('page-', ''), 10);
  return aNum - bNum;
});
//===========================================================
// Crée un tableau des indexes disponibles
//===========================================================
const pagesIndexes = allTemplates.map(tpl => parseInt(tpl.id.replace('page-', ''), 10));
// Pour la navigation, on utilise les indexes triés
let currentLeftIndexPos = 0;  // position dans pagesIndexes pour page de gauche
let currentRightIndexPos = 1; // position dans pagesIndexes pour page de droite
const book = document.querySelector('.book-container');
let leftPage = null;
let rightPage = null;
//===========================================================
// Crée une page à partir d'un template cloné
//===========================================================
function createPage(pagePosInArray, side) {
  const tpl = allTemplates[pagePosInArray];
  const div = document.createElement('div');
  div.classList.add('page', side);
  // Si le template est celui de la page vide (-1), on ajoute classe transparent
  if (pagesIndexes[pagePosInArray] === -1) div.classList.add('transparent');
  div.setAttribute('aria-hidden', 'false');
  div.appendChild(tpl.content.cloneNode(true));
  // Interception des liens pour navigation fluide
  div.querySelectorAll('a[data-page]').forEach(link => {
    link.style.color = "#A52A2A";
    link.addEventListener('click', function (e) {
      const targetPage = parseInt(link.getAttribute('data-page'), 10);
      if (pagesIndexes.includes(targetPage)) {
        e.preventDefault();
        gotoPage(targetPage);
      }
    });
  });
  return div;
}
//===========================================================
//Efface la page
//===========================================================
function clearFlipClasses() {
  if (leftPage) leftPage.classList.remove('flip-left');
  if (rightPage) rightPage.classList.remove('flip-right');
  if (leftPage) leftPage.style.zIndex = '';
  if (rightPage) rightPage.style.zIndex = '';
}
//===========================================================
// Affiche la page
//===========================================================
function render() {
  clearFlipClasses();
  if (leftPage) leftPage.remove();
  if (rightPage) rightPage.remove();
  // Clamp bornes
  if (currentLeftIndexPos < 0) currentLeftIndexPos = 0;
  if (currentRightIndexPos < 1) currentRightIndexPos = 1;
  if (currentLeftIndexPos > allTemplates.length - 2) currentLeftIndexPos = allTemplates.length - 2;
  if (currentRightIndexPos > allTemplates.length - 1) currentRightIndexPos = allTemplates.length - 1;
  leftPage = createPage(currentLeftIndexPos, 'left');
  rightPage = createPage(currentRightIndexPos, 'right');
  book.appendChild(leftPage);
  book.appendChild(rightPage);
}
//===========================================================
//Tourne la page à droite
//===========================================================
function flipRight() {
  if (currentRightIndexPos >= allTemplates.length - 2) return;
  rightPage.classList.add('flip-right');
  rightPage.style.zIndex = 100;
  setTimeout(() => {
    currentLeftIndexPos = currentRightIndexPos + 1;
    currentRightIndexPos = currentRightIndexPos + 2;
    render();
  }, tempo);
}
//===========================================================
//Tourne la page à gauche
//===========================================================
function flipLeft() {
  if (currentLeftIndexPos <= 0) return;
  leftPage.classList.add('flip-left');
  leftPage.style.zIndex = 100;
  setTimeout(() => {
    currentRightIndexPos = currentLeftIndexPos - 1;
    currentLeftIndexPos = currentLeftIndexPos - 2;
    render();
  }, tempo);
}
//===========================================================
// Navigation "goto" vers n'importe quelle page
//===========================================================
function gotoPage(targetPageIndex) {
  let idx = pagesIndexes.indexOf(targetPageIndex);
  if (idx === -1) return;
  // Book tourne dans le bon sens selon la destination
  
if (idx % 2 === 1) { // cible = page droite
    if (currentRightIndexPos === idx) return;
    rightPage.classList.add('flip-right');
    rightPage.style.zIndex = 100;
    setTimeout(() => {
      currentLeftIndexPos = idx - 1;
      currentRightIndexPos = idx;
      render();
    }, tempo);
  } else { // gauche
    if (currentLeftIndexPos === idx) return;
    leftPage.classList.add('flip-left');
    leftPage.style.zIndex = 100;
    setTimeout(() => {
      currentLeftIndexPos = idx;
      currentRightIndexPos = idx + 1;
      render();
    }, tempo);
  }
}
  const continues = document.querySelectorAll('.continue');

  continues.forEach(el => {
    el.addEventListener('click', flipRight);
  });

document.getElementById('nav-right').addEventListener('click', flipRight);
document.getElementById('nav-left').addEventListener('click', flipLeft);
['nav-left', 'nav-right'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById(id).click();
    }
  });
});
//===========================================================
// Gestion des clicks
//===========================================================
 document.addEventListener('click', function handleClick(e) {
  // Ignore clicks already inside the overlay (so overlay click closes it separately)
  if (e.target.closest('.img-overlay')) return;

  // Find nearest image clicked (works if clicking inside <a><img> or <figure><img> etc.)
  const img = e.target.closest('img');
  if (!img) return;

  // OPTIONAL: ignore tiny icons (uncomment if needed)
  // if (img.naturalWidth < 80 && img.naturalHeight < 80) return;

  // Prevent link navigation if image is inside an <a>
  const link = img.closest('a');
  if (link) e.preventDefault();

  openImageOverlay(img);
});
//===========================================================
/* Create overlay once and reuse it */
//===========================================================
function createOverlay() {
  const ov = document.createElement('div');
  ov.className = 'img-overlay';
  ov.innerHTML = '<div class="img-wrap"><img alt=""></div>';
  document.body.appendChild(ov);

  // clicking overlay (outside image) closes it
  ov.addEventListener('click', (ev) => {
    // if user clicked the image itself, also close (ev.target is the img) — both behaviours ok
    closeOverlay();
  });

  // ESC closes
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeOverlay();
  });

  return ov;
}

let overlay = null;
function ensureOverlay() {
  if (!overlay) overlay = createOverlay();
  return overlay;
}

function openImageOverlay(sourceImg) {
  const ov = ensureOverlay();
  const clonedImg = ov.querySelector('img');

  // set src to currentSrc if available to handle responsive <img srcset>
  clonedImg.src = sourceImg.currentSrc || sourceImg.src;
  clonedImg.alt = sourceImg.alt || '';

  // show overlay
  ov.classList.add('open');

  // prevent background scrolling
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  if (!overlay) return;
  overlay.classList.remove('open');

  // restore scrolling after small timeout to allow opacity transition
  setTimeout(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, 200);
}
/* =========================================================
   CLICK PAGE = TURN
========================================================= */
function isInteractive(el) {
  return el.closest('a, button, img, .continue, .img-overlay');
}

document.addEventListener('click', e => {
  const page = e.target.closest('.page');
  if (!page || isInteractive(e.target)) return;

  page.classList.contains('right') ? flipRight() : flipLeft();
});
/* =========================================================
   Adapter la police de caractère à la page
========================================================= */
function adaptFontToContent() {
  document.querySelectorAll('.page').forEach(page => {
    const content = page.textContent || page.innerText;
    const lineHeight = parseFloat(getComputedStyle(page).lineHeight);
    const pageHeight = page.offsetHeight - 60; // padding/footer
    const estimatedLines = Math.max(20, content.length / 45); // estimation
    page.style.setProperty('--line-count', estimatedLines);
  });
}

window.addEventListener('load', adaptFontToContent);
window.addEventListener('resize', adaptFontToContent);
setTimeout(adaptFontToContent, 100); // pour animations flip
//===========================================================
// Affichage initial
//===========================================================
render();