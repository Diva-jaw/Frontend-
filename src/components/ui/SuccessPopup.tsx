import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Mail, Clock, Users, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  moduleName: string;
  levelName: string;
  userName: string;
  courseId?: string;
  moduleId?: string;
  levelId?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  onClose,
  courseName,
  moduleName,
  levelName,
  userName,
  courseId,
  moduleId,
  levelId,
}) => {
  const navigate = useNavigate();

  const handleCoursesRedirect = () => {
    navigate('/courses');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl mx-4 sm:mx-0 z-50"
            style={{ height: '85vh', maxHeight: '85vh', overflow: 'hidden' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCoursesRedirect}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>

            {/* Header with Gradient */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
              <div className="relative p-3 sm:p-4 text-center text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full mb-2"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg sm:text-xl font-bold mb-1"
                >
                  ✅ Enrollment Confirmed
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs sm:text-sm opacity-90"
                >
                  Successfully processed
                </motion.p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto relative mobile-menu-scroll" style={{ height: 'calc(85vh - 200px)', maxHeight: 'calc(85vh - 200px)' }}>
              {/* Welcome Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-8"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Dear {userName},
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We are pleased to confirm your enrollment with{" "}
                  <span className="font-semibold text-blue-600">
                  Ruhil Future Technologies
                  </span>
                  . Your application has been received and is currently being
                  processed by our academic team..
                </p>
              </motion.div>

              {/* Course Details Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-100"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                    Enrollment Details
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-blue-100">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Course:</span>
                    <span className="font-semibold text-gray-800 text-sm sm:text-base mt-1 sm:mt-0">
                      {courseName}
                    </span>
                  </div>
                  {!(courseId === '6' && moduleId === '11' && levelId === '31') && (
                    <>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-blue-100">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">Module:</span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base mt-1 sm:mt-0">
                          {moduleName}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">Level:</span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base mt-1 sm:mt-0">
                          {levelName}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-green-100"
              >
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-green-600 mr-3" />
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                    Next Steps
                  </h4>
                </div>
                                 <ul className="space-y-3">
                   <li className="flex items-start">
                     <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                     <span className="text-sm sm:text-base text-gray-700">
                       Our academic team will review your application within{" "}
                       <span className="font-semibold">
                         24-48 business hours
                       </span>
                     </span>
                   </li>
                 </ul>
              </motion.div>

              {/* Email Notification */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-purple-100"
              >
                <div className="flex items-center mb-3">
                  <Mail className="w-6 h-6 text-purple-600 mr-3" />
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                    Email Confirmation
                  </h4>
                </div>
                                 <p className="text-sm sm:text-base text-gray-700">
                   We've sent a confirmation email to your registered
                   email address with all the details and next steps.
                 </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-gray-600 mr-3" />
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                    Need Help?
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium text-gray-700">
                      Academic Affairs:
                    </p>
                    <p className="text-blue-600 text-xs sm:text-sm">info@rftsystems.com</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone Support:</p>
                                         <p className="text-blue-600 text-xs sm:text-sm">+91 7082101537</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="bg-gray-900 text-white p-4 sm:p-6 text-center border-t border-gray-700"
            >
              <h5 className="text-base sm:text-lg font-semibold mb-2">Ruhil Future Technologies</h5>
              <p className="text-gray-300 text-xs sm:text-sm">
                Empowering minds, transforming futures
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessPopup;