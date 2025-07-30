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
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { useCourseContext } from '../contexts/CourseContext';
import { courseService } from '../services/courseService';
import SuccessPopup from '../components/ui/SuccessPopup';
import NotificationPopup from '../components/ui/NotificationPopup';

const EnrollmentPage = () => {
  const { courseId, moduleId, levelId } = useParams<{ courseId: string; moduleId: string; levelId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCourseDetails, getModuleLevels } = useCourseContext();
  
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [moduleDetails, setModuleDetails] = useState<any>(null);
  const [levelDetails, setLevelDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Authentication Required',
        message: 'Please log in to enroll in courses.'
      });
      return;
    }

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
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Back Button */}
        <motion.button
          onClick={handleBackClick}
          className="mb-6 mt-20 flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          whileHover={{ x: -5, scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="transition-transform duration-150 group-hover:-translate-x-1" />
          <span className="font-semibold">Back to Course</span>
        </motion.button>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-600/40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
              >
                Enroll in Course
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-blue-100 text-lg"
              >
                {courseDetails?.name}
                {!(courseId === '6' && moduleId === '11' && levelId === '31') && (
                  <> - {levelDetails?.level_name}</>
                )}
              </motion.p>
            </div>

            {/* Form */}
            <div className="p-8 overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Information */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 text-xl">Course Information</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg text-base font-medium">
                      Course: {courseDetails?.name}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-base"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-base"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-base"
                        placeholder="Enter your phone number"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      College/University
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-base"
                        placeholder="Enter your college/university"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Department
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-base"
                        placeholder="Enter your department"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Year
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-5 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 text-base"
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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-green-900 dark:text-green-100 text-lg">Enrollment Agreement</h4>
                  </div>
                  <p className="text-green-800 dark:text-green-200 text-base leading-relaxed">
                    By clicking "Enroll Now", you agree to enroll in this course level. Our team will contact you within 24 hours to confirm your enrollment and provide further instructions.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-6 pt-8">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="flex-1 px-8 py-5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-bold text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 font-bold text-lg shadow-lg"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Enroll Now
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