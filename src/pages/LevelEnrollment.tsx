import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Loader2,
  Clock,
  Star,
  CheckCircle,
  Code,
  Code2
} from 'lucide-react';
import { useCourseContext } from '../contexts/CourseContext';
import { courseService } from '../services/courseService';
import EnrollmentModal from '../components/ui/EnrollmentModal';
import SuccessPopup from '../components/ui/SuccessPopup';
import { ModuleLevel, ModuleTopic } from '../services/courseService';
import { useAuth } from '../components/AuthContext';

const LevelEnrollment = () => {
  const { courseId, moduleId, levelId } = useParams<{ courseId: string; moduleId: string; levelId: string }>();
  const navigate = useNavigate();
  const { getCourseDetails, getModuleLevels } = useCourseContext();
  const { isLoggedIn, user } = useAuth();
  
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [levelDetails, setLevelDetails] = useState<ModuleLevel | null>(null);
  const [topics, setTopics] = useState<ModuleTopic[]>([]);
  const [topicSubpoints, setTopicSubpoints] = useState<{ [key: number]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState<any>(null);

  console.log('LevelEnrollment: Component rendered with:', {
    courseId,
    moduleId,
    levelId,
    isLoggedIn,
    user: user ? { id: user.id, name: user.name, email: user.email } : null
  });

  useEffect(() => {
    const fetchLevelData = async () => {
      if (!courseId || !moduleId || !levelId) {
        setError('Missing required parameters');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        console.log('LevelEnrollment: Fetching level data...');
        
        const courseData = await getCourseDetails(parseInt(courseId));
        const levelsData = await getModuleLevels(parseInt(courseId), parseInt(moduleId));
        
        console.log('LevelEnrollment: Fetched data:', {
          courseData: courseData ? { id: courseData.id, name: courseData.name } : null,
          levelsData: levelsData ? levelsData.length : 0
        });
        
        if (courseData) {
          setCourseDetails(courseData);
          const module = courseData.modules.find((m: any) => m.id === parseInt(moduleId));
          if (module) {
            setModuleDetails(module);
          }
        }
        
        if (levelsData) {
          const level = levelsData.find((l: ModuleLevel) => l.id === parseInt(levelId));
          if (level) {
            setLevelDetails(level);
          }
        }

        // Fetch topics for this level
        try {
          console.log('LevelEnrollment: Fetching topics...');
          const topicsData = await courseService.getLevelTopics(parseInt(courseId), parseInt(moduleId), parseInt(levelId));
          console.log('LevelEnrollment: Fetched topics:', topicsData);
          setTopics(topicsData);
          
          // Fetch subpoints for each topic
          const subpointsMap: { [key: number]: string[] } = {};
          for (const topic of topicsData) {
            try {
              const subpoints = await courseService.getTopicSubpoints(parseInt(courseId), parseInt(moduleId), parseInt(levelId), topic.id);
              subpointsMap[topic.id] = subpoints.map((subpoint: any) => subpoint.subpoint);
            } catch (err) {
              console.error(`Error fetching subpoints for topic ${topic.id}:`, err);
              subpointsMap[topic.id] = [];
            }
          }
          setTopicSubpoints(subpointsMap);
        } catch (err) {
          console.error('LevelEnrollment: Error fetching topics:', err);
          // Don't fail the whole component if topics fail
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load level details';
        console.error('LevelEnrollment: Error fetching level details:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [courseId, moduleId, levelId]);

  const handleBackClick = () => {
    navigate(`/course/${courseId}/module/${moduleId}`);
  };

  const handleEnrollClick = () => {
    console.log('LevelEnrollment: Enroll button clicked');
    
    if (!isLoggedIn) {
      alert('Please log in to enroll in courses.');
      return;
    }
    
    setShowEnrollmentModal(true);
  };

  const handleEnrollmentSuccess = (data: any) => {
    console.log('LevelEnrollment: Enrollment success:', data);
    setEnrollmentData(data);
    setShowSuccessPopup(true);
    console.log('LevelEnrollment: Success popup should now be visible');
  };

  if (loading) {
    console.log('LevelEnrollment: Showing loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading level details...</p>
        </div>
      </div>
    );
  }

  if (error || !levelDetails) {
    console.log('LevelEnrollment: Showing error state:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Level not found'}
          </p>
          <button 
            onClick={handleBackClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Module
          </button>
        </div>
      </div>
    );
  }

  console.log('LevelEnrollment: Rendering level details:', {
    levelDetails,
    topicsCount: topics.length,
    courseDetails: courseDetails ? { id: courseDetails.id, name: courseDetails.name } : null
  });

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
            className="mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 ml-4 mt-4"
            whileHover={{ x: -5, scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="transition-transform duration-150 group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Module</span>
          </motion.button>

          {/* Level Header */}
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
              <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl">
                <Code2 className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {levelDetails.level_name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              {courseDetails?.name} - {moduleDetails?.name}
            </motion.p>
          </motion.div>

          {/* Level Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Level Overview
                  </h2>

                  
                  <div className="space-y-4 mb-6">
                    <motion.div 
                      className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{levelDetails.duration}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Star className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{levelDetails.level_range}</span>
                    </motion.div>
                  </div>

                  <motion.button
                    onClick={handleEnrollClick}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-500 dark:via-purple-500 dark:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-blue-700 transition-all duration-300 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isLoggedIn ? 'Enroll Now' : 'Login to Enroll'}</span>
                    <Code2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative"
            >
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative text-center">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Code2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Level Details</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Duration</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">{levelDetails.duration}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Level</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{levelDetails.level_range}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Topics</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">{topics.length} Topics</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {topics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              >
                Learning Objectives
              </motion.h2>
              <div className="space-y-6">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                            {topic.topic_title}
                          </h3>
                          {topic.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {topic.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {topicSubpoints[topic.id] && topicSubpoints[topic.id].length > 0 && (
                        <div className="ml-12 space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Learning Objectives:
                          </h4>
                          <div className="space-y-2">
                            {topicSubpoints[topic.id].map((subpoint, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                                whileHover={{ x: 2 }}
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{subpoint}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {showEnrollmentModal && courseId && moduleId && levelId && (
        <EnrollmentModal
          isOpen={showEnrollmentModal}
          onClose={() => setShowEnrollmentModal(false)}
          onEnrollmentSuccess={handleEnrollmentSuccess}
          courseName={courseDetails?.name || 'Course'}
          levelName={levelDetails?.level_name}
          courseId={parseInt(courseId)}
          moduleId={parseInt(moduleId)}
          levelId={parseInt(levelId)}
        />
      )}

      {/* Success Popup */}
      {showSuccessPopup && enrollmentData && (
        <SuccessPopup
          isOpen={showSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          courseName={enrollmentData.courseName}
          moduleName={enrollmentData.levelName || 'Module'}
          levelName={enrollmentData.levelName || 'Level'}
          userName={enrollmentData.userName}
        />
      )}
    </div>
  );
};

export default LevelEnrollment; 