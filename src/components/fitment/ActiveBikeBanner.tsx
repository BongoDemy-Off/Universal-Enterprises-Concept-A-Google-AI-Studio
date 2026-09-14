import { useBike } from '../../context/BikeContext';
import { X, Wrench } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function ActiveBikeBanner() {
  const { selectedBike, clearBike } = useBike();
  const location = useLocation();

  if (!selectedBike) return null;

  return (
    <div className="bg-brand-blue text-white w-full border-b-2 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Wrench size={16} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Selected Motorcycle</span>
            <span className="text-sm font-bold">
              {selectedBike.brand} {selectedBike.model} <span className="text-slate-300 font-normal">({selectedBike.year} {selectedBike.cc}cc {selectedBike.variant})</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {location.pathname !== '/' && (
            <Link 
              to="/shop-by-bike" 
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Change
            </Link>
          )}
          <button 
            onClick={clearBike}
            className="p-1.5 bg-white/10 hover:bg-brand-red text-white rounded-sm transition-colors"
            aria-label="Remove selected bike"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
