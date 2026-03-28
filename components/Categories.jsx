import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Play } from 'lucide-react'; 

const stackIcons = {
  fullstack: <Layout size={40} className="text-white" />,
  python: <img src="https://img.icons8.com/color/96/python--v1.png" alt="Python" className="w-16 h-16" />,
  java: <img src="https://img.icons8.com/fluency/96/java-coffee-cup-logo.png" alt="Java" className="w-16 h-16" />,
  c: <img src="https://img.icons8.com/fluency/96/c-plus-plus-logo.png" alt="C++" className="w-16 h-16" />,
  cyber: <img src="https://img.icons8.com/fluency/96/shield.png" alt="Cyber Security" className="w-16 h-16" />,
  uiux: <img src="https://static.vecteezy.com/system/resources/previews/021/076/419/original/ui-ux-designer-icon-design-free-vector.jpg" alt="UI/UX" className="w-16 h-16" />
};

const Categories = () => {
  const navigate = useNavigate();

  const stacks = [
    { id: 'COURSE_FULLSTACK_01', name: 'Full Stack Development', icon: stackIcons.fullstack, isComingSoon: false },
    { id: 'COURSE_PYTHON_02', name: 'Python Programming', icon: stackIcons.python, isComingSoon: false },
    { id: 'COURSE_JAVA_03', name: 'Java Development', icon: stackIcons.java, isComingSoon: true },
    { id: 'COURSE_C_04', name: 'C & C++ Programming', icon: stackIcons.c, isComingSoon: true },
    { id: 'COURSE_CYBER_05', name: 'Cyber Security', icon: stackIcons.cyber, isComingSoon: true },
    { id: 'COURSE_UIUX_06', name: 'UI/UX Design', icon: stackIcons.uiux, isComingSoon: true }
  ];

  const handleSelectStack = (stack) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Unauthorized Access. Please Login.");
      navigate('/login');
      return;
    }

    // 1. Save the course to localStorage so it doesn't disappear on refresh
    localStorage.setItem('activeCourse', JSON.stringify(stack));

    // 2. Navigate to Dashboard and pass the course object
    navigate('/dashboard', { state: { selectedStack: stack } });
  };
 

  return (
    <section className="py-24 bg-darkBg text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-6xl font-black uppercase italic">Browse <span className="text-neonGreen">Stacks</span></h3>
          <p className="text-slate-500 font-mono text-xs mt-4 tracking-[0.3em]">SELECT_CORE_LEARNING_MODULE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacks.map((stack) => (
            <div 
              key={stack.id}
              onClick={() => { if (!stack.isComingSoon) handleSelectStack(stack); }}
              className={`group relative cursor-pointer p-10 rounded-3xl border transition-all duration-500 ${
                stack.isComingSoon 
                ? 'opacity-30 grayscale cursor-not-allowed border-white/5' 
                : 'bg-slate-900/50 border-white/10 hover:border-neonGreen hover:bg-neonGreen/5 shadow-2xl hover:shadow-neonGreen/10'
              }`}
            >
              <div className="mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                {stack.icon}
              </div>
              
              <h4 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-neonGreen transition-colors">
                {stack.name}
              </h4>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {stack.isComingSoon ? '// ACCESS_LOCKED' : 'Initialize Session'}
                </span>
                {!stack.isComingSoon && (
                  <div className="bg-white/5 p-2 rounded-full group-hover:bg-neonGreen group-hover:text-black transition-all">
                    <Play size={14} fill="currentColor" />
                  </div>
                )}
              </div>
              
              {/* Decorative accent for hovered cards */}
              {!stack.isComingSoon && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neonGreen animate-pulse opacity-0 group-hover:opacity-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;