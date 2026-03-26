# AgriSense v2.0 - Quick Installation Guide

## ⚡ 5-Minute Setup

### Step 1: Extract Files
```bash
unzip AgriSense_Backend_v2.0.zip
unzip AgriSense_Frontend_v2.0.zip
```

### Step 2: Setup Backend (Terminal 1)
```bash
cd backend_final
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# ⚠️ IMPORTANT: Add your ML models
# Copy these files to: backend_final/ml model/models/
#   - crop_recommendation_topk_model.pkl
#   - yield_predictor.pkl

python main.py
# ✅ Backend running on http://localhost:8000
```

### Step 3: Setup Frontend (Terminal 2)
```bash
cd frontend_final
npm install
npm run dev
# ✅ Frontend running on http://localhost:5173
```

### Step 4: Open Browser
**Navigate to:** http://localhost:5173

---

## 🎯 First Steps in the App

1. **Home Tab**: Enter soil parameters (N, P, K, pH, rainfall)
2. **Click "Predict"**: Get crop recommendations & yield
3. **Explore Features**: Try different tabs to see all 15 features
4. **Multilingual**: Select language from top-right dropdown

---

## 📋 What's Included

### Backend
- ✅ 16 API endpoints (crop recommendation, yield, soil, fertilizer, irrigation, etc.)
- ✅ All feature implementations
- ✅ ML model integration ready
- ✅ Auto-generated API documentation

### Frontend
- ✅ 15 feature components (soil health, fertilizer, market prices, forum, etc.)
- ✅ Responsive design (mobile + desktop)
- ✅ Dark mode support
- ✅ Multi-language support (English, Hindi, Tamil)
- ✅ Interactive charts
- ✅ 100+ CSS styles

---

## ⚠️ Important Notes

### ML Models (CRITICAL)
Your backend needs these trained models in:
```
backend_final/ml model/models/
├── crop_recommendation_topk_model.pkl
└── yield_predictor.pkl
```

**Without these files**, the app will show errors when trying to predict.

### Ports
- Backend: 8000
- Frontend: 5173

If ports are busy, modify:
- Backend: Edit `main.py` line ~130
- Frontend: Run `npm run dev -- --port 3000`

### CORS
CORS is enabled for all origins (development). For production, restrict in `main.py`.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Models not loading | Check file names match exactly, paths correct |
| Port already in use | Change port in config files |
| npm install fails | Delete `node_modules` & `package-lock.json`, retry |
| API connection error | Verify backend is running on port 8000 |
| Charts not showing | Hard refresh browser (Ctrl+Shift+R) |

---

## 📱 Available Features

### Core (Existing)
- Crop Recommendation (Top 3)
- Yield Prediction

### v2.0 New Features (15 Total)
1. Soil Health Dashboard 🌱
2. Fertilizer Recommendation 🧪
3. Field Comparator 🗺️
4. Expense Tracker 💰
5. Irrigation Scheduler 💧
6. Weather Advisories ⛅
7. Crop Rotation Guide 🔄
8. Pest & Weed Alerts 🐛
9. Market Prices 📊
10. Government Schemes 📜
11. Community Forum 👥
12. Water Audit 💦
13. Crop Timeline 📅

---

## 🔗 API Documentation

Once backend is running, visit:
**http://localhost:8000/docs**

You can test all endpoints interactively there!

---

## ✅ Verification Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] ML models in `ml model/models/`
- [ ] Can see homepage
- [ ] Can enter soil parameters
- [ ] Can see predictions
- [ ] Dark mode toggles
- [ ] Language selector works

---

## 📞 Support

1. **Check README.md** - Full documentation
2. **Check SETUP.md** - In each folder
3. **Check browser console** - Press F12
4. **Check backend logs** - Terminal output

---

## 🚀 Next Steps

1. ✅ Get it running (steps above)
2. Test with sample data
3. Add your ML models
4. Customize with real farm data
5. Deploy to production (see README.md)

---

**Enjoy AgriSense v2.0! 🌾📊**

Questions? Check the full README.md for detailed information.
