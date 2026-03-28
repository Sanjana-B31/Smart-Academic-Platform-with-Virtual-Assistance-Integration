export default function Mission() {
  return (
    <section className="bg-darkBg py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Terminal Window */}
        <div className="bg-cardBg rounded-lg border border-white/10 shadow-2xl font-mono text-sm">
          <div className="bg-white/5 px-4 py-2 flex gap-1.5 border-b border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-neonPink"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-neonGreen"></div>
          </div>
          <div className="p-8">
            <p className="text-neonGreen mb-2">$ init_learning_path</p>
            <p className="text-slate-500 mb-6 italic">Loading core modules...</p>
            <div className="space-y-3">
              <p className="text-white"><span className="text-neonGreen">›</span> Modules: Live Labs & Projects</p>
              <p className="text-white"><span className="text-neonGreen">›</span> Instructors: Industry Veterans</p>
              <p className="text-white"><span className="text-neonGreen">›</span> Outcome: Job-Ready Skills</p>
            </div>
            <p className="text-neonGreen mt-8 font-bold">✓ Status: READY TO LAUNCH</p>
          </div>
        </div>

        <div>
          <h2 className="text-5xl font-black text-white uppercase mb-6 font-cyber">
            Where Ambition Meets <br /> <span className="text-neonGreen italic">Opportunity</span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Our platform bridges the gap between theoretical knowledge and 
            real-world application in the ever-evolving tech landscape.
          </p>
          <button className="px-8 py-3 bg-neonGreen text-darkBg font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}