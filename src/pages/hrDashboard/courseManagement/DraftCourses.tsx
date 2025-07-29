import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Edit,
  Eye,
  Trash2,
  Plus,
  Search,
  Loader2,
  AlertCircle,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useAuth } from '../../../components/AuthContext';
import NotificationPopup from '../../../components/ui/NotificationPopup';
import { Course } from '../../../services/courseService';

const DraftCourses: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [draftCourses, setDraftCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    courseId: number | null;
    courseName: string;
    step: 1 | 2;
  }>({
    isOpen: false,
    courseId: null,
    courseName: "",
    step: 1,
  });
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

  const fetchDraftCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses?status=draft`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const coursesData = Array.isArray(result.data) ? result.data : [];
        setDraftCourses(coursesData);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch draft courses");
      }
    } catch (error) {
      console.error("Error fetching draft courses:", error);
      showNotification("error", "Error", "Failed to fetch draft courses");
      setDraftCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDraftCourses();
  }, []);

  const handleEditCourse = (courseId: number) => {
    navigate(`/hr/course-management/builder/${courseId}`);
  };

  const handleViewCourse = (courseId: number) => {
    navigate(`/hr/course-management/${courseId}`);
  };

  const handleDeleteCourse = (courseId: number, courseName: string) => {
    setDeleteConfirmation({
      isOpen: true,
      courseId,
      courseName,
      step: 1,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.step === 1) {
      // First confirmation - move to step 2
      setDeleteConfirmation(prev => ({ ...prev, step: 2 }));
    } else {
      // Second confirmation - actually delete the course
      performDelete();
    }
  };

  const performDelete = async () => {
    if (!deleteConfirmation.courseId) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${deleteConfirmation.courseId}`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        showNotification("success", "Success", "Draft course deleted successfully");
        fetchDraftCourses(); // Refresh the list
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      showNotification("error", "Error", "Failed to delete course");
    } finally {
      setDeleteConfirmation({
        isOpen: false,
        courseId: null,
        courseName: "",
        step: 1,
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      courseId: null,
      courseName: "",
      step: 1,
    });
  };

  const handleCreateNewCourse = () => {
    navigate('/hr/course-management/create');
  };

  const filteredDrafts = draftCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Draft Courses
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your incomplete courses and continue editing them
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/hr/course-management')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to All Courses
              </button>
              <button
                onClick={handleCreateNewCourse}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Course
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search draft courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Draft Courses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Draft Courses ({filteredDrafts.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading draft courses...</p>
            </div>
          ) : filteredDrafts.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No draft courses found" : "No draft courses"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "All your courses are published or you haven't created any yet"
                }
              </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateNewCourse}
                  className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Course
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredDrafts.map((course) => (
                <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <BookOpen className="w-5 h-5 text-yellow-600 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.name}
                        </h3>
                        <span className="ml-3 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Draft
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{course.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">Level Range: {course.level_range || 'Not set'}</span>
                        <span>Last Updated: {new Date(course.updated_at || course.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditCourse(course.id)}
                        className="flex items-center px-3 py-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Continue Editing
                      </button>
                      <button
                        onClick={() => handleViewCourse(course.id)}
                        className="flex items-center px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id, course.name)}
                        className="flex items-center px-3 py-1 text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {deleteConfirmation.step === 1 ? 'Delete Draft Course?' : 'Final Confirmation'}
                  </h3>
                </div>
                <button
                  onClick={handleCancelDelete}
                  className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                {deleteConfirmation.step === 1 ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Are you sure you want to delete the draft course <strong>"{deleteConfirmation.courseName}"</strong>?
                    </p>
                    <p className="text-sm text-gray-500">
                      This action will permanently remove the course and all its associated data (modules, levels, topics, and subpoints).
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-red-600 mb-4">
                      <strong>Warning:</strong> This is your final confirmation to delete the draft course <strong>"{deleteConfirmation.courseName}"</strong>.
                    </p>
                    <p className="text-sm text-red-500">
                      This action cannot be undone. All course data will be permanently deleted.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    deleteConfirmation.step === 1
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-red-800 hover:bg-red-900'
                  }`}
                >
                  {deleteConfirmation.step === 1 ? 'Delete Draft Course' : 'Confirm Delete'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DraftCourses; 