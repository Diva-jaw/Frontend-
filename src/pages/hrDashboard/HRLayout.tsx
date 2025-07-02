import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Briefcase, FileText, UserCircle2, Sun, Moon, LogOut, User } from 'lucide-react';
import React, { useEffect } from 'react';
import { useAuth } from '../../components/AuthContext';

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
    <div className="min-h-screen bg-gray-50">
      {/* HR Top Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur shadow-md border-b flex items-center justify-between px-4 md:px-8 py-2">
        <div className="flex items-center space-x-4">
          <Link to="/hr" className="flex items-center space-x-2">
            <img src="/RFT logo1.jpg" alt="RFT Logo" className="h-10 w-10 object-contain rounded-full border-2 border-blue-500 shadow" />
            <span className="font-bold text-xl text-blue-900 tracking-wide">HR Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center space-x-2 md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-blue-100 text-blue-700 shadow border border-blue-200'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            <>
              <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {getUserInitial(user?.name || 'User')}
                </div>
                <span className="text-sm font-medium text-green-700">
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
            <Link to="/hr/signin" className="hover:bg-blue-50 rounded-full p-2 transition-colors" title="Sign In / Account">
              <User size={32} className="text-blue-700" />
            </Link>
          )}
        </div>
      </nav>
      <div className="w-full max-w-full">
        {children}
      </div>
    </div>
  );
};

export default HRLayout; 