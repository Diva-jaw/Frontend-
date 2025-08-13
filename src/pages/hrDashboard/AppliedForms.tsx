import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Hammer,
  PenTool,
  Megaphone,
  ShoppingCart,
  Users,
  Banknote,
  Settings,
  ArrowLeft,
  Home,
  ChevronRight,
} from 'lucide-react';
import { apiService } from '../../services/api';

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
  const [departmentCounts, setDepartmentCounts] = useState<{
    active: Record<string, number>;
    rejected: Record<string, number>;
    accepted: Record<string, number>;
  }>({ active: {}, rejected: {}, accepted: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentCounts = async () => {
      try {
        setLoading(true);
        const response = await apiService.fetchDepartmentCounts();
        // Ensure we have a valid structure even if the API returns unexpected data
        setDepartmentCounts({
          active: response?.active || {},
          rejected: response?.rejected || {},
          accepted: response?.accepted || {}
        });
      } catch (error) {
        console.error('Error fetching department counts:', error);
        setDepartmentCounts({ active: {}, rejected: {}, accepted: {} });
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentCounts();
  }, []);

  const handleDepartmentClick = (dept: string) => {
    navigate(`/hr/applied-forms/${dept.toLowerCase()}`);
  };

  const handleBackClick = () => {
    navigate('/hr');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Dashboard</span>
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <button
                onClick={() => navigate('/hr')}
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <Home size={16} className="mr-1" />
                <span>HR Dashboard</span>
              </button>
              <ChevronRight size={16} />
              <span className="text-blue-600 dark:text-blue-400 font-medium">Applied Forms</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-12 px-4 animate-fadeIn">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 text-blue-900 dark:text-blue-100 tracking-tight drop-shadow">Select Department</h2>
          <p className="text-center text-blue-700 dark:text-blue-300 mb-8 text-base">
            Choose a department to view and manage candidates
            {loading && <span className="ml-2 text-sm text-gray-500">Loading counts...</span>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {departments.map((dept, idx) => {
              const activeCount = (departmentCounts.active && departmentCounts.active[dept.name]) || 0;
              const rejectedCount = (departmentCounts.rejected && departmentCounts.rejected[dept.name]) || 0;
              const acceptedCount = (departmentCounts.accepted && departmentCounts.accepted[dept.name]) || 0;
              const totalCount = activeCount + rejectedCount + acceptedCount;
              
              return (
                <button
                  key={dept.name}
                  onClick={() => handleDepartmentClick(dept.name)}
                  className="w-full py-8 px-4 bg-gradient-to-br from-blue-100 to-white dark:from-blue-900/20 dark:to-gray-700 rounded-xl shadow-md border border-blue-100 dark:border-blue-700 hover:from-blue-200 hover:to-blue-50 dark:hover:from-blue-800/30 dark:hover:to-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp"
                  tabIndex={0}
                  title={dept.desc}
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* Multiple Count Badges */}
                  {!loading && totalCount > 0 && (
                    <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                      {/* Active/In-progress (Green) */}
                      {activeCount > 0 && (
                        <div className="bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                          {activeCount}
                        </div>
                      )}
                      {/* Rejected (Red) */}
                      {rejectedCount > 0 && (
                        <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                          {rejectedCount}
                        </div>
                      )}
                      {/* Accepted (Blue) */}
                      {acceptedCount > 0 && (
                        <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                          {acceptedCount}
                        </div>
                      )}
                    </div>
                  )}
                  <span className="mb-2">{dept.icon}</span>
                  <span className="font-semibold text-lg text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors">{dept.name}</span>
                  <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-blue-900 dark:bg-blue-700 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all duration-200 z-10 shadow-lg whitespace-nowrap">{dept.desc}</span>
                </button>
              );
            })}
          </div>
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