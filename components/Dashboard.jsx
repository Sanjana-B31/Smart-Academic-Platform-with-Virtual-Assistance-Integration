import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import Navbar from '../components/Navbar';
import { User, BookOpen, Play, CheckCircle2, Download, HelpCircle, Mail, Calendar, Lock } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- STATES ---
  const [userData, setUserData] = useState({ id: null, name: "Sanjana", email: "sanjana@edu.flow" });
  const [activeTab, setActiveTab] = useState('learning');
  const [activeCourse, setActiveCourse] = useState(
    location.state?.selectedStack || JSON.parse(localStorage.getItem('activeCourse')) || null
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizPassed, setQuizPassed] = useState(false);

  // --- DATA ---
  const videoLessons = [
    { id: 1, title: "System Initialization", url: "/assets/intro.mp4" },
    { id: 2, title: "Architecture Overview", url: "/assets/all.mp4" },
    { id: 3, title: "Core Logic Implementation", url: "/assets/all.mp4" },
    { id: 4, title: "Security Protocols", url: "/assets/all.mp4" },
    { id: 5, title: "Final Deployment Review", url: "/assets/all.mp4" }
  ];

  const quizQuestions = [
    {
      question: "Which technology is primarily used for styling in this project?",
      options: ["Bootstrap", "Tailwind CSS", "Sass", "Material UI"],
      correct: 1
    },
    {
      question: "What does the 'verifyToken' middleware protect?",
      options: ["Frontend Routes", "Public Assets", "Private API Endpoints", "CSS Files"],
      correct: 2
    }
  ];

  // Logic for Progress Bar
  const progressPercentage = Math.round(((currentVideoIndex + (quizPassed ? 1 : 0)) / (videoLessons.length + 1)) * 100);

  // --- EFFECTS ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    // Fetch User Profile
    axios.get('http://localhost:3000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUserData(res.data.user))
    .catch(err => console.error("Profile Error:", err));

    // Persist Course Selection
    if (location.state?.selectedStack) {
      localStorage.setItem('activeCourse', JSON.stringify(location.state.selectedStack));
    }

    // Fetch Existing Progress
    if (activeCourse) {
        axios.get(`http://localhost:3000/api/courses/progress/${activeCourse.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (res.data) {
                setCurrentVideoIndex(Number(res.data.current_lesson_index) || 0);
                if (res.data.quiz_passed) setQuizPassed(true);
            }
        })
        .catch(() => console.log("Starting new session..."));
    }
  }, [activeCourse, navigate, location.state]);

  // --- HANDLERS ---
  const handleVideoEnd = () => {
    if (currentVideoIndex < videoLessons.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizSubmit = async () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/api/courses/complete', {
            courseId: activeCourse.id,
            progress: 100 
        }, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
        
        setQuizPassed(true);
        setShowQuiz(false);
        setActiveTab('details'); 
        alert("Assessment Verified! Your certificate is now available.");
      } catch (err) {
        alert("Error saving progress. Ensure your server is running on port 3000.");
      }
    }
  };

// Inside your Dashboard component...
const generateCertificate = () => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    // Design the Certificate
    doc.setFillColor(15, 23, 42); // Dark background
    doc.rect(0, 0, 297, 210, 'F');
    
    doc.setTextColor(16, 185, 129); // Neon Green
    doc.setFontSize(40);
    doc.text("CERTIFICATE OF COMPLETION", 148, 60, { align: "center" });

    doc.setTextColor(255, 255, 255); // White
    doc.setFontSize(20);
    doc.text("This is to certify that", 148, 90, { align: "center" });
    
    doc.setFontSize(35);
    doc.text(userData.name.toUpperCase(), 148, 115, { align: "center" });

    doc.setFontSize(20);
    doc.text(`has successfully mastered`, 148, 140, { align: "center" });
    
    doc.setTextColor(16, 185, 129);
    doc.text(activeCourse.name, 148, 160, { align: "center" });

    doc.setTextColor(100, 116, 139); // Gray
    doc.setFontSize(12);
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 148, 185, { align: "center" });

    // Save the PDF
    doc.save(`${userData.name}_Certificate.pdf`);
};

  return (
    <div className="min-h-screen bg-[#05080d] text-white flex flex-col font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-20 w-full flex-grow">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/5 pb-8">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Student <span className="text-emerald-400">Portal</span>
          </h1>
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-white/10 mt-4 md:mt-0">
            <button onClick={() => setActiveTab('learning')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'learning' ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20' : 'text-slate-400'}`}>
              <BookOpen className="inline mr-2" size={14}/> Learning Path
            </button>
            <button onClick={() => setActiveTab('details')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'details' ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20' : 'text-slate-400'}`}>
              <User className="inline mr-2" size={14}/> Personal Details
            </button>
          </div>
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 rounded-[32px] p-8 border border-white/5 shadow-2xl sticky top-24">
              <div className="w-16 h-16 bg-emerald-400 rounded-2xl mb-6 flex items-center justify-center text-black text-2xl font-black italic">
                {userData.name[0]}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">{userData.name}</h2>
              <p className="text-emerald-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">Verified Candidate</p>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                   <Mail size={16} className="text-slate-400" />
                   <div className="flex-1 min-w-0">
                     <p className="text-[11px] font-bold truncate">{userData.email}</p>
                   </div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                   <Calendar size={16} className="text-slate-400" />
                   <p className="text-[11px] font-bold uppercase">March 2026</p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end mb-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase">Mastery Progress</p>
                    <p className="text-[11px] font-black text-emerald-400 italic">{progressPercentage}%</p>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 transition-all duration-1000" style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'learning' ? (
              activeCourse ? (
                <div className="space-y-8">
                  {!showQuiz ? (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                      <div className="xl:col-span-2 aspect-video bg-black rounded-[40px] overflow-hidden border border-white/10 shadow-2xl relative">
                        <video 
                          key={videoLessons[currentVideoIndex].url}
                          className="w-full h-full object-cover"
                          controls autoPlay onEnded={handleVideoEnd}
                        >
                          <source src={videoLessons[currentVideoIndex].url} type="video/mp4" />
                        </video>
                      </div>
                      <div className="space-y-3">
                        {videoLessons.map((vid, idx) => (
                          <div key={vid.id} 
                            onClick={() => idx <= currentVideoIndex && setCurrentVideoIndex(idx)}
                            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${idx === currentVideoIndex ? 'border-emerald-400 bg-emerald-400/5' : 'border-white/5 opacity-40'}`}>
                            <div className="flex items-center gap-4">
                              {idx < currentVideoIndex ? <CheckCircle2 size={16} className="text-emerald-400"/> : <Play size={16} />}
                              <span className="text-[11px] font-bold uppercase">{vid.title}</span>
                            </div>
                            {idx > currentVideoIndex && <Lock size={14} className="text-slate-600" />}
                          </div>
                        ))}
                        <button 
                          onClick={() => currentVideoIndex === videoLessons.length - 1 ? setShowQuiz(true) : alert("Complete lessons first.")}
                          className={`w-full p-5 mt-6 rounded-2xl border border-dashed flex items-center gap-4 ${currentVideoIndex === videoLessons.length - 1 ? 'border-emerald-400 text-emerald-400' : 'opacity-40'}`}
                        >
                          <HelpCircle size={16} /> <span className="text-[11px] font-black uppercase">Final Assessment</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/50 p-12 rounded-[50px] border border-emerald-400/20 shadow-2xl max-w-2xl mx-auto text-center">
                      <h3 className="text-3xl font-black uppercase italic mb-10">Skill Verification</h3>
                      <p className="text-xl font-bold mb-6 italic">"{quizQuestions[currentQuestion].question}"</p>
                      <div className="space-y-4">
                        {quizQuestions[currentQuestion].options.map((opt, idx) => (
                          <button key={idx} onClick={() => setSelectedOption(idx)}
                            className={`w-full p-5 rounded-2xl border text-left font-bold uppercase text-[11px] transition-all ${selectedOption === idx ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400' : 'border-white/5 text-slate-400'}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                      <button disabled={selectedOption === null} onClick={handleQuizSubmit}
                        className="w-full mt-10 bg-emerald-400 text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] disabled:opacity-20">
                        {currentQuestion === quizQuestions.length - 1 ? "Verify & Unlock Certificate" : "Advance to Next Question"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-[500px] border-2 border-dashed border-white/5 rounded-[60px] flex flex-col items-center justify-center">
                   <button onClick={() => navigate('/')} className="bg-emerald-400 text-black px-12 py-4 rounded-2xl font-black uppercase text-xs">Browse Learning Stacks</button>
                </div>
              )
            ) : (
              /* DETAILS TAB */
              <div className="bg-slate-900/50 rounded-[50px] p-12 border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                   <div>
                     <p className="text-[10px] text-slate-500 font-black uppercase mb-2">Student Identity</p>
                     <p className="text-3xl font-bold uppercase italic">{userData.name}</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-slate-500 font-black uppercase mb-2">Email Verification</p>
                     <p className="text-3xl font-bold text-emerald-400 italic">{userData.email}</p>
                   </div>
                </div>
                <div className="border-t border-white/5 pt-12">
                  {quizPassed ? (
                    <div className="flex items-center justify-between bg-emerald-500/5 p-8 rounded-[32px] border border-emerald-500/20">
                      <div>
                        <h4 className="text-xl font-black uppercase text-emerald-400">Mastery Certified</h4>
                        <p className="text-slate-400 text-[11px] font-bold">Stack: {activeCourse?.name}</p>
                      </div>
                      <button onClick={generateCertificate} className="flex items-center gap-4 bg-emerald-400 text-black px-10 py-5 rounded-2xl font-black uppercase text-xs">
                        <Download size={20} /> Download PDF
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-500 uppercase font-black text-xs mb-8 tracking-[0.4em]">Certificate Encrypted // Complete Final Assessment</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}