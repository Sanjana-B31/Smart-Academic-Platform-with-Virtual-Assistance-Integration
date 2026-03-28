export default function Mentors() {
  const mentors = [
    { name: "Alex Rivera", role: "Senior DevOps at Google", img: "/mentor1.jpg" },
    { name: "Sarah Chen", role: "Security Architect", img: "/mentor2.jpg" }
  ];

  return (
    <section className="bg-slate-900/50 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white uppercase mb-16 font-cyber">Expert <span className="text-neonPink">Mentors</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mentors.map((m, i) => (
            <div key={i} className="bg-darkBg border border-white/5 p-6 rounded-3xl group">
              <div className="w-24 h-24 bg-gradient-to-tr from-neonGreen to-neonPink rounded-full mx-auto mb-6 p-1">
                <div className="w-full h-full bg-slate-800 rounded-full overflow-hidden">
                  {/* <img src={m.img} alt={m.name} className="object-cover" /> */}
                </div>
              </div>
              <h4 className="text-white font-bold uppercase tracking-tight">{m.name}</h4>
              <p className="text-slate-500 text-xs font-mono mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}