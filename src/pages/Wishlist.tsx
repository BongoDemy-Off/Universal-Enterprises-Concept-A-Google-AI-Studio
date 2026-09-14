import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { DataRepository } from '../data/repository';
import { useBike } from '../context/BikeContext';

export function Wishlist() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { selectedBike } = useBike();
  
  const allProducts = DataRepository.getProducts();
  const savedProducts = wishlistItems
    .map(id => allProducts.find(p => p.id === id))
    .filter(p => p !== undefined);

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
          <Heart size={48} />
        </div>
        <h1 className="text-2xl font-black text-brand-blue uppercase tracking-tight mb-4">Your Wishlist is Empty</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Save items you like and they will appear here for easy access later.</p>
        <Link to="/shop" className="inline-flex items-center justify-center bg-brand-red text-white font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-red-700 transition-colors">
          Explore Parts
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-border-subtle pb-4">
          <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight flex items-center gap-3">
             <Heart className="text-brand-red" size={28} /> My Wishlist
          </h1>
          <span className="text-sm font-bold text-slate-500 bg-surface-light px-3 py-1 rounded-sm uppercase tracking-widest">
            {savedProducts.length} Items
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <div key={product!.id} className="group flex flex-col bg-white border border-border-subtle rounded-sm hover:border-brand-red/50 hover:shadow-md transition-all duration-200 overflow-hidden relative">
              
              <div className="absolute top-2 right-2 z-10">
                <button 
                  onClick={() => toggleWishlist(product!.id)}
                  className="p-1.5 bg-white/80 backdrop-blur-sm border border-border-subtle rounded-sm text-slate-400 hover:text-brand-red hover:border-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <Link to={`/product/${product!.slug}`} className="block relative aspect-square bg-slate-50 overflow-hidden p-4">
                <div className="w-full h-full flex items-center justify-center">
                   <img 
                      src={product!.image} 
                      alt={product!.name_en} 
                      className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300 opacity-80"
                   />
                </div>
              </Link>

              <div className="p-4 flex flex-col flex-grow border-t border-border-subtle/50">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  {product!.brand}
                </div>
                
                <Link to={`/product/${product!.slug}`} className="block mb-2">
                  <h3 className="text-sm font-bold text-brand-blue leading-tight hover:text-brand-red transition-colors line-clamp-2">
                    {product!.name_en}
                  </h3>
                </Link>
                
                <div className="mt-auto mb-4">
                  {product!.sale_price ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5">৳ {product!.regular_price.toLocaleString('en-IN')}</span>
                      <span className="text-base font-black text-brand-red leading-none">৳ {product!.sale_price.toLocaleString('en-IN')}</span>
                    </div>
                  ) : (
                    <span className="text-base font-black text-brand-blue leading-none">৳ {product!.regular_price.toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (product!.stock_status !== 'out_of_stock') {
                        addToCart(product!.id, 1, selectedBike);
                        toggleWishlist(product!.id); // Optionally remove from wishlist when adding to cart
                      }
                    }}
                    disabled={product!.stock_status === 'out_of_stock'}
                    className="flex-grow flex items-center justify-center gap-2 px-3 py-2 bg-surface-light border border-border-strong text-brand-blue text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-blue hover:text-white hover:border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={14} /> Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
