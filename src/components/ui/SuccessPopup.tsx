import React, { useEffect } from "react";
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCoursesRedirect = () => {
    navigate('/courses');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] md:flex md:items-center md:justify-center md:p-4 bg-transparent md:bg-black/50">
      {/* Modal Container */}
      <div className="relative w-full h-full md:h-auto md:max-w-full md:mx-8 bg-white md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={handleCoursesRedirect}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 text-center text-white flex-shrink-0">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mb-2">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold mb-1">✅ Enrollment Confirmed</h2>
          <p className="text-xs opacity-90">Successfully processed</p>
        </div>

        {/* Content - Scrollable on mobile */}
        <div 
          className="p-4 sm:p-6 md:p-8 overflow-y-auto relative mobile-menu-scroll" 
          style={{ 
            height: 'calc(-200px + 85vh)', 
            maxHeight: 'calc(-200px + 85vh)'
          }}
        >
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Dear {userName},
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We are pleased to confirm your enrollment with{" "}
              <span className="font-semibold text-blue-600">
                Ruhil Future Technologies
              </span>
              . Your application has been received and is currently being
              processed by our academic team.
            </p>
          </div>

          {/* Single Column Layout */}
          <div>
            {/* Course Details Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                  Enrollment Details
                </h4>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-blue-100">
                  <span className="font-medium text-gray-700 text-sm sm:text-base">Course:</span>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base mt-1 sm:mt-0">{courseName}</span>
                </div>
                {!(courseId === '6' && moduleId === '11' && levelId === '31') && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-blue-100">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Module:</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base mt-1 sm:mt-0">{moduleName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">Level:</span>
                      <span className="font-semibold text-gray-800 text-sm sm:text-base mt-1 sm:mt-0">{levelName}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-green-100">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-green-600 mr-3" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-800">Next Steps</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Our academic team will review your application within{" "}
                    <span className="font-semibold">24-48 business hours</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    You will receive an email confirmation with further instructions
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Access to your course materials will be provided upon approval
                  </span>
                </li>
              </ul>
            </div>

            {/* Email Notification */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-purple-100">
              <div className="flex items-center mb-3">
                <Mail className="w-6 h-6 text-purple-600 mr-3" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-800">Email Confirmation</h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                We've sent a confirmation email to your registered
                email address with all the details and next steps.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-gray-600 mr-3" />
                <h4 className="text-base sm:text-lg font-semibold text-gray-800">Need Help?</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="font-medium text-gray-700">Academic Affairs:</p>
                  <p className="text-blue-600 text-xs sm:text-sm">info@rftsystems.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Phone Support:</p>
                  <p className="text-blue-600 text-xs sm:text-sm">+91 7082101537</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white p-3 text-center border-t border-gray-700 flex-shrink-0">
          <h5 className="text-sm font-semibold mb-1">Ruhil Future Technologies</h5>
          <p className="text-gray-300 text-xs">
            Empowering minds, transforming futures
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;