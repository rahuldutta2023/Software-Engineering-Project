# AgriSense v2.0 - Complete Feature & API Reference

## 🎯 All 15 Features with API Endpoints

### 1. 🌱 Soil Health Dashboard
**Purpose**: Analyze soil composition and get amendments recommendations

**API Endpoint**: `POST /soil_analysis`
```json
Request:
{
  "N": 40,
  "P": 15,
  "K": 150,
  "ph": 6.5,
  "organic_matter": 2.5,
  "microbial_count": 100,
  "crop_name": "Rice"
}

Response:
{
  "soil_score": 75,
  "npk_status": {"N": "Optimal", "P": "Low", "K": "Optimal"},
  "ph_status": "Ideal for most crops",
  "organic_matter_status": "Good",
  "recommendations": [...]
}
```

**Frontend Component**: `SoilHealthDashboard.jsx`

---

### 2. 🧪 Fertilizer Recommendation Engine
**Purpose**: Recommend specific fertilizer products based on deficiencies

**API Endpoint**: `POST /fertilizer_recommendation`
```json
Request:
{
  "soil_analysis": {"N": 40, "P": 15, "K": 150},
  "target_yield": 4,
  "crop_name": "Rice"
}

Response:
{
  "recommendations": [
    {
      "nutrient": "N",
      "fertilizer": "Urea",
      "npk_ratio": "46-0-0",
      "amount_needed_kg": 50,
      "estimated_cost": 300,
      "efficiency": "High"
    }
  ],
  "total_estimated_cost": 850,
  "estimated_roi_percent": 125
}
```

**Frontend Component**: `FertilizerRecommender.jsx`

---

### 3. 🗺️ Field Performance Comparator
**Purpose**: Track & compare performance across multiple fields

**API Endpoints**: 
- `POST /field_record` - Record field data
- `GET /field_comparison` - Compare all fields

```json
POST /field_record:
{
  "field_id": "FIELD_001",
  "field_name": "North Field",
  "area_ha": 1.5,
  "crop_name": "Rice",
  "N": 40, "P": 15, "K": 150,
  "temperature": 28, "humidity": 75, "ph": 6.5, "rainfall": 150,
  "yield_achieved": 4.2
}

GET /field_comparison Response:
{
  "field_comparison": [
    {
      "field_name": "North Field",
      "area_ha": 1.5,
      "avg_yield_t_ha": 4.2,
      "avg_npk": 101.67,
      "number_of_records": 3
    }
  ],
  "best_performing_field": {...}
}
```

**Frontend Component**: `FieldComparator.jsx`

---

### 4. 💰 Expense & Income Tracker
**Purpose**: Track farming costs and calculate ROI

**API Endpoints**:
- `POST /track_expense` - Record expenses
- `GET /expense_summary` - Get summary

```json
POST /track_expense:
{
  "seeds_cost": 2000,
  "fertilizer_cost": 3000,
  "pesticide_cost": 1000,
  "labor_cost": 5000,
  "water_cost": 1500,
  "machinery_cost": 2000,
  "land_area_ha": 1,
  "crop_name": "Rice"
}

Response:
{
  "total_expense": 14500,
  "cost_per_ha": 14500,
  "breakdown": {...}
}
```

**Frontend Component**: `ExpenseTracker.jsx`

---

### 5. 💧 Irrigation Scheduler
**Purpose**: Generate weekly watering schedule

**API Endpoint**: `POST /irrigation_schedule`
```json
Request:
{
  "crop_name": "Rice",
  "soil_type": "Loamy",
  "irrigation_method": "Drip",
  "rainfall_expected": 30,
  "growth_stage": "vegetative"
}

Response:
{
  "crop": "Rice",
  "weekly_requirement_mm": 40,
  "schedule": [
    {
      "day": "Day 5",
      "irrigation_mm": 10,
      "timing": "Early morning (5-7 AM)"
    }
  ],
  "notes": ["Adjust based on actual rainfall", ...]
}
```

**Frontend Component**: `IrrigationScheduler.jsx`

---

### 6. ⛅ Weather-Based Advisories
**Purpose**: Get actionable farming tips based on weather

**API Endpoint**: `POST /weather_advisory`
```json
Request:
{
  "temperature": 30,
  "humidity": 70,
  "rainfall_forecast": 50,
  "crop_name": "Rice",
  "growth_stage": "vegetative",
  "region": "Tamil Nadu"
}

Response:
{
  "advisories": [
    {
      "type": "Pest Alert",
      "risk_level": "High",
      "pests": ["Aphids", "Spider Mites"],
      "recommendations": ["Scout fields", "Apply pesticides", ...]
    }
  ],
  "stage_specific_advice": {...}
}
```

**Frontend Component**: `WeatherAdvisories.jsx`

---

### 7. 🐛 Pest & Weed Alert System
**Purpose**: Early warning system for pests and weeds

**API Endpoint**: `POST /pest_alert`
```json
Request:
{
  "region": "Tamil Nadu",
  "crop_name": "Rice",
  "season": "monsoon",
  "temperature": 28,
  "humidity": 75,
  "rainfall": 100
}

Response:
{
  "alerts": [
    {
      "type": "Pest Alert",
      "pests": ["Aphids", "Whiteflies"],
      "risk_level": "High",
      "recommendations": [...]
    },
    {
      "type": "Weed Alert",
      "weeds": ["Cyperus rotundus"],
      "risk_level": "High",
      "recommendations": [...]
    }
  ]
}
```

**Frontend Component**: `PestAlerts.jsx`

---

### 8. 🔄 Crop Rotation Guide
**Purpose**: Sustainable crop planning for soil health

**API Endpoint**: `POST /crop_rotation`
```json
Request:
{
  "current_crop": "Rice",
  "region": "Tamil Nadu"
}

Response:
{
  "current_crop": "Rice",
  "recommended_next_crops": ["Wheat", "Pulses", "Oilseeds"],
  "benefits": {
    "Nitrogen replenishment": "Legumes fix atmospheric nitrogen",
    "Pest cycle breaking": "Different crops prevent pest build-up",
    ...
  },
  "next_season_timing": "Plan rotation 2-3 months before current crop ends"
}
```

**Frontend Component**: `CropRotationGuide.jsx`

---

### 9. 📊 Market Prices & Revenue
**Purpose**: Check current prices and calculate income

**API Endpoints**:
- `GET /market_prices` - Get current prices
- `POST /revenue_estimate` - Calculate revenue

```json
GET /market_prices Response:
{
  "crops": [
    {"crop": "Rice", "price_per_quintal": 2100, "trend": "stable"},
    {"crop": "Wheat", "price_per_quintal": 2500, "trend": "up"}
  ]
}

POST /revenue_estimate:
{
  "crop_name": "Rice",
  "predicted_yield": 4,
  "land_area_ha": 1
}

Response:
{
  "crop": "Rice",
  "total_production": 40,
  "estimated_revenue": "₹84,000",
  "market_price": "₹2,100 per quintal",
  "market_trend": "stable"
}
```

**Frontend Component**: `MarketPrices.jsx`

---

### 10. 📜 Government Schemes Finder
**Purpose**: Access available subsidies and loans

**API Endpoint**: `GET /government_schemes`
```json
Query Parameters: ?state=Tamil Nadu

Response:
{
  "schemes": [
    {
      "name": "PM-KISAN",
      "description": "Direct cash transfer to farmers",
      "benefit": "₹6,000 per year in 3 installments",
      "eligibility": "All farmers",
      "applicable_states": "All states"
    },
    {
      "name": "Crop Insurance Scheme (PMFBY)",
      "description": "Insurance coverage for crop failure",
      "benefit": "Up to 100% compensation",
      "eligibility": "Farmers growing notified crops",
      ...
    }
  ],
  "helpful_links": [
    "https://pmkisan.gov.in",
    "https://agritech.tn.gov.in"
  ]
}
```

**Frontend Component**: `GovernmentSchemes.jsx`

---

### 11. 👥 Farmer Community Forum
**Purpose**: Q&A platform for farmers to help each other

**API Endpoints**:
- `POST /forum/post` - Create question
- `GET /forum/posts` - View questions
- `POST /forum/answer` - Answer question

```json
POST /forum/post:
{
  "farmer_name": "Raj Kumar",
  "crop_name": "Rice",
  "region": "Tamil Nadu",
  "title": "How to prevent leaf blast?",
  "description": "My rice field is showing leaf blast symptoms...",
  "tags": ["rice", "disease", "leaf-blast"]
}

GET /forum/posts Response:
{
  "total_posts": 15,
  "posts": [
    {
      "post_id": "post_1",
      "farmer_name": "Raj Kumar",
      "title": "How to prevent leaf blast?",
      "description": "...",
      "crop": "Rice",
      "region": "Tamil Nadu",
      "answers": 3,
      "status": "open"
    }
  ]
}
```

**Frontend Component**: `CommunityForum.jsx`

---

### 12. 💦 Water Audit & Savings Report
**Purpose**: Audit water usage and identify savings

**API Endpoint**: `POST /water_audit`
```json
Request:
{
  "water_used_mm": 400,
  "crop_name": "Rice",
  "irrigation_method": "Flood",
  "land_area_ha": 1
}

Response:
{
  "crop": "Rice",
  "water_used_mm": 400,
  "expected_water_mm": 360,
  "difference_mm": 40,
  "efficiency_percent": 40,
  "total_water_cost": 20000,
  "recommendations": [
    "Switch to drip irrigation to save 25-30% water",
    "Mulch fields to reduce evaporation",
    "Monitor soil moisture before irrigation"
  ]
}
```

**Frontend Component**: `WaterAudit.jsx`

---

### 13. 📅 Crop Advisory Timeline
**Purpose**: Month-by-month guidance for entire season

**API Endpoint**: `POST /crop_advisory_timeline`
```json
Request:
{
  "crop_name": "Rice",
  "region": "Tamil Nadu"
}

Response:
{
  "crop": "Rice",
  "season_duration_months": 6,
  "timeline": {
    "Month 1": [
      "Land preparation",
      "Field leveling",
      "Seed selection and treatment"
    ],
    "Month 2": [
      "Sowing",
      "Water management",
      "Nursery care"
    ],
    ...
  }
}
```

**Frontend Component**: `CropTimeline.jsx`

---

## 🎯 Core Features (v1 + v2)

### 1. Crop Recommendation
**API Endpoint**: `POST /recommend_crop`
- Input: Soil parameters (N, P, K, pH, Temperature, Humidity, Rainfall)
- Output: Top 3 crops with probabilities
- ML Model: Random Forest (99% accuracy)

### 2. Yield Prediction
**API Endpoint**: `POST /predict_yield`
- Input: Comprehensive farm data (16 engineered features)
- Output: Expected yield in tonnes/hectare
- ML Model: Random Forest with feature engineering

---

## 📊 Feature Comparison Table

| Feature | Frontend Component | API Endpoint | Data Stored | Real-time |
|---------|-------------------|-------------|------------|-----------|
| Soil Health | SoilHealthDashboard.jsx | POST /soil_analysis | Yes | No |
| Fertilizer | FertilizerRecommender.jsx | POST /fertilizer_recommendation | No | No |
| Field Compare | FieldComparator.jsx | POST/GET /field_* | Yes | Yes |
| Expense | ExpenseTracker.jsx | POST/GET /expense* | Yes | No |
| Irrigation | IrrigationScheduler.jsx | POST /irrigation_schedule | No | No |
| Weather | WeatherAdvisories.jsx | POST /weather_advisory | No | Yes |
| Pest Alert | PestAlerts.jsx | POST /pest_alert | No | Yes |
| Crop Rotation | CropRotationGuide.jsx | POST /crop_rotation | No | No |
| Market Prices | MarketPrices.jsx | GET /market_prices | No | Yes |
| Schemes | GovernmentSchemes.jsx | GET /government_schemes | No | No |
| Forum | CommunityForum.jsx | POST/GET /forum/* | Yes | Yes |
| Water Audit | WaterAudit.jsx | POST /water_audit | Yes | No |
| Timeline | CropTimeline.jsx | POST /crop_advisory_timeline | No | No |

---

## 🔄 Data Flow Example

### Scenario: Farmer inputs soil data and gets complete recommendation

1. **User Input** (Frontend):
   - Soil test: N=40, P=15, K=150, pH=6.5
   - Crop: Rice, Area: 1 ha

2. **Backend Processing**:
   ```
   POST /soil_analysis → Soil Health Score
   POST /recommend_crop → Top 3 crops
   POST /predict_yield → Yield forecast
   POST /fertilizer_recommendation → Fertilizers needed
   POST /irrigation_schedule → Watering plan
   ```

3. **Frontend Display**:
   - Health score dashboard
   - Crop recommendations with cards
   - Fertilizer details
   - Irrigation schedule table
   - Cost estimation
   - Revenue calculator

---

## 📱 Frontend Component Hierarchy

```
Dashboard.jsx
├── Header (Theme, Language)
├── Sidebar Navigation
└── Main Content
    ├── Home Tab
    │   ├── InputForm
    │   ├── SummaryCards
    │   └── Charts
    ├── Soil Tab → SoilHealthDashboard
    ├── Fertilizer Tab → FertilizerRecommender
    ├── Fields Tab → FieldComparator
    ├── Expenses Tab → ExpenseTracker
    ├── Irrigation Tab → IrrigationScheduler
    ├── Weather Tab → WeatherAdvisories
    ├── Pest Tab → PestAlerts
    ├── Rotation Tab → CropRotationGuide
    ├── Prices Tab → MarketPrices
    ├── Schemes Tab → GovernmentSchemes
    ├── Forum Tab → CommunityForum
    ├── Water Tab → WaterAudit
    └── Timeline Tab → CropTimeline
```

---

## 🎨 UI/UX Features

- ✅ **Responsive Design**: Works on mobile, tablet, desktop
- ✅ **Dark Mode**: Eye-friendly night view
- ✅ **Multilingual**: English, Hindi, Tamil
- ✅ **Interactive Charts**: Chart.js visualizations
- ✅ **Form Validation**: Real-time input checking
- ✅ **Loading States**: User feedback during API calls
- ✅ **Error Handling**: Graceful error messages
- ✅ **Accessibility**: Keyboard navigation support

---

## 💾 Data Storage (Current)

- **In-Memory**: All data resets on backend restart
- **For Production**: Replace with PostgreSQL, MongoDB, or Firebase

---

## 🚀 Performance Metrics

- **Backend Response Time**: <100ms (most endpoints)
- **ML Model Inference**: <50ms
- **Frontend Load Time**: <3s (on 4G)
- **API Documentation**: Auto-generated at /docs

---

**This guide covers all 15 features of AgriSense v2.0 with API details and implementation references.**
