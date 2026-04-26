// src/scripts/i18n.js
// i18n Architecture for Jamea Platform

const dictionary = {
  lang_toggle: { en: 'عربي / English', ar: 'English / عربي' },
  start_learning: { en: 'Start Learning <i class="fas fa-rocket"></i>', ar: 'ابدأ التعلم <i class="fas fa-rocket"></i>' },
  student_code_placeholder: { en: 'Email or student code', ar: 'البريد الإلكتروني أو كود الطالب' },
  enter_student_code: { en: 'Sign in with Google, email, or student code to begin', ar: 'سجل الدخول بجوجل أو البريد أو كود الطالب للبدء' },

  choose_journey: { en: 'Choose Your Journey', ar: 'اختر رحلتك' },
  select_track: { en: 'Select a track to continue your learning', ar: 'اختر مسارًا لمتابعة التعلم' },

  arabic_language: { en: 'Arabic Language', ar: 'اللغة العربية' },
  arabic_desc: { en: 'Letters, Reading, and Grammar Rules', ar: 'الحروف، القراءة، والقواعد' },

  holy_quran: { en: 'Holy Quran', ar: 'القرآن الكريم' },
  quran_desc: { en: 'Reading, Memorization, and Tajweed', ar: 'التلاوة، الحفظ، والتجويد' },

  islamic_studies: { en: 'Islamic Studies', ar: 'الدراسات الإسلامية' },
  islamic_desc: { en: 'Aqeedah, Fiqh, Seerah, and Manners', ar: 'العقيدة، الفقه، السيرة، والآداب' },

  overall_progress: { en: 'Overall Progress', ar: 'التقدم العام' },
  phase_1_title: { en: '<i class="fas fa-rocket"></i> Phase 1: Learning to Read', ar: '<i class="fas fa-rocket"></i> المرحلة الأولى: تعلم القراءة' },
  node_alphabet: { en: 'Alphabet', ar: 'الحروف' },
  node_sukoon: { en: 'Sukoon', ar: 'السكون' },
  node_madd: { en: 'Madd', ar: 'المدود' },
  node_shadda: { en: 'Shadda', ar: 'الشدة' },
  node_tanween: { en: 'Tanween', ar: 'التنوين' },

  phase_2_title: { en: '<i class="fas fa-brain"></i> Phase 2: The Verb Lab', ar: '<i class="fas fa-brain"></i> المرحلة الثانية: مختبر الأفعال' },
  phase_2_desc: { en: 'Verbs, Pronouns, Tenses, and Sentences', ar: 'الأفعال، الضمائر، الأزمنة، وبناء الجمل' },

  phase_3_title: { en: '<i class="fas fa-lock"></i> Phase 3: Speaking & Structures', ar: '<i class="fas fa-lock"></i> المرحلة الثالثة: التحدث والتراكيب' },
  phase_3_desc: { en: 'Conversation and Common Idioms', ar: 'المحادثة والتعبيرات الشائعة' },
};

let currentLang = localStorage.getItem('jamea_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('jamea_lang', lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = dictionary[key] && dictionary[key][lang];
    if (!value) return;

    if (el.matches('input, textarea')) {
      el.setAttribute('placeholder', value);
    } else {
      el.innerHTML = value;
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const value = dictionary[key] && dictionary[key][lang];
    if (value) el.setAttribute('title', value.replace(/<[^>]*>/g, ''));
  });
}

window.toggleLanguage = function() {
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(newLang);
  if (typeof showToast === 'function') {
    showToast(newLang === 'ar' ? 'تم التبديل للعربية' : 'Switched to English', 1500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});
