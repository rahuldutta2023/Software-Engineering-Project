import { useState } from "react";
import { t } from '../i18n';
import './components.css';

export default function GoalCard({ goal, onSetGoal, lang = "en" }) {
  const [budget, setBudget] = useState(goal?.monthly_budget_kg || 400);
  
  if (!goal) return (
    <div className="c-card">
      <p className="c-card-title">{t(lang, "cmpGoal")}</p>
      <div className="goal-input-row">
        <label>{t(lang, "cmpSetBudget")}</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px' }}>
          <input
            className="goal-input"
            type="number"
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
          />
          <button className="btn-sm" onClick={() => onSetGoal(budget)}>Save</button>
        </div>
      </div>
      <p className="goal-footer">Set a goal to start tracking!</p>
    </div>
  );

  const { monthly_budget_kg, current_co2_kg, status, alert_message } = goal;
  const percent = Math.round((current_co2_kg / monthly_budget_kg) * 100);
  const isOver  = status === "EXCEEDED";

  return (
    <div className="c-card">
      <p className="c-card-title">{t(lang, "cmpGoal")}</p>

      <div className="goal-input-row">
        <label>{t(lang, "cmpSetBudget")}</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px' }}>
          <input
            className="goal-input"
            type="number"
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
          />
          <button className="btn-sm" onClick={() => onSetGoal(budget)}>Save</button>
        </div>
      </div>

      <div className="goal-progress-box">
        <div className="goal-progress-header">
          <span>{current_co2_kg?.toFixed(1)} / {monthly_budget_kg} kg</span>
          <span className={isOver ? "text-red" : "text-green"}>{percent}%</span>
        </div>
        <div className="goal-progress-track">
          <div
            className={`goal-progress-fill ${isOver ? "bg-red" : "bg-green"}`}
            style={{ width: `${Math.min(100, percent)}%` }}
          />
        </div>
      </div>

      <p className="goal-footer">
        {alert_message}
      </p>
    </div>
  );
}
