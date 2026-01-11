let tempo = 300;

/* ===================== UTIL ===================== */
function isMobileView() {
  return window.matchMedia("(max-width: 600px)").matches;
}

/* ===================== TEMPLATES ===================== */
const allTemplates = Array.from(document.querySelectorAll('template[id^="page-"]'));

allTemplates.sort((a, b) => {
  const aNum = parseInt(a.id.replace('page-', ''), 10);
  const bNum = parseInt(b.id.replace('page-', ''), 10);
  return aNum - bNum;
});

const pagesIndexes = allTemplates.map(tpl =>
  parseInt(tpl.id.replace('page-', ''), 10)
);

/* ===================== ÉTAT ===================== */
let currentLeftIndexPos = 0;
let currentRightIndexPos = 1;

const book = document.querySelector('.book-container');
let leftPage = null;
let rightPage = null;

/* ===================== ADAPTATION POLICE ===================== */
function adaptFontToContent() {
  document.querySelectorAll('.page').forEach(page => {
    const styles = getComputedStyle(page);

    const pageHeight = page.offsetHeight;
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    const availableHeight = pageHeight - paddingTop - paddingBottom;

    const contentHeight = page.scrollHeight - paddingTop - paddingBottom;
    const currentSize = parseFloat(styles.fontSize);

    const minSize = 14;
    const maxSize = 24;

    if (contentHeight > availableHeight) {
      const ratio = availableHeight / contentHeight;
      page.style.fontSize = `${Math.max(minSize, currentSize * ratio * 0.95)}px`;
    } else if (contentHeight < availableHeight * 0.9) {
      const ratio = availableHeight / contentHeight;
      page.style.fontSize = `${Math.min(maxSize, currentSize * ratio * 0.95)}px`;
    }
  });
}

/* ===================== CRÉATION PAGE ===================== */
function createPage(pagePosInArray, side) {
  const tpl = allTemplates[pagePosInArray];
  const div = document.createElement('div');
  div.classList.add('page', side);

  if (pagesIndexes[pagePosInArray] === -1) div.classList.add('transparent');

  div.appendChild(tpl.content.cloneNode(true));

  div.querySelectorAll('a[data-page]').forEach(link => {
    link.style.color = "#A52A2A";
    link.addEventListener('click', e => {
      const targetPage = parseInt(link.dataset.page, 10);
      if (pagesIndexes.includes(targetPage)) {
        e.preventDefault();
        gotoPage(targetPage);
      }
    });
  });

  return div;
}

/* ===================== RENDER ===================== */
function clearFlipClasses() {
  leftPage?.classList.remove('flip-left');
  rightPage?.classList.remove('flip-right');
}

function render() {
  clearFlipClasses();
  leftPage?.remove();
  rightPage?.remove();

  if (isMobileView()) {
    currentLeftIndexPos = Math.max(0, Math.min(currentLeftIndexPos, allTemplates.length - 1));
    currentRightIndexPos = currentLeftIndexPos;

    rightPage = createPage(currentRightIndexPos, 'right');
    book.appendChild(rightPage);
  } else {
    if (currentLeftIndexPos < 0) currentLeftIndexPos = 0;
    if (currentRightIndexPos < 1) currentRightIndexPos = 1;
    if (currentLeftIndexPos > allTemplates.length - 2) currentLeftIndexPos = allTemplates.length - 2;
    if (currentRightIndexPos > allTemplates.length - 1) currentRightIndexPos = allTemplates.length - 1;

    leftPage = createPage(currentLeftIndexPos, 'left');
    rightPage = createPage(currentRightIndexPos, 'right');

    book.appendChild(leftPage);
    book.appendChild(rightPage);
  }

  setTimeout(adaptFontToContent, 100);
}

/* ===================== NAVIGATION ===================== */
function flipRight() {
  if (isMobileView()) {
    if (currentRightIndexPos >= allTemplates.length - 1) return;
    currentLeftIndexPos++;
    currentRightIndexPos++;
    render();
    return;
  }

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
  if (isMobileView()) {
    if (currentLeftIndexPos <= 0) return;
    currentLeftIndexPos--;
    currentRightIndexPos--;
    render();
    return;
  }

  if (currentLeftIndexPos <= 0) return;
  leftPage.classList.add('flip-left');
  leftPage.style.zIndex = 100;

  setTimeout(() => {
    currentRightIndexPos = currentLeftIndexPos - 1;
    currentLeftIndexPos = currentLeftIndexPos - 2;
    render();
  }, tempo);
}

/* ===================== GOTO PAGE ===================== */
function gotoPage(targetPageIndex) {
  const idx = pagesIndexes.indexOf(targetPageIndex);
  if (idx === -1) return;

  if (isMobileView()) {
    currentLeftIndexPos = idx;
    currentRightIndexPos = idx;
    render();
    return;
  }

  if (idx % 2 === 1) {
    rightPage.classList.add('flip-right');
    setTimeout(() => {
      currentLeftIndexPos = idx - 1;
      currentRightIndexPos = idx;
      render();
    }, tempo);
  } else {
    leftPage.classList.add('flip-left');
    setTimeout(() => {
      currentLeftIndexPos = idx;
      currentRightIndexPos = idx + 1;
      render();
    }, tempo);
  }
}

/* ===================== BOUTONS ===================== */
document.querySelectorAll('.continue').forEach(el =>
  el.addEventListener('click', flipRight)
);

document.getElementById('nav-right')?.addEventListener('click', flipRight);
document.getElementById('nav-left')?.addEventListener('click', flipLeft);

/* ===================== CLIC PAGE ===================== */
document.addEventListener('click', e => {
  const page = e.target.closest('.page');
  if (!page || e.target.closest('a, button, img, .continue, .img-overlay')) return;

  isMobileView()
    ? flipRight()
    : page.classList.contains('right')
      ? flipRight()
      : flipLeft();
});

/* ===================== SWIPE MOBILE ===================== */
let touchStartX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) < 50) return;
  dx < 0 ? flipRight() : flipLeft();
});

/* ===================== IMAGE OVERLAY (INCHANGÉ) ===================== */
let overlay = null;

function createOverlay() {
  const ov = document.createElement('div');
  ov.className = 'img-overlay';
  ov.innerHTML = '<div class="img-wrap"><img></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', ev => ev.key === 'Escape' && closeOverlay());
  return ov;
}

function ensureOverlay() {
  if (!overlay) overlay = createOverlay();
  return overlay;
}

function openImageOverlay(img) {
  const ov = ensureOverlay();
  const clone = ov.querySelector('img');
  clone.src = img.currentSrc || img.src;
  clone.alt = img.alt || '';
  ov.classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay?.classList.remove('open');
  setTimeout(() => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, 200);
}

document.addEventListener('click', e => {
/*
  // ❌ Ne rien faire si clic dans l’overlay
  if (e.target.closest('.img-overlay')) return;

  // ✅ Image cliquée DANS une page uniquement
  const img = e.target.closest('.page img');
  if (!img) return;

  // ❌ Ne pas intercepter les images déjà ouvertes
  if (img.closest('.img-overlay')) return;

  const link = img.closest('a');
  if (link) e.preventDefault();

  openImageOverlay(img);
});
*/

/* ===================== INIT ===================== */
window.addEventListener('load', () => {
  render();
  adaptFontToContent();
});
window.addEventListener('resize', () => {
  render();
  adaptFontToContent();
});


