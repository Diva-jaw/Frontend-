import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Code, Database, Users, Layers, BarChart3, PenTool, Briefcase, ChevronRight, Star, Clock, Trophy, Zap, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import DataScienceLevels from '../sections/DataScienceLevels';
import LevelsColumns from '../sections/DataScienceLevels';

const courseCategories = [
  { name: "DataScience + AI", icon: Database, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
  { name: "FullStack", icon: Code, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Marketing", icon: BarChart3, color: "from-green-500 to-emerald-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
  { name: "Design", icon: PenTool, color: "from-orange-500 to-red-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  { name: "Product Management", icon: Briefcase, color: "from-indigo-500 to-purple-500", bgColor: "bg-indigo-50 dark:bg-indigo-900/20" },
];

const coursesData = {
  "DataScience + AI": {
    modules: [
      {
        name: "Data Science",
        icon: Database,
        duration: "12 weeks",
        difficulty: "Beginner to Advanced",
        levels: [
          { title: "Level 1", desc: "Foundations of Python, Pandas & Data Visualization", duration: "4 weeks", projects: 3 },
          { title: "Level 2", desc: "Applied Data Science & Machine Learning & SQL with Scikit-Learn", duration: "4 weeks", projects: 4 },
          { title: "Level 3", desc: "Big Data & Data Engineering – Hadoop, Hive & PySpark", duration: "4 weeks", projects: 5 },
        ],
      },
      {
        name: "AI and Machine Learning",
        icon: Zap,
        duration: "16 weeks",
        difficulty: "Intermediate to Expert",
        levels: [
          { title: "Level 1", desc: "AI Launchpad: Unlocking Intelligence with Python & ML", duration: "5 weeks", projects: 4 },
          { title: "Level 2", desc: "AI Accelerator: Mastering Deep Learning and Deployment", duration: "6 weeks", projects: 5 },
          { title: "Level 3", desc: "AI Architect Academy: The LLM Forge – Building Custom Language Models from Scratch", duration: "5 weeks", projects: 6 },
        ],
      },
    ],
  },
  "FullStack": {
    modules: [
      {
        name: "Module 1 (Common)",
        icon: Code,
        duration: "8 weeks",
        difficulty: "Beginner",
        levels: [
          { title: "Web Development Essentials", desc: "HTML, CSS, JS, Deployment, Github, SCRUM & Agile training", duration: "8 weeks", projects: 6 },
        ],
      },
      {
        name: "Module 2 (Advanced)",
        icon: Layers,
        duration: "10 weeks",
        difficulty: "Intermediate",
        levels: [
          { title: "Web Development", desc: "React.js, Angular, Tailwind CSS & SCSS & BootStrap", duration: "5 weeks", projects: 4 },
          { title: "App Development", desc: "React Native, Flutter, Swift, Java for Android", duration: "5 weeks", projects: 4 },
        ],
      },
      {
        name: "Module 3 (Expert)",
        icon: Trophy,
        duration: "12 weeks",
        difficulty: "Advanced",
        levels: [
          { title: "Web Development", desc: "Node.js with Express.js, Java With Spring Boot, Python with Django or FastAPI, Go with GIN or Fiber framework", duration: "6 weeks", projects: 5 },
          { title: "App Development", desc: "Node.js with Express.js, Java with Spring Boot, Python with Django or FastAPI, Go with GIN or Fiber Framework", duration: "6 weeks", projects: 5 },
        ],
      },
    ],
  },
  "Marketing": {
    modules: [
      {
        name: "Digital Marketing",
        icon: BarChart3,
        duration: "10 weeks",
        difficulty: "Beginner to Advanced",
        levels: [
          { title: "Level 1", desc: "Story to Strategy: A Modern Marketing Playbook", duration: "3 weeks", projects: 2 },
          { title: "Level 2", desc: "Digital Strategy Mastery: Campaign Execution & Performance", duration: "4 weeks", projects: 3 },
          { title: "Level 3", desc: "Mastering Marketing Leadership: Strategy, Tools & Real-World Execution", duration: "3 weeks", projects: 3 },
        ],
      },
      {
        name: "Sales & Marketing",
        icon: Users,
        duration: "12 weeks",
        difficulty: "Intermediate to Expert",
        levels: [
          { title: "Level 1", desc: "Sales & Marketing Foundations – Launch Your Marketing Career", duration: "4 weeks", projects: 3 },
          { title: "Level 2", desc: "Marketing Execution With Data & CRM Tools", duration: "4 weeks", projects: 4 },
          { title: "Level 3", desc: "Strategic Leadership & Growth – Drive Business Impact", duration: "4 weeks", projects: 4 },
        ],
      },
    ],
  },
  "Design": {
    modules: [
      {
        name: "Web & UI/UX Design",
        icon: PenTool,
        duration: "14 weeks",
        difficulty: "Beginner to Advanced",
        levels: [
          { title: "Level 1", desc: "Foundations of UI Design with Figma and Canva", duration: "5 weeks", projects: 4 },
          { title: "Level 2", desc: "Responsive Web & App Design Using Figma and Adobe XD", duration: "5 weeks", projects: 5 },
          { title: "Level 3", desc: "Webflow & UX Research for Portfolio – Ready Web Experience", duration: "4 weeks", projects: 4 },
        ],
      },
      {
        name: "Graphic and Video Content Design",
        icon: BookOpen,
        duration: "12 weeks",
        difficulty: "Beginner to Intermediate",
        levels: [
          { title: "Level 1", desc: "Graphic and Video Content Design Foundations", duration: "4 weeks", projects: 3 },
          { title: "Level 2", desc: "Advanced Graphic Design & Video Production", duration: "4 weeks", projects: 4 },
          { title: "Level 3", desc: "Creative Direction & Advanced Production", duration: "4 weeks", projects: 4 },
        ],
      },
      {
        name: "Mechanical and CAD Design",
        icon: Layers,
        duration: "16 weeks",
        difficulty: "Intermediate to Expert",
        levels: [
          { title: "Level 1", desc: "2D Drafting and Intro to CAD using AutoCAD & TinkerCAD", duration: "5 weeks", projects: 3 },
          { title: "Level 2", desc: "3D Product Design with SolidWorks & Fusion 360", duration: "6 weeks", projects: 4 },
          { title: "Level 3", desc: "Simulation and Collaboration with CATIA, Onshape & ANSYS", duration: "5 weeks", projects: 5 },
        ],
      },
    ],
  },
  "Product Management": {
    modules: [
      {
        name: "Product Management",
        icon: Briefcase,
        duration: "14 weeks",
        difficulty: "Beginner to Advanced",
        levels: [
          { title: "Level 1", desc: "Foundations of Modern Product Management", duration: "5 weeks", projects: 4 },
          { title: "Level 2", desc: "Strategic Product Leadership and Vision", duration: "5 weeks", projects: 5 },
          { title: "Level 3", desc: "Product Transformation and Organizational Impact", duration: "4 weeks", projects: 4 },
        ],
      },
    ],
  },
};

// Add type guard function
function isValidCategory(key: string | null): key is keyof typeof coursesData {
  return key !== null && Object.prototype.hasOwnProperty.call(coursesData, key);
}

const CoursesDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [showWebDevModal, setShowWebDevModal] = useState(false);
  const [showAppDevModal, setShowAppDevModal] = useState(false);
  const [showWebDevExpertModal, setShowWebDevExpertModal] = useState(false);
  const [showAppDevExpertModal, setShowAppDevExpertModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSelectedCategory(null);
        setExpandedModule(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes("Beginner")) return "text-green-600 dark:text-green-400";
    if (difficulty.includes("Intermediate")) return "text-yellow-600 dark:text-yellow-400";
    if (difficulty.includes("Advanced") || difficulty.includes("Expert")) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div className="relative" ref={ref}>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(!open)}
        className={
          `text-gray-800 dark:text-gray-200 font-medium text-sm uppercase tracking-wide relative rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600`
        }
      >
        Courses
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseLeave={() => setOpen(false)}
            className="absolute left-1/2 -translate-x-1/2 mt-4 w-full max-w-4xl lg:max-w-6xl min-w-[320px] sm:min-w-[600px] md:min-w-[800px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex z-50 overflow-hidden backdrop-blur-sm"
          >
            {/* Enhanced Sidebar */}
            <div className="w-1/3 min-w-[280px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-6 overflow-y-auto max-h-[600px] lg:max-h-[700px]">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white mb-4 lg:mb-6 flex items-center gap-2">
                <BookOpen className="text-blue-500" size={20} />
                <span className="hidden sm:inline">Course Categories</span>
                <span className="sm:hidden">Categories</span>
              </h3>
              <div className="space-y-2 lg:space-y-3">
                {courseCategories.map((cat, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setExpandedModule(null);
                    }}
                    className={`group flex items-center w-full text-left gap-2 lg:gap-4 px-3 lg:px-5 py-3 lg:py-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedCategory === cat.name
                        ? `${cat.bgColor} border-transparent shadow-lg`
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className={`p-1.5 lg:p-2 rounded-lg bg-gradient-to-r ${cat.color} text-white shadow-md`}>
                      <cat.icon size={16} className="lg:w-5 lg:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm lg:text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white block truncate">
                        {cat.name}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {coursesData[cat.name as keyof typeof coursesData]?.modules?.length || 0} modules
                      </div>
                    </div>
                    <ChevronRight 
                      className={`transition-transform duration-200 flex-shrink-0 ${
                        selectedCategory === cat.name ? "rotate-90" : ""
                      }`}
                      size={14}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced Content Panel */}
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-[600px] lg:max-h-[700px] bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30">
              {!selectedCategory ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={() => navigate('/all-courses-mega')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 transform shadow-lg flex items-center justify-center gap-3"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View all courses</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-8">
                    <div className={`p-2 lg:p-3 rounded-xl bg-gradient-to-r ${courseCategories.find(cat => cat.name === selectedCategory)?.color ?? "from-blue-500 to-purple-500"} text-white shadow-lg`}>
                      {(() => {
                        const icon = courseCategories.find(cat => cat.name === selectedCategory)?.icon;
                        if (icon) return React.createElement(icon as LucideIcon, { size: 24, className: "lg:w-7 lg:h-7" });
                        return null;
                      })()}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl lg:text-3xl font-bold text-gray-800 dark:text-white truncate">
                        {selectedCategory}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                        {coursesData[selectedCategory as keyof typeof coursesData].modules?.length} comprehensive modules
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    {coursesData[selectedCategory as keyof typeof coursesData].modules?.map((module: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div 
                          className="p-4 lg:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                                {module.icon ? React.createElement(module.icon as LucideIcon, { size: 20, className: "lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" }) : null}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-white truncate">
                                  {module.name}
                                </h4>
                                <div className="flex items-center gap-2 lg:gap-4 mt-2 text-xs lg:text-sm">
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} className="text-gray-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{module.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star size={14} className="text-gray-400" />
                                    <span className={getDifficultyColor(module.difficulty)}>{module.difficulty}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedModule === idx ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0"
                            >
                              <ChevronRight size={18} className="text-gray-400" />
                            </motion.div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedModule === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-200 dark:border-gray-700"
                            >
                              <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900/50">
                                {['Data Science', 'AI and Machine Learning'].includes(module.name) && Array.isArray(module.levels) ? (
                                  <LevelsColumns
                                    levels={module.levels.map((level: any, lidx: number) => ({
                                      level: level.title,
                                      title: level.desc,
                                      duration: level.duration,
                                      projects: `${level.projects} projects`,
                                      path: module.name === 'Data Science'
                                        ? `/data-science/level-${lidx + 1}`
                                        : `/ai-ml/level-${lidx + 1}`
                                    }))}
                                  />
                                ) : (
                                  module.levels ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                      {module.levels.map((level: any, lidx: number) => (
                                        <motion.div
                                          key={lidx}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: lidx * 0.1 }}
                                          onHoverStart={() => setHoveredLevel(`${idx}-${lidx}`)}
                                          onHoverEnd={() => setHoveredLevel(null)}
                                          className="relative bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-5 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                                          onClick={() => {
                                            if (
                                              module.name === 'Module 2 (Advanced)' &&
                                              level.title === 'Web Development' &&
                                              selectedCategory === 'FullStack'
                                            ) {
                                              setShowWebDevModal(true);
                                            } else if (
                                              module.name === 'Module 2 (Advanced)' &&
                                              level.title === 'App Development' &&
                                              selectedCategory === 'FullStack'
                                            ) {
                                              setShowAppDevModal(true);
                                            } else if (
                                              module.name === 'Module 3 (Expert)' &&
                                              level.title === 'Web Development' &&
                                              selectedCategory === 'FullStack'
                                            ) {
                                              setShowWebDevExpertModal(true);
                                            } else if (
                                              module.name === 'Module 3 (Expert)' &&
                                              level.title === 'App Development' &&
                                              selectedCategory === 'FullStack'
                                            ) {
                                              setShowAppDevExpertModal(true);
                                            } else if (
                                              module.name === 'Module 1 (Common)' &&
                                              level.title === 'Web Development Essentials' &&
                                              selectedCategory === 'FullStack'
                                            ) {
                                              navigate('/web-development-essentials');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Digital Marketing' &&
                                              level.title === 'Level 1' &&
                                              selectedCategory === 'Marketing'
                                            ) {
                                              navigate('/digital-marketing-level-1');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Digital Marketing' &&
                                              level.title === 'Level 2' &&
                                              selectedCategory === 'Marketing'
                                            ) {
                                              navigate('/digital-marketing-level-2');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Digital Marketing' &&
                                              level.title === 'Level 3' &&
                                              selectedCategory === 'Marketing'
                                            ) {
                                              navigate('/digital-marketing-level-3');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Sales & Marketing' &&
                                              level.title === 'Level 1' &&
                                              selectedCategory === 'Marketing'
                                            ) {
                                              navigate('/sales-marketing-level-1');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Sales & Marketing' &&
                                              level.title === 'Level 2' &&
                                              selectedCategory === 'Marketing'
                                            ) {
                                              navigate('/sales-marketing-level-2');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Sales & Marketing' &&
                                              level.title === 'Level 3' &&
                                              selectedCategory === 'Marketing'
                                            ) {
                                              navigate('/sales-marketing-level-3');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Web & UI/UX Design' &&
                                              level.title === 'Level 1' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/web-ui-design-level-1');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Web & UI/UX Design' &&
                                              level.title === 'Level 2' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/web-ui-design-level-2');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Web & UI/UX Design' &&
                                              level.title === 'Level 3' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/web-ui-design-level-3');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Graphic and Video Content Design' &&
                                              level.title === 'Level 1' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/graphic-video-design-level-1');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Graphic and Video Content Design' &&
                                              level.title === 'Level 2' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/graphic-video-design-level-2');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Graphic and Video Content Design' &&
                                              level.title === 'Level 3' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/graphic-video-design-level-3');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Mechanical and CAD Design' &&
                                              level.title === 'Level 1' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/mechanical-cad-level-1');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Mechanical and CAD Design' &&
                                              level.title === 'Level 2' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/mechanical-cad-level-2');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Mechanical and CAD Design' &&
                                              level.title === 'Level 3' &&
                                              selectedCategory === 'Design'
                                            ) {
                                              navigate('/mechanical-cad-level-3');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Product Management' &&
                                              level.title === 'Level 1' &&
                                              selectedCategory === 'Product Management'
                                            ) {
                                              navigate('/product-management-level-1');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Product Management' &&
                                              level.title === 'Level 2' &&
                                              selectedCategory === 'Product Management'
                                            ) {
                                              navigate('/product-management-level-2');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            } else if (
                                              module.name === 'Product Management' &&
                                              level.title === 'Level 3' &&
                                              selectedCategory === 'Product Management'
                                            ) {
                                              navigate('/product-management-level-3');
                                              setOpen(false);
                                              setSelectedCategory(null);
                                              setExpandedModule(null);
                                            }
                                          }}
                                        >
                                          <div className="flex items-start justify-between mb-3">
                                            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
                                              {level.title}
                                            </div>
                                            <motion.div
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ 
                                                opacity: hoveredLevel === `${idx}-${lidx}` ? 1 : 0,
                                                x: hoveredLevel === `${idx}-${lidx}` ? 0 : -10 
                                              }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              <ArrowRight size={14} className="text-blue-500" />
                                            </motion.div>
                                          </div>
                                          {/* Do not render description, topics, duration, or projects here */}
                                        </motion.div>
                                      ))}
                                    </div>
                                  ) : null
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            {/* Web Development Modal */}
            <AnimatePresence>
              {showWebDevModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
                      onClick={() => setShowWebDevModal(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Web Development</h2>
                    <ul className="space-y-3">
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/reactjs-details'); }}>React.js</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/angular-details'); }}>Angular</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/tailwind-details'); }}>Tailwind CSS & SCSS & BootStrap</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* App Development Modal */}
            <AnimatePresence>
              {showAppDevModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
                      onClick={() => setShowAppDevModal(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">App Development</h2>
                    <ul className="space-y-3">
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/react-native-details'); }}>React Native</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/flutter-details'); }}>Flutter</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/swift-details'); }}>Swift</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/java-android-details'); }}>Java For Android</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Web Development Expert Modal */}
            <AnimatePresence>
              {showWebDevExpertModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
                      onClick={() => setShowWebDevExpertModal(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Web Development (Expert)</h2>
                    <ul className="space-y-3">
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/node-express-details'); }}>Node.js with Express.js</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/java-spring-details'); }}>Java With Spring Boot</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/python-django-details'); }}>Python with Django or FastAPI</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowWebDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/go-gin-details'); }}>Go with GIN or Fiber Framework</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* App Development Expert Modal */}
            <AnimatePresence>
              {showAppDevExpertModal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl"
                      onClick={() => setShowAppDevExpertModal(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">App Development (Expert)</h2>
                    <ul className="space-y-3">
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/dart-server-details'); }}>Dart Server with Aqueduct or Shelf</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/python-flask-fastapi-details'); }}>Python with Flask or FastAPI</li>
                      <li className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-lg px-4 py-2 font-medium cursor-pointer hover:bg-blue-200 transition" onClick={() => { setShowAppDevExpertModal(false); setOpen(false); setSelectedCategory(null); setExpandedModule(null); navigate('/java-kotlin-backend-details'); }}>Java With Kotlin for Mobile Backend</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesDropdown;