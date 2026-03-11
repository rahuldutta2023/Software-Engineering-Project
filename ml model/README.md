# 🌾 Crop AI — ML Training Module
> Part of the Crop Yield Prediction and Recommendation System (SIH 2025)

---

## Project Structure

```
ml model/
├── data/
│   ├── Crop_recommendation_balanced.csv   # 8800 samples, 22 crops, 13 columns
│   ├── crop_data.json                     # Crop metadata (keep as-is)
│   └── csv_to_json.py                     # Utility to convert CSV → JSON (keep as-is)
│
├── models/                                # Saved .pkl files + plots (auto-generated)
│
├── src/
│   ├── train_crop_model.py                # Train crop recommendation classifier
│   └── train_yield_model.py               # Train crop yield regressor
│
├── requirements.txt
└── README.md
```

---

## Models

### Crop Recommendation (`train_crop_model.py`)
- **Type:** Random Forest Classifier (multi-class, probabilistic Top-K output)
- **Features:** N, P, K, temperature, humidity, ph, rainfall (7 inputs)
- **Output:** `crop_recommendation_topk_model.pkl`
- **Test Accuracy:** ~99.09%
- **CV:** Repeated K-Fold (10×5) + Monte Carlo (ShuffleSplit ×20)

### Yield Prediction (`train_yield_model.py`)
- **Type:** Random Forest Regressor
- **Features:** 11 raw inputs + 5 engineered interaction terms (16 total)
- **Output:** `yield_predictor.pkl`
- **Test R²:** ~0.97+ | MAE < 0.3 t/ha
- **CV:** Repeated K-Fold (10×5) + Monte Carlo (ShuffleSplit ×20)
- **Model size:** ~13 MB (4× smaller than unregularized baseline)

#### Engineered Features (no data leakage)
| Feature | Formula |
|---|---|
| Nutrient_Balance_Index | (N + P + K) / 3 |
| Stress_Index | temperature × (1 − humidity/100) |
| Rainfall_N_Interaction | rainfall × N |
| Temp_Humidity_Interaction | temperature × humidity |
| Fertilizer_Rainfall_Interaction | Fertilizer_kg_ha × rainfall |

---

## Getting Started

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Train the crop recommendation model
python src/train_crop_model.py

# 3. Train the yield prediction model
python src/train_yield_model.py
```

Both scripts save their `.pkl` files and diagnostic plots into `models/`.

---

## Generated Outputs (in `models/`)

| File | Description |
|---|---|
| `crop_recommendation_topk_model.pkl` | Trained classifier pipeline |
| `yield_predictor.pkl` | Trained regressor pipeline |
| `crop_eda.png` | Correlation heatmap + class distribution |
| `crop_confusion_matrix.png` | Confusion matrix on test set |
| `crop_cv_scores.png` | CV score box plot |
| `crop_feature_importance.png` | Feature importance bar chart |
| `yield_eda.png` | Yield distribution + feature correlations |
| `yield_actual_vs_predicted.png` | Scatter + residual distribution |
| `yield_cv_scores.png` | CV R² box plot |
| `yield_feature_importance.png` | Top-10 feature importances |

---

## API Integration

These models are consumed by the FastAPI backend (`agri-ml-esmq.onrender.com`):

| Endpoint | Model used |
|---|---|
| `POST /recommend_crop?k=3` | `crop_recommendation_topk_model.pkl` |
| `POST /predict_yield` | `yield_predictor.pkl` |
