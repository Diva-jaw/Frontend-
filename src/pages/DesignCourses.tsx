import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Clock, 
  Star, 
  ArrowRight,
  Palette,
  Monitor,
  Box,
  Video
} from 'lucide-react';

const DesignCourses = () => {
  const navigate = useNavigate();

  const designCourses = [
    {
      name: "Web UI Design Level 1",
      icon: Monitor,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Master user interface design principles, wireframing, and prototyping for web applications",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      path: "/web-ui-design-level-1",
      topics: ["UI/UX Principles", "Wireframing", "Prototyping", "Design Systems", "User Research"]
    },
    {
      name: "Web UI Design Level 2",
      icon: Monitor,
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      description: "Advanced UI/UX design with advanced prototyping and user testing",
      duration: "12 weeks",
      level: "Intermediate to Advanced",
      path: "/web-ui-design-level-2",
      topics: ["Advanced Prototyping", "User Testing", "Design Systems", "Accessibility", "Design Leadership"]
    },
    {
      name: "Web UI Design Level 3",
      icon: Monitor,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Expert-level UI/UX design and design strategy",
      duration: "14 weeks",
      level: "Advanced to Expert",
      path: "/web-ui-design-level-3",
      topics: ["Design Strategy", "Team Leadership", "Design Operations", "Innovation", "Industry Trends"]
    },
    {
      name: "Graphic & Video Design Level 1",
      icon: Video,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      description: "Create stunning graphics and video content using Adobe Creative Suite and modern design tools",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      path: "/graphic-video-design-level-1",
      topics: ["Adobe Creative Suite", "Digital Illustration", "Video Editing", "Motion Graphics", "Brand Design"]
    },
    {
      name: "Graphic & Video Design Level 2",
      icon: Video,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      description: "Advanced graphic design and video production techniques",
      duration: "14 weeks",
      level: "Intermediate to Advanced",
      path: "/graphic-video-design-level-2",
      topics: ["Advanced Photoshop", "After Effects", "3D Design", "Animation", "Visual Effects"]
    },
    {
      name: "Graphic & Video Design Level 3",
      icon: Video,
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      description: "Expert-level creative direction and production management",
      duration: "16 weeks",
      level: "Advanced to Expert",
      path: "/graphic-video-design-level-3",
      topics: ["Creative Direction", "Production Management", "Team Leadership", "Industry Standards", "Innovation"]
    },
    {
      name: "Mechanical CAD Level 1",
      icon: Box,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Master Computer-Aided Design for mechanical engineering and product development",
      duration: "14 weeks",
      level: "Beginner to Advanced",
      path: "/mechanical-cad-level-1",
      topics: ["AutoCAD", "SolidWorks", "3D Modeling", "Engineering Drawing", "Product Design"]
    },
    {
      name: "Mechanical CAD Level 2",
      icon: Box,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      description: "Advanced CAD techniques and engineering simulation",
      duration: "16 weeks",
      level: "Intermediate to Advanced",
      path: "/mechanical-cad-level-2",
      topics: ["Advanced Modeling", "Simulation", "Manufacturing Prep", "Assembly Design", "Engineering Analysis"]
    },
    {
      name: "Mechanical CAD Level 3",
      icon: Box,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Expert-level CAD engineering and project management",
      duration: "18 weeks",
      level: "Advanced to Expert",
      path: "/mechanical-cad-level-3",
      topics: ["Project Management", "Team Leadership", "Industry Standards", "Innovation", "Technical Leadership"]
    }
  ];

  const handleCourseClick = (course: any) => {
    if (course.path) {
      navigate(course.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 lg:mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-orange-400/20 dark:from-orange-600/10 dark:to-orange-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Design & Creative
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master UI/UX design, graphic design, video production, and CAD engineering. Create stunning visual experiences and functional designs.
            </p>
          </motion.div>

          {/* Course Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designCourses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer"
                onClick={() => handleCourseClick(course)}
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${course.color} text-white shadow-lg`}>
                      <course.icon size={24} className="w-6 h-6" />
                    </div>
                    <ArrowRight size={20} className="text-gray-400" />
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {course.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Topics Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.slice(0, 3).map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                      {course.topics.length > 3 && (
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                          +{course.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 dark:hover:from-orange-600 dark:hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Course
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
};

export default DesignCourses; 