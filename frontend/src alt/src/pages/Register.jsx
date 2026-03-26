import { useState } from "react";
import { t } from "../i18n";
import './auth.css';

/* API is now accessed via Vite proxy on /api */
const API    = "/api";
const CITIES = ["Bengaluru","Delhi","Mumbai","Chennai","Hyderabad","Pune","Kolkata"];

export default function Register({ onRegister, onNavigate, lang = "en" }) {
  const [form,    setForm]    = useState({ full_name:"", email:"", password:"", city:"", household_size:"" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API}/auth/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, household_size: parseInt(form.household_size) }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) { setError(data.detail || "Registration failed"); return; }
      onRegister(data);
    } catch (e) {
      setError("Registration error");
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="auth-logo-icon">🌱</div>
          <h1>{t(lang, "authCreate")}</h1>
          <p>{t(lang, "authJoinMsg")}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-space">
          <div>
            <label className="auth-label">{t(lang, "authFullName")}</label>
            <input
              className="auth-input"
              type="text"
              value={form.full_name}
              onChange={e => update("full_name", e.target.value)}
              placeholder="Ravi Kumar"
            />
          </div>
          <div>
            <label className="auth-label">{t(lang, "authEmail")}</label>
            <input
              className="auth-input"
              type="email"
              value={form.email}
              onChange={e => update("email", e.target.value)}
              placeholder="ravi@example.com"
            />
          </div>
          <div>
            <label className="auth-label">{t(lang, "authPass")}</label>
            <input
              className="auth-input"
              type="password"
              value={form.password}
              onChange={e => update("password", e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="auth-label">{t(lang, "authCity")}</label>
            <select className="auth-input" value={form.city} onChange={e => update("city", e.target.value)}>
              <option value="">{t(lang, "lbSelectCity") || "Select city"}</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="auth-label">{t(lang, "authHouseSize")}</label>
            <select className="auth-input" value={form.household_size} onChange={e => update("household_size", e.target.value)}>
              <option value="">{t(lang, "authHouseSize")}</option>
              {[1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={loading || Object.values(form).some(v => !v)}
          >
            {loading ? "..." : t(lang, "authSignUp")}
          </button>
        </div>

        <p className="auth-footer">
          {t(lang, "authHasAcc")}{" "}
          <button onClick={() => onNavigate("login")}>{t(lang, "authSignIn")}</button>
        </p>
      </div>
    </div>
  );
}
