/*********************************************************************
 *  MANUAL MODAL SYSTEM – SciencExpert / MolMate 2025
 *  Plug-and-play modal (overlay + window + close + ESC + click-outside)
 *********************************************************************/

/* ==============================
      INITIALISATION DU MODAL
   ============================== */
document.addEventListener("DOMContentLoaded", () => {

    // Crée automatiquement le modal dans la page
    const modalHTML = `
        <div id="Manuel_User" class="manual-overlay" aria-hidden="true">
            <div class="manual-window" role="dialog" aria-modal="true">
                <div class="manual-header">
<div id="header" style="display: flex; align-items: center; justify-content: space-between; position: relative; width: 100%; margin: 0; padding: 0;">
<button class="btnPrint" style="width:150px; color:white;background-color:#FF0000"  generic="Manuel_User" data-title="MoleMate- Molecule Spectra - User Manual" onclick="PRINTbnt(event)">🖶 Print</button>


                    <h1>StateMate -Plackett–Burman User Manuel</h1>
                    <button id="manualCloseBtn" class="manual-close">✖</button>
                </div>
</div>

<b>StatMate&trade; Plackett–Burman plans</b> auto-initialises when the page loads. It analyzes the effects of factors on a response variable and provides visual results. It takes the data of each Factor <strong>[F]</strong> (each column) which can be added manually or uploaded.

<br>1️⃣ <b>Select the number of factors</b>. The tool supports from <b>3 up to 27</b> factors.

<br>2️⃣ Configure factors by setting <b>name</b> and  <b>low (–1)</b> & <b>high (+1)</b> levels in table.


<br>3️⃣ <b>Enter the response</b>. Each entry updates the Plackett–Burman design.  

<br>4️⃣ Click on <b>📊 Equations</b> to view effects and the resulting regression equation.


<br><br>


The final <b>📊 chart</b> displays values of the effects in <b>descending order</b> for quick identification. 
<br>🟩 Green & 🟥 Red bars for positive & negative effects. &nbsp;&nbsp;&nbsp;&nbsp;<b>Procedure :</b>


<p>Use the <b>Export 💾</b> or <b>Import 📂</b> buttons to save or to load experiments.
<br><br>For trial up to 7 factors, switch between and for added convenience, you can switch between the factor table and the DoE table by clicking the 'Show DoE tab' button when there are up to five variables.</p>




<p><span class="popup-toggle" onclick="toggleManualPopup()">📘 User Manual</span> and <span class="popup-toggle" title="Read MoleMate's ebook" onclick="window.open('statics/StatMate Ebook.html', '_blank')">
   📕 Ebook
      </span>accessed at any time.</p>

</div>

            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Ajout des événements après insertion
    const overlay = document.getElementById("Manuel_User");
    const closeBtn = document.getElementById("manualCloseBtn");

    if (!overlay) {
        console.error("❌ Modal Manuel_User introuvable après insertion");
        return;
    }

    console.log("✅ Modal Manuel_User initialisé avec succès");

    /* --- CLICK SUR BOUTON FERMER --- */
    closeBtn.addEventListener("click", () => {
        console.log("🔘 Bouton fermer cliqué");
        toggleManualPopup(false);
    });

    /* --- CLICK EN DEHORS DE LA FENÊTRE --- */
    overlay.addEventListener("click", e => {
        if (e.target === overlay) {
            console.log("🖱️ Clic en dehors du modal");
            toggleManualPopup(false);
        }
    });

    /* --- FERMETURE PAR ÉCHAP --- */
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && overlay.style.display === "flex") {
            console.log("⌨️ Touche Échap pressée");
            toggleManualPopup(false);
        }
    });

});


/* ==============================
       FONCTION TOGGLE MODAL
   ============================== */
function toggleManualPopup(forceState) {
    const overlay = document.getElementById("Manuel_User");
    
    if (!overlay) {
        console.error("❌ Manuel_User introuvable dans toggleManualPopup");
        return;
    }

    const isOpen = overlay.style.display === "flex";
    const shouldOpen = typeof forceState === "boolean" ? forceState : !isOpen;

    console.log(`📋 Toggle modal: ${isOpen ? 'ouvert' : 'fermé'} → ${shouldOpen ? 'ouvert' : 'fermé'}`);

    overlay.style.display = shouldOpen ? "flex" : "none";
    overlay.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    document.body.style.overflow = shouldOpen ? "hidden" : "";
}

/* ==============================
         STYLE AUTOMATIQUE
   ============================== */
const style = document.createElement("style");
style.innerHTML = `
.manual-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.manual-window {
    background: white;
    padding: 24px;
    border-radius: 12px;
    width: 60%;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.manual-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 12px;
    margin-bottom: 20px;
}

.manual-header h3 {
    margin: 0;
    font-size: 1.5em;
    color: #111827;
}

.manual-close {
    border: none;
    background: #ef4444;
    color: white;
    font-size: 20px;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}

.manual-close:hover {
    background: #dc2626;
}

.manual-content {
    line-height: 1.6;
    color: #374151;
}

.manual-content h4 {
    color: #0ea5e9;
    margin-top: 0;
    margin-bottom: 16px;
}

.manual-content h5 {
    color: #1f2937;
    margin-top: 20px;
    margin-bottom: 10px;
    border-left: 4px solid #0ea5e9;
    padding-left: 12px;
}

.manual-content ul {
    margin-left: 20px;
}

.manual-content li {
    margin-bottom: 8px;
}

.manual-content kbd {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 0.9em;
}
`;
document.head.appendChild(style);

// Rendre la fonction disponible globalement
window.toggleManualPopup = toggleManualPopup;

console.log("✅ SpectrumUserManuel.js chargé - fonction toggleManualPopup disponible");