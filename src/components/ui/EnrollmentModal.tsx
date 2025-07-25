import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getEnrollmentUrl } from "../../config/api";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  levelName?: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  courseName,
  levelName
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = localStorage.getItem("user");
    const currentUser = userData ? JSON.parse(userData) : null;
    const userId = currentUser?.id;

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    console.log("Submitting enrollment data:", {
      user_id: userId,
      course_name: courseName,
      level_name: levelName,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      department: formData.department,
      message: formData.message,
    });

    try {
      const response = await fetch(getEnrollmentUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          course_name: courseName,
          level_name: levelName || "",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          department: formData.department,
          message: formData.message || "",
        }),
      });
      
      const result = await response.json();

      if (response.ok) {
        alert("Enrollment submitted successfully!");
        console.log("Success:", result);
        setFormData({ name: "", email: "", phone: "", college: "", department: "", message: "" });
        onClose();
      } else {
        console.error("Backend error:", result);
        alert("Enrollment failed: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server error. Please try again later.");
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
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl dark:shadow-gray-900/50 p-8 sm:p-10 w-full max-w-3xl mx-auto border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm my-8 relative overflow-hidden"
          >
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {modalTitle}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    Please fill in your details to enroll in this course
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-2xl transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Full Name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Email Address <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                      placeholder="Enter your email address"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Phone Number <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                      placeholder="Enter your phone number"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      College/University <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                      placeholder="Enter your college/university name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Department/Field of Study <span className="text-gray-500 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md backdrop-blur-sm"
                      placeholder="e.g., Computer Science, Engineering, etc."
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="group"
                >
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    Message <span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md backdrop-blur-sm resize-none"
                    placeholder="Tell us about your goals or any questions you have..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4 pt-6"
                >
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 dark:from-blue-500 dark:via-blue-600 dark:to-indigo-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 font-semibold hover:scale-105"
                  >
                    Cancel
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal; 