# EngageX: The Science of Play
**Built for the Codédex Monthly Data Challenge (March 2025)**

## Overview
**EngageX** is a rigorous, statistically grounded investigation into modern gaming mechanics using the sprawling 2025 Steam dataset. 

Instead of a simple dashboard, this project fundamentally asks: *Are games improving natively, or are developers simply optimizing the science of player retention?* By applying logarithmic transformations, Principal Component Analysis (PCA), Random Forest regression, and statistical significance testing, EngageX moves beyond anecdotal assumptions to provide an empirical framework for video game engagement.

## Architecture & Technology Stack
This project represents a full-stack data science portfolio piece:
1. **The Engine (Python/Pandas/Scikit-Learn/Plotly):** 
   - A robust data pipeline (`data_analysis.py`) cleans over 8,000 records, imputes missing data, and penalizes idle-inflation outliers.
   - Computes a custom, dimensionally-reduced **Engagement Score** via unsupervised **Principal Component Analysis (PCA)**.
   - Trains a **Random Forest Regressor** to predict engagement lifecycles based purely on structural game features.
   - Generates high-density interactive visualizations (Plotly JSON serializations) directly to the frontend.
   - Calculates Independent T-Tests and **Cohen's d effect sizes** to determine statistical significance between Pricing Tiers.
2. **The API (Flask):** 
   - A lightweight local server (`app.py`) exposing the interactive Plotly physical assets and a live `/api/predict` ML endpoint.
3. **The Presentation (React + Vite + Tailwind CSS):** 
   - A scrolling, narrative-driven data story (`frontend/`). 
   - Features dynamic Plotly-React rendering, a live Engagement Calculator widget, interactive rankings, and a modern "Data Lab" aesthetic.

## Key Statistical Findings
- **The Free-To-Play Extremes:** Initial unit price exhibits a complex relationship with lifetime engagement. Free-to-play models capture the absolute extremes of player attention, while premium titles ($20+) demonstrate a narrower baseline of adherence. Our T-Test and Cohen's *d* effect size between Indie ($0-$20) and Premium ($40+) titles proved that raw purchase price is a remarkably weak predictor of sustained attention.
- **DLC Density:** Our regression model reveals a distinct positive correlation between ecosystem expansion (total DLCs) and player retention.
- **The Cost of Retention / Fatigue Analysis:** Segmenting the Top Quartile of engaged games revealed a strong positive correlation between hyper-engagement and negative review bombing. The structural pursuit of infinite gameplay often yields an "attention tax", increasing player fatigue.

## How to Run Locally
1. **Backend Initialization:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt # Make sure you have the required packages
   python data_analysis.py # Cleans dataset, generates Plotly graphs, and trains ML model
   python app.py           # Starts the Flask API on port 5000
   ```
2. **Frontend Initialization:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm run dev             # Starts the Vite React app on port 5173
   ```
3. Open `http://localhost:5173` in your browser.

## The Raw Data
For those interested in the raw statistical modeling, an automatically generated Jupyter Notebook (`EngageX_Analysis.ipynb`) is provided. This is created dynamically by the python pipeline and can be downloaded directly from the final "Mission Report" screen of the application.

---
*Developed by Yashvardhan Thanvi*
