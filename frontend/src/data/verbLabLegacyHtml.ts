// Auto-extracted from index.html — do not edit manually

export const VERB_LAB_LEGACY_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Verb Lab — مختبر الأفعال</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<link rel="stylesheet" href="/src/styles/verb-lab.css">



</head>
<body>

<div id="verb-progress-bar"><div id="verb-progress-fill"></div></div>
<div id="toast"></div>
<!-- ================================================================
     APP NAV v3 — verb lab top bar
================================================================ -->
<nav id="app-nav" role="navigation" aria-label="Main navigation">

  <div class="nav-start">
    <button id="nav-back-btn" onclick="goHome()" aria-label="خريطة الأفعال">
      <i class="fas fa-chevron-right" aria-hidden="true"></i>
      <span>رجوع</span>
    </button>
    <nav id="nav-breadcrumb" aria-label="Breadcrumb">
      <span class="bc-crumb active">جامع</span>
    </nav>
  </div>

  <div class="nav-mid">
    <span class="nav-logo" aria-label="Jamea platform">جامع</span>
  </div>

  <div class="nav-end">
    <div class="nav-chip nav-chip-stars" aria-label="النجوم">
      <i class="fas fa-star" aria-hidden="true"></i>
      <span id="nav-stars-count">0</span>
      <span id="starsCount" style="display:none;">0</span>
    </div>
    <div class="nav-chip nav-chip-student" aria-label="الطالب">
      <i class="fas fa-user-circle" aria-hidden="true"></i>
      <span id="nav-student-name">—</span>
      <span id="studentName" style="display:none;">—</span>
    </div>
    <div class="nav-account-wrap">
      <button class="nav-account-btn" onclick="_toggleAccountMenu(event)" aria-label="Account">
        <i class="fas fa-user-circle" aria-hidden="true"></i>
        <span class="nav-account-email" id="nav-account-email">—</span>
        <i class="fas fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="nav-account-menu" id="nav-account-menu" aria-label="Account menu">
        <div class="account-label">Signed in as</div>
        <div class="account-email" id="account-menu-email">—</div>
        <div class="account-label">Student code / كود الطالب</div>
        <div class="account-code-row">
          <input class="account-input" id="studentCodeNavInput" type="text" placeholder="Optional" onkeydown="if(event.key==='Enter') updateStudentCode()">
          <button class="account-save-btn" onclick="updateStudentCode()"><i class="fas fa-check"></i> Save</button>
        </div>
        <button class="account-logout-btn" onclick="logoutStudent()"><i class="fas fa-right-from-bracket"></i> Logout</button>
      </div>
    </div>
    <button class="nav-icon-btn" onclick="toggleTheme()" aria-label="Toggle theme">
      <i id="theme-icon" class="fas fa-moon" aria-hidden="true"></i>
    </button>
  </div>
</nav>

<!-- Mobile bottom tab bar -->
<nav id="bottom-tab-bar" role="navigation" aria-label="Bottom navigation">
  <button class="tab-item active" id="tab-home" onclick="_tabGoHome()" aria-label="الخريطة">
    <i class="fas fa-map-marked-alt" aria-hidden="true"></i>
    <span>الخريطة</span>
  </button>
  <button class="tab-item" id="tab-progress" onclick="_tabProgress()" aria-label="التقدم">
    <i class="fas fa-chart-line" aria-hidden="true"></i>
    <span>التقدم</span>
  </button>
  <button class="tab-item" id="tab-me" onclick="_tabMe()" aria-label="حسابي">
    <i class="fas fa-user" aria-hidden="true"></i>
    <span id="tab-name">أنا</span>
  </button>
</nav>
<div id="reading-check-btns">
  <button class="read-check-btn correct-btn" onclick="showReadingFeedback(true)">✓</button>
  <button class="read-check-btn wrong-btn" onclick="showReadingFeedback(false)">✗</button>
</div>
<div id="victory-overlay">
  <div class="victory-box" onclick="closeVictory()">
    <div style="font-size:5rem;margin-bottom:15px;">🎉</div>
    <div style="font-family:var(--font-ar);font-size:5.5rem;font-weight:900;color:var(--verb-d);line-height:1;" id="victory-word">—</div>
    <div style="font-size:1.4rem;color:var(--text-muted);margin-top:25px;font-weight:900;">Tap anywhere to continue</div>
  </div>
</div>
<button id="break-fab" onclick="alert('Take a 5-minute break! 🌿')">⏸️</button>

<div id="home-screen">
  <div class="home-header animate-up">
    <span class="home-emoji">🧪</span>
    <div class="home-title">The <span>Verb</span> Lab</div>
    <div class="progress-strip">
      <div class="label">Overall Progress</div>
      <div class="progress-bar-wrap"><div id="home-progress-fill"></div></div>
      <div class="pct" id="home-progress-pct">0%</div>
    </div>
  </div>
  <div class="learning-journey">
    <div class="journey-phase animate-up"><i class="fas fa-user"></i> Phase 1 — He (هُوَ) Verbs</div>
    <div class="journey-line animate-up"></div>
    <div class="dna-verb-grid animate-up" id="phase1-nodes"></div>

    <div class="journey-line animate-up"></div>
    <div class="journey-phase animate-up" style="opacity:0.7;background:var(--surface2);border-color:var(--text-muted);color:var(--text-muted);">
      <i class="fas fa-lock"></i> Phase 2 — I (أَنَا) Verbs
    </div>
    <div class="journey-line animate-up" style="opacity:0.4;background:var(--text-muted);"></div>
    <div class="dna-verb-grid animate-up" id="phase2-nodes"></div>
  </div>
</div>

<div id="verb-screen">
  <div class="verb-layout">
    <div class="verb-nav">
      <button class="back-btn" onclick="goHome()"><i class="fas fa-arrow-left"></i> Back</button>
      <div class="section-dots" id="verbSectionDots"></div>
      <div style="font-size:1.1rem;font-weight:900;color:var(--text-muted);direction:ltr;"><span id="verbNavLabel">Section 1 / 9</span></div>
    </div>

    <div class="step-section" data-section="0">
      <div class="hero-box animate-up">
        <div class="hero-badge">🧬 The Verb DNA - جينات الفعل</div>
        <div class="hero-lottie" id="ui-verb-lottie"></div>
        <div class="hero-root" id="ui-verb-root" onclick="speakAr(this.textContent)">—</div>
        <div class="hero-en" id="ui-verb-en">—</div>
        <div class="dna-traits">
          <div class="trait-box"><div class="trait-box-icon">🎬</div><div class="trait-box-label">Action / الحدث</div><div class="trait-box-val" id="ui-trait-action">—</div></div>
          <div class="trait-box"><div class="trait-box-icon">⏱️</div><div class="trait-box-label">Time / الزمن</div><div class="trait-box-val" id="ui-trait-time">—</div></div>
          <div class="trait-box"><div class="trait-box-icon">👤</div><div class="trait-box-label">Doer / الفاعل</div><div class="trait-box-val" id="ui-trait-doer">—</div></div>
        </div>
      </div>
    </div>

    <div class="step-section" data-section="1">
      <div class="section-heading"><span class="section-badge">1</span> 🧩 Verb Affixes — إضافات الفعل</div>
      <div class="affix-grid" id="ui-affix-grid"></div>
    </div>

    <div class="step-section" data-section="2">
      <div class="section-heading"><span class="section-badge">2</span> ⚙️ Conjugation Tenses — تصريف الفعل</div>
<div class="tenses-list" id="ui-tenses-list"></div>    </div>

    <div class="step-section" data-section="3">
      <div class="section-heading"><span class="section-badge">3</span> ❓ Missing Prefix — أكمل البادئة!</div>
      <div class="missing-wrap"><div class="missing-grid" id="ui-missing-grid"></div></div>
    </div>

    <div class="step-section" data-section="4">
      <div class="section-head-row">
        <div class="section-heading" style="margin-bottom:0;"><span class="section-badge">4</span> ❌⭕ Tic-Tac-Toe</div>
        <button class="btn-secondary" onclick="initXO()"><i class="fas fa-rotate-right"></i> Restart</button>
      </div>
      <div class="xo-status" id="xo-turn-status">Turn: ❌ X</div>
      <div class="xo-wrap"><div class="xo-board" id="xo-board"></div><div class="win-line" id="xo-win-line"></div></div>
    </div>



<div class="step-section" data-section="6">
      <div class="section-head-row" style="flex-direction: row-reverse;">
        <div class="section-heading" style="margin-bottom:0; flex-direction: row-reverse;">
          <span class="section-badge" style="background:var(--verb-d);">6</span> 🧠 Memory Match
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn-secondary" onclick="initMemory()" style="padding:8px 18px;">
            Restart <i class="fas fa-rotate-right"></i>
          </button>
          <button class="btn-secondary" id="memory-peek-btn" onclick="memoryPeek()" style="padding:8px 18px;">
            Peek (4s) <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      <div style="font-family:var(--font-ui); font-size:0.95rem; color:var(--text-muted); text-align:center; margin-bottom:15px; direction:ltr;">
        Find the matching pairs and read each word aloud! — اعثر على الأزواج المتطابقة!
      </div>
      <div class="memory-grid" id="memory-grid"></div>
    </div>

<div class="step-section" data-section="7">
      <div class="section-head-row">
        <div class="section-heading" style="margin-bottom:0;"><span class="section-badge">7</span> ⚡ Speed Reading</div>
        <button class="btn-secondary" onclick="verbSrRestart()"><i class="fas fa-rotate-right"></i> Restart</button>
      </div>
      <div class="sr-wrap">
        <div class="sr-start" id="sr-start">
          <div class="sr-start-icon">⚡</div>
          <div class="sr-start-title">Ready to Read?</div>
          <div class="sr-level-grid">
            <button class="sr-level-btn" onclick="verbSrStart(3500,'Easy')"><div class="sr-level-icon">🐢</div><div class="sr-level-name">Easy</div><div class="sr-level-time">3.5 sec</div></button>
            <button class="sr-level-btn" onclick="verbSrStart(2000,'Medium')"><div class="sr-level-icon">🚗</div><div class="sr-level-name">Medium</div><div class="sr-level-time">2.0 sec</div></button>
            <button class="sr-level-btn" onclick="verbSrStart(1200,'Hard')"><div class="sr-level-icon">🚀</div><div class="sr-level-name">Hard</div><div class="sr-level-time">1.2 sec</div></button>
          </div>
          <div class="sr-custom-box">
            <div class="sr-custom-label"><i class="fas fa-stopwatch"></i> Custom — مخصص:</div>
            <div class="sr-custom-controls">
              <input type="number" id="sr-custom-input" min="1" max="30" step="0.5" value="3" />
              <span class="sr-custom-unit">sec</span>
              <button class="sr-custom-go" onclick="verbSrStartCustom()"><i class="fas fa-play"></i> Start!</button>
            </div>
          </div>
          <div class="sr-best">🏆 Best Score: <span id="sr-best">0</span>/10</div>
        </div>
        <div class="sr-playing" id="sr-playing" style="display:none;">
          <div class="sr-hud">
            <div class="sr-hud-item"><div class="sr-hud-label">WORD</div><div class="sr-hud-value"><span id="sr-word-num">0</span>/10</div></div>
            <div class="sr-hud-item sr-hud-score"><div class="sr-hud-label">SCORE</div><div class="sr-hud-value">⭐ <span id="sr-score">0</span></div></div>
            <div class="sr-hud-item"><div class="sr-hud-label">LEVEL</div><div class="sr-hud-value" id="sr-level-name">Medium</div></div>
          </div>
          <div class="sr-timer-bar"><div class="sr-timer-fill" id="sr-timer"></div></div>
          <div class="sr-word-display" id="sr-word">—</div>
          <div class="sr-answer-btns">
            <button class="sr-btn sr-btn-yes" onclick="verbSrAnswer(true)"><i class="fas fa-check"></i> I Read It</button>
            <button class="sr-btn sr-btn-no" onclick="verbSrAnswer(false)"><i class="fas fa-times"></i> Too Fast</button>
          </div>
        </div>
        <div class="sr-results" id="sr-results" style="display:none;">
          <div class="sr-result-icon" id="sr-result-icon">🎉</div>
          <div class="sr-result-title" id="sr-result-title">Great Job!</div>
          <div class="sr-result-score"><span id="sr-final">0</span> / 10</div>
          <button class="btn-secondary" onclick="verbSrRestart()" style="margin-top:20px;"><i class="fas fa-rotate-right"></i> Try Again</button>
        </div>
      </div>
    </div>



<div class="step-section" data-section="prepositions" id="section-prepositions" style="display:none;">
      <div class="section-heading">
        <span class="section-badge">🔗</span> Verb Connections — روابط الفعل
      </div>
      <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:25px; direction:ltr;">
        Learn how this verb connects with different prepositions! — تعلّم كيف يتصل هذا الفعل بحروف الجر!
      </div>
      <div class="prep-grid" id="ui-prep-grid"></div>
    </div>




    <div class="step-section" data-section="review" id="section-review" style="display:none;">
      <div class="section-head-row">
        <div class="section-heading" style="margin-bottom:0;"><span class="section-badge">🔁</span> Review Lab — مختبر المراجعة</div>
        <button class="btn-secondary" onclick="initReviewLab()"><i class="fas fa-rotate-right"></i> New Questions</button>
      </div>
      <div class="review-intro" id="review-intro">
        Mix of verbs you learned before! Choose the correct tense for each verb shown.<br>
        <span style="color:var(--text-muted);">خليط من الأفعال اللي اتعلمتها — اختار الزمن الصحيح!</span>
      </div>
      <div class="review-progress-bar"><div class="review-progress-fill" id="review-prog-fill"></div></div>
      <div class="review-hud">
        <div class="review-hud-item"><span class="review-hud-label">Question</span><span class="review-hud-val"><span id="review-q-num">0</span>/<span id="review-q-total">5</span></span></div>
        <div class="review-hud-item"><span class="review-hud-label">Score</span><span class="review-hud-val">⭐ <span id="review-score">0</span></span></div>
        <div class="review-hud-item"><span class="review-hud-label">Streak</span><span class="review-hud-val">🔥 <span id="review-streak">0</span></span></div>
      </div>
      <div class="review-card" id="review-card">
        <div class="review-prompt" id="review-prompt">—</div>
        <div class="review-word" id="review-word">—</div>
        <div class="review-hint" id="review-hint">—</div>
        <div class="review-opts" id="review-opts"></div>
        <div class="review-feedback" id="review-feedback"></div>
      </div>
      <div class="review-complete" id="review-complete" style="display:none;">
        <div class="review-complete-icon">🏆</div>
        <div class="review-complete-title">Review Complete!</div>
        <div class="review-complete-score"><span id="review-final-score">0</span> / <span id="review-final-total">5</span></div>
        <button class="btn-primary" onclick="initReviewLab()">Try More <i class="fas fa-redo"></i></button>
      </div>
    </div>

  <div class="step-section" data-section="dna" id="section-dna">
      <div class="section-head-row">
        <div class="section-heading" style="margin-bottom:0;"><span class="section-badge">🧬</span> DNA Matcher — طابق الجينات</div>
        <button class="btn-secondary" onclick="initDnaMatcher()"><i class="fas fa-rotate-right"></i> Restart</button>
      </div>
      <div class="dna-intro">
        For each verb shown, pick <strong>Action</strong> (what?), <strong>Time</strong> (when?), and <strong>Doer</strong> (who?).<br>
        <span style="color:var(--text-muted);">اختار الحدث (ماذا؟) والزمن (متى؟) والفاعل (مين؟) للفعل!</span>
      </div>
      <div class="dna-stage" id="dna-stage">
        <div class="dna-word-big" id="dna-word">—</div>
        <div class="dna-choices">
          <div class="dna-choice-group">
            <div class="dna-choice-label">🎬 Action / الحدث</div>
            <div class="dna-choice-btns" id="dna-action-btns"></div>
          </div>
          <div class="dna-choice-group">
            <div class="dna-choice-label">⏱️ Time / الزمن</div>
            <div class="dna-choice-btns" id="dna-time-btns"></div>
          </div>
          <div class="dna-choice-group">
            <div class="dna-choice-label">👤 Doer / الفاعل</div>
            <div class="dna-choice-btns" id="dna-doer-btns"></div>
          </div>
        </div>
        <button class="dna-submit-btn" id="dna-submit" onclick="dnaSubmit()" disabled>Check / تحقق</button>
        <div class="dna-feedback" id="dna-feedback"></div>
      </div>
      <div class="dna-hud">
        <span>Question <span id="dna-q-num">0</span>/<span id="dna-q-total">5</span></span>
        <span>Correct: <span id="dna-score">0</span></span>
      </div>
    </div>


    <div class="step-section" data-section="final-quiz" id="section-final-quiz" style="display:none;">
      <div class="section-heading"><span class="section-badge">🏆</span> Master Quiz — الاختبار النهائي</div>
      <div class="quiz-intro">
        <div class="quiz-icon">🎓</div>
        <div class="quiz-title" id="quiz-title">Congratulations! All 20 verbs mastered.</div>
        <div class="quiz-sub">Let's prove it with the Master Quiz — 10 questions covering everything.</div>
        <button class="btn-primary quiz-start-btn" onclick="startFinalQuiz()">Begin Master Quiz <i class="fas fa-graduation-cap"></i></button>
      </div>
      <div class="quiz-playing" id="quiz-playing" style="display:none;">
        <div class="review-progress-bar"><div class="review-progress-fill" id="quiz-prog-fill"></div></div>
        <div class="review-hud">
          <div class="review-hud-item"><span class="review-hud-label">Question</span><span class="review-hud-val"><span id="quiz-q-num">0</span>/10</span></div>
          <div class="review-hud-item"><span class="review-hud-label">Score</span><span class="review-hud-val">⭐ <span id="quiz-score">0</span></span></div>
        </div>
        <div class="review-card">
          <div class="review-prompt" id="quiz-prompt">—</div>
          <div class="review-word" id="quiz-word">—</div>
          <div class="review-hint" id="quiz-hint">—</div>
          <div class="review-opts" id="quiz-opts"></div>
          <div class="review-feedback" id="quiz-feedback"></div>
        </div>
      </div>
      <div class="quiz-complete" id="quiz-complete" style="display:none;">
        <div class="quiz-cert">
          <div class="quiz-cert-border">
            <div class="quiz-cert-icon">🏅</div>
            <div class="quiz-cert-title">Certificate of Mastery</div>
            <div class="quiz-cert-sub">This certifies that</div>
            <div class="quiz-cert-name" id="cert-name">—</div>
            <div class="quiz-cert-sub">has successfully completed The Verb Lab</div>
            <div class="quiz-cert-score">Final Score: <span id="cert-score">0</span> / 10</div>
            <div class="quiz-cert-stars" id="cert-stars">⭐⭐⭐⭐⭐</div>
          </div>
          <button class="btn-primary" onclick="downloadCertificate()">📥 Download Certificate</button>
        </div>
      </div>
    </div>
<div class="step-section" data-section="summary" id="section-summary">
    <div class="section-heading">
        <span class="section-badge">🧬</span> Pronoun Lab — مختبر الضمائر
    </div>
    <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:35px; direction:ltr;">
        Study one tense at a time, then compare every pronoun inside it. — زمن واحد أولًا، ثم كل الضمائر داخله.
    </div>

    <div id="pronoun-sections-container"></div>
</div>

<div class="step-section" data-section="decoder" id="section-decoder">
    <div class="section-heading">
        <span class="section-badge" style="background:#8b5cf6;">🕵️‍♂️</span> Pronoun Decoder — مفكك الشفرات
    </div>
    <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:35px; direction:ltr;">
        Names and pointers are just secret codes for pronouns. Let's decode them! <br>
        <span style="color:var(--text-muted);">الأسماء وأسماء الإشارة هي مجرد شفرات للضمائر الأساسية.. تعال نفكها!</span>
    </div>

    <div class="decoder-grid" id="ui-decoder-grid"></div>
</div>


<div class="step-section" data-section="decoder-game" id="section-decoder-game" style="display:none;">
    <div class="section-heading">
        <span class="section-badge" style="background:#8b5cf6;">🎮</span> Decoder Game — لعبة الشفرات
    </div>
    <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:25px; direction:ltr;">
        Match the word to its hidden pronoun! — طابق الكلمة مع الضمير المناسب لها!
    </div>
    <div class="decoder-game-wrap">
        <div class="dg-hud">
            <span>Question <span id="dg-q-num">1</span>/5</span>
            <span>Score ⭐ <span id="dg-score">0</span></span>
        </div>
        <div class="dg-card">
            <div class="dg-question">أي ضمير يحل محل هذه الكلمة؟</div>
            <div class="dg-word" id="dg-word">—</div>
            <div class="dg-options" id="dg-options"></div>
            <div id="dg-feedback" class="dg-feedback"></div>
        </div>
        <div id="dg-complete" style="display:none; text-align:center;">
            <div style="font-size:4rem; margin-bottom:10px;">🏆</div>
            <div style="font-size:1.8rem; font-weight:900; color:var(--verb-d); font-family: var(--font-ui);">وحش الشفرات!</div>
            <button class="btn-primary" onclick="_initDecoderGame()" style="margin-top:20px;">العب مرة أخرى <i class="fas fa-redo"></i></button>
        </div>
    </div>
</div>

<div class="step-section" data-section="match-review" data-lesson="nouns" id="section-match-review" style="display:none;">
        <div class="section-heading" style="justify-content:center;">
            <span class="section-badge" style="background:#8b5cf6;">🧠</span> Warm-up Review — تسخين ومراجعة
        </div>
        <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:25px; direction:ltr;">
            Match the pronoun to the correct verb! — طابق الضمير بالفعل المناسب له!
        </div>

        <div class="match-game-wrap">
            <svg id="match-lines-svg"></svg>
            <div class="match-columns-container">
                <div class="match-col" id="match-col-right">
                    </div>
                <div class="match-col" id="match-col-left">
                    </div>
            </div>
        </div>
    </div>
<div class="step-section" data-section="nouns-family" data-lesson="nouns" id="section-nouns-family" style="display:none;">
        <div class="section-heading" style="margin-top: 10px;">
            <span class="section-badge" style="background:#10b981;">🛒</span> Related Words — مفردات متعلقة
        </div>
        <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:25px; direction:ltr;">
            Things and objects you use with this verb. — الأشياء والأدوات المستخدمة مع هذا الفعل.
        </div>

        <div class="vocab-grid" id="ui-vocab-grid"></div>

        <div class="sentence-builder-wrap" id="ui-vocab-quiz-wrap" style="margin-top: 40px; display:none;">
            <div class="section-heading" style="justify-content:center; margin-bottom: 15px;">
                <span class="section-badge" style="background:#047857;">🎯</span> Vocab Challenge — تحدي المفردات
            </div>
            <div style="font-family:var(--font-ui); color:var(--text-muted); font-size: 1.1rem; font-weight:900; margin-bottom:20px;">
                Question <span id="vq-q-num">1</span>/4 &nbsp;|&nbsp; Score ⭐ <span id="vq-score">0</span>
            </div>
            <div style="font-family:var(--font-ar); font-size:3rem; font-weight:900; color:var(--verb-d); margin-bottom:20px; padding:20px; background:var(--surface2); border-radius:15px;" id="vq-question">—</div>
            <div class="sb-options" id="vq-options"></div>
            <div id="vq-feedback" style="margin-top: 20px; font-family: var(--font-ui); font-size: 1.4rem; font-weight: 900; min-height: 40px;"></div>
        </div>
    </div>

    <div class="step-section" data-section="sentence-builder" data-lesson="nouns" id="section-sentence-builder" style="display:none;">
        <div class="section-heading">
            <span class="section-badge" style="background:#10b981;">🧩</span> Sentence Builder — بناء الجملة
        </div>
        <div style="font-family:var(--font-ui); font-size:1rem; color:var(--text-muted); text-align:center; margin-bottom:25px; direction:ltr;">
            Click the words in the correct order to build a useful sentence! — اضغط على الكلمات بالترتيب لتكوين جملة مفيدة!
        </div>
        <div class="sentence-builder-wrap">
            <div class="sb-target" id="sb-target"></div>
            <div class="sb-options" id="sb-options"></div>
            <div id="sb-feedback" style="margin-top: 25px; font-family: var(--font-ui); font-size: 1.4rem; font-weight: 900; min-height: 40px;"></div>
            <button id="sb-reset" class="btn-secondary" style="margin: 20px auto 0; display:none;" onclick="_initSentenceBuilder()">إعادة المحاولة <i class="fas fa-redo"></i></button>
        </div>
    </div>

    <div class="step-section" style="min-height:auto;border:none;">
      <button class="next-level-btn" onclick="goNextVerb()">Finish & Next Verb <i class="fas fa-arrow-left"></i></button>
    </div>
  </div>
</div>

<script src="/src/scripts/verb-lab.js"></script>
</body>
</html>
`;