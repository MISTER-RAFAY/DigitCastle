'use client';

import { useState } from 'react';
import { products, Product } from '../data/products'; // Import data from Step 1
import ProductCard from '@/components/ProductsCard'; // Ensure this path matches your folder structure

export default function Home() {
  // State for the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // State for the Form
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // When user clicks "Get Free" on a card
  const handlePreOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setStatus('idle');
    setEmail('');
  };

  // When user submits the email form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/presell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          product: selectedProduct?.id // <--- SENDING THE ID (e.g., 'product-1')
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => setIsModalOpen(false), 3000); // Close after 3 seconds
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
          DigitCastle Free Resources
        </h1>
        <p className="text-slate-400 mt-4">Select a product below to get it sent to your inbox instantly.</p>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onPreOrder={handlePreOrder} 
          />
        ))}
      </div>

      {/* EMAIL MODAL */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">Get "{selectedProduct.title}"</h2>
            <p className="text-slate-400 mb-6">Enter your email and we will send the download link instantly.</p>

            {status === 'success' ? (
              <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-lg text-center font-medium border border-emerald-500/20">
                ✅ Email Sent! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                
                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Me The Link'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}