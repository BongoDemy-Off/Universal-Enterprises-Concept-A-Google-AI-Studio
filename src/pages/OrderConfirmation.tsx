import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, ShoppingBag, ArrowRight } from 'lucide-react';

export function OrderConfirmation() {
  const location = useLocation();
  const orderDetails = location.state || {
    orderNumber: `UE-DEMO-${Math.floor(Math.random() * 100000)}`,
    email: 'guest@example.com',
    paymentMethod: 'cod',
    total: '৳ 0'
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-sm shadow-sm border border-border-subtle p-8 md:p-12">
          
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={40} />
          </div>
          
          <h1 className="text-3xl font-black text-brand-blue uppercase tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-slate-600 font-medium mb-8">
            Thank you for shopping with Universal Enterprises.
          </p>

          <div className="bg-surface-light border border-border-subtle rounded-sm p-6 mb-8 text-left">
            <h2 className="font-bold text-slate-800 uppercase tracking-widest text-xs border-b border-border-subtle pb-3 mb-4 flex items-center gap-2">
              <Package size={16} className="text-brand-red" /> Order Information
            </h2>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <span className="block text-slate-500 font-medium mb-1">Order Number</span>
                <span className="font-bold text-slate-900">{orderDetails.orderNumber}</span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium mb-1">Payment Method</span>
                <span className="font-bold text-slate-900 uppercase">
                  {orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : orderDetails.paymentMethod}
                </span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium mb-1">Total Amount</span>
                <span className="font-bold text-brand-red">{orderDetails.total}</span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium mb-1">Confirmation Sent To</span>
                <span className="font-medium text-slate-900">{orderDetails.email || 'N/A (No email provided)'}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm text-sm text-brand-blue text-left mb-8 flex items-start gap-3">
             <div className="shrink-0 mt-0.5 font-bold">Note:</div>
             <p>This is a frontend prototype demonstration. No actual order has been placed, no payment was captured, and no inventory was updated.</p>
          </div>

          <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-sm transition-colors shadow-sm">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
