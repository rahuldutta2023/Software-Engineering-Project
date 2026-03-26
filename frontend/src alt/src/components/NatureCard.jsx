import { t } from '../i18n';
import './components.css';

export default function NatureCard({ data, lang = "en" }) {
  if (!data) return null;
  // Backend keys: trees_to_offset, smartphone_hours_saved, excess_kg, saved_kg
  const { trees_to_offset, smartphone_hours_saved, excess_kg, saved_kg } = data;
  
  const isGood = saved_kg > 0;
  const status = isGood ? "High" : "Low";
  const color  = isGood ? "#2ecc71" : "#e74c3c";
  const emoji  = isGood ? "🟢" : "🔴";

  return (
    <div className="c-card">
      <div className="c-card-title">{t(lang, "cmpNature")}</div>

      <div className="nature-score-row">
        <div className="nature-emoji">{emoji}</div>
        <div>
          <p className="nature-status" style={{ color }}>{status}</p>
          <p className="nature-net">
            {isGood ? `- ${saved_kg.toFixed(1)}` : `+ ${excess_kg.toFixed(1)}`} kg CO₂
          </p>
        </div>
      </div>

      <div className="nature-meter-box">
        <div className="nature-meter-header">
          <span>{isGood ? "Offsetting Footprint" : "Carbon Sink Needed"}</span>
        </div>
        <div className="nature-meter-track">
          <div
            className="nature-meter-fill"
            style={{ 
              width: isGood ? "100%" : `${Math.min(100, (excess_kg / 100) * 100)}%`,
              backgroundColor: color 
            }}
          />
        </div>
      </div>

      <p className="nature-footer-text">
        {trees_to_offset > 0 ? (
          <>🌳 {t(lang, "cropTreeTitle")}: <strong>{trees_to_offset} {t(lang, "cropAcres")}</strong></>
        ) : (
          <>📱 {smartphone_hours_saved} {t(lang, "cmpEarned")} hrs</>
        )}
      </p>
    </div>
  );
}
