import { useEffect, useState } from 'react'; // Added useEffect and useState
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { GraduationCap, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect URL changes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Re-check login status every time the user moves to a new page
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

 const handleLogout = () => {
  localStorage.clear(); // This is safer than just removing 'token'
  navigate('/login');
};

  return (
    <nav className="fixed top-0 w-full bg-darkBg/80 backdrop-blur-md border-b border-white/5 z-50 px-6 h-20 flex items-center justify-between">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-3 font-black text-2xl text-white font-cyber tracking-tighter">
        <div className="bg-neonGreen p-2 rounded-xl text-darkBg shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <GraduationCap size={26} strokeWidth={2.5} />
        </div>
        EDU<span className="text-neonGreen">//</span>FLOW
      </Link>
      
      {/* Navigation Actions */}
      <div className="flex items-center gap-8">
        {isLoggedIn ? (
          <>
            {/* Direct Link to Dashboard */}
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 text-xs font-mono uppercase transition-all ${
                location.pathname === '/dashboard' ? 'text-neonGreen' : 'text-slate-400 hover:text-neonGreen'
              }`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-neonPink/10 text-neonPink border border-neonPink/20 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neonPink hover:text-white transition-all shadow-lg shadow-neonPink/5"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xs font-mono uppercase text-slate-400 hover:text-neonGreen tracking-widest transition-colors">
              Login
            </Link>
            
            <Link 
              to="/signup" 
              className="bg-neonGreen text-darkBg text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg shadow-neonGreen/20"
            >
              Join Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}