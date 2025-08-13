import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Award, UserCheck, ArrowLeft } from 'lucide-react';
import { apiService } from '../../services/api';

const steps = [
  { name: 'Resume Screening', icon: <FileText size={28} className="text-blue-500" /> },
  { name: 'Round 1', icon: <CheckCircle size={28} className="text-green-500" /> },
  { name: 'Round 2', icon: <CheckCircle size={28} className="text-yellow-500" /> },
  { name: 'Final Round', icon: <Award size={28} className="text-purple-500" /> },
  { name: 'HR Round', icon: <UserCheck size={28} className="text-pink-500" /> },
];

const DepartmentHiringProcess: React.FC = () => {
  const { department } = useParams<{ department: string }>();
  const navigate = useNavigate();
  const [roundCounts, setRoundCounts] = useState<{
    active: Record<string, number>;
    rejected: Record<string, number>;
    accepted: Record<string, number>;
  }>({ active: {}, rejected: {}, accepted: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoundCounts = async () => {
      try {
        setLoading(true);
        const response = await apiService.fetchRoundCounts(department || '');
        // Ensure we have a valid structure even if the API returns unexpected data
        setRoundCounts({
          active: response?.active || {},
          rejected: response?.rejected || {},
          accepted: response?.accepted || {}
        });
      } catch (error) {
        console.error('Error fetching round counts:', error);
        setRoundCounts({ active: {}, rejected: {}, accepted: {} });
      } finally {
        setLoading(false);
      }
    };

    if (department) {
      fetchRoundCounts();
    }
  }, [department]);

  const handleStepClick = (step: string) => {
    navigate(`/hr/applied-forms/${department}/${step.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 animate-fadeIn">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/hr/applied-forms')}
          className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Departments</span>
        </button>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 text-blue-900 dark:text-blue-100 tracking-tight drop-shadow capitalize">{department} - Hiring Process</h2>
        <p className="text-center text-blue-700 dark:text-blue-300 mb-8 text-base">
          Select a step to view and manage candidates <span className="font-semibold">({steps.length} Steps)</span>
          {loading && <span className="ml-2 text-sm text-gray-500">Loading counts...</span>}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {steps.map((step, idx) => {
            const activeCount = (roundCounts.active && roundCounts.active[step.name]) || 0;
            const rejectedCount = (roundCounts.rejected && roundCounts.rejected[step.name]) || 0;
            const acceptedCount = (roundCounts.accepted && roundCounts.accepted[step.name]) || 0;
            const totalCount = activeCount + rejectedCount + acceptedCount;
            
            return (
              <button
                key={step.name}
                onClick={() => handleStepClick(step.name)}
                className="w-full py-7 px-4 bg-gradient-to-br from-blue-100 to-white dark:from-blue-900/20 dark:to-gray-700 rounded-xl shadow-md border border-blue-100 dark:border-blue-700 hover:from-blue-200 hover:to-blue-50 dark:hover:from-blue-800/30 dark:hover:to-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp"
                tabIndex={0}
                title={step.name}
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
                <span className="mb-2">{step.icon}</span>
                <span className="font-semibold text-lg text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors">{step.name === 'Final Round' ? 'Round 3' : step.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepartmentHiringProcess;

// Tailwind CSS animations (add to your global CSS if not present):
// .animate-fadeIn { animation: fadeIn 0.7s ease; }
// .animate-slideUp { animation: slideUp 0.7s ease; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } 