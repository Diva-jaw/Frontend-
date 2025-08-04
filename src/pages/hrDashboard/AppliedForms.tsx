import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hammer,
  PenTool,
  Megaphone,
  ShoppingCart,
  Users,
  Banknote,
  Settings,
} from 'lucide-react';

const departments = [
  { name: 'Engineering', icon: <Hammer size={28} className="text-blue-500" />, desc: 'Product & tech development' },
  { name: 'Design', icon: <PenTool size={28} className="text-pink-500" />, desc: 'UI/UX & creative design' },
  { name: 'Marketing', icon: <Megaphone size={28} className="text-yellow-500" />, desc: 'Brand & digital marketing' },
  { name: 'Sales', icon: <ShoppingCart size={28} className="text-green-500" />, desc: 'Business development & sales' },
  { name: 'HR', icon: <Users size={28} className="text-purple-500" />, desc: 'People & culture' },
  { name: 'Finance', icon: <Banknote size={28} className="text-indigo-500" />, desc: 'Accounts & finance' },
  { name: 'Operations', icon: <Settings size={28} className="text-gray-500" />, desc: 'Operations & logistics' },
];

const AppliedForms: React.FC = () => {
  const navigate = useNavigate();

  const handleDepartmentClick = (dept: string) => {
    navigate(`/hr/applied-forms/${dept.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 animate-fadeIn">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 text-blue-900 dark:text-blue-100 tracking-tight drop-shadow">Select Department</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <button
              key={dept.name}
              onClick={() => handleDepartmentClick(dept.name)}
              className="w-full py-8 px-4 bg-gradient-to-br from-blue-100 to-white dark:from-blue-900/20 dark:to-gray-700 rounded-xl shadow-md border border-blue-100 dark:border-blue-700 hover:from-blue-200 hover:to-blue-50 dark:hover:from-blue-800/30 dark:hover:to-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp"
              tabIndex={0}
              title={dept.desc}
            >
              <span className="mb-2">{dept.icon}</span>
              <span className="font-semibold text-lg text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors">{dept.name}</span>
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-900 dark:bg-blue-700 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all duration-200 z-10 shadow-lg whitespace-nowrap">{dept.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedForms;

// Tailwind CSS animations (add to your global CSS if not present):
// .animate-fadeIn { animation: fadeIn 0.7s ease; }
// .animate-slideUp { animation: slideUp 0.7s ease; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } 