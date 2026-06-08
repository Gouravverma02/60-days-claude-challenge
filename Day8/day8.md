<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>🌍 Personal Environmental Health Analyzer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!--
    PERSONAL ENVIRONMENTAL HEALTH ANALYZER
    Single-file, self-contained dashboard (no external dependencies).
    Data is simulated. In production, replace the CITY_DATA block
    with live API calls (IQAir, EPA AQS, or city CCR endpoints).
    AQI / water-quality health impacts based on EPA, WHO, and peer-reviewed sources.
  -->
  <style>
    :root {
      --bg: #050711;
      --bg-alt: #111322;
      --bg-elevated: #171a2a;
      --accent: #4fd1c5;
      --accent-soft: rgba(79,209,197,0.18);
      --accent-secondary: #f6ad55;
      --danger: #f56565;
      --warning: #ecc94b;
      --good: #48bb78;
      --text: #e2e8f0;
      --text-soft: #94a3b8;
      --border: rgba(148,163,184,0.14);
      --shadow: 0 18px 45px rgba(0,0,0,0.6);
      --r-lg: 18px; --r-md: 12px; --r-sm: 8px;
      --tr: 200ms ease-out;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: radial-gradient(ellipse at top, #1a202c 0, #050711 50%, #020308 100%);
      color: var(--text);
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
    }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    button { cursor: pointer; font-family: inherit; }

    /* ── Layout ── */
    .shell { max-width: 1320px; margin: 0 auto; padding: 16px 14px 36px; }

    /* ── Header ── */
    .app-header {
      display: flex; flex-wrap: wrap; align-items: center;
      justify-content: space-between; gap: 12px;
      padding: 12px 16px 16px;
      background: linear-gradient(135deg, #111827 0, #0a0f1e 100%);
      border: 1px solid rgba(148,163,184,0.2);
      border-radius: var(--r-lg);
      box-shadow: var(--shadow);
      position: sticky; top: 0; z-index: 50;
      backdrop-filter: blur(20px);
      margin-bottom: 14px;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-icon {
      width: 40px; height: 40px; border-radius: 13px;
      background: radial-gradient(circle at 30% 20%, #f6ad55, #dd6b20 30%, #2b6cb0 60%, #0a0f1e);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      flex-shrink: 0;
    }
    .brand-title { font-size: 17px; font-weight: 700; letter-spacing: .01em; }
    .brand-sub { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
    .beta { font-size: 9px; padding: 2px 6px; border-radius: 999px;
      background: var(--accent-soft); border: 1px solid rgba(79,209,197,.4);
      color: var(--accent); text-transform: uppercase; letter-spacing: .08em;
      vertical-align: middle; margin-left: 6px; }
    .header-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .status-chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 10px; border-radius: 999px; font-size: 11px;
      background: rgba(30,41,59,.9); border: 1px solid rgba(148,163,184,.3);
      color: var(--text-soft);
    }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--good);
      box-shadow: 0 0 8px rgba(72,187,120,.9); }
    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 13px; border-radius: 999px; font-size: 12px;
      border: 1px solid rgba(148,163,184,.45);
      background: linear-gradient(135deg, #1e293b, #0f172a);
      color: var(--text); transition: var(--tr);
      box-shadow: 0 4px 14px rgba(0,0,0,.5);
    }
    .btn:hover { border-color: rgba(226,232,240,.7); transform: translateY(-1px); }
    .btn-primary {
      background: linear-gradient(135deg, #0d9488, #0369a1);
      border-color: rgba(94,234,212,.7); color: #e6fffa; font-weight: 600;
    }
    .btn-primary:hover { background: linear-gradient(135deg, #0f766e, #075985); }

    /* ── Grid ── */
    .main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 14px; }
    @media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }

    /* ── Panel ── */
    .panel {
      background: linear-gradient(160deg, #0f172a 0, #050b18 100%);
      border: 1px solid var(--border); border-radius: var(--r-lg);
      box-shadow: var(--shadow); padding: 14px 16px 16px;
      position: relative; overflow: hidden;
    }
    .panel::before {
      content: ""; position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 5% 0, rgba(79,209,197,.06) 0, transparent 55%),
                  radial-gradient(circle at 95% 100%, rgba(129,140,248,.06) 0, transparent 55%);
    }
    .panel + .panel { margin-top: 14px; }
    .panel-hdr { display: flex; align-items: center; justify-content: space-between;
      gap: 8px; margin-bottom: 10px; }
    .panel-title {
      font-size: 12px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; color: #93c5fd;
      display: flex; align-items: center; gap: 6px;
    }
    .panel-sub { font-size: 11px; color: var(--text-soft); margin-top: 2px; }
    .panel-actions { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    select, input[type="text"], input[type="number"] {
      border-radius: 999px; border: 1px solid rgba(148,163,184,.45);
      background: rgba(15,23,42,.95); color: var(--text);
      padding: 5px 11px; font-size: 12px; outline: none; font-family: inherit;
    }
    select:focus, input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(79,209,197,.25); }
    label { font-size: 11px; color: var(--text-soft); white-space: nowrap; }

    /* ── Score ring ── */
    .score-wrap { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
    .score-ring {
      width: 86px; height: 86px; border-radius: 50%; flex-shrink: 0;
      background: conic-gradient(from -90deg, #10b981 var(--pct), #1e293b 0);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 0 28px rgba(16,185,129,.3);
      transition: background .5s ease;
    }
    .score-inner {
      width: 68px; height: 68px; border-radius: 50%;
      background: radial-gradient(circle at top, #1e293b, #020617);
      border: 1px solid rgba(148,163,184,.5);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      text-align: center;
    }
    .score-num { font-size: 22px; font-weight: 800; line-height: 1; }
    .score-label { font-size: 8px; text-transform: uppercase; letter-spacing: .12em;
      color: var(--text-soft); margin-top: 2px; }
    .score-grade { font-size: 11px; font-weight: 700; color: var(--accent-secondary); }
    .score-meta { flex: 1; min-width: 200px; }
    .exec-summary { font-size: 12px; color: var(--text-soft); line-height: 1.6; }
    .mini-scores { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
    .mini-score {
      border-radius: var(--r-sm); padding: 6px 10px;
      background: rgba(15,23,42,.9); border: 1px solid var(--border);
      font-size: 11px; min-width: 90px;
    }
    .mini-score-label { color: var(--text-soft); font-size: 10px; text-transform: uppercase;
      letter-spacing: .07em; }
    .mini-score-val { font-size: 15px; font-weight: 700; margin-top: 2px; }
    .mini-score-grade { font-size: 10px; color: var(--text-soft); }

    /* ── KPI strip ── */
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 14px; }
    @media (max-width: 800px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .kpi-grid { grid-template-columns: 1fr; } }
    .kpi {
      border-radius: var(--r-md); padding: 10px 12px;
      background: rgba(15,23,42,.9); border: 1px solid var(--border);
      transition: var(--tr);
    }
    .kpi:hover { border-color: rgba(79,209,197,.5); transform: translateY(-1px); }
    .kpi-label { font-size: 10px; text-transform: uppercase; letter-spacing: .08em;
      color: var(--text-soft); }
    .kpi-val { font-size: 18px; font-weight: 700; margin: 3px 0 1px; }
    .kpi-detail { font-size: 10px; color: var(--text-soft); }

    /* ── Canvas chart cards ── */
    .charts-row { display: grid; grid-template-columns: 1.5fr 1fr; gap: 12px; margin-bottom: 14px; }
    @media (max-width: 800px) { .charts-row { grid-template-columns: 1fr; } }
    .chart-card {
      border-radius: var(--r-md); padding: 10px 12px;
      background: rgba(15,23,42,.9); border: 1px solid var(--border);
    }
    .chart-hdr { display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 8px; gap: 6px; flex-wrap: wrap; }
    .chart-title { font-size: 12px; font-weight: 600; color: #e2e8f0;
      display: flex; align-items: center; gap: 6px; }
    .chart-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--accent);
      box-shadow: 0 0 8px rgba(79,209,197,.8); }
    .chart-caption { font-size: 10px; color: var(--text-soft); }
    canvas { display: block; width: 100% !important; border-radius: 6px; }

    /* ── City table ── */
    .city-table-wrap {
      border-radius: var(--r-md); overflow: hidden;
      border: 1px solid var(--border); background: rgba(10,16,32,.95);
      margin-bottom: 14px;
    }
    .city-table { width: 100%; border-collapse: collapse; font-size: 11px; }
    .city-table thead th {
      padding: 7px 10px; text-align: left; font-size: 10px;
      text-transform: uppercase; letter-spacing: .07em; color: var(--text-soft);
      background: rgba(15,23,42,.98); border-bottom: 1px solid rgba(51,65,85,.85);
      white-space: nowrap;
    }
    .city-table tbody tr { border-bottom: 1px solid rgba(31,41,55,.8);
      cursor: pointer; transition: background var(--tr); }
    .city-table tbody tr:hover { background: rgba(79,209,197,.07); }
    .city-table tbody tr.selected { background: rgba(30,64,175,.35); }
    .city-table td { padding: 7px 10px; vertical-align: middle; }
    .city-name-cell { font-weight: 600; color: #e2e8f0; }
    .aqi-badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 7px; border-radius: 999px; font-size: 9px;
      text-transform: uppercase; letter-spacing: .09em; font-weight: 600;
    }

    /* ── Right column ── */
    .right-col { display: flex; flex-direction: column; gap: 12px; }

    /* ── Detail card ── */
    .detail-city-name { font-size: 16px; font-weight: 700; margin-bottom: 3px; }
    .detail-city-sub { font-size: 11px; color: var(--text-soft); margin-bottom: 10px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .detail-metric {
      border-radius: var(--r-sm); padding: 8px 9px;
      background: rgba(15,23,42,.9); border: 1px solid var(--border);
    }
    .detail-metric-label { font-size: 10px; text-transform: uppercase; letter-spacing: .07em;
      color: var(--text-soft); }
    .detail-metric-val { font-size: 16px; font-weight: 700; margin-top: 2px; }
    .detail-metric-note { font-size: 10px; color: var(--text-soft); margin-top: 1px; }

    /* ── Risk cards ── */
    .risk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
    .risk-card {
      border-radius: var(--r-sm); padding: 8px 10px;
      background: rgba(15,23,42,.9); border: 1px solid var(--border);
    }
    .risk-title { font-size: 10px; text-transform: uppercase; letter-spacing: .07em;
      color: var(--text-soft); margin-bottom: 4px; }
    .risk-level { font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
    .risk-desc { font-size: 10px; color: var(--text-soft); margin-top: 3px; line-height: 1.4; }

    /* ── Recommendation list ── */
    .rec-list { list-style: none; margin-top: 6px; display: flex; flex-direction: column; gap: 5px; }
    .rec-list li {
      display: flex; align-items: flex-start; gap: 7px;
      font-size: 11px; color: var(--text-soft); line-height: 1.4;
    }
    .rec-list li span.icon { flex-shrink: 0; width: 18px; text-align: center; }

    /* ── Insights panel ── */
    .insight-item {
      display: flex; align-items: flex-start; gap: 8px;
      font-size: 11px; color: var(--text-soft); margin-bottom: 6px; line-height: 1.4;
    }
    .insight-bullet { color: var(--accent-secondary); flex-shrink: 0; }

    /* ── Accordion ── */
    .accordion { border-radius: var(--r-md); border: 1px solid var(--border);
      background: rgba(15,23,42,.9); overflow: hidden; margin-top: 8px; }
    .accordion-hdr {
      display: flex; justify-content: space-between; align-items: center;
      padding: 9px 12px; cursor: pointer; user-select: none; font-size: 11px;
      text-transform: uppercase; letter-spacing: .08em; color: var(--text-soft);
    }
    .accordion-hdr:hover { color: var(--text); }
    .accordion-body { display: none; padding: 0 12px 10px; font-size: 11px;
      color: var(--text-soft); line-height: 1.5; }
    .accordion.open .accordion-body { display: block; }
    .accordion-icon { transition: transform var(--tr); }
    .accordion.open .accordion-icon { transform: rotate(180deg); }

    /* ── Filters ── */
    .filters-bar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
      padding: 10px 12px; border-radius: var(--r-md);
      background: rgba(15,23,42,.85); border: 1px solid var(--border);
      margin-bottom: 12px; }
    .filter-group { display: flex; align-items: center; gap: 6px; }
    input[type="range"] { -webkit-appearance: none; height: 3px; border-radius: 999px;
      background: linear-gradient(90deg, #22c55e, #eab308, #ef4444);
      border: none; cursor: pointer; width: 100px; }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%;
      background: #e2e8f0; border: 2px solid #0f172a;
      box-shadow: 0 0 0 3px rgba(56,189,248,.45);
    }
    #aqiRangeVal { font-size: 11px; color: var(--text-soft); min-width: 28px; }

    /* ── Pill tags ── */
    .pill-row { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
    .pill {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 9px; border-radius: 999px; font-size: 10px;
      border: 1px solid rgba(148,163,184,.35);
      background: rgba(15,23,42,.9); color: var(--text-soft);
    }
    .pill.good { border-color: rgba(72,187,120,.8); background: rgba(22,163,74,.15); color: #bbf7d0; }
    .pill.moderate { border-color: rgba(236,201,75,.9); background: rgba(202,138,4,.18); color: #fef9c3; }
    .pill.poor { border-color: rgba(248,113,113,.9); background: rgba(153,27,27,.22); color: #fee2e2; }
    .pill span.dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }

    /* ── Guide overlay ── */
    .guide-overlay {
      display: none; position: fixed; inset: 0; z-index: 100;
      background: rgba(2,3,8,.85); backdrop-filter: blur(8px);
      align-items: center; justify-content: center; padding: 20px;
    }
    .guide-overlay.visible { display: flex; }
    .guide-box {
      max-width: 480px; width: 100%; border-radius: var(--r-lg);
      background: linear-gradient(160deg, #0f172a, #050b18);
      border: 1px solid rgba(148,163,184,.3); padding: 20px 22px;
      box-shadow: 0 32px 72px rgba(0,0,0,.85);
    }
    .guide-box h2 { font-size: 16px; margin-bottom: 10px; }
    .guide-box ul { padding-left: 16px; font-size: 12px; color: var(--text-soft);
      line-height: 1.7; }
    .guide-box p { font-size: 11px; color: var(--text-soft); margin-top: 8px;
      line-height: 1.5; }

    /* ── Footer ── */
    footer { max-width: 1320px; margin: 0 auto; padding: 10px 14px 24px;
      font-size: 10px; color: var(--text-soft);
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px; }

    /* ── AQI color helpers ── */
    .cat-good { color: #16a34a; } .cat-satisfactory { color: #4ade80; }
    .cat-moderate { color: #facc15; } .cat-poor { color: #fb923c; }
    .cat-very-poor { color: #f97316; } .cat-severe { color: #dc2626; }
    .bg-good { background: rgba(22,163,74,.18); border-color: rgba(22,163,74,.6); }
    .bg-satisfactory { background: rgba(74,222,128,.15); border-color: rgba(74,222,128,.55); }
    .bg-moderate { background: rgba(250,204,21,.15); border-color: rgba(250,204,21,.55); }
    .bg-poor { background: rgba(251,146,60,.18); border-color: rgba(251,146,60,.6); }
    .bg-very-poor { background: rgba(249,115,22,.2); border-color: rgba(249,115,22,.65); }
    .bg-severe { background: rgba(220,38,38,.22); border-color: rgba(220,38,38,.7); }
  </style>
</head>
<body>
<div class="shell">

  <!-- ══ HEADER ══ -->
  <header class="app-header" role="banner">
    <div class="brand">
      <div class="brand-icon" aria-hidden="true">🌍</div>
      <div>
        <div class="brand-title">
          Personal Environmental Health Analyzer
          <span class="beta">Prototype</span>
        </div>
        <div class="brand-sub">How your city's air &amp; water shape your daily health</div>
      </div>
    </div>
    <div class="header-right">
      <div class="status-chip">
        <span class="status-dot"></span>
        Simulated live data · 2026-06-08
      </div>
      <button class="btn btn-primary" id="exportBtn" type="button">⬇️ Download HTML</button>
      <button class="btn" id="guideBtn" type="button" aria-label="Open user guide">❔ Guide</button>
    </div>
  </header>

  <!-- ══ GUIDE OVERLAY ══ -->
  <div class="guide-overlay" id="guideOverlay" role="dialog" aria-modal="true" aria-label="User guide">
    <div class="guide-box">
      <h2>📖 Quick User Guide</h2>
      <ul>
        <li><strong>Focus City</strong> – select any city in the header dropdown to update all panels.</li>
        <li><strong>Pollutant toggle</strong> – switch between AQI, PM2.5, and PM10 views in the comparison chart.</li>
        <li><strong>AQI Range filter</strong> – drag the slider to hide cities below a threshold.</li>
        <li><strong>City table</strong> – click any row to load that city's detail card on the right.</li>
        <li><strong>Risk indicators</strong> – 🟢 Low · 🟡 Moderate · 🔴 High for hair, skin, lungs, and sleep.</li>
        <li><strong>Download</strong> – saves the full dashboard as a self-contained HTML file for offline use.</li>
        <li><strong>Data</strong> – values are simulated for demonstration. Replace the <code>CITY_DATA</code> array in the JS with live API data for production.</li>
      </ul>
      <p>Sources: EPA AQI methodology · WHO Air-Quality Guidelines 2021 · Florida DEP Water Quality Dashboard · PMC review doi:10.3390/healthcare12212123</p>
      <button class="btn" style="margin-top:12px; width:100%; justify-content:center;" id="closeGuideBtn">Close</button>
    </div>
  </div>

  <!-- ══ FILTERS BAR ══ -->
  <div class="filters-bar" role="search" aria-label="Dashboard filters">
    <div class="filter-group">
      <label for="citySelector">Focus city:</label>
      <select id="citySelector"></select>
    </div>
    <div class="filter-group">
      <label for="pollutantSel">Pollutant view:</label>
      <select id="pollutantSel">
        <option value="aqi">AQI</option>
        <option value="pm25">PM2.5 (µg/m³)</option>
        <option value="pm10">PM10 (µg/m³)</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="aqiRange">Min AQI filter: <span id="aqiRangeVal">0</span></label>
      <input type="range" id="aqiRange" min="0" max="200" value="0" step="5" />
    </div>
    <div class="filter-group">
      <label for="healthRiskSel">Health risk:</label>
      <select id="healthRiskSel">
        <option value="all">All</option>
        <option value="good">Good / Satisfactory</option>
        <option value="moderate">Moderate</option>
        <option value="poor">Poor / Severe</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="regionSel">Region:</label>
      <select id="regionSel">
        <option value="all">All regions</option>
        <option value="Northeast">Northeast</option>
        <option value="Southeast">Southeast</option>
        <option value="Midwest">Midwest</option>
        <option value="West">West</option>
        <option value="Southwest">Southwest</option>
      </select>
    </div>
  </div>

  <!-- ══ MAIN GRID ══ -->
  <div class="main-grid">

    <!-- ═══ LEFT COLUMN ═══ -->
    <div>

      <!-- Environmental Score Summary -->
      <div class="panel" aria-labelledby="summary-heading">
        <div class="panel-hdr">
          <div>
            <div class="panel-title" id="summary-heading">🌿 Environmental Health Snapshot</div>
            <div class="panel-sub">Overall score, air &amp; water quality, key metrics for your focus city</div>
          </div>
        </div>
        <div class="score-wrap">
          <div class="score-ring" id="scoreRing" style="--pct:0turn">
            <div class="score-inner">
              <div class="score-num" id="scoreNum">–</div>
              <div class="score-label">Env Score</div>
              <div class="score-grade" id="scoreGrade">–</div>
            </div>
          </div>
          <div class="score-meta">
            <p class="exec-summary" id="execSummary">Selecting city…</p>
            <div class="mini-scores">
              <div class="mini-score">
                <div class="mini-score-label">Air Quality</div>
                <div class="mini-score-val" id="airScoreNum">–</div>
                <div class="mini-score-grade" id="airScoreGrade">Grade: –</div>
              </div>
              <div class="mini-score">
                <div class="mini-score-label">Water Quality</div>
                <div class="mini-score-val" id="waterScoreNum">–</div>
                <div class="mini-score-grade" id="waterScoreGrade">Grade: –</div>
              </div>
              <div class="mini-score">
                <div class="mini-score-label">Cities analyzed</div>
                <div class="mini-score-val" id="cityCountNum">–</div>
                <div class="mini-score-grade" id="cityCountNote">in dataset</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI Strip -->
      <div class="kpi-grid" style="margin-top:14px">
        <div class="kpi">
          <div class="kpi-label">🏆 Cleanest city</div>
          <div class="kpi-val" id="kpiClean">–</div>
          <div class="kpi-detail" id="kpiCleanDetail">–</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">⚠️ Most polluted</div>
          <div class="kpi-val" id="kpiDirty">–</div>
          <div class="kpi-detail" id="kpiDirtyDetail">–</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">📊 Average AQI</div>
          <div class="kpi-val" id="kpiAvgAqi">–</div>
          <div class="kpi-detail" id="kpiAvgDetail">–</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">🔍 Top anomaly</div>
          <div class="kpi-val" id="kpiAnomaly">–</div>
          <div class="kpi-detail" id="kpiAnomalyDetail">–</div>
        </div>
      </div>

      <!-- Charts row -->
      <div class="charts-row">
        <div class="chart-card">
          <div class="chart-hdr">
            <div>
              <div class="chart-title">
                <span class="chart-dot"></span>
                City Comparison
              </div>
              <div class="chart-caption" id="chartCaption1">AQI by city (filtered)</div>
            </div>
          </div>
          <canvas id="barChart" height="220" aria-label="City AQI bar chart"></canvas>
        </div>
        <div class="chart-card">
          <div class="chart-hdr">
            <div>
              <div class="chart-title">
                <span class="chart-dot" style="background:#f6ad55;box-shadow:0 0 8px rgba(246,173,85,.8)"></span>
                AQI Distribution
              </div>
              <div class="chart-caption">Category breakdown across all cities</div>
            </div>
          </div>
          <canvas id="donutChart" height="220" aria-label="AQI distribution donut chart"></canvas>
        </div>
      </div>

      <!-- PM2.5 / PM10 comparison -->
      <div class="panel" style="margin-bottom:14px">
        <div class="panel-hdr">
          <div>
            <div class="panel-title">🔬 PM2.5 &amp; PM10 Deep Dive</div>
            <div class="panel-sub">Particulate matter comparison — all filtered cities</div>
          </div>
        </div>
        <canvas id="pmChart" height="180" aria-label="PM2.5 and PM10 grouped bar chart"></canvas>
      </div>

      <!-- City table -->
      <div class="panel" style="margin-bottom:14px">
        <div class="panel-hdr">
          <div>
            <div class="panel-title">🏙️ City Rankings</div>
            <div class="panel-sub">Click a row to view full health analysis in the detail panel →</div>
          </div>
        </div>
        <div class="city-table-wrap">
          <table class="city-table" aria-label="City environmental data table">
            <thead>
              <tr>
                <th>City</th>
                <th>Region</th>
                <th>AQI</th>
                <th>PM2.5</th>
                <th>PM10</th>
                <th>Water</th>
                <th>Category</th>
                <th>Env Score</th>
              </tr>
            </thead>
            <tbody id="cityTableBody"></tbody>
          </table>
        </div>
      </div>

      <!-- Insights -->
      <div class="panel">
        <div class="panel-hdr">
          <div class="panel-title">💡 Analytical Insights</div>
        </div>
        <div id="insightsList"></div>
        <!-- Sources accordion -->
        <div class="accordion" id="sourcesAccordion">
          <div class="accordion-hdr" tabindex="0" role="button" aria-expanded="false">
            <span>📚 Data sources &amp; methodology</span>
            <span class="accordion-icon">▼</span>
          </div>
          <div class="accordion-body">
            <p><strong>Air quality data:</strong> Simulated based on EPA AQI methodology (PM2.5, PM10, O₃, NO₂). In production, replace with <a href="[airnow.gov](https://www.airnow.gov)" target="_blank">AirNow API</a> or <a href="[iqair.com](https://www.iqair.com)" target="_blank">IQAir AirVisual</a>.</p>
            <p style="margin-top:6px"><strong>Water quality data:</strong> Simulated based on EPA Consumer Confidence Reports and Florida DEP Water Quality Dashboard. See <a href="[protectingfloridatogether.gov](https://protectingfloridatogether.gov/water-quality-status-dashboard)" target="_blank">ProtectingFloridaTogether.gov</a>.</p>
            <p style="margin-top:6px"><strong>Health impact references:</strong> WHO Air Quality Guidelines 2021; EPA NAAQS; Sundas et al. (2024) <em>Healthcare</em> doi:10.3390/healthcare12212123; IHME GBD 2024.</p>
            <p style="margin-top:6px"><strong>Scoring:</strong> Air Score = 100 − (AQI/5); Water Score = raw 0–100; Overall = 0.6×Air + 0.4×Water. All values rounded.</p>
          </div>
        </div>
      </div>

    </div><!-- /left col -->

    <!-- ═══ RIGHT COLUMN ═══ -->
    <div class="right-col">

      <!-- City detail -->
      <div class="panel">
        <div class="panel-hdr">
          <div class="panel-title">📍 City Detail</div>
        </div>
        <div id="cityDetail">
          <p style="font-size:12px;color:var(--text-soft)">Select a city from the table or the focus-city dropdown to view its full health profile.</p>
        </div>
      </div>

      <!-- Health impacts -->
      <div class="panel">
        <div class="panel-hdr">
          <div class="panel-title">🫁 Health Impact Analysis</div>
        </div>
        <div id="healthImpact">
          <p style="font-size:12px;color:var(--text-soft)">Select a city to see personalised health impact ratings.</p>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="panel">
        <div class="panel-hdr">
          <div class="panel-title">✅ Personal Recommendations</div>
        </div>
        <div id="recommendations">
          <p style="font-size:12px;color:var(--text-soft)">Select a city to load tailored daily action steps.</p>
        </div>
      </div>

      <!-- Trend sparkline -->
      <div class="panel">
        <div class="panel-hdr">
          <div class="panel-title">📈 7-Day AQI Trend</div>
        </div>
        <canvas id="sparkChart" height="120" aria-label="7-day AQI trend sparkline"></canvas>
        <p style="font-size:10px;color:var(--text-soft);margin-top:6px">Simulated 7-day rolling trend for focus city. Dashed line = WHO guideline (25 µg/m³ PM2.5 daily mean).</p>
      </div>

    </div><!-- /right col -->
  </div><!-- /main-grid -->
</div><!-- /shell -->

<footer>
  <span>🌍 Personal Environmental Health Analyzer · Prototype · Data simulated · 2026-06-08</span>
  <span>Sources: <a href="[airnow.gov](https://www.airnow.gov)" target="_blank">AirNow</a> · <a href="[protectingfloridatogether.gov](https://protectingfloridatogether.gov/water-quality-status-dashboard)" target="_blank">FL DEP</a> · <a href="[pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov/articles/PMC11545045/)" target="_blank">PMC 2024</a> · <a href="[iqair.com](https://www.iqair.com/world-air-quality)" target="_blank">IQAir</a></span>
</footer>

<script>
/* ═══════════════════════════════════════════════════════════════
   DATA LAYER
   Replace this block with live API data in production.
   Minimal record: { name, region, aqi, pm25, pm10, waterScore,
                     ozone, no2, trend[7], lat, lon }
═══════════════════════════════════════════════════════════════ */
const CITY_DATA = [
  { name:"Los Angeles",   region:"West",      aqi:142, pm25:38.4, pm10:62,  waterScore:58, ozone:88,  no2:52, trend:[155,148,162,138,145,142,142] },
  { name:"New York",      region:"Northeast", aqi:78,  pm25:18.2, pm10:31,  waterScore:82, ozone:65,  no2:41, trend:[72,80,76,84,79,81,78] },
  { name:"Houston",       region:"Southwest", aqi:108, pm25:27.6, pm10:48,  waterScore:63, ozone:74,  no2:38, trend:[112,105,119,103,108,110,108] },
  { name:"Chicago",       region:"Midwest",   aqi:65,  pm25:14.8, pm10:26,  waterScore:79, ozone:58,  no2:29, trend:[70,68,72,64,66,65,65] },
  { name:"Phoenix",       region:"Southwest", aqi:118, pm25:24.1, pm10:72,  waterScore:55, ozone:80,  no2:30, trend:[122,115,125,118,116,120,118] },
  { name:"Philadelphia",  region:"Northeast", aqi:85,  pm25:20.4, pm10:34,  waterScore:74, ozone:69,  no2:45, trend:[88,84,90,86,83,85,85] },
  { name:"San Antonio",   region:"Southwest", aqi:55,  pm25:11.2, pm10:22,  waterScore:69, ozone:52,  no2:21, trend:[58,53,57,54,56,55,55] },
  { name:"San Diego",     region:"West",      aqi:48,  pm25: 9.8, pm10:18,  waterScore:77, ozone:44,  no2:18, trend:[52,49,47,50,48,46,48] },
  { name:"Dallas",        region:"Southwest", aqi:97,  pm25:22.3, pm10:42,  waterScore:66, ozone:70,  no2:35, trend:[100,95,104,98,96,98,97] },
  { name:"San Francisco", region:"West",      aqi:42,  pm25: 8.6, pm10:16,  waterScore:86, ozone:40,  no2:15, trend:[45,40,44,41,43,42,42] },
  { name:"Austin",        region:"Southwest", aqi:61,  pm25:13.5, pm10:24,  waterScore:72, ozone:54,  no2:24, trend:[65,60,63,59,62,61,61] },
  { name:"Jacksonville",  region:"Southeast", aqi:72,  pm25:16.4, pm10:29,  waterScore:68, ozone:61,  no2:27, trend:[75,70,74,71,73,72,72] },
  { name:"Seattle",       region:"West",      aqi:38,  pm25: 7.4, pm10:14,  waterScore:91, ozone:36,  no2:12, trend:[42,36,40,37,39,38,38] },
  { name:"Denver",        region:"West",      aqi:88,  pm25:21.0, pm10:38,  waterScore:76, ozone:75,  no2:31, trend:[92,85,90,86,88,89,88] },
  { name:"Miami",         region:"Southeast", aqi:54,  pm25:11.8, pm10:21,  waterScore:60, ozone:50,  no2:19, trend:[57,52,56,53,55,54,54] },
  { name:"Atlanta",       region:"Southeast", aqi:91,  pm25:21.8, pm10:40,  waterScore:70, ozone:72,  no2:36, trend:[95,88,94,90,92,91,91] },
  { name:"Minneapolis",   region:"Midwest",   aqi:44,  pm25: 9.2, pm10:17,  waterScore:84, ozone:42,  no2:14, trend:[48,43,46,42,44,45,44] },
  { name:"Portland",      region:"West",      aqi:52,  pm25:10.5, pm10:20,  waterScore:88, ozone:48,  no2:16, trend:[55,50,54,51,53,52,52] },
  { name:"Detroit",       region:"Midwest",   aqi:112, pm25:28.9, pm10:52,  waterScore:54, ozone:76,  no2:49, trend:[116,110,118,112,109,113,112] },
  { name:"Boston",        region:"Northeast", aqi:58,  pm25:12.4, pm10:22,  waterScore:80, ozone:55,  no2:25, trend:[62,57,60,56,59,58,58] },
  { name:"Memphis",       region:"Southeast", aqi:103, pm25:25.8, pm10:46,  waterScore:61, ozone:71,  no2:39, trend:[107,101,105,102,104,103,103] },
  { name:"Louisville",    region:"Midwest",   aqi:96,  pm25:23.4, pm10:43,  waterScore:65, ozone:68,  no2:33, trend:[99,93,97,95,97,96,96] },
  { name:"Baltimore",     region:"Northeast", aqi:94,  pm25:22.8, pm10:41,  waterScore:62, ozone:73,  no2:44, trend:[97,91,96,93,94,95,94] },
  { name:"Las Vegas",     region:"West",      aqi:110, pm25:26.5, pm10:68,  waterScore:52, ozone:78,  no2:28, trend:[114,108,112,110,111,109,110] },
  { name:"Albuquerque",   region:"Southwest", aqi:76,  pm25:17.3, pm10:58,  waterScore:67, ozone:62,  no2:22, trend:[80,74,78,75,77,76,76] },
];

/* ═══ AQI CATEGORY HELPERS ══════════════════════════════════════ */
function aqiCategory(aqi) {
  if (aqi <= 50)  return { label:"Good",         cls:"cat-good",      bg:"bg-good",      emoji:"🟢" };
  if (aqi <= 100) return { label:"Moderate",      cls:"cat-moderate",  bg:"bg-moderate",  emoji:"🟡" };
  if (aqi <= 150) return { label:"Unhealthy (SG)",cls:"cat-poor",      bg:"bg-poor",      emoji:"🟠" };
  if (aqi <= 200) return { label:"Unhealthy",     cls:"cat-very-poor", bg:"bg-very-poor", emoji:"🔴" };
  if (aqi <= 300) return { label:"Very Unhealthy",cls:"cat-severe",    bg:"bg-severe",    emoji:"🔴" };
                  return { label:"Hazardous",     cls:"cat-severe",    bg:"bg-severe",    emoji:"⛔" };
}
function scoreGrade(s) {
  if (s >= 90) return "A+"; if (s >= 80) return "A";
  if (s >= 70) return "B";  if (s >= 60) return "C";
  if (s >= 50) return "D";  return "F";
}
function airScore(aqi)  { return Math.max(0, Math.round(100 - aqi / 2.5)); }
function envScore(city) { return Math.round(0.6 * airScore(city.aqi) + 0.4 * city.waterScore); }
function riskLevel(val, low, mid) {
  if (val <= low) return { label:"🟢 Low",    cls:"cat-good",    desc:"" };
  if (val <= mid) return { label:"🟡 Moderate",cls:"cat-moderate",desc:"" };
                  return { label:"🔴 High",   cls:"cat-poor",    desc:"" };
}

/* ═══ STATE ════════════════════════════════════════════════════ */
let focusCity    = CITY_DATA[0];
let filtered     = [...CITY_DATA];
let pollutantKey = "aqi";
let aqiMinFilter = 0;
let healthFilter = "all";
let regionFilter = "all";

/* ═══ CHART INSTANCES ══════════════════════════════════════════ */
let barCtx, donutCtx, pmCtx, sparkCtx;
let barChart, donutChart, pmChart, sparkChart;

/* ═══════════════════════════════════════════════════════════════
   MINI CHART ENGINE (pure canvas, no libraries)
   Supports: bar, grouped-bar, donut, line/sparkline
═══════════════════════════════════════════════════════════════ */
const C = {
  bar(ctx, labels, values, colors, title) {
    const W = ctx.canvas.width, H = ctx.canvas.height;
    ctx.clearRect(0,0,W,H);
    const pad = { l:36, r:10, t:10, b:50 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
    const max = Math.max(...values, 1) * 1.1;
    // grid
    ctx.strokeStyle = "rgba(148,163,184,0.1)"; ctx.lineWidth = 1;
    for (let i=0; i<=4; i++) {
      const y = pad.t + ch - (i/4)*ch;
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+cw,y); ctx.stroke();
      ctx.fillStyle = "#64748b"; ctx.font = "9px system-ui";
      ctx.textAlign = "right";
      ctx.fillText(Math.round((i/4)*max), pad.l-3, y+3);
    }
    const bw = Math.max(6, Math.floor(cw/labels.length) - 4);
    labels.forEach((lbl, i) => {
      const x = pad.l + i*(cw/labels.length) + (cw/labels.length - bw)/2;
      const bh = Math.round((values[i]/max)*ch);
      const y  = pad.t + ch - bh;
      ctx.fillStyle = colors[i] || "#4fd1c5";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, bw, bh, [3,3,0,0])
                    : ctx.rect(x, y, bw, bh);
      ctx.fill();
      // label
      ctx.fillStyle = "#94a3b8"; ctx.font = "8px system-ui";
      ctx.textAlign = "center";
      const shortened = lbl.length > 8 ? lbl.slice(0,7)+"…" : lbl;
      ctx.save(); ctx.translate(x+bw/2, pad.t+ch+10);
      ctx.rotate(-0.6); ctx.fillText(shortened, 0, 0); ctx.restore();
      // value
      ctx.fillStyle = "#e2e8f0"; ctx.font = "bold 8px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(Math.round(values[i]), x+bw/2, y-3);
    });
  },

  groupedBar(ctx, labels, series) {
    // series = [{label, color, values}]
    const W = ctx.canvas.width, H = ctx.canvas.height;
    ctx.clearRect(0,0,W,H);
    const pad = { l:36, r:10, t:10, b:50 };
    const cw = W - pad.l - pad.r, ch = H - pad.t - pad.b;
    const allVals = series.flatMap(s=>s.values);
    const max = Math.max(...allVals, 1) * 1.12;
    ctx.strokeStyle = "rgba(148,163,184,0.1)"; ctx.lineWidth = 1;
    for (let i=0;i<=4;i++){
      const y = pad.t+ch-(i/4)*ch;
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+cw,y); ctx.stroke();
      ctx.fillStyle="#64748b"; ctx.font="9px system-ui"; ctx.textAlign="right";
      ctx.fillText(Math.round((i/4)*max), pad.l-3, y+3);
    }
    const groupW = cw/labels.length;
    const bw = Math.max(4, Math.floor(groupW/(series.length+1)));
    labels.forEach((lbl,gi) => {
      const gx = pad.l + gi*groupW + (groupW - bw*series.length)/2;
      series.forEach((s,si) => {
        const val = s.values[gi] || 0;
        const bh  = Math.round((val/max)*ch);
        const x   = gx + si*bw;
        const y   = pad.t+ch-bh;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x,y,bw-1,bh,[2,2,0,0])
                      : ctx.rect(x,y,bw-1,bh);
        ctx.fill();
      });
      ctx.fillStyle="#94a3b8"; ctx.font="8px system-ui"; ctx.textAlign="center";
      const s = lbl.length>8 ? lbl.slice(0,7)+"…" : lbl;
      ctx.save(); ctx.translate(gx+bw*series.length/2, pad.t+ch+10);
      ctx.rotate(-0.6); ctx.fillText(s,0,0); ctx.restore();
    });
    // legend
    series.forEach((s,i) => {
      ctx.fillStyle = s.color;
      ctx.fillRect(pad.l + i*60, 2, 10, 8);
      ctx.fillStyle="#94a3b8"; ctx.font="8px system-ui"; ctx.textAlign="left";
      ctx.fillText(s.label, pad.l+i*60+13, 9);
    });
  },

  donut(ctx, slices) {
    // slices = [{label, value, color}]
    const W=ctx.canvas.width, H=ctx.canvas.height;
    ctx.clearRect(0,0,W,H);
    const cx=W/2, cy=H/2-14, r=Math.min(cx,cy)-18, ri=r*0.54;
    const total = slices.reduce((a,s)=>a+s.value,0)||1;
    let angle = -Math.PI/2;
    slices.forEach(s => {
      const sweep = (s.value/total)*Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,angle,angle+sweep);
      ctx.closePath();
      ctx.fillStyle=s.color; ctx.fill();
      angle+=sweep;
    });
    // hole
    ctx.beginPath(); ctx.arc(cx,cy,ri,0,Math.PI*2);
    ctx.fillStyle="#090e1e"; ctx.fill();
    // centre label
    ctx.fillStyle="#e2e8f0"; ctx.font="bold 14px system-ui"; ctx.textAlign="center";
    ctx.fillText(total, cx, cy+4);
    ctx.fillStyle="#64748b"; ctx.font="9px system-ui";
    ctx.fillText("Cities", cx, cy+14);
    // legend
    const legendY = H-30, legendX=8;
    slices.forEach((s,i) => {
      const x = legendX + i*(W/slices.length);
      ctx.fillStyle=s.color; ctx.beginPath(); ctx.arc(x+5, legendY+4, 4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#94a3b8"; ctx.font="8px system-ui"; ctx.textAlign="left";
      ctx.fillText(s.label+" ("+s.value+")", x+12, legendY+8);
    });
  },

  spark(ctx, values, guideVal, color) {
    const W=ctx.canvas.width, H=ctx.canvas.height;
    ctx.clearRect(0,0,W,H);
    const pad={l:28,r:10,t:12,b:22};
    const cw=W-pad.l-pad.r, ch=H-pad.t-pad.b;
    const max=Math.max(...values,guideVal||0)*1.15, min=0;
    const sx=(v,i)=>pad.l+i*(cw/(values.length-1));
    const sy=(v)=>pad.t+ch-(((v-min)/(max-min))*ch);
    // grid
    ctx.strokeStyle="rgba(148,163,184,0.08)"; ctx.lineWidth=1;
    [0,0.25,0.5,0.75,1].forEach(t=>{
      const y=pad.t+ch-t*ch;
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+cw,y); ctx.stroke();
      ctx.fillStyle="#64748b"; ctx.font="8px system-ui"; ctx.textAlign="right";
      ctx.fillText(Math.round(min+(max-min)*t), pad.l-3, y+3);
    });
    // WHO guideline
    if (guideVal) {
      const gy=sy(guideVal);
      ctx.save(); ctx.setLineDash([4,3]);
      ctx.strokeStyle="rgba(246,173,85,0.7)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(pad.l,gy); ctx.lineTo(pad.l+cw,gy); ctx.stroke();
      ctx.restore();
      ctx.fillStyle="#f6ad55"; ctx.font="8px system-ui"; ctx.textAlign="right";
      ctx.fillText("WHO", pad.l+cw, gy-3);
    }
    // gradient fill
    const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+ch);
    grad.addColorStop(0, color+"55"); grad.addColorStop(1, color+"00");
    ctx.beginPath();
    ctx.moveTo(sx(values[0],0), sy(values[0]));
    values.forEach((v,i)=>i&&ctx.lineTo(sx(v,i),sy(v)));
    ctx.lineTo(sx(values[values.length-1],values.length-1), pad.t+ch);
    ctx.lineTo(sx(values[0],0), pad.t+ch);
    ctx.closePath();
    ctx.fillStyle=grad; ctx.fill();
    // line
    ctx.beginPath();
    ctx.moveTo(sx(values[0],0), sy(values[0]));
    values.forEach((v,i)=>i&&ctx.lineTo(sx(v,i),sy(v)));
    ctx.strokeStyle=color; ctx.lineWidth=2.5; ctx.lineJoin="round"; ctx.stroke();
    // dots
    values.forEach((v,i)=>{
      ctx.beginPath(); ctx.arc(sx(v,i),sy(v),3,0,Math.PI*2);
      ctx.fillStyle=color; ctx.fill();
    });
    // x labels
    const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    ctx.fillStyle="#64748b"; ctx.font="8px system-ui"; ctx.textAlign="center";
    values.forEach((_,i)=>ctx.fillText(days[i]||"", sx(_,i), pad.t+ch+12));
  }
};

/* ═══ APPLY FILTERS ════════════════════════════════════════════ */
function applyFilters() {
  filtered = CITY_DATA.filter(c => {
    if (c.aqi < aqiMinFilter) return false;
    if (regionFilter !== "all" && c.region !== regionFilter) return false;
    if (healthFilter === "good"     && c.aqi > 100)  return false;
    if (healthFilter === "moderate" && (c.aqi <= 50 || c.aqi > 150)) return false;
    if (healthFilter === "poor"     && c.aqi <= 100) return false;
    return true;
  });
  renderAll();
}

/* ═══ COLOR FOR BAR CHARTS ══════════════════════════════════════ */
function barColor(aqi) {
  if (aqi <= 50)  return "#16a34a";
  if (aqi <= 100) return "#facc15";
  if (aqi <= 150) return "#fb923c";
  if (aqi <= 200) return "#f97316";
  return "#dc2626";
}

/* ═══ DPR-AWARE RESIZE ══════════════════════════════════════════ */
function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}

/* ═══ RENDER CHARTS ════════════════════════════════════════════ */
function renderCharts() {
  const labels = filtered.map(c=>c.name);
  const colors = filtered.map(c=>barColor(c.aqi));

  // Bar chart (comparison)
  const bc = document.getElementById("barChart");
  const bCtx = resizeCanvas(bc);
  let vals;
  if (pollutantKey === "pm25")      vals = filtered.map(c=>c.pm25);
  else if (pollutantKey === "pm10") vals = filtered.map(c=>c.pm10);
  else                               vals = filtered.map(c=>c.aqi);
  document.getElementById("chartCaption1").textContent =
    `${pollutantKey.toUpperCase()} by city (${filtered.length} shown)`;
  C.bar(bCtx, labels, vals, colors, pollutantKey);

  // Donut chart
  const dc = document.getElementById("donutChart");
  const dCtx = resizeCanvas(dc);
  const cats = {
    "Good":0,"Moderate":0,"Unhealthy (SG)":0,"Unhealthy":0,"Very Unhealthy":0,"Hazardous":0
  };
  filtered.forEach(c=>{ const cat=aqiCategory(c.aqi).label; cats[cat]=(cats[cat]||0)+1; });
  const slices = [
    {label:"Good",    value:cats["Good"],           color:"#16a34a"},
    {label:"Moderate",value:cats["Moderate"],        color:"#facc15"},
    {label:"USG",     value:cats["Unhealthy (SG)"],  color:"#fb923c"},
    {label:"Unhealthy",value:(cats["Unhealthy"]||0)+(cats["Very Unhealthy"]||0)+(cats["Hazardous"]||0), color:"#dc2626"},
  ].filter(s=>s.value>0);
  C.donut(dCtx, slices);

  // PM grouped bar
  const pm = document.getElementById("pmChart");
  const pmCtx2 = resizeCanvas(pm);
  C.groupedBar(pmCtx2, labels, [
    { label:"PM2.5", color:"#4fd1c5", values: filtered.map(c=>c.pm25) },
    { label:"PM10",  color:"#f6ad55", values: filtered.map(c=>c.pm10) },
  ]);

  // Sparkline
  const sk = document.getElementById("sparkChart");
  const skCtx = resizeCanvas(sk);
  const sparkColor = barColor(focusCity.aqi);
  C.spark(skCtx, focusCity.trend, 25, sparkColor);
}

/* ═══ RENDER KPIs ═══════════════════════════════════════════════ */
function renderKPIs() {
  const sorted = [...filtered].sort((a,b)=>a.aqi-b.aqi);
  const clean  = sorted[0];
  const dirty  = sorted[sorted.length-1];
  const avgAqi = Math.round(filtered.reduce((a,c)=>a+c.aqi,0)/filtered.length);

  if (clean) {
    document.getElementById("kpiClean").textContent = clean.name;
    document.getElementById("kpiCleanDetail").textContent =
      `AQI ${clean.aqi} · ${aqiCategory(clean.aqi).label}`;
  }
  if (dirty) {
    document.getElementById("kpiDirty").textContent = dirty.name;
    document.getElementById("kpiDirtyDetail").textContent =
      `AQI ${dirty.aqi} · ${aqiCategory(dirty.aqi).label}`;
  }
  document.getElementById("kpiAvgAqi").textContent = avgAqi;
  document.getElementById("kpiAvgDetail").textContent =
    `Across ${filtered.length} cities · ${aqiCategory(avgAqi).label}`;

  // Anomaly: city with biggest gap between PM10 and expected PM10 for its AQI
  const anomaly = filtered.reduce((best,c) => {
    const ratio = c.pm10 / Math.max(c.pm25,1);
    return ratio > (best?.ratio||0) ? {city:c, ratio} : best;
  }, null);
  if (anomaly) {
    document.getElementById("kpiAnomaly").textContent = anomaly.city.name;
    document.getElementById("kpiAnomalyDetail").textContent =
      `PM10/PM2.5 ratio ${anomaly.ratio.toFixed(1)}× — unusually coarse dust`;
  }
}

/* ═══ RENDER SUMMARY SCORE ══════════════════════════════════════ */
function renderSummary() {
  const as = airScore(focusCity.aqi);
  const ws = focusCity.waterScore;
  const es = envScore(focusCity);
  const pct = (es/100).toFixed(4)+"turn";
  document.getElementById("scoreRing").style.setProperty("--pct", pct);
  document.getElementById("scoreNum").textContent  = es;
  document.getElementById("scoreGrade").textContent = scoreGrade(es);
  document.getElementById("airScoreNum").textContent   = as;
  document.getElementById("airScoreGrade").textContent = "Grade: "+scoreGrade(as);
  document.getElementById("waterScoreNum").textContent   = ws;
  document.getElementById("waterScoreGrade").textContent = "Grade: "+scoreGrade(ws);
  document.getElementById("cityCountNum").textContent  = filtered.length;
  document.getElementById("cityCountNote").textContent = "matching current filters";

  const cat = aqiCategory(focusCity.aqi);
  document.getElementById("execSummary").innerHTML =
    `<strong>${focusCity.name}</strong> has an AQI of <strong>${focusCity.aqi}</strong>
    (${cat.emoji} ${cat.label}), PM2.5 of ${focusCity.pm25} µg/m³, and a water-quality score of
    <strong>${ws}/100</strong>. Its overall environmental health score is <strong>${es}/100</strong>
    (grade <strong>${scoreGrade(es)}</strong>). ${es>=75?"Air quality is generally safe for most residents — moderate outdoor activity is suitable.":es>=55?"Some sensitive groups may be affected. Limit prolonged outdoor exertion on high-AQI days.":"Air quality poses measurable health risks. Reduce outdoor exposure, use N95 masks outdoors, and run HEPA air purifiers indoors."}`;
}

/* ═══ RENDER CITY TABLE ═════════════════════════════════════════ */
function renderTable() {
  const tbody = document.getElementById("cityTableBody");
  tbody.innerHTML = "";
  const sorted = [...filtered].sort((a,b)=>a.aqi-b.aqi);
  sorted.forEach(city => {
    const cat = aqiCategory(city.aqi);
    const es  = envScore(city);
    const tr  = document.createElement("tr");
    if (city.name === focusCity.name) tr.classList.add("selected");
    tr.innerHTML = `
      <td class="city-name-cell">${city.name}</td>
      <td style="color:var(--text-soft)">${city.region}</td>
      <td class="${cat.cls}" style="font-weight:700">${city.aqi}</td>
      <td>${city.pm25}</td>
      <td>${city.pm10}</td>
      <td>${city.waterScore}</td>
      <td><span class="aqi-badge ${cat.bg}">${cat.emoji} ${cat.label}</span></td>
      <td style="font-weight:700">${es}</td>
    `;
    tr.addEventListener("click", () => { focusCity = city; renderAll(); });
    tbody.appendChild(tr);
  });
}

/* ═══ RENDER CITY DETAIL (right panel) ══════════════════════════ */
function renderDetail() {
  const c   = focusCity;
  const cat = aqiCategory(c.aqi);
  const as  = airScore(c.aqi);
  const es  = envScore(c);
  document.getElementById("cityDetail").innerHTML = `
    <div class="detail-city-name">${c.name} ${cat.emoji}</div>
    <div class="detail-city-sub">${c.region} · ${cat.label} air quality</div>
    <div class="detail-grid">
      <div class="detail-metric">
        <div class="detail-metric-label">AQI</div>
        <div class="detail-metric-val ${cat.cls}">${c.aqi}</div>
        <div class="detail-metric-note">${cat.label}</div>
      </div>
      <div class="detail-metric">
        <div class="detail-metric-label">PM2.5</div>
        <div class="detail-metric-val">${c.pm25}</div>
        <div class="detail-metric-note">µg/m³ · WHO limit: 15</div>
      </div>
      <div class="detail-metric">
        <div class="detail-metric-label">PM10</div>
        <div class="detail-metric-val">${c.pm10}</div>
        <div class="detail-metric-note">µg/m³ · WHO limit: 45</div>
      </div>
      <div class="detail-metric">
        <div class="detail-metric-label">Ozone</div>
        <div class="detail-metric-val">${c.ozone}</div>
        <div class="detail-metric-note">µg/m³</div>
      </div>
      <div class="detail-metric">
        <div class="detail-metric-label">NO₂</div>
        <div class="detail-metric-val">${c.no2}</div>
        <div class="detail-metric-note">µg/m³</div>
      </div>
      <div class="detail-metric">
        <div class="detail-metric-label">Water Score</div>
        <div class="detail-metric-val">${c.waterScore}/100</div>
        <div class="detail-metric-note">Grade: ${scoreGrade(c.waterScore)}</div>
      </div>
      <div class="detail-metric" style="grid-column:span 2">
        <div class="detail-metric-label">Overall Env Score</div>
        <div class="detail-metric-val" style="font-size:22px">${es} <span style="font-size:13px;color:var(--text-soft)">/100 · ${scoreGrade(es)}</span></div>
        <div class="detail-metric-note">Air ${as} (60%) + Water ${c.waterScore} (40%)</div>
      </div>
    </div>
  `;
}

/* ═══ RENDER HEALTH IMPACTS ═════════════════════════════════════ */
function renderHealth() {
  const c = focusCity;
  const lungRisk  = riskLevel(c.aqi,  50, 150);
  const sleepRisk = riskLevel(c.aqi,  50, 100);
  const skinRisk  = riskLevel(c.waterScore < 60 ? 80 : c.waterScore < 75 ? 50 : 30, 40, 65);
  const hairRisk  = riskLevel(c.waterScore < 60 ? 75 : c.waterScore < 75 ? 45 : 25, 35, 60);
  const exerciseRisk = riskLevel(c.aqi, 50, 100);

  const riskDesc = {
    lung: c.aqi<=50 ? "Minimal respiratory effect for all groups."
        : c.aqi<=100 ? "Sensitive groups (asthma, COPD) may notice irritation."
        : "Significant particulate load — may reduce lung function and worsen respiratory conditions.",
    sleep: c.aqi<=50 ? "Good air quality supports restful sleep."
         : c.aqi<=100 ? "Elevated PM2.5 may slightly disrupt sleep architecture."
         : "High PM2.5 linked to increased sleep-disordered breathing and poorer sleep quality.",
    skin: c.waterScore>=75 ? "Water hardness within normal range — low skin dryness risk."
        : c.waterScore>=60 ? "Moderate mineral content may contribute to mild skin dryness."
        : "Hard or chlorinated water can strip skin oils, increase eczema risk.",
    hair: c.waterScore>=75 ? "Water quality suitable for healthy hair and scalp."
        : c.waterScore>=60 ? "Moderate mineral deposits may cause minor scalp dryness."
        : "High mineral / chlorine content can weaken hair shafts and irritate the scalp.",
    exercise: c.aqi<=50 ? "Safe for all outdoor exercise intensities."
            : c.aqi<=100 ? "Sensitive groups should limit high-intensity outdoor exercise."
            : "Avoid prolonged vigorous outdoor exercise. Prefer indoor or morning sessions.",
  };

  document.getElementById("healthImpact").innerHTML = `
    <div class="risk-grid">
      <div class="risk-card">
        <div class="risk-title">🫁 Lung risk</div>
        <div class="risk-level ${lungRisk.cls}">${lungRisk.label}</div>
        <div class="risk-desc">${riskDesc.lung}</div>
      </div>
      <div class="risk-card">
        <div class="risk-title">😴 Sleep risk</div>
        <div class="risk-level ${sleepRisk.cls}">${sleepRisk.label}</div>
        <div class="risk-desc">${riskDesc.sleep}</div>
      </div>
      <div class="risk-card">
        <div class="risk-title">🏃 Exercise risk</div>
        <div class="risk-level ${exerciseRisk.cls}">${exerciseRisk.label}</div>
        <div class="risk-desc">${riskDesc.exercise}</div>
      </div>
      <div class="risk-card">
        <div class="risk-title">💧 Skin risk</div>
        <div class="risk-level ${skinRisk.cls}">${skinRisk.label}</div>
        <div class="risk-desc">${riskDesc.skin}</div>
      </div>
      <div class="risk-card" style="grid-column:span 2">
        <div class="risk-title">💇 Hair &amp; scalp risk</div>
        <div class="risk-level ${hairRisk.cls}">${hairRisk.label}</div>
        <div class="risk-desc">${riskDesc.hair}</div>
      </div>
    </div>
    <div class="pill-row" style="margin-top:10px">
      <span class="pill ${c.aqi<=50?'good':c.aqi<=100?'moderate':'poor'}">
        <span class="dot"></span> AQI ${c.aqi}
      </span>
      <span class="pill ${c.pm25<=15?'good':c.pm25<=35?'moderate':'poor'}">
        <span class="dot"></span> PM2.5 ${c.pm25} µg/m³
      </span>
      <span class="pill ${c.waterScore>=75?'good':c.waterScore>=60?'moderate':'poor'}">
        <span class="dot"></span> Water ${c.waterScore}/100
      </span>
    </div>
  `;
}

/* ═══ RENDER RECOMMENDATIONS ════════════════════════════════════ */
function renderRecs() {
  const c = focusCity;
  const recs = [];

  // Air-based
  if (c.aqi > 100) {
    recs.push({icon:"😷", text:"Wear an N95/KN95 mask when outdoors, especially during peak traffic hours."});
    recs.push({icon:"🏠", text:"Run a HEPA air purifier indoors — particularly in bedrooms overnight."});
    recs.push({icon:"🕗", text:"Schedule outdoor exercise before 8 AM or after 7 PM when ground-level ozone is lower."});
  } else if (c.aqi > 50) {
    recs.push({icon:"🌬️", text:"Sensitive groups (children, elderly, asthma) should limit prolonged outdoor exposure."});
    recs.push({icon:"🪟", text:"Keep windows closed on high-AQI afternoons; use recirculate mode in your car."});
  } else {
    recs.push({icon:"🌳", text:"Air quality is good — great day for outdoor activity and opening windows."});
  }

  // PM2.5
  if (c.pm25 > 35) {
    recs.push({icon:"🌿", text:"Add indoor plants (pothos, snake plant) — they help reduce fine particulates and VOCs."});
  }

  // Water-based
  if (c.waterScore < 60) {
    recs.push({icon:"🚰", text:"Use a certified NSF/ANSI 53 water filter for drinking and cooking."});
    recs.push({icon:"🧴", text:"Apply a leave-in moisturiser after showering to counteract hard-water dryness."});
    recs.push({icon:"💆", text:"Use a scalp-moisturising shampoo and limit hot showers to under 5 minutes."});
  } else if (c.waterScore < 75) {
    recs.push({icon:"💧", text:"Consider a shower filter to reduce chlorine — beneficial for skin and hair."});
    recs.push({icon:"🫗", text:"Refrigerator-filter or pitcher-filter water is adequate for drinking quality."});
  } else {
    recs.push({icon:"✅", text:"Water quality is good. Standard tap water is safe to drink."});
  }

  // General
  recs.push({icon:"📱", text:`Check <a href="[airnow.gov](https://www.airnow.gov)" target="_blank">AirNow.gov</a> each morning for the daily AQI forecast in ${c.name}.`});
  recs.push({icon:"🥦", text:"An antioxidant-rich diet (berries, leafy greens) supports the body's defence against air-pollution oxidative stress."});

  document.getElementById("recommendations").innerHTML = `
    <ul class="rec-list">
      ${recs.map(r=>`<li><span class="icon">${r.icon}</span><span>${r.text}</span></li>`).join("")}
    </ul>
  `;
}

/* ═══ RENDER INSIGHTS ═══════════════════════════════════════════ */
function renderInsights() {
  const sorted     = [...CITY_DATA].sort((a,b)=>a.aqi-b.aqi);
  const top3clean  = sorted.slice(0,3);
  const top3dirty  = sorted.slice(-3).reverse();
  const anomaly    = CITY_DATA.reduce((best,c)=>{
    const ratio=c.pm10/Math.max(c.pm25,1);
    return ratio>(best?.ratio||0)?{city:c,ratio}:best;
  }, null);
  const surprising = CITY_DATA.reduce((best,c)=>{
    // most surprising = high water score but poor air (or vice versa)
    const diff=Math.abs(airScore(c.aqi)-c.waterScore);
    return diff>(best?.diff||0)?{city:c,diff}:best;
  }, null);

  const items = [
    `🏆 <strong>Top 3 cleanest cities:</strong> ${top3clean.map(c=>`${c.name} (AQI ${c.aqi})`).join(" · ")}`,
    `⚠️ <strong>Top 3 most polluted:</strong> ${top3dirty.map(c=>`${c.name} (AQI ${c.aqi})`).join(" · ")}`,
    `🔬 <strong>Biggest PM10 anomaly:</strong> ${anomaly?.city.name} has a PM10/PM2.5 ratio of ${anomaly?.ratio.toFixed(1)}× — indicating dominant coarse dust particles, possibly from arid terrain or construction.`,
    `😮 <strong>Most surprising pattern:</strong> ${surprising?.city.name} shows a ${surprising?.diff}-point gap between its air score and water-quality score, suggesting localised water infrastructure or air-pollution sources are decoupled.`,
    `📈 <strong>Regional insight:</strong> Western cities average AQI ${Math.round(CITY_DATA.filter(c=>c.region==="West").reduce((a,c)=>a+c.aqi,0)/CITY_DATA.filter(c=>c.region==="West").length)} vs Midwest ${Math.round(CITY_DATA.filter(c=>c.region==="Midwest").reduce((a,c)=>a+c.aqi,0)/CITY_DATA.filter(c=>c.region==="Midwest").length)} — Midwest benefits from industrial regulations and less vehicle density.`,
    `💡 <strong>Action insight:</strong> Cities with PM2.5 above the WHO 24-h guideline of 15 µg/m³ account for ${CITY_DATA.filter(c=>c.pm25>15).length} of ${CITY_DATA.length} cities (${Math.round(CITY_DATA.filter(c=>c.pm25>15).length/CITY_DATA.length*100)}%) in this dataset.`,
  ];

  document.getElementById("insightsList").innerHTML =
    items.map(t=>`<div class="insight-item"><span class="insight-bullet">›</span><span>${t}</span></div>`).join("");
}

/* ═══ MASTER RENDER ═════════════════════════════════════════════ */
function renderAll() {
  renderSummary();
  renderKPIs();
  renderCharts();
  renderTable();
  renderDetail();
  renderHealth();
  renderRecs();
  renderInsights();
  // sync city selector
  document.getElementById("citySelector").value = focusCity.name;
}

/* ═══ POPULATE SELECTORS ════════════════════════════════════════ */
function populateSelectors() {
  const sel = document.getElementById("citySelector");
  CITY_DATA.sort((a,b)=>a.name.localeCompare(b.name)).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.name; opt.textContent = c.name;
    sel.appendChild(opt);
  });
  sel.value = focusCity.name;
}

/* ═══ EVENT LISTENERS ═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  populateSelectors();

  document.getElementById("citySelector").addEventListener("change", e => {
    focusCity = CITY_DATA.find(c=>c.name===e.target.value) || focusCity;
    renderAll();
  });
  document.getElementById("pollutantSel").addEventListener("change", e => {
    pollutantKey = e.target.value; applyFilters();
  });
  document.getElementById("aqiRange").addEventListener("input", e => {
    aqiMinFilter = +e.target.value;
    document.getElementById("aqiRangeVal").textContent = aqiMinFilter;
    applyFilters();
  });
  document.getElementById("healthRiskSel").addEventListener("change", e => {
    healthFilter = e.target.value; applyFilters();
  });
  document.getElementById("regionSel").addEventListener("change", e => {
    regionFilter = e.target.value; applyFilters();
  });

  // Guide
  const overlay   = document.getElementById("guideOverlay");
  const guideBtn  = document.getElementById("guideBtn");
  const closeBtn  = document.getElementById("closeGuideBtn");
  guideBtn.addEventListener("click",  () => overlay.classList.add("visible"));
  closeBtn.addEventListener("click",  () => overlay.classList.remove("visible"));
  overlay.addEventListener("click",   e => { if (e.target===overlay) overlay.classList.remove("visible"); });
  document.addEventListener("keydown", e => { if (e.key==="Escape") overlay.classList.remove("visible"); });

  // Accordion
  document.querySelectorAll(".accordion-hdr").forEach(hdr => {
    hdr.addEventListener("click", () => {
      const acc = hdr.closest(".accordion");
      const open = acc.classList.toggle("open");
      hdr.setAttribute("aria-expanded", open);
    });
    hdr.addEventListener("keydown", e => {
      if (e.key==="Enter"||e.key===" ") { e.preventDefault(); hdr.click(); }
    });
  });

  // Export
  document.getElementById("exportBtn").addEventListener("click", () => {
    const html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    const blob  = new Blob([html], {type:"text/html"});
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement("a");
    a.href = url; a.download = "env-health-analyzer.html"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  });

  // Canvas resize observer
  const ro = new ResizeObserver(() => renderCharts());
  ["barChart","donutChart","pmChart","sparkChart"].forEach(id => {
    const el = document.getElementById(id);
    if (el) ro.observe(el);
  });

  renderAll();
});
</script>
</body>
</html>
