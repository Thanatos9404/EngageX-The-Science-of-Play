# EngageX: The Science of Play
**Built for the Codédex Monthly Data Challenge (March 2025)**

## Overview
**EngageX** is a rigorous, statistically grounded investigation into modern gaming mechanics using the sprawling 2025 Steam dataset. 

Instead of a simple dashboard, this project fundamentally asks: *Are games improving natively, or are developers simply optimizing the science of player retention?* By applying logarithmic transformations, multivariate regressions, and statistical significance testing, EngageX moves beyond anecdotal assumptions to provide an empirical framework for video game engagement.

## Architecture & Technology Stack
This project represents a full-stack data science portfolio piece:
1. **The Engine (Python/Pandas/Scikit-Learn):** 
   - A robust data pipeline (`data_analysis.py`) cleans over 100,000 records, imputes missing data, and penalizes outliers.
   - Computes a custom, dimensionally-reduced **Engagement Score**.
   - Generates high-density visualizations (Time Series with Confidence Bands, Playtime Log Distributions, Multivariate Correlation Heatmaps, and Regression lines) directly to the frontend.
   - Calculates Independent T-Tests (p-values) to determine statistical significance between Pricing Tiers.
2. **The API (Flask):** 
   - A lightweight local server (`app.py`) exposing the aggregated statistical insights and physical plot assets.
3. **The Presentation (React + Vite + Tailwind CSS):** 
   - A scrolling, narrative-driven data story (`frontend/`). 
   - Features dynamic component rendering, interactive Top 20 ranking tables, a sticky sidebar navigation, and a modern "Data Lab" aesthetic.

## Key Statistical Findings
- **The Free-To-Play Extremes:** Initial unit price exhibits a complex relationship with lifetime engagement. Free-to-play models capture the absolute extremes of player attention, while premium titles ($20+) demonstrate a narrower baseline of adherence. Our T-Test between Indie ($0-$20) and Premium ($40+) titles proved that raw purchase price is a remarkably weak predictor of sustained attention.
- **DLC Density:** Our regression model reveals a distinct positive correlation between ecosystem expansion (total DLCs) and player retention.
- **Audience Scaling:** Engagement scales non-linearly with audience size. Hit titles (500k-2M owners) don't just have *more* players, they hold their average player's attention substantially longer than Niche titles (<50k owners).

## How to Run Locally
1. **Backend Initialization:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install pandas numpy matplotlib seaborn scikit-learn flask flask-cors scipy nbformat
   python data_analysis.py # Generates the new plots and insights model
   python app.py           # Starts the API on port 5000
   ```
2. **Frontend Initialization:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev             # Starts the Vite React app on port 5173
   ```
3. Open `http://localhost:5173` in your browser.

## The Raw Data
For those interested in the raw statistical modeling, an automatically generated Jupyter Notebook (`EngageX_Analysis.ipynb`) is provided. This is created dynamically by the python pipeline and can be downloaded directly from the final "Mission Report" screen of the application.

---
*Developed by Yashvardhan Thanvi*
