import { useState, FormEvent } from 'react';
import { Package, Search, Mail, Phone, Building, Send, ArrowRight } from 'lucide-react';

export function TrackOrder() {
  const [method, setMethod] = useState<'email' | 'phone'>('phone');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Fake loading delay
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} />
           </div>
           <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight">Track Your Order</h1>
           <p className="text-slate-500 font-medium mt-2">Enter your details below to check the current status.</p>
        </div>

        <div className="bg-white border border-border-subtle rounded-sm shadow-sm p-6 md:p-8">
           {!result ? (
             <form onSubmit={handleSubmit}>
               <div className="mb-6">
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Order Number <span className="text-brand-red">*</span></label>
                 <input 
                   type="text" 
                   required
                   placeholder="e.g. UE-DEMO-12345" 
                   className="w-full bg-white border border-border-strong focus:ring-brand-blue focus:border-brand-blue rounded-sm px-4 py-2.5 text-sm transition-shadow outline-none" 
                 />
               </div>
               
               <div className="mb-6">
                 <div className="flex gap-4 mb-3">
                   <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-widest cursor-pointer">
                     <input type="radio" checked={method === 'phone'} onChange={() => setMethod('phone')} className="accent-brand-blue" />
                     Phone Number
                   </label>
                   <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-widest cursor-pointer">
                     <input type="radio" checked={method === 'email'} onChange={() => setMethod('email')} className="accent-brand-blue" />
                     Email Address
                   </label>
                 </div>
                 <input 
                   type={method === 'email' ? 'email' : 'tel'}
                   required
                   placeholder={method === 'email' ? "you@example.com" : "01XXXXXXXXX"} 
                   className="w-full bg-white border border-border-strong focus:ring-brand-blue focus:border-brand-blue rounded-sm px-4 py-2.5 text-sm transition-shadow outline-none" 
                 />
               </div>
               
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest py-3.5 rounded-sm transition-colors text-sm shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
               >
                 {loading ? 'Searching...' : <><Search size={16} /> Find Order</>}
               </button>
             </form>
           ) : (
             <div className="text-center py-6">
                <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4">Demo Result</div>
                <h3 className="text-xl font-black text-brand-blue tracking-tight mb-2">Order Not Found</h3>
                <p className="text-sm text-slate-500 mb-6">This is a prototype. No real orders exist in the database to retrieve.</p>
                <button 
                  onClick={() => setResult(false)}
                  className="bg-slate-100 text-slate-700 font-bold uppercase tracking-widest py-2 px-6 rounded-sm text-xs hover:bg-slate-200 transition-colors"
                >
                  Try Another
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

export function Wholesale() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
           <h1 className="text-2xl md:text-4xl font-black text-brand-blue uppercase tracking-tight mb-4">Wholesale Inquiry</h1>
           <p className="text-slate-600 font-medium max-w-xl mx-auto">
             Partner with Universal Enterprises to source premium OEM and aftermarket motorcycle parts at competitive bulk rates.
           </p>
        </div>

        <div className="bg-white border border-border-subtle rounded-sm shadow-sm p-6 md:p-10">
           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Business Name <span className="text-brand-red">*</span></label>
                  <input type="text" className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Contact Person <span className="text-brand-red">*</span></label>
                  <input type="text" className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Phone Number <span className="text-brand-red">*</span></label>
                  <input type="tel" className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Email Address <span className="text-brand-red">*</span></label>
                  <input type="email" className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Business Type</label>
                <select className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm bg-white">
                  <option>Retail Shop</option>
                  <option>Repair Workshop</option>
                  <option>Corporate Fleet</option>
                  <option>Distributor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Expected Monthly Volume (BDT)</label>
                <select className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm bg-white">
                  <option>Under 50,000</option>
                  <option>50,000 - 2,00,000</option>
                  <option>2,00,000 - 5,00,000</option>
                  <option>Over 5,00,000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-1.5">Message / Parts Required <span className="text-brand-red">*</span></label>
                <textarea rows={4} className="w-full border border-border-strong rounded-sm px-4 py-2.5 text-sm resize-none"></textarea>
              </div>

              <button className="w-full bg-brand-blue hover:bg-blue-900 text-white font-bold uppercase tracking-widest py-4 rounded-sm transition-colors text-sm shadow-sm flex items-center justify-center gap-2">
                 <Send size={16} /> Submit Inquiry
              </button>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Prototype Form - No data will be sent</p>
           </form>
        </div>
      </div>
    </div>
  );
}

export function StaticPage({ title }: { title: string }) {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-surface-light border-b border-border-subtle py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-black text-brand-blue uppercase tracking-tight">{title}</h1>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-slate max-w-none">
          <div className="bg-slate-50 border border-dashed border-border-strong rounded-sm p-12 text-center text-slate-500 flex flex-col items-center">
            <Building size={48} className="text-slate-300 mb-4" />
            <h2 className="text-xl font-bold text-slate-700 mb-2">Content Placeholder</h2>
            <p>Client-provided content and legal text will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
