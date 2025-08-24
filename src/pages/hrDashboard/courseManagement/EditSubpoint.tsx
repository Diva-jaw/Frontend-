import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Loader2,
  List,
  Edit,
} from "lucide-react";
import { useAuth } from "../../../components/AuthContext";
import NotificationPopup from "../../../components/ui/NotificationPopup";
import { getCourseManagementUrl } from "../../../utils/apiHelper";

interface EditSubpointForm {
  subpoint: string;
}

interface Subpoint {
  id: number;
  subpoint: string;
  topic_id?: number;
}

const EditSubpoint = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, topicId, subpointId } = useParams<{ courseId: string; moduleId: string; topicId: string; subpointId: string }>();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [subpointLoading, setSubpointLoading] = useState(true);
  const [subpoint, setSubpoint] = useState<Subpoint | null>(null);
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

  const [formData, setFormData] = useState<EditSubpointForm>({
    subpoint: "",
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

  const fetchSubpointDetails = async () => {
    if (!subpointId) return;
    
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        getCourseManagementUrl(`/subpoints/${subpointId}`),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const subpointData = await response.json();
        setSubpoint(subpointData.data);
        setFormData({
          subpoint: subpointData.data.subpoint || "",
        });
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          "Error",
          errorData.message || "Failed to fetch subpoint details"
        );
      }
    } catch (error) {
      console.error("Error fetching subpoint details:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while fetching subpoint details"
      );
    } finally {
      setSubpointLoading(false);
    }
  };

  useEffect(() => {
    fetchSubpointDetails();
  }, [subpointId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subpointId) return;
    
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        getCourseManagementUrl(`/subpoints/${subpointId}`),
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
          "Subpoint Updated",
          "Subpoint has been updated successfully!"
        );
        setTimeout(() => {
          navigate(`/hr/course-management/${courseId}/${moduleId}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          "Error",
          errorData.message || "Failed to update subpoint"
        );
      }
    } catch (error) {
      console.error("Error updating subpoint:", error);
      showNotification(
        "error",
        "Error",
        "An unexpected error occurred while updating the subpoint"
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

  if (subpointLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading subpoint details...</p>
        </div>
      </div>
    );
  }

  if (!subpoint) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Subpoint Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The subpoint you're trying to edit doesn't exist.
          </p>
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
            <Edit className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Edit Subpoint
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Update the subpoint details below.
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subpoint Content */}
            <div>
              <label
                htmlFor="subpoint"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Subpoint Content *
              </label>
              <textarea
                id="subpoint"
                name="subpoint"
                value={formData.subpoint}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter the subpoint content..."
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
                {loading ? "Updating..." : "Update Subpoint"}
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

export default EditSubpoint; 