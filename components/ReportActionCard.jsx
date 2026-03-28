import { Download, FileText } from 'lucide-react';
import { generateReport } from '../utils/reportGenerator';

export default function ReportActionCard({ user, courses }) {
  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-8 rounded-3xl flex justify-between items-center">
      <div>
        <h3 className="text-white font-bold flex items-center gap-2"><FileText size={18}/> Progress Report</h3>
        <p className="text-slate-400 text-sm">Download your official academic summary.</p>
      </div>
      <button 
        onClick={() => generateReport(user.name, courses)}
        className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-black flex items-center gap-2"
      >
        <Download size={18}/> PDF
      </button>
    </div>
  );
}