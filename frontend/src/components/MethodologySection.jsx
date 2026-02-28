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
                <h3 className="text-xl font-bold text-white mb-2">Data Cleaning & Preprocessing</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Parsed raw Steam data containing {data?.methodology?.clean_count
                    ? `over ${data.methodology.clean_count.toLocaleString()}`
                    : 'extensive'} records. Null values in numeric columns were imputed, and games with zero documented playtime or extreme outliers (top 1%) were removed to prevent skew.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-accent-green text-3xl mt-1">functions</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">The Engagement Index</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  A composite metric created by applying a <b>logarithmic transformation</b> to heavily skewed features (`average_playtime_forever` and `peak_ccu`).
                  The normalized components are weighted: Playtime (40%), Peak CCU (30%), Total Reviews (20%), and Positivity Ratio (10%), then scaled from 0-100.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-yellow-500 text-3xl mt-1">insights</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Statistical Rigor</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Instead of observational correlations, findings are validated using independent T-Tests to extract <i>p-values</i>, ensuring observed differences (e.g., between pricing tiers) are statistically significant and not due to random variance.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="material-symbols-outlined text-slate-500 text-3xl mt-1">warning</span>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Limitations</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  The Steam dataset represents a single platform ecosystem. Furthermore, 'average playtime' is heavily influenced by idle time and long-tail power users. Machine learning evaluations rely on fundamental linear regressions and do not currently capture non-linear mechanics.
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
