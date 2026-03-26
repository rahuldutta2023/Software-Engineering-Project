import { useState } from "react";
import { t } from "../i18n";

/* ── CO₂ sequestration rate: kg per acre per growing season (approx.) ── */
const CROPS = [
  { key: "rice",       emoji: "🌾", seq: 320 },
  { key: "wheat",      emoji: "🌿", seq: 280 },
  { key: "maize",      emoji: "🌽", seq: 350 },
  { key: "sugarcane",  emoji: "🎋", seq: 680 },
  { key: "cotton",     emoji: "🌸", seq: 220 },
  { key: "pulses",     emoji: "🫘", seq: 420 },
  { key: "vegetables", emoji: "🥬", seq: 180 },
];

export default function CropCarbonCard({ lang = "en" }) {
  const [crop,  setCrop]  = useState(null);
  const [acres, setAcres] = useState(2);

  const seq   = crop ? Math.round(crop.seq * acres)   : 0;
  const trees = crop ? Math.round(seq / 10.9)          : 0; // 1 tree ~10.9 kg CO₂/season

  return (
    <div className="ft-card">
      <p className="ft-card-title">🌾 {t(lang, "cropTitle")}</p>

      {/* Crop picker */}
      <p className="ft-label">{t(lang, "cropSelect")}</p>
      <div className="crop-grid">
        {CROPS.map(c => (
          <button
            key={c.key}
            className={`crop-btn${crop?.key === c.key ? " selected" : ""}`}
            onClick={() => setCrop(crop?.key === c.key ? null : c)}
          >
            <span className="crop-emoji">{c.emoji}</span>
            <span className="crop-name">{t(lang, c.key)}</span>
          </button>
        ))}
      </div>

      {/* Area stepper */}
      <div className="area-row">
        <p className="ft-label">{t(lang, "cropAreaLbl")}</p>
        <div className="area-stepper">
          <button
            className="area-btn"
            onClick={() => setAcres(a => Math.max(1, a - 1))}
          >−</button>
          <span className="area-val">{acres}</span>
          <button
            className="area-btn"
            onClick={() => setAcres(a => Math.min(200, a + 1))}
          >+</button>
          <span className="area-unit">{t(lang, "cropAcres")}</span>
        </div>
      </div>

      {/* Results */}
      {crop ? (
        <div className="crop-results">
          <div className="crop-result-row">
            <div className="crop-result-tile green">
              <span className="cr-icon">💨</span>
              <div>
                <p className="cr-val">{seq.toLocaleString()} kg</p>
                <p className="cr-lbl">{t(lang, "cropSeqTitle")}</p>
                <p className="cr-sub">{t(lang, "cropPerSeason")}</p>
              </div>
            </div>
            <div className="crop-result-tile blue">
              <span className="cr-icon">🌳</span>
              <div>
                <p className="cr-val">{trees}</p>
                <p className="cr-lbl">{t(lang, "cropTreeTitle")}</p>
                <p className="cr-sub">{t(lang, "cropPerSeason")}</p>
              </div>
            </div>
          </div>

          {/* Animated progress bar showing crop absorption as fraction of baseline */}
          <div className="crop-progress-wrap">
            <div
              className="crop-progress-bar"
              style={{ width: `${Math.min(100, Math.round((seq / 800) * 100))}%` }}
            />
          </div>
          <p className="crop-progress-label">
            {seq >= 400 ? t(lang, "cropGood") : t(lang, "cropOk")}
          </p>

          <div className="crop-tip-box">
            <span className="cr-tip-icon">💡</span>
            <p className="cr-tip-text">{t(lang, "cropTip")}</p>
          </div>
        </div>
      ) : (
        <div className="crop-empty">
          <span className="crop-empty-icon">☝️</span>
          <p>{t(lang, "cropSelect")}</p>
        </div>
      )}
    </div>
  );
}
