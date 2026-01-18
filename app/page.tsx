'use client';

import { useState } from 'react';
import { Rocket, ChevronRight, CheckCircle2, X } from 'lucide-react'; // Make sure you have lucide-react installed
import { products, Product } from '../data/products';
import ProductCard from '@/components/ProductsCard';

export default function Home() {
  // --- LOGIC SECTION (Do not change) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handlePreOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setStatus('idle');
    setEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/presell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: selectedProduct?.id }),
      });
      setStatus('success');
      setTimeout(() => setIsModalOpen(false), 3000);
    } catch (error) {
      setStatus('error');
    }
  };
  // -------------------------------------

  return (
    <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30">
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="fixed top-0 left-0 right-0 h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-50" />

      {/* NAVBAR */}
      <nav className="relative z-10 border-b border-white/5 bg-[#030014]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">DigitCastle</span>
          </div>
          <a href="#products" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Browse Products
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Early Access Now Open
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-[1.1]">
          Digital Assets to <br />
          Scale Your Startup.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Premium resources for creators, developers, and founders. <br className="hidden md:block" />
          Grab free samples instantly or pre-order exclusive bundles.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#products" 
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 group"
          >
            Explore Resources
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="px-8 py-4 bg-slate-900/50 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-full font-semibold transition-all">
            How it works
          </button>
        </div>

      </section>

      {/* PRODUCTS GRID SECTION */}
      <section id="products" className="relative z-10 py-24 bg-gradient-to-b from-[#030014] to-[#0a0520]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-slate-400 mt-2">Everything you need to build faster.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onPreOrder={handlePreOrder} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL MODAL (The Functional Part) */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f111a] border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                <Rocket className="text-indigo-500" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Get "{selectedProduct.title}"</h2>
              <p className="text-slate-400 mt-2 text-sm">
                Enter your best email address and we will send the download link instantly.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="text-emerald-500" size={24} />
                </div>
                <h3 className="text-emerald-400 font-bold mb-1">Link Sent!</h3>
                <p className="text-emerald-500/80 text-sm">Check your inbox (and spam folder) now.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#030014] border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Me The Link
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-xs text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}