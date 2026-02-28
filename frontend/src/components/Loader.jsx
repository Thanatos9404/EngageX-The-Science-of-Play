import React from 'react';

const Loader = () => (
  <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center font-mono">
    <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(6,249,249,0.5)]"></div>
    <div className="text-primary text-sm font-bold tracking-widest uppercase animate-pulse">
      Loading System Modules...
    </div>
  </div>
);

export default Loader;
