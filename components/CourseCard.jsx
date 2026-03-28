import React, { useState, useRef } from 'react';
import { Layout, CheckCircle2, ArrowRight, Play, Lock, FileText, Download } from 'lucide-react';

const CoursePlayer = ({ stack, token, userId }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [courseComplete, setCourseComplete] = useState(false);
  const videoRef = useRef(null);

  // 4 Blank Video Placeholders (e.g., small 3s MP4s)
  const videos = [
    { id: 1, title: 'Blank Intro // System Check' },
    { id: 2, title: 'Blank Core Concepts 1' },
    { id: 3, title: 'Blank Core Concepts 2' },
    { id: 4, title: 'Blank Final Review // Conclusion' },
  ];

  const handleVideoEnd = async (videoIndex) => {
    if (!completedVideos.includes(videoIndex)) {
      const updatedCompleted = [...completedVideos, videoIndex];
      setCompletedVideos(updatedCompleted);

      // SAVE PROGRESS TO BACKEND (MySQL)
      // This saves to the user_progress table
      await axios.post('http://localhost:3000/api/courses/progress', 
        { userId: userId, courseId: stack.id, lessonId: videoIndex + 1 },
        { headers: { Authorization: `Bearer ${token}` }}
      );
    }
    
    // Auto-advance
    if (videoIndex < videos.length - 1) {
      setCurrentVideo(videoIndex + 1);
    } else {
      // 5th Video finished: Trigger Quiz
      setShowQuiz(true);
    }
  };

  const passQuiz = async () => {
    // 1. Mark status as completed in the enrollments table
    await axios.put(`http://localhost:3000/api/courses/complete/${stack.id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCourseComplete(true);
    alert("Certification Quiz Passed! Certificate Now Active.");
  };

  return (
    <div className="flex-1 p-16">
      {/* Course Title and Progress Bar */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-mono text-neonGreen uppercase tracking-[0.3em]mb-2">CURRENT SESSION</h2>
          <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">{stack.name}</h3>
        </div>
        <div className="text-right">
          <p className="text-neonGreen font-mono text-lg font-black">{Math.round((completedVideos.length / videos.length) * 100)}%</p>
          <div className="w-32 h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
             <div className="h-full bg-neonGreen transition-all duration-300" style={{width: `${(completedVideos.length / videos.length) * 100}%`}}></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Video Player Area */}
        <div className="flex-grow aspect-video bg-slate-950 border border-white/10 rounded-xl overflow-hidden relative">
          {videos[currentVideo] && (
            <video 
              ref={videoRef}
              src={`/assets/blank_video.mp4`} // Create a very short 3-5s blank MP4 in public/assets
              className="w-full h-full object-cover"
              controls
              onEnded={() => handleVideoEnd(currentVideo)}
            />
          )}
          <div className="absolute top-4 left-4 bg-darkBg/80 px-3 py-1.5 rounded text-[10px] font-mono text-white tracking-wider flex items-center gap-2">
            <Play size={10} className="text-neonGreen"/> Video {currentVideo + 1}: {videos[currentVideo].title}
          </div>
        </div>

        {/* Playlist & Certification Status */}
        <div className="w-full xl:w-72 space-y-4">
          <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest px-1">Session Timeline</h4>
          {videos.map((vid, index) => (
            <button key={vid.id} onClick={() => setCurrentVideo(index)} 
                    disabled={index > completedVideos.length} 
                    className={`w-full p-4 rounded-lg flex items-center justify-between transition-all ${currentVideo === index ? 'bg-slate-800 border-white/10' : 'hover:bg-slate-800/50'}`}>
              <div className="flex items-center gap-3">
                {completedVideos.includes(index) ? <CheckCircle2 size={16} className="text-neonGreen"/> : <Lock size={16} className="text-slate-600"/>}
                <span className={`text-xs font-medium ${currentVideo === index ? 'text-white' : 'text-slate-500'}`}>{vid.title}</span>
              </div>
              <span className="font-mono text-[9px] text-slate-700">3:05</span>
            </button>
          ))}

          {/* Quiz & Certification Button */}
          {showQuiz && !courseComplete && (
            <button onClick={passQuiz} className="w-full flex items-center gap-3 justify-center bg-white text-darkBg px-6 py-3 rounded-lg font-black uppercase text-xs tracking-[0.2em] hover:bg-neonGreen group mt-6">
              <FileText size={16} className="group-hover:-translate-y-1 transition-transform" /> Take Final Quiz
            </button>
          )}

          {courseComplete && (
            <div className="w-full p-6 mt-6 bg-neonGreen text-darkBg rounded-lg text-center shadow-lg">
                <Download size={24} className="mx-auto mb-3"/>
                <p className="text-[11px] font-black uppercase tracking-widest mb-1">Status: CERTIFIED</p>
                <p className="text-xs font-medium">Download from your Dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;