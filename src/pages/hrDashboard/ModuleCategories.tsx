import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Smartphone, Globe, Code, Database, Server } from 'lucide-react';

const moduleCategories = {
  'module-2': [
    { 
      name: 'App Development', 
      icon: <Smartphone size={28} className="text-purple-500" />, 
      desc: 'React Native, Flutter, Swift, Java For Android',
      color: 'from-purple-100 to-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800'
    },
    { 
      name: 'Web Development', 
      icon: <Globe size={28} className="text-blue-500" />, 
      desc: 'React.js, Angular, Tailwind CSS, SCSS, Bootstrap',
      color: 'from-blue-100 to-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    }
  ],
  'module-3': [
    { 
      name: 'Backend Development', 
      icon: <Server size={28} className="text-indigo-500" />, 
      desc: 'Node.js, Python, Java, Go, Database',
      color: 'from-indigo-100 to-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-800'
    },
    { 
      name: 'Mobile Development', 
      icon: <Smartphone size={28} className="text-pink-500" />, 
      desc: 'Advanced mobile app development',
      color: 'from-pink-100 to-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-800'
    }
  ]
};

const ModuleCategories: React.FC = () => {
  const navigate = useNavigate();
  const { courseName, moduleName } = useParams<{ courseName: string; moduleName: string }>();

  const handleCategoryClick = (category: string) => {
    navigate(`/hr/applied-courses/${courseName}/${moduleName}/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const getModuleDisplayName = (moduleName: string) => {
    return moduleName?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Module';
  };

  const getCourseDisplayName = (courseName: string) => {
    return courseName?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Course';
  };

  const categories = moduleCategories[moduleName as keyof typeof moduleCategories] || [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 animate-fadeIn">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-100 tracking-tight drop-shadow mb-2">
            {getCourseDisplayName(courseName || '')} - {getModuleDisplayName(moduleName || '')}
          </h2>
          <p className="text-lg text-blue-700 dark:text-blue-300">Select a category to view applications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`w-full py-12 px-6 bg-gradient-to-br ${category.color} dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-md border ${category.borderColor} dark:border-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp`}
              tabIndex={0}
              title={category.desc}
            >
              <span className="mb-4">{category.icon}</span>
              <span className={`font-bold text-xl ${category.textColor} dark:text-gray-200 group-hover:scale-110 transition-transform`}>
                {category.name}
              </span>
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-900 dark:bg-blue-700 text-white text-xs rounded px-3 py-2 pointer-events-none transition-all duration-200 z-10 shadow-lg whitespace-nowrap max-w-xs">
                {category.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleCategories; 