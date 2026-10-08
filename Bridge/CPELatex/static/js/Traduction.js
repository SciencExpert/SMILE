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
            subtitleSize: "Tamanho das legendas", small: "Dislexia",
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
            contrast: "التباين", high: "مرtفu",
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
        code: 'ca',
        label: 'Català  (🔒 👉 Fr)',
        ui: {
            chapter: "Capítol", play: "Reprodueix", pause: "Pausa",
            subtitles: "Subtítols", none: "Cap",
            accessibility: "Accessibilitat", transcript: "Transcripció",
            fullTranscript: "Transcripció completa",
            subtitleSize: "Mida dels subtítols", small: "Dislèxia",
            normal: "Normal", large: "Zoom visual",
            contrast: "Contrast", high: "Alt",
            playbackSpeed: "Velocitat de reproducció",
            mute: "Silencia", unmute: "Activa el so",
            nextChapter: "Capítol següent"
        }
    },
    {
        code: 'cs',
        label: 'Čeština  (🔒 👉 Fr)',
        ui: {
            chapter: "Kapitola", play: "Přehrát", pause: "Pozastavit",
            subtitles: "Titulky", none: "Žádné",
            accessibility: "Přístupnost", transcript: "Přepis",
            fullTranscript: "Úplný přepis",
            subtitleSize: "Velikost titulků", small: "Dyslexie",
            normal: "Normální", large: "Vizuální přiblížení",
            contrast: "Kontrast", high: "Vysoký",
            playbackSpeed: "Rychlost přehrávání",
            mute: "Ztlumit", unmute: "Zapnout zvuk",
            nextChapter: "Další kapitola"
        }
    },
    {
        code: 'cy',
        label: 'Cymraeg  (🔒 👉 Fr)',
        ui: {
            chapter: "Pennod", play: "Chwarae", pause: "Pause",
            subtitles: "Isdeitlau", none: "Dim un",
            accessibility: "Hygyrchedd", transcript: "Trawsgrifiad",
            fullTranscript: "Trawsgrifiad llawn",
            subtitleSize: "Maint yr isdeitlau", small: "Dyslexia",
            normal: "Arferol", large: "Chwyddo Gweledol",
contrast: "Cyfercontrast", high: "Uchel",
playbackSpeed: "Cyflymder chwarae",
mute: "Mudo", unmute: "Dad-fudo",
nextChapter: "Pennod nesaf"
}
},
{
code: 'da',
label: 'Dansk  (🔒 👉 Fr)',
ui: {
chapter: "Kapitel", play: "Afspil", pause: "Pause",
subtitles: "Undertekster", none: "Ingen",
accessibility: "Tilgængelighed", transcript: "Transskription",
fullTranscript: "Fulde transskription",
subtitleSize: "Undertekststørrelse", small: "Ordblind",
normal: "Normal", large: "Visuel zoom",
contrast: "Kontrast", high: "Høj",
playbackSpeed: "Afspilningshastighed",
mute: "Lyd fra", unmute: "Lyd til",
nextChapter: "Næste kapitel"
}
},
{
code: 'el',
label: 'Ελληνικά  (🔒 👉 Fr)',
ui: {
chapter: "Κεφάλαιο", play: "Αναπαραγωγή", pause: "Παύση",
subtitles: "Υπότιτλοι", none: "Κανένας",
accessibility: "Προσβασιμότητα", transcript: "Μεταγραφή",
fullTranscript: "Πλήρης μεταγραφή",
subtitleSize: "Μέγεθος υπότιτλων", small: "Δυσλεξία",
normal: "Κανονικό", large: "Οπτικό ζουμ",
contrast: "Αντίθεση", high: "Υψηλή",
playbackSpeed: "Ταχύτητα αναπαραγωγής",
mute: "Σίγαση", unmute: "Κατάργηση σίγασης",
nextChapter: "Επόμενο κεφάλαιο"
}
},
{
code: 'fa',
label: 'فارسی  (🔒 👉 Fr)',
ui: {
chapter: "فصل", play: "پخش", pause: "توقف",
subtitles: "زیرنویس", none: "هیچ‌کدام",
accessibility: "دسترسی‌پذیری", transcript: "رونویسی",
fullTranscript: "رونویسی کامل",
subtitleSize: "اندازه زیرنویس", small: "خوانش‌پریشی",
normal: "عادی", large: "بزرگنمایی دیداری",
contrast: "کنتراست", high: "بالا",
playbackSpeed: "سرعت پخش",
mute: "بی‌صدا", unmute: "با‌صدا",
nextChapter: "فصل بعدی"
}
},
{
code: 'fi',
label: 'Suomi  (🔒 👉 Fr)',
ui: {
chapter: "Luku", play: "Toista", pause: "Tauko",
subtitles: "Tekstitykset", none: "Ei mitään",
accessibility: "Saavutettavuus", transcript: "Tekstivastine",
fullTranscript: "Koko tekstitoteutus",
subtitleSize: "Tekstityksen koko", small: "Lukivaikeus",
normal: "Normaali", large: "Visuaalinen loitonnus",
contrast: "Kontrasti", high: "Korkea",
playbackSpeed: "Toistonopeus",
mute: "Mykistä", unmute: "Poista mykistys",
nextChapter: "Seuraava luku"
}
},
{
code: 'he',
label: 'עברית  (🔒 👉 Fr)',
ui: {
chapter: "פרק", play: "הפעל", pause: "השהה",
subtitles: "כתוביות", none: "ללא",
accessibility: "נגישות", transcript: "תמלול",
fullTranscript: "תמלול מלא",
subtitleSize: "גודל כתוביות", small: "דיסלקציה",
normal: "רגיל", large: "זום חזותי",
contrast: "ניגודיות", high: "גבוהה",
playbackSpeed: "מהירות הפעלה",
mute: "השתק", unmute: "בטל השתקה",
nextChapter: "הפרק הבא"
}
},
{
code: 'hi',
label: 'हिन्दी  (🔒 👉 Fr)',
ui: {
chapter: "अध्याय", play: "चलाएं", pause: "रोकें",
subtitles: "उपशीर्षक", none: "कोई नहीं",
accessibility: "सुलभता", transcript: "प्रतिलेख",
fullTranscript: "पूर्ण प्रतिलेख",
subtitleSize: "उपशीर्षक आकार", small: "डिस्लेक्सिया",
normal: "सामान्य", large: "दृश्य ज़ूम",
contrast: "विपर्यास", high: "उच्च",
playbackSpeed: "प्लेबैक गति",
mute: "म्यूट करें", unmute: "अनम्यूट करें",
nextChapter: "अगला अध्याय"
}
},
{
code: 'hu',
label: 'Magyar  (🔒 👉 Fr)',
ui: {
chapter: "Fejezet", play: "Lejátszás", pause: "Szünet",
subtitles: "Feliratok", none: "Nincs",
accessibility: "Akadálymentesítés", transcript: "Leirat",
fullTranscript: "Teljes leirat",
subtitleSize: "Felirat mérete", small: "Diszlexia",
normal: "Normál", large: "Vizuális zoom",
contrast: "Kontraszt", high: "Magas",
playbackSpeed: "Lejátszási sebesség",
mute: "Némítás", unmute: "Hang be",
nextChapter: "Következő fejezet"
}
},
{
code: 'id',
label: 'Bahasa Indonesia  (🔒 👉 Fr)',
ui: {
chapter: "Bab", play: "Putar", pause: "Jeda",
subtitles: "Subtitel", none: "Tidak ada",
accessibility: "Aksesibilitas", transcript: "Transkrip",
fullTranscript: "Transkrip Lengkap",
subtitleSize: "Ukuran subtitel", small: "Disleksia",
normal: "Normal", large: "Zoom Visual",
contrast: "Kontras", high: "Tinggi",
playbackSpeed: "Kecepatan putar",
mute: "Bisukan", unmute: "Aktifkan suara",
nextChapter: "Bab selanjutnya"
}
},
{
code: 'is',
label: 'Íslenska  (🔒 👉 Fr)',
ui: {
chapter: "Kafli", play: "Spila", pause: "Pása",
subtitles: "Textar", none: "Enginn",
accessibility: "Aðgengi", transcript: "Afrit",
fullTranscript: "Fullt afrit",
subtitleSize: "Textastærð", small: "Lesblindu",
normal: "Venjulegt", large: "Sjónrænt stækkað",
contrast: "Birtuskil", high: "Mikil",
playbackSpeed: "Afspilunarhraði",
mute: "Hljóð af", unmute: "Hljóð á",
nextChapter: "Næsti kafli"
}
},
{
code: 'ka',
label: 'ქართული  (🔒 👉 Fr)',
ui: {
chapter: "თავი", play: "გაშვება", pause: "პაუზა",
subtitles: "სუბტიტრები", none: "გარეშე",
accessibility: "ხელმისაწვდომობა", transcript: "ტრანსკრიპტი",
fullTranscript: "სრული ტრანსკრიპტი",
subtitleSize: "სუბტიტრების ზომა", small: "დისლექსია",
normal: "ნორმალური", large: "ვიზუალური ზუმი",
contrast: "კონტრასტი", high: "მაღალი",
playbackSpeed: "დაკვრის სიჩქარე",
mute: "ხმის გათიშვა", unmute: "ხმის ჩართვა",
nextChapter: "შემდეგი თავი"
}
},
{
code: 'kk',
label: 'Қазақша  (🔒 👉 Fr)',
ui: {
chapter: "Бөлім", play: "Ойнату", pause: "Кідіріс",
subtitles: "Субтитрлер", none: "Жоқ",
accessibility: "Қолжетімділік", transcript: "Транскрипт",
fullTranscript: "Толық транскрипт",
subtitleSize: "Субтитр өлшемі", small: "Дислексия",
normal: "Қалыпты", large: "Көзбен үлкейту",
contrast: "Контраст", high: "Жоғары",
playbackSpeed: "Ойнату жылдамдығы",
mute: "Дыбысты өшіру", unmute: "Дыбысты қосу",
nextChapter: "Келесі бөлім"
}
},
{
code: 'ko',
label: '한국어  (🔒 👉 Fr)',
ui: {
chapter: "챕터", play: "재생", pause: "일시정지",
subtitles: "자막", none: "없음",
accessibility: "접근성", transcript: "스크립트",
fullTranscript: "전체 스크립트",
subtitleSize: "자막 크기", small: "독서장애",
normal: "보통", large: "시각 확대",
contrast: "대비", high: "높음",
playbackSpeed: "재생 속도",
mute: "음소거", unmute: "음소거 해제",
nextChapter: "다음 챕터"
}
},
{
code: 'lb',
label: 'Lëtzebuergesch  (🔒 👉 Fr)',
ui: {
chapter: "Kapitel", play: "Ofspillen", pause: "Paus",
subtitles: "Ënnertitelen", none: "Keen",
accessibility: "Barrierefräiheet", transcript: "Transkript",
fullTranscript: "Vollstännegt Transkript",
subtitleSize: "Gréisst vun den Ënnertitelen", small: "Lies-Rechtschreif-Schwäch",
normal: "Normal", large: "Visuelle Zoom",
contrast: "Kontrast", high: "Héich",
playbackSpeed: "Ofspillvitess",
mute: "Toun aus", unmute: "Toun un",
nextChapter: "Nächst Kapitel"
}
},
{
code: 'lv',
label: 'Latviešu  (🔒 👉 Fr)',
ui: {
chapter: "Nodaļa", play: "Atskaņot", pause: "Pauze",
subtitles: "Subtitri", none: "Nav",
accessibility: "Pieejamība", transcript: "Transkripts",
fullTranscript: "Pilns transkripts",
subtitleSize: "Subtitru izmērs", small: "Disleksija",
normal: "Normāls", large: "Vizuālais tlumējums",
contrast: "Kontrasts", high: "Augsts",
playbackSpeed: "Atskaņošanas ātrums",
mute: "Izslēgt skaņu", unmute: "Ieslēgt skaņu",
nextChapter: "Nākamā nodaļa"
}
},
{
code: 'ml',
label: 'മലയാളം  (🔒 👉 Fr)',
ui: {
chapter: "അധ്യായം", play: "പ്ലേ ചെയ്യുക", pause: "താൽക്കാലികമായി നിർത്തുക",
subtitles: "ഉപശീർഷകങ്ങൾ", none: "ഒന്നുമില്ല",
accessibility: "ആക്സസിബിലിറ്റി", transcript: "ട്രാൻസ്ക്രിപ്റ്റ്",
fullTranscript: "പൂർണ്ണ ട്രാൻസ്ക്രിപ്റ്റ്",
subtitleSize: "ഉപശീർഷക വലുപ്പം", small: "ഡിസ്‌ലെക്‌സിയ",
normal: "സാധാരണ", large: "വിഷ്വൽ സൂം",
contrast: "കോൺട്രാസ്റ്റ്", high: "ഉയർന്നത്",
playbackSpeed: "പ്ലേബാക്ക് വേഗത",
mute: "ശബ്ദം നിശബ്ദമാക്കുക", unmute: "ശബ്ദം പുനഃസ്ഥാപിക്കുക",
nextChapter: "അടുത്ത അധ്യായം"
}
},
{
code: 'ne',
label: 'नेपाली  (🔒 👉 Fr)',
ui: {
chapter: "अध्याय", play: "बजाउनुहोस्", pause: "रोक्नुहोस्",
subtitles: "उपशीर्षकहरू", none: "केही छैन",
accessibility: "पहुँचयोग्यता", transcript: "ट्रान्सक्रिप्ट",
fullTranscript: "पूर्ण ट्रान्सक्रिप्ट",
subtitleSize: "उपशीर्षकको आकार", small: "डिस्लेक्सिया",
normal: "सामान्य", large: "भिजुअल जुम",
contrast: "कन्ट्रास्ट", high: "उच्च",
playbackSpeed: "प्लेब्याक गति",
mute: "म्युट गर्नुहोस्", unmute: "अनम्युट गर्नुहोस्",
nextChapter: "अर्को अध्याय"
}
},
{
code: 'no',
label: 'Norsk  (🔒 👉 Fr)',
ui: {
chapter: "Kapittel", play: "Spill av", pause: "Pause",
subtitles: "Undertekster", none: "Ingen",
accessibility: "Tilgjengelighet", transcript: "Transkripsjon",
fullTranscript: "Full transkripsjon",
subtitleSize: "Undertekststørrelse", small: "Dysleksi",
normal: "Normal", large: "Visuell zoom",
contrast: "Kontrast", high: "Høy",
playbackSpeed: "Avspillingshastighet",
mute: "Demp lyd", unmute: "Slå på lyd",
nextChapter: "Neste kapittel"
}
},
{
code: 'ro',
label: 'Română  (🔒 👉 Fr)',
ui: {
chapter: "Capitol", play: "Redare", pause: "Pauză",
subtitles: "Subtitrări", none: "Niciuna",
accessibility: "Accesibilitate", transcript: "Transcrierea",
fullTranscript: "Transcrierea completă",
subtitleSize: "Dimensiunea subtitrărilor", small: "Dislexie",
normal: "Normală", large: "Zoom vizual",
contrast: "Contrast", high: "Ridicat",
playbackSpeed: "Viteza de redare",
mute: "Fără sunet", unmute: "Activare sunet",
nextChapter: "Capitolul următor"
}
},
{
code: 'sk',
label: 'Slovenčina  (🔒 👉 Fr)',
ui: {
chapter: "Kapitola", play: "Prehrať", pause: "Pozastaviť",
subtitles: "Titulky", none: "Žiadne",
accessibility: "Prístupnosť", transcript: "Prepis",
fullTranscript: "Úplný prepis",
subtitleSize: "Veľkosť titulkov", small: "Dyslexia",
normal: "Normálne", large: "Vizuálne priblíženie",
contrast: "Kontrast", high: "Vysoký",
playbackSpeed: "Rýchlosť prehrávania",
mute: "Stlmiť", unmute: "Zapnúť zvuk",
nextChapter: "Nasledujúca kapitola"
}
},
{
code: 'sl',
label: 'Slovenščina  (🔒 👉 Fr)',
ui: {
chapter: "Poglavje", play: "Predvajaj", pause: "Premor",
subtitles: "Podnapisi", none: "Brez",
accessibility: "Dostopnost", transcript: "Prepis",
fullTranscript: "Celoten prepis",
subtitleSize: "Velikost podnapisov", small: "Disleksija",
normal: "Navadno", large: "Vizualna povečava",
contrast: "Kontrast", high: "Visok",
playbackSpeed: "Hitrost predvajanja",
mute: "Utíšaj", unmute: "Vklopi zvok",
nextChapter: "Naslednje poglavje"
}
},
{
code: 'sr',
label: 'Srpski  (🔒 👉 Fr)',
ui: {
chapter: "Поглавље", play: "Репродукуј", pause: "Пауза",
subtitles: "Титлови", none: "Без титлова",
accessibility: "Приступачност", transcript: "Транскрипт",
fullTranscript: "Цео транскрипт",
subtitleSize: "Величина титлова", small: "Дислексија",
normal: "Нормално", large: "Визуелно увеличавање",
contrast: "Контраст", high: "Висок",
playbackSpeed: "Брзина репродукције",
mute: "Пригуши звук", unmute: "Укључи звук",
nextChapter: "Следеће поглавље"
}
},
{
code: 'sv',
label: 'Svenska  (🔒 👉 Fr)',
ui: {
chapter: "Kapitel", play: "Spela upp", pause: "Pausa",
subtitles: "Undertexter", none: "Ingen",
accessibility: "Tillgänglighet", transcript: "Transkription",
fullTranscript: "Fullständig transkription",
subtitleSize: "Undertextstorlek", small: "Dyslexi",
normal: "Normal", large: "Visuell zoom",
contrast: "Kontrast", high: "Hög",
playbackSpeed: "Uppspelningshastighet",
mute: "Ljud av", unmute: "Ljud på",
nextChapter: "Nästa kapitel"
}
},
{
code: 'sw',
label: 'Kiswahili  (🔒 👉 Fr)',
ui: {
chapter: "Sura", play: "Cheza", pause: "Pumzika",
subtitles: "Manukuu", none: "Hakuna",
accessibility: "Ufikiaji", transcript: "Nukuu",
fullTranscript: "Nukuu kamili",
subtitleSize: "Ukubwa wa manukuu", small: "Changamoto ya kusoma",
normal: "Kawaida", large: "Ukuaji wa Kuona",
contrast: "Utofautishaji", high: "Juu",
playbackSpeed: "Kasi ya kucheza",
mute: "Zima sauti", unmute: "Washa sauti",
nextChapter: "Sura inayofuata"
}
},
{
code: 'te',
label: 'తెలుగు  (🔒 👉 Fr)',
ui: {
chapter: "అధ్యాయం", play: "ప్లే చేయండి", pause: "ఆపండి",
subtitles: "ఉపశీర్షికలు", none: "ఏదీ లేదు",
accessibility: "యాక్సెస్సిబిలిటీ", transcript: "ట్రాన్స్క్రిప్ట్",
fullTranscript: "పూర్తి ట్రాన్స్క్రిప్ట్",
subtitleSize: "ఉపశీర్షిక పరిమాణం", small: "డిస్లెక్సియా",
normal: "సాధారణ", large: "విజువల్ జూమ్",
contrast: "కాంట్రాస్ట్", high: "ఎక్కువ",
playbackSpeed: "ప్లేబ్యాక్ వేగం",
mute: "మ్యూట్ చేయండి", unmute: "అన్‌మ్యూట్ చేయండి",
nextChapter: "తదుపరి అధ్యాయం"
}
},
{
code: 'uk',
label: 'Українська  (🔒 👉 Fr)',
ui: {
chapter: "Глава", play: "Відтворити", pause: "Пауза",
subtitles: "Субтитри", none: "Немає",
accessibility: "Доступність", transcript: "Транскрипт",
fullTranscript: "Повний транскрипт",
subtitleSize: "Розмір субтитрів", small: "Дислексія",
normal: "Звичайний", large: "Візуальне збільшення",
contrast: "Контраст", high: "Високий",
playbackSpeed: "Швидкість відтворення",
mute: "Вимкнути звук", unmute: "Увімкнути звук",
nextChapter: "Наступна глава"
}
},
{
code: 'vi',
label: 'Tiếng Việt  (🔒 👉 Fr)',
ui: {
chapter: "Chương", play: "Phát", pause: "Tạm dừng",
subtitles: "Phụ đề", none: "Không có",
accessibility: "Hỗ trợ tiếp cận", transcript: "Bản ghi lời thoại",
fullTranscript: "Bản ghi đầy đủ",
subtitleSize: "Kích thước phụ đề", small: "Chứng khó đọc",
normal: "Bình thường", large: "Phóng to hình ảnh",
contrast: "Độ tương phản", high: "Cao",
playbackSpeed: "Tốc độ phát",
mute: "Tắt tiếng", unmute: "Bật tiếng",
nextChapter: "Chương tiếp theo"
}
}
]