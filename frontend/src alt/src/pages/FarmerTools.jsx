import { useState } from "react";
import { t } from "../i18n";
import './FarmerTools.css';

const CROPS = [
  { id: "rice",       name: "Rice",       rate: 1.2,  emoji: "🌾" },
  { id: "wheat",      name: "Wheat",      rate: 0.9,  emoji: "🌿" },
  { id: "maize",      name: "Maize",      rate: 0.7,  emoji: "🌽" },
  { id: "sugarcane",  name: "Sugarcane",  rate: 2.5,  emoji: "🎋" },
  { id: "cotton",     name: "Cotton",     rate: 0.8,  emoji: "🌸" },
  { id: "pulses",     name: "Pulses",     rate: 0.5,  emoji: "🫘" },
  { id: "vegetables", name: "Vegetables", rate: 0.4,  emoji: "🥕" },
];

const SCHEMES = [
  { id: "pm-kisan",     category: "Income",  saving: "₹6,000/yr" },
  { id: "kusum",        category: "Energy",  saving: "60% Subsidy" },
  { id: "e-nam",        category: "Income",  saving: "Better Prices" },
  { id: "kcc",          category: "Subsidy", saving: "4% Interest" },
  { id: "fasal-bima",   category: "Insure",  saving: "Full Cover" },
  { id: "paramparagat", category: "Subsidy", saving: "Organic Bonus" },
];

const SEASON_TIPS_KEYS = {
  Summer: ["tipSum1", "tipSum2", "tipSum3"],
  Monsoon: ["tipMon1", "tipMon2", "tipMon3"],
  PostMonsoon: ["tipPost1", "tipPost2", "tipPost3"],
  Winter: ["tipWin1", "tipWin2", "tipWin3"],
};

export default function FarmerTools({ lang = "en" }) {
  const [crop, setCrop] = useState(CROPS[0]);
  const [area, setArea] = useState(2);
  const [activeCat, setActiveCat] = useState("All");

  const co2Absorbed = (crop.rate * area * 10).toFixed(1);
  const treesEquiv = Math.round(co2Absorbed / 2);

  const filteredSchemes = activeCat === "All" 
    ? SCHEMES 
    : SCHEMES.filter(s => s.category === activeCat);

  return (
    <div className="ft-page">
      {/* ── Hero with wheat field ── */}
      <div className="ft-hero">
        <div className="ft-hero-content">
          <h1>{t(lang, "navFarmerTools")}</h1>
          <p>{t(lang, "ftHeroSub")}</p>
        </div>
      </div>

      <div className="ft-grid">
        
        {/* ── Crop Calculator ── */}
        <div className="ft-card">
          <h2 className="ft-card-title">🚜 {t(lang, "cropTitle")}</h2>
          <p className="ft-card-sub">{t(lang, "cropSubtitle") || "Calculate your farm's carbon sequestration and impact."}</p>
          
          <div className="ft-input-group">
            <label>{t(lang, "cropSelect")}</label>
            <div style={{ position: "relative" }}>
              <select 
                value={crop.id} 
                onChange={e => setCrop(CROPS.find(c => c.id === e.target.value))}
              >
                {CROPS.map(c => (
                  <option key={c.id} value={c.id}>{c.emoji} {t(lang, c.id)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="ft-input-group">
            <label>{t(lang, "cropAreaLbl")} ({t(lang, "cropAcres")})</label>
            <div className="crec-acres-row" style={{ width: "100%", margin: 0, justifyContent: "space-between" }}>
               <button className="crec-acre-btn" onClick={() => setArea(a => Math.max(0.5, +(a-0.5).toFixed(1)))}>−</button>
               <span className="crec-acres-val">{area} acres</span>
               <button className="crec-acre-btn" onClick={() => setArea(a => Math.min(100, +(a+0.5).toFixed(1)))}>+</button>
            </div>
          </div>

          <div className="ft-results">
            <div className="ft-res-item">
              <span className="ft-res-lbl">{t(lang, "cropSeqTitle")}</span>
              <span className="ft-res-val">{co2Absorbed} kg</span>
            </div>
            <div className="ft-res-item">
              <span className="ft-res-lbl">{t(lang, "cropTreeTitle")}</span>
              <span className="ft-res-val">{treesEquiv}🌳</span>
            </div>
          </div>
          
          <p className="ft-tip">💡 {t(lang, "cropTip")}</p>
        </div>

        {/* ── Eco Tips ── */}
        <div className="ft-card">
          <h2 className="ft-card-title">📅 {t(lang, "tipsTitle")}</h2>
          <p className="ft-card-sub">{t(lang, "tipsSubtitle")}</p>
          
          <div className="tips-accordion">
            {Object.entries(SEASON_TIPS_KEYS).map(([season, keys]) => (
              <details key={season} className="tips-details" open={season === "Monsoon"}>
                <summary className="tips-summary">
                  {t(lang, `tips${season}`)}
                </summary>
                <div style={{ background: "#fff" }}>
                  <ul className="tips-list">
                    {keys.map(k => (
                      <li key={k}>{t(lang, k)}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* ── Govt Schemes ── */}
        <div className="ft-card grid-col-2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <h2 className="ft-card-title" style={{ marginBottom: "0.4rem" }}>🏛️ {t(lang, "schemesTitle")}</h2>
              <p className="ft-card-sub" style={{ margin: 0 }}>{t(lang, "schemesSubtitle")}</p>
            </div>
            <div className="scheme-filters" style={{ marginBottom: 0 }}>
              {["All", "Energy", "Income", "Insure", "Subsidy"].map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${activeCat === cat ? 'active' : ''}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {t(lang, `filter${cat}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="schemes-list">
            {filteredSchemes.map(s => (
              <details key={s.id} className="scheme-item">
                <summary className="scheme-header">
                  <div className="scheme-info">
                    <span className="scheme-cat">{t(lang, `filter${s.category}`)}</span>
                    <h4 className="scheme-name">{t(lang, s.id)}</h4>
                  </div>
                  <div className="scheme-saving">
                    {t(lang, "schemeSaving")} <br/> <strong>{s.saving}</strong>
                  </div>
                </summary>
                <div className="scheme-body">
                  <p><strong>{t(lang, "applyHow")}:</strong> {t(lang, `${s.id}-desc`)}</p>
                  <button className="crec-run-btn" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", marginTop: "0.75rem", boxShadow: "none" }}>
                    Apply Online →
                  </button>
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
