import React from 'react';

const MethodologySection = ({ data }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 border-t border-primary/20 bg-background-light dark:bg-slate-900 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-slate-400 font-mono text-xl font-bold">[ METHODOLOGY ]</span>
          <div className="h-px bg-slate-700 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">Scientific Approach</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-primary text-3xl mt-1">cleaning_services</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Data Preprocessing & Cleaning</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Processed {data?.methodology?.dataset_claim || "over 8,000 highly structured records"}. Idle-inflation bots and achievement-farming games (mean playtime &gt; 10x median) were aggressively filtered out.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-accent-green text-3xl mt-1">functions</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">The Engagement Index (PCA)</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  A composite metric extracted via unsupervised <b>Principal Component Analysis (PCA)</b> explaining {data?.methodology?.pca_variance_explained || "significant variance"}.
                  <br /><br />
                  <span className="text-accent-green font-mono text-xs">{data?.methodology?.robustness_check || "Independent PCA validation confirms composite structure mathematically."}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-yellow-500 text-3xl mt-1">insights</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Statistical Rigor & Effect Sizes</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Instead of relying solely on observational correlations or simple p-values, findings are validated using bootstrapped Confidence Intervals (95%) and standardized <b>Cohen's <i>d</i> Effect Sizes</b> to quantify the true magnitude of differences.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-slate-500 text-3xl mt-1">memory</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Random Forest Predictions</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  A high-capacity Random Forest Regressor captures non-linear mechanic interactions, cross-validated alongside structured polynomial fits to map exactly where mathematical review bombing thresholds are triggered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
