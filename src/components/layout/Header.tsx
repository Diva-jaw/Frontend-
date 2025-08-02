import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Navbar from './Navbar';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [careersDropdownOpen, setCareersDropdownOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLearnDropdown = () => {
    console.log('Toggle Learn Dropdown:', !learnDropdownOpen);
    setLearnDropdownOpen(!learnDropdownOpen);
  };

  const toggleCareersDropdown = () => {
    console.log('Toggle Careers Dropdown:', !careersDropdownOpen);
    setCareersDropdownOpen(!careersDropdownOpen);
  };

  // Reset dropdown states when menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setLearnDropdownOpen(false);
      setCareersDropdownOpen(false);
    }
  }, [isMenuOpen]);

  // Ensure menu is scrollable by default when opened
  useEffect(() => {
    if (isMenuOpen) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const menuContainer = document.querySelector('.mobile-menu-scroll');
        if (menuContainer) {
          menuContainer.scrollTop = 0;
        }
      }, 100);
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Top Navigation Bar - Fixed at top */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[1300] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          {/* RFT Logo - Leftmost position */}
          <img src="/RFT logo.png" alt="Logo" className="h-8 w-8 rounded-full border-2 border-blue-400 dark:border-blue-500 object-cover" />
          
          {/* Right side buttons - Menu and Dark Mode */}
          <div className="flex items-center gap-2">
            {/* Menu Icon */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} className="text-gray-700 dark:text-gray-300" /> : <Menu size={20} className="text-gray-700 dark:text-gray-300" />}
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-[1100] py-0 shadow-none md:shadow-lg dark:shadow-none md:dark:shadow-gray-900/40 transition-colors duration-300 md:mt-0 mt-16 bg-transparent md:bg-white md:dark:bg-gray-900 ${isMenuOpen ? 'w-full' : 'w-auto'} md:w-full`}
      >
        {/* Desktop Navigation - Full width */}
        <div className="hidden md:block w-full">
          <Navbar />
        </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[1200] bg-black/60 backdrop-blur-sm flex justify-end items-start pt-16" onClick={() => setIsMenuOpen(false)}>
          <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 py-4 px-2 mr-4 max-h-[60vh] min-h-[200px] overflow-y-auto mobile-menu-scroll transition-colors duration-300" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col space-y-4">
              {/* Auth/User Info at top */}
              <div className="flex flex-col gap-2 mb-2">
                {isLoggedIn ? (
                  <>
                    <div 
                      className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full relative mb-2 cursor-pointer hover:from-green-200 hover:to-blue-200 dark:hover:from-green-800 dark:hover:to-blue-800 transition-all duration-200"
                      onClick={() => {
                        window.location.href = '/profile-dashboard';
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="text-sm font-semibold text-green-700 dark:text-green-300 truncate">
                        {user?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2 mb-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/signin" className="px-4 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow hover:from-blue-600 hover:to-blue-800 transition-colors duration-200 text-center">Login</a>
                    <a href="/signup" className="px-4 py-2 font-bold text-white bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow hover:from-green-600 hover:to-green-800 transition-colors duration-200 text-center">Register</a>
                    {/* <a href="/employers-login" className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow hover:from-purple-600 hover:to-purple-800 transition-colors duration-200 text-center block">Employer Login</a> */}
                  </>
                )}
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 my-2" />
              {/* Main nav links below */}
              <a href="/#home" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="/#services" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="/#about" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="/#team" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Team</a>
              <a href="/#what-we-do" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>What We Do</a>
              <a href="/courses" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>Courses</a>
              {/* Learn Dropdown */}
              <div className="group">
                <button 
                  onClick={toggleLearnDropdown}
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between"
                >
                  Learn <span className="ml-2">{learnDropdownOpen ? '▲' : '▼'}</span>
                </button>
                {learnDropdownOpen && (
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    <a href="/mdu" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>MDU</a>
                    <a href="/crd" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>CRD</a>
                  </div>
                )}
              </div>
              {/* Careers Dropdown */}
              <div className="group">
                <button 
                  onClick={toggleCareersDropdown}
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between"
                >
                  Careers <span className="ml-2">{careersDropdownOpen ? '▲' : '▼'}</span>
                </button>
                {careersDropdownOpen && (
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    <a href="/life-at-rft" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>Life at RFT</a>
                    <a href="/employee-says" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>What Our Employees Say</a>
                    <a href="/apply" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>Apply</a>
                  </div>
                )}
              </div>
              <a href="/#contact" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </a>
            </nav>
          </div>
        </div>
               )}
       </header>
     </>
   );
 };

export default Header;