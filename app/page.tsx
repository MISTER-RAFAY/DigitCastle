'use client';

import { useState } from 'react';
import { products, Product } from '../data/products';
import ProductCard from '@/components/ProductsCard'; // Make sure this path points to your card file

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Open Modal logic
  const handlePreOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setStatus('idle');
    setEmail('');
  };

  // Submit Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch('/api/presell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email, 
            product: selectedProduct?.id // <--- Sends 'ebook', 'video', etc.
        }),
      });
      setStatus('success');
      setTimeout(() => setIsModalOpen(false), 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Free Digital Resources</h1>
          <p className="text-slate-400">Select a product below to download instantly.</p>
        </div>

        {/* Grid of ProductCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onPreOrder={handlePreOrder} 
            />
          ))}
        </div>

        {/* The Modal Popup */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
              
              <h2 className="text-2xl font-bold mb-2">Get "{selectedProduct.title}"</h2>
              <p className="text-slate-400 mb-6">Enter your email to receive the download link.</p>

              {status === 'success' ? (
                <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-lg text-center border border-emerald-500/20">
                  Link sent! Check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Me The Link'}
                  </button>
                  {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong.</p>}
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}