import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Hero() {
  const navigate = useNavigate();

  const handleStartLearning = async (courseName, courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // 1. Store selection in Database
      await axios.post('http://localhost:3000/api/courses/enroll', 
        { courseId: courseId }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Redirect to Dashboard with course details
      navigate('/dashboard', { 
        state: { selectedStack: { id: courseId, name: courseName } } 
      });
    } catch (err) {
      console.error("Session initialization failed:", err);
      // Fallback: navigate anyway if the record already exists
      navigate('/dashboard');
    }
  };

  return (
    <section className="bg-darkBg pt-32 pb-20 px-6 text-center border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="inline-block border border-neonGreen/30 bg-neonGreen/10 px-4 py-1 rounded-full mb-8">
          <span className="text-neonGreen text-[10px] font-mono tracking-[0.3em] uppercase">
            ⚡ Future-Ready Tech Education
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter font-cyber">
          Master the <span className="text-neonPink">Future</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-emerald-200">
            Of Technology
          </span>
        </h1>

        <p className="text-slate-500 mt-8 max-w-2xl mx-auto font-mono text-xs tracking-widest uppercase">
          AI · Cloud · DevOps · Development · Cyber Security
        </p>

        {/* Action Button to trigger the selection */}
        <div className="mt-12">
           <button 
             onClick={() => handleStartLearning("Full Stack Development", 1)}
             className="bg-neonGreen text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-lg shadow-neonGreen/20"
           >
             Initialize Learning Session
           </button>
        </div>

        <div className="flex justify-center gap-12 mt-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white">50K+</h3>
            <p className="text-slate-600 text-[10px] uppercase mt-1">Active Learners</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white">200+</h3>
            <p className="text-slate-600 text-[10px] uppercase mt-1">Pro Courses</p>
          </div>
        </div>
      </div>
    </section>
  );
}