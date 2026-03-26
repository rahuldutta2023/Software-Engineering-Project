import { useState } from "react";
import { t } from "../i18n";
import "./QuickLogCard.css";

const API = "http://localhost:8000/api";

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

const TRANSPORT_OPTIONS = [
  { key: "car",     emoji: "🚗", fuelType: "Petrol" },
  { key: "bike",    emoji: "🛵", fuelType: "Petrol" },
  { key: "walked",  emoji: "🚶", fuelType: null     },
  { key: "tractor", emoji: "🚜", fuelType: "Diesel" },
  { key: "auto",    emoji: "🛺", fuelType: "Petrol" },
];

export default function QuickLogCard({ lang = "en", darkMode = false, onLogSaved }) {
  const today = new Date().toISOString().slice(0, 10);

  const [transport,   setTransport]   = useState(null);
  const [diesel,      setDiesel]      = useState(0);
  const [electric,    setElectric]    = useState(0);
  const [water,       setWater]       = useState(0);
  const [gas,         setGas]         = useState(0);
  const [saving,      setSaving]      = useState(false);
  const [toast,       setToast]       = useState(null);
  const [toastType,   setToastType]   = useState("ok");

  const showTransportFuel = transport && transport.fuelType !== null && transport.key !== "walked";

  const showToast = (msg, type = "ok") => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const toLog = [];

      // Fuel / transport
      if (transport && showTransportFuel && diesel > 0) {
        toLog.push(apiFetch("/consumption/fuel", {
          method: "POST",
          body: JSON.stringify({
            date:            today,
            fuel_type:       transport.fuelType,
            quantity_liters: diesel,
            vehicle_type:    transport.key,
          }),
        }));
      }

      // Electricity
      if (electric > 0) {
        toLog.push(apiFetch("/consumption/electricity", {
          method: "POST",
          body: JSON.stringify({ date: today, units_kwh: electric, source: "Grid" }),
        }));
      }

      // Water
      if (water > 0) {
        toLog.push(apiFetch("/consumption/water", {
          method: "POST",
          body: JSON.stringify({ date: today, liters_used: water }),
        }));
      }

      // Gas
      if (gas > 0) {
        toLog.push(apiFetch("/consumption/gas", {
          method: "POST",
          body: JSON.stringify({ date: today, gas_type: "LPG", quantity_kg: gas, purpose: "Cooking" }),
        }));
      }

      if (toLog.length === 0 && transport) {
        // At minimum record a walk (0-emission)
        if (transport.key === "walked") {
          showToast(t(lang, "logSaved"), "ok");
          setSaving(false);
          if (onLogSaved) onLogSaved();
          return;
        }
      }

      await Promise.all(toLog);
      showToast(t(lang, "logSaved"), "ok");

      // Reset
      setTransport(null);
      setDiesel(0);
      setElectric(0);
      setWater(0);
      setGas(0);

      if (onLogSaved) onLogSaved();
    } catch {
      showToast(t(lang, "logError"), "err");
    }
    setSaving(false);
  };

  return (
    <div className={`ql-card${darkMode ? " dark" : ""}`}>
      <p className="ql-title">🌾 {t(lang, "quickLogTitle")}</p>

      {toast && (
        <div className={`ql-toast${toastType === "err" ? " err" : ""}`}>
          {toast}
        </div>
      )}

      {/* ── Transport picker ── */}
      <p className="ql-section-label">{t(lang, "howTravel")}</p>
      <div className="ql-transport-row">
        {TRANSPORT_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={`ql-transport-btn${transport?.key === opt.key ? " selected" : ""}`}
            onClick={() => setTransport(transport?.key === opt.key ? null : opt)}
          >
            <span className="ql-transport-emoji">{opt.emoji}</span>
            <span className="ql-transport-label">{t(lang, opt.key)}</span>
          </button>
        ))}
      </div>

      {/* ── Diesel / fuel stepper ── */}
      {showTransportFuel && (
        <div className="ql-section">
          <p className="ql-section-label">{t(lang, "dieselLabel")}</p>
          <div className="ql-stepper">
            <button className="ql-step-btn" onClick={() => setDiesel(v => Math.max(0, +(v - 1).toFixed(1)))}>−</button>
            <span className="ql-step-val">{diesel.toFixed(1)}</span>
            <button className="ql-step-btn" onClick={() => setDiesel(v => +(v + 1).toFixed(1))}>+</button>
          </div>
        </div>
      )}

      {/* ── Other resources (compact) ── */}
      <div className="ql-resources-grid">
        <div className="ql-resource-row">
          <span className="ql-resource-icon">⚡</span>
          <span className="ql-resource-lbl">{t(lang, "electricLabel")}</span>
          <div className="ql-mini-stepper">
            <button onClick={() => setElectric(v => Math.max(0, +(v - 1).toFixed(0)))}>−</button>
            <span>{electric}</span>
            <button onClick={() => setElectric(v => +(v + 1).toFixed(0))}>+</button>
          </div>
        </div>

        <div className="ql-resource-row">
          <span className="ql-resource-icon">💧</span>
          <span className="ql-resource-lbl">{t(lang, "waterLabel")}</span>
          <div className="ql-mini-stepper">
            <button onClick={() => setWater(v => Math.max(0, +(v - 10).toFixed(0)))}>−</button>
            <span>{water}</span>
            <button onClick={() => setWater(v => +(v + 10).toFixed(0))}>+</button>
          </div>
        </div>

        <div className="ql-resource-row">
          <span className="ql-resource-icon">🔥</span>
          <span className="ql-resource-lbl">{t(lang, "gasLabel")}</span>
          <div className="ql-mini-stepper">
            <button onClick={() => setGas(v => Math.max(0, +(v - 0.1).toFixed(1)))}>−</button>
            <span>{gas.toFixed(1)}</span>
            <button onClick={() => setGas(v => +(v + 0.1).toFixed(1))}>+</button>
          </div>
        </div>
      </div>

      {/* ── Save button ── */}
      <button
        className="ql-save-btn"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "…" : t(lang, "saveLog")}
      </button>
    </div>
  );
}
