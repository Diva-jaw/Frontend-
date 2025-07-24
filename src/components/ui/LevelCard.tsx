import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Star, 
  ArrowRight,
  Code,
  Database,
  BarChart3,
  PenTool,
  Briefcase,
  Brain,
  Zap,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { ModuleLevel } from '../../services/courseService';

interface LevelCardProps {
  level: ModuleLevel;
  onClick: (level: ModuleLevel) => void;
  index: number;
  topics?: Array<{ title: string; description?: string }>;
}

// Icon mapping based on level name
const getLevelIcon = (levelName: string) => {
  const name = levelName.toLowerCase();
  if (name.includes('beginner')) {
    return Code;
  } else if (name.includes('intermediate')) {
    return Database;
  } else if (name.includes('expert') || name.includes('advanced')) {
    return Brain;
  } else if (name.includes('foundation')) {
    return Target;
  } else {
    return Award; // Default icon
  }
};

// Color mapping based on level name
const getLevelColor = (levelName: string) => {
  const name = levelName.toLowerCase();
  if (name.includes('beginner')) {
    return "from-green-500 to-emerald-500";
  } else if (name.includes('intermediate')) {
    return "from-blue-500 to-cyan-500";
  } else if (name.includes('expert') || name.includes('advanced')) {
    return "from-purple-500 to-pink-500";
  } else if (name.includes('foundation')) {
    return "from-orange-500 to-red-500";
  } else {
    return "from-indigo-500 to-purple-500"; // Default color
  }
};

const LevelCard: React.FC<LevelCardProps> = ({ level, onClick, index, topics = [] }) => {
  const IconComponent = getLevelIcon(level.level_name);
  const color = getLevelColor(level.level_name);

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
      
      <div className="relative p-6 lg:p-7">
        <div className="flex items-center justify-between mb-5">
          <motion.div 
            className={`p-3 rounded-2xl bg-gradient-to-r ${color} text-white shadow-xl group-hover:shadow-2xl transition-all duration-150`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <IconComponent size={24} className="w-6 h-6" />
          </motion.div>
          <motion.div whileHover={{ x: 3 }}>
            <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
          </motion.div>
        </div>
        
        <motion.h3 
          className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-3"
          whileHover={{ scale: 1.02 }}
        >
          {level.level_name}
        </motion.h3>
        

        
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Clock size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{level.duration}</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Star size={14} className="text-purple-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{level.level_range}</span>
          </motion.div>
        </div>

        {topics.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Topic:</h4>
            <div className="space-y-1">
              <motion.div
                className="space-y-1"
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span className="truncate">{topics[0].title}</span>
                </div>
                {topics[0].description && (
                  <div className="ml-3.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {topics[0].description.length > 80 
                      ? `${topics[0].description.substring(0, 80)}...` 
                      : topics[0].description}
                  </div>
                )}
              </motion.div>
              {topics.length > 1 && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  +{topics.length - 1} more topics
                </div>
              )}
            </div>
          </div>
        )}


        
        <motion.button
          onClick={() => onClick(level)}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-500 dark:via-purple-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-blue-700 transition-all duration-150 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Enroll Now</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-150" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LevelCard; 