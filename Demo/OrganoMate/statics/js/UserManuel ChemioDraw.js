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

                    <h1>MolMate™ - Chemio Draw - User Manual</h1>
                    <button id="manualCloseBtn" class="manual-close">✖</button>
                </div>
</div>
                <strong>OrganoMate-Draw</strong> is an interactive chemiometric analysis and visualisation tool. It enables users to:<br>
<span style="font-size:0.8em">
&nbsp;&nbsp;✍🏻 Draw chemical structures in 2D - &nbsp;&nbsp📁 Import an existing molecule for slight modifications. - &nbsp;&nbsp💾 Export your design in  molecular files (MOL, SDF)<br>
&nbsp;&nbsp🔎 Search chemical information and fingerprints - &nbsp;&nbsp👀 Visualize molecules in 2D and 3D - &nbsp;&nbsp🔬 Explore molecular and atomic properties.
</span>
<h3 style="line-height:0em">Drawing & Search a Molecule:
<span style="font-size:0.8em">
Use the <strong>drawing tools</strong> to create a molecule with atoms, bonds, rings, charges ...</h3>
<span style="font-size:0.8em">
<strong>Press</strong> <span class="any-button" style="font-size:0.8em">🔎 Search</span> button to run the programme and search for your drawing among the one million compounds in the PubChem database.<br>
<strong> Click</strong> <span class="any-button" style="font-size:0.8em">♻️ Reset</span> button to clear the drawing area for a new trial.
</span>
</span>
<h3 style="line-height:0em">How to start ? </h3>
<span style="font-size:0.8em">
<strong> Click</strong> <span class="any-button" style="font-size:0.8em">♻️ Reset</span> to get a clear drawing area or 
<strong> Click</strong> <span class="add-button" style="font-size:0.8em">📁 MOL</span> to load an existing file to start with. 
</span>



<hr><h1>👋 Finger Print : chemical information & results </h1><hr>
<span style="font-size:0.8em">This view provides all the data necessary for unambiguous chemical identification from a PubChem database lookup. The view updates automatically when a new molecule is detected.<br>
⚠️ If the molecule does not exist in the PubChem database, the 2D/3D view and properties view cannot be displayed.</span>
<hr><h1 style="color:brown">👀 2D & 3D View : interactive visualization</h1><hr>
<span style="font-size:0.8em">This section allows interactive 3D visualizations of the molecule : <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <strong>2D Line</strong> (simple skeletal representation) // <strong>Ball & Stick</strong> (classic atomic spheres & bonds)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp <strong>Space‑Filling</strong> (Van der Waals surface) //<strong>Licorice</strong> (thick bonds representation)<br>
Molecule can be <strong>Rotated</strong> (click & drag) & <strong>Zoomed</strong> (mouse wheel). Standard CPK (Corey-Pauling-Koltun) colors legend is displayed for atom types.</span>
<hr><h1 style="color:red">🔬 Properties View : atomic property mapping</h1><hr>
<span style="font-size:0.8em">This advanced view displays the mapping of atomic and molecular properties onto the 3D structure. <strong>Fifteen properties</strong> can be highlighted at the atomic level: <br>
Atoms organisation - Van der Waals radius - Bond count) - Electronegativity - Polarizability - Partial charge - Effective electronegativity - Inductive effect 
- Hydrophobicity - Electrostatic potential (ESP) - Steric accessibility - Ionization energy (ALIE) 
- Fukui reactivity - Electron density (ρ).</span>














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