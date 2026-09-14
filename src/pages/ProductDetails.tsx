import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataRepository } from '../data/repository';
import { 
  Heart, HelpCircle, CheckCircle2, AlertTriangle, XCircle, Globe, ChevronRight, 
  Minus, Plus, ShieldCheck, Truck, ArrowRight, PlayCircle, Star, Package, Wrench
} from 'lucide-react';
import { useBike } from '../context/BikeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useI18n } from '../context/I18nContext';
import { ProductCard } from '../components/commerce/ProductCard';

export function ProductDetails() {
  const { slug } = useParams();
  const { selectedBike } = useBike();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useI18n();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const navigate = require('react-router-dom').useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Find product from demo data
  const products = DataRepository.getProducts();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-brand-blue uppercase">Product Not Found</h1>
        <Link to="/shop" className="text-brand-red font-bold mt-4 inline-block">Return to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isMismatch = product.fitment_state_demo === 'nonmatch_example';
  const isUncertain = product.fitment_state_demo === 'check_fitment';

  // Evaluate Fitment for PDP
  const getFitmentDisplay = () => {
    if (!selectedBike) {
      return (
        <div className="bg-slate-50 border border-border-subtle p-4 rounded-sm flex items-start gap-3">
          <HelpCircle size={20} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-brand-blue">Will this fit your bike?</h4>
            <p className="text-xs text-slate-500 mt-1 mb-3">Select your motorcycle to guarantee fitment.</p>
            <Link to="/shop-by-bike" className="inline-block text-[10px] font-bold text-white bg-brand-blue px-3 py-1.5 rounded-sm uppercase tracking-wider hover:bg-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-1">{t('nav.shopByBike')}</Link>
          </div>
        </div>
      );
    }

    switch (product.fitment_state_demo) {
      case 'confirmed_fit':
      case 'multi_model_fit':
        return (
          <div className="bg-green-50 border border-green-200 p-4 rounded-sm flex items-start gap-3">
            <CheckCircle2 size={20} className="text-green-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-green-800">{t('fitment.fitsBike')}</h4>
              <p className="text-xs text-green-700 mt-1">This part is confirmed to fit your {selectedBike.year} {selectedBike.brand} {selectedBike.model} {selectedBike.variant}.</p>
            </div>
          </div>
        );
      case 'universal_fit':
        return (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-sm flex items-start gap-3">
            <Globe size={20} className="text-purple-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-purple-800">{t('fitment.universal')}</h4>
              <p className="text-xs text-purple-700 mt-1">This is a universal part. It may require minor modifications to fit your {selectedBike.brand} {selectedBike.model}.</p>
            </div>
          </div>
        );
      case 'check_fitment':
        return (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-amber-800">{t('fitment.checkFitment')}</h4>
              <p className="text-xs text-amber-700 mt-1">This part fits some variations of the {selectedBike.model}. Please read the description carefully or ask for support.</p>
            </div>
          </div>
        );
      case 'nonmatch_example':
      default:
        return (
          <div className="bg-red-50 border border-red-200 p-4 rounded-sm flex items-start gap-3">
            <XCircle size={20} className="text-red-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-red-800">{t('fitment.doesNotFit')}</h4>
              <p className="text-xs text-red-700 mt-1 mb-2">This part is not compatible with your {selectedBike.year} {selectedBike.brand} {selectedBike.model}.</p>
              <Link to={`/shop-by-bike`} className="text-[10px] font-bold text-brand-red uppercase tracking-wider hover:underline inline-flex items-center gap-1"><ArrowRight size={12}/> Find parts that fit</Link>
            </div>
          </div>
        );
    }
  };

  const handleQtyChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(product.stock_qty || 10, quantity + delta)));
  };

  const handleAddToCart = () => {
    if (product.stock_status === 'out_of_stock') return;
    addToCart(product.id, quantity, selectedBike);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };
  
  const handleBuyNow = () => {
    if (product.stock_status === 'out_of_stock') return;
    addToCart(product.id, quantity, selectedBike);
    navigate('/checkout');
  };
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="w-full relative pb-32 lg:pb-16 bg-white">
      {/* ABOVE THE FOLD */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
          <Link to="/" className="hover:text-brand-red transition-colors">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-brand-red transition-colors">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to={`/category/${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-brand-red transition-colors">{product.category}</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-brand-blue truncate max-w-[200px] sm:max-w-xs">{product.name_en}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Stage */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 border border-border-subtle p-8 flex items-center justify-center aspect-square rounded-sm relative overflow-hidden group">
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.sale_price && (
                  <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">Sale</span>
                )}
                {product.stock_status === 'low_stock' && (
                  <span className="bg-warning text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">Low Stock</span>
                )}
                {product.stock_status === 'out_of_stock' && (
                  <span className="bg-slate-700 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">Out of Stock</span>
                )}
              </div>
              <img src={selectedImage || product.image || '/placeholders/mechanical-part.svg'} alt={product.name_en} className="w-full h-full object-contain" />
            </div>
            
            {/* Gallery placeholder if data existed */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                 {[product.image, ...product.gallery].slice(0, 4).map((img, i) => (
                   <button key={i} onClick={() => setSelectedImage(img)} className={`aspect-square bg-slate-50 border rounded-sm p-2 hover:border-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red ${selectedImage === img || (!selectedImage && i === 0) ? 'border-brand-red' : 'border-border-subtle'}`}>
                     <img src={img} className="w-full h-full object-contain" alt="" />
                   </button>
                 ))}
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Link to={`/brand/${product.brand.toLowerCase()}`} className="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2 block hover:underline w-fit">{product.brand}</Link>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-brand-blue leading-tight mb-4">{product.name_en}</h1>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pb-2">
                {product.part_number && <span>PN: {product.part_number}</span>}
                {product.sku && <span className="border-l border-border-strong pl-4">SKU: {product.sku}</span>}
                {product.oem_number && <span className="border-l border-border-strong pl-4">OEM: {product.oem_number}</span>}
              </div>
              {/* Ratings Demo */}
              <div className="flex items-center gap-1.5 mt-2">
                 <div className="flex text-amber-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} className={product.rating_demo > 4.5 ? "fill-currentColor" : "text-slate-300"} />
                 </div>
                 <span className="text-xs font-medium text-slate-500">({product.reviews_count_demo} reviews)</span>
              </div>
            </div>

            <div className="mb-8">
              {product.sale_price ? (
                <div className="flex items-end gap-3">
                  <span className="text-3xl lg:text-4xl font-black text-brand-red leading-none">৳ {product.sale_price.toLocaleString('en-IN')}</span>
                  <span className="text-lg text-slate-400 line-through leading-none pb-0.5">৳ {product.regular_price.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <span className="text-3xl lg:text-4xl font-black text-brand-blue leading-none">৳ {product.regular_price.toLocaleString('en-IN')}</span>
              )}
              {product.stock_qty > 0 && product.stock_status !== 'out_of_stock' ? (
                <p className="text-xs font-bold text-success uppercase tracking-widest mt-3 flex items-center gap-1">
                  <CheckCircle2 size={14} /> In Stock ({product.stock_qty} available)
                </p>
              ) : (
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3 flex items-center gap-1">
                  <XCircle size={14} /> Out of Stock
                </p>
              )}
            </div>

            {/* Fitment Module */}
            <div className="mb-8">
              {getFitmentDisplay()}
            </div>

            {/* Purchase Actions */}
            <div className="mb-8">
              <div className="flex flex-col gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quantity</span>
                  <div className="flex items-center border border-border-strong rounded-sm overflow-hidden w-fit">
                    <button onClick={() => handleQtyChange(-1)} disabled={product.stock_status === 'out_of_stock'} className="px-3 py-2 bg-surface-light hover:bg-slate-200 text-slate-600 transition-colors disabled:opacity-50"><Minus size={16} /></button>
                    <input type="number" value={quantity} readOnly className="w-12 text-center text-sm font-bold text-slate-800 bg-white py-2 focus:outline-none" />
                    <button onClick={() => handleQtyChange(1)} disabled={product.stock_status === 'out_of_stock'} className="px-3 py-2 bg-surface-light hover:bg-slate-200 text-slate-600 transition-colors disabled:opacity-50"><Plus size={16} /></button>
                  </div>
                </div>

                {/* Sticky Mobile Actions / Standard Desktop Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border-subtle shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40 lg:static lg:p-0 lg:border-none lg:bg-transparent lg:shadow-none flex gap-3">
                  {product.stock_status === 'out_of_stock' ? (
                    <button className="flex-grow bg-slate-200 text-slate-500 font-bold uppercase tracking-widest py-3 lg:py-4 rounded-sm text-sm cursor-not-allowed text-center">
                      {t('action.outOfStock')}
                    </button>
                  ) : isMismatch || isUncertain ? (
                     <div className="flex gap-2 flex-grow">
                        <Link 
                          to={`/contact?subject=Fitment+Question&bike=${selectedBike ? `${selectedBike.brand}-${selectedBike.model}` : 'unknown'}&product=${product.sku}`}
                          className="flex-grow bg-surface-light hover:bg-slate-200 text-brand-blue border border-border-strong font-bold uppercase tracking-widest py-3 lg:py-4 rounded-sm transition-colors text-xs lg:text-sm text-center flex items-center justify-center gap-2"
                        >
                          <HelpCircle size={16} /> {t('action.askSupport')}
                        </Link>
                        <button 
                          onClick={handleAddToCart}
                          className="flex-grow bg-slate-800 hover:bg-slate-900 text-white font-bold uppercase tracking-widest py-3 lg:py-4 rounded-sm transition-colors text-xs lg:text-sm text-center shadow-sm"
                        >
                          {addedFeedback ? t('action.addedShort') : t('action.addAnyway')}
                        </button>
                     </div>
                  ) : (
                     <>
                       <button 
                         onClick={handleAddToCart}
                         className={`flex-1 font-bold uppercase tracking-widest py-3 lg:py-4 rounded-sm transition-colors text-xs lg:text-sm border border-border-strong focus:outline-none focus:ring-2 focus:ring-brand-blue ${addedFeedback ? 'bg-green-600 text-white border-green-600' : 'bg-surface-light hover:bg-slate-200 text-brand-blue'}`}
                       >
                         {addedFeedback ? t('action.added') : t('action.addToCart')}
                       </button>
                       <button 
                         onClick={handleBuyNow}
                         className="flex-1 bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest py-3 lg:py-4 rounded-sm transition-colors text-xs lg:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2">
                         {t('action.buyNow')}
                       </button>
                     </>
                  )}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`px-4 border border-border-strong rounded-sm transition-colors hidden sm:flex items-center justify-center bg-white focus:outline-none focus:ring-2 focus:ring-brand-red ${isWishlisted ? 'text-brand-red border-brand-red' : 'text-slate-600 hover:text-brand-red hover:border-brand-red'}`}
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery / Payment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-6 border-t border-border-subtle">
               <div className="flex items-start gap-3">
                 <div className="p-2 bg-surface-light rounded-full text-brand-blue shrink-0"><Truck size={16}/></div>
                 <div>
                   <h5 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Nationwide Delivery</h5>
                   <p className="text-xs text-slate-500 mt-1">2-4 days standard shipping via Pathao or Steadfast.</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <div className="p-2 bg-surface-light rounded-full text-brand-blue shrink-0"><ShieldCheck size={16}/></div>
                 <div>
                   <h5 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Secure Payment</h5>
                   <p className="text-xs text-slate-500 mt-1">Cash on Delivery available for most locations.</p>
                 </div>
               </div>
            </div>
            
            {/* Support CTA */}
            <div className="mt-auto bg-slate-50 p-4 border-l-4 border-brand-blue text-sm">
              <p className="font-bold text-slate-800 mb-1">Need fitment help?</p>
              <p className="text-xs text-slate-500 mb-3">Our experts can verify if this part fits your motorcycle.</p>
              <Link 
                to={`/contact?subject=Fitment+Question&bike=${selectedBike ? `${selectedBike.brand}-${selectedBike.model}` : 'unknown'}&product=${product.sku}`} 
                className="text-brand-blue text-xs font-bold hover:underline inline-flex items-center gap-1 uppercase tracking-wider"
              >
                <HelpCircle size={14} /> Contact fitment experts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BELOW THE FOLD */}
      <div className="bg-surface-light border-y border-border-subtle mt-16 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            <div className="lg:col-span-2 flex flex-col gap-16">
              {/* Description */}
              <section>
                <h3 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6 flex items-center gap-2">
                   <Package size={20} className="text-brand-red" /> Product Details
                </h3>
                <div className="prose prose-sm prose-slate max-w-none text-slate-600 space-y-4 font-medium leading-relaxed">
                  <p>{product.short_description}</p>
                  <p>Genuine OEM or premium aftermarket part designed specifically for optimum performance and longevity. Manufactured adhering strictly to factory standards ensuring a flawless fit and finish.</p>
                </div>
              </section>

              {/* Specifications Table */}
              <section>
                <h3 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6">Specifications</h3>
                <div className="border border-border-subtle rounded-sm overflow-hidden bg-white">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-border-subtle">
                      <tr className="bg-surface-light/50">
                        <th className="px-4 py-3 font-bold text-slate-700 w-1/3">Brand</th>
                        <td className="px-4 py-3 text-slate-600 font-medium">{product.brand}</td>
                      </tr>
                      <tr>
                        <th className="px-4 py-3 font-bold text-slate-700">Category</th>
                        <td className="px-4 py-3 text-slate-600 font-medium">{product.category}</td>
                      </tr>
                      {product.part_number && (
                        <tr className="bg-surface-light/50">
                          <th className="px-4 py-3 font-bold text-slate-700">Part Number</th>
                          <td className="px-4 py-3 font-mono text-slate-600">{product.part_number}</td>
                        </tr>
                      )}
                      {product.oem_number && (
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-700">OEM Replacement</th>
                          <td className="px-4 py-3 font-mono text-slate-600">{product.oem_number}</td>
                        </tr>
                      )}
                      {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === (product.part_number && product.oem_number ? 0 : 1) ? 'bg-surface-light/50' : 'bg-white'}>
                          <th className="px-4 py-3 font-bold text-slate-700 capitalize">{key.replace(/_/g, ' ')}</th>
                          <td className="px-4 py-3 text-slate-600 font-medium">{value}</td>
                        </tr>
                      ))}
                      <tr className={Object.keys(product.specifications || {}).length % 2 === 0 ? 'bg-surface-light/50' : 'bg-white'}>
                        <th className="px-4 py-3 font-bold text-slate-700">Country of Origin</th>
                        <td className="px-4 py-3 text-slate-600 font-medium">India (Placeholder)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Fits These Motorcycles */}
              <section>
                 <h3 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6 flex items-center gap-2">
                   <Wrench size={20} className="text-brand-red" /> Compatible Motorcycles
                 </h3>
                 <div className="bg-white border border-border-subtle rounded-sm p-1">
                   {product.fitments_demo && product.fitments_demo.length > 0 ? (
                      <ul className="divide-y divide-border-subtle text-sm">
                        {product.fitments_demo.map((fit, idx) => (
                          <li key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <span className="font-bold text-slate-700">{fit.make} {fit.model}</span>
                            <span className="text-slate-500 font-medium text-xs">{fit.years}</span>
                          </li>
                        ))}
                      </ul>
                   ) : (
                      <div className="p-6 text-center text-slate-500 font-medium text-sm">
                        {product.universal_fit_demo ? 'Universal Fit - Compatible with most motorcycles.' : 'Fitment data currently unavailable for this part.'}
                      </div>
                   )}
                 </div>
              </section>

              {/* Optional Video Module Placeholder */}
              <section>
                 <h3 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6">Product Video</h3>
                 <div className="aspect-video bg-slate-900 rounded-sm relative flex items-center justify-center group overflow-hidden border border-border-strong cursor-pointer">
                    <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" alt="" loading="lazy" />
                    <div className="absolute inset-0 bg-brand-blue/20 mix-blend-multiply"></div>
                    <div className="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-brand-red group-hover:border-transparent transition-all shadow-lg">
                      <PlayCircle size={32} />
                    </div>
                 </div>
              </section>
            </div>

            {/* Sidebar info */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-border-subtle p-6 rounded-sm shadow-sm">
                 <h4 className="font-black text-brand-blue uppercase tracking-tight mb-4 border-b border-border-subtle pb-4">Warranty</h4>
                 <div className="flex items-start gap-3">
                    <ShieldCheck size={24} className="text-brand-red shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{product.warranty}</p>
                      <p className="text-xs text-slate-500 mt-1 font-medium">Claims must be processed with original invoice and packaging. Electrical items are non-returnable once opened.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white border border-border-subtle p-6 rounded-sm shadow-sm">
                 <h4 className="font-black text-brand-blue uppercase tracking-tight mb-4 border-b border-border-subtle pb-4">Shipping & Returns</h4>
                 <div className="flex flex-col gap-4 text-sm font-medium">
                    <div className="flex items-start gap-3">
                       <Truck size={20} className="text-slate-400 shrink-0" />
                       <div>
                         <p className="font-bold text-slate-800">Inside Dhaka</p>
                         <p className="text-xs text-slate-500">1-2 Business Days (৳ 60)</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <Truck size={20} className="text-slate-400 shrink-0" />
                       <div>
                         <p className="font-bold text-slate-800">Outside Dhaka</p>
                         <p className="text-xs text-slate-500">2-4 Business Days (৳ 120)</p>
                       </div>
                    </div>
                    <div className="mt-2 pt-4 border-t border-border-subtle">
                       <Link to="/shipping" className="text-xs font-bold text-brand-blue uppercase tracking-widest hover:text-brand-red transition-colors block mb-2">View Shipping Policy</Link>
                       <Link to="/returns" className="text-xs font-bold text-brand-blue uppercase tracking-widest hover:text-brand-red transition-colors block">View Return Policy</Link>
                    </div>
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Reviews Summary Placeholder */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
         <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-8">
            <h3 className="text-xl md:text-2xl font-black text-brand-blue uppercase tracking-tight">Customer Reviews</h3>
            <button onClick={() => alert('Review functionality is a prototype placeholder.')} className="text-[10px] font-bold text-white bg-brand-blue px-4 py-2 rounded-sm uppercase tracking-widest hover:bg-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red">Write a Review</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 text-center md:text-left flex flex-col items-center md:items-start justify-center border-r-0 md:border-r border-border-subtle">
               <span className="text-5xl font-black text-brand-blue">{product.rating_demo.toFixed(1)}</span>
               <div className="flex text-amber-400 my-2">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} className={product.rating_demo > 4.5 ? "fill-currentColor" : "text-slate-300"} />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Based on {product.reviews_count_demo} reviews</span>
            </div>
            <div className="col-span-1 md:col-span-3 space-y-6">
               <div className="bg-surface-light p-6 rounded-sm border border-border-subtle">
                  <div className="flex justify-between items-start mb-3">
                     <div>
                       <span className="font-bold text-sm text-slate-800 block">Verified Purchaser</span>
                       <div className="flex text-amber-400 mt-1">
                          <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                       </div>
                     </div>
                     <span className="text-xs text-slate-500 font-medium">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">Exact OEM match. Arrived perfectly packaged and bolted right on. Delivery was fast considering I'm outside Dhaka. Would recommend.</p>
               </div>
            </div>
         </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16 w-full">
           <h3 className="text-xl md:text-2xl font-black text-brand-blue uppercase tracking-tight mb-8">You May Also Need</h3>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {relatedProducts.map(p => (
               <ProductCard key={p.id} product={p} />
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
