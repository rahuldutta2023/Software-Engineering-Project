import React, { useEffect, useMemo, useState } from "react";
import { predictYield, recommendCrop } from "../api";

import InputForm from "../components/InputForm";
import SummaryCards from "../components/SummaryCards";
import WeatherWidget from "../components/WeatherWidget";

import CropRecommendationChart from "../components/charts/CropRecommendationChart";

import { pushHistoryEntry } from "../utils/history";
import { t } from "../i18n";

const CROP_PRICES = {
  rice: 2369,
  maize: 2400,
  chickpea: 5650,
  kidneybeans: 4400,
  pigeonpeas: 8000,
  mothbeans: 3010,
  mungbean: 8768,
  blackgram: 6950,
  "lentil(masur)": 6425,
  pomegranete: 7000,
  banana: 1500,
  mango: 1616,
  grapes: 7500,
  watermelon: 2326.47,
  muskmelon: 2000,
  apple: 4500,
  orange: 3170,
  papaya: 1200,
  coconut: 11582,
  cotton: 7710,
  jute: 5650,
  coffee: 23100,
};

const DEFAULT_INPUTS = {
  N: 90,
  P: 35,
  K: 180,
  temperature: 24,
  humidity: 80,
  ph: 6.5,
  rainfall: 200,
  Soil_OC: 1.25,
  Fertilizer_kg_ha: 252,
  Pest_Index: 0.79,
  Irrigation_mm: 308,
};

export default function CropRecommend({ theme = "light", lang = "en", onHistorySaved }) {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [yieldResult, setYieldResult] = useState(null);
  const [cropResult, setCropResult] = useState(null);
  const [grossRevenue, setGrossRevenue] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  const topCropForRevenue = cropResult?.top_crops?.[0];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://wttr.in/Kolkata?format=j1");
        if (!res.ok) return;
        setWeatherData(await res.json());
      } catch (_) {}
    };
    fetchWeather();
    const id = setInterval(fetchWeather, 600_000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: parseFloat(e.target.value) }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const [yieldData, recData] = await Promise.all([predictYield(inputs), recommendCrop(inputs)]);

      setYieldResult({ ...yieldData, timestamp: new Date() });
      setCropResult(recData);

      let revenue = null;
      if (yieldData && recData?.top_crops?.length) {
        const price = CROP_PRICES[recData.top_crops[0].crop.toLowerCase()] || 0;
        revenue = yieldData.predicted_yield_t_ha * 10 * price;
        setGrossRevenue(revenue.toFixed(2));
      } else {
        setGrossRevenue(null);
      }

      const entry = {
        createdAt: new Date().toISOString(),
        page: "crop_recommend",
        inputs,
        yieldResult: yieldData,
        cropResult: recData,
        grossRevenue: revenue,
      };
      pushHistoryEntry(entry);
      if (onHistorySaved) onHistorySaved(entry);
    } catch (err) {
      setError("Prediction failed. Check your inputs or the API connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const heroSubtitle = useMemo(() => {
    if (!topCropForRevenue) return t(lang, "heroCropSub");
    return `Top match: ${topCropForRevenue.crop} (confidence ${(topCropForRevenue.probability || 0).toFixed(1)}%).`;
  }, [topCropForRevenue, lang]);

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1 className="page-hero-title">{t(lang, "heroCropTitle")}</h1>
          <p className="page-hero-sub">{heroSubtitle}</p>
        </div>
      </section>

      <main className="page-main">
        <InputForm
          inputs={inputs}
          onChange={handleChange}
          onPredict={handlePredict}
          loading={loading}
          error={error}
          lang={lang}
        />

        <div style={{ marginTop: "1.5rem" }}>
          <SummaryCards
            yieldResult={yieldResult}
            cropResult={cropResult}
            grossRevenue={grossRevenue}
            lang={lang}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <WeatherWidget weatherData={weatherData} lang={lang} />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <CropRecommendationChart cropResult={cropResult} theme={theme} lang={lang} />
        </div>
      </main>
    </div>
  );
}

