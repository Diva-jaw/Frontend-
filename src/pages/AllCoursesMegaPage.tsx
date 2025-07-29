import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from '../contexts/CourseContext';
import { CourseWithModulesAndLevels, CourseModule, ModuleLevel, ModuleTopic } from '../services/courseService';
import { 
  Database, 
  Code, 
  BarChart3, 
  PenTool, 
  Briefcase,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Users,
  BookOpen,
  Play,
  Target,
  Award,
  Monitor,
  Palette,
  DollarSign,
  Settings
} from 'lucide-react';

// Course icons mapping
const courseIcons = {
  'DataScience + AI': Database,
  'FullStack': Code,
  'Marketing': BarChart3,
  'Design': PenTool,
  'Product Management': Briefcase,
  'Web UI Design': Monitor,
  'Graphic & Video Design': Palette,
  'Sales & Marketing': DollarSign,
  'Mechanical CAD': Settings,
};

const AllCoursesMegaPage: React.FC = () => {
  const navigate = useNavigate();
  const { getAllCoursesWithModulesAndLevels } = useCourseContext();
  const [courses, setCourses] = useState<CourseWithModulesAndLevels[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
  const [clickedModuleId, setClickedModuleId] = useState<{ [courseId: number]: number | null }>({});

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const all = await getAllCoursesWithModulesAndLevels();
        setCourses(all);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [getAllCoursesWithModulesAndLevels]);

  const handleLevelClick = (courseId: number, moduleId: number, levelId: number) => {
    navigate(`/course/${courseId}/module/${moduleId}/level/${levelId}`);
  };

  const getCourseIcon = (courseName: string) => {
    const IconComponent = courseIcons[courseName as keyof typeof courseIcons] || BookOpen;
    return <IconComponent size={36} />;
  };

  const getCourseIconColor = (courseName: string) => {
    const colors = {
      'DataScience + AI': 'bg-gradient-to-r from-pink-500 to-purple-600',
      'FullStack': 'bg-gradient-to-r from-blue-500 to-blue-700',
      'Marketing': 'bg-gradient-to-r from-green-500 to-green-700',
      'Design': 'bg-gradient-to-r from-orange-500 to-red-600',
      'Product Management': 'bg-gradient-to-r from-purple-500 to-purple-700',
      'Web UI Design': 'bg-gradient-to-r from-teal-500 to-teal-700',
      'Graphic & Video Design': 'bg-gradient-to-r from-orange-500 to-red-600',
      'Sales & Marketing': 'bg-gradient-to-r from-orange-500 to-orange-700',
      'Mechanical CAD': 'bg-gradient-to-r from-gray-500 to-gray-700',
    };
    return colors[courseName as keyof typeof colors] || 'bg-gradient-to-r from-blue-500 to-blue-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-700 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-6 font-medium">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              OUR COURSES
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive range of courses. Hover over any course to discover its detailed modules and levels.
            </p>
          </div>
        </div>
      </div>

      {/* FORMAL COURSES TABLE */}
      <div className="w-full px-1 py-2">
        {/* FORMAL TABLE CONTAINER */}
        <div className="bg-white rounded shadow overflow-hidden border border-gray-300" style={{ minHeight: `${Math.max(800, courses.length * 120 + 200)}px` }}>
          {/* Table Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-2 py-2 z-10 border-b border-gray-300">
            <div className="grid grid-cols-12 gap-2 text-white font-bold text-xs">
              <div className="col-span-1 text-center bg-slate-700 py-1 rounded border border-slate-600">#</div>
              <div className="col-span-6 text-center bg-slate-700 py-1 px-2 rounded border border-slate-600">Course Name</div>
              <div className="col-span-3"></div>
              <div className="col-span-2 text-center bg-slate-700 py-1 rounded border border-slate-600">Duration</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 pb-32">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="relative group border-b border-gray-200 bg-white"
              >
                {/* FORMAL TABLE ROW */}
                <div className="px-2 py-2">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    {/* Row Number */}
                    <div className="col-span-1 text-center">
                      <span className="bg-gray-200 text-gray-800 font-bold text-xs px-1 py-0.5 rounded border border-gray-300">
                        {index + 1}
                      </span>
                    </div>

                    {/* Course Name */}
                    <div className="col-span-6 relative">
                      <div 
                        className="flex items-center space-x-2 bg-gray-50 p-2 rounded border border-gray-200 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => {
                          setHoveredCourseId(course.id);
                          // Close any open modules from other courses
                          setClickedModuleId(prev => {
                            const newState = { ...prev };
                            Object.keys(newState).forEach(courseId => {
                              if (parseInt(courseId) !== course.id) {
                                newState[parseInt(courseId)] = null;
                              }
                            });
                            return newState;
                          });
                        }}
                        onMouseLeave={() => setHoveredCourseId(null)}
                      >
                        <div className={`p-1 rounded ${getCourseIconColor(course.name)} text-white shadow border border-white flex-shrink-0`}>
                          {getCourseIcon(course.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 mb-0.5">{course.name}</h3>
                          <p className="text-xs text-gray-600 leading-tight">{course.description}</p>
                        </div>
                      </div>

                      {/* FORMAL HOVER DROPDOWN */}
                      {hoveredCourseId === course.id && (
                        <div 
                          className="absolute top-full right-0 z-50 bg-blue-50 border border-blue-200 shadow-lg rounded-b"
                          style={{ width: '65%' }}
                          onMouseEnter={() => setHoveredCourseId(course.id)}
                          onMouseLeave={() => setHoveredCourseId(null)}
                        >
                          <div className="p-2">
                            <h4 className="text-xs font-bold text-blue-900 mb-1 flex items-center border-b border-blue-200 pb-1">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></div>
                              {course.name} - Module Details
                            </h4>
                            <div className="space-y-1">
                              {course.modules.map((module) => (
                                <div key={module.id} className="bg-white rounded p-2 hover:bg-blue-100 transition-colors border border-blue-200 relative shadow-sm">
                                  <div
                                    className="w-full text-left flex items-center justify-between cursor-pointer"
                                    onMouseEnter={() => setClickedModuleId(prev => ({ ...prev, [course.id]: module.id }))}
                                    onMouseLeave={() => setClickedModuleId(prev => ({ ...prev, [course.id]: null }))}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border border-blue-300 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                        </svg>
                                      </div>
                                      <div>
                                        <h5 className="text-sm font-bold text-blue-900 mb-1">{module.name}</h5>
                                        <p className="text-xs text-blue-600 font-medium">{module.duration}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-200">
                                        {module.levels?.length || 0} Levels
                                      </div>
                                      <ChevronRight 
                                        size={12} 
                                        className={`transition-transform duration-300 text-blue-600 ${clickedModuleId[course.id] === module.id ? 'rotate-90' : ''}`}
                                      />
                                    </div>
                                  </div>

                                  {/* Levels Dropdown - Separate box on right */}
                                  {clickedModuleId[course.id] === module.id && (
                                    <div 
                                      className="absolute left-full top-0 ml-3 bg-green-50 border border-green-200 shadow-lg rounded-lg p-3" 
                                      style={{ width: '220px', transform: 'translateX(-50%)', zIndex: 9999 }}
                                      onMouseEnter={() => setClickedModuleId(prev => ({ ...prev, [course.id]: module.id }))}
                                      onMouseLeave={() => setClickedModuleId(prev => ({ ...prev, [course.id]: null }))}
                                    >
                                      <h5 className="text-sm font-bold text-green-900 mb-2 flex items-center border-b border-green-200 pb-2">
                                        <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm mr-2">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 11H1l8-8 8 8h-8v8z"></path>
                                          </svg>
                                        </div>
                                        {module.name} - Levels
                                      </h5>
                                      <div className="space-y-2">
                                        {module.levels.map((level) => (
                                          <div
                                            key={level.id}
                                            className="bg-white rounded-lg p-2 hover:bg-green-100 transition-all duration-200 cursor-pointer border border-green-200 hover:border-green-300 shadow-sm"
                                            onClick={() => handleLevelClick(course.id, module.id, level.id)}
                                          >
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center space-x-2">
                                                <div className="p-1.5 rounded-md bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <path d="m9 12 2 2 4-4"></path>
                                                  </svg>
                                                </div>
                                                <div>
                                                  <h6 className="text-xs font-bold text-green-900">{level.level_name}</h6>
                                                  <p className="text-xs text-green-700">{level.duration} • {level.level_range}</p>
                                                </div>
                                              </div>
                                              <div className="flex items-center space-x-1">
                                                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path d="M12 1v6m0 6v6"></path>
                                                  </svg>
                                                  <span className="font-medium">{level.topics?.length || 0}</span>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                                                  <path d="M5 12h14"></path>
                                                  <path d="m12 5 7 7-7 7"></path>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gap/Empty Space */}
                    <div className="col-span-3"></div>

                    {/* Duration */}
                    <div className="col-span-2 text-center">
                      <div className="bg-orange-100 text-orange-800 font-bold text-xs px-2 py-1 rounded border border-orange-300">
                        {Math.ceil(course.modules.reduce((total, module) => {
                          const weeks = parseInt(module.duration.split(' ')[0]);
                          return total + weeks;
                        }, 0) / 4)} months
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Hover over any course above to explore its detailed modules and levels. 
              Click on a level to enroll and begin your learning adventure.
            </p>
            <div className="flex justify-center space-x-6">
              <button 
                onClick={() => navigate('/all-courses')}
                className="bg-slate-700 text-white px-10 py-4 rounded-xl hover:bg-slate-800 transition-all duration-300 flex items-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <BookOpen size={20} className="mr-3" />
                View All Courses
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-gray-100 text-gray-700 px-10 py-4 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Users size={20} className="mr-3" />
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesMegaPage; 