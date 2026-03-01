import React from 'react';
import PlotlyChart from './PlotlyChart';

const Level2Comparisons = ({ data, apiUrl }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 flex-row-reverse">
          <span className="text-accent-green font-mono text-xl font-bold">[ LEVEL 03 ]</span>
          <div className="h-px bg-accent-green/30 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider text-right">The Economics of Attention</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-accent-green/20 rounded-lg blur group-hover:bg-accent-green/40 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-700 p-2 rounded min-h-[400px]">
                <PlotlyChart
                  chartName="pricing_regression"
                  title=""
                  className="w-full h-auto border-none bg-transparent p-0"
                />
                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 text-[10px] text-accent-green font-mono border border-accent-green/30 backdrop-blur">
                  [TIER_ANALYSIS]
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-700 p-4 rounded text-center">
                <div className="text-sm text-slate-400 font-mono mb-2">Paid Games</div>
                <div className="text-lg font-bold text-white">Baseline Retention</div>
              </div>
              <div className="bg-slate-900 border border-slate-700 border-b-accent-green p-4 rounded text-center">
                <div className="text-sm text-slate-400 font-mono mb-2">F2P Models</div>
                <div className="text-lg font-bold text-accent-green">Extreme Spikes</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="bg-gradient-to-br from-slate-900 to-transparent border border-slate-700/50 p-8 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 text-white">Do Free Games Steal More Time?</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Initial unit price exhibits a complex relationship with lifetime engagement. Free-to-play models show enormous variance, capturing the highest extreme outliers in retention, while premium titles ($20+) demonstrate a more consistent, narrower baseline of adherence.
              </p>
              <div className="flex items-start gap-4 p-4 bg-black/40 rounded border border-slate-800">
                <span className="material-symbols-outlined text-primary mt-1">query_stats</span>
                <p className="text-sm font-mono text-primary/80">
                  Significant disparities exist between pricing tier engagement vectors.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-tl from-slate-900 to-transparent border border-slate-700/50 p-6 rounded-xl">
              <h4 className="font-bold text-white mb-3">DLC & Expansions</h4>
              <PlotlyChart
                chartName="dlc_impact"
                title=""
                className="w-full h-[400px] mb-4 border-none bg-transparent p-0"
              />
              <p className="text-slate-400 text-sm">
                Expanding the core loop: By looking at the regression, we observe a distinct positive correlation between DLC density and player retention.
              </p>
              {data?.dlc_insight && (
                <div className="text-sm font-mono text-accent-green bg-accent-green/10 p-3 rounded border border-accent-green/20">
                  {data.dlc_insight}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Level2Comparisons;
