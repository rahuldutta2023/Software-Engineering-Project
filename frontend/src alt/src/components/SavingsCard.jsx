import { t } from "../i18n";
import "./components.css";

/**
 * SavingsCard
 * Shows money saved (₹) and tree equivalent prominently.
 * Props:
 *   savings   – { rupee_savings, trees_equivalent, tip_text }
 *   lang      – language code
 *   darkMode  – boolean
 */
export default function SavingsCard({ savings, lang = "en", darkMode = false }) {
  if (!savings) return null;

  const { rupee_savings = 0, trees_equivalent = 0, tip_text = "" } = savings;
  const trees  = Math.max(0, Math.round(trees_equivalent));
  const rupees = Math.max(0, Math.round(rupee_savings));

  /* build a row of tree emojis, max 5 */
  const treeRow = trees > 0
    ? Array.from({ length: Math.min(trees, 5) }, () => "🌳").join("")
    : "🌱";

  return (
    <div className="c-card savings-card">
      <p className="c-card-title">💰 {t(lang, "tileSavings")}</p>

      {/* Big ₹ number */}
      <div className="savings-main">
        <span className="savings-rupee">₹{rupees.toLocaleString("en-IN")}</span>
        <span className="savings-sub">{t(lang, "savedThisMonth")}</span>
      </div>

      {/* Trees row */}
      <div className="savings-trees-row">
        <span className="savings-trees-emoji">{treeRow}</span>
        <span className="savings-trees-label">
          {trees} {t(lang, "treesEquiv")}
        </span>
      </div>

      {/* Contextual tip */}
      {tip_text && (
        <div className="savings-tip">
          <span className="savings-tip-label">💡 {t(lang, "savingsTip")}:</span>
          <span className="savings-tip-text"> {tip_text}</span>
        </div>
      )}
    </div>
  );
}
