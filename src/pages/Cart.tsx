import { Link } from 'react-router-dom';
import { Trash2, Heart, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useI18n } from '../context/I18nContext';
import { DataRepository } from '../data/repository';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useI18n();
  const allProducts = DataRepository.getProducts();

  const cartDetails = cartItems.map(item => {
    const product = allProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const subtotal = cartDetails.reduce((sum, item) => sum + ((item.product?.sale_price || item.product?.regular_price || 0) * item.quantity), 0);
  const deliveryEstimate = subtotal > 0 ? 120 : 0; // Default outside dhaka estimate placeholder
  const total = subtotal + deliveryEstimate;

  if (cartDetails.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-2xl font-black text-brand-blue uppercase tracking-tight mb-4">{t('cart.empty')}</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added any parts to your cart yet.</p>
        <Link to="/shop" className="inline-flex items-center justify-center bg-brand-red text-white font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-red-700 transition-colors">
          {t('cart.continue')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight mb-8">{t('cart.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-white border border-border-subtle rounded-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border-subtle bg-surface-light text-xs font-bold text-slate-500 uppercase tracking-widest">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              <ul className="divide-y divide-border-subtle">
                {cartDetails.map((item) => (
                  <li key={item.productId} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">
                    
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4 w-full">
                      <Link to={`/product/${item.product!.slug}`} className="w-24 h-24 bg-slate-50 rounded-sm border border-border-subtle p-2 shrink-0">
                        <img src={item.product!.image} alt={item.product!.name_en} className="w-full h-full object-contain" />
                      </Link>
                      <div className="flex flex-col">
                        <Link to={`/brand/${item.product!.brand.toLowerCase()}`} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 hover:text-brand-red">{item.product!.brand}</Link>
                        <Link to={`/product/${item.product!.slug}`} className="text-sm font-bold text-brand-blue leading-snug hover:text-brand-red transition-colors mb-2 line-clamp-2">
                          {item.product!.name_en}
                        </Link>
                        
                        <div className="text-xs font-black text-brand-red mb-2">
                           ৳ {(item.product!.sale_price || item.product!.regular_price).toLocaleString('en-IN')}
                        </div>

                        {item.bikeContext && (
                          <div className="text-[10px] text-slate-500 bg-surface-light border border-border-subtle px-2 py-1 rounded-sm w-fit mt-1">
                            <span className="font-bold">For:</span> {item.bikeContext.brand} {item.bikeContext.model}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 mt-auto pt-2">
                          <button 
                            onClick={() => toggleWishlist(item.productId)} 
                            className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red ${isInWishlist(item.productId) ? 'text-brand-red' : 'text-slate-500'}`}
                          >
                            <Heart size={14} fill={isInWishlist(item.productId) ? 'currentColor' : 'none'} /> 
                            <span className="hidden sm:inline">{isInWishlist(item.productId) ? 'Saved' : 'Save'}</span>
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.productId)} 
                            className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-red-600 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-red"
                          >
                            <Trash2 size={14} /> 
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-3 flex justify-start md:justify-center w-full">
                      <div className="flex flex-col items-start md:items-center">
                        <div className="flex items-center border border-border-strong rounded-sm overflow-hidden bg-white">
                          <button 
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1.5 bg-surface-light hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red"
                          >
                            <Minus size={14} />
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity} 
                            readOnly 
                            className="w-10 text-center text-sm font-bold text-slate-800 py-1.5 focus:outline-none" 
                          />
                          <button 
                            onClick={() => updateQuantity(item.productId, Math.min(item.product!.stock_qty || 10, item.quantity + 1))}
                            className="px-3 py-1.5 bg-surface-light hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        {item.quantity >= (item.product!.stock_qty || 10) && (
                           <span className="text-[10px] text-brand-red font-bold uppercase tracking-widest mt-1">Max stock reached</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Line Total */}
                    <div className="col-span-3 text-right hidden md:block font-black text-slate-800">
                       ৳ {((item.product!.sale_price || item.product!.regular_price) * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border-subtle rounded-sm p-6 sticky top-24 shadow-sm">
              <h2 className="font-black text-brand-blue uppercase tracking-tight mb-6 pb-4 border-b border-border-subtle">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>{t('cart.subtotal')} ({cartDetails.length} items)</span>
                  <span>৳ {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>{t('cart.delivery')}</span>
                  <span>৳ {deliveryEstimate.toLocaleString('en-IN')}</span>
                </div>
                
                {/* Coupon Input Demo */}
                <div className="pt-4 mt-2 border-t border-border-subtle">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Promo code" className="flex-grow bg-slate-50 border border-border-strong rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue uppercase" />
                    <button onClick={() => alert('Coupons are not supported in this prototype.')} className="bg-slate-800 text-white font-bold uppercase tracking-widest text-xs px-4 rounded-sm hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue">Apply</button>
                  </div>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-800">Total</span>
                  <div className="text-right">
                     <span className="text-2xl font-black text-brand-red block leading-none">৳ {total.toLocaleString('en-IN')}</span>
                     <span className="text-[10px] text-slate-500 uppercase tracking-widest">VAT Included</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="w-full bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded-sm transition-colors text-sm shadow-sm flex items-center justify-center gap-2 mb-3">
                {t('cart.proceed')} <ArrowRight size={16} />
              </Link>
              
              <Link to="/shop" className="w-full bg-white hover:bg-surface-light border border-border-strong text-brand-blue font-bold uppercase tracking-widest py-3 rounded-sm transition-colors text-xs flex items-center justify-center">
                {t('cart.continue')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
