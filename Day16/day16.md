You are a data analyst tasked with transforming a CSV of vehicle usage data into a self-contained, HTML-only dashboard (no external CDN, inline CSS and JS). The output must be a single HTML document starting with <!DOCTYPE html> and using pure SVG for charts, inline <style> and <script> blocks, and a responsive layout suitable for 375px–1440px widths. Do not include explanations or extraneous text—only the HTML document. Assumptions and constraints:
- CSV input (attached) columns (examples; adjust to actual headers if different):
  - Fuel_Type: Petrol, Diesel, CNG, E85, EV
  - Distance_km
  - Fuel_Cost_INR
  - CO2_emitted_kg
  - Maintenance_Cost_INR
  - Refuel_Recharge_time_min
  - Car_Age_years
  - Age_bucket (derived: New 0-2, Mid-life 3-5, Aged 6-9, Old 10+)
  - Petrol_price, E85_price, E85_cpkm, Petrol_cpkm, E85_mileage, Petrol_mileage, etc. (include as available; compute only from present data)
- Compute per-fuel metrics (group by Fuel_Type):
  1) Avg Cost/km = Fuel_Cost_INR ÷ Distance_km
  2) Avg CO₂/km = CO2_emitted_kg ÷ Distance_km
  3) Avg Maintenance/km = Maintenance_Cost_INR ÷ Distance_km
  4) Avg Refuel time = Refuel_Recharge_time_min
  5) Age buckets: New(0-2y), Mid-life(3-5y), Aged(6-9y), Old(10+y) show Cost/km and Maint/km per bucket; mark [CAR AGE] yrs.
  6) E85 Paradox (computed if data present):
     - Pump saving = ((Petrol_price − E85_price) / Petrol_price) × 100
     - Running penalty = ((E85_cpkm − Petrol_cpkm) / Petrol_cpkm) × 100
     - Break-even = (E85_mileage ÷ Petrol_mileage) × Petrol_price
  7) E85 Score/10: cost=4pt, CO₂=3pt, refuel=2pt, maint=1pt
- Dashboard sections (SVG charts only, no CDN; all data-driven):
  1) Header: [YOUR VEHICLE] · [FUEL] · Age:[CAR AGE]y · [KM/month]km/mo
  2) KPI Cards (5): your fuel cost/km | E85 cost/km | E85 premium vs Petrol | break-even price | your monthly cost
  3) SVG bar chart: Cost/km per fuel
  4) SVG doughnut: CO₂/km per fuel (with hover tooltips)
  5) SVG line chart: Cost/km vs age (0-12y) per fuel
  6) SVG gauge: E85 score/10 (animated)
  7) Fuel cards: highlight [FUEL] with glow. Each card shows 2 pros ✅ and 2 cons ❌ and best-for 🚗
- Colors:
  - E85: amber; Petrol: blue; Diesel: grey; CNG: green; EV: purple
- Responsive: layout adapts from 375px to 1440px
- Output: exactly one HTML document; no external assets; ensure all numbers are drawn from CSV data
Please return only the complete HTML document as the output.
