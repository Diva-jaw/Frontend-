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
};

export default AllCourses; 