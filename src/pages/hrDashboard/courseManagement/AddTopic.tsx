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
  FileText,
} from "lucide-react";
import { useAuth } from "../../../components/AuthContext";
import NotificationPopup from "../../../components/ui/NotificationPopup";
import { courseService, Course, CourseModule, ModuleLevel } from "../../../services/courseService";
import { getCourseManagementUrl } from "../../../utils/apiHelper";

interface AddTopicForm {
  topic_title: string;
  description: string;
  level_id?: number;
}

const AddTopic = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [module, setModule] = useState<CourseModule | null>(null);
  const [levels, setLevels] = useState<ModuleLevel[]>([]);
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

  const [formData, setFormData] = useState<AddTopicForm>({
    topic_title: "",
    description: "",
    level_id: undefined,
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseInt(value) : undefined,
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
        
        // Fetch levels if module has levels
        if (currentModule.has_levels) {
          try {
            const moduleLevels = await courseService.getModuleLevels(parseInt(courseId), parseInt(moduleId));
            setLevels(moduleLevels);
          } catch (error) {
            console.error("Error fetching levels:", error);
          }
        }
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
        getCourseManagementUrl(`/modules/${moduleId}/topics`),
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
          "Topic Added",
          "Topic has been added successfully!"
        );
        setFormData({
          topic_title: "",
          description: "",
          level_id: undefined,
        });
        setTimeout(() => {
          navigate(`/hr/course-management/${courseId}/${moduleId}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          "Error",
          errorData.message || "Failed to add topic"
        );
      }
    } catch (error) {
      console.error("Error adding topic:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while adding the topic"
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You need to be logged in as HR to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading course and module details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Module
          </button>
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Add Topic to Module
            </h1>
          </div>
          {course && module && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Course: {course.name}
              </h3>
              <p className="text-blue-700 text-sm mb-2">{course.description}</p>
              <h4 className="font-semibold text-blue-900 mb-1">
                Module: {module.name}
              </h4>
              <p className="text-blue-700 text-sm">{module.duration}</p>
            </div>
          )}
          <p className="text-gray-600">
            Add a new topic to the module with all necessary details.
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Title */}
            <div>
              <label
                htmlFor="topic_title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Topic Title *
              </label>
              <input
                type="text"
                id="topic_title"
                name="topic_title"
                value={formData.topic_title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter topic title"
              />
            </div>

            {/* Topic Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Topic Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter topic description"
              />
            </div>

            {/* Level Selection (if module has levels) */}
            {module?.has_levels && levels.length > 0 && (
              <div>
                <label
                  htmlFor="level_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Level (Optional)
                </label>
                <select
                  id="level_id"
                  name="level_id"
                  value={formData.level_id || ""}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a level (optional)</option>
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level_name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty if this topic applies to all levels
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleBackClick}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
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
                {loading ? "Adding..." : "Add Topic"}
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

export default AddTopic; 