import { t } from '../i18n';
import './components.css';

export default function ActionsCard({ completed = [], pending = [], onComplete, lang = "en" }) {
  const allActions = [...pending, ...completed];

  return (
    <div className="c-card eco-actions">
      <p className="c-card-title">🍃 {t(lang, "cmpActions")}</p>

      <div className="actions-list">
        {pending.map(action => (
          <div key={action.id} className="action-row pending">
            <div className="action-info">
              {/* Backend key is 'task', previously assumed 'name' */}
              <p className="action-name">{action.task}</p>
              <p className="action-impact">+{action.points} {t(lang, "cmpEarned")}</p>
            </div>
            <button
              className="action-btn"
              onClick={() => onComplete(action.id)}
            >
              Done!
            </button>
          </div>
        ))}

        {completed.map(action => (
          <div key={action.id} className="action-row completed">
            <div className="action-info">
              <p className="action-name">{action.task}</p>
              <p className="action-impact">+{action.points} {t(lang, "cmpEarned")}</p>
            </div>
            <span className="action-check">✓</span>
          </div>
        ))}

        {allActions.length === 0 && (
          <p className="c-loading">No actions available right now.</p>
        )}
      </div>
    </div>
  );
}
