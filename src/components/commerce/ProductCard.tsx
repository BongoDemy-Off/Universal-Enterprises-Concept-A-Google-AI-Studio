import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Product } from '../../data/repository';
import { useWishlist } from '../../context/WishlistContext';
import { useI18n } from '../../context/I18nContext';

interface ProductCardProps {
  key?: string | number;
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useI18n();
  
  // Format price (assuming BDT)
  const formatPrice = (price: number) => `৳ ${price.toLocaleString('en-IN')}`;

  const hasSale = product.sale_price !== null && product.sale_price < product.regular_price;

  return (
    <div className="group flex flex-col bg-white border border-border-subtle rounded-sm hover:border-brand-red/50 hover:shadow-md transition-all duration-200 overflow-hidden relative">
      
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasSale && (
          <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Sale
          </span>
        )}
        {product.stock_status === 'low_stock' && (
          <span className="bg-warning text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Low Stock
          </span>
        )}
        {product.stock_status === 'out_of_stock' && (
          <span className="bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Out of Stock
          </span>
        )}
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={(e) => {
             e.preventDefault();
             toggleWishlist(product.id);
          }}
          className={`p-1.5 bg-white/80 backdrop-blur-sm border border-border-subtle rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red ${isInWishlist(product.id) ? 'text-brand-red border-brand-red' : 'text-slate-400 hover:text-brand-red hover:border-brand-red'}`}
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Image Placeholder */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-slate-50 overflow-hidden p-4 focus:outline-none focus:ring-2 focus:ring-brand-red">
        <div className="w-full h-full flex items-center justify-center">
           <img 
              src={product.image || '/placeholders/mechanical-part.svg'} 
              alt={product.name_en} 
              className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300 opacity-80"
              loading="lazy"
           />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
          {product.brand}
        </div>
        
        <Link to={`/product/${product.slug}`} className="block mb-2 flex-grow focus:outline-none focus:ring-2 focus:ring-brand-red">
          <h3 className="text-sm font-bold text-brand-blue leading-tight group-hover:text-brand-red transition-colors line-clamp-2">
            {product.name_en}
          </h3>
        </Link>
        
        <div className="text-xs text-slate-500 mb-3 font-mono">
          {product.part_number ? `PN: ${product.part_number}` : (product.sku ? `SKU: ${product.sku}` : '')}
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-border-subtle/50">
          <div>
            {hasSale ? (
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 line-through leading-none mb-0.5">{formatPrice(product.regular_price)}</span>
                <span className="text-base font-black text-brand-red leading-none">{formatPrice(product.sale_price as number)}</span>
              </div>
            ) : (
              <span className="text-base font-black text-brand-blue leading-none">{formatPrice(product.regular_price)}</span>
            )}
          </div>
          
          <Link 
            to={`/product/${product.slug}`}
            className="flex items-center justify-center px-3 py-1.5 bg-surface-light border border-border-strong text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-brand-blue hover:text-white hover:border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red"
            aria-label={`View details for ${product.name_en}`}
          >
            View Details
          </Link>
        </div>
      </div>
      
      {/* Demo Fitment Strip (Bottom) */}
      {product.fitment_state_demo === 'confirmed_fit' && (
        <div className="bg-success/10 border-t border-success/20 px-4 py-1.5 flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-success" />
          <span className="text-[10px] font-bold text-success uppercase tracking-wide">Fits your bike</span>
        </div>
      )}
      {product.fitment_state_demo === 'check_fitment' && (
        <div className="bg-warning/10 border-t border-warning/20 px-4 py-1.5 flex items-center gap-1.5">
          <ShieldAlert size={12} className="text-warning" />
          <span className="text-[10px] font-bold text-warning uppercase tracking-wide">Check Fitment</span>
        </div>
      )}
    </div>
  );
}
