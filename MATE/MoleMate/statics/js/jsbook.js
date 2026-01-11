let tempo = 300;

// On détecte toutes les pages via les templates
const allTemplates = Array.from(document.querySelectorAll('template[id^="page-"]'));

allTemplates.sort((a, b) => {
  const aNum = parseInt(a.id.replace('page-', ''), 10);
  const bNum = parseInt(b.id.replace('page-', ''), 10);
  return aNum - bNum;
});

const pagesIndexes = allTemplates.map(tpl => parseInt(tpl.id.replace('page-', ''), 10));
let currentLeftIndexPos = 0;
let currentRightIndexPos = 1;

const book = document.querySelector('.book-container');
let leftPage = null;
let rightPage = null;

// ⭐ FONCTION ADAPTATION POLICE ⭐
function adaptFontToContent() {
  document.querySelectorAll('.page').forEach(page => {
    const styles = getComputedStyle(page);

    const pageHeight = page.offsetHeight;
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    const availableHeight = pageHeight - paddingTop - paddingBottom;

    const contentHeight = page.scrollHeight - paddingTop - paddingBottom;
    const currentSize = parseFloat(styles.fontSize);

    // Limites
    const minSize = 14;		//8
    const maxSize = 24;

    // Si trop grand → réduire
    if (contentHeight > availableHeight) {
      const ratio = availableHeight / contentHeight;
      const newSize = Math.max(minSize, currentSize * ratio * 0.95);
      page.style.fontSize = `${newSize}px`;
    }

    // Si trop petit → agrandir
    else if (contentHeight < availableHeight * 0.9) {
      const ratio = availableHeight / contentHeight;
      const newSize = Math.min(maxSize, currentSize * ratio * 0.95);
      page.style.fontSize = `${newSize}px`;
    }
  });
}


function createPage(pagePosInArray, side) {
  const tpl = allTemplates[pagePosInArray];
  const div = document.createElement('div');
  div.classList.add('page', side);

  if (pagesIndexes[pagePosInArray] === -1) div.classList.add('transparent');
  div.setAttribute('aria-hidden', 'false');
  div.appendChild(tpl.content.cloneNode(true));

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

function clearFlipClasses() {
  if (leftPage) leftPage.classList.remove('flip-left');
  if (rightPage) rightPage.classList.remove('flip-right');
  if (leftPage) leftPage.style.zIndex = '';
  if (rightPage) rightPage.style.zIndex = '';
}

function render() {
  clearFlipClasses();
  if (leftPage) leftPage.remove();
  if (rightPage) rightPage.remove();

  if (currentLeftIndexPos < 0) currentLeftIndexPos = 0;
  if (currentRightIndexPos < 1) currentRightIndexPos = 1;
  if (currentLeftIndexPos > allTemplates.length - 2) currentLeftIndexPos = allTemplates.length - 2;
  if (currentRightIndexPos > allTemplates.length - 1) currentRightIndexPos = allTemplates.length - 1;

  leftPage = createPage(currentLeftIndexPos, 'left');
  rightPage = createPage(currentRightIndexPos, 'right');
  book.appendChild(leftPage);
  book.appendChild(rightPage);

  // ✅ ADAPTATION AVEC DÉLAI PLUS LONG
  setTimeout(adaptFontToContent, 100); // ⬅️ MODIFIÉ de 50 à 100ms
}

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

function gotoPage(targetPageIndex) {
  let idx = pagesIndexes.indexOf(targetPageIndex);
  if (idx === -1) return;

  if (idx % 2 === 1) { // page droite
    if (currentRightIndexPos === idx) return;
    rightPage.classList.add('flip-right');
    rightPage.style.zIndex = 100;
    setTimeout(() => {
      currentLeftIndexPos = idx - 1;
      currentRightIndexPos = idx;
      render();
    }, tempo);
  } else { // page gauche
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

// Navigation boutons
document.querySelectorAll('.continue').forEach(el => {
  el.addEventListener('click', flipRight);
});

document.getElementById('nav-right')?.addEventListener('click', flipRight);
document.getElementById('nav-left')?.addEventListener('click', flipLeft);

// Resize + Load
window.addEventListener('load', () => {
  render();
  adaptFontToContent();
});
window.addEventListener('resize', adaptFontToContent);

// Clics page = tourner
document.addEventListener('click', e => {
  const page = e.target.closest('.page');
  if (!page || e.target.closest('a, button, img, .continue, .img-overlay')) return;
  page.classList.contains('right') ? flipRight() : flipLeft();
});

// TOUT LE RESTE (overlay images) IDENTIQUE À VOTRE CODE ORIGINAL
let overlay = null;
function createOverlay() {
  const ov = document.createElement('div');
  ov.className = 'img-overlay';
  ov.innerHTML = '<div class="img-wrap"><img></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeOverlay();
  });
  return ov;
}

function ensureOverlay() {
  if (!overlay) overlay = createOverlay();
  return overlay;
}

function openImageOverlay(sourceImg) {
  const ov = ensureOverlay();
  const clonedImg = ov.querySelector('img');
  clonedImg.src = sourceImg.currentSrc || sourceImg.src;
  clonedImg.alt = sourceImg.alt || '';
  ov.classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  if (!overlay) return;
  overlay.classList.remove('open');
  setTimeout(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, 200);
}

document.addEventListener('click', function(e) {
  if (e.target.closest('.img-overlay')) return;
  const img = e.target.closest('img');
  if (!img) return;
  const link = img.closest('a');
  if (link) e.preventDefault();
  openImageOverlay(img);
});

// Initialisation
render();
