const VERBS_DB = {
 // ════════════════════════════════════════════════════════════════
  // PHASE 1 — هُوَ (He) — 3rd person singular masculine
  // ════════════════════════════════════════════════════════════════

  'v1': {
    symbol:'أَكَلَ', actionEn:'Eating', pastEn:'Ate (Root / Past)', pronoun:'هُوَ', rootGroup:'akl', file:'eating.json',
    tenses: { past:'أَكَلَ', present:'يَأْكُلُ', futureSa:'سَيَأْكُلُ', futureSawfa:'سَوْفَ يَأْكُلُ', command:'كُلْ' },
    tensesWithPronoun:['هُوَ أَكَلَ','هُوَ يَأْكُلُ','هُوَ سَيَأْكُلُ','هُوَ سَوْفَ يَأْكُلُ'],
    allForms:['أَكَلَ','يَأْكُلُ','سَيَأْكُلُ','سَوْفَ يَأْكُلُ','كُلْ'],
    affixes:[
      {label:'Past',      prefix:'',   root:'أَكَلَ',  color:'#B45309'},
      {label:'Present',   prefix:'يَ',  root:'أْكُلُ',  color:'#3b82f6'},
      {label:'Future سَ', prefix:'سَيَ', root:'أْكُلُ',  color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ', root:'أْكُلُ', color:'#22c55e'},
      {label:'Command',   prefix:'',   root:'كُلْ',    color:'#ee5337'}
    ],
    missing:[
      {d:'____أْكُلُ', c:0, o:['يَ','تَ','نَ'], hint:'Present (Mudari3)'},
      {d:'سَ____أْكُلُ', c:1, o:['تَ','يَ','نَ'], hint:'Future (Mustaqbal)'}
    ],
    example:'﴿ كُلُوا مِن طَيِّبَاتِ مَا رَزَقْنَاكُمْ ﴾',
    commandIsIrregular:false,
    prepositions: [
      { word: 'يَأْكُلُ فِي',  en: 'Eats in/at (Place/Time)', ex: 'يَأْكُلُ فِي الْمَطْعَمِ / فِي الصَّبَاحِ' },
      { word: 'يَأْكُلُ مِنْ', en: 'Eats from (Source/Portion)', ex: 'يَأْكُلُ مِنَ الشَّجَرَةِ / مِنَ الطَّبَقِ' },
      { word: 'يَأْكُلُ بِـ',   en: 'Eats with (Tool/Hand)', ex: 'يَأْكُلُ بِيَدِهِ الْيُمْنَى / بِالْمِلْعَقَةِ' },
      { word: 'يَأْكُلُ مَعَ',  en: 'Eats with (Companion)', ex: 'يَأْكُلُ مَعَ عَائِلَتِهِ' }
    ]
  },

  'v2': {
    symbol:'شَرِبَ', actionEn:'Drinking', pastEn:'Drank (Root / Past)', pronoun:'هُوَ', rootGroup:'shrb', file:'drinking.json',
    tenses:{ past:'شَرِبَ', present:'يَشْرَبُ', futureSa:'سَيَشْرَبُ', futureSawfa:'سَوْفَ يَشْرَبُ', command:'اِشْرَبْ' },
    tensesWithPronoun:['هُوَ شَرِبَ','هُوَ يَشْرَبُ','هُوَ سَيَشْرَبُ','هُوَ سَوْفَ يَشْرَبُ'],
    allForms:['شَرِبَ','يَشْرَبُ','سَيَشْرَبُ','سَوْفَ يَشْرَبُ','اِشْرَبْ'],
    affixes:[
      {label:'Past',prefix:'',root:'شَرِبَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'شْرَبُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'شْرَبُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'شْرَبُ',color:'#22c55e'},
      {label:'Command',prefix:'اِ',root:'شْرَبْ',color:'#ee5337'}
    ],
    missing:[
      {d:'____شْرَبُ', c:1, o:['تَ','يَ','أَ'], hint:'Present (Mudari3)'},
      {d:'اِ____رَبْ',  c:0, o:['شْ','تْ','كْ'], hint:'Command (Amr)'}
    ],
    example:'﴿ وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ ﴾',
    commandIsIrregular:false,
    prepositions: [
      { word: 'يَشْرَبُ مِنْ', en: 'Drinks from (Source/Vessel)', ex: 'يَشْرَبُ مِنْ مَاءِ زَمْزَمَ / مِنَ الْكُوبِ' },
      { word: 'يَشْرَبُ فِي',  en: 'Drinks in (Container/Place)', ex: 'يَشْرَبُ فِي الْفِنْجَانِ / فِي الْمَقْهَى' },
      { word: 'يَشْرَبُ بِـ',   en: 'Drinks with (Tool)', ex: 'يَشْرَبُ بِالْمَصَّاصَةِ (Straw)' }
    ]
  },

  'v3': {
    symbol:'نَامَ', actionEn:'Sleeping', pronoun:'هُوَ', rootGroup:'nwm', file:'sleep.json',
    tenses:{ past:'نَامَ', present:'يَنَامُ', futureSa:'سَيَنَامُ', futureSawfa:'سَوْفَ يَنَامُ', command:'نَمْ' },
    tensesWithPronoun:['هُوَ نَامَ','هُوَ يَنَامُ','هُوَ سَيَنَامُ','هُوَ سَوْفَ يَنَامُ'],
    allForms:['نَامَ','يَنَامُ','سَيَنَامُ','سَوْفَ يَنَامُ','نَمْ'],
    affixes:[
      {label:'Past',prefix:'',root:'نَامَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'نَامُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'نَامُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'نَامُ',color:'#22c55e'},
      {label:'Command',prefix:'',root:'نَمْ',color:'#ee5337'}
    ],
    missing:[
      {d:'____نَامُ', c:0, o:['يَ','مَ','سَ'], hint:'Present (Mudari3)'},
      {d:'سَ____نَامُ', c:2, o:['نَ','تَ','يَ'], hint:'Future (Mustaqbal)'}
    ],
    example:'﴿ وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا ﴾',
    commandIsIrregular:false,
    prepositions: [
      { word: 'يَنَامُ عَلَى',  en: 'Sleeps on (Surface/Side)', ex: 'يَنَامُ عَلَى السَّرِيرِ / عَلَى جَانِبِهِ الْأَيْمَنِ' },
      { word: 'يَنَامُ فِي',    en: 'Sleeps in (Place)', ex: 'يَنَامُ فِي غُرْفَتِهِ / فِي الْمَسْجِدِ' },
      { word: 'يَنَامُ عَنْ',   en: 'Sleeps through/Misses (Duty)', ex: 'يَنَامُ عَنِ الصَّلَاةِ الْمَكْتُوبَةِ' },
      { word: 'يَنَامُ عِنْدَ',  en: 'Sleeps at (Someone\'s house)', ex: 'يَنَامُ عِنْدَ أَقَارِبِهِ' }
    ]
  },
  'v4': {
    symbol:'قَامَ', actionEn:'Standing / Doing', pronoun:'هُوَ', rootGroup:'qwm', file:'stand.json',
    tenses:{ past:'قَامَ', present:'يَقُومُ', futureSa:'سَيَقُومُ', futureSawfa:'سَوْفَ يَقُومُ', command:'قُمْ' },
    tensesWithPronoun:['هُوَ قَامَ','هُوَ يَقُومُ','هُوَ سَيَقُومُ','هُوَ سَوْفَ يَقُومُ'],
    allForms:['قَامَ','يَقُومُ','سَيَقُومُ','سَوْفَ يَقُومُ','قُمْ'],
    affixes:[
      {label:'Past',prefix:'',root:'قَامَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'قُومُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'قُومُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'قُومُ',color:'#22c55e'},
      {label:'Command',prefix:'',root:'قُمْ',color:'#ee5337'}
    ],
    missing:[
      {d:'سَ____قُومُ', c:2, o:['تَ','نَ','يَ'], hint:'Future (Mustaqbal)'},
      {d:'____قُومُ', c:0, o:['يَ','مَ','فَ'], hint:'Present (Mudari3)'}
    ],
    example:'﴿ وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ ﴾',
    commandIsIrregular:false,

    // 💡 ملاحظة: حرف الباء يغير معنى "قام" من الوقوف إلى إنجاز مهمة (يأتي بمعنى To do / Perform)
    prepositions: [
      { word: 'يَقُومُ بِـ',   en: 'Performs/Undertakes (Task)', ex: 'يَقُومُ بِالْوَاجِبِ / بِالْعَمَلِ' },
      { word: 'يَقُومُ لِـ',   en: 'Stands up for (Purpose/Respect)', ex: 'يَقُومُ لِلصَّلَاةِ / لِلْمُعَلِّمِ' },
      { word: 'يَقُومُ مِنْ',  en: 'Gets up from (Place/State)', ex: 'يَقُومُ مِنَ النَّوْمِ / مِنَ مَكَانِهِ' },
      { word: 'يَقُومُ عَلَى', en: 'Supervises/Takes care of', ex: 'يَقُومُ عَلَى رِعَايَةِ الْأَيْتَامِ' }
    ]
  },

  'v5': {
    symbol:'جَلَسَ', actionEn:'Sitting', pronoun:'هُوَ', rootGroup:'jls', file:'sit.json',
    tenses:{ past:'جَلَسَ', present:'يَجْلِسُ', futureSa:'سَيَجْلِسُ', futureSawfa:'سَوْفَ يَجْلِسُ', command:'اِجْلِسْ' },
    tensesWithPronoun:['هُوَ جَلَسَ','هُوَ يَجْلِسُ','هُوَ سَيَجْلِسُ','هُوَ سَوْفَ يَجْلِسُ'],
    allForms:['جَلَسَ','يَجْلِسُ','سَيَجْلِسُ','سَوْفَ يَجْلِسُ','اِجْلِسْ'],
    affixes:[
      {label:'Past',prefix:'',root:'جَلَسَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'جْلِسُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'جْلِسُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'جْلِسُ',color:'#22c55e'},
      {label:'Command',prefix:'اِ',root:'جْلِسْ',color:'#ee5337'}
    ],
    missing:[
      {d:'____جْلِسُ', c:1, o:['تَ','يَ','نَ'], hint:'Present (Mudari3)'},
      {d:'اِ____لِسْ', c:0, o:['جْ','كْ','فْ'], hint:'Command (Amr)'}
    ],
    example:'﴿ إِذَا قِيلَ لَكُمْ تَفَسَّحُوا فِي الْمَجَالِسِ فَافْسَحُوا ﴾',
    commandIsIrregular:false,

    // 💡 ملاحظة: (يجلس إلى) تعني يجلس بجوار الشيء أو على حافته (مثل المائدة)
    prepositions: [
      { word: 'يَجْلِسُ عَلَى', en: 'Sits on (Surface)', ex: 'يَجْلِسُ عَلَى الْكُرْسِيِّ / عَلَى الْأَرْضِ' },
      { word: 'يَجْلِسُ إِلَى', en: 'Sits at/by (Object)', ex: 'يَجْلِسُ إِلَى الْمَائِدَةِ / الْمَكْتَبِ' },
      { word: 'يَجْلِسُ فِي',   en: 'Sits in (Place)', ex: 'يَجْلِسُ فِي الصَّفِّ / فِي الْمَسْجِدِ' },
      { word: 'يَجْلِسُ مَعَ',  en: 'Sits with (Companion)', ex: 'يَجْلِسُ مَعَ الْعُلَمَاءِ' }
    ]
  },

  'v6': {
    symbol:'ذَهَبَ', actionEn:'Going', pastEn:'Went (Root / Past)', pronoun:'هُوَ', rootGroup:'dhb', file:'going.json',
    tenses:{ past:'ذَهَبَ', present:'يَذْهَبُ', futureSa:'سَيَذْهَبُ', futureSawfa:'سَوْفَ يَذْهَبُ', command:'اِذْهَبْ' },
    tensesWithPronoun:['هُوَ ذَهَبَ','هُوَ يَذْهَبُ','هُوَ سَيَذْهَبُ','هُوَ سَوْفَ يَذْهَبُ'],
    allForms:['ذَهَبَ','يَذْهَبُ','سَيَذْهَبُ','سَوْفَ يَذْهَبُ','اِذْهَبْ'],
    affixes:[
      {label:'Past',prefix:'',root:'ذَهَبَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'ذْهَبُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'ذْهَبُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'ذْهَبُ',color:'#22c55e'},
      {label:'Command',prefix:'اِ',root:'ذْهَبْ',color:'#ee5337'}
    ],
    missing:[
      {d:'سَ____ذْهَبُ', c:2, o:['تَ','نَ','يَ'], hint:'Future (Mustaqbal)'},
      {d:'____ذْهَبُ', c:0, o:['يَ','بَ','فَ'], hint:'Present (Mudari3)'}
    ],
    example:'﴿ اذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ ﴾',
    commandIsIrregular:false,

    // 💡 ملاحظة خطيرة: (يذهب بِـ) تحول الفعل تماماً ليصبح معناه (يزيل / يأخذ بعيداً)
    prepositions: [
      { word: 'يَذْهَبُ إِلَى', en: 'Goes to (Destination)', ex: 'يَذْهَبُ إِلَى الْمَسْجِدِ / إِلَى الْعَمَلِ' },
      { word: 'يَذْهَبُ بِـ',   en: 'Takes away / Removes (Transitive)', ex: 'يَذْهَبُ بِالْخَوْفِ (ذَهَبَ اللَّهُ بِنُورِهِمْ)' },
      { word: 'يَذْهَبُ عَنْ',  en: 'Goes away from / Departs', ex: 'يَذْهَبُ عَنِ الْمَكَانِ / ذَهَبَ عَنْهُ الْغَضَبُ' }
    ]
  },

  'v7': {
    symbol:'جَاءَ', actionEn:'Coming', pastEn:'Came (Root / Past)', pronoun:'هُوَ', rootGroup:'jyy', file:'come.json',
    tenses:{ past:'جَاءَ', present:'يَجِيءُ', futureSa:'سَيَجِيءُ', futureSawfa:'سَوْفَ يَجِيءُ', command:'تَعَالَ' },
    tensesWithPronoun:['هُوَ جَاءَ','هُوَ يَجِيءُ','هُوَ سَيَجِيءُ','هُوَ سَوْفَ يَجِيءُ'],
    allForms:['جَاءَ','يَجِيءُ','سَيَجِيءُ','سَوْفَ يَجِيءُ','تَعَالَ'],
    affixes:[
      {label:'Past',prefix:'',root:'جَاءَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'جِيءُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'جِيءُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'جِيءُ',color:'#22c55e'},
      {label:'Command (شاذ!)',prefix:'',root:'تَعَالَ',color:'#9b59b6'}
    ],
    missing:[
      {d:'____جِيءُ', c:2, o:['تَ','نَ','يَ'], hint:'Present (Mudari3)'},
      {d:'سَ____جِيءُ', c:0, o:['يَ','تَ','نَ'], hint:'Future (Mustaqbal)'}
    ],
    example:'﴿ إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ﴾',
    commandIsIrregular:true,
    irregularNote:'The command form of جَاءَ is irregular. Instead of a derived imperative, Arabic uses تَعَالَ (come!) from a different root.',

    // 💡 ملاحظة: الباء تحول الفعل لمعنى "يُحضر"
    prepositions: [
      { word: 'يَجِيءُ إِلَى', en: 'Comes to (Destination)', ex: 'يَجِيءُ إِلَى الْمَدْرَسَةِ' },
      { word: 'يَجِيءُ مِنْ',  en: 'Comes from (Origin)', ex: 'يَجِيءُ مِنَ السَّفَرِ / مِنَ الْبَيْتِ' },
      { word: 'يَجِيءُ بِـ',   en: 'Brings (Comes WITH something)', ex: 'يَجِيءُ بِالْحَقِّ / بِالْكِتَابِ' }
    ]
  },

  'v8': {
    symbol:'دَخَلَ', actionEn:'Entering', pastEn:'Entered (Root / Past)', pronoun:'هُوَ', rootGroup:'dkhl', file:'get in.json',
    tenses:{ past:'دَخَلَ', present:'يَدْخُلُ', futureSa:'سَيَدْخُلُ', futureSawfa:'سَوْفَ يَدْخُلُ', command:'اُدْخُلْ' },
    tensesWithPronoun:['هُوَ دَخَلَ','هُوَ يَدْخُلُ','هُوَ سَيَدْخُلُ','هُوَ سَوْفَ يَدْخُلُ'],
    allForms:['دَخَلَ','يَدْخُلُ','سَيَدْخُلُ','سَوْفَ يَدْخُلُ','اُدْخُلْ'],
    affixes:[
      {label:'Past',prefix:'',root:'دَخَلَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'دْخُلُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'دْخُلُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'دْخُلُ',color:'#22c55e'},
      {label:'Command',prefix:'اُ',root:'دْخُلْ',color:'#ee5337'}
    ],
    missing:[
      {d:'____دْخُلُ', c:1, o:['أَ','يَ','تَ'], hint:'Present (Mudari3)'},
      {d:'اُ____خُلْ', c:0, o:['دْ','جْ','بْ'], hint:'Command (Amr)'}
    ],
    example:'﴿ ادْخُلُوهَا بِسَلَامٍ آمِنِينَ ﴾',
    commandIsIrregular:false,

    // 💡 ملاحظة: (يدخل على) تُستخدم لزيارة الأشخاص وليس الأماكن
    prepositions: [
      { word: 'يَدْخُلُ فِي',   en: 'Enters in/into (Place/State)', ex: 'يَدْخُلُ فِي الدِّينِ / فِي الْبَيْتِ' },
      { word: 'يَدْخُلُ عَلَى', en: 'Enters upon (Visiting someone)', ex: 'يَدْخُلُ عَلَى الْمَرِيضِ / عَلَى الْمُدِيرِ' },
      { word: 'يَدْخُلُ مِنْ',  en: 'Enters from/through', ex: 'يَدْخُلُ مِنَ الْبَابِ الْخَلْفِيِّ' }
    ]
  },

  'v9': {
    symbol:'خَرَجَ', actionEn:'Exiting', pastEn:'Exited (Root / Past)', pronoun:'هُوَ', rootGroup:'khrj', file:'go out.json',
    tenses:{ past:'خَرَجَ', present:'يَخْرُجُ', futureSa:'سَيَخْرُجُ', futureSawfa:'سَوْفَ يَخْرُجُ', command:'اُخْرُجْ' },
    tensesWithPronoun:['هُوَ خَرَجَ','هُوَ يَخْرُجُ','هُوَ سَيَخْرُجُ','هُوَ سَوْفَ يَخْرُجُ'],
    allForms:['خَرَجَ','يَخْرُجُ','سَيَخْرُجُ','سَوْفَ يَخْرُجُ','اُخْرُجْ'],
    affixes:[
      {label:'Past',prefix:'',root:'خَرَجَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'خْرُجُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'خْرُجُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'خْرُجُ',color:'#22c55e'},
      {label:'Command',prefix:'اُ',root:'خْرُجْ',color:'#ee5337'}
    ],
    missing:[
      {d:'سَ____خْرُجُ', c:2, o:['لَ','كَ','يَ'], hint:'Future (Mustaqbal)'},
      {d:'اُ____رُجْ',    c:0, o:['خْ','ضْ','هْ'], hint:'Command (Amr)'}
    ],
    example:'﴿ قَالَ فَاخْرُجْ مِنْهَا فَإِنَّكَ رَجِيمٌ ﴾',
    commandIsIrregular:false,

    // 💡 ملاحظة: (يخرج على) تعني التمرد أو الخروج للتفاخر أمام الناس
    prepositions: [
      { word: 'يَخْرُجُ مِنْ',  en: 'Exits from (Place)', ex: 'يَخْرُجُ مِنَ الْبَيْتِ' },
      { word: 'يَخْرُجُ إِلَى', en: 'Goes out to (Destination)', ex: 'يَخْرُجُ إِلَى الْعَمَلِ' },
      { word: 'يَخْرُجُ عَلَى', en: 'Appears before / Rebels against', ex: 'يَخْرُجُ عَلَى قَوْمِهِ فِي زِينَتِهِ' }
    ]
  },

  'v10': {
    symbol:'فَتَحَ', actionEn:'Opening', pastEn:'Opened (Root / Past)', pronoun:'هُوَ', rootGroup:'fth', file:'open.json',
    tenses:{ past:'فَتَحَ', present:'يَفْتَحُ', futureSa:'سَيَفْتَحُ', futureSawfa:'سَوْفَ يَفْتَحُ', command:'اِفْتَحْ' },
    tensesWithPronoun:['هُوَ فَتَحَ','هُوَ يَفْتَحُ','هُوَ سَيَفْتَحُ','هُوَ سَوْفَ يَفْتَحُ'],
    allForms:['فَتَحَ','يَفْتَحُ','سَيَفْتَحُ','سَوْفَ يَفْتَحُ','اِفْتَحْ'],
    affixes:[
      {label:'Past',prefix:'',root:'فَتَحَ',color:'#B45309'},
      {label:'Present',prefix:'يَ',root:'فْتَحُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَيَ',root:'فْتَحُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ يَ',root:'فْتَحُ',color:'#22c55e'},
      {label:'Command',prefix:'اِ',root:'فْتَحْ',color:'#ee5337'}
    ],
    missing:[
      {d:'____فْتَحُ', c:0, o:['يَ','تَ','نَ'], hint:'Present (Mudari3)'},
      {d:'سَ____فْتَحُ', c:2, o:['تَ','نَ','يَ'], hint:'Future (Mustaqbal)'}
    ],
    example:'﴿ إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا ﴾',
    commandIsIrregular:false,

    // 💡 ملاحظة: التلبية الحرفية لملاحظتك القيمة! (يفتح من الداخل/الخارج)
    prepositions: [
      { word: 'يَفْتَحُ مِنْ',   en: 'Opens from (Direction)', ex: 'يَفْتَحُ الْبَابَ مِنَ الدَّاخِلِ / مِنَ الْخَارِجِ' },
      { word: 'يَفْتَحُ بِـ',    en: 'Opens with (Tool/Key)',  ex: 'يَفْتَحُ بِالْمِفْتَاحِ' },
      { word: 'يَفْتَحُ لِـ',    en: 'Opens for (Someone)',    ex: 'يَفْتَحُ لِلضَّيْفِ' },
      { word: 'يَفْتَحُ عَلَى',  en: 'Opens upon (Grants success/wisdom)', ex: 'يَفْتَحُ اللَّهُ عَلَيْهِ بِالْخَيْرِ' }
    ]
  },

  // ════════════════════════════════════════════════════════════════
  // PHASE 2 — أَنَا (I) — 1st person singular
  // ════════════════════════════════════════════════════════════════

  'v11': {
    symbol:'أَكَلْتُ', actionEn:'Eating (I)', pastEn:'Ate (I)', pronoun:'أَنَا', rootGroup:'akl', file:'eating.json',
    tenses:{ past:'أَكَلْتُ', present:'آكُلُ', futureSa:'سَآكُلُ', futureSawfa:'سَوْفَ آكُلُ', command:'كُلْ' },
    tensesWithPronoun:['أَنَا أَكَلْتُ','أَنَا آكُلُ','أَنَا سَآكُلُ','أَنَا سَوْفَ آكُلُ'],
    allForms:['أَكَلْتُ','آكُلُ','سَآكُلُ','سَوْفَ آكُلُ'],
    affixes:[
      {label:'Past',prefix:'',root:'أَكَلْتُ',color:'#B45309'},
      {label:'Present',prefix:'آ',root:'كُلُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَآ',root:'كُلُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ آ',root:'كُلُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____كُلُ', c:0, o:['آ','أَ','يَ'], hint:'Present for I (أَنَا)'},
      {d:'أَكَلْ____', c:1, o:['نَ','تُ','تَ'], hint:'Past-I suffix'}
    ],
    example:'﴿ إِنِّي أَرَىٰ سَبْعَ بَقَرَاتٍ سِمَانٍ يَأْكُلُهُنَّ سَبْعٌ عِجَافٌ ﴾',
    commandIsIrregular:false,
    reviewOf:'v1',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'آكُلُ فِي',  en: 'I eat in/at (Place/Time)', ex: 'آكُلُ فِي الْمَطْعَمِ / فِي الصَّبَاحِ' },
      { word: 'آكُلُ مِنْ', en: 'I eat from (Source/Portion)', ex: 'آكُلُ مِنَ الطَّبَقِ / مِنَ الثِّمَارِ' },
      { word: 'آكُلُ مَعَ', en: 'I eat with (Companion)', ex: 'آكُلُ مَعَ عَائِلَتِي' },
      { word: 'آكُلُ بِـ',   en: 'I eat with (Tool/Hand)', ex: 'آكُلُ بِالْمِلْعَقَةِ / بِيَدِي الْيُمْنَى' }
    ]
  },

  'v12': {
    symbol:'شَرِبْتُ', actionEn:'Drinking (I)', pastEn:'Drank (I)', pronoun:'أَنَا', rootGroup:'shrb', file:'drinking.json',
    tenses:{ past:'شَرِبْتُ', present:'أَشْرَبُ', futureSa:'سَأَشْرَبُ', futureSawfa:'سَوْفَ أَشْرَبُ', command:'اِشْرَبْ' },
    tensesWithPronoun:['أَنَا شَرِبْتُ','أَنَا أَشْرَبُ','أَنَا سَأَشْرَبُ','أَنَا سَوْفَ أَشْرَبُ'],
    allForms:['شَرِبْتُ','أَشْرَبُ','سَأَشْرَبُ','سَوْفَ أَشْرَبُ'],
    affixes:[
      {label:'Past',prefix:'',root:'شَرِبْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'شْرَبُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'شْرَبُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'شْرَبُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____شْرَبُ', c:2, o:['يَ','تَ','أَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____شْرَبُ', c:0, o:['أَ','يَ','نَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ وَسَقَاهُمْ رَبُّهُمْ شَرَابًا طَهُورًا ﴾',
    commandIsIrregular:false,
    reviewOf:'v2',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَشْرَبُ مِنْ', en: 'I drink from (Source)', ex: 'أَشْرَبُ مِنَ الزُّجَاجَةِ / مِنَ النَّهْرِ' },
      { word: 'أَشْرَبُ فِي',  en: 'I drink in (Container/Place)', ex: 'أَشْرَبُ فِي الْكُوبِ / فِي الْمَقْهَى' },
      { word: 'أَشْرَبُ مَعَ', en: 'I drink with (Companion)', ex: 'أَشْرَبُ مَعَ أَصْدِقَائِي' }
    ]
  },

  'v13': {
    symbol:'نِمْتُ', actionEn:'Sleeping (I)', pastEn:'Slept (I)', pronoun:'أَنَا', rootGroup:'nwm', file:'sleep.json',
    tenses:{ past:'نِمْتُ', present:'أَنَامُ', futureSa:'سَأَنَامُ', futureSawfa:'سَوْفَ أَنَامُ', command:'نَمْ' },
    tensesWithPronoun:['أَنَا نِمْتُ','أَنَا أَنَامُ','أَنَا سَأَنَامُ','أَنَا سَوْفَ أَنَامُ'],
    allForms:['نِمْتُ','أَنَامُ','سَأَنَامُ','سَوْفَ أَنَامُ'],
    affixes:[
      {label:'Past',prefix:'',root:'نِمْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'نَامُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'نَامُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'نَامُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____نَامُ',    c:0, o:['أَ','يَ','نَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____نَامُ', c:0, o:['أَ','يَ','تَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ قَالَ يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ ﴾',
    commandIsIrregular:false,
    reviewOf:'v3',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَنَامُ عَلَى',  en: 'I sleep on (Surface/Side)', ex: 'أَنَامُ عَلَى السَّرِيرِ / عَلَى جَانِبِي الْأَيْمَنِ' },
      { word: 'أَنَامُ فِي',    en: 'I sleep in (Place/Time)', ex: 'أَنَامُ فِي غُرْفَتِي / فِي اللَّيْلِ' },
      { word: 'أَنَامُ عَنْ',   en: 'I sleep through (Miss a duty)', ex: 'أَنَامُ عَنِ الصَّلَاةِ / عَنِ الْمَوْعِدِ' },
      { word: 'أَنَامُ عِنْدَ', en: 'I sleep at (Someone\'s place)', ex: 'أَنَامُ عِنْدَ جَدَّتِي' }
    ]
  },

  'v14': {
    symbol:'قُمْتُ', actionEn:'Standing/Doing (I)', pastEn:'Stood (I)', pronoun:'أَنَا', rootGroup:'qwm', file:'stand.json',
    tenses:{ past:'قُمْتُ', present:'أَقُومُ', futureSa:'سَأَقُومُ', futureSawfa:'سَوْفَ أَقُومُ', command:'قُمْ' },
    tensesWithPronoun:['أَنَا قُمْتُ','أَنَا أَقُومُ','أَنَا سَأَقُومُ','أَنَا سَوْفَ أَقُومُ'],
    allForms:['قُمْتُ','أَقُومُ','سَأَقُومُ','سَوْفَ أَقُومُ'],
    affixes:[
      {label:'Past',prefix:'',root:'قُمْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'قُومُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'قُومُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'قُومُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____قُومُ',    c:1, o:['يَ','أَ','تَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____قُومُ', c:0, o:['أَ','تَ','يَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ وَأَنْ أَقِمْ وَجْهَكَ لِلدِّينِ حَنِيفًا ﴾',
    commandIsIrregular:false,
    reviewOf:'v4',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَقُومُ لِـ',   en: 'I stand up for (Purpose/Respect)', ex: 'أَقُومُ لِلصَّلَاةِ / لِاحْتِرَامِ مُعَلِّمِي' },
      { word: 'أَقُومُ مِنْ',  en: 'I get up from (Place/State)', ex: 'أَقُومُ مِنَ النَّوْمِ مُبَكِّرًا' },
      { word: 'أَقُومُ بِـ',   en: 'I perform/undertake (Task)', ex: 'أَقُومُ بِوَاجِبِي الْمَدْرَسِيِّ' },
      { word: 'أَقُومُ عَلَى', en: 'I supervise/care for', ex: 'أَقُومُ عَلَى رِعَايَةِ إِخْوَتِي' }
    ]
  },

  'v15': {
    symbol:'جَلَسْتُ', actionEn:'Sitting (I)', pastEn:'Sat (I)', pronoun:'أَنَا', rootGroup:'jls', file:'sit.json',
    tenses:{ past:'جَلَسْتُ', present:'أَجْلِسُ', futureSa:'سَأَجْلِسُ', futureSawfa:'سَوْفَ أَجْلِسُ', command:'اِجْلِسْ' },
    tensesWithPronoun:['أَنَا جَلَسْتُ','أَنَا أَجْلِسُ','أَنَا سَأَجْلِسُ','أَنَا سَوْفَ أَجْلِسُ'],
    allForms:['جَلَسْتُ','أَجْلِسُ','سَأَجْلِسُ','سَوْفَ أَجْلِسُ'],
    affixes:[
      {label:'Past',prefix:'',root:'جَلَسْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'جْلِسُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'جْلِسُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'جْلِسُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____جْلِسُ',    c:2, o:['يَ','تَ','أَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____جْلِسُ', c:0, o:['أَ','نَ','يَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ فِي مَقْعَدِ صِدْقٍ عِندَ مَلِيكٍ مُّقْتَدِرٍ ﴾',
    commandIsIrregular:false,
    reviewOf:'v5',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَجْلِسُ عَلَى', en: 'I sit on (Surface)', ex: 'أَجْلِسُ عَلَى الْكُرْسِيِّ / عَلَى الْأَرْضِ' },
      { word: 'أَجْلِسُ فِي',   en: 'I sit in (Place)', ex: 'أَجْلِسُ فِي الصَّفِّ الْأَوَّلِ' },
      { word: 'أَجْلِسُ مَعَ',  en: 'I sit with (Companion)', ex: 'أَجْلِسُ مَعَ أَصْدِقَائِي' },
      { word: 'أَجْلِسُ إِلَى', en: 'I sit at/Next to (Object)', ex: 'أَجْلِسُ إِلَى الْمَائِدَةِ / الْمَكْتَبِ' }
    ]
  },

  'v16': {
    symbol:'ذَهَبْتُ', actionEn:'Going (I)', pastEn:'Went (I)', pronoun:'أَنَا', rootGroup:'dhb', file:'going.json',
    tenses:{ past:'ذَهَبْتُ', present:'أَذْهَبُ', futureSa:'سَأَذْهَبُ', futureSawfa:'سَوْفَ أَذْهَبُ', command:'اِذْهَبْ' },
    tensesWithPronoun:['أَنَا ذَهَبْتُ','أَنَا أَذْهَبُ','أَنَا سَأَذْهَبُ','أَنَا سَوْفَ أَذْهَبُ'],
    allForms:['ذَهَبْتُ','أَذْهَبُ','سَأَذْهَبُ','سَوْفَ أَذْهَبُ'],
    affixes:[
      {label:'Past',prefix:'',root:'ذَهَبْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'ذْهَبُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'ذْهَبُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'ذْهَبُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____ذْهَبُ',    c:1, o:['يَ','أَ','تَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____ذْهَبُ', c:0, o:['أَ','يَ','تَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ إِنِّي ذَاهِبٌ إِلَىٰ رَبِّي سَيَهْدِينِ ﴾',
    commandIsIrregular:false,
    reviewOf:'v6',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَذْهَبُ إِلَى', en: 'I go to (Destination)',       ex: 'أَذْهَبُ إِلَى الْمَدْرَسَةِ كُلَّ يَوْمٍ' },
      { word: 'أَذْهَبُ بِـ',   en: 'I take away/Bring (Transitive)', ex: 'أَذْهَبُ بِأَخِي الصَّغِيرِ مَعِي' },
      { word: 'أَذْهَبُ مَعَ',  en: 'I go with (Companion)',       ex: 'أَذْهَبُ مَعَ أَبِي لِلْمَسْجِدِ' }
    ]
  },

  'v17': {
    symbol:'جِئْتُ', actionEn:'Coming (I)', pastEn:'Came (I)', pronoun:'أَنَا', rootGroup:'jyy', file:'come.json',
    tenses:{ past:'جِئْتُ', present:'أَجِيءُ', futureSa:'سَأَجِيءُ', futureSawfa:'سَوْفَ أَجِيءُ', command:'تَعَالَ' },
    tensesWithPronoun:['أَنَا جِئْتُ','أَنَا أَجِيءُ','أَنَا سَأَجِيءُ','أَنَا سَوْفَ أَجِيءُ'],
    allForms:['جِئْتُ','أَجِيءُ','سَأَجِيءُ','سَوْفَ أَجِيءُ'],
    affixes:[
      {label:'Past',prefix:'',root:'جِئْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'جِيءُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'جِيءُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'جِيءُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____جِيءُ',    c:2, o:['يَ','تَ','أَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____جِيءُ', c:2, o:['يَ','تَ','أَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ أَنِّي قَدْ جِئْتُكُم بِآيَةٍ مِّن رَّبِّكُمْ ﴾',
    commandIsIrregular:true,
    reviewOf:'v7',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَجِيءُ إِلَى', en: 'I come to (Destination)', ex: 'أَجِيءُ إِلَى الْبَيْتِ بَاكِرًا' },
      { word: 'أَجِيءُ مِنْ',  en: 'I come from (Origin)', ex: 'أَجِيءُ مِنَ النَّادِي الرِّيَاضِيِّ' },
      { word: 'أَجِيءُ بِـ',   en: 'I bring (Come WITH something)', ex: 'أَجِيءُ بِكُتُبِي مَعِي' }
    ]
  },

  'v18': {
    symbol:'دَخَلْتُ', actionEn:'Entering (I)', pastEn:'Entered (I)', pronoun:'أَنَا', rootGroup:'dkhl', file:'get in.json',
    tenses:{ past:'دَخَلْتُ', present:'أَدْخُلُ', futureSa:'سَأَدْخُلُ', futureSawfa:'سَوْفَ أَدْخُلُ', command:'اُدْخُلْ' },
    tensesWithPronoun:['أَنَا دَخَلْتُ','أَنَا أَدْخُلُ','أَنَا سَأَدْخُلُ','أَنَا سَوْفَ أَدْخُلُ'],
    allForms:['دَخَلْتُ','أَدْخُلُ','سَأَدْخُلُ','سَوْفَ أَدْخُلُ'],
    affixes:[
      {label:'Past',prefix:'',root:'دَخَلْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'دْخُلُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'دْخُلُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'دْخُلُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____دْخُلُ',    c:2, o:['يَ','تَ','أَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____دْخُلُ', c:0, o:['أَ','يَ','تَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ وَلَوْلَا إِذْ دَخَلْتَ جَنَّتَكَ قُلْتَ مَا شَاءَ اللَّهُ ﴾',
    commandIsIrregular:false,
    reviewOf:'v8',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَدْخُلُ فِي',   en: 'I enter in/into (Place/State)',  ex: 'أَدْخُلُ فِي الصَّلَاةِ بِخُشُوعٍ' },
      { word: 'أَدْخُلُ إِلَى', en: 'I enter towards (Direction)',    ex: 'أَدْخُلُ إِلَى الْمَسْجِدِ بِقَدَمِي الْيُمْنَى' },
      { word: 'أَدْخُلُ مِنْ',  en: 'I enter from/through', ex: 'أَدْخُلُ مِنَ الْبَابِ الرَّئِيسِيِّ' },
      { word: 'أَدْخُلُ عَلَى', en: 'I enter upon (Visiting someone)', ex: 'أَدْخُلُ عَلَى أُمِّي مُبْتَسِمًا' }
    ]
  },

  'v19': {
    symbol:'خَرَجْتُ', actionEn:'Exiting (I)', pastEn:'Exited (I)', pronoun:'أَنَا', rootGroup:'khrj', file:'go out.json',
    tenses:{ past:'خَرَجْتُ', present:'أَخْرُجُ', futureSa:'سَأَخْرُجُ', futureSawfa:'سَوْفَ أَخْرُجُ', command:'اُخْرُجْ' },
    tensesWithPronoun:['أَنَا خَرَجْتُ','أَنَا أَخْرُجُ','أَنَا سَأَخْرُجُ','أَنَا سَوْفَ أَخْرُجُ'],
    allForms:['خَرَجْتُ','أَخْرُجُ','سَأَخْرُجُ','سَوْفَ أَخْرُجُ'],
    affixes:[
      {label:'Past',prefix:'',root:'خَرَجْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'خْرُجُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'خْرُجُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'خْرُجُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____خْرُجُ',    c:2, o:['يَ','تَ','أَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____خْرُجُ', c:0, o:['أَ','تَ','يَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ وَقُل رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ ﴾',
    commandIsIrregular:false,
    reviewOf:'v9',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَخْرُجُ مِنْ',  en: 'I go out from (Place)',   ex: 'أَخْرُجُ مِنَ الْبَيْتِ صَبَاحًا' },
      { word: 'أَخْرُجُ إِلَى', en: 'I go out to (Destination)', ex: 'أَخْرُجُ إِلَى السَّاحَةِ لِأَلْعَبَ' },
      { word: 'أَخْرُجُ مَعَ',  en: 'I go out with (Companion)', ex: 'أَخْرُجُ مَعَ أَبِي لِلْمَسْجِدِ' }
    ]
  },

  'v20': {
    symbol:'فَتَحْتُ', actionEn:'Opening (I)', pastEn:'Opened (I)', pronoun:'أَنَا', rootGroup:'fth', file:'open.json',
    tenses:{ past:'فَتَحْتُ', present:'أَفْتَحُ', futureSa:'سَأَفْتَحُ', futureSawfa:'سَوْفَ أَفْتَحُ', command:'اِفْتَحْ' },
    tensesWithPronoun:['أَنَا فَتَحْتُ','أَنَا أَفْتَحُ','أَنَا سَأَفْتَحُ','أَنَا سَوْفَ أَفْتَحُ'],
    allForms:['فَتَحْتُ','أَفْتَحُ','سَأَفْتَحُ','سَوْفَ أَفْتَحُ'],
    affixes:[
      {label:'Past',prefix:'',root:'فَتَحْتُ',color:'#B45309'},
      {label:'Present',prefix:'أَ',root:'فْتَحُ',color:'#3b82f6'},
      {label:'Future سَ',prefix:'سَأَ',root:'فْتَحُ',color:'#22c55e'},
      {label:'Future سوف',prefix:'سَوْفَ أَ',root:'فْتَحُ',color:'#22c55e'}
    ],
    missing:[
      {d:'____فْتَحُ',    c:1, o:['يَ','أَ','تَ'], hint:'Present for I (أَنَا)'},
      {d:'سَ____فْتَحُ', c:0, o:['أَ','يَ','تَ'], hint:'Future for I (أَنَا)'}
    ],
    example:'﴿ رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ ﴾',
    commandIsIrregular:false,
    reviewOf:'v10',

    // 🔗 الروابط السياقية (بصيغة المتكلم)
    prepositions: [
      { word: 'أَفْتَحُ مِنْ',   en: 'I open from (Direction)', ex: 'أَفْتَحُ الْبَابَ مِنَ الدَّاخِلِ' },
      { word: 'أَفْتَحُ بِـ',    en: 'I open with (Tool/Key)',  ex: 'أَفْتَحُ الصُّنْدُوقَ بِالْمِفْتَاحِ' },
      { word: 'أَفْتَحُ لِـ',    en: 'I open for (Someone)',    ex: 'أَفْتَحُ الْبَابَ لِأَخِي الصَّغِيرِ' },
      { word: 'أَفْتَحُ عَلَى',  en: 'I open upon', ex: 'أَفْتَحُ عَلَى نَفْسِي بَابَ الْخَيْرِ' }
    ]
  }

};
const VERB_KEYS = Object.keys(VERBS_DB);

function getVerbLottiePath(file) {
  if (!file) return '';
  if (/^(https?:)?\/\//i.test(file) || file.startsWith('/')) return file;
  if (file.startsWith('lottie/')) return file;
  return 'lottie/' + file.split('/').map(encodeURIComponent).join('/');
}

/* ── STATE & PROGRESS ────────────────────────────────────────── */
const SUPABASE_URL = 'https://oxknepxwnsgsphhklplm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_YYDRjNE2GUdRpQqFfA5LEg_eIVrx_0X';
const SUPABASE_PROFILE_TABLE = 'verb_lab_profiles';

let studentCode = '';
let studentEmail = '';
let currentUser = null;
let supabaseClient = null;
let _progressSaveTimer = null;
let playerProgress = { unlocked: ['v1'], stars: 0, completed: [] };
let activeVerb = '';

/* ── AUDIO & SPEECH ──────────────────────────────────────────── */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type='sine', dur=0.2, vol=0.1) {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + dur);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + dur);
  } catch(e){}
}
function speakAr(text) {
  // تم إيقاف النطق الصوتي نهائياً بناءً على طلبك
  return;
}
function playVictorySound() { [523,659,784,1047].forEach((f,i) => setTimeout(()=>playTone(f,'sine',0.25,0.15),i*90)); }
function playErrorSound() { playTone(200,'sawtooth',0.3,0.12); }
function playMatchPro() { playTone(880,'sine',0.2,0.15); setTimeout(()=>playTone(1320,'sine',0.2,0.1),150); }
function playErrorPro() { playTone(200,'sawtooth',0.25,0.1); }

/* ── UI UTILS ────────────────────────────────────────────────── */
let _toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast'); if(!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_toastTimer); _toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}
function escapeJsArg(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ');
}
function addStars(n) {
  playerProgress.stars += n; saveProgress();
  document.getElementById('starsCount').textContent = playerProgress.stars;
  playTone(800,'triangle',0.1,0.1); setTimeout(()=>playTone(1200,'triangle',0.2,0.1),100);
}
function fireConfetti() {
  const colors = ['#F59E0B','#ee5337','#f1c40f','#3498db','#22c55e','#9b59b6'];
  for (let i=0; i<80; i++) {
    const el = document.createElement('div'); el.className = 'confetti-piece';
    el.style.cssText = `background:${colors[i%colors.length]};left:${Math.random()*100}%;top:${Math.random()*20+70}%;animation-duration:${Math.random()*2+1.5}s;border-radius:${Math.random()>.5?'50%':'4px'};`;
    document.body.appendChild(el); setTimeout(() => el.remove(), 4000);
  }
}
function showVictory(word, sub='') {
  const ov = document.getElementById('victory-overlay');
  document.getElementById('victory-word').textContent = word;
  ov.style.display = 'block';
  playVictorySound(); fireConfetti();
}
function closeVictory() { document.getElementById('victory-overlay').style.display = 'none'; }
function showReadingFeedback(isCorrect) {
  if (isCorrect) { playVictorySound(); addStars(2); fireConfetti(); } else { playErrorSound(); }
  showToast(isCorrect ? '✅ Excellent!' : '❌ Try again!');
}
function toggleTheme() {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  try { localStorage.setItem('verblab_theme', isDark ? 'light' : 'dark'); } catch(e){}
}

/* ── CORE FLOW ───────────────────────────────────────────────── */
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  if (!window.supabase || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('PASTE_')) return null;
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseClient;
}
function getProgressKey() {
  return 'verblab_' + (currentUser?.id || studentEmail || studentCode || 'guest');
}
function saveProgress() {
  try { localStorage.setItem(getProgressKey(), JSON.stringify(playerProgress)); } catch(e){}
  scheduleRemoteProgressSave();
}
function scheduleRemoteProgressSave() {
  if (!currentUser || !getSupabaseClient()) return;
  clearTimeout(_progressSaveTimer);
  _progressSaveTimer = setTimeout(saveProgressRemote, 700);
}
async function saveProgressRemote() {
  const client = getSupabaseClient();
  if (!client || !currentUser) return;
  try {
    await client.from(SUPABASE_PROFILE_TABLE).upsert({
      user_id: currentUser.id,
      email: currentUser.email,
      student_code: studentCode || null,
      progress: normalizeProgress(playerProgress),
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' });
  } catch(e) {
    console.warn('Remote progress save failed', e);
  }
}
function normalizeProgress(progress) {
  const clean = progress && typeof progress === 'object' ? progress : {};
  const validKeys = new Set(VERB_KEYS);
  const unlocked = Array.isArray(clean.unlocked)
    ? clean.unlocked.filter(k => validKeys.has(k))
    : [];
  const completed = Array.isArray(clean.completed)
    ? clean.completed.filter(k => validKeys.has(k))
    : [];

  if (!unlocked.length) unlocked.push('v1');
  return {
    unlocked: [...new Set(unlocked)],
    completed: [...new Set(completed)],
    stars: Number.isFinite(Number(clean.stars)) ? Number(clean.stars) : 0,
    achievements: Array.isArray(clean.achievements) ? clean.achievements : []
  };
}
async function completeLoginSession(user) {
  currentUser = user;
  studentEmail = (user.email || '').toLowerCase();
  window.studentEmail = studentEmail;
  try {
    const saved = localStorage.getItem(getProgressKey());
    if (saved) playerProgress = JSON.parse(saved);
  } catch(e){}

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from(SUPABASE_PROFILE_TABLE)
        .select('student_code, progress')
        .eq('user_id', user.id)
        .maybeSingle();
      if (!error && data) {
        studentCode = data.student_code || '';
        window.studentCode = studentCode;
        if (data.progress) playerProgress = data.progress;
      } else if (!data) {
        await saveProgressRemote();
      }
    } catch(e) {
      console.warn('Remote profile load failed', e);
    }
  }

  playerProgress = normalizeProgress(playerProgress);
  updateAccountUi();
  document.getElementById('studentName').textContent = studentCode ? 'Student ' + studentCode : studentEmail;
  document.getElementById('starsCount').textContent = playerProgress.stars;
  const login = document.getElementById('login-overlay');
  if (login) login.style.display = 'none';
  document.getElementById('home-screen').style.display = 'block';
  if (typeof _navInit === 'function') _navInit(studentEmail);
  if (typeof _navOnScreen === 'function') _navOnScreen('home-screen');
  const oldBackBtn = document.getElementById('main-back-btn');
  if (oldBackBtn) oldBackBtn.style.display = 'block';

  try { const t = localStorage.getItem('verblab_theme'); if(t){ document.body.setAttribute('data-theme', t); document.getElementById('theme-icon').className=t==='dark'?'fas fa-sun':'fas fa-moon';} } catch(e){}
  renderMap();
  saveProgress();
  return true;
}
async function startVerbLabLocalSession(session = {}) {
  currentUser = session.user || currentUser || { id: session.profileId || 'local-verb-lab-student', email: '', role: 'student' };
  studentEmail = (session.studentEmail || studentEmail || '').toLowerCase();
  studentCode = session.studentCode || studentCode || '';
  window.studentEmail = studentEmail;
  window.studentCode = studentCode;

  try {
    const saved = localStorage.getItem(getProgressKey());
    if (saved) playerProgress = JSON.parse(saved);
  } catch(e){}

  if (session.progress) playerProgress = session.progress;
  playerProgress = normalizeProgress(playerProgress);

  const label = session.displayName || session.activeChildName || studentEmail || (studentCode ? 'Student ' + studentCode : 'Student');
  const login = document.getElementById('login-overlay');
  const home = document.getElementById('home-screen');
  const name = document.getElementById('studentName');
  const stars = document.getElementById('starsCount');

  updateAccountUi();
  if (login) login.style.display = 'none';
  if (home) home.style.display = 'block';
  if (name) name.textContent = label;
  if (stars) stars.textContent = playerProgress.stars;
  if (typeof _navInit === 'function') _navInit(label);
  if (typeof _navOnScreen === 'function') _navOnScreen('home-screen');

  try {
    const t = localStorage.getItem('verblab_theme');
    if(t){
      document.body.setAttribute('data-theme', t);
      const icon = document.getElementById('theme-icon');
      if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  } catch(e){}

  renderMap();
  saveProgress();
  return true;
}
async function restoreAuthSession() {
  const client = getSupabaseClient();
  try { const t = localStorage.getItem('verblab_theme'); if(t){ document.body.setAttribute('data-theme', t); const icon = document.getElementById('theme-icon'); if (icon) icon.className=t==='dark'?'fas fa-sun':'fas fa-moon';} } catch(e){}
  if (!client) {
    await startVerbLabLocalSession();
    return;
  }
  const { data } = await client.auth.getSession();
  if (data?.session?.user) {
    await completeLoginSession(data.session.user);
  } else {
    await startVerbLabLocalSession();
  }
  client.auth.onAuthStateChange(function(event, session) {
    if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
      completeLoginSession(session.user);
    }
  });
}
function updateAccountUi() {
  const label = studentCode ? studentCode : studentEmail;
  const emailEls = ['nav-account-email', 'account-menu-email'];
  emailEls.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = studentEmail || '—'; });
  const navName = document.getElementById('nav-student-name');
  const tabName = document.getElementById('tab-name');
  const codeInput = document.getElementById('studentCodeNavInput');
  if (navName) navName.textContent = label || '—';
  if (tabName) tabName.textContent = studentCode ? studentCode : 'أنا';
  if (codeInput) codeInput.value = studentCode || '';
}
async function updateStudentCode() {
  studentCode = (document.getElementById('studentCodeNavInput')?.value || '').trim();
  window.studentCode = studentCode;
  updateAccountUi();
  saveProgress();
  showToast(studentCode ? 'Student code saved' : 'Student code cleared');
}
async function logoutStudent() {
  await saveProgressRemote();
  const client = getSupabaseClient();
  if (client) await client.auth.signOut();
  currentUser = null;
  studentEmail = '';
  studentCode = '';
  window.studentEmail = '';
  window.studentCode = '';
  playerProgress = { unlocked: ['v1'], stars: 0, completed: [] };
  const verbScreen = document.getElementById('verb-screen');
  if (verbScreen) verbScreen.style.display = 'none';
  const login = document.getElementById('login-overlay');
  if (login) login.style.display = 'none';
  const home = document.getElementById('home-screen');
  if (home) home.style.display = 'block';
  document.body.classList.remove('nav-open', 'tabs-visible');
  const nav = document.getElementById('app-nav');
  if (nav) nav.classList.remove('nav-visible');
  const menu = document.getElementById('nav-account-menu');
  if (menu) menu.classList.remove('open');
  await startVerbLabLocalSession();
}
function _toggleAccountMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('nav-account-menu');
  if (menu) menu.classList.toggle('open');
}


function goHome() {
  const vs = document.getElementById('verb-screen'); vs.style.opacity = '0';
  setTimeout(() => {
    vs.style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('reading-check-btns').classList.remove('visible');
  }, 400);
  renderMap();
}

let currentLottie = null;
let _verbObservers = [];  // Track IntersectionObservers for cleanup

function _cleanupObservers() {
  _verbObservers.forEach(o => { try { o.disconnect(); } catch(e){} });
  _verbObservers = [];
}

// Count of visible sections inside verb-screen (dynamic, for dots)
function _countVisibleSections() {
  return Array.from(document.querySelectorAll('#verb-screen .step-section'))
    .filter(s => s.style.display !== 'none').length;
}

function renderMap() {
  const total = VERB_KEYS.length, done = playerProgress.completed.length;
  const pct = Math.round(done/total*100);
  document.getElementById('home-progress-fill').style.width = pct+'%';
  document.getElementById('home-progress-pct').textContent = pct+'%';

  ['phase1-nodes','phase2-nodes'].forEach((id, pIdx) => {
    const container = document.getElementById(id); if (!container) return;
    const keys = pIdx === 0 ? VERB_KEYS.slice(0, 10) : VERB_KEYS.slice(10, 20);
    container.innerHTML = keys.map((key) => {
      const v = VERBS_DB[key]; if (!v) return '';
      const unlocked = playerProgress.unlocked.includes(key);
      const completed = playerProgress.completed.includes(key);
      const pastForm = (v.tenses && v.tenses.past) || v.symbol || '';
      const doerLabel = v.pronoun === 'هُوَ' ? 'He (هُوَ)' : 'I (أَنَا)';
      const lockIcon = !unlocked ? '<i class="fas fa-lock" style="position:absolute;top:20px;right:20px;color:#cbd5e1;font-size:1.5rem;z-index:2;"></i>' : '';
      const checkIcon = completed ? '<i class="fas fa-check-circle" style="position:absolute;top:20px;left:20px;color:#22c55e;font-size:1.5rem;z-index:2;"></i>' : '';

      return `
      <div class="dna-verb-card ${!unlocked ? 'locked' : ''}">
        ${lockIcon}
        ${checkIcon}
        <div class="v-masdar-wrap"><div class="v-masdar-en">${v.actionEn}</div></div>
        <div class="lottie-container" id="lmap-${key}">${unlocked ? '' : '❓'}</div>
        <div class="v-ar">${v.symbol}</div>
        <div class="v-en" style="direction:ltr;">${pastForm}</div>

${unlocked ? `
      <div class="verb-pair-container">
          <button class="sub-card-btn core" onclick="openVerb('${key}', 'core')">
            <i class="fas fa-bolt"></i> Level 1: Verb Core
          </button>
          <button class="sub-card-btn pronouns" onclick="openVerb('${key}', 'pronouns')">
            <i class="fas fa-users"></i> Level 2: Pronouns
          </button>
          <button class="sub-card-btn nouns" onclick="openVerb('${key}', 'nouns')">
            <i class="fas fa-tree"></i> Level 3: Nouns & Fluency
          </button>
        </div>
        ` : `

        <div class="v-dna-breakdown" style="margin-top:15px;">
          <div class="dna-row">🎬 Action: <span>${v.actionEn}</span></div>
          <div class="dna-row">⏱️ Time: <span>Past→Future</span></div>
          <div class="dna-row">👤 Doer: <span>${doerLabel}</span></div>
        </div>
        `}
      </div>`;
    }).join('');

    keys.forEach(k => {
      if (playerProgress.unlocked.includes(k) && VERBS_DB[k].file) {
        try { lottie.loadAnimation({container:document.getElementById(`lmap-${k}`), renderer:'svg', loop:true, autoplay:true, path:getVerbLottiePath(VERBS_DB[k].file)}); } catch(e){}
      }
    });
  });
}

function openVerb(key, lessonType = 'core') {
  activeVerb = key;
  const v = VERBS_DB[key];
  if (!v) return;

  _cleanupObservers();

  // إخفاء الخريطة الرئيسية وإظهار شاشة الفعل
  document.getElementById('home-screen').style.display = 'none';
  const vs = document.getElementById('verb-screen');
  vs.style.display = 'block';
  setTimeout(() => vs.style.opacity = '1', 50);
  document.getElementById('reading-check-btns').classList.remove('visible');

  // إخفاء كل الأقسام أولاً للتحكم فيها حسب المستوى
  const allSections = document.querySelectorAll('#verb-screen .step-section');
  allSections.forEach(s => s.style.display = 'none');

  // تعريف أرقام وأسماء الأقسام الخاصة بكل مستوى
  // ملاحظة: 4 = XO, 6 = Memory Match, 7 = Speed Reading
  const coreSections = ['0', '1', '2', '3', 'prepositions', 'review', 'dna', 'final-quiz', '4', '6', '7'];
  const pronounSections = ['summary', 'decoder', 'decoder-game', '4', '6', '7'];
  const nounSections = ['match-review', 'nouns-family', 'sentence-builder', '4', '6', '7'];

  let activeList;
  let gameWordsPool = []; // مسبح الكلمات الذي سيغذي الألعاب

  // 1. تحديد الأقسام والكلمات حسب نوع الدرس
  if (lessonType === 'core') {
      activeList = coreSections;
      // سحب كل أشكال الفعل للمستوى الأول
      gameWordsPool = [...new Set([...(v.allForms||[]), ...(v.tensesWithPronoun||[])])];

  } else if (lessonType === 'pronouns') {
      activeList = pronounSections;
      // سحب الضمائر والتصريفات الأساسية للمستوى الثاني
      const pronounForms = _getPronounTenseGroups(v)
          .flatMap(group => group.forms.map(item => item.form))
          .filter(Boolean);
      gameWordsPool = [...new Set(['أَنَا', 'هُوَ', 'هِيَ', 'نَحْنُ', 'أَنْتَ', 'أَنْتِ', 'أَنْتُمْ', 'هُمْ', ...pronounForms])];

  } else if (lessonType === 'nouns') {
      activeList = nounSections;
      const nData = _getNounData(key);
      // سحب عائلة الاسم والمفردات للمستوى الثالث
      gameWordsPool = [
          nData.deriv.masdar.ar,
          nData.deriv.faail.ar,
          nData.deriv.mafool.ar,
          nData.deriv.makan.ar,
          ...nData.vocab.map(x => x.ar)
      ].filter(w => w && w !== '—');
  }

  // إظهار الأقسام المطلوبة فقط
  allSections.forEach(s => {
      const secId = s.getAttribute('data-section');
      if (activeList.includes(secId) || !secId) { // !secId يُظهر زر "Next Verb" في النهاية
          s.style.display = 'flex';
      }
  });

  // 2. تشغيل المحركات الأساسية الخاصة بكل مستوى
  if (lessonType === 'core') {
      // تحديث بيانات بطاقة الـ DNA (Hero Section)
      if (document.getElementById('ui-verb-root')) document.getElementById('ui-verb-root').textContent = v.symbol;
      if (document.getElementById('ui-verb-en')) document.getElementById('ui-verb-en').textContent = v.pastEn;
      if (document.getElementById('ui-trait-action')) document.getElementById('ui-trait-action').textContent = v.actionEn;
      if (document.getElementById('ui-trait-time')) document.getElementById('ui-trait-time').textContent = 'Past -> Future';
      if (document.getElementById('ui-trait-doer')) document.getElementById('ui-trait-doer').textContent = v.pronoun;

      // تشغيل رسوم متحركة الفعل (Lottie)
      const lottieContainer = document.getElementById('ui-verb-lottie');
      if (lottieContainer) {
          lottieContainer.innerHTML = '';
          if (v.file) {
              try { lottie.loadAnimation({ container: lottieContainer, renderer: 'svg', loop: true, autoplay: true, path: getVerbLottiePath(v.file) }); } catch(e){}
          } else {
              lottieContainer.innerHTML = '❓';
          }
      }

      _initAffixes(v);
      _initTenses(v);
      _initMissing(v);
      _initPrepositions(v);
      initDnaMatcher();
      const reviewSec = document.getElementById('section-review');
      if (reviewSec && reviewSec.style.display !== 'none') initReviewLab();

  } else if (lessonType === 'pronouns') {
      _initSummaryTable(v);
      _initPronounDecoder();
      _initDecoderGame();

  } else if (lessonType === 'nouns') {
      _initMatchGame(v);
      _initNounsLesson(v, key);
  }

  // 3. تأمين مسبح الكلمات (لمنع تعطل الألعاب المشتركة)
  if (!gameWordsPool || gameWordsPool.length === 0) {
      gameWordsPool = [v.tenses.past, v.tenses.present, v.actionEn, 'فِعْل', 'اسْم'];
  }
  window.currentLevelWords = gameWordsPool;

  // 4. تشغيل الألعاب المشتركة بشكل آمن
  setTimeout(() => {
      try {
          // التأكد من ظهور حاويات الألعاب إذا كانت مطلوبة في المستوى الحالي
          const xoWrap = document.querySelector('[data-section="4"]');
          const memWrap = document.querySelector('[data-section="6"]');
          if (xoWrap && activeList.includes('4')) xoWrap.style.display = 'flex';
          if (memWrap && activeList.includes('6')) memWrap.style.display = 'flex';

          if(typeof initXO === 'function') initXO(gameWordsPool);
          if(typeof initMemory === 'function') initMemory(gameWordsPool);
          if(typeof verbSrRestart === 'function') verbSrRestart();
      } catch(err) {
          console.error("Game Engine Error:", err);
      }
  }, 150);

  // تشغيل أزرار التكبير (Fullscreen) إن وُجدت
  if (typeof installFullscreenButtons === 'function') {
      installFullscreenButtons();
  }

  setTimeout(() => speakAr(v.symbol), 500);
  vs.scrollTo({top:0});
}
function goNextVerb() {
  if (!playerProgress.completed.includes(activeVerb)) {
    playerProgress.completed.push(activeVerb);
    checkAchievements();
  }
  const idx = VERB_KEYS.indexOf(activeVerb);
  if (idx + 1 < VERB_KEYS.length) {
    const nk = VERB_KEYS[idx + 1];
    if (!playerProgress.unlocked.includes(nk)) playerProgress.unlocked.push(nk);
    saveProgress();
    openVerb(nk);
  } else {
    saveProgress();
    // Stay on v20 so user can take the Final Quiz
    showVictory('🎓', 'All 20 verbs! Try the Master Quiz below.');
  }
}

/* ══════════════════════════════════════════════════════════════════
   GAME ENGINES — v2 (fixed + enriched)
══════════════════════════════════════════════════════════════════ */

/* ─── 1. AFFIXES ────────────────────────────────────────────────── */
function _initAffixes(v) {
  const grid = document.getElementById('ui-affix-grid');
  if (!grid) return;

  const pastWord = v.tenses.past;
  const presentWord = v.tenses.present;
  const noConnect = ['أ', 'آ', 'د', 'ذ', 'ر', 'ز', 'و'];

  const mappedAffixes = (v.affixes || []).map(a => {
    let p1 = '', p2 = '', res = '';

    if (a.label.includes('Past')) {
      a.label = 'Past / Root';
      p1 = ''; p2 = ''; // لا توجد معادلة
      res = pastWord;   // النتيجة فقط
    }
    else if (a.label.includes('Present')) {
      const lastChar = a.prefix.slice(-1).replace(/[ًٌٍَُِّْ]/g, '');
      const dash = noConnect.includes(lastChar) ? '' : 'ـ';
      p1 = a.prefix + dash;
      p2 = pastWord;
      res = presentWord;
    }
    else if (a.label.includes('Future سَ')) {
      p1 = 'سَـ';
      p2 = presentWord;
      res = v.tenses.futureSa;
    }
    else if (a.label.includes('Future سوف')) {
      p1 = 'سَوْفَ';
      p2 = presentWord;
      res = v.tenses.futureSawfa;
    }
    else if (a.label.includes('Command')) {
      p1 = ''; p2 = ''; // لا توجد معادلة
      res = v.tenses.command; // النتيجة فقط
    }

    return { ...a, p1, p2, res };
  });

  grid.innerHTML = mappedAffixes.map((a, i) => `
    <div class="affix-card" style="border-bottom-color:${a.color||'var(--verb)'};">
      <div class="affix-badge" style="background:${a.color||'var(--verb)'};">${i+1}</div>
      <div class="affix-label" style="color:${a.color||'var(--verb)'};">${a.label}</div>
      <div class="affix-formula" onclick="speakAr('${a.res}')">

        <div class="af-equation">
          ${a.p1 ? `
            <span class="af-part prefix" style="color:${a.color};">${a.p1}</span>
            <span class="af-sign">+</span>
            <span class="af-part">${a.p2}</span>
          ` : ``}
        </div>

        ${a.p1 ? `<span class="af-sign equals">=</span>` : `<div style="height: 15px;"></div>`}

        <span class="af-result">${a.res}</span>

      </div>
    </div>
  `).join('');
}
/* ─── 2. TENSES (Horizontal Cards Engine) ────────────────────────────────── */

/* ─── 2. TENSES (Elegant Horizontal Cards Engine with Colored Prefixes) ────────────────── */
function _initTenses(v) {
  const container = document.getElementById('ui-tenses-list'); // تأكد من هذا السطر
  if (!container) return;

  const pro = v.pronoun || 'هُوَ';
  const afx = v.affixes || [];

  // دالة مساعدة لجلب لون وشكل الإضافة من قاعدة البيانات
  const getAfx = (labelStr) => afx.find(a => a.label.includes(labelStr)) || { prefix: '', root: '', color: 'var(--text)' };

  const pastAfx = getAfx('Past');
  const presAfx = getAfx('Present');
  const futSaAfx = getAfx('Future سَ');
  const futSawfaAfx = getAfx('Future سوف');
  const cmdAfx = getAfx('Command');

 // دالة لتلوين البادئة مع الاعتماد على محرك المتصفح الطبيعي لربط الحروف
  const formatWord = (a) => {
    if (!a.prefix) return `<span style="color:var(--text)">${a.root}</span>`;

    // إذا كانت البادئة تنتهي بمسافة (مثل: سَوْفَ )
    if (a.prefix.endsWith(' ')) {
        return `<span style="color:${a.color}">${a.prefix}</span><span style="color:var(--text)">${a.root}</span>`;
    }

    // ترك الـ spans بجوار بعضها مباشرة سيجعل المتصفح يربطها تلقائياً بدون ذيول زائدة
    return `<span style="color:${a.color}">${a.prefix}</span><span style="color:var(--text)">${a.root}</span>`;
  };

  const cards = [
    { en: 'PAST',           ar: 'الماضي',         rawWord: `${pro} ${v.tenses.past}`,         htmlWord: formatWord(pastAfx),        icon: '⏳' },
    { en: 'PRESENT',        ar: 'المضارع',       rawWord: `${pro} ${v.tenses.present}`,      htmlWord: formatWord(presAfx),        icon: '🔄' },
    { en: 'FUTURE (NEAR)',  ar: 'مستقبل قريب',    rawWord: `${pro} ${v.tenses.futureSa}`,     htmlWord: formatWord(futSaAfx),       icon: '🔜' },
    { en: 'FUTURE (FAR)',   ar: 'مستقبل بعيد',    rawWord: `${pro} ${v.tenses.futureSawfa}`,  htmlWord: formatWord(futSawfaAfx),    icon: '🚀' },
    { en: 'IMPERATIVE',     ar: 'الأمــــر',      rawWord: v.tenses.command,                  htmlWord: formatWord(cmdAfx),         icon: '🎯', note: v.commandIsIrregular ? '⚠️ شاذ (Irregular)' : null }
  ];

  container.innerHTML = cards.map(c => `
    <div class="elegant-tense-card animate-up" onclick="speakAr('${c.rawWord}')">
      <div class="etc-header">
        <span class="etc-icon">${c.icon}</span>
        <div class="etc-titles">
          <span class="etc-title-en">${c.en}</span>
          <span class="etc-title-ar">${c.ar}</span>
        </div>
      </div>
      <div class="etc-body">
${c.en !== 'IMPERATIVE' ? `<div style="font-family:var(--font-ar); font-size:1.4rem; color:var(--verb-d); background:var(--verb-l); padding:4px 16px; border-radius:10px; border:1px solid var(--verb); font-weight:900; margin-bottom:12px; box-shadow:var(--shadow-sm);">${pro}</div>` : ''}        <div class="etc-word">${c.htmlWord}</div>
        ${c.note ? `<div class="etc-note">${c.note}</div>` : ''}
      </div>
    </div>
  `).join('');
}

/* ─── 3. MISSING PREFIX ─────────────────────────────────────────── */

function _initMissing(v) {
  const grid = document.getElementById('ui-missing-grid');
  const wrap = document.querySelector('.missing-wrap');
  if (!grid || !wrap) return;

  // 1. استخراج وتكوين البادئات الذكية (للمرحلتين: هو / أنا)
  const pAffix = v.affixes.find(a => a.label.includes('Present') || a.label.includes('مضارع'));
  const pref = pAffix ? pAffix.prefix : 'يَ';
  const noConnect = ['أ', 'آ', 'د', 'ذ', 'ر', 'ز', 'و'];
  const lastChar = pref.slice(-1).replace(/[ًٌٍَُِّْ]/g, '');
  const dash = noConnect.includes(lastChar) ? '' : 'ـ';

  const prefDisplay = pref + dash;                  // مثال: يَـ
  const saPrefDisplay = 'سَ' + pref + dash;         // مثال: سَيَـ
  const sawfaPrefDisplay = 'سَوْفَ ' + pref + dash;   // مثال: سَوْفَ يَـ

  // 2. بناء الأسطورة العلوية (6 خيارات)
  const legend = [
    { id: 1, val: 'فراغ' },
    { id: 2, val: prefDisplay },
    { id: 3, val: 'سَـ' },
    { id: 4, val: 'سَوْفَ' },
    { id: 5, val: saPrefDisplay },
    { id: 6, val: sawfaPrefDisplay }
  ];

  window._legendMap = legend; // حفظها للاستخدام في دالة التحقق

  let legendContainer = document.getElementById('ui-missing-legend');
  if (!legendContainer) {
      legendContainer = document.createElement('div');
      legendContainer.id = 'ui-missing-legend';
      legendContainer.className = 'missing-legend';
      wrap.insertBefore(legendContainer, grid);
  }
  // رسم الأسطورة
  legendContainer.innerHTML = legend.map(l => `
    <div class="leg-item">
        <span class="leg-num">${l.id}</span>
        <span class="leg-val">${l.val === 'فراغ' ? '<span style="color:var(--text-muted);font-size:1.2rem;">فراغ</span>' : l.val}</span>
    </div>
  `).join('');

  // 3. بناء البطاقات الـ 6 (الأسئلة)
  const rootPart = pAffix ? pAffix.root : v.tenses.past; // الجذر (أْكُلُ)
  const presentFull = v.tenses.present;                  // الكلمة كاملة (يَأْكُلُ)

  // قاعدة بيانات الأسئلة المصغرة (تغنينا عن الـ If statements المعقدة)
  window._mCardsData = [
    { title: 'ماضي — Past',         rest: v.tenses.past, ans: 1, final: v.tenses.past },
    { title: 'مضارع — Present',     rest: rootPart,      ans: 2, final: presentFull },
    { title: 'مستقبل — Future سَ',   rest: presentFull,   ans: 3, final: v.tenses.futureSa },
    { title: 'مستقبل — Future سوف', rest: presentFull,   ans: 4, final: v.tenses.futureSawfa },
    { title: 'مستقبل — Future سَ',   rest: rootPart,      ans: 5, final: v.tenses.futureSa },
    { title: 'مستقبل — Future سوف', rest: rootPart,      ans: 6, final: v.tenses.futureSawfa }
  ];

  grid.innerHTML = window._mCardsData.map((c, i) => `
    <div class="missing-card" id="mcard-${i}" data-done="0">
      <div class="missing-hint">${c.title}</div>
      <div class="missing-phrase" id="mphrase-${i}">
        <span class="pro">${v.pronoun}</span>
        <span class="gap" id="mgap-${i}">----</span>
        <span class="rest">${c.rest}</span>
      </div>
      <div class="missing-opts-num">
        ${[1, 2, 3, 4, 5, 6].map(num => `
            <button class="m-opt-btn" data-opt="${num}" onclick="_checkMissing(${i}, ${num}, ${c.ans})">${num}</button>
        `).join('')}
      </div>
    </div>
  `).join('');

  // 4. بناء شريط التقدم للـ 6 أسئلة
  let prog = document.getElementById('ui-missing-prog');
  if (!prog) {
      prog = document.createElement('div');
      prog.id = 'ui-missing-prog';
      prog.className = 'missing-progress';
      wrap.appendChild(prog);
  }
  prog.innerHTML = `Progress: <span id="m-prog-val">0</span> / 6`;
  window._mProg = 0;
}

function _initPrepositions(v) {
  const grid = document.getElementById('ui-prep-grid');
  if (!grid) return;

  const items = Array.isArray(v.prepositions) ? v.prepositions : [];
  if (!items.length) {
    grid.innerHTML = `
      <div class="prep-empty">
        <i class="fas fa-link-slash"></i>
        <strong>No verb connections yet</strong>
        <span>This verb does not have preposition examples in the current knowledge base.</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((item, index) => {
    const word = item.word || '';
    const en = item.en || '';
    const ex = item.ex || '';
    return `
      <button class="prep-card animate-up" type="button" style="animation-delay:${index * 0.06}s;" onclick="speakAr('${escapeJsArg(word)}')">
        <div class="prep-icon"><i class="fas fa-link"></i></div>
        <div class="prep-word">${escapeHtml(word)}</div>
        <div class="prep-en">${escapeHtml(en)}</div>
        <div class="prep-ex">${escapeHtml(ex)}</div>
      </button>
    `;
  }).join('');
}

function _checkMissing(cIdx, pickedNum, correctNum) {
  const card = document.getElementById(`mcard-${cIdx}`);
  if (!card || card.dataset.done === '1') return;

  const btn = card.querySelector(`[data-opt="${pickedNum}"]`);
  const gap = document.getElementById(`mgap-${cIdx}`);
  const phrase = document.getElementById(`mphrase-${cIdx}`);

  const v = VERBS_DB[activeVerb];
  const cardData = window._mCardsData[cIdx];
  const pickedLegend = window._legendMap.find(l => l.id === pickedNum).val;

  if (pickedNum === correctNum) {
    // ✅ الإجابة صحيحة
    card.dataset.done = '1';
    btn.classList.add('correct');

    // كتابة الكلمة النهائية المكتملة بشكل أنيق
    phrase.innerHTML = `<span class="pro">${v.pronoun}</span> <span class="final-word" style="color:var(--verb-d); font-weight:900;">${cardData.final}</span>`;

    card.classList.add('solved');
    card.querySelector('.missing-opts-num').style.display = 'none';

    try { playMatchPro(); } catch(e){}
    addStars(2);
    window._mProg++;
    document.getElementById('m-prog-val').textContent = window._mProg;

    if (window._mProg === 6) {
        setTimeout(() => showVictory('🧩', 'Prefix Master!'), 500);
    }
  } else {
    // ❌ الإجابة خاطئة (UX السحري: نكتبها له ليراها بعينه ثم نمسحها)
    btn.classList.add('wrong');
    btn.disabled = true;

    const originalGapText = gap.innerHTML;
    gap.textContent = pickedLegend === 'فراغ' ? ' [فراغ] ' : pickedLegend;
    gap.style.color = 'var(--red)';
    gap.style.opacity = '1';

    try { playErrorSound(); } catch(e){}

    // إعادة الفراغ بعد لحظة ليعاود المحاولة
    setTimeout(() => {
        btn.classList.remove('wrong');
        gap.innerHTML = originalGapText;
        gap.style.color = 'var(--red)';
        gap.style.opacity = '0.6';
    }, 800);
  }
}

/* ══════════════════════════════════════════════════════════════════
   4. TIC-TAC-TOE (Bulletproof Engine)
══════════════════════════════════════════════════════════════════ */
let xoTurn = 'x', xoState = Array(9).fill(null), xoFinished = false;
const XO_WIN_PATTERNS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function initXO(customWords = null) {
  const v = VERBS_DB[activeVerb];
  if (!v) return;

  xoTurn = 'x';
  xoState = Array(9).fill(null);
  xoFinished = false;

  const statusEl = document.getElementById('xo-turn-status');
  if(statusEl) {
      statusEl.textContent = 'Turn: ❌ X';
      statusEl.className = 'xo-status turn-x';
  }

  const board = document.getElementById('xo-board');
  if(!board) return;
  board.innerHTML = '';
  board.classList.remove('draw-state');

  const winLine = document.getElementById('xo-win-line');
  if(winLine) winLine.style.display = 'none';

  // 🌟 معالجة ذكية للكلمات (لمنع أي تعطل)
  let poolWords = Array.isArray(customWords) ? customWords : window.currentLevelWords;
  if (!poolWords || poolWords.length === 0) {
      poolWords = [...new Set([...(v.allForms||[]), ...(v.tensesWithPronoun||[])])];
  }
  if (!poolWords || poolWords.length === 0) poolWords = ['فعل', 'اسم', 'حرف']; // أمان إضافي

  const pool = [...poolWords];
  // ملء المربعات الـ 9 بشكل دائري ومنتظم
  while (pool.length < 9) {
      pool.push(pool[pool.length % poolWords.length] || 'كلمة');
  }

  const words = pool.slice(0, 9).sort(() => 0.5 - Math.random());

  words.forEach((w, i) => {
    const c = document.createElement('div');
    c.className = 'xo-cell';
    c.innerHTML = `<span class="cell-n">${i+1}</span><span>${w}</span>`;
    c.onclick = () => _xoCellClick(c, i, w);
    board.appendChild(c);
  });
}

function _xoCellClick(cell, i, word) {
  if (xoFinished) return;
  if (xoState[i]) return;
  cell.classList.add(xoTurn);
  xoState[i] = xoTurn;
  speakAr(word);

  const win = _xoCheckWin(xoTurn);
  if (win) {
    xoFinished = true;
    const board = document.getElementById('xo-board');
    win.forEach(idx => board.children[idx].classList.add('win'));
    _showXoBanner(xoTurn === 'x' ? '❌ X Wins!' : '⭕ O Wins!');
    playVictorySound();
    addStars(5);
    fireConfetti();
    return;
  }

  if (xoState.every(s => s !== null)) {
    xoFinished = true;
    _showXoBanner('🤝 Draw! — تعادل');
    playTone(400, 'triangle', 0.4, 0.12);
    return;
  }

  xoTurn = xoTurn === 'x' ? 'o' : 'x';
  const statusEl = document.getElementById('xo-turn-status');
  statusEl.textContent = xoTurn === 'x' ? 'Turn: ❌ X' : 'Turn: ⭕ O';
  statusEl.className = 'xo-status ' + (xoTurn === 'x' ? 'turn-x' : 'turn-o');
}

function _xoCheckWin(symbol) {
  for (const pat of XO_WIN_PATTERNS) {
    if (pat.every(i => xoState[i] === symbol)) return pat;
  }
  return null;
}

function _showXoBanner(msg) {
  const board = document.getElementById('xo-board');
  if(!board) return;
  const wrap = board.parentElement.parentElement;
  const banner = document.createElement('div');
  banner.className = 'xo-winner-banner';
  banner.textContent = msg;
  wrap.appendChild(banner);
}

/* ══════════════════════════════════════════════════════════════════
   6. MEMORY MATCH (Bulletproof Engine)
══════════════════════════════════════════════════════════════════ */
let _memCards = [], _memFirst = null, _memSecond = null;
let _memLock = false, _memFlipped = false;
let _memMatchedCount = 0, _memTotalPairs = 5;

function initMemory(customWords = null) {
  const v = VERBS_DB[activeVerb];
  if (!v) return;

  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  // 🌟 معالجة ذكية للكلمات
  let poolWords = Array.isArray(customWords) ? customWords : window.currentLevelWords;
  if (!poolWords || poolWords.length === 0) {
      poolWords = [...new Set(v.allForms || [])];
  }
  if (!poolWords || poolWords.length === 0) poolWords = ['فعل', 'اسم', 'حرف'];

  const uniq = [...poolWords];
  const pool = uniq.slice(0, 5);
  while (pool.length < 5 && uniq.length > 0) {
      pool.push(uniq[pool.length % uniq.length]);
  }

  _memTotalPairs = 5;
  _memMatchedCount = 0;

  const deck = [...pool, ...pool].sort(() => 0.5 - Math.random());
  _memCards = deck;

  grid.innerHTML = '';
  deck.forEach((w, i) => {
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.dataset.word = w;
    card.innerHTML = `<div class="mem-face mem-back"><div class="mem-num">${i + 1}</div><i class="fas fa-star"></i></div><div class="mem-face mem-front">${w}</div>`;
    card.onclick = () => _memFlipCard(card);
    grid.appendChild(card);
  });

  _memFirst = _memSecond = null;
  _memLock = false;
  _memFlipped = false;
}

function _memFlipCard(card) {
  if (_memLock || card === _memFirst || card.classList.contains('matched')) return;

  try { playTone(600, 'sine', 0.1, 0.08); } catch(e){}
  card.classList.add('flip');
  speakAr(card.dataset.word);

  if (!_memFlipped) {
    _memFlipped = true;
    _memFirst = card;
    return;
  }

  _memSecond = card;
  _memLock = true;

  if (_memFirst.dataset.word === _memSecond.dataset.word) {
    try {
      playTone(1320, 'sine', 0.15, 0.12);
      setTimeout(() => playTone(1760, 'sine', 0.2, 0.1), 100);
    } catch(e){}

    _memFirst.classList.add('matched');
    _memSecond.classList.add('matched');

    _memFirst = _memSecond = null;
    _memFlipped = false;
    _memLock = false;
    _memMatchedCount++;

    if (_memMatchedCount === _memTotalPairs) {
      addStars(5);
      setTimeout(() => {
        if(typeof showVictory === 'function') showVictory('🧠', 'All Matched! — ممتاز!');
      }, 500);
    }
  } else {
    try {
      playTone(320, 'triangle', 0.15, 0.12);
      setTimeout(() => playTone(220, 'triangle', 0.2, 0.12), 80);
    } catch(e){}

    setTimeout(() => {
      if (_memFirst) _memFirst.classList.remove('flip');
      if (_memSecond) _memSecond.classList.remove('flip');
      _memFirst = _memSecond = null;
      _memFlipped = false;
      _memLock = false;
    }, 900);
  }
}

function memoryPeek() {
  if (_memLock) return;
  const peekBtn = document.getElementById('memory-peek-btn');
  const all = document.querySelectorAll('.mem-card');

  all.forEach(c => c.classList.add('flip'));
  _memLock = true;

  if (peekBtn) {
    peekBtn.disabled = true;
    peekBtn.innerHTML = 'Memorize... <i class="fas fa-clock"></i>';
  }

  setTimeout(() => {
    all.forEach(c => { if (!c.classList.contains('matched')) c.classList.remove('flip'); });
    _memLock = false;
    if (peekBtn) {
      peekBtn.disabled = false;
      peekBtn.innerHTML = 'Done! <i class="fas fa-check"></i>';
    }
  }, 4000);
}
/* ─── 7. SPEED READING (Repaired & Verb Lab Compatible) ──────────────────────── */
let _srState = {
  words: [], currentIdx: 0, score: 0, intervalMs: 2500, levelName: 'Medium',
  timerInterval: null, autoAdvanceTimeout: null
};

function verbSrStart(ms, level) {
  const v = VERBS_DB[activeVerb];
  if (!v) return;

  // 🌟 استخدام الكلمات الممررة للمستوى الحالي
  const poolWords = window.currentLevelWords || [...new Set(v.allForms || [])];
  let words = [...poolWords];
  while (words.length < 10) words = words.concat(poolWords);
  words = words.slice(0, 10).sort(() => 0.5 - Math.random());

  _srState.words = words;
  _srState.currentIdx = 0;
  _srState.score = 0;
  _srState.intervalMs = ms;
  _srState.levelName = level;

  document.getElementById('sr-start').style.display = 'none';
  document.getElementById('sr-results').style.display = 'none';
  document.getElementById('sr-playing').style.display = 'flex';
  document.getElementById('sr-level-name').textContent = level;

  _srNext();
}
function verbSrStartCustom() {
  const input = document.getElementById('sr-custom-input');
  if (!input) return;
  let val = parseFloat(input.value);
  if (isNaN(val) || val < 0.5) val = 3;
  if (val > 30) val = 30;
  verbSrStart(Math.round(val * 1000), `Custom (${val}s)`);
}

function _srNext() {
  clearTimeout(_srState.autoAdvanceTimeout);
  clearInterval(_srState.timerInterval);

  const idx = _srState.currentIdx;
  if (idx >= _srState.words.length) {
    _srShowResults();
    return;
  }

  const word = _srState.words[idx];
  const disp = document.getElementById('sr-word');
  disp.textContent = word;
  disp.classList.remove('sr-pop');
  void disp.offsetWidth; // reflow
  disp.classList.add('sr-pop');

  document.getElementById('sr-word-num').textContent = idx + 1;
  document.getElementById('sr-score').textContent = _srState.score;

  // إعادة تفعيل الأزرار
  document.querySelectorAll('.sr-btn').forEach(b => b.disabled = false);

  // شريط الوقت
  const bar = document.getElementById('sr-timer');
  bar.style.transition = 'none';
  bar.style.width = '100%';
  void bar.offsetWidth;
  bar.style.transition = `width ${_srState.intervalMs}ms linear`;
  bar.style.width = '0%';

  // التخطي التلقائي (Auto-miss) وأصوات التكتكة
  const tickTimer = _srState.intervalMs - 1000;
  if (tickTimer > 0) {
    _srState.autoAdvanceTimeout = setTimeout(() => {
      try { playTone(600, 'triangle', 0.1, 0.08); } catch(e){}
      setTimeout(() => { try { playTone(600, 'triangle', 0.1, 0.08); } catch(e){} }, 300);
      setTimeout(() => { try { playTone(600, 'triangle', 0.1, 0.08); } catch(e){} }, 600);

      setTimeout(() => {
        if (_srState.currentIdx === idx) verbSrAnswer(false, true);
      }, 1000);
    }, tickTimer);
  }
}

function verbSrAnswer(didRead, isTimeout = false) {
  const buttons = document.querySelectorAll('.sr-btn');
  if (buttons[0] && buttons[0].disabled) return;
  buttons.forEach(b => b.disabled = true);

  clearTimeout(_srState.autoAdvanceTimeout);
  const bar = document.getElementById('sr-timer');
  const computed = getComputedStyle(bar).width;
  bar.style.transition = 'none';
  bar.style.width = computed;

  if (didRead) {
    _srState.score++;
    // تم إيقاف speakAr حسب طلبك السابق، يمكنك تفعيلها إذا أردت
    // speakAr(_srState.words[_srState.currentIdx]);
    try { playMatchPro(); } catch(e){}
  } else {
    if (!isTimeout) { try { playTone(350, 'triangle', 0.15, 0.1); } catch(e){} }
    else { try { playErrorPro(); } catch(e){} }
  }

  _srState.currentIdx++;
  setTimeout(_srNext, 400);
}

function _srShowResults() {
  document.getElementById('sr-playing').style.display = 'none';
  document.getElementById('sr-results').style.display = 'flex';
  document.getElementById('sr-final').textContent = _srState.score;

  const ic = document.getElementById('sr-result-icon');
  const t = document.getElementById('sr-result-title');
  if (_srState.score === 10) { ic.textContent = '🏆'; t.textContent = 'Perfect!'; addStars(10); showVictory('⚡ Perfect!'); }
  else if (_srState.score >= 7) { ic.textContent = '🎉'; t.textContent = 'Excellent!'; addStars(5); }
  else if (_srState.score >= 4) { ic.textContent = '👍'; t.textContent = 'Good Job!'; addStars(2); }
  else { ic.textContent = '💪'; t.textContent = 'Keep Practicing!'; }

  _srSaveBest(_srState.score);
}

function verbSrRestart() {
  clearTimeout(_srState.autoAdvanceTimeout);
  document.getElementById('sr-playing').style.display = 'none';
  document.getElementById('sr-results').style.display = 'none';
  document.getElementById('sr-start').style.display = 'flex';
  _srLoadBest();
}

function _srSaveBest(score) {
  try {
    const k = 'verblab_sr_' + activeVerb;
    const prev = parseInt(localStorage.getItem(k) || '0');
    if (score > prev) localStorage.setItem(k, String(score));
    _srLoadBest();
  } catch(e){}
}
function _srLoadBest() {
  try {
    const best = parseInt(localStorage.getItem('verblab_sr_' + activeVerb) || '0');
    document.getElementById('sr-best').textContent = best;
  } catch(e){}
}

/* ══════════════════════════════════════════════════════════════════
   🔁 REVIEW LAB — Mixed questions from prior completed verbs
══════════════════════════════════════════════════════════════════ */
let _reviewState = {
  pool: [],        // array of prior-verb keys
  questions: [],   // array of question objects
  idx: 0,
  score: 0,
  streak: 0,
  total: 5
};
const TENSE_LABELS = {
  past:'Past (ماضي)',
  present:'Present (مضارع)',
  futureSa:'Future سَ (مستقبل قريب)',
  futureSawfa:'Future سوف (مستقبل بعيد)',
  command:'Command (أمر)'
};
function initReviewLab() {
  const verbIdx = VERB_KEYS.indexOf(activeVerb);
  // Prior-completed verbs (excluding current)
  const prior = playerProgress.completed.filter(k => VERB_KEYS.indexOf(k) < verbIdx && k !== activeVerb);
  if (prior.length === 0) {
    document.getElementById('section-review').style.display = 'none';
    return;
  }
  _reviewState.pool = prior;
  _reviewState.questions = _generateReviewQuestions(prior, Math.min(5, prior.length * 2 + 3));
  _reviewState.total = _reviewState.questions.length;
  _reviewState.idx = 0;
  _reviewState.score = 0;
  _reviewState.streak = 0;
  document.getElementById('review-q-total').textContent = _reviewState.total;
  document.getElementById('review-final-total').textContent = _reviewState.total;
  document.getElementById('review-complete').style.display = 'none';
  document.getElementById('review-card').style.display = '';
  _reviewNext();
}
function _generateReviewQuestions(priorKeys, count) {
  const qs = [];
  const types = ['identifyTense','identifyDoer','identifyRoot'];
  for (let i = 0; i < count; i++) {
    const verbKey = priorKeys[Math.floor(Math.random() * priorKeys.length)];
    const v = VERBS_DB[verbKey];
    const qType = types[Math.floor(Math.random() * types.length)];
    qs.push(_makeReviewQuestion(v, qType));
  }
  return qs;
}
function _makeReviewQuestion(v, type) {
  if (type === 'identifyTense') {
    // Pick a random tense from the verb, ask what tense it is
    const tenseKeys = Object.keys(v.tenses||{}).filter(k => v.tenses[k]);
    const chosen = tenseKeys[Math.floor(Math.random() * tenseKeys.length)];
    const word = v.tenses[chosen];
    // 4 options (labels)
    const correct = TENSE_LABELS[chosen];
    const distractors = Object.values(TENSE_LABELS).filter(l => l !== correct).sort(()=>0.5-Math.random()).slice(0,3);
    const opts = [correct, ...distractors].sort(()=>0.5-Math.random());
    return {
      prompt: 'What tense is this?',
      word: word,
      hint: `From: ${v.actionEn} (${v.pronoun})`,
      options: opts,
      correctIdx: opts.indexOf(correct),
      type: type
    };
  }
  if (type === 'identifyDoer') {
    const tenseKeys = Object.keys(v.tenses||{}).filter(k => v.tenses[k]);
    const chosen = tenseKeys[Math.floor(Math.random() * tenseKeys.length)];
    const word = v.tenses[chosen];
    const correct = v.pronoun;
    const opts = ['هُوَ','أَنَا'].sort(()=>0.5-Math.random());
    return {
      prompt: 'Who is the doer?',
      word: word,
      hint: `Tense: ${TENSE_LABELS[chosen]}`,
      options: opts,
      correctIdx: opts.indexOf(correct),
      type: type
    };
  }
  // identifyRoot
  const tenseKeys = Object.keys(v.tenses||{}).filter(k => v.tenses[k]);
  const chosen = tenseKeys[Math.floor(Math.random() * tenseKeys.length)];
  const word = v.tenses[chosen];
  const correct = v.actionEn.replace(' (I)','');
  const allActions = [...new Set(VERB_KEYS.map(k => VERBS_DB[k].actionEn.replace(' (I)','')))];
  const distractors = allActions.filter(a => a !== correct).sort(()=>0.5-Math.random()).slice(0,3);
  const opts = [correct, ...distractors].sort(()=>0.5-Math.random());
  return {
    prompt: 'What action does this verb describe?',
    word: word,
    hint: `Tense: ${TENSE_LABELS[chosen]} • Doer: ${v.pronoun}`,
    options: opts,
    correctIdx: opts.indexOf(correct),
    type: 'identifyRoot'
  };
}
function _reviewNext() {
  if (_reviewState.idx >= _reviewState.total) {
    _reviewComplete();
    return;
  }
  const q = _reviewState.questions[_reviewState.idx];
  document.getElementById('review-q-num').textContent = _reviewState.idx + 1;
  document.getElementById('review-score').textContent = _reviewState.score;
  document.getElementById('review-streak').textContent = _reviewState.streak;
  const pctFill = ((_reviewState.idx) / _reviewState.total) * 100;
  document.getElementById('review-prog-fill').style.width = pctFill + '%';

  document.getElementById('review-prompt').textContent = q.prompt;
  const wordEl = document.getElementById('review-word');
  wordEl.textContent = q.word;
  wordEl.onclick = () => speakAr(q.word);
  document.getElementById('review-hint').textContent = q.hint;
  document.getElementById('review-feedback').textContent = '';
  document.getElementById('review-feedback').className = 'review-feedback';

  const opts = document.getElementById('review-opts');
  opts.innerHTML = q.options.map((o, i) => `<button class="review-opt-btn" data-i="${i}" onclick="_reviewAnswer(${i})">${o}</button>`).join('');
  speakAr(q.word);
}
function _reviewAnswer(i) {
  const q = _reviewState.questions[_reviewState.idx];
  const opts = document.getElementById('review-opts');
  const buttons = opts.querySelectorAll('.review-opt-btn');
  buttons.forEach(b => b.disabled = true);
  const fb = document.getElementById('review-feedback');
  if (i === q.correctIdx) {
    buttons[i].classList.add('correct');
    _reviewState.score++;
    _reviewState.streak++;
    fb.textContent = '✅ Correct!';
    fb.className = 'review-feedback correct';
    playMatchPro();
    addStars(2);
  } else {
    buttons[i].classList.add('wrong');
    buttons[q.correctIdx].classList.add('correct');
    _reviewState.streak = 0;
    fb.textContent = `❌ Correct answer: ${q.options[q.correctIdx]}`;
    fb.className = 'review-feedback wrong';
    playErrorSound();
  }
  document.getElementById('review-score').textContent = _reviewState.score;
  document.getElementById('review-streak').textContent = _reviewState.streak;
  setTimeout(() => { _reviewState.idx++; _reviewNext(); }, 1500);
}
function _reviewComplete() {
  document.getElementById('review-card').style.display = 'none';
  document.getElementById('review-complete').style.display = 'block';
  document.getElementById('review-final-score').textContent = _reviewState.score;
  document.getElementById('review-prog-fill').style.width = '100%';
  if (_reviewState.score === _reviewState.total) {
    addStars(5); showVictory('🔁 Perfect Review!');
  } else if (_reviewState.score >= _reviewState.total * 0.7) {
    addStars(3);
  }
}



/* ══════════════════════════════════════════════════════════════════
   🧬 DNA MATCHER — For each verb, pick Action + Time + Doer
══════════════════════════════════════════════════════════════════ */
let _dnaState = { questions:[], idx:0, score:0, total:5, selAction:null, selTime:null, selDoer:null };

function initDnaMatcher() {
  _dnaState.questions = _generateDnaQuestions(5);
  _dnaState.idx = 0;
  _dnaState.score = 0;
  _dnaState.total = _dnaState.questions.length;
  document.getElementById('dna-q-total').textContent = _dnaState.total;
  _dnaNext();
}

function _generateDnaQuestions(n) {
  const qs = [];

  // 1. تحديد النطاق المسموح به: الفعل الحالي وكل الأفعال السابقة له فقط
  const currentIdx = VERB_KEYS.indexOf(activeVerb);
  const learnedVerbs = VERB_KEYS.slice(0, currentIdx + 1);

  // 2. تحديد خيارات التشتيت (Distractors): نأخذ الأفعال المدروسة.
  // (ملاحظة برمجية: إذا كان الطالب في الفعل الأول، نضطر لأخذ أول 4 أفعال فقط لملء أزرار الخيارات الأربعة للعبة)
  const distractorPool = VERB_KEYS.slice(0, Math.max(4, currentIdx + 1));

  // 3. تحديد الضمائر المسموحة بناءً على ما درسه
  let learnedPronouns = [];
  learnedVerbs.forEach(k => {
      let pro = VERBS_DB[k].pronoun;
      if (!learnedPronouns.includes(pro)) learnedPronouns.push(pro);
  });
  // لضمان وجود خيارين على الأقل في اللعبة لتكون هناك مقارنة
  if (learnedPronouns.length < 2) {
      learnedPronouns.push(learnedPronouns[0] === 'هُوَ' ? 'أَنَا' : 'هُوَ');
  }

  for (let i = 0; i < n; i++) {
    // السؤال يكون من الأفعال التي درسها فقط
    const verbKey = learnedVerbs[Math.floor(Math.random() * learnedVerbs.length)];
    const v = VERBS_DB[verbKey];

    // اختيار زمن عشوائي
    const tenseKeys = Object.keys(v.tenses||{}).filter(k => v.tenses[k]);
    const chosenTense = tenseKeys[Math.floor(Math.random() * tenseKeys.length)];

    // توليد خيارات أحداث خاطئة (Action Distractors) من الـ distractorPool فقط
    let actionOpts = [verbKey];
    while (actionOpts.length < 4) {
      let randK = distractorPool[Math.floor(Math.random() * distractorPool.length)];
      if (!actionOpts.includes(randK)) actionOpts.push(randK);
    }
    actionOpts = actionOpts.sort(() => 0.5 - Math.random());

    // توليد خيارات للضمائر (Doer)
    let doerOpts = [v.pronoun];
    while (doerOpts.length < 2) {
        let randP = learnedPronouns[Math.floor(Math.random() * learnedPronouns.length)];
        if (!doerOpts.includes(randP)) doerOpts.push(randP);
    }
    doerOpts = doerOpts.sort(() => 0.5 - Math.random());

    qs.push({
      word: v.tenses[chosenTense],
      correctAction: verbKey,
      actionOptions: actionOpts,
      correctTime: chosenTense,
      correctDoer: v.pronoun,
      doerOptions: doerOpts
    });
  }
  return qs;
}

function _dnaNext() {
  if (_dnaState.idx >= _dnaState.total) {
    showVictory('🧬 DNA Complete!', _dnaState.score + '/' + _dnaState.total);
    if (_dnaState.score === _dnaState.total) addStars(8);
    else if (_dnaState.score >= _dnaState.total * 0.7) addStars(3);
    return;
  }

  const q = _dnaState.questions[_dnaState.idx];

  // تصفير الاختيارات
  _dnaState.selAction = null;
  _dnaState.selTime = null;
  _dnaState.selDoer = null;

  document.getElementById('dna-q-num').textContent = _dnaState.idx + 1;
  document.getElementById('dna-score').textContent = _dnaState.score;

  const wordEl = document.getElementById('dna-word');
  wordEl.textContent = q.word;
  wordEl.onclick = () => speakAr(q.word);

  document.getElementById('dna-feedback').textContent = '';
  document.getElementById('dna-feedback').className = 'dna-feedback';

  // 1. أزرار الحدث (Action)
  // تم ربطها بالخيارات المسموحة فقط المدروسة سابقاً
  const actionBtns = document.getElementById('dna-action-btns');
  actionBtns.innerHTML = q.actionOptions.map(k => {
      const actName = VERBS_DB[k].actionEn.replace(' (I)', '');
      return `<button class="dna-choice-btn" data-action="${k}" onclick="_dnaPickAction('${k}')">${actName}</button>`;
  }).join('');

  // 2. أزرار الزمن (Time)
  const timeBtns = document.getElementById('dna-time-btns');
  const timeOpts = ['past','present','futureSa','futureSawfa','command'];
  timeBtns.innerHTML = timeOpts.map(t => `<button class="dna-choice-btn" data-time="${t}" onclick="_dnaPickTime('${t}')">${TENSE_LABELS[t]}</button>`).join('');

  // 3. أزرار الفاعل (Doer)
  // تم ربطها بالضمائر المسموحة فقط
  const doerBtns = document.getElementById('dna-doer-btns');
  doerBtns.innerHTML = q.doerOptions.map(d => `<button class="dna-choice-btn" data-doer="${d}" onclick="_dnaPickDoer('${d}')">${d==='هُوَ'?'He (هُوَ)':'I (أَنَا)'}</button>`).join('');

  document.getElementById('dna-submit').disabled = true;
}


// دوال التفاعل مع الأزرار
function _dnaPickAction(a) {
  _dnaState.selAction = a;
  document.querySelectorAll('[data-action]').forEach(b => b.classList.toggle('selected', b.dataset.action === a));
  _dnaCheckReady();
}
function _dnaPickTime(t) {
  _dnaState.selTime = t;
  document.querySelectorAll('[data-time]').forEach(b => b.classList.toggle('selected', b.dataset.time === t));
  _dnaCheckReady();
}
function _dnaPickDoer(d) {
  _dnaState.selDoer = d;
  document.querySelectorAll('[data-doer]').forEach(b => b.classList.toggle('selected', b.dataset.doer === d));
  _dnaCheckReady();
}

function _dnaCheckReady() {
  // تفعيل الزر فقط إذا اختار الثلاثة جينات!
  document.getElementById('dna-submit').disabled = !(_dnaState.selAction && _dnaState.selTime && _dnaState.selDoer);
}

function dnaSubmit() {
  const q = _dnaState.questions[_dnaState.idx];
  const fb = document.getElementById('dna-feedback');

  const actOk  = _dnaState.selAction === q.correctAction;
  const timeOk = _dnaState.selTime === q.correctTime;
  const doerOk = _dnaState.selDoer === q.correctDoer;

  if (actOk && timeOk && doerOk) {
    _dnaState.score++;
    fb.textContent = '✅ Perfect DNA match!';
    fb.className = 'dna-feedback correct';
    playMatchPro();
    addStars(2);
  } else {
    let msg = '❌ ';
    if (!actOk)  msg += `Action: ${VERBS_DB[q.correctAction].actionEn.replace(' (I)','')}. `;
    if (!timeOk) msg += `Time: ${TENSE_LABELS[q.correctTime]}. `;
    if (!doerOk) msg += `Doer: ${q.correctDoer==='هُوَ'?'هُوَ (He)':'أَنَا (I)'}.`;

    fb.textContent = msg;
    fb.className = 'dna-feedback wrong';
    playErrorSound();
  }

  document.getElementById('dna-score').textContent = _dnaState.score;
  setTimeout(() => { _dnaState.idx++; _dnaNext(); }, 2500); // تأخير ليقرأ التصحيح
}
/* ══════════════════════════════════════════════════════════════════
   🏆 FINAL MASTER QUIZ — 10 questions across all 20 verbs
══════════════════════════════════════════════════════════════════ */
let _quizState = { questions:[], idx:0, score:0 };
function startFinalQuiz() {
  // Generate 10 mixed questions from ALL completed verbs (or all 20 if all done)
  const pool = playerProgress.completed.length >= VERB_KEYS.length ? VERB_KEYS : playerProgress.completed.slice();
  if (pool.length < 3) { showToast('Complete at least 3 verbs first'); return; }
  const types = ['identifyTense','identifyDoer','identifyRoot'];
  const questions = [];
  for (let i = 0; i < 10; i++) {
    const key = pool[Math.floor(Math.random() * pool.length)];
    const v = VERBS_DB[key];
    const type = types[Math.floor(Math.random() * types.length)];
    questions.push(_makeReviewQuestion(v, type));
  }
  _quizState.questions = questions;
  _quizState.idx = 0;
  _quizState.score = 0;
  document.querySelector('#section-final-quiz .quiz-intro').style.display = 'none';
  document.getElementById('quiz-playing').style.display = 'block';
  document.getElementById('quiz-complete').style.display = 'none';
  _quizNext();
}
function _quizNext() {
  if (_quizState.idx >= 10) {
    _quizFinish();
    return;
  }
  const q = _quizState.questions[_quizState.idx];
  document.getElementById('quiz-q-num').textContent = _quizState.idx + 1;
  document.getElementById('quiz-score').textContent = _quizState.score;
  document.getElementById('quiz-prog-fill').style.width = ((_quizState.idx) / 10 * 100) + '%';
  document.getElementById('quiz-prompt').textContent = q.prompt;
  const wEl = document.getElementById('quiz-word');
  wEl.textContent = q.word;
  wEl.onclick = () => speakAr(q.word);
  document.getElementById('quiz-hint').textContent = q.hint;
  const fb = document.getElementById('quiz-feedback');
  fb.textContent = ''; fb.className = 'review-feedback';
  const opts = document.getElementById('quiz-opts');
  opts.innerHTML = q.options.map((o, i) => `<button class="review-opt-btn" onclick="_quizAnswer(${i})">${o}</button>`).join('');
  speakAr(q.word);
}
function _quizAnswer(i) {
  const q = _quizState.questions[_quizState.idx];
  const btns = document.querySelectorAll('#quiz-opts .review-opt-btn');
  btns.forEach(b => b.disabled = true);
  const fb = document.getElementById('quiz-feedback');
  if (i === q.correctIdx) {
    btns[i].classList.add('correct');
    _quizState.score++;
    fb.textContent = '✅ Correct!'; fb.className = 'review-feedback correct';
    playMatchPro();
  } else {
    btns[i].classList.add('wrong');
    btns[q.correctIdx].classList.add('correct');
    fb.textContent = `❌ Correct: ${q.options[q.correctIdx]}`;
    fb.className = 'review-feedback wrong';
    playErrorSound();
  }
  setTimeout(() => { _quizState.idx++; _quizNext(); }, 1500);
}
function _quizFinish() {
  document.getElementById('quiz-playing').style.display = 'none';
  document.getElementById('quiz-complete').style.display = 'block';
  document.getElementById('quiz-prog-fill').style.width = '100%';
  document.getElementById('cert-name').textContent = document.getElementById('studentName').textContent || 'Student';
  document.getElementById('cert-score').textContent = _quizState.score;
  const starsStr = _quizState.score === 10 ? '⭐⭐⭐⭐⭐' : _quizState.score >= 8 ? '⭐⭐⭐⭐' : _quizState.score >= 6 ? '⭐⭐⭐' : _quizState.score >= 4 ? '⭐⭐' : '⭐';
  document.getElementById('cert-stars').textContent = starsStr;
  if (_quizState.score === 10) {
    addStars(25); fireConfetti(); playVictorySound();
    _unlockAchievement('perfectionist', '🎯 Perfectionist', 'Perfect Master Quiz score');
  } else if (_quizState.score >= 7) {
    addStars(15); fireConfetti();
  } else addStars(5);
  _unlockAchievement('graduate', '🎓 Verb Graduate', 'Completed the Master Quiz');
}
function downloadCertificate() {
  const name = document.getElementById('studentName').textContent;
  const score = document.getElementById('cert-score').textContent;
  const stars = document.getElementById('cert-stars').textContent;
  const txt = `══════════════════════════════════════════
       THE VERB LAB — CERTIFICATE
══════════════════════════════════════════

This certifies that

    ${name}

has successfully completed The Verb Lab,
mastering 20 Arabic verbs across 5 tenses.

Final Master Quiz Score: ${score} / 10
Rating: ${stars}

Date: ${new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}

══════════════════════════════════════════`;
  const blob = new Blob([txt], {type:'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `VerbLab_Certificate_${(name||'Student').replace(/\s+/g,'_')}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ══════════════════════════════════════════════════════════════════
   🏅 ACHIEVEMENTS SYSTEM
══════════════════════════════════════════════════════════════════ */
const ACHIEVEMENTS = {
  first_verb: { icon:'🌱', title:'First Step', sub:'Completed your first verb' },
  phase1_master: { icon:'🥉', title:'Phase 1 Master', sub:'Completed all 10 هُوَ verbs' },
  phase2_master: { icon:'🥈', title:'Phase 2 Master', sub:'Completed all 10 أَنَا verbs' },
  all_verbs: { icon:'🏆', title:'Verb Master', sub:'Completed all 20 verbs' },
  star_collector: { icon:'⭐', title:'Star Collector', sub:'Earned 100 stars' },
  streak_5: { icon:'🔥', title:'Streak Hero', sub:'5-in-a-row streak' },
  graduate: { icon:'🎓', title:'Verb Graduate', sub:'Completed the Master Quiz' },
  perfectionist: { icon:'🎯', title:'Perfectionist', sub:'Perfect Master Quiz score' }
};
function checkAchievements() {
  if (!playerProgress.achievements) playerProgress.achievements = [];
  const has = k => playerProgress.achievements.includes(k);
  if (!has('first_verb') && playerProgress.completed.length >= 1) _unlockAchievement('first_verb');
  const p1 = VERB_KEYS.slice(0,10).every(k => playerProgress.completed.includes(k));
  const p2 = VERB_KEYS.slice(10,20).every(k => playerProgress.completed.includes(k));
  if (!has('phase1_master') && p1) _unlockAchievement('phase1_master');
  if (!has('phase2_master') && p2) _unlockAchievement('phase2_master');
  if (!has('all_verbs') && p1 && p2) _unlockAchievement('all_verbs');
  if (!has('star_collector') && playerProgress.stars >= 100) _unlockAchievement('star_collector');
}
function _unlockAchievement(key, overrideTitle, overrideSub) {
  if (!playerProgress.achievements) playerProgress.achievements = [];
  if (playerProgress.achievements.includes(key)) return;
  playerProgress.achievements.push(key);
  saveProgress();
  const a = ACHIEVEMENTS[key] || { icon:'🏅', title: overrideTitle||key, sub: overrideSub||'' };
  _showAchievementToast(a.icon, a.title, a.sub);
}
function _showAchievementToast(icon, title, sub) {
  let toast = document.getElementById('achievement-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'achievement-toast';
    toast.className = 'achievement-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<div class="ach-icon">${icon}</div><div class="ach-content"><div class="ach-label">Achievement Unlocked</div><div class="ach-title">${title}</div>${sub?`<div style="font-size:0.85rem;opacity:0.95;margin-top:2px;">${sub}</div>`:''}</div>`;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  playTone(800,'sine',0.15,0.15);
  setTimeout(()=>playTone(1200,'sine',0.15,0.12),150);
  setTimeout(()=>playTone(1600,'sine',0.2,0.15),300);
  setTimeout(()=>toast.classList.remove('show'), 4500);
}

/* ══════════════════════════════════════════════════════════════════
   🔍 FULLSCREEN — With context-aware navigation arrows
══════════════════════════════════════════════════════════════════ */
let _fsCurrent = null;
function installFullscreenButtons() {
  document.querySelectorAll('#verb-screen .step-section').forEach(sec => {
    // Skip the final-button section
    if (sec.querySelector('.next-level-btn')) return;
    if (sec.querySelector('.fs-toggle-btn')) return; // already installed
    const btn = document.createElement('button');
    btn.className = 'fs-toggle-btn';
    btn.setAttribute('aria-label', 'Toggle fullscreen');
    btn.setAttribute('tabindex', '0');
    btn.innerHTML = '<i class="fas fa-expand"></i>';
    btn.onclick = (e) => { e.stopPropagation(); _toggleFs(sec); };
    btn.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _toggleFs(sec); } };
    sec.appendChild(btn);
  });
  _ensureFsArrows();
  _ensureSectionNavBar();
}
function _toggleFs(sec) {
  if (sec.classList.contains('fs-section-active')) _exitFs();
  else _enterFs(sec);
}
function _enterFs(sec) {
  if (_fsCurrent && _fsCurrent !== sec) _fsCurrent.classList.remove('fs-section-active');
  sec.classList.add('fs-section-active');
  _fsCurrent = sec;
  document.body.style.overflow = 'hidden';
  document.body.classList.add('has-fs-active');
  // Add overlay if not present
  if (!document.getElementById('fs-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'fs-overlay';
    overlay.className = 'fs-overlay';
    document.body.appendChild(overlay);
  }
  const btn = sec.querySelector('.fs-toggle-btn');
  if (btn) btn.innerHTML = '<i class="fas fa-compress"></i>';
  _updateFsArrows();
  _updateSectionNavBar();
}
function _exitFs() {
  if (!_fsCurrent) return;
  _fsCurrent.classList.remove('fs-section-active');
  const btn = _fsCurrent.querySelector('.fs-toggle-btn');
  if (btn) btn.innerHTML = '<i class="fas fa-expand"></i>';
  _fsCurrent = null;
  document.body.style.overflow = 'auto';
  document.body.classList.remove('has-fs-active');
  // Remove overlay if present
  const overlay = document.getElementById('fs-overlay');
  if (overlay) overlay.remove();
  _updateSectionNavBar();
}

// SECTION NAV BAR (Horizontal navigation for all sections)
function _ensureSectionNavBar() {
  if (document.getElementById('section-nav-bar')) return;
  const nav = document.createElement('div');
  nav.id = 'section-nav-bar';
  nav.className = 'section-nav-bar';
  document.body.appendChild(nav);
  _updateSectionNavBar();
}

function _updateSectionNavBar() {
  const nav = document.getElementById('section-nav-bar');
  if (!nav) return;
  // Only show in fullscreen mode
  nav.style.display = document.body.classList.contains('has-fs-active') ? 'flex' : 'none';
  // Get all visible sections
  const sections = Array.from(document.querySelectorAll('#verb-screen .step-section'));
  nav.innerHTML = sections.map((sec, idx) => {
    const isActive = sec.classList.contains('fs-section-active');
    const title = sec.querySelector('.section-heading')?.textContent?.trim() || `Section ${idx+1}`;
    return `<button class="section-nav-btn${isActive ? ' active' : ''}" data-sec-idx="${idx}" tabindex="0">${title}</button>`;
  }).join('');
  // Add click/focus handlers
  nav.querySelectorAll('.section-nav-btn').forEach((btn, idx) => {
    btn.onclick = () => {
      const sec = document.querySelectorAll('#verb-screen .step-section')[idx];
      if (sec) _enterFs(sec);
    };
    btn.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } };
  });
}

function _ensureFsArrows() {
  if (document.getElementById('fs-nav-prev')) return;
  const prev = document.createElement('button');
  prev.id = 'fs-nav-prev';
  prev.className = 'fs-nav-arrow prev';
  prev.innerHTML = '<i class="fas fa-chevron-right"></i>'; // RTL: prev = right arrow
  prev.onclick = () => _fsNav(-1);
  const next = document.createElement('button');
  next.id = 'fs-nav-next';
  next.className = 'fs-nav-arrow next';
  next.innerHTML = '<i class="fas fa-chevron-left"></i>';
  next.onclick = () => _fsNav(1);
  document.body.appendChild(prev);
  document.body.appendChild(next);
}
function _updateFsArrows() {
  const prev = document.getElementById('fs-nav-prev');
  const next = document.getElementById('fs-nav-next');
  if (!prev || !next) return;
  if (!_fsCurrent) {
    prev.style.display = 'none';
    next.style.display = 'none';
    return;
  }
  const visibleSections = Array.from(document.querySelectorAll('#verb-screen .step-section'))
    .filter(s => s.style.display !== 'none' && !s.querySelector('.next-level-btn'));
  const idx = visibleSections.indexOf(_fsCurrent);
  prev.style.display = idx > 0 ? 'flex' : 'none';
  next.style.display = (idx !== -1 && idx < visibleSections.length - 1) ? 'flex' : 'none';
}
function _fsNav(delta) {
  const visibleSections = Array.from(document.querySelectorAll('#verb-screen .step-section'))
    .filter(s => s.style.display !== 'none' && !s.querySelector('.next-level-btn'));
  const idx = visibleSections.indexOf(_fsCurrent);
  if (idx === -1) return;
  const next = visibleSections[idx + delta];
  if (!next) return;
  _enterFs(next);
  next.scrollIntoView({behavior:'smooth', block:'start'});
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && _fsCurrent) _exitFs();
  if (_fsCurrent) {
    if (e.key === 'ArrowRight') _fsNav(-1); // RTL
    if (e.key === 'ArrowLeft') _fsNav(1);
  }
});

function updateReadingCheckVisibility() {
  const btns = document.getElementById('reading-check-btns');
  if (!btns) return;
  const vs = document.getElementById('verb-screen');
  const visible = vs && vs.style.display !== 'none' && vs.style.opacity !== '0';
  btns.classList.toggle('visible', !!visible);
}
new MutationObserver(updateReadingCheckVisibility).observe(
  document.getElementById('verb-screen') || document.body,
  {attributes:true, attributeFilter:['style']}
);


// 🌟 دالة انزلاق دائرة الضمير السحرية
function movePronounCircle(cardEl, speechText) {
    speakAr(speechText); // تشغيل النطق

    // تمييز الكارت الذي تم الضغط عليه
    const grid = cardEl.closest('.conjugation-grid');
    grid.querySelectorAll('.v-affix-card').forEach(c => c.classList.remove('active-card'));
    cardEl.classList.add('active-card');

    // حساب المسافة وتحريك الدائرة
    const row = cardEl.closest('.pronoun-row');
    const circle = row.querySelector('.pronoun-circle');
    if (!circle || window.innerWidth <= 800) return; // تعطيل الحركة في الموبايل

    const cardTop = cardEl.offsetTop;
    const cardHeight = cardEl.offsetHeight;
    const circleHeight = circle.offsetHeight;

    // محاذاة مركز الدائرة مع مركز الكارت
    const targetTop = cardTop + (cardHeight / 2) - (circleHeight / 2);
    circle.style.top = `${targetTop}px`;
}

function _initSummaryTable(v) {
    const container = document.getElementById('pronoun-sections-container');
    if (!container) return;

    // 1. استخراج الجذور بدقة
    let pastStem = v.symbol.slice(0, -1);
    if (v.symbol === 'نَامَ') pastStem = 'نِم';
    if (v.symbol === 'قَامَ') pastStem = 'قُم';
    if (v.symbol === 'جَاءَ') pastStem = 'جِئ';

    const pAffix = v.affixes.find(a => a.label.includes('Present')) || {root: ''};
    const presentRoot = pAffix.root;
    const presentStem = presentRoot ? presentRoot.slice(0, -1) : '';

    const cmd = v.tenses.command || '';
    let cmdStem = cmd ? cmd.slice(0, -1) : '';
    let cSufAnti = 'ِي';
    let cSufAntum = 'ُوا';
    let cmdAnti = cmdStem + cSufAnti;
    let cmdAntum = cmdStem + cSufAntum;

    if (v.symbol === 'جَاءَ') {
        cmdStem = 'تَعَالَ';
        cSufAnti = 'يْ';
        cmdAnti = 'تَعَالَيْ';
        cSufAntum = 'وْا';
        cmdAntum = 'تَعَالَوْا';
    }

    const noConnect = ['أ', 'آ', 'د', 'ذ', 'ر', 'ز', 'و'];
    function getPref(p) {
        if (!p) return '';
        if (p.endsWith(' ')) return p;
        const lastChar = p.slice(-1).replace(/[ًٌٍَُِّْ]/g, '');
        return p + (noConnect.includes(lastChar) ? '' : 'ـ');
    }

    // 2. دالة بناء الكارت (🌟 تم عكس الترتيب هنا + إضافة المسمى الإنجليزي)
    function buildCard(labelAr, labelEn, prefix, root, suffix, plainResult, color) {
        let eqHtml = '';
        if (prefix) eqHtml += `<span style="color:${color}; font-weight:900;">${getPref(prefix)}</span> <span style="color:var(--text-muted); font-family:sans-serif; opacity:0.4; margin:0 6px; font-size:1.5rem;">+</span> `;
        eqHtml += `<span style="color:var(--text); font-weight:900;">${root}</span>`;
        if (suffix) eqHtml += ` <span style="color:var(--text-muted); font-family:sans-serif; opacity:0.4; margin:0 6px; font-size:1.5rem;">+</span> <span style="color:${color}; font-weight:900;">${suffix}</span>`;

        let resultInnerHtml = '';
        if (prefix) resultInnerHtml += `<span style="color:${color};">${prefix}</span>`;
        resultInnerHtml += `<span style="color:inherit;">${root}</span>`;
        if (suffix) resultInnerHtml += `<span style="color:${color};">${suffix}</span>`;

        let resultHtml = `<span style="color:var(--text-muted); font-family:sans-serif; font-size:1.5rem; opacity:0.4; margin: 0 15px;">=</span>
                          <span style="background:var(--surface2); padding:5px 25px; border-radius:12px; border:2px solid var(--border); font-family:var(--font-ar); font-size:2.2rem; font-weight:900; color:var(--text); white-space:nowrap;" >
                              ${resultInnerHtml}
                          </span>`;

        // 🌟 المعادلة أولاً (يمين)، ثم الفاصل، ثم الاسم (يسار)
        return `
            <div class="v-affix-card" onclick="movePronounCircle(this, '${plainResult}')">
                <div class="v-tense-eq">
                    ${eqHtml}
                    ${resultHtml}
                </div>
                <div class="v-divider"></div>
                <div class="v-tense-label" style="color:${color};">
                    <div class="ar">${labelAr}</div>
                    <div class="en">${labelEn}</div>
                </div>
            </div>
        `;
    }

    // 3. بناء البيانات مع تمرير (العربي + الإنجليزي)
    const data = [
        { pro: 'أَنَا', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'ْتُ', `${pastStem}ْتُ`, '#B45309'),
            buildCard('المضارع', 'Present', 'أَ', presentRoot, '', `أَ${presentRoot}`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَأَ', presentRoot, '', `سَأَ${presentRoot}`, '#22c55e')
        ] },
        { pro: 'أَنْتَ', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'ْتَ', `${pastStem}ْتَ`, '#B45309'),
            buildCard('المضارع', 'Present', 'تَ', presentRoot, '', `تَ${presentRoot}`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَتَ', presentRoot, '', `سَتَ${presentRoot}`, '#22c55e'),
            buildCard('الأمر', 'Command', '', cmd, '', cmd, '#ee5337')
        ] },
        { pro: 'أَنْتِ', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'ْتِ', `${pastStem}ْتِ`, '#B45309'),
            buildCard('المضارع', 'Present', 'تَ', presentStem, 'ِينَ', `تَ${presentStem}ِينَ`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَتَ', presentStem, 'ِينَ', `سَتَ${presentStem}ِينَ`, '#22c55e'),
            buildCard('الأمر', 'Command', '', cmdStem, cSufAnti, cmdAnti, '#ee5337')
        ] },
        { pro: 'أَنْتُمْ', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'ْتُمْ', `${pastStem}ْتُمْ`, '#B45309'),
            buildCard('المضارع', 'Present', 'تَ', presentStem, 'ُونَ', `تَ${presentStem}ُونَ`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَتَ', presentStem, 'ُونَ', `سَتَ${presentStem}ُونَ`, '#22c55e'),
            buildCard('الأمر', 'Command', '', cmdStem, cSufAntum, cmdAntum, '#ee5337')
        ] },
        { pro: 'نَحْنُ', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'ْنَا', `${pastStem}ْنَا`, '#B45309'),
            buildCard('المضارع', 'Present', 'نَ', presentRoot, '', `نَ${presentRoot}`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَنَ', presentRoot, '', `سَنَ${presentRoot}`, '#22c55e')
        ] },
        { pro: 'هُوَ', cards: [
            buildCard('الماضي', 'Past', '', v.tenses.past, '', v.tenses.past, '#B45309'),
            buildCard('المضارع', 'Present', 'يَ', presentRoot, '', `يَ${presentRoot}`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَيَ', presentRoot, '', `سَيَ${presentRoot}`, '#22c55e')
        ] },
        { pro: 'هِيَ', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'َتْ', `${pastStem}َتْ`, '#B45309'),
            buildCard('المضارع', 'Present', 'تَ', presentRoot, '', `تَ${presentRoot}`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَتَ', presentRoot, '', `سَتَ${presentRoot}`, '#22c55e')
        ] },
        { pro: 'هُمْ', cards: [
            buildCard('الماضي', 'Past', '', pastStem, 'ُوا', `${pastStem}ُوا`, '#B45309'),
            buildCard('المضارع', 'Present', 'يَ', presentStem, 'ُونَ', `يَ${presentStem}ُونَ`, '#3b82f6'),
            buildCard('المستقبل', 'Future', 'سَيَ', presentStem, 'ُونَ', `سَيَ${presentStem}ُونَ`, '#22c55e')
        ] }
    ];

    container.innerHTML = data.map((group, index) => `
        <div class="pronoun-row animate-up" id="p-row-${index}">
            <div class="pronoun-circle-wrap">
                <div class="pronoun-circle">${group.pro}</div>
            </div>
            <div class="conjugation-grid">
                ${group.cards.join('')}
            </div>
        </div>
    `).join('');

    setTimeout(() => {
        document.querySelectorAll('.pronoun-row').forEach(row => {
            const firstCard = row.querySelector('.v-affix-card');
            if(firstCard && window.innerWidth > 800) {
                const circle = row.querySelector('.pronoun-circle');
                const targetTop = firstCard.offsetTop + (firstCard.offsetHeight / 2) - (circle.offsetHeight / 2);
                circle.style.top = `${targetTop}px`;
                firstCard.classList.add('active-card');
            }
        });
    }, 100);
}


function _getPronounTenseGroups(v) {
    let pastStem = v.symbol.slice(0, -1);
    if (v.symbol === 'نَامَ') pastStem = 'نِم';
    if (v.symbol === 'قَامَ') pastStem = 'قُم';
    if (v.symbol === 'جَاءَ') pastStem = 'جِئ';

    const pAffix = v.affixes.find(a => a.label.includes('Present')) || {root: ''};
    const presentRoot = pAffix.root || v.tenses.present || '';
    const presentStem = presentRoot ? presentRoot.slice(0, -1) : '';

    const cmd = v.tenses.command || '';
    let cmdStem = cmd ? cmd.slice(0, -1) : '';
    let cmdAnti = cmdStem + 'ِي';
    let cmdAntum = cmdStem + 'ُوا';

    if (v.symbol === 'جَاءَ') {
        cmdStem = 'تَعَالَ';
        cmdAnti = 'تَعَالَي';
        cmdAntum = 'تَعَالَوْا';
    }

    const make = (pronoun, form, parts = []) => ({ pronoun, form, parts: parts.filter(p => p && p.text) });

    return [
        {
            key: 'past',
            labelAr: 'الماضي',
            labelEn: 'Past',
            color: '#B45309',
            forms: [
                make('أَنَا', `${pastStem}ْتُ`, [{text: pastStem, kind: 'root'}, {text: 'ْتُ', kind: 'affix'}]),
                make('أَنْتَ', `${pastStem}ْتَ`, [{text: pastStem, kind: 'root'}, {text: 'ْتَ', kind: 'affix'}]),
                make('أَنْتِ', `${pastStem}ْتِ`, [{text: pastStem, kind: 'root'}, {text: 'ْتِ', kind: 'affix'}]),
                make('أَنْتُمْ', `${pastStem}ْتُمْ`, [{text: pastStem, kind: 'root'}, {text: 'ْتُمْ', kind: 'affix'}]),
                make('نَحْنُ', `${pastStem}ْنَا`, [{text: pastStem, kind: 'root'}, {text: 'ْنَا', kind: 'affix'}]),
                make('هُوَ', v.tenses.past, [{text: v.tenses.past, kind: 'root'}]),
                make('هِيَ', `${pastStem}َتْ`, [{text: pastStem, kind: 'root'}, {text: 'َتْ', kind: 'affix'}]),
                make('هُمْ', `${pastStem}ُوا`, [{text: pastStem, kind: 'root'}, {text: 'ُوا', kind: 'affix'}])
            ]
        },
        {
            key: 'present',
            labelAr: 'المضارع',
            labelEn: 'Present',
            color: '#2563eb',
            forms: [
                make('أَنَا', `أَ${presentRoot}`, [{text: 'أَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('أَنْتَ', `تَ${presentRoot}`, [{text: 'تَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('أَنْتِ', `تَ${presentStem}ِينَ`, [{text: 'تَ', kind: 'affix'}, {text: presentStem, kind: 'root'}, {text: 'ِينَ', kind: 'affix'}]),
                make('أَنْتُمْ', `تَ${presentStem}ُونَ`, [{text: 'تَ', kind: 'affix'}, {text: presentStem, kind: 'root'}, {text: 'ُونَ', kind: 'affix'}]),
                make('نَحْنُ', `نَ${presentRoot}`, [{text: 'نَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('هُوَ', `يَ${presentRoot}`, [{text: 'يَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('هِيَ', `تَ${presentRoot}`, [{text: 'تَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('هُمْ', `يَ${presentStem}ُونَ`, [{text: 'يَ', kind: 'affix'}, {text: presentStem, kind: 'root'}, {text: 'ُونَ', kind: 'affix'}])
            ]
        },
        {
            key: 'future',
            labelAr: 'المستقبل',
            labelEn: 'Future',
            color: '#16a34a',
            forms: [
                make('أَنَا', `سَأَ${presentRoot}`, [{text: 'سَ', kind: 'future'}, {text: 'أَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('أَنْتَ', `سَتَ${presentRoot}`, [{text: 'سَ', kind: 'future'}, {text: 'تَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('أَنْتِ', `سَتَ${presentStem}ِينَ`, [{text: 'سَ', kind: 'future'}, {text: 'تَ', kind: 'affix'}, {text: presentStem, kind: 'root'}, {text: 'ِينَ', kind: 'affix'}]),
                make('أَنْتُمْ', `سَتَ${presentStem}ُونَ`, [{text: 'سَ', kind: 'future'}, {text: 'تَ', kind: 'affix'}, {text: presentStem, kind: 'root'}, {text: 'ُونَ', kind: 'affix'}]),
                make('نَحْنُ', `سَنَ${presentRoot}`, [{text: 'سَ', kind: 'future'}, {text: 'نَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('هُوَ', `سَيَ${presentRoot}`, [{text: 'سَ', kind: 'future'}, {text: 'يَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('هِيَ', `سَتَ${presentRoot}`, [{text: 'سَ', kind: 'future'}, {text: 'تَ', kind: 'affix'}, {text: presentRoot, kind: 'root'}]),
                make('هُمْ', `سَيَ${presentStem}ُونَ`, [{text: 'سَ', kind: 'future'}, {text: 'يَ', kind: 'affix'}, {text: presentStem, kind: 'root'}, {text: 'ُونَ', kind: 'affix'}])
            ]
        },
        {
            key: 'command',
            labelAr: 'الأمر',
            labelEn: 'Command',
            color: '#dc2626',
            forms: [
                make('أَنْتَ', cmd, [{text: cmd, kind: 'root'}]),
                make('أَنْتِ', cmdAnti, [{text: cmdStem, kind: 'root'}, {text: 'ِي', kind: 'affix'}]),
                make('أَنْتُمْ', cmdAntum, [{text: cmdStem, kind: 'root'}, {text: 'ُوا', kind: 'affix'}])
            ].filter(item => item.form)
        }
    ];
}

function selectTensePronounCard(cardEl, speechText) {
    const group = cardEl.closest('.tense-pronoun-group');
    if (group) group.querySelectorAll('.tense-pronoun-card').forEach(card => card.classList.remove('active-card'));
    cardEl.classList.add('active-card');
    speakAr(speechText);
}

_initSummaryTable = function(v) {
    const container = document.getElementById('pronoun-sections-container');
    if (!container) return;

    const groups = _getPronounTenseGroups(v);
    const renderParts = (parts, color) => parts.map(part => {
        const style = part.kind === 'root' ? 'color:var(--text);' : `color:${color};`;
        return `<span class="tense-pronoun-piece" style="${style}">${escapeHtml(part.text)}</span>`;
    }).join('<span class="tense-pronoun-plus">+</span>');

    container.innerHTML = groups.map((group, groupIndex) => `
        <div class="tense-pronoun-group animate-up" style="--tense-color:${group.color}; animation-delay:${groupIndex * 0.08}s;">
            <div class="tense-pronoun-head">
                <div>
                    <span class="tense-pronoun-en">${escapeHtml(group.labelEn)}</span>
                    <h3>${escapeHtml(group.labelAr)}</h3>
                </div>
                <span class="tense-pronoun-count">${group.forms.length}</span>
            </div>
            <div class="tense-pronoun-grid">
                ${group.forms.map(item => `
                    <button class="tense-pronoun-card" type="button" onclick="selectTensePronounCard(this, '${escapeJsArg(item.form)}')">
                        <span class="tense-pronoun-pro">${escapeHtml(item.pronoun)}</span>
                        <span class="tense-pronoun-form">${escapeHtml(item.form)}</span>
                        <span class="tense-pronoun-parts">${renderParts(item.parts, group.color)}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
};


function _initPronounDecoder() {
    const container = document.getElementById('ui-decoder-grid');
    if (!container) return;

    // قاموس فك الشفرات (يمكنك إضافة أو تعديل الكلمات كما تشاء)
    const decoderData = [
        {
            pro: 'هُوَ',
            words: ['أَبِي', 'هَذَا', 'الْمُعَلِّمُ', 'أَحْمَدُ']
        },
        {
            pro: 'هِيَ',
            words: ['أُمِّي', 'هَذِهِ', 'الطَّبِيبَةُ', 'فَاطِمَةُ']
        },
        {
            pro: 'هُمْ',
            words: ['الْأَوْلَادُ', 'هَؤُلَاءِ', 'الْمُعَلِّمُونَ', 'أَصْدِقَائِي']
        },
        {
            pro: 'نَحْنُ',
            words: ['أَنَا وَأَخِي', 'أَنَا وَأَصْدِقَائِي']
        },
        {
            pro: 'أَنْتُمْ',
            words: ['أَنْتَ وَأَخُوكَ', 'يَا أَوْلَادُ']
        }
    ];

    container.innerHTML = decoderData.map((group, index) => `
        <div class="decoder-card animate-up" style="animation-delay: ${index * 0.1}s;">
            <div class="decoder-pro">${group.pro}</div>
            <div class="decoder-eq-list">
                ${group.words.map(word => `
                    <div class="decoder-eq-item" onclick="speakAr('${word} يُسَاوِي ${group.pro}')">
                        <span>${word}</span>
                        <span class="eq">=</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 🎮 محرك لعبة صائد الشفرات (Decoder Game)
let _dgState = { q: [], idx: 0, score: 0 };

function _initDecoderGame() {
    const pool = [
        {w: 'أَبِي', p: 'هُوَ'}, {w: 'هَذَا', p: 'هُوَ'}, {w: 'الْمُعَلِّمُ', p: 'هُوَ'},
        {w: 'أُمِّي', p: 'هِيَ'}, {w: 'هَذِهِ', p: 'هِيَ'}, {w: 'الطَّبِيبَةُ', p: 'هِيَ'},
        {w: 'الْأَوْلَادُ', p: 'هُمْ'}, {w: 'هَؤُلَاءِ', p: 'هُمْ'}, {w: 'الْمُعَلِّمُونَ', p: 'هُمْ'},
        {w: 'أَنَا وَأَخِي', p: 'نَحْنُ'}, {w: 'أَنْتَ وَأَخُوكَ', p: 'أَنْتُمْ'}
    ].sort(()=> 0.5 - Math.random()).slice(0, 5); // 5 أسئلة عشوائية

    _dgState.q = pool;
    _dgState.idx = 0;
    _dgState.score = 0;

    document.getElementById('dg-complete').style.display = 'none';
    document.querySelector('.dg-card').style.display = 'block';
    _dgNext();
}

function _dgNext() {
    if(_dgState.idx >= 5) {
        document.querySelector('.dg-card').style.display = 'none';
        document.getElementById('dg-complete').style.display = 'block';
        if(_dgState.score === 5) { addStars(5); playVictorySound(); fireConfetti(); }
        return;
    }
    document.getElementById('dg-q-num').textContent = _dgState.idx + 1;
    document.getElementById('dg-score').textContent = _dgState.score;
    document.getElementById('dg-feedback').textContent = '';

    const q = _dgState.q[_dgState.idx];
    document.getElementById('dg-word').textContent = q.w;

    // إنشاء خيارات عشوائية (4 خيارات من ضمنها الصح)
    const allPros = ['هُوَ', 'هِيَ', 'هُمْ', 'نَحْنُ', 'أَنْتُمْ'];
    let opts = [q.p];
    while(opts.length < 4) {
        let r = allPros[Math.floor(Math.random()*allPros.length)];
        if(!opts.includes(r)) opts.push(r);
    }
    opts.sort(()=> 0.5 - Math.random());

    document.getElementById('dg-options').innerHTML = opts.map(o =>
        `<button class="dg-opt-btn" onclick="_dgCheck('${o}', '${q.p}', this)">${o}</button>`
    ).join('');
}

function _dgCheck(selected, correct, btn) {
    document.querySelectorAll('.dg-opt-btn').forEach(b => b.disabled = true);
    if(selected === correct) {
        btn.classList.add('correct');
        _dgState.score++;
        document.getElementById('dg-feedback').innerHTML = '<span style="color:var(--green)">✅ إجابة صحيحة!</span>';
        playMatchPro();
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.dg-opt-btn').forEach(b => { if(b.textContent === correct) b.classList.add('correct'); });
        document.getElementById('dg-feedback').innerHTML = '<span style="color:var(--red)">❌ إجابة خاطئة!</span>';
        playErrorSound();
    }
    document.getElementById('dg-score').textContent = _dgState.score;
    setTimeout(() => { _dgState.idx++; _dgNext(); }, 1500);
}
// 🌳 🧩 محرك عائلة الاسم والمحادثة (The Ultimate Fluency Dictionary V10.0)
function _getNounData(verbKey) {
    const dict = {
        // ════════════ المرحلة الأولى: أفعال الغائب - هُوَ (He) ════════════
        'v1': { // أَكَلَ
            deriv: { masdar: {ar:'أَكْل', en:'Eating', wazn:'فَعْل'}, faail: {ar:'آكِل', en:'Eater', wazn:'فَاعِل'}, mafool: {ar:'مَأْكُول', en:'Eaten', wazn:'مَفْعُول'}, makan: {ar:'مَأْكَل', en:'Eatery/Food', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'طَعَام', en: 'Food', ex: 'الطَّعَامُ لَذِيذٌ وَسَاخِنٌ' }, { ar: 'مِلْعَقَة', en: 'Spoon', ex: 'يَأْكُلُ الشُّورْبَةَ بِالْمِلْعَقَةِ' },
                { ar: 'مَطْعَم', en: 'Restaurant', ex: 'نَتَنَاوَلُ الْغَدَاءَ فِي الْمَطْعَمِ' }, { ar: 'جَائِع', en: 'Hungry', ex: 'الْوَلَدُ جَائِعٌ جِدّاً' }
            ],
            qa: [
                { q: 'مَاذَا يَأْكُلُ أَحْمَدُ؟', a: 'يَأْكُلُ الدَّجَاجَ وَالْأَرُزَّ.' },
                { q: 'أَيْنَ يَتَنَاوَلُ طَعَامَ الْغَدَاءِ؟', a: 'يَتَنَاوَلُهُ فِي الْمَطْعَمِ مَعَ أُسْرَتِهِ.' }
            ],
            phrases: [
                { ar: 'بِالْهَنَاءِ وَالشِّفَاءِ', en: 'Bon appetit (With joy and healing)' },
                { ar: 'سُفْرَة دَائِمَة', en: 'May your table always be full' }
            ],
            sentence: { ar: ['يَأْكُلُ', 'الرَّجُلُ', 'طَعَامَ', 'الْغَدَاءِ', 'فِي الْمَطْعَمِ'], en: "The man eats lunch food in the restaurant." }
        },
        'v2': { // شَرِبَ
            deriv: { masdar: {ar:'شُرْب', en:'Drinking', wazn:'فُعْل'}, faail: {ar:'شَارِب', en:'Drinker', wazn:'فَاعِل'}, mafool: {ar:'مَشْرُوب', en:'Beverage', wazn:'مَفْعُول'}, makan: {ar:'مَشْرَب', en:'Drinking Place', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'مَاء', en: 'Water', ex: 'يَشْرَبُ مَاءً بَارِداً' }, { ar: 'كُوب', en: 'Cup/Glass', ex: 'يَسْكُبُ الْعَصِيرَ فِي الْكُوبِ' },
                { ar: 'قَهْوَة', en: 'Coffee', ex: 'يَشْرَبُ الْقَهْوَةَ كُلَّ صَبَاحٍ' }, { ar: 'عَطْشَان', en: 'Thirsty', ex: 'الْمُسَافِرُ عَطْشَانٌ' }
            ],
            qa: [
                { q: 'مَاذَا يَشْرَبُ فِي الصَّبَاحِ؟', a: 'يَشْرَبُ الشَّايَ بِالنَّعْنَاعِ.' },
                { q: 'هَلْ شَرِبَ الدَّوَاءَ؟', a: 'نَعَمْ، شَرِبَهُ بَعْدَ الْأَكْلِ.' }
            ],
            phrases: [
                { ar: 'هَنِيئاً مَرِيئاً', en: 'May it go down well (said to someone drinking)' },
                { ar: 'صِحَّة وَعَافِيَة', en: 'Health and wellness' }
            ],
            sentence: { ar: ['يَشْرَبُ', 'الطِّفْلُ', 'عَصِيرَ', 'التُّفَّاحِ', 'بِسُرْعَةٍ'], en: "The child drinks apple juice quickly." }
        },
        'v3': { // نَامَ
            deriv: { masdar: {ar:'نَوْم', en:'Sleep', wazn:'فَعْل'}, faail: {ar:'نَائِم', en:'Sleeper', wazn:'فَاعِل'}, mafool: {ar:'—', en:'—', wazn:'—'}, makan: {ar:'مَنَام', en:'Bed/Dream', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'سَرِير', en: 'Bed', ex: 'يَنَامُ عَلَى السَّرِيرِ الْمُرِيحِ' }, { ar: 'غُرْفَة', en: 'Room', ex: 'غُرْفَةُ النَّوْمِ هَادِئَةٌ' },
                { ar: 'مُبَكِّراً', en: 'Early', ex: 'يَنَامُ مُبَكِّراً دَائِماً' }, { ar: 'مُتْعَب', en: 'Tired', ex: 'يَنَامُ لِأَنَّهُ مُتْعَبٌ جِدّاً' }
            ],
            qa: [
                { q: 'أَيْنَ الطِّفْلُ الْآنَ؟', a: 'الطِّفْلُ نَائِمٌ فِي غُرْفَتِهِ.' },
                { q: 'هَلْ نَامَ جَيِّداً؟', a: 'نَعَمْ، نَامَ نَوْماً عَمِيقاً.' }
            ],
            phrases: [
                { ar: 'أَحْلَاماً سَعِيدَةً', en: 'Sweet dreams' },
                { ar: 'نَوْمَ الْعَوَافِي', en: 'Sleep of health (Sleep well)' }
            ],
            sentence: { ar: ['يَنَامُ', 'الْوَلَدُ', 'الْمُتْعَبُ', 'عَلَى السَّرِيرِ', 'مُبَكِّراً'], en: "The tired boy sleeps on the bed early." }
        },
        'v4': { // قَامَ
            deriv: { masdar: {ar:'قِيَام', en:'Standing/Doing', wazn:'فِعَال'}, faail: {ar:'قَائِم', en:'Stander', wazn:'فَاعِل'}, mafool: {ar:'مَقُوم', en:'Supported', wazn:'مَفْعُول'}, makan: {ar:'مَقَام', en:'Station/Position', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'عَمَل', en: 'Work/Task', ex: 'يَقُومُ بِعَمَلٍ مُهِمٍّ جِدّاً' }, { ar: 'وَاجِب', en: 'Duty', ex: 'يَقُومُ بِحَلِّ الْوَاجِبِ' },
                { ar: 'نَشَاط', en: 'Energy', ex: 'يَقُومُ بِنَشَاطٍ وَحَيَوِيَّةٍ' }, { ar: 'مُسْرِعاً', en: 'Hurriedly', ex: 'قَامَ مُسْرِعاً لِلْعَمَلِ' }
            ],
            qa: [
                { q: 'بِمَاذَا يَقُومُ الْمُهَنْدِسُ؟', a: 'يَقُومُ بِبِنَاءِ مَشْرُوعٍ كَبِيرٍ.' },
                { q: 'لِمَاذَا قَامَ مِنَ الْمَجْلِسِ؟', a: 'قَامَ لِيَسْتَقْبِلَ الضُّيُوفَ.' }
            ],
            phrases: [
                { ar: 'يُعْطِيكَ الْعَافِيَة', en: 'May God give you health (Great job)' },
                { ar: 'قَامَ بِالْوَاجِبِ', en: 'He did his duty (He was very hospitable)' }
            ],
            sentence: { ar: ['يَقُومُ', 'الْمُعَلِّمُ', 'مِنْ مَكَانِهِ', 'لِيَشْرَحَ', 'الدَّرْسَ'], en: "The teacher stands from his place to explain the lesson." }
        },
        'v5': { // جَلَسَ
            deriv: { masdar: {ar:'جُلُوس', en:'Sitting', wazn:'فُعُول'}, faail: {ar:'جَالِس', en:'Sitter', wazn:'فَاعِل'}, mafool: {ar:'مَجْلُوس', en:'Sat upon', wazn:'مَفْعُول'}, makan: {ar:'مَجْلِس', en:'Council/Seat', wazn:'مَفْعِل'} },
            vocab: [
                { ar: 'كُرْسِيّ', en: 'Chair', ex: 'يَجْلِسُ عَلَى كُرْسِيٍّ خَشَبِيٍّ' }, { ar: 'مَائِدَة', en: 'Table', ex: 'يَجْلِسُ إِلَى الْمَائِدَةِ' },
                { ar: 'أَرِيكَة', en: 'Sofa', ex: 'يَسْتَرِيحُ عَلَى الْأَرِيكَةِ' }, { ar: 'بِهُدُوء', en: 'Quietly', ex: 'يَجْلِسُ فِي الْفَصْلِ بِهُدُوءٍ' }
            ],
            qa: [
                { q: 'أَيْنَ يَجْلِسُ الْجَدُّ؟', a: 'يَجْلِسُ فِي حَدِيقَةِ الْبَيْتِ.' },
                { q: 'هَلْ يُمْكِنُهُ الْجُلُوسُ هُنَا؟', a: 'نَعَمْ، هَذَا الْمَكَانُ فَارِغٌ.' }
            ],
            phrases: [
                { ar: 'تَفَضَّلْ بِالْجُلُوسِ', en: 'Please, take a seat' },
                { ar: 'مَجْلِسٌ عَامِرٌ', en: 'May this gathering always prosper' }
            ],
            sentence: { ar: ['يَجْلِسُ', 'الْجَدُّ', 'عَلَى الْأَرِيكَةِ', 'يَقْرَأُ', 'الْكِتَابَ'], en: "The grandfather sits on the sofa reading the book." }
        },
        'v6': { // ذَهَبَ
            deriv: { masdar: {ar:'ذَهَاب', en:'Going', wazn:'فَعَال'}, faail: {ar:'ذَاهِب', en:'Goer', wazn:'فَاعِل'}, mafool: {ar:'مَذْهُوب', en:'Taken away', wazn:'مَفْعُول'}, makan: {ar:'مَذْهَب', en:'Pathway', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'مَدْرَسَة', en: 'School', ex: 'يَذْهَبُ إِلَى الْمَدْرَسَةِ كُلَّ يَوْمٍ' }, { ar: 'عَمَل', en: 'Work', ex: 'يَذْهَبُ الْمُوَظَّفُ إِلَى عَمَلِهِ' },
                { ar: 'سَيَّارَة', en: 'Car', ex: 'يَذْهَبُ لِلسُّوقِ بِالسَّيَّارَةِ' }, { ar: 'مَحَطَّة', en: 'Station', ex: 'ذَهَبَ إِلَى مَحَطَّةِ الْقِطَارِ' }
            ],
            qa: [
                { q: 'إِلَى أَيْنَ هُوَ ذَاهِبٌ؟', a: 'هُوَ ذَاهِبٌ إِلَى الْمُسْتَشْفَى.' },
                { q: 'مَتَى يَذْهَبُ لِلْعَمَلِ؟', a: 'يَذْهَبُ فِي السَّاعَةِ الثَّامِنَةِ صَبَاحاً.' }
            ],
            phrases: [
                { ar: 'مَعَ السَّلَامَةِ', en: 'Goodbye (Go with peace)' },
                { ar: 'رَافَقَتْكَ السَّلَامَةُ', en: 'Have a safe journey' }
            ],
            sentence: { ar: ['يَذْهَبُ', 'الطَّالِبُ', 'إِلَى', 'الْمَدْرَسَةِ', 'بِالْحَافِلَةِ'], en: "The student goes to school by bus." }
        },
        'v7': { // جَاءَ
            deriv: { masdar: {ar:'مَجِيء', en:'Coming', wazn:'مَفْعِل'}, faail: {ar:'جَائِي', en:'Comer', wazn:'فَاعِل'}, mafool: {ar:'—', en:'—', wazn:'—'}, makan: {ar:'—', en:'—', wazn:'—'} },
            vocab: [
                { ar: 'بَيْت', en: 'House', ex: 'يَجِيءُ إِلَى الْبَيْتِ مُتَأَخِّراً' }, { ar: 'سَفَر', en: 'Travel', ex: 'جَاءَ أَبِي مِنَ السَّفَرِ' },
                { ar: 'هَدِيَّة', en: 'Gift', ex: 'جَاءَ بِهَدِيَّةٍ رَائِعَةٍ' }, { ar: 'ضَيْف', en: 'Guest', ex: 'جَاءَ الضَّيْفُ يَطْرُقُ الْبَابَ' }
            ],
            qa: [
                { q: 'مَتَى جَاءَ الطَّرْدُ؟', a: 'جَاءَ الْيَوْمَ فِي الصَّبَاحِ.' },
                { q: 'هَلْ جَاءَ وَحْدَهُ؟', a: 'لَا، جَاءَ مَعَ أَصْدِقَائِهِ.' }
            ],
            phrases: [
                { ar: 'أَهْلاً وَسَهْلاً', en: 'Welcome' },
                { ar: 'خَطْوَة عَزِيزَة', en: 'A precious step (Honored by your visit)' }
            ],
            sentence: { ar: ['يَجِيءُ', 'الضَّيْفُ', 'إِلَى بَيْتِنَا', 'فِي', 'الْمَسَاءِ'], en: "The guest comes to our house in the evening." }
        },
        'v8': { // دَخَلَ
            deriv: { masdar: {ar:'دُخُول', en:'Entering', wazn:'فُعُول'}, faail: {ar:'دَاخِل', en:'Enterer', wazn:'فَاعِل'}, mafool: {ar:'مَدْخُول', en:'Entered', wazn:'مَفْعُول'}, makan: {ar:'مَدْخَل', en:'Entrance', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'بَاب', en: 'Door', ex: 'يَدْخُلُ مِنَ الْبَابِ الْوَاسِعِ' }, { ar: 'مَكْتَب', en: 'Office', ex: 'يَدْخُلُ الْمُدِيرُ لِمَكْتَبِهِ' },
                { ar: 'مَسْجِد', en: 'Mosque', ex: 'دَخَلَ الْمَسْجِدَ لِيُصَلِّيَ' }, { ar: 'مُبْتَسِماً', en: 'Smiling', ex: 'دَخَلَ الْبَيْتَ مُبْتَسِماً' }
            ],
            qa: [
                { q: 'هَلْ دَخَلَ الطُّلَّابُ الْفَصْلَ؟', a: 'نَعَمْ، دَخَلُوا قَبْلَ قَلِيلٍ.' },
                { q: 'مِنْ أَيْنَ دَخَلَ؟', a: 'دَخَلَ مِنَ الْمَدْخَلِ الرَّئِيسِيِّ.' }
            ],
            phrases: [
                { ar: 'تَفَضَّلْ بِالدُّخُولِ', en: 'Please come in' },
                { ar: 'الْبَيْتُ بَيْتُكَ', en: 'Make yourself at home (The house is yours)' }
            ],
            sentence: { ar: ['يَدْخُلُ', 'الْمُوَظَّفُ', 'إِلَى الْمَكْتَبِ', 'فِي', 'الصَّبَاحِ'], en: "The employee enters the office in the morning." }
        },
        'v9': { // خَرَجَ
            deriv: { masdar: {ar:'خُرُوج', en:'Exiting', wazn:'فُعُول'}, faail: {ar:'خَارِج', en:'Exiter', wazn:'فَاعِل'}, mafool: {ar:'مَخْرُوج', en:'Taken out', wazn:'مَفْعُول'}, makan: {ar:'مَخْرَج', en:'Exit', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'بَاب', en: 'Door', ex: 'خَرَجَ مِنَ الْبَابِ الْخَلْفِيِّ' }, { ar: 'حَدِيقَة', en: 'Park', ex: 'يَخْرُجُ لِيَلْعَبَ فِي الْحَدِيقَةِ' },
                { ar: 'حَقِيبَة', en: 'Bag', ex: 'خَرَجَ حَامِلاً حَقِيبَتَهُ' }, { ar: 'مِعْطَف', en: 'Coat', ex: 'ارْتَدَى الْمِعْطَفَ ثُمَّ خَرَجَ' }
            ],
            qa: [
                { q: 'لِمَاذَا خَرَجَ أَحْمَدُ؟', a: 'خَرَجَ لِيَشْتَرِيَ بَعْضَ الْأَشْيَاءِ.' },
                { q: 'هَلْ خَرَجَ الْمُدِيرُ؟', a: 'نَعَمْ، خَرَجَ فِي اسْتِرَاحَةٍ قَصِيرَةٍ.' }
            ],
            phrases: [
                { ar: 'فِي أَمَانِ الله', en: 'In God’s protection' },
                { ar: 'نَرَاكَ قَرِيباً', en: 'See you soon' }
            ],
            sentence: { ar: ['يَخْرُجُ', 'الْأَوْلَادُ', 'إِلَى الْحَدِيقَةِ', 'لِلْعَبِ', 'بِالْكُرَةِ'], en: "The boys go out to the park to play with the ball." }
        },
        'v10': { // فَتَحَ
            deriv: { masdar: {ar:'فَتْح', en:'Opening', wazn:'فَعْل'}, faail: {ar:'فَاتِح', en:'Opener', wazn:'فَاعِل'}, mafool: {ar:'مَفْتُوح', en:'Opened', wazn:'مَفْعُول'}, makan: {ar:'مَفْتَح', en:'Key/Place', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'بَاب', en: 'Door', ex: 'يَفْتَحُ الْبَابَ لِلضُّيُوفِ' }, { ar: 'نَافِذَة', en: 'Window', ex: 'يَفْتَحُ النَّافِذَةَ كُلَّ صَبَاحٍ' },
                { ar: 'كِتَاب', en: 'Book', ex: 'يَفْتَحُ الْكِتَابَ لِيَقْرَأَ' }, { ar: 'مِفْتَاح', en: 'Key', ex: 'يَفْتَحُ الْقُفْلَ بِالْمِفْتَاحِ' }
            ],
            qa: [
                { q: 'هَلْ يُمْكِنُكَ أَنْ تَفْتَحَ الْبَابَ؟', a: 'بِالطَّبْعِ، ثَوَانٍ فَقَطْ.' },
                { q: 'لِمَاذَا فَتَحْتَ النَّافِذَةَ؟', a: 'لِأَنَّ الْجَوَّ حَارٌّ جِدّاً.' }
            ],
            phrases: [
                { ar: 'يَفْتَحُ اللهُ عَلَيْكَ', en: 'May God open doors of success for you' },
                { ar: 'فَاتِحَةُ خَيْرٍ', en: 'A good beginning' }
            ],
            sentence: { ar: ['يَفْتَحُ', 'الْوَلَدُ', 'النَّافِذَةَ', 'فِي', 'الصَّبَاحِ'], en: "The boy opens the window in the morning." }
        },

        // ════════════ المرحلة الثانية: أفعال المتكلم - أَنَا (I) ════════════
        'v11': { // أَكَلْتُ
            deriv: { masdar: {ar:'أَكْل', en:'Eating', wazn:'فَعْل'}, faail: {ar:'آكِل', en:'Eater', wazn:'فَاعِل'}, mafool: {ar:'مَأْكُول', en:'Eaten', wazn:'مَفْعُول'}, makan: {ar:'مَأْكَل', en:'Eatery/Food', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'حِمْيَة', en: 'Diet', ex: 'أَنَا مُلْتَزِمٌ بِحِمْيَةٍ غِذَائِيَّةٍ' }, { ar: 'مُفَضَّل', en: 'Favorite', ex: 'هَذَا هُوَ طَعَامِي الْمُفَضَّلُ' },
                { ar: 'مَطْبَخ', en: 'Kitchen', ex: 'أَنَا آكُلُ فِي الْمَطْبَخِ' }, { ar: 'جَائِع', en: 'Hungry', ex: 'أَنَا جَائِعٌ جِدّاً، أُرِيدُ أَنْ آكُلَ' }
            ],
            qa: [
                { q: 'مَا هُوَ طَعَامُكَ الْمُفَضَّلُ؟', a: 'أَنَا أُحِبُّ أَنْ آكُلَ السَّمَكَ.' },
                { q: 'هَلْ أَكَلْتَ شَيْئاً الْيَوْمَ؟', a: 'نَعَمْ، تَنَاوَلْتُ فَطُوراً خَفِيفاً.' }
            ],
            phrases: [
                { ar: 'بِسْمِ اللهِ', en: 'In the name of God (Before eating)' },
                { ar: 'الْحَمْدُ للهِ', en: 'Praise be to God (After eating)' }
            ],
            sentence: { ar: ['أَنَا', 'آكُلُ', 'الدَّجَاجَ', 'بِالشَّوْكَةِ', 'وَالْمِلْعَقَةِ'], en: "I eat the chicken with the fork and spoon." }
        },
        'v12': { // شَرِبْتُ
            deriv: { masdar: {ar:'شُرْب', en:'Drinking', wazn:'فُعْل'}, faail: {ar:'شَارِب', en:'Drinker', wazn:'فَاعِل'}, mafool: {ar:'مَشْرُوب', en:'Beverage', wazn:'مَفْعُول'}, makan: {ar:'مَشْرَب', en:'Drinking Place', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'شَاي', en: 'Tea', ex: 'أَشْرَبُ الشَّايَ مَعَ النَّعْنَاعِ' }, { ar: 'حَلِيب', en: 'Milk', ex: 'أَشْرَبُ كُوباً مِنَ الْحَلِيبِ' },
                { ar: 'سَاخِن', en: 'Hot', ex: 'أُحِبُّ الْمَشْرُوبَاتِ السَّاخِنَةَ' }, { ar: 'عَطْشَان', en: 'Thirsty', ex: 'أَنَا عَطْشَانٌ بَعْدَ الْجَرْيِ' }
            ],
            qa: [
                { q: 'تَشْرَبُ شَاي أَمْ قَهْوَة؟', a: 'أُفَضِّلُ أَنْ أَشْرَبَ الْقَهْوَةَ.' },
                { q: 'كَمْ لِتْراً مِنَ الْمَاءِ تَشْرَبُ يَوْمِيّاً؟', a: 'أَشْرَبُ حَوَالَيْ لِتْرَيْنِ كُلَّ يَوْمٍ.' }
            ],
            phrases: [
                { ar: 'قَهْوَة مَضْبُوطَة', en: 'Perfectly balanced coffee' },
                { ar: 'بِالصِّحَّةِ', en: 'Cheers / To your health' }
            ],
            sentence: { ar: ['أَنَا', 'أَشْرَبُ', 'الْمَاءَ', 'لِأَنَّنِي', 'عَطْشَانٌ'], en: "I drink water because I am thirsty." }
        },
        'v13': { // نِمْتُ
            deriv: { masdar: {ar:'نَوْم', en:'Sleep', wazn:'فَعْل'}, faail: {ar:'نَائِم', en:'Sleeper', wazn:'فَاعِل'}, mafool: {ar:'—', en:'—', wazn:'—'}, makan: {ar:'مَنَام', en:'Bed/Dream', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'مُنَبِّه', en: 'Alarm', ex: 'أَضْبِطُ الْمُنَبِّهَ قَبْلَ النَّوْمِ' }, { ar: 'عَمِيق', en: 'Deep', ex: 'أَنَا نِمْتُ نَوْماً عَمِيقاً' },
                { ar: 'حُلْم', en: 'Dream', ex: 'رَأَيْتُ حُلْماً غَرِيباً أَمْسِ' }, { ar: 'مُتْعَب', en: 'Tired', ex: 'أَنَا مُتْعَبٌ جِدّاً وَسَأَنَامُ الْآنَ' }
            ],
            qa: [
                { q: 'هَلْ نِمْتَ جَيِّداً الْبَارِحَةَ؟', a: 'نَعَمْ، الْحَمْدُ للهِ نِمْتُ جَيِّداً.' },
                { q: 'مَتَى تَسْتَيْقِظُ عَادَةً؟', a: 'أَسْتَيْقِظُ فِي السَّاعَةِ السَّادِسَةِ صَبَاحاً.' }
            ],
            phrases: [
                { ar: 'أَنَا نَعْسَان', en: 'I am sleepy' },
                { ar: 'نَوْمَةُ أَهْلِ الْكَهْفِ', en: 'Sleeping like a log (Like the sleepers of the cave)' }
            ],
            sentence: { ar: ['أَنَا', 'أَنَامُ', 'عَلَى', 'السَّرِيرِ', 'مُبَكِّراً'], en: "I sleep on the bed early." }
        },
        'v14': { // قُمْتُ
            deriv: { masdar: {ar:'قِيَام', en:'Standing/Doing', wazn:'فِعَال'}, faail: {ar:'قَائِم', en:'Stander', wazn:'فَاعِل'}, mafool: {ar:'مَقُوم', en:'Supported', wazn:'مَفْعُول'}, makan: {ar:'مَقَام', en:'Station', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'مَشْرُوع', en: 'Project', ex: 'أَنَا أَقُومُ بِمَشْرُوعٍ جَدِيدٍ' }, { ar: 'مُسَاعَدَة', en: 'Help', ex: 'أَقُومُ بِمُسَاعَدَةِ زُمَلَائِي' },
                { ar: 'رُوتِين', en: 'Routine', ex: 'أَقُومُ بِرُوتِينِي الصَّبَاحِيِّ' }, { ar: 'وَاجِب', en: 'Duty', ex: 'أَقُومُ بِحَلِّ وَاجِبَاتِي' }
            ],
            qa: [
                { q: 'مَاذَا قُمْتَ بِفِعْلِهِ الْيَوْمَ؟', a: 'قُمْتُ بِتَنْظِيفِ الْمَنْزِلِ بِالْكَامِلِ.' },
                { q: 'هَلْ قُمْتَ بِإِرْسَالِ الْمَلَفِّ؟', a: 'نَعَمْ، قُمْتُ بِذَلِكَ قَبْلَ قَلِيلٍ.' }
            ],
            phrases: [
                { ar: 'عَلَى رَأْسِي', en: 'On my head (I will gladly do it)' },
                { ar: 'قُمْتُ بِالْوَاجِبِ', en: 'I did what I had to do' }
            ],
            sentence: { ar: ['أَنَا', 'أَقُومُ', 'بِحَلِّ', 'الْوَاجِبِ', 'بِنَفْسِي'], en: "I do the homework by myself." }
        },
        'v15': { // جَلَسْتُ
            deriv: { masdar: {ar:'جُلُوس', en:'Sitting', wazn:'فُعُول'}, faail: {ar:'جَالِس', en:'Sitter', wazn:'فَاعِل'}, mafool: {ar:'مَجْلُوس', en:'Sat upon', wazn:'مَفْعُول'}, makan: {ar:'مَجْلِس', en:'Council', wazn:'مَفْعِل'} },
            vocab: [
                { ar: 'مَكْتَب', en: 'Desk', ex: 'أَجْلِسُ إِلَى مَكْتَبِي لِأَعْمَلَ' }, { ar: 'صَفّ', en: 'Row', ex: 'أَجْلِسُ فِي الصَّفِّ الْأَمَامِيِّ' },
                { ar: 'رَاحَة', en: 'Rest', ex: 'أَجْلِسُ لِآخُذَ قِسْطاً مِنَ الرَّاحَةِ' }, { ar: 'شُرْفَة', en: 'Balcony', ex: 'أَجْلِسُ فِي الشُّرْفَةِ لِشُرْبِ الشَّايِ' }
            ],
            qa: [
                { q: 'أَيْنَ تُفَضِّلُ أَنْ تَجْلِسَ؟', a: 'أُفَضِّلُ الْجُلُوسَ بِجَانِبِ النَّافِذَةِ.' },
                { q: 'هَلْ يُمْكِنُنِي أَنْ أَجْلِسَ مَعَكَ؟', a: 'بِالتَّأْكِيدِ، الْمَقْعَدُ فَارِغٌ.' }
            ],
            phrases: [
                { ar: 'خُذْ رَاحَتَكَ', en: 'Make yourself comfortable (Take your rest)' },
                { ar: 'جَلْسَةٌ لَا تُمَلُّ', en: 'A sitting that one never tires of' }
            ],
            sentence: { ar: ['أَنَا', 'أَجْلِسُ', 'عَلَى', 'الْكُرْسِيِّ', 'لِأَسْتَرِيحَ'], en: "I sit on the chair to rest." }
        },
        'v16': { // ذَهَبْتُ
            deriv: { masdar: {ar:'ذَهَاب', en:'Going', wazn:'فَعَال'}, faail: {ar:'ذَاهِب', en:'Goer', wazn:'فَاعِل'}, mafool: {ar:'مَذْهُوب', en:'Taken away', wazn:'مَفْعُول'}, makan: {ar:'مَذْهَب', en:'Pathway', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'عُطْلَة', en: 'Vacation', ex: 'ذَهَبْتُ فِي عُطْلَةٍ إِلَى الْبَحْرِ' }, { ar: 'مَرْكَز تِجَارِيّ', en: 'Mall', ex: 'أَذْهَبُ لِلْمَرْكَزِ التِّجَارِيِّ' },
                { ar: 'مَشْي', en: 'Walking', ex: 'أَذْهَبُ لِلْعَمَلِ مَشْياً عَلَى الْأَقْدَامِ' }, { ar: 'مَوْعِد', en: 'Appointment', ex: 'أَنَا ذَاهِبٌ لِمَوْعِدِ الطَّبِيبِ' }
            ],
            qa: [
                { q: 'هَلْ ذَهَبْتَ إِلَى التَّدْرِيبِ الْيَوْمَ؟', a: 'لَا، كُنْتُ مَشْغُولاً جِدّاً فَلَمْ أَذْهَبْ.' },
                { q: 'مَتَى سَتَذْهَبُ إِلَى الْمَطَارِ؟', a: 'سَأَذْهَبُ بَعْدَ سَاعَتَيْنِ تَقْرِيباً.' }
            ],
            phrases: [
                { ar: 'أَنَا ذَاهِب', en: 'I am leaving/going now' },
                { ar: 'رِحْلَةٌ سَعِيدَةٌ', en: 'Have a nice trip' }
            ],
            sentence: { ar: ['أَنَا', 'أَذْهَبُ', 'إِلَى الْعَمَلِ', 'بِالسَّيَّارَةِ', 'صَبَاحاً'], en: "I go to work by car in the morning." }
        },
        'v17': { // جِئْتُ
            deriv: { masdar: {ar:'مَجِيء', en:'Coming', wazn:'مَفْعِل'}, faail: {ar:'جَائِي', en:'Comer', wazn:'فَاعِل'}, mafool: {ar:'—', en:'—', wazn:'—'}, makan: {ar:'—', en:'—', wazn:'—'} },
            vocab: [
                { ar: 'مُبَكِّراً', en: 'Early', ex: 'أَنَا جِئْتُ مُبَكِّراً الْيَوْمَ' }, { ar: 'مُتَأَخِّراً', en: 'Late', ex: 'أَعْتَذِرُ، جِئْتُ مُتَأَخِّراً' },
                { ar: 'ازْدِحَام', en: 'Traffic', ex: 'جِئْتُ بِصُعُوبَةٍ بِسَبَبِ الِازْدِحَامِ' }, { ar: 'زِيَارَة', en: 'Visit', ex: 'جِئْتُ لِزِيَارَتِكَ يَا صَدِيقِي' }
            ],
            qa: [
                { q: 'لِمَاذَا جِئْتَ مُتَأَخِّراً هَكَذَا؟', a: 'كَانَ هُنَاكَ ازْدِحَامٌ مُرُورِيٌّ خَانِقٌ.' },
                { q: 'هَلْ جِئْتَ وَحْدَكَ لِلْحَفْلَةِ؟', a: 'نَعَمْ، جِئْتُ بِمُفْرَدِي.' }
            ],
            phrases: [
                { ar: 'جِئْتُكَ فِي مَوْضُوعٍ مُهِمّ', en: 'I came to you for an important matter' },
                { ar: 'شَرَّفْتَنَا بِمَجِيئِكَ', en: 'You honored us with your coming' }
            ],
            sentence: { ar: ['أَنَا', 'أَجِيءُ', 'مِنَ الْمَدْرَسَةِ', 'فِي', 'الظُّهْرِ'], en: "I come from school at noon." }
        },
        'v18': { // دَخَلْتُ
            deriv: { masdar: {ar:'دُخُول', en:'Entering', wazn:'فُعُول'}, faail: {ar:'دَاخِل', en:'Enterer', wazn:'فَاعِل'}, mafool: {ar:'مَدْخُول', en:'Entered', wazn:'مَفْعُول'}, makan: {ar:'مَدْخَل', en:'Entrance', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'جَامِعَة', en: 'University', ex: 'دَخَلْتُ الْجَامِعَةَ هَذَا الْعَامَ' }, { ar: 'امْتِحَان', en: 'Exam', ex: 'دَخَلْتُ قَاعَةَ الِامْتِحَانِ خَائِفاً' },
                { ar: 'كَلِمَةُ السِّرّ', en: 'Password', ex: 'أَدْخَلْتُ كَلِمَةَ السِّرِّ لِحِسَابِي' }, { ar: 'الْبَاب', en: 'Door', ex: 'أَدْخُلُ مِنَ الْبَابِ الرَّئِيسِيِّ' }
            ],
            qa: [
                { q: 'هَلْ دَخَلْتَ قَاعَةَ الِاجْتِمَاعَاتِ؟', a: 'لَا، أَنَا أَنْتَظِرُ فِي الْخَارِجِ.' },
                { q: 'كَيْفَ دَخَلْتَ إِلَى الْمَوْقِعِ؟', a: 'دَخَلْتُ بِاسْتِخْدَامِ بَرِيدِي الْإِلِكْتُرُونِيِّ.' }
            ],
            phrases: [
                { ar: 'أَسْتَأْذِنُكَ بِالدُّخُولِ', en: 'I ask your permission to enter' },
                { ar: 'الدُّخُولُ مَجَّانِيّ', en: 'Entry is free' }
            ],
            sentence: { ar: ['أَنَا', 'أَدْخُلُ', 'الْغُرْفَةَ', 'وَأُغْلِقُ', 'الْبَابَ'], en: "I enter the room and close the door." }
        },
        'v19': { // خَرَجْتُ
            deriv: { masdar: {ar:'خُرُوج', en:'Exiting', wazn:'فُعُول'}, faail: {ar:'خَارِج', en:'Exiter', wazn:'فَاعِل'}, mafool: {ar:'مَخْرُوج', en:'Taken out', wazn:'مَفْعُول'}, makan: {ar:'مَخْرَج', en:'Exit', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'عُطْلَة نِهَايَةِ الْأُسْبُوعِ', en: 'Weekend', ex: 'سَأَخْرُجُ فِي عُطْلَةِ نِهَايَةِ الْأُسْبُوعِ' }, { ar: 'رِحْلَة', en: 'Trip', ex: 'خَرَجْتُ فِي رِحْلَةٍ جَبَلِيَّةٍ' },
                { ar: 'مَلَابِس', en: 'Clothes', ex: 'أَرْتَدِي مَلَابِسِي لِأَخْرُجَ' }, { ar: 'مَسَاء', en: 'Evening', ex: 'أُحِبُّ الْخُرُوجَ فِي الْمَسَاءِ' }
            ],
            qa: [
                { q: 'مَتَى سَتَخْرُجُ لِمُقَابَلَتِي؟', a: 'سَأَخْرُجُ بَعْدَ نِصْفِ سَاعَةٍ بِالضَّبْطِ.' },
                { q: 'هَلْ خَرَجْتَ بِدُونِ مِعْطَفٍ؟', a: 'نَعَمْ، نَسِيتُهُ وَالْجَوُّ بَارِدٌ جِدّاً.' }
            ],
            phrases: [
                { ar: 'أَنَا خَارِجٌ الْآنَ', en: 'I am stepping out now' },
                { ar: 'خُرُوجٌ نِهَائِيّ', en: 'Final exit / Log out' }
            ],
            sentence: { ar: ['أَنَا', 'أَخْرُجُ', 'مِنَ الْبَيْتِ', 'مُبَكِّراً'], en: "I go out from the house early." }
        },
        'v20': { // فَتَحْتُ
            deriv: { masdar: {ar:'فَتْح', en:'Opening', wazn:'فَعْل'}, faail: {ar:'فَاتِح', en:'Opener', wazn:'فَاعِل'}, mafool: {ar:'مَفْتُوح', en:'Opened', wazn:'مَفْعُول'}, makan: {ar:'مَفْتَح', en:'Place/Key', wazn:'مَفْعَل'} },
            vocab: [
                { ar: 'حِسَاب', en: 'Account', ex: 'فَتَحْتُ حِسَاباً بَنْكِيّاً جَدِيداً' }, { ar: 'هَدِيَّة', en: 'Gift', ex: 'فَتَحْتُ الْهَدِيَّةَ بِسَعَادَةٍ' },
                { ar: 'قَلْب', en: 'Heart', ex: 'فَتَحْتُ قَلْبِي لِصَدِيقِي الْمُقَرَّبِ' }, { ar: 'بَرِيد', en: 'Email/Mail', ex: 'هَلْ فَتَحْتَ الْبَرِيدَ الْإِلِكْتُرُونِيَّ؟' }
            ],
            qa: [
                { q: 'هَلْ فَتَحْتَ الرِّسَالَةَ الَّتِي أَرْسَلْتُهَا؟', a: 'نَعَمْ فَتَحْتُهَا وَقَرَأْتُهَا جَيِّداً.' },
                { q: 'مَاذَا فَتَحْتَ عَلَى الْحَاسُوبِ؟', a: 'فَتَحْتُ بَرْنَامَجَ التَّرْجَمَةِ لِأُذَاكِرَ.' }
            ],
            phrases: [
                { ar: 'افْتَحْ قَلْبَكَ', en: 'Open your heart (Be honest)' },
                { ar: 'فَتَحَ مَوْضُوعاً', en: 'He opened a topic (Started a conversation)' }
            ],
            sentence: { ar: ['أَنَا', 'أَفْتَحُ', 'الْكِتَابَ', 'لِأَقْرَأَ', 'الدَّرْسَ'], en: "I open the book to read the lesson." }
        }
    };

// نظام الـ Fallback الشامل للبيانات الجديدة
    let baseKey = verbKey;
    let num = parseInt(verbKey.replace('v',''));
    if (num > 10) baseKey = 'v' + (num - 10);

    // دمج البيانات الافتراضية مع بيانات الفعل إذا كانت ناقصة
    let verbData = dict[baseKey] || {};

    return {
        deriv: verbData.deriv || { masdar: {ar:'فَعْل', en:'Idea', wazn:'فَعْل'}, faail: {ar:'فَاعِل', en:'Doer', wazn:'فَاعِل'}, mafool: {ar:'مَفْعُول', en:'Receiver', wazn:'مَفْعُول'}, makan: {ar:'مَفْعَل', en:'Place', wazn:'مَفْعَل'} },
        vocab: verbData.vocab || [{ ar: 'كَلِمَة', en: 'Word', ex: 'كَلِمَةٌ مُفِيدَةٌ' }, { ar: 'مَكَان', en: 'Place', ex: 'هَذَا مَكَانٌ جَمِيلٌ' }],
        qa: verbData.qa || [{ q: 'مَاذَا تَفْعَلُ الْآنَ؟', a: 'أَنَا أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ.' }],
        phrases: verbData.phrases || [{ ar: 'مُمْتَاز', en: 'Excellent' }],
        sentence: verbData.sentence || { ar: ['أَنَا', 'أَتَعَلَّمُ', 'اللُّغَةَ', 'الْعَرَبِيَّةَ'], en: "I am learning the Arabic language." },

        // 🌟 الإضافات الجديدة (Chat, Story, Idioms)
        chatData: verbData.chatData || {
            bot: 'مَرْحَباً! مَاذَا تَفْعَلُ هُنَا؟',
            opts: ['أَنَا أُذَاكِرُ دُرُوسِي.', 'السَّيَّارَةُ سَرِيعَةٌ.', 'الْبَابُ مَفْتُوحٌ.'],
            correctIdx: 0,
            successReply: 'بِالتَّوْفِيقِ فِي مُذَاكَرَتِكَ!'
        },
        storyData: verbData.storyData || {
            text: 'فِي الصَّبَاحِ الْبَاكِرِ، خَرَجَ الطَّالِبُ مِنْ (1) لِيَذْهَبَ إِلَى (2) وَيَلْتَقِيَ مَعَ (3).',
            blanks: ['الْبَيْتِ', 'الْمَدْرَسَةِ', 'أَصْدِقَائِهِ'],
            bank: ['الْبَيْتِ', 'أَصْدِقَائِهِ', 'الْمَدْرَسَةِ', 'الْمَلْعَبِ']
        },
        idiomQuizData: verbData.idiomQuizData || {
            scenario: 'صَدِيقُكَ انْتَهَى لِلتَّوْ مِنْ تَنَاوُلِ الطَّعَامِ، مَاذَا تَقُولُ لَهُ؟',
            opts: ['بِالْهَنَاءِ وَالشِّفَاءِ', 'نَوْمَ الْعَوَافِي', 'مَعَ السَّلَامَةِ'],
            correctIdx: 0
        }
    };
}



// =====================================================================
// 🌳 ULTIMATE NOUNS & FLUENCY LESSON (Level 3 Enriched)
// =====================================================================

function _initNounsLesson(v, key) {
    const data = _getNounData(key);

    // 1. المفردات
    const vocabGrid = document.getElementById('ui-vocab-grid');
    if(vocabGrid && data.vocab.length > 0) {
        vocabGrid.innerHTML = data.vocab.map((item, i) => `
            <div class="vocab-card animate-up" style="animation-delay:${i*0.1}s" onclick="speakAr('${item.ex}')">
                <div class="v-ar">${item.ar}</div>
                <div class="v-en">${item.en}</div>
                <div class="v-ex">${item.ex}</div>
            </div>
        `).join('');
        _initVocabQuiz(data.vocab);
    }

    // 2. تجهيز حاوية الطلاقة (Fluency Container) وتفريغها
    let fluencyContainer = document.getElementById('ui-fluency-container');
    if(!fluencyContainer) {
        fluencyContainer = document.createElement('div');
        fluencyContainer.id = 'ui-fluency-container';
        const sbSection = document.querySelector('.sentence-builder-wrap');
        sbSection.parentNode.insertBefore(fluencyContainer, sbSection);
    }
    fluencyContainer.innerHTML = ''; // تفريغ الحاوية في كل مرة نفتح فيها الفعل

    // 💬 لعبة المحاكي (Chat Simulation)
    if(data.chatData) {
        const chatWrap = document.createElement('div');
        chatWrap.className = 'fluency-section animate-up';
        chatWrap.innerHTML = `
            <div class="section-heading" style="justify-content:center; margin-bottom: 20px;">
                <span class="section-badge" style="background:#047857;">💬</span> Chat Simulator — محاكي المحادثة
            </div>
            <div style="font-family:var(--font-ui); color:var(--text-muted); text-align:center; margin-bottom:20px; direction:ltr;">Choose the correct reply! — اختر الرد المناسب!</div>
            <div class="chat-wrap" id="chat-simulator-box">
                <div class="msg-bot">${data.chatData.bot}</div>
                <div class="msg-user" id="chat-user-reply"></div>
                <div class="chat-opts" id="chat-options-box">
                    ${data.chatData.opts.map((opt, i) => `
                        <button class="chat-opt-btn" onclick="_checkChatAnswer(${i}, ${data.chatData.correctIdx}, '${opt}', '${data.chatData.successReply}', this)">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        fluencyContainer.appendChild(chatWrap);
    }

    // 📖 قصة الفراغات (Fill-in-the-Blanks Story)
    if(data.storyData) {
        const storyWrap = document.createElement('div');
        storyWrap.className = 'fluency-section animate-up';

        // تحويل النص إلى فراغات قابلة للضغط
        let formattedText = data.storyData.text;
        data.storyData.blanks.forEach((blank, idx) => {
            formattedText = formattedText.replace(`(${idx+1})`, `<span class="story-blank" data-idx="${idx}" onclick="_storySelectBlank(this)">----</span>`);
        });

        window._currentStoryData = { blanks: data.storyData.blanks, currentIdx: 0, completed: 0 };

        storyWrap.innerHTML = `
            <div class="section-heading" style="justify-content:center; margin-bottom: 20px;">
                <span class="section-badge" style="background:#10b981;">📖</span> Story Mode — أكمل القصة
            </div>
            <div style="font-family:var(--font-ui); color:var(--text-muted); text-align:center; margin-bottom:20px; direction:ltr;">Fill the blanks to complete the story.</div>
            <div class="story-wrap">
                <div class="story-text">${formattedText}</div>
                <div class="story-bank">
                    ${data.storyData.bank.sort(() => 0.5 - Math.random()).map((word, i) => `
                        <button class="story-word-btn" onclick="_storyFillWord('${word}', this)">${word}</button>
                    `).join('')}
                </div>
            </div>
        `;
        fluencyContainer.appendChild(storyWrap);

        // تفعيل أول فراغ تلقائياً
        setTimeout(() => {
            const firstBlank = storyWrap.querySelector('.story-blank');
            if(firstBlank) _storySelectBlank(firstBlank);
        }, 100);
    }

    // 🎭 لغز التعبيرات الثقافية (Idioms Situations)
    if(data.idiomQuizData) {
        const idiomWrap = document.createElement('div');
        idiomWrap.className = 'animate-up';
        idiomWrap.innerHTML = `
            <div class="idiom-quiz-wrap">
                <div class="section-heading" style="justify-content:center; margin-bottom: 20px; color:#fff;">
                    <span class="section-badge" style="background:#fff; color:#047857;">🎭</span> Cultural Situation — الموقف الثقافي
                </div>
                <div class="idiom-scenario">🤔 ${data.idiomQuizData.scenario}</div>
                <div class="idiom-opts" id="idiom-options-box">
                    ${data.idiomQuizData.opts.map((opt, i) => `
                        <button class="idiom-opt-btn" onclick="_checkIdiomAnswer(${i}, ${data.idiomQuizData.correctIdx}, this)">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        fluencyContainer.appendChild(idiomWrap);
    }

    // 3. بناء الجملة (الأساسي)
    _initSentenceBuilder(data.sentence);
}

/* 💬 دوال محاكي المحادثة */
function _checkChatAnswer(selectedIdx, correctIdx, text, successReply, btn) {
    const btns = document.querySelectorAll('#chat-options-box .chat-opt-btn');
    btns.forEach(b => b.disabled = true);

    const userMsg = document.getElementById('chat-user-reply');
    userMsg.textContent = text;
    userMsg.style.display = 'block';

    if(selectedIdx === correctIdx) {
        btn.classList.add('correct');
        playMatchPro();
        addStars(3);

        // رد الروبوت النهائي
        setTimeout(() => {
            document.getElementById('chat-simulator-box').innerHTML += `<div class="msg-bot animate-up" style="margin-top:10px;">${successReply}</div>`;
            playTone(800, 'sine', 0.1, 0.1);
        }, 1000);

    } else {
        btn.classList.add('wrong');
        btns[correctIdx].classList.add('correct');
        playErrorSound();
        userMsg.style.borderColor = 'var(--red)';
        userMsg.style.color = 'var(--red)';
    }
}

/* 📖 دوال القصة التفاعلية */
let _activeStoryBlank = null;

function _storySelectBlank(el) {
    if(el.classList.contains('filled')) return;
    document.querySelectorAll('.story-blank').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    _activeStoryBlank = el;
}

function _storyFillWord(word, btn) {
    if(!_activeStoryBlank) return;

    const targetIdx = parseInt(_activeStoryBlank.dataset.idx);
    const correctWord = window._currentStoryData.blanks[targetIdx];

    if(word === correctWord) {
        _activeStoryBlank.textContent = word;
        _activeStoryBlank.classList.remove('active');
        _activeStoryBlank.classList.add('filled');
        btn.classList.add('used');
        playMatchPro();
        window._currentStoryData.completed++;

        // الانتقال للفراغ التالي تلقائياً
        const nextBlank = document.querySelector('.story-blank:not(.filled)');
        if(nextBlank) {
            _storySelectBlank(nextBlank);
        } else {
            // اكتملت القصة
            addStars(5);
            fireConfetti();
        }
    } else {
        btn.style.animation = 'shake 0.4s';
        playErrorSound();
        setTimeout(() => btn.style.animation = '', 400);
    }
}

/* 🎭 دوال لغز الثقافة */
function _checkIdiomAnswer(selectedIdx, correctIdx, btn) {
    const btns = document.querySelectorAll('#idiom-options-box .idiom-opt-btn');
    btns.forEach(b => b.disabled = true);

    if(selectedIdx === correctIdx) {
        btn.classList.add('correct');
        playVictorySound();
        addStars(3);
        fireConfetti();
    } else {
        btn.classList.add('wrong');
        btns[correctIdx].classList.add('correct');
        playErrorSound();
    }
}


let _sbState = {
    targetObj: { ar: [], en: '' },
    current: []
};

function _initSentenceBuilder(sentenceObj = null) {
    if (sentenceObj) _sbState.targetObj = sentenceObj;
    if (!_sbState.targetObj || !Array.isArray(_sbState.targetObj.ar)) {
        _sbState.targetObj = { ar: [], en: '' };
    }
    _sbState.current = [];
    const opts = [..._sbState.targetObj.ar].sort(() => 0.5 - Math.random());

    // 🌟 الإصلاح هنا: تحديد القسم الصحيح بدقة لتجنب التعارض (Crash)
    const wrap = document.getElementById('section-sentence-builder').querySelector('.sentence-builder-wrap');
    let targetEnDiv = document.getElementById('sb-target-en');
    if(!targetEnDiv) {
        targetEnDiv = document.createElement('div');
        targetEnDiv.id = 'sb-target-en';
        targetEnDiv.className = 'sb-target-en';
        wrap.insertBefore(targetEnDiv, document.getElementById('sb-target'));
    }
    targetEnDiv.innerHTML = `<i class="fas fa-language"></i> Target: "${_sbState.targetObj.en}"`;

    _renderSbTarget();
    document.getElementById('sb-options').innerHTML = opts.map((w, i) =>
        `<button class="sb-opt-btn animate-up" style="animation-delay:${i*0.1}s" onclick="_sbClickWord('${w}', this)">${w}</button>`
    ).join('');
    document.getElementById('sb-feedback').textContent = '';
    document.getElementById('sb-reset').style.display = 'none';
}
function _renderSbTarget() {
    const trg = document.getElementById('sb-target');
    trg.innerHTML = '';
    for (let i = 0; i < _sbState.targetObj.ar.length; i++) {
        if (i < _sbState.current.length) trg.innerHTML += `<div class="sb-word-slot">${_sbState.current[i]}</div>`;
        else trg.innerHTML += `<div class="sb-word-slot empty">----</div>`;
    }
}

function _sbClickWord(w, btn) {
    btn.disabled = true;
    _sbState.current.push(w);
    _renderSbTarget();
    speakAr(w);
    if (_sbState.current.length === _sbState.targetObj.ar.length) _sbCheckSentence();
}

function _sbCheckSentence() {
    const isCorrect = _sbState.current.join(' ') === _sbState.targetObj.ar.join(' ');
    const fb = document.getElementById('sb-feedback');
    if (isCorrect) {
        fb.innerHTML = '<span style="color:var(--green)">✅ مذهل! جملة صحيحة تماماً!</span>';
        playVictorySound(); addStars(5); fireConfetti();
        document.getElementById('sb-options').innerHTML = '';
    } else {
        fb.innerHTML = '<span style="color:var(--red)">❌ الترتيب يحتاج تعديل.. حاول مرة أخرى!</span>';
        playErrorSound();
        document.getElementById('sb-reset').style.display = 'block';
    }
}


// 🎯 محرك لعبة تحدي المفردات (Vocab Challenge Engine)
let _vqState = { pool: [], questions: [], idx: 0, score: 0 };

function _initVocabQuiz(vocabArray) {
    if(!vocabArray || vocabArray.length < 4) return; // نحتاج 4 كلمات على الأقل

    document.getElementById('ui-vocab-quiz-wrap').style.display = 'block';
    _vqState.pool = vocabArray;
    _vqState.score = 0;
    _vqState.idx = 0;

    // إنشاء 4 أسئلة (ترجمة من الإنجليزي للعربي)
    let qs = [...vocabArray].sort(() => 0.5 - Math.random()).slice(0, 4);
    _vqState.questions = qs.map(q => {
        let opts = [q.ar];
        let distractors = [...vocabArray].filter(v => v.ar !== q.ar).sort(() => 0.5 - Math.random());
        opts.push(distractors[0].ar, distractors[1].ar, distractors[2].ar);
        return { targetEn: q.en, correctAr: q.ar, options: opts.sort(() => 0.5 - Math.random()) };
    });

    _vqNext();
}

function _vqNext() {
    if (_vqState.idx >= _vqState.questions.length) {
        document.getElementById('vq-question').innerHTML = '🎉 أداء ممتاز!';
        document.getElementById('vq-options').innerHTML = `<button class="btn-primary" style="max-width:300px; margin:0 auto;" onclick="_initVocabQuiz(_vqState.pool)">إعادة التحدي <i class="fas fa-redo"></i></button>`;
        document.getElementById('vq-feedback').textContent = '';
        if(_vqState.score === 4) addStars(5);
        return;
    }

    const q = _vqState.questions[_vqState.idx];
    document.getElementById('vq-q-num').textContent = _vqState.idx + 1;
    document.getElementById('vq-score').textContent = _vqState.score;
    document.getElementById('vq-question').textContent = q.targetEn; // الكلمة الإنجليزية
    document.getElementById('vq-feedback').textContent = '';

    // رسم الأزرار
    document.getElementById('vq-options').innerHTML = q.options.map(opt => `
        <button class="sb-opt-btn" onclick="_vqCheckAnswer('${opt}', '${q.correctAr}', this)">${opt}</button>
    `).join('');
}

function _vqCheckAnswer(selected, correct, btn) {
    const buttons = document.querySelectorAll('#vq-options .sb-opt-btn');
    buttons.forEach(b => b.disabled = true);

    const fb = document.getElementById('vq-feedback');
    if (selected === correct) {
        btn.classList.add('correct');
        btn.style.background = 'var(--green)';
        btn.style.color = '#fff';
        _vqState.score++;
        fb.innerHTML = '<span style="color:var(--green)">✅ صَحِيح!</span>';
        playMatchPro();
    } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
            if(b.textContent === correct) {
                b.style.background = 'var(--green)'; b.style.color = '#fff';
            }
        });
        fb.innerHTML = '<span style="color:var(--red)">❌ خَطَأ!</span>';
        playErrorSound();
    }

    document.getElementById('vq-score').textContent = _vqState.score;
    setTimeout(() => { _vqState.idx++; _vqNext(); }, 1500);
}


// 🎮 محرك لعبة التوصيل (Match Columns) المُطور
let _matchState = {
    pairs: [],
    selectedRight: null,
    selectedLeft: null,
    matches: 0
};

function _initMatchGame(verbData) {
    _matchState.pairs = [];
    _matchState.selectedRight = null;
    _matchState.selectedLeft = null;
    _matchState.matches = 0;

    const svg = document.getElementById('match-lines-svg');
    if(svg) svg.innerHTML = '';

    // استخراج الجذور بدقة
    let pastStem = verbData.symbol.slice(0, -1);
    if(verbData.symbol === 'نَامَ') pastStem = 'نِم';
    if(verbData.symbol === 'قَامَ') pastStem = 'قُم';
    if(verbData.symbol === 'جَاءَ') pastStem = 'جِئ';

    const presentRoot = (verbData.affixes.find(a => a.label.includes('Present')) || {root: ''}).root;
    const presentStem = presentRoot ? presentRoot.slice(0, -1) : '';

    // تجميع كل التصريفات الممكنة
    const allConjugations = [
        { pro: 'أَنَا', verb: pastStem + 'ْتُ' }, { pro: 'أَنَا', verb: 'أَ' + presentRoot }, { pro: 'أَنَا', verb: 'سَأَ' + presentRoot },
        { pro: 'نَحْنُ', verb: pastStem + 'ْنَا' }, { pro: 'نَحْنُ', verb: 'نَ' + presentRoot }, { pro: 'نَحْنُ', verb: 'سَنَ' + presentRoot },
        { pro: 'أَنْتَ', verb: pastStem + 'ْتَ' }, { pro: 'أَنْتَ', verb: 'تَ' + presentRoot }, { pro: 'أَنْتَ', verb: 'سَتَ' + presentRoot },
        { pro: 'هُوَ', verb: verbData.tenses.past }, { pro: 'هُوَ', verb: 'يَ' + presentRoot }, { pro: 'هُوَ', verb: 'سَيَ' + presentRoot },
        { pro: 'هِيَ', verb: pastStem + 'َتْ' }, { pro: 'هِيَ', verb: 'تَ' + presentRoot }, { pro: 'هِيَ', verb: 'سَتَ' + presentRoot },
        { pro: 'هُمْ', verb: pastStem + 'ُوا' }, { pro: 'هُمْ', verb: 'يَ' + presentStem + 'ُونَ' }, { pro: 'هُمْ', verb: 'سَيَ' + presentStem + 'ُونَ' }
    ];

    // 🌟 جلب كل الضمائر הستة، واختيار زمن عشوائي لكل ضمير
    const pros = ['أَنَا', 'نَحْنُ', 'أَنْتَ', 'هُوَ', 'هِيَ', 'هُمْ'];
    const selectedPairs = pros.map(p => {
        const availableForPro = allConjugations.filter(c => c.pro === p);
        return availableForPro[Math.floor(Math.random() * availableForPro.length)];
    });

    // سحب 5 ضمائر عشوائية فقط لتناسب حجم الشاشة والتصميم
    const finalPairs = selectedPairs.sort(() => 0.5 - Math.random()).slice(0, 5);

    _matchState.pairs = finalPairs;

    const rightCol = [...finalPairs].sort(() => 0.5 - Math.random());
    const leftCol = [...finalPairs].sort(() => 0.5 - Math.random());

    const rHtml = rightCol.map((item, i) => `
        <div class="match-item right-item" id="mr-${i}" data-val="${item.pro}" onclick="_matchClickRight(${i})">${item.pro}</div>
    `).join('');

    const lHtml = leftCol.map((item, i) => `
        <div class="match-item left-item" id="ml-${i}" data-val="${item.verb}" onclick="_matchClickLeft(${i})">${item.verb}</div>
    `).join('');

    const rightColEl = document.getElementById('match-col-right');
    const leftColEl = document.getElementById('match-col-left');

    if(rightColEl) rightColEl.innerHTML = rHtml;
    if(leftColEl) leftColEl.innerHTML = lHtml;
}

function _matchClickRight(idx) {
    const el = document.getElementById(`mr-${idx}`);
    if (!el || el.classList.contains('matched')) return;

    document.querySelectorAll('.right-item').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    _matchState.selectedRight = el;
    try { playTone(500, 'sine', 0.1, 0.1); } catch(e){}
    _checkMatch();
}

function _matchClickLeft(idx) {
    const el = document.getElementById(`ml-${idx}`);
    if (!el || el.classList.contains('matched')) return;

    document.querySelectorAll('.left-item').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    _matchState.selectedLeft = el;
    try { playTone(500, 'sine', 0.1, 0.1); } catch(e){}
    _checkMatch();
}

function _checkMatch() {
    if (!_matchState.selectedRight || !_matchState.selectedLeft) return;

    const proVal = _matchState.selectedRight.dataset.val;
    const verbVal = _matchState.selectedLeft.dataset.val;
    const correctPair = _matchState.pairs.find(p => p.pro === proVal && p.verb === verbVal);

    if (correctPair) {
        _matchState.selectedRight.classList.remove('selected');
        _matchState.selectedLeft.classList.remove('selected');

        _matchState.selectedRight.classList.add('matched');
        _matchState.selectedLeft.classList.add('matched');

        _drawMatchLine(_matchState.selectedRight, _matchState.selectedLeft);

        _matchState.selectedRight = null;
        _matchState.selectedLeft = null;
        _matchState.matches++;

        try { playMatchPro(); addStars(2); } catch(e){}

        if (_matchState.matches === _matchState.pairs.length) {
            setTimeout(() => {
                showVictory('🌟', 'Perfect Match! / توصيل رائع!');
                fireConfetti();
            }, 500);
        }
    } else {
        const r = _matchState.selectedRight;
        const l = _matchState.selectedLeft;

        r.classList.remove('selected');
        l.classList.remove('selected');
        r.classList.add('wrong');
        l.classList.add('wrong');

        try { playErrorSound(); } catch(e){}

        setTimeout(() => {
            r.classList.remove('wrong');
            l.classList.remove('wrong');
        }, 400);

        _matchState.selectedRight = null;
        _matchState.selectedLeft = null;
    }
}

function _drawMatchLine(el1, el2) {
    const svg = document.getElementById('match-lines-svg');
    if(!svg) return;
    const svgRect = svg.getBoundingClientRect();
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    const x1 = r1.left - svgRect.left;
    const y1 = r1.top + (r1.height / 2) - svgRect.top;
    const x2 = r2.right - svgRect.left;
    const y2 = r2.top + (r2.height / 2) - svgRect.top;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#10b981');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');

    line.style.strokeDasharray = "500";
    line.style.strokeDashoffset = "500";
    line.style.animation = "drawMatchLine 0.5s ease forwards";

    svg.appendChild(line);
}
/* ================================================================
   NAV v2 JS — Tools drawer, breadcrumb, section nav, tab bar
   ================================================================ */

// Tools drawer toggle
window._toggleToolsDrawer = function() {
  var drawer = document.getElementById('tools-drawer');
  var overlay = document.getElementById('tools-overlay');
  if (!drawer) return;
  var isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  drawer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
};

// Breadcrumb updater — called from _showScreen or navigation functions
window._updateNavBreadcrumb = function(screen, context) {
  var bc = document.getElementById('navBreadcrumb');
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
  var dots = document.querySelectorAll('#sectionDots .dot');
  if (!dots.length) return;
  var current = -1;
  dots.forEach(function(d, i) { if (d.classList.contains('active')) current = i; });
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
    window.loginStudent = async function() {
      var didEnter = await _origLogin.apply(this, arguments);
      if (!didEnter) return false;
      document.body.classList.add('nav-open');
      var tabMeName = document.getElementById('tab-me-name');
      if (tabMeName && window.studentCode) tabMeName.textContent = window.studentCode;
      return true;
    };
  }
})();

// Make #main-back-btn show as flex when JS sets display:block via style
(function watchBackBtn() {
  var btn = document.getElementById('main-back-btn');
  if (!btn) return;
  var obs = new MutationObserver(function() {
    if (btn.style.display === 'block') {
      btn.style.display = 'flex';
    }
  });
  obs.observe(btn, { attributes: true, attributeFilter: ['style'] });
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
    dots.forEach(function(d, i) { if (d.classList.contains('active')) current = i; });
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
      dots.forEach(function(d,i){ if (d.classList.contains('active')) current = i; });
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
  window._tabMe       = function() {
    _setActiveTab('tab-me');
    if (typeof _toggleAccountMenu === 'function') _toggleAccountMenu();
  };

  /* ── Patch loginStudent ── */
  var _loginPatched = false;
  function _patchLogin() {
    if (_loginPatched) return;
    if (typeof window.loginStudent !== 'function') { setTimeout(_patchLogin, 300); return; }
    _loginPatched = true;
    var _origLogin = window.loginStudent;
    window.loginStudent = async function() {
      var didEnter = await _origLogin.apply(this, arguments);
      if (!didEnter) return false;
      var label = window.studentEmail || window.studentCode || '';
      _navInit(label);
      _navOnScreen('home-screen');
      return true;
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

(function initParentSessionBridge() {
  if (window.parent === window) return;

  function markEmbedded() {
    document.documentElement.classList.add('embedded-in-jamea-root');
    if (document.body) document.body.classList.add('embedded-in-jamea');
  }

  function send(type, payload) {
    try {
      window.parent.postMessage(Object.assign({ source: 'jamea-verb-lab', type: type }, payload || {}), '*');
    } catch (e) {}
  }

  function applyParentSession(session) {
    markEmbedded();
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
    var navName = document.getElementById('nav-student-name');
    var stars = document.getElementById('starsCount');
    var label = session.activeChildName || session.displayName || studentEmail || (studentCode ? 'Student ' + studentCode : 'Student');

    if (login) login.style.display = 'none';
    if (home) home.style.display = 'block';
    if (name) name.textContent = label;
    if (navName) navName.textContent = label;
    if (stars) stars.textContent = playerProgress.stars;
    if (typeof updateAccountUi === 'function') updateAccountUi();
    if (typeof _navInit === 'function') _navInit(label);
    if (typeof _navOnScreen === 'function') _navOnScreen('home-screen');
    markEmbedded();
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

  window.logoutStudent = function() {
    send('logout');
  };

  var originalSaveProgress = window.saveProgress;
  window.saveProgress = function() {
    if (typeof originalSaveProgress === 'function') {
      try { originalSaveProgress(); } catch (e) {}
    }
    send('save-progress', { progress: normalizeProgress(playerProgress) });
  };

  window.scheduleRemoteProgressSave = function() {
    window.saveProgress();
  };

  window.saveProgressRemote = async function() {
    window.saveProgress();
  };

  window.addEventListener('message', function(event) {
    var msg = event.data || {};
    if (msg.source !== 'jamea-parent') return;
    if (msg.type === 'session') applyParentSession(msg);
  });

  markEmbedded();
  document.addEventListener('DOMContentLoaded', function() {
    markEmbedded();
    var login = document.getElementById('login-overlay');
    if (login) login.style.display = 'none';
    send('ready');
  });
})();

document.addEventListener('click', function(e) {
  var menu = document.getElementById('nav-account-menu');
  var wrap = document.querySelector('.nav-account-wrap');
  if (menu && wrap && !wrap.contains(e.target)) menu.classList.remove('open');
});
document.addEventListener('DOMContentLoaded', function() {
  if (typeof restoreAuthSession === 'function') restoreAuthSession();
});
