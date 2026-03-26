export const LANGUAGES = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिंदी",
  te: "తెలుగు",
  bn: "বাংলা",
};

const translations = {
  en: {
    navDashboard: "Dashboard",
    navTools: "Tools",
    navCropAI: "Crop AI",
    navHistory: "History",
    navLogout: "Logout",

    loginTitle: "AgriSense",
    loginSubtitle: "AI-powered yield prediction and crop recommendation",
    loginFullName: "Full Name",
    loginEmail: "Email",
    loginPassword: "Password",
    loginButton: "Sign in",
    loginTip: "Tip: This is a simple UI-only login (stores a demo token in `localStorage`).",

    heroDashboardTitle: "Dashboard",
    heroDashboardSub: "Yield and crop-match analytics (graphs-only view).",
    heroCropTitle: "Crop Recommendation",
    heroCropSub: "Predict and review results for your field inputs.",
    heroToolsTitle: "Farmer Tools",
    heroToolsSub: "Practical, farm-friendly guidance to improve yield and reduce risk.",
    heroHistoryTitle: "History",
    heroHistorySub: "Your recent prediction runs (stored locally in this browser).",

    historyRecentRunsTitle: "Recent Runs",
    historyClear: "Clear",
    historyNoHistoryTitle: "No history yet",
    historyNoHistorySub: "Run a prediction from the Dashboard or Crop Recommendation page to save results here.",
    historyTableDate: "Date",
    historyTableBestCrop: "Best Crop",
    historyTablePredictedYield: "Predicted Yield",
    historyTableGrossRevenue: "Gross Revenue",

    inputHeroTitle: "Enter Field Data",
    inputHeroSub: "Provide soil, climate, and farm parameters for AI-powered predictions",
    predictCta: "Get AI Predictions",

    summaryYieldLabel: "Predicted Yield",
    summaryCropLabel: "Best Crop Match",
    summaryRevenueLabel: "Est. Gross Revenue",
    summaryLastRunLabel: "Last Run",

    weatherTitle: "Live Conditions",
    weatherTemperature: "Temperature",
    weatherHumidity: "Humidity",
    weatherRainfall: "Rainfall 24h",
    weatherWind: "Wind Speed",
    weatherVisibility: "Visibility",

    chartTopCropTitle: "Top Crop Recommendations",
    chartTopCropSub: "AI-ranked crops by soil & climate match",

    // Chart titles used in Dashboard
    chartNpkTitle: "Soil Nutrient Profile (NPK)",
    chartNpkSub: "Current input levels",
    chartRainYieldTitle: "Rainfall vs Yield",
    chartRainYieldSub: "Historical averages per crop from dataset",
    chartRadarTitle: "Input vs Ideal Profile",
    chartRadarSub: "Comparing your values against ideal rice conditions",
    chartSoilOcTitle: "Soil Organic Carbon",
    chartPestTitle: "Pest Index Distribution",
    chartFertilizerTitle: "Fertilizer Usage",
  },
  ta: {
    navDashboard: "முகப்பு",
    navTools: "விவசாயி கருவிகள்",
    navHistory: "வரலாறு",
    navLogout: "வெளியேறு",
  },
  hi: {
    navDashboard: "होम",
    navTools: "किसान टूल्स",
    navHistory: "इतिहास",
    navLogout: "लॉगआउट",
  },
  te: {
    navDashboard: "హోమ్",
    navTools: "రైతు సాధనాలు",
    navHistory: "చరిత్ర",
    navLogout: "లాగ్అవుట్",
  },
  bn: {
    navDashboard: "ড্যাশবোর্ড",
    navTools: "কৃষক সরঞ্জাম",
    navHistory: "ইতিহাস",
    navLogout: "লগআউট",
  },
};

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

