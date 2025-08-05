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
  ChevronRight,
  BookOpen,
  Monitor,
  Palette,
  DollarSign,
  Settings,
  Sun,
  Moon,
  Smartphone
} from 'lucide-react';
import { createPortal } from 'react-dom';

// Course icons mapping
const courseIcons = {
  'DataScience + AI': Database,
  'Full Stack Web Development': Code,
  'Full Stack App Development': Smartphone,
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
  const { } = useAuth();
  const [courses, setCourses] = useState<CourseWithModulesAndLevels[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
  const [clickedModuleId, setClickedModuleId] = useState<{ [courseId: number]: number | null }>({});
  const rowRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{top: number, left: number, width: number} | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
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
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setDropdownPosition({
        top: rect.top + window.scrollY,
        left: isMobile ? rect.left + window.scrollX : rect.left + 350 + window.scrollX,
        width: isMobile ? Math.min(320, window.innerWidth - 16) : isTablet ? 380 : 420
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
      'Full Stack Web Development': 'bg-gradient-to-r from-blue-500 to-blue-700',
      'Full Stack App Development': 'bg-gradient-to-r from-indigo-500 to-purple-600',
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
    navigate('/course/6/module/11/level/31');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-900 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg sm:text-xl md:text-2xl text-red-600 dark:text-red-400 mb-4 sm:mb-6 font-medium">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-red-700 transition-colors text-base sm:text-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* AI Masterclass Hero Section - Mobile First */}
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 border border-blue-200 dark:border-blue-900 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden mb-4 sm:mb-6 lg:mb-8 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 mt-0 sm:mt-20 animate-scaleIn">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border-2 border-white/40 dark:border-blue-900/30" style={{ zIndex: 1 }} />
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        {/* Main Content Container */}
        <div className="relative z-10">
          {/* Header Section - Mobile Optimized */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 min-w-0 flex-1 animate-slideInFromLeft">
              {/* Enhanced Text Content - Mobile First */}
              <div className="min-w-0 flex-1 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-lg leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent relative">
                      {/* Best Seller Badge - Mobile Only */}
                      <div className="absolute top-8 -left-2 sm:hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg tracking-wide border-2 border-white/40 dark:border-green-900/40 flex items-center gap-1 animate-pulse-slow hover:scale-105 transition-transform duration-300">
                        <span className="inline-block w-1 h-1 bg-white rounded-full animate-pulse"></span>
                        <span className="text-xs">Best Seller</span>
                      </div>
                      Global AI Masterclass: For Future AI Leaders
                    </h1>
                    
                    {/* Enhanced Best Seller Badge - Desktop Only */}
                    <div className="hidden sm:flex bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-bold shadow-xl sm:shadow-2xl tracking-wide border-2 sm:border-4 border-white/40 dark:border-green-900/40 items-center gap-1.5 sm:gap-2 lg:gap-3 animate-pulse-slow hover:scale-105 transition-transform duration-300 animate-slideInFromRight">
                      <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-white rounded-full animate-pulse"></span>
                      <span className="text-xs sm:text-sm lg:text-base">Best Seller</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium mb-0 sm:mb-6 opacity-95 leading-relaxed text-center max-w-4xl mx-auto px-2">
                  Exceptional opportunity to get trained by global AI Technologist combined with Hands-on Working<br className="hidden sm:block" />
                  on <strong className="text-blue-600 dark:text-blue-400 font-bold">International Award Winning AI Products</strong> to make you Industry ready
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Divider */}
          <div className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-100 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 opacity-70 mb-4 sm:mb-6 rounded-full animate-shimmer"></div>
          
          {/* Two Column Grid Layout - Mobile First */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Left Column - Company Description */}
            <div className="space-y-0 sm:space-y-4 lg:space-y-6 animate-slideInFromLeft md:flex md:flex-col md:items-center md:text-center">
              <div className="space-y-0 sm:space-y-3 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex flex-col justify-center">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black dark:text-white mb-2 sm:mb-3 leading-tight">
                  Ruhil Future Technologies presents <strong>Silicon Valley</strong> based<br className="hidden sm:block" />
                  global AI Masterclass for Future AI Leaders
                </p>
                <div className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">Ruhil Future Technologies is a <strong>Canada based</strong> global AI Organization<br className="hidden sm:block" />with the aligned focus to make India an AI Powerhouse.</p>
                </div>
              </div>
              
              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 items-center justify-start md:justify-center mt-3 sm:mt-4 lg:mt-6 mb-12 sm:mb-0 w-full sm:w-auto">
                <button 
                  onClick={handleEnrollClick}
                  className="w-full sm:w-auto flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 lg:px-8 xl:px-12 py-2.5 sm:py-3 lg:py-4 xl:py-5 rounded-lg sm:rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg xl:text-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-green-400/50 border border-green-200 dark:border-green-800 hover:scale-105 transform animate-glow" 
                  tabIndex={0}
                >
                  <span>Enroll Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right animate-pulse sm:w-5 sm:h-5 lg:w-6 lg:h-6">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <button
                  className="w-full sm:w-auto flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 px-4 sm:px-4 lg:px-6 xl:px-8 py-2.5 sm:py-3 lg:py-4 xl:py-5 rounded-lg sm:rounded-lg lg:rounded-xl xl:rounded-2xl text-sm sm:text-sm lg:text-base xl:text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-400/50 shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl hover:scale-105 transform"
                  tabIndex={0}
                  onClick={() => window.open("http://rftsystemsbackend-testing.up.railway.app/uploads/AI%20COURSE.pdf", "_blank")}
                >
                  <span>View Curriculum</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
              
              {/* Internship Guarantee - Mobile Optimized */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-4 lg:px-6 xl:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full bg-blue-100 dark:bg-blue-200 shadow-md border border-blue-200 dark:border-blue-300 hover:scale-105 transition-transform duration-300 group mt-4 sm:mt-4 lg:mt-6 w-fit mx-auto md:mx-auto sm:ml-9">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap text-blue-600 dark:text-blue-700 group-hover:scale-110 transition-transform duration-300 sm:w-6 sm:h-6 lg:w-7 lg:h-7">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                  <path d="M22 10v6"></path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                </svg>
                <div className="text-center">
                  <span className="font-bold text-blue-800 dark:text-blue-900 text-xs sm:text-sm lg:text-xl xl:text-2xl block">100% Guarantee of Internship</span>
                  <span className="text-blue-600 dark:text-blue-700 font-medium text-xs sm:text-sm lg:text-base">with Ruhil Future Technologies</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Feature Cards - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 animate-slideInFromRight">
              {/* Enhanced Features Grid - Mobile First */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { icon: 'clock', text: '9 Months', color: 'blue' },
                  { icon: 'code', text: '3 Training Modules', color: 'purple' },
                  { icon: 'users', text: '5 Days a Week', color: 'green' },
                  { icon: 'network', text: '3 Live Projects', color: 'yellow' }
                ].map((feature, idx) => (
                  <div key={feature.text} className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 p-2 sm:p-3 lg:p-4 bg-white/80 dark:bg-gray-700/80 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg border border-blue-100 dark:border-blue-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <span className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`text-${feature.color}-600 dark:text-${feature.color}-400 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6`}>
                        {feature.icon === 'clock' && <><circle cx={12} cy={12} r={10}></circle><polyline points="12 6 12 12 16 14"></polyline></>}
                        {feature.icon === 'code' && <><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></>}
                        {feature.icon === 'users' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
                        {feature.icon === 'network' && <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/><path d="M3 21l9-9"/></>}
                      </svg>
                    </span>
                    <span className="text-gray-800 dark:text-gray-100 text-xs sm:text-sm lg:text-base font-semibold">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Benefits Section - Mobile Optimized */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {/* Real Industry Mentorship */}
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 p-2 sm:p-3 lg:p-4 bg-white/80 dark:bg-gray-700/80 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg border border-green-100 dark:border-green-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.4s' }}>
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-green-100 dark:bg-green-900 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="m22 21-2-2"></path>
                      <path d="M16 16l4 4"></path>
                    </svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 text-xs sm:text-sm lg:text-base font-semibold">Real Industry Mentorship</span>
                </div>
                
                {/* 3 Internships */}
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 p-2 sm:p-3 lg:p-4 bg-white/80 dark:bg-gray-700/80 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg border border-green-100 dark:border-green-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.5s' }}>
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-green-100 dark:bg-green-900 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 text-xs sm:text-sm lg:text-base font-semibold">3 Internships</span>
                </div>
                
                {/* Global AI Product and Leadership experience */}
                <div className="col-span-2 sm:col-span-2 flex items-center gap-1.5 sm:gap-2 lg:gap-3 p-2 sm:p-3 lg:p-4 bg-white/80 dark:bg-gray-700/80 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg border border-green-100 dark:border-green-900 backdrop-blur-md hover:scale-105 transition-all duration-300 group animate-scaleIn" style={{ animationDelay: '0.6s' }}>
                  <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-green-100 dark:bg-green-900 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M2 12h20"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 text-xs sm:text-sm lg:text-base font-semibold">Full global AI Product and Leadership experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              Explore Our Other Courses Below:
            </h1>
            <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 font-semibold max-w-2xl mx-auto leading-snug">
              Hover over any course to discover its detailed modules and levels.
            </p>
          </div>
        </div>
      </div>

      {/* FORMAL COURSES TABLE - Mobile Optimized */}
      <div className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
        {/* FORMAL TABLE CONTAINER */}
        <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-gray-700 z-30 max-w-full">
          {/* Table Header - Mobile Optimized */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 px-2 sm:px-3 py-2 z-10 border-b border-blue-200 dark:border-gray-600 rounded-t-lg sm:rounded-t-xl">
            <div className="grid grid-cols-12 gap-1 sm:gap-2 text-gray-800 dark:text-gray-200 font-bold text-xs">
              <div className="col-span-2 sm:col-span-1 text-center bg-gradient-to-r from-blue-400 to-blue-500 py-1.5 sm:py-2 rounded border border-blue-300 shadow-sm text-white">#</div>
              <div className="col-span-10 sm:col-span-11 text-center bg-gradient-to-r from-indigo-400 to-purple-500 py-1.5 sm:py-2 px-1 sm:px-2 rounded border border-indigo-300 shadow-sm text-white">Course Name</div>
            </div>
          </div>

          {/* Table Body - Mobile Optimized */}
          <div className="divide-y divide-slate-200 dark:divide-gray-700 pb-24 sm:pb-32">
            {courses.filter(course => course.name !== 'AI Masterclass: For Future AI Leaders').map((course, index) => (
              <div
                key={course.id}
                className="relative group border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-100/60 dark:hover:bg-blue-900/20 hover:shadow-xl transition-all duration-200 rounded-lg sm:rounded-xl mb-1 sm:mb-2"
                ref={el => rowRefs.current[course.id] = el}
              >
                {/* FORMAL TABLE ROW - Mobile Optimized */}
                <div className="px-2 sm:px-3 py-2 sm:py-3">
                  <div className="grid grid-cols-12 gap-1 sm:gap-2 lg:gap-3 items-center">
                    {/* Row Number */}
                    <div className="col-span-2 sm:col-span-1 text-center">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded border border-blue-300 shadow-sm">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Course Name - Mobile Optimized */}
                    <div className="col-span-10 sm:col-span-11 relative" ref={el => courseNameRefs.current[course.id] = el}>
                      <div 
                        className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-1.5 sm:p-2 lg:p-3 rounded-md sm:rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer w-full h-full min-h-[44px] sm:min-h-[48px]"
                        onMouseEnter={() => {
                          setHoveredCourseId(course.id);
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
                        onTouchStart={() => {
                          setHoveredCourseId(course.id);
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
                      >
                        <div className={`p-1 sm:p-1.5 lg:p-2 rounded-md sm:rounded-lg ${getCourseIconColor(course.name)} text-white shadow-md border border-white flex-shrink-0`}>
                          {getCourseIcon(course.name, 20)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">{course.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-tight line-clamp-2">{course.description}</p>
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

      {/* Dropdown Portal - Mobile Optimized */}
      {hoveredCourseId !== null && dropdownPosition &&
        createPortal(
          <div
            className="z-50 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-600 shadow-lg rounded-b p-2"
            style={{
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              minWidth: window.innerWidth < 768 ? '280px' : '400px',
              maxWidth: window.innerWidth < 768 ? 'calc(100vw - 20px)' : '500px',
            }}
            onMouseEnter={() => setHoveredCourseId(hoveredCourseId)}
            onMouseLeave={() => setHoveredCourseId(null)}
            onTouchStart={() => setHoveredCourseId(hoveredCourseId)}
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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

                    {/* Levels Dropdown - Mobile Optimized */}
                    {clickedModuleId[hoveredCourseId] === module.id && (
                      <div 
                        className="absolute left-full top-0 ml-3 bg-green-50 dark:bg-gray-700 border border-green-200 dark:border-gray-600 shadow-lg rounded-lg p-3" 
                        style={{ 
                          width: window.innerWidth < 768 ? '200px' : '250px', 
                          transform: 'translateX(-50%)', 
                          zIndex: 9999,
                          left: window.innerWidth < 768 ? 'auto' : '100%',
                          right: window.innerWidth < 768 ? '0' : 'auto'
                        }}
                        onMouseEnter={() => setClickedModuleId(prev => ({ ...prev, [hoveredCourseId]: module.id }))}
                        onMouseLeave={() => setClickedModuleId(prev => ({ ...prev, [hoveredCourseId]: null }))}
                      >
                        <h5 className="text-sm font-bold text-green-900 dark:text-green-300 mb-2 flex items-center border-b border-green-200 dark:border-gray-600 pb-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                      <circle cx="12" cy="12" r="3"></circle>
                                      <path d="M12 1v6m0 6v6"></path>
                                    </svg>
                                    <span className="font-medium">{level.topics?.length || 0}</span>
                                  </div>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
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
        , document.body)
      }
    </>
  );
};

export default AllCoursesMegaPage; 