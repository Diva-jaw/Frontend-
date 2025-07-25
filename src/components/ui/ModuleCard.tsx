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
  Layers
} from 'lucide-react';
import { CourseModule } from '../../services/courseService';

interface ModuleCardProps {
  module: CourseModule;
  onClick: (module: CourseModule) => void;
  index: number;
}

// Icon mapping based on module name
const getModuleIcon = (moduleName: string) => {
  const name = moduleName.toLowerCase();
  if (name.includes('data') || name.includes('ai') || name.includes('science')) {
    return Database;
  } else if (name.includes('web') || name.includes('development') || name.includes('frontend') || name.includes('backend')) {
    return Code;
  } else if (name.includes('marketing') || name.includes('sales')) {
    return BarChart3;
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return PenTool;
  } else if (name.includes('product') || name.includes('management')) {
    return Briefcase;
  } else if (name.includes('ai') || name.includes('ml')) {
    return Brain;
  } else if (name.includes('mobile') || name.includes('app')) {
    return Zap;
  } else {
    return Layers; // Default icon
  }
};

// Color mapping based on module name
const getModuleColor = (moduleName: string) => {
  const name = moduleName.toLowerCase();
  if (name.includes('data') || name.includes('ai') || name.includes('science')) {
    return "from-purple-500 to-pink-500";
  } else if (name.includes('web') || name.includes('development') || name.includes('frontend') || name.includes('backend')) {
    return "from-blue-500 to-cyan-500";
  } else if (name.includes('marketing') || name.includes('sales')) {
    return "from-green-500 to-emerald-500";
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return "from-orange-500 to-red-500";
  } else if (name.includes('product') || name.includes('management')) {
    return "from-indigo-500 to-purple-500";
  } else if (name.includes('mobile') || name.includes('app')) {
    return "from-pink-500 to-purple-500";
  } else {
    return "from-blue-500 to-cyan-500"; // Default color
  }
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick, index }) => {
  const IconComponent = getModuleIcon(module.name);
  const color = getModuleColor(module.name);

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
          {module.name}
        </motion.h3>
        
        {module.description && (
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm"
            whileHover={{ scale: 1.01 }}
          >
            {module.description.length > 120 
              ? `${module.description.substring(0, 120)}...` 
              : module.description}
          </motion.p>
        )}
        
        <div className="flex items-center gap-4 mb-5">
          <motion.div 
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Clock size={14} className="text-blue-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{module.duration}</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Star size={14} className="text-purple-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{module.has_levels ? 'Multiple Levels' : 'Single Level'}</span>
          </motion.div>
        </div>


        
        <motion.button
          onClick={() => onClick(module)}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-500 dark:via-purple-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:via-purple-600 dark:hover:to-blue-700 transition-all duration-150 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Explore Module</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-150" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ModuleCard; 