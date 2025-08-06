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
  Code2,
  Sun,
  Moon
} from 'lucide-react';
import { useCourseContext } from '../contexts/CourseContext';
import { courseService } from '../services/courseService';
import SuccessPopup from '../components/ui/SuccessPopup';
import { ModuleLevel, ModuleTopic } from '../services/courseService';
import { useAuth } from '../components/AuthContext';

const LevelEnrollment = () => {
  const { courseId, moduleId, levelId } = useParams<{ courseId: string; moduleId: string; levelId: string }>();
  const navigate = useNavigate();
  const { getCourseDetails, getModuleLevels } = useCourseContext();
  const { isLoggedIn, user, setRedirectPath } = useAuth();
  
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [levelDetails, setLevelDetails] = useState<ModuleLevel | null>(null);
  const [topics, setTopics] = useState<ModuleTopic[]>([]);
  const [topicSubpoints, setTopicSubpoints] = useState<{ [key: number]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    navigate('/courses');
  };

  const handleEnrollClick = () => {
    console.log('LevelEnrollment: Enroll button clicked');
    
    if (!isLoggedIn) {
      // Store the current path before redirecting to login
      setRedirectPath(`/course/${courseId}/module/${moduleId}/level/${levelId}/enroll`);
      navigate('/signin');
      return;
    }
    
    navigate(`/course/${courseId}/module/${moduleId}/level/${levelId}/enroll`);
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
       <section className="relative overflow-hidden mt-0 sm:mt-6 lg:mt-8">
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
             <span className="font-semibold">Back</span>
          </motion.button>

          {/* Level Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <div className="flex flex-col items-center gap-6 mb-4">
              <div className="text-center">
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
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={handleEnrollClick}
                  className="group relative bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{isLoggedIn ? 'Apply' : 'Login to Apply'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
                
                                 <motion.button
                   onClick={() => {
                     // View curriculum functionality - Download PDF based on route
                     const link = document.createElement('a');
                     
                                           // PDF mapping for different routes
                      const pdfMapping: { [key: string]: { url: string; filename: string } } = {
                        '1-1-1': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Foundations%20of%20Data%20Science.pdf',
                          filename: 'Foundations of Data Science.pdf'
                        },
                        '1-1-2': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Foundations%20of%20Data%20Science-second%20level.pdf',
                          filename: 'Foundations of Data Science-second level.pdf'
                        },
                        '1-1-3': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Foundations%20of%20Data%20Science%20level%203.pdf',
                          filename: 'Foundations of Data Science level 3.pdf'
                        },
                        '1-2-4': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/AI%20%26%20MACHINE%20LEARNING%20LEVEL%201.pdf',
                          filename: 'AI & MACHINE LEARNING LEVEL 1.pdf'
                        },
                        '1-2-5': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/AI%20%26%20MACHINE%20LEARNING%20LEVEL%202.pdf',
                          filename: 'AI & MACHINE LEARNING LEVEL 2.pdf'
                        },
                        '1-2-6': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/AI%20%26%20MACHINE%20LEARNING%20LEVEL%203.pdf',
                          filename: 'AI & MACHINE LEARNING LEVEL 3.pdf'
                        },
                        '3-5-13': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/DIGITAL%20MARKETING%20LEVEL%201.pdf',
                          filename: 'DIGITAL MARKETING LEVEL 1.pdf'
                        },
                        '3-5-14': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/DIGITAL%20MARKETING%20LEVEL%202.pdf',
                          filename: 'DIGITAL MARKETING LEVEL 2.pdf'
                        },
                        '3-5-15': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/DIGITAL%20MARKETING%20LEVEL%203.pdf',
                          filename: 'DIGITAL MARKETING LEVEL 3.pdf'
                        },
                        '3-6-16': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/SALES%20AND%20MARKETING%20LEVEL%201.pdf',
                          filename: 'SALES AND MARKETING LEVEL 1.pdf'
                        },
                        '3-6-17': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/SALES%20AND%20MARKETING%20LEVEL%202.pdf',
                          filename: 'SALES AND MARKETING LEVEL 2.pdf'
                        },
                        '3-6-18': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/SALES%20AND%20MARKETING%20LEVEL%203.pdf',
                          filename: 'SALES AND MARKETING LEVEL 3.pdf'
                        },
                        '4-7-19': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/WEB%20%26%20UIUX%20DESIGN%20LEVEL%201.pdf',
                          filename: 'WEB & UIUX DESIGN LEVEL 1.pdf'
                        },
                        '4-7-20': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/WEB%20%26%20UIUX%20DESIGN%20LEVEL%202.pdf',
                          filename: 'WEB & UIUX DESIGN LEVEL 2.pdf'
                        },
                        '4-7-21': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/WEB%20%26%20UIUX%20DESIGN%20LEVEL%203.pdf',
                          filename: 'WEB & UIUX DESIGN LEVEL 3.pdf'
                        },
                        '4-8-22': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Graphic%20and%20Video%20Content%20Design%20LEVEL%201.pdf',
                          filename: 'Graphic and Video Content Design LEVEL 1.pdf'
                        },
                        '4-8-23': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Graphic%20and%20Video%20Content%20Design%20LEVEL%202.pdf',
                          filename: 'Graphic and Video Content Design LEVEL 2.pdf'
                        },
                        '4-8-24': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Graphic%20and%20Video%20Content%20Design%20LEVEL%203.pdf',
                          filename: 'Graphic and Video Content Design LEVEL 3.pdf'
                        },
                        '4-9-25': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Mechanical%20and%20CAD%20Design%20LEVEL%201.pdf',
                          filename: 'Mechanical and CAD Design LEVEL 1.pdf'
                        },
                        '4-9-26': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Mechanical%20and%20CAD%20Design%20LEVEL%202.pdf',
                          filename: 'Mechanical and CAD Design LEVEL 2.pdf'
                        },
                        '4-9-27': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Mechanical%20and%20CAD%20Design%20LEVEL%203.pdf',
                          filename: 'Mechanical and CAD Design LEVEL 3.pdf'
                        },
                        '5-10-28': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Product%20Management%20Level1.pdf',
                          filename: 'Product Management Level1.pdf'
                        },
                        '5-10-29': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Product%20Management%20Level2.pdf',
                          filename: 'Product Management Level2.pdf'
                        },
                        '5-10-30': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Product%20Management%20Level3.pdf',
                          filename: 'Product Management Level3.pdf'
                        },
                        '6-11-31': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/AI%20COURSE.pdf',
                          filename: 'AI COURSE.pdf'
                        },
                        '7-12-34': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Mobile%20App%20-%20react%20native.pdf',
                          filename: 'Mobile App - react native.pdf'
                        },
                        '7-12-35': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Web%20Dev%20Flutter.pdf',
                          filename: 'Web Dev Flutter.pdf'
                        },
                        '7-12-36': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Ios%20App%20dev%20Swift.pdf',
                          filename: 'Ios App dev Swift.pdf'
                        },
                        '7-12-37': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Android%20app%20dev%20JAVA.pdf',
                          filename: 'Android app dev JAVA.pdf'
                        },
                        '7-13-38': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Backend%20Development%20Dart%20with%20Aqueduct%20or%20Shelf.pdf',
                          filename: 'Backend Development Dart with Aqueduct or Shelf.pdf'
                        },
                        '7-13-39': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Python%20Powered%20Mobile%20Backend%20Dev.pdf',
                          filename: 'Python Powered Mobile Backend Dev.pdf'
                        },
                        '7-13-40': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Mobile%20Backend%20Development%20with%20Java%20%26%20Kotlin.pdf',
                          filename: 'Mobile Backend Development with Java & Kotlin.pdf'
                        },
                        '2-3-7': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Web%20Dev%20Esss.pdf',
                          filename: 'Web Dev Esss.pdf'
                        },
                        '2-3-8': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Advance%20Angular.pdf',
                          filename: 'Advance Angular.pdf'
                        },
                        '2-3-9': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Java%20Development.pdf',
                          filename: 'Java Development.pdf'
                        },
                        '2-3-32': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Advance%20React.js.pdf',
                          filename: 'Advance React.js.pdf'
                        },
                        '2-4-10': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Backend%20Development%20%20Node.js%20with%20Express.js.pdf',
                          filename: 'Backend Development  Node.js with Express.js.pdf'
                        },
                        '2-4-11': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Backend%20Development%20Java%20with%20Spring%20Boot.pdf',
                          filename: 'Backend Development Java with Spring Boot.pdf'
                        },
                        '2-4-12': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Backend%20Dev%20PythonDjangoFastAPI.pdf',
                          filename: 'Backend Dev PythonDjangoFastAPI.pdf'
                        },
                        '2-4-33': {
                          url: 'https://rftsystemsbackend-testing.up.railway.app/uploads/Backend%20Dev%20GoGinorFiber.pdf',
                          filename: 'Backend Dev GoGinorFiber.pdf'
                        }
                        // Add more mappings here as you provide them
                        // Format: 'courseId-moduleId-levelId': { url: 'PDF_URL', filename: 'PDF_FILENAME' }
                      };
                     
                     const routeKey = `${courseId}-${moduleId}-${levelId}`;
                     const pdfConfig = pdfMapping[routeKey];
                     
                     if (pdfConfig) {
                       link.href = pdfConfig.url;
                       link.download = pdfConfig.filename;
                     } else {
                       // Default fallback
                       link.href = 'https://rftsystemsbackend-testing.up.railway.app/uploads/Foundations%20of%20Data%20Science.pdf';
                       link.download = 'Foundations of Data Science.pdf';
                     }
                     
                     link.target = '_blank';
                     document.body.appendChild(link);
                     link.click();
                     document.body.removeChild(link);
                   }}
                   className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105"
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.98 }}
                 >
                   <span className="relative z-10">View Curriculum</span>
                   <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Professional Course Sales Page - Modern Design */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-7xl mx-auto"
          >
            {/* Unified Card - All Sections Combined */}
            <div className="w-full">
              <div className="max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-white/98 to-gray-50/98 dark:from-gray-800/98 dark:to-gray-700/98 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-600/40 overflow-hidden">
                  
                  {/* Course Details Section */}
                  <div className="p-8 border-b border-gradient-to-r from-blue-200/40 to-purple-200/40 dark:from-blue-600/20 dark:to-purple-600/20">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-8 md:mb-10 text-center">
                      Course Details
                    </h3>
                    
                    <div className="max-w-5xl mx-auto">
                      <div className="space-y-2">
                        {courseId === '6' && moduleId === '11' && levelId === '31' ? (
                          <>
                                                         <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Duration :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">9 Months (Phase 1 + Phase 2 + Phase 3)</span>
                             </div>
                             
                             <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Schedule :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">5 Days a Week (Full-Time Commitment)</span>
                             </div>
                             
                             <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Structure :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">3 Trainings + 3 Live Projects + 3 Internships</span>
                             </div>
                             
                             <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Approach :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">Real-work, Industry Mentorship, and Team-based delivery</span>
                             </div>
                          </>
                        ) : (
                          <>
                                                         <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Course Name :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">{courseDetails?.name}</span>
                             </div>
                             
                             <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Duration :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">{levelDetails.duration}</span>
                             </div>
                             
                             <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Skill Level :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">{levelDetails.level_range}</span>
                             </div>
                             
                             <div className="flex items-start gap-0 sm:gap-1 p-1 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-md">
                               <span className="text-sm sm:text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300 min-w-[120px] sm:min-w-[140px]">Modules :</span>
                               <span className="text-sm sm:text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-semibold">{topics.length}</span>
                             </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives Section */}
                  {topics.length > 0 && (
                    <div className="p-8 border-b border-gray-200/60 dark:border-gray-600/40">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        What You'll Learn
                      </h3>
                      
                      <div className="space-y-6">
                        {topics.map((topic, index) => (
                          <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                            className={`${index !== topics.length - 1 ? 'pb-6 border-b border-gray-200/60 dark:border-gray-600/40' : ''}`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                  {index + 1}
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-sm">
                                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                  </svg>
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight">
                                  {topic.topic_title}
                                </h4>
                                
                                {topic.description && (
                                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-base leading-relaxed">
                                    {topic.description}
                                  </p>
                                )}
                                
                                {topicSubpoints[topic.id] && topicSubpoints[topic.id].length > 0 && (
                                  <div className="mt-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                      {topicSubpoints[topic.id].map((subpoint, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2 text-gray-700 dark:text-gray-300 p-3 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg border border-gray-200/40 dark:border-gray-600/30 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50/90 dark:hover:bg-gray-600/40"
                                        >
                                          <div className="w-2 h-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                                          <span className="leading-relaxed text-sm font-medium">{subpoint}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Action Button */}
                  <div className="p-8 text-center">
                    <motion.button
                      onClick={handleEnrollClick}
                      className="group relative bg-gradient-to-r from-blue-800 to-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{isLoggedIn ? 'Apply Now' : 'Login to Apply'}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.button>
                  </div>


                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>



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