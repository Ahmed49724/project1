/* ════════════════════════════════════════════════════════════
   📄 database.js
   ════════════════════════════════════════════════════════════ */
   /* ============================================================
     CONSTANTS
  ============================================================ */
  const ARABIC_LETTERS = [
    'أ','ب','ت','ث','ج','ح','خ',
    'د','ذ','ر','ز','س','ش','ص',
    'ض','ط','ظ','ع','غ','ف','ق',
    'ك','ل','م','ن','هـ','و','ي'
  ];
  const LETTER_NAMES_EN = {
    'أ':'Alif', 'ب':'Ba',   'ت':'Ta',    'ث':'Tha',   'ج':'Jeem',
    'ح':'Ha',   'خ':'Kha',  'د':'Dal',   'ذ':'Thal',  'ر':'Ra',
    'ز':'Zay',  'س':'Seen', 'ش':'Sheen', 'ص':'Sad',   'ض':'Dad',
    'ط':'Ta',   'ظ':'Dha',  'ع':'Ain',   'غ':'Ghain', 'ف':'Fa',
    'ق':'Qaf',  'ك':'Kaf',  'ل':'Lam',   'م':'Meem',  'ن':'Noon',
    'هـ':'Ha',  'و':'Waw',  'ي':'Ya'
  };
  const RAFISA   = ['أ','إ','آ','ا','د','ذ','ر','ز','و','ؤ'];
  const UNLOCK_COST = 10;

  /* ============================================================
     CONNECTION RULES DATABASE
  ============================================================ */
  const CONNECTION_RULES = {
    'Broken Plate': {
      name: 'Broken Plate Rule',
      desc: 'This letter looks like a plate! When it joins another letter, the left side of the plate breaks so it can hold hands with the next letter.',
      icon: 'fa-utensils', color: '#3498db'
    },
    'Belly': {
      name: 'Belly Rule',
      desc: 'This letter has a big belly hanging below the line. When it joins another letter, it loses its belly to walk straight on the line!',
      icon: 'fa-child', color: '#e67e22'
    },
    'DoorZ': {
      name: 'The DoorZ Rule (Stubborn Letters)',
      desc: 'This is a stubborn letter! It only holds hands with the letter before it, but closes the door on the letter after it (never connects to the left).',
      icon: 'fa-door-closed', color: '#e74c3c'
    },
    'Transformer': {
      name: 'Transformers Rule',
      desc: 'This letter is a master of disguise! It completely transforms and changes its shape depending on where it stands in the word.',
      icon: 'fa-robot', color: '#9b59b6'
    },
    'Friendly': {
      name: 'Friendly Letter',
      desc: 'This letter is simple and friendly. It connects to both sides while keeping its main shape sitting nicely on the line.',
      icon: 'fa-handshake', color: '#2ecc71'
    }
  };

  function getLetterRule(letter) {
    const doorz = ['أ', 'د', 'ذ', 'ر', 'ز', 'و'];
    const belly = ['ج', 'ح', 'خ', 'س', 'ش', 'ص', 'ض', 'ع', 'غ', 'ق', 'ل', 'م'];
    const plate = ['ب', 'ت', 'ث', 'ف', 'ن', 'ي'];
    const transformers = ['ك', 'هـ'];
    if (doorz.includes(letter)) return CONNECTION_RULES['DoorZ'];
    if (belly.includes(letter)) return CONNECTION_RULES['Belly'];
    if (plate.includes(letter)) return CONNECTION_RULES['Broken Plate'];
    if (transformers.includes(letter)) return CONNECTION_RULES['Transformer'];
    return CONNECTION_RULES['Friendly'];
  }


  /* ============================================================
     QURAN VERSES
  ============================================================ */
  const QURAN_VERSES = {
    'أ': "﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ﴾",
    'ب': "﴿ تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ ﴾",
    'ت': "﴿ وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ ۝ وَهَٰذَا الْبَلَدِ الْأَمِينِ ۝ لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ ﴾",
    'ث': "﴿ أَلْهَاكُمُ التَّكَاثُرُ ۝ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ ۝ كَلَّا سَوْفَ تَعْلَمُونَ ۝ ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ ﴾",
    'ج': "﴿ إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ﴾",
    'ح': "﴿ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴾",
    'خ': "﴿ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴾",
    'د': "﴿ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴾",
    'ذ': "﴿ إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ۝ وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا ۝ يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا ﴾",
    'ر': "﴿ إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ﴾",
    'ز': "﴿ وَالذَّارِيَاتِ ذَرْوًا ۝ فَالْحَامِلَاتِ وِقْرًا ۝ فَالْجَارِيَاتِ يُسْرًا ۝ فَالْمُقَسِّمَاتِ أَمْرًا ﴾",
    'س': "﴿ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴾",
    'ش': "﴿ لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ ﴾",
    'ص': "﴿ وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالصَّبْرِ ﴾",
    'ض': "﴿ وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ ۝ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ﴾",
    'ط': "﴿ وَالسَّمَاءِ وَالطَّارِقِ ۝ وَمَا أَدْرَاكَ مَا الطَّارِقُ ۝ النَّجْمُ الثَّاقِبُ ﴾",
    'ظ': "﴿ أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ ۝ وَإِلَى السَّمَاءِ كَيْفَ رُفِعَتْ ۝ وَإِلَى الْجِبَالِ كَيْفَ نُصِبَتْ ﴾",
    'ع': "﴿ عَبَسَ وَتَوَلَّىٰ ۝ أَن جَاءَهُ الْأَعْمَىٰ ۝ وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ ﴾",
    'غ': "﴿ سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى ۝ الَّذِي خَلَقَ فَسَوَّىٰ ۝ وَالَّذِي قَدَّرَ فَهَدَىٰ ﴾",
    'ف': "﴿ أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ۝ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ ﴾",
    'ق': "﴿ إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ ﴾",
    'ك': "﴿ قُلْ يَا أَيُّهَا الْكَافِرُونَ ۝ لَا أَعْبُدُ مَا تَعْبُدُونَ ۝ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴾",
    'ل': "﴿ وَاللَّيْلِ إِذَا يَغْشَىٰ ۝ وَالنَّهَارِ إِذَا تَجَلَّىٰ ۝ وَمَا خَلَقَ الذَّكَرَ وَالْأُنثَىٰ ﴾",
    'م': "﴿ أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۝ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ۝ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ ﴾",
    'ن': "﴿ عَمَّ يَتَسَاءَلُونَ ۝ عَنِ النَّبَإِ الْعَظِيمِ ۝ الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ ﴾",
    'هـ': "﴿ الْقَارِعَةُ ۝ مَا الْقَارِعَةُ ۝ وَمَا أَدْرَاكَ مَا الْقَارِعَةُ ۝ يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ ﴾",
    'و': "﴿ وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ ۝ وَهَٰذَا الْبَلَدِ الْأَمِينِ ﴾",
    'ي': "﴿ لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ ﴾"
  };


/* ============================================================
     FULL DATABASE — 28 LETTERS (With Letter Detective 🕵️‍♂️)
  ============================================================ */
  const FULL_DB = {
    'أ': {
      shapes: ['أ','ـأ','ـأ','أ'],
      jollyStory: 'A little boy drank his juice too fast and got the hiccups! He makes a sudden, short stop.',
      jollyAction: 'Lift your shoulders up quickly as if you are hiccuping, and make the sound.',
      jollyRawSound: 'uh - uh - uh<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "u" in "up")</span>',
      jollyArabic: false, storyIcon: '🐾',
      storyText: 'أَسَدٌ شُجَاعٌ فِي الْغَابَةِ ، يَأْكُلُ اللَّحْمَ ، وَيَزْأَرُ بِصَوْتٍ عَالٍ',
      cardWords: ['أَبَبَ','أَبَأَ','أَأَبَ','بَأَبَ','أَبَبَ'],
      splitWords: ['أَبَ','بَأَ','أَأَ','بَبَ','أَبَ','بَأَ','أَأَ','أَبَ','بَأَ'],
      xoWords: ['أَبَ','بَأَ','أَأَ','بَبَ','أَبَ','بَأَ','أَأَ','أَبَ','بَأَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `بَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `أَبَ<span class="missing-gap"></span>`, correctShape: 2 },
        { display: `بَأَ<span class="missing-gap"></span>`, correctShape: 3 },
        { display: `أَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `أَأَ<span class="missing-gap"></span>`, correctShape: 3 }
      ]
    },
    'ب': {
      shapes: ['بـ','ـبـ','ـب','ب'],
      jollyStory: 'A little duck is swimming in the pond, splashing the water with its wings.',
      jollyAction: 'Press your lips together tightly and open them to make the duck\'s splashing sound.',
      jollyRawSound: 'b - b - b<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "b" in "bat")</span>',
      jollyArabic: false, storyIcon: '🦆',
      storyText: 'بَطَّةٌ بَيْضَاءُ تَسْبَحُ فِي الْبُحَيْرَةِ ، تَبْحَثُ عَنْ طَعَامٍ لِصِغَارِهَا',
      cardWords: ['أَبَبَ','بَأَبَ','بَبَبَ','أَبَأَ','بَأَأَ'],
      splitWords: ['أَبَ','بَأَ','بَبَ','أَبَ','بَأَ','أَبَ','بَبَ','أَبَ','بَأَ'],
      xoWords: ['أَبَ','بَأَ','بَبَ','أَبَ','بَأَ','أَبَ','بَبَ','أَبَ','بَأَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َأَبَ`, correctShape: 0 },
        { display: `أَ<span class="missing-gap"></span>َأَ`, correctShape: 0 },
        { display: `أَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `أَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `أَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ت': {
      shapes: ['تـ','ـتـ','ـت','ت'],
      jollyStory: 'A crocodile snaps its teeth — t-t-t — as it waits silently in the water for its prey.',
      jollyAction: 'Smile widely and touch your upper teeth with your tongue.',
      jollyRawSound: 't - t - t<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "t" in "tap")</span>',
      jollyArabic: false, storyIcon: '🐊',
      storyText: 'تِمْسَاحٌ كَبِيرٌ يَنْتَظِرُ فَرِيسَتَهُ',
      cardWords: ['بَتَتَ','أَتَبَ','تَبَتَ','تَأَبَ','بَأَتَ'],
      splitWords: ['تَبَ','بَتَ','أَتَ','تَأَ','تَتَ','بَتَ','أَتَ','تَأَ','تَبَ'],
      xoWords: ['بَتَتَ','أَتَبَ','تَبَتَ','تَأَبَ','بَأَتَ','تَبَ','بَتَ','أَتَ','تَأَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَتَ`, correctShape: 0 },
        { display: `أَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `بَتَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `أَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `أَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ت', compareWith: 'ب', type: 'visual',
        dots: { target: 'نقطتان فوق', compare: 'نقطة تحت' },
        spyPool: ['ب', 'ت', 'ث', 'ب', 'ت', 'ي']
      }
    },
    'ث': {
      shapes: ['ثـ','ـثـ','ـث','ث'],
      jollyStory: 'A little snake is thinking! It sticks its tongue out between its teeth softly.',
      jollyAction: 'Place the tip of your tongue slightly between your front teeth and blow air softly.',
      jollyRawSound: 'th - th - th<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the soft "th" in "think")</span>',
      jollyArabic: false, storyIcon: '❄️',
      storyText: 'ثَعْلَبٌ مَاكِرٌ يَمْشِي فِي الثَّلْجِ ، يَبْحَثُ عَنْ طَعَامٍ',
      cardWords: ['تَأَثَ','ثَبَتَ','بَثَثَ','أَثَبَ','بَأَثَ'],
      splitWords: ['ثَبَتَ','بَثَثَ','أَثَبَ','تَأَثَ','بَأَثَ','ثَبَ','بِثَ','أَثَ','تَثَ'],
      xoWords: ['تَأَثَ','ثَبَتَ','بَثَثَ','أَثَبَ','بَأَثَ','ثَبَ','بِثَ','أَثَ','تَثَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَتَ`, correctShape: 0 },
        { display: `بَ<span class="missing-gap"></span>َثَ`, correctShape: 1 },
        { display: `أَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `تَأَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `أَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ث', compareWith: 'ت', type: 'visual',
        dots: { target: '٣ نقاط فوق', compare: 'نقطتان فوق' },
        spyPool: ['ت', 'ث', 'ب', 'ت', 'ث', 'ن']
      }
    },
    'ج': {
      shapes: ['جـ','ـجـ','ـج','ج'],
      jollyStory: 'A big plate of jelly is shaking and jumping! It wobbles around making a bouncy sound.',
      jollyAction: 'Press the middle of your tongue to the roof of your mouth and push air out sharply.',
      jollyRawSound: 'j - j - j<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "j" in "jump")</span>',
      jollyArabic: false, storyIcon: '🐪',
      storyText: 'جَمَلٌ قَوِيٌّ يَجْرِي فِي الصَّحْرَاءِ ، يَحْمِلُ الْجَزَرَ',
      cardWords: ['بَأَجَ','جَأَبَ','أَجَبَ','تَجَبَ','جَثَبَ'],
      splitWords: ['بَأَجَ','جَأَبَ','أَجَبَ','تَجَبَ','جَثَبَ','جَتَثَ','بِجَتَ','أَجَثَ','تَجَأَ'],
      xoWords: ['بَأَجَ','جَأَبَ','أَجَبَ','تَجَبَ','جَثَبَ','جَتَ','بِجَ','أَجَ','تَجَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َأَبَ`, correctShape: 0 },
        { display: `أَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `تَثَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `تَ<span class="missing-gap"></span>َبَ`, correctShape: 1 },
        { display: `تَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ح': {
      shapes: ['حـ','ـحـ','ـح','ح'],
      jollyStory: 'You just ate a very hot chili pepper! You open your mouth to breathe out sharp, hot air.',
      jollyAction: 'Squeeze the middle of your throat and breathe out a sharp, breathy sound.',
      jollyRawSound: 'H - H - H<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A sharp, crispy "h" from the throat)</span>',
      jollyArabic: true, storyIcon: '🐎',
      storyText: 'حِصَانٌ سَرِيعٌ يَجْرِي فِي الْحَقْلِ ، يَحْمِلُ الْحَطَبَ',
      cardWords: ['تَأَحَ','بَحَثَ','حَبَبَ','أَحَبَ','تَحَبَ'],
      splitWords: ['تَأَحَ','بَحَثَ','حَبَبَ','أَحَبَ','تَحَبَ','حَجَبَ','أَحَبَ','حَتَ','بِحَ'],
      xoWords: ['تَأَحَ','بَحَثَ','حَبَبَ','أَحَبَ','تَحَبَ','حَجَبَ','أَحَبَ','حَتَ','بِحَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَبَ`, correctShape: 0 },
        { display: `بَ<span class="missing-gap"></span>َثَ`, correctShape: 1 },
        { display: `سَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `تَأَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `أَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ح', compareWith: 'ج', type: 'visual',
        dots: { target: 'بدون نقاط', compare: 'نقطة تحت' },
        spyPool: ['ج', 'ح', 'ج', 'ح', 'خ', 'ح']
      }
    },
    'خ': {
      shapes: ['خـ','ـخـ','ـخ','خ'],
      jollyStory: 'A giant is sleeping deeply and making a heavy, scraping snoring sound.',
      jollyAction: 'Raise the back of your tongue toward your throat to create a scraping, raspy sound.',
      jollyRawSound: 'kh - kh - kh<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the Scottish "ch" or Spanish "j")</span>',
      jollyArabic: true, storyIcon: '⛺',
      storyText: 'خَيْمَةٌ كَبِيرَةٌ فِي الصَّحْرَاءِ ، نَخْبِزُ فِيهَا الْخُبْزَ',
      cardWords: ['تَأَخَ','خَبَأَ','تَخَبَ','أَخَذَ','بَأَخَ'],
      splitWords: ['تَأَخَ','خَبَأَ','تَخَبَ','بَخَتَ','خَتَمَ','خَبَزَ','خَشَبَ','أَخَذَ','خَرَجَ'],
      xoWords: ['تَأَخَ','خَبَأَ','تَخَبَ','أَخَذَ','بَأَخَ','خَتَمَ','خَرَجَ','خَشَبَ','خَبَزَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَأَ`, correctShape: 0 },
        { display: `تَ<span class="missing-gap"></span>َبَ`, correctShape: 1 },
        { display: `طَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `تَأَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `أَ<span class="missing-gap"></span>َذَ`, correctShape: 0 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'خ', compareWith: 'ح', type: 'visual',
        dots: { target: 'نقطة فوق', compare: 'بدون نقاط' },
        spyPool: ['ح', 'خ', 'ج', 'خ', 'ح', 'خ']
      }
    },
    'د': {
      shapes: ['د','ـد','ـد','د'],
      jollyStory: 'Danny is playing his new drum. He hits it with the sticks up and down.',
      jollyAction: 'Tap the tip of your tongue right behind your top front teeth.',
      jollyRawSound: 'd - d - d<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "d" in "dog")</span>',
      jollyArabic: false, storyIcon: '🚲',
      storyText: 'دَرَّاجَةٌ سَرِيعَةٌ فِي الْحَدِيقَةِ ، يَرْكَبُهَا وَلَدٌ نَشِيطٌ',
      cardWords: ['أَدَدَ','بَدَأَ','دَأَبَ','حَدَثَ','بَأَدَ'],
      splitWords: ['أَدَدَ','بَدَأَ','دَأَبَ','حَدَثَ','بَأَدَ','أَدَبَ','جَدَدَ','خَدَشَ','دَبَبَ'],
      xoWords: ['أَدَدَ','بَدَأَ','دَأَبَ','حَدَثَ','بَأَدَ','أَدَبَ','جَدَدَ','خَدَشَ','دَبَبَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َأَبَ`, correctShape: 0 },
        { display: `بَ<span class="missing-gap"></span>َأَ`, correctShape: 1 },
        { display: `سَعِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `أَ<span class="missing-gap"></span>َدَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>َثَ`, correctShape: 1 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ذ': {
      shapes: ['ذ','ـذ','ـذ','ذ'],
      jollyStory: 'A little bee is buzzing around a flower, making a vibrating sound.',
      jollyAction: 'Place your tongue between your teeth (like ث) but add a buzzing vibration.',
      jollyRawSound: 'th - th - th<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the buzzing "th" in "that")</span>',
      jollyArabic: true, storyIcon: '🌱',
      storyText: 'ذَهَبَ الْفَلَّاحُ إِلَى الْحَقْلِ لِيَزْرَعَ الذُّرَةَ',
      cardWords: ['أَدَذَ','أَخَذَ','ذَبَحَ','جَذَبَ','بَأَذَ'],
      splitWords: ['أَدَذَ','أَخَذَ','ذَبَحَ','جَذَبَ','بَأَذَ','خَذَلَ','ذَهَبَ','عَذَبَ','نَبَذَ'],
      xoWords: ['أَدَذَ','أَخَذَ','ذَبَحَ','جَذَبَ','بَأَذَ','خَذَلَ','ذَهَبَ','عَذَبَ','نَبَذَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَحَ`, correctShape: 0 },
        { display: `أَخَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `جَذَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `أَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `جَ<span class="missing-gap"></span>َبَ`, correctShape: 1 },
        { display: `بَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ذ', compareWith: 'د', type: 'visual',
        dots: { target: 'نقطة فوق', compare: 'بدون نقاط' },
        spyPool: ['د', 'ذ', 'د', 'ذ', 'د', 'ذ']
      }
    },
    'ر': {
      shapes: ['ر','ـر','ـر','ر'],
      jollyStory: 'A motorcycle engine is revving up, ready to race down the street.',
      jollyAction: 'Flick the tip of your tongue quickly against the roof of your mouth.',
      jollyRawSound: 'r - r - r<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A rolled "r" like in Spanish)</span>',
      jollyArabic: false, storyIcon: '🖌️',
      storyText: 'رَسَمَ رَامِي رَسْمَةً رَائِعَةً فِيهَا قَمَرٌ',
      cardWords: ['بَدَرَ','تَرَكَ','خَرَجَ','حَرَثَ','بَرَدَ'],
      splitWords: ['بَدَرَ','تَرَكَ','خَرَجَ','حَرَثَ','بَرَدَ','رَسَمَ','شَكَرَ','صَبَرَ','كَبُرَ'],
      xoWords: ['بَدَرَ','تَرَكَ','خَرَجَ','حَرَثَ','بَرَدَ','رَسَمَ','شَكَرَ','صَبَرَ','كَبُرَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَطَ`, correctShape: 0 },
        { display: `تَ<span class="missing-gap"></span>َكَ`, correctShape: 1 },
        { display: `صَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `خَ<span class="missing-gap"></span>َجَ`, correctShape: 1 },
        { display: `أَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ز': {
      shapes: ['ز','ـز','ـز','ز'],
      jollyStory: 'A mosquito is flying right next to your ear! It makes a sharp buzzing sound.',
      jollyAction: 'Close your teeth together, smile slightly, and make a buzzing sound.',
      jollyRawSound: 'z - z - z<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "z" in "zoo")</span>',
      jollyArabic: false, storyIcon: '🌳',
      storyText: 'زَرَعَ زَيْدٌ زَهْرَةً جَمِيلَةً فِي الْحَدِيقَةِ',
      cardWords: ['بَرَزَ','زَجَرَ','حَجَزَ','خَزَأَ','دَرَزَ'],
      splitWords: ['بَرَزَ','زَجَرَ','حَجَزَ','خَزَأَ','دَرَزَ','زَرَعَ','نَزَلَ','عَزَمَ','هَزَمَ'],
      xoWords: ['بَرَزَ','زَجَرَ','حَجَزَ','خَزَأَ','دَرَزَ','زَرَعَ','نَزَلَ','عَزَمَ','هَزَمَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َجَرَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>َزَ`, correctShape: 1 },
        { display: `حَجَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `خَ<span class="missing-gap"></span>َأَ`, correctShape: 1 },
        { display: `دَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ز', compareWith: 'ر', type: 'visual',
        dots: { target: 'نقطة فوق', compare: 'بدون نقاط' },
        spyPool: ['ر', 'ز', 'ر', 'ز', 'ر', 'ز']
      }
    },
    'س': {
      shapes: ['سـ','ـسـ','ـس','س'],
      jollyStory: 'A snake is slithering through the grass, making a continuous hissing sound.',
      jollyAction: 'Bring your teeth together and blow air right through the middle of them smoothly.',
      jollyRawSound: 's - s - s<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "s" in "sun")</span>',
      jollyArabic: false, storyIcon: '🚗',
      storyText: 'سَيَّارَةٌ سَرِيعَةٌ تَسِيرُ فِي الطَّرِيقِ',
      cardWords: ['دَرَسَ','سَجَدَ','سَحَبَ','سَرَدَ','حَسَدَ'],
      splitWords: ['دَرَسَ','سَجَدَ','سَحَبَ','سَرَدَ','حَسَدَ','كَسَبَ','سَمِعَ','عَسَسَ','غَسَلَ'],
      xoWords: ['دَرَسَ','سَجَدَ','سَحَبَ','سَرَدَ','حَسَدَ','كَسَبَ','سَمِعَ','عَسَسَ','غَسَلَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َجَدَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>َدَ`, correctShape: 1 },
        { display: `عَسَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `دَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `خَ<span class="missing-gap"></span>ِرَ`, correctShape: 1 },
        { display: `أَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ش': {
      shapes: ['شـ','ـشـ','ـش','ش'],
      jollyStory: 'A mother is telling her baby to be quiet so they can sleep, making a soft shushing sound.',
      jollyAction: 'Push your lips forward slightly and blow air over the middle of your tongue.',
      jollyRawSound: 'sh - sh - sh<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "sh" in "shoe")</span>',
      jollyArabic: false, storyIcon: '☀️',
      storyText: 'أَشْرَقَتِ الشَّمْسُ الدَّافِئَةُ فَشَرِبَ شَادِي الشَّايَ',
      cardWords: ['خَدَشَ','شَرِبَ','شَجَرَ','حَشَرَ','خَشَبَ'],
      splitWords: ['خَدَشَ','شَرِبَ','شَجَرَ','حَشَرَ','خَشَبَ','شَكَرَ','نَشِطَ','عَطَشَ','بَطَشَ'],
      xoWords: ['خَدَشَ','شَرِبَ','شَجَرَ','حَشَرَ','خَشَبَ','شَكَرَ','نَشِطَ','عَطَشَ','بَطَشَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َرِبَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `عَطَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `خَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `خَ<span class="missing-gap"></span>َبَ`, correctShape: 1 },
        { display: `دَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ش', compareWith: 'س', type: 'visual',
        dots: { target: '٣ نقاط فوق', compare: 'بدون نقاط' },
        spyPool: ['س', 'ش', 'س', 'ش', 'س', 'ش']
      }
    },
    'ص': {
      shapes: ['صـ','ـصـ','ـص','ص'],
      jollyStory: 'You are pushing a very heavy stone block across the floor. It sounds deep and heavy.',
      jollyAction: 'Say "S", but drop your jaw down and make the back of your tongue heavy.',
      jollyRawSound: 'S - S - S<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A deep, heavy, hollow "S")</span>',
      jollyArabic: true, storyIcon: '🚀',
      storyText: 'صَنَعَ صَالِحٌ صَارُوخاً صَغِيراً لِلْفَضَاءِ',
      cardWords: ['حَرَصَ','صَبَرَ','صَدَرَ','بَصَرَ','حَصَدَ'],
      splitWords: ['حَرَصَ','صَبَرَ','صَدَرَ','بَصَرَ','حَصَدَ','صَنَعَ','فَحَصَ','نَصَحَ','قَصَدَ'],
      xoWords: ['حَرَصَ','صَبَرَ','صَدَرَ','بَصَرَ','حَصَدَ','صَنَعَ','فَحَصَ','نَصَحَ','قَصَدَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَرَ`, correctShape: 0 },
        { display: `بَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `فَحَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `حَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `حَ<span class="missing-gap"></span>َدَ`, correctShape: 1 },
        { display: `رَصَ<span class="missing-gap"></span>َ`, correctShape: 2 }
      ],
      detective: {
        target: 'ص', compareWith: 'س', type: 'sound',
        weight: { heavy: 'ص', light: 'س' },
        spyPool: ['س', 'ص', 'س', 'ص', 'س', 'ص']
      }
    },
    'ض': {
      shapes: ['ضـ','ـضـ','ـض','ض'],
      jollyStory: 'You have a toothache, and you gently bite down on the sore tooth, making a muffled heavy groan.',
      jollyAction: 'Press the sides of your tongue against your upper back teeth to block the air.',
      jollyRawSound: 'D - D - D<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A deep, heavy, muffled "D")</span>',
      jollyArabic: true, storyIcon: '🐸',
      storyText: 'ضِفْدَعٌ أَخْضَرُ يَقْفِزُ فِي الضَّحَى',
      cardWords: ['دَرَضَ','ضَرَبَ','حَضَرَ','ضَجِرَ','مَرِضَ'],
      splitWords: ['دَرَضَ','ضَرَبَ','حَضَرَ','ضَجِرَ','مَرِضَ','ضَحِكَ','عَرَضَ','نَضِجَ','رَفَضَ'],
      xoWords: ['دَرَضَ','ضَرَبَ','حَضَرَ','ضَجِرَ','مَرِضَ','ضَحِكَ','عَرَضَ','نَضِجَ','رَفَضَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َرَبَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `رَفَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `دَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `نَ<span class="missing-gap"></span>ِجَ`, correctShape: 1 },
        { display: `أَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ض', compareWith: 'د', type: 'sound',
        weight: { heavy: 'ض', light: 'د' },
        spyPool: ['د', 'ض', 'د', 'ض', 'د', 'ض']
      }
    },
    'ط': {
      shapes: ['طـ','ـطـ','ـط','ط'],
      jollyStory: 'A big helicopter is chopping the air above you. The sound is strong, popping, and deep.',
      jollyAction: 'Place your tongue exactly like "T", but fill your mouth with air to make it heavy.',
      jollyRawSound: 'T - T - T<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A deep, heavy, explosive "T")</span>',
      jollyArabic: true, storyIcon: '✈️',
      storyText: 'طَارَتِ الطَّائِرَةُ طَوِيلاً وَاطْمَأَنَّ الرُّكَّابُ',
      cardWords: ['شَرَطَ','طَبَخَ','رَبَطَ','طَرَدَ','حَطَبَ'],
      splitWords: ['شَرَطَ','طَبَخَ','رَبَطَ','طَرَدَ','حَطَبَ','طَلَبَ','بَطَلَ','قَطَعَ','خَلَطَ'],
      xoWords: ['شَرَطَ','طَبَخَ','رَبَطَ','طَرَدَ','حَطَبَ','طَلَبَ','بَطَلَ','قَطَعَ','خَلَطَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَخَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>َبَ`, correctShape: 1 },
        { display: `رَبَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `شَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `بَ<span class="missing-gap"></span>َلَ`, correctShape: 1 },
        { display: `أَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ط', compareWith: 'ت', type: 'sound',
        weight: { heavy: 'ط', light: 'ت' },
        spyPool: ['ت', 'ط', 'ت', 'ط', 'ت', 'ط']
      }
    },
    'ظ': {
      shapes: ['ظـ','ـظـ','ـظ','ظ'],
      jollyStory: 'Dhafir carefully keeps his important letter safe inside a heavy envelope.',
      jollyAction: 'Put your tongue between your teeth (like ذ), but drop your jaw back to make it heavy.',
      jollyRawSound: 'TH - TH - TH<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A deep, heavy buzzing "TH")</span>',
      jollyArabic: true, storyIcon: '✉️',
      storyText: 'ظَافِرٌ يَحْفَظُ رِسَالَتَهُ فِي الظَّرْفِ',
      cardWords: ['حَرَظَ','حَظِرَ','ظَرَبَ','نَظَرَ','حَفِظَ'],
      splitWords: ['حَرَظَ','حَظِرَ','ظَرَبَ','نَظَرَ','حَفِظَ','ظَلَمَ','لَحَظَ','عَظُمَ','يَقِظَ'],
      xoWords: ['حَرَظَ','حَظِرَ','ظَرَبَ','نَظَرَ','حَفِظَ','ظَلَمَ','لَحَظَ','عَظُمَ','يَقِظَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َرَبَ`, correctShape: 0 },
        { display: `حَ<span class="missing-gap"></span>ِرَ`, correctShape: 1 },
        { display: `حَفِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `حَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `نَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `أَأَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ظ', compareWith: 'ذ', type: 'sound',
        weight: { heavy: 'ظ', light: 'ذ' },
        spyPool: ['ذ', 'ظ', 'ذ', 'ظ', 'ذ', 'ظ']
      }
    },
    'ع': {
      shapes: ['عـ','ـعـ','ـع','ع'],
      jollyStory: 'You take a big gulp of water and swallow hard. The sound comes from deep down.',
      jollyAction: 'Squeeze the middle of your throat tightly and push the sound out.',
      jollyRawSound: '\'a - \'a - \'a<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A deep, tight throat sound)</span>',
      jollyArabic: true, storyIcon: '🍇',
      storyText: 'عِمَادٌ يَعْمَلُ فِي الْمَزْرَعَةِ يَقْطِفُ عِنَباً',
      cardWords: ['زَرَعَ','عَبَرَ','رَجَعَ','صَعِدَ','مَنَعَ'],
      splitWords: ['زَرَعَ','عَبَرَ','رَجَعَ','صَعِدَ','مَنَعَ','عَمِلَ','لَعِبَ','رَفَعَ','سَمِعَ'],
      xoWords: ['زَرَعَ','عَبَرَ','رَجَعَ','صَعِدَ','مَنَعَ','عَمِلَ','لَعِبَ','رَفَعَ','سَمِعَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبَرَ`, correctShape: 0 },
        { display: `صَ<span class="missing-gap"></span>ِدَ`, correctShape: 1 },
        { display: `رَجَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `زَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `لَ<span class="missing-gap"></span>ِبَ`, correctShape: 1 },
        { display: `بَدَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'غ': {
      shapes: ['غـ','ـغـ','ـغ','غ'],
      jollyStory: 'You are brushing your teeth and tilting your head back to gargle with mouthwash.',
      jollyAction: 'Tilt your head back slightly and vibrate the very back of your throat.',
      jollyRawSound: 'gh - gh - gh<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the French "R" in "Paris")</span>',
      jollyArabic: true, storyIcon: '🐦‍⬛',
      storyText: 'غُرَابٌ صَغِيرٌ يَقِفُ فَوْقَ الْغُصْنِ',
      cardWords: ['بَزَغَ','غَرَسَ','رَغِبَ','شَغَبَ','ضَغَطَ'],
      splitWords: ['بَزَغَ','غَرَسَ','رَغِبَ','شَغَبَ','ضَغَطَ','غُلِبَ','شُغِفَ','فَرِغَ','صُبِغَ'],
      xoWords: ['بَزَغَ','غَرَسَ','رَغِبَ','شَغَبَ','ضَغَطَ','غُلِبَ','شُغِفَ','فَرِغَ','صُبِغَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َرَسَ`, correctShape: 0 },
        { display: `رَ<span class="missing-gap"></span>ِبَ`, correctShape: 0 },
        { display: `صُبِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَزَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `ضَ<span class="missing-gap"></span>َطَ`, correctShape: 1 },
        { display: `فَرِ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'غ', compareWith: 'ع', type: 'visual',
        dots: { target: 'نقطة فوق', compare: 'بدون نقاط' },
        spyPool: ['ع', 'غ', 'ع', 'غ', 'ع', 'غ']
      }
    },
    'ف': {
      shapes: ['فـ','ـفـ','ـف','ف'],
      jollyStory: 'A big balloon got a small hole, making a continuous air-escaping sound as it deflates.',
      jollyAction: 'Rest your top teeth gently on your bottom lip and blow air through.',
      jollyRawSound: 'f - f - f<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "f" in "fish")</span>',
      jollyArabic: false, storyIcon: '🦋',
      storyText: 'فَرَاشَةٌ فَاتِنَةٌ تَطِيرُ فَوْقَ الزُّهُورِ',
      cardWords: ['رَدَفَ','فَتَحَ','فَرِحَ','رَفَعَ','عَرَفَ'],
      splitWords: ['رَدَفَ','فَتَحَ','فَرِحَ','رَفَعَ','عَرَفَ','فُحِصَ','زُفِفَ','سَلَفَ','خَطِفَ'],
      xoWords: ['رَدَفَ','فَتَحَ','فَرِحَ','رَفَعَ','عَرَفَ','فُحِصَ','زُفِفَ','سَلَفَ','خَطِفَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َتَحَ`, correctShape: 0 },
        { display: `رَ<span class="missing-gap"></span>َعَ`, correctShape: 0 },
        { display: `خَطِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `رَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `زُ<span class="missing-gap"></span>ِفَ`, correctShape: 0 },
        { display: `عَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ق': {
      shapes: ['قـ','ـقـ','ـق','ق'],
      jollyStory: 'You drop a stone deep into an empty well, and you hear a hollow, echoing pop at the bottom.',
      jollyAction: 'Click the very back of your tongue against the soft part of your throat.',
      jollyRawSound: 'q - q - q<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(A deep, hollow, popping "K")</span>',
      jollyArabic: true, storyIcon: '🚆',
      storyText: 'قِطَارٌ قَوِيٌّ يَقْطَعُ الطَّرِيقَ بِسُرْعَةٍ',
      cardWords: ['رَزَقَ','قَرَأَ','قَطَعَ','سَبَقَ','خَلَقَ'],
      splitWords: ['رَزَقَ','قَرَأَ','قَطَعَ','سَبَقَ','خَلَقَ','قُبِضَ','سُرِقَ','صُعِقَ','رَفَقَ'],
      xoWords: ['رَزَقَ','قَرَأَ','قَطَعَ','سَبَقَ','خَلَقَ','قُبِضَ','سُرِقَ','صُعِقَ','رَفَقَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َرَأَ`, correctShape: 0 },
        { display: `سَ<span class="missing-gap"></span>َطَ`, correctShape: 1 },
        { display: `خَلَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `رَزَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `صُ<span class="missing-gap"></span>ِعَ`, correctShape: 1 },
        { display: `سُرِ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ق', compareWith: 'ف', type: 'visual',
        dots: { target: 'نقطتان فوق', compare: 'نقطة فوق' },
        spyPool: ['ف', 'ق', 'ف', 'ق', 'ف', 'ق']
      }
    },
    'ك': {
      shapes: ['كـ','ـكـ','ـك','ك'],
      jollyStory: 'You step on a dry twig in the forest, and it snaps with a sharp cracking sound.',
      jollyAction: 'Press the back of your tongue to the roof of your mouth and release a sharp burst of air.',
      jollyRawSound: 'k - k - k<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "k" in "kite")</span>',
      jollyArabic: false, storyIcon: '🐕',
      storyText: 'كَلْبٌ كَرِيمٌ يَحْرُسُ الْمَزْرَعَةَ',
      cardWords: ['تَرَكَ','كَتَبَ','كَسَرَ','شَكَرَ','ضَحِكَ'],
      splitWords: ['تَرَكَ','كَتَبَ','كَسَرَ','شَكَرَ','ضَحِكَ','كُتِبَ','كَتَمَ','مُسِكَ','حُكِمَ'],
      xoWords: ['تَرَكَ','كَتَبَ','كَسَرَ','شَكَرَ','ضَحِكَ','كُتِبَ','كَتَمَ','مُسِكَ','حُكِمَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َتَبَ`, correctShape: 0 },
        { display: `شَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `ضَحِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `تَرَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `حُ<span class="missing-gap"></span>ِمَ`, correctShape: 1 },
        { display: `دَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ك', compareWith: 'ق', type: 'sound',
        weight: { heavy: 'ق', light: 'ك' },
        spyPool: ['ق', 'ك', 'ق', 'ك', 'ق', 'ك']
      }
    },
    'ل': {
      shapes: ['لـ','ـلـ','ـل','ل'],
      jollyStory: 'A happy child is singing a lovely song while licking a sweet lollipop.',
      jollyAction: 'Press the tip of your tongue against the gums right above your top front teeth and hum.',
      jollyRawSound: 'l - l - l<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "l" in "lemon")</span>',
      jollyArabic: false, storyIcon: '🍋',
      storyText: 'لَبِسَ لُؤَيٌّ مَلَابِسَهُ وَشَرِبَ عَصِيرَ اللَّيْمُونِ',
      cardWords: ['بَدَلَ','دَخَلَ','بَطَلَ','جَعَلَ','خَلَقَ'],
      splitWords: ['بَدَلَ','دَخَلَ','بَطَلَ','جَعَلَ','خَلَقَ','لَبِسَ','لَعِبَ','ظُلِمَ','غُسِلَ'],
      xoWords: ['بَدَلَ','دَخَلَ','بَطَلَ','جَعَلَ','خَلَقَ','لَبِسَ','لَعِبَ','ظُلِمَ','غُسِلَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َبِسَ`, correctShape: 0 },
        { display: `خَ<span class="missing-gap"></span>َقَ`, correctShape: 1 },
        { display: `جَعَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `ظُ<span class="missing-gap"></span>ِمَ`, correctShape: 1 },
        { display: `نَزَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'م': {
      shapes: ['مـ','ـمـ','ـم','م'],
      jollyStory: 'A hungry boy sees a delicious meal and rubs his tummy while making a happy sound.',
      jollyAction: 'Press your lips completely together and let your voice hum through your nose.',
      jollyRawSound: 'm - m - m<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "m" in "moon")</span>',
      jollyArabic: false, storyIcon: '🌙',
      storyText: 'مَشَى مَاجِدٌ فَرَأَى قَمَراً مُنِيراً وَنُجُوماً',
      cardWords: ['رَدَمَ','جَمَعَ','سَمِعَ','حَكَمَ','مَسَحَ'],
      splitWords: ['رَدَمَ','جَمَعَ','سَمِعَ','حَكَمَ','مَسَحَ','مَنَعَ','ظُلِمَ','فُهِمَ','عُلِمَ'],
      xoWords: ['رَدَمَ','جَمَعَ','سَمِعَ','حَكَمَ','مَسَحَ','مَنَعَ','ظُلِمَ','فُهِمَ','عُلِمَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َسَحَ`, correctShape: 0 },
        { display: `سَ<span class="missing-gap"></span>ِعَ`, correctShape: 1 },
        { display: `حَكَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `رَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `جَ<span class="missing-gap"></span>َعَ`, correctShape: 1 },
        { display: `رَحِ<span class="missing-gap"></span>َ`, correctShape: 2 }
      ]
    },
    'ن': {
      shapes: ['نـ','ـنـ','ـن','ن'],
      jollyStory: 'An airplane is flying high in the sky, making a continuous engine humming sound.',
      jollyAction: 'Place your tongue on the roof of your mouth and hum the sound through your nose.',
      jollyRawSound: 'n - n - n<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "n" in "nest")</span>',
      jollyArabic: false, storyIcon: '🐝',
      storyText: 'نَحْلَةٌ نَشِيطَةٌ تَصْنَعُ عَسَلاً لَذِيذاً',
      cardWords: ['بَدَنَ','نَجَحَ','نَزَلَ','مَنَعَ','نَصَحَ'],
      splitWords: ['بَدَنَ','نَجَحَ','نَزَلَ','مَنَعَ','نَصَحَ','طُعِنَ','دُفِنَ','لُعِنَ','صُنِعَ'],
      xoWords: ['بَدَنَ','نَجَحَ','نَزَلَ','مَنَعَ','نَصَحَ','طُعِنَ','دُفِنَ','لُعِنَ','صُنِعَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َجَحَ`, correctShape: 0 },
        { display: `مَ<span class="missing-gap"></span>َعَ`, correctShape: 1 },
        { display: `طُعِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `صُ<span class="missing-gap"></span>ِعَ`, correctShape: 1 },
        { display: `وَزَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ن', compareWith: 'ب', type: 'visual',
        dots: { target: 'نقطة فوق', compare: 'نقطة تحت' },
        spyPool: ['ب', 'ت', 'ث', 'ن', 'ي', 'ب']
      }
    },
    'هـ': {
      shapes: ['هـ','ـهـ','ـه','ه'],
      jollyStory: 'A boy has been running very fast. He stops to catch his breath, panting heavily.',
      jollyAction: 'Open your mouth, relax your throat, and push air gently from your chest.',
      jollyRawSound: 'h - h - h<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "h" in "hat")</span>',
      jollyArabic: false, storyIcon: '🎁',
      storyText: 'هَدِيَّةٌ أَعْطَاهَا هِشَامٌ لِأُخْتِهِ فِيهَا هِلَالٌ',
      cardWords: ['رَدَهَ','هَرَبَ','ذَهَبَ','ظَهَرَ','شَهِدَ'],
      splitWords: ['رَدَهَ','هَرَبَ','ذَهَبَ','ظَهَرَ','شَهِدَ','هُدِمَ','فُهِمَ','نُهِرَ','بُهِتَ'],
      xoWords: ['رَدَهَ','هَرَبَ','ذَهَبَ','ظَهَرَ','شَهِدَ','هُدِمَ','فُهِمَ','نُهِرَ','بُهِتَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َرَبَ`, correctShape: 0 },
        { display: `ذَ<span class="missing-gap"></span>َبَ`, correctShape: 0 },
        { display: `شَهِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `رَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `ظَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `فُ<span class="missing-gap"></span>ِمَ`, correctShape: 1 }
      ]
    },
    'و': {
      shapes: ['و','ـو','ـو','و'],
      jollyStory: 'A strong winter storm is outside, and the wind is howling and whistling through the trees.',
      jollyAction: 'Push your lips forward into a tight, round circle and blow your voice through them.',
      jollyRawSound: 'w - w - w<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "w" in "wind")</span>',
      jollyArabic: false, storyIcon: '🌹',
      storyText: 'وَلَدٌ وَدُودٌ يَقِفُ عِنْدَ حَوْضِ الْوَرْدِ',
      cardWords: ['بَدَوَ','وَلَدَ','وَقَعَ','وَجَدَ','وَعَدَ'],
      splitWords: ['بَدَوَ','وَلَدَ','وَقَعَ','وَجَدَ','وَعَدَ','وَزَنَ','وُضِعَ','وُهِبَ','وُصِفَ'],
      xoWords: ['بَدَوَ','وَلَدَ','وَقَعَ','وَجَدَ','وَعَدَ','وَزَنَ','وُضِعَ','وُهِبَ','وُصِفَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َلَدَ`, correctShape: 0 },
        { display: `عَ<span class="missing-gap"></span>َرَ`, correctShape: 1 },
        { display: `دَعَ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `حَ<span class="missing-gap"></span>َصَ`, correctShape: 1 },
        { display: `ذَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ]
    },
    'ي': {
      shapes: ['يـ','ـيـ','ـي','ي'],
      jollyStory: 'A child is eating yummy yellow yogurt. They rub their tummy and smile.',
      jollyAction: 'Drop your jaw slightly, pull your tongue back, and make a bright, cheerful sound.',
      jollyRawSound: 'y - y - y<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "y" in "yes")</span>',
      jollyArabic: false, storyIcon: '🕊️',
      storyText: 'يَطِيرُ يَمَامٌ أَبْيَضُ فِي يَوْمٍ يَسِيرٍ',
      cardWords: ['رَدَيَ','يَئِسَ','يَبِسَ','يَقِظَ','يَنَعَ'],
      splitWords: ['رَدَيَ','يَئِسَ','يَبِسَ','يَقِظَ','يَنَعَ','يَسَرَ','يَفَعَ','بُغِيَ','نُسِيَ'],
      xoWords: ['رَدَيَ','يَئِسَ','يَبِسَ','يَقِظَ','يَنَعَ','يَسَرَ','يَفَعَ','بُغِيَ','نُسِيَ'],
      missingWords: [
        { display: `<span class="missing-gap"></span>َئِسَ`, correctShape: 0 },
        { display: `يَبِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `بُغِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `رَدَ<span class="missing-gap"></span>َ`, correctShape: 3 },
        { display: `نُسِ<span class="missing-gap"></span>َ`, correctShape: 2 },
        { display: `أَرَ<span class="missing-gap"></span>َ`, correctShape: 3 }
      ],
      detective: {
        target: 'ي', compareWith: 'ب', type: 'visual',
        dots: { target: 'نقطتان تحت', compare: 'نقطة تحت' },
        spyPool: ['ب', 'ت', 'ث', 'ن', 'ي', 'ب']
      }
    }
  };



/* ============================================================
   قاعدة بيانات المحقق الشاملة (توضع هنا قبل بناء الحروف)
============================================================ */
const DETECTIVE_DATA = {
  'أ': [
      { type: 'visual', target: 'أ', compareWith: 'ل', dots: { target: 'بهمزة', compare: 'بدون همزة' } },
      { type: 'sound', target: 'أ', compareWith: 'هـ', weight: { light: 'أ', heavy: 'هـ' }, labels: { light: 'أقصى الحلق (أ)', heavy: 'أقصى الحلق (هـ)' } }
  ],
  'ب': [
      { type: 'visual', target: 'ب', compareWith: 'ن', dots: { target: 'نقطة تحت', compare: 'نقطة فوق' } }
  ],
  'ت': [
      { type: 'visual', target: 'ت', compareWith: 'ي', dots: { target: 'نقطتان فوق', compare: 'نقطتان تحت' } },
      { type: 'sound', target: 'ت', compareWith: 'د', weight: { light: 'ت', heavy: 'د' }, labels: { light: 'مهموس (ت)', heavy: 'مجهور (د)' } },
      { type: 'sound', target: 'ت', compareWith: 'ط', weight: { light: 'ت', heavy: 'ط' }, labels: { light: 'مرقق (ت)', heavy: 'مفخم (ط)' } }
  ],
  'ث': [
      { type: 'visual', target: 'ث', compareWith: 'ش', dots: { target: 'شكل طبق', compare: 'لها أسنان' } },
      { type: 'sound', target: 'ث', compareWith: 'س', weight: { light: 'ث', heavy: 'س' }, labels: { light: 'لثوي (ث)', heavy: 'صفير (س)' } },
      { type: 'sound', target: 'ث', compareWith: 'ذ', weight: { light: 'ث', heavy: 'ذ' }, labels: { light: 'مهموس (ث)', heavy: 'مجهور (ذ)' } }
  ],
  'ج': { type: 'visual', target: 'ج', compareWith: 'خ', dots: { target: 'نقطة تحت', compare: 'نقطة فوق' } },
  'ح': [
      { type: 'sound', target: 'ح', compareWith: 'ع', weight: { light: 'ح', heavy: 'ع' }, labels: { light: 'مهموس (ح)', heavy: 'مجهور (ع)' } },
      { type: 'sound', target: 'ح', compareWith: 'هـ', weight: { light: 'ح', heavy: 'هـ' }, labels: { light: 'وسط الحلق (ح)', heavy: 'أقصى الحلق (هـ)' } }
  ],
  'خ': [
      { type: 'visual', target: 'خ', compareWith: 'ج', dots: { target: 'نقطة فوق', compare: 'نقطة تحت' } },
      { type: 'sound', target: 'خ', compareWith: 'غ', weight: { light: 'خ', heavy: 'غ' }, labels: { light: 'مهموس (خ)', heavy: 'مجهور (غ)' } }
  ],
  'د': [
      { type: 'visual', target: 'د', compareWith: 'ذ', dots: { target: 'بدون نقاط', compare: 'نقطة فوق' } },
      { type: 'sound', target: 'د', compareWith: 'ض', weight: { light: 'د', heavy: 'ض' }, labels: { light: 'مرقق (د)', heavy: 'مفخم (ض)' } },
      { type: 'sound', target: 'د', compareWith: 'ت', weight: { light: 'د', heavy: 'ت' }, labels: { light: 'مجهور (د)', heavy: 'مهموس (ت)' } }
  ],
  'ذ': [
      { type: 'visual', target: 'ذ', compareWith: 'د', dots: { target: 'نقطة فوق', compare: 'بدون نقاط' } },
      { type: 'sound', target: 'ذ', compareWith: 'ز', weight: { light: 'ذ', heavy: 'ز' }, labels: { light: 'لثوي (ذ)', heavy: 'صفير (ز)' } },
      { type: 'sound', target: 'ذ', compareWith: 'ظ', weight: { light: 'ذ', heavy: 'ظ' }, labels: { light: 'مرقق (ذ)', heavy: 'مفخم (ظ)' } },
      { type: 'sound', target: 'ذ', compareWith: 'ث', weight: { light: 'ذ', heavy: 'ث' }, labels: { light: 'مجهور (ذ)', heavy: 'مهموس (ث)' } }
  ],
  'ر': [
      { type: 'visual', target: 'ر', compareWith: 'ز', dots: { target: 'بدون نقاط', compare: 'نقطة فوق' } },
      { type: 'sound', target: 'ر', compareWith: 'ل', weight: { light: 'ر', heavy: 'ل' }, labels: { light: 'تكرار (ر)', heavy: 'انحراف (ل)' } }
  ],
  'ز': [
      { type: 'visual', target: 'ز', compareWith: 'ر', dots: { target: 'نقطة فوق', compare: 'بدون نقاط' } },
      { type: 'sound', target: 'ز', compareWith: 'ذ', weight: { light: 'ز', heavy: 'ذ' }, labels: { light: 'صفير (ز)', heavy: 'لثوي (ذ)' } },
      { type: 'sound', target: 'ز', compareWith: 'ظ', weight: { light: 'ز', heavy: 'ظ' }, labels: { light: 'مرقق (ز)', heavy: 'مفخم (ظ)' } }
  ],
  'س': [
      { type: 'visual', target: 'س', compareWith: 'ش', dots: { target: 'بدون نقاط', compare: '٣ نقاط فوق' } },
      { type: 'sound', target: 'س', compareWith: 'ص', weight: { light: 'س', heavy: 'ص' }, labels: { light: 'مرقق (س)', heavy: 'مفخم (ص)' } },
      { type: 'sound', target: 'س', compareWith: 'ث', weight: { light: 'س', heavy: 'ث' }, labels: { light: 'صفير (س)', heavy: 'لثوي (ث)' } }
  ],
  'ش': [
      { type: 'visual', target: 'ش', compareWith: 'س', dots: { target: '٣ نقاط فوق', compare: 'بدون نقاط' } },
      { type: 'visual', target: 'ش', compareWith: 'ث', dots: { target: 'لها أسنان', compare: 'شكل طبق' } }
  ],
  'ص': [
      { type: 'visual', target: 'ص', compareWith: 'ض', dots: { target: 'بدون نقاط', compare: 'نقطة فوق' } },
      { type: 'sound', target: 'ص', compareWith: 'س', weight: { light: 'س', heavy: 'ص' }, labels: { light: 'مفخم (ص)', heavy: 'مرقق (س)' } }
  ],
  'ض': [
      { type: 'visual', target: 'ض', compareWith: 'ص', dots: { target: 'نقطة فوق', compare: 'بدون نقاط' } },
      { type: 'sound', target: 'ض', compareWith: 'د', weight: { light: 'ض', heavy: 'د' }, labels: { light: 'مفخم (ض)', heavy: 'مرقق (د)' } }
  ],
  'ط': [
      { type: 'visual', target: 'ط', compareWith: 'ظ', dots: { target: 'بدون نقاط', compare: 'نقطة فوق' } },
      { type: 'sound', target: 'ط', compareWith: 'ت', weight: { light: 'ط', heavy: 'ت' }, labels: { light: 'مفخم (ط)', heavy: 'مرقق (ت)' } }
  ],
  'ظ': [
      { type: 'visual', target: 'ظ', compareWith: 'ط', dots: { target: 'نقطة فوق', compare: 'بدون نقاط' } },
      { type: 'sound', target: 'ظ', compareWith: 'ذ', weight: { light: 'ظ', heavy: 'ذ' }, labels: { light: 'مفخم (ظ)', heavy: 'مرقق (ذ)' } },
      { type: 'sound', target: 'ظ', compareWith: 'ز', weight: { light: 'ظ', heavy: 'ز' }, labels: { light: 'مفخم (ظ)', heavy: 'مرقق (ز)' } }
  ],
  'ع': [
      { type: 'visual', target: 'ع', compareWith: 'غ', dots: { target: 'بدون نقاط', compare: 'نقطة فوق' } },
      { type: 'sound', target: 'ع', compareWith: 'ح', weight: { light: 'ع', heavy: 'ح' }, labels: { light: 'مجهور (ع)', heavy: 'مهموس (ح)' } }
  ],
  'غ': [
      { type: 'visual', target: 'غ', compareWith: 'ع', dots: { target: 'نقطة فوق', compare: 'بدون نقاط' } },
      { type: 'visual', target: 'غ', compareWith: 'ف', dots: { target: 'نصف دائرة', compare: 'لها رقبة' } },
      { type: 'sound', target: 'غ', compareWith: 'خ', weight: { light: 'غ', heavy: 'خ' }, labels: { light: 'مجهور (غ)', heavy: 'مهموس (خ)' } }
  ],
  'ف': [
      { type: 'visual', target: 'ف', compareWith: 'ق', dots: { target: 'نقطة واحدة', compare: 'نقطتان' } },
      { type: 'visual', target: 'ف', compareWith: 'غ', dots: { target: 'لها رقبة', compare: 'نصف دائرة' } },
      { type: 'sound', target: 'ف', compareWith: 'ث', weight: { light: 'ف', heavy: 'ث' }, labels: { light: 'من الشفة (ف)', heavy: 'من اللثة (ث)' } }
  ],
  'ق': [
      { type: 'visual', target: 'ق', compareWith: 'ف', dots: { target: 'نقطتان', compare: 'نقطة واحدة' } },
      { type: 'sound', target: 'ق', compareWith: 'ك', weight: { light: 'ق', heavy: 'ك' }, labels: { light: 'مفخم (ق)', heavy: 'مرقق (ك)' } }
  ],
  'ك': [
      { type: 'visual', target: 'ك', compareWith: 'ل', dots: { target: 'بداخلها همزة', compare: 'بدون همزة' } },
      { type: 'sound', target: 'ك', compareWith: 'ق', weight: { light: 'ك', heavy: 'ق' }, labels: { light: 'مرقق (ك)', heavy: 'مفخم (ق)' } }
  ],
  'ل': [
      { type: 'visual', target: 'ل', compareWith: 'ك', dots: { target: 'بدون همزة', compare: 'بداخلها همزة' } },
      { type: 'sound', target: 'ل', compareWith: 'ر', weight: { light: 'ل', heavy: 'ر' }, labels: { light: 'انحراف (ل)', heavy: 'تكرار (ر)' } }
  ],
  'م': { type: 'visual', target: 'م', compareWith: 'هـ', dots: { target: 'دائرة مغلقة', compare: 'دائرتان' } },
  'ن': [
      { type: 'visual', target: 'ن', compareWith: 'ب', dots: { target: 'نقطة فوق', compare: 'نقطة تحت' } },
      { type: 'visual', target: 'ن', compareWith: 'ذ', dots: { target: 'طبق غويط', compare: 'لا تنزل عن السطر' } }
  ],
  'هـ': [
      { type: 'visual', target: 'هـ', compareWith: 'ة', dots: { target: 'بدون نقاط', compare: 'نقطتان فوق' } },
      { type: 'sound', target: 'هـ', compareWith: 'ح', weight: { light: 'هـ', heavy: 'ح' }, labels: { light: 'أقصى الحلق (هـ)', heavy: 'وسط الحلق (ح)' } }
  ],
  'و': { type: 'visual', target: 'و', compareWith: 'ر', dots: { target: 'برأس دائرية', compare: 'بدون رأس' } },
  'ي': [
      { type: 'visual', target: 'ي', compareWith: 'ت', dots: { target: 'نقطتان تحت', compare: 'نقطتان فوق' } },
      { type: 'visual', target: 'ي', compareWith: 'ث', dots: { target: 'نقطتان تحت', compare: '٣ نقاط فوق' } }
  ]
};

/* ============================================================
   BUILD lettersDB from FULL_DB
============================================================ */
const lettersDB = {};

function buildCards(letter, words) {
  return words.map(word => {
    let p = [];
    for (let i = 0; i < word.length; i++) {
      if ('َُِّْ'.includes(word[i])) {
        if (p.length > 0) p[p.length - 1] += word[i];
      } else {
        p.push(word[i]);
      }
    }
    const check = ch => {
      if (!ch) return false;
      if (letter === 'أ') return /[أإآا]/.test(ch);
      if (letter === 'هـ') return /[هة]/.test(ch);
      if (letter === 'ي') return /[يىئ]/.test(ch);
      return ch.includes(letter);
    };
    return {
      l1:p[0]||'', hl1:check(p[0]),
      l2:p[1]||'', hl2:check(p[1]),
      l3:p[2]||'', hl3:check(p[2])
    };
  });
}

ARABIC_LETTERS.forEach(letter => {
  const d = FULL_DB[letter];
  lettersDB[letter] = {
    symbol:        letter,
    shapes:        d.shapes,
    jollyStory:    d.jollyStory,
    jollyAction:   d.jollyAction,
    jollyRawSound: d.jollyRawSound,
    jollyArabic:   d.jollyArabic,
    storyIcon:     d.storyIcon,
    storyText:     d.storyText,
    cardWords:     d.cardWords,
    splitWords:    d.splitWords,
    xoWords:       d.xoWords,
    missingWords:  d.missingWords,
    quranText:     QURAN_VERSES[letter] || '',
    cards:         buildCards(letter, d.splitWords.slice(0, 9)),
    detective:     DETECTIVE_DATA[letter] // 👈 السر هنا! تم الربط بالقاعدة الشاملة
  };
});
  /* ============================================================
     SPLIT WORD FORMATTER
  ============================================================ */
  function formatSplitWord(word) {
    let p = [];
    for (let i = 0; i < word.length; i++) {
      if ('ًٌٍَُِّْٰٓ'.includes(word[i])) {
        if (p.length > 0) p[p.length - 1] += word[i];
      } else {
        p.push(word[i]);
      }
    }
    const l1 = p[0] || '', l2 = p[1] || '', l3 = p.slice(2).join('');
    const c1 = !RAFISA.some(c => l1.includes(c));
    const c2 = !RAFISA.some(c => l2.includes(c));
    return {
      w1: l1 + (c1 ? 'ـ' : ''),
      w2: (c1 ? 'ـ' : '') + l2 + (c2 ? 'ـ' : ''),
      w3: (c2 ? 'ـ' : '') + l3
    };
  }

  /* ============================================================
     FATH AL-RAHMAN TWO-LETTER GENERATOR
  ============================================================ */
  function generateFathAlRahmanPairs(targetLetter) {
    const idx = ARABIC_LETTERS.indexOf(targetLetter);
    let vowels = ['َ'];
    if (idx >= ARABIC_LETTERS.indexOf('ز')) vowels.push('ِ');
    if (idx >= ARABIC_LETTERS.indexOf('غ')) vowels.push('ُ');
    const rnd = () => vowels[Math.floor(Math.random() * vowels.length)];
    let pairs = [];
    let availableLetters = ARABIC_LETTERS.slice(0, idx + 1);
    for (let i = 0; i < 12; i++) {
      let randomPrev = availableLetters[Math.floor(Math.random() * availableLetters.length)];
      if (Math.random() > 0.5) {
        pairs.push({ c1: targetLetter + rnd(), c2: randomPrev + rnd() });
      } else {
        pairs.push({ c1: randomPrev + rnd(), c2: targetLetter + rnd() });
      }
    }
    return pairs;
  }



  /* ================================================================
   DATA & UI FUNCTIONS FOR SHADDA & TANWEEN
================================================================ */
const SHADDA_DATA = {
  words_fatha: ['رَبَّ','مَدَّ','شَدَّ','مَرَّ','حَقَّ','أَحَبَّ','قِطَّة','بَطَّة','سَلَّمَ'],
  words_damma: ['أُمُّ','جَدُّ','حُبُّ','لُبُّ','عُشُّ','دُبُّ'],
  words_kasra: ['رَبِّ','حَقِّ','سِرِّ','بِرِّ','ظِلِّ','طِبِّ'],
  missing: [
    {display:'رَب<span class="missing-gap"></span>',correct:0,opts:['َّ','ُّ','ِّ']},
    {display:'أُم<span class="missing-gap"></span>',correct:1,opts:['َّ','ُّ','ِّ']},
    {display:'حَق<span class="missing-gap"></span>',correct:2,opts:['َّ','ُّ','ِّ']},
    {display:'قِط<span class="missing-gap"></span>ةٌ',correct:0,opts:['َّ','ُّ','ِّ']},
  ],
  xoWords:['رَبَّ','مَدَّ','شَدَّ','مَرَّ','حَقَّ','أُمُّ','جَدُّ','حَقِّ','سِرِّ'],
  storyText:'رَبَّى مُعَلِّمٌ صغيرًا على القراءة. مَرَّ الولدُ بجانب قِطَّةٍ، ثم قال: أُمِّي تُحِبُّني، وجَدِّي يَقُصُّ حِكايةً فيها شَدَّةٌ واضِحَةٌ.',
  quranText:'﴿ رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا ۝ وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۝ إِنَّكَ أَنتَ الْوَهَّابُ ﴾'
};

const TANWEEN_DATA = {
  syllables: [
    {mark:'ً',label:'فتحتان',words:['كِتَابًا','قَلَمًا','بَيْتًا','رَجُلًا','نَهَارًا','جَبَلًا']},
    {mark:'ٌ',label:'ضمتان', words:['كِتَابٌ','قَلَمٌ','بَيْتٌ','رَجُلٌ','نَهَارٌ','جَبَلٌ']},
    {mark:'ٍ',label:'كسرتان',words:['كِتَابٍ','قَلَمٍ','بَيْتٍ','رَجُلٍ','نَهَارٍ','جَبَلٍ']}
  ],
  missing:[
    {display:'كِتَابًا = كِتَابَ + <span class="missing-gap"></span>',correct:0,opts:['نْ','مْ','لْ']},
    {display:'قَلَمٌ = قَلَمُ + <span class="missing-gap"></span>',correct:0,opts:['نْ','مْ','لْ']},
    {display:'بَيْتٍ = بَيْتِ + <span class="missing-gap"></span>',correct:0,opts:['نْ','مْ','لْ']},
    {display:'رَجُلًا = رَجُلَ + <span class="missing-gap"></span>',correct:0,opts:['نْ','مْ','لْ']},
  ],
  xoWords:['كِتَابًا','قَلَمٌ','بَيْتٍ','رَجُلًا','نَهَارٌ','جَبَلٍ','مَاءً','هَوَاءٌ','ضَوْءٍ'],
  storyText:'قَرَأَ وَلَدٌ كِتَابًا جَمِيلًا، ثُمَّ كَتَبَ بِقَلَمٍ أَزْرَقَ جُمْلَةً قَصِيرَةً. فِي الدَّفْتَرِ بَيْتٌ صَغِيرٌ وَشَجَرَةٌ عَالِيَةٌ.',
  quranText:'﴿ فِيهَا كُتُبٌ قَيِّمَةٌ ۝ رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً ۝ فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ ﴾'
};
/* ============================================================
   SURVIVAL KIT — مفردات بقاء تدريجية
   ============================================================
   📌 القاعدة: كل حرف له فعل واسمان، والكلمات تستخدم فقط
      الحروف التي تعلّمها الطالب قبلها (تراكمية).
   📌 الحركات تُضاف تدريجياً:
      حروف 1-7 (أ→خ):  فتحة فقط
      حروف 8-14 (د→ع): فتحة + كسرة
      حروف 15+ (غ→ي):  فتحة + كسرة + ضمة
   ============================================================ */
const SURVIVAL_KIT = {
  'أ': {
    verb:  { ar: 'أَكَلَ',  en: 'He ate',    icon: '🍽️', lottie: 'eating.json' },
    nouns: [
      { ar: 'أَبٌ',   en: 'Father',  icon: '👨', emoji: true },
      { ar: 'أُذُنٌ', en: 'Ear',     icon: '👂', emoji: true },
    ]
  },
  'ب': {
    verb:  { ar: 'بَكَى',  en: 'He cried',  icon: '😢', lottie: 'crying.json' },
    nouns: [
      { ar: 'بَابٌ',  en: 'Door',    icon: '🚪', emoji: true },
      { ar: 'بَيْتٌ', en: 'House',   icon: '🏠', emoji: true },
    ]
  },
  'ت': {
    verb:  { ar: 'تَبِعَ', en: 'He followed', icon: '🚶', lottie: 'walk.json' },
    nouns: [
      { ar: 'تُفَّاحٌ', en: 'Apple',   icon: '🍎', emoji: true },
      { ar: 'تَاجٌ',    en: 'Crown',   icon: '👑', emoji: true },
    ]
  },
  'ث': {
    verb:  { ar: 'ثَقُلَ', en: 'It was heavy', icon: '⚖️', lottie: null },
    nouns: [
      { ar: 'ثَعْلَبٌ', en: 'Fox',    icon: '🦊', emoji: true },
      { ar: 'ثَوْبٌ',   en: 'Garment', icon: '👘', emoji: true },
    ]
  },
  'ج': {
    verb:  { ar: 'جَرَى',  en: 'He ran',    icon: '🏃', lottie: 'run.json' },
    nouns: [
      { ar: 'جَبَلٌ',  en: 'Mountain', icon: '⛰️', emoji: true },
      { ar: 'جَمَلٌ',  en: 'Camel',    icon: '🐪', emoji: true },
    ]
  },
  'ح': {
    verb:  { ar: 'حَمَلَ', en: 'He carried', icon: '📦', lottie: 'carry.json' },
    nouns: [
      { ar: 'حِصَانٌ', en: 'Horse',   icon: '🐎', emoji: true },
      { ar: 'حَقِيبَةٌ', en: 'Bag',   icon: '🎒', emoji: true },
    ]
  },
  'خ': {
    verb:  { ar: 'خَرَجَ', en: 'He exited',  icon: '🚪', lottie: 'exit.json' },
    nouns: [
      { ar: 'خُبْزٌ',   en: 'Bread',  icon: '🍞', emoji: true },
      { ar: 'خَيْمَةٌ', en: 'Tent',   icon: '⛺', emoji: true },
    ]
  },
  'د': {
    verb:  { ar: 'دَخَلَ', en: 'He entered', icon: '🏠', lottie: 'enter.json' },
    nouns: [
      { ar: 'دَرَّاجَةٌ', en: 'Bicycle', icon: '🚲', emoji: true },
      { ar: 'دَجَاجٌ',    en: 'Chicken', icon: '🐔', emoji: true },
    ]
  },
  'ذ': {
    verb:  { ar: 'ذَهَبَ', en: 'He went',   icon: '🚶', lottie: 'go.json' },
    nouns: [
      { ar: 'ذِئْبٌ',  en: 'Wolf',     icon: '🐺', emoji: true },
      { ar: 'ذَهَبٌ',  en: 'Gold',     icon: '🪙', emoji: true },
    ]
  },
  'ر': {
    verb:  { ar: 'رَسَمَ', en: 'He drew',   icon: '🎨', lottie: 'draw.json' },
    nouns: [
      { ar: 'رَأْسٌ',  en: 'Head',     icon: '🧠', emoji: true },
      { ar: 'رِجْلٌ',  en: 'Leg',      icon: '🦵', emoji: true },
    ]
  },
  'ز': {
    verb:  { ar: 'زَرَعَ', en: 'He planted', icon: '🌱', lottie: 'plant.json' },
    nouns: [
      { ar: 'زَهْرَةٌ', en: 'Flower',  icon: '🌸', emoji: true },
      { ar: 'زَيْتُونٌ', en: 'Olive',  icon: '🫒', emoji: true },
    ]
  },
  'س': {
    verb:  { ar: 'سَمِعَ', en: 'He heard',   icon: '👂', lottie: 'hear.json' },
    nouns: [
      { ar: 'سَمَكٌ',    en: 'Fish',   icon: '🐟', emoji: true },
      { ar: 'سَيَّارَةٌ', en: 'Car',   icon: '🚗', emoji: true },
    ]
  },
  'ش': {
    verb:  { ar: 'شَرِبَ', en: 'He drank',   icon: '🥤', lottie: 'drink.json' },
    nouns: [
      { ar: 'شَجَرَةٌ', en: 'Tree',    icon: '🌳', emoji: true },
      { ar: 'شَمْسٌ',   en: 'Sun',     icon: '☀️', emoji: true },
    ]
  },
  'ص': {
    verb:  { ar: 'صَنَعَ', en: 'He made',    icon: '🔨', lottie: 'make.json' },
    nouns: [
      { ar: 'صَحْنٌ',   en: 'Plate',   icon: '🍽️', emoji: true },
      { ar: 'صَارُوخٌ', en: 'Rocket',  icon: '🚀', emoji: true },
    ]
  },
  'ض': {
    verb:  { ar: 'ضَحِكَ', en: 'He laughed', icon: '😂', lottie: 'laugh.json' },
    nouns: [
      { ar: 'ضِفْدَعٌ', en: 'Frog',    icon: '🐸', emoji: true },
      { ar: 'ضَوْءٌ',   en: 'Light',   icon: '💡', emoji: true },
    ]
  },
  'ط': {
    verb:  { ar: 'طَارَ',  en: 'He flew',    icon: '✈️', lottie: 'fly.json' },
    nouns: [
      { ar: 'طَائِرَةٌ', en: 'Airplane', icon: '✈️', emoji: true },
      { ar: 'طِفْلٌ',    en: 'Child',    icon: '👶', emoji: true },
    ]
  },
  'ظ': {
    verb:  { ar: 'ظَهَرَ', en: 'He appeared', icon: '👁️', lottie: null },
    nouns: [
      { ar: 'ظَرْفٌ',   en: 'Envelope', icon: '✉️', emoji: true },
      { ar: 'ظِلٌّ',    en: 'Shadow',   icon: '🌑', emoji: true },
    ]
  },
  'ع': {
    verb:  { ar: 'عَمِلَ', en: 'He worked',  icon: '💼', lottie: 'work.json' },
    nouns: [
      { ar: 'عَيْنٌ',  en: 'Eye',      icon: '👁️', emoji: true },
      { ar: 'عِنَبٌ',  en: 'Grapes',   icon: '🍇', emoji: true },
    ]
  },
  'غ': {
    verb:  { ar: 'غَسَلَ', en: 'He washed',  icon: '🚿', lottie: 'wash.json' },
    nouns: [
      { ar: 'غُرَابٌ',  en: 'Crow',    icon: '🐦‍⬛', emoji: true },
      { ar: 'غُرْفَةٌ', en: 'Room',    icon: '🛏️', emoji: true },
    ]
  },
  'ف': {
    verb:  { ar: 'فَتَحَ', en: 'He opened',  icon: '🚪', lottie: 'open.json' },
    nouns: [
      { ar: 'فَرَاشَةٌ', en: 'Butterfly', icon: '🦋', emoji: true },
      { ar: 'فِيلٌ',     en: 'Elephant',  icon: '🐘', emoji: true },
    ]
  },
  'ق': {
    verb:  { ar: 'قَرَأَ', en: 'He read',    icon: '📖', lottie: 'read.json' },
    nouns: [
      { ar: 'قِطَارٌ',  en: 'Train',   icon: '🚆', emoji: true },
      { ar: 'قَلَمٌ',   en: 'Pen',     icon: '✏️', emoji: true },
    ]
  },
  'ك': {
    verb:  { ar: 'كَتَبَ', en: 'He wrote',   icon: '✍️', lottie: 'write.json' },
    nouns: [
      { ar: 'كَلْبٌ',   en: 'Dog',     icon: '🐕', emoji: true },
      { ar: 'كِتَابٌ',  en: 'Book',    icon: '📚', emoji: true },
    ]
  },
  'ل': {
    verb:  { ar: 'لَعِبَ', en: 'He played',  icon: '⚽', lottie: 'play.json' },
    nouns: [
      { ar: 'لَيْمُونٌ', en: 'Lemon',   icon: '🍋', emoji: true },
      { ar: 'لِسَانٌ',   en: 'Tongue',  icon: '👅', emoji: true },
    ]
  },
  'م': {
    verb:  { ar: 'مَشَى',  en: 'He walked',  icon: '🚶', lottie: 'walk.json' },
    nouns: [
      { ar: 'مَاءٌ',    en: 'Water',   icon: '💧', emoji: true },
      { ar: 'مَدْرَسَةٌ', en: 'School', icon: '🏫', emoji: true },
    ]
  },
  'ن': {
    verb:  { ar: 'نَامَ',  en: 'He slept',   icon: '😴', lottie: 'sleep.json' },
    nouns: [
      { ar: 'نَهَرٌ',   en: 'River',   icon: '🏞️', emoji: true },
      { ar: 'نَجْمٌ',   en: 'Star',    icon: '⭐', emoji: true },
    ]
  },
  'هـ': {
    verb:  { ar: 'هَرَبَ', en: 'He escaped', icon: '🏃', lottie: 'run.json' },
    nouns: [
      { ar: 'هِلَالٌ',    en: 'Crescent', icon: '🌙', emoji: true },
      { ar: 'هِرَّةٌ',    en: 'Cat',      icon: '🐱', emoji: true },
    ]
  },
  'و': {
    verb:  { ar: 'وَقَفَ', en: 'He stood',   icon: '🧍', lottie: 'stand.json' },
    nouns: [
      { ar: 'وَرْدَةٌ',  en: 'Rose',    icon: '🌹', emoji: true },
      { ar: 'وَلَدٌ',    en: 'Boy',     icon: '👦', emoji: true },
    ]
  },
  'ي': {
    verb:  { ar: 'يَلْعَبُ', en: 'He plays',  icon: '🎮', lottie: 'play.json' },
    nouns: [
      { ar: 'يَدٌ',    en: 'Hand',     icon: '✋', emoji: true },
      { ar: 'يَمَامٌ',  en: 'Dove',    icon: '🕊️', emoji: true },
    ]
  },
};

/* ----------------------------------------------------------
   getAvailableHarakat — يُحدد الحركات المتاحة لكل حرف
   حروف 1-7:  فتحة فقط
   حروف 8-14: + كسرة
   حروف 15+:  + ضمة
   ---------------------------------------------------------- */
function getAvailableHarakat(letterKey) {
  const idx = ARABIC_LETTERS.indexOf(letterKey);
  if (idx < 0) return ['َ'];
  if (idx < 7)  return ['َ'];            // 1-7: فتحة فقط
  if (idx < 14) return ['َ', 'ِ'];      // 8-14: + كسرة
  return ['َ', 'ِ', 'ُ'];              // 15+: الثلاثة
}



/* ════════════════════════════════════════════════════════════
   📄 state.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   STATE.JS — مركز إدارة الحالة العامة للتطبيق
   ============================================================
   📌 كل المتغيرات العامة المشتركة بين الملفات تُعرَّف هنا
      - لا تُعرِّف متغيرات عامة في ملفات أخرى
      - UNLOCK_COST معرَّف في database.js — لا تُعيد تعريفه هنا
      - WIN_PATTERNS مُعرَّف هنا ويُستخدم في mini-games.js
   ============================================================ */

/* ----------------------------------------------------------
   1. حالة اللاعب
   ---------------------------------------------------------- */
let studentCode    = '';
let studentEmail   = '';
let currentUser    = null;
let playerProgress = {
  unlocked:  ['أ'],   // الحروف المفتوحة
  stars:     0,       // إجمالي النجوم
  completed: []       // الحروف المكتملة
};
let activeLetterKey = ''; // الحرف المفتوح حالياً

const SUPABASE_URL = 'https://oxknepxwnsgsphhklplm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YYDRjNE2GUdRpQqFfA5LEg_eIVrx_0X';
const SUPABASE_PROGRESS_TABLE = 'student_progress';
const GOOGLE_SIGN_IN_ENABLED = false;
const REMOTE_SUPABASE_ENABLED = false;
const DEFAULT_PLAYER_PROGRESS = { unlocked: ['أ'], stars: 0, completed: [] };
const supabaseClient = REMOTE_SUPABASE_ENABLED && window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

function normalizeProgress(progress) {
  const source = progress && typeof progress === 'object' ? progress : {};
  return {
    unlocked: Array.isArray(source.unlocked) && source.unlocked.length ? source.unlocked : ['أ'],
    stars: Number.isFinite(Number(source.stars)) ? Number(source.stars) : 0,
    completed: Array.isArray(source.completed) ? source.completed : [],
    verbLab: normalizeVerbLabProgress(source.verbLab),
  };
}

function normalizeVerbLabProgress(progress) {
  const source = progress && typeof progress === 'object' ? progress : {};
  return {
    unlocked: Array.isArray(source.unlocked) && source.unlocked.length ? [...new Set(source.unlocked)] : ['v1'],
    stars: Number.isFinite(Number(source.stars)) ? Number(source.stars) : 0,
    completed: Array.isArray(source.completed) ? [...new Set(source.completed)] : [],
    achievements: Array.isArray(source.achievements) ? [...new Set(source.achievements)] : [],
  };
}

function loadLocalProgress(code) {
  try {
    const saved = localStorage.getItem('jami3_' + code);
    return saved ? normalizeProgress(JSON.parse(saved)) : normalizeProgress(DEFAULT_PLAYER_PROGRESS);
  } catch (e) {
    return normalizeProgress(DEFAULT_PLAYER_PROGRESS);
  }
}

function saveLocalProgress(code, progress) {
  if (!code) return;
  try {
    localStorage.setItem('jami3_' + code, JSON.stringify(normalizeProgress(progress)));
  } catch (e) {
    // localStorage ممتلئ أو محجوب — نكتفي بالتخزين السحابي عند الإمكان
  }
}

async function loadProgressOnline(code) {
  if (!supabaseClient || !code) return null;
  const session = getCurrentJameaSession();
  let query = supabaseClient
    .from(SUPABASE_PROGRESS_TABLE)
    .select('progress');

  if (session && session.activeChildId && isUuid(session.activeChildId)) {
    query = query.eq('child_profile_id', session.activeChildId);
  } else {
    query = query.eq('student_code', code);
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  return data && data.progress ? normalizeProgress(data.progress) : null;
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''));
}

function getProgressOwnerFields() {
  const session = getCurrentJameaSession();
  const fields = {};
  if (session && session.activeChildId && isUuid(session.activeChildId)) {
    fields.child_profile_id = session.activeChildId;
  }
  if (session && session.parentProfileId && isUuid(session.parentProfileId)) {
    fields.parent_profile_id = session.parentProfileId;
  }
  return fields;
}

async function loadProgressOnlineLegacy(code) {
  if (!supabaseClient || !code) return null;
  const { data, error } = await supabaseClient
    .from(SUPABASE_PROGRESS_TABLE)
    .select('progress')
    .eq('student_code', code)
    .maybeSingle();

  if (error) throw error;
  return data && data.progress ? normalizeProgress(data.progress) : null;
}

async function saveProgressOnline() {
  if (!supabaseClient || !studentCode) return false;
  const payload = Object.assign({
    student_code: studentCode,
    progress: normalizeProgress(playerProgress),
  }, getProgressOwnerFields());
  const { error } = await supabaseClient
    .from(SUPABASE_PROGRESS_TABLE)
    .upsert(payload, { onConflict: 'student_code' });

  if (error) throw error;
  return true;
}

function getLoginIdentity(rawValue) {
  const value = (rawValue || '').trim();
  const email = value.includes('@') ? value.toLowerCase() : '';
  return {
    code: email || value || 'guest',
    email,
    user: email ? { id: 'email:' + email, email } : null,
  };
}

function getJameaAuth() {
  return window.JameaAuth || null;
}

function getCurrentJameaSession() {
  const auth = getJameaAuth();
  return auth ? auth.loadSession() : (window.jameaSession || null);
}

function applyUnifiedSession(session) {
  const auth = getJameaAuth();
  const normalized = auth ? auth.saveSession(session) : session;
  if (!normalized) return null;

  studentCode = normalized.studentCode || normalized.activeChildId || normalized.profileId || 'guest';
  studentEmail = normalized.studentEmail || (normalized.role === 'parent' ? normalized.parentEmail : '');
  currentUser = {
    id: normalized.profileId || studentCode,
    email: studentEmail,
    role: normalized.role || 'student',
    parentProfileId: normalized.parentProfileId || '',
  };

  window.jameaSession = normalized;
  window.studentCode = studentCode;
  window.studentEmail = studentEmail;
  updateStudentLabels(normalized.activeChildName || normalized.displayName || studentEmail || studentCode);
  renderParentPanel();
  return normalized;
}

function setActiveStudent(identity) {
  const auth = getJameaAuth();
  if (auth) {
    return applyUnifiedSession(auth.createGuestStudentSession(identity.code || identity.email || 'guest'));
  }

  studentCode = identity.code || 'guest';
  studentEmail = identity.email || '';
  currentUser = identity.user || (studentEmail ? { id: 'email:' + studentEmail, email: studentEmail } : null);
  window.studentCode = studentCode;
  window.studentEmail = studentEmail;
  return null;
}

function updateStudentLabels(label) {
  const display = label || studentEmail || studentCode || 'Student';
  const studentNameEl = document.getElementById('studentName');
  const navNameEl = document.getElementById('nav-student-name');
  const tabNameEl = document.getElementById('tab-name');
  if (studentNameEl) studentNameEl.textContent = display;
  if (navNameEl) navNameEl.textContent = display;
  if (tabNameEl) tabNameEl.textContent = display;
}

function openMainDashboardAfterLogin() {
  const loginOverlay = document.getElementById('login-overlay');
  const dashboard = document.getElementById('dashboard-screen');
  if (loginOverlay) loginOverlay.style.display = 'none';
  if (dashboard) {
    dashboard.style.display = 'block';
    _pushRoute('#dashboard');
  }
  if (typeof _navInit === 'function') setTimeout(function(){ _navInit(studentEmail || studentCode || 'Student'); }, 50);
  updateStarsUI();
  initApp();
}

function renderParentPanel() {
  const panel = document.getElementById('parent-control-panel');
  if (!panel) return;

  const session = getCurrentJameaSession();
  const isParent = session && session.role === 'parent';
  panel.hidden = !isParent;
  if (!isParent) return;

  const subtitle = document.getElementById('parent-panel-subtitle');
  if (subtitle) subtitle.textContent = 'Signed in as ' + (session.parentEmail || session.displayName || 'Parent') + '. Create child access codes and enter student mode safely.';

  const list = document.getElementById('parentChildrenList');
  if (!list) return;

  const auth = getJameaAuth();
  const children = auth ? auth.childrenForParent(session) : [];
  if (!children.length) {
    list.innerHTML = '<div class="child-profile-row"><span class="child-profile-name">No child profiles yet.</span></div>';
    return;
  }

  list.innerHTML = children.map(function(child) {
    return '<div class="child-profile-row">'
      + '<span class="child-profile-name"><i class="fas fa-child"></i> ' + escapeHtml(child.displayName || 'Student') + '</span>'
      + '<button class="btn-secondary" type="button" onclick="enterChildProfile(&quot;' + escapeHtml(child.id) + '&quot;)">Enter Student Mode <i class="fas fa-arrow-right"></i></button>'
      + '</div>';
  }).join('');
}

function setParentSyncStatus(message, state) {
  const el = document.getElementById('parentSyncStatus');
  if (!el) return;
  el.textContent = message || '';
  el.classList.remove('ok', 'warn', 'error');
  if (state) el.classList.add(state);
}

async function syncParentRemoteData(session) {
  const auth = getJameaAuth();
  const normalized = session || getCurrentJameaSession();
  if (!auth || !normalized || normalized.role !== 'parent') return;
  setParentSyncStatus('Checking secure Supabase sync...', 'warn');
  const remoteUser = await auth.getRemoteUser();
  if (!remoteUser) {
    setParentSyncStatus('Local mode ready. Use the email magic link to enable secure cloud sync.', 'warn');
    return;
  }
  const upgraded = await auth.ensureRemoteParentProfile(normalized);
  const activeSession = upgraded ? applyUnifiedSession(upgraded) : getCurrentJameaSession();
  await auth.loadRemoteChildren(activeSession);
  setParentSyncStatus('Secure cloud sync active for this parent account.', 'ok');
  renderParentPanel();
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function(ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

async function createChildProfileFromUi() {
  const auth = getJameaAuth();
  const errorEl = document.getElementById('loginError');
  const resultEl = document.getElementById('childCodeResult');
  const input = document.getElementById('childNameInput');
  const session = getCurrentJameaSession();

  if (!auth || !session || session.role !== 'parent') {
    if (resultEl) resultEl.textContent = 'Please continue as a parent first.';
    return false;
  }

  try {
    setParentSyncStatus('Creating child profile...', 'warn');
    const created = await auth.createChildProfile(session, input && input.value ? input.value : 'Student');
    if (input) input.value = '';
    if (resultEl) resultEl.textContent = 'New child code: ' + created.code + ' . Save it now; it is shown once.';
    setParentSyncStatus(created.child && created.child.remoteSynced ? 'Child profile saved securely in Supabase.' : 'Child profile saved locally on this device.', created.child && created.child.remoteSynced ? 'ok' : 'warn');
    if (errorEl) errorEl.textContent = '';
    renderParentPanel();
    return true;
  } catch (e) {
    if (resultEl) resultEl.textContent = '';
    if (errorEl) errorEl.textContent = e.message || 'Could not create child profile.';
    setParentSyncStatus('Could not create child profile.', 'error');
    return false;
  }
}

function enterChildProfile(childId) {
  const auth = getJameaAuth();
  const children = auth ? auth.childrenForParent(getCurrentJameaSession()) : [];
  const child = children.find(function(item) { return item.id === childId; });
  if (!child || !auth) return false;

  const session = applyUnifiedSession(auth.createStudentSessionFromChild(child));
  playerProgress = loadLocalProgress(studentCode);
  saveLocalProgress(studentCode, playerProgress);
  updateStudentLabels(session.activeChildName || session.displayName);
  renderParentPanel();
  openMainDashboardAfterLogin();
  syncProgressInBackground();
  return true;
}

function syncProgressInBackground() {
  loadProgressOnline(studentCode).then(function(onlineProgress) {
    if (onlineProgress) {
      playerProgress = onlineProgress;
      saveLocalProgress(studentCode, playerProgress);
      updateStarsUI();
      initApp();
      sendVerbLabSession();
    } else {
      saveProgressOnline().catch(function(e) {
        console.warn('Supabase initial save failed:', e);
      });
    }
  }).catch(function(e) {
    console.warn('Supabase load failed, using local progress:', e);
  });
}

async function loginWithGoogle() {
  const errorEl = document.getElementById('loginError');
  if (!GOOGLE_SIGN_IN_ENABLED) {
    if (errorEl) errorEl.textContent = '';
    return false;
  }

  if (!supabaseClient || !supabaseClient.auth) {
    if (errorEl) errorEl.textContent = 'Google sign-in is unavailable. Use email or student code.';
    return false;
  }

  if (errorEl) errorEl.textContent = 'Opening Google sign-in...';
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
    },
  });

  if (error && errorEl) {
    errorEl.textContent = error.message || 'Google sign-in failed.';
  }
  return !error;
}

function updateGoogleSignInUi() {
  const googleButton = document.querySelector('.login-google-btn');
  const divider = document.querySelector('.login-divider');
  const errorEl = document.getElementById('loginError');
  const display = GOOGLE_SIGN_IN_ENABLED ? '' : 'none';
  if (googleButton) googleButton.style.display = display;
  if (divider) divider.style.display = display;
  if (!GOOGLE_SIGN_IN_ENABLED && errorEl) errorEl.textContent = '';
}

async function restoreAuthSession() {
  const auth = getJameaAuth();
  const savedSession = auth ? auth.loadSession() : null;
  const remoteUser = auth ? await auth.getRemoteUser() : null;
  if (remoteUser && auth) {
    const email = (remoteUser.email || savedSession?.parentEmail || '').toLowerCase();
    if (email) {
      const session = applyUnifiedSession(auth.createParentSession(email, { profileId: remoteUser.id || undefined }));
      openMainDashboardAfterLogin();
      renderParentPanel();
      syncParentRemoteData(session);
      return true;
    }
  }

  if (savedSession) {
    const session = applyUnifiedSession(savedSession);
    if (session && session.role === 'student') {
      playerProgress = loadLocalProgress(studentCode);
      openMainDashboardAfterLogin();
      syncProgressInBackground();
    } else if (session && session.role === 'parent') {
      openMainDashboardAfterLogin();
      renderParentPanel();
      syncParentRemoteData(session);
    }
    return true;
  }

  if (!supabaseClient || !supabaseClient.auth) return false;
  try {
    const { data } = await supabaseClient.auth.getSession();
    const user = data && data.session && data.session.user;
    if (!user) return false;

    const email = (user.email || '').toLowerCase();
    if (auth && email) {
      applyUnifiedSession(auth.createParentSession(email, { profileId: user.id || undefined }));
    } else {
      setActiveStudent({
        code: email || user.id || 'google-user',
        email,
        user: { id: user.id || email, email },
      });
    }
    playerProgress = loadLocalProgress(studentCode);
    updateStudentLabels(email || 'Parent');
    openMainDashboardAfterLogin();
    renderParentPanel();
    syncParentRemoteData(getCurrentJameaSession());
    return true;
  } catch (e) {
    console.warn('Supabase session restore failed:', e);
    return false;
  }
}

/* ----------------------------------------------------------
   2. Phaser — الكائن المركزي للعبة
   يُعرَّف هنا كـ let عادي حتى يمكن تعيينه وتغييره من ui.js
   ---------------------------------------------------------- */
let phaserGame = null;

/* ----------------------------------------------------------
   3. متغيرات الصياد والمفقود
   ---------------------------------------------------------- */
let targetCounts = {
  quran:        { total: 0, found: 0 },
  story:        { total: 0, found: 0 },
  sukoon_quran: { total: 0, found: 0 },
  madd_quran:   { total: 0, found: 0 },
  shadda_quran: { total: 0, found: 0 },
  tanween_quran:{ total: 0, found: 0 },
};
let missingWordsFound = 0;

/* ----------------------------------------------------------
   4. أنماط الفوز في XO — تُستخدم في mini-games.js
   ---------------------------------------------------------- */
const WIN_PATTERNS = [
  [0,1,2],[3,4,5],[6,7,8], // أفقياً
  [0,3,6],[1,4,7],[2,5,8], // عمودياً
  [0,4,8],[2,4,6]          // قطرياً
];


/* ════════════════════════════════════════════════════════════
   📄 audio.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   AUDIO.JS — محرك الصوت
   ============================================================
   📌 يستخدم Web Audio API مباشرة — لا مكتبات خارجية
   📌 كيف تستخدمه؟
      playTone(440, 'sine', 0.2)           → نغمة بسيطة
      playBeep()                           → صوت تأكيد قصير
      playVictorySound()                   → موسيقى الفوز
      playRawSound()                       → صوت الحرف الخام (ثلاث مرات)
   ============================================================ */

/* ----------------------------------------------------------
   إنشاء سياق الصوت — يُنشأ مرة واحدة فقط
   ملاحظة: المتصفحات تمنع تشغيل الصوت قبل تفاعل المستخدم
   ---------------------------------------------------------- */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/* ----------------------------------------------------------
   playTone — تشغيل نغمة مُخصَّصة
   @param {number} freq  - التردد بالهرتز (مثال: 440 = لا)
   @param {string} type  - نوع الموجة: 'sine'|'square'|'triangle'|'sawtooth'
   @param {number} dur   - المدة بالثواني (مثال: 0.2)
   @param {number} vol   - الحجم من 0 إلى 1 (الافتراضي: 0.1)
   ---------------------------------------------------------- */
function playTone(freq, type = 'sine', dur = 0.2, vol = 0.1) {
  try {
    // استيقاظ السياق إذا كان معلقاً بسبب سياسة المتصفح
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    // تلاشي تدريجي لتجنب النقرات المفاجئة
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + dur);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch (e) {
    // تجاهل أخطاء الصوت في صمت — لا توقف تجربة المستخدم
  }
}

/* ----------------------------------------------------------
   playBeep — نقرة قصيرة للتأكيد
   ---------------------------------------------------------- */
function playBeep() {
  playTone(300, 'square', 0.15, 0.1);
}

/* ----------------------------------------------------------
   playRawSound — صوت الحرف الخام (يتكرر ثلاث مرات)
   يُستخدم عند النقر على السيارة أو بطاقة الحرف
   ---------------------------------------------------------- */
function playRawSound() {
  playTone(350, 'sawtooth', 0.2, 0.1);
  setTimeout(() => playTone(350, 'sawtooth', 0.2, 0.1), 300);
  setTimeout(() => playTone(350, 'sawtooth', 0.2, 0.1), 600);
}

/* ----------------------------------------------------------
   playVictorySound — موسيقى الفوز (4 نغمات صاعدة + وتر)
   ---------------------------------------------------------- */
function playVictorySound() {
  const notes = [523.25, 659.25, 783.99, 1046.50]; // Do Mi Sol Do (أوكتاف)
  notes.forEach((freq, i) =>
    setTimeout(() => playTone(freq, 'sine', 0.2, 0.2), i * 100)
  );
  // وتر نهائي بعد النغمات
  setTimeout(() => {
    playTone(523.25, 'triangle', 0.5, 0.15);
    playTone(659.25, 'triangle', 0.5, 0.15);
  }, 450);
}

/* ----------------------------------------------------------
   playErrorSound — صوت الخطأ
   ---------------------------------------------------------- */
function playErrorSound() {
  playTone(200, 'sawtooth', 0.3, 0.15);
}

/* ----------------------------------------------------------
   playConnectSound — صوت التوصيل (سيارات السكون والمد)
   ---------------------------------------------------------- */
function playConnectSound() {
  playTone(400, 'triangle', 0.15, 0.1);
  setTimeout(() => playTone(500, 'triangle', 0.15, 0.1), 120);
}


/* ════════════════════════════════════════════════════════════
   📄 utils.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   UTILS.JS — الأدوات العامة: الحفظ، التقدم، الواجهة
   ============================================================
   📌 يحتوي على:
      - حفظ وتحميل تقدم الطالب من localStorage
      - إضافة النجوم وتحديث الواجهة
      - Toast (الإشعارات المنبثقة)
      - الكونفيتي
      - المصادقة البسيطة (loginStudent)
      - تبديل الثيم الفاتح/الداكن
   ============================================================ */

/* ----------------------------------------------------------
   1. المصادقة البسيطة — يمكن تطويرها لاحقاً لـ Firebase/Supabase
   ---------------------------------------------------------- */

/**
 * loginStudent — تسجيل دخول الطالب
 * يقبل أي رمز ويحمل تقدم الطالب من Supabase مع نسخة احتياطية محلية.
 */
async function loginStudent() {
  const input = document.getElementById('studentCodeInput');
  const errorEl = document.getElementById('loginError');
  const auth = getJameaAuth();
  const mode = auth ? auth.getMode() : 'student';
  const rawValue = input?.value || '';

  if (errorEl) errorEl.textContent = '';

  if (mode === 'parent' && auth) {
    const email = rawValue.trim().toLowerCase();
    if (!auth.isEmail(email)) {
      if (errorEl) errorEl.textContent = 'Enter a valid parent email.';
      return false;
    }

    const session = applyUnifiedSession(auth.createParentSession(email));
    openMainDashboardAfterLogin();
    renderParentPanel();
    auth.requestParentMagicLink(email).then(function(result) {
      const resultEl = document.getElementById('childCodeResult');
      if (result && result.ok && resultEl) {
        resultEl.textContent = 'Secure magic link sent to ' + email + '. Local parent mode is available on this device now.';
      }
    }).catch(function(e) {
      console.warn('Parent magic link request failed:', e);
    });
    syncParentRemoteData(session);
    return true;
  }

  const identity = getLoginIdentity(input?.value || '');
  const code = identity.code;

  if (!code || code === 'guest') {
    if (errorEl) errorEl.textContent = 'Enter a student code.';
    return false;
  }

  if (auth) {
    const child = await auth.findChildByCode(code);
    if (child) {
      applyUnifiedSession(auth.createStudentSessionFromChild(child, code));
    } else {
      applyUnifiedSession(auth.createGuestStudentSession(code));
    }
  } else {
    setActiveStudent(identity);
  }

  // تحميل التقدم السحابي أولاً، ثم استخدام النسخة المحلية عند تعذر الاتصال
  playerProgress = loadLocalProgress(studentCode);
  saveLocalProgress(studentCode, playerProgress);

  // إظهار اسم الطالب في الشريط العلوي
  updateStudentLabels(studentEmail || ('Student ' + code));

  // إخفاء نافذة الدخول وإظهار لوحة التحكم
  openMainDashboardAfterLogin();
  syncProgressInBackground();

  return true;
}

/**
 * logoutStudent — يحفظ آخر تقدم، ثم يرجع إلى شاشة الدخول.
 */
function logoutStudent() {
  if (studentCode) saveProgress();

  studentCode = '';
  studentEmail = '';
  currentUser = null;
  window.studentCode = '';
  window.studentEmail = '';
  window.jameaSession = null;
  const auth = getJameaAuth();
  if (auth) auth.clearSession();
  if (supabaseClient && supabaseClient.auth) {
    supabaseClient.auth.signOut().catch(function(e) {
      console.warn('Supabase sign out failed:', e);
    });
  }

  const loginOverlay = document.getElementById('login-overlay');
  const input = document.getElementById('studentCodeInput');
  const errorEl = document.getElementById('loginError');
  const nav = document.getElementById('app-nav');
  const tabs = document.getElementById('bottom-tab-bar');
  const sectionNav = document.getElementById('section-nav');

  document.querySelectorAll('[id$="-screen"]').forEach(function(screen) {
    screen.style.display = 'none';
  });

  if (nav) nav.classList.remove('nav-visible');
  if (tabs) tabs.style.display = '';
  if (sectionNav) sectionNav.classList.remove('visible');
  document.body.classList.remove('nav-open', 'tabs-visible');
  if (loginOverlay) loginOverlay.style.display = 'flex';
  if (input) input.value = '';
  if (errorEl) errorEl.textContent = '';
  renderParentPanel();
  if (history && history.replaceState) history.replaceState(null, '', location.pathname);
}

/* ----------------------------------------------------------
   2. حفظ التقدم في localStorage
   ---------------------------------------------------------- */

/**
 * saveProgress — يحفظ تقدم الطالب ويحدث الواجهة
 * يُستدعى بعد كل تغيير في النجوم أو الإنجازات
 */
function saveProgress() {
  saveLocalProgress(studentCode, playerProgress);
  saveProgressOnline().catch(function(e) {
    console.warn('Supabase save failed:', e);
  });
  updateStarsUI();
  updateHomeProgress();
}

/* ----------------------------------------------------------
   3. النجوم والتقدم
   ---------------------------------------------------------- */

/**
 * addStars — يضيف نجوماً للطالب مع صوت وإشعار
 * @param {number} n - عدد النجوم المضافة
 */
function addStars(n) {
  playerProgress.stars += n;
  saveProgress();
  showToast(`+${n} ⭐ Great job! / أحسنت!`);
  try {
    playTone(800, 'triangle', 0.1, 0.1);
    setTimeout(() => playTone(1200, 'triangle', 0.2, 0.1), 100);
  } catch (e) {}
}

/**
 * updateStarsUI — يحدث رقم النجوم في الشريط العلوي
 */
function updateStarsUI() {
  const el = document.getElementById('starsCount');
  if (el) el.textContent = playerProgress.stars;
}

/**
 * updateHomeProgress — يحدث شريط التقدم في الصفحة الرئيسية
 */
function updateHomeProgress() {
  const total = ARABIC_LETTERS.length;
  const done  = playerProgress.completed.length;
  const pct   = Math.round((done / total) * 100);

  const fill  = document.getElementById('home-progress-fill');
  const pctEl = document.getElementById('home-progress-pct');
  if (fill)  fill.style.width  = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

/**
 * markLetterComplete — يعلّم الحرف كمكتمل ويحفظ
 * @param {string} key - رمز الحرف (مثال: 'أ', 'ب')
 */
function markLetterComplete(key) {
  if (!playerProgress.completed.includes(key)) {
    playerProgress.completed.push(key);
  }
  saveProgress();
  renderAlphabetGrid(); // تحديث الشبكة لإظهار علامة الاكتمال
}

/* ----------------------------------------------------------
   4. Toast — الإشعارات المنبثقة
   ---------------------------------------------------------- */
let toastTimer = null;

/**
 * showToast — يعرض إشعاراً في أسفل الشاشة
 * @param {string} msg - نص الإشعار
 * @param {number} dur - المدة بالميلي ثانية (الافتراضي: 2500)
 */
function showToast(msg, dur = 2500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), dur);
}

/* ----------------------------------------------------------
   5. الكونفيتي 🎊
   ---------------------------------------------------------- */

/**
 * fireConfetti — يطلق قطع كونفيتي ملوّنة تتساقط
 * تُستدعى عند الفوز أو إكمال نشاط
 */
function fireConfetti() {
  const colors = ['#02724e', '#ee5337', '#f1c40f', '#3498db', '#9b59b6'];
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      background: ${colors[i % colors.length]};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 20 + 70}%;
      animation-duration: ${Math.random() * 2 + 1.5}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

/* ----------------------------------------------------------
   6. الثيم الفاتح/الداكن
   ---------------------------------------------------------- */

/**
 * toggleTheme — يبدّل بين الثيم الفاتح والداكن ويحفظ الاختيار
 */
function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);

  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';

  // حفظ تفضيل المستخدم
  try { localStorage.setItem('jami3_theme', newTheme); } catch (e) {}
  sendVerbLabSession();
}

/**
 * loadSavedTheme — تحميل الثيم المحفوظ عند بدء التطبيق
 * يُستدعى من initApp()
 */
function loadSavedTheme() {
  try {
    const saved = localStorage.getItem('jami3_theme');
    if (saved) {
      document.body.setAttribute('data-theme', saved);
      const icon = document.getElementById('theme-icon');
      if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  } catch (e) {}
}

/* ----------------------------------------------------------
   7. تبديل اللغة (واجهة مستقبلية)
   ---------------------------------------------------------- */
let jameaLegacyLang = 'en'; // 'en' or 'ar'

/**
 * toggleLanguage — يبدّل لغة الواجهة بين العربية والإنجليزية
 * حالياً يعرض إشعاراً — يمكن تطويره لاحقاً
 */
function toggleLanguageLegacy() {
  jameaLegacyLang = jameaLegacyLang === 'en' ? 'ar' : 'en';
  const btnText = document.getElementById('lang-btn-text');
  if (btnText) btnText.textContent = jameaLegacyLang === 'en' ? 'عربي / English' : 'English / عربي';
  showToast(jameaLegacyLang === 'ar' ? 'تم التبديل للعربية' : 'Switched to English', 1500);
}

if (typeof window.toggleLanguage !== 'function') {
  window.toggleLanguage = toggleLanguageLegacy;
}


/* ════════════════════════════════════════════════════════════
   📄 mini-games.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   MINI-GAMES.JS — الألعاب المصغّرة
   ============================================================
   📌 يحتوي على:
      1. Word Hunt     — صياد الكلمات في النصوص التفاعلية
      2. Missing Letter — الحرف المفقود (اختر الشكل الصحيح)
      3. XO Engine     — محرك لعبة XO الموحّد (بدلاً من 5 نسخ!)
   ============================================================
   ⚠️ التحسين الأهم: محرك XO موحّد
      قبل: كان في الكود 5 نسخ متطابقة تقريباً من منطق XO
      بعد:  دالة واحدة createXOEngine() تولّد XO لأي board

   📖 كيف تستخدم محرك XO؟
      const myXO = createXOEngine('myBoardId', 'myLineId');
      myXO.init(['كَتَبَ', 'ذَهَبَ', ... 9 كلمات]);
      myXO.restart(); // إعادة التشغيل
   ============================================================ */


/* ============================================================
   1. WORD HUNT — صياد الكلمات
   ============================================================ */

/**
 * renderNumberedText — يعرض النص تفاعلياً بحيث يضغط المستخدم على الكلمات
 *
 * @param {string} text        - النص العربي (مع مسافات بين الكلمات)
 * @param {string} letter      - الحرف المستهدف المطلوب إيجاده
 * @param {string} containerId - id عنصر الحاوية في HTML
 * @param {string} type        - مفتاح التتبع: 'quran' | 'story' | 'madd_quran' إلخ
 */
function renderNumberedText(text, letter, containerId, type) {
  if (!text || !containerId) return;

  // بناء regex ذكي يشمل أشكال الحرف المختلفة
  let regexStr = letter;
  if (letter === 'أ')  regexStr = '[أإآا]';
  else if (letter === 'هـ') regexStr = '[هـهة]';
  else if (letter === 'ي')  regexStr = '[يىئ]';
  else if (letter === 'ت')  regexStr = '[تة]';

  const regex = new RegExp(regexStr);
  const words = text.split(/\s+/);
  let html = '', count = 0;

  // هل نبحث عن حركة/سكون أم حرف عادي؟
  const isMarkSearch = ['ً', 'ٌ', 'ٍ', 'ّ', 'ْ', 'tanween'].includes(letter);

  words.forEach((w, i) => {
    // علامات خاصة: رمز الآية والفاصلة
    if (w === '۝' || w === '،') {
      html += `<span style="font-size:1.8rem;color:#b8860b;padding:0 8px;">${w}</span>`;
      return;
    }

    const cleanForMark  = w.replace(/[﴿﴾]/g, '');      // نزع الأقواس فقط
    const fullyClean    = w.replace(/[َُِّْ﴿﴾]/g, ''); // نزع كل التشكيل

    let isTgt = false;
    if (isMarkSearch) {
      isTgt = letter === 'tanween'
        ? /[ًٌٍ]/.test(cleanForMark)
        : cleanForMark.includes(letter);
    } else {
      // نتجنب الكلمات المؤلفة من حرف واحد (كحروف الجر) حتى لا تُربك الطالب
      isTgt = regex.test(fullyClean) && fullyClean.length >= 2;
    }

    if (isTgt) count++;

    html += `<div class="w-chip" data-target="${isTgt}" onclick="handleWordClick(this,'${type}')">
      <span class="w-num">${i + 1}</span>
      <span class="w-text">${w}</span>
    </div>`;
  });

  const container = document.getElementById(containerId);
  if (container) container.innerHTML = html;

  // تهيئة عداد التقدم لهذا النوع
  targetCounts[type] = { total: count, found: 0 };
  updateHuntProgress(type);
}

/**
 * handleWordClick — معالجة النقر على كلمة في الصياد
 */
function handleWordClick(el, type) {
  if (el.classList.contains('found')) return; // منعاً للنقر المتعدد

  const isTgt = el.dataset.target === 'true';

  if (isTgt) {
    el.classList.add('found');
    try { playTone(600, 'sine', 0.1, 0.1); } catch (e) {}
    targetCounts[type].found++;
    updateHuntProgress(type);

    // تحقق من إكمال النشاط
    if (targetCounts[type].found === targetCounts[type].total && targetCounts[type].total > 0) {
      setTimeout(() => sectionComplete(type.includes('quran') ? 'Quran' : 'Story'), 400);
    }
  } else {
    // اهتزاز قصير للإشارة للخطأ
    el.classList.add('wrong');
    try { playTone(200, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => el.classList.remove('wrong'), 400);
  }
}

/**
 * updateHuntProgress — تحديث عداد التقدم في الصياد
 */
function updateHuntProgress(type) {
  const { found, total } = targetCounts[type] || { found: 0, total: 0 };
  const el = document.getElementById(type + '-progress');
  if (el) el.textContent = `Progress / التقدم: ${found} / ${total}`;
}

/**
 * sectionComplete — يُطلق الاحتفال عند إكمال قسم
 */
function sectionComplete(label = '') {
  fireConfetti();
  try { playVictorySound(); } catch (e) {}
  addStars(10);
  if (label) showToast(`🎉 ${label} section complete! / أكملت القسم!`);
}


/* ============================================================
   2. MISSING LETTER — لعبة الحرف المفقود
   ============================================================ */

/**
 * initMissingLetterGame — تهيئة لعبة الحرف المفقود الرئيسية
 * @param {Array} words  - مصفوفة كائنات { display, correctShape }
 * @param {Array} shapes - مصفوفة الأشكال المتاحة للاختيار
 */
function initMissingLetterGame(words, shapes) {
  missingWordsFound = 0;

  const foundEl = document.getElementById('missing-found');
  const totalEl = document.getElementById('missing-total');
  if (foundEl) foundEl.textContent = '0';
  if (totalEl) totalEl.textContent = words.length;

  // عرض الأشكال في الشريط العلوي
  const shapesTop = document.getElementById('ui-missing-shapes-top');
  if (shapesTop) {
    shapesTop.innerHTML = shapes.map((sh, i) => `
      <div class="missing-shape-item">
        <div class="missing-shape-num">${i + 1}</div>
        <div class="missing-shape-char">${sh}</div>
      </div>
    `).join('');
  }

  // عرض البطاقات
  const grid = document.getElementById('ui-missing-grid');
  if (grid) {
    grid.innerHTML = words.map((obj, i) => `
      <div class="missing-card" id="mcard-${i}">
        <div class="missing-word">${obj.display}</div>
        <div class="missing-opts">
          ${shapes.map((sh, si) => `
            <button class="missing-opt" onclick="checkMissing(${i},${si},${obj.correctShape},'${sh}',this)">${si + 1}</button>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

/**
 * checkMissing — يتحقق من صحة الاختيار في لعبة المفقود
 */
function checkMissing(cardIdx, chosen, correct, shapeChar, btn) {
  const card = document.getElementById('mcard-' + cardIdx);
  if (!card || card.classList.contains('solved')) return;

  if (chosen === correct) {
    card.classList.add('solved');
    const gap = card.querySelector('.missing-gap');
    if (gap) {
      // نضع الحرف الصحيح مكان الفراغ — نزيل الشرطة السفلية من بعض الأشكال
      gap.outerHTML = `<span style="color:var(--green);font-weight:700;">${shapeChar.replace(/ـ/g, '')}</span>`;
    }
    missingWordsFound++;
    const foundEl = document.getElementById('missing-found');
    if (foundEl) foundEl.textContent = missingWordsFound;

    const totalEl = document.getElementById('missing-total');
    const total   = totalEl ? parseInt(totalEl.textContent) : 0;
    if (missingWordsFound >= total) {
      setTimeout(() => sectionComplete('Missing Letter'), 400);
    }
  } else {
    btn.classList.add('shake');
    try { playTone(200, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => btn.classList.remove('shake'), 400);
  }
}


/* ============================================================
   3. XO ENGINE — محرك XO الموحّد ✨
   ============================================================
   📌 هذا هو الحل للمشكلة الأكبر في الكود الأصلي:
      كان منطق XO مكرراً 5 مرات (initXO, initShaddaXO, initMaddXO...)
      الآن: دالة مصنع واحدة تُنتج engine مستقل لكل board

   @param {string} boardId - id عنصر board في HTML
   @param {string} lineId  - id عنصر خط الفوز في HTML
   @returns {Object}       - { init(words), restart() }
   ============================================================ */
function createXOEngine(boardId, lineId) {
  // حالة داخلية خاصة بهذه اللعبة — لا تشارك مع XO آخر
  let words      = [];
  let turn       = 'x';
  let boardState = Array(9).fill(null);
  let active     = false;

  /**
   * _render — يرسم البورد من الصفر
   */
  function _render() {
    const board = document.getElementById(boardId);
    const line  = document.getElementById(lineId);
    if (!board) return;

    board.innerHTML = '';
    if (line) line.style.display = 'none';

    turn       = 'x';
    boardState = Array(9).fill(null);
    active     = true;

    words.forEach((w, i) => {
      const cell = document.createElement('div');
      cell.className = 'xo-cell';
      cell.innerHTML = `<span class="cell-n">${i + 1}</span><span>${w}</span>`;
      cell.onclick = () => _click(cell, i);
      board.appendChild(cell);
    });
  }

  /**
   * _click — منطق النقر على خلية
   */
  function _click(cell, i) {
    if (!active || boardState[i]) return;

    boardState[i] = turn;
    cell.classList.add(turn);
    try { playTone(500, 'sine', 0.1, 0.1); } catch (e) {}

    if (_checkWin()) return;

    turn = (turn === 'x') ? 'o' : 'x';
  }

  /**
   * _checkWin — يفحص جميع أنماط الفوز
   * @returns {boolean} true إذا فاز أحد اللاعبين
   */
  function _checkWin() {
    for (const [a, b, c] of WIN_PATTERNS) {
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        active = false;
        _drawWinLine(a, c);
        try { playVictorySound(); } catch (e) {}
        fireConfetti();
        addStars(5);
        return true;
      }
    }
    return false;
  }

  /**
   * _drawWinLine — يرسم خط الفوز بين الخليتين الأولى والأخيرة
   */
  function _drawWinLine(startIdx, endIdx) {
    const line   = document.getElementById(lineId);
    const cells  = document.getElementById(boardId)?.querySelectorAll('.xo-cell');
    const board  = document.getElementById(boardId);
    if (!line || !cells || !board) return;

    // Detect if the board's ancestor uses transform:scale (fullscreen mode)
    // getBoundingClientRect returns scaled coords, so we must divide by the scale factor
    function _getScale(el) {
      let node = el;
      while (node && node !== document.documentElement) {
        const st = window.getComputedStyle(node);
        const tr = st.transform || st.webkitTransform;
        if (tr && tr !== 'none') {
          // matrix(a,b,c,d,tx,ty) — a is scaleX
          const m = tr.match(/matrix\(([^,]+)/);
          if (m) {
            const s = parseFloat(m[1]);
            if (!isNaN(s) && s !== 1) return s;
          }
        }
        node = node.parentElement;
      }
      return 1;
    }
    const scale = _getScale(board);

    const r1 = cells[startIdx].getBoundingClientRect();
    const r2 = cells[endIdx].getBoundingClientRect();
    const rb = board.getBoundingClientRect();

    // Divide by scale to convert from screen coords to element's local coords
    const x1 = ((r1.left + r1.width  / 2) - rb.left) / scale;
    const y1 = ((r1.top  + r1.height / 2) - rb.top)  / scale;
    const x2 = ((r2.left + r2.width  / 2) - rb.left) / scale;
    const y2 = ((r2.top  + r2.height / 2) - rb.top)  / scale;

    const len   = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.cssText = `
      display: block;
      width: ${len}px;
      left: ${x1}px;
      top: ${y1 - 3}px;
      transform-origin: left center;
      transform: rotate(${angle}deg);
    `;
  }

  // الواجهة العامة للـ engine
  return {
    /**
     * init — تهيئة اللعبة بكلمات جديدة
     * @param {string[]} newWords - مصفوفة 9 كلمات
     */
    init(newWords) {
      if (newWords && newWords.length) words = newWords;
      _render();
    },

    /**
     * restart — إعادة تشغيل اللعبة بنفس الكلمات
     */
    restart() {
      _render();
    },
  };
}


/* ============================================================
   4. إنشاء engines لكل مستوى — يُنشأ عند تحميل الصفحة
   ============================================================
   📌 كل engine له board و line مستقلين في HTML
      لذا لا تتداخل الألعاب مع بعضها أبداً
   ============================================================ */

// Engine الرئيسي (شاشة الحرف)
const mainXO    = createXOEngine('xoBoard',         'winLine');

// Engine مستوى السكون
const sukoonXO  = createXOEngine('sukoon-xoBoard',  'sukoon-winLine');

// Engine مستوى المد
const maddXO    = createXOEngine('madd-xoBoard',    'madd-winLine');

// Engine مستوى الشدة
const shaddaXO  = createXOEngine('shadda-xoBoard',  'shadda-winLine');

// Engine مستوى التنوين
const tanweenXO = createXOEngine('tanween-xoBoard', 'tanween-winLine');

/* ----------------------------------------------------------
   وظائف التوافق العكسي — تُسمى من HTML بنفس الأسماء القديمة
   لتجنب كسر أي روابط onclick موجودة في index.html
   ---------------------------------------------------------- */
function initXO(words)        { mainXO.init(words);    }
function initSukoonXO(words)  { sukoonXO.init(words);  }
function initMaddXO(words)    { maddXO.init(words);    }
function initShaddaXO(words)  { shaddaXO.init(words);  }
function initTanweenXO(words) { tanweenXO.init(words); }


/* ════════════════════════════════════════════════════════════
   📄 word-builder.js
   ════════════════════════════════════════════════════════════ */

  /* ============================================================
     WORD BUILDER LOGIC (DOORZ + TANWIN ALIF + KEYBOARD MAPS)
  ============================================================ */
  const wbLettersList = ['ض','ص','ث','ق','ف','غ','ع','هـ','خ','ح','ج','د','ش','س','ي','ب','ل','ا','ت','ن','م','ك','ط','ئ','ء','ؤ','ر','ى','ة','و','ز','ظ','إ','أ','آ'];
  const wbHarakatList = [
    { char: 'َ', arabic: 'ـَ', label: 'Fatha', roman: 'a' },
    { char: 'ُ', arabic: 'ـُ', label: 'Damma', roman: 'u' },
    { char: 'ِ', arabic: 'ـِ', label: 'Kasra', roman: 'i' },
    { char: 'ْ', arabic: 'ـْ', label: 'Sukoon', roman: '∅' }
  ];

  // Keyboard Maps
  const winArMap = {'q':'ض','w':'ص','e':'ث','r':'ق','t':'ف','y':'غ','u':'ع','i':'هـ','o':'خ','p':'ح','[':'ج',']':'د','a':'ش','s':'س','d':'ي','f':'ب','g':'ل','h':'ا','j':'ت','k':'ن','l':'م',';':'ك','\'':'ط','z':'ئ','x':'ء','c':'ؤ','v':'ر','b':'لا','n':'ى','m':'ة',',':'و','.':'ز','/':'ظ','`':'ذ','Q':'َ','W':'ً','E':'ُ','R':'ٌ','A':'ِ','S':'ٍ','X':'ْ','~':'ّ','H':'أ','Y':'إ','N':'آ'};
  const macArMap = {'q':'ض','w':'ص','e':'ث','r':'ق','t':'ف','y':'غ','u':'ع','i':'هـ','o':'خ','p':'ح','[':'ج',']':'د','a':'ش','s':'س','d':'ي','f':'ب','g':'ل','h':'ا','j':'ت','k':'ن','l':'م',';':'ك','\'':'ط','`':'ذ','z':'ظ','x':'ز','c':'و','v':'ة','b':'ى','n':'لا','m':'ر',',':'ؤ','.':'ء','/':'ئ','Q':'َ','W':'ً','E':'ُ','R':'ٌ','A':'ِ','S':'ٍ','X':'ْ','~':'ّ','H':'أ','Y':'إ','N':'آ'};

  let wbInputs = [];
  const wbBtnRefs = {};

  function toggleWordBuilder() {
    const overlay = document.getElementById('wb-overlay');
    if (overlay.style.display === 'flex') {
      overlay.style.display = 'none';
      document.removeEventListener('keydown', wbKeyboardListener);
    } else {
      overlay.style.display = 'flex';
      wbInit();
      document.addEventListener('keydown', wbKeyboardListener);
    }
  }

  function wbInit() {
    const hDiv = document.getElementById('wb-harakatKbd');
    const lDiv = document.getElementById('wb-lettersKbd');
    if (hDiv.innerHTML !== '') return;

    wbHarakatList.forEach(h => {
      const b = document.createElement('button');
      b.className = 'wb-key haraka';
      b.innerHTML = `<span class="key-arabic">${h.arabic}</span><span class="key-label">${h.label}</span>`;
      b.onclick = () => wbAddInput(h.char);
      wbBtnRefs[h.char] = b;
      hDiv.appendChild(b);
    });

    wbLettersList.forEach(l => {
      const b = document.createElement('button');
      b.className = 'wb-key';
      b.innerHTML = `${l}`;
      b.onclick = () => wbAddInput(l);
      wbBtnRefs[l] = b;
      lDiv.appendChild(b);
    });
  }

  function wbKeyboardListener(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'Backspace') { e.preventDefault(); wbRemoveLast(); return; }
    if (e.code === 'Space') { e.preventDefault(); wbAddInput(' '); return; }

    // إذا كان يكتب عربي مباشرة
    const allChars = [...wbLettersList, ...wbHarakatList.map(h=>h.char), 'ّ', 'ً', 'ٌ', 'ٍ', 'ذ'];
    if (allChars.includes(e.key)) {
      e.preventDefault(); wbAddInput(e.key); return;
    }

    // إذا كان يكتب إنجليزي ونريد التحويل
    const layout = document.getElementById('wb-kbd-layout').value;
    let mapped = null;
    if (layout === 'win') mapped = winArMap[e.key];
    else if (layout === 'mac') mapped = macArMap[e.key];

    if (mapped) {
      e.preventDefault(); wbAddInput(mapped);
    }
  }

  function wbFlashBtn(char) {
    const b = wbBtnRefs[char];
    if (!b) return;
    b.classList.add('active');
    setTimeout(() => b.classList.remove('active'), 180);
  }

  function wbAddInput(c)  { wbInputs.push(c); wbFlashBtn(c); wbUpdate(); }
  function wbRemoveLast() { if (wbInputs.length) { wbInputs.pop(); wbUpdate(); } }
  function wbClearAll()   { wbInputs = []; wbUpdate(); }

  function wbToPieces(inp) {
    const pieces = [];
    const harakatChars = wbHarakatList.map(h=>h.char);
    for (let i = 0; i < inp.length; i++) {
      const c = inp[i];
      if (c === ' ') pieces.push({ text: ' ', type: 'space' });
      else if (harakatChars.includes(c)) {
        if (pieces.length && pieces[pieces.length-1].type === 'letter') pieces[pieces.length-1].text += c;
        else pieces.push({ text: c, type: 'letter' });
      } else pieces.push({ text: c, type: 'letter' });
    }
    return pieces;
  }

  function wbFinalWord(pieces) {
    if (!pieces.length) return { word: '', shadda: false, tanwin: false, shaddaEx: '', tanwinEx: '' };
    let hasShadda = false, hasTanwin = false, shaddaEx = '', tanwinEx = '';

    // 1. Shadda
    let pass1 = [], skip = false;
    for (let i = 0; i < pieces.length; i++) {
      if (skip) { skip = false; continue; }
      const cur = pieces[i], nxt = pieces[i+1];
      if (cur.type === 'letter' && nxt && nxt.type === 'letter') {
        const cBase = cur.text[0], cH = cur.text.slice(1);
        const nBase = nxt.text[0], nH  = nxt.text.slice(1);
        if (cBase === nBase && cH === 'ْ') {
          const merged = cBase + 'ّ' + nH;
          pass1.push({ text: merged, type: 'letter' });
          hasShadda = true; shaddaEx = `${cur.text} + ${nxt.text} → ${merged}`;
          skip = true; continue;
        }
      }
      pass1.push(cur);
    }

    // 2. Tanwin (with smart Alif logic for Fatha)
    let result = ''; skip = false;
    for (let i = 0; i < pass1.length; i++) {
      if (skip) { skip = false; continue; }
      const cur = pass1[i], nxt = pass1[i+1];
      if (cur.type === 'letter' && nxt && nxt.text === 'نْ') {
        const isEnd = (i+1 === pass1.length-1) || (pass1[i+2] && pass1[i+2].type === 'space');
        if (isEnd) {
          const t = cur.text;
          const baseChar = t.replace(/[َُِّْ]/g, '');
          const prevChar = (i > 0) ? pass1[i-1].text.replace(/[َُِّْ]/g, '') : '';

          if (t.includes('َ')) {
            let r = t.replace('َ','ً');
            // استثناءات عدم إضافة ألف التنوين
            const needsAlif = !['ة', 'أ', 'إ', 'آ'].includes(baseChar) && !(baseChar === 'ء' && prevChar === 'ا');
            if (needsAlif) r += 'ا';

            result += r; hasTanwin = true; tanwinEx = `${cur.text} + نْ → ${r}`; skip = true; continue;
          }
          if (t.includes('ُ')) { let r = t.replace('ُ','ٌ'); result += r; hasTanwin = true; tanwinEx = `${cur.text} + نْ → ${r}`; skip = true; continue; }
          if (t.includes('ِ')) { let r = t.replace('ِ','ٍ'); result += r; hasTanwin = true; tanwinEx = `${cur.text} + نْ → ${r}`; skip = true; continue; }
        }
      }
      result += cur.text;
    }
    return { word: result, shadda: hasShadda, tanwin: hasTanwin, shaddaEx, tanwinEx };
  }

  function wbUpdate() {
    const pieces = wbToPieces(wbInputs);
    const { word, shadda, tanwin, shaddaEx, tanwinEx } = wbFinalWord(pieces);

    const rw = document.getElementById('wb-resultWord');
    if (word.trim()) { rw.className = 'wb-result-word'; rw.textContent = word; }
    else { rw.className = 'wb-result-word empty'; rw.textContent = 'Start adding letters - ابدأ بإضافة الحروف'; }

    document.getElementById('wb-shaddaBadge').className = 'wb-rule-badge shadda' + (shadda ? ' visible' : '');
    document.getElementById('wb-tanwinBadge').className  = 'wb-rule-badge tanwin' + (tanwin ? ' visible' : '');

    const es = document.getElementById('wb-explainShadda');
    if (shadda) {
      es.innerHTML = `<div class="rule-title">Shadda ( ّ ) — Consonant Doubling</div>Two identical letters merged into one doubled consonant: <strong style="font-family:'Noto Naskh Arabic',serif;font-size:1.1rem;direction:rtl;">${shaddaEx}</strong>`;
      es.className = 'wb-explain-box shadda visible';
    } else es.className = 'wb-explain-box shadda';

    const et = document.getElementById('wb-explainTanwin');
    if (tanwin) {
      et.innerHTML = `<div class="rule-title">Tanwin — Nunation</div>Silent Noon at end of word merged into a Tanwin: <strong style="font-family:'Noto Naskh Arabic',serif;font-size:1.1rem;direction:rtl;">${tanwinEx}</strong>`;
      et.className = 'wb-explain-box tanwin visible';
    } else et.className = 'wb-explain-box tanwin';

    const board = document.getElementById('wb-boardSection');
    board.innerHTML = '';
    if (!pieces.length) {
      board.innerHTML = '<div class="wb-board-empty">Your letter tiles will appear here - ستظهر قطع الحروف هنا</div>';
      document.getElementById('wb-counter').textContent = '';
      return;
    }

    pieces.forEach((p, i) => {
      const el = document.createElement('div');
      if (p.type === 'space') { el.className = 'wb-piece space-piece'; el.textContent = 'SP'; }
      else {
        el.className = 'wb-piece';
        const isFirst = i === 0 || pieces[i-1].type === 'space';
        const isLast  = i === pieces.length-1 || pieces[i+1].type === 'space';

        const isPrevDoorZ = i > 0 && pieces[i-1].type === 'letter' && RAFISA.some(r => pieces[i-1].text[0] === r);
        const isDoorZ = RAFISA.some(r => p.text[0] === r);

        if (isFirst || isPrevDoorZ) el.classList.add('no-nub');
        if (isLast || isDoorZ)  el.classList.add('no-hole');

        if (p.text.length > 2) el.style.fontSize = '1.1rem';
        el.textContent = p.text;
      }
      board.appendChild(el);
    });

    const letCount = pieces.filter(p => p.type === 'letter').length;
    document.getElementById('wb-counter').textContent = letCount > 0 ? `${letCount} Tiles / قطع` : '';
  }



/* ════════════════════════════════════════════════════════════
   📄 quran-puzzle.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   QURAN-PUZZLE.JS — لعبة ترتيب كلمات الآية القرآنية
   ============================================================
   📌 كانت هذه الملف فارغاً تماماً في الكود الأصلي!
      الزر موجود في الواجهة لكن بدون وظيفة.
      الآن: لعبة كاملة تعمل.

   📌 كيف تعمل اللعبة؟
      1. تُعرض الآية القرآنية كلمة كلمة بترتيب مبعثر
      2. المستخدم يضغط على الكلمات بالترتيب الصحيح
      3. كل كلمة صحيحة تنضم إلى منطقة الإجابة
      4. الإكمال يطلق الاحتفال

   📌 إضافة آيات جديدة:
      أضف كائناً في PUZZLE_AYAHS
      { id, surah, ayah, words: [...] }
   ============================================================ */

/* ----------------------------------------------------------
   قاعدة بيانات الآيات — أضف ما تشاء هنا
   كل آية: { id, surah (اسم السورة), ayah (النص الكامل), words (مصفوفة الكلمات بالترتيب) }
   ---------------------------------------------------------- */
const PUZZLE_AYAHS = [
  {
    id: 'fatiha_1',
    surah: 'الفاتحة',
    words: ['بِسْمِ', 'اللَّهِ', 'الرَّحْمَٰنِ', 'الرَّحِيمِ']
  },
  {
    id: 'ikhlas_1',
    surah: 'الإخلاص',
    words: ['قُلْ', 'هُوَ', 'اللَّهُ', 'أَحَدٌ']
  },
  {
    id: 'ikhlas_2',
    surah: 'الإخلاص',
    words: ['اللَّهُ', 'الصَّمَدُ']
  },
  {
    id: 'nasr_1',
    surah: 'النصر',
    words: ['إِذَا', 'جَاءَ', 'نَصْرُ', 'اللَّهِ', 'وَالْفَتْحُ']
  },
  {
    id: 'kawthar_1',
    surah: 'الكوثر',
    words: ['إِنَّا', 'أَعْطَيْنَاكَ', 'الْكَوْثَرَ']
  },
  {
    id: 'kawthar_2',
    surah: 'الكوثر',
    words: ['فَصَلِّ', 'لِرَبِّكَ', 'وَانْحَرْ']
  },
  {
    id: 'asr_1',
    surah: 'العصر',
    words: ['وَالْعَصْرِ']
  },
  {
    id: 'asr_2',
    surah: 'العصر',
    words: ['إِنَّ', 'الْإِنسَانَ', 'لَفِي', 'خُسْرٍ']
  },
  {
    id: 'alaq_1',
    surah: 'العلق',
    words: ['اقْرَأْ', 'بِاسْمِ', 'رَبِّكَ', 'الَّذِي', 'خَلَقَ']
  },
];

/* ----------------------------------------------------------
   حالة اللعبة الداخلية
   ---------------------------------------------------------- */
let _puzzleState = {
  currentAyah:    null,   // الآية الحالية { id, surah, words }
  shuffledWords:  [],     // الكلمات مبعثرة
  placedWords:    [],     // الكلمات التي وضعها المستخدم بالترتيب
  usedAyahIds:    [],     // الآيات التي مررت بالفعل (لتجنب التكرار)
  completedCount: 0,      // عدد الآيات المكتملة في هذه الجلسة
};

/* ----------------------------------------------------------
   toggleQuranPuzzle — فتح/إغلاق نافذة اللعبة
   ---------------------------------------------------------- */
function toggleQuranPuzzle() {
  const overlay = document.getElementById('quran-overlay');
  if (!overlay) return;

  if (overlay.style.display === 'flex') {
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
    _startNewPuzzle();
  }
}

/* ----------------------------------------------------------
   _startNewPuzzle — اختيار آية جديدة وعرضها
   ---------------------------------------------------------- */
function _startNewPuzzle() {
  // اختيار آية لم نستخدمها بعد
  const remaining = PUZZLE_AYAHS.filter(a => !_puzzleState.usedAyahIds.includes(a.id));

  // إذا أكملنا كل الآيات، نُعيد من البداية
  if (remaining.length === 0) {
    _puzzleState.usedAyahIds = [];
    _startNewPuzzle();
    return;
  }

  const ayah = remaining[Math.floor(Math.random() * remaining.length)];
  _puzzleState.currentAyah   = ayah;
  _puzzleState.placedWords   = [];
  _puzzleState.shuffledWords = _shuffle([...ayah.words]);

  _renderPuzzle();
}

/* ----------------------------------------------------------
   _renderPuzzle — رسم الواجهة كاملةً
   ---------------------------------------------------------- */
function _renderPuzzle() {
  const { currentAyah, shuffledWords } = _puzzleState;

  // منطقة الإجابة (فارغة في البداية)
  const targetArea = document.getElementById('quran-target-area');
  if (targetArea) targetArea.innerHTML = '';

  // منطقة الكلمات المتاحة للاختيار
  const piecesArea = document.getElementById('quran-pieces-area');
  if (piecesArea) {
    piecesArea.innerHTML = shuffledWords.map((w, i) => `
      <div class="wb-piece no-nub no-hole"
           style="cursor:pointer; font-size:1.4rem; transition:all 0.2s;"
           onclick="quranPickWord(this, ${i})"
           data-index="${i}"
           data-word="${w}">
        ${w}
      </div>
    `).join('');
  }

  // عنوان السورة في الـ header
  const completedBoard = document.getElementById('quran-completed-board');
  if (completedBoard && _puzzleState.completedCount === 0) {
    completedBoard.innerHTML = `
      <div style="text-align:center; font-family:'Tajawal',sans-serif; color:#27ae60; font-size:1.1rem; font-weight:700;">
        🕌 سورة ${currentAyah.surah} — رتّب الكلمات!
      </div>
      <div style="text-align:center; font-family:sans-serif; color:var(--text-muted); font-size:0.9rem; margin-top:4px;">
        اضغط على الكلمات بالترتيب الصحيح
      </div>
    `;
  }
}

/* ----------------------------------------------------------
   quranPickWord — المستخدم اختار كلمة من القطع المتاحة
   ---------------------------------------------------------- */
function quranPickWord(el, idx) {
  // إخفاء القطعة المختارة (ليست مسح — نحتاجها إذا أراد التراجع)
  el.style.opacity = '0.3';
  el.style.pointerEvents = 'none';

  const word = el.getAttribute('data-word');
  _puzzleState.placedWords.push({ word, idx });

  // إضافة الكلمة لمنطقة الإجابة مع إمكانية التراجع
  const targetArea = document.getElementById('quran-target-area');
  if (targetArea) {
    const chip = document.createElement('div');
    chip.className = 'wb-piece no-nub no-hole';
    chip.style.cssText = 'cursor:pointer; font-size:1.4rem; background:var(--green-light); border:2px solid var(--green);';
    chip.textContent = word;
    chip.onclick = () => _quranUndoLast(el, chip);
    targetArea.appendChild(chip);
  }

  try { playTone(450, 'sine', 0.08, 0.05); } catch (e) {}

  // تحقق من الإكمال
  _checkPuzzleAnswer();
}

/* ----------------------------------------------------------
   _quranUndoLast — التراجع عن آخر كلمة وضعها المستخدم
   ---------------------------------------------------------- */
function _quranUndoLast(originalEl, chipEl) {
  // إعادة القطعة الأصلية
  originalEl.style.opacity = '1';
  originalEl.style.pointerEvents = 'auto';

  // إزالة الكلمة من قائمة المختارة
  const idx = _puzzleState.placedWords.findIndex(
    p => p.word === originalEl.getAttribute('data-word')
  );
  if (idx !== -1) _puzzleState.placedWords.splice(idx, 1);

  // إزالة الشريحة من منطقة الإجابة
  chipEl.remove();
}

/* ----------------------------------------------------------
   _checkPuzzleAnswer — هل وضع المستخدم كل الكلمات بالترتيب الصحيح؟
   ---------------------------------------------------------- */
function _checkPuzzleAnswer() {
  const { currentAyah, placedWords } = _puzzleState;
  if (placedWords.length < currentAyah.words.length) return; // لم يكتمل بعد

  const userAnswer   = placedWords.map(p => p.word);
  const correctOrder = currentAyah.words;

  const isCorrect = userAnswer.every((w, i) => w === correctOrder[i]);

  if (isCorrect) {
    _puzzleState.completedCount++;
    _puzzleState.usedAyahIds.push(currentAyah.id);
    _onPuzzleSuccess();
  } else {
    _onPuzzleFail();
  }
}

/* ----------------------------------------------------------
   _onPuzzleSuccess — الإجابة صحيحة!
   ---------------------------------------------------------- */
function _onPuzzleSuccess() {
  fireConfetti();
  try { playVictorySound(); } catch (e) {}
  addStars(5);

  // عرض الآية كاملةً في بورد الإنجازات
  const completedBoard = document.getElementById('quran-completed-board');
  if (completedBoard) {
    const card = document.createElement('div');
    card.style.cssText = `
      background: var(--green-light);
      border: 2px solid var(--green);
      border-radius: 12px;
      padding: 12px 16px;
      text-align: center;
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 1.3rem;
      color: var(--green);
      margin-bottom: 8px;
      direction: rtl;
    `;
    card.innerHTML = `
      ✅ سورة ${_puzzleState.currentAyah.surah}<br>
      <span style="font-size:1.6rem;">${_puzzleState.currentAyah.words.join(' ')}</span>
    `;
    completedBoard.appendChild(card);
  }

  // بعد لحظة نبدأ آية جديدة
  showToast('🎉 أحسنت! آية جديدة...', 2000);
  setTimeout(() => _startNewPuzzle(), 2500);
}

/* ----------------------------------------------------------
   _onPuzzleFail — الترتيب خاطئ
   ---------------------------------------------------------- */
function _onPuzzleFail() {
  try { playTone(200, 'sawtooth', 0.3, 0.2); } catch (e) {}
  showToast('حاول مرة أخرى! Try again! 💪', 1500);

  // إعادة تهيئة منطقة الإجابة — يُبقي الكلمات في أماكنها
  _puzzleState.placedWords = [];

  // إعادة تفعيل كل القطع
  const piecesArea = document.getElementById('quran-pieces-area');
  if (piecesArea) {
    piecesArea.querySelectorAll('.wb-piece').forEach(el => {
      el.style.opacity = '1';
      el.style.pointerEvents = 'auto';
    });
  }

  const targetArea = document.getElementById('quran-target-area');
  if (targetArea) targetArea.innerHTML = '';
}

/* ----------------------------------------------------------
   _shuffle — خلط مصفوفة بشكل عشوائي (Fisher-Yates)
   ---------------------------------------------------------- */
function _shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


/* ════════════════════════════════════════════════════════════
   📄 Environment.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   ENVIRONMENT.JS — بيئة اللعبة (H=600)
   المدينة تملأ المنطقة الوسطى، الطريق أسفل 22%
============================================================ */
class Environment {
  constructor(scene, W, H) {
    this.scene  = scene;
    this.W      = W;
    this.H      = H;
    this.moving = false;

    if (!scene.textures.exists('env_city')) this._genCityTexture();
    if (!scene.textures.exists('env_road')) this._genRoadTexture();

    // خلفية سماء داكنة
    scene.add.rectangle(W/2, H/2, W, H, 0x0b1026);

    // نجوم في النصف العلوي
    for (let i=0;i<40;i++) {
      scene.add.circle(
        Phaser.Math.Between(0,W),
        Phaser.Math.Between(0,H*0.52),
        Phaser.Math.Between(1,2), 0xffffff,
        Phaser.Math.FloatBetween(0.3,1)
      );
    }

    // المدينة — أقصر شوية ومنخفضة أسفل (تشغل المنطقة الوسطى-السفلى)
    const cityH = Math.round(H * 0.45);  // was 0.58 — shorter buildings
    const cityY = H - Math.round(H * 0.18) - cityH/2;  // was 0.21 — moved down slightly
    this.city = scene.add.tileSprite(W/2, cityY, W, cityH, 'env_city');

    // الطريق — أسفل 21% من الشاشة
    const roadH = Math.round(H * 0.24);
    this.road = scene.add.tileSprite(W/2, H, W, roadH, 'env_road').setOrigin(0.5,1);
  }

  _genCityTexture() {
    const g = this.scene.make.graphics({x:0,y:0,add:false});
    const TW=1600, TH=320;
    g.fillStyle(0x0b1026); g.fillRect(0,0,TW,TH);
    const colors=[0x1a253a,0x151b29,0x2c3e50,0x34495e,0x1e3a5f,0x263550];
    let cx=0;
    while(cx<TW){
      const bw=Phaser.Math.Between(50,115);
      const bh=Phaser.Math.Between(90,TH-40);  // was (110, TH-10) — shorter range
      g.fillStyle(colors[Math.floor(Math.random()*colors.length)]);
      g.fillRect(cx,TH-bh,bw,bh);
      g.lineStyle(1,0x000000,0.7); g.strokeRect(cx,TH-bh,bw,bh);
      for(let wy=TH-bh+12;wy<TH-10;wy+=30){
        for(let wx=cx+8;wx<cx+bw-8;wx+=20){
          if(Math.random()>0.4){
            g.fillStyle(Math.random()>0.8?0xe67e22:0xf1c40f,1);
            g.fillRect(wx,wy,8,12);
          }
        }
      }
      cx+=bw;
    }
    g.generateTexture('env_city',TW,TH);
    g.destroy();
  }

  _genRoadTexture() {
    const g = this.scene.make.graphics({x:0,y:0,add:false});
    g.fillStyle(0x1c1c1c); g.fillRect(0,0,120,170);
    g.fillStyle(0xc0392b); g.fillRect(0,0,120,6);
    g.fillStyle(0xdde3e9); g.fillRect(10,80,65,8);
    g.generateTexture('env_road',120,170);
    g.destroy();
  }

  start(){ this.moving=true; }
  stop() { this.moving=false; }
  update(){
    if(!this.moving) return;
    this.city.tilePositionX+=1.5;
    this.road.tilePositionX+=7;
  }
}


/* ════════════════════════════════════════════════════════════
   📄 Car.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   CAR.JS — كلاس السيارة
   ============================================================
   ✅ إصلاحات:
      - شكل السيارة أوضح وأكبر
      - letterTxt = letterText (alias لـ ShaddaScene)
      - animateDrive أسلس
   ============================================================ */

const CAR_COLORS = {
  GREEN:  0x026049,
  ORANGE: 0xef5536,
  DARK:   0x2c3e50,
  WHITE:  0xffffff,
  GREY:   0x7f8c8d,
  SKY:    0xd6eaf8,
};

class Car extends Phaser.GameObjects.Container {
  constructor(scene, x, y, letter, mark = '', color = CAR_COLORS.WHITE, isBroken = false) {
    super(scene, x, y);
    this.scene       = scene;
    this.initialY    = y;
    this.baseLetter  = letter;
    this.currentMark = mark;
    this.setSize(280, 110);

    if (!scene.textures.exists('brand_car_body')) this._generateTextures();

    // جسم السيارة
    const body = scene.add.image(0, -10, 'brand_car_body').setTint(color);

    // العجلات
    const w1 = scene.add.image(-90, 48, 'brand_wheel');
    const w2 = scene.add.image(90,  48, 'brand_wheel');

    // نص الحرف
    this.letterText = scene.add.text(0, -28, letter + mark, {
      fontSize:        '88px',
      fontFamily:      '"Noto Naskh Arabic", Tajawal, sans-serif',
      color:           '#026049',
      stroke:          '#ffffff',
      strokeThickness: 7,
    }).setOrigin(0.5).setPadding({ top: 55, bottom: 55, left: 22, right: 22 });

    this.add([body, w1, w2]);

    if (isBroken) {
      const be = scene.add.image(-100, -18, 'brand_gear').setTint(0x333333);
      this.add(be);
    }

    this.add(this.letterText);
    scene.add.existing(this);

    this.wheels     = [w1, w2];
    this.enginePart = null;
    this.letterTxt  = this.letterText; // alias for ShaddaScene compatibility
  }

  _generateTextures() {
    const g = this.scene.make.graphics({ x: 0, y: 0, add: false });

    // ── جسم السيارة ──────────────────────────────────────
    // جسم رئيسي أبيض
    g.fillStyle(0xfafafa);
    g.fillRoundedRect(0, 0, 280, 90, 22);

    // سقف بلون فاتح
    g.fillStyle(0xf0f0f0);
    g.fillRoundedRect(50, 0, 180, 55, { tl:22, tr:22, bl:0, br:0 });

    // زجاج أمامي (أزرق فاتح)
    g.fillStyle(0xbbd9f0);
    g.beginPath();
    g.moveTo(190, 5);
    g.lineTo(240, 5);
    g.lineTo(258, 35);
    g.lineTo(175, 35);
    g.closePath();
    g.fillPath();

    // زجاج خلفي
    g.fillStyle(0xbbd9f0);
    g.beginPath();
    g.moveTo(60, 5);
    g.lineTo(45, 5);
    g.lineTo(32, 35);
    g.lineTo(88, 35);
    g.closePath();
    g.fillPath();

    // شريط أخضر
    g.fillStyle(CAR_COLORS.GREEN);
    g.fillRect(0, 60, 280, 12);

    // شريط برتقالي
    g.fillStyle(CAR_COLORS.ORANGE);
    g.fillRect(0, 72, 280, 6);

    // أضواء أمامية
    g.fillStyle(0xffee55);
    g.fillRoundedRect(255, 55, 18, 12, 4);

    // أضواء خلفية
    g.fillStyle(0xff4444);
    g.fillRoundedRect(7, 55, 14, 12, 4);

    g.generateTexture('brand_car_body', 280, 90);

    // ── العجلة ────────────────────────────────────────────
    g.clear();
    g.fillStyle(0x222222); g.fillCircle(32, 32, 32);
    g.fillStyle(0xc8c8c8); g.fillCircle(32, 32, 22);
    g.lineStyle(3, CAR_COLORS.ORANGE); g.strokeCircle(32, 32, 22);
    // أشعة العجلة
    g.lineStyle(2, 0x888888);
    for (let i = 0; i < 5; i++) {
      const a = (i * 72) * Math.PI / 180;
      g.lineBetween(32, 32, 32 + Math.cos(a)*20, 32 + Math.sin(a)*20);
    }
    g.generateTexture('brand_wheel', 64, 64);

    // ── الترس/الموتور ─────────────────────────────────────
    g.clear();
    g.fillStyle(0xffffff);
    g.fillCircle(50, 50, 45);
    for (let i = 0; i < 8; i++) {
      g.fillRect(
        45 + Math.cos(i * Math.PI / 4) * 45,
        45 + Math.sin(i * Math.PI / 4) * 45,
        10, 10
      );
    }
    g.generateTexture('brand_gear', 100, 100);

    g.destroy();
  }

  addEngine(engineSprite, mark) {
    this.enginePart  = engineSprite;
    this.currentMark = mark;
    this.add(engineSprite);
    engineSprite.setPosition(-100, -18);
    this.bringToTop(this.letterText);

    let displayChar = this.baseLetter;
    if (this.baseLetter === 'أ' && mark === 'ِ') displayChar = 'إ';
    this.letterText.setText(displayChar + mark);
  }

  resetToIdle() {
    this.letterText.setText(this.baseLetter);
    this.currentMark = '';

    if (this.enginePart) {
      this.enginePart.destroy();
      this.enginePart = null;
    }

    this.y = this.initialY;

    const body = this.list[0];
    const rw   = this.list[1];
    const fw   = this.list[2];
    if (body && body.scaleX > 1) {
      this.scene.tweens.killTweensOf([body, rw, fw]);
      body.setScale(1, 1);
      rw.x = -90; fw.x = 90;
    }
  }

  animateDrive(speed = 1) {
    this.y = this.initialY + Math.sin(this.scene.time.now / 45) * 1.8;
    if (this.wheels) {
      this.wheels.forEach(w => { w.rotation += 0.09 * speed; });
    }
  }

  extendChassis(maddChar) {
    const body = this.list[0];
    const rw   = this.list[1];
    const fw   = this.list[2];

    this.scene.tweens.add({ targets: body, scaleX: 1.85, duration: 1000, ease: 'Back.out' });
    this.scene.tweens.add({ targets: rw, x: -170, duration: 1000, ease: 'Back.out' });
    this.scene.tweens.add({ targets: fw, x: 170,  duration: 1000, ease: 'Back.out' });
    if (this.enginePart) {
      this.scene.tweens.add({ targets: this.enginePart, x: -185, duration: 1000, ease: 'Back.out' });
    }

    let displayChar = this.baseLetter;
    if (this.baseLetter === 'أ' && this.currentMark === 'ِ') displayChar = 'إ';
    this.letterText.setText(displayChar + this.currentMark + maddChar);
    this.scene.tweens.add({ targets: this.letterText, scale: 1.2, yoyo: true, duration: 200 });
  }
}


/* ════════════════════════════════════════════════════════════
   📄 MainScene.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   MAINSCENE.JS — مشهد الحرف الرئيسي
   H=600px: motors at y=50, car at H-95, word appears center
============================================================ */
class MainScene extends Phaser.Scene {
  constructor() { super('MainScene'); }

  create() {
    const W = this.scale.width;   // 1000
    const H = this.scale.height;  // 600

    this.env = new Environment(this, W, H);

    // السيارة على الطريق — السيارة أعلى قليلاً (تبعد عن الأرض شوية)
    this.mainCar = new Car(this, W * 0.28, H - 115, window.currentPhaserLetter || 'أ');

    this.engines = [];

    // المواتير في أعلى الكانفاس تماماً — y=50
    const motorY  = 50;
    const spacing = 115;
    const count   = 4;
    const startX  = W / 2 - (spacing * (count - 1)) / 2;

    this._mkEngine(startX,               motorY, 'َ', 0xee5337);
    this._mkEngine(startX + spacing,     motorY, 'ُ', 0x27ae60);
    this._mkEngine(startX + spacing * 2, motorY, 'ِ', 0x0369a1);
    this._mkEngine(startX + spacing * 3, motorY, 'ْ', 0x555555);

    // منطقة الإفلات على السيارة
    this.dropZone = this.add.zone(this.mainCar.x, this.mainCar.y, 280, 210)
      .setRectangleDropZone(280, 210);
    this.input.on('drop', (_, obj) => this._handleDrop(obj));

    // زر إيقاف — يمين أعلى
    const sBtn = this.add.container(W - 52, 50).setSize(46,46).setInteractive({useHandCursor:true});
    sBtn.add([this.add.circle(0,0,22,0xe74c3c), this.add.text(0,0,'⏹',{fontSize:'20px',color:'#fff'}).setOrigin(0.5)]);
    sBtn.on('pointerdown', () => this._stopGame());


    this.playing = false;
  }

  update() {
    if (this.playing) { this.env.update(); this.mainCar.animateDrive(1); }
  }

  _mkGear(color) {
    const g = this.add.graphics();
    g.fillStyle(color,1); g.fillCircle(0,0,34);
    for (let i=0;i<8;i++) { const a=(i*45)*Math.PI/180; g.fillRect(Math.cos(a)*34-9,Math.sin(a)*34-9,18,18); }
    g.lineStyle(2,0xffffff,0.3); g.strokeCircle(0,0,34);
    return g;
  }

  _mkEngine(x, y, mark, color) {
    const c = this.add.container(x,y).setSize(80,80);
    c.initialX=x; c.initialY=y;
    const txt = this.add.text(0, mark==='ِ'?-4:4, mark, {
      fontSize:'50px', fontFamily:'"Noto Naskh Arabic",sans-serif',
      color:'#fff', stroke:'#000', strokeThickness:3,
      padding:{left:18,right:18,top:34,bottom:34}
    }).setOrigin(0.5);
    c.add([this._mkGear(color), txt]);
    c.setInteractive({draggable:true, useHandCursor:true});
    c.mark=mark; c.color=color;
    this.input.setDraggable(c);
    c.on('drag',(_,dx,dy)=>{c.x=dx;c.y=dy;});
    c.on('dragend',()=>{ if(!c.dropped) this.tweens.add({targets:c,x:c.initialX,y:c.initialY,duration:300,ease:'Back.out'}); });
    this.engines.push(c);
  }

  _handleDrop(engine) {
    if (this.mainCar.enginePart) return;
    engine.setVisible(false); engine.dropped=true;
    const clone = this.add.container(0,0);
    const txt = this.add.text(0,engine.mark==='ِ'?-4:4,engine.mark,{
      fontSize:'50px',fontFamily:'"Noto Naskh Arabic"',
      color:'#fff',stroke:'#000',strokeThickness:3,
      padding:{left:18,right:18,top:34,bottom:34}
    }).setOrigin(0.5);
    clone.add([this._mkGear(engine.color),txt]);
    this.mainCar.addEngine(clone,engine.mark);
    if (engine.mark==='ْ') {
      this.playing=false; this.env.stop();
      try{playTone(200,'sawtooth',0.4);}catch(e){}
    } else {
      this.playing=true; this.env.start();
      try{addStars(2);playTone(800,'triangle',0.2);}catch(e){}
    }
  }

  _stopGame() {
    this.playing=false; this.env.stop(); this.mainCar.resetToIdle();
    this.engines.forEach(e=>{
      if(e.dropped){e.setVisible(true);e.dropped=false;
        this.tweens.add({targets:e,x:e.initialX,y:e.initialY,duration:500,ease:'Back.out'});}
    });
  }
}


/* ════════════════════════════════════════════════════════════
   📄 SukoonScene.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   SUKOONSCENE.JS — مشهد السكون (السيارة الساكنة تُجرّ)
   ============================================================
   📌 الهدف التعليمي:
      الحرف الساكن لا يستطيع التحرك وحده —
      يجب أن يتصل بالحرف المتحرك قبله ليُنطقا معاً

   📌 تدفق اللعبة:
      1. السيارة الخلفية (الساكنة) تنتظر — عليها سكون
      2. السيارة الأمامية (المتحركة) تنتظر محركها
      3. الطالب يسحب حركة ويضعها على السيارة الأمامية
      4. السيارة الأمامية تتراجع لتتصل بالساكنة بحبل
      5. السيارتان تنطلقان معاً كوحدة واحدة
   ============================================================ */

class SukoonScene extends Phaser.Scene {
  constructor() { super('SukoonScene'); }

  create() {
    const W = this.scale.width, H = this.scale.height;
    this.env = new Environment(this, W, H);

    // قراءة الحروف المختارة من واجهة المستخدم
    this.targetLetter = window.currentPhaserBackLetter  || 'ب'; // الحرف الساكن
    this.helperLetter = window.currentPhaserFrontLetter || 'أ'; // الحرف المتحرك

    // ── السيارة الخلفية (الساكنة) ────────────────────────
    this.backCar = new Car(this, W * 0.22, H - 95, this.targetLetter);

    // إضافة محرك السكون (ثابت — لا يتغير)
    const sukoonEng = this.add.container(0, 0);
    const sg = this.add.graphics();
    sg.fillStyle(0x444444, 1);
    sg.fillCircle(0, 0, 40);
    for (let i = 0; i < 8; i++) {
      sg.fillRect(Math.cos(i * 45 * Math.PI / 180) * 40 - 10, Math.sin(i * 45 * Math.PI / 180) * 40 - 10, 20, 20);
    }
    sg.lineStyle(2, 0xffffff, 0.5);
    sg.strokeCircle(0, 0, 40);
    sukoonEng.add([
      sg,
      this.add.text(0, -8, 'ْ', { fontSize: '65px', fontFamily: '"Noto Naskh Arabic"', color: '#fff', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5),
    ]);
    this.backCar.addEngine(sukoonEng, 'ْ');

    // ── السيارة الأمامية (المتحركة) ──────────────────────
    this.frontCar = new Car(this, W * 0.78, H - 95, this.helperLetter);

    // ── رسومات الحبل (يُرسم في update) ──────────────────
    this.ropeGraphics = this.add.graphics();
    this.isConnected  = false;
    this.isPlaying    = false;
    this.currentHaraka = '';

    // ── منطقة الإفلات (فوق السيارة الأمامية) ────────────
    this.dropZone = this.add.zone(this.frontCar.x, this.frontCar.y, 300, 250)
      .setRectangleDropZone(300, 250);
    this.input.on('drop', (_, obj) => this.handleDrop(obj));

    // ── زر إعادة التشغيل ─────────────────────────────────
    const sBtn = this.add.container(W - 70, 60).setSize(60, 60).setInteractive({ useHandCursor: true });
    sBtn.add([
      this.add.circle(0, 0, 28, 0xe74c3c),
      this.add.text(0, 0, '⏹', { fontSize: '28px', color: '#fff' }).setOrigin(0.5),
    ]);
    sBtn.on('pointerdown', () => this.scene.restart());

    // ── نص التوجيه ───────────────────────────────────────
    this.equationText = this.add.text(W / 2, 40,
      `اسحب حركة للحرف ( ${this.helperLetter} ) ليرتبط بالساكن!`,
      { fontFamily: 'Tajawal', fontSize: '22px', color: '#f1c40f', stroke: '#000', strokeThickness: 4 }
    ).setOrigin(0.5);

    // ── المحركات الثلاثة للسحب ───────────────────────────
    this.engines = [];
    this._mkEngine(W / 2 - 130, 110, 'َ', 0xee5337);
    this._mkEngine(W / 2,       110, 'ُ', 0x27ae60);
    this._mkEngine(W / 2 + 130, 110, 'ِ', 0x0369a1);
  }

  update() {
    // تحديث منطقة الإفلات لتتبع السيارة إذا تحركت
    this.dropZone.x = this.frontCar.x;
    this.dropZone.y = this.frontCar.y;

    // رسم الحبل بين السيارتين عند الاتصال
    if (this.isConnected) {
      this.ropeGraphics.clear();
      const x1 = this.frontCar.x - 125, y1 = this.frontCar.y + 20;
      const x2 = this.backCar.x  + 125, y2 = this.backCar.y  + 20;

      // الحبل: خط سميك داكن + خط رفيع رمادي + نقطتا التعلق
      this.ropeGraphics.lineStyle(14, 0x2c3e50);
      this.ropeGraphics.lineBetween(x1, y1, x2, y2);
      this.ropeGraphics.lineStyle(4, 0x7f8c8d);
      this.ropeGraphics.lineBetween(x1, y1 + 4, x2, y2 + 4);
      this.ropeGraphics.fillStyle(0x95a5a6, 1);
      this.ropeGraphics.fillCircle(x1, y1, 10);
      this.ropeGraphics.fillCircle(x2, y2, 10);
    }

    if (this.isPlaying) {
      this.env.update();
      this.frontCar.animateDrive(1.5);
      this.backCar.animateDrive(1.5);
    }
  }

  /* ----------------------------------------------------------
     _mkEngine — إنشاء محرك قابل للسحب
     ---------------------------------------------------------- */
  _mkEngine(x, y, mark, color) {
    const c = this.add.container(x, y).setSize(90, 90);
    c.initialX = x; c.initialY = y;

    const g = this.add.graphics();
    g.fillStyle(color, 1); g.fillCircle(0, 0, 38);
    for (let i = 0; i < 8; i++) {
      g.fillRect(Math.cos(i * 45 * Math.PI / 180) * 38 - 10, Math.sin(i * 45 * Math.PI / 180) * 38 - 10, 20, 20);
    }
    g.lineStyle(2, 0xffffff, 0.4); g.strokeCircle(0, 0, 38);

    const txt = this.add.text(0, mark === 'ِ' ? -5 : 5, mark, {
      fontSize: '55px', fontFamily: '"Noto Naskh Arabic", sans-serif',
      color: '#fff', stroke: '#000', strokeThickness: 3,
      padding: { left: 20, right: 20, top: 40, bottom: 40 },
    }).setOrigin(0.5);

    c.add([g, txt]);
    c.setInteractive({ draggable: true, useHandCursor: true });
    c.mark = mark; c.color = color;
    this.input.setDraggable(c);
    this.engines.push(c);

    c.on('drag', (_, dx, dy) => { c.x = dx; c.y = dy; });
    c.on('dragend', () => {
      if (!c.dropped) {
        this.tweens.add({ targets: c, x: c.initialX, y: c.initialY, duration: 300, ease: 'Back.out' });
      }
    });
  }

  /* ----------------------------------------------------------
     handleDrop — وضع المحرك على السيارة الأمامية
     ---------------------------------------------------------- */
  handleDrop(engine) {
    if (this.isPlaying || this.isConnected) return;

    engine.setVisible(false);
    engine.dropped    = true;
    this.currentHaraka = engine.mark;

    // استنساخ المحرك داخل السيارة
    const clone = this.add.container(0, 0);
    const g = this.add.graphics();
    g.fillStyle(engine.color, 1); g.fillCircle(0, 0, 38);
    for (let i = 0; i < 8; i++) {
      g.fillRect(Math.cos(i * 45 * Math.PI / 180) * 38 - 10, Math.sin(i * 45 * Math.PI / 180) * 38 - 10, 20, 20);
    }
    g.lineStyle(2, 0xffffff, 0.4); g.strokeCircle(0, 0, 38);

    const txt = this.add.text(0, engine.mark === 'ِ' ? -5 : 5, engine.mark, {
      fontSize: '55px', fontFamily: '"Noto Naskh Arabic", sans-serif',
      color: '#fff', stroke: '#000', strokeThickness: 3,
      padding: { left: 20, right: 20, top: 40, bottom: 40 },
    }).setOrigin(0.5);
    clone.add([g, txt]);

    this.frontCar.addEngine(clone, engine.mark);

    this.startSequence(); // بدء تسلسل التوصيل
  }

  /* ----------------------------------------------------------
     تسلسل التوصيل: هزّة → تراجع → توصيل → انطلاق
     ---------------------------------------------------------- */
  startSequence() {
    try { playTone(500, 'sine', 0.1); } catch (e) {}
    // هزّة خفيفة للتعبير عن "تحريك المحرك"
    this.tweens.add({
      targets: this.frontCar, x: '+=30', duration: 300, yoyo: true,
      onComplete: () => this._goReverse(),
    });
  }

  _goReverse() {
    try { playTone(300, 'sawtooth', 0.5); } catch (e) {}
    // السيارة الأمامية تتراجع للخلف حتى تصل للساكنة
    this.tweens.add({
      targets:  this.frontCar,
      x:        this.backCar.x + 300,
      duration: 1500,
      ease:     'Power2',
      onUpdate: () => { this.frontCar.wheels.forEach(w => w.rotation -= 0.1); },
      onComplete: () => this._connectCars(),
    });
  }

  _connectCars() {
    this.isConnected = true;
    try {
      playTone(200, 'square', 0.2);
      setTimeout(() => playTone(250, 'square', 0.2), 100);
    } catch (e) {}

    // هزّة الاتصال
    this.tweens.add({
      targets:  [this.frontCar, this.backCar],
      x:        '-=15',
      duration: 100,
      yoyo:     true,
      onComplete: () => this._driveTogether(),
    });
  }

  _driveTogether() {
    this.time.delayedCall(400, () => {
      this.isPlaying = true;
      this.env.start();
      this._showBigText();
    });
  }

  /* ----------------------------------------------------------
     _showBigText — عرض المقطع بخط كبير في وسط الشاشة
     ---------------------------------------------------------- */
  _showBigText() {
    // معالجة همزة الكسرة
    let helperChar = this.currentHaraka === 'ِ' && this.helperLetter === 'أ'
      ? 'إ'
      : this.helperLetter;
    const fullWord = helperChar + this.currentHaraka + this.targetLetter + 'ْ';

    this.equationText.setText('رائع! المقطع الساكن يُقرأ كصوت واحد متصل.');

    const bigText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 160, fullWord, {
      fontSize:        '150px',
      fontFamily:      '"Noto Naskh Arabic", sans-serif',
      color:           '#ee5337',
      stroke:          '#fff',
      strokeThickness: 12,
      padding:         { left: 40, right: 40, top: 40, bottom: 40 },
    }).setOrigin(0.5).setScale(0).setDepth(100);

    // حركة ظهور Pop-up
    this.tweens.add({ targets: bigText, scale: 1, duration: 800, ease: 'Back.out' });

    try { setTimeout(() => playVictorySound(), 300); } catch (e) {}
  }
}


/* ════════════════════════════════════════════════════════════
   📄 MaddScene.js
   ════════════════════════════════════════════════════════════ */

/* ============================================================
     PHASER — MADD SCENE (Long Vowel Game)
  ============================================================ */
  class MaddScene extends Phaser.Scene {
    constructor() { super('MaddScene'); }

    create() {
      const W = this.scale.width, H = this.scale.height;
      this.env = new Environment(this, W, H);

      // 1. التعديل الأول: قراءة الحرف الذي اختاره المستخدم الفعلي بدلاً من 'ب'
      this.targetLetter = window.currentPhaserLetter || 'ب';

      this.leftCar   = new Car(this, W * 0.25, H - 95, '');
      this.rightCar  = new Car(this, W * 0.75, H - 95, this.targetLetter);
      this.fusionCar = new Car(this, W * 0.25, H - 95, this.targetLetter);
      this.fusionCar.setVisible(false);

      this.isRightReady = false;
      this.isLeftReady  = false;
      this.isMerged     = false;
      this.currentShortVowel = null;
      this.currentLongVowel  = null;

      this.leftZone  = this.add.zone(this.leftCar.x,  this.leftCar.y,  250, 200).setRectangleDropZone(250, 200);
      this.leftZone.owner = 'left';
      this.rightZone = this.add.zone(this.rightCar.x, this.rightCar.y, 250, 200).setRectangleDropZone(250, 200);
      this.rightZone.owner = 'right';

      const sBtn = this.add.container(W - 70, 60).setSize(60, 60).setInteractive({ useHandCursor:true });
      sBtn.add([
        this.add.circle(0, 0, 28, 0xe74c3c),
        this.add.text(0, 0, '⏹', { fontSize:'28px', color:'#fff' }).setOrigin(0.5)
      ]);
      sBtn.on('pointerdown', () => this.scene.restart());

      this.equationText = this.add.text(W / 2, 40, 'Drag Long Vowel first, then matching short motor!', {
        fontFamily: 'Tajawal', fontSize: '24px', color: '#f1c40f', stroke: '#000', strokeThickness: 4
      }).setOrigin(0.5);

      this.items = [];
      const topY = 110;

      // حروف المد (يسار أفقياً)
      this.mkItem(120, topY, 'ا', 0xee5337, 'cargo');
      this.mkItem(230, topY, 'و', 0x02724e, 'cargo');
      this.mkItem(340, topY, 'ي', 0x2980b9, 'cargo');

      // المواتير القصيرة (يمين أفقياً)
      this.mkItem(W - 120, topY, 'َ', 0xee5337, 'engine');
      this.mkItem(W - 230, topY, 'ُ', 0x02724e, 'engine');
      this.mkItem(W - 340, topY, 'ِ', 0x2980b9, 'engine');

      this.input.on('drop', (_, obj, zone) => this.handleDrop(obj, zone));
      this.playing = false;
    }

    update() {
      if (this.playing) {
        this.env.update();
        if (this.isMerged) {
          this.fusionCar.animateDrive(2);
        } else {
          this.rightCar.animateDrive(2);
          this.leftCar.animateDrive(2);
        }
      }
    }

mkItem(x, y, mark, color, type) {
      const c = this.add.container(x, y).setSize(90, 90);
      c.initialX = x; c.initialY = y;

      if (type === 'engine') {
        const g = this.add.graphics();
        g.fillStyle(color, 1); g.fillCircle(0, 0, 38);
        for(let i=0; i<8; i++){ g.fillRect(Math.cos(i*45*Math.PI/180)*38-10, Math.sin(i*45*Math.PI/180)*38-10, 20, 20); }
        g.lineStyle(2, 0xffffff, 0.4); g.strokeCircle(0, 0, 38);
        c.add(g);
      } else {
        c.add(this.add.rectangle(0, 0, 75, 75, color).setStrokeStyle(3, 0xffffff));
      }

      const textY = type === 'engine' ? (mark === 'ِ' ? -5 : 5) : 0;
      const txt = this.add.text(0, textY, mark, {
        fontSize: type === 'engine' ? '55px' : '65px',
        fontFamily: '"Noto Naskh Arabic", sans-serif', color: '#fff', stroke: '#000', strokeThickness: 3,
        padding: { left:20, right:20, top:40, bottom:40 }
      }).setOrigin(0.5);

      c.add(txt);
      c.setInteractive({ draggable: true });
      c.mark = mark; c.color = color; c.type = type;
      this.input.setDraggable(c);
      this.items.push(c);
      c.on('drag', (_, dx, dy) => { c.x = dx; c.y = dy; });
      c.on('dragend', () => {
        if (!c.dropped) {
          this.tweens.add({ targets: c, x: c.initialX, y: c.initialY, duration: 300, ease: 'Back.out' });
        }
      });
    }

handleDrop(item, zone) {
      if (this.playing || this.isMerged) return;

      if (zone.owner === 'left' && !this.isLeftReady && item.type === 'cargo') {
        item.setVisible(false); item.dropped = true;

        // 👇 هنا استعدنا الـ Layout الأخضر ليكون مثل حروف السيارة تماماً 👇
        const t = this.add.text(0, -35, item.mark, {
          fontSize: '85px', fontFamily: '"Noto Naskh Arabic", sans-serif', color: '#ffffff', stroke: '#02724e', strokeThickness: 8, padding: { left:40, right:40, top:50, bottom:50 }
        }).setOrigin(0.5);

        this.leftCar.add(t);
        this.isLeftReady = true;
        this.currentLongVowel = item.mark;
        try { playTone(400, 'triangle', 0.1); } catch(e) {}
        return;
      }

      if (zone.owner === 'right' && !this.isRightReady && item.type === 'engine' && this.isLeftReady) {
        const valid =
          (item.mark === 'َ' && this.currentLongVowel === 'ا') ||
          (item.mark === 'ُ' && this.currentLongVowel === 'و') ||
          (item.mark === 'ِ' && this.currentLongVowel === 'ي');

        if (valid) {
          item.setVisible(false); item.dropped = true;
          const clone = this.add.container(0, 0);
          const g = this.add.graphics();
          g.fillStyle(item.color, 1); g.fillCircle(0, 0, 40);
          for (let i = 0; i < 8; i++) {
            g.fillRect(Math.cos(i * 45 * Math.PI / 180) * 40 - 10, Math.sin(i * 45 * Math.PI / 180) * 40 - 10, 20, 20);
          }
          const txt = this.add.text(0, item.mark === 'ِ' ? -5 : 5, item.mark, {
            fontSize: '65px', fontFamily: '"Noto Naskh Arabic", sans-serif', color: '#fff', stroke: '#000', strokeThickness: 3,
            padding: { left:20, right:20, top:40, bottom:40 }
          }).setOrigin(0.5);
          clone.add([g, txt]);
          clone._mark = item.mark;
          this.rightCar.addEngine(clone, item.mark);
          this.isRightReady = true;
          this.currentShortVowel = item.mark;
          this.startFusion();
        } else {
          this.tweens.add({
            targets: item, x: '+=10', duration: 50, yoyo: true, repeat: 3,
            onComplete: () => {
              item.dropped = false;
              this.tweens.add({ targets: item, x: item.initialX, y: item.initialY, duration: 300 });
            }
          });
          try { playTone(200, 'sawtooth', 0.2); } catch(e) {}
        }
        return;
      }

      item.dropped = false;
      this.tweens.add({ targets: item, x: item.initialX, y: item.initialY, duration: 300 });
    }

startFusion() {
      try { playTone(600, 'sine', 0.5); } catch(e) {}
      this.tweens.add({
        targets: this.rightCar, x: this.leftCar.x + 200, duration: 1500, ease: 'Power2',
        onUpdate: () => { this.rightCar.wheels.forEach(w => { w.rotation -= 0.1; }); },
        onComplete: () => {
          this.rightCar.setVisible(false);
          this.leftCar.setVisible(false);
          this.fusionCar.setVisible(true);
          this.isMerged = true;

          const clone = this.add.container(0, 0);
          const colorMap = { 'َ': 0xee5337, 'ُ': 0x02724e, 'ِ': 0x2980b9 };
          const g = this.add.graphics();
          g.fillStyle(colorMap[this.currentShortVowel] || 0x888888, 1);
          g.fillCircle(0, 0, 40);
          for (let i = 0; i < 8; i++) {
            g.fillRect(Math.cos(i * 45 * Math.PI / 180) * 40 - 10, Math.sin(i * 45 * Math.PI / 180) * 40 - 10, 20, 20);
          }
          const txt = this.add.text(0, this.currentShortVowel === 'ِ' ? -5 : 5, this.currentShortVowel, {
            fontSize: '60px', fontFamily: '"Noto Naskh Arabic", sans-serif', color: '#fff', stroke: '#000', strokeThickness: 3,
            padding: { left:20, right:20, top:40, bottom:40 }
          }).setOrigin(0.5);
          clone.add([g, txt]);
          clone._mark = this.currentShortVowel;

          this.fusionCar.addEngine(clone, this.currentShortVowel);
          this.fusionCar.extendChassis(this.currentLongVowel);

          this.time.delayedCall(1500, () => {
            this.playing = true;
            this.env.start();
            this.equationText.setText(`Great! The syllable is: ${this.targetLetter}${this.currentShortVowel}${this.currentLongVowel}`);
            try { playTone(800, 'triangle', 0.2); setTimeout(() => playTone(1200, 'triangle', 0.4), 200); } catch(e) {}

            // ====== الإضافة الجديدة: ظهور المقطع بخط كبير في منتصف الشاشة ======
            const fullWord = this.targetLetter + this.currentShortVowel + this.currentLongVowel;
            const winText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, fullWord, {
                fontSize: '150px',
                fontFamily: '"Noto Naskh Arabic", sans-serif',
                color: '#ee5337', // لون برتقالي/أحمر جميل
                stroke: '#ffffff',
                strokeThickness: 12,
                padding: { left:40, right:40, top:40, bottom:40 }
            }).setOrigin(0.5).setScale(0).setDepth(100);

            // حركة ظهور (Pop-up) ممتعة للنص
            this.tweens.add({ targets: winText, scale: 1, duration: 800, ease: 'Back.out' });
            // =====================================================================
          });
        }
      });
    }
  }


/* ════════════════════════════════════════════════════════════
   📄 ShaddaScene.js
   ════════════════════════════════════════════════════════════ */

/* ============================================================
   PHASER — SHADDA SCENE
============================================================ */
/* ============================================================
   PHASER — SHADDA SCENE (Lead Connects, Back Follows)
============================================================ */
class ShaddaScene extends Phaser.Scene {
  constructor() { super('ShaddaScene'); }

  create() {
    const W = this.scale.width, H = this.scale.height;
    this.env = new Environment(this, W, H);

    this.shaddaLetter = window.currentPhaserShaddaLetter || 'ب';
    this.helperLetter = window.currentPhaserHelperLetter || 'أ';

    // 1. السيارة الخلفية (تسير خلفهم)
    this.backCar = new Car(this, W * 0.15, H - 95, this.shaddaLetter);

    // 2. سيارة الحاجز (الساكنة في المنتصف)
    this.obsCar = new Car(this, W * 0.45, H - 95, this.shaddaLetter);
    const obsEng = this._buildEngine(0x444444, 'ْ');
    this.obsCar.addEngine(obsEng, 'ْ');

    // 3. السيارة القائدة (في الأمام)
    this.leadCarStartX = W * 0.82;
    this.leadCar = new Car(this, this.leadCarStartX, H - 95, this.helperLetter);

    this.couplerGfx = this.add.graphics();
    this.isConnected = false;
    this.isBackReady = false;
    this.isLeadReady = false;
    this.isPlaying = false;

    this.backZone = this.add.zone(this.backCar.x, this.backCar.y, 260, 200).setRectangleDropZone(260, 200);
    this.backZone.owner = 'back';
    this.leadZone = this.add.zone(this.leadCar.x, this.leadCar.y, 260, 200).setRectangleDropZone(260, 200);
    this.leadZone.owner = 'lead';

    this.input.on('drop', (_, obj, zone) => this.handleDrop(obj, zone));

    const sBtn = this.add.container(W - 70, 60).setSize(60, 60).setInteractive({ useHandCursor: true });
    sBtn.add([this.add.circle(0, 0, 28, 0xe74c3c), this.add.text(0, 0, '⏹', { fontSize: '28px', color: '#fff' }).setOrigin(0.5)]);
    sBtn.on('pointerdown', () => this.scene.restart());

    this.equationText = this.add.text(W / 2, 38, `ركّب المحركات: القائدة تتصل بالساكنة، والثالثة تتبعهما!`, { fontFamily: 'Tajawal', fontSize: '20px', color: '#f1c40f', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);

    const topY = 110;
    // حركات السيارة الثالثة (ليست شدة)
    this._mkEngine(120, topY, 'َ', 0xee5337, 'fathaLeft', true);
    this._mkEngine(230, topY, 'ُ', 0x27ae60, 'dammaLeft', true);
    this._mkEngine(340, topY, 'ِ', 0x0369a1, 'kasraLeft', true);

    // حركات السيارة القائدة
    this._mkEngine(W - 340, topY, 'َ', 0xee5337, 'fathaRight', false);
    this._mkEngine(W - 230, topY, 'ُ', 0x27ae60, 'dammaRight', false);
    this._mkEngine(W - 120, topY, 'ِ', 0x0369a1, 'kasraRight', false);
  }

  update() {
    this.backZone.x = this.backCar.x; this.backZone.y = this.backCar.y;
    this.leadZone.x = this.leadCar.x; this.leadZone.y = this.leadCar.y;

    // رسم الوصلة (الحبل) بين السيارة القائدة والساكنة
    if (this.isConnected) {
      this.couplerGfx.clear();
      const x1 = this.leadCar.x - 125, y1 = this.leadCar.y + 20, x2 = this.obsCar.x + 125, y2 = this.obsCar.y + 20;
      this.couplerGfx.lineStyle(14, 0x2c3e50); this.couplerGfx.lineBetween(x1, y1, x2, y2);
      this.couplerGfx.lineStyle(4, 0x7f8c8d); this.couplerGfx.lineBetween(x1, y1 + 4, x2, y2 + 4);
      this.couplerGfx.fillStyle(0x95a5a6, 1); this.couplerGfx.fillCircle(x1, y1, 10); this.couplerGfx.fillCircle(x2, y2, 10);
    }

    if (this.isPlaying) {
      this.env.update();
      this.leadCar.animateDrive(1.5);
      this.obsCar.animateDrive(1.5);
      this.backCar.animateDrive(1.5);
    }
  }

  _buildEngine(color, mark) {
    const c = this.add.container(0, 0);
    const g = this.add.graphics();
    g.fillStyle(color, 1); g.fillCircle(0, 0, 38);
    for (let i = 0; i < 8; i++) g.fillRect(Math.cos(i * 45 * Math.PI / 180) * 38 - 10, Math.sin(i * 45 * Math.PI / 180) * 38 - 10, 20, 20);
    g.lineStyle(2, 0xffffff, 0.4); g.strokeCircle(0, 0, 38);
    const textY = mark.includes('ِ') ? -5 : 5;
    const txt = this.add.text(0, textY, mark, { fontSize: '55px', fontFamily: '"Noto Naskh Arabic", sans-serif', color: '#ffffff', stroke: '#000', strokeThickness: 3, padding: { left: 20, right: 20, top: 40, bottom: 40 } }).setOrigin(0.5);
    c.add([g, txt]); return c;
  }

  _mkEngine(x, y, mark, color, type, isLeft) {
    const c = this.add.container(x, y).setSize(90, 90);
    c.initialX = x; c.initialY = y;
    const g = this.add.graphics();
    g.fillStyle(color, 1); g.fillCircle(0, 0, 38);
    for (let i = 0; i < 8; i++) g.fillRect(Math.cos(i * 45 * Math.PI / 180) * 38 - 10, Math.sin(i * 45 * Math.PI / 180) * 38 - 10, 20, 20);
    g.lineStyle(2, 0xffffff, 0.4); g.strokeCircle(0, 0, 38);
    const textY = mark.includes('ِ') ? -5 : 5;
    const txt = this.add.text(0, textY, mark, { fontSize: '55px', fontFamily: '"Noto Naskh Arabic", sans-serif', color: '#ffffff', stroke: '#000', strokeThickness: 3, padding: { left: 20, right: 20, top: 40, bottom: 40 } }).setOrigin(0.5);
    c.add([g, txt]); c.setInteractive({ draggable: true, useHandCursor: true });
    c.mark = mark; c.color = color; c.isLeft = isLeft;
    this.input.setDraggable(c); this.engines = (this.engines || []); this.engines.push(c);
    c.on('drag', (_, dx, dy) => { c.x = dx; c.y = dy; });
    c.on('dragend', () => { if (!c.dropped) this.tweens.add({ targets: c, x: c.initialX, y: c.initialY, duration: 300, ease: 'Back.out' }); });
  }

 handleDrop(engine, zone) {
    if (this.isPlaying) return;

    // حالة: وضع الموتور على السيارة الخلفية
    if (zone.owner === 'back' && !this.isBackReady && engine.isLeft) {
      engine.setVisible(false); engine.dropped = true;
      const clone = this._buildEngine(engine.color, engine.mark);
      this.backCar.addEngine(clone, engine.mark);
      this.isBackReady = true;
      this.backMark = engine.mark;

      // 👇 الإضافة السحرية: تتقدم السيارة للساكنة وتبدأ في الاهتزاز
      this.tweens.add({
        targets: this.backCar,
        x: this.obsCar.x - 290, // تتقدم لتقف خلف الساكنة
        duration: 800,
        ease: 'Power2',
        onUpdate: () => { this.backCar.wheels.forEach(w => w.rotation += 0.1); },
        onComplete: () => {
          try { playTone(300, 'sawtooth', 0.2); } catch (e) {}

          // بدء الاهتزاز المستمر
          this.backVibeTween = this.tweens.add({
            targets: this.backCar,
            x: '+=6', // اهتزاز يميناً ويساراً
            duration: 50,
            yoyo: true,
            repeat: -1
          });

          this._checkWin();
        }
      });
      return;
    }

    // حالة: وضع الموتور على السيارة القائدة
    if (zone.owner === 'lead' && !this.isLeadReady && !engine.isLeft) {
      engine.setVisible(false); engine.dropped = true;
      const clone = this._buildEngine(engine.color, engine.mark);

      let displayLetter = this.helperLetter;
      if (this.helperLetter === 'أ' && engine.mark === 'ِ') displayLetter = 'إ';
      this.leadCar.baseLetter = displayLetter;
      this.leadCar.letterTxt.setText(displayLetter);
      this.leadCar.addEngine(clone, engine.mark);

      this.isLeadReady = true;
      this.leadMark = engine.mark;

      try { playTone(300, 'sawtooth', 0.3); } catch (e) {}
      const targetX = this.obsCar.x + 290;
      this.tweens.add({
        targets: this.leadCar, x: targetX, duration: 1500, ease: 'Power2',
        onUpdate: () => { this.leadCar.wheels.forEach(w => w.rotation -= 0.1); },
        onComplete: () => {
          this.isConnected = true;
          try { playTone(400, 'triangle', 0.2); } catch (e) {}
          this._checkWin();
        }
      });
      return;
    }
    engine.dropped = false; this.tweens.add({ targets: engine, x: engine.initialX, y: engine.initialY, duration: 300, ease: 'Back.out' });
  }

  _checkWin() {
    let leadChar = this.helperLetter;
    if (this.isLeadReady) { leadChar = (this.helperLetter === 'أ' && this.leadMark === 'ِ') ? 'إ' : this.helperLetter; leadChar += this.leadMark; }
    const backPart = this.isBackReady ? this.shaddaLetter + this.backMark : this.shaddaLetter + '؟';
    this.equationText.setText(`${leadChar} + ${this.shaddaLetter}ْ + ${backPart}`);

    if (this.isLeadReady && this.isBackReady && this.isConnected) {
      this.time.delayedCall(500, () => this._startTrain());
    }
  }

  _startTrain() {
    if (this.backVibeTween) {
        this.backVibeTween.stop();
        this.backCar.x = this.obsCar.x - 290;
    }

    this.isPlaying = true;
    this.env.start();
    let leadChar = (this.helperLetter === 'أ' && this.leadMark === 'ِ') ? 'إ' : this.helperLetter;
    const finalWord = leadChar + this.leadMark + this.shaddaLetter + 'ّ' + this.backMark;

    this.equationText.setText(`تُكتب هكذا: ${finalWord}`);

    const bigTxt = this.add.text(this.scale.width / 2, this.scale.height / 2 - 160, finalWord, {
      fontSize: '150px', fontFamily: '"Noto Naskh Arabic",sans-serif', color: '#ee5337', stroke: '#fff', strokeThickness: 12, padding: { left: 40, right: 40, top: 40, bottom: 40 }
    }).setOrigin(0.5).setScale(0).setDepth(100);

    this.tweens.add({ targets: bigTxt, scale: 1, duration: 800, ease: 'Back.out' });
    try { setTimeout(() => playVictorySound(), 200); addStars(5); } catch (e) {}
  }

}

class TanweenScene extends Phaser.Scene {
  constructor() { super('TanweenScene'); }

  create() {
    const W = this.scale.width, H = this.scale.height;
    this.env = new Environment(this, W, H);
    this.letter = window.currentPhaserTanweenLetter || 'ب';

    this.noonCar = new Car(this, W*0.28, H - 95, 'ن');
    const nEng = this._buildEngine(0x444444,'ْ');
    this.noonCar.addEngine(nEng,'ْ');
    this.noonCar.setVisible(false); this.noonCar.alpha = 0;

    this.mainCarStartX = W*0.72;
    this.mainCar = new Car(this, this.mainCarStartX, H - 95, this.letter);

    this.couplerGfx = this.add.graphics();
    this.isRevealed = false; this.isPlaying  = false; this.chosenMark = '';

    this.dropZone = this.add.zone(this.mainCar.x,this.mainCar.y,300,200).setRectangleDropZone(300,200);
    this.input.on('drop',(_,obj)=>this.handleDrop(obj));

    const sBtn = this.add.container(W-70,60).setSize(60,60).setInteractive({useHandCursor:true});
    sBtn.add([this.add.circle(0,0,28,0xe74c3c), this.add.text(0,0,'⏹',{fontSize:'28px',color:'#fff'}).setOrigin(0.5)]);
    sBtn.on('pointerdown',()=>this.scene.restart());

    this.equationText = this.add.text(W/2, 38, `اختر التنوين المناسب لتسمع صوت النون الخفية!`, {fontFamily:'Tajawal',fontSize:'22px',color:'#f1c40f',stroke:'#000',strokeThickness:4}).setOrigin(0.5);

    this.tanweenItems = [];
    this._mkTanween(W/2-160, 110, 'ً','َ',0xee5337,'تنوين فتح');
    this._mkTanween(W/2,     110, 'ٌ','ُ',0x27ae60,'تنوين ضم');
    this._mkTanween(W/2+160, 110, 'ٍ','ِ',0x0369a1,'تنوين كسر');
  }

  update() {
    this.dropZone.x = this.mainCar.x; this.dropZone.y = this.mainCar.y;
    if (this.isRevealed) {
      this.couplerGfx.clear();
      const x1=this.mainCar.x-125, y1=this.mainCar.y+20, x2=this.noonCar.x+125, y2=this.noonCar.y+20;
      this.couplerGfx.lineStyle(14,0x2c3e50); this.couplerGfx.lineBetween(x1,y1,x2,y2);
      this.couplerGfx.lineStyle(4,0x7f8c8d); this.couplerGfx.lineBetween(x1,y1+4,x2,y2+4);
      this.couplerGfx.fillStyle(0x95a5a6,1); this.couplerGfx.fillCircle(x1,y1,10); this.couplerGfx.fillCircle(x2,y2,10);
    }
    if (this.isPlaying) { this.env.update(); this.mainCar.animateDrive(1.5); this.noonCar.animateDrive(1.5); }
  }

_buildEngine(color, mark) {
    const c = this.add.container(0,0);
    const g = this.add.graphics();
    g.fillStyle(color,1); g.fillCircle(0,0,38);
    for(let i=0;i<8;i++) g.fillRect(Math.cos(i*45*Math.PI/180)*38-10,Math.sin(i*45*Math.PI/180)*38-10,20,20);
    g.lineStyle(2,0xffffff,0.4); g.strokeCircle(0,0,38);

    const textY = mark.includes('ِ') || mark==='ٍ' ? -5 : 5;
    const txt = this.add.text(0, textY, mark, { fontSize:'55px', fontFamily:'"Noto Naskh Arabic", sans-serif', color:'#ffffff', stroke:'#000', strokeThickness:3, padding:{left:20,right:20,top:40,bottom:40} }).setOrigin(0.5);
    c.add([g,txt]); return c;
  }

  _mkTanween(x, y, tanweenMark, baseVowel, color, labelText) {
    const c = this.add.container(x, y).setSize(120, 130);
    c.initialX=x; c.initialY=y;
    const g1 = this.add.graphics(); g1.fillStyle(color,1); g1.fillCircle(-15,0,32);
    for(let i=0;i<8;i++) g1.fillRect(Math.cos(i*45*Math.PI/180)*32-8+(-15),Math.sin(i*45*Math.PI/180)*32-8,16,16);
    const g2 = this.add.graphics(); g2.fillStyle(color,1); g2.fillCircle(15,0,32);
    for(let i=0;i<8;i++) g2.fillRect(Math.cos(i*45*Math.PI/180)*32-8+15,Math.sin(i*45*Math.PI/180)*32-8,16,16);
    const textY = tanweenMark==='ٍ' ? -12 : -8;
    const markTxt = this.add.text(0, textY, tanweenMark, { fontSize:'60px', fontFamily:'"Noto Naskh Arabic"', color:'#ffffff', stroke:'#000', strokeThickness:3, padding:{left:15,right:15,top:35,bottom:35} }).setOrigin(0.5);
    const label = this.add.text(0, 65, labelText, { fontFamily:'Tajawal', fontSize:'18px', color:'#f1c40f', stroke:'#000', strokeThickness:3 }).setOrigin(0.5);
    c.add([g1, g2, markTxt, label]); c.setInteractive({draggable:true, useHandCursor:true});
    c.tanweenMark = tanweenMark; c.baseVowel = baseVowel; c.color = color;
    this.input.setDraggable(c); this.tanweenItems=(this.tanweenItems||[]); this.tanweenItems.push(c);
    c.on('drag',(_,dx,dy)=>{ c.x=dx; c.y=dy; });
    c.on('dragend',()=>{ if(!c.dropped) this.tweens.add({targets:c,x:c.initialX,y:c.initialY,duration:300,ease:'Back.out'}); });
  }

  handleDrop(item) {
    if (this.isPlaying || this.isRevealed) return;
    this.isRevealed = true; item.setVisible(false); item.dropped=true; this.chosenMark = item.tanweenMark;
    const eng = this._buildEngine(item.color, item.baseVowel);
    this.mainCar.addEngine(eng, item.baseVowel);
    const base = this.letter + item.baseVowel; let result = this.letter + item.tanweenMark;
    if (item.tanweenMark==='ً' && !['ة','ء','أ','إ','آ'].includes(this.letter)) result = this.letter+'ًا';
    this.equationText.setText(`${result} = ${base} + نْ`);
    this._revealNoon(item.tanweenMark);
  }

  _revealNoon(tanweenMark) {
    try { playTone(400,'triangle',0.2); } catch(e){}
    this.noonCar.setVisible(true); this.noonCar.y = this.mainCar.y - 60;
    this.tweens.add({ targets:this.noonCar, y:this.mainCar.y, alpha:1, duration:800, ease:'Bounce.out', onComplete:()=>this._driveTanween(tanweenMark) });
  }

  _driveTanween(tanweenMark) {
    this.time.delayedCall(500,()=>{
      this.isPlaying=true; this.env.start();
      let finalWord = this.letter + tanweenMark;
      if (tanweenMark==='ً' && !['ة','ء','أ','إ','آ'].includes(this.letter)) finalWord = this.letter+'ًا';
      const bigTxt = this.add.text(this.scale.width/2, this.scale.height/2-160, finalWord, { fontSize:'150px', fontFamily:'"Noto Naskh Arabic",sans-serif', color:'#ee5337', stroke:'#fff', strokeThickness:12, padding:{left:40,right:40,top:40,bottom:40} }).setOrigin(0.5).setScale(0).setDepth(100);
      this.tweens.add({targets:bigTxt,scale:1,duration:800,ease:'Back.out'});
      try { setTimeout(()=>playVictorySound(),200); addStars(5); } catch(e){}
    });
  }
}

/* ════════════════════════════════════════════════════════════
   📄 config.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   CONFIG.JS — إعدادات Phaser ومدير المشاهد
   ============================================================
   📌 المشكلة الأصلية:
      كان الكود يُدمّر Phaser ويُعيد إنشاءه في كل انتقال:
        phaserGame.destroy(true);
        phaserGame = new Phaser.Game({ ... });
      هذا مكلف جداً على الذاكرة ويسبب وميضاً في الشاشة.

   📌 الحل الجديد — مدير المشاهد (Scene Manager):
      نُنشئ Phaser مرة واحدة فقط عند بدء التطبيق
      ثم نوقف ونشغّل المشاهد حسب الحاجة.
      هذا أسرع وأكثر استقراراً.

   📌 كيف تستخدم؟
      PhaserManager.startScene('MainScene', { letter: 'ب' });
      PhaserManager.stopAll();
      PhaserManager.destroy(); // عند الضرورة القصوى فقط
   ============================================================ */

/* ----------------------------------------------------------
   PhaserManager — المدير الوحيد لكل ما يتعلق بـ Phaser
   ---------------------------------------------------------- */
const PhaserManager = (() => {

  let _game = null;        // instance اللعبة الوحيد
  let _currentScene = '';  // اسم المشهد الحالي

  /* ----------------------------------------------------------
     init — تهيئة Phaser مرة واحدة فقط
     @param {string} parentId - id عنصر الحاوية في HTML
     @param {number} w        - عرض اللعبة بالبكسل
     @param {number} h        - ارتفاع اللعبة بالبكسل
     @param {Array}  scenes   - مصفوفة classes المشاهد
     ---------------------------------------------------------- */
  function init(parentId, w = 1000, h = 400, scenes = []) {
    if (_game) return; // لا تُنشئ مرتين!

    _game = new Phaser.Game({
      type:       Phaser.AUTO,
      parent:     parentId,
      width:      w,
      height:     h,
      scale: {
        mode:       Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      backgroundColor: '#0b1026',
      input: {
        mouse: { preventDefaultWheel: false },
        touch: { capture: false },
      },
      scene: scenes, // جميع المشاهد محمّلة مرة واحدة
    });

    // إيقاف كل المشاهد بعد 500ms (تُشغَّل عند الطلب فقط)
    setTimeout(() => stopAll(), 500);
  }

  /* ----------------------------------------------------------
     startScene — تشغيل مشهد محدد مع تمرير البيانات
     @param {string} sceneName - اسم المشهد (مثال: 'MainScene')
     @param {Object} data      - بيانات تُمرَّر لمشهد init()
     ---------------------------------------------------------- */
  function startScene(sceneName, data = {}) {
    if (!_game) {
      console.warn('[PhaserManager] Game not initialized. Call PhaserManager.init() first.');
      return;
    }

    // إيقاف المشهد السابق أولاً
    if (_currentScene && _currentScene !== sceneName) {
      try { _game.scene.stop(_currentScene); } catch (e) {}
    }

    _currentScene = sceneName;

    // تحديث المتغيرات العامة (للتوافق مع المشاهد التي تقرأ من AppState)
    _syncGlobals(data);

    // تشغيل المشهد أو إعادة تشغيله إذا كان يعمل
    try {
      if (_game.scene.isActive(sceneName)) {
        _game.scene.stop(sceneName);
        setTimeout(() => _game.scene.start(sceneName, data), 50);
      } else {
        _game.scene.start(sceneName, data);
      }
    } catch (e) {
      console.error('[PhaserManager] Error starting scene:', sceneName, e);
    }
  }

  /* ----------------------------------------------------------
     _syncGlobals — مزامنة AppState.phaserLetter مع window
     للتوافق مع الكود القديم الذي يقرأ window.currentPhaserXxx
     ---------------------------------------------------------- */
  function _syncGlobals(data) {
    // MainScene
    if (data.letter)        window.currentPhaserLetter        = data.letter;
    // MaddScene
    if (data.maddLetter)    window.currentPhaserLetter        = data.maddLetter;
    // SukoonScene
    if (data.frontLetter)   window.currentPhaserFrontLetter   = data.frontLetter;
    if (data.backLetter)    window.currentPhaserBackLetter    = data.backLetter;
    // ShaddaScene
    if (data.shaddaLetter)  window.currentPhaserShaddaLetter  = data.shaddaLetter;
    if (data.helperLetter)  window.currentPhaserHelperLetter  = data.helperLetter;
    // TanweenScene
    if (data.tanweenLetter) window.currentPhaserTanweenLetter = data.tanweenLetter;
  }

  /* ----------------------------------------------------------
     stopAll — إيقاف كل المشاهد
     يُستدعى عند العودة للقائمة أو الانتقال بين الشاشات
     ---------------------------------------------------------- */
  function stopAll() {
    if (!_game) return;
    const sceneNames = ['MainScene', 'SukoonScene', 'MaddScene', 'ShaddaScene', 'TanweenScene'];
    sceneNames.forEach(name => {
      try { _game.scene.stop(name); } catch (e) {}
    });
    _currentScene = '';
  }

  /* ----------------------------------------------------------
     setParent — نقل canvas لعنصر HTML آخر
     يُستخدم عند الانتقال بين شاشات تحتوي containers مختلفة
     ---------------------------------------------------------- */
  function setParent(newParentId) {
    if (!_game) return;
    const newParent = document.getElementById(newParentId);
    if (!newParent) return;
    try {
      const canvas = _game.canvas;
      if (canvas && canvas.parentElement?.id !== newParentId) {
        newParent.appendChild(canvas);
      }
    } catch (e) {}
  }

  /* ----------------------------------------------------------
     destroy — تدمير كامل (استخدم فقط عند الضرورة القصوى)
     مثال: تغيير عرض/ارتفاع اللعبة بشكل جذري
     ---------------------------------------------------------- */
  function destroy() {
    if (_game) {
      _game.destroy(true);
      _game = null;
      _currentScene = '';
    }
  }

  /* ----------------------------------------------------------
     الواجهة العامة
     ---------------------------------------------------------- */
  return { init, startScene, stopAll, setParent, destroy, getGame: () => _game };

})();


/* ════════════════════════════════════════════════════════════
   📄 ui.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   UI.JS — منطق الواجهة الرئيسية والتنقل بين الشاشات
   ============================================================
   📌 هيكل هذا الملف:
      1. متغيرات الحالة المحلية (الحرف الحالي لكل مستوى)
      2. دوال التنقل: goHome / openLetter / openSukoonLevel...
      3. رسم الشبكات: renderAlphabetGrid / renderSukoonGrid...
      4. بناء واجهة الحرف: buildMotorsHTML / initSectionDots...
      5. دوال ألعاب المفقود للمستويات: initSukoonMissing...
      6. Map Node Switcher (التنقل بين المراحل)
      7. initApp — نقطة البداية الرئيسية

   ⚠️ ملاحظة Phaser:
      الكود الأصلي كان يُدمّر Phaser ويُعيد إنشاءه في كل انتقال.
      الآن نستخدم PhaserManager من config.js — أسرع وأكثر استقراراً.
      لكن لأن كل مستوى له container مختلف في HTML، نحتفظ
      بنمط إنشاء Phaser مستقل لكل مستوى مؤقتاً حتى يكتمل
      نقل الـ containers لـ HTML موحّد.
   ============================================================ */


/* ============================================================
   1. متغيرات الحالة المحلية
   ============================================================ */

// حالة مستوى السكون
let currentSukoonFront = 'أ';
let currentSukoonBack  = 'ب';

// حالة مستوى المد
let currentMaddModule       = null;
let currentMaddTargetLetter = 'ب';

// حالة مستوى الشدة
let currentShaddaLetter = 'ب';
let currentHelperLetter = 'أ';

// حالة مستوى التنوين
let currentTanweenLetter = 'ب';

// بيانات ألعاب المفقود لكل مستوى
const SUKOON_DATA = {
  missing: [
    { display: 'مَكْـ<span class="missing-gap"></span>ـبُ',  correct: 0, opts: ['تَ', 'تْ', 'تُ'] },
    { display: 'يَقْـ<span class="missing-gap"></span>َأُ',  correct: 0, opts: ['رْ', 'رَ', 'رِ'] },
    { display: 'مَسْـ<span class="missing-gap"></span>ـدُ',  correct: 2, opts: ['جَ', 'جْ', 'جِ'] },
    { display: 'فَصْـ<span class="missing-gap"></span>',    correct: 0, opts: ['لُ', 'لْ', 'لِ'] },
    { display: 'قَلْـ<span class="missing-gap"></span>',    correct: 1, opts: ['بَ', 'بُ', 'بِ'] },
    { display: 'نَهْـ<span class="missing-gap"></span>',    correct: 0, opts: ['رُ', 'رْ', 'رِ'] },
  ],
  cards: [
    { l1: 'بَ', l2: 'يْ', l3: 'تُ' },
    { l1: 'شَ', l2: 'مْ', l3: 'سُ' },
    { l1: 'قَ', l2: 'لْ', l3: 'بُ' },
    { l1: 'نَ', l2: 'هْ', l3: 'رُ' },
    { l1: 'كَ', l2: 'لْ', l3: 'بُ' },
    { l1: 'بَ', l2: 'حْ', l3: 'رُ' },
    { l1: 'فَ', l2: 'صْ', l3: 'لُ' },
    { l1: 'نَ', l2: 'مْ', l3: 'لُ' },
    { l1: 'ثَ', l2: 'لْ', l3: 'جُ' },
  ],
  wordBank: ['بَيْتُ','مَكْتَبُ','شَمْسُ','فَصْلُ','نَمْلُ','ثَلْجُ','بَحْرُ','كَلْبُ','أَهْلُ','نَهْرُ','يَقْرَأُ','مَسْجِدُ','نَلْعَبُ','تَكْتُبُ','مَلْعَبُ'],
  xoWords:   ['يَقْرَأُ','مَكْتَبُ','مَسْجِدُ','يَذْهَبُ','أَحْمَدُ','فَصْلُ','نَلْعَبُ','تَكْتُبُ','مَلْعَبُ'],
  storyText: 'ذَهَبَ أَحْمَدُ إِلَى مَكْتَبٍ قَرِيبٍ. رَأَى شَمْسًا، ثُمَّ جَلَسَ فِي فَصْلٍ هَادِئٍ، وَقَرَأَ كَلِمَاتٍ فِيهَا سُكُونٌ مِثْلُ بَيْتٍ وَنَهْرٍ وَقَلْبٍ وَشَمْسٍ وَمَكْتَبٍ.',
  quranText: '﴿ أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۝ وَوَضَعْنَا عَنكَ وِزْرَكَ ۝ الَّذِي أَنقَضَ ظَهْرَكَ ﴾',
};


/* ════════════════════════════════════════════════════════════
   🎯 ADVANCED_LEVELS_DB — Centralized Word Bank for Mini-Games
   ════════════════════════════════════════════════════════════
   Linguistically-verified Arabic words for the 4 advanced levels.
   These are injected into every mini-game (Wheel, Memory, Speed
   Reading, Tricky Cups, XO) via the levelKey parameter.

   Each level key ('sukoon', 'madd', 'shadda', 'tanween') exposes:
     • words: the full word list for that level
     • splitWords / xoWords aliases (for existing helper functions)
   ════════════════════════════════════════════════════════════ */
const ADVANCED_LEVELS_DB = {
  sukoon: {
    words: ['بَيْتُ', 'مَكْتَبُ', 'شَمْسُ', 'فَصْلُ', 'نَمْلُ', 'ثَلْجُ', 'بَحْرُ', 'كَلْبُ', 'أَهْلُ', 'نَهْرُ'],
  },
  madd: {
    words: ['بَابٌ', 'سُورٌ', 'تِينٌ', 'قَالَ', 'يَقُولُ', 'قِيلَ', 'دَارٌ', 'حُوتٌ', 'رِيحٌ', 'عِيدٌ'],
  },
  shadda: {
    words: ['أُمُّ', 'جَدُّ', 'بَطَّةٌ', 'قِطَّةٌ', 'سُكَّرٌ', 'صَفَّ', 'رَبَّ', 'حَقُّ', 'مَدَّ', 'سِنٌّ'],
  },
  tanween: {
    words: ['بَيْتًا', 'قَلَمٌ', 'شَجَرَةٍ', 'مَاءً', 'كِتَابٌ', 'جَبَلٍ', 'نَهَارًا', 'نُورٌ', 'صُبْحًا', 'وَلَدٌ'],
  },
};
// Expose aliases for compatibility with existing helper code
Object.keys(ADVANCED_LEVELS_DB).forEach(k => {
  ADVANCED_LEVELS_DB[k].splitWords = ADVANCED_LEVELS_DB[k].words;
  ADVANCED_LEVELS_DB[k].xoWords    = ADVANCED_LEVELS_DB[k].words;
});
// Helper: returns the word list for any given levelKey, with safe fallback
function getAdvancedWords(levelKey) {
  if (levelKey && ADVANCED_LEVELS_DB[levelKey]) {
    return [...ADVANCED_LEVELS_DB[levelKey].words];
  }
  return null;
}
function setAdvancedLevelWords(levelKey, words) {
  if (!levelKey || !ADVANCED_LEVELS_DB[levelKey] || !Array.isArray(words)) return;
  const clean = [...new Set(words.filter(Boolean))];
  ADVANCED_LEVELS_DB[levelKey].words = clean;
  ADVANCED_LEVELS_DB[levelKey].splitWords = clean;
  ADVANCED_LEVELS_DB[levelKey].xoWords = clean;
}
window.ADVANCED_LEVELS_DB = ADVANCED_LEVELS_DB;
window.getAdvancedWords   = getAdvancedWords;
window.setAdvancedLevelWords = setAdvancedLevelWords;
// Track which advanced level is currently active (null = letter mode)
window.activeAdvancedLevel = null;


/* ============================================================
   2. مساعد مشترك: إنشاء Phaser لمستوى محدد
   ============================================================
   📌 يُقلّل التكرار — بدلاً من كتابة new Phaser.Game في كل مكان
   @param {string} parentId - id الحاوية في HTML
   @param {Array}  scenes   - مصفوفة المشاهد
   @param {number} h        - الارتفاع (اختياري، 400 افتراضياً)
   ============================================================ */
function _launchPhaser(parentId, scenes, h = 400) {
  // تدمير الـ instance القديم إذا وُجد
  if (phaserGame) {
    try { phaserGame.destroy(true); } catch (e) {}
  }
  const container = document.getElementById(parentId);
  if (container) container.innerHTML = '';

  setTimeout(() => {
    phaserGame = new Phaser.Game({
      type:  Phaser.AUTO,
      parent: parentId,
      width:  1000,
      height: h,
      scale:  { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      backgroundColor: '#0b1026',
      input:  { mouse: { preventDefaultWheel: false }, touch: { capture: false } },
      scene:  scenes,
    });
  }, 50);
}

/* ============================================================
   3. مساعد مشترك: إخفاء كل الشاشات وإظهار واحدة
   ============================================================ */
const ALL_SCREENS = [
  'home-screen','letter-screen','sukoon-screen',
  'madd-screen','shadda-screen','tanween-screen','verb-lab-screen',
];

function _showScreen(id) {
  // إخفاء كل الشاشات أولاً
  ALL_SCREENS.forEach(sid => {
    const el = document.getElementById(sid);
    if (!el) return;
    el.style.display = 'none';
    el.style.opacity = '0';
  });

  // إظهار الشاشة المطلوبة
  const target = document.getElementById(id);
  if (!target) return;
  target.style.display = 'block';

  // letter-screen ليس له transition في الـ CSS — نظهره مباشرة بدون delay
  if (id === 'letter-screen') {
    target.style.opacity = '1';
  } else {
    setTimeout(() => { target.style.opacity = '1'; }, 50);
  }

  window.scrollTo(0, 0);
}

/* ============================================================
   4. التنقل الرئيسي
   ============================================================ */

/**
 * goHome — العودة للشاشة الرئيسية (خريطة التعلم)
 */
function goHome() {
  // إيقاف Phaser إذا كان يعمل
  if (phaserGame) {
    try {
      ['MainScene','SukoonScene','MaddScene','ShaddaScene','TanweenScene']
        .forEach(n => phaserGame.scene.stop(n));
    } catch (e) {}
  }

  window.removeEventListener('scroll', updateScrollProgress);
  document.getElementById('letter-progress-bar').style.display = 'none';
  document.getElementById('letter-progress-fill').style.width  = '0%';

  // Clear advanced-level scope so letter-mode mini-games re-engage
  window.activeAdvancedLevel = null;
  if (typeof _srState !== 'undefined') _srState.levelKey = null;
  if (typeof _tcState !== 'undefined') _tcState.levelKey = null;

  _showScreen('home-screen');
  _pushRoute('#arabic');
  setTimeout(alignMapPointer, 100);
}

/**
 * openArabicJourney — من لوحة التحكم إلى خريطة العربية
 */
function openArabicJourney() {
  document.getElementById('dashboard-screen').style.display = 'none';
  if (typeof _navShowBack === 'function') _navShowBack(true);
  _showScreen('home-screen');
  _pushRoute('#arabic');
  setTimeout(alignMapPointer, 100);
}

/**
 * openLanguageUnderstanding: فتح المرحلة الثانية، فهم اللغة
 */
function openLanguageUnderstanding() {
  try {
    if (typeof playTone === 'function') playTone(520, 'sine', 0.1, 0.05);
  } catch (e) {}
  document.getElementById('dashboard-screen').style.display = 'none';
  _showScreen('verb-lab-screen');
  loadVerbLabFrame();
  if (typeof _navShowBack === 'function') _navShowBack(true);
  if (typeof _navOnScreen === 'function') _navOnScreen('verb-lab-screen');
  _pushRoute('#verb-lab');
}

function loadVerbLabFrame() {
  const frame = document.getElementById('verb-lab-frame');
  if (!frame) return;
  if (frame.dataset.loaded === '1') {
    sendVerbLabSession();
    return;
  }

  frame.onload = () => {
    frame.dataset.loaded = '1';
    sendVerbLabSession();
  };

  const srcdocNode = document.getElementById('verb-lab-srcdoc-json');
  if (srcdocNode && srcdocNode.textContent.trim()) {
    try {
      frame.srcdoc = JSON.parse(srcdocNode.textContent);
      return;
    } catch (e) {
      console.warn('Embedded Verb Lab source failed to parse', e);
    }
  }
  frame.srcdoc = '<!doctype html><meta charset="utf-8"><body style="font-family:sans-serif;padding:24px">Verb Lab source is missing.</body>';
}

function getVerbLabSessionPayload() {
  const session = getCurrentJameaSession() || {};
  return {
    source: 'jamea-parent',
    type: 'session',
    sessionType: session.sessionType || session.role || 'student',
    role: session.role || (currentUser && currentUser.role) || 'student',
    profileId: session.profileId || (currentUser && currentUser.id) || '',
    displayName: session.displayName || '',
    activeChildId: session.activeChildId || '',
    activeChildName: session.activeChildName || '',
    parentProfileId: session.parentProfileId || '',
    studentCode: studentCode || '',
    studentEmail: studentEmail || '',
    userId: currentUser && currentUser.id ? currentUser.id : '',
    theme: document.body.getAttribute('data-theme') || 'light',
    progress: normalizeVerbLabProgress(playerProgress.verbLab),
  };
}

function sendVerbLabSession() {
  const frame = document.getElementById('verb-lab-frame');
  if (!frame || !frame.contentWindow || frame.dataset.loaded !== '1') return;
  frame.contentWindow.postMessage(getVerbLabSessionPayload(), '*');
}

function getVerbLabBridgeScript() {
  return `
<script>
(function() {
  'use strict';

  function send(type, payload) {
    try {
      window.parent.postMessage(Object.assign({ source: 'jamea-verb-lab', type: type }, payload || {}), '*');
    } catch (e) {}
  }

  function applySession(session) {
    studentCode = session.studentCode || '';
    studentEmail = (session.studentEmail || '').toLowerCase();
    currentUser = (studentEmail || session.userId || session.profileId)
      ? { id: session.profileId || session.userId || ('email:' + studentEmail), email: studentEmail, role: session.role || 'student' }
      : (studentCode ? { id: 'jamea:' + studentCode, email: studentCode + '@jamea.local' } : null);
    window.studentCode = studentCode;
    window.studentEmail = studentEmail;
    window.jameaSession = {
      sessionType: session.sessionType || 'student',
      role: session.role || 'student',
      profileId: session.profileId || (currentUser && currentUser.id) || '',
      displayName: session.displayName || session.activeChildName || '',
      activeChildId: session.activeChildId || '',
      activeChildName: session.activeChildName || '',
      parentProfileId: session.parentProfileId || ''
    };

    if (session.theme) {
      document.body.setAttribute('data-theme', session.theme);
      var themeIcon = document.getElementById('theme-icon');
      if (themeIcon) themeIcon.className = session.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    playerProgress = normalizeProgress(session.progress || { unlocked: ['v1'], stars: 0, completed: [] });

    var login = document.getElementById('login-overlay');
    var home = document.getElementById('home-screen');
    var name = document.getElementById('studentName');
    var stars = document.getElementById('starsCount');
    if (login) login.style.display = 'none';
    if (home) home.style.display = 'block';
    if (name) name.textContent = session.activeChildName || session.displayName || studentEmail || (studentCode ? 'Student ' + studentCode : 'Student');
    if (stars) stars.textContent = playerProgress.stars;
    if (typeof updateAccountUi === 'function') updateAccountUi();
    if (typeof _navInit === 'function') _navInit(session.activeChildName || session.displayName || studentEmail || studentCode || 'Student');
    if (typeof _navOnScreen === 'function') _navOnScreen('home-screen');
    if (typeof renderMap === 'function') renderMap();
  }

  window.restoreAuthSession = async function() {
    send('ready');
    return true;
  };

  window.loginStudent = async function() {
    send('ready');
    return false;
  };

  window.saveProgress = function() {
    playerProgress = normalizeProgress(playerProgress);
    try {
      localStorage.setItem('verblab_' + (studentCode || 'guest'), JSON.stringify(playerProgress));
    } catch (e) {}
    var stars = document.getElementById('starsCount');
    if (stars) stars.textContent = playerProgress.stars;
    send('save-progress', { progress: playerProgress });
  };

  window.scheduleRemoteProgressSave = function() {
    window.saveProgress();
  };

  window.saveProgressRemote = async function() {
    window.saveProgress();
  };

  window.logoutStudent = function() {
    send('logout');
  };

  window.addEventListener('message', function(event) {
    var msg = event.data || {};
    if (msg.source !== 'jamea-parent') return;
    if (msg.type === 'session') applySession(msg);
  });

  document.addEventListener('DOMContentLoaded', function() {
    send('ready');
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  if (typeof updateGoogleSignInUi === 'function') {
    updateGoogleSignInUi();
  }
  if (typeof restoreAuthSession === 'function') {
    restoreAuthSession();
  }
});
<\\/script>`;
}

window.addEventListener('message', function(event) {
  const frame = document.getElementById('verb-lab-frame');
  const msg = event.data || {};
  if (!frame || event.source !== frame.contentWindow || msg.source !== 'jamea-verb-lab') return;

  if (msg.type === 'ready') {
    sendVerbLabSession();
    return;
  }

  if (msg.type === 'save-progress') {
    playerProgress.verbLab = normalizeVerbLabProgress(msg.progress);
    saveProgress();
    return;
  }

  if (msg.type === 'logout') {
    logoutStudent();
  }
});

/**
 * backToDashboard — العودة للوحة التحكم الرئيسية
 */
function backToDashboard() {
  // إيقاف Phaser
  if (phaserGame) {
    try {
      ['MainScene','SukoonScene','MaddScene','ShaddaScene','TanweenScene']
        .forEach(n => phaserGame.scene.stop(n));
    } catch (e) {}
  }

  ALL_SCREENS.forEach(sid => {
    const el = document.getElementById(sid);
    if (el) { el.style.display = 'none'; el.style.opacity = '0'; }
  });

  if (typeof _navShowBack === 'function') _navShowBack(false);
  document.getElementById('dashboard-screen').style.display  = 'block';
  _pushRoute('#dashboard');
}

/**
 * openQuranJourney — فتح لعبة لغز القرآن
 */
function openQuranJourney() {
  if (typeof toggleQuranPuzzle === 'function') {
    toggleQuranPuzzle();
  } else {
    showToast('Quran module is coming soon!', 3000);
  }
}

/**
 * openIslamicsJourney — مستقبلي
 */
function openIslamicsJourney() {
  showToast('Islamic Studies module is coming soon! 📚', 3000);
}


/* ============================================================
   5. شاشة الحرف الرئيسية
   ============================================================ */

/**
 * openLetter — فتح شاشة تعلم حرف معين
 * @param {string} key - رمز الحرف (مثال: 'ب')
 */
function openLetter(key) {
  activeLetterKey = key;
  // Clear advanced-level scope — letter mode uses lettersDB, not ADVANCED_LEVELS_DB
  window.activeAdvancedLevel = null;
  if (typeof _srState !== 'undefined') _srState.levelKey = null;
  if (typeof _tcState !== 'undefined') _tcState.levelKey = null;
  const data = lettersDB[key];
  if (!data) return;

  // ── بيانات الجولي فونيكس ──────────────────────────────
  document.getElementById('ui-hero-letter').textContent = data.symbol;

  const storyEl  = document.getElementById('ui-jolly-story');
  const actionEl = document.getElementById('ui-jolly-action');
  storyEl.innerHTML  = data.jollyStory;
  actionEl.innerHTML = data.jollyAction;
  storyEl.style.direction  = data.jollyArabic ? 'rtl' : 'ltr';
  actionEl.style.direction = data.jollyArabic ? 'rtl' : 'ltr';
  document.getElementById('ui-jolly-sound').innerHTML = data.jollyRawSound;

  // ── قسم المحركات ──────────────────────────────────────
  // ✅ إصلاح: نعرض الحركات الثلاث دائماً لجميع الحروف
  document.getElementById('ui-motor-section').innerHTML = buildMotorsHTML(key);

  // ── قسم المقاطع ذات الحرفين ──────────────────────────
  const fathPairs = generateFathAlRahmanPairs(key);
  document.getElementById('ui-two-letter-container').innerHTML = fathPairs.map(p => {
    const isCut = RAFISA.some(r => p.c1.includes(r));
    const p1Class = 'piece no-nub ' + (isCut ? 'no-hole' : '');
    const p2Class = 'piece no-hole ' + (isCut ? 'no-nub' : '');
    return `<div class="puzzle-wrap" onmouseenter="playTone(450,'sine',0.1,0.02)">
      <div class="${p1Class}">${p.c1}</div>
      <div class="${p2Class}">${p.c2}</div>
    </div>`;
  }).join('');

  // ── قسم المقاطع ذات الثلاثة أحرف ─────────────────────
  document.getElementById('ui-cards-container').innerHTML = data.cards.map(c => {
    const cut1 = RAFISA.some(r => (c.l1 || '').includes(r));
    const cut2 = RAFISA.some(r => (c.l2 || '').includes(r));
    const p1Class = 'piece no-nub '  + (cut1 ? 'no-hole' : '');
    const p2Class = 'piece '         + (cut1 ? 'no-nub ' : '') + (cut2 ? 'no-hole' : '');
    const p3Class = 'piece no-hole ' + (cut2 ? 'no-nub' : '');
    return `<div class="puzzle-wrap">
      <div class="${p1Class}" style="${c.hl1 ? 'background:var(--red);' : ''}">${c.l1}</div>
      <div class="${p2Class}" style="${c.hl2 ? 'background:var(--red);' : ''}">${c.l2}</div>
      <div class="${p3Class}" style="${c.hl3 ? 'background:var(--red);' : ''}">${c.l3}</div>
    </div>`;
  }).join('');

  // ── قسم أشكال الحرف وقاعدة الاتصال ───────────────────
  const positions = ['Beginning', 'Middle', 'End', 'Isolated'];
  const rule      = getLetterRule(data.symbol);
  let shapesHTML  = `
    <div class="rule-card" style="border-left:6px solid ${rule.color};">
      <div class="rule-icon" style="color:${rule.color};"><i class="fas ${rule.icon}"></i></div>
      <div>
        <div class="rule-title" style="color:${rule.color};">${rule.name}</div>
        <div class="rule-desc">${rule.desc}</div>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;gap:15px;direction:rtl;flex-wrap:wrap;">`;
  shapesHTML += data.shapes.map((sh, i) => `
    <div style="background:var(--surface);padding:20px 10px;border-radius:15px;box-shadow:var(--shadow);flex:1;min-width:70px;text-align:center;border-bottom:4px solid ${rule.color};">
      <div class="shape-badge" style="background:${rule.color};margin:0 auto 10px auto;">${i + 1}</div>
      <div style="font-size:3.8rem;color:var(--text);font-weight:700;line-height:1;">${sh}</div>
      <div style="color:var(--text-muted);font-size:0.9rem;margin-top:10px;font-family:sans-serif;">${positions[i]}</div>
    </div>`).join('');
  shapesHTML += '</div>';
  document.getElementById('ui-shapes-container').innerHTML = shapesHTML;

  // ── قسم الكلمات المقسّمة ──────────────────────────────
  document.getElementById('ui-split-words').innerHTML = data.splitWords.slice(0, 9).map(w => {
    const p = formatSplitWord(w);
    return `<div class="split-box">
      <div class="split-cell s-red">${p.w1}</div>
      <div class="split-cell s-blue">${p.w2}</div>
      <div class="split-cell s-dark">${p.w3}</div>
    </div>`;
  }).join('');

  // ── الألعاب الفرعية ───────────────────────────────────
  initMissingLetterGame(data.missingWords, data.shapes);
  document.getElementById('ui-story-icon').textContent = data.storyIcon;
  renderNumberedText(data.storyText,   data.symbol, 'ui-story-text', 'story');
  initXO(data.xoWords);
  renderNumberedText(data.quranText,   data.symbol, 'ui-quran-text', 'quran');


  // 👇👇 استدعاء محقق الحروف هنا 👇👇
  if (typeof renderDetectiveSection === 'function') {
      renderDetectiveSection(key);
  }
  // ── شريط التقدم ───────────────────────────────────────
  document.getElementById('letter-progress-bar').style.display = 'block';
  initSectionDots();

  // ── تشغيل Phaser ──────────────────────────────────────
  window.currentPhaserLetter = data.symbol;
  _launchPhaser('game-container', [MainScene], 600);

  // ── إظهار الشاشة ──────────────────────────────────────
  _showScreen('letter-screen');
  _pushRoute('#letter-' + encodeURIComponent(key));
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
}

/**
 * goNextLetter — الانتقال للحرف التالي
 */
function goNextLetter() {
  markLetterComplete(activeLetterKey);
  const idx  = ARABIC_LETTERS.indexOf(activeLetterKey);
  const next = ARABIC_LETTERS[idx + 1];
  if (!next) {
    showToast('🎓 Congratulations! You finished all letters! / أحسنت!', 4000);
    goHome();
    return;
  }
  if (playerProgress.unlocked.includes(next)) {
    goHome();
    setTimeout(() => openLetter(next), 500);
  } else {
    showToast(`Unlock "${next}" (${LETTER_NAMES_EN[next]}) with ${UNLOCK_COST} ⭐`);
    goHome();
  }
}


/* ============================================================
   6. مستوى السكون
   ============================================================ */

/**
 * openSukoonLevel — فتح مستوى السكون
 * @param {string|null} front - الحرف المتحرك (الأول)
 * @param {string|null} back  - الحرف الساكن (الثاني)
 */
function openSukoonLevel(front = null, back = null) {
  if (front) currentSukoonFront = front;
  if (back)  currentSukoonBack  = back;

  window.currentPhaserFrontLetter = currentSukoonFront;
  window.currentPhaserBackLetter  = currentSukoonBack;

  // ── منتقيات الحروف ────────────────────────────────────
  const frontSel = document.getElementById('sukoon-front-selector');
  if (frontSel) {
    frontSel.innerHTML = ARABIC_LETTERS.map(l =>
      `<div class="madd-letter-pill ${l === currentSukoonFront ? 'active' : ''}" onclick="openSukoonLevel('${l}',null)">${l}</div>`
    ).join('');
  }

  const backSel = document.getElementById('sukoon-back-selector');
  if (backSel) {
    backSel.innerHTML = ARABIC_LETTERS.map(l =>
      `<div class="madd-letter-pill ${l === currentSukoonBack ? 'active' : ''}" onclick="openSukoonLevel(null,'${l}')">${l}</div>`
    ).join('');
  }

  // ── المقاطع ───────────────────────────────────────────
  const marks = ['َ', 'ُ', 'ِ'];
  let syllables = '';
  for (let i = 0; i < 9; i++) {
    const randMark = marks[i % 3];
    const baseChar = (currentSukoonFront === 'أ' && randMark === 'ِ') ? 'إ' : currentSukoonFront;
    const p1Class  = 'piece no-nub ' + (RAFISA.includes(currentSukoonFront) ? 'no-hole' : '');
    const p2Class  = 'piece no-hole ' + (RAFISA.includes(currentSukoonFront) ? 'no-nub' : '');
    syllables += `<div class="puzzle-wrap" onmouseenter="playTone(450,'sine',0.1,0.02)">
      <div class="${p1Class}">${baseChar}${randMark}</div>
      <div class="${p2Class}">${currentSukoonBack}ْ</div>
    </div>`;
  }
  document.getElementById('ui-sukoon-syllables').innerHTML = syllables;

  // ── الكلمات ───────────────────────────────────────────
  const sampleWords = SUKOON_DATA.wordBank.slice(0, 9);
  document.getElementById('ui-sukoon-words').innerHTML = sampleWords.map(w => {
    const p = formatSplitWord(w);
    return `<div class="split-box" onmouseenter="playTone(500,'sine',0.1,0.02)">
      <div class="split-cell s-red">${p.w1}</div>
      <div class="split-cell s-blue">${p.w2}</div>
      <div class="split-cell s-dark">${p.w3}</div>
    </div>`;
  }).join('');

  // ── البطاقات الثلاثية ─────────────────────────────────
  const cardsEl = document.getElementById('ui-sukoon-cards-container');
  if (cardsEl) {
    cardsEl.innerHTML = SUKOON_DATA.cards.map(c => {
      const cut1 = RAFISA.some(r => (c.l1||'').includes(r));
      const cut2 = RAFISA.some(r => (c.l2||'').includes(r));
      const p1Class = 'piece no-nub '  + (cut1 ? 'no-hole' : '');
      const p2Class = 'piece '         + (cut1 ? 'no-nub ' : '') + (cut2 ? 'no-hole' : '');
      const p3Class = 'piece no-hole ' + (cut2 ? 'no-nub' : '');
      return `<div class="puzzle-wrap" onmouseenter="playTone(450,'sine',0.1,0.02)">
        <div class="${p1Class}">${c.l1}</div>
        <div class="${p2Class}">${c.l2}</div>
        <div class="${p3Class}">${c.l3}</div>
      </div>`;
    }).join('');
  }

  // ── الألعاب الفرعية ───────────────────────────────────
  window.activeAdvancedLevel = 'sukoon';
  setAdvancedLevelWords('sukoon', SUKOON_DATA.wordBank);
  initSukoonMissing(SUKOON_DATA.missing, ['ل', 'ت', 'ج', 'ر']);
  initSukoonXO(SUKOON_DATA.xoWords);
  renderNumberedText(SUKOON_DATA.storyText, 'ْ', 'ui-sukoon-story-text', 'sukoon_story');
  renderNumberedText(SUKOON_DATA.quranText, 'ْ', 'ui-sukoon-quran-text', 'sukoon_quran');

  // ── New mini-games using ADVANCED_LEVELS_DB.sukoon.words ──
  try { initLevelPuzzleXO('sukoon-syllables'); } catch (e) { console.warn('levelXO(sukoon-syllables):', e); }
  try { initLevelPuzzleXO('sukoon-cards'); }     catch (e) { console.warn('levelXO(sukoon-cards):', e); }
  try { initLevelPuzzleXO('sukoon-words'); }     catch (e) { console.warn('levelXO(sukoon-words):', e); }
  try { renderWheel(null, 'sukoon'); }           catch (e) { console.warn('wheel(sukoon):', e); }
  try { initMemoryGame(null, 'sukoon'); }        catch (e) { console.warn('memory(sukoon):', e); }
  try { speedReadRestart('sukoon'); }            catch (e) { console.warn('speedRead(sukoon):', e); }
  try { trickyCupsRestart('sukoon'); }           catch (e) { console.warn('trickyCups(sukoon):', e); }
  try { renderSukoonSpot(); }                    catch (e) { console.warn('sukoonSpot:', e); }
  try { renderSukoonPatterns(); }                catch (e) { console.warn('sukoonPatterns:', e); }
  try { renderSukoonDetective(); }               catch (e) { console.warn('sukoonDetective:', e); }

  // ── Phaser ────────────────────────────────────────────
  _launchPhaser('sukoon-game-container', [SukoonScene], 600);
  _showScreen('sukoon-screen');
}


/* ============================================================
   SUKOON: Patterns + Detective sections
   ============================================================ */
/* ============================================================
   📦 SORT THE WORDS — رتّب الكلمات (Sukoon Patterns game)
   3 zones: words ending in damma / fatha / kasra
   Click a word, click the zone → if right, lock in; if wrong, shake
   ============================================================ */

const SWS_POOL_BY_CAT = {
  damma: ['بَيْتُ','شَمْسُ','قَلْبُ','نَهْرُ','مَكْتَبُ','أَحْمَدُ','فَصْلُ','يَكْتُبُ','مَلْعَبُ','بَحْرُ','كَلْبُ','مَسْجِدُ'],
  fatha: ['بَيْتَ','شَمْسَ','قَلْبَ','نَهْرَ','مَكْتَبَ','فَصْلَ','بَحْرَ','كَلْبَ','مَلْعَبَ'],
  kasra: ['بَيْتِ','شَمْسِ','قَلْبِ','نَهْرِ','مَكْتَبِ','فَصْلِ','بَحْرِ','كَلْبِ','مَلْعَبِ'],
};

const SWS_ZONES = [
  { key: 'damma', label: 'ينتهي بضمة',  labelEn: 'Final Damma',  mark: 'ـُ', accent: '#3b82f6', accentLight: '#dbeafe' },
  { key: 'fatha', label: 'ينتهي بفتحة', labelEn: 'Final Fatha',  mark: 'ـَ', accent: '#f59e0b', accentLight: '#fef3c7' },
  { key: 'kasra', label: 'ينتهي بكسرة', labelEn: 'Final Kasra',  mark: 'ـِ', accent: '#10b981', accentLight: '#d1fae5' },
];

const SWS_TOTAL = 6; // 2 per category

const _swsState = {
  words: [],                                       // [{id, word, cat, status: 'pool'|'placed'}]
  zones: { damma: [], fatha: [], kasra: [] },     // arrays of placed word ids
  selected: null,
  placed: 0,
  mistakes: 0,
  locked: false,
};

function _swsResetState() {
  _swsState.words = [];
  _swsState.zones = { damma: [], fatha: [], kasra: [] };
  _swsState.selected = null;
  _swsState.placed = 0;
  _swsState.mistakes = 0;
  _swsState.locked = false;
}

function _swsShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderSukoonPatterns() {
  const el = document.getElementById('ui-sukoon-patterns');
  if (!el) return;

  el.innerHTML = `
    <div class="rule-card" style="direction:rtl;text-align:right;flex-direction:column;gap:10px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:14px;">
        <span class="rule-icon" style="font-size:1.6rem;width:42px;height:42px;background:var(--green-xlight);color:var(--green);">ْ</span>
        <span style="font-family:'Tajawal',sans-serif;font-size:0.98rem;font-weight:700;color:var(--text);">كل الكلمات هنا فيها سكون داخل الكلمة — ركّز على آخر حرف!</span>
      </div>
    </div>

    <div class="sws-wrap">
      <div class="sws-header">
        <div class="sws-title">📦 Sort the Words — رتّب الكلمات</div>
        <div class="sws-stats">
          <span class="sws-stat-pill sws-stat-score">⭐ <span id="sws-score">0</span>/${SWS_TOTAL}</span>
          <span class="sws-stat-pill sws-stat-best">🏆 Best: <span id="sws-best-score">0</span>/${SWS_TOTAL}</span>
        </div>
      </div>

      <!-- Playing -->
      <div class="sws-playing" id="sws-playing">
        <div class="sws-prompt">اضغط كلمة ثم اضغط الصندوق الذي ينتهي بنفس الحركة</div>

        <div class="sws-zones" id="sws-zones">
          ${SWS_ZONES.map(z => `
            <div class="sws-zone" data-cat="${z.key}" onclick="swsDropToZone('${z.key}')" style="--zone-accent:${z.accent};--zone-accent-light:${z.accentLight};">
              <div class="sws-zone-head">
                <div class="sws-zone-mark">${z.mark}</div>
                <div class="sws-zone-label">${z.label}</div>
                <div class="sws-zone-label-en">${z.labelEn}</div>
              </div>
              <div class="sws-zone-slots" id="sws-zone-${z.key}"></div>
              <div class="sws-zone-count"><span id="sws-zone-count-${z.key}">0</span>/2</div>
            </div>`).join('')}
        </div>

        <div class="sws-pool-label">الكلمات — اضغط واحدة</div>
        <div class="sws-pool" id="sws-pool"></div>
      </div>

      <!-- Results -->
      <div class="sws-results" id="sws-results" style="display:none;">
        <div class="sws-result-icon" id="sws-result-icon">🎉</div>
        <div class="sws-result-title" id="sws-result-title">Sorted!</div>
        <div class="sws-result-stats">
          <div class="sws-stat">
            <div class="sws-stat-label">SCORE</div>
            <div class="sws-stat-value">⭐ <span id="sws-final-score">0</span>/${SWS_TOTAL}</div>
          </div>
          <div class="sws-stat">
            <div class="sws-stat-label">MISTAKES</div>
            <div class="sws-stat-value">❌ <span id="sws-final-mistakes">0</span></div>
          </div>
        </div>
        <button class="sws-restart-btn" onclick="swsStart()">
          <i class="fas fa-rotate-right"></i> Try Again — مرة أخرى
        </button>
      </div>
    </div>`;

  _swsUpdateBest();
  swsStart();
}

function swsStart() {
  _swsResetState();

  // Pick 2 from each category
  let id = 0;
  const picks = [];
  ['damma', 'fatha', 'kasra'].forEach(cat => {
    const chosen = _swsShuffle(SWS_POOL_BY_CAT[cat]).slice(0, 2);
    chosen.forEach(word => {
      picks.push({ id: id++, word, cat, status: 'pool' });
    });
  });
  _swsState.words = _swsShuffle(picks);

  document.getElementById('sws-results').style.display = 'none';
  document.getElementById('sws-playing').style.display = 'flex';

  _swsRenderPool();
  _swsRenderZones();
  _swsUpdateScoreHud();
}

function _swsRenderPool() {
  const pool = document.getElementById('sws-pool');
  if (!pool) return;
  const remaining = _swsState.words.filter(w => w.status === 'pool');
  if (remaining.length === 0) {
    pool.innerHTML = '<div class="sws-pool-empty">✓ كل الكلمات في صناديقها!</div>';
    return;
  }
  pool.innerHTML = remaining.map(w => `
    <button class="sws-word${_swsState.selected === w.id ? ' is-selected' : ''}" data-id="${w.id}" onclick="swsSelectWord(${w.id})">
      ${w.word}
    </button>`).join('');
}

function _swsRenderZones() {
  SWS_ZONES.forEach(z => {
    const slotEl  = document.getElementById('sws-zone-' + z.key);
    const countEl = document.getElementById('sws-zone-count-' + z.key);
    if (!slotEl) return;
    const placedIds = _swsState.zones[z.key];
    const placedWords = placedIds.map(id => _swsState.words.find(w => w.id === id)).filter(Boolean);
    slotEl.innerHTML = placedWords.map(w =>
      `<div class="sws-placed-word">${w.word}</div>`
    ).join('');
    if (countEl) countEl.textContent = placedIds.length;
  });
}

function _swsUpdateScoreHud() {
  const sc = document.getElementById('sws-score');
  if (sc) sc.textContent = _swsState.placed;
}

function swsSelectWord(id) {
  if (_swsState.locked) return;
  const word = _swsState.words.find(w => w.id === id);
  if (!word || word.status !== 'pool') return;
  _swsState.selected = (_swsState.selected === id) ? null : id;
  _swsRenderPool();
  // Highlight zones to invite drop
  document.querySelectorAll('.sws-zone').forEach(z => {
    z.classList.toggle('is-targetable', _swsState.selected !== null);
  });
}

function swsDropToZone(zoneKey) {
  if (_swsState.locked) return;
  if (_swsState.selected === null) return;
  const word = _swsState.words.find(w => w.id === _swsState.selected);
  if (!word) return;
  const zoneEl = document.querySelector(`.sws-zone[data-cat="${zoneKey}"]`);
  if (!zoneEl) return;

  if (word.cat === zoneKey) {
    // Correct
    word.status = 'placed';
    _swsState.zones[zoneKey].push(word.id);
    _swsState.placed++;
    _swsState.selected = null;
    try { playMatchPro && playMatchPro(); } catch (e) {}
    zoneEl.classList.add('is-correct-flash');
    setTimeout(() => zoneEl.classList.remove('is-correct-flash'), 500);
    _swsRenderPool();
    _swsRenderZones();
    _swsUpdateScoreHud();
    document.querySelectorAll('.sws-zone').forEach(z => z.classList.remove('is-targetable'));
    if (_swsState.placed >= SWS_TOTAL) {
      _swsState.locked = true;
      setTimeout(() => _swsShowResults(), 600);
    }
  } else {
    // Wrong — shake zone, count mistake
    _swsState.mistakes++;
    try { playErrorPro && playErrorPro(); } catch (e) {}
    zoneEl.classList.add('is-wrong-shake');
    setTimeout(() => zoneEl.classList.remove('is-wrong-shake'), 500);
  }
}

function _swsShowResults() {
  document.getElementById('sws-playing').style.display = 'none';
  const res = document.getElementById('sws-results');
  if (res) res.style.display = 'flex';

  const score = _swsState.placed;
  const mistakes = _swsState.mistakes;

  document.getElementById('sws-final-score').textContent    = score;
  document.getElementById('sws-final-mistakes').textContent = mistakes;

  let icon, title;
  if (mistakes === 0) {
    icon = '🏆'; title = 'Flawless! — بدون أخطاء!';
  } else if (mistakes <= 2) {
    icon = '🎉'; title = 'Excellent! — رائع!';
  } else if (mistakes <= 5) {
    icon = '👍'; title = 'Good Job! — أحسنت!';
  } else {
    icon = '💪'; title = 'Keep Trying! — حاول مرة أخرى!';
  }
  document.getElementById('sws-result-icon').textContent  = icon;
  document.getElementById('sws-result-title').textContent = title;

  // Save best (best = lowest mistake count for full sort; we save score)
  try {
    const prevBest    = parseInt(localStorage.getItem('sws_best_score') || '0');
    const prevMisLow  = parseInt(localStorage.getItem('sws_best_mistakes') || '999');
    if (score > prevBest) localStorage.setItem('sws_best_score', String(score));
    if (mistakes < prevMisLow && score === SWS_TOTAL) {
      localStorage.setItem('sws_best_mistakes', String(mistakes));
    }
  } catch (e) {}
  _swsUpdateBest();

  // Reward
  try {
    if (mistakes === 0) {
      addStars(8);
      fireConfetti && fireConfetti();
    } else if (mistakes <= 2) {
      addStars(4);
    } else if (score === SWS_TOTAL) {
      addStars(2);
    }
  } catch (e) {}
}

function _swsUpdateBest() {
  const el = document.getElementById('sws-best-score');
  if (!el) return;
  try {
    el.textContent = parseInt(localStorage.getItem('sws_best_score') || '0');
  } catch (e) { el.textContent = '0'; }
}

/* ============================================================
   🔍 DETECTIVE QUEST — لعبة محقق العلامات (3 موجات)
   Wave 1: Identify the mark on a styled letter (5 rounds)
   Wave 2: Count the sukoons in a word (5 rounds)
   Wave 3: 20s time-attack — tap only sukoon words
   ============================================================ */

const DQ_MARK_REF = [
  { sym: 'بَ', name: 'فتحة', nameEn: 'Fatha',  desc: 'شرطة فوق الحرف — صوت (a)',     color: '#3b82f6' },
  { sym: 'بُ', name: 'ضمة',  nameEn: 'Damma',  desc: 'واو صغيرة فوق الحرف — صوت (u)', color: '#f59e0b' },
  { sym: 'بِ', name: 'كسرة', nameEn: 'Kasra',  desc: 'شرطة تحت الحرف — صوت (i)',     color: '#10b981' },
  { sym: 'بّ', name: 'شدة',  nameEn: 'Shadda', desc: 'رأس ش فوق الحرف — تضعيف',       color: '#8b5cf6' },
  { sym: 'بْ', name: 'سكون', nameEn: 'Sukoon', desc: 'دائرة صغيرة — لا حركة',         color: '#047857', isTarget: true },
];

// Pool for Wave 1: each letter+mark with the correct mark name
const DQ_W1_POOL = [
  { sym: 'تَ', mark: 'فتحة' }, { sym: 'بُ', mark: 'ضمة' }, { sym: 'مِ', mark: 'كسرة' },
  { sym: 'دّ', mark: 'شدة' },  { sym: 'كْ', mark: 'سكون' }, { sym: 'سَ', mark: 'فتحة' },
  { sym: 'رُ', mark: 'ضمة' },  { sym: 'لِ', mark: 'كسرة' }, { sym: 'نّ', mark: 'شدة' },
  { sym: 'هْ', mark: 'سكون' }, { sym: 'فَ', mark: 'فتحة' }, { sym: 'جُ', mark: 'ضمة' },
  { sym: 'حِ', mark: 'كسرة' }, { sym: 'شّ', mark: 'شدة' },  { sym: 'بْ', mark: 'سكون' },
  { sym: 'يْ', mark: 'سكون' }, { sym: 'ذَ', mark: 'فتحة' }, { sym: 'وُ', mark: 'ضمة' },
  { sym: 'قِ', mark: 'كسرة' }, { sym: 'مّ', mark: 'شدة' },  { sym: 'تْ', mark: 'سكون' },
];

// Pool for Wave 2: words paired with their sukoon count
const DQ_W2_POOL = [
  { word: 'كَتَبَ',     count: 0 },
  { word: 'ذَهَبَ',     count: 0 },
  { word: 'فَعَلَ',     count: 0 },
  { word: 'بَيْتُ',     count: 1 },
  { word: 'شَمْسُ',     count: 1 },
  { word: 'قَلْبُ',     count: 1 },
  { word: 'نَهْرُ',     count: 1 },
  { word: 'مَكْتَبُ',   count: 1 },
  { word: 'أَحْمَدُ',   count: 1 },
  { word: 'مَلْعَبُ',   count: 1 },
  { word: 'فَصْلُ',     count: 1 },
  { word: 'يَكْتُبُ',   count: 1 },
  { word: 'مُسْتَشْفَى', count: 2 },
  { word: 'يَسْتَخْرِجُ', count: 2 },
  { word: 'مَلْعَبُكُمْ', count: 2 },
  { word: 'يَسْتَغْفِرُ', count: 2 },
];

// Pool for Wave 3: hasSukoon flag (target = words with sukoon)
const DQ_W3_POOL = [
  { word: 'بَيْتُ',  hasSukoon: true  },
  { word: 'شَمْسُ',  hasSukoon: true  },
  { word: 'قَلْبُ',  hasSukoon: true  },
  { word: 'نَهْرُ',  hasSukoon: true  },
  { word: 'مَكْتَبُ', hasSukoon: true  },
  { word: 'أَحْمَدُ', hasSukoon: true  },
  { word: 'مَلْعَبُ', hasSukoon: true  },
  { word: 'فَصْلُ',  hasSukoon: true  },
  { word: 'يَكْتُبُ', hasSukoon: true  },
  { word: 'كَتَبَ',  hasSukoon: false },
  { word: 'ذَهَبَ',  hasSukoon: false },
  { word: 'فَعَلَ',  hasSukoon: false },
  { word: 'لَعِبَ',  hasSukoon: false },
  { word: 'سَمِعَ',  hasSukoon: false },
  { word: 'يَفْعَلُ', hasSukoon: true  },
  { word: 'وَلَدَ',   hasSukoon: false },
];

const DQ_TOTAL = 15; // 5 + 5 + 5 max points
const DQ_W3_DURATION_MS = 20000;

const _dqState = {
  wave: 0,
  score: 0,
  w1Idx: 0, w1Words: [],
  w2Idx: 0, w2Words: [],
  w3Words: [], w3FoundIds: new Set(), w3MissedIds: new Set(),
  w3Timer: null, w3Deadline: 0, w3RafId: 0,
  locked: false,
};

function _dqResetState() {
  _dqState.wave = 0;
  _dqState.score = 0;
  _dqState.w1Idx = 0; _dqState.w1Words = [];
  _dqState.w2Idx = 0; _dqState.w2Words = [];
  _dqState.w3Words = []; _dqState.w3FoundIds = new Set(); _dqState.w3MissedIds = new Set();
  _dqState.locked = false;
  if (_dqState.w3Timer)  { clearTimeout(_dqState.w3Timer);  _dqState.w3Timer  = null; }
  if (_dqState.w3RafId)  { cancelAnimationFrame(_dqState.w3RafId); _dqState.w3RafId = 0; }
}

function _dqShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderSukoonDetective() {
  const el = document.getElementById('sukoon-det-container');
  if (!el) return;

  const marksHtml = DQ_MARK_REF.map(m => `
    <div class="dq-mark-card${m.isTarget ? ' is-target' : ''}">
      <div class="dq-mark-sym" style="color:${m.color};">${m.sym}</div>
      <div class="dq-mark-name">${m.name}</div>
      <div class="dq-mark-name-en">${m.nameEn}</div>
      <div class="dq-mark-desc">${m.desc}</div>
    </div>`).join('');

  el.innerHTML = `
    <div class="dq-marks-ref">${marksHtml}</div>

    <div class="dq-wrap">
      <!-- Start screen -->
      <div class="dq-start" id="dq-start">
        <div class="dq-start-icon">🔍</div>
        <div class="dq-start-title">Detective Quest</div>
        <div class="dq-start-sub">3 تحديات لاكتشاف السكون!</div>
        <ul class="dq-waves-list">
          <li><span class="dq-wave-num">1</span> <span>Identify the Mark — حدد العلامة <em>(5 جولات)</em></span></li>
          <li><span class="dq-wave-num">2</span> <span>Count Sukoons — عدّ السكونات <em>(5 جولات)</em></span></li>
          <li><span class="dq-wave-num">3</span> <span>Time Hunt — صيد بالوقت <em>(20 ثانية)</em></span></li>
        </ul>
        <button class="dq-start-btn" onclick="dqStart()">
          <i class="fas fa-play"></i> Start Quest — ابدأ التحدي!
        </button>
        <div class="dq-best">🏆 Best: <span id="dq-best-score">0</span>/${DQ_TOTAL}</div>
      </div>

      <!-- Playing screen -->
      <div class="dq-playing" id="dq-playing" style="display:none;">
        <div class="dq-hud">
          <div class="dq-hud-item">
            <div class="dq-hud-label">WAVE</div>
            <div class="dq-hud-value"><span id="dq-wave-num">1</span>/3</div>
          </div>
          <div class="dq-hud-item dq-hud-score">
            <div class="dq-hud-label">SCORE</div>
            <div class="dq-hud-value">⭐ <span id="dq-score">0</span></div>
          </div>
          <div class="dq-hud-item dq-hud-progress">
            <div class="dq-hud-label" id="dq-progress-label">PROGRESS</div>
            <div class="dq-hud-value" id="dq-progress">0/5</div>
          </div>
        </div>
        <div class="dq-stage" id="dq-stage"></div>
      </div>

      <!-- Results screen -->
      <div class="dq-results" id="dq-results" style="display:none;">
        <div class="dq-result-icon" id="dq-result-icon">🎉</div>
        <div class="dq-result-title" id="dq-result-title">Detective!</div>
        <div class="dq-result-score">
          <span id="dq-final-score">0</span><span class="dq-result-divider">/</span>${DQ_TOTAL}
        </div>
        <div class="dq-result-sub" id="dq-result-sub">marks identified</div>
        <div class="dq-result-actions">
          <button class="dq-restart-btn" onclick="dqRestart()">
            <i class="fas fa-rotate-right"></i> Try Again — مرة أخرى
          </button>
        </div>
      </div>
    </div>`;

  _dqUpdateBest();
}

function dqStart() {
  _dqResetState();
  _dqState.wave = 1;
  _dqState.w1Words = _dqShuffle(DQ_W1_POOL).slice(0, 5);
  _dqState.w2Words = _dqShuffle(DQ_W2_POOL).slice(0, 5);

  document.getElementById('dq-start').style.display    = 'none';
  document.getElementById('dq-results').style.display  = 'none';
  document.getElementById('dq-playing').style.display  = 'flex';

  _dqRenderHud();
  _dqRenderWave1();
}

function _dqRenderHud() {
  const w = _dqState.wave;
  const waveEl  = document.getElementById('dq-wave-num');
  const scoreEl = document.getElementById('dq-score');
  const progEl  = document.getElementById('dq-progress');
  const progLab = document.getElementById('dq-progress-label');
  if (waveEl)  waveEl.textContent  = w;
  if (scoreEl) scoreEl.textContent = _dqState.score;
  if (!progEl || !progLab) return;
  if (w === 1) {
    progLab.textContent = 'ROUND';
    progEl.textContent  = `${_dqState.w1Idx + 1}/5`;
  } else if (w === 2) {
    progLab.textContent = 'ROUND';
    progEl.textContent  = `${_dqState.w2Idx + 1}/5`;
  } else if (w === 3) {
    progLab.textContent = 'TIME';
    // updated by RAF loop
  }
}

function _dqRenderWave1() {
  _dqState.locked = false;
  _dqRenderHud();
  const stage = document.getElementById('dq-stage');
  if (!stage) return;
  const item  = _dqState.w1Words[_dqState.w1Idx];
  const opts  = ['فتحة', 'ضمة', 'كسرة', 'شدة', 'سكون'];
  const shuf  = _dqShuffle(opts).slice(0, 4);
  if (!shuf.includes(item.mark)) shuf[0] = item.mark;
  const finalOpts = _dqShuffle(shuf);

  stage.innerHTML = `
    <div class="dq-wave-banner">Wave 1 — حدد العلامة فوق/تحت الحرف</div>
    <div class="dq-w1-letter-card">
      <div class="dq-w1-letter">${item.sym}</div>
      <div class="dq-w1-prompt">ما هي حركة هذا الحرف؟</div>
    </div>
    <div class="dq-w1-options">
      ${finalOpts.map(opt => `
        <button class="dq-w1-opt" data-mark="${opt}" onclick="dqAnswerW1('${opt}')">${opt}</button>
      `).join('')}
    </div>`;
}

function dqAnswerW1(picked) {
  if (_dqState.locked) return;
  _dqState.locked = true;
  const item = _dqState.w1Words[_dqState.w1Idx];
  const correct = picked === item.mark;
  const buttons = document.querySelectorAll('.dq-w1-opt');
  buttons.forEach(b => {
    b.disabled = true;
    if (b.dataset.mark === item.mark) b.classList.add('is-correct');
    else if (b.dataset.mark === picked && !correct) b.classList.add('is-wrong');
  });
  if (correct) {
    _dqState.score++;
    try { playMatchPro && playMatchPro(); } catch (e) {}
  } else {
    try { playErrorPro && playErrorPro(); } catch (e) {}
  }
  setTimeout(() => {
    _dqState.w1Idx++;
    if (_dqState.w1Idx >= _dqState.w1Words.length) {
      _dqAdvanceTo(2);
    } else {
      _dqRenderWave1();
    }
  }, 850);
}

function _dqRenderWave2() {
  _dqState.locked = false;
  _dqRenderHud();
  const stage = document.getElementById('dq-stage');
  if (!stage) return;
  const item = _dqState.w2Words[_dqState.w2Idx];

  stage.innerHTML = `
    <div class="dq-wave-banner">Wave 2 — كم سكون في الكلمة؟</div>
    <div class="dq-w2-word-card">
      <div class="dq-w2-word">${item.word}</div>
      <div class="dq-w1-prompt">عدّ علامات السكون (ْ)</div>
    </div>
    <div class="dq-w2-options">
      ${[0,1,2,3].map(n => `
        <button class="dq-w2-opt" data-count="${n}" onclick="dqAnswerW2(${n})">${n}</button>
      `).join('')}
    </div>`;
}

function dqAnswerW2(picked) {
  if (_dqState.locked) return;
  _dqState.locked = true;
  const item = _dqState.w2Words[_dqState.w2Idx];
  const correct = picked === item.count;
  const buttons = document.querySelectorAll('.dq-w2-opt');
  buttons.forEach(b => {
    b.disabled = true;
    if (parseInt(b.dataset.count) === item.count) b.classList.add('is-correct');
    else if (parseInt(b.dataset.count) === picked && !correct) b.classList.add('is-wrong');
  });
  if (correct) {
    _dqState.score++;
    try { playMatchPro && playMatchPro(); } catch (e) {}
  } else {
    try { playErrorPro && playErrorPro(); } catch (e) {}
  }
  setTimeout(() => {
    _dqState.w2Idx++;
    if (_dqState.w2Idx >= _dqState.w2Words.length) {
      _dqAdvanceTo(3);
    } else {
      _dqRenderWave2();
    }
  }, 850);
}

function _dqRenderWave3() {
  _dqRenderHud();
  const stage = document.getElementById('dq-stage');
  if (!stage) return;

  // Pick 10 mixed words: 5 with sukoon, 5 without
  const withSuk    = _dqShuffle(DQ_W3_POOL.filter(x => x.hasSukoon)).slice(0, 5);
  const withoutSuk = _dqShuffle(DQ_W3_POOL.filter(x => !x.hasSukoon)).slice(0, 5);
  _dqState.w3Words = _dqShuffle([...withSuk, ...withoutSuk]).map((w, i) => ({ ...w, id: i }));
  _dqState.w3FoundIds = new Set();
  _dqState.w3MissedIds = new Set();

  stage.innerHTML = `
    <div class="dq-wave-banner">Wave 3 — اضغط الكلمات التي فيها سكون فقط!</div>
    <div class="dq-w3-timer-bar"><div class="dq-w3-timer-fill" id="dq-w3-fill"></div></div>
    <div class="dq-w3-grid" id="dq-w3-grid">
      ${_dqState.w3Words.map(w => `
        <button class="dq-w3-word" data-id="${w.id}" data-suk="${w.hasSukoon ? '1' : '0'}" onclick="dqClickW3(${w.id})">${w.word}</button>
      `).join('')}
    </div>
    <div class="dq-w3-hint">⏱ ٢٠ ثانية — كل سكون = +1 نقطة | الكلمة الخطأ = -1</div>`;

  _dqState.w3Deadline = Date.now() + DQ_W3_DURATION_MS;
  if (_dqState.w3Timer) clearTimeout(_dqState.w3Timer);
  _dqState.w3Timer = setTimeout(() => _dqEndWave3(true), DQ_W3_DURATION_MS);
  _dqW3Tick();
}

function _dqW3Tick() {
  const fill = document.getElementById('dq-w3-fill');
  const prog = document.getElementById('dq-progress');
  if (!fill) return;
  const remaining = Math.max(0, _dqState.w3Deadline - Date.now());
  const pct = (remaining / DQ_W3_DURATION_MS) * 100;
  fill.style.width = pct + '%';
  if (prog) prog.textContent = (remaining / 1000).toFixed(1) + 's';
  if (remaining > 0 && _dqState.wave === 3) {
    _dqState.w3RafId = requestAnimationFrame(_dqW3Tick);
  }
}

function dqClickW3(id) {
  if (_dqState.wave !== 3) return;
  if (_dqState.w3FoundIds.has(id) || _dqState.w3MissedIds.has(id)) return;
  const w = _dqState.w3Words.find(x => x.id === id);
  const btn = document.querySelector(`.dq-w3-word[data-id="${id}"]`);
  if (!w || !btn) return;
  if (w.hasSukoon) {
    _dqState.w3FoundIds.add(id);
    btn.classList.add('is-correct');
    btn.disabled = true;
    // +1 capped at 5 sukoon words available
    if (_dqState.w3FoundIds.size <= 5) _dqState.score++;
    try { playMatchPro && playMatchPro(); } catch (e) {}
    _dqRenderHud();
    if (_dqState.w3FoundIds.size >= 5) _dqEndWave3(false);
  } else {
    _dqState.w3MissedIds.add(id);
    btn.classList.add('is-wrong');
    btn.disabled = true;
    if (_dqState.score > 0) _dqState.score--;
    try { playErrorPro && playErrorPro(); } catch (e) {}
    _dqRenderHud();
  }
}

function _dqEndWave3(timeUp) {
  if (_dqState.wave !== 3) return;
  if (_dqState.w3Timer)  { clearTimeout(_dqState.w3Timer);  _dqState.w3Timer  = null; }
  if (_dqState.w3RafId)  { cancelAnimationFrame(_dqState.w3RafId); _dqState.w3RafId = 0; }
  // Reveal remaining sukoon words
  document.querySelectorAll('.dq-w3-word').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.suk === '1' && !btn.classList.contains('is-correct')) {
      btn.classList.add('is-revealed');
    }
  });
  setTimeout(() => _dqShowResults(), 1000);
}

function _dqAdvanceTo(wave) {
  _dqState.wave = wave;
  if (wave === 2) {
    _dqState.w2Idx = 0;
    _dqRenderWave2();
  } else if (wave === 3) {
    _dqRenderWave3();
  }
}

function _dqShowResults() {
  const score = _dqState.score;
  document.getElementById('dq-playing').style.display = 'none';
  const res = document.getElementById('dq-results');
  if (res) res.style.display = 'flex';

  const finalScore = document.getElementById('dq-final-score');
  if (finalScore) finalScore.textContent = score;

  let iconStr, titleStr, subStr;
  if (score === DQ_TOTAL) {
    iconStr = '🏆'; titleStr = 'Master Detective! — محقق محترف!';
    subStr = 'علامة كاملة — أنت بطل السكون!';
  } else if (score >= 11) {
    iconStr = '🎉'; titleStr = 'Excellent! — رائع!';
    subStr = 'تمييز ممتاز للسكون';
  } else if (score >= 7) {
    iconStr = '👍'; titleStr = 'Good Job! — أحسنت!';
    subStr = 'استمر في التدريب';
  } else {
    iconStr = '💪'; titleStr = 'Keep Trying! — حاول أكثر!';
    subStr = 'راجع البطاقات في الأعلى';
  }
  document.getElementById('dq-result-icon').textContent  = iconStr;
  document.getElementById('dq-result-title').textContent = titleStr;
  document.getElementById('dq-result-sub').textContent   = subStr;

  // Save best
  try {
    const prevBest = parseInt(localStorage.getItem('dq_best_sukoon') || '0');
    if (score > prevBest) localStorage.setItem('dq_best_sukoon', String(score));
  } catch (e) {}

  // Reward
  try {
    if (score >= 11) {
      addStars(score);
      showVictory && showVictory('🔍', `Detective Quest: ${score}/${DQ_TOTAL}`);
      fireConfetti && fireConfetti();
    } else if (score > 0) {
      addStars(Math.floor(score / 2));
    }
  } catch (e) {}
}

function dqRestart() {
  _dqResetState();
  document.getElementById('dq-results').style.display = 'none';
  document.getElementById('dq-playing').style.display = 'none';
  document.getElementById('dq-start').style.display   = 'flex';
  _dqUpdateBest();
}

function _dqUpdateBest() {
  const el = document.getElementById('dq-best-score');
  if (!el) return;
  try {
    el.textContent = parseInt(localStorage.getItem('dq_best_sukoon') || '0');
  } catch (e) { el.textContent = '0'; }
}

/* ============================================================
   🎯 SPOT THE SUKOON — تحدي اكتشاف السكون (intro warmup)
   10 quick rounds, 3 word choices each, pick the sukoon word
   ============================================================ */

const STS_SUKOON_WORDS = [
  'بَيْتُ','شَمْسُ','قَلْبُ','نَهْرُ','مَكْتَبُ','أَحْمَدُ','مَلْعَبُ',
  'فَصْلُ','يَكْتُبُ','مَسْجِدُ','جَنْبُ','أُخْتُ','نَصْرُ','صَبْرُ',
  'حَمْدُ','عَدْلُ','رَأْسُ','شَرْطُ','بَحْرُ','كَلْبُ',
];

const STS_NON_SUKOON_WORDS = [
  'كَتَبَ','ذَهَبَ','فَعَلَ','لَعِبَ','سَمِعَ','وَلَدَ','رَجَعَ',
  'خَرَجَ','وَجَدَ','طَلَبَ','نَزَلَ','شَرِبَ','أَكَلَ','جَلَسَ',
  'قَرَأَ','كَسَرَ','فَتَحَ','عَلِمَ','حَفِظَ','رَكِبَ',
];

const STS_TOTAL_ROUNDS = 10;

const _stsState = {
  round: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  locked: false,
  current: null,
};

function _stsResetState() {
  _stsState.round = 0;
  _stsState.score = 0;
  _stsState.streak = 0;
  _stsState.bestStreak = 0;
  _stsState.locked = false;
  _stsState.current = null;
}

function _stsShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderSukoonSpot() {
  const el = document.getElementById('sukoon-spot-container');
  if (!el) return;

  el.innerHTML = `
    <div class="sts-wrap">
      <div class="sts-header">
        <div class="sts-title">🎯 Spot the Sukoon — اكتشف السكون!</div>
        <div class="sts-best">🏆 Best: <span id="sts-best-streak">0</span></div>
      </div>

      <!-- Playing -->
      <div class="sts-playing" id="sts-playing">
        <div class="sts-hud">
          <div class="sts-hud-item">
            <div class="sts-hud-label">ROUND</div>
            <div class="sts-hud-value"><span id="sts-round">1</span>/${STS_TOTAL_ROUNDS}</div>
          </div>
          <div class="sts-hud-item sts-hud-score">
            <div class="sts-hud-label">SCORE</div>
            <div class="sts-hud-value">⭐ <span id="sts-score">0</span></div>
          </div>
          <div class="sts-hud-item sts-hud-streak">
            <div class="sts-hud-label">STREAK</div>
            <div class="sts-hud-value">🔥 <span id="sts-streak">0</span></div>
          </div>
        </div>
        <div class="sts-prompt">اضغط الكلمة التي فيها سكون (ْ)</div>
        <div class="sts-cards" id="sts-cards"></div>
      </div>

      <!-- Results -->
      <div class="sts-results" id="sts-results" style="display:none;">
        <div class="sts-result-icon" id="sts-result-icon">🎉</div>
        <div class="sts-result-title" id="sts-result-title">Great Spotting!</div>
        <div class="sts-result-stats">
          <div class="sts-stat">
            <div class="sts-stat-label">SCORE</div>
            <div class="sts-stat-value">⭐ <span id="sts-final-score">0</span>/${STS_TOTAL_ROUNDS}</div>
          </div>
          <div class="sts-stat">
            <div class="sts-stat-label">BEST STREAK</div>
            <div class="sts-stat-value">🔥 <span id="sts-final-streak">0</span></div>
          </div>
        </div>
        <button class="sts-restart-btn" onclick="stsStart()">
          <i class="fas fa-rotate-right"></i> Try Again — مرة أخرى
        </button>
      </div>
    </div>`;

  _stsUpdateBest();
  stsStart();
}

function stsStart() {
  _stsResetState();
  document.getElementById('sts-results').style.display  = 'none';
  document.getElementById('sts-playing').style.display  = 'flex';
  _stsNextRound();
}

function _stsNextRound() {
  _stsState.locked = false;
  if (_stsState.round >= STS_TOTAL_ROUNDS) {
    _stsShowResults();
    return;
  }
  // Pick 1 sukoon word + 2 non-sukoon, shuffle
  const sukoon = STS_SUKOON_WORDS[Math.floor(Math.random() * STS_SUKOON_WORDS.length)];
  const nonShuf = _stsShuffle(STS_NON_SUKOON_WORDS).slice(0, 2);
  const choices = _stsShuffle([
    { word: sukoon, isSukoon: true },
    { word: nonShuf[0], isSukoon: false },
    { word: nonShuf[1], isSukoon: false },
  ]);
  _stsState.current = { choices };

  const cards = document.getElementById('sts-cards');
  if (cards) {
    cards.innerHTML = choices.map((c, i) => `
      <button class="sts-card" data-idx="${i}" data-suk="${c.isSukoon ? '1' : '0'}" onclick="stsAnswer(${i})">
        ${c.word}
      </button>`).join('');
  }
  _stsUpdateHud();
}

function stsAnswer(idx) {
  if (_stsState.locked || !_stsState.current) return;
  _stsState.locked = true;
  const choice = _stsState.current.choices[idx];
  const correct = !!(choice && choice.isSukoon);
  const cards = document.querySelectorAll('.sts-card');
  cards.forEach((c, i) => {
    c.disabled = true;
    if (c.dataset.suk === '1') c.classList.add('is-correct');
    else if (i === idx && !correct) c.classList.add('is-wrong');
  });
  if (correct) {
    _stsState.score++;
    _stsState.streak++;
    if (_stsState.streak > _stsState.bestStreak) _stsState.bestStreak = _stsState.streak;
    try { playMatchPro && playMatchPro(); } catch (e) {}
  } else {
    _stsState.streak = 0;
    try { playErrorPro && playErrorPro(); } catch (e) {}
  }
  _stsUpdateHud();
  setTimeout(() => {
    _stsState.round++;
    _stsNextRound();
  }, 700);
}

function _stsUpdateHud() {
  const r = document.getElementById('sts-round');
  const s = document.getElementById('sts-score');
  const k = document.getElementById('sts-streak');
  if (r) r.textContent = Math.min(_stsState.round + 1, STS_TOTAL_ROUNDS);
  if (s) s.textContent = _stsState.score;
  if (k) k.textContent = _stsState.streak;
}

function _stsShowResults() {
  document.getElementById('sts-playing').style.display = 'none';
  const res = document.getElementById('sts-results');
  if (res) res.style.display = 'flex';

  const score = _stsState.score;
  const best  = _stsState.bestStreak;

  const fScore = document.getElementById('sts-final-score');
  const fStrk  = document.getElementById('sts-final-streak');
  if (fScore) fScore.textContent = score;
  if (fStrk)  fStrk.textContent  = best;

  let icon, title;
  if (score === STS_TOTAL_ROUNDS) {
    icon = '🏆'; title = 'Perfect! — ممتاز!';
  } else if (score >= 8) {
    icon = '🎉'; title = 'Excellent! — رائع!';
  } else if (score >= 5) {
    icon = '👍'; title = 'Good Job! — أحسنت!';
  } else {
    icon = '💪'; title = 'Keep Trying! — حاول مرة أخرى!';
  }
  document.getElementById('sts-result-icon').textContent  = icon;
  document.getElementById('sts-result-title').textContent = title;

  // Save best streak
  try {
    const prev = parseInt(localStorage.getItem('sts_best_streak') || '0');
    if (best > prev) localStorage.setItem('sts_best_streak', String(best));
  } catch (e) {}
  _stsUpdateBest();

  // Reward
  try {
    if (score >= 8) {
      addStars(score);
      if (score === STS_TOTAL_ROUNDS) fireConfetti && fireConfetti();
    } else if (score > 0) {
      addStars(Math.floor(score / 2));
    }
  } catch (e) {}
}

function _stsUpdateBest() {
  const el = document.getElementById('sts-best-streak');
  if (!el) return;
  try {
    el.textContent = parseInt(localStorage.getItem('sts_best_streak') || '0');
  } catch (e) { el.textContent = '0'; }
}

/* ============================================================
   ✨ Sukoon intro card — interactive demo
   Click a word: pulse + tone. Click symbol: pulse + tone.
   "Play All" cycles through all example words.
   ============================================================ */
function sukoonIntroPlay(btn) {
  if (!btn) return;
  const tone = parseInt(btn.dataset.tone || '550', 10);
  btn.classList.remove('is-played');
  void btn.offsetWidth;
  btn.classList.add('is-played');
  try { playToneEnhanced && playToneEnhanced(tone, 'sine', 0.18, 0.06); } catch (e) {}
  setTimeout(() => btn.classList.remove('is-played'), 700);
}

function sukoonIntroPlaySymbol(btn) {
  if (!btn) return;
  btn.classList.remove('is-played');
  void btn.offsetWidth;
  btn.classList.add('is-played');
  try { playToneEnhanced && playToneEnhanced(420, 'triangle', 0.22, 0.06); } catch (e) {}
  setTimeout(() => btn.classList.remove('is-played'), 700);
}

let _sukoonIntroPlayingAll = false;
function sukoonIntroPlayAll() {
  if (_sukoonIntroPlayingAll) return;
  const words = Array.from(document.querySelectorAll('#sukoon-intro-words .sukoon-intro-word'));
  if (!words.length) return;
  _sukoonIntroPlayingAll = true;
  const playAllBtn = document.querySelector('#sukoon-intro-words .sukoon-intro-play-all');
  if (playAllBtn) playAllBtn.classList.add('is-busy');
  let i = 0;
  const step = () => {
    if (i >= words.length) {
      _sukoonIntroPlayingAll = false;
      if (playAllBtn) playAllBtn.classList.remove('is-busy');
      return;
    }
    sukoonIntroPlay(words[i]);
    i++;
    setTimeout(step, 600);
  };
  step();
}

/* ============================================================
   7. مستوى المد
   ============================================================ */

/**
 * openMaddLevel — فتح أحد مستويات المد الثلاثة
 * @param {Object} mod - { id, title, subtitle, char, mark, icon, cost }
 */
function openMaddLevel(mod) {
  currentMaddModule = mod;
  window.currentPhaserLetter = currentMaddTargetLetter;
  window.activeAdvancedLevel = 'madd';

  // ── العنوان والوصف ────────────────────────────────────
  const titleEl = document.getElementById('madd-title') || document.getElementById('madd-title-text');
  if (titleEl) {
    if (titleEl.id === 'madd-title-text') titleEl.textContent = `${mod.title} — ${mod.subtitle}`;
    else titleEl.innerHTML = `<span class="section-badge">1</span> ${mod.title} — ${mod.subtitle}`;
  }

  const descEl = document.getElementById('madd-desc') || document.getElementById('madd-motor-section');
  if (descEl) descEl.innerHTML = `
    Drag the Long Vowel (<strong>${mod.char}</strong>) to the left car,
    then drag its matching Short Engine (<strong>${mod.mark}</strong>) to the right car!<br>
    <span style="color:var(--green);font-weight:bold;">
      اسحب حرف المد للسيارة اليسرى، ثم اسحب حركته المجانسة للسيارة اليمنى!
    </span>`;

  // ── منتقي الحرف ───────────────────────────────────────
  const selectorEl = document.getElementById('madd-letter-selector');
  if (selectorEl) {
    selectorEl.innerHTML = ARABIC_LETTERS.map(l =>
      `<div class="madd-letter-pill ${l === currentMaddTargetLetter ? 'active' : ''}" onclick="changeMaddTargetLetter('${l}')">${l}</div>`
    ).join('');
  }

  // ── المقاطع ───────────────────────────────────────────
  let syllables = '';
  for (let i = 0; i < 12; i++) {
    const randLetter = ARABIC_LETTERS[Math.floor(Math.random() * ARABIC_LETTERS.length)];
    const p1Class    = 'piece no-nub '  + (RAFISA.includes(randLetter) ? 'no-hole' : '');
    const p2Class    = 'piece no-hole ' + (RAFISA.includes(randLetter) ? 'no-nub' : '');
    syllables += `<div class="puzzle-wrap" onmouseenter="playTone(450,'sine',0.1,0.02)">
      <div class="${p1Class}">${randLetter}${mod.mark}</div>
      <div class="${p2Class}">${mod.char}</div>
    </div>`;
  }
  document.getElementById('ui-madd-syllables').innerHTML = syllables;

  // ── كلمات حقيقية لكل نوع مد ──────────────────────────
  const sampleWords = mod.id === 'madd_a'
    ? ['بَاب','تَاج','دَار','نَار','عَام','قَالَ']
    : mod.id === 'madd_w'
    ? ['تُوت','حُوت','نُور','سُور','دُود','عُود']
    : ['تِين','فِيل','طِين','دِين','سَرِير','كَبِير'];

  document.getElementById('ui-madd-words').innerHTML = sampleWords.map(w => {
    const p = formatSplitWord(w);
    return `<div class="split-box" onmouseenter="playTone(500,'sine',0.1,0.02)">
      <div class="split-cell s-red">${p.w1}</div>
      <div class="split-cell s-blue">${p.w2}</div>
      <div class="split-cell s-dark">${p.w3}</div>
    </div>`;
  }).join('');

  // ── لعبة المفقود ──────────────────────────────────────
  const maddMissingData = mod.id === 'madd_a'
    ? [
        { display: 'بَـ<span class="missing-gap"></span>ب', char: 'ا' },
        { display: 'تَـ<span class="missing-gap"></span>ج', char: 'ا' },
        { display: 'دَ<span class="missing-gap"></span>ر',  char: 'ا' },
        { display: 'نَـ<span class="missing-gap"></span>ر', char: 'ا' },
      ]
    : mod.id === 'madd_w'
    ? [
        { display: 'تُـ<span class="missing-gap"></span>ت', char: 'و' },
        { display: 'حُـ<span class="missing-gap"></span>ت', char: 'و' },
        { display: 'نُـ<span class="missing-gap"></span>ر', char: 'و' },
        { display: 'سُـ<span class="missing-gap"></span>ر', char: 'و' },
      ]
    : [
        { display: 'تِـ<span class="missing-gap"></span>ن', char: 'ي' },
        { display: 'فِـ<span class="missing-gap"></span>ل', char: 'ي' },
        { display: 'طِـ<span class="missing-gap"></span>ن', char: 'ي' },
        { display: 'دِ<span class="missing-gap"></span>ن',  char: 'ي' },
      ];

  const maddShapes    = ['ا', 'و', 'ي'];
  const correctIndex  = mod.id === 'madd_a' ? 0 : mod.id === 'madd_w' ? 1 : 2;
  initMaddMissingLetter(maddMissingData, maddShapes, correctIndex);

  // ── لعبة XO ───────────────────────────────────────────
  const maddXOWords = mod.id === 'madd_a'
    ? ['بَاب','تَاج','دَار','نَار','عَام','قَالَ','صَامَ','فَازَ','عَادَ']
    : mod.id === 'madd_w'
    ? ['تُوت','حُوت','نُور','سُور','دُود','عُود','فُول','سُوق','رُوح']
    : ['تِين','فِيل','طِين','دِين','سَرِير','كَبِير','عَصِير','سَمِير','أَمِير'];
  setAdvancedLevelWords('madd', maddXOWords);
  initMaddXO(maddXOWords);

  // ── آيات المد القرآنية ────────────────────────────────
  const maddVerses = {
    'ا': '﴿ قَالُوا يَا مُوسَىٰ إِنَّا لَن نَّدْخُلَهَا أَبَدًا مَّا دَامُوا فِيهَا ﴾',
    'و': '﴿ يُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ ﴾',
    'ي': '﴿ إِنَّ الَّذِينَ آمَنُوا يَهْدِيهِمْ رَبُّهُم بِإِيمَانِهِمْ ﴾',
  };
  const maddStories = {
    'ا': 'قَالَ سَامِي: هَذَا بَابٌ كَبِيرٌ، وَهُنَا دَارٌ وَنَارٌ. قَرَأَ كَلِمَاتِ المَدِّ بِالأَلِفِ بِصَوْتٍ طَوِيلٍ.',
    'و': 'يَقُولُ نُورٌ: هَذَا حُوتٌ، وَذَلِكَ سُورٌ. رَأَى تُوتًا وَعُودًا، فَمَدَّ صَوْتَ الضَّمَّةِ مَعَ الوَاوِ.',
    'ي': 'فِي يَوْمِ عِيدٍ قَرَأَ سَمِيرٌ: تِينٌ وَفِيلٌ وَعَصِيرٌ. مَدَّ صَوْتَ الكَسْرَةِ مَعَ اليَاءِ بِهُدُوءٍ.',
  };
  const storyIcon = document.getElementById('madd-story-icon');
  if (storyIcon) storyIcon.textContent = mod.char;
  renderNumberedText(maddStories[mod.char], mod.char, 'ui-madd-story-text', 'madd_story');
  renderNumberedText(maddVerses[mod.char], mod.char, 'ui-madd-quran-text', 'madd_quran');

  // ── Title text: keep the dynamic game_title updated ──
  const mTitleText = document.getElementById('madd-title-text');
  if (mTitleText) mTitleText.textContent = `${mod.title} — ${mod.subtitle}`;

  // ── New mini-games using ADVANCED_LEVELS_DB.madd.words ──
  try { initLevelPuzzleXO('madd-syllables'); } catch (e) { console.warn('levelXO(madd-syllables):', e); }
  try { initLevelPuzzleXO('madd-words'); }     catch (e) { console.warn('levelXO(madd-words):', e); }
  try { renderWheel(null, 'madd'); }      catch (e) { console.warn('wheel(madd):', e); }
  try { initMemoryGame(null, 'madd'); }   catch (e) { console.warn('memory(madd):', e); }
  try { speedReadRestart('madd'); }       catch (e) { console.warn('speedRead(madd):', e); }
  try { trickyCupsRestart('madd'); }      catch (e) { console.warn('trickyCups(madd):', e); }

  // ── Phaser ────────────────────────────────────────────
  _launchPhaser('madd-game-container', [MaddScene], 600);
  _showScreen('madd-screen');
}

/**
 * changeMaddTargetLetter — تغيير الحرف في مستوى المد
 */
function changeMaddTargetLetter(letter) {
  currentMaddTargetLetter = letter;
  if (currentMaddModule) openMaddLevel(currentMaddModule);
}


/* ============================================================
   8. مستوى الشدة
   ============================================================ */

/**
 * openShaddaLevel — فتح مستوى الشدة
 * @param {string|null} shaddaL  - الحرف المشدد
 * @param {string|null} helperL  - الحرف المساعد قبله
 */
function openShaddaLevel(shaddaL = null, helperL = null) {
  if (shaddaL) currentShaddaLetter = shaddaL;
  if (helperL) currentHelperLetter = helperL;

  window.currentPhaserShaddaLetter = currentShaddaLetter;
  window.currentPhaserHelperLetter = currentHelperLetter;
  window.activeAdvancedLevel = 'shadda';

  // ── منتقيات الحروف ────────────────────────────────────
  const sel1 = document.getElementById('shadda-letter-selector');
  if (sel1) {
    sel1.innerHTML = ARABIC_LETTERS.map(l =>
      `<div class="madd-letter-pill ${l === currentShaddaLetter ? 'active' : ''}" onclick="openShaddaLevel('${l}',null)">${l}</div>`
    ).join('');
  }
  const sel2 = document.getElementById('shadda-helper-selector');
  if (sel2) {
    sel2.innerHTML = ARABIC_LETTERS.map(l =>
      `<div class="madd-letter-pill ${l === currentHelperLetter ? 'active' : ''}" onclick="openShaddaLevel(null,'${l}')">${l}</div>`
    ).join('');
  }

  // ── المقاطع ───────────────────────────────────────────
  let syllHtml = '';
  const shaddaMarks = ['َّ', 'ُّ', 'ِّ'];
  for (let i = 0; i < 9; i++) {
    const mark = shaddaMarks[i % shaddaMarks.length];
    const isRaf = RAFISA.includes(currentHelperLetter);
    syllHtml += `<div class="puzzle-wrap" onmouseenter="playTone(450,'sine',0.1,0.02)">
      <div class="piece no-nub ${isRaf ? 'no-hole' : ''}">${currentHelperLetter}َ</div>
      <div class="piece no-hole ${isRaf ? 'no-nub' : ''}">${currentShaddaLetter}${mark}</div>
    </div>`;
  }
  document.getElementById('ui-shadda-syllables').innerHTML = syllHtml;

  // ── الكلمات ───────────────────────────────────────────
  const allWords = [...SHADDA_DATA.words_fatha, ...SHADDA_DATA.words_damma, ...SHADDA_DATA.words_kasra];
  document.getElementById('ui-shadda-words').innerHTML = allWords.slice(0, 9).map(w => {
    const p = formatSplitWord(w);
    return `<div class="split-box" onmouseenter="playTone(500,'sine',0.1,0.02)">
      <div class="split-cell s-red">${p.w1}</div>
      <div class="split-cell s-blue">${p.w2}</div>
      <div class="split-cell s-dark">${p.w3 || '—'}</div>
    </div>`;
  }).join('');

  // ── الألعاب الفرعية ───────────────────────────────────
  setAdvancedLevelWords('shadda', allWords);
  initShaddaMissing(SHADDA_DATA.missing, ['َّ', 'ُّ', 'ِّ']);
  initShaddaXO(SHADDA_DATA.xoWords);
  renderNumberedText(SHADDA_DATA.storyText, 'ّ', 'ui-shadda-story-text', 'shadda_story');
  renderNumberedText(SHADDA_DATA.quranText, 'ّ', 'ui-shadda-quran-text', 'shadda_quran');

  // ── New mini-games using ADVANCED_LEVELS_DB.shadda.words ──
  try { initLevelPuzzleXO('shadda-syllables'); } catch (e) { console.warn('levelXO(shadda-syllables):', e); }
  try { initLevelPuzzleXO('shadda-words'); }     catch (e) { console.warn('levelXO(shadda-words):', e); }
  try { renderWheel(null, 'shadda'); }      catch (e) { console.warn('wheel(shadda):', e); }
  try { initMemoryGame(null, 'shadda'); }   catch (e) { console.warn('memory(shadda):', e); }
  try { speedReadRestart('shadda'); }       catch (e) { console.warn('speedRead(shadda):', e); }
  try { trickyCupsRestart('shadda'); }      catch (e) { console.warn('trickyCups(shadda):', e); }

  // ── Phaser ────────────────────────────────────────────
  _launchPhaser('shadda-game-container', [ShaddaScene], 600);
  _showScreen('shadda-screen');
  setTimeout(() => {
    if (typeof renderEngineCarRule === 'function') renderEngineCarRule('shadda-engine-rule', 'shadda');
  }, 200);
}


/* ============================================================
   9. مستوى التنوين
   ============================================================ */

/**
 * openTanweenLevel — فتح مستوى التنوين
 * @param {string|null} letter - الحرف المستخدم
 */
function openTanweenLevel(letter = null) {
  if (letter) currentTanweenLetter = letter;
  window.currentPhaserTanweenLetter = currentTanweenLetter;
  window.activeAdvancedLevel = 'tanween';

  // ── منتقي الحرف ───────────────────────────────────────
  const sel = document.getElementById('tanween-letter-selector');
  if (sel) {
    sel.innerHTML = ARABIC_LETTERS.map(l =>
      `<div class="madd-letter-pill ${l === currentTanweenLetter ? 'active' : ''}" onclick="openTanweenLevel('${l}')">${l}</div>`
    ).join('');
  }

  // ── المقاطع (أمثلة التنوين) ───────────────────────────
  let syllHtml = '';
  TANWEEN_DATA.syllables.forEach(s => {
    s.words.slice(0, 4).forEach(w => {
      syllHtml += `<div class="puzzle-wrap" onmouseenter="playTone(450,'sine',0.1,0.02)">
        <div class="piece no-nub no-hole" style="font-size:1.6rem;">${w}</div>
      </div>`;
    });
  });
  document.getElementById('ui-tanween-syllables').innerHTML = syllHtml;

  // ── الكلمات ───────────────────────────────────────────
  const allTW = TANWEEN_DATA.syllables.flatMap(s => s.words);
  document.getElementById('ui-tanween-words').innerHTML = allTW.slice(0, 9).map(w => {
    const p = formatSplitWord(w);
    return `<div class="split-box" onmouseenter="playTone(500,'sine',0.1,0.02)">
      <div class="split-cell s-red">${p.w1}</div>
      <div class="split-cell s-blue">${p.w2}</div>
      <div class="split-cell s-dark">${p.w3}</div>
    </div>`;
  }).join('');

  // ── الألعاب الفرعية ───────────────────────────────────
  setAdvancedLevelWords('tanween', allTW);
  initTanweenMissing(TANWEEN_DATA.missing, ['نْ', 'مْ', 'لْ']);
  initTanweenXO(TANWEEN_DATA.xoWords);
  renderNumberedText(TANWEEN_DATA.storyText, 'tanween', 'ui-tanween-story-text', 'tanween_story');
  renderNumberedText(TANWEEN_DATA.quranText, 'tanween', 'ui-tanween-quran-text', 'tanween_quran');

  // ── New mini-games using ADVANCED_LEVELS_DB.tanween.words ──
  try { initLevelPuzzleXO('tanween-syllables'); } catch (e) { console.warn('levelXO(tanween-syllables):', e); }
  try { initLevelPuzzleXO('tanween-words'); }     catch (e) { console.warn('levelXO(tanween-words):', e); }
  try { renderWheel(null, 'tanween'); }      catch (e) { console.warn('wheel(tanween):', e); }
  try { initMemoryGame(null, 'tanween'); }   catch (e) { console.warn('memory(tanween):', e); }
  try { speedReadRestart('tanween'); }       catch (e) { console.warn('speedRead(tanween):', e); }
  try { trickyCupsRestart('tanween'); }      catch (e) { console.warn('trickyCups(tanween):', e); }

  // ── Phaser ────────────────────────────────────────────
  _launchPhaser('tanween-game-container', [TanweenScene], 600);
  _showScreen('tanween-screen');
  setTimeout(() => {
    if (typeof renderEngineCarRule === 'function') renderEngineCarRule('tanween-engine-rule', 'tanween');
  }, 200);
}


/* ============================================================
   10. رسم شبكات المستويات في خريطة التعلم
   ============================================================ */

/**
 * renderAlphabetGrid — يرسم شبكة حروف الهجاء مع حالة كل حرف
 */
function renderAlphabetGrid() {
  const grid = document.getElementById('alphabetGrid');
  if (!grid) return;
  grid.innerHTML = '';

  ARABIC_LETTERS.forEach(key => {
    const btn         = document.createElement('div');
    const isUnlocked  = playerProgress.unlocked.includes(key);
    const isCompleted = playerProgress.completed.includes(key);

    if (isUnlocked) {
      btn.className = 'letter-btn unlocked' + (isCompleted ? ' completed' : '');
      btn.innerHTML = `<div class="l-char">${key}</div><div class="l-name">${LETTER_NAMES_EN[key] || ''}</div>`;
      btn.onclick   = () => openLetter(key);
    } else {
      btn.className = 'letter-btn locked';
      btn.innerHTML = `<div class="lock-icon">🔒</div><div class="lock-cost">⭐ ${UNLOCK_COST}</div>`;
      btn.onclick   = () => {
        if (playerProgress.stars >= UNLOCK_COST) {
          playerProgress.stars -= UNLOCK_COST;
          playerProgress.unlocked.push(key);
          saveProgress();
          fireConfetti(); playVictorySound(); renderAlphabetGrid();
          showToast(`🔓 "${key}" (${LETTER_NAMES_EN[key]}) unlocked!`);
        } else {
          showToast(`Need ${UNLOCK_COST - playerProgress.stars} more ⭐ to unlock!`);
        }
      };
    }
    grid.appendChild(btn);
  });
}

/**
 * _makeLevelBtn — ينشئ زر مستوى واحد (مفتوح أو مقفول) ويُعيده كـ element
 * @param {string}   levelKey  - مفتاح المستوى في playerProgress.unlocked
 * @param {number}   cost      - تكلفة الفتح بالنجوم
 * @param {string}   title     - العنوان بالإنجليزية
 * @param {string}   subtitle  - العنوان بالعربية
 * @param {string}   icon      - class أيقونة Font Awesome (مثال: 'fa-moon')
 * @param {Function} onUnlock  - تُستدعى بعد الفتح لإعادة رسم الشبكة
 * @param {Function} onOpen    - تُستدعى عند الضغط (مستوى مفتوح)
 */
function _makeLevelBtn(levelKey, cost, title, subtitle, icon, onUnlock, onOpen) {
  const isUnlocked = playerProgress.unlocked.includes(levelKey);
  const btn        = document.createElement('div');

  if (isUnlocked) {
    btn.className = 'lvl2-btn unlocked';
    btn.innerHTML = `
      <div class="lvl2-icon"><i class="fas ${icon}"></i></div>
      <div class="lvl2-text-wrap">
        <div class="l-title">${title}</div>
        <div class="l-sub">${subtitle}</div>
      </div>`;
    btn.onclick = onOpen;
  } else {
    btn.className = 'lvl2-btn locked';
    btn.innerHTML = `
      <div class="lvl2-icon"><i class="fas fa-lock"></i></div>
      <div class="lvl2-text-wrap">
        <div class="l-title">${title}</div>
        <div class="l-sub" style="color:#f59e0b;font-weight:bold;">⭐ ${cost} to unlock</div>
      </div>`;
    btn.onclick = () => {
      if (playerProgress.stars >= cost) {
        playerProgress.stars -= cost;
        playerProgress.unlocked.push(levelKey);
        saveProgress();
        fireConfetti();
        try { playVictorySound(); } catch(e) {}
        onUnlock();
        showToast(`🔓 ${title} Unlocked!`);
      } else {
        showToast(`Need ${cost - playerProgress.stars} more ⭐ to unlock!`);
      }
    };
  }
  return btn;
}

function renderSukoonGrid() {
  const grid = document.getElementById('levelSukoonGrid');
  if (!grid) return;
  grid.innerHTML = '';
  grid.appendChild(_makeLevelBtn(
    'sukoon', 20, 'Sukoon Stage', 'مرحلة السكون', 'fa-moon',
    () => renderSukoonGrid(),
    () => openSukoonLevel('أ', 'ب')
  ));
}

function renderShaddaGrid() {
  const grid = document.getElementById('levelShaddaGrid');
  if (!grid) return;
  grid.innerHTML = '';
  grid.appendChild(_makeLevelBtn(
    'shadda', 30, 'Shadda Stage', 'مرحلة الشدة', 'fa-bolt',
    () => renderShaddaGrid(),
    () => openShaddaLevel('ب', 'أ')
  ));
}

function renderTanweenGrid() {
  const grid = document.getElementById('levelTanweenGrid');
  if (!grid) return;
  grid.innerHTML = '';
  grid.appendChild(_makeLevelBtn(
    'tanween', 35, 'Tanween Stage', 'مرحلة التنوين', 'fa-music',
    () => renderTanweenGrid(),
    () => openTanweenLevel('ب')
  ));
}

function renderMaddGrid() {
  const grid = document.getElementById('levelMaddGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const modules = [
    { id: 'madd_a', title: 'Long Vowel (A)', subtitle: 'مد بالألف', cost: 25, char: 'ا', mark: 'َ', icon: 'fa-font' },
    { id: 'madd_w', title: 'Long Vowel (U)', subtitle: 'مد بالواو',  cost: 25, char: 'و', mark: 'ُ', icon: 'fa-circle-notch' },
    { id: 'madd_y', title: 'Long Vowel (I)', subtitle: 'مد بالياء',  cost: 25, char: 'ي', mark: 'ِ', icon: 'fa-seedling' },
  ];

  // نُضيف كل زر بشكل مستقل — لا نمسح الـ grid في _makeLevelBtn
  modules.forEach(mod => {
    grid.appendChild(_makeLevelBtn(
      mod.id, mod.cost, mod.title, mod.subtitle, mod.icon,
      () => renderMaddGrid(),
      () => openMaddLevel(mod)
    ));
  });
}


/* ============================================================
   11. بناء HTML الحركات (Motors)
   ============================================================
   ✅ إصلاح: الكود الأصلي كان يُخفي الكسرة والضمة للحروف الأولى
      بسبب منطق خاطئ (idx >= indexOf('ز')).
      الآن: نعرض الحركات الثلاث دائماً لجميع الحروف.
   ============================================================ */
function buildMotorsHTMLLegacy(key) {
  // Deprecated duplicate kept only for reference; buildMotorsHTML below is used at runtime.
  // Handled by ui_additions.js (progressive harakat)
  // Fallback for safety
  if (typeof getAvailableHarakat === 'undefined') {
    return `<div class="motor-item"><div class="motor-label" style="color:var(--red);">⬆️ Fatha — الفتحة</div>Open your mouth!</div>`;
  }
  const harakat = getAvailableHarakat(key);
  const motorDefs = [
    { char:'َ', label:'The Fatha — الفتحة', color:'#e74c3c', arrow:'⬆️', en:'Open your mouth!', ar:'افتح فمك!' },
    { char:'ِ', label:'The Kasrah — الكسرة', color:'#2980b9', arrow:'⬇️', en:'Drop your jaw!', ar:'اخفض فكّك!' },
    { char:'ُ', label:'The Dhammah — الضمة', color:'#27ae60', arrow:'⭕', en:'Round your lips!', ar:'دوّر شفتيك!' },
  ];
  return motorDefs.map((m,i) => {
    const unlocked = harakat.includes(m.char);
    return `<div class="motor-item" style="margin-bottom:15px;border-top:${i>0?'1px solid var(--border)':'none'};padding-top:${i>0?'15px':'0'};${!unlocked?'opacity:0.35;filter:grayscale(1);':''}">
      <div class="motor-label" style="color:${m.color};font-size:1.2rem;">${unlocked?m.arrow:'🔒'} ${m.label}</div>
      ${unlocked ? m.en + '<br><span style="font-weight:bold;color:' + m.color + ';">' + m.arrow + ' ' + m.ar + '</span>' : '<span style="color:var(--text-muted);font-size:0.9rem;">Unlocks as you progress — يُفتح مع تقدمك</span>'}
    </div>`;
  }).join('');
}


/* ============================================================
   12. شريط التقدم ونقاط الأقسام
   ============================================================ */

/**
 * initSectionDots — تهيئة نقاط التنقل في شاشة الحرف
 */
function initSectionDots() {
  const containers = [
    document.getElementById('sectionDots'),
    document.getElementById('sec-dots')
  ].filter(Boolean);
  if (!containers.length) return;
  containers.forEach(container => { container.innerHTML = ''; });
  for (let i = 0; i < 12; i++) {
    containers.forEach((container, containerIndex) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 's-dot dot' + (i === 0 ? ' current active' : '');
      d.id = (containerIndex === 0 ? 'dot-' : 'sec-dot-') + i;
      d.setAttribute('aria-label', 'Section ' + (i + 1));
      d.addEventListener('click', () => {
        const section = document.querySelector('.step-section[data-section="' + i + '"]');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      container.appendChild(d);
    });
  }
}

/**
 * updateScrollProgress — يحدث شريط التقدم ونقاط الأقسام أثناء التمرير
 */
function updateScrollProgress() {
  const sections = document.querySelectorAll('.step-section[data-section]');
  const bar      = document.getElementById('letter-progress-fill');
  const labelText = document.getElementById('navSectionText');
  let current    = 0;

  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= window.innerHeight * 0.4) {
      current = parseInt(sec.dataset.section);
    }
  });

  const pct = (current / (sections.length - 1)) * 100;
  if (bar) bar.style.width = pct + '%';

  // Update label with current section name
  if (labelText) {
    const curSec = document.querySelector(`.step-section[data-section="${current}"]`);
    const heading = curSec ? curSec.querySelector('.section-heading') : null;
    let name = `Section ${current + 1} / ${sections.length}`;
    if (heading) {
      const clone = heading.cloneNode(true);
      clone.querySelectorAll('.section-badge').forEach(b => b.remove());
      name = clone.textContent.trim().replace(/^[—–-]+/, '').trim().slice(0, 40);
    }
    labelText.textContent = name;
  }

  // Update dots + menu active state
  for (let i = 0; i < 12; i++) {
    ['dot-', 'sec-dot-'].forEach(prefix => {
      const d = document.getElementById(prefix + i);
      if (!d) return;
      d.className = 's-dot dot' + (i < current ? ' done' : i === current ? ' current active' : '');
      d.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }
  _updateSectionMenuActive(current);
}

function _buildSectionMenu() {
  const menu = document.getElementById('sec-sections-menu');
  if (!menu) return;
  const sections = document.querySelectorAll('.step-section[data-section]');
  menu.innerHTML = '';
  sections.forEach((sec, idx) => {
    const heading = sec.querySelector('.section-heading');
    let name = `Section ${idx + 1}`;
    if (heading) {
      const clone = heading.cloneNode(true);
      clone.querySelectorAll('.section-badge').forEach(b => b.remove());
      name = clone.textContent.trim().replace(/^[—–-]+/, '').trim() || name;
    }
    const btn = document.createElement('button');
    btn.className = 'sec-menu-item';
    btn.setAttribute('role', 'menuitem');
    btn.dataset.secIdx = idx;
    btn.innerHTML = `<span class="sec-menu-num">${idx + 1}</span><span>${name}</span>`;
    btn.addEventListener('click', () => {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      _closeSectionMenu();
    });
    menu.appendChild(btn);
  });
}

function _updateSectionMenuActive(current) {
  const items = document.querySelectorAll('.sec-menu-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === current);
    item.classList.toggle('done', i < current);
  });
}

function _toggleSectionMenu() {
  const menu = document.getElementById('sec-sections-menu');
  const btn  = document.getElementById('navSectionLabel');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    _closeSectionMenu();
  } else {
    if (menu.children.length === 0) _buildSectionMenu();
    menu.classList.add('open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', _onOutsideSectionMenu, { once: true });
    }, 0);
  }
}

function _closeSectionMenu() {
  const menu = document.getElementById('sec-sections-menu');
  const btn  = document.getElementById('navSectionLabel');
  if (menu) menu.classList.remove('open');
  if (btn)  btn.setAttribute('aria-expanded', 'false');
}

function _onOutsideSectionMenu(e) {
  const wrap = document.querySelector('.sec-label-wrap');
  if (wrap && !wrap.contains(e.target)) _closeSectionMenu();
  else document.addEventListener('click', _onOutsideSectionMenu, { once: true });
}


/* ============================================================
   13. Map Node Switcher (التنقل بين مراحل خريطة التعلم)
   ============================================================ */

/**
 * switchMapNode — التبديل بين عقد الخريطة (الحروف، السكون، المد...)
 */
function switchMapNode(targetId, btnElement) {
  // إزالة التفعيل من كل النقاط
  document.querySelectorAll('.j-node').forEach(n => n.classList.remove('active'));
  btnElement.classList.add('active');

  // حساب موضع المثلث الديناميكي
  const box      = document.querySelector('.dynamic-content-box');
  const nodeRect = btnElement.getBoundingClientRect();
  const boxRect  = box.getBoundingClientRect();
  box.style.setProperty('--pointer-left', `${(nodeRect.left + nodeRect.width / 2) - boxRect.left}px`);

  // إخفاء كل المحتويات وإظهار المطلوب
  document.querySelectorAll('.map-content-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById('content-' + targetId);
  if (target) target.style.display = 'block';

  try { playTone(450, 'sine', 0.1, 0.05); } catch (e) {}
}

/**
 * alignMapPointer — ضبط المثلث بعد تغيير حجم الشاشة
 */
function alignMapPointer() {
  const activeNode = document.querySelector('.j-node.active');
  const box        = document.querySelector('.dynamic-content-box');
  if (activeNode && box && box.offsetWidth > 0) {
    const nodeRect = activeNode.getBoundingClientRect();
    const boxRect  = box.getBoundingClientRect();
    box.style.setProperty('--pointer-left', `${(nodeRect.left + nodeRect.width / 2) - boxRect.left}px`);
  }
}
window.addEventListener('resize', alignMapPointer);


/* ============================================================
   14. ألعاب المفقود للمستويات المتخصصة
   ============================================================
   📌 كل مستوى له عداده وبطاقاته الخاصة في HTML.
      نستخدم نمطاً موحداً بدلاً من نسخ متطابقة.
   ============================================================ */

/** مساعد مشترك لإنشاء لعبة مفقود لأي مستوى */
function _initLevelMissing(opts) {
  const { foundId, totalId, shapesId, gridId, words, shapes, makeId, checkFn } = opts;
  let found = 0;

  const foundEl = document.getElementById(foundId);
  const totalEl = document.getElementById(totalId);
  if (foundEl) foundEl.textContent = '0';
  if (totalEl) totalEl.textContent = words.length;

  const shapesEl = document.getElementById(shapesId);
  if (shapesEl) {
    shapesEl.innerHTML = shapes.map((sh, i) =>
      `<div class="missing-shape-item"><div class="missing-shape-num">${i + 1}</div><div class="missing-shape-char">${sh}</div></div>`
    ).join('');
  }

  const gridEl = document.getElementById(gridId);
  if (gridEl) {
    gridEl.innerHTML = words.map((obj, i) => {
      const opts_html = shapes.map((sh, si) =>
        `<button class="missing-opt" onclick="${checkFn}(${i},${si},${obj.correct || 0},'${sh}',this)">${si + 1}</button>`
      ).join('');
      return `<div class="missing-card" id="${makeId}-${i}">
        <div class="missing-word" style="direction:rtl;">${obj.display}</div>
        <div class="missing-opts">${opts_html}</div>
      </div>`;
    }).join('');
  }

  return { getFound: () => found, incFound: () => ++found };
}

/* -- السكون -- */
let _sukoonMissingFound = 0;
function initSukoonMissing(words, shapes) {
  _sukoonMissingFound = 0;
  document.getElementById('sukoon-missing-found').textContent = '0';
  document.getElementById('sukoon-missing-total').textContent = words.length;
  const hasLocalOpts = words.some(obj => Array.isArray(obj.opts));
  document.getElementById('ui-sukoon-missing-shapes-top').innerHTML = hasLocalOpts
    ? `<div class="missing-shape-item"><div class="missing-shape-char" style="font-size:1.5rem;">اختر القطعة الصحيحة داخل كل بطاقة</div></div>`
    : shapes.map((sh, i) =>
      `<div class="missing-shape-item"><div class="missing-shape-num">${i + 1}</div><div class="missing-shape-char">${sh}</div></div>`
    ).join('');
  document.getElementById('ui-sukoon-missing-grid').innerHTML = words.map((obj, i) => {
    const opts = obj.opts || shapes;
    return `<div class="missing-card" id="sukoon-mcard-${i}">
      <div class="missing-word" style="direction:rtl;font-size:2.2rem;">${obj.display}</div>
      <div class="missing-opts">${opts.map((opt, si) =>
        `<button class="missing-opt" onclick="checkSukoonMissing(${i},${si},${obj.correct},'${opt}',this)">${hasLocalOpts ? opt : si + 1}</button>`
      ).join('')}</div>
    </div>`;
  }).join('');
}
function checkSukoonMissing(cardIdx, chosen, correct, sh, btn) {
  const card = document.getElementById('sukoon-mcard-' + cardIdx);
  if (!card || card.classList.contains('solved')) return;
  if (chosen === correct) {
    card.classList.add('solved');
    const gap = card.querySelector('.missing-gap');
    if (gap) gap.outerHTML = `<span style="color:var(--green);font-weight:700;">${sh}</span>`;
    _sukoonMissingFound++;
    document.getElementById('sukoon-missing-found').textContent = _sukoonMissingFound;
    const total = parseInt(document.getElementById('sukoon-missing-total').textContent);
    if (_sukoonMissingFound >= total) setTimeout(() => sectionComplete('Sukoon Missing'), 400);
  } else {
    btn.classList.add('shake');
    try { playTone(200, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => btn.classList.remove('shake'), 400);
  }
}

/* -- المد -- */
let maddMissingWordsFound = 0;
function initMaddMissingLetter(words, shapes, correctIndex) {
  maddMissingWordsFound = 0;
  document.getElementById('madd-missing-found').textContent = '0';
  document.getElementById('madd-missing-total').textContent = words.length;
  document.getElementById('ui-madd-missing-shapes-top').innerHTML = shapes.map((sh, i) =>
    `<div class="missing-shape-item"><div class="missing-shape-num">${i + 1}</div><div class="missing-shape-char">${sh}</div></div>`
  ).join('');
  document.getElementById('ui-madd-missing-grid').innerHTML = words.map((obj, i) =>
    `<div class="missing-card" id="madd-mcard-${i}">
      <div class="missing-word">${obj.display}</div>
      <div class="missing-opts">${shapes.map((sh, si) =>
        `<button class="missing-opt" onclick="checkMaddMissing(${i},${si},${correctIndex},'${obj.char}',this)">${si + 1}</button>`
      ).join('')}</div>
    </div>`
  ).join('');
}
function checkMaddMissing(cardIdx, chosen, correct, shapeChar, btn) {
  const card = document.getElementById('madd-mcard-' + cardIdx);
  if (!card || card.classList.contains('solved')) return;
  if (chosen === correct) {
    card.classList.add('solved');
    const gap = card.querySelector('.missing-gap');
    if (gap) gap.outerHTML = `<span style="color:var(--green);font-weight:700;">${shapeChar}</span>`;
    maddMissingWordsFound++;
    document.getElementById('madd-missing-found').textContent = maddMissingWordsFound;
    const total = parseInt(document.getElementById('madd-missing-total').textContent);
    if (maddMissingWordsFound >= total) setTimeout(() => sectionComplete('Missing Vowel'), 400);
  } else {
    btn.classList.add('shake');
    try { playTone(200, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => btn.classList.remove('shake'), 400);
  }
}

/* -- الشدة -- */
let shaddaMissingFound = 0;
function initShaddaMissing(words, shapes) {
  shaddaMissingFound = 0;
  document.getElementById('shadda-missing-found').textContent = '0';
  document.getElementById('shadda-missing-total').textContent = words.length;
  document.getElementById('ui-shadda-missing-shapes-top').innerHTML = shapes.map((sh, i) =>
    `<div class="missing-shape-item"><div class="missing-shape-num">${i + 1}</div><div class="missing-shape-char">${sh}</div></div>`
  ).join('');
  document.getElementById('ui-shadda-missing-grid').innerHTML = words.map((obj, i) =>
    `<div class="missing-card" id="shadda-mcard-${i}">
      <div class="missing-word" style="direction:rtl;">${obj.display}</div>
      <div class="missing-opts">${shapes.map((sh, si) =>
        `<button class="missing-opt" onclick="checkShaddaMissing(${i},${si},${obj.correct},'${sh}',this)">${si + 1}</button>`
      ).join('')}</div>
    </div>`
  ).join('');
}
function checkShaddaMissing(cardIdx, chosen, correct, sh, btn) {
  const card = document.getElementById('shadda-mcard-' + cardIdx);
  if (!card || card.classList.contains('solved')) return;
  if (chosen === correct) {
    card.classList.add('solved');
    const gap = card.querySelector('.missing-gap');
    if (gap) gap.outerHTML = `<span style="color:var(--green);font-weight:700;">${sh}</span>`;
    shaddaMissingFound++;
    document.getElementById('shadda-missing-found').textContent = shaddaMissingFound;
    const total = parseInt(document.getElementById('shadda-missing-total').textContent);
    if (shaddaMissingFound >= total) setTimeout(() => sectionComplete('Shadda Missing'), 400);
  } else {
    btn.classList.add('shake');
    try { playTone(200, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => btn.classList.remove('shake'), 400);
  }
}

/* -- التنوين -- */
let tanweenMissingFound = 0;
function initTanweenMissing(words, shapes) {
  tanweenMissingFound = 0;
  document.getElementById('tanween-missing-found').textContent = '0';
  document.getElementById('tanween-missing-total').textContent = words.length;
  document.getElementById('ui-tanween-missing-shapes-top').innerHTML = shapes.map((sh, i) =>
    `<div class="missing-shape-item"><div class="missing-shape-num">${i + 1}</div><div class="missing-shape-char">${sh}</div></div>`
  ).join('');
  document.getElementById('ui-tanween-missing-grid').innerHTML = words.map((obj, i) =>
    `<div class="missing-card" id="tanween-mcard-${i}">
      <div class="missing-word" style="direction:rtl;font-size:1.8rem;">${obj.display}</div>
      <div class="missing-opts">${shapes.map((sh, si) =>
        `<button class="missing-opt" onclick="checkTanweenMissing(${i},${si},${obj.correct},'${sh}',this)">${si + 1}</button>`
      ).join('')}</div>
    </div>`
  ).join('');
}
function checkTanweenMissing(cardIdx, chosen, correct, sh, btn) {
  const card = document.getElementById('tanween-mcard-' + cardIdx);
  if (!card || card.classList.contains('solved')) return;
  if (chosen === correct) {
    card.classList.add('solved');
    const gap = card.querySelector('.missing-gap');
    if (gap) gap.outerHTML = `<span style="color:var(--green);font-weight:700;">${sh}</span>`;
    tanweenMissingFound++;
    document.getElementById('tanween-missing-found').textContent = tanweenMissingFound;
    const total = parseInt(document.getElementById('tanween-missing-total').textContent);
    if (tanweenMissingFound >= total) setTimeout(() => sectionComplete('Tanween Missing'), 400);
  } else {
    btn.classList.add('shake');
    try { playTone(200, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => btn.classList.remove('shake'), 400);
  }
}


/* ============================================================
   15. initApp — نقطة البداية الرئيسية
   ============================================================
   تُستدعى بعد تسجيل دخول الطالب
   ============================================================ */
function initApp() {
  loadSavedTheme();       // تطبيق الثيم المحفوظ
  renderAlphabetGrid();   // رسم شبكة الحروف
  renderSukoonGrid();     // رسم بطاقة السكون
  renderMaddGrid();       // رسم بطاقات المد الثلاث
  renderShaddaGrid();     // رسم بطاقة الشدة
  renderTanweenGrid();    // رسم بطاقة التنوين
  updateHomeProgress();   // تحديث شريط التقدم العام
}


/* ════════════════════════════════════════════════════════════
   📄 ui_additions.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   UI ADDITIONS v3 — كل الإضافات الجديدة
   ============================================================
   1. buildMotorsHTML   — حركات تدريجية
   2. Grammar System    — 28 درس تدريجي بجمل يومية + أيقونات
   3. Reading Feedback  — صح/غلط يملأ الشاشة
   4. Puzzle Checks     — أزرار صح/غلط صغيرة على البازلات
   5. Rules Modal       — نافذة القواعد الشاملة
   6. SUV Car HTML      — نفس شكل Phaser في الـ hero
============================================================ */

/* ----------------------------------------------------------
   0. speakAr
---------------------------------------------------------- */
function speakAr(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[ًٌٍَُِّْ]/g,''));
  u.lang='ar-SA'; u.rate=0.85;
  window.speechSynthesis.speak(u);
  try { playTone(500,'sine',0.1,0.05); } catch(e){}
}

/* ----------------------------------------------------------
   1. buildMotorsHTML — حركات تدريجية
---------------------------------------------------------- */
function buildMotorsHTML(key) {
  const harakat = (typeof getAvailableHarakat==='function') ? getAvailableHarakat(key) : ['َ'];
  const defs = [
    { char:'َ', label:'Fatha — الفتحة',   color:'#e74c3c', sym:'⬆️', tip:'Open your mouth — افتح فمك!' },
    { char:'ِ', label:'Kasrah — الكسرة',  color:'#2980b9', sym:'⬇️', tip:'Drop your jaw — اخفض فكّك!' },
    { char:'ُ', label:'Dhammah — الضمة', color:'#27ae60', sym:'⭕', tip:'Round lips — دوّر شفتيك!' },
  ];
  return defs.map((m,i) => {
    const ok = harakat.includes(m.char);
    return `<div class="motor-item" style="margin-bottom:13px;border-top:${i>0?'1px solid var(--border)':'none'};padding-top:${i>0?'13px':'0'};${!ok?'opacity:0.3;filter:grayscale(1);':''}">
      <div style="font-weight:900;font-size:1.1rem;color:${m.color};margin-bottom:4px;">${ok?m.sym:'🔒'} ${m.label}</div>
      ${ok ? m.tip : '<span style="font-size:0.85rem;color:var(--text-muted);">Unlocks as you advance — يُفتح مع تقدمك</span>'}
    </div>`;
  }).join('');
}

/* ----------------------------------------------------------
   2. GRAMMAR LESSONS — 28 درس بجمل يومية + أيقونات ضمائر
---------------------------------------------------------- */
const GRAMMAR_LESSONS = [
  // أ(0)
  { title:'👤 أَنَا — I / Me', badge:'Pronoun',
    concept:'أَنَا', conceptEn:'I', icon:'🙋',
    example:{ ar:'أَنَا اسْمِي أَحْمَد', en:'My name is Ahmad' },
    tip:'Say "أَنَا" when talking about yourself!',
    review:null,
    quiz:{ q:'What does أَنَا mean?', opts:['هُوَ','هِيَ','أَنَا','نَحْنُ'], ans:2 }
  },
  // ب(1)
  { title:'👨 هُوَ — He', badge:'Pronoun',
    concept:'هُوَ', conceptEn:'He', icon:'👨',
    example:{ ar:'هُوَ مُعَلِّمٌ', en:'He is a teacher' },
    tip:'"هُوَ" is used for any male person.',
    review:{ prompt:'أَنَا = I 🙋', arabic:'أَنَا' },
    quiz:{ q:'Choose "He" in Arabic:', opts:['أَنَا','هُوَ','هِيَ','هُمْ'], ans:1 }
  },
  // ت(2)
  { title:'👩 هِيَ — She', badge:'Pronoun',
    concept:'هِيَ', conceptEn:'She', icon:'👩',
    example:{ ar:'هِيَ طَبِيبَةٌ', en:'She is a doctor' },
    tip:'"هِيَ" is used for any female person.',
    review:{ prompt:'هُوَ = He 👨', arabic:'هُوَ' },
    quiz:{ q:'What does هِيَ mean?', opts:['I','He','She','They'], ans:2 }
  },
  // ث(3)
  { title:'👉 هَذَا — This (m)', badge:'Demonstrative',
    concept:'هَذَا', conceptEn:'This (masculine)', icon:'☝️',
    example:{ ar:'هَذَا قَلَمِي', en:'This is my pen' },
    tip:'Use هَذَا for masculine nouns (no ة at end).',
    review:{ prompt:'أَنَا 🙋 هُوَ 👨 هِيَ 👩', arabic:'أَنَا — هُوَ — هِيَ' },
    quiz:{ q:'هَذَا is used for:', opts:['Feminine','Masculine','Plural','Far'], ans:1 }
  },
  // ج(4)
  { title:'👉 هَذِهِ — This (f)', badge:'Demonstrative',
    concept:'هَذِهِ', conceptEn:'This (feminine)', icon:'☝️',
    example:{ ar:'هَذِهِ حَقِيبَتِي', en:'This is my bag' },
    tip:'Use هَذِهِ for feminine nouns (ending with ة).',
    review:{ prompt:'هَذَا = This (m) ☝️', arabic:'هَذَا' },
    quiz:{ q:'"This is a school" (مَدْرَسَةٌ = fem.):', opts:['هَذَا مَدْرَسَةٌ','هَذِهِ مَدْرَسَةٌ','ذَلِكَ مَدْرَسَةٌ','هِيَ مَدْرَسَةٌ'], ans:1 }
  },
  // ح(5)
  { title:'👥 نَحْنُ — We', badge:'Pronoun',
    concept:'نَحْنُ', conceptEn:'We', icon:'👨‍👩‍👧‍👦',
    example:{ ar:'نَحْنُ أُسْرَةٌ سَعِيدَةٌ', en:'We are a happy family' },
    tip:'"نَحْنُ" includes you and others!',
    review:{ prompt:'هَذِهِ = This (f) ☝️', arabic:'هَذِهِ' },
    quiz:{ q:'نَحْنُ means:', opts:['I','He','We','They'], ans:2 }
  },
  // خ(6)
  { title:'🫵 أَنْتَ / أَنْتِ — You', badge:'Pronoun',
    concept:'أَنْتَ / أَنْتِ', conceptEn:'You (m/f)', icon:'🫵',
    example:{ ar:'أَنْتَ طَالِبٌ مُجْتَهِدٌ', en:'You are a hardworking student' },
    tip:'أَنْتَ for male, أَنْتِ for female.',
    review:{ prompt:'نَحْنُ = We 👨‍👩‍👧‍👦', arabic:'نَحْنُ' },
    quiz:{ q:'أَنْتِ is used for:', opts:['A male','A female','A group','Yourself'], ans:1 }
  },
  // د(7)
  { title:'👐 هُمْ — They', badge:'Pronoun',
    concept:'هُمْ', conceptEn:'They', icon:'👐',
    example:{ ar:'هُمْ أَصْدِقَائِي', en:'They are my friends' },
    tip:'"هُمْ" for a group of people.',
    review:{ prompt:'أَنْتَ/أَنْتِ = You 🫵', arabic:'أَنْتَ — أَنْتِ' },
    quiz:{ q:'Complete: "___ يَلْعَبُونَ" (They play):', opts:['أَنَا','هُمْ','هُوَ','نَحْنُ'], ans:1 }
  },
  // ذ(8)
  { title:'👈 ذَلِكَ / تِلْكَ — That', badge:'Demonstrative',
    concept:'ذَلِكَ / تِلْكَ', conceptEn:'That (far)', icon:'👈',
    example:{ ar:'ذَلِكَ مَسْجِدٌ جَمِيلٌ', en:'That is a beautiful mosque' },
    tip:'ذَلِكَ (m) / تِلْكَ (f) for far objects.',
    review:{ prompt:'هُمْ = They 👐', arabic:'هُمْ' },
    quiz:{ q:'"That (f) is a school":', opts:['ذَلِكَ مَدْرَسَةٌ','تِلْكَ مَدْرَسَةٌ','هَذِهِ مَدْرَسَةٌ','هِيَ مَدْرَسَةٌ'], ans:1 }
  },
  // ر(9)
  { title:'🔄 All Pronouns Review', badge:'Review',
    concept:'أَنَا • هُوَ • هِيَ • نَحْنُ • أَنْتَ • هُمْ', conceptEn:'I • He • She • We • You • They', icon:'📋',
    example:{ ar:'أَنَا وَهُوَ أَصْدِقَاءٌ', en:'He and I are friends' },
    tip:'Master all pronouns — they are the foundation!',
    review:null,
    quiz:{ q:'Which is "She"?', opts:['هُوَ','هِيَ','هُمْ','نَحْنُ'], ans:1 }
  },
  // ز(10)
  { title:'❓ مَا / مَاذَا — What?', badge:'Question',
    concept:'مَا / مَاذَا', conceptEn:'What?', icon:'❓',
    example:{ ar:'مَا اسْمُكَ؟', en:'What is your name?' },
    tip:'مَا for nouns, مَاذَا for actions.',
    review:{ prompt:'Pronouns review — all 6!', arabic:'أَنَا — هُوَ — هِيَ — نَحْنُ — أَنْتَ — هُمْ' },
    quiz:{ q:'"What is your name?" uses:', opts:['مَنْ','مَا','أَيْنَ','كَيْفَ'], ans:1 }
  },
  // س(11)
  { title:'❓ مَنْ — Who?', badge:'Question',
    concept:'مَنْ', conceptEn:'Who?', icon:'🤷',
    example:{ ar:'مَنْ طَرَقَ البَابَ؟', en:'Who knocked on the door?' },
    tip:'"مَنْ" is always for people.',
    review:{ prompt:'مَا/مَاذَا = What? ❓', arabic:'مَا — مَاذَا' },
    quiz:{ q:'"Who are you?" in Arabic:', opts:['مَا أَنْتَ؟','مَنْ أَنْتَ؟','أَيْنَ أَنْتَ؟','كَيْفَ أَنْتَ؟'], ans:1 }
  },
  // ش(12)
  { title:'❓ أَيْنَ — Where?', badge:'Question',
    concept:'أَيْنَ', conceptEn:'Where?', icon:'📍',
    example:{ ar:'أَيْنَ تَسْكُنُ؟', en:'Where do you live?' },
    tip:'"أَيْنَ" always asks about a place.',
    review:{ prompt:'مَنْ = Who? 🤷', arabic:'مَنْ' },
    quiz:{ q:'أَيْنَ asks about:', opts:['A person','A time','A place','A reason'], ans:2 }
  },
  // ص(13)
  { title:'❓ كَيْفَ — How?', badge:'Question',
    concept:'كَيْفَ', conceptEn:'How?', icon:'🤔',
    example:{ ar:'كَيْفَ حَالُكَ؟ — بِخَيْرٍ شُكْراً', en:'How are you? — Fine, thanks' },
    tip:'The most common Arabic greeting!',
    review:{ prompt:'أَيْنَ = Where? 📍', arabic:'أَيْنَ' },
    quiz:{ q:'كَيْفَ حَالُكَ؟ means:', opts:['Who are you?','How are you?','Where are you?','What are you?'], ans:1 }
  },
  // ض(14)
  { title:'❓ هَلْ — Is/Do?', badge:'Question',
    concept:'هَلْ', conceptEn:'Yes/No question', icon:'💬',
    example:{ ar:'هَلْ تَتَكَلَّمُ العَرَبِيَّةَ؟', en:'Do you speak Arabic?' },
    tip:'"هَلْ" always expects نَعَم or لَا.',
    review:{ prompt:'كَيْفَ = How? 🤔', arabic:'كَيْفَ' },
    quiz:{ q:'هَلْ is used for:', opts:['Who?','Yes/No ?','Where?','Why?'], ans:1 }
  },
  // ط(15)
  { title:'🔗 فِي — In', badge:'Preposition',
    concept:'فِي', conceptEn:'In / Inside', icon:'📦',
    example:{ ar:'الكِتَابُ فِي الحَقِيبَةِ', en:'The book is in the bag' },
    tip:'"فِي" makes the noun end with Kasra ِ.',
    review:{ prompt:'هَلْ = Yes/No? 💬', arabic:'هَلْ' },
    quiz:{ q:'"The cat is in the room":', opts:['القِطَّةُ عَلَى الغُرْفَةِ','القِطَّةُ فِي الغُرْفَةِ','القِطَّةُ إِلَى الغُرْفَةِ','القِطَّةُ مِنَ الغُرْفَةِ'], ans:1 }
  },
  // ظ(16)
  { title:'🔗 عَلَى — On', badge:'Preposition',
    concept:'عَلَى', conceptEn:'On / Upon', icon:'⬆️',
    example:{ ar:'الكِتَابُ عَلَى الطَّاوِلَةِ', en:'The book is on the table' },
    tip:'"عَلَى" = on top of something.',
    review:{ prompt:'فِي = In 📦', arabic:'فِي' },
    quiz:{ q:'"On the table" = ___ الطَّاوِلَةِ:', opts:['فِي','مِنْ','عَلَى','إِلَى'], ans:2 }
  },
  // ع(17)
  { title:'🔗 إِلَى / مِنْ — To / From', badge:'Preposition',
    concept:'إِلَى / مِنْ', conceptEn:'To / From', icon:'↔️',
    example:{ ar:'أَذْهَبُ مِنَ البَيْتِ إِلَى المَدْرَسَةِ', en:'I go from home to school' },
    tip:'"إِلَى" = destination, "مِنْ" = origin.',
    review:{ prompt:'عَلَى = On ⬆️', arabic:'عَلَى' },
    quiz:{ q:'"From school" = ___ المَدْرَسَةِ:', opts:['إِلَى','فِي','عَلَى','مِنْ'], ans:3 }
  },
  // غ(18)
  { title:'🔗 وَ — And', badge:'Conjunction',
    concept:'وَ', conceptEn:'And', icon:'➕',
    example:{ ar:'أُحِبُّ الشَّايَ وَالْقَهْوَةَ', en:'I love tea and coffee' },
    tip:'"وَ" attaches directly to the next word!',
    review:{ prompt:'إِلَى(to) مِنْ(from) ↔️', arabic:'إِلَى — مِنْ' },
    quiz:{ q:'"Ahmad and Sara" in Arabic:', opts:['أَحْمَدُ أَوْ سَارَة','أَحْمَدُ وَسَارَة','أَحْمَدُ لَكِنْ سَارَة','أَحْمَدُ فِي سَارَة'], ans:1 }
  },
  // ف(19)
  { title:'❓ لِمَاذَا — Why?', badge:'Question',
    concept:'لِمَاذَا', conceptEn:'Why?', icon:'🧐',
    example:{ ar:'لِمَاذَا تَدْرُسُ العَرَبِيَّةَ؟', en:'Why do you study Arabic?' },
    tip:'"لِمَاذَا" expects لِأَنَّ (because) as answer.',
    review:{ prompt:'وَ = And ➕', arabic:'وَ' },
    quiz:{ q:'"Why are you late?" uses:', opts:['مَنْ','أَيْنَ','لِمَاذَا','كَيْفَ'], ans:2 }
  },
  // ق(20)
  { title:'🔄 Questions Review', badge:'Review',
    concept:'مَا • مَنْ • أَيْنَ • كَيْفَ • هَلْ • لِمَاذَا', conceptEn:'What•Who•Where•How•Is?•Why', icon:'❓',
    example:{ ar:'مَنْ أَنْتَ وَأَيْنَ تَسْكُنُ؟', en:'Who are you and where do you live?' },
    tip:'These 6 words open every conversation!',
    review:null,
    quiz:{ q:'"Where is the school?" uses:', opts:['مَنْ','كَيْفَ','أَيْنَ','لِمَاذَا'], ans:2 }
  },
  // ك(21)
  { title:'🔗 لـِ / بـِ — For / By', badge:'Preposition',
    concept:'لـِ / بـِ', conceptEn:'For / By/With', icon:'🎯',
    example:{ ar:'أَكْتُبُ بِالْقَلَمِ', en:'I write with the pen' },
    tip:'لـِ = for someone, بـِ = by means of.',
    review:{ prompt:'Questions: مَا مَنْ أَيْنَ كَيْفَ هَلْ لِمَاذَا', arabic:'مَا — مَنْ — أَيْنَ — كَيْفَ — هَلْ — لِمَاذَا' },
    quiz:{ q:'"I write with a pen" = أَكْتُبُ ___ القَلَمِ:', opts:['فِي','عَلَى','بـِ','مِنْ'], ans:2 }
  },
  // ل(22)
  { title:'👥 هَؤُلَاءِ — These', badge:'Demonstrative',
    concept:'هَؤُلَاءِ', conceptEn:'These (people)', icon:'👥',
    example:{ ar:'هَؤُلَاءِ زُمَلَائِي', en:'These are my classmates' },
    tip:'"هَؤُلَاءِ" for a group of near people.',
    review:{ prompt:'لـِ(for) بـِ(by) 🎯', arabic:'لـِ — بـِ' },
    quiz:{ q:'"These are teachers" uses:', opts:['هَذَا','هَذِهِ','هَؤُلَاءِ','أُولَئِكَ'], ans:2 }
  },
  // م(23)
  { title:'👥 أُولَئِكَ — Those', badge:'Demonstrative',
    concept:'أُولَئِكَ', conceptEn:'Those (far people)', icon:'🫣',
    example:{ ar:'أُولَئِكَ هُمُ الفَائِزُونَ', en:'Those are the winners' },
    tip:'"أُولَئِكَ" for far people.',
    review:{ prompt:'هَؤُلَاءِ = These 👥', arabic:'هَؤُلَاءِ' },
    quiz:{ q:'"Those are doctors" (far):', opts:['هَؤُلَاءِ أَطِبَّاءٌ','أُولَئِكَ أَطِبَّاءٌ','هُمْ أَطِبَّاءٌ','ذَلِكَ أَطِبَّاءٌ'], ans:1 }
  },
  // ن(24)
  { title:'🔗 مَعَ / عَنْ', badge:'Preposition',
    concept:'مَعَ / عَنْ', conceptEn:'With / About', icon:'🤝',
    example:{ ar:'ذَهَبْتُ مَعَ أَبِي', en:'I went with my father' },
    tip:'مَعَ = together, عَنْ = about/concerning.',
    review:{ prompt:'أُولَئِكَ = Those 🫣', arabic:'أُولَئِكَ' },
    quiz:{ q:'"I went with my friend":', opts:['ذَهَبْتُ فِي صَدِيقِي','ذَهَبْتُ مَعَ صَدِيقِي','ذَهَبْتُ إِلَى صَدِيقِي','ذَهَبْتُ مِنْ صَدِيقِي'], ans:1 }
  },
  // هـ(25)
  { title:'🔄 Demonstratives Review', badge:'Review',
    concept:'هَذَا • هَذِهِ • ذَلِكَ • تِلْكَ • هَؤُلَاءِ • أُولَئِكَ', conceptEn:'This•This•That•That•These•Those', icon:'👆',
    example:{ ar:'هَذَا كِتَابِي وَتِلْكَ حَقِيبَتُكَ', en:'This is my book and that is your bag' },
    tip:'Near ↔ هذا/هذه — Far ↔ ذلك/تلك',
    review:null,
    quiz:{ q:'"That (f, far)" is:', opts:['هَذِهِ','ذَلِكَ','تِلْكَ','أُولَئِكَ'], ans:2 }
  },
  // و(26)
  { title:'📝 Simple Sentence', badge:'Structure',
    concept:'مبتدأ + خبر = جملة', conceptEn:'Subject + Info = Sentence', icon:'📝',
    example:{ ar:'الجَوُّ جَمِيلٌ — البَيْتُ كَبِيرٌ', en:'The weather is beautiful — The house is big' },
    tip:'No "is/are" needed in Arabic! Just Subject + Adjective.',
    review:{ prompt:'مَعَ(with) عَنْ(about) 🤝', arabic:'مَعَ — عَنْ' },
    quiz:{ q:'"The book is new" in Arabic:', opts:['الكِتَابُ هُوَ جَدِيدٌ','الكِتَابُ جَدِيدٌ','جَدِيدٌ الكِتَابُ','الكِتَابُ فِي جَدِيدٌ'], ans:1 }
  },
  // ي(27)
  { title:'🏆 Grand Final Review', badge:'Master Review',
    concept:'كل ما تعلمناه معاً!', conceptEn:'Everything Together!', icon:'🏆',
    example:{ ar:'أَنَا أَذْهَبُ مَعَ أُسْرَتِي إِلَى المَسْجِدِ', en:'I go with my family to the mosque' },
    tip:'You can now make real Arabic sentences! 🎉',
    review:null,
    quiz:{ q:'"Who went to school?" uses:', opts:['مَاذَا','أَيْنَ','مَنْ','لِمَاذَا'], ans:2 }
  },
];

/* ----------------------------------------------------------
   renderGrammarLesson
---------------------------------------------------------- */
let _grammarAnswered = false;

function renderGrammarLesson(key) {
  const container = document.getElementById('ui-grammar-lesson');
  if (!container) return;
  const idx = (typeof ARABIC_LETTERS!=='undefined') ? ARABIC_LETTERS.indexOf(key) : -1;
  if (idx<0 || idx>=GRAMMAR_LESSONS.length) { container.innerHTML=''; return; }

  const L = GRAMMAR_LESSONS[idx];
  _grammarAnswered = false;

  const titleEl = document.getElementById('grammar-section-title');
  if (titleEl) titleEl.textContent = L.title;

  container.innerHTML = `
    <div class="grammar-lesson">
      <div class="grammar-lesson-title">
        <span class="grammar-concept-icon">${L.icon}</span>
        ${L.title}
        <span class="grammar-badge">${L.badge}</span>
      </div>

      <!-- الكلمة/المفهوم الجديد -->
      <div class="grammar-concept-card" onclick="speakAr('${L.concept.replace(/'/g,"\\'")}')">
        <div class="gcc-ar">${L.concept}</div>
        <div class="gcc-en">${L.conceptEn}</div>
        <i class="fas fa-volume-up gcc-vol"></i>
      </div>

      <!-- المثال اليومي -->
      <div style="margin:12px 0 10px;">
        <div class="grammar-label">📖 Daily Example — مثال يومي</div>
        <div class="grammar-example-card" onclick="speakAr('${L.example.ar.replace(/'/g,"\\'")}')">
          <div class="grammar-example-ar">${L.example.ar}</div>
          <div class="grammar-example-en">${L.example.en}</div>
          <i class="fas fa-volume-up" style="color:#94a3b8;font-size:0.9rem;"></i>
        </div>
        <div style="font-size:0.82rem;color:#94a3b8;margin-top:5px;font-style:italic;">💡 ${L.tip}</div>
      </div>

      <!-- مراجعة سريعة -->
      ${L.review ? `
      <div class="grammar-review-box" onclick="speakAr('${L.review.arabic.replace(/'/g,"\\'")}')">
        <span class="grammar-review-label">🔄 Quick Review</span>
        <span class="grammar-review-text">${L.review.prompt}</span>
        <div class="grammar-review-ar">${L.review.arabic}</div>
      </div>` : ''}

      <!-- التدريب -->
      <div class="grammar-quiz-wrap">
        <div class="grammar-quiz-q">${L.quiz.q} ❓</div>
        <div class="grammar-opts" id="g-opts-${idx}">
          ${L.quiz.opts.map((o,oi) => `
            <button class="grammar-opt-btn" onclick="checkGrammarAns(${idx},${oi},${L.quiz.ans},this)">
              ${o}
            </button>`).join('')}
        </div>
        <div class="grammar-result-msg" id="g-result-${idx}"></div>
      </div>
    </div>`;
}

function checkGrammarAns(idx, chosen, correct, btn) {
  if (_grammarAnswered) return;
  _grammarAnswered = true;
  document.querySelectorAll(`#g-opts-${idx} .grammar-opt-btn`).forEach(b => b.style.pointerEvents='none');
  const rEl = document.getElementById(`g-result-${idx}`);
  if (chosen===correct) {
    btn.classList.add('correct');
    if (rEl) { rEl.textContent='🎉 Excellent! / ممتاز!'; rEl.style.color='#15803d'; }
    try { playVictorySound(); addStars(2); fireConfetti(); } catch(e){}
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll(`#g-opts-${idx} .grammar-opt-btn`)[correct].classList.add('correct');
    if (rEl) { rEl.textContent='💪 Try again next time! / حاول مرة أخرى!'; rEl.style.color='#dc2626'; }
    try { playErrorSound(); } catch(e){}
  }
}

/* ----------------------------------------------------------
   3. Reading Feedback — صح/غلط يملأ الشاشة
---------------------------------------------------------- */
function showReadingFeedback(isCorrect) {
  const old = document.getElementById('reading-feedback-overlay');
  if (old) old.remove();
  const ov = document.createElement('div');
  ov.id = 'reading-feedback-overlay';
  ov.style.cssText = `position:fixed;inset:0;z-index:999999;display:flex;flex-direction:column;
    align-items:center;justify-content:center;cursor:pointer;
    background:${isCorrect?'rgba(21,128,61,0.93)':'rgba(185,28,28,0.93)'};
    animation:fbIn 0.28s cubic-bezier(0.34,1.56,0.64,1);`;
  ov.innerHTML = `
    <div style="font-size:clamp(80px,20vw,180px);animation:fbPop 0.4s cubic-bezier(0.34,1.56,0.64,1);line-height:1;">
      ${isCorrect?'✅':'❌'}
    </div>
    <div style="font-family:'Tajawal',sans-serif;font-size:clamp(1.4rem,4vw,2.4rem);font-weight:900;color:#fff;margin-top:16px;text-align:center;">
      ${isCorrect?'🎉 أحسنت! Well Done!':'💪 حاول مرة أخرى! Try Again!'}
    </div>
    <div style="color:rgba(255,255,255,0.7);margin-top:8px;font-size:1rem;font-family:sans-serif;">
      Tap anywhere to continue
    </div>`;
  ov.onclick = () => ov.remove();
  document.body.appendChild(ov);
  if (isCorrect) { try { playVictorySound(); addStars(3); fireConfetti(); } catch(e){} }
  else           { try { playErrorSound(); } catch(e){} }
  setTimeout(() => { if (ov.parentNode) ov.remove(); }, 3000);
}

/* ----------------------------------------------------------
   4. addPuzzleChecks — أزرار صح/غلط صغيرة على كل بازلة
---------------------------------------------------------- */
function addPuzzleChecks() {
  // أزرار صح/غلط على puzzle-wrap (حرفين وثلاثة أحرف)
  document.querySelectorAll('.puzzle-wrap, .split-box').forEach(pw => {
    if (pw.querySelector('.pz-checks')) return;
    const wrap = document.createElement('div');
    wrap.className = 'pz-checks';
    wrap.innerHTML = `
      <button class="pz-btn pz-ok"  title="Correct / صح"  onclick="puzzleCheck(this,true)">✓</button>
      <button class="pz-btn pz-err" title="Wrong / خطأ" onclick="puzzleCheck(this,false)">✗</button>`;
    if (!['relative','absolute'].includes(getComputedStyle(pw).position))
      pw.style.position = 'relative';
    pw.appendChild(wrap);
  });
}

function puzzleCheck(btn, isCorrect) {
  // منع التكرار
  const checks = btn.closest('.pz-checks');
  if (checks && checks.dataset.done) return;
  if (checks) checks.dataset.done = '1';
  showReadingFeedback(isCorrect);
}

// إضافة الأزرار بعد كل render للبازلات
const _origOpenLetter = (typeof openLetter !== 'undefined') ? openLetter : null;
// Patch openLetter to add puzzle checks and update button visibility
document.addEventListener('DOMContentLoaded', function() {
  const _tryPatch = () => {
    if (typeof openLetter === 'function' && !openLetter._patched) {
      const _orig = openLetter;
      openLetter = function(key) {
        _orig(key);
        setTimeout(() => {
          updateCheckBtnVisibility();
          setTimeout(addPuzzleChecks, 400);
        }, 200);
      };
      openLetter._patched = true;
    }
  };
  _tryPatch();
  setTimeout(_tryPatch, 500);
});

/* ----------------------------------------------------------
   5. Check buttons visibility
---------------------------------------------------------- */
function updateCheckBtnVisibility() {
  const btns = document.getElementById('reading-check-btns');
  if (!btns) return;
  const ls = document.getElementById('letter-screen');
  const ok = ls && window.getComputedStyle(ls).display!=='none' && ls.style.opacity!=='0';
  btns.classList.toggle('visible', ok);
}

const _chkObs = new MutationObserver(updateCheckBtnVisibility);
document.addEventListener('DOMContentLoaded', () => {
  ['letter-screen','home-screen','sukoon-screen','madd-screen','shadda-screen','tanween-screen','dashboard-screen']
    .forEach(id => { const el=document.getElementById(id); if(el) _chkObs.observe(el,{attributes:true,attributeFilter:['style']}); });
  updateCheckBtnVisibility();
});

/* ----------------------------------------------------------
   6. Rules Modal — نافذة القواعد الشاملة
---------------------------------------------------------- */
function toggleRulesModal() {
  const ov = document.getElementById('rules-overlay');
  if (!ov) return;
  ov.style.display = ov.style.display==='none' ? 'flex' : 'none';
}

/* ----------------------------------------------------------
   7. Shadda/Tanween Engine Rule Visual
      موتورين = عربيتين
      موتورين متشابهين → عربيتين مختلفتين (تنوين)
      موتورين مختلفين  → عربيتين متشابهتين (شدة)
---------------------------------------------------------- */
function renderEngineCarRule(containerId, type) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (type==='shadda') {
    el.innerHTML = `
      <div class="engine-car-rule">
        <div class="ecr-title">⚙️ + ⚙️ = 🚗 + 🚗 — القاعدة الذهبية</div>
        <div class="ecr-row">
          <div class="ecr-engine diff">ⓐ</div>
          <div class="ecr-plus">+</div>
          <div class="ecr-engine diff">ⓑ</div>
          <div class="ecr-arrow">→</div>
          <div class="ecr-car">🚗<sub>A</sub></div>
          <div class="ecr-plus">+</div>
          <div class="ecr-car">🚗<sub>A</sub></div>
        </div>
        <div class="ecr-desc">
          موتوران <strong>مختلفان</strong> (ساكن + حركة) → عربيتان <strong>متشابهتان</strong> (نفس الحرف مرتين = شدة ّ)<br>
          <em>Two DIFFERENT engines → TWO SAME cars = Shadda ّ</em>
        </div>
      </div>`;
  } else {
    el.innerHTML = `
      <div class="engine-car-rule">
        <div class="ecr-title">⚙️ + ⚙️ = 🚗 + 🚗 — القاعدة الذهبية</div>
        <div class="ecr-row">
          <div class="ecr-engine same">ⓐ</div>
          <div class="ecr-plus">+</div>
          <div class="ecr-engine same">ⓐ</div>
          <div class="ecr-arrow">→</div>
          <div class="ecr-car">🚗<sub>A</sub></div>
          <div class="ecr-plus">+</div>
          <div class="ecr-car">🚗<sub>N</sub></div>
        </div>
        <div class="ecr-desc">
          موتوران <strong>متشابهان</strong> (نفس الحركة مضاعفة) → عربيتان <strong>مختلفتان</strong> (الحرف + النون الخفية = تنوين ٌ ً ٍ)<br>
          <em>Two SAME engines → TWO DIFFERENT cars (Letter + hidden Noon) = Tanween</em>
        </div>
      </div>`;
  }
}



/* ════════════════════════════════════════════════════════════
   📄 enhancements.js
   ════════════════════════════════════════════════════════════ */
/* ============================================================
   ENHANCEMENTS.JS — الإصدار النهائي مع كل التحسينات
   ============================================================
   1. Victory Overlay — Lottie Fireworks (بديل showReadingFeedback)
   2. Memory Game
   3. Spinning Wheel
   4. Puzzle as XO (سكشنات 3، 4، 6 + XO الأصلي)
   5. XO diagonals — checkPuzzleXoWin يدعم الصفوف/الأعمدة/الأقطار
   6. Split Words كـ XO
   7. Square XO cells (aspect-ratio 1/1) — في CSS
   8. Professional Sounds (enhanced oscillator envelopes)
   9. Motors progressive (مثل الأساسي.html)
  10. إلغاء speakAr من XO games
  11. إلغاء showReadingFeedback القديم (يستبدله Lottie Victory)
  12. إلغاء pz-checks buttons
  13. إضافة كلمة "أنا" في آخر صفحة الألف
============================================================ */


/* ============================================================
   0. PROFESSIONAL SOUND SYSTEM
============================================================ */
(function upgradeSounds() {
  if (typeof audioCtx === 'undefined' || !audioCtx) return;

  window.playToneEnhanced = function(freq, type = 'sine', dur = 0.2, vol = 0.1) {
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // ADSR envelope
      const attack = 0.005;
      const decay  = dur * 0.3;
      const release = dur * 0.5;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + attack);
      gain.gain.exponentialRampToValueAtTime(vol * 0.7, now + attack + decay);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + dur + release);

      // Low-pass filter for warmth
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.max(freq * 4, 1200), now);
      filter.Q.setValueAtTime(1, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + dur + release);

      // Harmonic overtone for richness
      if (type === 'sine' || type === 'triangle') {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = type;
        osc2.frequency.setValueAtTime(freq * 2, now);
        gain2.gain.setValueAtTime(0.0001, now);
        gain2.gain.exponentialRampToValueAtTime(vol * 0.15, now + attack);
        gain2.gain.exponentialRampToValueAtTime(0.00001, now + dur + release);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now);
        osc2.stop(now + dur + release);
      }
    } catch (e) {}
  };

  window.playTone = function(freq, type, dur, vol) {
    return window.playToneEnhanced(freq, type, dur, vol);
  };

  window.playVictorySoundPro = function() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((f, i) =>
      setTimeout(() => window.playToneEnhanced(f, 'sine', 0.25, 0.18), i * 90)
    );
    setTimeout(() => {
      window.playToneEnhanced(523.25, 'triangle', 0.6, 0.14);
      window.playToneEnhanced(659.25, 'triangle', 0.6, 0.14);
      window.playToneEnhanced(783.99, 'triangle', 0.6, 0.12);
    }, 460);
    setTimeout(() => window.playToneEnhanced(2093, 'sine', 0.15, 0.08), 700);
    setTimeout(() => window.playToneEnhanced(2637, 'sine', 0.15, 0.08), 820);
  };
  window.playVictorySound = window.playVictorySoundPro;

  window.playClickPro = function() {
    window.playToneEnhanced(800, 'triangle', 0.08, 0.12);
    setTimeout(() => window.playToneEnhanced(1200, 'sine', 0.06, 0.08), 30);
  };

  window.playErrorPro = function() {
    window.playToneEnhanced(320, 'triangle', 0.15, 0.12);
    setTimeout(() => window.playToneEnhanced(220, 'triangle', 0.2, 0.12), 80);
  };
  window.playErrorSound = window.playErrorPro;

  window.playMatchPro = function() {
    window.playToneEnhanced(1320, 'sine', 0.15, 0.12);
    setTimeout(() => window.playToneEnhanced(1760, 'sine', 0.2, 0.1), 100);
  };
})();


/* ============================================================
   1. 🎆 VICTORY OVERLAY with Lottie
============================================================ */
let _victoryLottieAnim = null;
let _victoryLottieData = null;
try { _victoryLottieData = window.__FIREWORKS_DATA__ || null; } catch(e){}

function showVictory(word, subtitle) {
  let overlay = document.getElementById('victory-overlay');
  if (!overlay) {
    overlay = _buildVictoryOverlay();
    document.body.appendChild(overlay);
  }

  // word/sub elements removed — no card to populate
  overlay.style.display = 'flex';

  const lottieBox = document.getElementById('victory-lottie');
  if (lottieBox) lottieBox.innerHTML = '';
  if (lottieBox && _victoryLottieData && typeof lottie !== 'undefined') {
    try {
      _victoryLottieAnim = lottie.loadAnimation({
        container:     lottieBox,
        renderer:      'svg',
        loop:          true,
        autoplay:      true,
        animationData: _victoryLottieData,
      });
    } catch (e) {}
  }

  try {
    if (typeof playVictorySoundPro === 'function') playVictorySoundPro();
    setTimeout(() => playToneEnhanced(80,  'sawtooth', 0.4, 0.12), 0);
    setTimeout(() => playToneEnhanced(120, 'sawtooth', 0.3, 0.10), 180);
    setTimeout(() => playToneEnhanced(90,  'sawtooth', 0.5, 0.10), 380);
    setTimeout(() => playToneEnhanced(3000, 'sine', 0.08, 0.07), 550);
    setTimeout(() => playToneEnhanced(2500, 'sine', 0.08, 0.07), 650);
  } catch (e) {}

  try { fireConfetti(); } catch (e) {}

  clearTimeout(window._victoryTimer);
  window._victoryTimer = setTimeout(() => closeVictory(), 2800);
}

function closeVictory(ev) {
  // No more word-box — any click closes the overlay
  const overlay = document.getElementById('victory-overlay');
  if (!overlay) return;
  overlay.style.display = 'none';
  if (_victoryLottieAnim) {
    try { _victoryLottieAnim.destroy(); } catch (e) {}
    _victoryLottieAnim = null;
  }
  const lottieBox = document.getElementById('victory-lottie');
  if (lottieBox) lottieBox.innerHTML = '';
  clearTimeout(window._victoryTimer);
}

function _buildVictoryOverlay() {
  const ov = document.createElement('div');
  ov.id = 'victory-overlay';
  ov.onclick = closeVictory;
  // Fireworks only - no word card
  ov.innerHTML = `
    <div id="victory-lottie"></div>
  `;
  return ov;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVictory();
});

/* ============================================================
   OVERRIDE: showReadingFeedback -> Lottie Victory
============================================================ */
(function overrideReadingFeedback() {
  window.showReadingFeedback = function(isCorrect) {
    if (isCorrect) {
      showVictory('✓', 'أحسنت! — Correct!');
      try { addStars(3); } catch(e) {}
    } else {
      _showQuickError();
    }
  };
})();

function _showQuickError() {
  const old = document.getElementById('quick-error-overlay');
  if (old) old.remove();
  const ov = document.createElement('div');
  ov.id = 'quick-error-overlay';
  ov.style.cssText = `
    position:fixed;inset:0;z-index:500001;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    background:rgba(185,28,28,0.88);cursor:pointer;
  `;
  ov.innerHTML = `
    <div style="font-size:clamp(80px,18vw,160px);line-height:1;">❌</div>
    <div style="font-family:'Tajawal',sans-serif;font-size:clamp(1.3rem,4vw,2rem);font-weight:900;color:#fff;margin-top:12px;">
      💪 حاول مرة أخرى! — Try Again!
    </div>
    <div style="color:rgba(255,255,255,0.7);margin-top:8px;font-size:1rem;">Tap to continue</div>
  `;
  ov.onclick = () => ov.remove();
  document.body.appendChild(ov);
  try { playErrorPro(); } catch(e) {}
  setTimeout(() => { if (ov.parentNode) ov.remove(); }, 2200);
}


/* ============================================================
   2. 🧠 MEMORY GAME
============================================================ */
let _memCards = [], _memFirst = null, _memSecond = null;
let _memLock = false, _memFlipped = false;
let _memMatchedCount = 0, _memTotalPairs = 0;
let _memPlayTimerId = null, _memPlaySecondsLeft = 0, _memPlayDuration = 120, _memTimerLevelKey = null;
let _memTimerStarted = false, _memPendingLevelKey = null, _memPendingDuration = 120;

function initMemoryGame(words, levelKey) {
  // Resolve grid element: prefer per-level grid when levelKey provided
  const gridId = levelKey ? `${levelKey}-memory-grid` : 'memory-grid';
  let grid = document.getElementById(gridId);
  if (!grid && levelKey) grid = document.getElementById('memory-grid'); // safety fallback
  if (!grid) return;

  if (!words) {
    // Priority: explicit levelKey → ADVANCED_LEVELS_DB → active advanced level → letter DB
    const advKey = levelKey || window.activeAdvancedLevel;
    let source = null;
    if (advKey && ADVANCED_LEVELS_DB[advKey]) {
      source = ADVANCED_LEVELS_DB[advKey].words;
    } else {
      const data = (typeof lettersDB !== 'undefined' && activeLetterKey)
        ? lettersDB[activeLetterKey] : null;
      if (!data) return;
      source = (data.splitWords && data.splitWords.length)
        ? data.splitWords : (data.xoWords || []);
    }
    const unique = [...new Set(source)].slice(0, 6);
    while (unique.length < 6 && source.length) {
      unique.push(source[unique.length % source.length]);
    }
    words = unique.slice(0, 6);
  }

  _memTotalPairs   = words.length;
  _memMatchedCount = 0;

  const deck = [...words, ...words].sort(() => 0.5 - Math.random());
  _memCards = deck;

  grid.innerHTML = '';
  deck.forEach((w, i) => {
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.dataset.word = w;
    card.dataset.idx  = i;
    card.innerHTML = `
      <div class="mem-face mem-back">
        <div class="mem-num">${i + 1}</div>
        <i class="fas fa-star"></i>
      </div>
      <div class="mem-face mem-front" style="font-family:'Noto Naskh Arabic',serif;">${w}</div>
    `;
    card.addEventListener('click', () => _memFlipCard(card));
    grid.appendChild(card);
  });

  _memFirst = _memSecond = null;
  _memLock    = false;
  _memFlipped = false;

  // Peek button: per-level or default
  const peekBtnId = levelKey ? `${levelKey}-memory-peek-btn` : 'memory-peek-btn';
  const peekBtn = document.getElementById(peekBtnId) || document.getElementById('memory-peek-btn');
  if (peekBtn) {
    const peekSec = _memGetPeekSec(levelKey);
    peekBtn.disabled = false;
    peekBtn.innerHTML = `<i class="fas fa-eye"></i> Peek (${peekSec}s)`;
  }
  // Remember which grid is active for memoryPeek
  window._activeMemoryGridId = gridId;

  // Store timer config — starts on first card flip
  _memStopPlayTimer();
  _memTimerStarted  = false;
  _memPendingLevelKey = levelKey;
  _memPendingDuration = _memGetPlaySec(levelKey);
}

function _memFlipCard(card) {
  if (_memLock) return;
  if (card === _memFirst) return;
  if (card.classList.contains('matched')) return;
  if (card.classList.contains('flip') && !_memFlipped) return;

  try { playClickPro ? playClickPro() : playTone(600, 'sine', 0.1, 0.08); } catch (e) {}
  card.classList.add('flip');

  if (!_memFlipped) {
    if (!_memTimerStarted) {
      _memTimerStarted = true;
      _memStartPlayTimer(_memPendingLevelKey, _memPendingDuration);
    }
    _memFlipped = true;
    _memFirst   = card;
    return;
  }
  _memSecond = card;
  _memLock   = true;

  const match = _memFirst.dataset.word === _memSecond.dataset.word;
  if (match) {
    try { playMatchPro ? playMatchPro() : playTone(800, 'triangle', 0.1, 0.1); } catch (e) {}
    _memFirst.classList.add('matched');
    _memSecond.classList.add('matched');
    const matchedWord = _memFirst.dataset.word;
    _memFirst = _memSecond = null;
    _memFlipped = false;
    _memLock    = false;
    _memMatchedCount++;

    setTimeout(() => {
      showVictory(
        matchedWord,
        `Pair matched! — زوج متطابق! (${_memMatchedCount}/${_memTotalPairs})`
      );
    }, 400);

    if (_memMatchedCount === _memTotalPairs) {
      _memStopPlayTimer();
      _memHideSandTimer(_memTimerLevelKey);
      try { addStars(10); } catch (e) {}
    }
  } else {
    try { playErrorPro ? playErrorPro() : playTone(250, 'sawtooth', 0.2, 0.1); } catch (e) {}
    setTimeout(() => {
      if (_memFirst)  _memFirst.classList.remove('flip');
      if (_memSecond) _memSecond.classList.remove('flip');
      _memFirst = _memSecond = null;
      _memFlipped = false;
      _memLock    = false;
    }, 900);
  }
}

function memoryPeek(levelKey) {
  if (_memLock) return;
  // Find the active grid
  const gridId = levelKey
    ? `${levelKey}-memory-grid`
    : (window._activeMemoryGridId || 'memory-grid');
  const grid = document.getElementById(gridId) || document.getElementById('memory-grid');
  if (!grid) return;
  const peekBtnId = levelKey ? `${levelKey}-memory-peek-btn` : 'memory-peek-btn';
  const peekBtn = document.getElementById(peekBtnId) || document.getElementById('memory-peek-btn');
  const all = grid.querySelectorAll('.mem-card');
  const peekSec = _memGetPeekSec(levelKey);
  all.forEach(c => c.classList.add('flip'));
  _memLock = true;
  if (peekBtn) {
    peekBtn.disabled = true;
    peekBtn.innerHTML = `<i class="fas fa-clock"></i> Memorize... (${peekSec}s)`;
  }
  setTimeout(() => {
    all.forEach(c => { if (!c.classList.contains('matched')) c.classList.remove('flip'); });
    _memLock = false;
    if (peekBtn) {
      peekBtn.disabled = false;
      peekBtn.innerHTML = '<i class="fas fa-check"></i> Done!';
    }
  }, peekSec * 1000);
}

function _memGetPeekSec(levelKey) {
  const id = levelKey ? `${levelKey}-peek-time` : 'memory-peek-time';
  const el = document.getElementById(id);
  return el ? Math.max(1, parseInt(el.value) || 4) : 4;
}

function _memGetPlaySec(levelKey) {
  const id = levelKey ? `${levelKey}-play-time` : 'memory-play-time';
  const el = document.getElementById(id);
  return el ? Math.max(10, parseInt(el.value) || 120) : 120;
}

function _memStartPlayTimer(levelKey, duration) {
  _memStopPlayTimer();
  _memTimerLevelKey = levelKey;
  _memPlayDuration  = duration;
  _memPlaySecondsLeft = duration;

  const fillId      = levelKey ? `${levelKey}-sand-fill`  : 'memory-sand-fill';
  const labelId     = levelKey ? `${levelKey}-sand-label` : 'memory-sand-label';
  const containerId = levelKey ? `${levelKey}-sand-timer` : 'memory-sand-timer';
  const fill      = document.getElementById(fillId);
  const label     = document.getElementById(labelId);
  const container = document.getElementById(containerId);

  if (container) container.style.visibility = 'visible';
  if (fill)  { fill.classList.remove('sand-danger'); fill.style.transition = 'none'; fill.style.height = '100%'; }
  if (label) label.textContent = duration;

  setTimeout(() => { if (fill) fill.style.transition = 'height 1s linear'; }, 50);

  _memPlayTimerId = setInterval(() => {
    _memPlaySecondsLeft--;
    const pct = (_memPlaySecondsLeft / _memPlayDuration) * 100;
    if (fill)  fill.style.height = Math.max(0, pct) + '%';
    if (label) label.textContent = _memPlaySecondsLeft;
    if (pct <= 20 && fill) fill.classList.add('sand-danger');
    if (_memPlaySecondsLeft <= 0) _memTimeUp(levelKey);
  }, 1000);
}

function _memStopPlayTimer() {
  if (_memPlayTimerId) { clearInterval(_memPlayTimerId); _memPlayTimerId = null; }
}

function _memHideSandTimer(levelKey) {
  const id = levelKey ? `${levelKey}-sand-timer` : 'memory-sand-timer';
  const el = document.getElementById(id);
  if (el) el.style.visibility = 'hidden';
}

function _memTimeUp(levelKey) {
  _memStopPlayTimer();
  _memLock = true;
  const gridId = levelKey ? `${levelKey}-memory-grid` : 'memory-grid';
  const grid = document.getElementById(gridId);
  if (grid) { grid.style.opacity = '0.4'; grid.style.pointerEvents = 'none'; }
  setTimeout(() => {
    if (typeof showVictory === 'function') showVictory('⏰', 'انتهى الوقت! — Time\'s Up!');
    if (grid) { grid.style.opacity = ''; grid.style.pointerEvents = ''; }
    _memLock = false;
  }, 300);
}


/* ============================================================
   3. 🎡 SPINNING WHEEL
============================================================ */
let _wheelWords    = [];
let _wheelAngle    = 0;
let _wheelSpinning = false;

function renderWheel(words, levelKey) {
  const svgId = levelKey ? `${levelKey}-wheel-svg` : 'wheel-svg';
  let svg = document.getElementById(svgId);
  if (!svg && levelKey) svg = document.getElementById('wheel-svg'); // fallback
  const resultId = levelKey ? `${levelKey}-wheel-result` : 'wheel-result';
  const resultEl = document.getElementById(resultId) || document.getElementById('wheel-result');
  if (!svg) return;

  if (!words) {
    const advKey = levelKey || window.activeAdvancedLevel;
    let source = null;
    if (advKey && ADVANCED_LEVELS_DB[advKey]) {
      source = ADVANCED_LEVELS_DB[advKey].words;
    } else {
      const data = (typeof lettersDB !== 'undefined' && activeLetterKey)
        ? lettersDB[activeLetterKey] : null;
      if (!data) return;
      source = (data.splitWords && data.splitWords.length)
        ? data.splitWords : (data.xoWords || []);
    }
    const unique = [...new Set(source)].slice(0, 9);
    while (unique.length < 6 && source.length) {
      unique.push(source[unique.length % source.length]);
    }
    words = unique;
  }

  _wheelWords = words;
  _wheelAngle = 0;
  // Remember which wheel is active for spinWheel()
  window._activeWheelSvgId    = svgId;
  window._activeWheelResultId = resultId;
  window._activeWheelBtnId    = levelKey ? `${levelKey}-wheel-spin-btn` : 'wheel-spin-btn';

  const n  = words.length;
  const cx = 200, cy = 200, r = 195;
  const colors = ['#02724e', '#ee5337', '#d4af37', '#185FA5', '#9b59b6', '#27ae60', '#e67e22', '#3498db', '#c0392b'];

  let paths = '', labels = '';
  const sliceAngle = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const startAngle = i * sliceAngle - Math.PI / 2;
    const endAngle   = (i + 1) * sliceAngle - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = sliceAngle > Math.PI ? 1 : 0;
    const color    = colors[i % colors.length];
    paths += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${color}" stroke="#fff" stroke-width="3"/>`;
    const midAngle  = startAngle + sliceAngle / 2;
    const lx        = cx + (r * 0.62) * Math.cos(midAngle);
    const ly        = cy + (r * 0.62) * Math.sin(midAngle);
    const rotateDeg = (midAngle * 180 / Math.PI) + 90;
    labels += `<text x="${lx}" y="${ly}" fill="#fff" font-family="Noto Naskh Arabic, serif" font-size="28" font-weight="700" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rotateDeg}, ${lx}, ${ly})" style="text-shadow: 0 2px 4px rgba(0,0,0,0.4);">${words[i]}</text>`;
  }

  svg.innerHTML = paths + labels;
  svg.style.transform = 'rotate(0deg)';

  if (resultEl) {
    resultEl.className = 'wheel-result empty';
    resultEl.textContent = 'Spin to reveal a word';
  }
  const btn = document.getElementById(window._activeWheelBtnId) || document.getElementById('wheel-spin-btn');
  if (btn) btn.disabled = false;
}

function spinWheel() {
  if (_wheelSpinning || !_wheelWords.length) return;
  _wheelSpinning = true;

  const svgId      = window._activeWheelSvgId    || 'wheel-svg';
  const resultId   = window._activeWheelResultId || 'wheel-result';
  const btnId      = window._activeWheelBtnId    || 'wheel-spin-btn';
  const svg      = document.getElementById(svgId)    || document.getElementById('wheel-svg');
  const resultEl = document.getElementById(resultId) || document.getElementById('wheel-result');
  const btn      = document.getElementById(btnId)    || document.getElementById('wheel-spin-btn');
  if (btn) btn.disabled = true;
  if (resultEl) {
    resultEl.className   = 'wheel-result empty';
    resultEl.textContent = 'Spinning...';
  }

  // ── Exciting wheel sound: fast ratchet ticks that slow down (like a real wheel) ──
  // Start fast (50ms intervals), gradually slow down to 250ms over 4.3 seconds
  const totalDuration = 4300; // Total wheel spin sound duration
  const scheduleTicks = () => {
    let t = 0;
    let tickInterval = 45;   // Start super fast
    const maxInterval = 280; // End slow
    while (t < totalDuration) {
      const progressT = t / totalDuration;
      // Non-linear easing: stays fast for longer, then rapidly slows
      const eased = Math.pow(progressT, 2.5);
      tickInterval = 45 + eased * (maxInterval - 45);
      const thisT = t;
      // Ratchet "click" — short punchy sound
      setTimeout(() => {
        try {
          // Each tick: two-tone click (like wheel hitting a peg)
          const freqBase = 1400 - (thisT / totalDuration) * 800;
          playToneEnhanced(freqBase, 'square', 0.04, 0.14);
          setTimeout(() => playToneEnhanced(freqBase * 0.6, 'triangle', 0.03, 0.10), 8);
        } catch (e) {}
      }, t);
      t += tickInterval;
    }
    // Final "whoosh" + bell when it lands
    setTimeout(() => {
      try {
        playToneEnhanced(440, 'sine', 0.15, 0.12);
        playToneEnhanced(660, 'sine', 0.15, 0.10);
        setTimeout(() => {
          playToneEnhanced(880, 'sine', 0.25, 0.14);
          playToneEnhanced(1320, 'sine', 0.25, 0.12);
        }, 100);
      } catch (e) {}
    }, totalDuration + 50);
  };
  scheduleTicks();

  const n           = _wheelWords.length;
  const winnerIdx   = Math.floor(Math.random() * n);
  const sliceAngle  = 360 / n;
  const middleOfWin = winnerIdx * sliceAngle + sliceAngle / 2;
  const targetRot   = -middleOfWin;
  const fullSpins   = 360 * (5 + Math.floor(Math.random() * 3));
  const finalRot    = _wheelAngle + fullSpins + (targetRot - (_wheelAngle % 360));

  _wheelAngle = finalRot;
  svg.style.transform = `rotate(${finalRot}deg)`;

  setTimeout(() => {
    _wheelSpinning = false;
    const winningWord = _wheelWords[winnerIdx];
    if (resultEl) {
      resultEl.className   = 'wheel-result reveal';
      resultEl.textContent = winningWord;
    }
    if (btn) btn.disabled = false;
    // NO fireworks/victory overlay on wheel stop — just show result
    // Soft positive chime only
    try {
      playToneEnhanced(880, 'sine', 0.2, 0.12);
      setTimeout(() => playToneEnhanced(1320, 'sine', 0.25, 0.10), 120);
    } catch (e) {}
  }, 4600);
}


/* ============================================================
   4. 🎯 PUZZLE-AS-XO with 2D grid win detection (rows/cols/diag)
============================================================ */

/**
 * _computeGrid — يحسب الصفوف/الأعمدة من الـ DOM positions
 */
function _computeGrid(pieces) {
  if (!pieces.length) return { rows: 1, cols: 1, rowOf: [], colOf: [] };
  const rects = Array.from(pieces).map(p => p.getBoundingClientRect());
  const rowTops = [];
  const rowOf = [], colOf = [];
  rects.forEach((r, i) => {
    let rowIdx = rowTops.findIndex(t => Math.abs(t - r.top) < 20);
    if (rowIdx === -1) {
      rowTops.push(r.top);
      rowIdx = rowTops.length - 1;
    }
    rowOf[i] = rowIdx;
  });
  const sortedTops = [...rowTops].sort((a, b) => a - b);
  const rowMap = {};
  rowTops.forEach((t, i) => { rowMap[i] = sortedTops.indexOf(t); });
  for (let i = 0; i < rowOf.length; i++) rowOf[i] = rowMap[rowOf[i]];
  const byRow = {};
  rects.forEach((r, i) => {
    if (!byRow[rowOf[i]]) byRow[rowOf[i]] = [];
    byRow[rowOf[i]].push({ i, left: r.left });
  });
  Object.values(byRow).forEach(arr => {
    arr.sort((a, b) => a.left - b.left);
    arr.forEach((e, c) => { colOf[e.i] = c; });
  });
  const rows = Math.max(...rowOf) + 1;
  const cols = Math.max(...colOf) + 1;
  return { rows, cols, rowOf, colOf };
}

function _checkGridXoWin(claimed, player, gridInfo) {
  const { rows, cols, rowOf, colOf } = gridInfo;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(-1));
  for (let i = 0; i < claimed.length; i++) {
    if (rowOf[i] !== undefined && colOf[i] !== undefined) {
      grid[rowOf[i]][colOf[i]] = i;
    }
  }
  // Rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - 3; c++) {
      const a = grid[r][c], b = grid[r][c+1], d = grid[r][c+2];
      if (a >= 0 && b >= 0 && d >= 0 &&
          claimed[a] === player && claimed[b] === player && claimed[d] === player) {
        return [a, b, d];
      }
    }
  }
  // Columns
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r <= rows - 3; r++) {
      const a = grid[r][c], b = grid[r+1][c], d = grid[r+2][c];
      if (a >= 0 && b >= 0 && d >= 0 &&
          claimed[a] === player && claimed[b] === player && claimed[d] === player) {
        return [a, b, d];
      }
    }
  }
  // Diagonal ↘
  for (let r = 0; r <= rows - 3; r++) {
    for (let c = 0; c <= cols - 3; c++) {
      const a = grid[r][c], b = grid[r+1][c+1], d = grid[r+2][c+2];
      if (a >= 0 && b >= 0 && d >= 0 &&
          claimed[a] === player && claimed[b] === player && claimed[d] === player) {
        return [a, b, d];
      }
    }
  }
  // Diagonal ↙
  for (let r = 0; r <= rows - 3; r++) {
    for (let c = 2; c < cols; c++) {
      const a = grid[r][c], b = grid[r+1][c-1], d = grid[r+2][c-2];
      if (a >= 0 && b >= 0 && d >= 0 &&
          claimed[a] === player && claimed[b] === player && claimed[d] === player) {
        return [a, b, d];
      }
    }
  }
  return null;
}

let _twoLetterXO   = { turn: 'x', claimed: [], active: false, grid: null };
let _threeLetterXO = { turn: 'x', claimed: [], active: false, grid: null };
let _splitWordsXO  = { turn: 'x', claimed: [], active: false, grid: null };

function initTwoLetterXO() {
  const container = document.getElementById('ui-two-letter-container');
  if (!container) return;
  const pieces = container.querySelectorAll('.puzzle-wrap');
  if (!pieces.length) return;
  const gridInfo = _computeGrid(pieces);
  _twoLetterXO = { turn: 'x', claimed: Array(pieces.length).fill(null), active: true, grid: gridInfo };
  pieces.forEach((p, i) => {
    p.classList.remove('xo-x', 'xo-o', 'xo-win');
    p.classList.add('xo-clickable');
    p.dataset.xoIdx = i;
    const pz = p.querySelector('.pz-checks');
    if (pz) pz.remove();
    p.onclick = () => _puzzleXoClick('two', i);
  });
  _updatePuzzleXoTurnUI('two-letter-turn', 'x');
}

function initThreeLetterXO() {
  const container = document.getElementById('ui-cards-container');
  if (!container) return;
  const pieces = container.querySelectorAll('.puzzle-wrap');
  if (!pieces.length) return;
  const gridInfo = _computeGrid(pieces);
  _threeLetterXO = { turn: 'x', claimed: Array(pieces.length).fill(null), active: true, grid: gridInfo };
  pieces.forEach((p, i) => {
    p.classList.remove('xo-x', 'xo-o', 'xo-win');
    p.classList.add('xo-clickable');
    p.dataset.xoIdx = i;
    const pz = p.querySelector('.pz-checks');
    if (pz) pz.remove();
    p.onclick = () => _puzzleXoClick('three', i);
  });
  _updatePuzzleXoTurnUI('three-letter-turn', 'x');
}

function initSplitWordsXO() {
  const container = document.getElementById('ui-split-words');
  if (!container) return;
  const pieces = container.querySelectorAll('.split-box');
  if (!pieces.length) return;
  const gridInfo = _computeGrid(pieces);
  _splitWordsXO = { turn: 'x', claimed: Array(pieces.length).fill(null), active: true, grid: gridInfo };
  pieces.forEach((p, i) => {
    p.classList.remove('xo-x', 'xo-o', 'xo-win');
    p.classList.add('xo-clickable');
    p.dataset.xoIdx = i;
    const pz = p.querySelector('.pz-checks');
    if (pz) pz.remove();
    p.onclick = () => _puzzleXoClick('split', i);
  });
  _updatePuzzleXoTurnUI('split-words-turn', 'x');
}

function _updatePuzzleXoTurnUI(elId, turn) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.className = turn === 'x' ? 'turn-x' : 'turn-o';
  el.textContent = turn === 'x' ? '❌ X' : '⭕ O';
}

function _puzzleXoClick(which, idx) {
  let state, containerId, pieceSelector, turnUIId, cellSelector;
  if (which === 'two') {
    state = _twoLetterXO;
    containerId = 'ui-two-letter-container';
    pieceSelector = '.puzzle-wrap';
    turnUIId = 'two-letter-turn';
    cellSelector = '.piece';
  } else if (which === 'three') {
    state = _threeLetterXO;
    containerId = 'ui-cards-container';
    pieceSelector = '.puzzle-wrap';
    turnUIId = 'three-letter-turn';
    cellSelector = '.piece';
  } else if (which === 'split') {
    state = _splitWordsXO;
    containerId = 'ui-split-words';
    pieceSelector = '.split-box';
    turnUIId = 'split-words-turn';
    cellSelector = '.split-cell';
  } else {
    return;
  }

  if (!state.active) return;
  if (state.claimed[idx]) return;

  const pieces = document.querySelectorAll(`#${containerId} ${pieceSelector}`);
  const piece = pieces[idx];
  if (!piece) return;

  state.claimed[idx] = state.turn;
  piece.classList.add(state.turn === 'x' ? 'xo-x' : 'xo-o');
  try { playClickPro ? playClickPro() : playTone(500, 'sine', 0.1, 0.1); } catch (e) {}

  const winIdxs = _checkGridXoWin(state.claimed, state.turn, state.grid);
  if (winIdxs) {
    state.active = false;
    winIdxs.forEach(i => pieces[i].classList.add('xo-win'));
    const winningWords = winIdxs.map(i => {
      const p = pieces[i];
      return Array.from(p.querySelectorAll(cellSelector)).map(x => x.textContent).join('');
    });
    setTimeout(() => {
      showVictory(
        winningWords.join(' · '),
        `${state.turn.toUpperCase()} WINS! — فاز ${state.turn.toUpperCase()}!`
      );
      try { addStars(5); } catch (e) {}
    }, 400);
    return;
  }

  if (state.claimed.every(c => c !== null)) {
    state.active = false;
    setTimeout(() => {
      try { showToast('Draw! — تعادل!', 2000); } catch (e) {}
    }, 300);
    return;
  }

  // NO speakAr call here — as requested
  state.turn = state.turn === 'x' ? 'o' : 'x';
  _updatePuzzleXoTurnUI(turnUIId, state.turn);
}

const LEVEL_PUZZLE_XO_CONFIG = {
  'sukoon-syllables': { containerId: 'ui-sukoon-syllables',       turnId: 'sukoon-syllable-turn', pieceSelector: '.puzzle-wrap', cellSelector: '.piece' },
  'sukoon-cards':     { containerId: 'ui-sukoon-cards-container', turnId: 'sukoon-card-turn',     pieceSelector: '.puzzle-wrap', cellSelector: '.piece' },
  'sukoon-words':     { containerId: 'ui-sukoon-words',           turnId: 'sukoon-word-turn',     pieceSelector: '.split-box',   cellSelector: '.split-cell' },
  'madd-syllables':   { containerId: 'ui-madd-syllables',   turnId: 'madd-syllable-turn',   pieceSelector: '.puzzle-wrap', cellSelector: '.piece' },
  'madd-words':       { containerId: 'ui-madd-words',       turnId: 'madd-word-turn',       pieceSelector: '.split-box',   cellSelector: '.split-cell' },
  'shadda-syllables': { containerId: 'ui-shadda-syllables', turnId: 'shadda-syllable-turn', pieceSelector: '.puzzle-wrap', cellSelector: '.piece' },
  'shadda-words':     { containerId: 'ui-shadda-words',     turnId: 'shadda-word-turn',     pieceSelector: '.split-box',   cellSelector: '.split-cell' },
  'tanween-syllables':{ containerId: 'ui-tanween-syllables',turnId: 'tanween-syllable-turn',pieceSelector: '.puzzle-wrap', cellSelector: '.piece' },
  'tanween-words':    { containerId: 'ui-tanween-words',    turnId: 'tanween-word-turn',    pieceSelector: '.split-box',   cellSelector: '.split-cell' },
};
const _levelPuzzleXOState = {};

function initLevelPuzzleXO(key) {
  const cfg = LEVEL_PUZZLE_XO_CONFIG[key];
  if (!cfg) return;
  const container = document.getElementById(cfg.containerId);
  if (!container) return;
  const pieces = container.querySelectorAll(cfg.pieceSelector);
  if (!pieces.length) return;
  _levelPuzzleXOState[key] = {
    turn: 'x',
    claimed: Array(pieces.length).fill(null),
    active: true,
    grid: _computeGrid(pieces),
  };
  pieces.forEach((piece, i) => {
    piece.classList.remove('xo-x', 'xo-o', 'xo-win');
    piece.classList.add('xo-clickable');
    piece.dataset.xoIdx = i;
    piece.onclick = () => _levelPuzzleXoClick(key, i);
  });
  _updatePuzzleXoTurnUI(cfg.turnId, 'x');
}

function _levelPuzzleXoClick(key, idx) {
  const cfg = LEVEL_PUZZLE_XO_CONFIG[key];
  const state = _levelPuzzleXOState[key];
  if (!cfg || !state || !state.active || state.claimed[idx]) return;

  const pieces = document.querySelectorAll(`#${cfg.containerId} ${cfg.pieceSelector}`);
  const piece = pieces[idx];
  if (!piece) return;

  state.claimed[idx] = state.turn;
  piece.classList.add(state.turn === 'x' ? 'xo-x' : 'xo-o');
  try {
    if (typeof playClickPro === 'function') playClickPro();
    else playTone(500, 'sine', 0.1, 0.1);
  } catch (e) {}

  const winIdxs = _checkGridXoWin(state.claimed, state.turn, state.grid);
  if (winIdxs) {
    state.active = false;
    winIdxs.forEach(i => pieces[i]?.classList.add('xo-win'));
    const winningWords = winIdxs.map(i => Array.from(pieces[i].querySelectorAll(cfg.cellSelector))
      .map(x => x.textContent).join('').replace(/ـ/g, ''));
    setTimeout(() => {
      showVictory(winningWords.join(' · '), `${state.turn.toUpperCase()} WINS! — فاز ${state.turn.toUpperCase()}!`);
      try { addStars(5); } catch (e) {}
    }, 400);
    return;
  }

  if (state.claimed.every(c => c !== null)) {
    state.active = false;
    setTimeout(() => {
      try { showToast('Draw! — تعادل!', 2000); } catch (e) {}
    }, 300);
    return;
  }

  state.turn = state.turn === 'x' ? 'o' : 'x';
  _updatePuzzleXoTurnUI(cfg.turnId, state.turn);
}


/* ============================================================
   5. HOOK openLetter + disable pz-checks
============================================================ */
(function hookLetterOpen() {
  function _tryPatch() {
    if (typeof openLetter !== 'function' || openLetter._enhanced) return false;
    const _orig = openLetter;
    window.openLetter = function(key) {
      const r = _orig.apply(this, arguments);
      setTimeout(() => {
        document.querySelectorAll('.pz-checks').forEach(el => el.remove());
        try { _enhanceMotorsSection(key); } catch(e) { console.warn('motors:', e); }
        try { initMemoryGame(); }           catch (e) { console.warn('memory:', e); }
        try { renderWheel(); }               catch (e) { console.warn('wheel:', e); }
        try { initTwoLetterXO(); }           catch (e) { console.warn('twoXO:', e); }
        try { initThreeLetterXO(); }         catch (e) { console.warn('threeXO:', e); }
        try { initSplitWordsXO(); }          catch (e) { console.warn('splitXO:', e); }
        try { _patchAlefFinalPage(key); }    catch (e) { console.warn('alefFinal:', e); }
      }, 800);
      return r;
    };
    window.openLetter._enhanced = true;
    return true;
  }

  document.addEventListener('DOMContentLoaded', () => {
    _tryPatch();
    setTimeout(_tryPatch, 500);
    setTimeout(_tryPatch, 1500);

    // FALLBACK: observe letter-screen for changes and re-run enhancements
    // This catches cases where openLetter gets re-wrapped by other scripts
    const ls = document.getElementById('letter-screen');
    if (!ls) return;
    let lastKey = null;
    new MutationObserver(() => {
      const visible = ls.style.display !== 'none' && ls.style.opacity !== '0';
      if (!visible) { lastKey = null; return; }
      const key = (typeof activeLetterKey !== 'undefined') ? activeLetterKey : null;
      if (!key || key === lastKey) return;
      lastKey = key;
      setTimeout(() => {
        try { _enhanceMotorsSection(key); } catch(e) {}
        try { _patchAlefFinalPage(key); }   catch(e) {}
      }, 900);
    }).observe(ls, { attributes: true, attributeFilter: ['style'] });
  });
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(_tryPatch, 100);
  }
})();

// Kill addPuzzleChecks
(function disablePzChecks() {
  const killIt = () => {
    if (typeof window.addPuzzleChecks === 'function' && !window.addPuzzleChecks._killed) {
      window.addPuzzleChecks = function() { /* no-op */ };
      window.addPuzzleChecks._killed = true;
    }
    document.querySelectorAll('.pz-checks').forEach(el => el.remove());
  };
  document.addEventListener('DOMContentLoaded', () => {
    killIt();
    setTimeout(killIt, 1000);
    setTimeout(killIt, 3000);
  });
})();


/* ============================================================
   6. Main XO win hook -> Victory overlay
============================================================ */
(function hookMainXOWin() {
  const boards = ['xoBoard', 'sukoon-xoBoard', 'madd-xoBoard', 'shadda-xoBoard', 'tanween-xoBoard'];
  const lines  = ['winLine', 'sukoon-winLine', 'madd-winLine', 'shadda-winLine', 'tanween-winLine'];
  document.addEventListener('DOMContentLoaded', () => {
    lines.forEach((lineId, i) => {
      const line = document.getElementById(lineId);
      if (!line) return;
      new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.attributeName === 'style' && line.style.display === 'block') {
            setTimeout(() => {
              const board = document.getElementById(boards[i]);
              if (!board) return;
              const cells = board.querySelectorAll('.xo-cell');
              const pats = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
              const words = [];
              for (const [a,b,c] of pats) {
                if (!cells[a] || !cells[b] || !cells[c]) continue;
                const ca = cells[a].classList, cb = cells[b].classList, cc = cells[c].classList;
                if ((ca.contains('x') && cb.contains('x') && cc.contains('x')) ||
                    (ca.contains('o') && cb.contains('o') && cc.contains('o'))) {
                  [a,b,c].forEach(idx => {
                    const spans = cells[idx].querySelectorAll('span');
                    if (spans.length >= 2) words.push(spans[1].textContent);
                  });
                  break;
                }
              }
              showVictory(
                words.join(' · ') || '🏆',
                'Tic-Tac-Toe Win! — فوز في XO!'
              );
            }, 400);
          }
        }
      }).observe(line, { attributes: true, attributeFilter: ['style'] });
    });
  });
})();


/* ============================================================
   7. MOTORS PROGRESSIVE (نص حرفي من الأساسي.html)
============================================================ */
function _enhanceMotorsSection(key) {
  const el = document.getElementById('ui-motor-section');
  if (!el) return;
  const idx = ARABIC_LETTERS.indexOf(key);
  if (idx < 0) return;
  const zIdx = ARABIC_LETTERS.indexOf('ز');
  const gIdx = ARABIC_LETTERS.indexOf('غ');

  let html = `
    <div class="motor-item" style="margin-bottom:15px;">
      <div class="motor-label" style="color:var(--red);font-size:1.2rem;">⬆️ The Fatha Motor</div>
      Fat-hah is pronounced by separating the two jaws and opening the mouth.<br>
      <span style="font-weight:bold;color:var(--red);">Fatha is UP ⬆️ — Open your mouth!</span>
    </div>`;
  if (idx >= zIdx) {
    html += `
      <div class="motor-item" style="margin-bottom:15px;border-top:1px solid var(--border);padding-top:15px;">
        <div class="motor-label" style="color:#2980b9;font-size:1.2rem;">⬇️ The Kasrah Motor</div>
        Kasrah is pronounced by dropping the lower jaw.<br>
        <span style="font-weight:bold;color:#2980b9;">Kasrah is DOWN ⬇️ — Drop your jaw!</span>
      </div>`;
  }
  if (idx >= gIdx) {
    html += `
      <div class="motor-item" style="border-top:1px solid var(--border);padding-top:15px;">
        <div class="motor-label" style="color:var(--green);font-size:1.2rem;">⭕ The Dhammah Motor</div>
        Dhammah is pronounced by rounding the two lips completely.<br>
        <span style="font-weight:bold;color:var(--green);">Dhammah is ROUND ⭕ — Round your lips!</span>
      </div>`;
  }
  el.innerHTML = html;
}


/* ============================================================
   8. PROGRESSIVE EXAMPLES — أمثلة تدريجية لكل الحروف
   ============================================================
   لكل حرف: كلمة + 3 أمثلة جُمل تظهر في آخر الصفحة.
   الحرف الأول (أ) يبدأ بـ "أنا"، كل حرف لاحق يبني عليه.
============================================================ */
/*
  ============================================================
  LETTER_FINAL_EXAMPLES — تدرّج الكلمة والضمير لكل حرف
  ============================================================
  كل حرف يُقدِّم:
    • pronoun : الضمير الجديد الذي يتعلّمه الطفل مع هذا الحرف
    • word    : المفردة الرئيسية بحرف الحرف
    • examples: جُمَل تستخدم كل الضمائر المكتسبة حتى الآن
  ترتيب تدريجي:
    أ→أنا  ب→هو  ت→هي  ث→نحن  ج→أنتَ  ح→أنتِ
    خ→هم   د→أنتم  ذ→هما  ر→أنتما  ز..ي: مراجعة وتثبيت
  ============================================================
*/
const LETTER_FINAL_EXAMPLES = {

  /* ── أ : نتعلم "أَنَا" ─────────────────────────────── */
  'أ': {
    pronoun:   'أَنَا',
    pronounEn: 'I / Me',
    word:    'أَنَا',
    wordEn:  'I / Me',
    hint: '🙋 "أَنَا" = I — Use it when YOU are talking about yourself',
    examples: [
      { ar: 'أَنَا اسْمِي أَحْمَد',    en: 'My name is Ahmad' },
      { ar: 'أَنَا مِنْ مِصْر',         en: 'I am from Egypt' },
      { ar: 'أَنَا طَالِب',             en: 'I am a student' },
    ]
  },

  /* ── ب : نتعلم "هُوَ" + مراجعة أَنَا ──────────────── */
  'ب': {
    pronoun:   'هُوَ',
    pronounEn: 'He',
    word:    'بَيْت',
    wordEn:  'House',
    hint: '👦 "هُوَ" = He — Use it for a boy or a man',
    examples: [
      { ar: 'أَنَا فِي الْبَيْت',       en: 'I am at home'         },
      { ar: 'هُوَ فِي الْبَيْت',        en: 'He is at home'        },
      { ar: 'بَيْتِي جَمِيل',           en: 'My house is beautiful' },
    ]
  },

  /* ── ت : نتعلم "هِيَ" + مراجعة أَنَا & هُوَ ─────────── */
  'ت': {
    pronoun:   'هِيَ',
    pronounEn: 'She',
    word:    'تُفَّاحَة',
    wordEn:  'Apple',
    hint: '👧 "هِيَ" = She — Use it for a girl or a woman',
    examples: [
      { ar: 'أَنَا آكُلُ تُفَّاحَة',   en: 'I eat an apple'       },
      { ar: 'هُوَ يُحِبُّ التُّفَّاح', en: 'He loves apples'      },
      { ar: 'هِيَ تَأْكُلُ تُفَّاحَة', en: 'She eats an apple'    },
    ]
  },

  /* ── ث : نتعلم "نَحْنُ" + مراجعة ─────────────────── */
  'ث': {
    pronoun:   'نَحْنُ',
    pronounEn: 'We',
    word:    'ثَلَاجَة',
    wordEn:  'Fridge',
    hint: '👨‍👩‍👧 "نَحْنُ" = We — Use it when you speak for a group that includes yourself',
    examples: [
      { ar: 'أَنَا أُحِبُّ الثَّلَاجَة',   en: 'I like the fridge'       },
      { ar: 'هِيَ تَفْتَحُ الثَّلَاجَة',   en: 'She opens the fridge'    },
      { ar: 'نَحْنُ نَأْكُلُ مَعًا',        en: 'We eat together'         },
    ]
  },

  /* ── ج : نتعلم "أَنْتَ" + مراجعة ─────────────────── */
  'ج': {
    pronoun:   'أَنْتَ',
    pronounEn: 'You (m.)',
    word:    'جَمَل',
    wordEn:  'Camel',
    hint: '🤝 "أَنْتَ" = You (for a boy/man) — When talking TO someone male',
    examples: [
      { ar: 'أَنَا أَرَى الْجَمَل',      en: 'I see the camel'           },
      { ar: 'هُوَ يَرْكَبُ الْجَمَل',    en: 'He rides the camel'        },
      { ar: 'أَنْتَ تُحِبُّ الْجَمَل؟',  en: 'Do you love the camel?'   },
    ]
  },

  /* ── ح : نتعلم "أَنْتِ" + مراجعة ─────────────────── */
  'ح': {
    pronoun:   'أَنْتِ',
    pronounEn: 'You (f.)',
    word:    'حَلِيب',
    wordEn:  'Milk',
    hint: '🤝 "أَنْتِ" = You (for a girl/woman) — The feminine form of "you"',
    examples: [
      { ar: 'أَنَا أَشْرَبُ الْحَلِيب',   en: 'I drink milk'              },
      { ar: 'نَحْنُ نُحِبُّ الْحَلِيب',   en: 'We love milk'              },
      { ar: 'أَنْتِ تَشْرَبِينَ الْحَلِيب؟', en: 'Do you drink milk?'   },
    ]
  },

  /* ── خ : نتعلم "هُمْ" + مراجعة ───────────────────── */
  'خ': {
    pronoun:   'هُمْ',
    pronounEn: 'They',
    word:    'خُبْز',
    wordEn:  'Bread',
    hint: '👨‍👩‍👦‍👦 "هُمْ" = They — A group of people (not including you)',
    examples: [
      { ar: 'أَنَا آكُلُ الْخُبْز',      en: 'I eat the bread'           },
      { ar: 'هِيَ تُحِبُّ الْخُبْز',     en: 'She loves the bread'       },
      { ar: 'هُمْ يَأْكُلُونَ الْخُبْز', en: 'They eat the bread'        },
    ]
  },

  /* ── د : نتعلم "أَنْتُمْ" + مراجعة ─────────────────── */
  'د': {
    pronoun:   'أَنْتُمْ',
    pronounEn: 'You all (pl.)',
    word:    'دَجَاج',
    wordEn:  'Chicken',
    hint: '🙌 "أَنْتُمْ" = You all — When talking TO a group of people',
    examples: [
      { ar: 'هُمْ يَأْكُلُونَ الدَّجَاج',      en: 'They eat the chicken'        },
      { ar: 'نَحْنُ نُحِبُّ الدَّجَاج',         en: 'We love the chicken'         },
      { ar: 'أَنْتُمْ تُحِبُّونَ الدَّجَاج؟',   en: 'Do you all love chicken?'   },
    ]
  },

  /* ── ذ : نتعلم "هُمَا" + مراجعة ─────────────────── */
  'ذ': {
    pronoun:   'هُمَا',
    pronounEn: 'They two (dual)',
    word:    'ذَهَب',
    wordEn:  'Gold',
    hint: '👫 "هُمَا" = The two of them — Arabic has a special form for exactly TWO!',
    examples: [
      { ar: 'هُوَ يَرَى الذَّهَب',        en: 'He sees the gold'            },
      { ar: 'هِيَ تُحِبُّ الذَّهَب',      en: 'She loves the gold'          },
      { ar: 'هُمَا يَنْظُرَانِ الذَّهَب', en: 'The two of them look at gold' },
    ]
  },

  /* ── ر : نتعلم "أَنْتُمَا" + مراجعة ────────────────── */
  'ر': {
    pronoun:   'أَنْتُمَا',
    pronounEn: 'You two (dual)',
    word:    'رُمَّان',
    wordEn:  'Pomegranate',
    hint: '👬 "أَنْتُمَا" = You two — Talking TO exactly two people',
    examples: [
      { ar: 'أَنَا أُحِبُّ الرُّمَّان',         en: 'I love pomegranate'              },
      { ar: 'هُمَا يَأْكُلَانِ الرُّمَّان',     en: 'The two of them eat pomegranate' },
      { ar: 'أَنْتُمَا تُحِبَّانِ الرُّمَّان؟', en: 'Do you two love pomegranate?'    },
    ]
  },

  /* ── ز : مراجعة شاملة — زَهْرَة ─────────────────── */
  'ز': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review all pronouns',
    word:    'زَهْرَة',
    wordEn:  'Flower',
    hint: '🌸 Review all pronouns with one beautiful flower!',
    examples: [
      { ar: 'أَنَا أُحِبُّ الزَّهْرَة',    en: 'I love the flower'    },
      { ar: 'هِيَ تَشُمُّ الزَّهْرَة',     en: 'She smells the flower' },
      { ar: 'هُمْ يَقْطِفُونَ الزَّهْرَة', en: 'They pick the flower'  },
    ]
  },

  /* ── س : مراجعة — سَمَك ───────────────────────── */
  'س': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'سَمَك',
    wordEn:  'Fish',
    hint: '🐟 Let\'s review all we know while talking about fish!',
    examples: [
      { ar: 'أَنَا أَرَى السَّمَك',        en: 'I see the fish'       },
      { ar: 'هُوَ يَصْطَادُ السَّمَك',     en: 'He catches the fish'  },
      { ar: 'نَحْنُ نَأْكُلُ السَّمَك',    en: 'We eat the fish'      },
    ]
  },

  /* ── ش : مراجعة — شَمْس ───────────────────────── */
  'ش': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'شَمْس',
    wordEn:  'Sun',
    hint: '☀️ The sun shines on all pronouns — let\'s review!',
    examples: [
      { ar: 'أَنَا أَرَى الشَّمْس',        en: 'I see the sun'         },
      { ar: 'أَنْتَ تُحِبُّ الشَّمْس؟',    en: 'Do you love the sun?'  },
      { ar: 'هُمْ يَجْلِسُونَ فِي الشَّمْس', en: 'They sit in the sun' },
    ]
  },

  /* ── ص : مراجعة — صَدِيق ──────────────────────── */
  'ص': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'صَدِيق',
    wordEn:  'Friend',
    hint: '🤗 Friends help us review — practice all pronouns!',
    examples: [
      { ar: 'أَنَا أُحِبُّ صَدِيقِي',     en: 'I love my friend'       },
      { ar: 'هِيَ صَدِيقَتِي',             en: 'She is my friend'       },
      { ar: 'نَحْنُ أَصْدِقَاء',           en: 'We are friends'         },
    ]
  },

  /* ── ض : مراجعة — ضَوْء ───────────────────────── */
  'ض': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'ضَوْء',
    wordEn:  'Light',
    hint: '💡 Let the light of knowledge review all our pronouns!',
    examples: [
      { ar: 'أَنَا أُضِيءُ الضَّوْء',       en: 'I turn on the light'   },
      { ar: 'أَنْتُمْ تَرَوْنَ الضَّوْء؟',  en: 'Do you all see the light?' },
      { ar: 'هُمَا يُطْفِئَانِ الضَّوْء',   en: 'The two of them turn off the light' },
    ]
  },

  /* ── ط : مراجعة — طِفْل ───────────────────────── */
  'ط': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'طِفْل',
    wordEn:  'Child',
    hint: '🧒 Every child learns all the pronouns — you can do it!',
    examples: [
      { ar: 'أَنَا طِفْل صَغِير',           en: 'I am a young child'    },
      { ar: 'هُوَ طِفْل ذَكِيّ',            en: 'He is a smart child'   },
      { ar: 'هُمْ أَطْفَال سُعَدَاء',       en: 'They are happy children' },
    ]
  },

  /* ── ظ : مراجعة — ظِلّ ───────────────────────── */
  'ظ': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'ظِلّ',
    wordEn:  'Shadow / Shade',
    hint: '🌳 Rest in the shade and review your pronouns!',
    examples: [
      { ar: 'أَنَا أَجْلِسُ فِي الظِّلّ',   en: 'I sit in the shade'    },
      { ar: 'أَنْتِ تَجْلِسِينَ فِي الظِّلّ؟', en: 'Do you (f.) sit in the shade?' },
      { ar: 'هُمَا يَجْلِسَانِ فِي الظِّلّ', en: 'The two of them sit in the shade' },
    ]
  },

  /* ── ع : مراجعة — عَسَل ───────────────────────── */
  'ع': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'عَسَل',
    wordEn:  'Honey',
    hint: '🍯 Sweet as honey — review all pronouns one more time!',
    examples: [
      { ar: 'أَنَا أُحِبُّ الْعَسَل',       en: 'I love honey'          },
      { ar: 'أَنْتُمَا تَأْكُلَانِ الْعَسَل؟', en: 'Do you two eat honey?' },
      { ar: 'نَحْنُ نَشْتَرِي الْعَسَل',    en: 'We buy honey'          },
    ]
  },

  /* ── غ : مراجعة — غَزَال ──────────────────────── */
  'غ': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'غَزَال',
    wordEn:  'Gazelle',
    hint: '🦌 Fast like a gazelle — you\'ve learned so many pronouns!',
    examples: [
      { ar: 'أَنَا أَرَى الْغَزَال',        en: 'I see the gazelle'     },
      { ar: 'هِيَ تُحِبُّ الْغَزَال',       en: 'She loves the gazelle' },
      { ar: 'هُمْ يُصَوِّرُونَ الْغَزَال',  en: 'They photograph the gazelle' },
    ]
  },

  /* ── ف : مراجعة — فِيل ───────────────────────── */
  'ف': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'فِيل',
    wordEn:  'Elephant',
    hint: '🐘 Big like an elephant, strong like your Arabic!',
    examples: [
      { ar: 'أَنَا أَرَى الْفِيل',          en: 'I see the elephant'     },
      { ar: 'أَنْتَ تُحِبُّ الْفِيل؟',      en: 'Do you love the elephant?' },
      { ar: 'هُمَا يَرَيَانِ الْفِيل',      en: 'The two of them see the elephant' },
    ]
  },

  /* ── ق : مراجعة — قَلَم ───────────────────────── */
  'ق': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'قَلَم',
    wordEn:  'Pen',
    hint: '✏️ With a pen you write — with pronouns you speak!',
    examples: [
      { ar: 'أَنَا أَكْتُبُ بِالْقَلَم',    en: 'I write with the pen'   },
      { ar: 'هُوَ يَرْسُمُ بِالْقَلَم',     en: 'He draws with the pen'  },
      { ar: 'أَنْتُمْ تَكْتُبُونَ؟',         en: 'Are you all writing?'   },
    ]
  },

  /* ── ك : مراجعة — كِتَاب ──────────────────────── */
  'ك': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'كِتَاب',
    wordEn:  'Book',
    hint: '📚 Books teach us everything — pronouns too!',
    examples: [
      { ar: 'أَنَا أَقْرَأُ الْكِتَاب',     en: 'I read the book'        },
      { ar: 'هِيَ تَحْمِلُ الْكِتَاب',      en: 'She carries the book'   },
      { ar: 'نَحْنُ نَحْتَاجُ الْكِتَاب',   en: 'We need the book'       },
    ]
  },

  /* ── ل : مراجعة — لَبَن ───────────────────────── */
  'ل': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'لَبَن',
    wordEn:  'Yogurt',
    hint: '🥛 Healthy like yogurt — keep reviewing your pronouns!',
    examples: [
      { ar: 'أَنَا أُحِبُّ اللَّبَن',        en: 'I love yogurt'          },
      { ar: 'أَنْتُمَا تَشْرَبَانِ اللَّبَن؟', en: 'Do you two drink yogurt?' },
      { ar: 'هُمْ يَشْتَرُونَ اللَّبَن',     en: 'They buy yogurt'        },
    ]
  },

  /* ── م : مراجعة — مَاء ───────────────────────── */
  'م': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'مَاء',
    wordEn:  'Water',
    hint: '💧 Water is life — and pronouns give life to sentences!',
    examples: [
      { ar: 'أَنَا أَشْرَبُ الْمَاء',        en: 'I drink water'          },
      { ar: 'هُوَ يَحْمِلُ الْمَاء',         en: 'He carries the water'   },
      { ar: 'أَنْتِ تُحِبِّينَ الْمَاء؟',    en: 'Do you (f.) love water?' },
    ]
  },

  /* ── ن : مراجعة — نَجْم ───────────────────────── */
  'ن': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'نَجْم',
    wordEn:  'Star',
    hint: '⭐ You are a star — you\'ve learned all the Arabic pronouns!',
    examples: [
      { ar: 'أَنَا أَرَى النَّجْم',          en: 'I see the star'         },
      { ar: 'نَحْنُ نُحِبُّ النُّجُوم',      en: 'We love the stars'      },
      { ar: 'هُمَا يَنْظُرَانِ إِلَى النَّجْم', en: 'The two of them look at the star' },
    ]
  },

  /* ── هـ : مراجعة — هِلَال ─────────────────────── */
  'هـ': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'هِلَال',
    wordEn:  'Crescent Moon',
    hint: '🌙 Like the crescent that grows, your Arabic is growing!',
    examples: [
      { ar: 'أَنَا أَرَى الْهِلَال',         en: 'I see the crescent'      },
      { ar: 'هِيَ تُحِبُّ الْهِلَال',        en: 'She loves the crescent'  },
      { ar: 'أَنْتُمْ تَرَوْنَ الْهِلَال؟',  en: 'Do you all see the crescent?' },
    ]
  },

  /* ── و : مراجعة — وَرْدَة ─────────────────────── */
  'و': {
    pronoun:   '(مراجعة)',
    pronounEn: 'Review',
    word:    'وَرْدَة',
    wordEn:  'Rose',
    hint: '🌹 A rose for your hard work — all pronouns reviewed!',
    examples: [
      { ar: 'أَنَا أُحِبُّ الْوَرْدَة',      en: 'I love the rose'        },
      { ar: 'أَنْتَ تُعْطِينِي وَرْدَة',     en: 'You give me a rose'     },
      { ar: 'هُمْ يَزْرَعُونَ الْوَرْد',     en: 'They grow roses'        },
    ]
  },

  /* ── ي : خاتمة — يَد ──────────────────────────── */
  'ي': {
    pronoun:   '🎉 أتممتَ الرحلة!',
    pronounEn: 'You completed the journey!',
    word:    'يَد',
    wordEn:  'Hand',
    hint: '🙌 With your hand and your tongue — you speak Arabic now! أنتَ تتكلّم العربية!',
    examples: [
      { ar: 'أَنَا أُحِبُّ اللُّغَة الْعَرَبِيَّة', en: 'I love the Arabic language' },
      { ar: 'نَحْنُ نَتَكَلَّمُ الْعَرَبِيَّة',     en: 'We speak Arabic'            },
      { ar: 'هُمْ يَتَعَلَّمُونَ الْعَرَبِيَّة',    en: 'They learn Arabic'          },
    ]
  },
};

function _patchAlefFinalPage(key) {
  // Remove any existing panel first
  const existing = document.getElementById('letter-final-panel');
  if (existing) existing.remove();

  const entry = LETTER_FINAL_EXAMPLES[key];
  if (!entry) return;

  // Build pronoun badge (only when it's a real new pronoun, not a review)
  const isReview = entry.pronoun && entry.pronoun.includes('مراجعة');
  const isFinale  = entry.pronoun && entry.pronoun.includes('أتممتَ');
  let pronounBadgeHtml = '';
  if (!isReview && !isFinale) {
    pronounBadgeHtml = `
      <div style="
        display:flex; align-items:center; gap:12px;
        background:linear-gradient(135deg,var(--green),var(--green-dark,#015a3d));
        color:#fff; border-radius:14px; padding:14px 20px;
        margin-bottom:14px; box-shadow:0 4px 18px rgba(2,114,78,0.25);
      ">
        <div style="font-size:2.6rem; line-height:1; font-family:'Noto Naskh Arabic',serif;">
          ${entry.pronoun}
        </div>
        <div style="text-align:left; flex:1;">
          <div style="font-family:'Tajawal',sans-serif; font-size:0.78rem; opacity:0.85; letter-spacing:1px; text-transform:uppercase;">
            ✨ الضمير الجديد — New Pronoun
          </div>
          <div style="font-family:'Tajawal',sans-serif; font-size:1.05rem; font-weight:700; margin-top:2px;">
            ${entry.pronounEn}
          </div>
        </div>
      </div>`;
  } else if (isFinale) {
    pronounBadgeHtml = `
      <div style="
        background:linear-gradient(135deg,#d4af37,#b8962a);
        color:#fff; border-radius:14px; padding:14px 20px;
        margin-bottom:14px; text-align:center;
        box-shadow:0 4px 18px rgba(212,175,55,0.35);
        font-family:'Tajawal',sans-serif; font-size:1.15rem; font-weight:900;
      ">
        🎉 ${entry.pronoun} — ${entry.pronounEn}
      </div>`;
  } else {
    pronounBadgeHtml = `
      <div style="
        background:var(--surface2,#f8fdfb); border:1.5px solid var(--border);
        border-radius:12px; padding:10px 16px; margin-bottom:14px;
        font-family:'Tajawal',sans-serif; font-size:0.9rem; color:var(--text-muted);
      ">
        🔄 مراجعة الضمائر — Pronouns Review
      </div>`;
  }

  const panel = document.createElement('div');
  panel.id = 'letter-final-panel';
  panel.className = 'step-section';
  panel.setAttribute('data-section', 'final');
  panel.style.cssText = 'min-height:auto;margin-top:20px;';
  panel.innerHTML = `
    <div class="section-heading" style="color:var(--green);">
      <span class="section-badge" style="background:var(--gold,#d4af37);">⭐</span>
      ${entry.word} — ${entry.wordEn}
    </div>
    <div class="alef-ana-box">
      ${pronounBadgeHtml}
      <div class="alef-ana-word" onclick="playMatchPro && playMatchPro()">${entry.word}</div>
      <div class="alef-ana-sub">${entry.hint}</div>
      <div class="alef-ana-examples">
        ${entry.examples.map(ex => `
          <div class="alef-ana-ex">
            <div class="alef-ana-ex-ar">${ex.ar}</div>
            <div class="alef-ana-ex-en">${ex.en}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  const layout = document.querySelector('#letter-screen .letter-layout');
  if (layout) {
    // Find the "Next Letter" button step-section
    const allSections = layout.querySelectorAll('.step-section');
    let nextBtnSection = null;
    allSections.forEach(sec => {
      if (sec.querySelector('.next-level-btn')) nextBtnSection = sec;
    });
    if (nextBtnSection) {
      layout.insertBefore(panel, nextBtnSection);
    } else {
      layout.appendChild(panel);
    }
  }

  // Install the FS button on this newly-created panel
  setTimeout(() => {
    if (typeof window._installFsButtons === 'function') {
      window._installFsButtons();
    }
  }, 50);
}


/* ============================================================
   9. ⏸️ BREAK TIMER — Floating button with countdown
   ============================================================
   Click the floating pause icon → choose duration → countdown
   → motivational chime when time's up
============================================================ */
(function initBreakTimer() {
  let _breakState = {
    running: false,
    endTime: 0,
    tickInterval: null,
  };

  function _buildBreakBtn() {
    if (document.getElementById('break-fab')) return;
    const fab = document.createElement('button');
    fab.id = 'break-fab';
    // Container for rotating Lottie animations
    fab.innerHTML = '<div class="break-fab-lottie" id="break-fab-lottie"></div>';
    fab.title = 'Take a break — خذ استراحة';
    fab.onclick = _openBreakMenu;
    document.body.appendChild(fab);
    _startBreakFabRotation();
  }

  // Rotate Lottie animations on the break FAB
  function _startBreakFabRotation() {
    const lotties = window.__BREAK_LOTTIES__;
    if (!lotties || typeof lottie === 'undefined') return;
    const keys = Object.keys(lotties);
    if (!keys.length) return;

    const container = document.getElementById('break-fab-lottie');
    if (!container) return;

    let currentIdx = 0;
    let currentAnim = null;

    function playNext() {
      const container = document.getElementById('break-fab-lottie');
      if (!container) return;

      // Destroy previous
      if (currentAnim) {
        try { currentAnim.destroy(); } catch (e) {}
        currentAnim = null;
      }
      container.innerHTML = '';

      const key = keys[currentIdx];
      const animData = lotties[key];

      try {
        currentAnim = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: JSON.parse(JSON.stringify(animData)),  // deep clone
        });

        currentAnim.addEventListener('complete', () => {
          currentIdx = (currentIdx + 1) % keys.length;
          setTimeout(playNext, 200);  // brief pause between animations
        });
      } catch (e) {
        // If Lottie fails, fallback to pause icon
        container.innerHTML = '<i class="fas fa-pause" style="color:white;font-size:1.4rem;"></i>';
      }
    }

    playNext();
  }

  function _buildBreakModal() {
    if (document.getElementById('break-modal')) return;
    const m = document.createElement('div');
    m.id = 'break-modal';
    m.innerHTML = `
      <div class="break-modal-inner" onclick="event.stopPropagation()">
        <button class="break-close-btn" onclick="window._closeBreakMenu()" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <div class="break-modal-title">⏸️ Take a Break — وقت استراحة</div>
        <div class="break-modal-sub">How many minutes? — كم دقيقة؟</div>
        <div class="break-preset-grid">
          <button class="break-preset" data-min="1">1<span>min</span></button>
          <button class="break-preset" data-min="2">2<span>min</span></button>
          <button class="break-preset" data-min="5">5<span>min</span></button>
          <button class="break-preset" data-min="10">10<span>min</span></button>
          <button class="break-preset" data-min="15">15<span>min</span></button>
          <button class="break-preset" data-min="20">20<span>min</span></button>
        </div>
        <div class="break-custom">
          <label>Custom / مخصص:</label>
          <input type="number" id="break-custom-input" min="1" max="120" value="3" />
          <span>min</span>
          <button class="break-custom-go" onclick="window._startBreakCustom()">Go!</button>
        </div>
      </div>
    `;
    m.onclick = _closeBreakMenu;
    document.body.appendChild(m);

    // Wire up presets
    m.querySelectorAll('.break-preset').forEach(btn => {
      btn.onclick = () => _startBreak(parseInt(btn.dataset.min));
    });
  }

  function _buildBreakCountdown() {
    if (document.getElementById('break-countdown')) return;
    const c = document.createElement('div');
    c.id = 'break-countdown';
    c.innerHTML = `
      <div class="break-cd-inner">
        <div class="break-cd-icon" id="break-cd-lottie-container"></div>
        <div class="break-cd-label">Break Time — وقت الاستراحة</div>
        <div class="break-cd-time" id="break-cd-time">00:00</div>
        <div class="break-cd-actions">
          <button onclick="window._cancelBreak()"><i class="fas fa-stop"></i> Stop Early</button>
        </div>
      </div>
    `;
    document.body.appendChild(c);
  }

  function _openBreakMenu() {
    _buildBreakModal();
    const m = document.getElementById('break-modal');
    if (m) m.classList.add('show');
    try { playClickPro && playClickPro(); } catch(e){}
  }

  function _closeBreakMenu() {
    const m = document.getElementById('break-modal');
    if (m) m.classList.remove('show');
  }

  // Rotate Lottie animations in the break countdown screen
  let _cdLottieAnim = null;
  let _cdLottieIdx = 0;
  function _startCountdownLottieRotation() {
    const lotties = window.__BREAK_LOTTIES__;
    if (!lotties || typeof lottie === 'undefined') return;
    const keys = Object.keys(lotties);
    if (!keys.length) return;

    function playNext() {
      const container = document.getElementById('break-cd-lottie-container');
      if (!container) return;  // countdown closed

      if (_cdLottieAnim) {
        try { _cdLottieAnim.destroy(); } catch (e) {}
        _cdLottieAnim = null;
      }
      container.innerHTML = '';

      const key = keys[_cdLottieIdx];
      const animData = lotties[key];

      try {
        _cdLottieAnim = lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: JSON.parse(JSON.stringify(animData)),
        });
        _cdLottieAnim.addEventListener('complete', () => {
          _cdLottieIdx = (_cdLottieIdx + 1) % keys.length;
          setTimeout(() => {
            // Only continue if countdown is still visible
            if (document.getElementById('break-cd-lottie-container')) {
              playNext();
            }
          }, 200);
        });
      } catch (e) {
        container.innerHTML = '☕';
      }
    }
    playNext();
  }

  function _stopCountdownLottie() {
    if (_cdLottieAnim) {
      try { _cdLottieAnim.destroy(); } catch (e) {}
      _cdLottieAnim = null;
    }
  }

  function _startBreak(minutes) {
    if (!minutes || minutes < 1) return;
    _closeBreakMenu();
    _buildBreakCountdown();

    _breakState.running = true;
    _breakState.endTime = Date.now() + minutes * 60 * 1000;

    const cd = document.getElementById('break-countdown');
    if (cd) cd.classList.add('show');

    _updateCountdown();
    clearInterval(_breakState.tickInterval);
    _breakState.tickInterval = setInterval(_updateCountdown, 500);

    // Start Lottie rotation in countdown screen
    _cdLottieIdx = 0;
    _startCountdownLottieRotation();

    try { playMatchPro && playMatchPro(); } catch(e) {}
  }

  function _startBreakCustom() {
    const input = document.getElementById('break-custom-input');
    if (!input) return;
    const val = parseInt(input.value);
    if (isNaN(val) || val < 1) return;
    _startBreak(Math.min(val, 120));
  }

  function _updateCountdown() {
    if (!_breakState.running) return;
    const remaining = _breakState.endTime - Date.now();
    const el = document.getElementById('break-cd-time');
    if (!el) return;

    if (remaining <= 0) {
      el.textContent = '00:00';
      _onBreakEnd();
      return;
    }
    const totalSec = Math.ceil(remaining / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Tick sound every second (last 10 seconds)
    if (totalSec <= 10 && totalSec > 0) {
      const lastTicked = el.dataset.lastTick;
      if (lastTicked !== String(totalSec)) {
        el.dataset.lastTick = String(totalSec);
        try { playToneEnhanced(1200, 'triangle', 0.08, 0.08); } catch(e){}
        el.classList.add('tick-pulse');
        setTimeout(() => el.classList.remove('tick-pulse'), 400);
      }
    }
  }

  function _cancelBreak() {
    _breakState.running = false;
    clearInterval(_breakState.tickInterval);
    _stopCountdownLottie();
    const cd = document.getElementById('break-countdown');
    if (cd) cd.classList.remove('show');
  }

  function _onBreakEnd() {
    _breakState.running = false;
    clearInterval(_breakState.tickInterval);

    // Motivational chime
    try {
      // Rising melody: C-E-G-C octave
      playToneEnhanced(523.25, 'sine', 0.3, 0.22);
      setTimeout(() => playToneEnhanced(659.25, 'sine', 0.3, 0.22), 180);
      setTimeout(() => playToneEnhanced(783.99, 'sine', 0.3, 0.22), 360);
      setTimeout(() => playToneEnhanced(1046.50, 'sine', 0.5, 0.25), 540);
      setTimeout(() => {
        playToneEnhanced(1318.51, 'triangle', 0.4, 0.2);
        playToneEnhanced(1567.98, 'triangle', 0.4, 0.18);
      }, 800);
      // Sparkle
      setTimeout(() => playToneEnhanced(2093, 'sine', 0.2, 0.1), 1200);
      setTimeout(() => playToneEnhanced(2637, 'sine', 0.2, 0.1), 1350);
    } catch(e) {}

    // Victory-style announcement
    try {
      showVictory('🎉', "Break's over! Ready to learn? — انتهت الاستراحة! هيا نتعلم!");
    } catch(e) {}

    _stopCountdownLottie();
    const cd = document.getElementById('break-countdown');
    if (cd) cd.classList.remove('show');
  }

  // Expose cancel + custom globally for onclick handlers
  window._cancelBreak = _cancelBreak;
  window._startBreakCustom = _startBreakCustom;
  window._closeBreakMenu = _closeBreakMenu;

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    _buildBreakBtn();
  });
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(_buildBreakBtn, 100);
  }
})();


/* ============================================================
   10. 🔤 LETTER SORTING GAME (ترتيب الحروف)
   ============================================================
   الطفل يسحب الحروف بالترتيب الصحيح ليكوّن الكلمة
   - يستخدم splitWords من الحرف الحالي
   - 6 كلمات لكل جولة
   - Drag & Drop + touch support
============================================================ */
let _lsState = {
  words: [],
  currentIdx: 0,
  targetWord: '',
  targetLetters: [],  // split into letter+haraka units
  sourceLetters: [],  // shuffled
  placed: [],         // user's placement
  completed: 0,
};

/**
 * _lsSplitWord — يقسم الكلمة لوحدات (حرف + تشكيل)
 * مثال: "أَكَلَ" → ["أَ", "كَ", "لَ"]
 */
function _lsSplitWord(word) {
  const HARAKAT = 'ًٌٍَُِّْ';
  const units = [];
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (HARAKAT.includes(ch) && units.length > 0) {
      units[units.length - 1] += ch;
    } else {
      units.push(ch);
    }
  }
  return units;
}

function initLetterSort(words) {
  if (!words) {
    const data = (typeof lettersDB !== 'undefined' && activeLetterKey)
      ? lettersDB[activeLetterKey] : null;
    if (!data) return;
    const source = (data.splitWords && data.splitWords.length)
      ? data.splitWords : (data.xoWords || []);
    const unique = [...new Set(source)].filter(w => {
      const units = _lsSplitWord(w);
      return units.length >= 2 && units.length <= 4;  // pick reasonable lengths
    }).slice(0, 6);
    if (unique.length < 3) {
      // Fallback: just take first 6
      words = [...new Set(source)].slice(0, 6);
    } else {
      words = unique;
    }
  }
  _lsState.words = words;
  _lsState.currentIdx = 0;
  _lsState.completed = 0;
  _lsLoadCurrent();
}

function _lsLoadCurrent() {
  const idx = _lsState.currentIdx;
  if (idx >= _lsState.words.length) {
    // All done!
    _lsShowCompletion();
    return;
  }
  const word = _lsState.words[idx];
  _lsState.targetWord = word;
  _lsState.targetLetters = _lsSplitWord(word);

  // Shuffle for source
  _lsState.sourceLetters = [..._lsState.targetLetters]
    .map(v => ({ val: v, rand: Math.random() }))
    .sort((a, b) => a.rand - b.rand)
    .map(o => o.val);

  // If shuffle ended same as target, swap first two
  if (_lsState.sourceLetters.join('') === _lsState.targetLetters.join('') &&
      _lsState.sourceLetters.length > 1) {
    [_lsState.sourceLetters[0], _lsState.sourceLetters[1]] =
      [_lsState.sourceLetters[1], _lsState.sourceLetters[0]];
  }

  _lsState.placed = new Array(_lsState.targetLetters.length).fill(null);

  _lsRender();

  // Update progress
  const pText = document.getElementById('ls-progress-text');
  const pFill = document.getElementById('ls-progress-fill');
  if (pText) pText.textContent = `Word ${idx + 1} / ${_lsState.words.length}`;
  if (pFill) pFill.style.width = ((idx) / _lsState.words.length * 100) + '%';

  // Clear feedback
  const fb = document.getElementById('ls-feedback');
  if (fb) { fb.textContent = ''; fb.className = 'ls-feedback'; }
}

function _lsRender() {
  const target = document.getElementById('ls-target-zone');
  const source = document.getElementById('ls-source-zone');
  if (!target || !source) return;

  // Target slots (RTL: first letter goes to rightmost)
  target.innerHTML = _lsState.placed.map((placed, i) => {
    if (placed) {
      return `<div class="ls-slot ls-slot-filled" data-slot="${i}" onclick="letterSortRemove(${i})">
        <span class="ls-letter-text">${placed.val}</span>
      </div>`;
    }
    return `<div class="ls-slot ls-slot-empty" data-slot="${i}">
      <span class="ls-slot-num">${i + 1}</span>
    </div>`;
  }).join('');

  // Source pool
  source.innerHTML = _lsState.sourceLetters.map((letter, i) => {
    const used = letter === null;
    if (used) {
      return `<div class="ls-letter ls-letter-used" data-src="${i}"></div>`;
    }
    return `<div class="ls-letter" data-src="${i}" onclick="letterSortPick(${i})">
      <span class="ls-letter-text">${letter}</span>
    </div>`;
  }).join('');
}

function letterSortPick(srcIdx) {
  const letter = _lsState.sourceLetters[srcIdx];
  if (!letter) return;

  // Find first empty slot
  const emptyIdx = _lsState.placed.findIndex(p => p === null);
  if (emptyIdx === -1) return;  // all filled

  _lsState.placed[emptyIdx] = { val: letter, srcIdx };
  _lsState.sourceLetters[srcIdx] = null;

  try { playClickPro && playClickPro(); } catch (e) {}
  _lsRender();
  _lsCheckComplete();
}

function letterSortRemove(slotIdx) {
  const entry = _lsState.placed[slotIdx];
  if (!entry) return;

  // Return letter to source pool at its original position
  _lsState.sourceLetters[entry.srcIdx] = entry.val;
  _lsState.placed[slotIdx] = null;

  try { playToneEnhanced(400, 'sine', 0.08, 0.08); } catch (e) {}
  _lsRender();

  // Clear feedback
  const fb = document.getElementById('ls-feedback');
  if (fb) { fb.textContent = ''; fb.className = 'ls-feedback'; }
}

function _lsCheckComplete() {
  // Check if all slots are filled
  if (_lsState.placed.some(p => p === null)) return;

  const userAnswer = _lsState.placed.map(p => p.val).join('');
  const correct = _lsState.targetLetters.join('');
  const fb = document.getElementById('ls-feedback');

  if (userAnswer === correct) {
    // ✅ Correct!
    if (fb) {
      fb.textContent = `✅ أحسنت! ${_lsState.targetWord}`;
      fb.className = 'ls-feedback ls-feedback-success';
    }
    try {
      playMatchPro && playMatchPro();
      setTimeout(() => playToneEnhanced(1320, 'triangle', 0.3, 0.15), 150);
    } catch (e) {}

    _lsState.completed++;
    try { addStars(2); } catch (e) {}

    // Highlight target zone
    const target = document.getElementById('ls-target-zone');
    if (target) {
      target.classList.add('ls-win');
      setTimeout(() => target.classList.remove('ls-win'), 1000);
    }

    // Show victory for this word, then load next after delay
    setTimeout(() => {
      showVictory(_lsState.targetWord, `Correct! — (${_lsState.completed}/${_lsState.words.length})`);
    }, 500);

    setTimeout(() => {
      _lsState.currentIdx++;
      _lsLoadCurrent();
    }, 2500);
  } else {
    // ❌ Wrong — shake
    if (fb) {
      fb.textContent = `❌ Try again! — حاول مرة أخرى`;
      fb.className = 'ls-feedback ls-feedback-error';
    }
    try { playErrorPro && playErrorPro(); } catch (e) {}
    const target = document.getElementById('ls-target-zone');
    if (target) {
      target.classList.add('ls-shake');
      setTimeout(() => target.classList.remove('ls-shake'), 500);
    }
  }
}

function letterSortHint() {
  // Auto-fill the next correct letter
  const emptyIdx = _lsState.placed.findIndex(p => p === null);
  if (emptyIdx === -1) return;
  const correctLetter = _lsState.targetLetters[emptyIdx];
  // Find it in source
  const srcIdx = _lsState.sourceLetters.findIndex(l => l === correctLetter);
  if (srcIdx === -1) return;

  _lsState.placed[emptyIdx] = { val: correctLetter, srcIdx };
  _lsState.sourceLetters[srcIdx] = null;

  try { playToneEnhanced(900, 'triangle', 0.15, 0.1); } catch (e) {}
  _lsRender();
  _lsCheckComplete();
}

function letterSortNext() {
  _lsState.currentIdx++;
  if (_lsState.currentIdx >= _lsState.words.length) {
    _lsState.currentIdx = 0;  // restart cycle
  }
  _lsLoadCurrent();
}

function _lsShowCompletion() {
  const fb = document.getElementById('ls-feedback');
  if (fb) {
    fb.innerHTML = `🎉 <strong>All words completed!</strong> — أحسنت! أكملت كل الكلمات!`;
    fb.className = 'ls-feedback ls-feedback-success';
  }
  try {
    addStars(10);
    showVictory('🏆', `${_lsState.completed} words mastered! — أتقنت ${_lsState.completed} كلمة!`);
  } catch (e) {}
  // Restart after celebration
  setTimeout(() => {
    _lsState.currentIdx = 0;
    _lsState.completed = 0;
    _lsLoadCurrent();
  }, 3000);
}

// Hook into openLetter to initialize
(function hookLetterSort() {
  const origHook = window.openLetter;
  // We'll rely on the main hook in section 5 instead — it already runs after 800ms
  // Just add initLetterSort call there via a separate observer
  document.addEventListener('DOMContentLoaded', () => {
    // Watch for letter screen becoming visible
    const ls = document.getElementById('letter-screen');
    if (!ls) return;
    // Fallback: use mutation on letter-screen display
    new MutationObserver(() => {
      const visible = ls.style.display !== 'none' && ls.style.opacity !== '0';
      if (visible && typeof activeLetterKey !== 'undefined' && activeLetterKey) {
        // Debounce: only init once per letter open
        if (window._lsLastKey !== activeLetterKey) {
          window._lsLastKey = activeLetterKey;
          setTimeout(() => {
            try { initLetterSort(); } catch (e) { console.warn('letter-sort:', e); }
          }, 900);
        }
      }
    }).observe(ls, { attributes: true, attributeFilter: ['style'] });
  });
})();


/* ============================================================
   11. 👂 LISTEN & CHOOSE (اسمع واختر)
   ============================================================
   المعلم/الأب يقرأ الكلمة المُحدَّدة — الطفل يختارها من 4 خيارات
   - 6 جولات لكل حرف
   - لوحة المعلم قابلة للإخفاء/الإظهار
============================================================ */
let _lcState = {
  words: [],
  rounds: [],  // each: { correct, options: [4 words] }
  currentIdx: 0,
  score: 0,
  teacherVisible: true,
};

function initListenChoose(words) {
  if (!words) {
    const data = (typeof lettersDB !== 'undefined' && activeLetterKey)
      ? lettersDB[activeLetterKey] : null;
    if (!data) return;
    const source = (data.splitWords && data.splitWords.length)
      ? data.splitWords : (data.xoWords || []);
    words = [...new Set(source)].slice(0, 12);  // pool of 12 words
  }
  if (words.length < 4) return;

  _lcState.words = words;
  _lcState.score = 0;
  _lcState.currentIdx = 0;

  // Build 6 rounds (each picks 1 correct + 3 distractors from the pool)
  const numRounds = Math.min(6, words.length);
  _lcState.rounds = [];
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numRounds; i++) {
    const correct = shuffled[i];
    // Pick 3 distractors (any other word)
    const distractors = words.filter(w => w !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [correct, ...distractors].sort(() => 0.5 - Math.random());
    _lcState.rounds.push({ correct, options });
  }

  _lcLoadRound();
  _lcUpdateScore();
}

function _lcLoadRound() {
  const idx = _lcState.currentIdx;
  if (idx >= _lcState.rounds.length) {
    _lcShowCompletion();
    return;
  }
  const round = _lcState.rounds[idx];

  // Teacher panel
  const teacherWord = document.getElementById('lc-teacher-word');
  if (teacherWord) teacherWord.textContent = round.correct;

  // Options grid
  const grid = document.getElementById('lc-options-grid');
  if (grid) {
    grid.innerHTML = round.options.map((w, i) => `
      <button class="lc-option" data-word="${w}" onclick="listenChoosePick('${w}', ${i})">
        <span class="lc-option-num">${i + 1}</span>
        <span class="lc-option-word">${w}</span>
      </button>
    `).join('');
  }

  // Progress
  const pText = document.getElementById('lc-progress-text');
  const pFill = document.getElementById('lc-progress-fill');
  if (pText) pText.textContent = `Round ${idx + 1} / ${_lcState.rounds.length}`;
  if (pFill) pFill.style.width = (idx / _lcState.rounds.length * 100) + '%';

  // Clear feedback
  const fb = document.getElementById('lc-feedback');
  if (fb) { fb.textContent = ''; fb.className = 'lc-feedback'; }
}

function listenChoosePick(chosenWord, btnIdx) {
  const round = _lcState.rounds[_lcState.currentIdx];
  if (!round) return;

  const grid = document.getElementById('lc-options-grid');
  if (!grid) return;

  // Disable all buttons
  const buttons = grid.querySelectorAll('.lc-option');
  buttons.forEach(b => b.disabled = true);

  const correct = chosenWord === round.correct;
  const fb = document.getElementById('lc-feedback');

  if (correct) {
    buttons[btnIdx].classList.add('lc-correct');
    _lcState.score++;
    _lcUpdateScore();
    if (fb) {
      fb.textContent = `✅ Correct! — أحسنت! (${round.correct})`;
      fb.className = 'lc-feedback lc-feedback-success';
    }
    try { playMatchPro && playMatchPro(); } catch (e) {}
    try { addStars(3); } catch (e) {}

    setTimeout(() => {
      showVictory(round.correct, `Correct! — ${_lcState.score}/${_lcState.rounds.length}`);
    }, 300);

    setTimeout(() => {
      _lcState.currentIdx++;
      _lcLoadRound();
    }, 2200);
  } else {
    buttons[btnIdx].classList.add('lc-wrong');
    // Highlight correct answer
    buttons.forEach(b => {
      if (b.dataset.word === round.correct) b.classList.add('lc-correct-reveal');
    });
    if (fb) {
      fb.innerHTML = `❌ Wrong! The correct word was: <strong>${round.correct}</strong>`;
      fb.className = 'lc-feedback lc-feedback-error';
    }
    try { playErrorPro && playErrorPro(); } catch (e) {}

    setTimeout(() => {
      _lcState.currentIdx++;
      _lcLoadRound();
    }, 2500);
  }
}

function _lcUpdateScore() {
  const el = document.getElementById('lc-score');
  if (el) el.textContent = _lcState.score;
}

function _lcShowCompletion() {
  const fb = document.getElementById('lc-feedback');
  const pct = Math.round(_lcState.score / _lcState.rounds.length * 100);
  if (fb) {
    fb.innerHTML = `🎉 Complete! Score: <strong>${_lcState.score}/${_lcState.rounds.length}</strong> (${pct}%)`;
    fb.className = 'lc-feedback lc-feedback-success';
  }
  try {
    addStars(5);
    showVictory('🏆', `Great Listening! ${_lcState.score}/${_lcState.rounds.length} correct — ممتاز!`);
  } catch (e) {}
  // Restart after delay
  setTimeout(() => initListenChoose(), 3000);
}

function listenChooseRestart() {
  initListenChoose();
}

function lcPeekWord() {
  const pop = document.getElementById('lc-teacher-popover');
  if (!pop) return;
  pop.classList.add('show');
  try { playClickPro && playClickPro(); } catch (e) {}
  // Auto-hide after 5 seconds
  clearTimeout(window._lcPeekTimer);
  window._lcPeekTimer = setTimeout(() => {
    pop.classList.remove('show');
  }, 5000);
}

function lcClosePeek() {
  const pop = document.getElementById('lc-teacher-popover');
  if (pop) pop.classList.remove('show');
  clearTimeout(window._lcPeekTimer);
}


/* ============================================================
   12. ⚡ SPEED READING CHALLENGE
   ============================================================
   10 كلمات تظهر واحدة واحدة — الطفل يقرأها ويختار ✓ أو ✗
   3 مستويات: Easy (4s), Medium (2.5s), Hard (1.5s)
============================================================ */
let _srState = {
  words: [],
  currentIdx: 0,
  score: 0,
  intervalMs: 2500,
  levelName: 'Medium',
  timerInterval: null,
  timerRemaining: 0,
  autoAdvanceTimeout: null,
};

// Helper: resolve an 'sr-*' element id to the active (per-level) one.
// Returns the prefixed element when a levelKey is active, else the default.
function _srResolve(baseId) {
  const key = _srState && _srState.levelKey;
  if (key) {
    const prefixed = document.getElementById(`${key}-${baseId}`);
    if (prefixed) return prefixed;
  }
  return document.getElementById(baseId);
}
function _srContainer() {
  const key = _srState && _srState.levelKey;
  if (key) {
    const c = document.getElementById(`${key}-sr-wrap`);
    if (c) return c;
  }
  return document.querySelector('#letter-screen .sr-wrap') || document;
}

function speedReadStart(intervalMs, levelName, levelKey) {
  // levelKey is optional; when provided, switch to that level's DOM IDs.
  const advKey = levelKey || (_srState && _srState.levelKey) || window.activeAdvancedLevel || null;
  _srState.levelKey = advKey;

  let words;
  if (advKey && ADVANCED_LEVELS_DB[advKey]) {
    words = [...ADVANCED_LEVELS_DB[advKey].words];
  } else {
    const data = (typeof lettersDB !== 'undefined' && activeLetterKey)
      ? lettersDB[activeLetterKey] : null;
    if (!data) return;
    const source = (data.splitWords && data.splitWords.length)
      ? data.splitWords : (data.xoWords || []);
    words = [...new Set(source)];
  }
  // We need 10 words — pad by repeating
  while (words.length < 10) words = words.concat(words);
  words = words.slice(0, 10).sort(() => 0.5 - Math.random());

  _srState.words = words;
  _srState.currentIdx = 0;
  _srState.score = 0;
  _srState.intervalMs = intervalMs;
  _srState.levelName = levelName;

  const startEl   = _srResolve('sr-start');
  const resultsEl = _srResolve('sr-results');
  const playingEl = _srResolve('sr-playing');
  if (startEl)   startEl.style.display   = 'none';
  if (resultsEl) resultsEl.style.display = 'none';
  if (playingEl) playingEl.style.display = 'flex';

  const lvl = _srResolve('sr-level-name');
  if (lvl) lvl.textContent = levelName;

  _srNextWord();
}

function speedReadStartCustom(levelKey) {
  // Find the right input (per level or global)
  if (levelKey) _srState.levelKey = levelKey;
  const input = _srResolve('sr-custom-input');
  if (!input) return;
  let val = parseFloat(input.value);
  if (isNaN(val) || val < 0.5) val = 3;
  if (val > 30) val = 30;
  const ms = Math.round(val * 1000);
  speedReadStart(ms, `Custom (${val}s)`, _srState.levelKey);
}

function _srNextWord() {
  clearTimeout(_srState.autoAdvanceTimeout);
  clearInterval(_srState.timerInterval);

  const idx = _srState.currentIdx;
  if (idx >= _srState.words.length) {
    _srShowResults();
    return;
  }

  const word = _srState.words[idx];
  const disp = _srResolve('sr-word-display');
  const numEl = _srResolve('sr-word-num');
  const scoreEl = _srResolve('sr-score');
  if (disp) {
    disp.textContent = word;
    disp.style.fontFamily = "'Noto Naskh Arabic', serif";
    disp.classList.remove('sr-pop');
    void disp.offsetWidth;  // reflow
    disp.classList.add('sr-pop');
  }
  if (numEl) numEl.textContent = idx + 1;
  if (scoreEl) scoreEl.textContent = _srState.score;

  // Re-enable buttons — scope to the active sr-wrap so we only target this level's buttons
  const container = _srContainer();
  container.querySelectorAll('.sr-btn').forEach(b => b.disabled = false);

  // Timer
  _srState.timerRemaining = _srState.intervalMs;
  const fill = _srResolve('sr-timer-fill');
  if (fill) {
    fill.style.transition = 'none';
    fill.style.width = '100%';
    void fill.offsetWidth;
    fill.style.transition = `width ${_srState.intervalMs}ms linear`;
    fill.style.width = '0%';
  }

  // Tick sound (last 1 second)
  const tickTimer = _srState.intervalMs - 1000;
  if (tickTimer > 0) {
    _srState.autoAdvanceTimeout = setTimeout(() => {
      try { playToneEnhanced(600, 'triangle', 0.1, 0.08); } catch(e){}
      setTimeout(() => { try { playToneEnhanced(600, 'triangle', 0.1, 0.08); } catch(e){} }, 300);
      setTimeout(() => { try { playToneEnhanced(600, 'triangle', 0.1, 0.08); } catch(e){} }, 600);
      // Auto-advance as "didn't read" if no answer
      setTimeout(() => {
        if (_srState.currentIdx === idx) {
          speedReadAnswer(false, true);
        }
      }, 1000);
    }, tickTimer);
  }
}

function speedReadAnswer(didRead, isTimeout) {
  // Prevent double-click — scope to active container
  const container = _srContainer();
  const buttons = container.querySelectorAll('.sr-btn');
  if (buttons[0] && buttons[0].disabled) return;
  buttons.forEach(b => b.disabled = true);

  clearTimeout(_srState.autoAdvanceTimeout);

  const fill = _srResolve('sr-timer-fill');
  if (fill) {
    const computed = getComputedStyle(fill).width;
    fill.style.transition = 'none';
    fill.style.width = computed;
  }

  if (didRead) {
    _srState.score++;
    try { playMatchPro && playMatchPro(); } catch(e) {}
  } else {
    if (!isTimeout) {
      try { playToneEnhanced(350, 'triangle', 0.15, 0.1); } catch(e) {}
    } else {
      try { playErrorPro && playErrorPro(); } catch(e) {}
    }
  }

  _srState.currentIdx++;
  // Short delay before next word
  setTimeout(_srNextWord, 500);
}

function _srShowResults() {
  clearInterval(_srState.timerInterval);
  clearTimeout(_srState.autoAdvanceTimeout);

  const playingEl = _srResolve('sr-playing');
  const resultsEl = _srResolve('sr-results');
  if (playingEl) playingEl.style.display = 'none';
  if (resultsEl) resultsEl.style.display = 'flex';

  const score = _srState.score;
  const icon = _srResolve('sr-result-icon');
  const title = _srResolve('sr-result-title');
  const finalScore = _srResolve('sr-final-score');
  const sub = _srResolve('sr-result-sub');

  if (finalScore) finalScore.textContent = score;

  let iconStr, titleStr, subStr;
  if (score === 10) {
    iconStr = '🏆'; titleStr = 'Perfect! — ممتاز!';
    subStr = 'You read them all! — قرأت الكل!';
  } else if (score >= 7) {
    iconStr = '🎉'; titleStr = 'Excellent! — رائع!';
    subStr = 'Great reading speed — سرعة قراءة ممتازة';
  } else if (score >= 4) {
    iconStr = '👍'; titleStr = 'Good Job! — أحسنت!';
    subStr = 'Keep practicing — استمر في التدريب';
  } else {
    iconStr = '💪'; titleStr = 'Keep Trying! — حاول أكثر!';
    subStr = 'Try an easier level — جرب مستوى أسهل';
  }
  if (icon) icon.textContent = iconStr;
  if (title) title.textContent = titleStr;
  if (sub) sub.textContent = subStr;

  // Save best (per-level best when in advanced mode)
  try {
    const keySuffix = _srState.levelKey || activeLetterKey || 'x';
    const storeKey = 'sr_best_' + keySuffix;
    const prevBest = parseInt(localStorage.getItem(storeKey) || '0');
    if (score > prevBest) {
      localStorage.setItem(storeKey, String(score));
    }
    _srUpdateBest();
  } catch (e) {}

  // Reward
  try {
    if (score >= 7) {
      addStars(score);
      showVictory('⚡', `${score}/10 — ${_srState.levelName} level!`);
    } else if (score > 0) {
      addStars(Math.floor(score / 2));
    }
  } catch (e) {}
}

function _srUpdateBest() {
  const el = _srResolve('sr-best-score');
  if (!el) return;
  try {
    const keySuffix = _srState.levelKey || activeLetterKey || 'x';
    const storeKey = 'sr_best_' + keySuffix;
    const best = parseInt(localStorage.getItem(storeKey) || '0');
    el.textContent = best;
  } catch (e) { el.textContent = '0'; }
}

function speedReadRestart(levelKey) {
  if (levelKey) _srState.levelKey = levelKey;
  clearInterval(_srState.timerInterval);
  clearTimeout(_srState.autoAdvanceTimeout);
  const playingEl = _srResolve('sr-playing');
  const resultsEl = _srResolve('sr-results');
  const startEl   = _srResolve('sr-start');
  if (playingEl) playingEl.style.display = 'none';
  if (resultsEl) resultsEl.style.display = 'none';
  if (startEl)   startEl.style.display   = 'flex';
  _srUpdateBest();
}

// Hook both games into openLetter flow
(function hookNewGames() {
  document.addEventListener('DOMContentLoaded', () => {
    const ls = document.getElementById('letter-screen');
    if (!ls) return;
    new MutationObserver(() => {
      const visible = ls.style.display !== 'none' && ls.style.opacity !== '0';
      if (visible && typeof activeLetterKey !== 'undefined' && activeLetterKey) {
        if (window._newGamesLastKey !== activeLetterKey) {
          window._newGamesLastKey = activeLetterKey;
          setTimeout(() => {
            try { speedReadRestart(); } catch (e) { console.warn('speed-read:', e); }
          }, 1000);
        }
      }
    }).observe(ls, { attributes: true, attributeFilter: ['style'] });
  });
})();

/* Ensure Sukoon mini-games (Spot/Patterns/Detective) render whenever the
   sukoon screen becomes visible — even after page reload / HMR without
   re-running openSukoonLevel. Each render fn is idempotent. */
(function hookSukoonGames() {
  function ensureSukoonGames() {
    try { renderSukoonSpot(); }      catch (e) { console.warn('sukoonSpot:', e); }
    try { renderSukoonPatterns(); }  catch (e) { console.warn('sukoonPatterns:', e); }
    try { renderSukoonDetective(); } catch (e) { console.warn('sukoonDetective:', e); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const ss = document.getElementById('sukoon-screen');
    if (!ss) return;
    // If sukoon screen is already visible at load, render now
    if (ss.style.display !== 'none' && ss.style.opacity !== '0') {
      setTimeout(ensureSukoonGames, 300);
    }
    new MutationObserver(() => {
      const visible = ss.style.display !== 'none' && ss.style.opacity !== '0';
      if (visible) {
        // Throttle: only re-render once per visibility transition
        if (!window._sukoonGamesRendered) {
          window._sukoonGamesRendered = true;
          setTimeout(ensureSukoonGames, 200);
        }
      } else {
        window._sukoonGamesRendered = false;
      }
    }).observe(ss, { attributes: true, attributeFilter: ['style'] });
  });
})();


/* ============================================================
   13. 🥤 TRICKY CUPS — اتبع الكلمة
   ============================================================
   نظام اللعبة:
   1. يُظهر كؤوس (3/4/5 حسب المستوى) كل واحد تحته كلمة مختلفة
   2. يُبرز الكلمة "المطلوبة" (target) لثانيتين
   3. الكؤوس "تتقلب" (تخفي الكلمات تحتها)
   4. الكؤوس تتحرك وتتبادل أماكنها بسرعة (عدد المرات حسب المستوى)
   5. الطفل يضغط على الكوب اللي كانت تحته الكلمة
   6. ✅ صح = نقطة + streak يزيد
   7. ❌ غلط = streak يصفر
============================================================ */
let _tcState = {
  numCups: 3,
  numShuffles: 3,
  shuffleSpeed: 1200,
  cups: [],          // [{ id, word, x }] -- x is pixel position
  targetIdx: -1,
  score: 0,
  streak: 0,
  bestStreak: 0,
  round: 0,
  phase: 'idle',     // idle | reveal | shuffle | waiting | result
  stageWidth: 0,
  busy: false,
};

// Helper: resolve a 'tc-*' element id to the active (per-level) one.
function _tcResolve(baseId) {
  const key = _tcState && _tcState.levelKey;
  if (key) {
    const prefixed = document.getElementById(`${key}-${baseId}`);
    if (prefixed) return prefixed;
  }
  return document.getElementById(baseId);
}
function _tcContainer() {
  const key = _tcState && _tcState.levelKey;
  if (key) {
    const c = document.getElementById(`${key}-tc-wrap`);
    if (c) return c;
  }
  return document.querySelector('#letter-screen .tc-wrap') || document;
}

function trickyCupsStart(numCups, numShuffles, shuffleSpeed, levelKey) {
  const advKey = levelKey || (_tcState && _tcState.levelKey) || window.activeAdvancedLevel || null;
  _tcState.levelKey = advKey;

  _tcState.numCups = numCups;
  _tcState.numShuffles = numShuffles;
  _tcState.shuffleSpeed = shuffleSpeed;
  _tcState.score = 0;
  _tcState.streak = 0;
  _tcState.round = 0;

  const startEl   = _tcResolve('tc-start');
  const playingEl = _tcResolve('tc-playing');
  if (startEl)   startEl.style.display   = 'none';
  if (playingEl) playingEl.style.display = 'flex';

  _tcLoadBest();
  _tcStartRound();
}

function _tcStartRound() {
  _tcState.round++;
  _tcState.busy = false;
  _tcUpdateHUD();

  const advKey = _tcState.levelKey;
  let source;
  if (advKey && ADVANCED_LEVELS_DB[advKey]) {
    source = ADVANCED_LEVELS_DB[advKey].words;
  } else {
    const data = (typeof lettersDB !== 'undefined' && activeLetterKey)
      ? lettersDB[activeLetterKey] : null;
    if (!data) return;
    source = (data.splitWords && data.splitWords.length)
      ? data.splitWords : (data.xoWords || []);
  }
  let pool = [...new Set(source)];
  while (pool.length < _tcState.numCups) pool = pool.concat(pool);
  pool = pool.sort(() => 0.5 - Math.random()).slice(0, _tcState.numCups);

  // Build cups data — use a per-instance id prefix so ids stay unique across screens
  const cupPrefix = (advKey ? advKey + '-' : '') + 'cup-';
  _tcState.cups = pool.map((word, i) => ({
    id: cupPrefix + i,
    word: word,
    slot: i,  // slot position (0..numCups-1)
  }));
  _tcState.targetIdx = Math.floor(Math.random() * _tcState.numCups);
  _tcState.phase = 'reveal';

  _tcRender();
  _tcUpdateStatus('👀 Watch the word under the highlighted cup!');

  // Highlight target cup & show words for 2.2s
  setTimeout(() => {
    _tcCoverCups();
    _tcUpdateStatus('🔀 Cups are shuffling...');
    _tcState.phase = 'shuffle';
    setTimeout(() => _tcDoShuffle(), 500);
  }, 2200);
}

function _tcRender() {
  const stage = _tcResolve('tc-stage');
  if (!stage) return;
  stage.innerHTML = '';
  _tcState.stageWidth = stage.offsetWidth || 500;

  _tcState.cups.forEach((cup, i) => {
    const el = document.createElement('div');
    el.className = 'tc-cup tc-cup-open';
    el.id = cup.id;
    el.dataset.cupIdx = i;
    const isTarget = (i === _tcState.targetIdx);
    if (isTarget) el.classList.add('tc-cup-target');
    el.innerHTML = `
      <div class="tc-cup-num"></div>
      <div class="tc-cup-body">
        <div class="tc-cup-top"></div>
        <div class="tc-cup-mid"></div>
      </div>
      <div class="tc-word-under" style="font-family:'Noto Naskh Arabic',serif;">${cup.word}</div>
    `;
    el.onclick = () => _tcCupClick(i);
    stage.appendChild(el);
    // Set initial position
    _tcPositionCup(el, cup.slot);
  });
}

function _tcPositionCup(el, slot) {
  const stage = _tcResolve('tc-stage');
  if (!stage) return;
  const stageWidth = stage.offsetWidth;
  const n = _tcState.numCups;
  const cupWidth = 100;  // fixed cup width
  const gap = (stageWidth - cupWidth * n) / (n + 1);
  const x = gap + slot * (cupWidth + gap);
  el.style.left = x + 'px';
}

function _tcCoverCups() {
  const container = _tcContainer();
  container.querySelectorAll('.tc-cup').forEach(el => {
    el.classList.remove('tc-cup-open');
    el.classList.add('tc-cup-closed');
    el.classList.remove('tc-cup-target');
  });
  try { playToneEnhanced(400, 'triangle', 0.15, 0.1); } catch (e) {}
}

function _tcDoShuffle() {
  let shufflesLeft = _tcState.numShuffles;
  const doNext = () => {
    if (shufflesLeft <= 0) {
      _tcState.phase = 'waiting';
      _tcUpdateStatus('🎯 Click the cup with the word! — اضغط على الكوب الصحيح!');
      // Number each cup by its current visual slot (1..n) so the player
      // can refer to "cup 3" before picking.
      _tcState.cups.forEach(cup => {
        const cupEl = document.getElementById(cup.id);
        if (!cupEl) return;
        const numEl = cupEl.querySelector('.tc-cup-num');
        if (numEl) numEl.textContent = String(cup.slot + 1);
        cupEl.classList.add('tc-cup-numbered');
      });
      return;
    }
    // Pick two random different slots and swap
    const a = Math.floor(Math.random() * _tcState.numCups);
    let b = Math.floor(Math.random() * _tcState.numCups);
    while (b === a) b = Math.floor(Math.random() * _tcState.numCups);

    // Swap slots of cups at positions a and b
    const cupA = _tcState.cups.find(c => c.slot === a);
    const cupB = _tcState.cups.find(c => c.slot === b);
    if (cupA && cupB) {
      cupA.slot = b;
      cupB.slot = a;
      // Move visually
      const elA = document.getElementById(cupA.id);
      const elB = document.getElementById(cupB.id);
      if (elA) _tcPositionCup(elA, b);
      if (elB) _tcPositionCup(elB, a);
      try { playToneEnhanced(600 + Math.random() * 200, 'sine', 0.05, 0.06); } catch (e) {}
    }
    shufflesLeft--;
    setTimeout(doNext, _tcState.shuffleSpeed);
  };
  setTimeout(doNext, 200);
}

function _tcCupClick(cupIdx) {
  if (_tcState.phase !== 'waiting' || _tcState.busy) return;
  _tcState.busy = true;

  const correct = (cupIdx === _tcState.targetIdx);
  const cup = _tcState.cups[cupIdx];
  const el = document.getElementById(cup.id);
  if (!el) return;

  // Reveal all cups in this container only
  const container = _tcContainer();
  container.querySelectorAll('.tc-cup').forEach(c => {
    c.classList.remove('tc-cup-closed');
    c.classList.add('tc-cup-open');
  });

  if (correct) {
    el.classList.add('tc-cup-correct');
    _tcState.score++;
    _tcState.streak++;
    if (_tcState.streak > _tcState.bestStreak) {
      _tcState.bestStreak = _tcState.streak;
      _tcSaveBest();
    }
    try { playMatchPro && playMatchPro(); } catch (e) {}
    try { addStars(2); } catch (e) {}
    _tcUpdateStatus(`✅ Correct! — ${cup.word}`);
    _tcUpdateHUD();

    // Enter "post-correct" phase: show word big, wait for Continue
    _tcState.phase = 'post-correct';
    _tcShowContinueButton(cup.word);
  } else {
    el.classList.add('tc-cup-wrong');
    // Highlight correct one
    const targetCup = _tcState.cups[_tcState.targetIdx];
    const targetEl = document.getElementById(targetCup.id);
    if (targetEl) targetEl.classList.add('tc-cup-correct-reveal');

    _tcState.streak = 0;
    try { playErrorPro && playErrorPro(); } catch (e) {}
    _tcUpdateStatus(`❌ Wrong! It was: ${targetCup.word}`);
    _tcUpdateHUD();

    // Also wait for Continue on wrong answer
    _tcState.phase = 'post-wrong';
    _tcShowContinueButton(targetCup.word);
  }
}

function _tcShowContinueButton(word) {
  const inst = _tcResolve('tc-instruction');
  if (!inst) return;
  inst.innerHTML = `
    <div class="tc-reveal-word" style="font-family:'Noto Naskh Arabic',serif;">${word}</div>
    <button class="tc-continue-btn" onclick="trickyCupsNextRound()">
      <i class="fas fa-forward"></i> Read it, then continue — اقرأها ثم تابع
    </button>
  `;
}

function trickyCupsNextRound() {
  const inst = _tcResolve('tc-instruction');
  if (inst) inst.innerHTML = '';
  _tcState.busy = false;
  _tcStartRound();
}

function _tcUpdateHUD() {
  const s = _tcResolve('tc-score');
  const st = _tcResolve('tc-streak');
  const r = _tcResolve('tc-round');
  if (s) s.textContent = _tcState.score;
  if (st) st.textContent = _tcState.streak;
  if (r) r.textContent = _tcState.round;
}

function _tcUpdateStatus(msg) {
  const el = _tcResolve('tc-status');
  if (el) el.textContent = msg;
}

function _tcSaveBest() {
  try {
    const keySuffix = _tcState.levelKey || activeLetterKey || 'x';
    const key = 'tc_best_' + keySuffix;
    localStorage.setItem(key, String(_tcState.bestStreak));
    const el = _tcResolve('tc-best-streak');
    if (el) el.textContent = _tcState.bestStreak;
  } catch (e) {}
}

function _tcLoadBest() {
  try {
    const keySuffix = _tcState.levelKey || activeLetterKey || 'x';
    const key = 'tc_best_' + keySuffix;
    _tcState.bestStreak = parseInt(localStorage.getItem(key) || '0');
    const el = _tcResolve('tc-best-streak');
    if (el) el.textContent = _tcState.bestStreak;
  } catch (e) {}
}

function trickyCupsRestart(levelKey) {
  if (levelKey) _tcState.levelKey = levelKey;
  const playing = _tcResolve('tc-playing');
  const start   = _tcResolve('tc-start');
  if (playing) playing.style.display = 'none';
  if (start)   start.style.display   = 'flex';
  _tcLoadBest();
}

// Hook Tricky Cups into the letter-open flow
(function hookTrickyCups() {
  document.addEventListener('DOMContentLoaded', () => {
    const ls = document.getElementById('letter-screen');
    if (!ls) return;
    new MutationObserver(() => {
      const visible = ls.style.display !== 'none' && ls.style.opacity !== '0';
      if (visible && typeof activeLetterKey !== 'undefined' && activeLetterKey) {
        if (window._tcLastKey !== activeLetterKey) {
          window._tcLastKey = activeLetterKey;
          setTimeout(() => {
            try { trickyCupsRestart(); } catch (e) { console.warn('tricky-cups:', e); }
          }, 1100);
        }
      }
    }).observe(ls, { attributes: true, attributeFilter: ['style'] });
  });
})();


/* ============================================================
   14. 🔲 FULLSCREEN MODE FOR EACH GAME (Pseudo-fullscreen with ZOOM)
   ============================================================
   نستخدم CSS zoom بدل transform:scale لأن:
   1. zoom بيكبّر كل حاجة بشكل طبيعي بدون بوظ الـ layout
   2. flex / grid / absolute positioning كلها تشتغل صح
   3. الـ events تحتفظ بمواقعها الصحيحة
   4. العروض (canvas / SVG) تتكبّر بنفس النسبة
   + Navigation arrows للتنقل بين الألعاب وإنت في fullscreen
============================================================ */
(function initFullscreenButtons() {

  let _currentFsSection = null;

  // Sections in order (used for next/prev navigation)
  // Section 2 (Phaser) excluded — uses only internal FS on the canvas itself
  // Section 'final' is the أنا/examples panel
  const GAME_SECTIONS = [
    '2-motors',
    '3',
    '4',
    '5',
    '6',
    '6.5',
    '6.75',
    '6.89',
    '6.91',
    '7',
    '8',
    '9',
    '10',
    'detective',
  ];

  function _enterFullscreen(section) {
    if (_currentFsSection && _currentFsSection !== section) {
      _exitFullscreen(_currentFsSection, /* keepFs */ true);
    }
    _currentFsSection = section;

    section.classList.add('fs-section-active');
    document.documentElement.classList.add('has-fs-section');
    document.body.style.overflow = 'hidden';

    // Apply zoom based on viewport after layout
    requestAnimationFrame(() => {
      _applyZoom(section);
      _ensureNavArrows(section);
    });
    window.addEventListener('resize', _onResize);

    try { playClickPro && playClickPro(); } catch (e) {}
  }

  function _exitFullscreen(section, keepFs) {
    if (!section) return;
    section.classList.remove('fs-section-active');

    // Reset zoom
    const wrapper = section.querySelector('.fs-content-wrapper');
    if (wrapper) {
      wrapper.style.zoom = '';
      wrapper.style.transform = '';
      wrapper.style.width = '';
      wrapper.style.height = '';
      wrapper.style.display = '';
      wrapper.style.padding = '';
    }
    // Reset inline Phaser styles if any
    const gameContainer = section.querySelector('#game-container');
    if (gameContainer) {
      gameContainer.style.width = '';
      gameContainer.style.height = '';
      gameContainer.style.maxWidth = '';
      gameContainer.style.aspectRatio = '';
      gameContainer.style.margin = '';
      // Trigger Phaser refresh after styles reset
      function doPhaserRefresh() {
        try {
          const game = (typeof PhaserManager !== 'undefined' && PhaserManager.getGame)
            ? PhaserManager.getGame() : null;
          if (game && game.scale && typeof game.scale.refresh === 'function') {
            game.scale.refresh();
          }
        } catch (e) {}
      }
      setTimeout(doPhaserRefresh, 50);
      setTimeout(doPhaserRefresh, 200);
      setTimeout(doPhaserRefresh, 500);
      setTimeout(() => window.dispatchEvent(new Event('resize')), 80);
    }
    // Also reset wrapper's inline margins
    if (wrapper) {
      wrapper.style.marginLeft = '';
      wrapper.style.marginRight = '';
    }
    // Remove nav arrows
    section.querySelectorAll('.fs-nav-arrow').forEach(a => a.remove());

    if (_currentFsSection === section) _currentFsSection = null;
    if (!keepFs && !_currentFsSection) {
      document.documentElement.classList.remove('has-fs-section');
      document.body.style.overflow = '';
      window.removeEventListener('resize', _onResize);
    }
    try { playClickPro && playClickPro(); } catch (e) {}
  }

  function _onResize() {
    if (_currentFsSection) _applyZoom(_currentFsSection);
  }

  /**
   * Fullscreen scaling strategy:
   * - Use `width: fit-content` so the wrapper shrinks to content's natural width
   * - Use transform: scale to amplify the ENTIRE section proportionally
   * - Content keeps its natural layout (pixel-perfect identical to non-FS view)
   */
  function _applyZoom(section) {
    const wrapper = section.querySelector('.fs-content-wrapper');
    if (!wrapper) return;

    // Reset any previous styles
    wrapper.style.zoom = '';
    wrapper.style.transform = '';
    wrapper.style.width = '';
    wrapper.style.height = '';
    wrapper.style.maxWidth = '';
    wrapper.style.marginLeft = '';
    wrapper.style.marginRight = '';
    wrapper.style.display = '';
    wrapper.style.padding = '';
    wrapper.style.boxSizing = '';

    const gameContainer = wrapper.querySelector('#game-container');
    if (gameContainer) {
      gameContainer.style.width = '';
      gameContainer.style.height = '';
      gameContainer.style.maxWidth = '';
      gameContainer.style.aspectRatio = '';
      gameContainer.style.margin = '';
    }

    const isPhaserSection = !!gameContainer;

    if (isPhaserSection) {
      // Phaser section: resize game-container DIRECTLY + refresh Phaser
      // (transform scale doesn't work well for Phaser canvas)
      const motorsBox = wrapper.querySelector('.motors-box');
      const sectionHeading = wrapper.querySelector('.section-heading');
      const motorsH = motorsBox ? motorsBox.offsetHeight : 0;
      const headingH = sectionHeading ? sectionHeading.offsetHeight : 0;
      const topPadding = 40 + headingH + 14 + motorsH + 14;

      const availW = window.innerWidth - 100;
      const availH = window.innerHeight - topPadding - 60;
      const aspect = 1000 / 600;

      let w = availW;
      let h = w / aspect;
      if (h > availH) {
        h = availH;
        w = h * aspect;
      }
      if (w < 600) { w = 600; h = w / aspect; }

      gameContainer.style.width = w + 'px';
      gameContainer.style.height = h + 'px';
      gameContainer.style.maxWidth = 'none';
      gameContainer.style.aspectRatio = 'auto';
      gameContainer.style.margin = '0 auto';

      wrapper.style.display = 'block';
      wrapper.style.maxWidth = w + 'px';
      wrapper.style.width = '100%';
      wrapper.style.margin = '0 auto';

      // Refresh Phaser multiple times to catch layout
      function doRefresh() {
        try {
          const game = (typeof PhaserManager !== 'undefined' && PhaserManager.getGame)
            ? PhaserManager.getGame() : null;
          if (game && game.scale && typeof game.scale.refresh === 'function') {
            game.scale.refresh();
          }
        } catch (e) {}
      }
      setTimeout(doRefresh, 50);
      setTimeout(doRefresh, 200);
      setTimeout(doRefresh, 500);
      return;
    }

    // Non-Phaser: use transform:scale on wrapper with fixed REF_WIDTH
    const REF_WIDTH = 1200;
    wrapper.style.display = 'block';
    wrapper.style.width = REF_WIDTH + 'px';
    wrapper.style.maxWidth = REF_WIDTH + 'px';

    // Force reflow
    // eslint-disable-next-line no-unused-expressions
    wrapper.offsetHeight;

    const naturalW = REF_WIDTH;
    const naturalH = wrapper.scrollHeight || wrapper.offsetHeight || 500;

    const availW = window.innerWidth - 160;
    const availH = window.innerHeight - 60;

    let scale = Math.min(availW / naturalW, availH / naturalH);
    if (scale > 2.0) scale = 2.0;
    if (scale < 1.0) scale = 1.0;

    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.transformOrigin = 'center top';
    wrapper.style.height = (naturalH * scale) + 'px';
  }

  function _toggleFullscreen(btn) {
    const section = btn.closest('.step-section');
    if (!section) return;
    if (section.classList.contains('fs-section-active')) {
      _exitFullscreen(section);
    } else {
      _enterFullscreen(section);
    }
  }

  function _ensureNavArrows(section) {
    if (section.querySelector('.fs-nav-arrow')) return;
    const currentSec = section.getAttribute('data-section');
    const idx = GAME_SECTIONS.indexOf(currentSec);

    // Previous arrow (right in RTL = left arrow icon meaning "previous game")
    if (idx > 0) {
      const prev = document.createElement('button');
      prev.className = 'fs-nav-arrow fs-nav-prev';
      prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prev.title = 'Previous game';
      prev.onclick = (e) => { e.stopPropagation(); _navTo(idx - 1); };
      section.appendChild(prev);
    }
    // Next arrow
    if (idx < GAME_SECTIONS.length - 1) {
      const next = document.createElement('button');
      next.className = 'fs-nav-arrow fs-nav-next';
      next.innerHTML = '<i class="fas fa-chevron-right"></i>';
      next.title = 'Next game';
      next.onclick = (e) => { e.stopPropagation(); _navTo(idx + 1); };
      section.appendChild(next);
    }
  }

  function _navTo(idx) {
    if (idx < 0 || idx >= GAME_SECTIONS.length) return;
    const targetSec = GAME_SECTIONS[idx];
    const targetEl = document.querySelector(`.step-section[data-section="${targetSec}"]`);
    if (!targetEl) return;

    // Exit current, enter target (keep fullscreen state on)
    if (_currentFsSection && _currentFsSection !== targetEl) {
      _exitFullscreen(_currentFsSection, /* keepFs */ true);
    }
    _enterFullscreen(targetEl);
  }

  // ESC exits
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && _currentFsSection) {
      _exitFullscreen(_currentFsSection);
    }
    // Arrow keys for navigation when in fullscreen
    if (_currentFsSection) {
      const currentSec = _currentFsSection.getAttribute('data-section');
      const idx = GAME_SECTIONS.indexOf(currentSec);
      if (e.key === 'ArrowRight' && idx < GAME_SECTIONS.length - 1) {
        e.preventDefault();
        _navTo(idx + 1);
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        e.preventDefault();
        _navTo(idx - 1);
      }
    }
  });

  function _addFsButton(section) {
    if (section.querySelector('.fs-toggle-btn')) return;

    // Wrap all direct children in .fs-content-wrapper
    if (!section.querySelector('.fs-content-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'fs-content-wrapper';
      while (section.firstChild) wrapper.appendChild(section.firstChild);
      section.appendChild(wrapper);
    }

    const btn = document.createElement('button');
    btn.className = 'fs-toggle-btn';
    btn.title = 'Full Screen / ملء الشاشة';
    btn.innerHTML = `
      <i class="fas fa-expand fs-icon-expand"></i>
      <i class="fas fa-compress fs-icon-compress"></i>
    `;
    btn.onclick = (e) => { e.stopPropagation(); _toggleFullscreen(btn); };
    section.appendChild(btn);
  }

  function _installFsButtons() {
    GAME_SECTIONS.forEach(sec => {
      const el = document.querySelector(`.step-section[data-section="${sec}"]`);
      if (el) _addFsButton(el);
    });
  }

  // Expose globally so other functions (like _patchAlefFinalPage) can call it
  window._installFsButtons = _installFsButtons;

  window._fsRescaleCurrent = function() {
    if (_currentFsSection) _applyZoom(_currentFsSection);
  };

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(_installFsButtons, 300);
  });
  const ls = document.getElementById('letter-screen');
  if (ls) {
    new MutationObserver(() => _installFsButtons())
      .observe(ls, { attributes: true, attributeFilter: ['style'] });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      const lsLate = document.getElementById('letter-screen');
      if (lsLate) new MutationObserver(() => _installFsButtons())
        .observe(lsLate, { attributes: true, attributeFilter: ['style'] });
    });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(_installFsButtons, 500);
  }
  window.addEventListener('load', () => setTimeout(_installFsButtons, 300));
})();

/* ============================================================
   14 & 15. 🔲 UNIFIED FULLSCREEN MODE (CLEAN & SEPARATED)
============================================================ */
(function initUnifiedFullscreen() {
  let _currentFsSection = null;

  // القائمة المحدثة بتسلسل السكاشن للأسهم
  // letter-screen sections (default/classic)
  const GAME_SECTIONS_LETTER = [
    '2-motors', // سكشن تعريف الموتورات الجديد
    '2',        // سكشن لعبة السيارة
    '3', '4', '5', '6', '6.5', '6.75', '6.89', '6.91', '7', '8', '9', '10', 'detective'
  ];
  // advanced-level screens (Sukoon/Madd/Shadda/Tanween)
  // NOTE: currently only Sukoon has the full section set refactored.
  // Madd/Shadda/Tanween will gain matching ids in a follow-up pass.
  const GAME_SECTIONS_ADVANCED = {
    sukoon: [
      'sukoon-2', 'sukoon-3', 'sukoon-4-cards', 'sukoon-5', 'sukoon-4',
      'sukoon-wheel', 'sukoon-memory', 'sukoon-speed', 'sukoon-cups',
      'sukoon-missing', 'sukoon-story', 'sukoon-xo', 'sukoon-quran', 'sukoon-detective',
    ],
    madd: [
      'madd-2-motors', 'madd-2', 'madd-3', 'madd-4',
      'madd-wheel', 'madd-memory', 'madd-speed', 'madd-cups',
      'madd-missing', 'madd-story', 'madd-xo', 'madd-quran',
    ],
    shadda: [
      'shadda-2-motors', 'shadda-2', 'shadda-3', 'shadda-4',
      'shadda-wheel', 'shadda-memory', 'shadda-speed', 'shadda-cups',
      'shadda-missing', 'shadda-story', 'shadda-xo', 'shadda-quran',
    ],
    tanween: [
      'tanween-2-motors', 'tanween-2', 'tanween-3', 'tanween-4',
      'tanween-wheel', 'tanween-memory', 'tanween-speed', 'tanween-cups',
      'tanween-missing', 'tanween-story', 'tanween-xo', 'tanween-quran',
    ],
  };
  // Back-compat alias
  const GAME_SECTIONS = GAME_SECTIONS_LETTER;

  // Pick the active section-list depending on which screen the section sits inside
  function _currentSectionList(section) {
    if (!section) return GAME_SECTIONS_LETTER;
    const screen = section.closest('#sukoon-screen, #madd-screen, #shadda-screen, #tanween-screen, #letter-screen');
    if (!screen) return GAME_SECTIONS_LETTER;
    if (screen.id === 'sukoon-screen')  return GAME_SECTIONS_ADVANCED.sukoon;
    if (screen.id === 'madd-screen')    return GAME_SECTIONS_ADVANCED.madd;
    if (screen.id === 'shadda-screen')  return GAME_SECTIONS_ADVANCED.shadda;
    if (screen.id === 'tanween-screen') return GAME_SECTIONS_ADVANCED.tanween;
    return GAME_SECTIONS_LETTER;
  }

  function _enterFullscreen(section) {
    if (_currentFsSection && _currentFsSection !== section) {
      _exitFullscreen(_currentFsSection);
    }
    _currentFsSection = section;
    section.classList.add('fs-section-active');
    document.documentElement.classList.add('has-fs-section');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        _applyZoom(section);
        _ensureNavArrows(section);
    });
    window.addEventListener('resize', _onResize);
    try { playClickPro && playClickPro(); } catch (e) {}
  }

function _exitFullscreen(section, keepFs) {
    if (!section) return;
    section.classList.remove('fs-section-active');

    const wrapper = section.querySelector('.fs-content-wrapper');
    if (wrapper) {
        wrapper.style.cssText = ''; // مسح كل التنسيقات المؤقتة
    }

    const gameContainer = section.querySelector('[id$="game-container"]');
    if (gameContainer) {
      gameContainer.style.width = '';
      gameContainer.style.height = '';
      gameContainer.style.maxWidth = '';
      gameContainer.style.margin = '';
      gameContainer.style.aspectRatio = '';
    }

    section.querySelectorAll('.fs-nav-arrow').forEach(a => a.remove());

    if (_currentFsSection === section) _currentFsSection = null;
    if (!keepFs && !_currentFsSection) {
      document.documentElement.classList.remove('has-fs-section');
      document.body.style.overflow = '';
      window.removeEventListener('resize', _onResize);
    }

    // إجبار المتصفح على إعادة توزيع العناصر (Force Layout Refresh)
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        _refreshPhaser();
    }, 100);
}

  function _onResize() {
    if (_currentFsSection) _applyZoom(_currentFsSection);
  }

  function _applyZoom(section) {
    const wrapper = section.querySelector('.fs-content-wrapper');
    if (!wrapper) return;
    wrapper.style.cssText = '';

    const gameContainer = wrapper.querySelector('[id$="game-container"]');

    if (gameContainer) {
      // 🚗 وضع لعبة السيارة - الآن ستأخذ الشاشة كاملة لأن السكشن مخصص لها فقط
      const motorsBox = wrapper.querySelector('.motors-box');
      const sectionHeading = wrapper.querySelector('.section-heading');
      const motorsH = motorsBox ? motorsBox.offsetHeight : 0;
      const headingH = sectionHeading ? sectionHeading.offsetHeight : 0;
      const topPadding = 40 + headingH + 14 + motorsH + 14;

      const availW = window.innerWidth - 100;
      const fsAvailH = Math.max(240, window.innerHeight - topPadding - 60);
      const availH = window.innerHeight - 120; // ترك مساحة للعنوان والأسهم
      const aspect = 1000 / 600;

      let w = availW;
      let h = w / aspect;
      if (h > fsAvailH) {
        h = fsAvailH;
        w = h * aspect;
      }
      if (w < 600) { w = 600; h = w / aspect; }

      gameContainer.style.width = w + 'px';
      gameContainer.style.height = h + 'px';
      gameContainer.style.maxWidth = 'none';
      gameContainer.style.margin = '0 auto';

      wrapper.style.display = 'block';
      wrapper.style.maxWidth = w + 'px';
      wrapper.style.width = '100%';
      wrapper.style.margin = '0 auto';

      _refreshPhaser();
    } else {
      // 🧩 وضع الأقسام الأخرى (تعريف الموتور، XO، إلخ)
      const REF_WIDTH = 1200;
      wrapper.style.display = 'block';
      wrapper.style.width = REF_WIDTH + 'px';
      wrapper.style.maxWidth = REF_WIDTH + 'px';
      wrapper.offsetHeight;

      const naturalH = wrapper.scrollHeight || wrapper.offsetHeight || 500;
      const availW = window.innerWidth - 160;
      const availH = window.innerHeight - 60;

      let scale = Math.min(availW / REF_WIDTH, availH / naturalH);
      if (scale > 2.0) scale = 2.0;
      if (scale < 1.0) scale = 1.0;

      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = 'center top';
      wrapper.style.height = (naturalH * scale) + 'px';
    }
  }

  function _refreshPhaser() {
    try {
      const game = (typeof PhaserManager !== 'undefined' && PhaserManager.getGame) ? PhaserManager.getGame() : phaserGame;
      if (game && game.scale && typeof game.scale.refresh === 'function') {
        setTimeout(() => game.scale.refresh(), 50);
        setTimeout(() => game.scale.refresh(), 200);
      }
    } catch (e) {}
    setTimeout(() => window.dispatchEvent(new Event('resize')), 80);
  }

  function _ensureNavArrows(section) {
    if (section.querySelector('.fs-nav-arrow')) return;
    let currentSec = section.getAttribute('data-section');
    // تعيين افتراضي للعبة السيارات المتقدمة إذا لم يوجد سكشن مرقم
    if (!currentSec && section.querySelector('[id$="game-container"]')) currentSec = '2';

    const sectionList = _currentSectionList(section);
    const idx = sectionList.indexOf(currentSec);

    if (idx > 0) {
      const prev = document.createElement('button');
      prev.className = 'fs-nav-arrow fs-nav-prev';
      prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prev.onclick = (e) => { e.stopPropagation(); _navTo(idx - 1, sectionList); };
      section.appendChild(prev);
    }
    if (idx < sectionList.length - 1 && idx !== -1) {
      const next = document.createElement('button');
      next.className = 'fs-nav-arrow fs-nav-next';
      next.innerHTML = '<i class="fas fa-chevron-right"></i>';
      next.onclick = (e) => { e.stopPropagation(); _navTo(idx + 1, sectionList); };
      section.appendChild(next);
    }
  }

  function _navTo(idx, sectionList) {
    sectionList = sectionList || GAME_SECTIONS_LETTER;
    if (idx < 0 || idx >= sectionList.length) return;
    const targetSec = sectionList[idx];
    let targetEl = document.querySelector(`.step-section[data-section="${targetSec}"]`);
    if (!targetEl && targetSec === '2') {
        targetEl = document.querySelector('.step-section [id$="game-container"]').closest('.step-section');
    }
    if (!targetEl) return;
    _enterFullscreen(targetEl);
  }

  function _addFsButton(section) {
    if (section.querySelector('.fs-toggle-btn')) return;
    if (!section.querySelector('.fs-content-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'fs-content-wrapper';
      while (section.firstChild) wrapper.appendChild(section.firstChild);
      section.appendChild(wrapper);
    }
    const btn = document.createElement('button');
    btn.className = 'fs-toggle-btn';
    btn.innerHTML = '<i class="fas fa-expand fs-icon-expand"></i><i class="fas fa-compress fs-icon-compress"></i>';
    btn.onclick = (e) => {
        e.stopPropagation();
        if (section.classList.contains('fs-section-active')) _exitFullscreen(section);
        else _enterFullscreen(section);
    };
    section.appendChild(btn);
  }

function _installFsButtons() {
    document.querySelectorAll('.step-section').forEach(sec => {
      const secNum = sec.getAttribute('data-section');
      const hasNextBtn = sec.querySelector('.next-level-btn'); // هل يحتوي على زر التالي؟

      // لا تضف زر التكبير للسكشن 0 أو 1، ولا تضيفه للسكشن الذي يحتوي على زر الانتقال
      if (secNum !== '0' && secNum !== '1' && !(secNum && secNum.endsWith('-selectors')) && !hasNextBtn) {
          _addFsButton(sec);
      }
    });

    document.querySelectorAll('[id$="game-container"]').forEach(gc => {
        const sec = gc.closest('.step-section');
        if (sec && !sec.querySelector('.next-level-btn')) _addFsButton(sec);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && _currentFsSection) _exitFullscreen(_currentFsSection);
  });

  document.addEventListener('DOMContentLoaded', () => setTimeout(_installFsButtons, 300));
  if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(_installFsButtons, 500);

  // حارس لحذف الزر الأخضر الداخلي
  new MutationObserver(() => {
      document.querySelectorAll('.phaser-fs-btn').forEach(b => b.remove());
  }).observe(document.body, { childList: true, subtree: true });

})();



// دالة رسم النقاط الوهمية
function generateDotsHTML(desc, color, letter) {
    if (!desc || desc.includes('بدون')) return '';
    let count = 1;
    if (desc.includes('نقطتان')) count = 2;
    if (desc.includes('٣') || desc.includes('3')) count = 3;
    let pos = desc.includes('تحت') ? 'b' : 't';
    let cls = `pos-${pos}${count} letter-${letter}`;
    let dotsHtml = '';
    for(let i = 0; i < count; i++) {
        dotsHtml += `<div class="g-dot"></div>`;
    }
    return `<div class="glow-dots-container ${cls}" style="color: ${color};">${dotsHtml}</div>`;
}


// --- دوال لعبة صِد الحرف (Catch the Target) ---
let _spyHits = 0;
function initSpyGame(target, spy) {
    _spyHits = 0;
    const grid = document.getElementById('ui-spy-grid');
    if (!grid) return;

    // إنشاء 6 خلايا (3 صحيحة و 3 خطأ بشكل عشوائي)
    let pool = [target, target, target, spy, spy, spy];
    pool.sort(() => 0.5 - Math.random());

    grid.innerHTML = pool.map((char, i) => `
        <div class="spy-cell" onclick="handleSpyClick(this, '${char}', '${target}')">${char}</div>
    `).join('');
}

function handleSpyClick(cell, char, target) {
    if (cell.classList.contains('target-hit') || cell.classList.contains('spy-hit')) return;

    if (char === target) {
        cell.classList.add('target-hit');
        _spyHits++;
        try { playTone(800, 'triangle', 0.1); setTimeout(() => playTone(1200, 'triangle', 0.15), 100); } catch(e){}

        if (_spyHits >= 3) {
            setTimeout(() => {
                try { playVictorySound(); fireConfetti(); addStars(5); } catch(e){}
                showToast('🎉 أحسنت! صدت الحرف المطلوب!', 3000);
            }, 400);
        }
    } else {
        cell.classList.add('spy-hit');
        try { playTone(200, 'sawtooth', 0.3); } catch(e){}
        setTimeout(() => cell.classList.remove('spy-hit'), 400);
    }
}

// دالة تهيئة قسم المحقق (النسخة الاحترافية ثنائية اللغة 🌍 + أسماء الحروف)
function renderDetectiveSection(key) {
    const data = lettersDB[key];
    const sec = document.getElementById('section-detective');
    if (!sec) return;

    if (!data || !data.detective) {
        sec.style.display = 'none';
        return;
    }

    sec.style.display = 'flex';
    const detArray = Array.isArray(data.detective) ? data.detective : [data.detective];

    const dynContainer = document.getElementById('det-dynamic-container');
    const shapesContainer = document.getElementById('ui-shapes-compare');

    dynContainer.innerHTML = '';
    if (shapesContainer) shapesContainer.innerHTML = '';

    const colorTarget = '#e67e22';
    const colorComp = '#3498db';

    detArray.forEach((det, index) => {
        const subTitle = det.type === 'visual'
            ? 'Differences in dots and drawing — الفرق في النقاط والرسوم'
            : 'Differences in pronunciation — الفرق في طريقة النطق والمخرج';

        const twinTypeTitle = det.type === 'visual'
            ? 'Visual Twins — شكل التوائم'
            : 'Sound Twins — التوائم الصوتية';

        let html = `
            <div style="margin-top: ${index > 0 ? '50px' : '10px'};">
                <div class="det-header-sub" style="color:var(--green); font-weight:900; direction:ltr;">${twinTypeTitle}</div>
                <div class="det-header-sub" style="font-size:0.95rem; direction:ltr;">${subTitle}</div>
        `;

        if (det.type === 'visual') {
            // 💡 التعديل هنا: سحب أسماء الحروف الإنجليزية من القاموس
            const nameTarget = LETTER_NAMES_EN[det.target] || '';
            const nameComp = LETTER_NAMES_EN[det.compareWith] || '';

            html += `
            <div class="visual-twins-box">
                <div style="text-align:center;">
                    <div class="twin-wrapper">
                        <div class="twin-char">${det.target}</div>
                        ${generateDotsHTML(det.dots.target, colorTarget, det.target)}
                    </div>
                    <div class="twin-desc" style="color:${colorTarget}; direction:ltr; font-family:'Tajawal', sans-serif;">${nameTarget} — ${det.target}</div>
                </div>
                <button class="lens-btn" onclick="revealVisualDotsDyn(this)"><i class="fas fa-search"></i></button>
                <div style="text-align:center;">
                    <div class="twin-wrapper">
                        <div class="twin-char">${det.compareWith}</div>
                        ${generateDotsHTML(det.dots.compare, colorComp, det.compareWith)}
                    </div>
                    <div class="twin-desc" style="color:${colorComp}; direction:ltr; font-family:'Tajawal', sans-serif;">${nameComp} — ${det.compareWith}</div>
                </div>
            </div>`;
        } else {
            const lLabel = (det.labels && det.labels.light) ? det.labels.light : 'Light / مرقق';
            const hLabel = (det.labels && det.labels.heavy) ? det.labels.heavy : 'Heavy / مفخم';
            const lChar = (det.weight && det.weight.light) ? det.weight.light : det.compareWith;
            const hChar = (det.weight && det.weight.heavy) ? det.weight.heavy : det.target;

            html += `
            <div class="sound-twins-container">
              <div class="sound-twin-card">
                <i class="fas fa-feather-alt sound-icon" style="color:#94a3b8;"></i>
                <div class="sound-label" style="direction:ltr;">${lLabel}</div>
                <div class="sound-char char-light-glow" style="color:var(--green);">${lChar}</div>
                <button class="sound-play-btn" onclick="speakAr('${lChar}'); try{playTone(600, 'sine', 0.2, 0.1);}catch(e){}">
                  <i class="fas fa-play-circle"></i> صوت
                </button>
              </div>

              <div class="sound-twin-card">
                <i class="fas fa-weight-hanging sound-icon" style="color:#b45309;"></i>
                <div class="sound-label" style="direction:ltr;">${hLabel}</div>
                <div class="sound-char char-heavy-glow" style="color:var(--red);">${hChar}</div>
                <button class="sound-play-btn" onclick="speakAr('${hChar}'); try{playTone(150, 'sine', 0.4, 0.2);}catch(e){}">
                  <i class="fas fa-play-circle"></i> صوت
                </button>
              </div>
            </div>`;
        }

        const targetShapes = lettersDB[det.target]?.shapes;
        const compShapes = lettersDB[det.compareWith]?.shapes;
        if (targetShapes && compShapes) {
            const labels = [
                { en: 'Beginning', ar: 'أول الكلمة' },
                { en: 'Middle', ar: 'وسط الكلمة' },
                { en: 'End', ar: 'آخر الكلمة' },
                { en: 'Isolated', ar: 'مُنفصل' }
            ];
            html += `
                <div style="text-align:center; margin: 30px 0 15px; font-weight:900; color:var(--text-muted); font-family:'Tajawal', sans-serif; font-size: 1.1rem; border-top:2px dashed var(--border); padding-top:20px; direction:ltr;">
                    Shapes in Context — مقارنة الأشكال (${det.target} / ${det.compareWith})
                </div>
                <div class="shapes-compare-grid">
                    ${labels.map((label, i) => `
                        <div class="sc-card">
                            <div class="sc-title" style="line-height:1.4; direction:ltr;">
                                ${label.en}<br><span style="font-size:0.85rem; font-weight:normal;">${label.ar}</span>
                            </div>
                            <div class="sc-chars">
                                <span style="color:${colorTarget};">${targetShapes[i]}</span>
                                <span class="sc-dash">-</span>
                                <span style="color:${colorComp};">${compShapes[i]}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

            `;
        }

        html += `</div>`;
        dynContainer.innerHTML += html;
    });
}

// دالة التوهج الديناميكية (تعمل مع أي عدسة مكبرة في الشاشة)
function revealVisualDotsDyn(btn) {
    const box = btn.closest('.visual-twins-box');
    const chars = box.querySelectorAll('.twin-char');
    const dotsAndDesc = box.querySelectorAll('.glow-dots-container, .twin-desc');

    let isRevealed = false;
    chars.forEach(c => {
        c.classList.toggle('dimmed');
        if(c.classList.contains('dimmed')) isRevealed = true;
    });

    dotsAndDesc.forEach(el => {
        if (isRevealed) el.classList.add('active');
        else el.classList.remove('active');
    });

    if (isRevealed) {
        try { playTone(800, 'sine', 0.15); setTimeout(()=>playTone(1200, 'sine', 0.2), 100); } catch(e){}
    } else {
        try { playTone(400, 'sine', 0.1); } catch(e){}
    }
}

(function () {
  function patchLaunchPhaser() {
    if (typeof window._launchPhaser !== 'function' || window._launchPhaser.__responsiveSafe) {
      return;
    }

    const originalLaunch = window._launchPhaser;

    window._launchPhaser = function responsiveSafeLaunch(parentId, scenes, h) {
      const container = document.getElementById(parentId);

      if (!container) {
        console.warn('Phaser container not found:', parentId);
        return;
      }

      container.classList.add('phaser-ready-target');

      if (typeof window.Phaser === 'undefined') {
        setTimeout(function () {
          window._launchPhaser(parentId, scenes, h);
        }, 150);
        return;
      }

      let attempts = 0;
      const waitForVisibleContainer = function () {
        const rect = container.getBoundingClientRect();

        if ((rect.width < 80 || rect.height < 80) && attempts < 14) {
          attempts += 1;
          setTimeout(waitForVisibleContainer, 80);
          return;
        }

        originalLaunch(parentId, scenes, h);

        setTimeout(function () {
          const game = window.phaserGame || (window.PhaserManager && window.PhaserManager.getGame && window.PhaserManager.getGame());
          if (!game || !game.scale) return;

          try {
            game.scale.refresh();
            if (game.canvas) {
              game.canvas.style.touchAction = 'none';
              game.canvas.setAttribute('aria-label', 'Interactive Arabic learning game');
            }
          } catch (e) {}
        }, 120);
      };

      waitForVisibleContainer();
    };

    window._launchPhaser.__responsiveSafe = true;

    try {
      _launchPhaser = window._launchPhaser;
    } catch (e) {}
  }

  function makeLetterButtonsInputSafe() {
    const prepareButtons = function () {
      document.querySelectorAll('.letter-btn').forEach(function (button) {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        if (!button.getAttribute('aria-label')) {
          const letter = button.querySelector('.l-char');
          const name = button.querySelector('.l-name');
          const locked = button.classList.contains('locked') ? ' locked' : '';
          button.setAttribute('aria-label', ((letter && letter.textContent) || 'Letter') + ' ' + ((name && name.textContent) || '') + locked);
        }
      });
    };

    document.addEventListener('keydown', function (event) {
      const target = event.target;
      if (!target || !target.classList || !target.classList.contains('letter-btn')) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;

      event.preventDefault();
      target.click();
    });

    const grid = document.getElementById('alphabetGrid');
    if (grid && window.MutationObserver) {
      new MutationObserver(prepareButtons).observe(grid, { childList: true });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', prepareButtons, { once: true });
    } else {
      prepareButtons();
    }
  }

  function refreshVisibleGameCanvas() {
    const refresh = function () {
      const game = window.phaserGame || (window.PhaserManager && window.PhaserManager.getGame && window.PhaserManager.getGame());
      if (game && game.scale) {
        try { game.scale.refresh(); } catch (e) {}
      }
    };

    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('orientationchange', function () {
      setTimeout(refresh, 250);
    }, { passive: true });
  }

  patchLaunchPhaser();
  makeLetterButtonsInputSafe();
  refreshVisibleGameCanvas();
})();
/* ================================================================
   HASH ROUTER — Fix #5
   Browser back / forward now works between screens.
   ================================================================ */
(function initHashRouter() {
  var _busy = false;

  window._pushRoute = function(hash) {
    if (window.location.hash === hash) return;
    _busy = true;
    window.location.hash = hash;
    setTimeout(function() { _busy = false; }, 60);
  };

  function _handleRoute() {
    if (_busy) return;
    if (!window.studentCode) return;

    var hash = window.location.hash;

    if (hash === '#dashboard') {
      if (typeof ALL_SCREENS !== 'undefined') {
        ALL_SCREENS.forEach(function(sid) {
          var el = document.getElementById(sid);
          if (el) { el.style.display = 'none'; el.style.opacity = '0'; }
        });
      }
      if (typeof _navShowBack === 'function') _navShowBack(false);
      var ds = document.getElementById('dashboard-screen');
      if (ds) ds.style.display = 'block';
      return;
    }

    if (hash === '#arabic') {
      var ds2 = document.getElementById('dashboard-screen');
      if (ds2) ds2.style.display = 'none';
      if (typeof _navShowBack === 'function') _navShowBack(true);
      if (typeof _showScreen === 'function') _showScreen('home-screen');
      setTimeout(function() {
        if (typeof alignMapPointer === 'function') alignMapPointer();
      }, 100);
      return;
    }

    if (hash === '#verb-lab') {
      var dsVerb = document.getElementById('dashboard-screen');
      if (dsVerb) dsVerb.style.display = 'none';
      if (typeof _showScreen === 'function') _showScreen('verb-lab-screen');
      if (typeof loadVerbLabFrame === 'function') loadVerbLabFrame();
      if (typeof _navShowBack === 'function') _navShowBack(true);
      return;
    }

    if (hash.startsWith('#letter-')) {
      var key = decodeURIComponent(hash.slice(8));
      if (key && typeof lettersDB !== 'undefined' && lettersDB[key]) {
        if (typeof openLetter === 'function') openLetter(key);
      }
      return;
    }
  }

  window.addEventListener('hashchange', _handleRoute);
})();

/* ================================================================
   NAV v2 JS — Tools drawer, breadcrumb, section nav, tab bar
   ================================================================ */

// Tools drawer toggle
window._toggleToolsDrawer = function() {
  var drawer = document.getElementById('tools-drawer');
  var overlay = document.getElementById('tools-scrim') || document.getElementById('tools-overlay');
  if (!drawer) return;
  var isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  if (overlay) overlay.classList.toggle('open', !isOpen);
  drawer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
};

// Breadcrumb updater — called from _showScreen or navigation functions
window._updateNavBreadcrumb = function(screen, context) {
  var bc = document.getElementById('nav-breadcrumb') || document.getElementById('navBreadcrumb');
  if (!bc) return;
  var parts = [{ label: 'جامع', cls: 'bc-item' }];
  if (screen === 'home-screen') {
    parts.push({ label: 'العربية', cls: 'bc-current' });
  } else if (screen === 'letter-screen') {
    parts.push({ label: 'العربية', cls: 'bc-item' });
    parts.push({ label: context || 'حرف', cls: 'bc-current' });
  } else if (screen === 'sukoon-screen') {
    parts.push({ label: 'السكون', cls: 'bc-current' });
  } else if (screen === 'madd-screen') {
    parts.push({ label: 'المد', cls: 'bc-current' });
  } else if (screen === 'shadda-screen') {
    parts.push({ label: 'الشدة', cls: 'bc-current' });
  } else if (screen === 'tanween-screen') {
    parts.push({ label: 'التنوين', cls: 'bc-current' });
  }
  bc.innerHTML = parts.map(function(p, i) {
    var sep = i < parts.length - 1 ? '<span class="bc-sep">‹</span>' : '';
    return '<span class="' + p.cls + '">' + p.label + '</span>' + sep;
  }).join('');
};

// Section prev/next navigation (wraps existing dot scroll logic)
window._navSection = function(delta) {
  var dots = document.querySelectorAll('#sec-dots .dot, #sectionDots .dot');
  if (!dots.length) return;
  var current = -1;
  dots.forEach(function(d, i) { if (d.classList.contains('active') || d.classList.contains('current')) current = i; });
  var next = current + delta;
  if (next < 0 || next >= dots.length) return;
  dots[next].click();
};

// Tab bar handlers
window._tabHome = function() {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  var t = document.getElementById('tab-home');
  if (t) t.classList.add('active');
  if (typeof goHome === 'function') goHome();
};
window._tabProgress = function() {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  var t = document.getElementById('tab-progress');
  if (t) t.classList.add('active');
};
window._tabMe = function() {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  var t = document.getElementById('tab-me');
  if (t) t.classList.add('active');
};

// Patch _showScreen to add/remove nav-open class and update breadcrumb
(function patchShowScreen() {
  var _orig = window._showScreen;
  if (typeof _orig !== 'function') {
    setTimeout(patchShowScreen, 200);
    return;
  }
  window._showScreen = function(id) {
    _orig.call(this, id);
    document.body.classList.add('nav-open');
    _updateNavBreadcrumb(id);
  };
})();

// Patch loginStudent / openArabicJourney to apply nav-open immediately
(function patchLogin() {
  var _origLogin = window.loginStudent;
  if (typeof _origLogin === 'function') {
    window.loginStudent = function() {
      var result = _origLogin.apply(this, arguments);
      return Promise.resolve(result).then(function(ok) {
        if (ok === false || !window.studentCode) return ok;
        document.body.classList.add('nav-open');
        var tabMeName = document.getElementById('tab-me-name');
        if (tabMeName && window.studentCode) tabMeName.textContent = window.studentCode;
        return ok;
      });
    };
  }
})();


/* ================================================================
   APP NAV v3 JS
   ================================================================ */
(function() {
  'use strict';

  /* ── State ── */
  var _navVisible = false;
  var _drawerOpen = false;
  var _dropdownOpen = false;
  var _currentScreen = '';

  /* ── Init: called after login ── */
  window._navInit = function(studentName) {
    var nav = document.getElementById('app-nav');
    if (!nav) return;
    nav.classList.add('nav-visible');
    document.body.classList.add('nav-open');
    _navVisible = true;

    // Show bottom tabs on mobile
    var tabs = document.getElementById('bottom-tab-bar');
    if (tabs) {
      document.body.classList.add('tabs-visible');
    }

    // Patch studentName chips
    var nameEl = document.getElementById('nav-student-name');
    var tabNameEl = document.getElementById('tab-name');
    if (studentName) {
      if (nameEl) nameEl.textContent = studentName;
      if (tabNameEl) tabNameEl.textContent = studentName;
    }
  };

  /* ── Back button visibility ── */
  window._navShowBack = function(show) {
    var btn = document.getElementById('nav-back-btn');
    if (!btn) return;
    if (show) btn.classList.add('shown');
    else btn.classList.remove('shown');
  };

  /* ── Breadcrumb ── */
  window._navSetBreadcrumb = function(parts) {
    var bc = document.getElementById('nav-breadcrumb');
    if (!bc) return;
    bc.innerHTML = parts.map(function(p, i) {
      var cls = (i === parts.length - 1) ? 'bc-crumb active' : 'bc-crumb';
      var sep = (i < parts.length - 1) ? '<span class="bc-sep">‹</span>' : '';
      return '<span class="' + cls + '">' + p + '</span>' + sep;
    }).join('');
  };

  /* ── Screen change hook ── */
  window._navOnScreen = function(screenId, context) {
    _currentScreen = screenId;
    var sectionNav = document.getElementById('section-nav');

    if (screenId === 'dashboard-screen') {
      _navShowBack(false);
      _navSetBreadcrumb(['جامع']);
      _setActiveTab('tab-home');
      if (sectionNav) sectionNav.classList.remove('visible');
    } else if (screenId === 'home-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'العربية']);
      _setActiveTab('tab-home');
      if (sectionNav) sectionNav.classList.remove('visible');
    } else if (screenId === 'verb-lab-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'مختبر الأفعال']);
      _setActiveTab('tab-home');
      if (sectionNav) sectionNav.classList.remove('visible');
    } else if (screenId === 'letter-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'العربية', context || 'حرف']);
      _setActiveTab('tab-home');
      if (sectionNav) sectionNav.classList.add('visible');
    } else if (screenId === 'sukoon-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'السكون']);
      if (sectionNav) sectionNav.classList.add('visible');
    } else if (screenId === 'madd-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'المد']);
      if (sectionNav) sectionNav.classList.add('visible');
    } else if (screenId === 'shadda-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'الشدة']);
      if (sectionNav) sectionNav.classList.add('visible');
    } else if (screenId === 'tanween-screen') {
      _navShowBack(true);
      _navSetBreadcrumb(['جامع', 'التنوين']);
      if (sectionNav) sectionNav.classList.add('visible');
    }
  };

  /* ── Tools: desktop dropdown ── */
  window._navToggleDropdown = function(e) {
    if (e) e.stopPropagation();
    var dd = document.getElementById('nav-tools-dropdown');
    if (!dd) { _openMobileDrawer(); return; }
    _dropdownOpen = !_dropdownOpen;
    dd.classList.toggle('open', _dropdownOpen);
  };

  document.addEventListener('click', function() {
    if (_dropdownOpen) {
      var dd = document.getElementById('nav-tools-dropdown');
      if (dd) dd.classList.remove('open');
      _dropdownOpen = false;
    }
  });

  /* ── Tools: mobile drawer ── */
  function _openMobileDrawer() {
    var drawer = document.getElementById('tools-drawer');
    var scrim  = document.getElementById('tools-scrim');
    if (!drawer) return;
    _drawerOpen = true;
    drawer.classList.add('open');
    if (scrim) scrim.classList.add('open');
  }
  window._closeMobileDrawer = function() {
    var drawer = document.getElementById('tools-drawer');
    var scrim  = document.getElementById('tools-scrim');
    _drawerOpen = false;
    if (drawer) drawer.classList.remove('open');
    if (scrim)  scrim.classList.remove('open');
  };

  /* Tools button: desktop → dropdown, mobile → drawer */
  window._navToolsBtn = function(e) {
    if (window.innerWidth >= 768) {
      _navToggleDropdown(e);
    } else {
      _openMobileDrawer();
    }
  };

  /* ── Section prev/next ── */
  window._navSection = function(delta) {
    var dots = document.querySelectorAll('#sec-dots .dot');
    if (!dots.length) {
      // Fallback to old sectionDots
      dots = document.querySelectorAll('#sectionDots .dot');
    }
    if (!dots.length) return;
    var current = -1;
    dots.forEach(function(d, i) { if (d.classList.contains('active') || d.classList.contains('current')) current = i; });
    var next = current + delta;
    if (next >= 0 && next < dots.length) dots[next].click();
    _updateSecArrows(next, dots.length);
  };

  function _updateSecArrows(current, total) {
    var prev = document.getElementById('sec-prev');
    var next = document.getElementById('sec-next');
    if (prev) prev.disabled = (current <= 0);
    if (next) next.disabled = (current >= total - 1);
  }

  /* Watch dot changes to update arrows */
  var _dotObserver = null;
  function _watchDots() {
    var container = document.getElementById('sec-dots') || document.getElementById('sectionDots');
    if (!container) return;
    if (_dotObserver) _dotObserver.disconnect();
    _dotObserver = new MutationObserver(function() {
      var dots = container.querySelectorAll('.dot');
      var current = -1;
      dots.forEach(function(d,i){ if (d.classList.contains('active') || d.classList.contains('current')) current = i; });
      _updateSecArrows(current, dots.length);
    });
    _dotObserver.observe(container, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }
  setTimeout(_watchDots, 800);

  /* ── Tab bar ── */
  function _setActiveTab(id) {
    document.querySelectorAll('.tab-item').forEach(function(t){ t.classList.remove('active'); });
    var el = document.getElementById(id);
    if (el) el.classList.add('active');
  }
  window._tabGoHome = function() {
    _setActiveTab('tab-home');
    if (typeof goHome === 'function') goHome();
    else if (typeof openArabicJourney === 'function') openArabicJourney();
  };
  window._tabProgress = function() { _setActiveTab('tab-progress'); };
  window._tabTools    = function() { _openMobileDrawer(); };
  window._tabMe       = function() { _setActiveTab('tab-me'); };

  /* ── Patch loginStudent ── */
  var _loginPatched = false;
  function _patchLogin() {
    if (_loginPatched) return;
    if (typeof window.loginStudent !== 'function') { setTimeout(_patchLogin, 300); return; }
    _loginPatched = true;
    var _origLogin = window.loginStudent;
    window.loginStudent = function() {
      var result = _origLogin.apply(this, arguments);
      return Promise.resolve(result).then(function(ok) {
        if (ok === false || !window.studentCode) return ok;
        var sc = window.studentCode || '';
        _navInit(sc);
        _navOnScreen('dashboard-screen');
        return ok;
      });
    };
  }
  _patchLogin();

  /* ── Patch _showScreen / openArabicJourney / backToDashboard ── */
  var _screenPatched = false;
  function _patchScreenFns() {
    if (_screenPatched) return;
    if (typeof window._showScreen !== 'function') { setTimeout(_patchScreenFns, 300); return; }
    _screenPatched = true;

    var _origShow = window._showScreen;
    window._showScreen = function(id) {
      _origShow.call(this, id);
      _navOnScreen(id);
    };

    var _origOAJ = window.openArabicJourney;
    if (typeof _origOAJ === 'function') {
      window.openArabicJourney = function() {
        _origOAJ.apply(this, arguments);
        _navOnScreen('home-screen');
        _navShowBack(true);
      };
    }

    var _origBTD = window.backToDashboard;
    if (typeof _origBTD === 'function') {
      window.backToDashboard = function() {
        _origBTD.apply(this, arguments);
        _navOnScreen('dashboard-screen');
      };
    }

    var _origOL = window.openLetter;
    if (typeof _origOL === 'function') {
      window.openLetter = function(key) {
        _origOL.apply(this, arguments);
        _navOnScreen('letter-screen', key);
      };
    }
  }
  _patchScreenFns();

  /* Stars count live update */
  var _starsEl = document.getElementById('nav-stars-count');
  if (_starsEl) {
    var _origStarsEl = document.getElementById('starsCount');
    if (_origStarsEl) {
      new MutationObserver(function() {
        _starsEl.textContent = _origStarsEl.textContent;
      }).observe(_origStarsEl, { childList: true });
    }
  }

})();

/* ── Smart Navbar: hide on scroll-down, show on scroll-up ── */
(function() {
  var lastY = 0;
  var ticking = false;
  var THRESHOLD = 6;

  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      var nav = document.getElementById('app-nav');
      if (nav && nav.classList.contains('nav-visible')) {
        var y = window.scrollY || window.pageYOffset;
        if (Math.abs(y - lastY) > THRESHOLD) {
          if (y > lastY && y > 80) {
            nav.classList.add('nav-hidden');
          } else {
            nav.classList.remove('nav-hidden');
          }
          lastY = y;
        }
      }
      ticking = false;
    });
  }, { passive: true });
})();


/* ============================================================
   🍅 POMODORO TIMER
   - Teacher sets session/break minutes; auto-loops if enabled
   - Ticks every 250ms for smooth display; emits transition flash
   - Persists settings + running state to localStorage so refresh
     during a session keeps the countdown honest
   ============================================================ */
(function pomodoroTimer() {
  const STORAGE_KEY = 'pomodoro_v1';

  /** mode: 'idle' | 'session' | 'break' | 'paused-session' | 'paused-break' */
  const state = {
    mode: 'idle',
    endsAt: 0,        // ms timestamp when current phase ends (when running)
    remainingMs: 0,   // ms remaining when paused
    sessionMs: 15 * 60 * 1000,
    breakMs: 1 * 60 * 1000,
    autoLoop: true,
    tickId: 0,
  };

  function $(id) { return document.getElementById(id); }
  function widget() { return $('pomodoro-widget'); }
  function fmt(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const o = JSON.parse(raw);
      if (typeof o.sessionMin === 'number') state.sessionMs = o.sessionMin * 60 * 1000;
      if (typeof o.breakMin === 'number')   state.breakMs   = o.breakMin   * 60 * 1000;
      if (typeof o.autoLoop === 'boolean')  state.autoLoop  = o.autoLoop;
    } catch (e) {}
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        sessionMin: Math.round(state.sessionMs / 60000),
        breakMin:   Math.round(state.breakMs   / 60000),
        autoLoop:   state.autoLoop,
      }));
    } catch (e) {}
  }

  function applySettingsFromInputs() {
    const sIn = $('pomo-session-min');
    const bIn = $('pomo-break-min');
    const lIn = $('pomo-loop-toggle');
    if (sIn) state.sessionMs = (Math.max(1, Math.min(120, parseInt(sIn.value) || 15))) * 60 * 1000;
    if (bIn) state.breakMs   = (Math.max(1, Math.min(30,  parseInt(bIn.value) || 1)))  * 60 * 1000;
    if (lIn) state.autoLoop  = !!lIn.checked;
    saveSettings();
  }

  function syncInputsFromState() {
    const sIn = $('pomo-session-min');
    const bIn = $('pomo-break-min');
    const lIn = $('pomo-loop-toggle');
    if (sIn) sIn.value = String(Math.round(state.sessionMs / 60000));
    if (bIn) bIn.value = String(Math.round(state.breakMs   / 60000));
    if (lIn) lIn.checked = state.autoLoop;
  }

  function setBadgeMode(mode) {
    const w = widget();
    if (!w) return;
    if (mode === 'paused-session' || mode === 'paused-break') {
      w.dataset.state = 'paused';
    } else {
      w.dataset.state = mode;
    }
  }

  function updateDisplay() {
    let total, remaining;
    if (state.mode === 'idle') {
      total = state.sessionMs;
      remaining = state.sessionMs;
    } else if (state.mode === 'session') {
      total = state.sessionMs;
      remaining = state.endsAt - Date.now();
    } else if (state.mode === 'break') {
      total = state.breakMs;
      remaining = state.endsAt - Date.now();
    } else if (state.mode === 'paused-session') {
      total = state.sessionMs;
      remaining = state.remainingMs;
    } else if (state.mode === 'paused-break') {
      total = state.breakMs;
      remaining = state.remainingMs;
    }
    remaining = Math.max(0, remaining);

    const time = fmt(remaining);
    const pillTime = $('pomo-pill-time');
    const bigTime  = $('pomo-time-big');
    const fill     = $('pomo-progress-fill');
    const badge    = $('pomo-state-badge');
    const startBtn = $('pomo-start-btn');
    const startLabel = $('pomo-start-label');

    if (pillTime) pillTime.textContent = time;
    if (bigTime)  bigTime.textContent  = time;
    if (fill && total > 0) {
      const pct = ((total - remaining) / total) * 100;
      fill.style.width = pct + '%';
    }

    if (badge) {
      if      (state.mode === 'idle')           badge.textContent = '⏰ Ready — جاهز';
      else if (state.mode === 'session')        badge.textContent = '📚 Session — جلسة دراسة';
      else if (state.mode === 'break')          badge.textContent = '☕ Break — استراحة';
      else if (state.mode === 'paused-session') badge.textContent = '⏸ Paused (Session) — متوقف';
      else if (state.mode === 'paused-break')   badge.textContent = '⏸ Paused (Break) — متوقف';
    }

    if (startBtn && startLabel) {
      const running = (state.mode === 'session' || state.mode === 'break');
      startLabel.textContent = running ? 'Pause' : 'Start';
      startBtn.querySelector('i').className = running ? 'fas fa-pause' : 'fas fa-play';
    }
  }

  function startTick() {
    stopTick();
    state.tickId = setInterval(() => {
      const now = Date.now();
      if (state.mode === 'session' || state.mode === 'break') {
        if (now >= state.endsAt) {
          handleEndOfPhase();
          return;
        }
        updateDisplay();
      }
    }, 250);
  }

  function stopTick() {
    if (state.tickId) { clearInterval(state.tickId); state.tickId = 0; }
  }

  function handleEndOfPhase() {
    const finished = state.mode;
    stopTick();
    try { playToneEnhanced && playToneEnhanced(finished === 'session' ? 880 : 660, 'triangle', 0.4, 0.16); } catch (e) {}
    setTimeout(() => { try { playToneEnhanced && playToneEnhanced(finished === 'session' ? 1100 : 880, 'triangle', 0.4, 0.16); } catch (e) {} }, 250);
    setTimeout(() => { try { playToneEnhanced && playToneEnhanced(finished === 'session' ? 1320 : 990, 'triangle', 0.4, 0.16); } catch (e) {} }, 500);

    if (finished === 'session') {
      showFlash('☕', 'Time for a Break!', 'وقت الاستراحة!');
      if (state.autoLoop) {
        state.mode = 'break';
        state.endsAt = Date.now() + state.breakMs;
        setBadgeMode('break');
        startTick();
      } else {
        state.mode = 'idle';
        setBadgeMode('idle');
      }
    } else if (finished === 'break') {
      showFlash('📚', 'Back to Learning!', 'عودة للدراسة!');
      if (state.autoLoop) {
        state.mode = 'session';
        state.endsAt = Date.now() + state.sessionMs;
        setBadgeMode('session');
        startTick();
      } else {
        state.mode = 'idle';
        setBadgeMode('idle');
      }
    }
    updateDisplay();
  }

  function showFlash(icon, titleEn, titleAr) {
    let overlay = document.querySelector('.pomo-flash-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'pomo-flash-overlay';
      overlay.innerHTML = `
        <div class="pomo-flash-card">
          <div class="pomo-flash-icon"></div>
          <div class="pomo-flash-title"></div>
          <div class="pomo-flash-sub"></div>
        </div>`;
      document.body.appendChild(overlay);
    }
    overlay.querySelector('.pomo-flash-icon').textContent  = icon;
    overlay.querySelector('.pomo-flash-title').textContent = titleEn;
    overlay.querySelector('.pomo-flash-sub').textContent   = titleAr;
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    try { fireConfetti && fireConfetti(); } catch (e) {}
    setTimeout(() => overlay.classList.remove('is-visible'), 2400);
  }

  // Public controls
  window.pomodoroToggleExpand = function() {
    const w = widget();
    if (!w) return;
    w.classList.toggle('pomo-collapsed');
    if (!w.classList.contains('pomo-collapsed')) syncInputsFromState();
  };

  window.pomodoroStartPause = function() {
    applySettingsFromInputs();
    if (state.mode === 'idle') {
      state.mode = 'session';
      state.endsAt = Date.now() + state.sessionMs;
      setBadgeMode('session');
      startTick();
    } else if (state.mode === 'session' || state.mode === 'break') {
      // Pause
      state.remainingMs = Math.max(0, state.endsAt - Date.now());
      state.mode = state.mode === 'session' ? 'paused-session' : 'paused-break';
      setBadgeMode(state.mode);
      stopTick();
    } else if (state.mode === 'paused-session') {
      state.mode = 'session';
      state.endsAt = Date.now() + state.remainingMs;
      setBadgeMode('session');
      startTick();
    } else if (state.mode === 'paused-break') {
      state.mode = 'break';
      state.endsAt = Date.now() + state.remainingMs;
      setBadgeMode('break');
      startTick();
    }
    updateDisplay();
  };

  window.pomodoroReset = function() {
    stopTick();
    applySettingsFromInputs();
    state.mode = 'idle';
    state.endsAt = 0;
    state.remainingMs = 0;
    setBadgeMode('idle');
    updateDisplay();
  };

  // Wire up settings change listeners
  function wireSettings() {
    ['pomo-session-min', 'pomo-break-min'].forEach(id => {
      const el = $(id);
      if (!el) return;
      el.addEventListener('change', () => {
        applySettingsFromInputs();
        if (state.mode === 'idle') updateDisplay();
      });
    });
    const loop = $('pomo-loop-toggle');
    if (loop) loop.addEventListener('change', () => { applySettingsFromInputs(); });

    // Click outside panel to collapse
    document.addEventListener('click', (e) => {
      const w = widget();
      if (!w || w.classList.contains('pomo-collapsed')) return;
      if (!w.contains(e.target)) w.classList.add('pomo-collapsed');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    syncInputsFromState();
    setBadgeMode('idle');
    updateDisplay();
    wireSettings();
  });
})();
