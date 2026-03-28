import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, CheckCircle, FileText, Lock } from 'lucide-react';
import axios from 'axios';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Fetch course details and lessons from your MySQL
    axios.get(`http://localhost:3000/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleComplete = () => {
    setCompleted(true);
    alert("Congratulations! You have finished the course.");
  };

  if (!course) return <div className="p-10 text-center">Loading Course...</div>;

  return (
    <div className="min-h-screen bg-white pt-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left: Video Player Area */}
        <div className="lg:col-span-2">
          <div className="aspect-video bg-slate-900 rounded-3xl flex items-center justify-center text-white mb-6 overflow-hidden shadow-2xl">
             <Play size={64} className="text-indigo-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-slate-600 leading-relaxed">{course.description}</p>
        </div>

        {/* Right: Lesson List */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 h-fit">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <FileText size={20} className="text-indigo-600" /> Course Content
          </h3>
          <div className="space-y-4">
            {/* Sample Lessons - You can fetch these from your lessons table */}
            {["Introduction", "Core Concepts", "Advanced Logic", "Final Project"].map((lesson, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <span className="text-sm font-medium text-slate-700">{index + 1}. {lesson}</span>
                <CheckCircle size={18} className="text-green-500" />
              </div>
            ))}
          </div>

          {/* Report Button - Only appears if completed or on last lesson */}
          <button 
            onClick={handleComplete}
            className="w-full mt-8 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            Mark as Completed
          </button>

          {completed && (
            <button 
              onClick={() => window.location.href = `/report/${id}`}
              className="w-full mt-3 bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition flex items-center justify-center gap-2"
            >
              <FileText size={20} /> Generate Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}