import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Brain,
  Palette,
  Code,
  Megaphone,
  Target,
  GraduationCap,
} from 'lucide-react';

const courses = [
  { name: 'Data Science', icon: <Database size={28} className="text-blue-500" />, desc: 'Analytics & machine learning' },
  { name: 'AI/ML', icon: <Brain size={28} className="text-purple-500" />, desc: 'Artificial intelligence & neural networks' },
  { name: 'Design', icon: <Palette size={28} className="text-pink-500" />, desc: 'UI/UX & graphic design' },
  { name: 'Full Stack', icon: <Code size={28} className="text-green-500" />, desc: 'Web development & programming' },
  { name: 'Marketing', icon: <Megaphone size={28} className="text-yellow-500" />, desc: 'Digital marketing & SEO' },
  { name: 'Product Management', icon: <Target size={28} className="text-indigo-500" />, desc: 'Product strategy & management' },
];

const AppliedCourses: React.FC = () => {
  const navigate = useNavigate();

  const handleCourseClick = (course: string) => {
    let courseSlug = course.toLowerCase().replace(/\s+/g, '-');
    // Handle special case for AI/ML
    if (course === 'AI/ML') {
      courseSlug = 'ai-ml';
    }
    navigate(`/hr/applied-courses/${courseSlug}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 animate-fadeIn">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 text-blue-900 tracking-tight drop-shadow">Select Course Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <button
              key={course.name}
              onClick={() => handleCourseClick(course.name)}
              className="w-full py-8 px-4 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-md border border-blue-100 hover:from-blue-200 hover:to-blue-50 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp"
              tabIndex={0}
              title={course.desc}
            >
              <span className="mb-2">{course.icon}</span>
              <span className="font-semibold text-lg text-blue-800 group-hover:text-blue-900 transition-colors">{course.name}</span>
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all duration-200 z-10 shadow-lg whitespace-nowrap">{course.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedCourses; 