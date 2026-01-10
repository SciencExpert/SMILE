let tempo = 300;

// ✅ DÉTECTION MOBILE
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// ✅ FONCTION PRINCIPALE : Ajuste la taille de police
function adaptFontToContent() {
  document.querySelectorAll('.page').forEach(page => {
    // Forcer le reflow sur mobile
    if (isMobile) {
      page.style.display = 'none';
      page.offsetHeight; // Force reflow
      page.style.display = 'flex';
    }
    
    // Récupère les dimensions réelles
    const computedStyle = window.getComputedStyle(page);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
    const availableHeight = page.clientHeight - paddingTop - paddingBottom;
    
    // Hauteur du footer
    const footer = page.querySelector('.footer');
    const footerHeight = footer ? footer.offsetHeight + 10 : 0;
    
    // Hauteur utilisable
    const usableHeight = availableHeight - footerHeight;
    
    // Taille de départ adaptée au device
    const startSize = isMobile ? 12 : 16; // px
    page.style.fontSize = `${startSize}px`;
    
    // Attente du rendu complet
    const measureDelay = isMobile ? 150 : 50; // Plus de temps sur mobile
    
    setTimeout(() => {
      // Mesure la hauteur totale du contenu
      let contentHeight = 0;
      Array.from(page.children).forEach(child => {
        if (!child.classList.contains('footer')) {
          const childHeight = child.offsetHeight;
          const marginTop = parseFloat(window.getComputedStyle(child).marginTop) || 0;
          const marginBottom = parseFloat(window.getComputedStyle(child).marginBottom) || 0;
          contentHeight += childHeight + marginTop + marginBottom;
        }
      });
      
      // Calcule le ratio
      if (contentHeight > 0 && usableHeight > 0) {
        const ratio = usableHeight / contentHeight;
        
        // Limites différentes selon le device
        const minSize = isMobile ? 8 : 10;
        const maxSize = isMobile ? 16 : 20;
        
        let newSize = startSize * ratio;
        newSize = Math.max(minSize, Math.min(maxSize, newSize));
        
        page.style.fontSize = `${newSize}px`;
        
        // Log pour debug
        console.log(`📱 Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`📏 Contenu: ${contentHeight}px | Dispo: ${usableHeight}px`);
        console.log(`🔤 Police: ${startSize}px → ${newSize.toFixed(1)}px (ratio: ${ratio.toFixed(2)})`);
      }
    }, measureDelay);
  });
}

// Navigation avec support tactile
const leftBtn = document.getElementById('nav-left');
const rightBtn = document.getElementById('nav-right');
const leftPage = document.querySelector('.page.left');
const rightPage = document.querySelector('.page.right');

function flipRight() {
  leftPage.classList.add('flip-right');
  setTimeout(() => {
    leftPage.classList.remove('flip-right');
    adaptFontToContent();
  }, 1000);
}

function flipLeft() {
  rightPage.classList.add('flip-left');
  setTimeout(() => {
    rightPage.classList.remove('flip-left');
    adaptFontToContent();
  }, 1000);
}

// Events click ET touch
rightBtn.addEventListener('click', flipRight);
rightBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  flipRight();
});

leftBtn.addEventListener('click', flipLeft);
leftBtn.addEventListener('touchend', (e) => {
  e.preventDefault();
  flipLeft();
});

// ✅ DÉCLENCHEURS MULTIPLES (crucial pour mobile)
window.addEventListener('load', () => {
  setTimeout(adaptFontToContent, 100);
  setTimeout(adaptFontToContent, 500);
  setTimeout(adaptFontToContent, 1000); // Triple sécurité
});

window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(adaptFontToContent, 300);
});

// Gestion orientation mobile
window.addEventListener('orientationchange', () => {
  setTimeout(adaptFontToContent, 500);
});

// iOS: réajuste après scroll dans la barre d'adresse
if (isIOS) {
  window.addEventListener('scroll', () => {
    clearTimeout(window.scrollTimer);
    window.scrollTimer = setTimeout(adaptFontToContent, 200);
  });
}

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

// ⭐ FONCTION ADAPTATION POLICE (MANQUANTE) ⭐
// ✅ FONCTION PRINCIPALE : Ajuste automatiquement la police
function adaptFontToContent() {
  document.querySelectorAll('.page').forEach(page => {
    // Hauteur disponible
    const computedStyle = window.getComputedStyle(page);
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
    const availableHeight = page.clientHeight - paddingTop - paddingBottom;
    
    // Espace pris par le footer
    const footer = page.querySelector('.footer');
    const footerHeight = footer ? footer.offsetHeight + 10 : 0;
    
    // Hauteur utilisable
    const usableHeight = availableHeight - footerHeight;
    
    // Reset temporaire
    page.style.fontSize = '1rem';
    
    // Mesure après rendu
    setTimeout(() => {
      let contentHeight = 0;
      Array.from(page.children).forEach(child => {
        if (!child.classList.contains('footer')) {
          contentHeight += child.offsetHeight;
        }
      });
      
      // Calcule et applique la nouvelle taille
      if (contentHeight > 0) {
        const ratio = usableHeight / contentHeight;
        const newSize = Math.max(0.35, Math.min(1.2, ratio * 1)); // Entre 0.35rem et 1.2rem
        page.style.fontSize = `${newSize}rem`;
      }
    }, 50);
  });
}

// ✅ DÉCLENCHEURS
window.addEventListener('load', adaptFontToContent);
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(adaptFontToContent, 200);
});

// Double appel pour polices qui chargent tard
setTimeout(adaptFontToContent, 100);
setTimeout(adaptFontToContent, 500);

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

  // ⭐ ADAPTATION APRÈS RENDER ⭐
  setTimeout(adaptFontToContent, 50);
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


