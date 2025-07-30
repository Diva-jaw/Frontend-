import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseContext } from '../contexts/CourseContext';
import { CourseWithModulesAndLevels, CourseModule, ModuleLevel, ModuleTopic } from '../services/courseService';
import { useAuth } from '../components/AuthContext';
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
import { createPortal } from 'react-dom';

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
  const { isLoggedIn } = useAuth();
  const [courses, setCourses] = useState<CourseWithModulesAndLevels[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
  const [clickedModuleId, setClickedModuleId] = useState<{ [courseId: number]: number | null }>({});
  const rowRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{top: number, left: number, width: number} | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  // Add a ref for each course name cell
  const courseNameRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  useEffect(() => {
    if (hoveredCourseId !== null && courseNameRefs.current[hoveredCourseId]) {
      const rect = courseNameRefs.current[hoveredCourseId]!.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top + window.scrollY,
        left: rect.left + 350 + window.scrollX, // position a little more to the right
        width: 340 // fixed wider dropdown
      });
    } else {
      setDropdownPosition(null);
    }
  }, [hoveredCourseId, courses]);

  const handleLevelClick = (courseId: number, moduleId: number, levelId: number) => {
    navigate(`/course/${courseId}/module/${moduleId}/level/${levelId}`);
  };

  const getCourseIcon = (courseName: string, size = 36) => {
    const IconComponent = courseIcons[courseName as keyof typeof courseIcons] || BookOpen;
    return <IconComponent size={size} />;
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

  const handleEnrollClick = () => {
    // This button should work without authentication - no redirect to login
    // Navigate to specific course enrollment
    navigate('/course/6/module/11/level/31');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-700 dark:text-gray-200 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 dark:text-red-400 mb-6 font-medium">Error: {error}</p>
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
    <>
      {/* AI Masterclass Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 border border-blue-200 dark:border-blue-900 rounded-3xl shadow-2xl overflow-hidden mb-8 px-4 sm:px-8 py-6 sm:py-8 lg:py-10 mt-20 animate-scaleIn" style={{ minHeight: 'auto', opacity: 1, transform: 'none' }}>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-white/40 dark:border-blue-900/30" style={{ zIndex: 1 }} />
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Main Content Container */}
        <div className="relative z-10">
          {/* Header Section with Enhanced Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center justify-between gap-4 min-w-0 flex-1 animate-slideInFromLeft">
              {/* Enhanced Text Content */}
                             <div className="min-w-0 flex-1">
                                   <div className="flex items-center justify-center gap-4 mb-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-lg leading-tight text-center bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                      Global AI Masterclass: For Future AI Leaders
                    </h1>
                    
                    {/* Enhanced Best Seller Badge */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl tracking-wide border-4 border-white/40 dark:border-green-900/40 flex items-center gap-3 animate-pulse-slow hover:scale-105 transition-transform duration-300 animate-slideInFromRight">
                      <span className="inline-block w-3 h-3 bg-white rounded-full animate-pulse"></span>
                      <span className="text-base">Best Seller</span>
                    </div>
                  </div>
                 
                                   <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium mb-6 opacity-95 leading-relaxed text-center max-w-4xl mx-auto">
                    Exceptional opportunity to get trained by global AI Technologist combined with Hands-on Working<br />
                    on <strong className="text-blue-600 dark:text-blue-400 font-bold">International Award Winning AI Products</strong> to make you Industry ready
                  </p>
               </div>
            </div>
          </div>
          
          {/* Enhanced Divider */}
          <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-100 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 opacity-70 mb-6 rounded-full animate-shimmer"></div>
          
          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                      {/* Left Column - Company Description */}
                          <div className="space-y-6 animate-slideInFromLeft">
                <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex flex-col justify-center">
                                       <p className="text-lg sm:text-xl lg:text-2xl text-black mb-3 leading-tight">
                      Ruhil Future Technologies presents <strong>Silicon Valley</strong> based<br />
                      global AI Masterclass for Future AI Leaders
                    </p>
                   <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                     <p className="text-lg leading-relaxed">Ruhil Future Technologies is a <strong>Canada based</strong> global AI Organization<br />with the aligned focus to make India an AI Powerhouse.</p>
                   </div>
                 </div>
                 
                                                     {/* CTA Buttons moved here */}
                   <div className="flex flex-col sm:flex-row gap-4 items-center justify-start mt-6">
                    <button 
                      onClick={handleEnrollClick}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 to-purple-700 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-blue-800 hover:to-purple-800 transition-all duration-300 shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 border-2 border-blue-200 dark:border-blue-800 hover:scale-105 transform animate-glow" 
                      tabIndex={0}
                    >
                      <span>Enroll Now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right animate-pulse">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                    <button
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-2xl hover:shadow-3xl hover:scale-105 transform"
                      tabIndex={0}
                      onClick={() => window.open("http://rftsystemsbackend-testing.up.railway.app/uploads/AI%20COURSE.pdf", "_blank")}
                    >
                      <span>View Curriculum</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Internship Guarantee moved here */}
                  <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 shadow-2xl border-4 border-white/40 dark:border-blue-900/40 hover:scale-105 transition-transform duration-300 group animate-pulse-slow mt-6 w-fit ml-9">
                    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap text-white drop-shadow group-hover:scale-110 transition-transform duration-300">
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                      <path d="M22 10v6"></path>
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                    </svg>
                    <div className="text-center">
                      <span className="font-bold text-white text-xl sm:text-2xl block">100% Guarantee of Internship</span>
                      <span className="text-blue-100 dark:text-blue-200 font-medium text-base">with Ruhil Future Technologies</span>
                    </div>
                  </div>
             </div>
            
            {/* Right Column - Feature Cards */}
            <div className="space-y-6 animate-slideInFromRight">
              {/* Enhanced Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 {[
                   { icon: 'clock', text: '9 Months', color: 'blue' },
                                       { icon: 'code', text: '3 Training Modules', color: 'purple' },
                   { icon: 'users', text: '5 Days a Week', color: 'green' },
                   { icon: 'network', text: '3 Live Projects', color: 'yellow' }
                 ].map((feature, idx) => (
                  <div key={feature.text} className="flex items-center gap-3 p-4 bg-white/80 dark:bg-gray-700/80 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`text-${feature.color}-600 dark:text-${feature.color}-400`}>
                        {feature.icon === 'clock' && <><circle cx={12} cy={12} r={10}></circle><polyline points="12 6 12 12 16 14"></polyline></>}
                                                 {feature.icon === 'code' && <><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></>}
                                                 {feature.icon === 'users' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
                                                 {feature.icon === 'network' && <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/><path d="M3 21l9-9"/></>}
                      </svg>
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 text-base font-semibold">{feature.text}</span>
                  </div>
                ))}
              </div>
              
                                            {/* Enhanced Benefits Section */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {/* Real Industry Mentorship - with users/mentorship icon */}
                  <div className="flex items-center gap-3 p-4 bg-white/90 dark:bg-gray-700/90 rounded-2xl shadow-lg border border-green-100 dark:border-green-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.4s' }}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="m22 21-2-2"></path>
                        <path d="M16 16l4 4"></path>
                      </svg>
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 text-base font-semibold">Real Industry Mentorship</span>
                  </div>
                  
                  {/* 3 Internships - with briefcase icon */}
                  <div className="flex items-center gap-3 p-4 bg-white/90 dark:bg-gray-700/90 rounded-2xl shadow-lg border border-green-100 dark:border-green-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.5s' }}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 text-base font-semibold">3 Internships</span>
                  </div>
                  
                  {/* Global AI Product and Leadership experience - with globe/leadership icon */}
                  <div className="sm:col-span-2 flex items-center gap-3 p-4 bg-white/90 dark:bg-gray-700/90 rounded-2xl shadow-lg border border-green-100 dark:border-green-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.6s' }}>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M2 12h20"></path>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Full global AI Product and Leadership experience</span>
                  </div>
               </div>
            </div>
          </div>
          
          
          
          
        </div>
      </div>
      {/* End AI Masterclass Hero Section */}

      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Explore Our Other Courses Below:
            </h1>
            <p className="text-base text-blue-700 dark:text-blue-300 font-semibold max-w-2xl mx-auto leading-snug">
              Hover over any course to discover its detailed modules and levels.
            </p>
          </div>
        </div>
      </div>

      {/* FORMAL COURSES TABLE */}
      <div className="w-full px-1 py-2">
        {/* FORMAL TABLE CONTAINER */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-gray-700 z-30">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 px-2 py-2 z-10 border-b border-blue-200 dark:border-gray-600 rounded-t-xl">
            <div className="grid grid-cols-12 gap-2 text-gray-800 dark:text-gray-200 font-bold text-xs">
              <div className="col-span-1 text-center bg-gradient-to-r from-blue-400 to-blue-500 py-2 rounded border border-blue-300 shadow-sm text-white">#</div>
              <div className="col-span-11 text-center bg-gradient-to-r from-indigo-400 to-purple-500 py-2 px-2 rounded border border-indigo-300 shadow-sm text-white">Course Name</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-200 dark:divide-gray-700 pb-32">
            {courses.filter(course => course.name !== 'AI Masterclass: For Future AI Leaders').map((course, index) => (
              <div
                key={course.id}
                className="relative group border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-100/60 dark:hover:bg-blue-900/20 hover:shadow-xl transition-all duration-200 rounded-xl mb-2"
                ref={el => rowRefs.current[course.id] = el}
              >
                {/* FORMAL TABLE ROW */}
                <div className="px-3 py-3">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    {/* Row Number */}
                    <div className="col-span-1 text-center">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xs px-2 py-1 rounded border border-blue-300 shadow-sm">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Course Name */}
                    <div className="col-span-11 relative" ref={el => courseNameRefs.current[course.id] = el}>
                      <div 
                        className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-full h-full"
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
                        <div className={`p-2 rounded-lg ${getCourseIconColor(course.name)} text-white shadow-md border border-white flex-shrink-0`}>
                          {getCourseIcon(course.name, 36)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{course.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-tight line-clamp-2">{course.description}</p>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {hoveredCourseId !== null && dropdownPosition &&
        createPortal(
          <div
            className="z-50 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-600 shadow-lg rounded-b p-2"
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              minWidth: 400,
              maxWidth: 500,
            }}
            onMouseEnter={() => setHoveredCourseId(hoveredCourseId)}
            onMouseLeave={() => setHoveredCourseId(null)}
          >
            <div className="p-2">
              <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center border-b border-blue-200 dark:border-gray-600 pb-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></div>
                {courses.find(c => c.id === hoveredCourseId)?.name} - Module Details
              </h4>
              <div className="space-y-1">
                {courses.find(c => c.id === hoveredCourseId)?.modules.map((module) => (
                  <div key={module.id} className="bg-white dark:bg-gray-700 rounded p-2 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors border border-blue-200 dark:border-gray-600 relative shadow-sm">
                    <div
                      className="w-full text-left flex items-center justify-between cursor-pointer"
                      onMouseEnter={() => setClickedModuleId(prev => ({ ...prev, [hoveredCourseId]: module.id }))}
                      onMouseLeave={() => setClickedModuleId(prev => ({ ...prev, [hoveredCourseId]: null }))}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md border border-blue-300 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">{module.name}</h5>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                          {module.levels?.length || 0} Levels
                        </div>
                        <ChevronRight 
                          size={12} 
                          className={`transition-transform duration-300 text-blue-600 dark:text-blue-400 ${clickedModuleId[hoveredCourseId] === module.id ? 'rotate-90' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Levels Dropdown - Separate box on right */}
                    {clickedModuleId[hoveredCourseId] === module.id && (
                      <div 
                        className="absolute left-full top-0 ml-3 bg-green-50 dark:bg-gray-700 border border-green-200 dark:border-gray-600 shadow-lg rounded-lg p-3" 
                        style={{ width: '250px', transform: 'translateX(-50%)', zIndex: 9999 }}
                        onMouseEnter={() => setClickedModuleId(prev => ({ ...prev, [hoveredCourseId]: module.id }))}
                        onMouseLeave={() => setClickedModuleId(prev => ({ ...prev, [hoveredCourseId]: null }))}
                      >
                        <h5 className="text-sm font-bold text-green-900 dark:text-green-300 mb-2 flex items-center border-b border-green-200 dark:border-gray-600 pb-2">
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
                              className="bg-white dark:bg-gray-600 rounded-lg p-2 hover:bg-green-100 dark:hover:bg-gray-500 transition-all duration-200 cursor-pointer border border-green-200 dark:border-gray-500 hover:border-green-300 dark:hover:border-gray-400 shadow-sm"
                              onClick={() => handleLevelClick(hoveredCourseId, module.id, level.id)}
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
                                    <h6 className="text-xs font-bold text-green-900 dark:text-green-300">{level.level_name}</h6>
                                    <p className="text-xs text-green-700 dark:text-green-400">{level.duration} • {level.level_range}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="flex items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 px-2 py-1 rounded-full border border-green-200 dark:border-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <circle cx="12" cy="12" r="3"></circle>
                                      <path d="M12 1v6m0 6v6"></path>
                                    </svg>
                                    <span className="font-medium">{level.topics?.length || 0}</span>
                                  </div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
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
        , document.body)}
    </>
  );
};

export default AllCoursesMegaPage; 