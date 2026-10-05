/*==============================================================mode horizontal */

(function() {
    const warning = document.getElementById('orientationWarning');
    
    function checkOrientation() {
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;
        const isSmallWidth = window.innerWidth < 500;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        if (isPortrait && isSmallWidth && isTouch) {
            warning.classList.add('show');
        } else {
            warning.classList.remove('show');
        }
    }
    
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    // Vérification initiale
    checkOrientation();
})();