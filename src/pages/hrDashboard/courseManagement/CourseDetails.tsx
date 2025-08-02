import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  TrendingUp,
  FileText,
  List,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useAuth } from "../../../components/AuthContext";
import NotificationPopup from "../../../components/ui/NotificationPopup";

interface Module {
  id: number;
  name: string;
  duration: string;
  has_levels: boolean;
  levels?: Level[];
}

interface Level {
  id: number;
  level_name: string;
  duration: string;
  level_range: string;
  topics?: Topic[];
}

interface Topic {
  id: number;
  topic_title: string;
  description: string;
  level_id?: number;
  subpoints?: Subpoint[];
}

interface Subpoint {
  id: number;
  subpoint: string;
}

interface CourseDetails {
  id: number;
  name: string;
  description: string;
  level_range: string;
  status: 'draft' | 'published';
  modules: Module[];
}

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
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

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setCourse(result.data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch course details");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      showNotification(
        "error",
        "Error",
        "Failed to fetch course details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const toggleLevel = (levelId: number) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId);
    } else {
      newExpanded.add(levelId);
    }
    setExpandedLevels(newExpanded);
  };

  const toggleTopic = (topicId: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
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

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h2>
          <p className="text-gray-600">
            The course you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/hr/course-management')}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {course.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Course Details and Structure
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/hr/course-management/builder/${course.id}`)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </button>
            </div>
          </div>
        </div>

        {/* Course Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Description</label>
              <p className="text-gray-900 mt-1">{course.description}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Level Range</label>
              <p className="text-gray-900 mt-1">{course.level_range}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                course.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {course.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Course Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Structure</h2>
          
          {course.modules && course.modules.length > 0 ? (
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center">
                      <Layers className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.name}</h3>
                        <p className="text-sm text-gray-600">{module.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {module.levels?.length || 0} levels
                      </span>
                      {expandedModules.has(module.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedModules.has(module.id) && module.levels && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      {module.levels.map((level) => (
                        <div key={level.id} className="border-b border-gray-200 last:border-b-0">
                          <div className="flex items-center justify-between p-4">
                            <div 
                              className="flex items-center flex-1 cursor-pointer hover:bg-gray-100 p-2 rounded"
                              onClick={() => toggleLevel(level.id)}
                            >
                              <TrendingUp className="w-4 h-4 text-green-600 mr-3" />
                              <div>
                                <h4 className="font-medium text-gray-900">{level.level_name}</h4>
                                <p className="text-sm text-gray-600">{level.duration} • {level.level_range}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">
                                {level.topics?.length || 0} topics
                              </span>
                              {expandedLevels.has(level.id) ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </div>

                          {expandedLevels.has(level.id) && level.topics && (
                            <div className="border-t border-gray-200 bg-white">
                              {level.topics.map((topic) => (
                                <div key={topic.id} className="border-b border-gray-200 last:border-b-0">
                                  <div className="flex items-center justify-between p-4">
                                    <div 
                                      className="flex items-center flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                      onClick={() => toggleTopic(topic.id)}
                                    >
                                      <FileText className="w-4 h-4 text-purple-600 mr-3" />
                                      <div>
                                        <h5 className="font-medium text-gray-900">{topic.topic_title}</h5>
                                        <p className="text-sm text-gray-600">{topic.description}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm text-gray-500">
                                        {topic.subpoints?.length || 0} subpoints
                                      </span>
                                      {expandedTopics.has(topic.id) ? (
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-500" />
                                      )}
                                    </div>
                                  </div>

                                  {expandedTopics.has(topic.id) && topic.subpoints && (
                                    <div className="border-t border-gray-200 bg-gray-50">
                                      {topic.subpoints.map((subpoint) => (
                                        <div key={subpoint.id} className="p-4 border-b border-gray-200 last:border-b-0">
                                          <div className="flex items-center">
                                            <List className="w-4 h-4 text-indigo-600 mr-3" />
                                            <p className="text-sm text-gray-900">{subpoint.subpoint}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Modules Added</h3>
              <p className="text-gray-600 mb-4">
                This course doesn't have any modules yet. Add modules to start building the course structure.
              </p>
              <button
                onClick={() => navigate(`/hr/course-management/builder/${course.id}`)}
                className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Modules
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <NotificationPopup
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default CourseDetails; 