import React from 'react';
import { useNavigate } from 'react-router-dom';

const departments = [
  { name: 'Engineering', route: 'engineering' },
  { name: 'Design', route: 'design' },
  { name: 'Marketing', route: 'marketing' },
  { name: 'Sales', route: 'sales' },
  { name: 'HR', route: 'hr' },
  { name: 'Finance', route: 'finance' },
  { name: 'Operations', route: 'operations' },
];

const ApplicationManagementDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-2 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 flex flex-col items-center border border-blue-100 animate-fadeIn">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-2 text-center tracking-tight drop-shadow">Ruhil Future Technologies</h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-6 text-center">Application Management Dashboard</h2>
        <div className="w-24 h-1 bg-blue-500 rounded-full mb-8 animate-slideUp"></div>
        <div className="w-full">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-6 text-center md:text-left">Department</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {departments.map((dept, idx) => (
              <div
                key={dept.name}
                className="bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-blue-200 shadow-md rounded-2xl p-6 sm:p-8 flex items-center justify-center text-base sm:text-lg font-bold text-blue-700 hover:from-blue-200 hover:to-blue-100 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[90px] text-center group relative overflow-hidden"
                onClick={() => navigate(`/hr/applied-jobs/${dept.route}`)}
              >
                <span className="z-10 group-hover:text-blue-900 transition-colors duration-300">{dept.name}</span>
                <span className="absolute right-4 top-4 opacity-0 group-hover:opacity-20 text-6xl text-blue-200 font-black select-none pointer-events-none transition-all duration-300">{idx+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagementDashboard; 