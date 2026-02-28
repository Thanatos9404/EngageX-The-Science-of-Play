import React from 'react';
import PlotlyChart from './PlotlyChart';

const EthicalLayer = ({ data }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 bg-background-dark border-t border-red-900/20">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-red-900/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-red-500 font-mono text-xl font-bold">[ LEVEL_04 ]</span>
          <div className="h-px bg-red-900/50 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">The Cost of Retention</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Are Engagement Mechanics Creating Fatigue?</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              While peak concurrent users and infinite playtime loops are heralded as industry triumphs, the data reveals a secondary vector: <span className="text-red-400 font-bold">Review Volatility</span>.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              As titles push beyond the 90th percentile of engagement scores, the influx of negative reviews accelerates non-linearly. High-retention ecosystems often structurally mandate persistent grinding, leading to community burnout and friction.
            </p>

            <div className="bg-red-950/30 border-l-4 border-red-500 p-6 rounded backdrop-blur">
              <p className="text-sm font-mono text-red-300 mb-2">CRITICAL_OBSERVATION</p>
              <p className="text-slate-200">
                {data?.ethical_insight || "Optimization for maximum playtime does not perfectly correlate with player satisfaction. Excessive engagement mechanisms often incur an aggressive 'attention tax' manifesting as severe sentiment downgrades over the lifecycle of the product."}
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur group-hover:bg-red-500/40 transition duration-500"></div>
            <div className="relative bg-slate-900 border border-slate-700 p-2 rounded min-h-[400px]">
              <PlotlyChart
                chartName="fatigue_analysis"
                title=""
                className="w-full h-auto border-none bg-transparent p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthicalLayer;
