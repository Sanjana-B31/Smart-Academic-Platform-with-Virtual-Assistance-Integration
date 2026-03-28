import { User, Mail, Calendar, ShieldCheck, Zap } from 'lucide-react';

export default function Profile({ userData }) {
  // Check if we have data or if we are still fetching
  const isLoaded = userData && userData.name;

  return (
    <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      {/* Profile Header Background with Animated Gradient */}
      <div className="h-32 bg-gradient-to-r from-neonGreen/20 via-slate-800 to-neonPink/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Profile Avatar Container */}
        <div className="absolute -bottom-12 left-8 p-1 bg-darkBg rounded-2xl border border-white/10 shadow-xl">
          <div className="bg-slate-800 w-24 h-24 rounded-xl flex items-center justify-center text-neonGreen group">
            <User size={48} className={!isLoaded ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
          </div>
        </div>
      </div>

      <div className="pt-16 pb-8 px-8">
        <div className="mb-8">
          {/* Dynamic Name Heading */}
          <h2 className="text-3xl font-black text-white uppercase font-cyber tracking-tight">
            {userData?.name || "Initializing..."}
          </h2>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-neonGreen/10 text-neonGreen px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase border border-neonGreen/20">
              Verified Student
            </span>
            <span className="text-slate-600 font-mono text-[10px] uppercase tracking-widest">
              // Level 01
            </span>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Email field with dynamic check */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="text-slate-500"><Mail size={18} /></div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Identity</p>
              <p className="text-white text-xs font-medium truncate max-w-[120px]">
                {userData?.email || "pending@edu.flow"}
              </p>
            </div>
          </div>

          {/* Registration Date */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="text-slate-500"><Calendar size={18} /></div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Deployment</p>
              <p className="text-white text-xs font-medium">March 2026</p>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 flex items-center gap-4 col-span-full">
            <div className="text-emerald-400"><ShieldCheck size={20} /></div>
            <div className="flex-grow">
              <p className="text-[10px] text-emerald-500/70 uppercase font-black tracking-tighter font-mono">System Integrity</p>
              <p className="text-emerald-400/90 text-[11px] font-mono uppercase tracking-tight">
                Secure Session // {userData?.id ? `UID-${userData.id}` : "ACTIVE"}
              </p>
            </div>
            <Zap size={14} className="text-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-8 py-4 bg-white/5 hover:bg-neonGreen hover:text-darkBg text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl border border-white/10 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-neonGreen/20">
          Modify Profile Parameters
        </button>
      </div>
    </div>
  );
}