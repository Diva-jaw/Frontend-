import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, UserCircle2, Sun, Moon, LogOut, User } from 'lucide-react';
import React, { useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useTheme } from '../../components/ThemeContext';

const navItems = [
  {
    name: 'See Enquiry',
    path: '/hr/enquiry',
    icon: <Users size={20} />,
  },
  {
    name: 'Post Job',
    path: '/hr/post-job',
    icon: <Briefcase size={20} />,
  },
  {
    name: 'See Posted Jobs',
    path: '/hr/posted-job',
    icon: <FileText size={20} />,
  },
  {
    name: 'See Applied Job',
    path: '/hr/applied-jobs',
    icon: <FileText size={20} />,
  },
];

const HRLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'hr') {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  // Get first character of user's name for avatar
  const getUserInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* HR Top Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20 sticky top-0 z-50 w-full transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 w-full">
            {/* Left: Logo and Nav */}
            <div className="flex items-center flex-shrink-0">
              <img
                src="/RFT logo1.jpg"
                alt="RFT Logo"
                className="h-12 w-12 rounded-full border-4 border-blue-400 dark:border-blue-500 mr-6"
              />
              <span className="font-bold text-2xl text-blue-900 dark:text-blue-200 tracking-wide">HR Dashboard</span>
            </div>
            <div className="flex-1 flex items-center justify-center space-x-2 md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-800 dark:text-gray-200 font-medium text-sm uppercase tracking-wide relative rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 flex items-center justify-center gap-2 ${
                    location.pathname === item.path
                      ? 'bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300 shadow border border-blue-200 dark:border-blue-700'
                      : ''
                  }`}
                >
                  <span className="flex items-center justify-center">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-blue-700" size={22} />}
              </button>
              {isLoggedIn && user ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-full relative">
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {getUserInitial(user?.name || 'User')}
                    </div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2"
                    title="Logout"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/hr/signin" className="hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full p-2 transition-colors" title="Sign In / Account">
                  <User size={32} className="text-blue-700 dark:text-blue-300" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full max-w-full">
        {children}
      </div>
    </div>
  );
};

export default HRLayout; 