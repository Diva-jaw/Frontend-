import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  CheckCircle,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { useCourseContext } from '../contexts/CourseContext';
import { courseService } from '../services/courseService';
import SuccessPopup from '../components/ui/SuccessPopup';
import NotificationPopup from '../components/ui/NotificationPopup';

const EnrollmentPage = () => {
  const { courseId, moduleId, levelId } = useParams<{ courseId: string; moduleId: string; levelId: string }>();
  const navigate = useNavigate();
  const { user, setRedirectPath } = useAuth();
  const { getCourseDetails, getModuleLevels } = useCourseContext();
  
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [levelDetails, setLevelDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState<any>(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone_no: '',
    college: '',
    department: '',
    year: ''
  });

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle function
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Load form data from localStorage if available (for returning users)
  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone');
    const pendingEnrollmentData = localStorage.getItem('pendingEnrollmentData');
    
    if (pendingEnrollmentData) {
      try {
        const storedData = JSON.parse(pendingEnrollmentData);
        const currentTime = Date.now();
        const timeDiff = currentTime - storedData.timestamp;
        
        // Only restore data if it's less than 1 hour old and matches current course
        if (timeDiff < 3600000 && 
            storedData.courseId === courseId && 
            storedData.moduleId === moduleId && 
            storedData.levelId === levelId) {
          
          setFormData(prev => ({
            ...prev,
            // Keep user's login data for name and email, only restore other fields
            name: user?.name || storedData.name || prev.name,
            email: user?.email || storedData.email || prev.email,
            phone_no: storedData.phone_no || savedPhone || prev.phone_no,
            college: storedData.college || prev.college,
            department: storedData.department || prev.department,
            year: storedData.year || prev.year
          }));
          
          // Clear the stored data after restoring
          localStorage.removeItem('pendingEnrollmentData');
        } else {
          // Clear old data
          localStorage.removeItem('pendingEnrollmentData');
        }
      } catch (error) {
        console.error('Error parsing stored enrollment data:', error);
        localStorage.removeItem('pendingEnrollmentData');
      }
    } else if (savedPhone) {
      // Fallback to just phone number if no pending enrollment data
      setFormData(prev => ({
        ...prev,
        phone_no: savedPhone
      }));
    }
  }, [courseId, moduleId, levelId, user?.name, user?.email]);

  // Update form data when user changes (for auto-filling name and email)
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId || !moduleId || !levelId) {
        navigate('/');
        return;
      }
      
      try {
        setLoading(true);
        const courseData = await getCourseDetails(parseInt(courseId));
        const levelsData = await getModuleLevels(parseInt(courseId), parseInt(moduleId));
        
        if (courseData) {
          setCourseDetails(courseData);
          const module = courseData.modules.find((m: any) => m.id === parseInt(moduleId));
          if (module) {
            setModuleDetails(module);
          }
        }
        
        if (levelsData) {
          const level = levelsData.find((l: any) => l.id === parseInt(levelId));
          if (level) {
            setLevelDetails(level);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, moduleId, levelId, getCourseDetails, getModuleLevels, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone number validation
    if (name === 'phone_no') {
      // Only allow numeric characters and limit to 10 digits
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
      // Save phone number to localStorage
      localStorage.setItem('userPhone', numericValue);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      // Store form data in localStorage for restoration after login
      const formDataToStore = {
        name: formData.name,
        email: formData.email,
        phone_no: formData.phone_no,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        courseId,
        moduleId,
        levelId,
        timestamp: Date.now()
      };
      localStorage.setItem('pendingEnrollmentData', JSON.stringify(formDataToStore));
      
      // Store the current path before redirecting to login
      setRedirectPath(`/course/${courseId}/module/${moduleId}/level/${levelId}/enroll`);
      navigate('/signin');
      return;
    }

    // Set enrolling state to disable button
    setIsEnrolling(true);

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone_no.trim()) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields marked with *'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address'
      });
      return;
    }

    // Validate phone number (exactly 10 digits)
    if (!/^\d{10}$/.test(formData.phone_no)) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Invalid Phone Number',
        message: 'Please enter a valid 10-digit phone number'
      });
      return;
    }

    console.log("EnrollmentPage: Submitting enrollment data:", {
      courseId: parseInt(courseId!),
      moduleId: parseInt(moduleId!),
      levelId: parseInt(levelId!),
      courseName: courseDetails?.name,
      levelName: levelDetails?.level_name,
      userId: user.id,
      formData
    });

    try {
      // Use the course service to enroll with additional user data (same as modal)
      const result = await courseService.enrollInCourseWithDetails(
        parseInt(courseId!),
        parseInt(moduleId!),
        parseInt(levelId!),
        formData
      );
      
      console.log("EnrollmentPage: Enrollment successful:", result);
      
      setEnrollmentData({
        courseName: courseDetails?.name,
        levelName: levelDetails?.level_name,
        userName: user?.name || formData.name,
        enrollmentData: result
      });
      setShowSuccessPopup(true);
      console.log('EnrollmentPage: Success popup should now be visible');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Enrollment failed. Please try again.';
      console.error("EnrollmentPage: Enrollment error:", err);
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Enrollment Failed',
        message: errorMessage
      });
    } finally {
      // Reset enrolling state regardless of success or failure
      setIsEnrolling(false);
    }
  };

  const handleBackClick = () => {
    navigate(`/course/${courseId}/module/${moduleId}/level/${levelId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading enrollment form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <style>{`
        /* Global dropdown positioning fixes */
        select {
          z-index: 50 !important;
          position: relative !important;
        }
        select:focus {
          z-index: 51 !important;
        }
        select option {
          z-index: 52 !important;
          position: relative !important;
        }
        /* Ensure dropdown appears above other elements */
        select:focus + div,
        select:active + div {
          z-index: 999 !important;
        }
        /* Override any overflow hidden that might clip the dropdown */
        .form-container {
          overflow: visible !important;
        }
        /* Ensure the form field container doesn't clip dropdowns */
        .form-fields-container {
          overflow: visible !important;
          position: relative !important;
        }
        /* Force dropdown to appear above all other content */
        select:focus ~ *,
        select:active ~ * {
          z-index: 1 !important;
        }
        /* Ensure the select element itself has highest priority */
        select:focus,
        select:active {
          z-index: 9999 !important;
          position: relative !important;
        }
        /* Override any parent overflow settings */
        * {
          overflow: visible !important;
        }
        /* Specific fix for the year select */
        select[name="year"] {
          z-index: 9999 !important;
          position: relative !important;
        }
        select[name="year"]:focus {
          z-index: 10000 !important;
        }
        /* Force dropdown to appear closer to the input */
        select[name="year"] {
          position: relative !important;
          z-index: 99999 !important;
        }
        /* Override browser default dropdown positioning */
        select[name="year"]:focus {
          position: relative !important;
          z-index: 100000 !important;
        }
        /* Ensure the dropdown container doesn't have any positioning that affects dropdown */
        .year-select-container {
          position: static !important;
          overflow: visible !important;
        }
        /* Remove any transform that might affect dropdown positioning */
        .year-select-container * {
          transform: none !important;
        }
        /* Force the dropdown to appear directly below the select */
        select[name="year"] {
          position: relative !important;
          z-index: 999999 !important;
        }
        /* Override any parent positioning that might affect dropdown */
        .form-fields-container {
          position: static !important;
          overflow: visible !important;
        }
        /* Ensure the form container doesn't interfere */
        .form-container {
          position: static !important;
          overflow: visible !important;
        }
        /* Force the main container to not affect dropdown positioning */
        .main-form-container {
          position: static !important;
          overflow: visible !important;
        }
        /* Ultimate fix for dropdown positioning */
        select[name="year"] {
          position: relative !important;
          z-index: 999999 !important;
          transform: translateZ(0) !important;
        }
        /* Force the dropdown to appear directly below the input */
        select[name="year"]:focus {
          position: relative !important;
          z-index: 1000000 !important;
          transform: translateZ(0) !important;
        }
        /* Override any browser default positioning */
        select[name="year"] option {
          position: relative !important;
          z-index: 1000001 !important;
        }
      `}</style>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 xl:py-10">
        {/* Back Button */}
        <motion.button
          onClick={handleBackClick}
          className="mb-4 sm:mb-6 mt-4 sm:mt-8 lg:mt-20 flex items-center gap-2 sm:gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 text-sm sm:text-base"
          whileHover={{ x: -5, scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5 transition-transform duration-150 group-hover:-translate-x-1" />
          <span className="font-semibold">Back to Course</span>
        </motion.button>

        {/* Dark Mode Toggle */}
        <div className="fixed top-10 right-1 z-50 xl:hidden">
          <button
            onClick={toggleDarkMode}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
                         className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-600/40 overflow-visible main-form-container"
             style={{ position: 'static', zIndex: 1 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 lg:p-8 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4"
              >
                Enroll in Course
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-blue-100 text-sm sm:text-base lg:text-lg"
              >
                {courseDetails?.name}
                {!(courseId === '6' && moduleId === '11' && levelId === '31') && (
                  <> - {levelDetails?.level_name}</>
                )}
              </motion.p>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 relative form-container">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative">
                {/* Course Information */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 sm:p-6 lg:p-8 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-blue-600 rounded-lg">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 text-lg sm:text-xl">Course Information</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <span className="px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg text-sm sm:text-base font-medium">
                      Course: {courseDetails?.name}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 relative z-10 form-fields-container">
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-5 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base relative z-10"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-5 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base relative z-10"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-5 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base relative z-10"
                        placeholder="Enter your phone number"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      College/University
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-5 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base relative z-10"
                        placeholder="Enter your college/university"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Department
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-5 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base relative z-10"
                        placeholder="Enter your department"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Year
                    </label>
                                         <div className="relative year-select-container" style={{ position: 'static', zIndex: 99999 }}>
                       <select
                         name="year"
                         value={formData.year}
                         onChange={handleInputChange}
                         className="w-full px-3 sm:px-5 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-sm sm:text-base relative z-50"
                         style={{ position: 'relative', zIndex: 99999, transform: 'translateZ(0)' }}
                       >
                         <option value="">Select your year</option>
                         <option value="1st Year">1st Year</option>
                         <option value="2nd Year">2nd Year</option>
                         <option value="3rd Year">3rd Year</option>
                         <option value="4th Year">4th Year</option>
                         <option value="Graduated">Graduated</option>
                         <option value="Other">Other</option>
                       </select>
                     </div>
                  </div>
                </div>

                {/* Enrollment Agreement */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 sm:p-6 lg:p-8 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-green-600 rounded-lg">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-green-900 dark:text-green-100 text-base sm:text-lg">Enrollment Agreement</h4>
                  </div>
                  <p className="text-green-800 dark:text-green-200 text-sm sm:text-base leading-relaxed">
                    By clicking "Enroll Now", you agree to enroll in this course level. Our team will contact you within 24 hours to confirm your enrollment and provide further instructions.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-4 sm:pt-6 lg:pt-8">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-bold text-sm sm:text-base lg:text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isEnrolling}
                    className="flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 font-bold text-sm sm:text-base lg:text-lg shadow-lg"
                  >
                    {isEnrolling ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        Enroll Now
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && enrollmentData && (
        <SuccessPopup
          isOpen={showSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          courseName={enrollmentData.courseName}
          moduleName={enrollmentData.levelName || 'Module'}
          levelName={enrollmentData.levelName || 'Level'}
          userName={enrollmentData.userName}
          courseId={courseId}
          moduleId={moduleId}
          levelId={levelId}
        />
      )}

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default EnrollmentPage; 