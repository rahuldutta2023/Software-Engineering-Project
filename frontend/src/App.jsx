import React, { useMemo, useState } from "react";
import "./index.css";
import "./styles/AppShell.css";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import Login from "./pages/Login";
import FarmerTools from "./pages/FarmerTools";
import CropRecommend from "./pages/CropRecommend";
import History from "./pages/History";
import Dashboard from "./Dashboard";
import { t } from "./i18n";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const [page, setPage] = useState("dashboard");
  const isAuthed = useMemo(() => Boolean(localStorage.getItem("token")), []);
  const [lang, setLang] = useState(() => localStorage.getItem("ct_lang") || "en");

  const handleChangeLang = (next) => {
    setLang(next);
    localStorage.setItem("ct_lang", next);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("full_name");
    localStorage.removeItem("user_email");
    setPage("dashboard");
    // Force re-render by reloading page state
    window.location.reload();
  };

  if (!isAuthed) {
    return (
      <div className="app-shell" data-theme={theme}>
        <div className="app-content app-pad-bottom">
          <Login
            theme={theme}
            onToggleTheme={toggleTheme}
            lang={lang}
            onChangeLang={handleChangeLang}
            onLogin={() => {
              setPage("dashboard");
              window.location.reload();
            }}
          />
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: t(lang, "navDashboard"), icon: "🌾" },
    { id: "farmertools", label: t(lang, "navTools"), icon: "🧰", farmerTab: true },
    { id: "croprecommend", label: t(lang, "navCropAI"), icon: "🧪" },
    { id: "history", label: t(lang, "navHistory"), icon: "📈" },
  ];

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="app-content app-pad-bottom">
        <Header theme={theme} onToggleTheme={toggleTheme} lang={lang} onChangeLang={handleChangeLang} />

        <div style={{ paddingTop: 0 }}>
          {page === "dashboard" && <Dashboard theme={theme} lang={lang} />}
          {page === "farmertools" && <FarmerTools lang={lang} />}
          {page === "croprecommend" && <CropRecommend theme={theme} lang={lang} />}
          {page === "history" && <History lang={lang} />}
        </div>

        <BottomNav
          active={page}
          items={navItems.concat([{ id: "logout", label: t(lang, "navLogout"), icon: "🚪" }])}
          onNavigate={(id) => {
            if (id === "logout") handleLogout();
            else setPage(id);
          }}
        />
      </div>
    </div>
  );
}

export default App;
