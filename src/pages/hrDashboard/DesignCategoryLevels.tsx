import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, TrendingUp, Award, Star } from 'lucide-react';

const levels = [
  { 
    name: 'Level 1', 
    icon: <TrendingUp size={28} className="text-green-500" />, 
    desc: 'Beginner level courses',
    color: 'from-green-100 to-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800'
  },
  { 
    name: 'Level 2', 
    icon: <Award size={28} className="text-blue-500" />, 
    desc: 'Intermediate level courses',
    color: 'from-blue-100 to-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800'
  },
  { 
    name: 'Level 3', 
    icon: <Star size={28} className="text-purple-500" />, 
    desc: 'Advanced level courses',
    color: 'from-purple-100 to-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800'
  },
];

const DesignCategoryLevels: React.FC = () => {
  const navigate = useNavigate();
  const { courseName, categoryName } = useParams<{ courseName: string; categoryName: string }>();

  const handleLevelClick = (level: string) => {
    const levelSlug = level.toLowerCase().replace(/\s+/g, '-');
    navigate(`/hr/applied-courses/${courseName}/${categoryName}/${levelSlug}`);
  };

  const getCategoryDisplayName = (categoryName: string) => {
    return categoryName?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ').replace(/-And-/g, ' & ') || 'Category';
  };

  const getCourseDisplayName = (courseName: string) => {
    if (courseName === 'ai-ml') {
      return 'AI/ML';
    }
    return courseName?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Course';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 animate-fadeIn">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-100 tracking-tight drop-shadow mb-2">
            {getCourseDisplayName(courseName || '')} - {getCategoryDisplayName(categoryName || '')} - Course Levels
          </h2>
          <p className="text-lg text-blue-700 dark:text-blue-300">Select a level to view applications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level) => (
            <button
              key={level.name}
              onClick={() => handleLevelClick(level.name)}
              className={`w-full py-12 px-6 bg-gradient-to-br ${level.color} dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-md border ${level.borderColor} dark:border-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp`}
              tabIndex={0}
              title={level.desc}
            >
              <span className="mb-4">{level.icon}</span>
              <span className={`font-bold text-xl ${level.textColor} dark:text-gray-200 group-hover:scale-110 transition-transform`}>
                {level.name}
              </span>
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-900 dark:bg-blue-700 text-white text-xs rounded px-3 py-2 pointer-events-none transition-all duration-200 z-10 shadow-lg whitespace-nowrap">
                {level.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignCategoryLevels; 