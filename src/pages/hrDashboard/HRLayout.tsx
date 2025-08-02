import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, UserCircle2, Sun, Moon, LogOut, User, Settings } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
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
  {
    name: 'Course Management',
    path: '/hr/course-management',
    icon: <Settings size={20} />,
  },
];

const HRLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn, user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Click-away logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn || user?.role !== 'hr') {
        navigate('/');
      }
    }
  }, [isLoggedIn, user, loading, navigate]);

  // Get first character of user's name for avatar
  const getUserInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* HR Top Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20 sticky top-0 z-50 w-full transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center h-auto md:h-16 w-full gap-4 md:gap-0">
            {/* Left: Logo and Nav */}
            <div className="flex items-center flex-shrink-0 mb-2 md:mb-0">
              <img
                src="/RFT logo1.jpg"
                alt="RFT Logo"
                className="h-12 w-12 rounded-full border-4 border-blue-400 dark:border-blue-500 mr-4 md:mr-6"
              />
              <span className="font-bold text-2xl text-blue-900 dark:text-blue-200 tracking-wide">HR Dashboard</span>
            </div>
            <div className="flex-1 flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-8 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-800 dark:text-gray-200 font-medium text-sm uppercase tracking-wide relative rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 flex items-center justify-center gap-2 whitespace-nowrap ${
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
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-blue-700" size={22} />}
              </button>
              {isLoggedIn && user ? (
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut size={16} />
                  Logout
                </button>
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