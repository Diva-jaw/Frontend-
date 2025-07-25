import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Star, 
  ArrowRight,
  Database,
  Code,
  BarChart3,
  PenTool,
  Briefcase,
  Brain,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Course } from '../../services/courseService';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
  index: number;
}

// Icon mapping based on course name
const getCourseIcon = (courseName: string) => {
  const name = courseName.toLowerCase();
  if (name.includes('data') || name.includes('ai') || name.includes('science')) {
    return Database;
  } else if (name.includes('fullstack') || name.includes('web') || name.includes('development')) {
    return Code;
  } else if (name.includes('marketing') || name.includes('sales')) {
    return BarChart3;
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return PenTool;
  } else if (name.includes('product') || name.includes('management')) {
    return Briefcase;
  } else if (name.includes('ai') || name.includes('ml')) {
    return Brain;
  } else {
    return Code; // Default icon
  }
};

// Color mapping based on course name
const getCourseColor = (courseName: string) => {
  const name = courseName.toLowerCase();
  if (name.includes('data') || name.includes('ai') || name.includes('science')) {
    return "from-purple-500 to-pink-500";
  } else if (name.includes('fullstack') || name.includes('web') || name.includes('development')) {
    return "from-blue-500 to-cyan-500";
  } else if (name.includes('marketing') || name.includes('sales')) {
    return "from-green-500 to-emerald-500";
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return "from-orange-500 to-red-500";
  } else if (name.includes('product') || name.includes('management')) {
    return "from-indigo-500 to-purple-500";
  } else {
    return "from-blue-500 to-cyan-500"; // Default color
  }
};

// Background color mapping
const getCourseBgColor = (courseName: string) => {
  const name = courseName.toLowerCase();
  if (name.includes('data') || name.includes('ai') || name.includes('science')) {
    return "bg-purple-50 dark:bg-purple-900/20";
  } else if (name.includes('fullstack') || name.includes('web') || name.includes('development')) {
    return "bg-blue-50 dark:bg-blue-900/20";
  } else if (name.includes('marketing') || name.includes('sales')) {
    return "bg-green-50 dark:bg-green-900/20";
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return "bg-orange-50 dark:bg-orange-900/20";
  } else if (name.includes('product') || name.includes('management')) {
    return "bg-indigo-50 dark:bg-indigo-900/20";
  } else {
    return "bg-blue-50 dark:bg-blue-900/20"; // Default background
  }
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, index }) => {
  const IconComponent = getCourseIcon(course.name);
  const color = getCourseColor(course.name);
  const bgColor = getCourseBgColor(course.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-150 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 relative"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-xl"></div>
      
      <div className="relative p-5 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg group-hover:shadow-xl transition-all duration-150`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <IconComponent size={24} className="w-6 h-6" />
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ x: 3 }}
          >
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {course.level_range}
            </span>
            <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
          </motion.div>
        </div>
        
        <motion.h3 
          className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-3"
          whileHover={{ scale: 1.02 }}
        >
          {course.name}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
          {course.description}
        </p>
        
        {course.level_range && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <motion.div 
                className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md"
                whileHover={{ scale: 1.05 }}
              >
                <Star size={14} className="text-purple-500" />
                <span className="font-medium">{course.level_range}</span>
              </motion.div>
            </div>
          </div>
        )}
        
        <motion.button
          onClick={() => onClick(course)}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-500 dark:via-purple-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-blue-700 transition-all duration-150 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Explore Course</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-150" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CourseCard; 