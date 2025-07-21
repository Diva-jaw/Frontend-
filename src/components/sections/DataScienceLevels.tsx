import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface Level {
  level: string;
  title: string;
  path: string;
  duration?: string;
  difficulty?: string;
}

interface LevelsProps {
  levels: Level[];
}

const LevelsColumns: React.FC<LevelsProps> = ({ levels }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {levels.map((lvl, index) => (
        <div
          key={lvl.level}
          className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600 shadow-sm"
        >
          <div
            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center w-full"
            onClick={() => navigate(lvl.path)}
          >
            {lvl.level}
            {index === levels.length - 1 && (
              <ArrowRight className="ml-2 w-3 h-3 text-blue-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LevelsColumns; 