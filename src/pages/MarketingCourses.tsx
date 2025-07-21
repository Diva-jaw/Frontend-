import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Clock, 
  Star, 
  ArrowRight,
  TrendingUp,
  Target,
  Megaphone,
  Users
} from 'lucide-react';

const MarketingCourses = () => {
  const navigate = useNavigate();

  const marketingCourses = [
    {
      name: "Digital Marketing Level 1",
      icon: Megaphone,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Master digital marketing fundamentals including SEO, SEM, and social media marketing",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      path: "/digital-marketing-level-1",
      topics: ["SEO & SEM", "Social Media Marketing", "Content Marketing", "Email Marketing", "Analytics"]
    },
    {
      name: "Digital Marketing Level 2",
      icon: Megaphone,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      description: "Advanced digital marketing strategies and campaign management",
      duration: "14 weeks",
      level: "Intermediate to Advanced",
      path: "/digital-marketing-level-2",
      topics: ["Advanced SEO", "PPC Campaigns", "Marketing Automation", "Conversion Optimization", "Analytics"]
    },
    {
      name: "Digital Marketing Level 3",
      icon: Megaphone,
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      description: "Expert-level digital marketing and strategic planning",
      duration: "16 weeks",
      level: "Advanced to Expert",
      path: "/digital-marketing-level-3",
      topics: ["Marketing Strategy", "Brand Management", "ROI Optimization", "Team Leadership", "Industry Trends"]
    },
    {
      name: "Sales & Marketing Level 1",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Develop fundamental sales strategies and customer relationship management",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      path: "/sales-marketing-level-1",
      topics: ["Sales Strategy", "CRM Systems", "Market Research", "Lead Generation", "Negotiation"]
    },
    {
      name: "Sales & Marketing Level 2",
      icon: Target,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      description: "Advanced sales techniques and market analysis",
      duration: "12 weeks",
      level: "Intermediate to Advanced",
      path: "/sales-marketing-level-2",
      topics: ["Advanced Sales", "Market Analysis", "Customer Psychology", "Sales Management", "Performance Metrics"]
    },
    {
      name: "Sales & Marketing Level 3",
      icon: Target,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      description: "Expert sales leadership and strategic business development",
      duration: "14 weeks",
      level: "Advanced to Expert",
      path: "/sales-marketing-level-3",
      topics: ["Sales Leadership", "Strategic Planning", "Business Development", "Team Management", "Revenue Growth"]
    }
  ];

  const handleCourseClick = (course: any) => {
    if (course.path) {
      navigate(course.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 lg:mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-green-400/20 dark:from-green-600/10 dark:to-green-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Marketing & Sales
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master digital marketing, sales strategies, and customer relationship management. Drive business growth with data-driven marketing approaches.
            </p>
          </motion.div>

          {/* Course Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingCourses.map((course, index) => (
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
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                          +{course.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 dark:from-green-500 dark:to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 dark:hover:from-green-600 dark:hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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

export default MarketingCourses; 