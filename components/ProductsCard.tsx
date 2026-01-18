import { Product } from '../data/products';
import { Download, ArrowRight, Play } from 'lucide-react'; // <--- Import Play
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onPreOrder: (product: Product) => void;
}

export default function ProductCard({ product, onPreOrder }: ProductCardProps) {
  // Check if it looks like a video
  const isVideo = product.category === "Online Courses" || product.title.toLowerCase().includes("video");

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
      
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        
        {/* Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${product.isFree ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>
            {product.isFree ? 'FREE' : 'PREMIUM'}
          </span>
        </div>

        {/* --- NEW: PLAY BUTTON OVERLAY --- */}
        {isVideo && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="text-white fill-white ml-1" size={20} />
                </div>
            </div>
        )}

        {/* Real Image */}
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Content ... (Rest of code remains the same) */}
      <div className="p-6">
        <div className="mb-4">
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{product.category}</span>
            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">{product.title}</h3>
            <p className="text-slate-400 text-sm mt-2 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-6">
            <span className="text-slate-200 font-bold text-lg">{product.price}</span>
            
            {product.isFree ? (
                <button 
                    onClick={() => onPreOrder(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-emerald-900/20"
                >
                    {/* Change Icon based on type */}
                    {isVideo ? <Play size={16} className="fill-current" /> : <Download size={16} />}
                    {isVideo ? 'Watch Now' : 'Get Free'}
                </button>
            ) : (
                <button 
                    onClick={() => onPreOrder(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all text-sm font-medium shadow-lg shadow-indigo-900/50"
                >
                    Book Spot
                    <ArrowRight size={16} />
                </button>
            )}
        </div>
      </div>
    </div>
  );
}