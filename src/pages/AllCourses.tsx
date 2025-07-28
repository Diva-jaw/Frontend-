import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, 
  Code, 
  BarChart3, 
  PenTool, 
  Briefcase,
  Clock,
  Star,
  ArrowRight,
  Loader2,
  GraduationCap,
  Users,
  Trophy
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCourseContext } from '../contexts/CourseContext';
import CourseCard from '../components/ui/CourseCard';
import { Course } from '../services/courseService';

const AllCourses: React.FC = () => {
  const navigate = useNavigate();
  const { courses, loading, error, fetchCourses } = useCourseContext();
  const [componentError, setComponentError] = useState<string | null>(null);

  console.log('AllCourses: Component rendered with:', { 
    coursesCount: courses.length, 
    loading, 
    error,
    courses: courses.map(c => ({ id: c.id, name: c.name }))
  });

  const handleCourseClick = (course: Course) => {
    try {
      console.log('AllCourses: Course clicked:', course);
      // Navigate to course details page with course ID
      navigate(`/course/${course.id}`);
    } catch (err) {
      console.error('AllCourses: Error in handleCourseClick:', err);
      setComponentError(err instanceof Error ? err.message : 'Navigation error');
    }
  };

  // Refetch courses if there's an error
  const handleRetry = () => {
    try {
      console.log('AllCourses: Retrying to fetch courses...');
      setComponentError(null);
      fetchCourses();
    } catch (err) {
      console.error('AllCourses: Error in handleRetry:', err);
      setComponentError(err instanceof Error ? err.message : 'Retry error');
    }
  };

  // Error boundary for component
  if (componentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Component Error
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{componentError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  try {
    if (loading) {
      console.log('AllCourses: Showing loading state');
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600 dark:text-gray-300">Loading courses...</p>
          </div>
        </div>
      );
    }

    if (error) {
      console.log('AllCourses: Showing error state:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Error loading courses: {error}</p>
            <button 
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    console.log('AllCourses: Rendering courses grid with', courses.length, 'courses');

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Section - Promotional Banner */}
        <section className="relative mt-24 sm:mt-28 lg:mt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Extended Animated Background to fill top white space */}
          <div className="absolute inset-0 -top-32 pointer-events-none select-none z-0">
            <div className="absolute top-0 left-0 w-[32rem] h-[32rem] bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            {/* Extra top circle for more fill */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-r from-blue-300/30 via-purple-300/30 to-pink-300/30 rounded-full blur-[80px] animate-pulse"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[98vw] lg:max-w-[1300px] mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-blue-100 dark:border-blue-900 rounded-3xl shadow-[0_8px_40px_0_rgba(80,80,180,0.18)] overflow-hidden mb-8 px-2 sm:px-10 py-6 sm:py-8 lg:py-10"
              style={{ minHeight: 'auto' }}
            >
              {/* Glass inner border for glassmorphism */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-white/30 dark:border-blue-900/30" style={{ zIndex: 1 }}></div>

              {/* Header Row */}
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2 z-10">
                <div className="flex items-center gap-5 min-w-0">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="p-4 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-400 rounded-2xl shadow-xl flex-shrink-0 border-2 border-white/40 dark:border-blue-900/40"
                  >
                    <Database size={44} className="text-white drop-shadow-lg" />
                  </motion.div>
                  <div className="min-w-0">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-700 via-blue-600 to-blue-400 bg-clip-text text-transparent mb-2 truncate tracking-tight drop-shadow-md">
                      AI Masterclass: For Future AI Leaders
                    </h1>
                    <div className="text-base sm:text-lg text-gray-700 dark:text-gray-200 font-medium mb-1 opacity-90">
                      Become an AI/ML expert with hands-on projects, mentorship, and industry certification.
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-blue-700 dark:text-blue-200 font-semibold">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className="text-yellow-400 drop-shadow-[0_0_4px_rgba(255,215,0,0.7)]" />
                        ))}
                      </div>
                      <span className="ml-1">5.0 <span className="font-normal text-gray-500 dark:text-gray-300">(2,847 reviews)</span></span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg self-start md:self-center tracking-wide border-2 border-white/30 dark:border-green-900/40 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Featured Course
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-100 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 opacity-60 my-4 rounded-full"></div>

              {/* Features Block - First Row: Course Details */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 my-3 px-2 py-3 bg-white/60 dark:bg-gray-700/60 rounded-2xl shadow border border-blue-100 dark:border-blue-900 backdrop-blur-md mx-auto max-w-5xl z-10">
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900"><Clock size={18} className="text-blue-600" /></span>
                  6 Months
                </div>
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900"><Code size={18} className="text-purple-600" /></span>
                  Beginner to Advanced
                </div>
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900"><Users size={18} className="text-green-600" /></span>
                  15,000+ Students
                </div>
                <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900"><Trophy size={18} className="text-yellow-600" /></span>
                  Industry Ready Certificate
                </div>
              </div>

              {/* Features Block - Second Row: Course Benefits */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 my-3 px-2 py-3 bg-white/60 dark:bg-gray-700/60 rounded-2xl shadow border border-blue-100 dark:border-blue-900 backdrop-blur-md mx-auto max-w-5xl z-10">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30"><div className="w-2 h-2 bg-green-500 rounded-full"></div></span>
                  Live Projects
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30"><div className="w-2 h-2 bg-green-500 rounded-full"></div></span>
                  1-on-1 Mentorship
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30"><div className="w-2 h-2 bg-green-500 rounded-full"></div></span>
                  Expert Instructors
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm font-semibold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30"><div className="w-2 h-2 bg-green-500 rounded-full"></div></span>
                  Lifetime Access
                </div>
              </div>

              {/* Guarantee Banner - Clean style, no sticker */}
              <div className="w-full flex justify-center">
                <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 shadow-lg border-2 border-white/30 dark:border-blue-900/40 mt-4 mb-2">
                  <GraduationCap size={22} className="text-white drop-shadow" />
                  <span className="font-bold text-white text-base sm:text-lg">100% Guarantee of Internship</span>
                  <span className="text-blue-100 dark:text-blue-200 font-medium text-sm">with Ruhil Future Technologies</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.07, boxShadow: "0 4px 24px 0 rgba(80,80,180,0.18)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 border-2 border-blue-200 dark:border-blue-800"
                >
                  <span>Enroll Now</span>
                  <ArrowRight size={22} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.07, boxShadow: "0 4px 24px 0 rgba(80,80,180,0.18)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-3 rounded-xl text-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                >
                  <span>View Curriculum</span>
                  <ArrowRight size={22} />
                </motion.button>
              </div>
            </motion.div>

            {/* Our Other Courses Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                OUR OTHER COURSES
              </h2>
            </motion.div>
          </motion.div>
        </section>

        {/* Course Categories Grid */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={handleCourseClick}
                  index={index}
                />
              ))}
            </div>

            {courses.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No courses available at the moment.
                </p>
                <button 
                  onClick={handleRetry}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh Courses
                </button>
              </div>
            )}
          </motion.div>
        </section>

      </div>
    );
  } catch (err) {
    console.error('AllCourses: Error in render:', err);
    setComponentError(err instanceof Error ? err.message : 'Render error');
    return null;
  }
};

export default AllCourses; 