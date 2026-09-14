import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';

export function MobileBottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-subtle z-40 flex justify-between items-center px-2 pb-2 pt-1 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]"
      aria-label="Mobile Bottom Navigation"
    >
      <NavItem to="/" icon={<Home size={22} />} label="Home" active={isActive('/')} />
      <NavItem to="/shop-by-bike" icon={<Search size={22} />} label="Find Parts" active={isActive('/shop-by-bike')} />
      <NavItem to="/wishlist" icon={<Heart size={22} />} label="Wishlist" active={isActive('/wishlist')} badge={0} />
      <NavItem to="/cart" icon={<ShoppingCart size={22} />} label="Cart" active={isActive('/cart')} badge={0} />
      <NavItem to="/account" icon={<User size={22} />} label="Account" active={isActive('/account') || location.pathname.startsWith('/account')} />
    </nav>
  );
}

function NavItem({ to, icon, label, active, badge }: any) {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-full py-1.5 ${active ? 'text-brand-red' : 'text-slate-500 hover:text-slate-900'} transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-inset`}
      aria-current={active ? 'page' : undefined}
    >
      <div className="relative mb-1">
        {icon}
        {badge !== undefined && (
          <span className="absolute -top-1.5 -right-2.5 bg-brand-red text-white text-[9px] min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full font-bold shadow-sm border border-white">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-bold tracking-wide">{label}</span>
    </Link>
  );
}
