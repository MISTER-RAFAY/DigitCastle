'use client';

import { useState } from 'react';
import { products, Category, Product } from '@/data/products';
import ProductCard from '@/components/ProductsCard';
import EmailModal from '@/components/EmailModel';
// 1. Updated Imports: Added 'MessageCircle' (for WhatsApp) and 'Instagram'
import { Rocket, Layers, ChevronRight, Twitter, Instagram, MessageCircle } from 'lucide-react';

const categories: Category[] = [
  "Ebooks", "AI Prompt Packs", "Website Templates", "Lead Magnet Templates", "Online Courses"
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Category>("Ebooks");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const filteredProducts = products.filter(p => p.category === activeTab);

  const handlePreOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      
      {/* Navbar */}
      <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
                <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Rocket size={18} className="text-white" />
                </div>
                DigitCastle
            </div>
            <a href="#products" className="text-sm font-medium hover:text-indigo-400 transition-colors">Browse Products</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-indigo-400 mb-6 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Early Access Now Open
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight mb-6">
                Digital Assets to <br/> Scale Your Startup.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Premium resources for creators, developers, and founders. <br className="hidden md:block" />
                Grab free samples instantly or pre-order exclusive bundles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                    href="#products" 
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                >
                    Explore Resources
                    <ChevronRight size={18} />
                </a>
                <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold transition-all border border-slate-700">
                    How it works
                </button>
            </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === cat 
                        ? 'bg-white text-slate-900 shadow-lg scale-105' 
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onPreOrder={handlePreOrder}
                />
            ))}
        </div>
        
        {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-slate-500">
                <Layers size={48} className="mx-auto mb-4 opacity-50" />
                <p>No products found in this category yet.</p>
            </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 font-bold text-white">
                <Rocket size={18} /> DigitCastle
            </div>
            <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Digital Startup Inc. All rights reserved.
            </p>
            
            {/* 2. Updated Social Links */}
            <div className="flex gap-4">
                <a href="https://x.com/digitcastle" target="_blank" className="text-slate-400 hover:text-indigo-400 transition-colors">
                    <Twitter size={20} />
                </a>
                
                {/* WhatsApp (MessageCircle) */}
                <a href="https://whatsapp.com/channel/0029Vb6q8W7FcowANESP4t1a" target="_blank" className="text-slate-400 hover:text-green-400 transition-colors">
                    <MessageCircle size={20} />
                </a>
                
                {/* Instagram */}
                <a href="https://www.instagram.com/digitx7?igsh=MWFyZzVpNXo5MjV5cQ==" target="_blank" className="text-slate-400 hover:text-pink-400 transition-colors">
                    <Instagram size={20} />
                </a>
            </div>
        </div>
      </footer>

      <EmailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
      />
    </div>
  );
}