# AgriSense Backend Setup

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Ensure ML models are in place:
```
ml model/models/crop_recommendation_topk_model.pkl
ml model/models/yield_predictor.pkl
```

## Running the Server

```bash
python main.py
```

The API will be available at: http://localhost:8000

### API Documentation
- Interactive docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

- POST `/recommend_crop` - Crop recommendation
- POST `/predict_yield` - Yield prediction
- POST `/soil_analysis` - Soil health analysis
- POST `/fertilizer_recommendation` - Fertilizer guide
- POST `/field_record` - Record field data
- GET `/field_comparison` - Compare fields
- POST `/track_expense` - Track farming expenses
- GET `/expense_summary` - Get expense summary
- POST `/weather_advisory` - Weather-based advisories
- POST `/crop_rotation` - Crop rotation guidance
- POST `/irrigation_schedule` - Irrigation scheduler
- POST `/pest_alert` - Pest & weed alerts
- GET `/market_prices` - Market prices
- POST `/revenue_estimate` - Revenue calculator
- GET `/government_schemes` - Government schemes
- POST `/forum/post` - Create forum post
- GET `/forum/posts` - Get forum posts
- POST `/forum/answer` - Answer forum post
- POST `/water_audit` - Water usage audit
- POST `/crop_advisory_timeline` - Crop timeline
- GET `/health` - Health check

## Environment Variables (Optional)

Create a `.env` file for configuration:
```
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

## Troubleshooting

**Models not loading?**
- Check that model files exist in `ml model/models/`
- Verify model file names match exactly
- Check console for specific error messages

**Port already in use?**
- Change port in main.py: `uvicorn.run(app, host="0.0.0.0", port=8001)`

**CORS errors?**
- CORS is enabled for all origins. To restrict, modify the CORSMiddleware configuration.
