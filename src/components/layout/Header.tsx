import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, ShieldCheck, Globe } from 'lucide-react';
import { DataRepository, Product } from '../../data/repository';
import { useBike } from '../../context/BikeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useI18n } from '../../context/I18nContext';

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { t, lang, setLang } = useI18n();

  // Close drawer & suggestions on route change
  useEffect(() => {
    setIsDrawerOpen(false);
    setShowSuggestions(false);
    setSearchQuery('');
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isDrawerOpen]);

  // Handle clicking outside of search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDrawerOpen(false);
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const suggestions = searchQuery.length > 1 ? DataRepository.searchProducts(searchQuery).slice(0, 5) : [];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      {/* Utility / Trust Bar */}
      <div className="bg-surface-dark text-white text-xs py-1.5 px-4 hidden sm:flex justify-between items-center">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <ShieldCheck size={14} className="text-brand-red" /> 
            Guaranteed Fitment
          </span>
          <span className="font-medium tracking-wide text-slate-300">
            Nationwide Delivery across Bangladesh
          </span>
          <span className="flex items-center gap-4 text-slate-300">
            <span>Support: [TBD]</span>
            <Link to="/contact" className="text-white hover:text-brand-red transition-colors font-medium">Contact Us</Link>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-brand-blue text-white py-3 px-4 relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 text-white hover:text-brand-red transition-colors" 
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col justify-center items-start group">
             <div className="text-xl md:text-2xl font-black tracking-tight leading-none uppercase flex items-center gap-2">
                <span className="text-white group-hover:text-gray-200 transition-colors">Universal</span>
             </div>
             <div className="text-[0.6rem] md:text-xs font-bold tracking-widest text-brand-red uppercase leading-none mt-1">
                Enterprises
             </div>
          </Link>

          {/* Desktop Search Entry */}
          <div className="hidden lg:flex flex-grow max-w-2xl mx-8 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input 
                type="text" 
                placeholder={t('search.placeholder')}
                className="w-full bg-white text-slate-900 font-medium rounded-sm py-2.5 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all shadow-inner"
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 text-slate-500 hover:text-brand-red hover:bg-slate-50 rounded-r-sm transition-colors flex items-center justify-center" aria-label="Submit search">
                <Search size={20} />
              </button>
            </form>

            {/* Predictive Search Suggestions */}
            {showSuggestions && searchQuery.length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border-subtle rounded-sm shadow-xl overflow-hidden z-50">
                {suggestions.length > 0 ? (
                  <ul>
                    {suggestions.map((product) => (
                      <li key={product.id} className="border-b border-border-subtle last:border-0">
                        <Link 
                          to={`/product/${product.slug}`} 
                          className="flex items-center gap-3 p-3 hover:bg-surface-light transition-colors focus:bg-surface-light focus:outline-none"
                        >
                          <img src={product.image} alt="" className="w-10 h-10 object-contain bg-white rounded-sm border border-border-subtle" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-brand-blue truncate">{product.name_en}</span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-widest">{product.sku || product.part_number}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                    <li>
                       <button 
                         onClick={handleSearchSubmit}
                         className="w-full text-center py-3 bg-slate-50 text-xs font-bold text-brand-red uppercase tracking-widest hover:bg-slate-100 transition-colors"
                       >
                         {t('search.allResults')} "{searchQuery}"
                       </button>
                    </li>
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-slate-500 text-center font-medium">
                    {t('search.noMatches')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 sm:gap-4">
             {/* Language Switcher */}
             <button 
               onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
               className="hidden sm:flex items-center gap-1.5 p-2 text-white hover:text-brand-red transition-colors font-bold text-[10px] uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm"
               aria-label={`Switch to ${lang === 'en' ? 'Bangla' : 'English'}`}
             >
               <Globe size={18} />
               <span>{lang === 'en' ? 'BN' : 'EN'}</span>
             </button>
             
             <Link to="/account" className="hidden sm:flex flex-col items-center p-2 text-white hover:text-brand-red transition-colors" aria-label="Account">
               <User size={22} />
               <span className="text-[10px] uppercase font-bold mt-1">{t('nav.account')}</span>
             </Link>
             
             <Link to="/wishlist" className="hidden sm:flex flex-col items-center p-2 text-white hover:text-brand-red transition-colors relative" aria-label="Wishlist">
               <Heart size={22} />
               <span className="absolute top-1 right-1 bg-brand-red text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">{wishlistItems.length}</span>
               <span className="text-[10px] uppercase font-bold mt-1">{t('nav.wishlist')}</span>
             </Link>
             
             <Link to="/cart" className="flex flex-col items-center p-2 text-white hover:text-brand-red transition-colors relative" aria-label="Shopping Cart">
               <ShoppingCart size={22} />
               <span className="absolute top-1 right-1 bg-brand-red text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">{cartCount}</span>
               <span className="hidden sm:block text-[10px] uppercase font-bold mt-1">{t('nav.cart')}</span>
             </Link>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-surface-dark border-b border-slate-800 shadow-sm" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link to="/shop" className="px-5 py-3.5 text-sm font-bold text-white hover:bg-brand-red transition-colors uppercase tracking-wide">{t('nav.shop')}</Link>
          <Link to="/shop-by-bike" className="px-5 py-3.5 text-sm font-bold text-brand-red hover:text-white hover:bg-brand-red transition-colors uppercase tracking-wide">{t('nav.shopByBike')}</Link>
          <Link to="/categories" className="px-5 py-3.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-brand-red transition-colors uppercase tracking-wide">{t('nav.categories')}</Link>
          <Link to="/brands" className="px-5 py-3.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-brand-red transition-colors uppercase tracking-wide">{t('nav.brands')}</Link>
          <Link to="/offers" className="px-5 py-3.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-brand-red transition-colors uppercase tracking-wide">{t('nav.offers')}</Link>
          <Link to="/blog" className="px-5 py-3.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-brand-red transition-colors uppercase tracking-wide">{t('nav.blog')}</Link>
          <Link to="/wholesale" className="px-5 py-3.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-brand-red transition-colors uppercase tracking-wide ml-auto flex items-center gap-2">
            {t('nav.wholesale')}
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Accessible Mobile Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[85%] max-w-sm bg-surface-light z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        <div className="bg-brand-blue text-white p-4 flex justify-between items-center shadow-sm">
          <span className="font-bold uppercase tracking-widest text-sm">Menu</span>
          <div className="flex items-center gap-4">
            {/* Mobile Lang Toggle */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1 text-white hover:text-brand-red font-bold text-[10px] uppercase tracking-widest"
              aria-label="Toggle Language"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'BN' : 'EN'}</span>
            </button>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="text-white hover:text-brand-red p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto py-2">
          {/* Mobile Search */}
          <div className="px-5 py-3 border-b border-border-subtle">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input 
                type="text" 
                placeholder={t('search.placeholder')}
                className="w-full bg-slate-100 text-slate-900 font-medium rounded-sm py-2.5 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-red transition-all shadow-inner text-sm"
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 text-slate-500 hover:text-brand-red transition-colors flex items-center justify-center" aria-label="Submit search">
                <Search size={20} />
              </button>
            </form>
          </div>
          
          <nav className="flex flex-col space-y-0" aria-label="Mobile Navigation">
            <MobileNavLink to="/shop">{t('nav.shop')}</MobileNavLink>
            <MobileNavLink to="/shop-by-bike" className="text-brand-red font-bold">{t('nav.shopByBike')}</MobileNavLink>
            <MobileNavLink to="/categories">{t('nav.categories')}</MobileNavLink>
            <MobileNavLink to="/brands">{t('nav.brands')}</MobileNavLink>
            <MobileNavLink to="/offers">{t('nav.offers')}</MobileNavLink>
            <MobileNavLink to="/blog">{t('nav.blog')}</MobileNavLink>
            
            <div className="h-px bg-border-subtle my-2 mx-4" />
            
            <MobileNavLink to="/account">{t('nav.account')}</MobileNavLink>
            <MobileNavLink to="/wishlist">{t('nav.wishlist')}</MobileNavLink>
            <MobileNavLink to="/cart">{t('nav.cart')}</MobileNavLink>
            <MobileNavLink to="/wholesale">{t('nav.wholesale')}</MobileNavLink>
          </nav>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="p-5 border-t border-border-subtle bg-white text-sm text-slate-600">
           <p className="font-bold text-brand-blue uppercase tracking-wide mb-2 text-xs">Customer Support</p>
           <p className="mb-1">Phone: <span className="font-medium text-slate-900">[TBD]</span></p>
           <p>WhatsApp: <span className="font-medium text-slate-900">[TBD]</span></p>
        </div>
      </div>
    </header>
  );
}

function MobileNavLink({ to, children, className = '' }: any) {
  return (
    <Link 
      to={to} 
      className={`block py-3.5 px-5 text-slate-800 font-semibold hover:bg-slate-100 hover:text-brand-red active:bg-slate-200 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}
