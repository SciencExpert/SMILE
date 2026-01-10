:root {
  /* Couleurs principales */
  --primary-color: #85087A;
  --secondary-color: #EBA4E4;
  --accent-blue: #0076b6;
  --accent-orange: #FFA500;
  --accent-dark-red: #800000;
  --accent-light-green: #CCFFCC;
  --background-purple: #85087A;
  
  /* Couleurs neutres */
  --white: #ffffff;
  --light-gray: #f0f0f0;
  --border-gray: #e6e6e6;
  --text-dark: #111;
  --text-gray: #666;
  
  /* Espacements adaptatifs */
  --gap: clamp(8px, 2vw, 12px);
  --padding-sm: clamp(4px, 1vw, 5px);
  --padding-md: clamp(6px, 1.5vw, 8px);
  --padding-lg: clamp(10px, 2.5vw, 14px);
  --padding-xl: clamp(12px, 3vw, 16px);
  
  /* Dimensions */
  --panel-width: 44%;
  --border-radius: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  
  /* Ombres */
  --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 6px 18px rgba(18, 38, 63, 0.06);
  --shadow-heavy: 0 10px 40px rgba(0, 0, 0, 0.2);
  --shadow-inset-left: inset -10px 0 15px -10px rgba(0, 0, 0, 0.2);
  --shadow-inset-right: inset 10px 0 15px -10px rgba(0, 0, 0, 0.2);
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.3s ease;
}

/* ==================== RESET & BASE ==================== */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Inter, system-ui, Arial, sans-serif;
  color: var(--text-dark);
  background: var(--primary-color);
  overflow: hidden;
  box-sizing: border-box;
  font-size: clamp(14px, 1.5vw, 16px);
}

*, *::before, *::after {
  box-sizing: inherit;
}

/* ==================== LAYOUT ==================== */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  height: 100vh;
  height: 100dvh; /* Pour mobile avec barre d'adresse */
  padding: var(--padding-xl);
  overflow: hidden;
  position: relative;
  background-color: transparent;
}

.container::after { 
  content: "🚧 Prototype — For demonstration purposes only"; 
  position: absolute; 
  inset: 0; 
  display: grid; 
  place-items: center; 
  font: 800 clamp(1.5rem, 5vw, 3rem)/1.2 system-ui, sans-serif; 
  color: #000; 
  opacity: .07; 
  transform: rotate(-20deg); 
  pointer-events: none;
  text-align: center;
  padding: 1rem;
}

.panel {
  background: var(--white);
  border-radius: var(--border-radius-xl);
  padding: var(--padding-lg);
  box-shadow: var(--shadow-medium);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  overflow-y: auto;
  overflow-x: auto;
  max-height: 99%;
  -webkit-overflow-scrolling: touch; /* Défilement fluide sur iOS */
}

#leftPanel {
  box-shadow: var(--shadow-inset-left);
  margin-right: 0;
  padding-left: 10px;
  border-right: 1px solid #ccc;
}

#rightPanel {
  box-shadow: var(--shadow-inset-right);
  margin-left: 0;
  padding-left: 10px;
}

/* ==================== TYPOGRAPHY ==================== */
h1 {
  margin: 0;
  font-size: clamp(1.5em, 4vw, 2em);
  line-height: 1.2;
  color: var(--primary-color);
}

.h1 {
  margin: 0;
  font-size: clamp(0.9em, 2vw, 1em);
  line-height: 1.2;
  color: var(--primary-color);
}

/* ==================== TABLE STYLES ==================== */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: clamp(12px, 1.2vw, 14px);
  overflow-x: auto;
  display: block;
}

thead, tbody {
  display: table;
  width: 100%;
  table-layout: fixed;
}

th, td {
  border: 1px solid var(--border-gray);
  padding: clamp(4px, 1vw, 6px);
  text-align: center;
  min-width: 40px;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

th {
  background: var(--primary-color);
  color: var(--white);
  position: sticky;
  top: 0;
  z-index: 2;
  font-size: clamp(11px, 1.1vw, 13px);
}

/* ==================== FORM ELEMENTS ==================== */
input[type="number"], 
input[type="text"] {
  width: 100%;
  border: none;
  text-align: center;
  background: transparent;
  outline: none;
  font-size: clamp(12px, 1.2vw, 14px);
  padding: 2px;
  min-height: 24px;
}

input[type="file"] {
  display: none;
}

/* ==================== BUTTON SYSTEM ==================== */
button {
  border: none;
  cursor: pointer;
  font-family: inherit;
  border-radius: var(--border-radius);
  transition: all var(--transition-medium);
  font-size: clamp(13px, 1.3vw, 16px);
  min-height: 36px;
  touch-action: manipulation; /* Améliore le tactile */
}

/* Bouton de base par défaut */
button:not([class]) {
  background: #0b5fff;
  color: var(--white);
  padding: var(--padding-md) 10px;
}

button.secondary {
  background: var(--light-gray);
  color: var(--text-dark);
}

/* Boutons d'ajout */
.add-button {
  display: inline-block;
  background-color: var(--accent-blue);
  color: var(--white);
  border: none;
  padding: clamp(6px, 1.2vw, 8px) clamp(10px, 2vw, 14px);
  margin: 2px;
  font-size: clamp(13px, 1.3vw, 16px);
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  transition: background-color var(--transition-medium), transform var(--transition-fast);
  box-shadow: var(--shadow-light);
  line-height: normal;
  white-space: nowrap;
}

.add-button:hover,
.add-button:active {
  background-color: #005f90;
  transform: scale(1.05);
}

/* Boutons de suppression */
.remove-button {
  display: inline-block;
  background-color: var(--accent-orange);
  color: var(--accent-dark-red);
  border: none;
  padding: clamp(6px, 1.2vw, 8px) clamp(10px, 2vw, 14px);
  margin: 2px;
  font-size: clamp(13px, 1.3vw, 16px);
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  transition: background-color var(--transition-medium), transform var(--transition-fast);
  box-shadow: var(--shadow-light);
  line-height: normal;
  white-space: nowrap;
}

.remove-button:hover,
.remove-button:active {
  background-color: var(--accent-dark-red);
  color: var(--white);
  transform: scale(1.05);
}

/* Boutons génériques et d'impression */
.any-button,
.btnPrint {
  display: inline-block;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  padding: clamp(6px, 1.2vw, 8px) clamp(10px, 2vw, 14px);
  margin: 2px;
  font-size: clamp(13px, 1.3vw, 16px);
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  transition: background-color var(--transition-medium), transform var(--transition-fast);
  box-shadow: var(--shadow-light);
  line-height: normal;
  white-space: nowrap;
}

.any-button:hover,
.any-button:active,
.btnPrint:hover,
.btnPrint:active {
  background-color: var(--accent-light-green);
  color: var(--text-dark);
  transform: scale(1.05);
}

/* Bouton de suppression dans les cellules */
.remove {
  position: absolute;
  top: 2px;
  right: 2px;
  background: transparent;
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: clamp(16px, 3vw, 18px);
  height: clamp(16px, 3vw, 18px);
  line-height: 1;
  font-size: clamp(10px, 2vw, 12px);
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Boutons petits */
.small {
  padding: clamp(4px, 1vw, 6px) clamp(6px, 1.5vw, 8px);
  font-size: clamp(11px, 1.1vw, 13px);
  min-height: 28px;
}

/* ==================== CONTROLS & TOOLBAR ==================== */
.controls {
  display: flex;
  gap: var(--padding-md);
  flex-wrap: wrap;
  margin-bottom: var(--padding-md);
  align-items: center;
}

.toolbar {
  display: flex;
  gap: var(--padding-md);
  align-items: center;
  flex-wrap: wrap;
}

/* ==================== MODAL SYSTEM ==================== */
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  width: min(90%, 900px);
  max-height: 85vh;
  max-height: 85dvh;
  overflow: auto;
  padding: var(--padding-xl);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
  z-index: 20;
  display: none;
}

.modal .close {
  float: right;
  background: #eee;
  color: var(--text-dark);
  min-width: 32px;
  min-height: 32px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: var(--white);
  z-index: 10;
  padding: var(--padding-md);
  margin-bottom: var(--padding-lg);
  border-bottom: 1px solid var(--border-gray);
  flex-wrap: wrap;
  gap: var(--gap);
}

/* ==================== POPUP SYSTEM ==================== */
.popupManuel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 60vh;
  max-height: 60dvh;
  width: min(90%, 600px);
  display: none;
  background: var(--white);
  border: 1px solid #ccc;
  padding: var(--padding-md);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  z-index: 999;
  overflow-y: auto;
  border-radius: var(--border-radius);
}

.popup-toggle {
  cursor: pointer;
  text-decoration: underline;
  color: var(--primary-color);
  font-size: clamp(13px, 1.3vw, 15px);
}

.popup-close {
  float: right;
  cursor: pointer;
  color: red;
  font-weight: bold;
  margin-left: 10px;
  font-size: clamp(16px, 2vw, 20px);
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ==================== RESULT BLOCKS ==================== */
.result-block {
  margin-bottom: var(--gap);
  padding: 10px;
  border-radius: 6px;
  background: #fbfbff;
  border-left: 4px solid var(--primary-color);
  font-size: clamp(13px, 1.3vw, 15px);
}

/* ==================== FOOTER ==================== */
footer {
  position: fixed;
  right: var(--gap);
  bottom: var(--gap);
  font-size: clamp(11px, 1.1vw, 13px);
}

/* ==================== RESPONSIVE DESIGN ==================== */

/* Tablettes en mode portrait et petits écrans */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    overflow-y: auto;
    overflow-x: hidden;
    gap: var(--gap);
  }
  
  .panel {
    max-height: none;
    min-height: 50vh;
  }
  
  #leftPanel,
  #rightPanel {
    box-shadow: var(--shadow-medium);
    margin: 0;
    border-right: none;
  }
  
  .container::after {
    font-size: clamp(1.2rem, 4vw, 2rem);
  }
}

/* Smartphones et petits écrans */
@media (max-width: 600px) {
  :root {
    --padding-xl: 8px;
    --gap: 8px;
    --border-radius-xl: 12px;
  }
  
  body {
    font-size: 14px;
  }
  
  .container {
    padding: var(--padding-md);
    gap: var(--padding-md);
  }
  
  .panel {
    padding: var(--padding-md);
    border-radius: var(--border-radius-lg);
  }
  
  .modal {
    width: 95%;
    padding: var(--padding-md);
    max-height: 90vh;
    max-height: 90dvh;
  }
  
  .toolbar,
  .controls {
    flex-direction: column;
    align-items: stretch;
    gap: var(--padding-sm);
  }
  
  .add-button,
  .remove-button,
  .any-button,
  .btnPrint {
    width: 100%;
    margin-bottom: var(--padding-sm);
    padding: 10px 12px;
    font-size: 14px;
  }
  
  table {
    font-size: 12px;
  }
  
  th, td {
    padding: 4px;
    min-width: 30px;
  }
  
  h1 {
    font-size: 1.5em;
  }
  
  .container::after {
    font-size: 1rem;
  }
}

/* Très petits écrans */
@media (max-width: 375px) {
  :root {
    --padding-xl: 6px;
    --gap: 6px;
  }
  
  .container {
    padding: 6px;
  }
  
  .panel {
    padding: 8px;
  }
  
  table {
    font-size: 11px;
  }
  
  th, td {
    padding: 3px;
    min-width: 25px;
  }
  
  button {
    font-size: 13px;
    min-height: 32px;
  }
}

/* Grands écrans */
@media (min-width: 1440px) {
  .container {
    max-width: 1920px;
    margin: 0 auto;
  }
}

/* Mode paysage pour smartphones */
@media (max-width: 900px) and (orientation: landscape) {
  .container {
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    overflow: hidden;
  }
  
  .panel {
    overflow-y: auto;
    max-height: calc(100vh - 2 * var(--padding-xl));
  }
}

/* ==================== UTILITY CLASSES ==================== */
.hidden {
  display: none !important;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-justify {
  text-align: justify;
}

.flex {
  display: flex;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-column {
  flex-direction: column;
}

.gap-sm {
  gap: var(--padding-sm);
}

.gap-md {
  gap: var(--padding-md);
}

.gap-lg {
  gap: var(--padding-lg);
}

/* ==================== PRINT STYLES ==================== */
@media print {
  body {
    background: var(--white);
    color: var(--text-dark);
  }
  
  .container {
    display: block;
    height: auto;
    overflow: visible;
    padding: 0;
  }
  
  .container::after {
    display: none;
  }
  
  .panel {
    box-shadow: none;
    page-break-inside: avoid;
    border-radius: 0;
    margin-bottom: 1cm;
  }
  
  button,
  .remove,
  .popup-toggle,
  footer {
    display: none !important;
  }
  
  table {
    page-break-inside: auto;
    font-size: 10pt;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  th {
    background: var(--primary-color) !important;
    color: var(--white) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  th, td {
    padding: 4pt;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles pour l'accessibilité */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid var(--accent-blue);
  outline-offset: 2px;
}

/* Augmentation de la zone tactile pour mobile */
@media (pointer: coarse) {
  button,
  .add-button,
  .remove-button,
  .any-button,
  .btnPrint {
    min-height: 44px;
    min-width: 44px;
  }
  
  .popup-close,
  .modal .close {
    min-width: 44px;
    min-height: 44px;
  }
  
  input[type="number"],
  input[type="text"] {
    min-height: 32px;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --border-gray: #000;
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.3);
    --shadow-medium: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
  
  th, td {
    border-color: #000;
    border-width: 2px;
  }
  
  button {
    border: 2px solid currentColor;
  }
}

/* Support pour les écrans ultra-larges */
@media (min-width: 2560px) {
  html {
    font-size: 18px;
  }
  
  .container {
    max-width: 2400px;
  }
}