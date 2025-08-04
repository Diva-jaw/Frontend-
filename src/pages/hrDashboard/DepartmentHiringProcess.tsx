import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Award, UserCheck } from 'lucide-react';

const steps = [
  { name: 'Resume Screening', icon: <FileText size={28} className="text-blue-500" /> },
  { name: 'Round 1', icon: <CheckCircle size={28} className="text-green-500" /> },
  { name: 'Round 2', icon: <CheckCircle size={28} className="text-yellow-500" /> },
  { name: 'Final Round', icon: <Award size={28} className="text-purple-500" /> },
  { name: 'HR ROUND', icon: <UserCheck size={28} className="text-pink-500" /> },
];

const DepartmentHiringProcess: React.FC = () => {
  const { department } = useParams<{ department: string }>();
  const navigate = useNavigate();

  const handleStepClick = (step: string) => {
    navigate(`/hr/applied-forms/${department}/${step.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 animate-fadeIn">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 text-blue-900 dark:text-blue-100 tracking-tight drop-shadow capitalize">{department} - Hiring Process</h2>
        <p className="text-center text-blue-700 dark:text-blue-300 mb-8 text-base">Select a step to view and manage candidates <span className="font-semibold">({steps.length} Steps)</span></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {steps.map((step, idx) => (
            <button
              key={step.name}
              onClick={() => handleStepClick(step.name)}
              className="w-full py-7 px-4 bg-gradient-to-br from-blue-100 to-white dark:from-blue-900/20 dark:to-gray-700 rounded-xl shadow-md border border-blue-100 dark:border-blue-700 hover:from-blue-200 hover:to-blue-50 dark:hover:from-blue-800/30 dark:hover:to-gray-600 hover:shadow-xl hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 transition-all duration-200 flex flex-col items-center group relative cursor-pointer animate-slideUp"
              tabIndex={0}
              title={step.name}
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <span className="mb-2">{step.icon}</span>
              <span className="font-semibold text-lg text-blue-800 dark:text-blue-200 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors">{step.name === 'Final Round' ? 'Round 3' : step.name}</span>
            </button>
          ))}
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