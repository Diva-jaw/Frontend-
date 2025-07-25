<<<<<<< HEAD
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
  ArrowRight
} from 'lucide-react';

const AllCourses = () => {
  const navigate = useNavigate();

  const courseCategories = [
    {
      name: "DataScience + AI",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Master data science and artificial intelligence with comprehensive modules",
      modules: 2,
      path: "/data-science-levels"
    },
    {
      name: "FullStack",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Complete web and mobile development from frontend to backend",
      modules: 3,
      path: "/courses"
    },
    {
      name: "Marketing",
      icon: BarChart3,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Digital marketing and sales strategies for business growth",
      modules: 2,
      path: "/courses"
    },
    {
      name: "Design",
      icon: PenTool,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      description: "UI/UX design, graphic design, and CAD engineering",
      modules: 3,
      path: "/courses"
    },
    {
      name: "Product Management",
      icon: Briefcase,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Product strategy, leadership, and organizational impact",
      modules: 1,
      path: "/courses"
    }
  ];

  const handleCourseClick = (category: any) => {
    if (category.name === "DataScience + AI") {
      navigate("/data-science-levels");
    } else if (category.name === "FullStack") {
      navigate("/fullstack-courses");
    } else if (category.name === "Marketing") {
      navigate("/marketing-courses");
    } else if (category.name === "Design") {
      navigate("/design-courses");
    } else if (category.name === "Product Management") {
      navigate("/product-management-courses");
    } else {
      // For other categories, open the courses dropdown
      navigate("/courses");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 lg:mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-blue-400/20 dark:from-blue-600/10 dark:to-blue-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              All Course Categories
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive curriculum across all domains and find your perfect learning path
            </p>
          </motion.div>

          {/* Course Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courseCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                      <category.icon size={24} className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{category.modules} modules</span>
                      <ArrowRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>12-16 weeks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        <span>Beginner to Expert</span>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleCourseClick(category)}
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Courses
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Star, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useCourseContext } from '../contexts/CourseContext';
import CourseCard from '../components/ui/CourseCard';
import { Course } from '../services/courseService';

const AllCourses = () => {
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

        {/* Hero Section */}
        <section className="relative overflow-hidden mt-4 sm:mt-6 lg:mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-purple-300/10 dark:from-blue-600/5 dark:to-purple-600/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight"
              >
                All Course Categories
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Explore our comprehensive curriculum across all domains and find your perfect learning path
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 flex justify-center"
              >
                <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {courses.length} Courses Available
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Course Categories Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={handleCourseClick}
                  index={index}
                />
              ))}
            </motion.div>

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
          </div>
        </section>

      </div>
    );
  } catch (err) {
    console.error('AllCourses: Error in render:', err);
    setComponentError(err instanceof Error ? err.message : 'Render error');
    return null;
  }
>>>>>>> 4403830d5035acfbb6af130369d0c19dba150213
};

export default AllCourses; 