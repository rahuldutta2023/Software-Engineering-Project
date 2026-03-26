import { useState } from "react";
import { t } from "../i18n";

const SCHEMES = [
  {
    id: "kusum",
    emoji: "☀️",
    name: "PM-KUSUM",
    category: "energy",
    benefit: "90% subsidy on solar pump installation (up to 7.5 HP). Run your farm on free solar energy.",
    how: "Visit your state Agriculture Department or Krishi Vibhag office with land records & Aadhaar.",
    saving: "₹5,000 – ₹15,000/year on diesel",
  },
  {
    id: "gobar",
    emoji: "🐄",
    name: "Gobar-Dhan Yojana",
    category: "energy",
    benefit: "Turn cattle dung into biogas & organic fertiliser. Earn ₹500–₹2,000/month from waste.",
    how: "Contact your Swachh Bharat Mission (Grameen) block office or Gram Panchayat.",
    saving: "80% less LPG cost",
  },
  {
    id: "pmuy",
    emoji: "🔥",
    name: "PM Ujjwala Yojana",
    category: "subsidy",
    benefit: "Free LPG connection + subsidised first cylinder for BPL families.",
    how: "Apply at your nearest LPG distributor with Aadhaar card and ration card.",
    saving: "₹2,500 – ₹3,500 on connection",
  },
  {
    id: "pmfby",
    emoji: "🌧️",
    name: "PM Fasal Bima Yojana",
    category: "insurance",
    benefit: "Crop insurance — pay only 2% premium for Kharif crops, 1.5% for Rabi. Govt pays rest.",
    how: "Apply at your bank (where KCC loan is held) or nearest CSC before crop sowing.",
    saving: "Full compensation for crop loss",
  },
  {
    id: "pmkisan",
    emoji: "💰",
    name: "PM-Kisan Samman Nidhi",
    category: "income",
    benefit: "₹6,000 per year (₹2,000 every 4 months) directly in your bank account.",
    how: "Register at pmkisan.gov.in or nearest CSC with land ownership documents & Aadhaar.",
    saving: "₹6,000/year guaranteed",
  },
  {
    id: "nbs",
    emoji: "🌱",
    name: "NBS Fertiliser Subsidy",
    category: "subsidy",
    benefit: "Subsidised price on DAP, MOP, complex fertilisers and organic inputs.",
    how: "Buy from any authorised fertiliser dealer. Show your Soil Health Card for best rates.",
    saving: "20–40% off market price",
  },
];

const FILTERS = ["all", "energy", "income", "insurance", "subsidy"];

export default function GovtSchemesCard({ lang = "en" }) {
  const [filter, setFilter]   = useState("all");
  const [openId, setOpenId]   = useState(null);

  const filterKey = {
    all:       "filterAll",
    energy:    "filterEnergy",
    income:    "filterIncome",
    insurance: "filterInsure",
    subsidy:   "filterSubsidy",
  };

  const visible = SCHEMES.filter(s => filter === "all" || s.category === filter);

  return (
    <div className="ft-card">
      <p className="ft-card-title">🏛️ {t(lang, "schemesTitle")}</p>
      <p className="ft-sublabel">{t(lang, "schemesSubtitle")}</p>

      {/* Filter pills */}
      <div className="sch-filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`sch-filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {t(lang, filterKey[f])}
          </button>
        ))}
      </div>

      {/* Scheme cards */}
      <div className="sch-list">
        {visible.map(s => {
          const isOpen = openId === s.id;
          return (
            <div
              key={s.id}
              className={`sch-card${isOpen ? " open" : ""}`}
            >
              {/* Header row – always visible */}
              <button
                className="sch-header"
                onClick={() => setOpenId(isOpen ? null : s.id)}
              >
                <span className="sch-emoji">{s.emoji}</span>
                <div className="sch-head-text">
                  <p className="sch-name">{s.name}</p>
                  <p className="sch-saving-preview">
                    {t(lang, "schemeSaving")}: <strong>{s.saving}</strong>
                  </p>
                </div>
                <span className="sch-chevron">{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div className="sch-body">
                  <p className="sch-benefit">{s.benefit}</p>
                  <div className="sch-how-box">
                    <span className="sch-how-label">📋 {t(lang, "applyHow")}</span>
                    <p className="sch-how-text">{s.how}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
