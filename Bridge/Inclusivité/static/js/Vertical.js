/*==============================================================mode vertical */
(function() {
    const warning = document.getElementById('orientationWarning');
    
    function checkOrientation() {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const isSmallHeight = window.innerHeight < 450;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        
        if (isLandscape && isSmallHeight && isTouch) {
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