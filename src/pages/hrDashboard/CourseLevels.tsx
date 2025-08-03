import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, TrendingUp, Award, Star, Layers, Smartphone, Globe, Code, PenTool, BookOpen } from 'lucide-react';

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

const modules = [
  { 
    name: 'Module 1', 
    icon: <Layers size={28} className="text-blue-500" />, 
    desc: 'Web Development Essentials',
    color: 'from-blue-100 to-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    subCategories: [
      { name: 'Web Development Essentials', icon: <Globe size={24} className="text-green-500" /> }
    ]
  },
  { 
    name: 'Module 2', 
    icon: <Code size={28} className="text-green-500" />, 
    desc: 'Frontend Development',
    color: 'from-green-100 to-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    subCategories: [
      { name: 'App Development', icon: <Smartphone size={24} className="text-purple-500" /> },
      { name: 'Web Development', icon: <Globe size={24} className="text-blue-500" /> }
    ]
  },
  { 
    name: 'Module 3', 
    icon: <Star size={28} className="text-purple-500" />, 
    desc: 'Advanced Development',
    color: 'from-purple-100 to-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    subCategories: [
      { name: 'Backend Development', icon: <Code size={24} className="text-indigo-500" /> },
      { name: 'Mobile Development', icon: <Smartphone size={24} className="text-pink-500" /> }
    ]
  },
];

const designCategories = [
  { 
    name: 'Web & UI/UX Design', 
    icon: <PenTool size={28} className="text-blue-500" />, 
    desc: '14 weeks • Beginner to Expert',
    color: 'from-blue-100 to-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800'
  },
  { 
    name: 'Graphic and Video Content Design', 
    icon: <BookOpen size={28} className="text-green-500" />, 
    desc: '12 weeks • Beginner to Intermediate',
    color: 'from-green-100 to-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800'
  },
  { 
    name: 'Mechanical and CAD Design', 
    icon: <Layers size={28} className="text-purple-500" />, 
    desc: '16 weeks • Intermediate to Expert',
    color: 'from-purple-100 to-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800'
  },
];

const CourseLevels: React.FC = () => {
  const navigate = useNavigate();
  const { courseName } = useParams<{ courseName: string }>();

  const handleLevelClick = (level: string) => {
    const levelSlug = level.toLowerCase().replace(/\s+/g, '-');
    navigate(`/hr/applied-courses/${courseName}/${levelSlug}`);
  };

  const handleModuleClick = (module: any) => {
    if (module.subCategories.length === 1) {
      // If only one sub-category, navigate directly
      navigate(`/hr/applied-courses/${courseName}/${module.name.toLowerCase().replace(/\s+/g, '-')}/${module.subCategories[0].name.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      // If multiple sub-categories, navigate to module selection
      navigate(`/hr/applied-courses/${courseName}/${module.name.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const handleDesignCategoryClick = (category: any) => {
    navigate(`/hr/applied-courses/${courseName}/${category.name.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '-and-')}`);
  };

  const getCourseDisplayName = (courseName: string) => {
    if (courseName === 'ai-ml') {
      return 'AI/ML';
    }
    return courseName?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Course';
  };

  const isFullStack = courseName === 'full-stack';
  const isAIML = courseName === 'ai-ml';
  const isDesign = courseName === 'design';
  const items = isFullStack ? modules : isDesign ? designCategories : levels;
  const title = isFullStack ? 'Course Modules' : isDesign ? 'Design Categories' : 'Course Levels';
  const subtitle = isFullStack ? 'Select a module to view applications' : isDesign ? 'Select a design category to view applications' : 'Select a level to view applications';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 animate-fadeIn">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 dark:text-blue-100 tracking-tight drop-shadow mb-2">
            {getCourseDisplayName(courseName || '')} - {title}
          </h2>
          <p className="text-lg text-blue-700 dark:text-blue-300">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (isFullStack) {
                  handleModuleClick(item);
                } else if (isDesign) {
                  handleDesignCategoryClick(item);
                } else {
                  handleLevelClick(item.name);
                }
              }}
              className={`w-full py-12 px-6 bg-gradient-to-br ${item.color} dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-md border ${item.borderColor} dark:border-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp`}
              tabIndex={0}
              title={item.desc}
            >
              <span className="mb-4">{item.icon}</span>
              <span className={`font-bold text-xl ${item.textColor} dark:text-gray-200 group-hover:scale-110 transition-transform`}>
                {item.name}
              </span>
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-900 dark:bg-blue-700 text-white text-xs rounded px-3 py-2 pointer-events-none transition-all duration-200 z-10 shadow-lg whitespace-nowrap">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLevels; 