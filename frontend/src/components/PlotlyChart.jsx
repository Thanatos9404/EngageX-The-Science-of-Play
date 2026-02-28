import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);
import { Oval } from 'react-loader-spinner';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function PlotlyChart({
  chartName,
  title,
  description,
  className
}) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await fetch(`/assets/${chartName}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${chartName}`);
        }
        const data = await response.json();

        // Merge in responsive layout properties while keeping python-generated layout
        const layout = {
          ...data.layout,
          autosize: true,
          margin: { t: 40, r: 20, l: 40, b: 40, ...data.layout?.margin },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: {
            family: 'Inter, sans-serif',
            color: '#f8fafc'
          }
        };

        setChartData({ data: data.data, layout });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [chartName]);

  return (
    <div className={cn("bg-[#1e293b]/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm", className)}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>

      <div className="w-full relative min-h-[300px] flex items-center justify-center rounded-lg border border-slate-700/30 bg-[#0f172a]/50 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a]/80 z-10 transition-opacity duration-300">
            <Oval
              height={40}
              width={40}
              color="#38bdf8"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#0ea5e9"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          </div>
        )}

        {error && (
          <div className="text-red-400 flex flex-col items-center">
            <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {chartData && (
          <div className="w-full h-full min-h-[400px]">
            <Plot
              data={chartData.data}
              layout={chartData.layout}
              useResizeHandler={true}
              style={{ width: '100%', height: '100%' }}
              config={{
                displayModeBar: true,
                responsive: true,
                displaylogo: false,
                modeBarButtonsToRemove: ['lasso2d', 'select2d']
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
