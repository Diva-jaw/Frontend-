import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../components/AuthContext';
import NotificationPopup from '../../../components/ui/NotificationPopup';

interface CourseFormData {
  name: string;
  description: string;
  level_range: string;
  status: 'draft' | 'published';
}

interface CourseStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
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

  const [formData, setFormData] = useState<CourseFormData>({
    name: '',
    description: '',
    level_range: '',
    status: 'draft'
  });

  const [steps] = useState<CourseStep[]>([
    {
      id: 1,
      title: 'Course Information',
      description: 'Basic course details',
      completed: false
    },
    {
      id: 2,
      title: 'Course Description',
      description: 'Detailed course description',
      completed: false
    },
    {
      id: 3,
      title: 'Level Range',
      description: 'Target skill level',
      completed: false
    },
    {
      id: 4,
      title: 'Review & Publish',
      description: 'Final review and publish',
      completed: false
    }
  ]);

  // Check if we're editing an existing course
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
      setIsEditMode(true);
      fetchCourseForEdit(parseInt(editId));
    }
  }, []);

  const fetchCourseForEdit = async (id: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const course = result.data;
        setFormData({
          name: course.name || '',
          description: course.description || '',
          level_range: course.level_range || '',
          status: course.status || 'draft'
        });
        setCourseId(id);
        updateStepCompletion();
      } else {
        showNotification("error", "Error", "Failed to fetch course details");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      showNotification("error", "Error", "Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const updateStepCompletion = () => {
    const updatedSteps = steps.map(step => ({
      ...step,
      completed: 
        (step.id === 1 && formData.name) ||
        (step.id === 2 && formData.description) ||
        (step.id === 3 && formData.level_range) ||
        (step.id === 4 && formData.name && formData.description && formData.level_range)
    }));
    // Note: We can't update steps state directly, but we can track completion in formData
  };

  const handleInputChange = (field: keyof CourseFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveAsDraft = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      
      const url = courseId 
        ? `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${courseId}`
        : `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses`;
      
      const method = courseId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          status: 'draft'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (!courseId) {
          setCourseId(result.data.id);
        }
        showNotification("success", "Success", "Course saved as draft");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save course");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      showNotification("error", "Error", "Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      // Save current progress
      await saveAsDraft();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const url = courseId 
        ? `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${courseId}`
        : `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses`;
      
      const method = courseId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          status: 'published'
        }),
      });

      if (response.ok) {
        showNotification("success", "Success", "Course published successfully!");
        navigate('/hr/course-management');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to publish course");
      }
    } catch (error) {
      console.error("Error publishing course:", error);
      showNotification("error", "Error", "Failed to publish course");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course name"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter detailed course description"
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level Range *
              </label>
              <select
                value={formData.level_range}
                onChange={(e) => handleInputChange('level_range', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select level range</option>
                <option value="Beginner">Beginner</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Intermediate to Expert">Intermediate to Expert</option>
                <option value="Expert">Expert</option>
                <option value="Beginner to Expert">Beginner to Expert</option>
              </select>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Course Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Course Name</label>
                  <p className="text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Description</label>
                  <p className="text-gray-900">{formData.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Level Range</label>
                  <p className="text-gray-900">{formData.level_range}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.description.trim() !== '';
      case 3:
        return formData.level_range !== '';
      case 4:
        return formData.name && formData.description && formData.level_range;
      default:
        return false;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Course' : 'Create New Course'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEditMode ? 'Update course details' : 'Set up your course step by step'}
              </p>
            </div>
            <button
              onClick={() => navigate('/hr/course-management')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              ← Back to Courses
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep > step.id 
                    ? 'bg-green-500 border-green-500 text-white'
                    : currentStep === step.id
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {renderStepContent()}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              <button
                onClick={saveAsDraft}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
            </div>

            <div className="flex space-x-3">
              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={!isStepValid() || loading}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Publishing...' : 'Publish Course'}
                </button>
              )}
            </div>
          </div>
        </div>
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

export default CreateCourse; 