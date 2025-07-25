import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  Star, 
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';

const ProductManagementCourses = () => {
  const navigate = useNavigate();

  const productManagementCourses = [
    {
      name: "Product Management Level 1",
      icon: Target,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Master product strategy, user research, and product development from concept to launch",
      duration: "16 weeks",
      level: "Beginner to Advanced",
      path: "/product-management-level-1",
      topics: ["Product Strategy", "User Research", "Product Development", "Go-to-Market", "Data Analytics"]
    },
    {
      name: "Product Management Level 2",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Advanced product management with strategic planning and team leadership",
      duration: "18 weeks",
      level: "Intermediate to Advanced",
      path: "/product-management-level-2",
      topics: ["Strategic Planning", "Team Leadership", "Product Operations", "Stakeholder Management", "Advanced Analytics"]
    },
    {
      name: "Product Management Level 3",
      icon: Target,
      color: "from-pink-500 to-red-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      description: "Expert-level product leadership and organizational impact",
      duration: "20 weeks",
      level: "Advanced to Expert",
      path: "/product-management-level-3",
      topics: ["Product Leadership", "Organizational Strategy", "Innovation Management", "Executive Communication", "Industry Trends"]
    }
  ];

  const handleCourseClick = (course: any) => {
    if (course.path) {
      navigate(course.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 lg:mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 to-indigo-400/20 dark:from-indigo-600/10 dark:to-indigo-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Product Management
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master product strategy, user research, and product development. Lead successful product initiatives from concept to market launch.
            </p>
          </motion.div>

          {/* Course Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {productManagementCourses.map((course, index) => (
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
                        <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs rounded-full">
                          +{course.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 dark:hover:from-indigo-600 dark:hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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

export default ProductManagementCourses; 