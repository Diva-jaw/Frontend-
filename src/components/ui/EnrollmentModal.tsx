import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, User, Mail, Phone, GraduationCap, Building, Calendar, CheckCircle } from 'lucide-react';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../components/AuthContext';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  levelName?: string;
  courseId: number;
  moduleId: number;
  levelId: number;
}

interface EnrollmentFormData {
  name: string;
  email: string;
  phone_no: string;
  college: string;
  department: string;
  year: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  courseName,
  levelName,
  courseId,
  moduleId,
  levelId
}) => {
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EnrollmentFormData>({
    name: '',
    email: '',
    phone_no: '',
    college: '',
    department: '',
    year: ''
  });

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isOpen, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn || !user) {
      setError("Please log in to enroll in courses.");
      return;
    }

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone_no.trim()) {
      setError("Please fill in all required fields marked with *");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone_no.replace(/\s/g, ''))) {
      setError("Please enter a valid phone number");
      return;
    }

    console.log("Submitting enrollment data:", {
      courseId,
      moduleId,
      levelId,
      courseName,
      levelName,
      userId: user.id,
      formData
    });

    try {
      setLoading(true);
      setError(null);

      // Use the course service to enroll with additional user data
      const result = await courseService.enrollInCourseWithDetails(courseId, moduleId, levelId, formData);
      
      console.log("Enrollment successful:", result);
      alert("Enrollment submitted successfully! We'll contact you soon.");
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Enrollment failed. Please try again.';
      console.error("Enrollment error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = levelName 
    ? `Enroll in ${courseName} - ${levelName}`
    : `Enroll in ${courseName}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                {modalTitle}
              </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Complete your enrollment details below
                  </p>
                </div>
              <button
                onClick={onClose}
                  className="p-2 hover:bg-blue-600/20 rounded-full transition-colors"
              >
                  <X className="w-5 h-5 text-white" />
              </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isLoggedIn ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Please log in to enroll in this course.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Course Info Display */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">
                        Course Details
                    </h3>
                    </div>
                                         <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Course:</span>
                        <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-md">{courseName}</span>
                      </div>
                      {levelName && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Level:</span>
                          <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-md">{levelName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <span className="text-red-500">*</span> Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <span className="text-red-500">*</span> Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <span className="text-red-500">*</span> Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone_no"
                          value={formData.phone_no}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    {/* College Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        College/University
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter your college/university name"
                        />
                      </div>
                    </div>

                    {/* Department Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Department
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Enter your department"
                        />
                      </div>
                    </div>

                    {/* Year Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Year
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
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

                  {/* Confirmation Message */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100">
                        Enrollment Agreement
                      </h4>
                    </div>
                    <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                      By clicking "Enroll Now", you agree to enroll in this course level. 
                      Our team will contact you within 24 hours to confirm your enrollment 
                      and provide further instructions.
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                      <p className="text-red-800 dark:text-red-200 text-sm">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 font-semibold shadow-lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Enroll Now
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal; 