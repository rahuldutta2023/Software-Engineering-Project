# AgriSense Frontend Setup

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:5173

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── features/           # All new feature components
│   ├── styles/             # Feature stylesheets
│   ├── charts/             # Chart components
│   ├── Header.jsx
│   ├── InputForm.jsx
│   └── ...
├── Dashboard.jsx           # Main dashboard component
├── App.jsx                 # App entry point
├── api.js                  # API integration
├── index.css               # Global styles
└── crop_data.json          # Sample data
```

## Features Implemented

### Core Features
- ✅ Crop Recommendation
- ✅ Yield Prediction
- ✅ Dashboard with Charts

### New v2.0 Features
- ✅ Soil Health Monitoring
- ✅ Fertilizer Recommendation Engine
- ✅ Field Performance Comparator
- ✅ Expense & Income Tracker
- ✅ Weather-Based Advisories
- ✅ Crop Rotation Guidance
- ✅ Irrigation Scheduler
- ✅ Pest & Weed Alert System
- ✅ Market Price Integration
- ✅ Revenue Estimation
- ✅ Government Schemes Finder
- ✅ Community Forum
- ✅ Water Audit & Savings
- ✅ Crop Advisory Timeline
- ✅ Multilingual Support (EN, HI, TA)

## API Configuration

By default, the frontend connects to `http://localhost:8000`.

To change the API URL, modify `src/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url:8000';
```

## Environment Variables

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AgriSense
```

Then access in components:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**API connection errors?**
- Ensure backend is running on port 8000
- Check CORS configuration in backend
- Look for error messages in browser console

**Styling issues?**
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild: `npm run build`

## Support

For issues or questions:
1. Check the README.md in the root directory
2. Review backend API documentation at `/docs`
3. Check console for error messages

---

**Version:** 2.0.0  
**Last Updated:** 2024  
**Status:** Production Ready
