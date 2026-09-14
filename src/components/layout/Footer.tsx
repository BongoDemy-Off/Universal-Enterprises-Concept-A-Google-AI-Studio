import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-dark text-slate-300 pt-16 pb-24 lg:pb-10 border-t-4 border-brand-red mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Company Identity */}
        <div className="space-y-4">
           <div className="flex flex-col items-start mb-6">
             <div className="text-2xl font-black tracking-tight leading-none uppercase flex items-center gap-2">
                <span className="text-white">Universal</span>
             </div>
             <div className="text-xs font-bold tracking-widest text-brand-red uppercase leading-none mt-1">
                Enterprises
             </div>
           </div>
           <p className="text-sm leading-relaxed max-w-xs">
             The trusted source for premium motorcycle parts and accessories across Bangladesh. 
             Find the exact fit for your ride.
           </p>
           <ul className="space-y-3 mt-6 text-sm">
             <li className="flex items-start gap-3 group">
               <MapPin size={18} className="text-brand-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
               <span>[Business Address TBD]<br/>Dhaka, Bangladesh</span>
             </li>
             <li className="flex items-center gap-3 group">
               <Phone size={18} className="text-brand-red shrink-0 group-hover:scale-110 transition-transform" />
               <span>[Phone Number TBD]</span>
             </li>
             <li className="flex items-center gap-3 group">
               <Mail size={18} className="text-brand-red shrink-0 group-hover:scale-110 transition-transform" />
               <span>[Email Address TBD]</span>
             </li>
           </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-bold uppercase tracking-wider mb-6 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/shop" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Shop All Parts</Link></li>
            <li><Link to="/shop-by-bike" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Shop by Bike</Link></li>
            <li><Link to="/categories" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Categories</Link></li>
            <li><Link to="/brands" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Brands</Link></li>
            <li><Link to="/wholesale" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Wholesale Inquiry</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-base font-bold uppercase tracking-wider mb-6 text-white">Support</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/account" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">My Account</Link></li>
            <li><Link to="/track-order" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Track Order</Link></li>
            <li><Link to="/faq" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">About Us</Link></li>
          </ul>
        </div>

        {/* Policies & Socials */}
        <div>
          <h3 className="text-base font-bold uppercase tracking-wider mb-6 text-white">Legal & Policies</h3>
          <ul className="space-y-3 text-sm font-medium mb-10">
            <li><Link to="/privacy" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Privacy Policy [TBD]</Link></li>
            <li><Link to="/terms" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Terms & Conditions [TBD]</Link></li>
            <li><Link to="/returns" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Return Policy [TBD]</Link></li>
            <li><Link to="/shipping" className="hover:text-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red rounded-sm">Shipping Policy [TBD]</Link></li>
          </ul>

          <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-slate-400">Connect [TBD]</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-sm bg-slate-800 flex items-center justify-center text-white hover:bg-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red" aria-label="Facebook Placeholder"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-sm bg-slate-800 flex items-center justify-center text-white hover:bg-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red" aria-label="Instagram Placeholder"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-sm bg-slate-800 flex items-center justify-center text-white hover:bg-brand-red transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red" aria-label="YouTube Placeholder"><Youtube size={18} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Infrastructure Placeholders */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Universal Enterprises. All rights reserved.</p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 uppercase tracking-wide">Delivery:</span> 
            <span>Pathao | Steadfast [Demo]</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="font-bold text-slate-400 uppercase tracking-wide">Secure Payments:</span> 
             <span>COD | SSLCOMMERZ [Demo]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
