// =====================================================================
// ===================  CONFIGURATION CENTRALE  ======================
// =====================================================================
// C'EST ICI, ET UNIQUEMENT ICI, QU'ON AJOUTE UNE LANGUE OU UN CHAPITRE.
// Tout le reste (menus, traductions, chargement des fichiers) est
// généré automatiquement à partir de ces deux tableaux.
// =====================================================================

// ---------------------------------------------------------------------
// LANGUES DISPONIBLES
// Pour ajouter une langue (ex. l'allemand) :
//   1. Ajoutez un objet ci-dessous avec son "code" (ex. 'de') et ses
//      traductions d'interface.
//   2. Pour CHAQUE chapitre existant, ajoutez les fichiers de contenu
//      correspondants en respectant la convention de nommage :
//        - Sous-titres : SUBTITLES_DE_CH1, SUBTITLES_DE_CH2, ...
//        - Images de diapo : NomDeBase-DE.JPG
//        - Son : Chapter1-son-DE.mp3, Chapter2-son-DE.mp3, ...
// C'est tout : les radios, les traductions et le chargement des
// sous-titres se mettent à jour tout seuls.
// ---------------------------------------------------------------------
const LANGUAGES = [
    {
        code: 'fr',
        label: 'Français',
        ui: {
            chapter: "Chapitre", play: "Lecture", pause: "Pause",
            subtitles: "Sous-titres", none: "Aucun",
            accessibility: "Accessibilité", transcript: "Transcription",
            fullTranscript: "Transcription complète",
            subtitleSize: "Taille des sous-titres", small: "DYS",
            normal: "Normale", large: "Zoom Visuel",
            contrast: "Contraste", high: "Élevé",
            playbackSpeed: "Vitesse de lecture",
            mute: "Couper le son", unmute: "Rétablir le son",
            nextChapter: "Prochain chapitre"
        }
    },
    {
        code: 'en',
        label: 'English',
        ui: {
            chapter: "Chapter", play: "Play", pause: "Pause",
            subtitles: "Subtitles", none: "None",
            accessibility: "Accessibility", transcript: "Transcript",
            fullTranscript: "Full transcript",
            subtitleSize: "Subtitle size", small: "SpLD",
            normal: "Normal", large: "Visual Zoom",
            contrast: "Contrast", high: "High",
            playbackSpeed: "Playback speed",
            mute: "Mute", unmute: "Unmute",
            nextChapter: "Next chapter"
        }
    },
    {
        code: 'es',
        label: 'Español',
        ui: {
            chapter: "Capítulo", play: "Reproducir", pause: "Pausa",
            subtitles: "Subtítulos", none: "Ninguno",
            accessibility: "Accesibilidad", transcript: "Transcripción",
            fullTranscript: "Transcripción completa",
            subtitleSize: "Tamaño de los subtítulos", small: "DEA",
            normal: "Normal", large: "Zoom Visual",
            contrast: "Contraste", high: "Alto",
            playbackSpeed: "Velocidad de reproducción",
            mute: "Silenciar", unmute: "Activar sonido",
            nextChapter: "Próximo capítulo"
        }
    },
    {
        code: 'it',
        label: 'Italiano',
        ui: {
            chapter: "Capitolo", play: "Riproduci", pause: "Pausa",
            subtitles: "Sottotitoli", none: "Nessuno",
            accessibility: "Accessibilità", transcript: "Trascrizione",
            fullTranscript: "Trascrizione completa",
            subtitleSize: "Dimensione dei sottotitoli", small: "DSA",
            normal: "Normale", large: "Zoom Visivo",
            contrast: "Contrasto", high: "Alto",
            playbackSpeed: "Velocità di riproduzione",
            mute: "Disattiva audio", unmute: "Riattiva audio",
            nextChapter: "Prossimo capitolo"
        }
    },
    {
        code: 'de',
        label: 'Deutsch  (🔒 👉 Fr)',
        ui: {
            chapter: "Kapitel", play: "Wiedergabe", pause: "Pause",
            subtitles: "Untertitel", none: "Keine",
            accessibility: "Barrierefreiheit", transcript: "Transkript",
            fullTranscript: "Vollständiges Transkript",
            subtitleSize: "Untertitelgröße", small: "LRS",
            normal: "Normal", large: "Visueller Zoom",
            contrast: "Kontrast", high: "Hoch",
            playbackSpeed: "Wiedergabegeschwindigkeit",
            mute: "Ton ausschalten", unmute: "Ton einschalten",
            nextChapter: "Nächstes Kapitel"
        }
    },
    {
        code: 'pt',
        label: 'Português  (🔒 👉 Fr)',
        ui: {
            chapter: "Capítulo", play: "Reproduzir", pause: "Pausa",
            subtitles: "Legendas", none: "Nenhuma",
            accessibility: "Acessibilidade", transcript: "Transcrição",
            fullTranscript: "Transcrição completa",
            subtitleSize: "Tamanho das legendas", small: "Dificuldades de aprendizagem",
            normal: "Normal", large: "Zoom visual",
            contrast: "Contraste", high: "Elevado",
            playbackSpeed: "Velocidade de reprodução",
            mute: "Silenciar", unmute: "Ativar som",
            nextChapter: "Próximo capítulo"
        }
    },
    {
        code: 'nl',
        label: 'Nederlands  (🔒 👉 Fr)',
        ui: {
            chapter: "Hoofdstuk", play: "Afspelen", pause: "Pauze",
            subtitles: "Ondertitels", none: "Geen",
            accessibility: "Toegankelijkheid", transcript: "Transcriptie",
            fullTranscript: "Volledige transcriptie",
            subtitleSize: "Ondertitelgrootte", small: "Dyslexie",
            normal: "Normaal", large: "Visuele zoom",
            contrast: "Contrast", high: "Hoog",
            playbackSpeed: "Afspeelsnelheid",
            mute: "Geluid uitschakelen", unmute: "Geluid inschakelen",
            nextChapter: "Volgend hoofdstuk"
        }
    },
    {
        code: 'pl',
        label: 'Polski (🔒 👉 Fr)',
        ui: {
            chapter: "Rozdział", play: "Odtwórz", pause: "Pauza",
            subtitles: "Napisy", none: "Brak",
            accessibility: "Dostępność", transcript: "Transkrypt",
            fullTranscript: "Pełny transkrypt",
            subtitleSize: "Rozmiar napisów", small: "Dysleksja",
            normal: "Normalny", large: "Powiększenie",
            contrast: "Kontrast", high: "Wysoki",
            playbackSpeed: "Prędkość odtwarzania",
            mute: "Wycisz", unmute: "Włącz dźwięk",
            nextChapter: "Następny rozdział"
        }
    },
    {
        code: 'ru',
        label: 'Русский  (🔒 👉 Fr)',
        ui: {
            chapter: "Глава", play: "Воспроизвести", pause: "Пауза",
            subtitles: "Субтитры", none: "Нет",
            accessibility: "Доступность", transcript: "Транскрипт",
            fullTranscript: "Полный транскрипт",
            subtitleSize: "Размер субтитров", small: "Дислексия",
            normal: "Обычный", large: "Визуальное увеличение",
            contrast: "Контраст", high: "Высокий",
            playbackSpeed: "Скорость воспроизведения",
            mute: "Отключить звук", unmute: "Включить звук",
            nextChapter: "Следующая глава"
        }
    },
    {
        code: 'zh',
        label: '中文  (🔒 👉 Fr)',
        ui: {
            chapter: "章节", play: "播放", pause: "暂停",
            subtitles: "字幕", none: "无",
            accessibility: "无障碍", transcript: "转录",
            fullTranscript: "完整转录",
            subtitleSize: "字幕大小", small: "阅读障碍",
            normal: "正常", large: "视觉放大",
            contrast: "对比度", high: "高",
            playbackSpeed: "播放速度",
            mute: "静音", unmute: "取消静音",
            nextChapter: "下一章"
        }
    },
    {
        code: 'ja',
        label: '日本語  (🔒 👉 Fr)',
        ui: {
            chapter: "チャプター", play: "再生", pause: "一時停止",
            subtitles: "字幕", none: "なし",
            accessibility: "アクセシビリティ", transcript: "文字起こし",
            fullTranscript: "完全な文字起こし",
            subtitleSize: "字幕サイズ", small: "読書障害",
            normal: "通常", large: "視覚ズーム",
            contrast: "コントラスト", high: "高",
            playbackSpeed: "再生速度",
            mute: "ミュート", unmute: "ミュート解除",
            nextChapter: "次のチャプター"
        }
    },
    {
        code: 'ar',
        label: 'العربية (🔒 👉 Fr)',
        ui: {
            chapter: "الفصل", play: "تشغيل", pause: "إيقاف مؤقت",
            subtitles: "الترجمة", none: "بدون",
            accessibility: "إمكانية الوصول", transcript: "النص",
            fullTranscript: "النص الكامل",
            subtitleSize: "حجم الترجمة", small: "عسر القراءة",
            normal: "عادي", large: "تكبير مرئي",
            contrast: "التباين", high: "مرتفع",
            playbackSpeed: "سرعة التشغيل",
            mute: "كتم الصوت", unmute: "إلغاء كتم الصوت",
            nextChapter: "الفصل التالي"
        }
    },
    {
        code: 'tr',
        label: 'Türkçe  (🔒 👉 Fr)',
        ui: {
            chapter: "Bölüm", play: "Oynat", pause: "Duraklat",
            subtitles: "Altyazılar", none: "Yok",
            accessibility: "Erişilebilirlik", transcript: "Transkript",
            fullTranscript: "Tam transkript",
            subtitleSize: "Altyazı boyutu", small: "Disleksi",
            normal: "Normal", large: "Görsel yakınlaştırma",
            contrast: "Kontrast", high: "Yüksek",
            playbackSpeed: "Oynatma hızı",
            mute: "Sesi kapat", unmute: "Sesi aç",
            nextChapter: "Sonraki bölüm"
        }
    },
    {
        code: 'ko',
        label: '한국어  (🔒 👉 Fr)',
        ui: {
            chapter: "챕터", play: "재생", pause: "일시정지",
            subtitles: "자막", none: "없음",
            accessibility: "접근성", transcript: "대본",
            fullTranscript: "전체 대본",
            subtitleSize: "자막 크기", small: "읽기 장애",
            normal: "보통", large: "시각 확대",
            contrast: "대비", high: "높음",
            playbackSpeed: "재생 속도",
            mute: "음소거", unmute: "음소거 해제",
            nextChapter: "다음 챕터"
        }
    }
];


// Fonction utilitaire pour générer les labels
function generateChapterLabels() {

    CHAPTERS_CONFIG.forEach(chapter => {

        // ---------------------------------------------------------
        // Recherche du chapitre dans chapterTitles.js
        // ---------------------------------------------------------
        const titleConfig =
            (typeof CHAPTER_TITLES !== 'undefined')
                ? CHAPTER_TITLES.find(item => item.key === chapter.key)
                : null;

        chapter.label = {};

        LANGUAGES.forEach(lang => {

            const langCode = lang.code;

            // =====================================================
            // PRIORITÉ 1 : titre provenant de chapterTitles.js
            // =====================================================
            if (
                titleConfig &&
                titleConfig.label &&
                titleConfig.label[langCode]
            ) {
                chapter.label[langCode] =
                    titleConfig.label[langCode];

                return;
            }

            // =====================================================
            // PRIORITÉ 2 : fonctionnement actuel en BACKUP
            // =====================================================
            const translations = {
                fr: 'Chapitre',
                en: 'Chapter',
                es: 'Capítulo',
                it: 'Capitolo',
                de: 'Kapitel',
                pt: 'Capítulo',
                nl: 'Hoofdstuk',
                pl: 'Rozdział',
                ru: 'Глава',
                zh: '章节',
                ja: 'チャプター',
                ar: 'الفصل',
                tr: 'Bölüm',
                ko: '챕터'
            };

            const translated =
                translations[langCode] || chapter.baseLabel;

            chapter.label[langCode] =
                `${translated} ${chapter.num}`;
        });
    });
}
// Appelez cette fonction au démarrage
generateChapterLabels();


// =====================================================================
// ===================  FIN DE LA CONFIGURATION  =====================
// À partir d'ici, le code est générique : il ne devrait plus avoir
// besoin d'être modifié quand vous ajoutez une langue ou un chapitre.
// =====================================================================


// Textes d'interface qui ne dépendent pas de la langue par un tableau,
// juste id d'élément → clé de traduction. Un seul endroit à modifier si
// vous ajoutez un nouveau libellé d'interface statique.
const TEXT_BINDINGS = {
    chapterLabel: 'chapter',
    subtitleLabel: 'subtitles',
    accessibilityText: 'accessibility',
    transcriptText: 'transcript',
    subtitleSizeLabel: 'subtitleSize',
    smallSize: 'small',
    normalSize: 'normal',
    largeSize: 'large',
    contrastLabel: 'contrast',
    normalContrast: 'normal',
    highContrast: 'high',
    speedLabel: 'playbackSpeed',
    fullTranscript: 'fullTranscript'
};

// ===================================================================
// ÉLÉMENTS DOM
// ===================================================================
const videoSelect = document.getElementById('videoSelect');
const languageSelect = document.getElementById('languageSelect');
const audio = document.getElementById('audioPlayer');
const slideImage = document.getElementById('slideImage');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const playPauseText = document.getElementById('playPauseText');
const progressBar = document.getElementById('progressBar');
const progressFilled = document.getElementById('progressFilled');
const progressThumb = document.getElementById('progressThumb');
const chapterMarkers = document.getElementById('chapterMarkers');
const progressTooltip = document.getElementById('progressTooltip');
let isDraggingProgress = false;
const timeDisplay = document.getElementById('timeDisplay');
const subtitleTrack = document.getElementById('subtitleTrack');
const subtitleText = document.getElementById('subtitleText');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const transcriptBtn = document.getElementById('transcriptBtn');
const transcriptPanel = document.getElementById('transcriptPanel');
const transcriptContent = document.getElementById('transcriptContent');
const subtitleSizeSelect = document.getElementById('subtitleSize');
const contrastSelect = document.getElementById('contrastMode');
const speedButtons = document.querySelectorAll('.speed-btn');
const centerPlayOverlay = document.getElementById('centerPlayOverlay');
const centerPlayIcon = document.getElementById('centerPlayIcon');
const muteToggleBtn = document.getElementById('muteToggleBtn');
const muteIcon = document.getElementById('muteIcon');
const menuToggleBtn = document.getElementById('menuToggleBtn');
const menuToggleText = document.getElementById('menuToggleText');
const menuLangBadge = document.getElementById('menuLangBadge');

// NOUVEAU : éléments de l'overlay de transition entre chapitres
const chapterTransitionOverlay = document.getElementById('chapterTransitionOverlay');
const chapterTransitionText = document.getElementById('chapterTransitionText');

// ===================================================================
// ÉTAT
// ===================================================================
let CHAPTERS = {};               // construit dynamiquement après chargement des fichiers
let currentChapter = CHAPTERS_CONFIG[0].key;
let currentSlides = [];
let currentSubtitles = [];
let currentLang = LANGUAGES[0].code;   // langue par défaut = la première du tableau
let isPlaying = false;
let currentSlideImageSrc = '';
let currentSlideBaseImage = ''; // chemin non localisé de la diapo actuelle (ex: "image/Chapter1/Diapositive1.jpg"), utilisé pour le repli si l'image manque

// NOUVEAU : identifiant du timer de transition automatique vers le
// chapitre suivant, pour pouvoir l'annuler si l'utilisateur intervient
// manuellement (changement de chapitre, etc.) pendant le décompte.
let chapterTransitionTimeout = null;

// ===================================================================
// HELPERS langue
// ===================================================================

// Ramène toute valeur de langue (y compris "none") vers un code de
// LANGUAGES valide, utilisé pour l'interface / le son / les images.
// Seule la sélection des sous-titres eux-mêmes respecte "none" tel quel.
function effectiveLang(lang) {
    const known = LANGUAGES.some(l => l.code === lang);
    return known ? lang : LANGUAGES[0].code;
}

function getUI(lang) {
    const found = LANGUAGES.find(l => l.code === effectiveLang(lang));
    return found ? found.ui : LANGUAGES[0].ui;
}

// ===================================================================
// PERSISTANCE DES PRÉFÉRENCES (localStorage)
// ===================================================================
// Mémorise langue des sous-titres, taille, contraste, vitesse et état
// muet, pour que l'étudiant retrouve son confort de lecture d'une
// visite à l'autre sans tout reconfigurer.
const SETTINGS_STORAGE_KEY = 'bridgePlayerSettings';

function loadSavedSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.warn('⚠️ Impossible de lire les préférences enregistrées :', e);
        return null;
    }
}

function saveSettings() {
    try {
        const settings = {
            lang: currentLang,
            subtitleSize: subtitleSizeSelect.value,
            contrast: contrastSelect.value,
            speed: audio.playbackRate,
            muted: audio.muted
        };
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.warn("⚠️ Impossible d'enregistrer les préférences :", e);
    }
}

// Applique les préférences sauvegardées (si présentes) avant le premier
// rendu de l'interface. Chaque valeur est vérifiée avant d'être utilisée,
// pour ne jamais planter si le fichier de préférences est corrompu ou
// périmé (ex. une langue qui n'existe plus dans LANGUAGES).
function applySavedSettings() {
    const saved = loadSavedSettings();
    if (!saved) return;

    if (saved.lang === 'none' || LANGUAGES.some(l => l.code === saved.lang)) {
        currentLang = saved.lang;
    }

    if (['small', 'normal', 'large'].includes(saved.subtitleSize)) {
        subtitleSizeSelect.value = saved.subtitleSize;
        subtitleText.className = `subtitle-text ${saved.subtitleSize}`;
    }

    if (['normal', 'high'].includes(saved.contrast)) {
        contrastSelect.value = saved.contrast;
        if (saved.contrast === 'high') subtitleText.classList.add('high-contrast');
    }

    if (typeof saved.speed === 'number' && saved.speed > 0) {
        audio.playbackRate = saved.speed;
        speedButtons.forEach(b => {
            b.classList.toggle('active', parseFloat(b.dataset.speed) === saved.speed);
        });
    }

    if (typeof saved.muted === 'boolean') {
        audio.muted = saved.muted;
    }
}

// ===================================================================
// CHARGEMENT DYNAMIQUE DES FICHIERS DE CHAPITRES
// ===================================================================
function loadScript(src) {
    return new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve(true);
        s.onerror = () => {
            console.warn(`⚠️ Fichier introuvable : ${src}`);
            resolve(false);
        };
        document.head.appendChild(s);
    });
}

async function loadAllChapterFiles() {
    const files = [];
    CHAPTERS_CONFIG.forEach(({ num }) => {
        files.push(`slide/slidesChapter${num}-slides.js`);
        files.push(`subtitle/subtitleChapter${num}-subtitles.js`);
    });
    await Promise.all(files.map(loadScript));
}

// Construit l'objet CHAPTERS à partir des variables globales définies
// par les fichiers chargés ci-dessus. Convention de nommage attendue :
//   - Diapositives : SLIDES_CH<numéro>            ex: SLIDES_CH1
//   - Sous-titres  : SUBTITLES_<CODE_LANGUE>_CH<numéro>  ex: SUBTITLES_FR_CH1
function buildChaptersData() {
    const chapters = {};
    CHAPTERS_CONFIG.forEach(({ key, num }) => {
        const slidesVarName = `SLIDES_CH${num}`;
        const subtitles = {};

        const defaultLangCode = LANGUAGES[0].code; // langue de repli = la première de LANGUAGES (FR par défaut)

        LANGUAGES.forEach(({ code }) => {
            const subVarName = `SUBTITLES_${code.toUpperCase()}_CH${num}`;
            let value = window[subVarName];

            if (!value) {
                const fallbackVarName = `SUBTITLES_${defaultLangCode.toUpperCase()}_CH${num}`;
                console.warn(`⚠️ Variable manquante : ${subVarName} (chapitre "${key}", langue "${code}") — repli sur "${defaultLangCode}"`);
                value = window[fallbackVarName] || [];
            }

            subtitles[code] = value;
        });

        if (!window[slidesVarName]) {
            console.warn(`⚠️ Variable manquante : ${slidesVarName} (chapitre "${key}")`);
        }

        chapters[key] = {
            slides: window[slidesVarName] || [],
            subtitles
        };
    });
    return chapters;
}
// ===================================================================
// GÉNÉRATION DYNAMIQUE DU MENU (Langue dans le bouton)
// ===================================================================
function updateInterfaceLanguage() {
    const t = getUI(currentLang);

    Object.entries(TEXT_BINDINGS).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el && t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    renderChapterOptions();
    renderLanguageSelect();
    updatePlayPauseButton();
    
    // Mettre à jour le badge de langue
    if (menuLangBadge) {
        menuLangBadge.textContent = currentLang.toUpperCase();
    }
}

// ===================================================================
// GÉNÉRATION DYNAMIQUE DU MENU (chapitres + langues)
// ===================================================================

function renderChapterOptions() {
    const lang = effectiveLang(currentLang);
    const previousValue = currentChapter;

    videoSelect.innerHTML = '';

    CHAPTERS_CONFIG.forEach(chapter => {
        const option = document.createElement('option');

        option.value = chapter.key;
        option.textContent =
            chapter.label[lang] ||
            chapter.label[LANGUAGES[0].code] ||
            chapter.key;

        videoSelect.appendChild(option);
    });

    if (CHAPTERS_CONFIG.some(chapter => chapter.key === previousValue)) {
        videoSelect.value = previousValue;
    }
}


function renderLanguageSelect() {
    const t = getUI(currentLang);

    languageSelect.innerHTML = '';

    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = t.none || 'Aucun';
    languageSelect.appendChild(noneOption);

    LANGUAGES.forEach(language => {
        const option = document.createElement('option');

        option.value = language.code;
        option.textContent = language.label;

        languageSelect.appendChild(option);
    });

    const languageExists = LANGUAGES.some(
        language => language.code === currentLang
    );

    languageSelect.value = languageExists
        ? currentLang
        : LANGUAGES[0].code;
}
// ===================================================================
// INTERFACE LINGUISTIQUE
// ===================================================================
function updateInterfaceLanguage() {
    const t = getUI(currentLang);

    Object.entries(TEXT_BINDINGS).forEach(([id, key]) => {
        const el = document.getElementById(id);

        if (el && t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    renderChapterOptions();
    renderLanguageSelect();
    updatePlayPauseButton();
    // Mettre à jour le badge de langue dans le bouton Menu
    if (menuLangBadge) {
        menuLangBadge.textContent = currentLang.toUpperCase();
    }
}

// ===================================================================
// FONCTIONS time line
// ===================================================================
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ===================================================================
// FONCTIONS Subtitles a charger
// ===================================================================
function loadTranscript(subtitles) {
    transcriptContent.innerHTML = '';
    subtitles.forEach(sub => {
        const entry = document.createElement('div');
        entry.className = 'transcript-entry';
        const plainText = sub.text.replace(/<[^>]*>/g, '');
        entry.innerHTML = `
            <div class="transcript-time">${formatTime(sub.start)} - ${formatTime(sub.end)}</div>
            <div class="transcript-text">${plainText}</div>
        `;
        entry.addEventListener('click', () => {
            audio.currentTime = sub.start;
            if (!isPlaying) {
                audio.play();
                updatePlayPauseButton();
            }
        });
        transcriptContent.appendChild(entry);
    });
}

// Affiche le sous-titre actif au temps courant
function updateSubtitles() {
    if (currentSubtitles.length === 0) {
        subtitleTrack.style.display = 'none';
        return;
    }

    const currentTime = audio.currentTime;
    const activeSub = currentSubtitles.find(sub =>
        currentTime >= sub.start && currentTime <= sub.end
    );

    if (activeSub) {
        subtitleText.innerHTML = activeSub.text;
        subtitleTrack.style.display = 'block';
    } else {
        subtitleTrack.style.display = 'none';
    }
}

// ===================================================================
// FONCTIONS Gestion des diapositives
// ===================================================================

function getLocalizedSlideImage(imagePath, lang) {
    const langCode = effectiveLang(lang).toUpperCase();
    const lastDot = imagePath.lastIndexOf('.');

    if (lastDot === -1) {
        return imagePath;
    }

    const baseName = imagePath.substring(0, lastDot);
    const extension = imagePath.substring(lastDot + 1);

    // Vérifie si l'image a déjà un code langue (ex: Bridge-FR.png)
    const lastDash = baseName.lastIndexOf('-');
    
    if (lastDash !== -1) {
        const suffix = baseName.substring(lastDash + 1);
        
        // Si c'est un code langue, on le remplace
        if (/^[A-Z]{2,3}$/.test(suffix)) {
            const baseWithoutLang = baseName.substring(0, lastDash);
            return `${baseWithoutLang}-${langCode}.${extension}`;
        }
    }

    // Pas de code langue → on l'ajoute
    return `${baseName}-${langCode}.${extension}`;
}




function updateSlideImage() {
    if (currentSlides.length === 0) return;

    const currentTime = audio.currentTime;
    const activeSlide = currentSlides.find(slide =>
        currentTime >= slide.start && currentTime <= slide.end
    );

    if (activeSlide) {
        const localizedImage = getLocalizedSlideImage(activeSlide.image, currentLang);
        
        // Stocke le chemin de base SANS la langue
        const lastDot = activeSlide.image.lastIndexOf('.');
        const baseName = activeSlide.image.substring(0, lastDot);
        const extension = activeSlide.image.substring(lastDot + 1);
        const lastDash = baseName.lastIndexOf('-');
        
        if (lastDash !== -1) {
            const suffix = baseName.substring(lastDash + 1);
            if (/^[A-Z]{2,3}$/.test(suffix)) {
                currentSlideBaseImage = `${baseName.substring(0, lastDash)}.${extension}`;
            } else {
                currentSlideBaseImage = activeSlide.image;
            }
        } else {
            currentSlideBaseImage = activeSlide.image;
        }
        
        if (localizedImage !== currentSlideImageSrc) {
            currentSlideImageSrc = localizedImage;
            slideImage.src = localizedImage;
        }
    }
}


// Chaîne de repli si l'image n'existe pas :
//   1. image dans la langue courante   (Diapo1-DE.jpg)
//   2. image dans la langue par défaut (Diapo1-FR.jpg)
//   3. image SANS suffixe de langue    (Diapo1.jpg)
slideImage.addEventListener('error', function () {
    const failedSrc = slideImage.getAttribute('src');
    if (!failedSrc || !currentSlideBaseImage) return;

    const defaultLang = LANGUAGES[0].code.toUpperCase();
    const dot = currentSlideBaseImage.lastIndexOf('.');
    if (dot === -1) return;
    const name = currentSlideBaseImage.substring(0, dot);
    const ext  = currentSlideBaseImage.substring(dot + 1);

    const frSrc    = `${name}-${defaultLang}.${ext}`;   // ex: Diapo1-FR.jpg
    const plainSrc = currentSlideBaseImage;             // ex: Diapo1.jpg

    let next = null;
    if (failedSrc !== frSrc && failedSrc !== plainSrc) next = frSrc;  // langue demandée -> FR
    else if (failedSrc === frSrc) next = plainSrc;                    // FR -> sans suffixe

    if (!next) {
        console.warn(`⚠️ Image introuvable : ${failedSrc}`);
        return;
    }
    console.warn(`⚠️ Repli sur : ${next}`);
    currentSlideImageSrc = next;
    slideImage.src = next;
});

// ===================================================================
// FONCTIONS du bouton Pause/Play
// ===================================================================
function updatePlayPauseButton() {
    const t = getUI(currentLang);
    if (audio.paused) {
        playPauseIcon.textContent = '▶';
        playPauseText.textContent = t.play;
        isPlaying = false;
    } else {
        playPauseIcon.textContent = '⏸';
        playPauseText.textContent = t.pause;
        isPlaying = true;
    }
}

// Icône affichée au centre de l'image (grand play/pause semi-transparent)
function updateCenterPlayIcon() {
    centerPlayIcon.textContent = audio.paused ? '▶' : '⏸';
    const t = getUI(currentLang);
    centerPlayOverlay.setAttribute('aria-label', audio.paused ? t.play : t.pause);
}

// Point d'entrée unique pour lecture/pause : bouton dédié, clic sur
// l'image, bouton central superposé et raccourci clavier passent tous
// par ici, pour rester synchronisés quelle que soit l'origine du clic.
function togglePlayPause() {
    if (audio.paused) audio.play();
    else audio.pause();
}

// Coupe/rétablit le son indépendamment de la lecture
function updateMuteButton() {
    muteIcon.textContent = audio.muted ? '🔇' : '🔊';
    const t = getUI(currentLang);
    muteToggleBtn.setAttribute('aria-label', audio.muted ? t.unmute : t.mute);
}

function toggleMute() {
    audio.muted = !audio.muted;
    updateMuteButton();
    saveSettings();
}

// ===================================================================
// FONCTIONS de la barre de progression
// ===================================================================
function updateProgressBar() {
    if (isNaN(audio.duration)) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    progressThumb.style.left = `${percent}%`;
    progressBar.setAttribute('aria-valuemax', Math.round(audio.duration));
    progressBar.setAttribute('aria-valuenow', Math.round(audio.currentTime));
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}


// ===================================================================
// REPÈRES de changement d'image + curseur + info-bulle
// ===================================================================
// Points de changement d'image : on ne garde une entrée de
// currentSlides que si son image est DIFFÉRENTE de la précédente
// (plusieurs entrées consécutives avec la même image = pas de repère).
let imageChangePoints = [];   // [{ time, image }]

function computeImageChangePoints() {
    imageChangePoints = [];
    let lastImage = null;
    currentSlides.forEach(slide => {
        const img = getLocalizedSlideImage(slide.image, currentLang);
        if (img !== lastImage) {
            imageChangePoints.push({ time: slide.start, image: img });
            lastImage = img;
        }
    });
}

function renderSlideMarkers() {
    chapterMarkers.innerHTML = '';
    computeImageChangePoints();
    if (!audio.duration || isNaN(audio.duration) || imageChangePoints.length < 2) return;

    imageChangePoints.forEach((pt, i) => {
        // Pas de repère pour la 1re image (début de la piste)
        if (i === 0 || pt.time <= 0 || pt.time >= audio.duration) return;
        const marker = document.createElement('div');
        marker.className = 'slide-marker';
        marker.style.left = `${(pt.time / audio.duration) * 100}%`;
        marker.dataset.time = pt.time;
        marker.dataset.index = i;
        chapterMarkers.appendChild(marker);
    });
}

function getSlideIndexAt(time) {
    let idx = 0;
    imageChangePoints.forEach((pt, i) => { if (time >= pt.time) idx = i; });
    return idx;
}

function getProgressPercent(e) {
    const rect = progressBar.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
}

function showProgressTooltip(e) {
    if (!audio.duration || isNaN(audio.duration)) return;
    const marker = e.target.closest ? e.target.closest('.slide-marker') : null;
    const percent = getProgressPercent(e);
    const time = marker ? parseFloat(marker.dataset.time) : percent * audio.duration;
    const idx = getSlideIndexAt(time);
    const left = marker ? (time / audio.duration) * 100 : percent * 100;

    progressTooltip.textContent = imageChangePoints.length
        ? `${idx + 1}/${imageChangePoints.length} · ${formatTime(time)}`
        : formatTime(time);
    progressTooltip.style.left = `${left}%`;
    progressTooltip.style.display = 'block';
}

function seekFromEvent(e) {
    if (!audio.duration || isNaN(audio.duration)) return;
    const marker = e.target.closest ? e.target.closest('.slide-marker') : null;
    // Clic sur un repère = saut exact au début de l'image
    audio.currentTime = (marker && !isDraggingProgress)
        ? parseFloat(marker.dataset.time)
        : getProgressPercent(e) * audio.duration;
    updateProgressBar();
}

// ===================================================================
// FONCTIONS du son (paroles en plusieurs langues)
// ===================================================================
function getSonUrl(chapter, lang) {
    const langCode = effectiveLang(lang).toUpperCase();
    return `son/${chapter}-son-${langCode}.mp3`;
}

// ===================================================================
// ENCHAÎNEMENT AUTOMATIQUE VERS LE CHAPITRE SUIVANT
// ===================================================================

// Renvoie la clé du chapitre suivant selon l'ordre de CHAPTERS_CONFIG,
// ou null si le chapitre donné est le dernier de la liste.
function getNextChapterKey(chapterKey) {
    const idx = CHAPTERS_CONFIG.findIndex(c => c.key === chapterKey);
    if (idx === -1 || idx === CHAPTERS_CONFIG.length - 1) return null;
    return CHAPTERS_CONFIG[idx + 1].key;
}

// Annule un enchaînement automatique en attente (ex. si l'utilisateur
// change manuellement de chapitre pendant le décompte de 6 secondes)
// et masque l'overlay du sablier.
function cancelChapterTransition() {
    if (chapterTransitionTimeout !== null) {
        clearTimeout(chapterTransitionTimeout);
        chapterTransitionTimeout = null;
    }
    if (chapterTransitionOverlay) {
        chapterTransitionOverlay.style.display = 'none';
    }
}

// Déclenchée à la fin de la lecture audio d'un chapitre. Si c'est le
// dernier chapitre, ne fait rien. Sinon, affiche le sablier avec le
// message "Prochain chapitre : <nom>" dans la langue courante, puis
// bascule automatiquement sur le chapitre suivant après 4 secondes.
function handleChapterEnded() {
    const nextKey = getNextChapterKey(currentChapter);

    // Dernier chapitre : on ne fait rien, comme demandé.
    if (!nextKey) return;

    const nextChapterConfig = CHAPTERS_CONFIG.find(c => c.key === nextKey);
    const lang = effectiveLang(currentLang);
    const t = getUI(currentLang);
    const nextLabel = (nextChapterConfig && nextChapterConfig.label[lang])
        || (nextChapterConfig && nextChapterConfig.label[LANGUAGES[0].code])
        || nextKey;

    if (chapterTransitionText) {
        const prefix = t.nextChapter || 'Prochain chapitre';
        chapterTransitionText.textContent = `${prefix} : ${nextLabel}`;
    }

    if (chapterTransitionOverlay) {
        chapterTransitionOverlay.style.display = 'flex';
    }

    chapterTransitionTimeout = setTimeout(() => {
        chapterTransitionTimeout = null;
        if (chapterTransitionOverlay) {
            chapterTransitionOverlay.style.display = 'none';
        }
        loadChapter(nextKey);
        videoSelect.value = nextKey;
        audio.play();
    }, 6000);
}

// ===================================================================
// FONCTIONS du telechargement du bon chapitre
// ===================================================================
function loadChapter(chapterKey) {
    // Toute demande explicite de chargement de chapitre (manuelle ou
    // automatique) annule un éventuel décompte de transition en cours.
    cancelChapterTransition();

    currentChapter = chapterKey;
    const chapter = CHAPTERS[chapterKey];

    audio.src = getSonUrl(chapterKey, currentLang);

    currentSlides = (chapter && chapter.slides) ? chapter.slides : [];

    currentSlideImageSrc = '';
    slideImage.removeAttribute('src'); // jamais src = '' : le navigateur rechargerait la page elle-même

    if (currentSlides.length > 0) {
        const localizedImage = getLocalizedSlideImage(currentSlides[0].image, currentLang);
        slideImage.src = localizedImage;
        currentSlideImageSrc = localizedImage;
    }

    const subs = chapter ? chapter.subtitles : null;
    if (subs && subs[currentLang]) {
        currentSubtitles = subs[currentLang];
        loadTranscript(currentSubtitles);
        updateSubtitles();
        console.log(`✅ Chapitre chargé: ${chapterKey} (${currentSubtitles.length} sous-titres, ${currentSlides.length} images)`);
    } else {
        currentSubtitles = [];
        transcriptContent.innerHTML = '';
        subtitleTrack.style.display = 'none';
    }

    chapterMarkers.innerHTML = '';
    audio.load();
    updatePlayPauseButton();
    updateProgressBar();
}

// ===================================================================
// Changement de langue (sous-titres + interface + son + diapo)
// ===================================================================
function onSubtitleLangChange(e) {
    currentLang = e.target.value;

    updateInterfaceLanguage();

    currentSlideImageSrc = '';
    updateSlideImage();

    const chapter = CHAPTERS[currentChapter];
    const subs = chapter ? chapter.subtitles : null;

    if (subs && subs[currentLang]) {
        currentSubtitles = subs[currentLang];
        loadTranscript(currentSubtitles);
        updateSubtitles();
    } else {
        currentSubtitles = [];
        transcriptContent.innerHTML = '';
        subtitleTrack.style.display = 'none';
    }

    const wasPlaying = !audio.paused;
    const currentTime = audio.currentTime;

    audio.src = getSonUrl(currentChapter, currentLang);
    audio.load();

    audio.addEventListener('loadedmetadata', function resumeAudio() {
        audio.currentTime = currentTime;
        if (wasPlaying) audio.play();
        audio.removeEventListener('loadedmetadata', resumeAudio);
    });

    updateCenterPlayIcon();
    updateMuteButton();
    saveSettings();
}

// ===================================================================
// Gestion du menu (afficher/masquer les panneaux)
// ===================================================================
function setupMenu() {
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const menuToggleText = document.getElementById('menuToggleText');
    const mainControls = document.getElementById('mainControls');






    menuToggleText.textContent = "Menu Off";

   // Initialiser le badge de langue
    if (menuLangBadge) {
        menuLangBadge.textContent = currentLang.toUpperCase();
    }

    function toggleDisplay(element, displayType = 'block') {
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = displayType;
            return true;
        } else {
            element.style.display = 'none';
            return false;
        }
    }

    menuToggleBtn.addEventListener('click', () => {
        const isOpened = toggleDisplay(mainControls, 'flex');
        if (isOpened) {
            menuToggleText.textContent = "Menu On";
        } else {
            menuToggleText.textContent = "Menu Off";
            settingsPanel.style.display = 'none';
            transcriptPanel.style.display = 'none';
            settingsBtn.classList.remove('active');
            transcriptBtn.classList.remove('active');
        }
    });

    settingsBtn.addEventListener('click', () => {
        toggleDisplay(settingsPanel, 'block');
        settingsBtn.classList.toggle('active');
        if (settingsPanel.style.display === 'block') {
            transcriptPanel.style.display = 'none';
            transcriptBtn.classList.remove('active');
        }
    });

    transcriptBtn.addEventListener('click', () => {
        toggleDisplay(transcriptPanel, 'block');
        transcriptBtn.classList.toggle('active');
        if (transcriptPanel.style.display === 'block') {
            settingsPanel.style.display = 'none';
            settingsBtn.classList.remove('active');
        }
    });
}

// ===================================================================
// AUTRES ÉVÉNEMENTS (lecture, timeline, réglages)
// ===================================================================
function setupPlayerEvents() {
    playPauseBtn.addEventListener('click', togglePlayPause);
    centerPlayOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
    });
    // Clic sur l'image elle-même = lecture/pause (en plus du bouton dédié
    // et du bouton central, pour un accès direct et intuitif)
    slideImage.addEventListener('click', togglePlayPause);

    muteToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMute();
    });

    // Les icônes restent synchronisées quelle que soit l'origine du
    // changement (bouton, image, clavier, fin de piste...)
    audio.addEventListener('play', () => {
        updatePlayPauseButton();
        updateCenterPlayIcon();
    });
    audio.addEventListener('pause', () => {
        updatePlayPauseButton();
        updateCenterPlayIcon();
    });

    audio.addEventListener('timeupdate', () => {
        updateProgressBar();
        updateSubtitles();
        updateSlideImage();
    });

    audio.addEventListener('loadedmetadata', () => {
        updateProgressBar();
        renderSlideMarkers();
    });

    // NOUVEAU : à la fin du chapitre, on lance (sauf si c'est le
    // dernier chapitre) le décompte de 4 secondes avant d'enchaîner
    // automatiquement sur le chapitre suivant.
    audio.addEventListener('ended', handleChapterEnded);

    // Si le fichier audio de la langue courante est introuvable, on retente
    // automatiquement avec la langue par défaut (la première de LANGUAGES),
    // en conservant la position de lecture et l'état pause/lecture.
    audio.addEventListener('error', () => {
        const defaultLangCode = LANGUAGES[0].code;
        const expectedFallbackSrc = getSonUrl(currentChapter, defaultLangCode);
        const failedSrc = audio.getAttribute('src') || '';

        if (!failedSrc || failedSrc === expectedFallbackSrc) {
            if (failedSrc) console.warn(`⚠️ Fichier audio introuvable même avec la langue par défaut : ${failedSrc}`);
            return;
        }

        console.warn(`⚠️ Fichier audio introuvable : ${failedSrc} — repli sur la langue par défaut (${defaultLangCode})`);

        const wasPlaying = !audio.paused;
        const currentTime = audio.currentTime;

        audio.src = expectedFallbackSrc;
        audio.load();

        audio.addEventListener('loadedmetadata', function resumeAudio() {
            audio.currentTime = currentTime;
            if (wasPlaying) audio.play();
            audio.removeEventListener('loadedmetadata', resumeAudio);
        }, { once: true });
    });

    // Barre de progression : clic, glisser du curseur, clic sur un repère
    progressBar.addEventListener('pointerdown', (e) => {
        // L'utilisateur reprend la main : on annule une transition auto.
        cancelChapterTransition();
        seekFromEvent(e);                       // saut exact si repère
        isDraggingProgress = true;
        progressBar.classList.add('dragging');
        progressBar.setPointerCapture(e.pointerId);
    });
    progressBar.addEventListener('pointermove', (e) => {
        showProgressTooltip(e);
        if (isDraggingProgress) seekFromEvent(e);
    });
    const endDrag = (e) => {
        isDraggingProgress = false;
        progressBar.classList.remove('dragging');
        if (progressBar.hasPointerCapture(e.pointerId)) {
            progressBar.releasePointerCapture(e.pointerId);
        }
    };
    progressBar.addEventListener('pointerup', endDrag);
    progressBar.addEventListener('pointercancel', endDrag);
    progressBar.addEventListener('pointerleave', () => {
        if (!isDraggingProgress) progressTooltip.style.display = 'none';
    });

    videoSelect.addEventListener('change', (e) => {
        loadChapter(e.target.value);
    });

    subtitleSizeSelect.addEventListener('change', (e) => {
        subtitleText.className = `subtitle-text ${e.target.value}`;
        if (contrastSelect.value === 'high') {
            subtitleText.classList.add('high-contrast');
        }
        saveSettings();
    });

    contrastSelect.addEventListener('change', (e) => {
        if (e.target.value === 'high') {
            subtitleText.classList.add('high-contrast');
        } else {
            subtitleText.classList.remove('high-contrast');
        }
        saveSettings();
    });

languageSelect.addEventListener(
    'change',
    onSubtitleLangChange
);

    speedButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = parseFloat(btn.dataset.speed);
            audio.playbackRate = speed;
            speedButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            saveSettings();
        });
    });
}

// ===================================================================
// NAVIGATION CLAVIER
// ===================================================================
// Espace : lecture/pause · Flèches ←/→ : reculer/avancer de 5s
// M : couper/rétablir le son
// Désactivé quand le focus est sur un champ natif (select, radio...)
// pour ne pas interférer avec leur propre navigation au clavier.
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(activeTag)) return;

        switch (e.key) {
            case ' ':
            case 'Spacebar':
                e.preventDefault(); // empêche le défilement de la page
                togglePlayPause();
                break;
            case 'ArrowRight':
                e.preventDefault();
                audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || audio.currentTime);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                audio.currentTime = Math.max(audio.currentTime - 5, 0);
                break;
            case 'm':
            case 'M':
                toggleMute();
                break;
            default:
                break; // toutes les autres touches gardent leur comportement normal
        }
    });
}

// ===================================================================
// INITIALISATION
// ===================================================================
document.addEventListener('DOMContentLoaded', async () => {
    setupMenu();

    // 1. Applique les préférences enregistrées lors d'une visite précédente
    //    (langue, taille, contraste, vitesse, muet) avant tout rendu.
    applySavedSettings();

    // 2. Charge dynamiquement les fichiers de tous les chapitres déclarés
    //    dans CHAPTERS_CONFIG (slides + sous-titres).
    await loadAllChapterFiles();

    // 3. Construit CHAPTERS à partir des variables globales chargées.
    CHAPTERS = buildChaptersData();

    // 4. Génère le menu (chapitres + langues), branche les événements
    //    et active les raccourcis clavier.
    setupPlayerEvents();
    setupKeyboardShortcuts();

    // 5. Charge le premier chapitre et affiche l'interface dans la
    //    langue par défaut (ou celle restaurée depuis localStorage).
    loadChapter(CHAPTERS_CONFIG[0].key);
    updateInterfaceLanguage();
    updateCenterPlayIcon();
    updateMuteButton();
});
