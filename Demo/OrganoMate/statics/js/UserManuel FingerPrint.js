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

                    <h1>MolMate™ - Finger Print - User Manual</h1>
                    <button id="manualCloseBtn" class="manual-close">✖</button>
                </div>
</div>
                <div id="manualContent" class="manual-content">
                    <!-- Contenu chargé dynamiquement ou inséré manuellement -->
                    
<p><strong>MoleMate Finger-Print</strong> allows users to search, analyze, and collect data from the PubChem database.
It displays detailed molecular identification & hazard data, synomyms, physicochemical properties, 2D/3D structures, and downloadable resources.</p>
<h3><u>Searching for a Compound</u> : The application a detects the input type</h3>
<p><strong>Search by CID or Name or SMILES</strong> : Enter a PubChem CID (numeric) or compound name in the main input field and click <kbd>Enter</kbd> . The system validates the format before querying PubChem.<br>
<strong>Load MOL/SDFL file</strong> : Select a .mol or .sdf file from your computer and the application will extract the CID if present.</p>

<h3 style:"margin:0;padding:0;line-height:0.5em"><u>Displayed Information</u></h3>
<p>All data are retrieved directly from PubChem : <strong>CID</strong> - <strong>Common Name</strong> - <strong>IUPAC Name</strong>
<strong>CAS Numbers & RNCAS</strong><br>
<p> Known Physicochemical Properties are also displayed : <strong> Molecular Formula</strong> - <strong>Molecular Weight (g/mol)</strong>
<strong>Exact Mass</strong> - <strong>Lipophilicity (XLogP) </strong> - <strong>Topological Polar Surface Area </strong> -
<strong>Hydrogen Bond Donors / Acceptors</strong> - <strong>Rotatable Bond Count</strong> - <strong>Structural Complexity</strong> -
<strong>Electric Charge</strong></p>

<div style="font-size:1.5em;line-height:0.8em; color: var(--primary-color);" ><strong>🧬 Molecule : 2D View </strong><hr>
<span style="font-size:0.6em; color:black;">
💬 <strong>Molecule Name</strong>: Common or IUPAC name of the compound for identification.<br>
💬 <strong>SMILES</strong>: Text string encoding a molecular structure (atoms, bonds, rings).<br>
💬 <strong>CID</strong>: PubChem identifier for a molecule, used to fetch structure and properties.<br>
💬 <strong>MOL</strong>: Chemical format with molecule's 2D or 3D structure used for visualization & computational analysis.</span></div>
<hr>
<div style="font-size:1.5em;line-height:0.8em; color: var(--primary-color);" ><strong>🗂️ Data available on the right panel</strong><hr> 
<span style="font-size:0.6em; color:black;">
<strong>⚠️ Hazard</strong> Overview of available real spectroscopic data on the web (if any)<br>
<strong>🔀 Synonyms</strong> : Available synonyms from PubChem - Up to the first 100 synonyms are shown in the list<br>
<strong>🔬 Physical Data:</strong> Overview of available physical data existing on PubChem <br>
<strong>📈 Spectrum:</strong> Overview of available real spectroscopic data on the web (if any)<br>
<strong>🔗 Links:</strong>
🔗 PubChem	🕷️ ChemSpider	📚 CAS Common Chemistry	🧪 ChEMBL
🛒 Suppliers 🛒 Sigma-Aldrich	🛒 Fisher Scientific	🛒 TCI Chemicals	🛒 Alfa Aesar
⚠️ Safety & Regulatory ⚠️ European Chemicals Agency	🏥 ChemIDplus (NIH)	🛡️ EPA ToxCast
💊 Pharmaceutical & Drug Databases 💊 DrugBank	🧬 Human Metabolome Database	🔬 KEGG Compound
📚 Literature & Research 📚 Google Scholar	📰 PubMed	🔬 ScienceDirect	📙 PubChem Literature
📖 Wikipedia	🌐 Wikidata	📙 ChemicalBook	📙 Patents
<hr>
<div style="font-size:1.5em;line-height:0.8em; color: var(--primary-color);" ><strong>📘User manual</strong> and other interactive docs are available at any time.</div>
<hr>

















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