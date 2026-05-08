
sessionStorage.setItem('1234567890', 'true');
document.addEventListener('DOMContentLoaded', () => {
  // dictionnaire mot -> nombre
  const codebook = {
  ALPHA: 5,
  BETA: 10,
CINQ : 20,
  GAMMA: 50,
VERTE:70,
  DELTA: 100,
  PLAGE: 120,
  LIVRE: 130,
  TACHE: 140,
  CHIEN: 160,
  TABLE: 170,
  FLEUR: 180,
  PAUSE: 190,
  SOURIS: 200,
  NOIRS: 220,
  LUMEN: 240,
  VERRE: 260,
  POULE: 280,
  ROUTE: 300,
  BRISE: 320,
  CHAOS: 330,
  NUAGE: 340,
  BLANC: 345,
  ROUGE: 348,
  BLEUE: 349,
  NOUVE: 350
};




  function decodeValue(raw) {
    raw = String(raw).trim().toUpperCase();
    return codebook[raw] ?? 0;
  }

  // récupérer les spans
  const v1span = document.getElementById('V1');
  const v2span = document.getElementById('V2');

  if (!v1span || !v2span) {
    console.error('Span #V1 ou #V2 introuvable.');
    return;
  }

  const dif0 = decodeValue(v1span.textContent);
  const dif  = decodeValue(v2span.textContent);
  const dif1 = dif0 + dif;


  const decal = document.getElementById('declaration');
  const tampon = 'tampon.html';

  const now = new Date();
  const centieme = Math.floor((now - new Date(now.getFullYear(),0,0)) / (1000*60*60*24));
  const reste = dif0 + dif-centieme;


  // bannière
  if (decal) {
    if (dif1 < centieme) {
      decal.innerHTML = `🚧 Trial period expired – Please <a href="#" id="contactLink" style="color:white; text-decoration:underline;">contact us</a> for full access`;
      decal.style.opacity = '1';
      const contactLink = document.getElementById('contactLink');
      if (contactLink) {
        contactLink.addEventListener('click', e => {
          e.preventDefault();
          window.location.href = "https://payhip.com/SciencExpert/contact";
        });
      }
    } else {
      decal.textContent = ``;				//For demonstration purposes only- 🚧 ${reste} days left of the trial`;
      decal.style.opacity = '0.6';
    }
  }

  // container boutons
  const container = document.querySelector('.button-container');
  if (!container) {
    console.error('.button-container introuvable');
    return;
  }

  // style pour boutons expirés
  if (!document.querySelector('style[data-added-by-script]')) {
    const style = document.createElement('style');
    style.setAttribute('data-added-by-script','1');
    style.textContent = `
      .button-container a.disabled {
        opacity: 0.6;
        filter: grayscale(60%);
        pointer-events: auto;
        cursor: pointer;
        background: linear-gradient(135deg,#e9e9e9,#bdbdbd) !important;
        color: #333 !important;
      }
    `;
    document.head.appendChild(style);
  }

 const links = [
  { 
    label: `
      <span class="btn-icon" style="background-color:#85087A;"></span> 
      <span class="btn-text">
        <span class="btn-subtitle">Describe</span>
        <span class="btn-title" style="color:#85087A;">Quick Stats</span>
      </span>
    `, 
    url:'01_Stat Descriptive.html', 
    min:dif1 
  },
  { 
    label: `
      <span class="btn-icon" style="background-color:#0F701A;"></span>
      <span class="btn-text">
        <span class="btn-subtitle">Branching</span>
        <span class="btn-title" style="color:#0F701A;">Cluster Tree</span>
      </span>
    `, 
    url:'02_Dendogram.html', 
    min:dif1 
  },
  { 
    label: `
      <span class="btn-icon" style="background-color:#0ea5e9;"></span>
      <span class="btn-text">
        <span class="btn-subtitle">Cluster</span>
        <span class="btn-title" style="color:#0ea5e9;">Group</span>
      </span>
    `, 
    url:'20250921Clustering.html', 
    min:dif1 
  },
  { 
    label: `
      <span class="btn-icon" style="background-color:#7D2514;"></span>
      <span class="btn-text">
        <span class="btn-subtitle">Covariances</span>
        <span class="btn-title" style="color:#7D2514;">MultiPlot</span>
      </span>
    `, 
    url:'20250921matrix plot.html', 
    min:dif1 
  },
  { 
    label: `
      🟢
      <span class="btn-text">
        <span class="btn-subtitle">Reduce</span>
        <span class="btn-title" style="color:green;">PCA</span>
      </span>
    `, 
    url:'APC.html', 
    min:dif1 
  },
  { 
    label: `
      🔴
      <span class="btn-text">
        <span class="btn-subtitle">Blend</span>
        <span class="btn-title" style="color:#A52A2A;">Mixing</span>
      </span>
    `, 
    url:'Mixing.html', 
    min:dif1 
  },
  { 
    label: `
      🟡
      <span class="btn-text">
        <span class="btn-subtitle">Screen</span>
        <span class="btn-title" style="color:#DAA520;">Plackett</span>
      </span>
    `, 
    url:'Plackett.html', 
    min:dif1 
  },
  { 
    label: `
      <span class="btn-icon" style="background-color:blue;"></span>
      <span class="btn-text">
        <span class="btn-subtitle">Smart Design</span>
        <span class="btn-title" style="color:blue;">DoE</span>
      </span>
    `, 
    url:'DoE.html', 
    min:dif1 
  }
];

  // création des boutons
  links.forEach(({label, url, min}) => {
    const a = document.createElement('a');
    a.innerHTML = label;

    if (centieme < min) {
      a.href = url;
      a.addEventListener('click', e => { e.preventDefault(); window.location.href=url; });
    } else {
      
      // bouton "virtuel" (essai expiré)
      a.href = '#';
      a.classList.add('disabled');
      a.addEventListener('click', e => {
        e.preventDefault();
        alert('Your trial period has expired. Please contact us to discuss how you can regain full access.');
        window.location.href = "https://payhip.com/SciencExpert/contact";
      });
    }
    container.appendChild(a);
  });

  console.log({V1:dif0,V2:dif,dif1,centieme});
});