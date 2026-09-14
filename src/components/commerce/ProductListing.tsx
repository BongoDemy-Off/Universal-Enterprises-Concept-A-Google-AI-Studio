import { useState, useMemo } from 'react';
import { Filter, X, ChevronDown, SlidersHorizontal, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, DataRepository } from '../../data/repository';
import { ProductCard } from './ProductCard';
import { ActiveBikeBanner } from '../fitment/ActiveBikeBanner';

interface ProductListingProps {
  title: string;
  initialProducts: Product[];
  hideCategoryFilter?: boolean;
  hideBrandFilter?: boolean;
}

export function ProductListing({ title, initialProducts, hideCategoryFilter, hideBrandFilter }: ProductListingProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('recommended');

  const categoriesList = DataRepository.getCategories();
  const brandsList = DataRepository.getBrands().map(b => b.name);
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [partNumberFilter, setPartNumberFilter] = useState('');

  // Derived filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    if (selectedAvailability.length > 0) {
      result = result.filter(p => selectedAvailability.includes(p.stock_status));
    }
    if (priceMin !== '') {
      const min = parseFloat(priceMin);
      if (!isNaN(min)) result = result.filter(p => (p.sale_price ?? p.regular_price) >= min);
    }
    if (priceMax !== '') {
      const max = parseFloat(priceMax);
      if (!isNaN(max)) result = result.filter(p => (p.sale_price ?? p.regular_price) <= max);
    }
    if (partNumberFilter.trim() !== '') {
      const q = partNumberFilter.toLowerCase();
      result = result.filter(p => p.part_number?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.oem_number?.toLowerCase().includes(q));
    }

    // Sorting
    switch (sortOption) {
      case 'newest':
        result.reverse(); // Mock newest
        break;
      case 'best_selling':
        result.sort((a, b) => b.reviews_count_demo - a.reviews_count_demo);
        break;
      case 'price_asc':
        result.sort((a, b) => (a.sale_price ?? a.regular_price) - (b.sale_price ?? b.regular_price));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.sale_price ?? b.regular_price) - (a.sale_price ?? a.regular_price));
        break;
      case 'recommended':
      default:
        break;
    }

    return result;
  }, [initialProducts, selectedCategories, selectedBrands, selectedAvailability, priceMin, priceMax, partNumberFilter, sortOption]);

  const activeFilterCount = selectedCategories.length + selectedBrands.length + selectedAvailability.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + (partNumberFilter ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedAvailability([]);
    setPriceMin('');
    setPriceMax('');
    setPartNumberFilter('');
  };

  const toggleArrayItem = (setter: any, array: string[], item: string) => {
    if (array.includes(item)) setter(array.filter(i => i !== item));
    else setter([...array, item]);
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-brand-blue uppercase tracking-tight">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="text-[10px] font-bold text-brand-red uppercase tracking-wider hover:underline">
            Clear All
          </button>
        )}
      </div>

      {!hideCategoryFilter && (
        <div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Category</h4>
          <div className="flex flex-col gap-2">
            {categoriesList.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded-sm border-border-strong text-brand-red focus:ring-brand-red"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleArrayItem(setSelectedCategories, selectedCategories, cat)}
                />
                <span className="group-hover:text-brand-red transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {!hideBrandFilter && (
        <div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Brand</h4>
          <div className="flex flex-col gap-2">
            {brandsList.map(brand => (
              <label key={brand} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded-sm border-border-strong text-brand-red focus:ring-brand-red"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleArrayItem(setSelectedBrands, selectedBrands, brand)}
                />
                <span className="group-hover:text-brand-red transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Availability</h4>
        <div className="flex flex-col gap-2">
          {['in_stock', 'low_stock', 'out_of_stock'].map(status => (
            <label key={status} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded-sm border-border-strong text-brand-red focus:ring-brand-red"
                checked={selectedAvailability.includes(status)}
                onChange={() => toggleArrayItem(setSelectedAvailability, selectedAvailability, status)}
              />
              <span className="group-hover:text-brand-red transition-colors capitalize">{status.replace(/_/g, ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Price Range (BDT)</h4>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            placeholder="Min" 
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full bg-surface-light border border-border-subtle text-sm p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
          <span className="text-slate-400">-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full bg-surface-light border border-border-subtle text-sm p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Part/OEM Number</h4>
        <input 
          type="text" 
          placeholder="e.g. OEM-2001" 
          value={partNumberFilter}
          onChange={(e) => setPartNumberFilter(e.target.value)}
          className="w-full bg-surface-light border border-border-subtle text-sm p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      <ActiveBikeBanner />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 w-full flex flex-col md:flex-row gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-32">
          <FilterContent />
        </aside>

        {/* Main Content */}
      <div className="flex-grow w-full">
        {/* Header Area */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight leading-none mb-2">{title}</h1>
            <p className="text-sm font-medium text-slate-500">{filteredProducts.length} {filteredProducts.length === 1 ? 'part' : 'parts'} found</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button 
              className="md:hidden flex items-center justify-center gap-2 bg-white border border-border-subtle px-4 py-2 text-sm font-bold text-brand-blue uppercase tracking-wider rounded-sm focus:ring-2 focus:ring-brand-red relative"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={16} /> Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">{activeFilterCount}</span>
              )}
            </button>

            {/* Sort */}
            <div className="relative flex-grow sm:flex-grow-0">
              <select 
                className="w-full sm:w-48 appearance-none bg-white border border-border-subtle text-xs font-bold text-brand-blue uppercase tracking-wider py-2.5 pl-4 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red transition-shadow"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="best_selling">Best Selling</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Chips (Desktop) */}
        {activeFilterCount > 0 && (
          <div className="hidden md:flex flex-wrap gap-2 mb-6">
             {selectedCategories.map(cat => (
               <span key={cat} className="inline-flex items-center gap-1 bg-surface-light border border-border-subtle text-xs font-medium px-2 py-1 rounded-sm text-slate-700">
                 {cat} <button aria-label={`Remove ${cat} filter`} onClick={() => toggleArrayItem(setSelectedCategories, selectedCategories, cat)} className="hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm"><X size={12}/></button>
               </span>
             ))}
             {selectedBrands.map(brand => (
               <span key={brand} className="inline-flex items-center gap-1 bg-surface-light border border-border-subtle text-xs font-medium px-2 py-1 rounded-sm text-slate-700">
                 {brand} <button aria-label={`Remove ${brand} filter`} onClick={() => toggleArrayItem(setSelectedBrands, selectedBrands, brand)} className="hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm"><X size={12}/></button>
               </span>
             ))}
             {partNumberFilter && (
               <span className="inline-flex items-center gap-1 bg-surface-light border border-border-subtle text-xs font-medium px-2 py-1 rounded-sm text-slate-700">
                 PN: {partNumberFilter} <button aria-label="Remove part number filter" onClick={() => setPartNumberFilter('')} className="hover:text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm"><X size={12}/></button>
               </span>
             )}
             <button onClick={clearAllFilters} className="text-xs font-bold text-brand-red uppercase tracking-wider hover:underline ml-2 focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Clear All</button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-border-subtle py-16 px-4 text-center rounded-sm">
             <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchX size={32} className="text-slate-400" />
             </div>
             <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight mb-2">No Parts Found</h3>
             <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto font-medium">We couldn't find any products matching your current filters and search terms.</p>
             <Link to="/contact" className="inline-flex bg-brand-red text-white font-bold uppercase tracking-widest py-3 px-8 rounded-sm hover:bg-brand-red/90 transition-colors shadow-sm">
                Ask us to find the part
             </Link>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileFilterOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Filter Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:hidden ${
          isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filter Options"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsMobileFilterOpen(false);
          }
        }}
      >
        <div className="bg-brand-blue text-white p-4 flex justify-between items-center shadow-sm">
          <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <Filter size={18} /> Filters
          </span>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-white hover:text-brand-red p-2 -mr-2 focus:outline-none focus:ring-2 focus:ring-brand-red"
            aria-label="Close filters"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 bg-surface-light">
          <FilterContent />
        </div>

        <div className="p-4 border-t border-border-subtle bg-white grid grid-cols-2 gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
           <button 
             onClick={clearAllFilters}
             className="border border-border-strong text-slate-600 font-bold uppercase tracking-wider text-xs py-3 rounded-sm hover:bg-slate-50"
           >
             Clear All
           </button>
           <button 
             onClick={() => setIsMobileFilterOpen(false)}
             className="bg-brand-red text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm hover:bg-brand-red/90 shadow-sm"
           >
             Show {filteredProducts.length} Results
           </button>
        </div>
      </div>
    </div>
    </div>
  );
}
