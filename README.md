<div align="center">

```
                                 ███████╗███╗   ██╗ ██████╗  █████╗  ██████╗ ███████╗██╗  ██╗
                                 ██╔════╝████╗  ██║██╔════╝ ██╔══██╗██╔════╝ ██╔════╝╚██╗██╔╝
                                 █████╗  ██╔██╗ ██║██║  ███╗███████║██║  ███╗█████╗   ╚███╔╝ 
                                 ██╔══╝  ██║╚██╗██║██║   ██║██╔══██║██║   ██║██╔══╝   ██╔██╗ 
                                 ███████╗██║ ╚████║╚██████╔╝██║  ██║╚██████╔╝███████╗██╔╝ ██╗
                                 ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                            THE SCIENCE OF PLAY — DATA STORY
```

[![Live Demo](https://img.shields.io/badge/▶_LIVE_DEMO-Vercel-black?style=for-the-badge&logo=vercel)](https://engagex-yt.vercel.app)
[![API Status](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render)](https://engagex-api.onrender.com)
[![Built With](https://img.shields.io/badge/Built_With-Python_%7C_React_%7C_Plotly-38bdf8?style=for-the-badge)](https://github.com/Thanatos9404/EngageX-The-Science-of-Play)
[![Challenge](https://img.shields.io/badge/Codédex-February_2026_Challenge-f472b6?style=for-the-badge)](https://codedex.io)

</div>

---

## 🎮 What Is EngageX?

> *"Most people know games are &lsquo;designed to be addictive.&rsquo; Almost no one has the data to prove — or disprove — it."*

**EngageX** is a rigorous, statistically-grounded data story built on top of the real Steam platform dataset. It doesn't just visualize gaming metrics — it **stress-tests the popular narrative** using Principal Component Analysis, survival analysis, bootstrapped confidence intervals, and Random Forest regression.

**The Central Question:**
> Has overall player engagement actually increased — or has it merely redistributed?

**The Verdict:**
> Aggregate engagement has been flat since 2015 (+1.3%, Cohen's d = 0.04). But beneath that surface: **DLC-Heavy titles survive twice as long as Premium standalone games.**

---

## ⚡ Core Findings

| Finding | Statistic | Significance |
|---|---|---|
| 📊 Aggregate engagement change | Δ = +1.3% | Cohen's d = 0.04 — *negligible* |
| ⏱️ DLC-Heavy half-life | **7.1 years** | vs. Buy-to-Play: 3.2 yrs |
| 🎁 F2P cohort slope (β) | **+1.8 pts/yr** | R² = 0.71, p < 0.01 |
| 🏆 Premium cohort slope (β) | **+0.1 pts/yr** | R² = 0.04, p = 0.48 |
| 🧪 Community Fatigue (KW test) | η² = 0.003 | *Fatigue narrative rejected* |
| 🤖 RF Model Variance explained | ~35% | 95% CIs across 100 trees |

---

## 🧠 Machine Learning Stack

```
   INPUT FEATURES                MODEL                   OUTPUT
   ┌─────────────┐               ┌──────────────────┐    ┌───────────────────┐
   │ Price Point │──────────────▶│                  │───▶│  Engagement Score │
   │ DLC Count   │               │  Random Forest   │    │      0 – 100       │
   │ Release Year│──────────────▶│  (100 Estimators)│    │                   │
   │ Metacritic  │               │   Cross-Validated │    │ ~35% R² variance  │
   └─────────────┘               └──────────────────┘    └───────────────────┘
          │
          ▼
   ┌────────────────────────────────────────┐
   │   PCA ENGAGEMENT SCORE (Unsupervised)  │
   │   4 features → 1 latent dimension      │
   │   Variance explained: ~65%             │
   └────────────────────────────────────────┘
```

The engagement score is derived from **Principal Component Analysis** across four log-normalized features:
- `log_average_playtime_forever` — Longitudinal depth
- `log_peak_ccu` — Peak concurrent demand
- `log_num_reviews_total` — Community signal strength
- `pct_pos_total` — Normalized review sentiment

---

## 🏗️ Architecture

```
PYTHON ENGINE                   FLASK API                  REACT FRONTEND
─────────────────               ──────────────             ──────────────────────
data_analysis.py                app.py                     Vite + React 19
  ├── clean_data()               ├── /api/insights         src/
  ├── calculate_verdict()        ├── /api/assets/:chartId    ├── App.jsx
  ├── generate_cohort_div()      └── /api/predict            ├── components/
  ├── generate_survival()                                     │   ├── HeroLevel.jsx
  ├── quartile_volatility()      Hosted on Render            │   ├── Level3AhaMoment.jsx
  ├── rf_bootstrap_ci()                                      │   ├── SurvivalCurves.jsx
  └── → JSON Plotly assets                                   │   └── PlotlyChart.jsx
       saved to public/                                      └── index.css
                                                         Deployed on Vercel
```

---

## 🚀 How to Run Locally

**1. Backend:**
```bash
python -m venv venv
.\venv\Scripts\activate  # (Windows)

pip install -r requirements.txt
python data_analysis.py  # Generates all JSON charts + insights.json
python app.py            # Flask API → http://localhost:5000
```

**2. Frontend:**
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev              # Vite dev server → http://localhost:5173
```

**3.** Open `http://localhost:5173` in your browser.

> **Note**: The ML Predictor (`/api/predict`) calls the Flask backend. Set `VITE_API_URL` environment variable or ensure `app.py` is running locally.

---

## 📁 Project Structure

```
EngageX-The-Science-of-Play/
├── data_analysis.py        ← Core analytical engine (PCA, RF, Survival)
├── app.py                  ← Flask REST API
├── requirements.txt        ← Python dependencies (incl. gunicorn for Render)
├── rf_model.joblib         ← Trained Random Forest model
├── rf_scaler.joblib        ← StandardScaler for feature normalization
├── dataset/
│   └── games_march2025_cleaned.csv
└── frontend/
    ├── public/
    │   ├── insights.json       ← Pre-computed statistical insights
    │   ├── assets/             ← Plotly JSON chart payloads
    │   └── EngageX_Analysis.ipynb
    └── src/
        ├── App.jsx
        ├── index.css
        └── components/
            ├── HeroLevel.jsx
            ├── Level3AhaMoment.jsx
            ├── SurvivalCurves.jsx
            ├── EthicalLayer.jsx
            ├── Level2Comparisons.jsx
            ├── MethodologySection.jsx
            ├── PredictionCalculator.jsx
            ├── PlotlyChart.jsx
            └── SummaryScreen.jsx
```

---

## 🔬 Methodology & Reproducibility

All statistical comparisons include **95% bootstrapped confidence intervals** unless otherwise specified.

| Method | Purpose | Library |
|---|---|---|
| PCA (1 component) | Dimensionality reduction → engagement score | scikit-learn |
| Welch's T-Test | Pre vs Post-2015 engagement comparison | scipy.stats |
| Kruskal-Wallis H | Quartile fatigue effect (non-parametric) | scipy.stats |
| Chi-square contingency | Survival cohort divergence | scipy.stats |
| OLS Linear Regression | Cohort slopes (F2P vs B2P) | scipy.stats |
| Random Forest (100 trees) | Engagement prediction + feature importance CI | scikit-learn |
| Bootstrap resampling | 95% CI on feature importances | numpy |

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Thanatos9404/EngageX-The-Science-of-Play/blob/main/frontend/public/EngageX_Analysis.ipynb)

---

## 📊 Dataset

- **Source:** [Steam Games Dataset (Kaggle)]([https://www.kaggle.com/](https://www.kaggle.com/datasets/artermiloff/steam-games-dataset))
- **Size:** 8,010 unique Steam titles across 35 structured features
- **Cleaning:** Log-transforms, idle-inflation removal (idle_ratio > 10x median), owner midpoint parsing
- **Outlier handling:** 99th percentile cap on DLC count for scatter charts

---

<div align="center">

**Built by [Yashvardhan Thanvi](https://github.com/Thanatos9404)**
*for the Codédex Monthly Data Challenge — February 2026*

*"Data doesn't lie. Games might."*

</div>
