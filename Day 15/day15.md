[vedic-astrology.html](https://github.com/user-attachments/files/28939016/vedic-astrology.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jyotish — Vedic Astrology Readings</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root {
  --ink: #1a1410;
  --ink2: #4a3f35;
  --ink3: #8a7a6e;
  --gold: #c9973a;
  --gold2: #e8c06a;
  --gold3: #f5e4bc;
  --saffron: #d4642a;
  --bg: #0e0c0a;
  --bg2: #161310;
  --bg3: #1f1a14;
  --bg4: #2a2218;
  --border: rgba(201,151,58,0.2);
  --border2: rgba(201,151,58,0.4);
  --text: #e8ddd0;
  --text2: #b8a898;
  --text3: #7a6a5a;
  --radius: 12px;
  --radius-sm: 8px;
  --success: #4a9a6a;
  --error: #c0462a;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}

/* STARFIELD */
#stars {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse at 50% 0%, #1a1208 0%, #0e0c0a 60%);
}
.star {
  position: absolute; background: #fff; border-radius: 50%;
  animation: twinkle var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
}
@keyframes twinkle { 0%,100%{opacity:var(--lo,0.2)} 50%{opacity:var(--hi,0.9)} }

/* LAYOUT */
.page { position: relative; z-index: 1; }

/* NAV */
nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2rem 2rem;
  border-bottom: 0.5px solid var(--border);
  backdrop-filter: blur(10px);
  position: sticky; top: 0; z-index: 100;
  background: rgba(14,12,10,0.85);
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 300; letter-spacing: 0.12em;
  color: var(--gold);
}
.nav-logo span { color: var(--text3); font-size: 13px; font-family: 'Inter', sans-serif; font-weight: 300; letter-spacing: 0.06em; display: block; margin-top: -2px; }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { color: var(--text2); font-size: 13px; text-decoration: none; letter-spacing: 0.05em; transition: color 0.2s; }
.nav-links a:hover { color: var(--gold); }

/* HERO */
.hero {
  text-align: center; padding: 5rem 2rem 4rem;
  position: relative;
}
.hero-symbol {
  font-size: 72px; line-height: 1;
  margin-bottom: 1.5rem;
  animation: float 6s ease-in-out infinite;
  display: block;
  filter: drop-shadow(0 0 30px rgba(201,151,58,0.4));
}
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
.hero h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 1rem;
}
.hero h1 em { font-style: italic; color: var(--gold); }
.hero p {
  font-size: 15px; color: var(--text2); line-height: 1.7;
  max-width: 500px; margin: 0 auto 2.5rem;
  font-weight: 300; letter-spacing: 0.02em;
}
.scroll-cta {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--gold); font-size: 13px; letter-spacing: 0.1em;
  text-transform: uppercase; cursor: pointer;
  border: 0.5px solid var(--border2); padding: 10px 24px;
  border-radius: 40px; background: transparent;
  transition: all 0.3s; font-family: 'Inter', sans-serif;
  text-decoration: none;
}
.scroll-cta:hover { background: rgba(201,151,58,0.1); border-color: var(--gold); }
.scroll-cta .arr { transition: transform 0.3s; }
.scroll-cta:hover .arr { transform: translateY(3px); }

/* DIVIDER */
.divider {
  display: flex; align-items: center; gap: 1rem;
  padding: 0 2rem; margin: 0.5rem 0;
}
.divider-line { flex: 1; height: 0.5px; background: var(--border); }
.divider-sym { color: var(--gold3); font-size: 18px; opacity: 0.6; }

/* FORM SECTION */
.form-section {
  max-width: 820px; margin: 0 auto; padding: 3rem 2rem 5rem;
}
.section-eyebrow {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 0.5rem; font-weight: 400;
}
.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; font-weight: 300; color: var(--text);
  margin-bottom: 2rem; line-height: 1.2;
}

.form-card {
  background: var(--bg2);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.form-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.form-row { display: grid; gap: 1rem; margin-bottom: 1rem; }
.form-row.cols-2 { grid-template-columns: 1fr 1fr; }
.form-row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }

.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label {
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text3); font-weight: 400;
}
.form-label .req { color: var(--gold); margin-left: 2px; }

input, select, textarea {
  background: var(--bg3);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  padding: 10px 14px;
  transition: border-color 0.2s, background 0.2s;
  width: 100%;
  outline: none;
  -webkit-appearance: none;
}
input::placeholder { color: var(--text3); }
input:focus, select:focus, textarea:focus {
  border-color: var(--gold);
  background: var(--bg4);
}
select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%238a7a6e' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}
select option { background: var(--bg3); }

.concerns-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px; margin-top: 2px;
}
.concern-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  border: 0.5px solid var(--border);
  border-radius: 40px;
  cursor: pointer;
  font-size: 13px; color: var(--text2);
  transition: all 0.2s;
  background: var(--bg3);
  user-select: none;
}
.concern-chip input[type="checkbox"] { display: none; }
.concern-chip.selected {
  border-color: var(--gold);
  background: rgba(201,151,58,0.1);
  color: var(--gold2);
}
.concern-chip .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--text3); flex-shrink: 0;
  transition: background 0.2s;
}
.concern-chip.selected .dot { background: var(--gold); }

.consent-row {
  display: flex; gap: 10px; align-items: flex-start;
  margin-top: 1.2rem; padding: 1rem;
  background: rgba(201,151,58,0.05);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-sm);
}
.consent-row input[type="checkbox"] {
  width: 16px; height: 16px; min-width: 16px;
  accent-color: var(--gold); cursor: pointer; margin-top: 1px;
}
.consent-text { font-size: 12px; color: var(--text3); line-height: 1.6; }

.submit-btn {
  width: 100%; margin-top: 1.5rem;
  padding: 14px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--saffron) 100%);
  color: #1a1410;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Inter', sans-serif;
  font-size: 14px; font-weight: 500;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.submit-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.submit-btn .spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(26,20,16,0.3);
  border-top-color: #1a1410;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: none;
}
.submit-btn.loading .spinner { display: block; }
.submit-btn.loading .btn-text { display: none; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ERROR */
.error-msg {
  display: none; color: var(--error); font-size: 12px;
  margin-top: 6px; padding: 8px 12px;
  background: rgba(192,70,42,0.1);
  border-radius: var(--radius-sm);
  border: 0.5px solid rgba(192,70,42,0.3);
}
.error-msg.show { display: block; }

/* RESULT SECTION */
#result-section {
  display: none; max-width: 900px; margin: 0 auto; padding: 2rem 2rem 5rem;
}
#result-section.show { display: block; }

.result-header {
  text-align: center; padding: 2rem 0 1.5rem;
  border-bottom: 0.5px solid var(--border);
  margin-bottom: 2rem;
}
.result-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; font-weight: 300; color: var(--gold);
  margin-bottom: 4px;
}
.result-header p { font-size: 13px; color: var(--text3); }

/* RESULT TABS */
.result-tabs {
  display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1.5rem;
}
.rtab {
  padding: 7px 16px;
  border: 0.5px solid var(--border);
  border-radius: 40px;
  background: transparent;
  color: var(--text3);
  font-size: 12px; font-family: 'Inter', sans-serif;
  letter-spacing: 0.05em;
  cursor: pointer; transition: all 0.2s;
}
.rtab:hover { color: var(--text); border-color: var(--border2); }
.rtab.active {
  background: rgba(201,151,58,0.12);
  border-color: var(--gold);
  color: var(--gold2);
}
.rtab-content { display: none; }
.rtab-content.active { display: block; }

/* READING OUTPUT */
.reading-output {
  background: var(--bg2);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 1.8rem 2rem;
  font-size: 14px; line-height: 1.8;
  color: var(--text2);
  position: relative;
  overflow: hidden;
  min-height: 200px;
}
.reading-output::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}
.reading-output h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem; font-weight: 400; color: var(--gold2);
  margin: 1.2rem 0 0.6rem; border-bottom: 0.5px solid var(--border);
  padding-bottom: 6px;
}
.reading-output h3:first-child { margin-top: 0; }
.reading-output h4 {
  font-size: 13px; font-weight: 500; color: var(--text);
  letter-spacing: 0.05em; margin: 1rem 0 0.4rem;
  text-transform: uppercase; font-size: 11px;
}
.reading-output p { margin-bottom: 0.8rem; }
.reading-output ul, .reading-output ol { padding-left: 1.4rem; margin-bottom: 0.8rem; }
.reading-output li { margin-bottom: 4px; }
.reading-output strong { color: var(--text); font-weight: 500; }
.reading-output em { color: var(--gold2); font-style: italic; }
.reading-output table {
  width: 100%; border-collapse: collapse; font-size: 13px;
  margin: 0.8rem 0;
}
.reading-output th {
  text-align: left; color: var(--text3); font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.08em;
  padding: 6px 10px; border-bottom: 0.5px solid var(--border);
  font-weight: 400;
}
.reading-output td {
  padding: 8px 10px; border-bottom: 0.5px solid rgba(201,151,58,0.08);
  vertical-align: top;
}
.reading-output tr:last-child td { border-bottom: none; }
.reading-output .pill {
  display: inline-block; font-size: 11px; padding: 2px 8px;
  border-radius: 20px; margin: 1px;
}
.reading-output .pill-g { background: rgba(74,154,106,0.15); color: #7adb9e; }
.reading-output .pill-r { background: rgba(192,70,42,0.15); color: #e87a5a; }
.reading-output .pill-y { background: rgba(201,151,58,0.15); color: var(--gold2); }

/* TYPING CURSOR */
.typing-cursor {
  display: inline-block; width: 2px; height: 1em;
  background: var(--gold); animation: blink 1s infinite;
  vertical-align: text-bottom; margin-left: 2px;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* LOADING STATE */
.loading-state {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 3rem;
  gap: 1rem;
}
.mandala-spinner {
  width: 60px; height: 60px;
  border: 1.5px solid var(--border);
  border-top-color: var(--gold);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}
.loading-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem; color: var(--text2);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

/* NEW READING */
.new-reading-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; margin-top: 1.5rem; padding: 11px;
  background: transparent;
  border: 0.5px solid var(--border2);
  border-radius: var(--radius-sm);
  color: var(--text2); font-family: 'Inter', sans-serif;
  font-size: 13px; cursor: pointer;
  transition: all 0.2s; letter-spacing: 0.05em;
}
.new-reading-btn:hover { border-color: var(--gold); color: var(--gold2); }

/* FEATURES STRIP */
.features {
  border-top: 0.5px solid var(--border);
  display: grid; grid-template-columns: repeat(3, 1fr);
  text-align: center;
}
.feature {
  padding: 2.5rem 1.5rem;
  border-right: 0.5px solid var(--border);
}
.feature:last-child { border-right: none; }
.feature-sym { font-size: 28px; margin-bottom: 0.8rem; display: block; }
.feature-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-weight: 400; color: var(--text);
  margin-bottom: 0.4rem;
}
.feature-desc { font-size: 13px; color: var(--text3); line-height: 1.6; }

/* FOOTER */
footer {
  border-top: 0.5px solid var(--border);
  padding: 1.5rem 2rem;
  text-align: center;
  font-size: 12px; color: var(--text3);
}
footer a { color: var(--text3); text-decoration: none; }
footer a:hover { color: var(--gold); }

/* PROGRESS BAR */
.progress-bar {
  height: 2px; background: var(--border);
  border-radius: 1px; margin-bottom: 1.5rem; overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--saffron));
  border-radius: 1px;
  transition: width 0.3s;
  width: 0%;
}

/* SECTION BADGES */
.section-badges {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1rem;
}
.s-badge {
  font-size: 11px; padding: 3px 10px;
  border-radius: 20px; border: 0.5px solid;
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.s-badge-gold { border-color: var(--gold); color: var(--gold); }
.s-badge-gold:hover { background: rgba(201,151,58,0.1); }

/* SCROLL ANIMATION */
.fade-up {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible { opacity: 1; transform: none; }

@media (max-width: 640px) {
  nav { padding: 1rem; }
  .nav-links { display: none; }
  .form-row.cols-2, .form-row.cols-3 { grid-template-columns: 1fr; }
  .features { grid-template-columns: 1fr; }
  .feature { border-right: none; border-bottom: 0.5px solid var(--border); }
  .feature:last-child { border-bottom: none; }
  .form-section, #result-section { padding: 2rem 1rem 4rem; }
  .concerns-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
</head>
<body>

<div id="stars"></div>

<div class="page">
  <nav>
    <div class="nav-logo">
      ॐ Jyotish
      <span>Vedic Astrology</span>
    </div>
    <div class="nav-links">
      <a href="#reading">Get Reading</a>
      <a href="#about">About</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <span class="hero-symbol">☽</span>
    <h1>Read the<br><em>language of stars</em></h1>
    <p>Ancient Vedic wisdom meets modern insight. Enter your birth details and receive a personalised Jyotish reading powered by Parashara & Jaimini traditions.</p>
    <a href="#reading" class="scroll-cta">
      Begin your reading <span class="arr">↓</span>
    </a>
  </section>

  <div class="divider"><div class="divider-line"></div><span class="divider-sym">✦</span><div class="divider-line"></div></div>

  <!-- FEATURES -->
  <div class="features" id="about">
    <div class="feature fade-up">
      <span class="feature-sym">🪐</span>
      <div class="feature-title">Natal Chart Analysis</div>
      <div class="feature-desc">Lagna, Moon sign, planetary placements, yogas & doshas from the Brihat Parashara tradition</div>
    </div>
    <div class="feature fade-up">
      <span class="feature-sym">⏳</span>
      <div class="feature-title">Dasha Forecasting</div>
      <div class="feature-desc">Vimshottari Dasha sequence with current Mahadasha & Antardasha analysis and 5-year outlook</div>
    </div>
    <div class="feature fade-up">
      <span class="feature-sym">💫</span>
      <div class="feature-title">Life Guidance</div>
      <div class="feature-desc">Career, wealth, relationships, health & remedies — all grounded in classical astrological reasoning</div>
    </div>
  </div>

  <div class="divider"><div class="divider-line"></div><span class="divider-sym">✦</span><div class="divider-line"></div></div>

  <!-- FORM SECTION -->
  <section class="form-section" id="reading">
    <div class="section-eyebrow">Your Reading</div>
    <div class="section-title">Tell the stars who you are</div>

    <div class="form-card">
      <div class="form-row cols-2">
        <div class="form-group">
          <label class="form-label">Full Name <span class="req">*</span></label>
          <input type="text" id="name" placeholder="e.g. Arjun Sharma" autocomplete="name">
        </div>
        <div class="form-group">
          <label class="form-label">Gender <span class="req">*</span></label>
          <select id="gender">
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </div>
      </div>

      <div class="form-row cols-3">
        <div class="form-group">
          <label class="form-label">Date of Birth <span class="req">*</span></label>
          <input type="date" id="dob">
        </div>
        <div class="form-group">
          <label class="form-label">Birth Time <span class="req">*</span></label>
          <input type="time" id="birthtime">
        </div>
        <div class="form-group">
          <label class="form-label">Time Accuracy</label>
          <select id="time-accuracy">
            <option value="Exact">Exact (birth certificate)</option>
            <option value="Approximate">Approximate (±15–30 min)</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
      </div>

      <div class="form-row cols-2">
        <div class="form-group">
          <label class="form-label">Place of Birth <span class="req">*</span></label>
          <input type="text" id="birthplace" placeholder="e.g. Lucknow, UP, India">
        </div>
        <div class="form-group">
          <label class="form-label">Current City</label>
          <input type="text" id="currentcity" placeholder="e.g. Delhi, India">
        </div>
      </div>

      <div class="form-row cols-2">
        <div class="form-group">
          <label class="form-label">Relationship Status</label>
          <select id="relationship">
            <option value="">Select status</option>
            <option>Single</option>
            <option>In a relationship</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Profession / Field</label>
          <input type="text" id="profession" placeholder="e.g. Software Engineer, Student">
        </div>
      </div>

      <div class="form-group" style="margin-bottom:1rem">
        <label class="form-label">Top Concerns (select up to 3)</label>
        <div class="concerns-grid" id="concerns-grid">
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Career & Job"><span class="dot"></span>Career & Job
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Business & Wealth"><span class="dot"></span>Business & Wealth
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Marriage & Relationships"><span class="dot"></span>Marriage & Relationships
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Health"><span class="dot"></span>Health
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Family & Children"><span class="dot"></span>Family & Children
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Foreign Travel / Settlement"><span class="dot"></span>Foreign / Travel
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Spiritual Growth"><span class="dot"></span>Spiritual Growth
          </label>
          <label class="concern-chip" onclick="toggleChip(this)">
            <input type="checkbox" value="Education"><span class="dot"></span>Education
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Any specific question? (optional)</label>
        <input type="text" id="specific-q" placeholder="e.g. When will I get a government job?">
      </div>

      <div class="consent-row">
        <input type="checkbox" id="consent">
        <div class="consent-text">
          I consent to share my personal details for this Vedic astrology reading. I understand this is for spiritual guidance only and not a substitute for professional advice in medical, legal, or financial matters. My data is used solely for generating this reading.
        </div>
      </div>

      <div class="error-msg" id="error-msg">Please fill in all required fields (Name, Date of Birth, Birth Time, Place of Birth) and give your consent.</div>

      <button class="submit-btn" id="submit-btn" onclick="generateReading()">
        <div class="spinner"></div>
        <span class="btn-text">✨ &nbsp; Cast my birth chart</span>
      </button>
    </div>
  </section>

  <!-- RESULT SECTION -->
  <section id="result-section">
    <div class="result-header">
      <h2 id="result-name">Your Vedic Reading</h2>
      <p id="result-subtitle">Analysed using Lahiri Ayanamsha · Parashara & Jaimini traditions</p>
    </div>

    <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>

    <div class="result-tabs" id="result-tabs">
      <button class="rtab active" onclick="showRTab(this,'tab-summary')">Birth Chart</button>
      <button class="rtab" onclick="showRTab(this,'tab-life')">Life Patterns</button>
      <button class="rtab" onclick="showRTab(this,'tab-career')">Career & Wealth</button>
      <button class="rtab" onclick="showRTab(this,'tab-relations')">Relationships</button>
      <button class="rtab" onclick="showRTab(this,'tab-dasha')">Dasha</button>
      <button class="rtab" onclick="showRTab(this,'tab-forecast')">5-Year Forecast</button>
      <button class="rtab" onclick="showRTab(this,'tab-remedies')">Remedies</button>
    </div>

    <div id="tab-summary" class="rtab-content active">
      <div class="reading-output" id="out-summary">
        <div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Reading the cosmic blueprint…</div></div>
      </div>
    </div>
    <div id="tab-life" class="rtab-content">
      <div class="reading-output" id="out-life"><div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Analysing life patterns…</div></div></div>
    </div>
    <div id="tab-career" class="rtab-content">
      <div class="reading-output" id="out-career"><div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Charting career & wealth…</div></div></div>
    </div>
    <div id="tab-relations" class="rtab-content">
      <div class="reading-output" id="out-relations"><div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Reading relationship patterns…</div></div></div>
    </div>
    <div id="tab-dasha" class="rtab-content">
      <div class="reading-output" id="out-dasha"><div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Calculating Dasha sequence…</div></div></div>
    </div>
    <div id="tab-forecast" class="rtab-content">
      <div class="reading-output" id="out-forecast"><div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Forecasting the next 5 years…</div></div></div>
    </div>
    <div id="tab-remedies" class="rtab-content">
      <div class="reading-output" id="out-remedies"><div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Preparing remedies…</div></div></div>
    </div>

    <button class="new-reading-btn" onclick="resetForm()">↺ &nbsp; Start a new reading</button>
  </section>

  <footer>
    <p>Jyotish · Vedic Astrology · For spiritual guidance only</p>
    <p style="margin-top:6px;font-size:11px;opacity:0.5">Readings are interpretive and probabilistic. Not a substitute for professional advice.</p>
  </footer>
</div>

<script>
/* STARS */
(function() {
  const c = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2 + 0.5;
    s.style.cssText = `
      width:${sz}px;height:${sz}px;
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      --lo:${(Math.random()*0.3+0.05).toFixed(2)};
      --hi:${(Math.random()*0.6+0.3).toFixed(2)};
      --dur:${(Math.random()*4+2).toFixed(1)}s;
      --delay:-${(Math.random()*6).toFixed(1)}s;
    `;
    c.appendChild(s);
  }
})();

/* SCROLL FADE */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* CONCERN CHIPS */
function toggleChip(el) {
  const cb = el.querySelector('input[type="checkbox"]');
  const selected = document.querySelectorAll('.concern-chip.selected');
  if (!el.classList.contains('selected') && selected.length >= 3) return;
  el.classList.toggle('selected');
  cb.checked = el.classList.contains('selected');
}

/* TAB SWITCH */
function showRTab(btn, id) {
  document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.rtab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

/* RESET */
function resetForm() {
  document.getElementById('result-section').classList.remove('show');
  document.getElementById('reading').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('submit-btn').disabled = false;
  document.getElementById('submit-btn').classList.remove('loading');
  document.getElementById('progress-fill').style.width = '0%';
}

/* PARSE MARKDOWN-LITE */
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '')
    .replace(/<p><\/p>/g, '');
}

function setOutput(id, html) {
  document.getElementById(id).innerHTML = html;
}

/* MAIN GENERATE */
async function generateReading() {
  const name = document.getElementById('name').value.trim();
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  const birthtime = document.getElementById('birthtime').value;
  const timeAccuracy = document.getElementById('time-accuracy').value;
  const birthplace = document.getElementById('birthplace').value.trim();
  const currentcity = document.getElementById('currentcity').value.trim();
  const relationship = document.getElementById('relationship').value;
  const profession = document.getElementById('profession').value.trim();
  const consent = document.getElementById('consent').checked;
  const specificQ = document.getElementById('specific-q').value.trim();

  const concerns = Array.from(document.querySelectorAll('.concern-chip.selected'))
    .map(el => el.querySelector('input').value);

  const errEl = document.getElementById('error-msg');

  if (!name || !dob || !birthtime || !birthplace || !consent) {
    errEl.classList.add('show');
    return;
  }
  errEl.classList.remove('show');

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.classList.add('loading');

  const rs = document.getElementById('result-section');
  rs.classList.add('show');
  rs.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('result-name').textContent = name + "'s Vedic Reading";
  const dobDate = new Date(dob);
  document.getElementById('result-subtitle').textContent =
    `${dobDate.toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})} · ${birthtime} · ${birthplace}`;

  // Reset all outputs to loading
  ['summary','life','career','relations','dasha','forecast','remedies'].forEach(k => {
    document.getElementById('out-'+k).innerHTML =
      '<div class="loading-state"><div class="mandala-spinner"></div><div class="loading-text">Consulting the cosmos…</div></div>';
  });

  const userInfo = `
Name: ${name}
Gender: ${gender || 'Not specified'}
Date of Birth: ${dob} (${dobDate.toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})})
Birth Time: ${birthtime} IST
Birth Time Accuracy: ${timeAccuracy}
Place of Birth: ${birthplace}
Current City: ${currentcity || 'Not specified'}
Relationship Status: ${relationship || 'Not specified'}
Profession: ${profession || 'Not specified'}
Top Concerns: ${concerns.length > 0 ? concerns.join(', ') : 'Not specified'}
Specific Question: ${specificQ || 'None'}
`;

  const sections = [
    {
      key: 'summary',
      tab: 'Birth Chart',
      prompt: `You are a classical Vedic astrologer expert in Parashara Jyotish, Jaimini, Nakshatra shastra, and Vimshottari Dasha.

Perform a BIRTH CHART SUMMARY for this person using Lahiri Ayanamsha:

${userInfo}

Provide:
## Birth Chart Summary

### Core Signatures
- Lagna (Ascendant), Moon Sign, Sun Sign (Vedic), Nakshatra & Pada, Lagna Lord placement, Atmakaraka (Jaimini)

### Planetary Placements
Create a clear overview of all 9 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) with their house, sign, and status (exalted/debilitated/own sign/neutral). Note dignity.

### Functional Benefics & Malefics
List functional benefics and malefics specifically for this Lagna, with brief reasoning.

### Major Yogas & Doshas
List 4-6 significant yogas or doshas present, with brief explanation of each.

### Key Strengths & Weaknesses
Bullet points of 5 strengths and 5 weaknesses shown by the chart.

Be specific and use astrological reasoning. Format clearly with headers. Indicate confidence levels (high/medium/low). Note if birth time is approximate and how it affects accuracy.`
    },
    {
      key: 'life',
      tab: 'Life Patterns',
      prompt: `You are a classical Vedic astrologer.

Based on this birth data, analyse LIFE PATTERNS:

${userInfo}

Provide:
## Life Pattern Analysis

### Core Personality
Describe the fundamental personality, temperament, and character from Lagna, Moon sign, and their lords.

### Childhood & Family Influences
4th house, Moon, and their lords tell us about early environment. Describe likely family background and formative experiences.

### Repeating Karmic Patterns
Rahu/Ketu axis, Saturn placements, and 12th house themes — what karmic patterns repeat?

### Relationship Tendencies
How does this person approach love, friendship, and partnerships? What attracts them? What are their blind spots in relationships?

### Career Strengths & Blind Spots
Natural talents visible in the chart vs professional blind spots or recurring career obstacles.

### Financial Habits & Patterns
2nd house, 11th house, Jupiter placement — what do they reveal about the person's relationship with money?

Be compassionate, insightful, and specific. Use astrological reasoning.`
    },
    {
      key: 'career',
      tab: 'Career & Wealth',
      prompt: `You are a classical Vedic astrologer specialising in career and artha (wealth).

Analyse CAREER & WEALTH for:

${userInfo}

Provide:
## Career & Wealth Analysis

### Career Suitability
Top 5 career fields that suit this chart, with brief astrological reasoning for each.

### Job vs Business
Is this person better suited to employment or entrepreneurship? Which periods favour each?

### Leadership & Government Potential
Analyse capacity for leadership roles and potential for government employment or authority.

### Foreign Opportunities
Is foreign travel, settlement, or income indicated? When are the best windows?

### Wealth Accumulation Potential
Dhana yogas, 2nd and 11th house analysis. Rate wealth potential (low/moderate/high) with reasoning.

### Investment & Property
Best investment approaches from the chart. When is property acquisition favourable?

### Career Timeline
Provide age-range predictions for:
- Career breakthroughs
- Wealth growth periods  
- Challenging phases
With confidence levels for each.

Be honest about both opportunities and realistic limitations.`
    },
    {
      key: 'relations',
      tab: 'Relationships',
      prompt: `You are a classical Vedic astrologer specialising in relationships and Jataka.

Analyse RELATIONSHIPS & MARRIAGE for:

${userInfo}

Provide:
## Relationships & Marriage

### Love vs Arranged Marriage
Which is more likely and why, based on the 7th house, its lord, Venus, and relevant yogas?

### Marriage Timing Windows
Give 3-4 specific age-range windows when marriage or serious commitment is astrologically supported, with confidence levels.

### Spouse Characteristics
Based on 7th house sign, its lord, and Venus — describe likely characteristics of the spouse (physical, professional, personality).

### Relationship Strengths
What this person naturally brings to relationships — their gifts as a partner.

### Relationship Risks & Remedies
Recurring relationship challenges shown in the chart, and how to navigate them.

### Compatibility Notes
What types of partners/energy complement this chart well?

Use compassionate, balanced language. Note any Mangal Dosha or other marital doshas with their actual significance (don't over-dramatise).`
    },
    {
      key: 'dasha',
      tab: 'Dasha',
      prompt: `You are a classical Vedic astrologer expert in Vimshottari Dasha.

Perform DASHA ANALYSIS for:

${userInfo}

Provide:
## Vimshottari Dasha Analysis

### Complete Dasha Sequence
Calculate the Vimshottari Dasha sequence from birth based on Moon Nakshatra. List each Mahadasha with start/end years and brief theme.

### Current Mahadasha
Name the current Mahadasha lord, its placement in the chart, and what it signifies for this person's life theme right now. Estimate percentage of Mahadasha elapsed.

### Current Antardasha
Identify the current Antardasha (sub-period), its combined effect with the Mahadasha lord, and specific opportunities and challenges right now.

### The Next Mahadasha
Preview the upcoming Mahadasha — when does it start, what will it bring based on the planet's placement?

### Saturn & Jupiter Transits
Note significant upcoming Saturn or Jupiter transit effects (gochar) relevant to the person's current concerns.

Be specific about years and give practical guidance for navigating the current period.`
    },
    {
      key: 'forecast',
      tab: '5-Year Forecast',
      prompt: `You are a classical Vedic astrologer.

Create a detailed 5-YEAR FORECAST for:

${userInfo}

Provide:
## 5-Year Forecast

For each of the next 5 years from the current date (2025 onward), provide:
- Year and approximate age
- Career & professional life
- Finances & wealth
- Relationships & family
- Health
- Overall rating (challenging/mixed/good/excellent)
- Key astrological basis (which Dasha, transit)
- Confidence level

Then provide:

### Best Year in this period
Identify the single best year and why.

### Most Challenging Year
Identify the most challenging year and how to navigate it.

### Major Turning Points
2-3 pivotal moments or decisions windows in this 5-year period.

### Immediate Priorities (next 6 months)
3 specific action-oriented suggestions based on the chart.

Format as clear year-by-year entries. Be honest — not everything is rosy, but always include how to navigate difficulties.`
    },
    {
      key: 'remedies',
      tab: 'Remedies',
      prompt: `You are a classical Vedic astrologer.

Provide REMEDIES for:

${userInfo}

Only recommend remedies that are genuinely astrologically justified by specific planetary weaknesses or doshas in the chart.

Provide:
## Remedies

### Mantras
Specific Beej mantras or Vedic mantras for weakened or malefic planets, with the count (108x), day, and best time. Explain why each mantra is recommended astrologically.

### Donations (Dana)
Specific items to donate for specific planets on specific days. Be practical and culturally appropriate.

### Spiritual Practices
Daily or weekly practices that address this chart's specific needs (not generic advice).

### Gemstones
Only recommend gemstones that are strongly supported by the chart. For each recommended stone: which finger, which metal, which day to wear, and the weight range. For stones that are NOT recommended (despite being commonly suggested), clearly state why they should be avoided for this chart.

### Practical (Non-Ritual) Remedies
Behavioural and psychological remedies — how to live in alignment with the chart's strengths and mitigate weaknesses through actions rather than rituals.

### Priority Ranking
Rank all remedies from most to least impactful for this specific chart.

Be grounded and honest — don't recommend anything without astrological justification.`
    }
  ];

  // Fetch all sections in parallel
  const progress = document.getElementById('progress-fill');
  let completed = 0;

  const fetchSection = async (section) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: section.prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || '').join('') || 'Unable to generate this section. Please try again.';

      // Convert markdown to HTML
      let html = text
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h3>$1</h3>')
        .replace(/^# (.+)$/gm, '<h3>$1</h3>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>(\n|$))+/g, m => '<ul>' + m + '</ul>')
        .split('\n\n')
        .map(para => {
          if (para.match(/^<[hul]/)) return para;
          if (para.trim() === '') return '';
          return '<p>' + para.replace(/\n/g, ' ') + '</p>';
        })
        .join('\n');

      setOutput('out-' + section.key, html || '<p>Reading generated. No content returned.</p>');
    } catch (err) {
      setOutput('out-' + section.key, `<p style="color:var(--text3)">Could not generate this section. Error: ${err.message}</p>`);
    }
    completed++;
    progress.style.width = Math.round((completed / sections.length) * 100) + '%';
    if (completed === sections.length) {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  };

  // Fetch sequentially to avoid rate limits but show results as they come
  for (const section of sections) {
    fetchSection(section);
    await new Promise(r => setTimeout(r, 400));
  }
}
</script>
</body>
</html>
