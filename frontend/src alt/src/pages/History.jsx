import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { t } from "../i18n";
import './History.css';

const API = "/api";

function apiFetch(path) {
  const token = localStorage.getItem("token");
  return fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default function History({ lang = "en" }) {
  const [data, setData]           = useState([]);
  const [summary, setSummary]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [chartType, setChartType] = useState("area");

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiFetch("/emissions/monthly")
      .then(r => {
        if (!r.ok) throw new Error(`Server returned ${r.status}`);
        return r.json();
      })
      .then(monthlyData => {
        const sorted = [...monthlyData].sort((a, b) => a.period.localeCompare(b.period));
        setData(sorted);

        if (sorted.length > 0) {
          const totalCo2 = sorted.reduce((s, r) => s + (r.total_co2 || 0), 0);
          const avgCo2   = totalCo2 / sorted.length;
          const best     = sorted.reduce((mn, r) => (r.total_co2 < mn.total_co2 ? r : mn), sorted[0]);
          setSummary({ total_co2: totalCo2, avg_co2: avgCo2, best_month: best.period, months: sorted.length });
        } else {
          setSummary({ total_co2: 0, avg_co2: 0, best_month: "—", months: 0 });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("History load error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="hist-page">
      <div className="hist-hero"><h1 className="hist-hero-title">📈 {t(lang, "navHistory")}</h1></div>
      <div className="hist-center-state">
        <div className="hist-spinner" />
        <p className="hist-state-msg">Loading your footprint history…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="hist-page">
      <div className="hist-hero"><h1 className="hist-hero-title">📈 {t(lang, "navHistory")}</h1></div>
      <div className="hist-center-state">
        <span className="hist-state-icon">⚠️</span>
        <h3 className="hist-state-title">Could not load history</h3>
        <p className="hist-state-msg">{error}</p>
        <p className="hist-state-sub">Make sure you have logged at least one emission entry from the Dashboard.</p>
      </div>
    </div>
  );

  if (data.length === 0) return (
    <div className="hist-page">
      <div className="hist-hero">
        <h1 className="hist-hero-title">📈 {t(lang, "navHistory")}</h1>
        <p className="hist-hero-sub">Your monthly carbon footprint over time</p>
      </div>
      <div className="hist-center-state">
        <span className="hist-state-icon">🌱</span>
        <h3 className="hist-state-title">No data yet</h3>
        <p className="hist-state-msg">Start logging your daily resource usage from the Dashboard to see your history here.</p>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const val = payload[0].value;
    return (
      <div className="hist-tooltip">
        <p className="hist-tt-period">{label}</p>
        <p className="hist-tt-val">{val?.toFixed(1)} <span>kg CO₂</span></p>
        <p className="hist-tt-badge" style={{ color: val < 400 ? "#3B6D11" : "#c0392b" }}>
          {val < 400 ? "✅ Below average" : "⚠️ Above average"}
        </p>
      </div>
    );
  };

  return (
    <div className="hist-page">
      {/* Hero */}
      <div className="hist-hero">
        <h1 className="hist-hero-title">📈 {t(lang, "navHistory")}</h1>
        <p className="hist-hero-sub">Your monthly carbon footprint over time</p>
      </div>

      <div className="hist-content">
        {/* Summary Strip */}
        <div className="hist-summary-grid">
          {[
            { icon: "💨", label: "Total CO₂",    val: `${summary?.total_co2?.toFixed(1)} kg`, sub: "lifetime tracked",  accent: true },
            { icon: "📅", label: "Monthly Avg",  val: `${summary?.avg_co2?.toFixed(1)} kg`,   sub: "per month" },
            { icon: "🏆", label: "Best Month",   val: summary?.best_month,                     sub: "lowest footprint",  green: true },
            { icon: "🔢", label: "Months Logged",val: summary?.months,                         sub: "data points" },
          ].map(s => (
            <div key={s.label} className={`hist-stat-card ${s.accent ? "accent" : s.green ? "green" : ""}`}>
              <span className="hist-stat-icon">{s.icon}</span>
              <div>
                <p className="hist-stat-label">{s.label}</p>
                <p className="hist-stat-val">{s.val}</p>
                <p className="hist-stat-sub">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Card */}
        <div className="hist-card">
          <div className="hist-card-header">
            <h3 className="hist-card-title">CO₂ Trend</h3>
            <div className="hist-chart-toggle">
              <button className={`hist-toggle-btn ${chartType === "area" ? "active" : ""}`} onClick={() => setChartType("area")}>Area</button>
              <button className={`hist-toggle-btn ${chartType === "bar"  ? "active" : ""}`} onClick={() => setChartType("bar")}>Bar</button>
            </div>
          </div>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              {chartType === "area" ? (
                <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3B6D11" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B6D11" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8f0e0" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="total_co2" stroke="#3B6D11" strokeWidth={2.5} fillOpacity={1} fill="url(#histGrad)" />
                </AreaChart>
              ) : (
                <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8f0e0" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#999", fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total_co2" fill="#3B6D11" radius={[6, 6, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="hist-card">
          <h3 className="hist-card-title">Month-by-Month Breakdown</h3>
          <div className="hist-table-wrap">
            <table className="hist-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>CO₂ (kg)</th>
                  <th>vs. Avg</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...data].reverse().map(row => {
                  const diff = row.total_co2 - (summary?.avg_co2 || 0);
                  return (
                    <tr key={row.period}>
                      <td className="hist-td-period">{row.period}</td>
                      <td className="hist-td-co2">{row.total_co2?.toFixed(1)}</td>
                      <td className={`hist-td-diff ${diff <= 0 ? "good" : "bad"}`}>
                        {diff <= 0 ? "▼" : "▲"} {Math.abs(diff).toFixed(1)}
                      </td>
                      <td>
                        <span className={`hist-badge ${row.total_co2 < 400 ? "low" : "high"}`}>
                          {row.total_co2 < 400 ? "✅ Good" : "⚠️ High"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
