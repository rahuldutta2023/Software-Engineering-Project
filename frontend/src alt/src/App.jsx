import { useState } from "react";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import Dashboard      from "./Dashboard";
import History        from "./pages/History";
import FarmerTools    from "./pages/FarmerTools";
import CropRecommend  from "./pages/CropRecommend";
import { t }          from "./i18n";
import './Dashboard.css';

export default function App() {
  const [page, setPage] = useState(localStorage.getItem("token") ? "dashboard" : "login");
  const [lang, setLang] = useState(() => localStorage.getItem("ct_lang") || "en");

  /* Keep lang in sync when Dashboard changes it via localStorage */
  const syncLang = () => setLang(localStorage.getItem("ct_lang") || "en");

  const handleLogin    = () => { syncLang(); setPage("dashboard"); };
  const handleRegister = () => setPage("login");
  const handleLogout   = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("full_name");
    setPage("login");
  };

  if (page === "login")    return <Login onLogin={handleLogin} onNavigate={setPage} lang={lang} />;
  if (page === "register") return <Register onRegister={handleRegister} onNavigate={setPage} lang={lang} />;

  const tabs = [
    { id: "dashboard",     label: t(lang, "navDashboard"),     icon: "🏠" },
    { id: "farmertools",   label: t(lang, "navFarmerTools"),   icon: "🌾" },
    { id: "croprecommend", label: "Crop AI",                   icon: "🧪" },
    { id: "history",       label: t(lang, "navHistory"),       icon: "📈" },
  ];

  return (
    <div>
      {page === "dashboard"     && <Dashboard onNavigate={setPage} />}
      {page === "farmertools"   && <FarmerTools lang={lang} />}
      {page === "croprecommend" && <CropRecommend lang={lang} />}
      {page === "history"       && <History lang={lang} />}

      <nav className="c-bottom-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { syncLang(); setPage(tab.id); }}
            className={`c-nav-item${(tab.id === "farmertools" || tab.id === "croprecommend") ? " farmer-tab" : ""}${page === tab.id ? " active" : ""}`}
          >
            <span className="c-nav-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        <button onClick={handleLogout} className="c-nav-item">
          <span className="c-nav-icon">🚪</span>
          {t(lang, "navLogout")}
        </button>
      </nav>
    </div>
  );
}
