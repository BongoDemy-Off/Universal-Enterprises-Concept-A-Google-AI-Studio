import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { DataRepository } from '../data/repository';
import { ProductCard } from '../components/commerce/ProductCard';

export function MarketingGrid({ title, filterType }: { title: string, filterType: 'offers' | 'new' | 'best' }) {
  const allProducts = DataRepository.getProducts();
  let products = [];
  
  if (filterType === 'offers') {
    products = allProducts.filter(p => p.sale_price !== null);
  } else if (filterType === 'new') {
    products = allProducts.slice(0, 8); // Mock slice
  } else {
    products = allProducts.slice(4, 12); // Mock slice
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8 border-b border-border-subtle pb-4">
           <h1 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight">{title}</h1>
           <p className="text-sm text-slate-500 font-medium mt-2">Showing {products.length} products</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

const mockPosts = [
  { id: 1, title: 'How to choose the right engine oil for your Yamaha R15', date: 'Nov 12, 2023', category: 'Maintenance' },
  { id: 2, title: 'Top 5 essential accessories for long rides in Bangladesh', date: 'Oct 28, 2023', category: 'Gear' },
  { id: 3, title: 'Understanding OEM vs Aftermarket parts', date: 'Sep 15, 2023', category: 'Guide' },
];

export function BlogIndex() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-black text-brand-blue uppercase tracking-tight mb-8">Moto Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPosts.map(post => (
            <div key={post.id} className="group border border-border-subtle rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
               <Link to={`/blog/${post.id}`} className="block aspect-video bg-slate-100 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">Image Placeholder</div>
               </Link>
               <div className="p-6 flex flex-col flex-grow">
                 <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                   <span className="text-brand-red">{post.category}</span>
                   <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                 </div>
                 <Link to={`/blog/${post.id}`} className="block mb-4">
                   <h2 className="text-lg font-bold text-brand-blue leading-snug group-hover:text-brand-red transition-colors line-clamp-2">{post.title}</h2>
                 </Link>
                 <Link to={`/blog/${post.id}`} className="mt-auto text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center gap-1 hover:text-brand-red transition-colors w-fit">
                   Read Article <ArrowRight size={14} />
                 </Link>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogPost() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/blog" className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 hover:text-brand-red transition-colors mb-8 w-fit">
          <ArrowRight size={14} className="rotate-180" /> Back to Blog
        </Link>
        
        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
          <span className="text-brand-red bg-red-50 px-2 py-1 rounded-sm">Maintenance</span>
          <span className="flex items-center gap-1"><Calendar size={14}/> Nov 12, 2023</span>
          <span className="flex items-center gap-1"><Clock size={14}/> 5 Min Read</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-brand-blue leading-tight mb-8">How to choose the right engine oil for your motorcycle</h1>
        
        <div className="aspect-video bg-slate-100 relative mb-12 rounded-sm border border-border-subtle overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-sm">Hero Image Placeholder</div>
        </div>

        <div className="prose prose-slate prose-brand max-w-none">
           <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
             Client-provided blog content will appear here. This area supports rich text, inline images, headings, and lists to create engaging SEO content for the motorcycle community.
           </p>
           
           <div className="bg-surface-light border-l-4 border-brand-red p-6 my-8 rounded-r-sm">
             <p className="m-0 font-bold text-brand-blue italic">"Using the manufacturer recommended oil grade is the single most important factor for engine longevity."</p>
           </div>
           
           <h3 className="text-xl font-bold text-brand-blue mt-8 mb-4">Content Placeholder</h3>
           <p className="text-slate-600 leading-relaxed mb-6">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           </p>
        </div>
      </div>
    </div>
  );
}
