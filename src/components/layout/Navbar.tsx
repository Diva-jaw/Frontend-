import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, LogOut, User, Menu, X } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import UserProfilePopup from "../auth/UserProfilePopup";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdown, setSubDropdown] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, logout } = useAuth();
  const [careersDropdownOpen, setCareersDropdownOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const learnDropdownRef = useRef<HTMLDivElement>(null);
  const careersDropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Get first character of user's name for avatar
  const getUserInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  // Handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMainDropdownOpen(false);
        setSubDropdown(null);
      }
    };

    // Handle ESC key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMainDropdownOpen(false);
        setSubDropdown(null);
      }
    };

    if (mainDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [mainDropdownOpen]);

  // Add useEffect for Learn dropdown
  useEffect(() => {
    if (!learnDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        learnDropdownRef.current &&
        !learnDropdownRef.current.contains(event.target as Node)
      ) {
        setLearnDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [learnDropdownOpen]);

  // Add useEffect for Careers dropdown
  useEffect(() => {
    if (!careersDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        careersDropdownRef.current &&
        !careersDropdownRef.current.contains(event.target as Node)
      ) {
        setCareersDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [careersDropdownOpen]);


  useEffect(() => {
    if (!profilePopupOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfilePopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profilePopupOpen]);


  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/#" + sectionId;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/signin";
  };

  const handleNewUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/signup";
  };

  const linkClass =
    "text-gray-800 dark:text-gray-200 font-medium text-sm uppercase tracking-wide relative rounded-full px-4 py-2 transition-all duration-200 ease-in-out hover:text-indigo-700 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-indigo-600 dark:after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-1/2";

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20 sticky top-0 z-50 w-full transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 w-full">
          {/* Left: Logo and Nav */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="/RFT logo.png"
              alt="Logo"
              className="h-16 w-16 rounded-full border-4 border-blue-400 dark:border-blue-500 mr-4"
            />
            {/* Hamburger for mobile */}
            <button
              className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu w-7 h-7"
                style={{ stroke: 'black' }}
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="/" onClick={handleHomeClick} className={linkClass}>
                Home
              </a>
              <a
                href="/#services"
                onClick={(e) => handleNavClick(e, "services")}
                className={linkClass}
              >
                Services
              </a>
              <a
                href="/#about"
                onClick={(e) => handleNavClick(e, "about")}
                className={linkClass}
              >
                About
              </a>
              <a
                href="/#what-we-do"
                onClick={e => handleNavClick(e, "what-we-do")}
                className={linkClass + " whitespace-nowrap min-w-[140px] text-center"}
              >
                What We Do
              </a>
              {/* Courses Link */}
              <Link
                to="/courses"
                className={linkClass}
              >
                Courses
              </Link>
              {/* Learn Dropdown */}
              <div className="relative" ref={learnDropdownRef}>
                <button
                  onClick={() => {
                    setLearnDropdownOpen(!learnDropdownOpen);
                    setCareersDropdownOpen(false);
                  }}
                  className={linkClass}
                  style={{ textTransform: 'uppercase' }}
                >
                  Learn
                </button>
                <AnimatePresence>
                  {learnDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-3 bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 w-[300px] z-50 p-4 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
                    >
                      <ul className="grid grid-cols-1 gap-2">
                        <li>
                          <Link
                            to="/mdu"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            onClick={() => {
                              setLearnDropdownOpen(false);
                            }}
                          >
                            MDU
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/crd"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            onClick={() => {
                              setLearnDropdownOpen(false);
                            }}
                          >
                            CRD
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Careers Dropdown */}
              <div className="relative" ref={careersDropdownRef}>
                <button
                  onClick={() => {
                    setCareersDropdownOpen(!careersDropdownOpen);
                    setMainDropdownOpen(false);
                    setSubDropdown(null);
                  }}
                  className={linkClass}
                  style={{ textTransform: 'uppercase' }}
                >
                  Careers
                </button>
                <AnimatePresence>
                  {careersDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-3 bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 w-[300px] z-50 p-4 border border-gray-100 dark:border-gray-700 transition-colors duration-300"
                    >
                      <ul className="grid grid-cols-1 gap-2">
                        <li>
                          <Link
                            to="/life-at-rft"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            onClick={() => {
                              setCareersDropdownOpen(false);
                            }}
                          >
                            Life at RFT
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/employee-says"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            onClick={() => {
                              setCareersDropdownOpen(false);
                            }}
                          >
                            What Our Employees Say
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/apply"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                            onClick={() => {
                              setCareersDropdownOpen(false);
                            }}
                          >
                            Apply
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a
                href="/#contact"
                onClick={e => handleNavClick(e, "contact")}
                className={linkClass + " uppercase"}
              >
                CONTACT US
              </a>
            </div>
          </div>
          {/* Spacer for gap */}
          <div className="flex-1" />
          {/* Right: Login/Register/For Employer's and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn && user && user.role !== 'hr' && (
              <>

                {/* User Avatar with First Character - now a button */}
                <div className="relative" ref={profileRef}>
                  <button
                    className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full relative focus:outline-none"
                    onClick={() => setProfilePopupOpen((v) => !v)}
                    aria-haspopup="true"
                    aria-expanded={profilePopupOpen}
                    type="button"
                  >
                    {/* Online Status Indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {getUserInitial(user?.name || "User")}
                    </div>
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {user?.name || "User"}
                    </span>
                  </button>
                  {profilePopupOpen && (
                    <div className="absolute right-0 mt-3 z-50" style={{ minWidth: 320 }}>
                      <UserProfilePopup
                        name={user?.name || "User"}
                        email={user?.email || "user@email.com"}
                        onViewProfile={() => {
                          navigate("/profile-dashboard");
                          setProfilePopupOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2 ml-2"
                  title="Logout"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
            {isLoggedIn && user && user.role === 'hr' && (
              <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full relative select-none cursor-default">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {getUserInitial(user?.name || 'User')}
                </div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">{user?.name || 'User'}</span>
              </div>
            )}
            {isLoggedIn && user && user.role === 'hr' && (
              <button
                onClick={logout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2 ml-2"
                title="Logout"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
            {!isLoggedIn && (
              <>
                <button
                  onClick={handleSignInClick}
                  className="px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleNewUserClick}
                  className="px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200"
                >
                  Register
                </button>
                <span className="h-6 w-px bg-gray-400 dark:bg-gray-600 mx-2 rounded-full" />
                <Link
                  to="/employers-login"
                  className="px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200 flex items-center gap-2"
                >
                  Employer Login
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-blue-700 dark:text-blue-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 max-w-full h-full bg-white dark:bg-gray-900 shadow-2xl p-0 flex flex-col relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Sticky Auth Buttons at very top, always visible */}
              <div className="sticky top-0 left-0 w-full bg-white dark:bg-gray-900 z-[200] pb-2 pt-2 flex flex-col gap-2 border-b border-gray-200 dark:border-gray-700 px-6" style={{maxWidth:'100vw',overflowX:'auto'}}>
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full relative mb-2 min-w-0" style={{maxWidth:'100vw',overflowX:'auto'}}>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md min-w-0" style={{minWidth:'2rem'}}>
                        {getUserInitial(user?.name || "User")}
                      </div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-300 truncate min-w-0" style={{maxWidth:'60vw',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {user?.name || "User"}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 font-semibold text-sm shadow-md transition-all duration-200 flex items-center gap-2 mb-2 min-w-0"
                      title="Logout"
                      style={{maxWidth:'100vw',overflowX:'auto',textOverflow:'ellipsis'}}
                    >
                      <LogOut size={16} /> <span className="truncate min-w-0">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSignInClick}
                      className="w-full px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200 mb-2 min-w-0"
                      style={{maxWidth:'100vw',overflowX:'auto',textOverflow:'ellipsis'}}
                    >
                      <span className="truncate min-w-0">Login</span>
                    </button>
                    <button
                      onClick={handleNewUserClick}
                      className="w-full px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200 mb-2 min-w-0"
                      style={{maxWidth:'100vw',overflowX:'auto',textOverflow:'ellipsis'}}
                    >
                      <span className="truncate min-w-0">Register</span>
                    </button>
                    <Link
                      to="/employers-login"
                      className="w-full px-4 py-2 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 rounded-full hover:from-blue-300 hover:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-900 font-semibold text-sm shadow-lg transition-colors duration-200 flex items-center gap-2 mb-2 min-w-0"
                      style={{maxWidth:'100vw',overflowX:'auto',textOverflow:'ellipsis'}}
                    >
                      <span className="truncate min-w-0">Employer Login</span>
                    </Link>
                  </>
                )}
              </div>
              {/* Logo and close button (below sticky auth bar) */}
              <div className="flex items-center justify-between mb-8 px-6 pt-2">
                <img src="/RFT logo.png" alt="Logo" className="h-12 w-12 rounded-full border-2 border-blue-400 dark:border-blue-500" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7 text-blue-700 dark:text-blue-200" />
                </button>
              </div>
              {/* Scrollable nav links below */}
              <nav className="flex flex-col gap-2 flex-1 overflow-y-auto pt-2 min-w-0 px-6">
                <a href="/" onClick={handleHomeClick} className={linkClass + " w-full text-left"}>Home</a>
                <a href="/#services" onClick={e => handleNavClick(e, "services") } className={linkClass + " w-full text-left"}>Services</a>
                <a href="/#about" onClick={e => handleNavClick(e, "about") } className={linkClass + " w-full text-left"}>About</a>
                <a href="/#what-we-do" onClick={e => handleNavClick(e, "what-we-do") } className={linkClass + " w-full text-left"}>What We Do</a>
                {/* Courses Link */}
                <Link to="/courses" className={linkClass + " w-full text-left"}>Courses</Link>
                {/* Learn Dropdown (collapsible) */}
                <details className="group">
                  <summary className={linkClass + " w-full text-left cursor-pointer flex items-center justify-between"}>Learn <span className="ml-2">▼</span></summary>
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    <Link to="/mdu" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">MDU</Link>
                    <Link to="/crd" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">CRD</Link>
                  </div>
                </details>
                {/* Careers Dropdown (collapsible) */}
                <details className="group">
                  <summary className={linkClass + " w-full text-left cursor-pointer flex items-center justify-between"}>Careers <span className="ml-2">▼</span></summary>
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    <Link to="/life-at-rft" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Life at RFT</Link>
                    <Link to="/employee-says" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">What Our Employees Say</Link>
                    <Link to="/apply" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300">Apply</Link>
                  </div>
                </details>
                <a href="/#contact" onClick={e => handleNavClick(e, "contact")} className={linkClass + " uppercase"}>CONTACT US</a>
                {/* Auth Links in nav for mobile - only show if not logged in */}
                {!isLoggedIn && (
                  <>
                    <a href="/signin" className={linkClass + " w-full text-left"}>Login</a>
                    <a href="/signup" className={linkClass + " w-full text-left"}>Register</a>
                    <Link to="/employers-login" className={linkClass + " w-full text-left"}>Employer Login</Link>
                  </>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
