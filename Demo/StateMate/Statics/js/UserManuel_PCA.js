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
<button class="btnPrint" style="width:150px; background-color:#FF0000"  generic="Manuel_User" data-title="MoleMate- Molecule Spectra - User Manual" onclick="PRINTbnt(event)">🖶 Print</button>


                    <h1>StateMate -PCA User Manuel</h1>
                    <button id="manualCloseBtn" class="manual-close">✖</button>
                </div>
</div>
 ❎&nbsp;&nbsp;This tool lets you perform Principal Component Analysis (PCA) interactively on your dataset, with immediate graphical results.
Each edit, import, or dynamically updates the PCA and plots! <br>


<span style="margin-left:5px"><b>➕ Add Col.</b>: Add a variable (column).</span>
<span style="margin-left:5px"><b>➖ Del. Col.</b>: Remove the last variable.</span><br>
<span style="margin-left:5px"><b>➕ Add Row</b>: Add an observation (row).</span>
<span style="margin-left:5px"><b>➖ Del. Row</b>: Remove the row.</span><br>
<span style="margin-left:5px"><b>💾 Export Data</b>: Download the table as a  js, csv,txt or xls file.</span>
<span style="margin-left:5px"><b>📂 Import Data</b>: Load a  js, csv,txt or xls file into the table.</span><br>


<center><b>When your data is ready:</b></center>

<span style="margin-left:5px"><b>🧮 PCA Calculate</b>: Run PCA on the table.</span><br>
<span style="margin-left:5px"><b>☑️ Standardised</b>: Center and reduce each variable (recommended).</span><br>
<span style="margin-left:5px"><b>• Axe X / Axe Y</b>: Select which PCs to plot.</span><br>

<span style="margin-left:5px"><b>• Individuals plot</b>: Each dot is an observation on selected PCs.</span><br>
<span style="margin-left:5px"><b>• Correlation circle</b>: Visualizes how variables relate to PCs.</span><br>
<span style="margin-left:5px"><b>📊 Equations</b>: See PC formulas (loading coefficients).</span><br>
<span style="margin-left:5px"><b>📘 User Manual</b>: Display this help at any time.</span>

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