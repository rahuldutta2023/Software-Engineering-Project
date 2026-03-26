import { useState, useEffect } from "react";
import SocialProofCard from "./components/SocialProofCard";
import NatureCard      from "./components/NatureCard";
import GoalCard        from "./components/GoalCard";
import ActionsCard     from "./components/ActionsCard";
import WeatherCard     from "./components/WeatherCard";
import EmissionsChart  from "./components/EmissionsChart";
import QuickLogCard    from "./components/QuickLogCard";
import SavingsCard     from "./components/SavingsCard";
import { LANGUAGES, t } from "./i18n";
import './Dashboard.css';

const API = "/api";

function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("token");
  return fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  });
}

function SummaryPill({ label, value, icon }) {
  return (
    <div className="dash-pill">
      <div className="dash-pill-icon">{icon}</div>
      <div className="dash-pill-info">
        <p className="dash-pill-label">{label}</p>
        <p className="dash-pill-value">{value}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const name = localStorage.getItem("full_name") || localStorage.getItem("name") || "User";
  const [dash,     setDash]     = useState(null);
  const [actions,  setActions]  = useState({ completed: [], pending: [] });
  const [darkMode, setDarkMode] = useState(false);
  const [loading,  setLoading]  = useState(true);
  const [lang,     setLang]     = useState(() => localStorage.getItem("ct_lang") || "en");
  const [langOpen, setLangOpen] = useState(false);

  const handleLangChange = (code) => {
    setLang(code);
    localStorage.setItem("ct_lang", code);
    setLangOpen(false);
  };

  const loadAll = async () => {
    setLoading(true);
    try {
      const [d, a] = await Promise.all([
        apiFetch("/dashboard/").then(r => r.json()),
        apiFetch("/actions/me").then(r => r.json()),
      ]);
      setDash(d);
      setActions(a);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langOpen]);

  const downloadReport = () => {
    const token = localStorage.getItem("token");
    fetch(`${API}/reports/monthly`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href    = url;
        a.download = `carbon_report_${new Date().toISOString().slice(0, 7)}.pdf`;
        a.click();
      });
  };

  const handleSetGoal = async (budget) => {
    await apiFetch("/goals/", { method: "POST", body: JSON.stringify({ monthly_budget_kg: budget }) });
    loadAll();
  };

  const handleCompleteAction = async (actionId) => {
    const res  = await apiFetch("/actions/complete", { method: "POST", body: JSON.stringify({ action_id: actionId }) });
    const data = await res.json();
    loadAll();
    return data;
  };

  if (loading) return (
    <div className={`dash-page${darkMode ? " dark" : ""}`}>
      <div className="c-loading" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem" }}>
        <span className="crec-spinner" style={{ borderTopColor: "#3B6D11", width:30, height:30 }} />
      </div>
    </div>
  );

  const incentive  = dash?.incentive;
  const breakdown  = dash?.kpis?.map(k => ({ resource: k.category, co2_kg: k.co2_kg })) || [];
  const period     = new Date().toLocaleString(lang === "en" ? "default" : lang, { month: "long", year: "numeric" });
  const savings    = dash?.rupee_savings;

  return (
    <div className={`dash-page${darkMode ? " dark" : ""}`}>
      {/* ── Navbar ── */}
      <header className="c-navbar">
        <div className="c-navbar-brand">
          <div className="c-navbar-brand-dot">🌿</div>
          {t(lang, "appName")}
        </div>

        <div className="c-navbar-right">
          <span className="c-navbar-stat">
            {incentive?.eco_points || 0} pts · #{incentive?.rank || "—"}
          </span>

          <div className="lang-picker" onClick={e => e.stopPropagation()}>
            <button className="lang-trigger" onClick={() => setLangOpen(v => !v)}>
              🌐 {LANGUAGES[lang]}
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {Object.entries(LANGUAGES).map(([code, label]) => (
                  <button key={code} className={`lang-option${lang === code ? " active" : ""}`} onClick={() => handleLangChange(code)}>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="btn-sm-dark" onClick={downloadReport}>📄 {t(lang, "report")}</button>
          <button className="btn-icon" onClick={() => setDarkMode(!darkMode)}>{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </header>

      {/* ── Hero section ── */}
      <div className="dash-hero">
        <div className="dash-hero-inner">
          <p className="dash-greeting">{t(lang, "greeting")}, {name.split(" ")[0]} 👋</p>
          <p className="dash-sub">{period} · {t(lang, "period")}</p>
          
          <div className="summary-pills">
            <SummaryPill 
              label={t(lang, "tileCo2")} 
              value={`${(dash?.total_co2 || 0).toFixed(1)} kg`} 
              icon="💨" 
            />
            <SummaryPill 
              label={t(lang, "tileSavings")} 
              value={`₹${Math.round(savings?.rupee_savings || 0).toLocaleString("en-IN")}`} 
              icon="💰" 
            />
            <SummaryPill 
              label={t(lang, "tilePoints")} 
              value={incentive?.eco_points || 0} 
              icon="⭐" 
            />
            {/* We can still keep Rank for internal motivation even if leaderboard is gone */}
            <SummaryPill 
              label={t(lang, "tileRank")} 
              value={`#${incentive?.rank || "—"}`} 
              icon="🏅" 
            />
          </div>
        </div>
      </div>

      <div className="dash-content">
        <div className="dash-grid">
          <div className="grid-col-8">
            <QuickLogCard lang={lang} darkMode={darkMode} onLogSaved={loadAll} />
          </div>

          <div className="grid-col-4">
            <SavingsCard savings={savings} lang={lang} darkMode={darkMode} />
          </div>

          <div className="grid-col-8">
            <EmissionsChart  breakdown={breakdown} />
          </div>
          
          <div className="grid-col-4">
             <GoalCard goal={dash?.goal_status} onSetGoal={handleSetGoal} lang={lang} />
          </div>

          <div className="grid-col-6">
            <WeatherCard weather={dash?.weather} lang={lang} />
          </div>

          <div className="grid-col-6">
            <SocialProofCard data={dash?.social_proof} lang={lang} />
          </div>

          <NatureCard data={dash?.nature_equivalents} lang={lang} />

          <div className="grid-col-12">
            <ActionsCard
              completed={actions.completed || []}
              pending={actions.pending   || []}
              onComplete={handleCompleteAction}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
