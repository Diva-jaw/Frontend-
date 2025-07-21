import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Clock, 
  Star, 
  ArrowRight,
  Database,
  Smartphone,
  Globe,
  Palette
} from 'lucide-react';

const FullStackCourses = () => {
  const navigate = useNavigate();

  const fullStackCourses = [
    {
      name: "Web Development Essentials",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Master the fundamentals of web development with HTML, CSS, and JavaScript",
      duration: "8 weeks",
      level: "Beginner to Intermediate",
      path: "/web-development-essentials",
      topics: ["HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "Web APIs", "DOM Manipulation"]
    },
    {
      name: "React.js Development",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Build modern user interfaces with React.js and advanced state management",
      duration: "12 weeks",
      level: "Intermediate to Advanced",
      path: "/reactjs-details",
      topics: ["React.js", "Hooks", "State Management", "Component Architecture", "Redux"]
    },
    {
      name: "Angular Development",
      icon: Palette,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      description: "Master Angular framework for building scalable web applications",
      duration: "12 weeks",
      level: "Intermediate to Advanced",
      path: "/angular-details",
      topics: ["Angular", "TypeScript", "RxJS", "Dependency Injection", "Angular CLI"]
    },
    {
      name: "Node.js & Express",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Develop robust server-side applications with Node.js and Express framework",
      duration: "14 weeks",
      level: "Intermediate to Advanced",
      path: "/node-express-details",
      topics: ["Node.js", "Express.js", "REST APIs", "Database Design", "Authentication"]
    },
    {
      name: "Python Django",
      icon: Database,
      color: "from-blue-500 to-green-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Build web applications with Python Django framework",
      duration: "14 weeks",
      level: "Intermediate to Advanced",
      path: "/python-django-details",
      topics: ["Python", "Django", "ORM", "Admin Panel", "Deployment"]
    },
    {
      name: "Flutter Development",
      icon: Smartphone,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      description: "Create cross-platform mobile applications with Flutter",
      duration: "16 weeks",
      level: "Intermediate to Advanced",
      path: "/flutter-details",
      topics: ["Flutter", "Dart", "Mobile UI/UX", "State Management", "App Store Deployment"]
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
                <Code className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                FullStack Development
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master complete web and mobile development from frontend to backend. Build full-stack applications with modern technologies.
            </p>
          </motion.div>

          {/* Course Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullStackCourses.map((course, index) => (
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

export default FullStackCourses; 