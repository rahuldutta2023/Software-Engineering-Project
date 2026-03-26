import React, { useState } from "react";
import "../styles/FarmerToolsPage.css";
import { t } from "../i18n";

export default function FarmerTools({ lang = "en" }) {
  const [expanded, setExpanded] = useState("tips");

  const tips = [
    {
      id: "summer",
      title: "Summer (March - May)",
      items: [
        "Mulch your soil to reduce evaporation and keep roots cool.",
        "Irrigate early morning or late evening to save water.",
        "Use shade or windbreaks for young seedlings."
      ]
    },
    {
      id: "monsoon",
      title: "Monsoon (June - September)",
      items: [
        "Ensure proper drainage to prevent water-logging and root rot.",
        "Harvest and store rainwater where possible.",
        "Check pest pressure after heavy rainfall."
      ]
    },
    {
      id: "winter",
      title: "Winter (December - February)",
      items: [
        "Test soil pH and adjust inputs for better nutrient uptake.",
        "Plan crop rotation to reduce pest build-up.",
        "Use drip irrigation to minimize disease risk."
      ]
    }
  ];

  const schemes = [
    {
      title: "Soil Health & Fertility Programs",
      desc: "Support for soil testing, balanced fertilization, and organic input adoption."
    },
    {
      title: "Irrigation Efficiency Support",
      desc: "Incentives for drip/sprinkler systems and water-saving farm practices."
    },
    {
      title: "Crop Insurance & Risk Coverage",
      desc: "Assistance to manage losses due to drought, pests, or extreme weather."
    }
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">{t(lang, "heroToolsTitle")}</h1>
          <p className="page-hero-sub">{t(lang, "heroToolsSub")}</p>
        </div>
      </section>

      <main className="page-main">
        <div className="ft-layout">
          <div className="ft-col ft-col-7">
            <div className="content-card ft-card">
              <div className="ft-card-header">
                <h2 className="ft-card-title">Seasonal Farm Tips</h2>
                <p className="ft-card-sub">Tap a season to expand guidance.</p>
              </div>

              <div className="ft-accordion">
                {tips.map((t) => (
                  <div key={t.id} className={`ft-acc-item${expanded === t.id ? " open" : ""}`}>
                    <button
                      type="button"
                      className="ft-acc-summary"
                      onClick={() => setExpanded((cur) => (cur === t.id ? "" : t.id))}
                    >
                      <span>{t.title}</span>
                      <span className="ft-acc-chevron">{expanded === t.id ? "▲" : "▼"}</span>
                    </button>
                    {expanded === t.id && (
                      <div className="ft-acc-body">
                        <ul className="ft-bullets">
                          {t.items.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ft-col ft-col-5">
            <div className="content-card ft-card">
              <div className="ft-card-header">
                <h2 className="ft-card-title">Common Schemes</h2>
                <p className="ft-card-sub">Use these keywords when searching locally.</p>
              </div>

              <div className="ft-scheme-list">
                {schemes.map((s) => (
                  <div key={s.title} className="ft-scheme">
                    <h3 className="ft-scheme-title">{s.title}</h3>
                    <p className="ft-scheme-desc">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="ft-note">
                These are generic categories. For exact eligibility and documents, check your state agriculture department.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

