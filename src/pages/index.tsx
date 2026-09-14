import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Truck, ShieldCheck, Wrench, ArrowRight, ChevronRight } from 'lucide-react';
import { DataRepository } from '../data/repository';
import { ShopByBikeSelector } from '../components/fitment/ShopByBikeSelector';
import { ProductCard } from '../components/commerce/ProductCard';
import { ProductListing } from '../components/commerce/ProductListing';

function SectionHeading({ title, subtitle, actionText, actionLink }: { title: string, subtitle?: string, actionText?: string, actionLink?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-2 font-medium">{subtitle}</p>}
      </div>
      {actionText && actionLink && (
        <Link to={actionLink} className="text-sm font-bold text-brand-red flex items-center gap-1 hover:text-brand-blue transition-colors group">
          {actionText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}

export function Home() {
  const products = DataRepository.getProducts();
  const categories = DataRepository.getCategories();
  const brands = DataRepository.getBrands();

  // Mock splits for New Arrivals and Best Sellers
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);
  const offers = products.filter(p => p.sale_price !== null).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative bg-brand-blue overflow-hidden">
        {/* Subtle mechanical background pattern placeholder */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-32 lg:pt-24 lg:pb-40 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4 max-w-3xl leading-tight">
            Find the right part for your motorcycle
          </h1>
          <p className="text-slate-300 text-sm md:text-base font-medium max-w-xl mb-8">
            Premium OEM and aftermarket components. Guaranteed fitment across Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. Shop By Bike Selector (Overlapping Hero) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 lg:-mt-24 mb-16 relative z-20 flex justify-center w-full">
        <ShopByBikeSelector />
      </section>

      {/* 3. Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        <SectionHeading title="Shop by Category" subtitle="Browse our top-level systems" actionText="View All Categories" actionLink="/categories" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              key={category} 
              to={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="bg-surface-light border border-border-subtle p-6 flex flex-col items-center text-center rounded-sm hover:border-brand-blue hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Wrench size={24} className="text-slate-400 group-hover:text-brand-red transition-colors" />
              </div>
              <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wide leading-tight group-hover:text-brand-red transition-colors">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Shop by Brand */}
      <section className="bg-surface-light border-y border-border-subtle py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title="Featured Brands" subtitle="Genuine parts from top manufacturers" actionText="View All Brands" actionLink="/brands" />
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {brands.map((brand) => (
              <Link 
                key={brand.name} 
                to={`/brand/${brand.name.toLowerCase()}`}
                className="bg-white border border-border-subtle p-4 flex items-center justify-center rounded-sm hover:border-brand-red hover:shadow-sm transition-all grayscale hover:grayscale-0"
              >
                <span className="font-black text-brand-blue tracking-tighter uppercase">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
        <SectionHeading title="New Arrivals" actionText="View All" actionLink="/new-arrivals" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* 6. Offers / Flash Sale Demo */}
      {offers.length > 0 && (
        <section className="bg-brand-red text-white py-16 w-full relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px' }}></div>
           <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Flash Sale</h2>
                  <p className="text-sm text-white/80 mt-2 font-medium">Limited time offers on premium parts</p>
                </div>
                <Link to="/offers" className="text-sm font-bold bg-white text-brand-red px-6 py-2.5 rounded-sm hover:bg-slate-100 transition-colors uppercase tracking-wider shadow-sm">
                  View All Offers
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {offers.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
           </div>
        </section>
      )}

      {/* 7. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
        <SectionHeading title="Best Sellers" actionText="View All" actionLink="/best-sellers" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* 8. Popular Bike Shortcuts */}
      <section className="bg-surface-light border-t border-border-subtle py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
           <h2 className="text-xl md:text-2xl font-black text-brand-blue uppercase tracking-tight mb-8">Popular Rides in Bangladesh</h2>
           <div className="flex flex-wrap justify-center gap-3">
             <Link to="/shop-by-bike?model=r15-v4" className="bg-white border border-border-subtle px-6 py-3 rounded-full text-sm font-bold text-slate-700 hover:text-brand-red hover:border-brand-red transition-all shadow-sm">
               Yamaha R15 V4
             </Link>
             <Link to="/shop-by-bike?model=pulsar-n160" className="bg-white border border-border-subtle px-6 py-3 rounded-full text-sm font-bold text-slate-700 hover:text-brand-red hover:border-brand-red transition-all shadow-sm">
               Bajaj Pulsar N160
             </Link>
             <Link to="/shop-by-bike?model=apache-rtr-160-4v" className="bg-white border border-border-subtle px-6 py-3 rounded-full text-sm font-bold text-slate-700 hover:text-brand-red hover:border-brand-red transition-all shadow-sm">
               TVS Apache RTR 160 4V
             </Link>
             <Link to="/shop-by-bike?model=gixxer-sf" className="bg-white border border-border-subtle px-6 py-3 rounded-full text-sm font-bold text-slate-700 hover:text-brand-red hover:border-brand-red transition-all shadow-sm">
               Suzuki Gixxer SF
             </Link>
           </div>
        </div>
      </section>

      {/* 9. Guides & Maintenance Preview */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
        <SectionHeading title="Maintenance Guides" subtitle="Keep your ride in top condition" actionText="Read the Blog" actionLink="/blog" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white border border-border-subtle rounded-sm overflow-hidden group hover:shadow-md transition-shadow">
             <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Image Placeholder</div>
             </div>
             <div className="p-6">
                <div className="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Guide</div>
                <h3 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-red transition-colors">How to identify the correct OEM part number</h3>
                <Link to="/blog/identify-oem" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 hover:text-brand-red transition-colors">Read Article <ChevronRight size={14}/></Link>
             </div>
           </div>
           <div className="bg-white border border-border-subtle rounded-sm overflow-hidden group hover:shadow-md transition-shadow">
             <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Image Placeholder</div>
             </div>
             <div className="p-6">
                <div className="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Maintenance</div>
                <h3 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-red transition-colors">Chain and sprocket replacement guide</h3>
                <Link to="/blog/chain-sprocket" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 hover:text-brand-red transition-colors">Read Article <ChevronRight size={14}/></Link>
             </div>
           </div>
           <div className="bg-white border border-border-subtle rounded-sm overflow-hidden group hover:shadow-md transition-shadow">
             <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Image Placeholder</div>
             </div>
             <div className="p-6">
                <div className="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Checklist</div>
                <h3 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-red transition-colors">When to replace your motorcycle air filter</h3>
                <Link to="/blog/air-filter" className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 hover:text-brand-red transition-colors">Read Article <ChevronRight size={14}/></Link>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Trust / Value Proposition Strip */}
      <section className="bg-surface-dark text-white py-12 w-full border-b-4 border-brand-red">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck size={32} className="text-brand-red mb-4" />
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Nationwide Delivery</h4>
            <p className="text-xs text-slate-400 font-medium">Reliable shipping across all districts in Bangladesh via Pathao & Steadfast.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={32} className="text-brand-red mb-4" />
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Quality Parts</h4>
            <p className="text-xs text-slate-400 font-medium">OEM and premium aftermarket components sourced directly.</p>
          </div>
          <div className="flex flex-col items-center">
            <Wrench size={32} className="text-brand-red mb-4" />
            <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Fitment Confidence</h4>
            <p className="text-xs text-slate-400 font-medium">Shop by your exact motorcycle model for guaranteed compatibility.</p>
          </div>
        </div>
      </section>

      {/* 11. Wholesale Inquiry CTA */}
      <section className="bg-brand-blue text-white py-16 w-full text-center">
         <div className="max-w-3xl mx-auto px-4">
           <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">Business & Wholesale Orders</h2>
           <p className="text-slate-300 text-sm md:text-base font-medium mb-8">
             Are you a dealer, repair shop, or fleet operator? Contact us for wholesale pricing and bulk supply inquiries.
           </p>
           <Link to="/wholesale" className="inline-block bg-brand-red text-white font-bold uppercase tracking-widest py-4 px-8 rounded-sm hover:bg-white hover:text-brand-red transition-colors shadow-lg">
             Submit Inquiry
           </Link>
         </div>
      </section>

    </div>
  );
}

// PLP Routes
export function Shop() { 
  const products = DataRepository.getProducts();
  return <ProductListing title="Shop All Parts" initialProducts={products} />; 
}

export function CategoryDetails() { 
  const { slug } = useParams();
  const products = DataRepository.getProducts();
  // Mock category parsing for prototype
  const categoryName = slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Category';
  // Attempt to match closely if exact match fails in mock
  const categoryProducts = products.filter(p => p.category.toLowerCase().includes(categoryName.toLowerCase().split(' ')[0]));
  
  return <ProductListing title={categoryName} initialProducts={categoryProducts} hideCategoryFilter={true} />; 
}

export function BrandDetails() { 
  const { slug } = useParams();
  const products = DataRepository.getProducts();
  const brandName = slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Brand';
  const brandProducts = products.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
  
  return <ProductListing title={`${brandName} Parts`} initialProducts={brandProducts} hideBrandFilter={true} />; 
}

export function SearchResults() { 
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const products = DataRepository.searchProducts(q);
  
  return <ProductListing title={`Results for "${q}"`} initialProducts={products} />; 
}

// Ensure the other static route exports remain intact
export function ShopByBike() { 
  return (
    <div className="bg-slate-50 min-h-[70vh] py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight mb-8 text-center">Select Your Motorcycle</h1>
        <ShopByBikeSelector />
      </div>
    </div>
  );
}

export { ProductDetails } from './ProductDetails';
export { Cart } from './Cart';
export { Checkout } from './Checkout';
export { OrderConfirmation } from './OrderConfirmation';
export { Wishlist } from './Wishlist';

// Feature Pages
export { AccountDashboard, AccountOrders, OrderDetails, SavedAddresses, MyBike, Profile } from './Account';
export { TrackOrder, Wholesale, StaticPage } from './InfoPages';
export { MarketingGrid, BlogIndex, BlogPost } from './MarketingPages';

