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
import LevelCard from '../components/ui/LevelCard';
import { courseService, CourseModule, ModuleLevel } from '../services/courseService';

const ModuleDetails = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { getCourseDetails, getModuleLevels } = useCourseContext();
  
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [moduleDetails, setModuleDetails] = useState<CourseModule | null>(null);
  const [levels, setLevels] = useState<ModuleLevel[]>([]);
  const [levelTopics, setLevelTopics] = useState<{ [key: number]: Array<{ title: string; description?: string }> }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!courseId || !moduleId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const courseData = await getCourseDetails(parseInt(courseId));
        const levelsData = await getModuleLevels(parseInt(courseId), parseInt(moduleId));
        
        if (courseData) {
          setCourseDetails(courseData);
          // Find the specific module
          const module = courseData.modules.find((m: CourseModule) => m.id === parseInt(moduleId));
          if (module) {
            setModuleDetails(module);
          }
        }
        
        if (levelsData) {
          setLevels(levelsData);
          
          // Fetch topics for each level
          const topicsMap: { [key: number]: Array<{ title: string; description?: string }> } = {};
          for (const level of levelsData) {
            try {
              const topics = await courseService.getLevelTopics(parseInt(courseId), parseInt(moduleId), level.id);
              topicsMap[level.id] = topics.map((topic: any) => ({
                title: topic.topic_title,
                description: topic.description
              }));
            } catch (err) {
              console.error(`Error fetching topics for level ${level.id}:`, err);
              topicsMap[level.id] = [];
            }
          }
          setLevelTopics(topicsMap);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load module details');
        console.error('Error fetching module details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [courseId, moduleId]);

  const handleLevelClick = (level: ModuleLevel) => {
    navigate(`/course/${courseId}/module/${moduleId}/level/${level.id}`);
  };

  const handleBackClick = () => {
    navigate('/all-courses-mega');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading module details...</p>
        </div>
      </div>
    );
  }

  if (error || !moduleDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Module not found'}
          </p>
          <button 
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Course
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
            <span className="font-semibold">Back to Course</span>
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
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {moduleDetails.name}
            </motion.h1>
            

            
            {/* Module Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-6"
            >
              <motion.div 
                className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Clock size={16} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{moduleDetails.duration}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Star size={16} className="text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{moduleDetails.has_levels ? 'Multiple Levels' : 'Single Level'}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <Users size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{levels.length} levels</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Levels Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {levels.map((level, index) => (
              <LevelCard
                key={level.id}
                level={level}
                onClick={handleLevelClick}
                index={index}
                topics={levelTopics[level.id] || []}
              />
            ))}
          </motion.div>

          {levels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No levels available for this module.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModuleDetails; 