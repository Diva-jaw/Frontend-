import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Loader2,
  Clock,
  Star,
  Users,
  BookOpen
} from 'lucide-react';
import { useCourseContext } from '../contexts/CourseContext';
import ModuleCard from '../components/ui/ModuleCard';
import { CourseModule, CourseDetails as CourseDetailsType } from '../services/courseService';

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourseDetails, getCourseModules } = useCourseContext();
  
  const [courseDetails, setCourseDetails] = useState<CourseDetailsType | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const courseData = await getCourseDetails(parseInt(courseId));
        const modulesData = await getCourseModules(parseInt(courseId));
        
        if (courseData) {
          setCourseDetails(courseData);
        }
        
        if (modulesData) {
          setModules(modulesData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course details');
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleModuleClick = (module: CourseModule) => {
    navigate(`/course/${courseId}/module/${module.id}`);
  };

  const handleBackClick = () => {
    navigate('/all-courses-mega');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !courseDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Course not found'}
          </p>
          <button 
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

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
          {/* Back Button */}
          <motion.button
            onClick={handleBackClick}
            className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-all duration-150 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 ml-4 mt-4"
            whileHover={{ x: -5, scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="transition-transform duration-150 group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Courses</span>
          </motion.button>

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
              className="inline-block mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {courseDetails.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6"
            >
              {courseDetails.description}
            </motion.p>
            
            {/* Course Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-6"
            >
              {courseDetails.level_range && (
                <motion.div 
                  className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star size={16} className="text-purple-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{courseDetails.level_range}</span>
                </motion.div>
              )}
              <motion.div 
                className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Users size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{modules.length} modules</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Modules Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={handleModuleClick}
                index={index}
              />
            ))}
          </motion.div>

          {modules.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No modules available for this course.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetails; 