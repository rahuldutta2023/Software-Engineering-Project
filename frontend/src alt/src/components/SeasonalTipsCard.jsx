import { t } from "../i18n";

/* ── Tips database ── */
const TIPS = {
  summer: {
    labelKey: "tipsSummer",
    color: "#f59e0b",
    bg:    "#fffbeb",
    icon:  "☀️",
    items: [
      { emoji: "💧", tip: "Use drip or sprinkler irrigation — saves 40% water compared to flood irrigation." },
      { emoji: "🌲", tip: "Plant trees along field borders — provides shade and reduces soil temperature." },
      { emoji: "⏰", tip: "Water crops in the early morning or after sunset to cut evaporation losses." },
      { emoji: "🌾", tip: "Grow short-duration cover crops between rows to protect and enrich the soil." },
    ],
  },
  monsoon: {
    labelKey: "tipsMonsoon",
    color: "#3b82f6",
    bg:    "#eff6ff",
    icon:  "🌧️",
    items: [
      { emoji: "🪣", tip: "Build a small farm pond to harvest rainwater for irrigation in dry months." },
      { emoji: "🌿", tip: "Sow green manure crops like Dhaincha — improves soil fertility naturally." },
      { emoji: "🚜", tip: "Service your tractor now — poor maintenance reduces fuel efficiency by 15–20%." },
      { emoji: "🐛", tip: "Use neem-based pesticides — safer for soil, cheaper, and eco-friendly." },
    ],
  },
  post_monsoon: {
    labelKey: "tipsPostMonsoon",
    color: "#8b5cf6",
    bg:    "#f5f3ff",
    icon:  "🍂",
    items: [
      { emoji: "🚫🔥", tip: "Do not burn crop stubble — it destroys soil microbes and causes heavy air pollution." },
      { emoji: "♻️", tip: "Compost crop residue using heap method — ready in 45 days, saves ₹800–₹2,000 on fertiliser." },
      { emoji: "🌱", tip: "Sow rabi crops with recommended row spacing to improve yield by 10–15%." },
      { emoji: "🐄", tip: "Mix jaggery-water with crop residue to feed cattle — boosts milk production." },
    ],
  },
  winter: {
    labelKey: "tipsWinter",
    color: "#10b981",
    bg:    "#ecfdf5",
    icon:  "❄️",
    items: [
      { emoji: "🌿", tip: "Apply mulch (dry leaves, straw) around crops — retains moisture, reduces watering." },
      { emoji: "🐝", tip: "Keep beehives near mustard or sunflower fields — pollination boosts yield by 20%." },
      { emoji: "💧", tip: "Inspect drip pipes for blockage before summer season — cheap to fix now, costly in May." },
      { emoji: "📋", tip: "Get soil health card test done now — plan fertiliser correctly for the next season." },
    ],
  },
};

function getCurrentSeason() {
  const m = new Date().getMonth() + 1; // 1–12
  if (m >= 3 && m <= 5)  return "summer";
  if (m >= 6 && m <= 9)  return "monsoon";
  if (m >= 10 && m <= 11) return "post_monsoon";
  return "winter";
}

export default function SeasonalTipsCard({ lang = "en" }) {
  const currentKey = getCurrentSeason();
  const seasons    = Object.entries(TIPS);
  const currentIdx = seasons.findIndex(([k]) => k === currentKey);

  /* Show current season first, then others below as "coming up" */
  const ordered = [
    seasons[currentIdx],
    ...seasons.filter((_, i) => i !== currentIdx),
  ];

  return (
    <div className="ft-card">
      <p className="ft-card-title">🌤️ {t(lang, "tipsTitle")}</p>
      <p className="ft-sublabel">{t(lang, "tipsSubtitle")}</p>

      {ordered.map(([key, season], idx) => (
        <div
          key={key}
          className={`season-block${idx === 0 ? " current" : " upcoming"}`}
          style={idx === 0 ? { borderColor: season.color, background: season.bg } : {}}
        >
          {/* Season header */}
          <div className="season-header">
            <span className="season-icon" style={idx === 0 ? { background: season.color } : {}}>
              {season.icon}
            </span>
            <div>
              <p className="season-name" style={idx === 0 ? { color: season.color } : {}}>
                {t(lang, season.labelKey)}
              </p>
              {idx === 0 && (
                <span className="season-now-badge" style={{ background: season.color }}>
                  Now
                </span>
              )}
            </div>
          </div>

          {/* Tips — only show for current season fully, others collapsed */}
          {idx === 0 && (
            <div className="season-tips">
              {season.items.map((item, i) => (
                <div key={i} className="tip-item">
                  <span className="tip-emoji">{item.emoji}</span>
                  <p className="tip-text">{item.tip}</p>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming – show only first tip as preview */}
          {idx > 0 && (
            <p className="season-preview">
              {season.items[0].emoji} {season.items[0].tip.slice(0, 70)}…
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
