<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NutriScope</title>
<script src="[cdn.jsdelivr.net](https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js)"></script>
<style>
  :root {
    --bg: #0f1117;
    --surface: #1a1d2e;
    --surface2: #242840;
    --surface3: #2e3250;
    --accent: #6c63ff;
    --accent2: #ff6584;
    --accent3: #43e97b;
    --accent4: #f7971e;
    --text: #e8eaf6;
    --text-muted: #8892b0;
    --border: #2e3250;
    --danger: #ff5370;
    --warning: #ffcb6b;
    --success: #43e97b;
    --radius: 12px;
    --radius-sm: 8px;
    --shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  *, ::before, ::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
  }
  a { color: var(--accent); text-decoration: none; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 3px; }
  .app-shell { display: flex; min-height: 100vh; }
  .sidebar {
    width: 240px; min-width: 240px;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; bottom: 0;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  .main-content {
    margin-left: 240px;
    flex: 1; padding: 28px 24px;
    min-height: 100vh;
    transition: margin-left 0.3s ease;
  }
  .logo {
    display: flex; align-items: center; gap: 10px;
    padding: 22px 20px 16px;
    font-size: 1.25rem; font-weight: 700;
    border-bottom: 1px solid var(--border);
  }
  .logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
  }
  .nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 20px; cursor: pointer;
    border-radius: var(--radius-sm); margin: 2px 8px;
    color: var(--text-muted); font-size: 0.9rem; font-weight: 500;
    transition: all 0.2s;
    border: none; background: none; width: calc(100% - 16px); text-align: left;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active { background: rgba(108,99,255,0.15); color: var(--accent); }
  .nav-item .icon { font-size: 1.1rem; width: 20px; text-align: center; }
  .sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--border); font-size: 0.75rem; color: var(--text-muted); }
  .topbar {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
  }
  .menu-toggle {
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); border-radius: var(--radius-sm); padding: 8px 10px;
    cursor: pointer; font-size: 1rem; display: none;
  }
  .page-title { font-size: 1.5rem; font-weight: 700; flex: 1; }
  .topbar-actions { display: flex; gap: 8px; }
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px;
    box-shadow: var(--shadow);
  }
  .card-title { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 12px; }
  .card-value { font-size: 2rem; font-weight: 700; line-height: 1.2; }
  .card-sub { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }
  .grid { display: grid; gap: 16px; }
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
  .form-group { margin-bottom: 14px; }
  label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.05em; }
  input, select, textarea {
    width: 100%; padding: 9px 12px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text);
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: var(--accent); }
  select option { background: var(--surface2); }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px; border-radius: var(--radius-sm);
    font-size: 0.88rem; font-weight: 600; cursor: pointer;
    border: none; transition: all 0.2s; white-space: nowrap;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: #5a52e8; transform: translateY(-1px); }
  .btn-secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .btn-secondary:hover { background: var(--surface3); }
  .btn-danger { background: rgba(255,83,112,0.15); color: var(--danger); border: 1px solid rgba(255,83,112,0.3); }
  .btn-danger:hover { background: rgba(255,83,112,0.25); }
  .btn-success { background: rgba(67,233,123,0.15); color: var(--success); border: 1px solid rgba(67,233,123,0.3); }
  .btn-success:hover { background: rgba(67,233,123,0.25); }
  .btn-sm { padding: 5px 10px; font-size: 0.8rem; }
  .btn-icon { padding: 7px 9px; }
  .progress-wrap { margin-bottom: 10px; }
  .progress-label { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px; }
  .progress-bar { height: 8px; background: var(--surface2); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
  .progress-fill.ok { background: linear-gradient(90deg, var(--accent3), #38f9d7); }
  .progress-fill.warn { background: linear-gradient(90deg, var(--warning), #f7971e); }
  .progress-fill.danger { background: linear-gradient(90deg, var(--danger), #f093fb); }
  .progress-fill.low { background: linear-gradient(90deg, var(--accent), var(--accent2)); }
  .progress-fill.over { background: linear-gradient(90deg, #f7971e, var(--danger)); }
  .table-wrap { overflow-x: auto; border-radius: var(--radius-sm); }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  thead th { background: var(--surface2); padding: 10px 12px; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; }
  tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
  tbody tr:hover { background: var(--surface2); }
  tbody td { padding: 9px 12px; }
  tbody tr:last-child { border-bottom: none; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; }
  .badge-green { background: rgba(67,233,123,0.15); color: var(--success); }
  .badge-red { background: rgba(255,83,112,0.15); color: var(--danger); }
  .badge-yellow { background: rgba(255,203,107,0.15); color: var(--warning); }
  .badge-blue { background: rgba(108,99,255,0.15); color: var(--accent); }
  .tabs { display: flex; gap: 4px; background: var(--surface2); border-radius: var(--radius-sm); padding: 4px; margin-bottom: 20px; flex-wrap: wrap; }
  .tab {
    flex: 1; min-width: 80px; padding: 7px 12px; text-align: center;
    border-radius: 6px; cursor: pointer; font-size: 0.83rem; font-weight: 600;
    color: var(--text-muted); border: none; background: none; transition: all 0.2s;
  }
  .tab.active { background: var(--surface3); color: var(--text); }
  .page { display: none; animation: fadeIn 0.25s ease; }
  .page.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 1.05rem; font-weight: 700; }
  .chart-wrap { position: relative; height: 220px; }
  .chart-wrap-lg { position: relative; height: 300px; }
  .nut-ok { color: var(--success); }
  .nut-low { color: var(--warning); }
  .nut-high { color: var(--danger); }
  .rec-card {
    background: var(--surface2); border-radius: var(--radius-sm);
    padding: 14px; margin-bottom: 10px;
    border-left: 3px solid var(--accent);
  }
  .rec-card.swap { border-left-color: var(--accent4); }
  .rec-card.portion { border-left-color: var(--accent3); }
  .rec-card.risk { border-left-color: var(--danger); }
  .rec-title { font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; }
  .rec-body { font-size: 0.82rem; color: var(--text-muted); }
  .upload-zone {
    border: 2px dashed var(--border); border-radius: var(--radius);
    padding: 30px; text-align: center; cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }
  .upload-zone:hover, .upload-zone.dragover { border-color: var(--accent); background: rgba(108,99,255,0.05); }
  .upload-icon { font-size: 2.5rem; margin-bottom: 8px; }
  .upload-text { color: var(--text-muted); font-size: 0.85rem; }
  .meal-slot {
    background: var(--surface2); border-radius: var(--radius-sm);
    padding: 12px; margin-bottom: 8px;
  }
  .meal-slot-title { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 8px; }
  .meal-food-item { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; font-size: 0.83rem; border-bottom: 1px solid var(--border); }
  .meal-food-item:last-child { border-bottom: none; }
  .toast {
    position: fixed; bottom: 20px; right: 20px;
    background: var(--surface3); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 12px 18px;
    font-size: 0.85rem; z-index: 9999; transform: translateY(100px);
    opacity: 0; transition: all 0.3s ease; max-width: 300px;
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.success { border-left: 3px solid var(--success); }
  .toast.error { border-left: 3px solid var(--danger); }
  .disclaimer {
    background: rgba(255,203,107,0.08); border: 1px solid rgba(255,203,107,0.25);
    border-radius: var(--radius-sm); padding: 12px 16px;
    font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px;
  }
  .disclaimer strong { color: var(--warning); }
  .risk-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
  .risk-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
  .risk-dot.high { background: var(--danger); }
  .risk-dot.medium { background: var(--warning); }
  .risk-dot.low { background: var(--success); }
  .sidebar-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.5); z-index: 99;
  }
  @media (max-width: 900px) {
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 700px) {
    .sidebar { transform: translateX(-240px); }
    .sidebar.open { transform: translateX(0); }
    .sidebar-overlay { display: block; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
    .sidebar-overlay.visible { opacity: 1; pointer-events: all; }
    .main-content { margin-left: 0; padding: 16px 12px; }
    .menu-toggle { display: flex; align-items: center; }
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  }
  .tbl-input {
    width: 80px; padding: 4px 6px;
    background: var(--surface3); border: 1px solid transparent;
    border-radius: 4px; color: var(--text); font-size: 0.82rem;
  }
  .tbl-input:focus { border-color: var(--accent); outline: none; }
  .delta { font-size: 0.75rem; }
  .delta.pos { color: var(--success); }
  .delta.neg { color: var(--danger); }
  .delta.neutral { color: var(--text-muted); }
  .source-item { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 6px; font-size: 0.8rem; color: var(--text-muted); }
  .source-num { background: var(--surface3); border-radius: 4px; padding: 1px 6px; font-size: 0.72rem; font-weight: 700; flex-shrink: 0; }
  .day-picker { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .day-btn {
    padding: 6px 14px; border-radius: 20px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
    border: 1px solid var(--border); background: var(--surface2); color: var(--text-muted); transition: all 0.2s;
  }
  .day-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
  .divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }
  .icon-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
  .planner-drop {
    min-height: 44px; border: 1px dashed var(--border); border-radius: var(--radius-sm);
    margin-top: 6px; padding: 6px; font-size: 0.78rem; color: var(--text-muted);
  }
  .planner-drop.empty { display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>

<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>

<div class="app-shell">
  <nav class="sidebar" id="sidebar">
    <div class="logo">
      <div class="logo-icon">🥦</div>
      <span>NutriScope</span>
    </div>
    <div class="nav">
      <button class="nav-item active" onclick="showPage('dashboard')" data-page="dashboard"><span class="icon">📊</span> Dashboard</button>
      <button class="nav-item" onclick="showPage('profile')" data-page="profile"><span class="icon">👤</span> Profile</button>
      <button class="nav-item" onclick="showPage('log')" data-page="log"><span class="icon">📝</span> Food Log</button>
      <button class="nav-item" onclick="showPage('planner')" data-page="planner"><span class="icon">📅</span> Meal Planner</button>
      <button class="nav-item" onclick="showPage('nutrients')" data-page="nutrients"><span class="icon">🔬</span> Nutrients</button>
      <button class="nav-item" onclick="showPage('recommendations')" data-page="recommendations"><span class="icon">💡</span> Recommendations</button>
      <button class="nav-item" onclick="showPage('database')" data-page="database"><span class="icon">🗄️</span> Food Database</button>
      <button class="nav-item" onclick="showPage('sources')" data-page="sources"><span class="icon">📚</span> Sources</button>
    </div>
    <div class="sidebar-footer">NutriScope v2.0 · Educational use only</div>
  </nav>

  <main class="main-content" id="mainContent">
    <div class="topbar">
      <button class="menu-toggle" id="menuToggle" onclick="toggleSidebar()">☰</button>
      <div class="page-title" id="pageTitle">Dashboard</div>
      <div class="topbar-actions">
        <button class="btn btn-secondary btn-sm" onclick="showPage('log')">+ Log Food</button>
      </div>
    </div>

    <div class="disclaimer">
      <strong>⚠️ Educational Disclaimer:</strong> NutriScope is for informational purposes only and does not constitute medical or dietary advice. Targets are estimated from general guidelines (DRI/RDA). Consult a registered dietitian or healthcare provider for personalised nutrition plans.
    </div>

    <!-- DASHBOARD -->
    <div class="page active" id="page-dashboard">
      <div class="grid grid-4" style="margin-bottom:20px;">
        <div class="card">
          <div class="card-title">Calories Today</div>
          <div class="card-value" id="stat-kcal">0</div>
          <div class="card-sub" id="stat-kcal-target">Target: — kcal</div>
        </div>
        <div class="card">
          <div class="card-title">Protein</div>
          <div class="card-value" id="stat-protein">0g</div>
          <div class="card-sub" id="stat-protein-target">Target: — g</div>
        </div>
        <div class="card">
          <div class="card-title">Carbs</div>
          <div class="card-value" id="stat-carbs">0g</div>
          <div class="card-sub" id="stat-carbs-target">Target: — g</div>
        </div>
        <div class="card">
          <div class="card-title">Fat</div>
          <div class="card-value" id="stat-fat">0g</div>
          <div class="card-sub" id="stat-fat-target">Target: — g</div>
        </div>
      </div>

      <div class="grid grid-2" style="margin-bottom:20px;">
        <div class="card">
          <div class="card-title">Energy Progress</div>
          <div id="energyProgressWrap">
            <div class="progress-wrap">
              <div class="progress-label"><span>Calories</span><span id="prog-kcal-lbl">0 / 0 kcal</span></div>
              <div class="progress-bar"><div class="progress-fill ok" id="prog-kcal" style="width:0%"></div></div>
            </div>
            <div class="progress-wrap">
              <div class="progress-label"><span>Protein</span><span id="prog-protein-lbl">0 / 0 g</span></div>
              <div class="progress-bar"><div class="progress-fill ok" id="prog-protein" style="width:0%"></div></div>
            </div>
            <div class="progress-wrap">
              <div class="progress-label"><span>Carbohydrates</span><span id="prog-carbs-lbl">0 / 0 g</span></div>
              <div class="progress-bar"><div class="progress-fill ok" id="prog-carbs" style="width:0%"></div></div>
            </div>
            <div class="progress-wrap">
              <div class="progress-label"><span>Fat</span><span id="prog-fat-lbl">0 / 0 g</span></div>
              <div class="progress-bar"><div class="progress-fill ok" id="prog-fat" style="width:0%"></div></div>
            </div>
            <div class="progress-wrap">
              <div class="progress-label"><span>Fiber</span><span id="prog-fiber-lbl">0 / 0 g</span></div>
              <div class="progress-bar"><div class="progress-fill low" id="prog-fiber" style="width:0%"></div></div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-title">Macro Distribution</div>
          <div class="chart-wrap">
            <canvas id="macroChart"></canvas>
          </div>
        </div>
      </div>

      <div class="grid grid-2" style="margin-bottom:20px;">
        <div class="card">
          <div class="card-title">⬇️ Top Deficiencies</div>
          <div id="deficiencyList"><span style="color:var(--text-muted);font-size:0.85rem;">Log food to see data.</span></div>
        </div>
        <div class="card">
          <div class="card-title">⬆️ Top Excesses</div>
          <div id="excessList"><span style="color:var(--text-muted);font-size:0.85rem;">Log food to see data.</span></div>
        </div>
      </div>

      <div class="card" style="margin-bottom:20px;">
        <div class="card-title">Key Micronutrients (% of Target)</div>
        <div class="chart-wrap-lg">
          <canvas id="microChart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="section-header">
          <div class="section-title">Today's Nutrient Summary</div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Nutrient</th><th>Consumed</th><th>Target</th><th>% Met</th><th>Status</th>
            </tr></thead>
            <tbody id="dashNutrientBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- PROFILE -->
    <div class="page" id="page-profile">
      <div class="grid grid-2">
        <div class="card">
          <div class="section-title" style="margin-bottom:16px;">Personal Details</div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" id="prof-name" placeholder="Your name" value="Alex">
          </div>
          <div class="form-group">
            <label>Age</label>
            <input type="number" id="prof-age" placeholder="Years" value="30" min="10" max="100">
          </div>
          <div class="form-group">
            <label>Sex</label>
            <select id="prof-sex">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Height (cm)</label>
            <input type="number" id="prof-height" placeholder="cm" value="175" min="100" max="250">
          </div>
          <div class="form-group">
            <label>Weight (kg)</label>
            <input type="number" id="prof-weight" placeholder="kg" value="70" min="30" max="300" step="0.1">
          </div>
        </div>
        <div class="card">
          <div class="section-title" style="margin-bottom:16px;">Goals & Activity</div>
          <div class="form-group">
            <label>Activity Level</label>
            <select id="prof-activity">
              <option value="1.2">Sedentary (little/no exercise)</option>
              <option value="1.375">Lightly active (1–3 days/wk)</option>
              <option value="1.55" selected>Moderately active (3–5 days/wk)</option>
              <option value="1.725">Very active (6–7 days/wk)</option>
              <option value="1.9">Extra active (physical job)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Goal</label>
            <select id="prof-goal">
              <option value="lose">Lose weight (−15%)</option>
              <option value="maintain" selected>Maintain weight</option>
              <option value="gain">Gain muscle (+10%)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Dietary Preference</label>
            <select id="prof-diet">
              <option value="none">No restriction</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Ketogenic</option>
              <option value="lowcarb">Low Carb</option>
            </select>
          </div>
          <div class="form-group">
            <label>Allergies / Notes</label>
            <input type="text" id="prof-allergies" placeholder="e.g. nuts, lactose">
          </div>
          <button class="btn btn-primary" style="width:100%;margin-top:8px;" onclick="saveProfile()">💾 Save & Recalculate</button>
        </div>
      </div>
      <div class="card" style="margin-top:16px;">
        <div class="section-title" style="margin-bottom:16px;">Calculated Targets</div>
        <div class="grid grid-4" id="targetDisplay">
          <div><div class="card-title">BMR</div><div class="card-value" id="disp-bmr">—</div><div class="card-sub">kcal/day</div></div>
          <div><div class="card-title">TDEE</div><div class="card-value" id="disp-tdee">—</div><div class="card-sub">kcal/day</div></div>
          <div><div class="card-title">Calorie Target</div><div class="card-value" id="disp-kcal">—</div><div class="card-sub">kcal/day</div></div>
          <div><div class="card-title">BMI</div><div class="card-value" id="disp-bmi">—</div><div class="card-sub" id="disp-bmi-cat">—</div></div>
        </div>
        <hr class="divider">
        <div class="grid grid-3">
          <div><div class="card-title">Protein Target</div><div id="disp-protein" style="font-size:1.2rem;font-weight:700;">—</div></div>
          <div><div class="card-title">Carb Target</div><div id="disp-carbs" style="font-size:1.2rem;font-weight:700;">—</div></div>
          <div><div class="card-title">Fat Target</div><div id="disp-fat" style="font-size:1.2rem;font-weight:700;">—</div></div>
        </div>
      </div>
    </div>

    <!-- FOOD LOG -->
    <div class="page" id="page-log">
      <div class="grid grid-2" style="margin-bottom:16px;">
        <div class="card">
          <div class="section-title" style="margin-bottom:14px;">Add Food Entry</div>
          <div class="form-group">
            <label>Food Item</label>
            <select id="log-food-select" style="width:100%;"></select>
          </div>
          <div class="form-group">
            <label>Serving Size (g)</label>
            <input type="number" id="log-serving" placeholder="e.g. 100" min="1" max="2000" value="100">
          </div>
          <div class="form-group">
            <label>Meal</label>
            <select id="log-meal">
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <button class="btn btn-primary" style="width:100%;" onclick="addLogEntry()">➕ Add to Log</button>
        </div>
        <div class="card">
          <div class="section-title" style="margin-bottom:14px;">CSV Import</div>
          <div class="upload-zone" id="uploadZone" onclick="document.getElementById('csvFile').click()">
            <div class="upload-icon">📂</div>
            <div class="upload-text">Click or drag &amp; drop a CSV file</div>
            <div class="upload-text" style="margin-top:4px;">Format: foodname, servingg, meal</div>
          </div>
          <input type="file" id="csvFile" accept=".csv" style="display:none;" onchange="handleCSV(event)">
          <div class="card-sub" style="margin-top:8px;">Example row: <code style="background:var(--surface3);padding:2px 5px;border-radius:3px;">Chicken Breast,150,lunch</code></div>
          <button class="btn btn-danger btn-sm" style="margin-top:10px;" onclick="clearLog()">🗑️ Clear Log</button>
        </div>
      </div>
      <div class="card">
        <div class="section-header">
          <div class="section-title">Today's Log</div>
          <div style="font-size:0.8rem;color:var(--text-muted);">Edit serving size inline</div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Food</th><th>Meal</th><th>Serving (g)</th>
              <th>Kcal</th><th>Protein</th><th>Carbs</th><th>Fat</th><th>Fiber</th>
              <th></th>
            </tr></thead>
            <tbody id="logTableBody"></tbody>
          </table>
        </div>
        <div id="logEmpty" style="text-align:center;padding:30px;color:var(--text-muted);font-size:0.85rem;">
          No food logged yet. Add items above or import a CSV.
        </div>
      </div>
    </div>

    <!-- MEAL PLANNER -->
    <div class="page" id="page-planner">
      <div class="day-picker">
        <button class="day-btn active" onclick="selectPlanDay(1,this)">Day 1</button>
        <button class="day-btn" onclick="selectPlanDay(2,this)">Day 2</button>
      </div>
      <div class="grid grid-2">
        <div>
          <div class="card" style="margin-bottom:16px;">
            <div class="section-title" style="margin-bottom:14px;">Add to Meal Plan</div>
            <div class="form-group">
              <label>Food Item</label>
              <select id="plan-food" style="width:100%;"></select>
            </div>
            <div class="form-group">
              <label>Serving (g)</label>
              <input type="number" id="plan-serving" value="100" min="1" max="2000">
            </div>
            <div class="form-group">
              <label>Meal Slot</label>
              <select id="plan-meal">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <button class="btn btn-primary" style="width:100%;" onclick="addPlannerItem()">Add to Plan</button>
          </div>
          <div class="card">
            <div class="card-title">Day Plan Nutrition</div>
            <div id="planSummary" style="color:var(--text-muted);font-size:0.85rem;">No items yet.</div>
          </div>
        </div>
        <div class="card">
          <div class="section-title" style="margin-bottom:14px;" id="planDayTitle">Day 1 Plan</div>
          <div id="plannerSlots">
            <div class="meal-slot"><div class="meal-slot-title">🌅 Breakfast</div><div class="planner-drop empty" id="plan-breakfast-items">Empty</div></div>
            <div class="meal-slot"><div class="meal-slot-title">☀️ Lunch</div><div class="planner-drop empty" id="plan-lunch-items">Empty</div></div>
            <div class="meal-slot"><div class="meal-slot-title">🌙 Dinner</div><div class="planner-drop empty" id="plan-dinner-items">Empty</div></div>
            <div class="meal-slot"><div class="meal-slot-title">🍎 Snack</div><div class="planner-drop empty" id="plan-snack-items">Empty</div></div>
          </div>
          <button class="btn btn-danger btn-sm" style="margin-top:10px;" onclick="clearPlanDay()">🗑️ Clear Day</button>
        </div>
      </div>
    </div>

    <!-- NUTRIENTS -->
    <div class="page" id="page-nutrients">
      <div class="card" style="margin-bottom:16px;">
        <div class="card-title">Detailed Nutrient Breakdown</div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Nutrient</th><th>Category</th><th>Consumed</th><th>Target</th><th>Unit</th><th>% Met</th><th>Status</th>
            </tr></thead>
            <tbody id="fullNutrientBody"></tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Macro Breakdown by Meal</div>
        <div class="chart-wrap-lg"><canvas id="trendChart"></canvas></div>
      </div>
    </div>

    <!-- RECOMMENDATIONS -->
    <div class="page" id="page-recommendations">
      <div class="card" style="margin-bottom:16px;">
        <div class="section-title" style="margin-bottom:4px;">Smart Recommendations</div>
        <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:16px;">Based on your profile and today's log</div>
        <div class="tabs">
          <button class="tab active" onclick="showRecTab('additions',this)">Additions</button>
          <button class="tab" onclick="showRecTab('swaps',this)">Swaps</button>
          <button class="tab" onclick="showRecTab('portions',this)">Portions</button>
          <button class="tab" onclick="showRecTab('risk',this)">Risk Analysis</button>
        </div>
        <div id="rec-additions" class="rec-tab-content"></div>
        <div id="rec-swaps" class="rec-tab-content" style="display:none;"></div>
        <div id="rec-portions" class="rec-tab-content" style="display:none;"></div>
        <div id="rec-risk" class="rec-tab-content" style="display:none;"></div>
      </div>
    </div>

    <!-- DATABASE -->
    <div class="page" id="page-database">
      <div class="card" style="margin-bottom:16px;">
        <div class="section-header">
          <div class="section-title">Food Database (60 Items)</div>
          <input type="text" id="dbSearch" placeholder="Search foods…" style="width:220px;" oninput="renderDatabase()">
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Food</th><th>Category</th><th>Kcal/100g</th><th>Protein</th><th>Carbs</th><th>Fat</th><th>Fiber</th>
            </tr></thead>
            <tbody id="dbTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- SOURCES -->
    <div class="page" id="page-sources">
      <div class="card">
        <div class="section-title" style="margin-bottom:16px;">📚 Nutrition Sources &amp; References</div>
        <div id="sourcesList"></div>
      </div>
    </div>
  </main>
</div>

<div class="toast" id="toast"></div>

<script>
// ─── FOOD DATABASE (60 items) ────────────────────────────────────────────────
const FOODS = [
  {name:"Chicken Breast",cat:"Protein",kcal:165,protein:31,carbs:0,fat:3.6,fiber:0,sugar:0,sodium:74,vitC:0,vitD:0.1,vitB12:0.3,iron:1,calcium:11,magnesium:29,potassium:256,zinc:1,omega3:0.06,folate:4,vitA:9,vitE:0.3,selenium:27},
  {name:"Salmon",cat:"Protein",kcal:208,protein:20,carbs:0,fat:13,fiber:0,sugar:0,sodium:59,vitC:3.9,vitD:11,vitB12:3.2,iron:0.8,calcium:12,magnesium:29,potassium:363,zinc:0.6,omega3:2.2,folate:25,vitA:50,vitE:3.5,selenium:36},
  {name:"Eggs (whole)",cat:"Protein",kcal:155,protein:13,carbs:1.1,fat:11,fiber:0,sugar:1.1,sodium:124,vitC:0,vitD:2,vitB12:0.89,iron:1.8,calcium:56,magnesium:12,potassium:138,zinc:1.3,omega3:0.05,folate:47,vitA:140,vitE:1.1,selenium:31},
  {name:"Tuna (canned)",cat:"Protein",kcal:116,protein:26,carbs:0,fat:1,fiber:0,sugar:0,sodium:336,vitC:0,vitD:1.7,vitB12:2.5,iron:1.3,calcium:11,magnesium:31,potassium:207,zinc:0.9,omega3:0.3,folate:3,vitA:20,vitE:0.5,selenium:90},
  {name:"Beef (lean)",cat:"Protein",kcal:215,protein:26,carbs:0,fat:12,fiber:0,sugar:0,sodium:65,vitC:0,vitD:0.1,vitB12:2.5,iron:2.6,calcium:18,magnesium:20,potassium:318,zinc:5.4,omega3:0.05,folate:8,vitA:0,vitE:0.2,selenium:18},
  {name:"Tofu (firm)",cat:"Protein",kcal:76,protein:8,carbs:1.9,fat:4.8,fiber:0.3,sugar:0.7,sodium:7,vitC:0,vitD:0,vitB12:0,iron:1.6,calcium:350,magnesium:30,potassium:121,zinc:0.8,omega3:0.3,folate:19,vitA:0,vitE:0.2,selenium:8},
  {name:"Greek Yogurt",cat:"Dairy",kcal:59,protein:10,carbs:3.6,fat:0.4,fiber:0,sugar:3.2,sodium:36,vitC:0,vitD:0.1,vitB12:0.75,iron:0.1,calcium:111,magnesium:11,potassium:141,zinc:0.5,omega3:0,folate:5,vitA:60,vitE:0.1,selenium:9},
  {name:"Cottage Cheese",cat:"Dairy",kcal:98,protein:11,carbs:3.4,fat:4.3,fiber:0,sugar:2.7,sodium:364,vitC:0,vitD:0.1,vitB12:0.43,iron:0.1,calcium:83,magnesium:8,potassium:104,zinc:0.4,omega3:0.07,folate:12,vitA:140,vitE:0.1,selenium:9},
  {name:"Turkey Breast",cat:"Protein",kcal:135,protein:30,carbs:0,fat:1,fiber:0,sugar:0,sodium:44,vitC:0,vitD:0.1,vitB12:0.4,iron:1.4,calcium:12,magnesium:28,potassium:293,zinc:2.2,omega3:0.04,folate:7,vitA:0,vitE:0.2,selenium:30},
  {name:"Sardines",cat:"Protein",kcal:208,protein:25,carbs:0,fat:11,fiber:0,sugar:0,sodium:505,vitC:0,vitD:4.8,vitB12:8.9,iron:2.9,calcium:382,magnesium:39,potassium:397,zinc:1.3,omega3:1.5,folate:10,vitA:55,vitE:1.9,selenium:52},
  {name:"Brown Rice (cooked)",cat:"Grains",kcal:112,protein:2.6,carbs:23,fat:0.9,fiber:1.8,sugar:0,sodium:5,vitC:0,vitD:0,vitB12:0,iron:0.5,calcium:10,magnesium:44,potassium:79,zinc:0.6,omega3:0.01,folate:4,vitA:0,vitE:0.1,selenium:10},
  {name:"Oats (rolled)",cat:"Grains",kcal:389,protein:17,carbs:66,fat:7,fiber:10,sugar:1,sodium:2,vitC:0,vitD:0,vitB12:0,iron:4.7,calcium:54,magnesium:177,potassium:429,zinc:4,omega3:0.11,folate:56,vitA:0,vitE:0.4,selenium:28},
  {name:"Whole Wheat Bread",cat:"Grains",kcal:247,protein:13,carbs:41,fat:3.4,fiber:7,sugar:6,sodium:400,vitC:0,vitD:0,vitB12:0,iron:3.6,calcium:161,magnesium:77,potassium:248,zinc:2.1,omega3:0.1,folate:65,vitA:0,vitE:0.3,selenium:26},
  {name:"Quinoa (cooked)",cat:"Grains",kcal:120,protein:4.4,carbs:21,fat:1.9,fiber:2.8,sugar:0.9,sodium:7,vitC:0,vitD:0,vitB12:0,iron:1.5,calcium:17,magnesium:64,potassium:172,zinc:1.1,omega3:0.09,folate:42,vitA:5,vitE:0.6,selenium:5},
  {name:"Sweet Potato (cooked)",cat:"Vegetables",kcal:86,protein:1.6,carbs:20,fat:0.1,fiber:3,sugar:4.2,sodium:36,vitC:19,vitD:0,vitB12:0,iron:0.7,calcium:38,magnesium:27,potassium:475,zinc:0.3,omega3:0.01,folate:6,vitA:961,vitE:0.3,selenium:0.6},
  {name:"White Rice (cooked)",cat:"Grains",kcal:130,protein:2.7,carbs:28,fat:0.3,fiber:0.4,sugar:0,sodium:1,vitC:0,vitD:0,vitB12:0,iron:0.2,calcium:10,magnesium:12,potassium:35,zinc:0.5,omega3:0.01,folate:2,vitA:0,vitE:0,selenium:7},
  {name:"Pasta (cooked)",cat:"Grains",kcal:131,protein:5,carbs:25,fat:1.1,fiber:1.8,sugar:0.6,sodium:1,vitC:0,vitD:0,vitB12:0,iron:1.3,calcium:7,magnesium:18,potassium:44,zinc:0.5,omega3:0.01,folate:8,vitA:0,vitE:0.1,selenium:26},
  {name:"Lentils (cooked)",cat:"Legumes",kcal:116,protein:9,carbs:20,fat:0.4,fiber:8,sugar:1.8,sodium:2,vitC:1.5,vitD:0,vitB12:0,iron:3.3,calcium:19,magnesium:36,potassium:369,zinc:1.3,omega3:0.07,folate:181,vitA:8,vitE:0.1,selenium:2.8},
  {name:"Chickpeas (cooked)",cat:"Legumes",kcal:164,protein:8.9,carbs:27,fat:2.6,fiber:7.6,sugar:4.8,sodium:7,vitC:1.3,vitD:0,vitB12:0,iron:2.9,calcium:49,magnesium:48,potassium:291,zinc:1.5,omega3:0.04,folate:172,vitA:3,vitE:0.4,selenium:3.7},
  {name:"Black Beans (cooked)",cat:"Legumes",kcal:132,protein:8.9,carbs:24,fat:0.5,fiber:8.7,sugar:0.3,sodium:1,vitC:0,vitD:0,vitB12:0,iron:2.1,calcium:27,magnesium:70,potassium:355,zinc:1,omega3:0.19,folate:149,vitA:2,vitE:0.1,selenium:2.1},
  {name:"Broccoli (raw)",cat:"Vegetables",kcal:34,protein:2.8,carbs:7,fat:0.4,fiber:2.6,sugar:1.7,sodium:33,vitC:89,vitD:0,vitB12:0,iron:0.7,calcium:47,magnesium:21,potassium:316,zinc:0.4,omega3:0.1,folate:63,vitA:31,vitE:0.8,selenium:2.5},
  {name:"Spinach (raw)",cat:"Vegetables",kcal:23,protein:2.9,carbs:3.6,fat:0.4,fiber:2.2,sugar:0.4,sodium:79,vitC:28,vitD:0,vitB12:0,iron:2.7,calcium:99,magnesium:79,potassium:558,zinc:0.5,omega3:0.14,folate:194,vitA:469,vitE:2,selenium:1},
  {name:"Kale (raw)",cat:"Vegetables",kcal:49,protein:4.3,carbs:9,fat:0.9,fiber:3.6,sugar:0,sodium:38,vitC:120,vitD:0,vitB12:0,iron:1.5,calcium:150,magnesium:47,potassium:491,zinc:0.6,omega3:0.18,folate:141,vitA:500,vitE:1.5,selenium:0.9},
  {name:"Tomatoes (raw)",cat:"Vegetables",kcal:18,protein:0.9,carbs:3.9,fat:0.2,fiber:1.2,sugar:2.6,sodium:5,vitC:14,vitD:0,vitB12:0,iron:0.3,calcium:10,magnesium:11,potassium:237,zinc:0.2,omega3:0.01,folate:15,vitA:42,vitE:0.5,selenium:0},
  {name:"Carrots (raw)",cat:"Vegetables",kcal:41,protein:0.9,carbs:10,fat:0.2,fiber:2.8,sugar:4.7,sodium:69,vitC:5.9,vitD:0,vitB12:0,iron:0.3,calcium:33,magnesium:12,potassium:320,zinc:0.2,omega3:0.01,folate:19,vitA:835,vitE:0.7,selenium:0.1},
  {name:"Bell Pepper (red)",cat:"Vegetables",kcal:31,protein:1,carbs:7.2,fat:0.3,fiber:2.1,sugar:4.2,sodium:4,vitC:128,vitD:0,vitB12:0,iron:0.4,calcium:7,magnesium:12,potassium:211,zinc:0.3,omega3:0.03,folate:46,vitA:157,vitE:1.6,selenium:0.1},
  {name:"Avocado",cat:"Fruits",kcal:160,protein:2,carbs:9,fat:15,fiber:7,sugar:0.7,sodium:7,vitC:10,vitD:0,vitB12:0,iron:0.6,calcium:12,magnesium:29,potassium:485,zinc:0.6,omega3:0.11,folate:81,vitA:7,vitE:2.1,selenium:0.4},
  {name:"Cucumber",cat:"Vegetables",kcal:15,protein:0.7,carbs:3.6,fat:0.1,fiber:0.5,sugar:1.7,sodium:2,vitC:2.8,vitD:0,vitB12:0,iron:0.3,calcium:16,magnesium:13,potassium:147,zinc:0.2,omega3:0.01,folate:7,vitA:5,vitE:0.03,selenium:0.3},
  {name:"Mushrooms (white)",cat:"Vegetables",kcal:22,protein:3.1,carbs:3.3,fat:0.3,fiber:1,sugar:2,sodium:5,vitC:2.1,vitD:0.2,vitB12:0.04,iron:0.5,calcium:3,magnesium:9,potassium:318,zinc:0.5,omega3:0.02,folate:17,vitA:0,vitE:0.01,selenium:9.3},
  {name:"Garlic",cat:"Vegetables",kcal:149,protein:6.4,carbs:33,fat:0.5,fiber:2.1,sugar:1,sodium:17,vitC:31,vitD:0,vitB12:0,iron:1.7,calcium:181,magnesium:25,potassium:401,zinc:1.2,omega3:0.01,folate:3,vitA:0,vitE:0.08,selenium:14},
  {name:"Banana",cat:"Fruits",kcal:89,protein:1.1,carbs:23,fat:0.3,fiber:2.6,sugar:12,sodium:1,vitC:8.7,vitD:0,vitB12:0,iron:0.3,calcium:5,magnesium:27,potassium:358,zinc:0.2,omega3:0.03,folate:20,vitA:3,vitE:0.1,selenium:1},
  {name:"Apple",cat:"Fruits",kcal:52,protein:0.3,carbs:14,fat:0.2,fiber:2.4,sugar:10,sodium:1,vitC:4.6,vitD:0,vitB12:0,iron:0.1,calcium:6,magnesium:5,potassium:107,zinc:0.04,omega3:0.01,folate:3,vitA:3,vitE:0.2,selenium:0},
  {name:"Blueberries",cat:"Fruits",kcal:57,protein:0.7,carbs:14,fat:0.3,fiber:2.4,sugar:10,sodium:1,vitC:9.7,vitD:0,vitB12:0,iron:0.3,calcium:6,magnesium:6,potassium:77,zinc:0.2,omega3:0.06,folate:6,vitA:3,vitE:0.6,selenium:0.1},
  {name:"Orange",cat:"Fruits",kcal:47,protein:0.9,carbs:12,fat:0.1,fiber:2.4,sugar:9.4,sodium:0,vitC:53,vitD:0,vitB12:0,iron:0.1,calcium:40,magnesium:10,potassium:181,zinc:0.1,omega3:0.01,folate:30,vitA:11,vitE:0.2,selenium:0.5},
  {name:"Strawberries",cat:"Fruits",kcal:33,protein:0.7,carbs:8,fat:0.3,fiber:2,sugar:4.9,sodium:1,vitC:59,vitD:0,vitB12:0,iron:0.4,calcium:16,magnesium:13,potassium:153,zinc:0.1,omega3:0.07,folate:24,vitA:1,vitE:0.3,selenium:0.4},
  {name:"Mango",cat:"Fruits",kcal:60,protein:0.8,carbs:15,fat:0.4,fiber:1.6,sugar:13.7,sodium:1,vitC:36,vitD:0,vitB12:0,iron:0.2,calcium:11,magnesium:10,potassium:168,zinc:0.1,omega3:0.05,folate:43,vitA:54,vitE:0.9,selenium:0.6},
  {name:"Kiwi",cat:"Fruits",kcal:61,protein:1.1,carbs:15,fat:0.5,fiber:3,sugar:9,sodium:3,vitC:93,vitD:0,vitB12:0,iron:0.3,calcium:34,magnesium:17,potassium:312,zinc:0.1,omega3:0.04,folate:25,vitA:4,vitE:1.5,selenium:0.2},
  {name:"Almonds",cat:"Nuts & Seeds",kcal:579,protein:21,carbs:22,fat:50,fiber:12.5,sugar:4.4,sodium:1,vitC:0,vitD:0,vitB12:0,iron:3.7,calcium:264,magnesium:270,potassium:733,zinc:3.1,omega3:0.01,folate:44,vitA:0,vitE:25,selenium:4.1},
  {name:"Walnuts",cat:"Nuts & Seeds",kcal:654,protein:15,carbs:14,fat:65,fiber:6.7,sugar:2.6,sodium:2,vitC:1.3,vitD:0,vitB12:0,iron:2.9,calcium:98,magnesium:158,potassium:441,zinc:3.1,omega3:9.1,folate:98,vitA:1,vitE:0.7,selenium:4.9},
  {name:"Chia Seeds",cat:"Nuts & Seeds",kcal:486,protein:17,carbs:42,fat:31,fiber:34,sugar:0,sodium:16,vitC:1.6,vitD:0,vitB12:0,iron:7.7,calcium:631,magnesium:335,potassium:407,zinc:4.6,omega3:17.8,folate:49,vitA:54,vitE:0.5,selenium:55},
  {name:"Flaxseed",cat:"Nuts & Seeds",kcal:534,protein:18,carbs:29,fat:42,fiber:27,sugar:1.6,sodium:30,vitC:0.6,vitD:0,vitB12:0,iron:5.7,calcium:255,magnesium:392,potassium:813,zinc:4.3,omega3:22.8,folate:87,vitA:0,vitE:0.3,selenium:25},
  {name:"Sunflower Seeds",cat:"Nuts & Seeds",kcal:584,protein:21,carbs:20,fat:51,fiber:8.6,sugar:2.6,sodium:9,vitC:1.4,vitD:0,vitB12:0,iron:5.3,calcium:78,magnesium:325,potassium:645,zinc:5,omega3:0.07,folate:227,vitA:3,vitE:35,selenium:53},
  {name:"Pumpkin Seeds",cat:"Nuts & Seeds",kcal:559,protein:30,carbs:11,fat:49,fiber:6,sugar:1.4,sodium:7,vitC:1.9,vitD:0,vitB12:0,iron:8.8,calcium:46,magnesium:592,potassium:809,zinc:7.8,omega3:0.09,folate:58,vitA:16,vitE:2.2,selenium:9.4},
  {name:"Milk (whole)",cat:"Dairy",kcal:61,protein:3.2,carbs:4.8,fat:3.3,fiber:0,sugar:5.1,sodium:43,vitC:0,vitD:1.3,vitB12:0.45,iron:0.1,calcium:113,magnesium:10,potassium:150,zinc:0.4,omega3:0.08,folate:5,vitA:46,vitE:0.1,selenium:3.7},
  {name:"Cheddar Cheese",cat:"Dairy",kcal:402,protein:25,carbs:1.3,fat:33,fiber:0,sugar:0.5,sodium:621,vitC:0,vitD:0.6,vitB12:0.83,iron:0.7,calcium:721,magnesium:28,potassium:98,zinc:3.1,omega3:0.36,folate:18,vitA:330,vitE:0.3,selenium:13.9},
  {name:"Olive Oil",cat:"Fats & Oils",kcal:884,protein:0,carbs:0,fat:100,fiber:0,sugar:0,sodium:2,vitC:0,vitD:0,vitB12:0,iron:0.6,calcium:1,magnesium:0,potassium:1,zinc:0,omega3:0.76,folate:0,vitA:0,vitE:14,selenium:0},
  {name:"Coconut Oil",cat:"Fats & Oils",kcal:892,protein:0,carbs:0,fat:100,fiber:0,sugar:0,sodium:0,vitC:0,vitD:0,vitB12:0,iron:0,calcium:0,magnesium:0,potassium:0,zinc:0,omega3:0.02,folate:0,vitA:0,vitE:0.1,selenium:0},
  {name:"Butter",cat:"Fats & Oils",kcal:717,protein:0.9,carbs:0.1,fat:81,fiber:0,sugar:0.1,sodium:576,vitC:0,vitD:1.5,vitB12:0.17,iron:0,calcium:24,magnesium:2,potassium:24,zinc:0.1,omega3:0.32,folate:3,vitA:684,vitE:2.3,selenium:1},
  {name:"Coffee (black)",cat:"Beverages",kcal:2,protein:0.3,carbs:0,fat:0,fiber:0,sugar:0,sodium:2,vitC:0,vitD:0,vitB12:0,iron:0,calcium:2,magnesium:3,potassium:49,zinc:0,omega3:0,folate:2,vitA:0,vitE:0,selenium:0},
  {name:"Green Tea",cat:"Beverages",kcal:1,protein:0,carbs:0.2,fat:0,fiber:0,sugar:0,sodium:0,vitC:0,vitD:0,vitB12:0,iron:0,calcium:0,magnesium:1,potassium:8,zinc:0,omega3:0,folate:0,vitA:0,vitE:0,selenium:0},
  {name:"Dark Chocolate (70%+)",cat:"Snacks",kcal:598,protein:8,carbs:46,fat:43,fiber:11,sugar:24,sodium:20,vitC:0,vitD:0,vitB12:0,iron:11.9,calcium:73,magnesium:228,potassium:715,zinc:3.3,omega3:0.03,folate:12,vitA:2,vitE:0.6,selenium:6.8},
  {name:"Hummus",cat:"Snacks",kcal:166,protein:8,carbs:14,fat:10,fiber:6,sugar:0.4,sodium:302,vitC:0,vitD:0,vitB12:0,iron:2.4,calcium:49,magnesium:71,potassium:228,zinc:1.4,omega3:0.3,folate:73,vitA:1,vitE:0.7,selenium:3},
  {name:"Popcorn (air-popped)",cat:"Snacks",kcal:375,protein:11,carbs:74,fat:4.3,fiber:14.5,sugar:0.9,sodium:8,vitC:0,vitD:0,vitB12:0,iron:3,calcium:7,magnesium:144,potassium:329,zinc:3.1,omega3:0.09,folate:10,vitA:0,vitE:0.1,selenium:7},
  {name:"Granola Bar",cat:"Snacks",kcal:471,protein:10,carbs:64,fat:20,fiber:4,sugar:26,sodium:145,vitC:0,vitD:0,vitB12:0,iron:2.6,calcium:50,magnesium:70,potassium:300,zinc:1.5,omega3:0.1,folate:20,vitA:0,vitE:0.5,selenium:8},
  {name:"Shrimp (cooked)",cat:"Protein",kcal:99,protein:24,carbs:0.2,fat:0.3,fiber:0,sugar:0,sodium:111,vitC:0,vitD:0,vitB12:1.6,iron:0.5,calcium:70,magnesium:37,potassium:259,zinc:1.6,omega3:0.27,folate:3,vitA:54,vitE:2.2,selenium:38},
  {name:"Edamame",cat:"Legumes",kcal:122,protein:11,carbs:10,fat:5.2,fiber:5.2,sugar:2.2,sodium:6,vitC:6.1,vitD:0,vitB12:0,iron:2.3,calcium:63,magnesium:64,potassium:436,zinc:1.4,omega3:0.3,folate:311,vitA:9,vitE:0.7,selenium:1.5},
  {name:"Peanut Butter",cat:"Nuts & Seeds",kcal:588,protein:25,carbs:20,fat:50,fiber:6,sugar:9,sodium:425,vitC:0,vitD:0,vitB12:0,iron:1.9,calcium:49,magnesium:168,potassium:558,zinc:2.9,omega3:0.02,folate:87,vitA:0,vitE:9.1,selenium:4.1},
  {name:"Tempeh",cat:"Protein",kcal:193,protein:19,carbs:9.4,fat:11,fiber:0,sugar:0,sodium:9,vitC:0,vitD:0,vitB12:0,iron:2.7,calcium:111,magnesium:81,potassium:401,zinc:1.7,omega3:0.3,folate:24,vitA:0,vitE:0.05,selenium:0.1},
  {name:"Beef Liver",cat:"Protein",kcal:135,protein:21,carbs:3.9,fat:3.6,fiber:0,sugar:0,sodium:76,vitC:27,vitD:1.3,vitB12:59,iron:6.5,calcium:5,magnesium:18,potassium:313,zinc:4,omega3:0.12,folate:217,vitA:4968,vitE:0.4,selenium:32},
  {name:"Zucchini",cat:"Vegetables",kcal:17,protein:1.2,carbs:3.1,fat:0.3,fiber:1,sugar:2.5,sodium:8,vitC:17,vitD:0,vitB12:0,iron:0.4,calcium:16,magnesium:18,potassium:261,zinc:0.3,omega3:0.05,folate:24,vitA:10,vitE:0.1,selenium:0.2},
  {name:"Asparagus",cat:"Vegetables",kcal:20,protein:2.2,carbs:3.9,fat:0.1,fiber:2.1,sugar:1.9,sodium:2,vitC:5.6,vitD:0,vitB12:0,iron:2.1,calcium:24,magnesium:14,potassium:202,zinc:0.5,omega3:0.06,folate:52,vitA:38,vitE:1.1,selenium:2.3},
  {name:"Cabbage (raw)",cat:"Vegetables",kcal:25,protein:1.3,carbs:5.8,fat:0.1,fiber:2.5,sugar:3.2,sodium:18,vitC:36,vitD:0,vitB12:0,iron:0.5,calcium:40,magnesium:12,potassium:170,zinc:0.2,omega3:0.07,folate:43,vitA:5,vitE:0.1,selenium:0.3},
  {name:"Beets (cooked)",cat:"Vegetables",kcal:44,protein:1.7,carbs:10,fat:0.2,fiber:2,sugar:8,sodium:77,vitC:3.6,vitD:0,vitB12:0,iron:0.8,calcium:16,magnesium:23,potassium:305,zinc:0.4,omega3:0.01,folate:80,vitA:2,vitE:0.04,selenium:0.7},
];

// ─── TARGETS ─────────────────────────────────────────────────────────────────
const MICROTARGETSMALE = {
  fiber:38,sodium:2300,vitC:90,vitD:15,vitB12:2.4,iron:8,
  calcium:1000,magnesium:420,potassium:3400,zinc:11,omega3:1.6,
  folate:400,vitA:900,vitE:15,selenium:55,sugar:36
};
const MICROTARGETSFEMALE = {
  fiber:25,sodium:2300,vitC:75,vitD:15,vitB12:2.4,iron:18,
  calcium:1000,magnesium:320,potassium:2600,zinc:8,omega3:1.1,
  folate:400,vitA:700,vitE:15,selenium:55,sugar:25
};
const NUTRIENTUNITS = {
  kcal:'kcal',protein:'g',carbs:'g',fat:'g',fiber:'g',sugar:'g',
  sodium:'mg',vitC:'mg',vitD:'µg',vitB12:'µg',iron:'mg',calcium:'mg',
  magnesium:'mg',potassium:'mg',zinc:'mg',omega3:'g',folate:'µg',
  vitA:'µg',vitE:'mg',selenium:'µg'
};
const NUTRIENTLABELS = {
  kcal:'Calories',protein:'Protein',carbs:'Carbohydrates',fat:'Fat',
  fiber:'Fiber',sugar:'Sugar',sodium:'Sodium',vitC:'Vitamin C',
  vitD:'Vitamin D',vitB12:'Vitamin B12',iron:'Iron',calcium:'Calcium',
  magnesium:'Magnesium',potassium:'Potassium',zinc:'Zinc',
  omega3:'Omega-3',folate:'Folate',vitA:'Vitamin A',vitE:'Vitamin E',selenium:'Selenium'
};
const NUTRIENTCATS = {
  kcal:'Energy',protein:'Macronutrient',carbs:'Macronutrient',fat:'Macronutrient',
  fiber:'Macronutrient',sugar:'Macronutrient',sodium:'Mineral',vitC:'Vitamin',
  vitD:'Vitamin',vitB12:'Vitamin',iron:'Mineral',calcium:'Mineral',
  magnesium:'Mineral',potassium:'Mineral',zinc:'Mineral',omega3:'Fatty Acid',
  folate:'Vitamin',vitA:'Vitamin',vitE:'Vitamin',selenium:'Mineral'
};

// ─── STATE ────────────────────────────────────────────────────────────────────
let profile = {name:'Alex',age:30,sex:'male',height:175,weight:70,activity:1.55,goal:'maintain',diet:'none',allergies:''};
let logEntries = [];
// Use string keys for planner item IDs to avoid floating-point issues in onclick
let plannerData = {
  1:{breakfast:[],lunch:[],dinner:[],snack:[]},
  2:{breakfast:[],lunch:[],dinner:[],snack:[]}
};
let plannerIdCounter = 1;
let currentPlanDay = 1;
let charts = {};

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateFoodSelects();
  renderDatabase();
  renderSources();
  saveProfile();
  renderDashboard();
  renderLogTable();

  const zone = document.getElementById('uploadZone');
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) parseCSVFile(file);
  });
});

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
const PAGETITLES = {
  dashboard:'Dashboard',profile:'Profile',log:'Food Log',
  planner:'Meal Planner',nutrients:'Nutrients',
  recommendations:'Recommendations',database:'Food Database',sources:'Sources'
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelector('[data-page="' + id + '"]').classList.add('active');
  document.getElementById('pageTitle').textContent = PAGETITLES[id] || id;
  if (id === 'dashboard') renderDashboard();
  if (id === 'nutrients') renderNutrients();
  if (id === 'recommendations') renderRecommendations();
  if (id === 'planner') renderPlanner();
  if (id === 'database') renderDatabase();
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('visible');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function saveProfile() {
  profile.name      = document.getElementById('prof-name').value;
  profile.age       = +document.getElementById('prof-age').value || 30;
  profile.sex       = document.getElementById('prof-sex').value;
  profile.height    = +document.getElementById('prof-height').value || 175;
  profile.weight    = +document.getElementById('prof-weight').value || 70;
  profile.activity  = +document.getElementById('prof-activity').value || 1.55;
  profile.goal      = document.getElementById('prof-goal').value;
  profile.diet      = document.getElementById('prof-diet').value;
  profile.allergies = document.getElementById('prof-allergies').value;

  const t = calcTargets();
  document.getElementById('disp-bmr').textContent  = Math.round(t.bmr);
  document.getElementById('disp-tdee').textContent = Math.round(t.tdee);
  document.getElementById('disp-kcal').textContent = Math.round(t.kcal);
  const bmi = (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1);
  document.getElementById('disp-bmi').textContent     = bmi;
  document.getElementById('disp-bmi-cat').textContent = bmiCat(+bmi);
  document.getElementById('disp-protein').textContent = Math.round(t.protein) + 'g';
  document.getElementById('disp-carbs').textContent   = Math.round(t.carbs) + 'g';
  document.getElementById('disp-fat').textContent     = Math.round(t.fat) + 'g';

  renderDashboard();
  showToast('Profile saved!', 'success');
}

function calcTargets() {
  const {age, sex, height, weight, activity, goal, diet} = profile;
  let bmr = sex === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * activity;
  let kcalMod = 0;
  if (goal === 'lose') kcalMod = -0.15;
  if (goal === 'gain') kcalMod = 0.10;
  const kcal = tdee * (1 + kcalMod);

  let proteinPct = 0.25, carbPct = 0.45, fatPct = 0.30;
  if (diet === 'keto')    { proteinPct = 0.30; carbPct = 0.05; fatPct = 0.65; }
  if (diet === 'lowcarb') { proteinPct = 0.30; carbPct = 0.25; fatPct = 0.45; }
  if (goal === 'gain')    { proteinPct = 0.30; }

  const protein = (kcal * proteinPct) / 4;
  const carbs   = (kcal * carbPct)    / 4;
  const fat     = (kcal * fatPct)     / 9;
  const micros  = getMicroTargets();
  return {bmr, tdee, kcal, protein, carbs, fat, micros};
}

function bmiCat(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25)   return 'Normal weight';
  if (bmi < 30)   return 'Overweight';
  return 'Obese';
}

function getMicroTargets() {
  return profile.sex === 'male' ? MICROTARGETSMALE : MICROTARGETSFEMALE;
}

// ─── FOOD LOG ─────────────────────────────────────────────────────────────────
function populateFoodSelects() {
  ['log-food-select','plan-food'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '<option value="">— Select food —</option>';
    const cats = [...new Set(FOODS.map(f => f.cat))].sort();
    cats.forEach(cat => {
      const group = document.createElement('optgroup');
      group.label = cat;
      FOODS.filter(f => f.cat === cat).forEach(f => {
        const o = document.createElement('option');
        o.value = f.name;
        o.textContent = f.name;
        group.appendChild(o);
      });
      el.appendChild(group);
    });
  });
}

function addLogEntry() {
  const foodName = document.getElementById('log-food-select').value;
  const serving  = parseFloat(document.getElementById('log-serving').value) || 100;
  const meal     = document.getElementById('log-meal').value;
  if (!foodName) { showToast('Please select a food.', 'error'); return; }
  const food = FOODS.find(f => f.name === foodName);
  if (!food) return;
  logEntries.push({id: Date.now(), food, serving, meal});
  renderLogTable();
  renderDashboard();
  showToast(foodName + ' added!', 'success');
}

function removeLogEntry(id) {
  logEntries = logEntries.filter(e => e.id !== id);
  renderLogTable();
  renderDashboard();
}

function updateServing(id, val) {
  const entry = logEntries.find(e => e.id === id);
  if (entry) {
    entry.serving = parseFloat(val) || 100;
    renderLogTable();
    renderDashboard();
  }
}

function clearLog() {
  if (!logEntries.length || confirm('Clear all log entries?')) {
    logEntries = [];
    renderLogTable();
    renderDashboard();
    showToast('Log cleared.', 'success');
  }
}

function renderLogTable() {
  const tbody = document.getElementById('logTableBody');
  const empty = document.getElementById('logEmpty');
  if (!logEntries.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  const mealOrder = ['breakfast','lunch','dinner','snack'];
  const sorted = [...logEntries].sort((a,b) => mealOrder.indexOf(a.meal) - mealOrder.indexOf(b.meal));
  tbody.innerHTML = sorted.map(e => {
    const f = e.food, s = e.serving / 100;
    return '<tr>' +
      '<td><strong>' + f.name + '</strong></td>' +
      '<td><span class="badge badge-blue">' + e.meal + '</span></td>' +
      '<td><input class="tbl-input" type="number" value="' + e.serving + '" min="1" max="2000" onchange="updateServing(' + e.id + ',this.value)"></td>' +
      '<td>' + Math.round(f.kcal * s) + '</td>' +
      '<td>' + (f.protein * s).toFixed(1) + 'g</td>' +
      '<td>' + (f.carbs * s).toFixed(1) + 'g</td>' +
      '<td>' + (f.fat * s).toFixed(1) + 'g</td>' +
      '<td>' + (f.fiber * s).toFixed(1) + 'g</td>' +
      '<td><button class="btn btn-danger btn-sm btn-icon" onclick="removeLogEntry(' + e.id + ')">✕</button></td>' +
      '</tr>';
  }).join('');
}

// ─── CSV ──────────────────────────────────────────────────────────────────────
function handleCSV(e) {
  const file = e.target.files[0];
  if (file) parseCSVFile(file);
  e.target.value = '';
}

function parseCSVFile(file) {
  const reader = new FileReader();
  reader.onload = ev => {
    const lines = ev.target.result.split('\n').map(l => l.trim()).filter(Boolean);
    let added = 0, skipped = 0;
    lines.forEach(line => {
      if (line.toLowerCase().startsWith('food') || line.startsWith('#')) return;
      const parts = line.split(',').map(p => p.trim());
      const foodName = parts[0];
      const serving  = parseFloat(parts[1]) || 100;
      const mealRaw  = (parts[2] || '').toLowerCase();
      const meal     = ['breakfast','lunch','dinner','snack'].includes(mealRaw) ? mealRaw : 'snack';
      const food     = FOODS.find(f => f.name.toLowerCase() === foodName.toLowerCase());
      if (food) { logEntries.push({id: Date.now() + Math.random(), food, serving, meal}); added++; }
      else skipped++;
    });
    renderLogTable();
    renderDashboard();
    showToast('CSV: ' + added + ' entries added' + (skipped ? ', ' + skipped + ' unrecognized' : '') + '.', added ? 'success' : 'error');
  };
  reader.readAsText(file);
}

// ─── TOTALS ───────────────────────────────────────────────────────────────────
function calcTotals() {
  const keys = Object.keys(NUTRIENTLABELS);
  const totals = {};
  keys.forEach(k => totals[k] = 0);
  logEntries.forEach(e => {
    const s = e.serving / 100;
    keys.forEach(k => { if (e.food[k] != null) totals[k] += e.food[k] * s; });
  });
  return totals;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function renderDashboard() {
  const totals  = calcTotals();
  const targets = calcTargets();
  const micros  = getMicroTargets();

  document.getElementById('stat-kcal').textContent    = Math.round(totals.kcal);
  document.getElementById('stat-protein').textContent = Math.round(totals.protein) + 'g';
  document.getElementById('stat-carbs').textContent   = Math.round(totals.carbs) + 'g';
  document.getElementById('stat-fat').textContent     = Math.round(totals.fat) + 'g';
  document.getElementById('stat-kcal-target').textContent    = 'Target: ' + Math.round(targets.kcal) + ' kcal';
  document.getElementById('stat-protein-target').textContent = 'Target: ' + Math.round(targets.protein) + 'g';
  document.getElementById('stat-carbs-target').textContent   = 'Target: ' + Math.round(targets.carbs) + 'g';
  document.getElementById('stat-fat-target').textContent     = 'Target: ' + Math.round(targets.fat) + 'g';

  function setBar(id, val, target, lblId, unit) {
    const pct = target > 0 ? Math.min((val / target) * 100, 120) : 0;
    const el  = document.getElementById(id);
    el.style.width = Math.min(pct, 100) + '%';
    el.className   = 'progress-fill ' + (pct > 110 ? 'over' : pct > 90 ? 'ok' : pct > 50 ? 'warn' : 'low');
    document.getElementById(lblId).textContent = Math.round(val) + ' / ' + Math.round(target) + ' ' + unit;
  }
  setBar('prog-kcal',    totals.kcal,    targets.kcal,    'prog-kcal-lbl',    'kcal');
  setBar('prog-protein', totals.protein, targets.protein, 'prog-protein-lbl', 'g');
  setBar('prog-carbs',   totals.carbs,   targets.carbs,   'prog-carbs-lbl',   'g');
  setBar('prog-fat',     totals.fat,     targets.fat,     'prog-fat-lbl',     'g');
  setBar('prog-fiber',   totals.fiber,   micros.fiber,    'prog-fiber-lbl',   'g');

  // Macro donut chart
  const macroKcal = [totals.protein * 4, totals.carbs * 4, totals.fat * 9];
  const totalMacroKcal = macroKcal.reduce((a,b) => a+b, 0);
  if (charts.macro) { charts.macro.destroy(); charts.macro = null; }
  const macroCtx = document.getElementById('macroChart');
  if (macroCtx) {
    charts.macro = new Chart(macroCtx.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Protein','Carbs','Fat'],
        datasets: [{
          data: macroKcal,
          backgroundColor: ['rgba(108,99,255,0.8)','rgba(67,233,123,0.8)','rgba(255,101,132,0.8)'],
          borderColor: ['#6c63ff','#43e97b','#ff6584'],
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: {position:'bottom', labels:{color:'#8892b0', font:{size:11}}},
          tooltip: {callbacks:{label: ctx => ' ' + ctx.label + ': ' + ctx.raw.toFixed(0) + ' kcal (' + (totalMacroKcal > 0 ? (ctx.raw / totalMacroKcal * 100).toFixed(0) : 0) + '%)'}}
        }
      }
    });
  }

  // Deficiencies & excesses
  const allTargets = {kcal:targets.kcal, protein:targets.protein, carbs:targets.carbs, fat:targets.fat, ...micros};
  const pcts = {};
  Object.keys(allTargets).forEach(k => {
    if (allTargets[k] > 0) pcts[k] = ((totals[k] || 0) / allTargets[k]) * 100;
  });
  const defList = Object.entries(pcts).filter(([k,v]) => v < 60 && k !== 'sugar').sort((a,b) => a[1]-b[1]).slice(0,5);
  const exList  = Object.entries(pcts).filter(([k,v]) => v > 130).sort((a,b) => b[1]-a[1]).slice(0,5);

  document.getElementById('deficiencyList').innerHTML = defList.length
    ? defList.map(([k,v]) =>
        '<div class="progress-wrap">' +
        '<div class="progress-label"><span>' + (NUTRIENTLABELS[k]||k) + '</span><span class="nut-low">' + v.toFixed(0) + '%</span></div>' +
        '<div class="progress-bar"><div class="progress-fill low" style="width:' + Math.min(v,100) + '%"></div></div>' +
        '</div>'
      ).join('')
    : '<span style="color:var(--success);font-size:0.85rem;">✅ No significant deficiencies!</span>';

  document.getElementById('excessList').innerHTML = exList.length
    ? exList.map(([k,v]) =>
        '<div class="progress-wrap">' +
        '<div class="progress-label"><span>' + (NUTRIENTLABELS[k]||k) + '</span><span class="nut-high">' + v.toFixed(0) + '%</span></div>' +
        '<div class="progress-bar"><div class="progress-fill over" style="width:' + Math.min(v/2,100) + '%"></div></div>' +
        '</div>'
      ).join('')
    : '<span style="color:var(--text-muted);font-size:0.85rem;">No excesses detected.</span>';

  // Micro bar chart
  const microKeys   = ['vitC','vitD','vitB12','iron','calcium','magnesium','potassium','zinc','folate','vitA','vitE','selenium'];
  const microLabels = microKeys.map(k => NUTRIENTLABELS[k]);
  const microPcts   = microKeys.map(k => Math.min(((totals[k]||0) / (micros[k]||1)) * 100, 150));
  const microColors = microPcts.map(v => v < 60 ? 'rgba(255,203,107,0.8)' : v > 130 ? 'rgba(255,83,112,0.8)' : 'rgba(108,99,255,0.8)');

  if (charts.micro) { charts.micro.destroy(); charts.micro = null; }
  const microCtx = document.getElementById('microChart');
  if (microCtx) {
    charts.micro = new Chart(microCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: microLabels,
        datasets: [{label:'% of Target', data: microPcts, backgroundColor: microColors, borderRadius: 5}]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: {display:false},
          tooltip: {callbacks:{label: ctx => ' ' + ctx.raw.toFixed(0) + '% of target'}}
        },
        scales: {
          y: {beginAtZero:true, max:160, grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'#8892b0', callback: v => v+'%'}},
          x: {grid:{display:false}, ticks:{color:'#8892b0', font:{size:10}}}
        }
      }
    });
  }

  // Dashboard nutrient summary table
  const macroKeys = ['kcal','protein','carbs','fat','fiber','sugar'];
  const allKeys   = [...macroKeys, ...microKeys];
  const tbody     = document.getElementById('dashNutrientBody');
  tbody.innerHTML = allKeys.map(k => {
    const tgt = k==='kcal' ? targets.kcal : k==='protein' ? targets.protein :
                k==='carbs' ? targets.carbs : k==='fat' ? targets.fat : (micros[k]||0);
    const val  = totals[k] || 0;
    const pct  = tgt > 0 ? (val / tgt * 100) : 0;
    const unit = NUTRIENTUNITS[k] || '';
    let status = '', cls = '';
    if (pct < 60)       { status = '⬇️ Low';  cls = 'nut-low'; }
    else if (pct > 130) { status = '⬆️ High'; cls = 'nut-high'; }
    else                { status = '✅ OK';   cls = 'nut-ok'; }
    const dispVal = val < 10 ? val.toFixed(1) : Math.round(val);
    const dispTgt = tgt > 0 ? (tgt < 10 ? tgt.toFixed(1) : Math.round(tgt)) : '—';
    return '<tr>' +
      '<td>' + (NUTRIENTLABELS[k]||k) + '</td>' +
      '<td>' + dispVal + ' ' + unit + '</td>' +
      '<td>' + (tgt > 0 ? dispTgt + ' ' + unit : '—') + '</td>' +
      '<td>' + (tgt > 0 ? pct.toFixed(0) + '%' : '—') + '</td>' +
      '<td class="' + cls + '">' + status + '</td>' +
      '</tr>';
  }).join('');
}

// ─── NUTRIENTS PAGE ───────────────────────────────────────────────────────────
function renderNutrients() {
  const totals  = calcTotals();
  const targets = calcTargets();
  const micros  = getMicroTargets();
  const allKeys = Object.keys(NUTRIENTLABELS);

  const tbody = document.getElementById('fullNutrientBody');
  tbody.innerHTML = allKeys.map(k => {
    const tgt  = k==='kcal' ? targets.kcal : k==='protein' ? targets.protein :
                 k==='carbs' ? targets.carbs : k==='fat' ? targets.fat : (micros[k]||0);
    const val  = totals[k] || 0;
    const pct  = tgt > 0 ? (val / tgt * 100) : null;
    const unit = NUTRIENTUNITS[k] || '';
    let badge = '', badgeCls = '';
    if (pct !== null) {
      if (pct < 60)       { badge = 'Low';  badgeCls = 'badge-yellow'; }
      else if (pct > 130) { badge = 'High'; badgeCls = 'badge-red'; }
      else                { badge = 'OK';   badgeCls = 'badge-green'; }
    }
    const dispVal = val < 10 ? val.toFixed(1) : Math.round(val);
    const dispTgt = tgt > 0 ? (tgt < 10 ? tgt.toFixed(1) : Math.round(tgt)) : '—';
    return '<tr>' +
      '<td>' + (NUTRIENTLABELS[k]||k) + '</td>' +
      '<td>' + (NUTRIENTCATS[k]||'—') + '</td>' +
      '<td>' + dispVal + '</td>' +
      '<td>' + dispTgt + '</td>' +
      '<td>' + unit + '</td>' +
      '<td>' + (pct !== null ? pct.toFixed(0) + '%' : '—') + '</td>' +
      '<td>' + (badge ? '<span class="badge ' + badgeCls + '">' + badge + '</span>' : '—') + '</td>' +
      '</tr>';
  }).join('');

  // Meal breakdown chart
  const meals = ['breakfast','lunch','dinner','snack'];
  const mealTotals = meals.map(m => {
    const entries = logEntries.filter(e => e.meal === m);
    return {
      kcal:    entries.reduce((s,e) => s + e.food.kcal    * (e.serving/100), 0),
      protein: entries.reduce((s,e) => s + e.food.protein * (e.serving/100), 0),
      carbs:   entries.reduce((s,e) => s + e.food.carbs   * (e.serving/100), 0),
      fat:     entries.reduce((s,e) => s + e.food.fat     * (e.serving/100), 0),
    };
  });

  if (charts.trend) { charts.trend.destroy(); charts.trend = null; }
  const trendCtx = document.getElementById('trendChart');
  if (trendCtx) {
    charts.trend = new Chart(trendCtx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Breakfast','Lunch','Dinner','Snack'],
        datasets: [
          {label:'Protein (g)', data: mealTotals.map(m => +m.protein.toFixed(1)), backgroundColor:'rgba(108,99,255,0.8)', borderRadius:4},
          {label:'Carbs (g)',   data: mealTotals.map(m => +m.carbs.toFixed(1)),   backgroundColor:'rgba(67,233,123,0.8)',  borderRadius:4},
          {label:'Fat (g)',     data: mealTotals.map(m => +m.fat.toFixed(1)),     backgroundColor:'rgba(255,101,132,0.8)', borderRadius:4},
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {legend:{labels:{color:'#8892b0', font:{size:11}}}},
        scales: {
          x: {stacked:false, grid:{display:false}, ticks:{color:'#8892b0'}},
          y: {grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'#8892b0'}}
        }
      }
    });
  }
}

// ─── RECOMMENDATIONS ──────────────────────────────────────────────────────────
function showRecTab(id, btn) {
  document.querySelectorAll('.rec-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tabs .tab').forEach(b => b.classList.remove('active'));
  document.getElementById('rec-' + id).style.display = 'block';
  btn.classList.add('active');
}

function renderRecommendations() {
  const totals  = calcTotals();
  const targets = calcTargets();
  const micros  = getMicroTargets();
  const allTargets = {kcal:targets.kcal, protein:targets.protein, carbs:targets.carbs, fat:targets.fat, ...micros};
  const pcts = {};
  Object.keys(allTargets).forEach(k => {
    pcts[k] = allTargets[k] > 0 ? ((totals[k]||0) / allTargets[k]) * 100 : 100;
  });

  // Additions
  const defKeys = Object.keys(pcts).filter(k => pcts[k] < 60 && k !== 'sugar').sort((a,b) => pcts[a]-pcts[b]);
  const additionsEl = document.getElementById('rec-additions');
  if (!logEntries.length) {
    additionsEl.innerHTML = '<div class="rec-card"><div class="rec-title">Start logging food</div><div class="rec-body">Log your meals to receive personalised recommendations.</div></div>';
  } else if (!defKeys.length) {
    additionsEl.innerHTML = '<div class="rec-card" style="border-left-color:var(--success)"><div class="rec-title">✅ Looking great!</div><div class="rec-body">No major deficiencies detected based on your log. Keep it up!</div></div>';
  } else {
    additionsEl.innerHTML = defKeys.slice(0,6).map(k => {
      const foodRecs = getTopFoodsFor(k);
      return '<div class="rec-card">' +
        '<div class="rec-title">⬇️ ' + (NUTRIENTLABELS[k]||k) + ' (' + pcts[k].toFixed(0) + '% of target)</div>' +
        '<div class="rec-body">Consider adding: <strong>' + foodRecs.join(', ') + '</strong> to boost your ' + (NUTRIENTLABELS[k]||k) + ' intake. ' +
        'Current: ' + (totals[k]||0).toFixed(1) + ' ' + (NUTRIENTUNITS[k]||'') + ' / Target: ' + allTargets[k] + ' ' + (NUTRIENTUNITS[k]||'') + '.</div>' +
        '</div>';
    }).join('');
  }

  // Swaps
  const exKeys = Object.keys(pcts).filter(k => pcts[k] > 130 && k !== 'kcal').sort((a,b) => pcts[b]-pcts[a]);
  const swapSuggestions = {
    sodium: 'Try replacing processed/canned foods with fresh alternatives. Use herbs instead of salt.',
    sugar:  'Replace sugary snacks with fruit, nuts, or dark chocolate. Choose unsweetened versions.',
    fat:    'Consider leaner proteins like chicken breast or fish. Reduce oil quantities in cooking.',
    carbs:  'Swap refined grains (white rice, white bread) for whole grains or vegetables.',
    vitA:   'You have ample Vitamin A — no need to supplement. Excess preformed Vitamin A can be harmful.',
    vitD:   'Great Vitamin D intake — avoid supplements unless medically advised.',
  };
  const swapsEl = document.getElementById('rec-swaps');
  if (!exKeys.length) {
    swapsEl.innerHTML = '<div class="rec-card swap" style="border-left-color:var(--success)"><div class="rec-title">✅ No excessive nutrients detected</div><div class="rec-body">Your intake looks balanced. Keep monitoring as you log more meals.</div></div>';
  } else {
    swapsEl.innerHTML = exKeys.slice(0,5).map(k =>
      '<div class="rec-card swap">' +
      '<div class="rec-title">⬆️ ' + (NUTRIENTLABELS[k]||k) + ' is high (' + pcts[k].toFixed(0) + '%)</div>' +
      '<div class="rec-body">' + (swapSuggestions[k] || 'Consider reducing foods high in ' + (NUTRIENTLABELS[k]||k) + '.') + '</div>' +
      '</div>'
    ).join('');
  }

  // Portions
  const portionsEl = document.getElementById('rec-portions');
  const portionRecs = [];
  if (pcts.kcal > 115) portionRecs.push({t:'Reduce overall portions', b:'You are consuming ~' + pcts.kcal.toFixed(0) + '% of your calorie target. Consider smaller portions, especially of energy-dense foods.'});
  if (pcts.kcal < 70 && logEntries.length > 0) portionRecs.push({t:'Increase meal portions', b:"You're only at ~" + pcts.kcal.toFixed(0) + '% of your calorie target. Add more food or increase serving sizes.'});
  if (pcts.protein < 70) portionRecs.push({t:'Increase protein servings', b:'Aim for a palm-sized portion of protein (100–150g) at each main meal.'});
  if (pcts.fiber < 60)   portionRecs.push({t:'Add more fibrous vegetables', b:'Include 1–2 cups of vegetables at each meal. Aim for a variety of colours.'});
  if (!portionRecs.length) portionRecs.push({t:'✅ Portion sizes look appropriate', b:"Your current portions are well-balanced based on today's log."});
  portionsEl.innerHTML = portionRecs.map(r =>
    '<div class="rec-card portion"><div class="rec-title">' + r.t + '</div><div class="rec-body">' + r.b + '</div></div>'
  ).join('');

  // Risk
  const riskEl = document.getElementById('rec-risk');
  const risks  = [];
  if (pcts.sodium    > 130) risks.push({level:'high',   t:'High Sodium Intake',   b:'At ' + pcts.sodium.toFixed(0)    + '% of the ' + allTargets.sodium    + 'mg limit, elevated sodium increases risk of hypertension and cardiovascular disease. Reduce processed foods and salty snacks.'});
  if (pcts.sugar     > 130) risks.push({level:'high',   t:'High Added Sugar',     b:'Sugar at ' + pcts.sugar.toFixed(0) + '% of limit. Excess sugar contributes to insulin resistance, dental caries, and metabolic syndrome.'});
  if (pcts.vitD      < 40)  risks.push({level:'medium', t:'Low Vitamin D',        b:'Only ' + pcts.vitD.toFixed(0)    + '% of target. Vitamin D deficiency is linked to bone loss, immune dysfunction, and mood disorders. Consider sunlight exposure and fortified foods.'});
  if (pcts.iron      < 50)  risks.push({level:'medium', t:'Low Iron Intake',      b:'At ' + pcts.iron.toFixed(0)      + '% of target. Insufficient iron may cause anaemia — especially concerning for ' + (profile.sex === 'female' ? 'women (higher requirement: 18mg/day)' : 'those with active lifestyles') + '.'});
  if (pcts.calcium   < 50)  risks.push({level:'medium', t:'Low Calcium',          b:pcts.calcium.toFixed(0)           + '% of target. Long-term low calcium increases osteoporosis risk. Include dairy, fortified plant milks, or leafy greens.'});
  if (pcts.vitB12    < 40)  risks.push({level:'high',   t:'Very Low Vitamin B12', b:'Only ' + pcts.vitB12.toFixed(0)  + '% of target. B12 deficiency causes neurological damage, anaemia, and fatigue — particularly common in plant-based diets. Consider B12 supplementation.'});
  if (pcts.omega3    < 40)  risks.push({level:'medium', t:'Low Omega-3',          b:'At ' + pcts.omega3.toFixed(0)    + '% of target. Omega-3 deficiency is associated with increased inflammation and cardiovascular risk. Add fatty fish, walnuts, or flaxseed.'});
  if (pcts.folate    < 50)  risks.push({level:'medium', t:'Low Folate',           b:pcts.folate.toFixed(0)            + '% of target. Important for DNA synthesis and red blood cell formation. Especially critical during pregnancy. Include legumes, leafy greens.'});
  if (pcts.magnesium < 50)  risks.push({level:'low',    t:'Low Magnesium',        b:pcts.magnesium.toFixed(0)         + '% of target. Magnesium supports 300+ enzymatic reactions. Low levels linked to muscle cramps and poor sleep.'});

  if (!risks.length) {
    riskEl.innerHTML = '<div class="rec-card" style="border-left-color:var(--success)"><div class="rec-title">✅ No significant nutritional risks identified</div><div class="rec-body">Log more meals for a comprehensive risk assessment. Always consult a healthcare provider for medical concerns.</div></div>';
  } else {
    riskEl.innerHTML = risks.map(r =>
      '<div class="rec-card risk">' +
      '<div class="risk-item">' +
      '<div class="risk-dot ' + r.level + '"></div>' +
      '<div><div class="rec-title">' + r.t + ' <span class="badge badge-' + (r.level==='high'?'red':r.level==='medium'?'yellow':'blue') + '">' + r.level.toUpperCase() + '</span></div>' +
      '<div class="rec-body">' + r.b + '</div></div>' +
      '</div></div>'
    ).join('');
  }
}

function getTopFoodsFor(nutrientKey) {
  return FOODS
    .filter(f => f[nutrientKey] != null && f[nutrientKey] > 0)
    .sort((a,b) => (b[nutrientKey]||0) - (a[nutrientKey]||0))
    .slice(0,3)
    .map(f => f.name);
}

// ─── DATABASE ─────────────────────────────────────────────────────────────────
function renderDatabase() {
  const q = (document.getElementById('dbSearch')?.value || '').toLowerCase();
  const filtered = FOODS.filter(f => f.name.toLowerCase().includes(q) || f.cat.toLowerCase().includes(q));
  document.getElementById('dbTableBody').innerHTML = filtered.map(f =>
    '<tr>' +
    '<td><strong>' + f.name + '</strong></td>' +
    '<td><span class="badge badge-blue">' + f.cat + '</span></td>' +
    '<td>' + f.kcal + '</td>' +
    '<td>' + f.protein + 'g</td>' +
    '<td>' + f.carbs + 'g</td>' +
    '<td>' + f.fat + 'g</td>' +
    '<td>' + f.fiber + 'g</td>' +
    '</tr>'
  ).join('');
}

// ─── PLANNER ──────────────────────────────────────────────────────────────────
function selectPlanDay(day, btn) {
  currentPlanDay = day;
  document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('planDayTitle').textContent = 'Day ' + day + ' Plan';
  renderPlanner();
}

function addPlannerItem() {
  const foodName = document.getElementById('plan-food').value;
  const serving  = parseFloat(document.getElementById('plan-serving').value) || 100;
  const meal     = document.getElementById('plan-meal').value;
  if (!foodName) { showToast('Select a food.', 'error'); return; }
  const food = FOODS.find(f => f.name === foodName);
  if (!food) return;
  // Use integer counter to avoid floating-point issues in onclick attributes
  const itemId = plannerIdCounter++;
  plannerData[currentPlanDay][meal].push({food, serving, id: itemId});
  renderPlanner();
  showToast(foodName + ' added to Day ' + currentPlanDay + ' ' + meal + '!', 'success');
}

function removePlannerItem(day, meal, id) {
  plannerData[day][meal] = plannerData[day][meal].filter(e => e.id !== id);
  renderPlanner();
}

function clearPlanDay() {
  if (confirm('Clear all items from Day ' + currentPlanDay + '?')) {
    plannerData[currentPlanDay] = {breakfast:[],lunch:[],dinner:[],snack:[]};
    renderPlanner();
  }
}

function renderPlanner() {
  const day   = currentPlanDay;
  const meals = ['breakfast','lunch','dinner','snack'];
  // Reset totals
  let totalKcal=0, totalProtein=0, totalCarbs=0, totalFat=0;

  meals.forEach(meal => {
    const items = plannerData[day][meal];
    const el    = document.getElementById('plan-' + meal + '-items');
    if (!el) return;

    if (!items.length) {
      el.innerHTML = 'Empty';
      el.className = 'planner-drop empty';
      return;
    }

    el.className = 'planner-drop';
    el.innerHTML = items.map(e => {
      const s = e.serving / 100;
      // Accumulate totals here
      totalKcal    += e.food.kcal    * s;
      totalProtein += e.food.protein * s;
      totalCarbs   += e.food.carbs   * s;
      totalFat     += e.food.fat     * s;
      return '<div class="meal-food-item">' +
        '<span><strong>' + e.food.name + '</strong> <span style="color:var(--text-muted);font-size:0.78rem;">' + e.serving + 'g</span></span>' +
        '<span style="display:flex;align-items:center;gap:6px;">' +
        '<span style="font-size:0.8rem;">' + Math.round(e.food.kcal * s) + ' kcal</span>' +
        '<button class="btn btn-danger btn-sm btn-icon" onclick="removePlannerItem(' + day + ',\'' + meal + '\',' + e.id + ')">✕</button>' +
        '</span></div>';
    }).join('');
  });

  const targets = calcTargets();
  const calPct  = targets.kcal > 0 ? Math.min((totalKcal / targets.kcal) * 100, 100) : 0;
  const hasItems = meals.some(m => plannerData[day][m].length > 0);

  if (!hasItems) {
    document.getElementById('planSummary').innerHTML = '<span style="color:var(--text-muted);">No items yet.</span>';
    return;
  }

  document.getElementById('planSummary').innerHTML =
    '<div class="grid grid-2" style="gap:8px;margin-bottom:10px;">' +
    '<div><div style="font-size:0.75rem;color:var(--text-muted);">Calories</div><div style="font-weight:700;font-size:1.1rem;">' + Math.round(totalKcal) + ' kcal</div><div style="font-size:0.75rem;color:var(--text-muted);">Target: ' + Math.round(targets.kcal) + '</div></div>' +
    '<div><div style="font-size:0.75rem;color:var(--text-muted);">Protein</div><div style="font-weight:700;font-size:1.1rem;">' + totalProtein.toFixed(1) + 'g</div><div style="font-size:0.75rem;color:var(--text-muted);">Target: ' + Math.round(targets.protein) + 'g</div></div>' +
    '<div><div style="font-size:0.75rem;color:var(--text-muted);">Carbs</div><div style="font-weight:700;font-size:1.1rem;">' + totalCarbs.toFixed(1) + 'g</div><div style="font-size:0.75rem;color:var(--text-muted);">Target: ' + Math.round(targets.carbs) + 'g</div></div>' +
    '<div><div style="font-size:0.75rem;color:var(--text-muted);">Fat</div><div style="font-weight:700;font-size:1.1rem;">' + totalFat.toFixed(1) + 'g</div><div style="font-size:0.75rem;color:var(--text-muted);">Target: ' + Math.round(targets.fat) + 'g</div></div>' +
    '</div>' +
    '<div class="progress-bar" style="height:6px;"><div class="progress-fill ' + (totalKcal / targets.kcal > 1.1 ? 'over' : 'ok') + '" style="width:' + calPct + '%"></div></div>' +
    '<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">' + calPct.toFixed(0) + '% of calorie target</div>';
}

// ─── SOURCES ──────────────────────────────────────────────────────────────────
function renderSources() {
  const sources = [
    {name:'USDA FoodData Central',                 desc:'National nutrient database used for food composition values (per 100g).',                                                               url:'[fdc.nal.usda.gov](https://fdc.nal.usda.gov/)'},
    {name:'Dietary Reference Intakes (DRI)',        desc:'National Academies of Medicine — basis for micronutrient targets used in NutriScope.',                                                 url:'[nationalacademies.org](https://www.nationalacademies.org/hmd/activities/nutrition/summary-dris)'},
    {name:'WHO/FAO Nutrient Requirements',          desc:'World Health Organization & Food and Agriculture Organization joint guidelines on human nutrient requirements.',                        url:'[who.int](https://www.who.int/publications/i/item/9241546123)'},
    {name:'Mifflin-St Jeor Equation (1990)',        desc:'Equation used for Basal Metabolic Rate (BMR) calculation. Mifflin MD et al. J Am Diet Assoc.',                                         url:'[pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov/2305711/)'},
    {name:'Harvard T.H. Chan School of Public Health', desc:'The Nutrition Source — evidence-based guidance on healthy eating patterns.',                                                         url:'[hsph.harvard.edu](https://www.hsph.harvard.edu/nutritionsource/)'},
    {name:'European Food Safety Authority (EFSA)', desc:'Dietary reference values for energy, macronutrients, and micronutrients in the EU.',                                                     url:'[efsa.europa.eu](https://www.efsa.europa.eu/en/topics/topic/dietary-reference-values)'},
    {name:'NHS Eatwell Guide',                     desc:'UK dietary guidelines and recommended daily intakes.',                                                                                   url:'[nhs.uk](https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/)'},
    {name:'American Heart Association — Sodium',   desc:'AHA recommendations on daily sodium intake and cardiovascular risk.',                                                                    url:'[heart.org](https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sodium/sodium-and-salt)'},
    {name:'NIH Office of Dietary Supplements',     desc:'Detailed fact sheets for each vitamin and mineral, including safe upper limits.',                                                        url:'[ods.od.nih.gov](https://ods.od.nih.gov/factsheets/list-all/)'},
    {name:'Chart.js Library',                      desc:'Open-source JavaScript charting library used for data visualisations.',                                                                 url:'[chartjs.org](https://www.chartjs.org/)'},
  ];
  document.getElementById('sourcesList').innerHTML = sources.map((s, i) =>
    '<div class="source-item">' +
    '<span class="source-num">' + (i+1) + '</span>' +
    '<div>' +
    '<a href="' + s.url + '" target="_blank" rel="noopener" style="font-weight:600;color:var(--accent);">' + s.name + '</a>' +
    '<div style="margin-top:2px;">' + s.desc + '</div>' +
    '</div></div>' +
    (i < sources.length - 1 ? '<hr class="divider" style="margin:10px 0;">' : '')
  ).join('');
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type) {
  type = type || 'success';
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = 'toast'; }, 3000);
}
</script>
</body>
</html>
