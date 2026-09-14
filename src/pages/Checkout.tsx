import { useState, useMemo, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DataRepository } from '../data/repository';
import { Truck, ShieldCheck, MapPin, CreditCard, Banknote, Building, HelpCircle, ArrowRight } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { t } = useI18n();
  const allProducts = DataRepository.getProducts();
  const LOCATIONS = DataRepository.getLocations();

  const cartDetails = useMemo(() => {
    return cartItems.map(item => {
      const product = allProducts.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product !== undefined);
  }, [cartItems, allProducts]);

  const subtotal = cartDetails.reduce((sum, item) => sum + ((item.product?.sale_price || item.product?.regular_price || 0) * item.quantity), 0);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    division: '',
    district: '',
    upazila: '',
    postalCode: '',
    instructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic Shipping Calculation (Demo Logic)
  const shippingCost = formData.division 
    ? (formData.division === 'Dhaka' ? 60 : 120) 
    : 0;

  const total = subtotal + shippingCost;

  const availableDistricts = formData.division ? Object.keys(LOCATIONS[formData.division as keyof typeof LOCATIONS].districts) : [];
  const availableUpazilas = formData.division && formData.district ? LOCATIONS[formData.division as keyof typeof LOCATIONS].districts[formData.district as keyof typeof LOCATIONS['Dhaka']['districts']] || [] : [];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Reset dependent fields
      if (name === 'division') {
        updated.district = '';
        updated.upazila = '';
      }
      if (name === 'district') {
        updated.upazila = '';
      }
      return updated;
    });
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.division) newErrors.division = 'Division is required';
    if (!formData.district) newErrors.district = 'District is required';
    
    // Email Validation TBD.
    // [TBD / COMMENT]: The client requirement for email being mandatory or optional is TBD. 
    // Currently implementing as OPTIONAL for guest checkout to reduce friction, but parsing basic regex if filled.
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate successful local submission
      navigate('/order-confirmation', {
        state: {
          orderNumber: `UE-DEMO-${Math.floor(Math.random() * 100000)}`,
          email: formData.email,
          paymentMethod: paymentMethod,
          total: `৳ ${total.toLocaleString('en-IN')}`
        }
      });
    } else {
       // Scroll to top to show errors
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (cartDetails.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-brand-blue uppercase tracking-tight mb-4">{t('cart.empty')}</h1>
        <Link to="/shop" className="text-brand-red font-bold hover:underline">{t('cart.continue')}</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
           <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight mb-2">{t('checkout.title')}</h1>
           <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
             <span className="text-brand-blue font-bold">{t('checkout.guest')}</span> - No account required.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Contact Information */}
            <div className="bg-white border border-border-subtle rounded-sm p-6 shadow-sm">
              <h2 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6 pb-4 border-b border-border-subtle flex items-center gap-2">
                <span className="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Full Name <span className="text-brand-red">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name" 
                    className={`w-full bg-white border ${errors.name ? 'border-brand-red focus:ring-brand-red' : 'border-border-strong focus:ring-brand-blue'} rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow`} 
                  />
                  {errors.name && <span className="text-xs text-brand-red font-medium mt-1 block">{errors.name}</span>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Phone Number <span className="text-brand-red">*</span></label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX" 
                    className={`w-full bg-white border ${errors.phone ? 'border-brand-red focus:ring-brand-red' : 'border-border-strong focus:ring-brand-blue'} rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow`} 
                  />
                  {errors.phone && <span className="text-xs text-brand-red font-medium mt-1 block">{errors.phone}</span>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                    Email Address <span className="text-slate-400 font-normal lowercase tracking-normal">(Optional)</span>
                    <span className="group relative hidden sm:inline-block">
                       <HelpCircle size={14} className="text-slate-400 cursor-help" />
                       <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white text-[10px] p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                         Used for sending order confirmation and tracking updates.
                       </span>
                    </span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com" 
                    className={`w-full bg-white border ${errors.email ? 'border-brand-red focus:ring-brand-red' : 'border-border-strong focus:ring-brand-blue'} rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow`} 
                  />
                  {errors.email && <span className="text-xs text-brand-red font-medium mt-1 block">{errors.email}</span>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-border-subtle rounded-sm p-6 shadow-sm">
              <h2 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6 pb-4 border-b border-border-subtle flex items-center gap-2">
                <span className="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
                Delivery Address
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Street Address <span className="text-brand-red">*</span></label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House, Road, Block, Area" 
                    className={`w-full bg-white border ${errors.address ? 'border-brand-red focus:ring-brand-red' : 'border-border-strong focus:ring-brand-blue'} rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow`} 
                  />
                  {errors.address && <span className="text-xs text-brand-red font-medium mt-1 block">{errors.address}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Division <span className="text-brand-red">*</span></label>
                  <select 
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className={`w-full bg-white border ${errors.division ? 'border-brand-red focus:ring-brand-red' : 'border-border-strong focus:ring-brand-blue'} rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow appearance-none`}
                  >
                    <option value="">Select Division</option>
                    {Object.keys(LOCATIONS).map(div => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                  {errors.division && <span className="text-xs text-brand-red font-medium mt-1 block">{errors.division}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">District <span className="text-brand-red">*</span></label>
                  <select 
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    disabled={!formData.division}
                    className={`w-full ${!formData.division ? 'bg-slate-100 text-slate-400' : 'bg-white'} border ${errors.district ? 'border-brand-red focus:ring-brand-red' : 'border-border-strong focus:ring-brand-blue'} rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow appearance-none`}
                  >
                    <option value="">Select District</option>
                    {availableDistricts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                  {errors.district && <span className="text-xs text-brand-red font-medium mt-1 block">{errors.district}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Upazila / Thana (Optional)</label>
                  <select 
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleInputChange}
                    disabled={!formData.district}
                    className={`w-full ${!formData.district ? 'bg-slate-100 text-slate-400' : 'bg-white'} border border-border-strong focus:ring-brand-blue rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-shadow appearance-none`}
                  >
                    <option value="">Select Upazila</option>
                    {availableUpazilas.map(upz => (
                      <option key={upz} value={upz}>{upz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Postal Code (Optional)</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 1212" 
                    className="w-full bg-white border border-border-strong rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow" 
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Delivery Instructions (Optional)</label>
                  <textarea 
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for the rider?" 
                    rows={2}
                    className="w-full bg-white border border-border-strong rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue transition-shadow resize-none" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-border-subtle rounded-sm p-6 shadow-sm">
              <h2 className="text-lg font-black text-brand-blue uppercase tracking-tight mb-6 pb-4 border-b border-border-subtle flex items-center gap-2">
                <span className="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> 
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-brand-blue bg-blue-50/50' : 'border-border-strong hover:bg-slate-50'}`}>
                   <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="mt-1 accent-brand-blue" />
                   <div>
                     <span className="block font-bold text-slate-800 flex items-center gap-2"><Banknote size={16} className="text-brand-blue"/> Cash on Delivery (COD)</span>
                     <span className="block text-xs text-slate-500 mt-1">Pay when your order arrives at your address.</span>
                   </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'mfs' ? 'border-brand-blue bg-blue-50/50' : 'border-border-strong hover:bg-slate-50'}`}>
                   <input type="radio" name="paymentMethod" value="mfs" checked={paymentMethod === 'mfs'} onChange={() => setPaymentMethod('mfs')} className="mt-1 accent-brand-blue" />
                   <div>
                     <span className="block font-bold text-slate-800 flex items-center gap-2">Mobile Banking / Gateway</span>
                     <span className="block text-xs text-slate-500 mt-1">Pay securely via bKash, Nagad, Rocket, or Cards via SSLCommerz (Demo).</span>
                     {paymentMethod === 'mfs' && (
                       <div className="mt-3 p-3 bg-white border border-border-subtle rounded-sm text-xs text-slate-600 flex items-center justify-center gap-4">
                         <span className="font-bold text-pink-600">bKash</span>
                         <span className="font-bold text-orange-600">Nagad</span>
                         <span className="font-bold text-purple-600">Rocket</span>
                         <CreditCard size={20} className="text-slate-400" />
                       </div>
                     )}
                   </div>
                </label>

                <label className={`flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-brand-blue bg-blue-50/50' : 'border-border-strong hover:bg-slate-50'}`}>
                   <input type="radio" name="paymentMethod" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="mt-1 accent-brand-blue" />
                   <div>
                     <span className="block font-bold text-slate-800 flex items-center gap-2"><Building size={16}/> Bank Transfer</span>
                     <span className="block text-xs text-slate-500 mt-1">Direct deposit to our corporate account.</span>
                     {paymentMethod === 'bank' && (
                       <div className="mt-3 p-3 bg-white border border-border-subtle rounded-sm text-xs text-slate-600">
                         Placeholder for bank transfer instructions. Account details will be provided after checkout.
                       </div>
                     )}
                   </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-border-subtle rounded-sm p-6 sticky top-24 shadow-sm">
              <h2 className="font-black text-brand-blue uppercase tracking-tight mb-6 pb-4 border-b border-border-subtle">Order Summary</h2>
              
              <ul className="divide-y divide-border-subtle mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cartDetails.map((item) => (
                  <li key={item.productId} className="py-3 flex gap-3">
                    <img src={item.product!.image} alt="" className="w-12 h-12 bg-slate-50 object-contain border border-border-subtle rounded-sm shrink-0" />
                    <div className="flex flex-col flex-grow">
                      <span className="text-xs font-bold text-brand-blue line-clamp-1">{item.product!.name_en}</span>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Qty: {item.quantity}</span>
                        <span className="text-xs font-black text-slate-800">৳ {((item.product!.sale_price || item.product!.regular_price) * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-4 mb-6 pt-4 border-t border-border-subtle">
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span>৳ {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                     Delivery
                     {formData.division && (
                       <span className="text-[10px] text-white bg-slate-400 px-1.5 py-0.5 rounded-sm uppercase tracking-widest ml-2">Demo Calculation</span>
                     )}
                  </span>
                  <span>{shippingCost > 0 ? `৳ ${shippingCost.toLocaleString('en-IN')}` : 'Enter address'}</span>
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

              <button 
                type="submit"
                className="w-full bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded-sm transition-colors text-sm shadow-sm flex items-center justify-center gap-2 mb-4"
              >
                {t('checkout.placeOrder')} <ArrowRight size={16} />
              </button>
              
              <p className="text-[10px] text-slate-500 text-center font-medium leading-relaxed">
                By placing this order, you agree to our <Link to="/terms" className="text-brand-blue hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-blue hover:underline">Privacy Policy</Link>. This is a demo environment.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
