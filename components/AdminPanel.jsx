import { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit, BookOpen, LayoutDashboard } from 'lucide-react';
import axios from 'axios';

export default function AdminPanel() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category: '', price: '' });

  // 1. Fetch all courses to show in the table
  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/courses');
      setCourses(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  // 2. Handle adding a new course to MySQL
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/courses', newCourse);
      alert("Course Added Successfully!");
      setNewCourse({ title: '', description: '', category: '', price: '' }); // Reset form
      fetchCourses(); // Refresh list
    } catch (err) {
      alert("Failed to add course");
    }
  };

  // 3. Handle deleting a course
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this course?")) {
      await axios.delete(`http://localhost:3000/api/courses/${id}`);
      fetchCourses();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 font-bold text-xl">
          <LayoutDashboard className="text-indigo-400" /> Admin Portal
        </div>
        <nav className="space-y-4">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Management</div>
          <button className="flex items-center gap-3 w-full text-sm font-medium hover:text-indigo-400 transition">
            <BookOpen size={18} /> Manage Courses
          </button>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Course Management</h1>

        {/* Add Course Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-10">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <PlusCircle size={20} className="text-indigo-600" /> Add New Course
          </h2>
          <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" placeholder="Course Title" required
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 outline-none"
              value={newCourse.title}
              onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
            />
            <input 
              type="text" placeholder="Category (e.g. Web Dev)" required
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500/20 outline-none"
              value={newCourse.category}
              onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
            />
            <textarea 
              placeholder="Description" required className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3 h-24 outline-none"
              value={newCourse.description}
              onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
            />
            <button type="submit" className="md:col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
              Create Course
            </button>
          </form>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-bold text-slate-600">ID</th>
                <th className="p-4 text-sm font-bold text-slate-600">Title</th>
                <th className="p-4 text-sm font-bold text-slate-600">Category</th>
                <th className="p-4 text-sm font-bold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="p-4 text-sm text-slate-500">#{course.id}</td>
                  <td className="p-4 text-sm font-bold text-slate-800">{course.title}</td>
                  <td className="p-4 text-sm text-slate-600">{course.category}</td>
                  <td className="p-4 text-right flex justify-end gap-3">
                    <button className="p-2 text-slate-400 hover:text-indigo-600"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}