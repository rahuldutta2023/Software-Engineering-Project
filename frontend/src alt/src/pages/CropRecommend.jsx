import { useState } from "react";
import './CropRecommend.css';

// ─── Indian market prices (₹ per quintal, approx MSP/market rate 2024) ──────
const CROP_PRICES_PER_QTL = {
  Rice:      2183,  Wheat:     2275,   Maize:     2090,  Sugarcane:  340,
  Cotton:   6620,   Groundnut: 6377,   Pulses:    7550,  Soybean:   4600,
  Sunflower: 6760,  Tomato:    1200,   Potato:     750,  Onion:      800,
  Banana:   1500,   Mango:     4000,   Coconut:   3200,
};

// ─── Production cost per acre (₹, including seed/fertilizer/labour/water) ───
const COST_PER_ACRE = {
  Rice:      28000, Wheat:     22000, Maize:     18000, Sugarcane: 45000,
  Cotton:    35000, Groundnut: 24000, Pulses:    14000, Soybean:   18000,
  Sunflower: 16000, Tomato:    55000, Potato:    60000, Onion:     42000,
  Banana:    80000, Mango:     30000, Coconut:   25000,
};

// ─── Crop knowledge base (NPK + climate requirements) ────────────────────────
const CROP_DB = [
  { name:"Rice",      emoji:"🌾", N:[60,80],   P:[40,60],   K:[40,60],   temp:[20,35], humidity:[70,90], rainfall:[1000,2000], pH:[5.5,7.0], yield_range_qtl:[20,30],  color:"#e8f5e9" },
  { name:"Wheat",     emoji:"🌿", N:[100,120], P:[50,70],   K:[40,60],   temp:[10,25], humidity:[50,70], rainfall:[500,1000],  pH:[6.0,7.5], yield_range_qtl:[15,22],  color:"#fff9e6" },
  { name:"Maize",     emoji:"🌽", N:[80,120],  P:[40,60],   K:[60,80],   temp:[18,35], humidity:[50,80], rainfall:[500,800],   pH:[5.8,7.0], yield_range_qtl:[18,28],  color:"#fff3e0" },
  { name:"Sugarcane", emoji:"🎋", N:[100,150], P:[60,80],   K:[80,120],  temp:[20,40], humidity:[70,90], rainfall:[1200,1800], pH:[6.0,8.0], yield_range_qtl:[250,400],color:"#e0f7fa" },
  { name:"Cotton",    emoji:"🌸", N:[80,120],  P:[40,60],   K:[40,60],   temp:[25,40], humidity:[40,70], rainfall:[500,850],   pH:[5.5,8.0], yield_range_qtl:[6,10],   color:"#fce4ec" },
  { name:"Groundnut", emoji:"🥜", N:[20,30],   P:[40,60],   K:[20,40],   temp:[22,35], humidity:[50,70], rainfall:[500,1250],  pH:[5.5,7.0], yield_range_qtl:[8,12],   color:"#fff8e1" },
  { name:"Pulses",    emoji:"🫘", N:[10,20],   P:[40,60],   K:[20,40],   temp:[18,30], humidity:[40,70], rainfall:[300,700],   pH:[6.0,7.5], yield_range_qtl:[4,8],    color:"#f3e5f5" },
  { name:"Soybean",   emoji:"🌱", N:[20,40],   P:[60,80],   K:[40,60],   temp:[20,30], humidity:[60,75], rainfall:[600,1000],  pH:[5.8,7.0], yield_range_qtl:[7,12],   color:"#e8f5e9" },
  { name:"Sunflower", emoji:"🌻", N:[60,90],   P:[40,60],   K:[40,60],   temp:[18,35], humidity:[35,65], rainfall:[400,750],   pH:[6.0,7.5], yield_range_qtl:[5,8],    color:"#fffde7" },
  { name:"Tomato",    emoji:"🍅", N:[100,150], P:[60,80],   K:[80,120],  temp:[18,30], humidity:[60,80], rainfall:[600,1200],  pH:[5.5,7.0], yield_range_qtl:[80,150], color:"#ffebee" },
  { name:"Potato",    emoji:"🥔", N:[100,150], P:[100,150], K:[120,180], temp:[15,25], humidity:[70,85], rainfall:[600,1000],  pH:[5.0,6.5], yield_range_qtl:[80,120], color:"#ede7f6" },
  { name:"Onion",     emoji:"🧅", N:[80,100],  P:[40,60],   K:[60,80],   temp:[13,28], humidity:[50,70], rainfall:[650,750],   pH:[5.8,6.5], yield_range_qtl:[60,100], color:"#fff3e0" },
  { name:"Banana",    emoji:"🍌", N:[150,200], P:[40,60],   K:[120,150], temp:[20,35], humidity:[75,90], rainfall:[1000,2000], pH:[5.5,7.5], yield_range_qtl:[200,400],color:"#fff9c4" },
  { name:"Mango",     emoji:"🥭", N:[100,120], P:[40,60],   K:[80,100],  temp:[24,38], humidity:[50,80], rainfall:[750,1500],  pH:[5.5,7.5], yield_range_qtl:[30,60],  color:"#ffe0b2" },
  { name:"Coconut",   emoji:"🥥", N:[50,80],   P:[30,50],   K:[120,200], temp:[25,35], humidity:[70,90], rainfall:[1500,2500], pH:[5.5,8.0], yield_range_qtl:[60,80],  color:"#f1f8e9" },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────
function clamp01(val, minV, maxV) {
  if (val < minV) return Math.max(0, 1 - (minV - val) / (0.4 * minV + 1));
  if (val > maxV) return Math.max(0, 1 - (val - maxV) / (0.4 * maxV + 1));
  return 1;
}

function scoreCrop(crop, inputs, acres) {
  const scores = {
    N:        clamp01(inputs.N,        crop.N[0],        crop.N[1]),
    P:        clamp01(inputs.P,        crop.P[0],        crop.P[1]),
    K:        clamp01(inputs.K,        crop.K[0],        crop.K[1]),
    temp:     clamp01(inputs.temp,     crop.temp[0],     crop.temp[1]),
    humidity: clamp01(inputs.humidity, crop.humidity[0], crop.humidity[1]),
    rainfall: clamp01(inputs.rainfall, crop.rainfall[0], crop.rainfall[1]),
    pH:       clamp01(inputs.pH,       crop.pH[0],       crop.pH[1]),
  };
  const weights = { N:0.18, P:0.14, K:0.14, temp:0.18, humidity:0.12, rainfall:0.14, pH:0.10 };
  const total   = Object.entries(weights).reduce((s, [k, w]) => s + scores[k] * w, 0);
  const pct     = Math.round(total * 100);

  // Yield per acre (qtl)
  const yieldPerAcre = +(crop.yield_range_qtl[0] + (crop.yield_range_qtl[1] - crop.yield_range_qtl[0]) * total).toFixed(2);
  const totalYield   = +(yieldPerAcre * acres).toFixed(1);

  // Profit
  const pricePerQtl  = CROP_PRICES_PER_QTL[crop.name] || 2000;
  const costPerAcre  = COST_PER_ACRE[crop.name]       || 25000;
  const revenue      = Math.round(totalYield * pricePerQtl);
  const totalCost    = Math.round(costPerAcre * acres);
  const profit       = revenue - totalCost;
  const roi          = totalCost > 0 ? Math.round((profit / totalCost) * 100) : 0;

  return { ...crop, score: total, pct, yieldPerAcre, totalYield, revenue, totalCost, profit, roi, pricePerQtl, scores };
}

const PARAM_META = [
  { key:"N",        label:"Nitrogen (N)",    unit:"kg/ha", min:0,   max:250,  step:5,   default:80,  color:"#22c55e", tip:"Promotes leaf growth" },
  { key:"P",        label:"Phosphorus (P)",  unit:"kg/ha", min:0,   max:200,  step:5,   default:50,  color:"#3b82f6", tip:"Root & flower growth" },
  { key:"K",        label:"Potassium (K)",   unit:"kg/ha", min:0,   max:250,  step:5,   default:60,  color:"#f97316", tip:"Disease resistance" },
  { key:"temp",     label:"Temperature",     unit:"°C",    min:5,   max:50,   step:1,   default:28,  color:"#ef4444", tip:"Avg daytime temperature" },
  { key:"humidity", label:"Humidity",        unit:"%",     min:10,  max:100,  step:5,   default:65,  color:"#06b6d4", tip:"Growing season humidity" },
  { key:"rainfall", label:"Annual Rainfall", unit:"mm/yr", min:100, max:3000, step:50,  default:900, color:"#6366f1", tip:"Total annual rainfall" },
  { key:"pH",       label:"Soil pH",         unit:"",      min:3,   max:10,   step:0.1, default:6.5, color:"#a855f7", tip:"7 = neutral soil" },
];

function Bar({ pct }) {
  const col = pct >= 70 ? "#3B6D11" : pct >= 45 ? "#f59e0b" : "#ef4444";
  return (
    <div className="cr-bar-wrap">
      <div className="cr-bar-track">
        <div className="cr-bar-fill" style={{ width:`${pct}%`, background:col }} />
      </div>
      <span className="cr-bar-pct" style={{ color:col }}>{pct}%</span>
    </div>
  );
}

const MEDAL_BG = ["#FFD700","#C0C0C0","#CD7F32"];

function fmt(n) { return n?.toLocaleString("en-IN"); }

export default function CropRecommend({ lang = "en" }) {
  const defaults = Object.fromEntries(PARAM_META.map(p => [p.key, p.default]));
  const [inputs,  setInputs]  = useState(defaults);
  const [acres,   setAcres]   = useState(2);
  const [topK,    setTopK]    = useState(3);
  const [results, setResults] = useState(null);
  const [busy,    setBusy]    = useState(false);
  const [active,  setActive]  = useState(null);

  const set = (k, v) => setInputs(p => ({ ...p, [k]: parseFloat(v) || 0 }));

  const run = () => {
    setBusy(true); setResults(null); setActive(null);
    setTimeout(() => {
      const scored = CROP_DB
        .map(c => scoreCrop(c, inputs, acres))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
      setResults(scored);
      setBusy(false);
    }, 700);
  };

  return (
    <div className="crec-page">
      {/* ── Hero with wheat field ── */}
      <div className="crec-hero">
        <div className="crec-hero-overlay" />
        <div className="crec-hero-inner">
          <div className="crec-hero-icon">🌾</div>
          <h1 className="crec-hero-title">Crop Recommendation AI</h1>
          <p className="crec-hero-sub">
            Enter your soil &amp; climate data — get the Top-K best crops with<br/>
            <strong>yield prediction</strong> and <strong>profit estimation</strong>
          </p>
        </div>
      </div>

      <div className="crec-content">

        {/* ── Input Card ── */}
        <div className="crec-card">
          <div className="crec-card-header">
            <p className="crec-section-lbl">🧪 SOIL &amp; CLIMATE PARAMETERS</p>
            <div className="crec-acres-row">
              <span className="crec-acres-lbl">Farm Size:</span>
              <button className="crec-acre-btn" onClick={() => setAcres(a => Math.max(0.5, +(a-0.5).toFixed(1)))}>−</button>
              <span className="crec-acres-val">{acres} acres</span>
              <button className="crec-acre-btn" onClick={() => setAcres(a => Math.min(100, +(a+0.5).toFixed(1)))}>+</button>
            </div>
          </div>

          <div className="crec-params-grid">
            {PARAM_META.map(p => (
              <div key={p.key} className="crec-param">
                <div className="crec-param-top">
                  <label className="crec-param-lbl" htmlFor={`sl-${p.key}`}>
                    {p.label}
                    <span className="crec-param-tip">• {p.tip}</span>
                  </label>
                  <span className="crec-param-val" style={{ color:p.color }}>
                    {inputs[p.key]}{p.unit}
                  </span>
                </div>
                <input
                  id={`sl-${p.key}`}
                  type="range" min={p.min} max={p.max} step={p.step}
                  value={inputs[p.key]}
                  onChange={e => set(p.key, e.target.value)}
                  className="crec-slider"
                  style={{ "--c": p.color }}
                />
                <div className="crec-param-ends">
                  <span>{p.min}{p.unit}</span>
                  <span>{p.max}{p.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="crec-run-row">
            <div className="crec-topk-row">
              <span className="crec-acres-lbl">Show Top</span>
              {[3,5,7].map(k => (
                <button key={k} className={`crec-k-btn ${topK===k?"active":""}`} onClick={() => setTopK(k)}>{k}</button>
              ))}
              <span className="crec-acres-lbl">crops</span>
            </div>
            <button className="crec-run-btn" onClick={run} disabled={busy} id="run-crop-model">
              {busy ? <><span className="crec-spinner"/>Analyzing…</> : <>🚀 Find Best Crops</>}
            </button>
          </div>
        </div>

        {/* ── Results ── */}
        {results && (
          <>
            <p className="crec-section-lbl">🏆 TOP {topK} CROPS FOR YOUR FARM</p>

            {results.map((crop, i) => (
              <div
                key={crop.name}
                className={`crec-result-card ${active===crop.name?"open":""}`}
              >
                {/* Medal ribbon */}
                <div className="crec-medal" style={{ background: MEDAL_BG[i]||"#aaa" }}>
                  #{i+1}
                </div>

                {/* Main row */}
                <div className="crec-main-row" onClick={() => setActive(active===crop.name?null:crop.name)}>
                  <div className="crec-emoji-box" style={{ background:crop.color }}>{crop.emoji}</div>
                  <div className="crec-crop-info">
                    <h3 className="crec-crop-name">{crop.name}</h3>
                    <span className={`crec-suit-badge ${crop.pct>=70?"ex":crop.pct>=45?"gd":"fr"}`}>
                      {crop.pct>=70?"✅ Excellent":crop.pct>=45?"👍 Good":"⚠️ Fair"} Match
                    </span>
                  </div>
                  <div className="crec-match-pct" style={{ color:crop.pct>=70?"#3B6D11":crop.pct>=45?"#f59e0b":"#ef4444" }}>
                    {crop.pct}%
                    <span>match</span>
                  </div>
                  <div className="crec-chevron">{active===crop.name?"▲":"▼"}</div>
                </div>

                <Bar pct={crop.pct} />

                {/* ── Summary Stat Row (always visible) ── */}
                <div className="crec-stats-row">
                  <div className="crec-stat-pill yield">
                    <span className="crec-sp-icon">🌾</span>
                    <div>
                      <p className="crec-sp-val">{crop.totalYield} qtl</p>
                      <p className="crec-sp-lbl">Total Yield ({acres} acre{acres!==1?"s":""})</p>
                    </div>
                  </div>
                  <div className="crec-stat-pill revenue">
                    <span className="crec-sp-icon">💰</span>
                    <div>
                      <p className="crec-sp-val">₹{fmt(crop.revenue)}</p>
                      <p className="crec-sp-lbl">Gross Revenue</p>
                    </div>
                  </div>
                  <div className={`crec-stat-pill ${crop.profit>=0?"profit":"loss"}`}>
                    <span className="crec-sp-icon">{crop.profit>=0?"📈":"📉"}</span>
                    <div>
                      <p className="crec-sp-val">₹{fmt(Math.abs(crop.profit))}</p>
                      <p className="crec-sp-lbl">{crop.profit>=0?"Net Profit":"Net Loss"}</p>
                    </div>
                  </div>
                  <div className="crec-stat-pill roi">
                    <span className="crec-sp-icon">📊</span>
                    <div>
                      <p className="crec-sp-val" style={{ color:crop.roi>=0?"#3B6D11":"#ef4444" }}>
                        {crop.roi}%
                      </p>
                      <p className="crec-sp-lbl">ROI</p>
                    </div>
                  </div>
                </div>

                {/* ── Expanded Details ── */}
                {active === crop.name && (
                  <div className="crec-expand-body">
                    {/* Financial breakdown */}
                    <div className="crec-expand-section">
                      <p className="crec-expand-title">💸 Financial Breakdown ({acres} acre{acres!==1?"s":""})</p>
                      <div className="crec-fin-grid">
                        <div className="crec-fin-row">
                          <span>Price per Quintal</span>
                          <span className="crec-fin-val">₹{fmt(crop.pricePerQtl)}</span>
                        </div>
                        <div className="crec-fin-row">
                          <span>Yield per Acre</span>
                          <span className="crec-fin-val">{crop.yieldPerAcre} qtl</span>
                        </div>
                        <div className="crec-fin-row">
                          <span>Total Yield</span>
                          <span className="crec-fin-val">{crop.totalYield} qtl</span>
                        </div>
                        <div className="crec-fin-row">
                          <span>Gross Revenue</span>
                          <span className="crec-fin-val green">₹{fmt(crop.revenue)}</span>
                        </div>
                        <div className="crec-fin-row">
                          <span>Total Input Cost</span>
                          <span className="crec-fin-val red">₹{fmt(crop.totalCost)}</span>
                        </div>
                        <div className="crec-fin-row total">
                          <span>Net {crop.profit>=0?"Profit":"Loss"}</span>
                          <span className={`crec-fin-val bold ${crop.profit>=0?"green":"red"}`}>
                            {crop.profit>=0?"+":"−"}₹{fmt(Math.abs(crop.profit))}
                          </span>
                        </div>
                        <div className="crec-fin-row total">
                          <span>Return on Investment</span>
                          <span className={`crec-fin-val bold ${crop.roi>=0?"green":"red"}`}>{crop.roi}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Parameter compatibility */}
                    <div className="crec-expand-section">
                      <p className="crec-expand-title">🧪 Parameter Compatibility</p>
                      <div className="crec-bk-list">
                        {PARAM_META.map(pm => {
                          const pct2 = Math.round(crop.scores[pm.key] * 100);
                          return (
                            <div key={pm.key} className="crec-bk-row">
                              <span className="crec-bk-lbl">{pm.label}</span>
                              <div className="crec-bk-track">
                                <div className="crec-bk-fill" style={{
                                  width:`${pct2}%`,
                                  background: pct2>=70?"#3B6D11":pct2>=45?"#f59e0b":"#ef4444"
                                }} />
                              </div>
                              <span className="crec-bk-pct">{pct2}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ideal conditions */}
                    <div className="crec-expand-section">
                      <p className="crec-expand-title">📋 Ideal Conditions for {crop.name}</p>
                      <div className="crec-chips">
                        <span>N: {crop.N[0]}–{crop.N[1]} kg/ha</span>
                        <span>P: {crop.P[0]}–{crop.P[1]} kg/ha</span>
                        <span>K: {crop.K[0]}–{crop.K[1]} kg/ha</span>
                        <span>Temp: {crop.temp[0]}–{crop.temp[1]}°C</span>
                        <span>Humidity: {crop.humidity[0]}–{crop.humidity[1]}%</span>
                        <span>Rainfall: {crop.rainfall[0]}–{crop.rainfall[1]} mm</span>
                        <span>pH: {crop.pH[0]}–{crop.pH[1]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Comparison table */}
            <div className="crec-card" style={{ marginTop:"0.5rem" }}>
              <p className="crec-section-lbl">📊 YIELD &amp; PROFIT COMPARISON</p>
              <div className="crec-table-wrap">
                <table className="crec-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Crop</th>
                      <th>Match</th>
                      <th>Yield (qtl)</th>
                      <th>Revenue</th>
                      <th>Net Profit</th>
                      <th>ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((crop, i) => (
                      <tr key={crop.name}>
                        <td><span className="crec-t-medal" style={{ background:MEDAL_BG[i]||"#e5e7eb" }}>#{i+1}</span></td>
                        <td className="crec-t-name"><span>{crop.emoji}</span>{crop.name}</td>
                        <td><span style={{ fontWeight:700, color:crop.pct>=70?"#3B6D11":crop.pct>=45?"#f59e0b":"#ef4444" }}>{crop.pct}%</span></td>
                        <td className="crec-t-num">{crop.totalYield}</td>
                        <td className="crec-t-num">₹{fmt(crop.revenue)}</td>
                        <td className={`crec-t-num ${crop.profit>=0?"profit-col":"loss-col"}`}>
                          {crop.profit>=0?"+":"−"}₹{fmt(Math.abs(crop.profit))}
                        </td>
                        <td className={`crec-t-num ${crop.roi>=0?"profit-col":"loss-col"}`}>{crop.roi}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="crec-disclaimer">
                * Prices based on Indian MSP/market rates 2024. Costs include seed, fertilizer, labour & water. Actual results may vary.
              </p>
            </div>
          </>
        )}

        {/* Empty state */}
        {!results && !busy && (
          <div className="crec-empty">
            <span>🌾</span>
            <h3>Set your farm conditions above</h3>
            <p>
              Adjust sliders for N, P, K, temperature, rainfall, humidity, and soil pH —
              then click <strong>Find Best Crops</strong> to get ranked recommendations with
              yield predictions and profit estimates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
