import { useState, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DataRepository, Bike } from '../../data/repository';
import { useBike } from '../../context/BikeContext';
import { useI18n } from '../../context/I18nContext';

// DEMO DATA - Metadata clearly marks this as prototype fitment data
const DEMO_YEARS = ['2025', '2024', '2023', '2022', '2021', '2020'];
const DEMO_CCS = ['125', '150', '160', '250', '300', '400', '650'];
const DEMO_VARIANTS = ['Standard', 'ABS', 'Dual Channel ABS', 'Pro', 'Rally'];

export function ShopByBikeSelector() {
  const { setBike } = useBike();
  const navigate = useNavigate();
  const { t } = useI18n();

  const demoBikes = DataRepository.getDemoBikes();
  const availableBrands = useMemo(() => Array.from(new Set(demoBikes.map(b => b.brand))).sort(), [demoBikes]);
  
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCc, setSelectedCc] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  
  const models = useMemo(() => {
    if (!selectedBrand) return [];
    return Array.from(new Set(demoBikes.filter(b => b.brand === selectedBrand).map(b => b.model))).sort();
  }, [selectedBrand, demoBikes]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedBrand && selectedModel && selectedYear && selectedCc && selectedVariant) {
      const exactMatch = demoBikes.find(b => b.brand === selectedBrand && b.model === selectedModel);
      
      const newBike: Bike = {
        id: exactMatch ? exactMatch.id : `mock-${selectedBrand}-${selectedModel}-${selectedYear}`.toLowerCase().replace(/\s+/g, '-'),
        brand: selectedBrand,
        model: selectedModel,
        year: selectedYear,
        cc: selectedCc,
        variant: selectedVariant,
        demoOnly: true
      };

      setBike(newBike);
      navigate('/shop');
    }
  };

  const isFormValid = selectedBrand && selectedModel && selectedYear && selectedCc && selectedVariant;

  return (
    <div className="bg-white border-t-4 border-brand-red rounded-sm shadow-xl p-6 lg:p-8 w-full max-w-6xl mx-auto relative z-20">
      <h2 className="text-xl md:text-2xl font-black text-brand-blue uppercase tracking-tight mb-6">
        Select Your Motorcycle
      </h2>
      
      <form 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        onSubmit={handleSubmit}
      >
        {/* Brand */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Brand</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-surface-light border border-border-subtle text-sm font-semibold text-slate-800 py-3 pl-4 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow"
              value={selectedBrand}
              onChange={(e) => { 
                setSelectedBrand(e.target.value); 
                setSelectedModel(''); setSelectedYear(''); setSelectedCc(''); setSelectedVariant('');
              }}
              required
            >
              <option value="">{t('fitment.selectBrand')}</option>
              {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Model */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Model</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-surface-light border border-border-subtle text-sm font-semibold text-slate-800 py-3 pl-4 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow disabled:opacity-50 disabled:bg-slate-50"
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSelectedYear(''); setSelectedCc(''); setSelectedVariant('');
              }}
              disabled={!selectedBrand}
              required
            >
              <option value="">{t('fitment.selectModel')}</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Year / Gen */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Year / Gen</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-surface-light border border-border-subtle text-sm font-semibold text-slate-800 py-3 pl-4 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow disabled:opacity-50 disabled:bg-slate-50"
              value={selectedYear}
              onChange={(e) => { setSelectedYear(e.target.value); setSelectedCc(''); setSelectedVariant(''); }}
              disabled={!selectedModel}
              required
            >
              <option value="">{t('fitment.selectYear')}</option>
              {DEMO_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* CC */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Engine CC</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-surface-light border border-border-subtle text-sm font-semibold text-slate-800 py-3 pl-4 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow disabled:opacity-50 disabled:bg-slate-50"
              value={selectedCc}
              onChange={(e) => { setSelectedCc(e.target.value); setSelectedVariant(''); }}
              disabled={!selectedYear}
              required
            >
              <option value="">{t('fitment.selectCC')}</option>
              {DEMO_CCS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Variant */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Variant</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-surface-light border border-border-subtle text-sm font-semibold text-slate-800 py-3 pl-4 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-shadow disabled:opacity-50 disabled:bg-slate-50"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              disabled={!selectedCc}
              required
            >
              <option value="">{t('fitment.selectVariant')}</option>
              {DEMO_VARIANTS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-end lg:col-span-1 sm:col-span-2 md:col-span-1">
          <button 
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-brand-red text-white font-bold uppercase tracking-wider py-3 px-4 rounded-sm flex items-center justify-center gap-2 hover:bg-brand-red/90 active:bg-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search size={18} />
            <span>{t('fitment.findParts')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
