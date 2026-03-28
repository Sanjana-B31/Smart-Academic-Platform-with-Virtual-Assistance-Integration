import { Github, Twitter, Linkedin, Mail, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-black text-xl text-white font-cyber mb-4">
              <div className="bg-neonGreen p-1.5 rounded-lg text-darkBg">
                <GraduationCap size={20} />
              </div>
              EDU<span className="text-neonGreen">//</span>FLOW
            </div>
            <p className="text-slate-500 text-xs leading-relaxed font-mono uppercase tracking-tighter">
              Next-gen technical education for the digital frontier. Built for innovators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-slate-500 text-xs font-mono uppercase">
              <li><a href="#" className="hover:text-neonGreen transition-colors italic">› Browse Courses</a></li>
              <li><a href="#" className="hover:text-neonGreen transition-colors italic">› Skill Assessments</a></li>
              <li><a href="#" className="hover:text-neonGreen transition-colors italic">› Mentorship</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-slate-500 text-xs font-mono uppercase">
              <li><a href="#" className="hover:text-neonGreen transition-colors italic">› Documentation</a></li>
              <li><a href="#" className="hover:text-neonGreen transition-colors italic">› Help Center</a></li>
              <li><a href="#" className="hover:text-neonGreen transition-colors italic">› Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-neonGreen hover:bg-white/10 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-neonGreen hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-neonGreen hover:bg-white/10 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-600 font-mono uppercase">
            © 2026 EDUFLOW_TERMINAL. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-slate-600 font-mono uppercase">
            <span>Server Status: <span className="text-neonGreen">Optimal</span></span>
            <span>Version: 2.0.4-Stable</span>
          </div>
        </div>
      </div>
      <div className="py-10 border-t border-white/5 text-center">
      <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
        © 2026 EDU//FLOW TERMINAL
      </p>
    </div>
    </footer>
  );
}