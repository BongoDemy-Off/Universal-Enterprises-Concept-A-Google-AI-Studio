import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Package, MapPin, Bike, Lock, LogOut, FileText, CheckCircle2, Truck, Clock, ArrowRight, Download } from 'lucide-react';
import { useBike } from '../context/BikeContext';

// --- Shared Layout for Account Pages ---
function AccountLayout({ children, title }: { children: ReactNode, title: string }) {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/account', icon: <User size={18} /> },
    { name: 'Order History', path: '/account/orders', icon: <Package size={18} /> },
    { name: 'Saved Addresses', path: '/account/addresses', icon: <MapPin size={18} /> },
    { name: 'My Bike', path: '/account/my-bike', icon: <Bike size={18} /> },
    { name: 'Profile & Security', path: '/account/profile', icon: <Lock size={18} /> },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight mb-8">{title}</h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-64 shrink-0 bg-white border border-border-subtle rounded-sm overflow-hidden">
            <div className="p-4 bg-brand-blue text-white">
               <div className="font-bold uppercase tracking-wider text-sm">Demo User</div>
               <div className="text-xs text-white/70">user@example.com</div>
            </div>
            <nav className="flex flex-col">
              {navItems.map(item => {
                const isActive = location.pathname === item.path || (item.path !== '/account' && location.pathname.startsWith(item.path));
                return (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors border-l-2 ${isActive ? 'bg-surface-light border-brand-red text-brand-red' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-brand-blue'}`}
                  >
                    {item.icon} {item.name}
                  </Link>
                );
              })}
              <button onClick={() => alert('Sign out logic would execute here in production.')} className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-brand-red hover:bg-red-50 transition-colors border-l-2 border-transparent w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-red">
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </div>
          <div className="flex-grow w-full bg-white border border-border-subtle rounded-sm p-6 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Specific Pages ---

export function AccountDashboard() {
  return (
    <AccountLayout title="My Account">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-light border border-border-subtle p-4 rounded-sm flex items-center gap-4">
           <div className="bg-brand-blue text-white p-3 rounded-full"><Package size={24} /></div>
           <div>
              <div className="text-2xl font-black text-slate-800">2</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Orders</div>
           </div>
        </div>
        <div className="bg-surface-light border border-border-subtle p-4 rounded-sm flex items-center gap-4">
           <div className="bg-brand-blue text-white p-3 rounded-full"><Bike size={24} /></div>
           <div>
              <div className="text-2xl font-black text-slate-800">1</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Saved Bikes</div>
           </div>
        </div>
        <div className="bg-surface-light border border-border-subtle p-4 rounded-sm flex items-center gap-4">
           <div className="bg-brand-blue text-white p-3 rounded-full"><MapPin size={24} /></div>
           <div>
              <div className="text-2xl font-black text-slate-800">1</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Address</div>
           </div>
        </div>
      </div>
      <h2 className="text-lg font-bold text-brand-blue uppercase tracking-tight mb-4 border-b border-border-subtle pb-2">Recent Activity</h2>
      <p className="text-sm text-slate-500">Welcome to your dashboard. This is a prototype view.</p>
    </AccountLayout>
  );
}

export function AccountOrders() {
  const mockOrders = [
    { id: 'UE-DEMO-98214', date: '2023-11-20', total: '৳ 3,250', status: 'Processing' },
    { id: 'UE-DEMO-77192', date: '2023-10-15', total: '৳ 1,450', status: 'Delivered' },
  ];
  return (
    <AccountLayout title="Order History">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-light text-slate-500 uppercase tracking-widest text-[10px] border-y border-border-subtle">
            <tr>
              <th className="px-4 py-3 font-bold">Order #</th>
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Total</th>
              <th className="px-4 py-3 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle text-slate-700">
            {mockOrders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 font-bold">{order.id}</td>
                <td className="px-4 py-4">{order.date}</td>
                <td className="px-4 py-4">
                   <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-brand-blue'}`}>
                     {order.status}
                   </span>
                </td>
                <td className="px-4 py-4 font-black">{order.total}</td>
                <td className="px-4 py-4">
                  <Link to={`/account/orders/${order.id}`} className="text-brand-red font-bold uppercase text-[10px] tracking-widest hover:underline flex items-center gap-1">
                    View <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AccountLayout>
  );
}

export function OrderDetails() {
  return (
    <AccountLayout title="Order Details">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-black text-brand-blue tracking-tight uppercase">Order UE-DEMO-98214</h2>
          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-1">Placed on Nov 20, 2023</p>
        </div>
        <button disabled className="bg-slate-100 text-slate-400 border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-sm cursor-not-allowed">
           <Download size={14} /> Download Invoice <span className="bg-slate-200 text-slate-500 text-[9px] px-1 py-0.5 rounded-sm">PROTOTYPE</span>
        </button>
      </div>

      <div className="bg-surface-light border border-border-subtle p-6 rounded-sm mb-8">
         <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-6">Tracking Timeline</h3>
         
         <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle2 size={12} />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-sm border border-border-subtle bg-white shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-sm text-slate-800">Order Placed</div>
                  <time className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nov 20, 10:00 AM</time>
                </div>
                <div className="text-xs text-slate-600">Your order has been received.</div>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-brand-blue text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 animate-pulse">
                <Package size={12} />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-sm border border-brand-blue bg-blue-50 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-sm text-brand-blue">Processing</div>
                  <time className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nov 21, 2:30 PM</time>
                </div>
                <div className="text-xs text-brand-blue font-medium">Items are being packed at our warehouse.</div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-slate-200 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Truck size={12} />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-sm border border-border-subtle bg-white/50 opacity-60">
                <div className="font-bold text-sm text-slate-500 mb-1">Out for Delivery</div>
                <div className="text-xs text-slate-500">Pending courier dispatch.</div>
              </div>
            </div>
         </div>
      </div>
    </AccountLayout>
  );
}

export function SavedAddresses() {
  return (
    <AccountLayout title="Saved Addresses">
      <div className="bg-surface-light border border-dashed border-border-strong rounded-sm p-8 text-center">
         <MapPin size={32} className="mx-auto text-slate-300 mb-4" />
         <h3 className="text-lg font-bold text-brand-blue uppercase tracking-tight mb-2">No Addresses Saved</h3>
         <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">Add an address to make checkout faster on your next purchase.</p>
         <button onClick={() => alert('Address form prototype placeholder')} className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red">
           Add New Address
         </button>
      </div>
    </AccountLayout>
  );
}

export function MyBike() {
  const { selectedBike, setBike } = useBike();
  return (
    <AccountLayout title="My Bike">
      {selectedBike ? (
        <div className="bg-white border border-border-subtle rounded-sm p-6 flex flex-col md:flex-row gap-6 items-center">
           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border border-border-subtle shrink-0">
             <Bike size={40} />
           </div>
           <div className="flex-grow text-center md:text-left">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedBike.brand}</h3>
             <h2 className="text-xl font-black text-brand-blue uppercase tracking-tight">{selectedBike.model}</h2>
             <div className="text-sm text-slate-600 mt-1">{selectedBike.year} • {selectedBike.cc}cc • {selectedBike.variant}</div>
           </div>
           <button onClick={() => setBike(null)} className="bg-white border border-border-strong text-slate-600 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:text-brand-red hover:border-brand-red transition-colors w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-brand-red">
             Remove
           </button>
        </div>
      ) : (
        <div className="bg-surface-light border border-dashed border-border-strong rounded-sm p-8 text-center">
           <Bike size={32} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-lg font-bold text-brand-blue uppercase tracking-tight mb-2">No Bike Saved</h3>
           <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">Save your motorcycle details to instantly see compatible parts when you shop.</p>
           <Link to="/shop-by-bike" className="inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red">
             Select A Bike
           </Link>
        </div>
      )}
    </AccountLayout>
  );
}

export function Profile() {
  return (
    <AccountLayout title="Profile & Security">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-border-subtle pb-2 mb-4">Personal Details</h3>
          <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Full Name</label>
               <input type="text" disabled value="Demo User" className="w-full bg-slate-50 border border-border-subtle rounded-sm px-3 py-2 text-sm text-slate-700 cursor-not-allowed" />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</label>
               <input type="email" disabled value="user@example.com" className="w-full bg-slate-50 border border-border-subtle rounded-sm px-3 py-2 text-sm text-slate-700 cursor-not-allowed" />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</label>
               <input type="tel" disabled placeholder="+8801XXXXXXXXX" className="w-full bg-slate-50 border border-border-subtle rounded-sm px-3 py-2 text-sm text-slate-700 cursor-not-allowed" />
             </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest border-b border-border-subtle pb-2 mb-4">Security</h3>
          <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Current Password</label>
               <input type="password" disabled value="********" className="w-full bg-slate-50 border border-border-subtle rounded-sm px-3 py-2 text-sm text-slate-700 cursor-not-allowed" />
             </div>
             <button disabled className="bg-slate-200 text-slate-400 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-sm cursor-not-allowed mt-2">
               Change Password
             </button>
             <p className="text-[10px] text-slate-400 mt-2 italic">Profile editing is disabled in this prototype.</p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
