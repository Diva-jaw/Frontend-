import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
  Layers,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../../components/AuthContext";
import NotificationPopup from "../../../components/ui/NotificationPopup";
import { courseService, Course, CourseModule } from "../../../services/courseService";
import { getCourseManagementUrl } from "../../../utils/apiHelper";

interface AddLevelForm {
  level_name: string;
  duration: string;
  level_range: string;
}

const AddLevel = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [module, setModule] = useState<CourseModule | null>(null);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState<AddLevelForm>({
    level_name: "",
    duration: "",
    level_range: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showNotification = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const fetchCourseAndModule = async () => {
    if (!courseId || !moduleId) return;
    
    try {
      const courseData = await courseService.getCourseDetails(parseInt(courseId));
      setCourse(courseData);
      
      const modules = await courseService.getCourseModules(parseInt(courseId));
      const currentModule = modules.find(m => m.id === parseInt(moduleId));
      if (currentModule) {
        setModule(currentModule);
      }
    } catch (error) {
      console.error("Error fetching course and module:", error);
      showNotification(
        "error",
        "Error",
        "Failed to fetch course and module details"
      );
    } finally {
      setCourseLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseAndModule();
  }, [courseId, moduleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleId) return;
    
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        getCourseManagementUrl(`/modules/${moduleId}/levels`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        showNotification(
          "success",
          "Level Added",
          "Level has been added successfully!"
        );
        setFormData({
          level_name: "",
          duration: "",
          level_range: "",
        });
        setTimeout(() => {
          navigate(`/hr/course-management/${courseId}/${moduleId}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          "Error",
          errorData.message || "Failed to add level"
        );
      }
    } catch (error) {
      console.error("Error adding level:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while adding the level"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    if (courseId && moduleId) {
      navigate(`/hr/course-management/${courseId}/${moduleId}`);
    } else if (courseId) {
      navigate(`/hr/course-management/${courseId}`);
    } else {
      navigate("/hr/course-management");
    }
  };

  if (!isLoggedIn || user?.role !== "hr") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You need to be logged in as HR to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading course and module details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Module
          </button>
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Add Level to Module
            </h1>
          </div>
          {course && module && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Course: {course.name}
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">{course.description}</p>
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Module: {module.name}
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">{module.duration}</p>
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400">
            Add a new level to the module with all necessary details.
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Level Name */}
            <div>
              <label
                htmlFor="level_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Level Name *
              </label>
              <input
                type="text"
                id="level_name"
                name="level_name"
                value={formData.level_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="e.g., Beginner Level, Intermediate Level, Expert Level"
              />
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="e.g., 13 weeks"
              />
            </div>

            {/* Level Range */}
            <div>
              <label
                htmlFor="level_range"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Level Range
              </label>
              <input
                type="text"
                id="level_range"
                name="level_range"
                value={formData.level_range}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="e.g., Beginner to Intermediate, Intermediate to Expert"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleBackClick}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {loading ? "Adding..." : "Add Level"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, isOpen: false })}
      />
    </div>
  );
};

export default AddLevel; 