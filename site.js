/* =====================================================================
   SOS StaySafe — shared behaviour for all seven pages
   1. Translations and language   2. Header, footer and navigation
   3. Hero video and animated illustrations   4. Embedded modules
   5. Ask SOS StaySafe (demonstration assistant)   6. Offline use   7. Start
   Each page defines window.STAYSAFE_PAGE before loading this file:
     { translations: { es: {...}, fr: {...}, ... }, titleKey, descKey, video, english }
   (english: English for text the page builds in script, which is not in the HTML)
   English is read from the page itself (data-i18n), so it is written once.
   A key missing from a language falls back to English and is marked lang="en".
   ===================================================================== */
(function () {
  'use strict';

  const PAGE = window.STAYSAFE_PAGE || {};
  const LANGUAGES = {
    en: { htmlLang: 'en', dir: 'ltr', ogLocale: 'en_GB' },
    es: { htmlLang: 'es', dir: 'ltr', ogLocale: 'es_ES' },
    fr: { htmlLang: 'fr', dir: 'ltr', ogLocale: 'fr_FR' },
    ar: { htmlLang: 'ar', dir: 'rtl', ogLocale: 'ar_AR' },
    pt: { htmlLang: 'pt-PT', dir: 'ltr', ogLocale: 'pt_PT' },
    ru: { htmlLang: 'ru', dir: 'ltr', ogLocale: 'ru_RU' }
  };
  const STORAGE_KEY = 'sos-staysafe-lang';     // the only thing the site stores (see the Privacy Policy)
  const SITE_NAME = 'SOS StaySafe';
  const SPEAKUP = 'https://soscvi.speakup.report/en-GB/databreach/home';

  /* ---------- 1. Translations and language ---------- */
  /* Navigation, footer and interface text shared by every page. Navigation and footer: approved WordPress
     translations. REVIEW: ui.*, chat.* and nav.fairness are drafts using official terminology (25 Nov 2026). */
  const SHARED = {
    "es": {
      "nav.home": "Inicio",
      "nav.rights": "Sus derechos",
      "nav.preventing": "Prevención de abusos",
      "nav.reporting": "Denuncia de malos tratos",
      "nav.cyber": "Ciberseguridad",
      "nav.report": "Reportar Preocupación",
      "nav.privacy": "Política de privacidad",
      "readMore": "Seguir leyendo",
      "footer.copyright": "Copyright",
      "footer.rights": "Todos los derechos reservados",
      "nav.fairness": "Equidad e integridad",
      "ui.skip": "Saltar al contenido principal",
      "ui.language": "Idioma",
      "ui.menu": "Menú",
      "ui.closeMenu": "Cerrar menú",
      "ui.mainNav": "Principal",
      "ui.footerNav": "Pie de página",
      "ui.newTab": "(se abre en una pestaña nueva)",
      "ui.pause": "Pausar animaciones",
      "ui.play": "Reproducir animaciones",
      "ui.intl": "Aldeas Infantiles SOS Internacional",
      "chat.open": "Pregunta a SOS StaySafe",
      "chat.demo": "Demostración: las respuestas proceden solo de este sitio web.",
      "chat.notice": "Soy un asistente automático, no una persona. No puedo recibir denuncias y no soy un servicio de emergencias. No escribas tu nombre ni otros datos personales.",
      "chat.close": "Cerrar",
      "chat.inputLabel": "Tu pregunta",
      "chat.placeholder": "Escribe tu pregunta…",
      "chat.send": "Enviar",
      "chat.suggest": "Puedes preguntar, por ejemplo:",
      "chat.loading": "Buscando una respuesta…",
      "chat.error": "Lo sentimos, el asistente no se ha podido cargar. Comprueba tu conexión a internet e inténtalo de nuevo. Puedes seguir leyendo toda la información de este sitio web.",
      "chat.readMore": "Más información:",
      "chat.speakup": "Comunicar una preocupación en SOS SpeakUp",
      "chat.englishOnly": "Por ahora, esta parte solo está disponible en inglés.",
      "chat.you": "Tú:",
      "ui.offline": "No tienes conexión. Las páginas que ya has abierto siguen funcionando. Para comunicar una preocupación en SOS SpeakUp necesitas internet.",
      "ui.install.title": "Usa SOS StaySafe en tu móvil",
      "ui.install.android": "Android: abre el menú del navegador (⋮) y elige «Instalar aplicación» o «Añadir a pantalla de inicio».",
      "ui.install.ios": "iPhone o iPad: en Safari, toca Compartir y luego «Añadir a pantalla de inicio».",
      "ui.install.offline": "Después, las páginas que hayas abierto funcionarán sin internet. Para comunicar una preocupación en SOS SpeakUp siempre necesitas internet."
    },
    "fr": {
      "nav.home": "Accueil",
      "nav.rights": "Vos droits",
      "nav.preventing": "Prévenir les abus",
      "nav.reporting": "Signaler un abus",
      "nav.cyber": "Sauvegarde cybernétique",
      "nav.report": "Signaler une préoccupation",
      "nav.privacy": "Politique de confidentialité",
      "readMore": "Lire la suite",
      "footer.copyright": "Copyright",
      "footer.rights": "Tous droits réservés",
      "nav.fairness": "Équité et intégrité",
      "ui.skip": "Aller au contenu principal",
      "ui.language": "Langue",
      "ui.menu": "Menu",
      "ui.closeMenu": "Fermer le menu",
      "ui.mainNav": "Principal",
      "ui.footerNav": "Pied de page",
      "ui.newTab": "(s’ouvre dans un nouvel onglet)",
      "ui.pause": "Mettre les animations en pause",
      "ui.play": "Lire les animations",
      "ui.intl": "SOS Villages d’Enfants International",
      "chat.open": "Demande à SOS StaySafe",
      "chat.demo": "Démonstration : les réponses proviennent uniquement de ce site.",
      "chat.notice": "Je suis un assistant automatique, pas une personne. Je ne peux pas recevoir de signalements et je ne suis pas un service d’urgence. N’écris pas ton nom ni d’autres informations personnelles.",
      "chat.close": "Fermer",
      "chat.inputLabel": "Ta question",
      "chat.placeholder": "Écris ta question…",
      "chat.send": "Envoyer",
      "chat.suggest": "Tu peux demander par exemple :",
      "chat.loading": "Je cherche une réponse…",
      "chat.error": "Désolé, l’assistant n’a pas pu se charger. Vérifie ta connexion internet et réessaie. Tu peux toujours lire toutes les informations de ce site.",
      "chat.readMore": "En savoir plus :",
      "chat.speakup": "Signaler une préoccupation sur SOS SpeakUp",
      "chat.englishOnly": "Pour l’instant, cette partie n’existe qu’en anglais.",
      "chat.you": "Toi :",
      "ui.offline": "Tu es hors ligne. Les pages que tu as déjà ouvertes fonctionnent toujours. Pour signaler une préoccupation sur SOS SpeakUp, il faut une connexion internet.",
      "ui.install.title": "Utilise SOS StaySafe sur ton téléphone",
      "ui.install.android": "Android : ouvre le menu du navigateur (⋮) et choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».",
      "ui.install.ios": "iPhone ou iPad : dans Safari, touche Partager, puis « Sur l’écran d’accueil ».",
      "ui.install.offline": "Les pages que tu as ouvertes fonctionneront ensuite sans internet. Pour signaler une préoccupation sur SOS SpeakUp, il faut toujours une connexion internet."
    },
    "ar": {
      "nav.home": "الرئيسية",
      "nav.rights": "حقوقك",
      "nav.preventing": "منع إساءة المعاملة",
      "nav.reporting": "الإبلاغ عن إساءة المعاملة",
      "nav.cyber": "الحماية السيبرانية",
      "nav.report": "الإبلاغ عن القلق",
      "nav.privacy": "سياسة الخصوصية",
      "readMore": "اقرأ أكثر",
      "footer.copyright": "حقوق النشر",
      "footer.rights": "جميع الحقوق محفوظة",
      "nav.fairness": "العدالة والنزاهة",
      "ui.skip": "انتقل إلى المحتوى الرئيسي",
      "ui.language": "اللغة",
      "ui.menu": "القائمة",
      "ui.closeMenu": "إغلاق القائمة",
      "ui.mainNav": "الرئيسية",
      "ui.footerNav": "تذييل الصفحة",
      "ui.newTab": "(يُفتح في علامة تبويب جديدة)",
      "ui.pause": "إيقاف الرسوم المتحركة مؤقتاً",
      "ui.play": "تشغيل الرسوم المتحركة",
      "ui.intl": "قرى الأطفال SOS الدولية",
      "chat.open": "اسأل SOS StaySafe",
      "chat.demo": "نسخة تجريبية: تأتي الإجابات من هذا الموقع فقط.",
      "chat.notice": "أنا مساعد آلي ولست شخصاً. لا يمكنني استلام البلاغات ولست خدمة طوارئ. من فضلك لا تكتب اسمك أو أي بيانات شخصية أخرى.",
      "chat.close": "إغلاق",
      "chat.inputLabel": "سؤالك",
      "chat.placeholder": "اكتب سؤالك…",
      "chat.send": "إرسال",
      "chat.suggest": "يمكنك أن تسأل مثلاً:",
      "chat.loading": "جارٍ البحث عن إجابة…",
      "chat.error": "عذراً، تعذّر تحميل المساعد. تحقّق من اتصالك بالإنترنت وحاول مرة أخرى. لا يزال بإمكانك قراءة جميع المعلومات على هذا الموقع.",
      "chat.readMore": "اقرأ المزيد:",
      "chat.speakup": "أبلغ عن مخاوفك عبر SOS SpeakUp",
      "chat.englishOnly": "هذا الجزء متاح باللغة الإنجليزية فقط حالياً.",
      "chat.you": "أنت:",
      "ui.offline": "أنت غير متصل بالإنترنت. لا تزال الصفحات التي فتحتها من قبل تعمل. الإبلاغ عن مخاوفك عبر SOS SpeakUp يحتاج إلى اتصال بالإنترنت.",
      "ui.install.title": "استخدم SOS StaySafe على هاتفك",
      "ui.install.android": "أندرويد: افتح قائمة المتصفح (⋮) واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».",
      "ui.install.ios": "آيفون أو آيباد: في Safari، اضغط على «مشاركة» ثم «إضافة إلى الشاشة الرئيسية».",
      "ui.install.offline": "بعد ذلك، تعمل الصفحات التي فتحتها دون اتصال بالإنترنت. أما الإبلاغ عن مخاوفك عبر SOS SpeakUp فيحتاج دائماً إلى اتصال بالإنترنت."
    },
    "pt": {
      "nav.home": "Início",
      "nav.rights": "Os seus direitos",
      "nav.preventing": "Prevenção de abusos",
      "nav.reporting": "Denúncia de abusos",
      "nav.cyber": "Proteção cibernética",
      "nav.report": "Relatar Preocupação",
      "nav.privacy": "Política de privacidade",
      "readMore": "Ler mais",
      "footer.copyright": "Copyright",
      "footer.rights": "Todos os direitos reservados",
      "nav.fairness": "Equidade e integridade",
      "ui.skip": "Saltar para o conteúdo principal",
      "ui.language": "Idioma",
      "ui.menu": "Menu",
      "ui.closeMenu": "Fechar menu",
      "ui.mainNav": "Principal",
      "ui.footerNav": "Rodapé",
      "ui.newTab": "(abre num novo separador)",
      "ui.pause": "Pausar animações",
      "ui.play": "Reproduzir animações",
      "ui.intl": "Aldeias de Crianças SOS Internacional",
      "chat.open": "Pergunta ao SOS StaySafe",
      "chat.demo": "Demonstração: as respostas vêm apenas deste sítio Web.",
      "chat.notice": "Sou um assistente automático, não uma pessoa. Não posso receber denúncias e não sou um serviço de emergência. Não escrevas o teu nome nem outros dados pessoais.",
      "chat.close": "Fechar",
      "chat.inputLabel": "A tua pergunta",
      "chat.placeholder": "Escreve a tua pergunta…",
      "chat.send": "Enviar",
      "chat.suggest": "Podes perguntar, por exemplo:",
      "chat.loading": "A procurar uma resposta…",
      "chat.error": "Lamentamos, mas não foi possível carregar o assistente. Verifica a tua ligação à Internet e tenta novamente. Podes continuar a ler toda a informação deste sítio Web.",
      "chat.readMore": "Saber mais:",
      "chat.speakup": "Comunicar uma preocupação no SOS SpeakUp",
      "chat.englishOnly": "Por enquanto, esta parte só está disponível em inglês.",
      "chat.you": "Tu:",
      "ui.offline": "Estás sem ligação à internet. As páginas que já abriste continuam a funcionar. Para comunicar uma preocupação no SOS SpeakUp precisas de internet.",
      "ui.install.title": "Usa o SOS StaySafe no teu telemóvel",
      "ui.install.android": "Android: abre o menu do navegador (⋮) e escolhe «Instalar aplicação» ou «Adicionar ao ecrã principal».",
      "ui.install.ios": "iPhone ou iPad: no Safari, toca em Partilhar e depois em «Adicionar ao ecrã principal».",
      "ui.install.offline": "Depois, as páginas que abriste funcionam sem internet. Para comunicar uma preocupação no SOS SpeakUp precisas sempre de internet."
    },
    "ru": {
      "nav.home": "Главная",
      "nav.rights": "Ваши права",
      "nav.preventing": "Предотвращение злоупотреблений",
      "nav.reporting": "Сообщение о злоупотреблениях",
      "nav.cyber": "Кибербезопасность",
      "nav.report": "Сообщить о проблеме",
      "nav.privacy": "Политика конфиденциальности",
      "readMore": "Читать далее",
      "footer.copyright": "Copyright",
      "footer.rights": "Все права защищены",
      "nav.fairness": "Справедливость и честность",
      "ui.skip": "Перейти к основному содержанию",
      "ui.language": "Язык",
      "ui.menu": "Меню",
      "ui.closeMenu": "Закрыть меню",
      "ui.mainNav": "Основное меню",
      "ui.footerNav": "Нижнее меню",
      "ui.newTab": "(открывается в новой вкладке)",
      "ui.pause": "Приостановить анимацию",
      "ui.play": "Воспроизвести анимацию",
      "ui.intl": "SOS Детские деревни Интернешнл",
      "chat.open": "Спросите SOS StaySafe",
      "chat.demo": "Демонстрационная версия: ответы берутся только с этого сайта.",
      "chat.notice": "Я автоматический помощник, а не человек. Я не принимаю сообщения о нарушениях и не являюсь экстренной службой. Пожалуйста, не пишите своё имя и другие личные данные.",
      "chat.close": "Закрыть",
      "chat.inputLabel": "Ваш вопрос",
      "chat.placeholder": "Введите свой вопрос…",
      "chat.send": "Отправить",
      "chat.suggest": "Например, можно спросить:",
      "chat.loading": "Ищу ответ…",
      "chat.error": "Извините, помощник не загрузился. Проверьте подключение к интернету и попробуйте ещё раз. Вся информация на сайте по-прежнему доступна.",
      "chat.readMore": "Подробнее:",
      "chat.speakup": "Сообщить о проблеме через SOS SpeakUp",
      "chat.englishOnly": "Пока эта часть доступна только на английском.",
      "chat.you": "Вы:",
      "ui.offline": "Нет подключения к интернету. Страницы, которые вы уже открывали, по-прежнему работают. Чтобы сообщить о проблеме через SOS SpeakUp, нужен интернет.",
      "ui.install.title": "SOS StaySafe на вашем телефоне",
      "ui.install.android": "Android: откройте меню браузера (⋮) и выберите «Установить приложение» или «Добавить на главный экран».",
      "ui.install.ios": "iPhone или iPad: в Safari нажмите «Поделиться», затем «На экран „Домой“».",
      "ui.install.offline": "После этого открытые вами страницы будут работать без интернета. Чтобы сообщить о проблеме через SOS SpeakUp, всегда нужен интернет."
    }
  };
  const ENGLISH = {                            // text that is not on the page until it is needed
    'ui.play': 'Play animations', 'ui.pause': 'Pause animations', 'ui.closeMenu': 'Close menu',
    'chat.open': 'Ask SOS StaySafe',
    'chat.demo': 'Demonstration: answers come only from this website.',
    'chat.notice': 'I’m an automated assistant, not a person. I can’t take reports and I’m not an emergency service. Please don’t type your name or other personal details.',
    'chat.close': 'Close', 'chat.inputLabel': 'Your question', 'chat.placeholder': 'Type your question…', 'chat.send': 'Send',
    'chat.suggest': 'Try asking:', 'chat.loading': 'Looking for an answer…',
    'chat.error': 'Sorry, the assistant could not load. Please check your internet connection and try again. You can still read all the information on this website.',
    'chat.readMore': 'Read more:', 'chat.speakup': 'Report a concern on SOS SpeakUp',
    'chat.englishOnly': 'This part is only available in English for now.', 'chat.you': 'You:',
    'ui.offline': 'You are offline. Pages you have opened before still work. Reporting a concern on SOS SpeakUp needs internet.'
  };
  Object.assign(ENGLISH, PAGE.english || {});   // a page's own script-built English text
  const listeners = [];
  let currentLang = 'en';

  function captureEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!(el.dataset.i18n in ENGLISH)) ENGLISH[el.dataset.i18n] = el.textContent.trim();
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      if (!(key in ENGLISH)) ENGLISH[key] = el.getAttribute(attr);
    });
  }

  /** Text for a key in a language; reports whether English had to be used instead. */
  function translate(key, lang) {
    lang = lang || currentLang;
    if (lang !== 'en') {
      const own = (PAGE.translations && PAGE.translations[lang] && PAGE.translations[lang][key]) || (SHARED[lang] && SHARED[lang][key]);
      if (own) return { text: own, fallback: false };
    }
    if (!(key in ENGLISH)) throw new Error('No English text for key: ' + key);
    return { text: ENGLISH[key], fallback: lang !== 'en' };
  }

  /** A translated template with {placeholders} filled in. */
  function fill(key, values) {
    return translate(key).text.replace(/\{(\w+)\}/g, function (_, name) { return values[name]; });
  }

  /** Mark English fallback text so screen readers pronounce it correctly. */
  function markFallback(el, fallback) {
    if (fallback) { el.lang = 'en'; el.dir = 'ltr'; }
    else { el.removeAttribute('lang'); el.removeAttribute('dir'); }
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const t = translate(el.dataset.i18n, lang);
      el.textContent = t.text;
      markFallback(el, t.fallback);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      el.setAttribute(attr, translate(key, lang).text);
    });
  }

  function applyDocumentLanguage(lang) {
    const root = document.documentElement;
    root.lang = LANGUAGES[lang].htmlLang;
    root.dir = LANGUAGES[lang].dir;
    root.dataset.lang = lang;
    document.title = translate(PAGE.titleKey, lang).text + ' | ' + SITE_NAME;
    document.querySelector('meta[name="description"]').setAttribute('content', translate(PAGE.descKey, lang).text);
    document.querySelector('meta[property="og:locale"]').setAttribute('content', LANGUAGES[lang].ogLocale);
  }

  function saveLanguage(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage blocked: the choice lasts for this page only */ }
  }

  /** Keep ?lang= in the address so the current view can be shared; English needs none. */
  function updateAddress(lang) {
    try {
      const url = new URL(location.href);
      if (lang === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    } catch (e) { /* some file:// contexts refuse; nothing else depends on it */ }
  }

  function setLanguage(lang) {
    if (!LANGUAGES[lang]) throw new Error('Unsupported language: ' + lang);
    currentLang = lang;
    applyTranslations(lang);
    applyDocumentLanguage(lang);
    document.getElementById('lang-select').value = lang;
    document.querySelectorAll('.footer-langs button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    saveLanguage(lang);
    updateAddress(lang);
    listeners.forEach(function (fn) { fn(lang); });
  }

  /* ---------- 2. Header, footer and navigation ---------- */
  function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navPanel = document.getElementById('nav-panel');
    function setMenu(open) {
      navToggle.setAttribute('aria-expanded', String(open));
      navPanel.classList.toggle('is-open', open);
      const t = translate(open ? 'ui.closeMenu' : 'ui.menu');
      navToggle.setAttribute('aria-label', t.text);
      markFallback(navToggle, t.fallback);
    }
    navToggle.addEventListener('click', function () { setMenu(navToggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); navToggle.focus(); }
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', function () { setMenu(false); });
    onLanguageChange(function () { setMenu(navToggle.getAttribute('aria-expanded') === 'true'); });
    document.getElementById('lang-select').addEventListener('change', function (e) { setLanguage(e.target.value); });
    document.querySelectorAll('.footer-langs button').forEach(function (btn) {
      btn.addEventListener('click', function () { setLanguage(btn.dataset.lang); });
    });
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  /* ---------- 3. Hero video and animated illustrations ---------- */
  function setupMotion() {
    const video = document.getElementById('hero-video');
    const toggle = document.getElementById('motion-toggle');
    if (!toggle) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = document.documentElement.classList.contains('save-data');
    let motionOn = !(reducedMotion.matches || saveData);

    function videoUrl() { return 'Videos/' + PAGE.video + '-' + currentLang + '.mp4'; }
    function playVideo() {
      if (!video) return;
      if (video.getAttribute('src') !== videoUrl()) video.setAttribute('src', videoUrl());
      const attempt = video.play();
      if (attempt) attempt.catch(function (err) { if (err.name === 'NotAllowedError') setMotion(false); });
    }
    function freezeGif(img) {
      if (img.hidden || !img.complete || !img.naturalWidth) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      canvas.setAttribute('aria-hidden', 'true');
      img.after(canvas);
      img.hidden = true;
    }
    function unfreezeGif(img) {
      if (!img.hidden) return;
      img.nextElementSibling.remove();
      img.hidden = false;
    }
    function updateLabel() {
      const t = translate(motionOn ? 'ui.pause' : 'ui.play');
      toggle.setAttribute('aria-label', t.text);
      toggle.setAttribute('aria-pressed', String(!motionOn));
      markFallback(toggle, t.fallback);
    }
    /** One control for all motion on the page: the hero video and the animated illustrations. */
    function setMotion(on) {
      motionOn = on;
      updateLabel();
      document.querySelectorAll('img.anim').forEach(on ? unfreezeGif : freezeGif);
      if (on) playVideo(); else if (video) video.pause();
    }
    if (video) {
      video.addEventListener('error', function () {
        console.warn('Video could not be loaded: ' + video.getAttribute('src') + '. Showing the still image instead.');
        video.removeAttribute('src');
        video.load();
      });
      /* Swap to the new language's video, but only once the video has been started. */
      onLanguageChange(function () {
        if (!video.getAttribute('src')) return;
        if (motionOn) playVideo(); else { video.pause(); video.removeAttribute('src'); video.load(); }
      });
      window.addEventListener('load', function () { if (motionOn) playVideo(); });
    }
    toggle.addEventListener('click', function () { setMotion(!motionOn); });
    reducedMotion.addEventListener('change', function (e) { if (e.matches) setMotion(false); });
    document.querySelectorAll('img.anim').forEach(function (img) {
      img.addEventListener('load', function () { if (!motionOn) freezeGif(img); });
    });
    onLanguageChange(updateLabel);
  }

  /* ---------- 4. Embedded modules (Genially) ---------- */
  /** Outline an embedded module while focus is inside it. Moving from one module straight into the next
      fires no event in this page, so the check repeats while focus is outside the page. */
  function setupEmbeds() {
    const frames = document.querySelectorAll('.embed-frame iframe');
    if (!frames.length) return;
    let timer = null;
    function mark() { frames.forEach(function (f) { f.parentElement.classList.toggle('has-focus', document.activeElement === f); }); }
    window.addEventListener('blur', function () { setTimeout(mark); clearInterval(timer); timer = setInterval(mark, 200); });
    window.addEventListener('focus', function () { clearInterval(timer); frames.forEach(function (f) { f.parentElement.classList.remove('has-focus'); }); });
  }

  /* ---------- 5. Ask SOS StaySafe ----------
     DEMONSTRATION MODE: answers come from assistant.json, which holds text already published on this
     website. Nothing typed here is stored or sent anywhere: the conversation exists only in this page
     and disappears when the page is closed. A live AI service needs the secure server described in
     CHATBOT.md before it can be switched on. */
  const Chat = (function () {
    let kb = null;
    let panel, log, input, launcher, suggestBox;

    function el(tag, attrs, text) {
      const node = document.createElement(tag);
      Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
      if (text != null) node.textContent = text;
      return node;
    }

    function build() {
      launcher = el('button', { type: 'button', class: 'chat-launcher', 'aria-expanded': 'false', 'aria-controls': 'chat-panel' });
      launcher.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M4 5h16v11H9l-5 4z"/></svg>';
      launcher.append(el('span', { 'data-i18n': 'chat.open' }, ENGLISH['chat.open']));

      panel = el('section', { class: 'chat-panel', id: 'chat-panel', role: 'dialog', 'aria-labelledby': 'chat-title', hidden: '' });
      const head = el('div', { class: 'chat-head' });
      const titles = el('div');
      titles.append(el('h2', { id: 'chat-title', 'data-i18n': 'chat.open' }, ENGLISH['chat.open']),
                    el('p', { class: 'chat-demo', 'data-i18n': 'chat.demo' }, ENGLISH['chat.demo']));
      const close = el('button', { type: 'button', class: 'chat-close', 'data-i18n-attr': 'aria-label:chat.close', 'aria-label': ENGLISH['chat.close'] });
      close.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      head.append(titles, close);

      const body = el('div', { class: 'chat-body' });
      body.append(el('p', { class: 'chat-notice', 'data-i18n': 'chat.notice' }, ENGLISH['chat.notice']));
      log = el('div', { class: 'chat-log', role: 'log', 'aria-live': 'polite' });
      suggestBox = el('div', { class: 'chat-suggest' });
      body.append(log, suggestBox);

      const form = el('form', { class: 'chat-form' });
      const label = el('label', { class: 'sr-only', for: 'chat-input', 'data-i18n': 'chat.inputLabel' }, ENGLISH['chat.inputLabel']);
      input = el('input', { id: 'chat-input', type: 'text', maxlength: '300', autocomplete: 'off', 'data-i18n-attr': 'placeholder:chat.placeholder', placeholder: ENGLISH['chat.placeholder'] });
      const send = el('button', { type: 'submit', class: 'btn btn-navy chat-send' });
      send.append(el('span', { 'data-i18n': 'chat.send' }, ENGLISH['chat.send']));
      form.append(label, input, send);
      panel.append(head, body, form);
      document.body.append(launcher, panel);

      launcher.addEventListener('click', function () { setOpen(panel.hidden); });
      close.addEventListener('click', function () { setOpen(false); });
      panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const q = input.value.trim();
        if (!q) return;
        input.value = '';
        ask(q);
      });
      onLanguageChange(function () { if (kb) renderSuggestions(); });
    }

    function setOpen(open) {
      panel.hidden = !open;
      launcher.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('chat-open', open);
      if (open) { load(); input.focus(); } else { launcher.focus(); }
    }

    function load() {
      if (kb || log.dataset.state === 'loading') return;
      log.dataset.state = 'loading';
      const waiting = say([{ text: translate('chat.loading').text }], 'bot is-status');
      fetch('assistant.json', { cache: 'no-cache' })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (data) {
          kb = data;
          waiting.remove();
          log.dataset.state = 'ready';
          say([{ text: msg('welcome') }], 'bot');
          renderSuggestions();
        })
        .catch(function (err) {
          console.warn('Assistant could not load: ' + err.message);
          waiting.remove();
          delete log.dataset.state;
          say([{ text: translate('chat.error').text }], 'bot is-error');
        });
    }

    function msg(name) { return kb.messages[name][currentLang]; }

    function renderSuggestions() {
      suggestBox.textContent = '';
      suggestBox.append(el('p', { class: 'chat-suggest-title' }, translate('chat.suggest').text));
      const list = el('div', { class: 'chat-chips' });
      msg('suggestions').forEach(function (q) {
        const b = el('button', { type: 'button', class: 'chat-chip' }, q);
        b.addEventListener('click', function () { ask(q); });
        list.append(b);
      });
      suggestBox.append(list);
    }

    /** Lower case, no accents or punctuation, Arabic letter variants unified. */
    function normalise(s) {
      return ' ' + s.toLowerCase().normalize('NFD').replace(/[̀-ًͯ-ٰٟ]/g, '')
        .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ё/g, 'е')
        .replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim() + ' ';
    }
    /** A keyword matches at the start of a word (Arabic: anywhere, because prefixes attach to words). */
    function matches(text, keyword) {
      const k = normalise(keyword).trim();
      return currentLang === 'ar' ? text.indexOf(k) > -1 : text.indexOf(' ' + k) > -1;
    }
    function anyMatch(text, list) { return list.some(function (k) { return matches(text, k); }); }

    function ask(question) {
      if (!kb) return;
      say([{ text: question }], 'user');
      const text = normalise(question);
      const parts = [];
      const links = [];
      if (/[\w.+-]+@[\w-]+\.\w+/.test(question) || /\d[\d\s()+-]{6,}\d/.test(question)) parts.push({ text: msg('personal') });
      if (anyMatch(text, kb.safety.emergency[currentLang]) || anyMatch(text, kb.safety.emergency.en)) {
        msg('emergency').forEach(function (t) { parts.push({ text: t }); });   // SpeakUp is not an emergency service
        return say(parts, 'bot is-safety');
      }
      if (anyMatch(text, kb.safety.disclosure[currentLang]) || anyMatch(text, kb.safety.disclosure.en)) {
        msg('disclosure').forEach(function (t) { parts.push({ text: t }); });
        links.push({ href: kb.speakup, label: translate('chat.speakup').text, external: true });
        return say(parts, 'bot is-safety', links);
      }
      let best = null, bestScore = 0;
      kb.entries.forEach(function (entry) {
        const score = entry.keywords[currentLang].concat(currentLang === 'en' ? [] : entry.keywords.en)
          .reduce(function (sum, k) { return matches(text, k) ? sum + normalise(k).trim().length : sum; }, 0);
        if (score > bestScore) { best = entry; bestScore = score; }
      });
      if (!best || bestScore < 4) {
        parts.push({ text: msg('fallback') });
        return say(parts, 'bot');
      }
      best.answer[currentLang].forEach(function (p) { parts.push(p); });
      links.push({ href: best.page, label: translate('chat.readMore').text + ' ' + translate(best.label).text });
      if (best.speakup) links.push({ href: kb.speakup, label: translate('chat.speakup').text, external: true });
      const box = say(parts, 'bot', links);
      box.dataset.entry = best.id;                 // which knowledge-base entry answered (for testing and review)
      return box;
    }

    /** Add a message to the conversation. Parts marked en are shown in English with a note. */
    function say(parts, who, links) {
      const box = el('div', { class: 'chat-msg ' + who });
      if (who === 'user') box.append(el('span', { class: 'sr-only' }, translate('chat.you').text + ' '));
      let english = false;
      parts.forEach(function (p) {
        const para = el('p', {}, p.text);
        if (p.en) { para.lang = 'en'; para.dir = 'ltr'; english = true; }
        box.append(para);
      });
      if (english) box.append(el('p', { class: 'chat-note' }, translate('chat.englishOnly').text));
      (links || []).forEach(function (l) {
        const a = el('a', { href: l.href, class: 'chat-link' + (l.external ? ' is-report' : '') }, l.label);
        if (l.external) {
          a.target = '_blank'; a.rel = 'noopener';
          a.append(el('span', { class: 'sr-only' }, ' ' + translate('ui.newTab').text));
        }
        box.append(a);
      });
      log.append(box);
      box.scrollIntoView({ block: 'nearest' });
      return box;
    }

    return { build: build };
  })();

  /* ---------- 6. Offline use ---------- */
  /* The service worker (sw.js) keeps the pages, styles, script, assistant answers and images on the device,
     never videos, SpeakUp or anything typed. It runs only on https (or localhost for testing). */
  function setupOffline() {
    const bar = document.createElement('p');
    bar.className = 'offline-bar';
    bar.setAttribute('role', 'status');
    bar.dataset.i18n = 'ui.offline';
    bar.textContent = ENGLISH['ui.offline'];
    bar.hidden = navigator.onLine;
    document.body.insertBefore(bar, document.querySelector('main'));
    window.addEventListener('offline', function () { bar.hidden = false; });
    window.addEventListener('online', function () { bar.hidden = true; });
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js'); });
    }
  }

  /* ---------- 7. Start ---------- */
  function onLanguageChange(fn) { listeners.push(fn); }

  window.StaySafe = {
    translate: function (key) { return translate(key); },
    fill: fill,
    markFallback: markFallback,
    onLanguageChange: onLanguageChange,
    get lang() { return currentLang; },
    get dir() { return LANGUAGES[currentLang].dir; }
  };

  document.addEventListener('DOMContentLoaded', function () {
    Chat.build();
    setupOffline();
    captureEnglish();
    setupNavigation();
    setupMotion();
    setupEmbeds();
    setLanguage(document.documentElement.dataset.lang || 'en');
  });
})();
