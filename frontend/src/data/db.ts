export const ARABIC_LETTERS = [
    'أ','ب','ت','ث','ج','ح','خ',
    'د','ذ','ر','ز','س','ش','ص',
    'ض','ط','ظ','ع','غ','ف','ق',
    'ك','ل','م','ن','هـ','و','ي'
  ];
  export const LETTER_NAMES_EN = {
    'أ':'Alif', 'ب':'Ba',   'ت':'Ta (Light)',    'ث':'Tha',   'ج':'Jeem',
    'ح':'Ha (Throaty)',   'خ':'Kha',  'د':'Dal',   'ذ':'Thal (Light)',  'ر':'Ra',
    'ز':'Zay',  'س':'Seen (Light)', 'ش':'Sheen', 'ص':'Sad (Heavy)',   'ض':'Dad',
    'ط':'Ta (Heavy)',   'ظ':'Dha (Heavy)',  'ع':'Ain',   'غ':'Ghain', 'ف':'Fa',
    'ق':'Qaf',  'ك':'Kaf',  'ل':'Lam',   'م':'Meem',  'ن':'Noon',
    'هـ':'Ha (Light)',  'و':'Waw',  'ي':'Ya'
  };
  export const RAFISA   = ['أ','إ','آ','ا','د','ذ','ر','ز','و','ؤ'];
  export const UNLOCK_COST = 10;

  /* ============================================================
     CONNECTION RULES DATABASE
  ============================================================ */
  export const CONNECTION_RULES = {
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

  export function getLetterRule(letter: string) {
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
  export const QURAN_VERSES = {
    'أ': "﴿ اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ﴾",
    'ب': "﴿ تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ ﴾",
    'ت': "﴿ وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ ۝ وَهَٰذَا الْبَلَدِ الْأَمِينِ ۝ لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ ﴾",
    'ث': "﴿ أَلْهَاكُمُ التَّكَاثُرُ ۝ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ ۝ كَلَّا سَوْفَ تَعْلَمُونَ ۝ ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ ﴾",
    'ج': "﴿ إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ﴾",
    'ح': "﴿ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴾",
    'خ': "﴿ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴾",
    'د': "﴿ قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴾",
    'ذ': "﴿ وَالذَّارِيَاتِ ذَرْوًا ۝ فَالْحَامِلَاتِ وِقْرًا ۝ فَالْجَارِيَاتِ يُسْرًا ۝ فَالْمُقَسِّمَاتِ أَمْرًا ﴾",
    'ر': "﴿ إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ﴾",
    'ز': "﴿ إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ۝ وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا ۝ يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا ﴾",
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
  export const FULL_DB = {
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
        { display: `بَ<span class="missing-gap"></span>َ`, correctShape: 1 },
        { display: `أَبَ<span class="missing-gap"></span>`, correctShape: 3 },
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
      jollyStory: 'Tamer is playing table tennis, and the ball makes a light tapping sound.',
      jollyAction: 'Smile widely and touch your upper teeth with your tongue.',
      jollyRawSound: 't - t - t<br><span style="font-size:1rem;font-weight:normal;color:#7f8c8d;">(Like the "t" in "tap")</span>',
      jollyArabic: false, storyIcon: '🐊',
      storyText: 'تِمْسَاحٌ ضَخْمٌ يَتَرَبَّصُ بِفَرِيسَتِهِ',
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
        { display: `أَ<span class="missing-gap"></span>َدَ`, correctShape: 3 },
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
        { display: `أَخَ<span class="missing-gap"></span>َ`, correctShape: 1 },
        { display: `جَذَ<span class="missing-gap"></span>َ`, correctShape: 2 },
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
        { display: `رَصَ<span class="missing-gap"></span>َ`, correctShape: 3 }
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
      jollyStory: 'A giant, heavy beetle is buzzing slowly with its large wings.',
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
        { display: `زُ<span class="missing-gap"></span>ِفَ`, correctShape: 1 },
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
        { display: `رَحِ<span class="missing-gap"></span>َ`, correctShape: 3 }
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
        { display: `فُ<span class="missing-gap"></span>ِمَ`, correctShape: 3 }
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
        { display: `يَبِ<span class="missing-gap"></span>َ`, correctShape: 1 },
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
export const DETECTIVE_DATA = {
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
  'ج': [
      { type: 'visual', target: 'ج', compareWith: 'خ', dots: { target: 'نقطة تحت', compare: 'نقطة فوق' } }
  ],
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