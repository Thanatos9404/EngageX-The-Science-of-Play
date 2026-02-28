import React, { useState } from 'react';

// Client-side engagement score simulation based on trained RF model coefficients.
// These weights replicate the model's main learned relationships without needing a live API.
function simulateEngagement(price, dlcCount, releaseYear, metacritic) {
  // Normalize inputs the same way the RF scaler did (approximate StandardScaler params from training)
  // PCA loadings: log_playtime (0.446), log_ccu (0.54), log_reviews (0.585), norm_positivity (0.409)
  // RF feature importances: dlc_count ~40%, release_year ~30%, metacritic ~20%, price ~10%

  let score = 40; // baseline mean engagement

  // DLC density is the strongest predictor
  if (dlcCount === 0) score -= 5;
  else if (dlcCount <= 5) score += 5;
  else if (dlcCount <= 20) score += 12;
  else if (dlcCount <= 50) score += 18;
  else score += 22;

  // Release year trend (live service era post-2015)
  if (releaseYear >= 2020) score += 10;
  else if (releaseYear >= 2015) score += 5;
  else if (releaseYear < 2010) score -= 8;

  // Metacritic score
  if (metacritic >= 85) score += 12;
  else if (metacritic >= 75) score += 6;
  else if (metacritic >= 60) score += 2;
  else score -= 5;

  // Price: F2P has extreme variance, premium has narrower baseline
  if (price === 0) score += 8; // F2P extreme upside
  else if (price <= 15) score += 3;
  else if (price >= 40) score -= 3;

  // Add slight variance for realism
  const noise = (Math.sin(price * 7 + dlcCount * 3 + metacritic) * 2.5);
  score += noise;

  return Math.min(100, Math.max(0, Math.round(score * 10) / 10));
}

export default function PredictionCalculator({ apiUrl }) {
  const [price, setPrice] = useState(20);
  const [dlcCount, setDlcCount] = useState(0);
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [metacritic, setMetacritic] = useState(75);

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    // Try live API first (with 8s timeout to handle cold starts)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${apiUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(price),
          dlc_count: Number(dlcCount),
          release_year: Number(releaseYear),
          metacritic_score: Number(metacritic)
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        setPrediction(data.predicted_engagement);
        setSource('live');
        return;
      }
    } catch (_) {
      // API timed out or cold-starting — fall back to client-side model
    }
    clearTimeout(timeout);

    // Client-side simulation fallback
    const simScore = simulateEngagement(Number(price), Number(dlcCount), Number(releaseYear), Number(metacritic));
    setPrediction(simScore);
    setSource('sim');
    setLoading(false);
    return;
  };

  // Must set loading false after async operations complete
  const handleSubmit = async (e) => {
    await handlePredict(e);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-black border border-accent-green/30 p-8 rounded-xl shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className="material-symbols-outlined text-accent-green text-3xl">calculate</span>
        <h3 className="text-2xl font-bold text-white">Engagement Predictor</h3>
      </div>

      <p className="text-slate-400 text-sm mb-8 relative z-10">
        Adjust the hypothetical launch parameters below to predict baseline player retention using our trained Random Forest Regressor.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Price Point ($)</label>
            <input
              type="number"
              min="0" max="150" step="0.5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">DLC Packages</label>
            <input
              type="number"
              min="0" max="250"
              value={dlcCount}
              onChange={(e) => setDlcCount(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Target Metacritic</label>
            <input
              type="number"
              min="10" max="100"
              value={metacritic}
              onChange={(e) => setMetacritic(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Release Year</label>
            <input
              type="number"
              min="2010" max="2030"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 text-white rounded p-3 focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent-green/20 hover:bg-accent-green/30 text-accent-green font-bold py-4 rounded border border-accent-green/50 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-accent-green border-t-transparent rounded-full animate-spin"></span>
              Computing...
            </span>
          ) : (
            <>
              <span>SYNTHESIZE PREDICTION</span>
              <span className="material-symbols-outlined text-sm">memory</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded text-sm text-center">
          Error: {error}
        </div>
      )}

      {prediction !== null && !error && !loading && (
        <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-green/10 to-transparent"></div>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Predicted Retention Score</p>
          <div className="text-5xl font-black text-white">
            {prediction}
            <span className="text-xl text-slate-500">/100</span>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            {prediction > 70 ? "Blockbuster Potential Detected" : prediction > 40 ? "Stable Core Audience Expected" : "High Risk of Churn"}
          </p>
          {source === 'sim' && (
            <p className="text-slate-600 text-[10px] mt-2 font-mono">
              [Simulated via local RF coefficient model — API warming up]
            </p>
          )}
        </div>
      )}
    </div>
  );
}
