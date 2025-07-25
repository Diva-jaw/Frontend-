import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  Star, 
  ArrowRight,
  Database,
  BarChart3,
  TrendingUp,
  Zap
} from 'lucide-react';

const DataScienceCourses = () => {
  const navigate = useNavigate();

  const dataScienceCourses = [
    {
      name: "Data Science Level 1",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Master the fundamentals of data science with Python, statistics, and data analysis",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      path: "/data-science/level-1",
      topics: ["Python Programming", "Statistics", "Data Analysis", "Pandas & NumPy", "Data Visualization"]
    },
    {
      name: "Data Science Level 2",
      icon: BarChart3,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      description: "Advanced data science techniques including machine learning and predictive modeling",
      duration: "14 weeks",
      level: "Intermediate to Advanced",
      path: "/data-science/level-2",
      topics: ["Machine Learning", "Predictive Modeling", "Feature Engineering", "Model Evaluation", "Big Data"]
    },
    {
      name: "Data Science Level 3",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Expert-level data science with deep learning and advanced analytics",
      duration: "16 weeks",
      level: "Advanced to Expert",
      path: "/data-science/level-3",
      topics: ["Deep Learning", "Neural Networks", "Advanced Analytics", "MLOps", "Production Deployment"]
    },
    {
      name: "AI/ML Level 1",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Introduction to artificial intelligence and machine learning fundamentals",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      path: "/ai-ml/level-1",
      topics: ["AI Fundamentals", "ML Algorithms", "Supervised Learning", "Unsupervised Learning", "Model Training"]
    },
    {
      name: "AI/ML Level 2",
      icon: Zap,
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      description: "Advanced AI/ML techniques including deep learning and neural networks",
      duration: "14 weeks",
      level: "Intermediate to Advanced",
      path: "/ai-ml/level-2",
      topics: ["Deep Learning", "Neural Networks", "Computer Vision", "NLP", "Reinforcement Learning"]
    },
    {
      name: "AI/ML Level 3",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Expert-level AI/ML with advanced applications and research",
      duration: "16 weeks",
      level: "Advanced to Expert",
      path: "/ai-ml/level-3",
      topics: ["Advanced AI", "Research Methods", "AI Ethics", "Production AI", "Cutting-edge Applications"]
    }
  ];

  const handleCourseClick = (course: any) => {
    if (course.path) {
      navigate(course.path);
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
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                DataScience + AI
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master data science and artificial intelligence with comprehensive modules covering everything from fundamentals to advanced applications.
            </p>
          </motion.div>

          {/* Course Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataScienceCourses.map((course, index) => (
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
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                          +{course.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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

export default DataScienceCourses; 