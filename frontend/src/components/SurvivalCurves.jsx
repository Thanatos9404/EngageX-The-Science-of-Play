import React from 'react';
import PlotlyChart from './PlotlyChart';

const SurvivalCurves = ({ data, apiUrl }) => {
  return (
    <section className="min-h-screen relative px-6 py-20 bg-background-dark border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-secondary font-mono text-xl font-bold">[ LEVEL 02 ]</span>
          <div className="h-px bg-secondary/30 flex-grow"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">Retention Survival Decay</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-white leading-tight">
              Real Retention Outlasts Abstract Engagement.
            </h3>

            <p className="text-slate-300 leading-relaxed font-medium">
              Moving beyond cross-sectional composite scores, we define a concrete proxy for longitudinal health: <strong>the percentage of games maintaining robust active communities (Above-Median Peak CCU)</strong> across different lifecycle stages (1 to 10 years).
            </p>

            <div className="bg-slate-900 border-l-4 border-secondary p-6 rounded backdrop-blur">
              <p className="text-sm font-mono text-secondary mb-2">SURVIVAL_TRAJECTORY_OBSERVED</p>
              <p className="text-slate-200">
                Premium games decay predictably. However, <strong>DLC-Heavy</strong> ecosystems demonstrate extreme resilience, actively resisting the standard 3-year mortality rate of standard releases. Free-to-Play titles experience massive early drop-offs but those that survive establish permanent plateaus.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-secondary/20 rounded-lg blur group-hover:bg-secondary/40 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-700 p-2 rounded min-h-[460px]">
                <PlotlyChart
                  chartName="survival_curves"
                  title=""
                  className="w-full h-auto border-none bg-transparent p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SurvivalCurves;
