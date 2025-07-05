import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navbar from './Navbar';
import { useAuth } from '../AuthContext';

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1100] py-0 shadow-none md:shadow-lg dark:shadow-none md:dark:shadow-gray-900/40 transition-colors duration-300 md:mt-0 mt-16 bg-transparent md:bg-white md:dark:bg-gray-900 ${isMenuOpen ? 'w-full' : 'w-auto'} md:w-full`}
    >
      {/* Desktop Navigation - Full width */}
      <div className="hidden md:block w-full">
        <Navbar />
      </div>
      {/* Mobile Menu Button */}
      <div
        className={`md:hidden flex justify-end items-center transition-all duration-300 ${isMenuOpen ? 'w-full static' : 'w-12 h-12 absolute top-0 right-0 z-[1200]'}`}
        style={!isMenuOpen ? { background: 'transparent', left: 'auto' } : {}}
      >
        <button
          onClick={toggleMenu}
          className="p-2 bg-transparent hover:bg-transparent focus:bg-transparent border-none shadow-none text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors duration-200"
          aria-label="Toggle menu"
          style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[1200] bg-black/60 backdrop-blur-sm flex justify-center items-start" onClick={() => setIsMenuOpen(false)}>
          <div className="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 py-4 px-2 absolute top-16 left-4 right-4 transition-colors duration-300" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col space-y-4">
              {/* Auth/User Info at top */}
              <div className="flex flex-col gap-2 mb-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full relative mb-2">
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
                    <a href="/employers-login" className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow hover:from-purple-600 hover:to-purple-800 transition-colors duration-200 text-center block">Employer Login</a>
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
              {/* Learn Dropdown */}
              <details className="group">
                <summary className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between">Learn <span className="ml-2">▼</span></summary>
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <a href="/mdu" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">MDU</a>
                  <a href="/crd" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">CRD</a>
                </div>
              </details>
              {/* Careers Dropdown */}
              <details className="group">
                <summary className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between">Careers <span className="ml-2">▼</span></summary>
                <div className="pl-4 flex flex-col gap-1 mt-1">
                  <a href="/life-at-rft" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Life at RFT</a>
                  <a href="/employee-says" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">What Our Employees Say</a>
                  <a href="/apply" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Apply</a>
                </div>
              </details>
              <a href="/#contact" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer flex items-center justify-between">
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;