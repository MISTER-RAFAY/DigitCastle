import { useState } from 'react';
import { Product } from '../data/products';
import { X, Loader2, Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface EmailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailModal({ product, isOpen, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/presell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email, 
            productInterest: product.title,
            isFree: product.isFree,    
            fileUrl: product.fileUrl    
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        alert('Something went wrong. Please check your connection.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        {!success && (
            <div className={`p-6 text-center ${product.isFree ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                    <X size={20} />
                </button>
                <h3 className="text-2xl font-bold text-white mb-1">
                    {product.isFree ? 'Get Your Free Download' : 'Secure Your Spot'}
                </h3>
                <p className="text-white/90 text-sm">
                    {product.isFree 
                        ? 'We will send the download link directly to your inbox.' 
                        : 'Join the priority waitlist.'}
                </p>
            </div>
        )}

        {/* Body */}
        <div className="p-8">
            {success ? (
                // --- SUCCESS SCREEN ---
                <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${product.isFree ? 'bg-emerald-500/20' : 'bg-indigo-500/20'}`}>
                        {product.isFree ? <Mail className="h-10 w-10 text-emerald-500" /> : <CheckCircle className="h-10 w-10 text-indigo-500" />}
                    </div>
                    
                    {product.isFree ? (
                        <>
                            <h4 className="text-2xl font-bold text-white mb-2">Sent! 🚀</h4>
                            <p className="text-slate-400 mb-6">
                                We just sent <strong>{product.title}</strong> to your email.<br/>
                                <span className="text-indigo-400 text-sm">Check your spam folder if you don't see it.</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <h4 className="text-2xl font-bold text-white mb-2">You're on the list!</h4>
                            <p className="text-slate-400 mb-6">
                                We will email you updates about <strong>{product.title}</strong>.
                            </p>
                        </>
                    )}

                    <button 
                        onClick={onClose}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            ) : (
                // --- FORM SCREEN ---
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                            {product.isFree ? 'Where should we send the file?' : 'Email Address'}
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="name@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 font-bold rounded-lg text-white transition-colors flex items-center justify-center gap-2 ${product.isFree ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-white text-indigo-900 hover:bg-slate-200'}`}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            product.isFree ? (
                                <>Send Link to Email <ArrowRight size={18}/></>
                            ) : 'Join Waitlist'
                        )}
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-4">
                        {product.isFree ? 'File link sent instantly.' : 'No spam, ever.'}
                    </p>
                </form>
            )}
        </div>
      </div>
    </div>
  );
}