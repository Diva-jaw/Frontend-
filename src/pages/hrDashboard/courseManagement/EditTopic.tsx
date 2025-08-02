import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Loader2,
  FileText,
  Edit,
} from "lucide-react";
import { useAuth } from "../../../components/AuthContext";
import NotificationPopup from "../../../components/ui/NotificationPopup";

interface EditTopicForm {
  topic_title: string;
  description: string;
}

interface Topic {
  id: number;
  topic_title: string;
  description: string;
  level_id?: number;
}

const EditTopic = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, topicId } = useParams<{ courseId: string; moduleId: string; topicId: string }>();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [topicLoading, setTopicLoading] = useState(true);
  const [topic, setTopic] = useState<Topic | null>(null);
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

  const [formData, setFormData] = useState<EditTopicForm>({
    topic_title: "",
    description: "",
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

  const fetchTopicDetails = async () => {
    if (!topicId) return;
    
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/topics/${topicId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const topicData = await response.json();
        setTopic(topicData.data);
        setFormData({
          topic_title: topicData.data.topic_title || "",
          description: topicData.data.description || "",
        });
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          "Error",
          errorData.message || "Failed to fetch topic details"
        );
      }
    } catch (error) {
      console.error("Error fetching topic details:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while fetching topic details"
      );
    } finally {
      setTopicLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicDetails();
  }, [topicId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId) return;
    
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/topics/${topicId}`,
        {
          method: "PUT",
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
          "Topic Updated",
          "Topic has been updated successfully!"
        );
        setTimeout(() => {
          navigate(`/hr/course-management/${courseId}/${moduleId}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          "Error",
          errorData.message || "Failed to update topic"
        );
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while updating the topic"
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

  if (topicLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading topic details...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Topic Not Found
          </h2>
          <p className="text-gray-600">
            The topic you're trying to edit doesn't exist.
          </p>
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
            <Edit className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Topic
            </h1>
          </div>
          <p className="text-gray-600">
            Update the topic details below.
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
                placeholder="e.g., Introduction to React Hooks"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the topic content and learning objectives..."
              />
            </div>

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
                {loading ? "Updating..." : "Update Topic"}
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

export default EditTopic; 