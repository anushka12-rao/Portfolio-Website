import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    teal: 'bg-teal-950/60 text-teal-300 border border-teal-500/30',
    emerald: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30',
    blue: 'bg-blue-950/60 text-blue-300 border border-blue-500/30',
    amber: 'bg-amber-950/60 text-amber-300 border border-amber-500/30',
    rose: 'bg-rose-950/60 text-rose-300 border border-rose-500/30',
    purple: 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[11px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${className}`}>
      {children}
    </span>
  );
}
