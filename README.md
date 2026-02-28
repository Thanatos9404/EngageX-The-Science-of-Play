# EngageX: The Science of Play
**Built for the Codédex Monthly Data Challenge (February 2026)**

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
- **The Null Result & Structural Divergence:** Across 8,010 analyzed titles, aggregate engagement has remained statistically flat since 2015 (Δ = +1.3%). However, beneath this stability lies a structural divergence: Free-to-Play and DLC-Heavy ecosystems command the entirety of modern engagement growth.
- **Retention Survival & Half-Lives:** We introduced a concrete Proxy Metric for survival (maintaining above-median Peak CCU). DLC-Heavy platforms actively resist decay with a computed half-life of 7.1 years, more than double the standard 3.2-year mortality rate of Premium standalone titles.
- **The Minimal Attention Tax (Fatigue Rejected):** A Kruskal-Wallis H-test across engagement quartiles quantifies the effect of playtime optimization on review sentiment. The effect size (η²) is extremely small, allowing us to empirically reject the prevailing narrative that high retention guarantees community fatigue.

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
