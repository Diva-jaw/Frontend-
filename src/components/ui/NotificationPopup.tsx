import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message
}) => {
  const getIcon = () => {
    if (type === 'success') {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
    return <XCircle className="w-6 h-6 text-blue-600" />;
  };

  const getColors = () => {
    if (type === 'success') {
      return {
        bg: 'bg-green-50 border-green-200',
        iconBg: 'bg-green-100',
        text: 'text-green-800',
        title: 'text-green-900'
      };
    }
    return {
      bg: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-blue-100',
      text: 'text-blue-800',
      title: 'text-blue-900'
    };
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 group"
            >
              <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
            </button>

            {/* Content */}
            <div className={`p-6 ${colors.bg} border`}>
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${colors.iconBg}`}>
                  {getIcon()}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${colors.title} mb-2`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${colors.text} leading-relaxed`}>
                    {message}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  type === 'success'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup; 