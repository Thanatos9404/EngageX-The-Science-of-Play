import React from 'react';
import PlotlyChart from './PlotlyChart';

const Level3AhaMoment = ({ data, apiUrl }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 overflow-hidden flex flex-col justify-center">
      {/* ... Background styling ... */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-xl font-bold">[ LEVEL 01 ]</span>
          <div className="h-px bg-slate-700 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">The Insight</h2>
        </div>

        <div className="mb-16">
          <div className="inline-block bg-accent-green/10 text-accent-green border border-accent-green/30 px-3 py-1 rounded text-sm font-mono mb-6 backdrop-blur">
            STRUCTURAL_TIMELINE_DIVERGENCE
          </div>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Post-2015 engagement growth is structurally driven by F2P and DLC-heavy ecosystems.
          </h3>

          <div className="bg-slate-900/80 border-l-4 border-accent-green p-6 rounded-r mb-12 backdrop-blur max-w-4xl">
            <p className="text-slate-300 text-lg leading-relaxed font-medium mb-4">
              Segmenting the dataset longitudinally reveals the true engineering shift. The baseline attention span for standalone Premium titles has remained functionally flat. The industry's massive aggregate engagement spikes over the last decade are almost entirely attributable to Free-to-Play models and games sustaining high DLC density.
            </p>
            {data?.cohort_slopes && (
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-700 font-mono text-sm">
                <div>
                  <h4 className="text-secondary mb-2 font-bold uppercase tracking-wider">Free-to-Play Ecosystems</h4>
                  <p className="flex justify-between border-b border-slate-800 pb-1"><span>Slope (β)</span> <span className="text-white">+{data.cohort_slopes.f2p_slope} /yr</span></p>
                  <p className="flex justify-between border-b border-slate-800 py-1"><span>Variance (R²)</span> <span className="text-white">{data.cohort_slopes.f2p_r2}</span></p>
                  <p className="flex justify-between py-1"><span>P-Value</span> <span className="text-white">{data.cohort_slopes.f2p_pval}</span></p>
                </div>
                <div>
                  <h4 className="text-slate-400 mb-2 font-bold uppercase tracking-wider">Premium Standalone</h4>
                  <p className="flex justify-between border-b border-slate-800 pb-1"><span>Slope (β)</span> <span className="text-white">{data.cohort_slopes.b2p_slope > 0 ? '+' : ''}{data.cohort_slopes.b2p_slope} /yr</span></p>
                  <p className="flex justify-between border-b border-slate-800 py-1"><span>Variance (R²)</span> <span className="text-white">{data.cohort_slopes.b2p_r2}</span></p>
                  <p className="flex justify-between py-1"><span>P-Value</span> <span className="text-white">{data.cohort_slopes.b2p_pval}</span></p>
                </div>
              </div>
            )}
          </div>

          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-primary/20 rounded-lg blur group-hover:bg-primary/40 transition duration-500"></div>
            <div className="relative bg-slate-900 border border-slate-700 p-2 rounded min-h-[500px]">
              <PlotlyChart
                chartName="cohort_divergence"
                title=""
                className="w-full h-auto border-none bg-transparent p-0"
              />
              <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 text-[10px] text-primary font-mono border border-primary/30 backdrop-blur z-20">
                [95%_CI_BOOTSTRAPPED]
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Genre Dominance & ML */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-tr from-slate-900 to-transparent border border-slate-700/50 p-6 rounded-xl relative overflow-hidden">
            <h4 className="font-bold text-white mb-4 text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">category</span>
              Genre Dominance
            </h4>
            <PlotlyChart
              chartName="genre_performance"
              title=""
              className="w-full h-[400px] mb-4 border-none bg-transparent p-0 relative z-10"
            />
            <p className="text-sm text-slate-400 relative z-10">
              Mean engagement scores segmented by primary genre classification. Role-playing and strategy engines structurally demand higher hour counts, skewing absolute engagement.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-slate-900 to-transparent border border-slate-700/50 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-9xl">memory</span>
            </div>
            <h4 className="font-bold text-white mb-4 text-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">psychology</span>
              Predictive Modeling
            </h4>
            <p className="text-slate-300 text-sm mb-6 relative z-10">
              A multivariable linear regression model evaluating the independent impact of features on the final Engagement Score index.
            </p>
            <div className="relative z-10 bg-slate-900/50 border border-slate-700 p-4 rounded font-mono text-sm text-accent-green mb-4">
              {data?.ml_insights ? (
                <div className="grid grid-cols-2 gap-2">
                  <div>&gt; Model R² Score:</div><div className="text-white">{data.ml_insights.r2_score}</div>
                  <div>&gt; CV Mean R²:</div><div className="text-white">{data.ml_insights.cv_mean_r2}</div>
                  <div>&gt; Mean Abs Error:</div><div className="text-white">{data.ml_insights.mae}</div>
                  <div className="col-span-2 pt-2 border-t border-slate-700 mt-2 text-primary">
                    &gt; Primary Feature: {data.ml_insights.top_feature.toUpperCase()}
                  </div>
                </div>
              ) : "Loading regression analysis..."}
            </div>
            <PlotlyChart
              chartName="feature_importance"
              title=""
              className="w-full h-[300px] border-none bg-transparent p-0 relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Level3AhaMoment;
