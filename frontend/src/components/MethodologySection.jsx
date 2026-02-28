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
                <h3 className="text-xl font-bold text-white mb-2">Predictability Limits</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  The Random Forest Regressor explains roughly ~35% of total engagement variance. 95% Confidence Intervals mapped over 100 bootstrapped trees confirm DLC density impacts, but overlapping standard deviations demand analytical restraint.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start mt-8 pt-6 border-t border-slate-700/50">
              <span className="material-symbols-outlined text-secondary text-3xl mt-1">source</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Radical Transparency</h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                  Full methodological reproducibility is available. The entire data processing pipeline, Kruskal-Wallis code, Bootstrapping logic, and PCA validations are open-sourced.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://github.com/Thanatos9404/EngageX-The-Science-of-Play/blob/main/data_analysis.py" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs text-white font-mono py-2 px-3 rounded transition-colors border border-slate-600">
                    <span className="material-symbols-outlined text-sm">code</span> Verify Raw Logic
                  </a>
                  <a href="https://colab.research.google.com/github/Thanatos9404/EngageX-The-Science-of-Play/blob/main/frontend/public/EngageX_Analysis.ipynb" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-xs text-secondary font-mono py-2 px-3 rounded transition-colors border border-secondary/30">
                    <span className="material-symbols-outlined text-sm">terminal</span> Run Full Analysis (Colab)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
