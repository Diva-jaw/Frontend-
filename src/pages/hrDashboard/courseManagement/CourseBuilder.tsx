import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Layers,
  TrendingUp,
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../../components/AuthContext';
import NotificationPopup from '../../../components/ui/NotificationPopup';

interface CourseData {
  id?: number;
  name: string;
  description: string;
  level_range: string;
  status: 'draft' | 'published';
}

interface ModuleData {
  id?: number;
  name: string;
  duration: string;
  has_levels: boolean;
}

interface LevelData {
  id?: number;
  level_name: string;
  duration: string;
  level_range: string;
}

interface TopicData {
  id?: number;
  topic_title: string;
  description: string;
  level_id?: number;
}

interface SubpointData {
  id?: number;
  subpoint: string;
}

interface CourseBuilderStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const CourseBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user, isLoggedIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Course data
  const [courseData, setCourseData] = useState<CourseData>({
    name: '',
    description: '',
    level_range: '',
    status: 'draft'
  });

  // Modules data
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [currentModule, setCurrentModule] = useState<ModuleData>({
    name: '',
    duration: '',
    has_levels: true
  });

  // Levels data - maintain levels per module
  const [levelsByModule, setLevelsByModule] = useState<{ [moduleId: number]: LevelData[] }>({});
  const [currentLevel, setCurrentLevel] = useState<LevelData>({
    level_name: '',
    duration: '',
    level_range: ''
  });

  // Topics data - maintain topics per module
  const [topicsByModule, setTopicsByModule] = useState<{ [moduleId: number]: TopicData[] }>({});
  const [currentTopic, setCurrentTopic] = useState<TopicData>({
    topic_title: '',
    description: ''
  });

  // Subpoints data - maintain subpoints per topic
  const [subpointsByTopic, setSubpointsByTopic] = useState<{ [topicId: number]: SubpointData[] }>({});
  const [currentSubpoint, setCurrentSubpoint] = useState<SubpointData>({
    subpoint: ''
  });

  // Selection states
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  // Helper function to get current levels for selected module
  const getCurrentLevels = (): LevelData[] => {
    if (!selectedModuleId) return [];
    return levelsByModule[selectedModuleId] || [];
  };

  // Helper function to get current topics for selected module
  const getCurrentTopics = (): TopicData[] => {
    if (!selectedModuleId) return [];
    return topicsByModule[selectedModuleId] || [];
  };

  // Helper function to get current subpoints for selected topic
  const getCurrentSubpoints = (): SubpointData[] => {
    if (!selectedTopicId) return [];
    return subpointsByTopic[selectedTopicId] || [];
  };

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

  const [steps] = useState<CourseBuilderStep[]>([
    { id: 1, title: 'Course Information', description: 'Basic course details', completed: false },
    { id: 2, title: 'Course Modules', description: 'Add course modules', completed: false },
    { id: 3, title: 'Module Levels', description: 'Add levels to modules', completed: false },
    { id: 4, title: 'Module Topics', description: 'Add topics to modules', completed: false },
    { id: 5, title: 'Topic Subpoints', description: 'Add subpoints to topics', completed: false },
    { id: 6, title: 'Review & Publish', description: 'Final review and publish', completed: false }
  ]);

  const showNotification = (type: "success" | "error", title: string, message: string) => {
    setNotification({ isOpen: true, type, title, message });
  };

  // Load existing course data if editing
  useEffect(() => {
    if (courseId) {
      setIsEditMode(true);
      loadCourseData(parseInt(courseId));
    }
  }, [courseId]);

  // Load draft data if available
  useEffect(() => {
    if (courseData.id) {
      const draftKey = `course_draft_${courseData.id}`;
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft);
          // Restore draft data
          if (draftData.modules) setModules(draftData.modules);
          if (draftData.levels) setLevelsByModule(draftData.levels);
          if (draftData.topics) setTopicsByModule(draftData.topics);
          if (draftData.subpoints) setSubpointsByTopic(draftData.subpoints);
        } catch (error) {
          console.error("Error loading draft data:", error);
        }
      }
    }
  }, [courseData.id]);

  // Fetch modules when course is loaded
  useEffect(() => {
    if (courseData.id) {
      fetchModules();
    }
  }, [courseData.id]);

  // Fetch levels and topics when module selection changes
  useEffect(() => {
    if (selectedModuleId) {
      fetchLevels(selectedModuleId);
      fetchTopics(selectedModuleId);
    }
  }, [selectedModuleId]);

  // Auto-save draft when data changes (after a delay)
  useEffect(() => {
    if (courseData.id && (modules.length > 0 || Object.values(levelsByModule).flat().length > 0 || 
        Object.values(topicsByModule).flat().length > 0 || Object.values(subpointsByTopic).flat().length > 0)) {
      const timeoutId = setTimeout(() => {
        saveDraft(true);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [modules, levelsByModule, topicsByModule, subpointsByTopic]);

  const loadCourseData = async (id: number) => {
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
        setCourseData({
          id: course.id,
          name: course.name,
          description: course.description,
          level_range: course.level_range,
          status: course.status
        });
        
        // Load modules, levels, topics, subpoints
        if (result.data.modules) {
          setModules(result.data.modules.map((m: any) => ({
            id: m.id,
            name: m.name,
            duration: m.duration,
            has_levels: m.has_levels
          })));
        }
      }
    } catch (error) {
      console.error("Error loading course:", error);
      showNotification("error", "Error", "Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    if (!courseData.id) return;
    
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${courseData.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const modules = result.data.modules || [];
        setModules(modules);
        if (modules.length > 0 && !selectedModuleId) {
          setSelectedModuleId(modules[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const fetchLevels = async (moduleId: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/modules/${moduleId}/levels`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setLevelsByModule(prev => ({
          ...prev,
          [moduleId]: result.data || []
        }));
        if (result.data && result.data.length > 0 && !selectedLevelId) {
          setSelectedLevelId(result.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching levels:", error);
      setLevelsByModule(prev => ({
        ...prev,
        [moduleId]: []
      }));
    }
  };

  const fetchTopics = async (moduleId: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/modules/${moduleId}/topics`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setTopicsByModule(prev => ({
          ...prev,
          [moduleId]: result.data || []
        }));
        if (result.data && result.data.length > 0 && !selectedTopicId) {
          setSelectedTopicId(result.data[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      setTopicsByModule(prev => ({
        ...prev,
        [moduleId]: []
      }));
    }
  };

  const saveCourse = async (publish = false) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");
      
      // Validate required fields for course
      if (!courseData.name.trim() || !courseData.description.trim() || !courseData.level_range) {
        showNotification("error", "Error", "Please fill in all required course fields");
        return;
      }
      
      const url = courseData.id 
        ? `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${courseData.id}`
        : `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses`;
      
      const method = courseData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: courseData.name,
          description: courseData.description,
          level_range: courseData.level_range,
          status: publish ? 'published' : 'draft'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (!courseData.id) {
          setCourseData(prev => ({ ...prev, id: result.data.id }));
        }
        
        if (publish) {
          showNotification("success", "Success", "Course published successfully!");
          navigate('/hr/course-management');
        } else {
          showNotification("success", "Success", "Course saved as draft! You can now add modules.");
        }
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

  // Save complete draft with all data
  const saveDraft = async (isAutoSave = false) => {
    try {
      if (isAutoSave) {
        setAutoSaving(true);
      } else {
        setSaving(true);
      }
      
      const token = localStorage.getItem("authToken");
      
      // First save/update the course
      if (!courseData.id) {
        await saveCourse(false);
        return; // Return here as saveCourse will handle the notification
      }
      
      // Prepare complete draft data
      const draftData = {
        course: courseData,
        modules: modules,
        levels: levelsByModule,
        topics: topicsByModule,
        subpoints: subpointsByTopic
      };
      
      // Save draft data to localStorage for persistence
      localStorage.setItem(`course_draft_${courseData.id}`, JSON.stringify(draftData));
      
      if (!isAutoSave) {
        showNotification("success", "Success", "Draft saved successfully! All your progress has been saved.");
      }
      
    } catch (error) {
      console.error("Error saving draft:", error);
      if (!isAutoSave) {
        showNotification("error", "Error", "Failed to save draft");
      }
    } finally {
      if (isAutoSave) {
        setAutoSaving(false);
      } else {
        setSaving(false);
      }
    }
  };

  const addModule = async () => {
    if (!currentModule.name.trim()) {
      showNotification("error", "Error", "Module name is required");
      return;
    }

    if (!courseData.id) {
      showNotification("error", "Error", "Please save the course first before adding modules");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses/${courseData.id}/modules`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentModule),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const newModule = { ...currentModule, id: result.data.id };
        setModules(prev => [...prev, newModule]);
        setSelectedModuleId(newModule.id);
        setCurrentModule({ name: '', duration: '', has_levels: true });
        showNotification("success", "Success", "Module added successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add module");
      }
    } catch (error) {
      console.error("Error adding module:", error);
      showNotification("error", "Error", "Failed to add module");
    }
  };

  const addLevel = async (moduleId: number) => {
    if (!currentLevel.level_name.trim()) {
      showNotification("error", "Error", "Level name is required");
      return;
    }

    if (!moduleId) {
      showNotification("error", "Error", "Please add a module first");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/modules/${moduleId}/levels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentLevel),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const newLevel = { ...currentLevel, id: result.data.id };
        setLevelsByModule(prev => ({
          ...prev,
          [moduleId]: [...(prev[moduleId] || []), newLevel]
        }));
        setSelectedLevelId(newLevel.id);
        setCurrentLevel({ level_name: '', duration: '', level_range: '' });
        showNotification("success", "Success", "Level added successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add level");
      }
    } catch (error) {
      console.error("Error adding level:", error);
      showNotification("error", "Error", "Failed to add level");
    }
  };

  const addTopic = async (moduleId: number) => {
    if (!currentTopic.topic_title.trim()) {
      showNotification("error", "Error", "Topic title is required");
      return;
    }

    if (!moduleId) {
      showNotification("error", "Error", "Please add a module first");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const topicData = {
        ...currentTopic,
        level_id: selectedLevelId || null
      };
      
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/modules/${moduleId}/topics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(topicData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const newTopic: TopicData = { 
          ...currentTopic, 
          id: result.data.id, 
          level_id: selectedLevelId || undefined 
        };
        setTopicsByModule(prev => ({
          ...prev,
          [moduleId]: [...(prev[moduleId] || []), newTopic]
        }));
        setSelectedTopicId(newTopic.id || null);
        setCurrentTopic({ topic_title: '', description: '' });
        showNotification("success", "Success", "Topic added successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add topic");
      }
    } catch (error) {
      console.error("Error adding topic:", error);
      showNotification("error", "Error", "Failed to add topic");
    }
  };

  const addSubpoint = async (topicId: number) => {
    if (!currentSubpoint.subpoint.trim()) {
      showNotification("error", "Error", "Subpoint content is required");
      return;
    }

    if (!topicId) {
      showNotification("error", "Error", "Please add a topic first");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/topics/${topicId}/subpoints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(currentSubpoint),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const newSubpoint = { ...currentSubpoint, id: result.data.id };
        setSubpointsByTopic(prev => ({
          ...prev,
          [topicId]: [...(prev[topicId] || []), newSubpoint]
        }));
        setCurrentSubpoint({ subpoint: '' });
        showNotification("success", "Success", "Subpoint added successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add subpoint");
      }
    } catch (error) {
      console.error("Error adding subpoint:", error);
      showNotification("error", "Error", "Failed to add subpoint");
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      // Save current progress
      await saveCourse(false);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    await saveCourse(true);
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
                value={courseData.name}
                onChange={(e) => setCourseData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                value={courseData.description}
                onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter detailed course description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level Range *
              </label>
              <select
                value={courseData.level_range}
                onChange={(e) => setCourseData(prev => ({ ...prev, level_range: e.target.value }))}
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

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {!courseData.id ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <h3 className="text-lg font-semibold text-yellow-800">Course Not Saved</h3>
                </div>
                <p className="text-yellow-700 mt-2">
                  Please save the course first before adding modules. Click "Save Draft" to continue.
                </p>
                <button
                  onClick={() => saveCourse(false)}
                  className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Course First
                </button>
              </div>
            ) : (
              <>
                {/* Course Context */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Course Context</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-700">Course:</span>
                      <p className="text-blue-900">{courseData.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700">Status:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        courseData.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {courseData.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-green-800">Course Saved!</h3>
                  </div>
                  <p className="text-green-700 mt-1">
                    Your course has been saved. You can now add modules to this course.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Add Module to Course</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Module Name *
                      </label>
                      <input
                        type="text"
                        value={currentModule.name}
                        onChange={(e) => setCurrentModule(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter module name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={currentModule.duration}
                        onChange={(e) => setCurrentModule(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 4 weeks"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={currentModule.has_levels}
                        onChange={(e) => setCurrentModule(prev => ({ ...prev, has_levels: e.target.checked }))}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Has Levels
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={addModule}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Module to Course
                  </button>
                </div>

                {modules.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Modules in Course</h3>
                    <div className="space-y-2">
                      {modules.map((module, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                          <div>
                            <h4 className="font-medium">{module.name}</h4>
                            <p className="text-sm text-gray-600">{module.duration}</p>
                            <p className="text-xs text-blue-600 mt-1">
                              Course: {courseData.name}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Course and Module Context */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Course Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Course:</span>
                  <p className="text-green-900">{courseData.name}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Selected Module:</span>
                  <p className="text-green-900">{modules.find(m => m.id === selectedModuleId)?.name || 'No module selected'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add Level to Module</h3>
              
              {/* Module Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Module *
                </label>
                <select
                  value={selectedModuleId || ''}
                  onChange={(e) => {
                    const moduleId = parseInt(e.target.value);
                    setSelectedModuleId(moduleId);
                    if (moduleId) {
                      fetchLevels(moduleId);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a module</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level Name *
                  </label>
                  <input
                    type="text"
                    value={currentLevel.level_name}
                    onChange={(e) => setCurrentLevel(prev => ({ ...prev, level_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Beginner Level"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={currentLevel.duration}
                    onChange={(e) => setCurrentLevel(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 4 weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level Range
                  </label>
                  <input
                    type="text"
                    value={currentLevel.level_range}
                    onChange={(e) => setCurrentLevel(prev => ({ ...prev, level_range: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Beginner to Intermediate"
                  />
                </div>
              </div>
              <button
                onClick={() => selectedModuleId ? addLevel(selectedModuleId) : showNotification("error", "Error", "Please select a module first")}
                disabled={!selectedModuleId}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Level to Module
              </button>
            </div>

            {getCurrentLevels().length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Levels in Selected Module</h3>
                <div className="space-y-2">
                  {getCurrentLevels().map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <div>
                        <h4 className="font-medium">{level.level_name}</h4>
                        <p className="text-sm text-gray-600">{level.duration} • {level.level_range}</p>
                        <p className="text-xs text-green-600 mt-1">
                          Module: {modules.find(m => m.id === selectedModuleId)?.name}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Course and Module Context */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Course Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700">Course:</span>
                  <p className="text-blue-900">{courseData.name}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Selected Module:</span>
                  <p className="text-blue-900">{modules.find(m => m.id === selectedModuleId)?.name || 'No module selected'}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Selected Level:</span>
                  <p className="text-blue-900">{getCurrentLevels().find(l => l.id === selectedLevelId)?.level_name || 'No level selected'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add Topic to Module</h3>
              
              {/* Module Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Module *
                </label>
                <select
                  value={selectedModuleId || ''}
                  onChange={(e) => {
                    const moduleId = parseInt(e.target.value);
                    setSelectedModuleId(moduleId);
                    if (moduleId) {
                      fetchLevels(moduleId);
                      fetchTopics(moduleId);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a module</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Level (Optional)
                </label>
                <select
                  value={selectedLevelId || ''}
                  onChange={(e) => setSelectedLevelId(parseInt(e.target.value) || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No level (topic for entire module)</option>
                  {getCurrentLevels().map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Title *
                  </label>
                  <input
                    type="text"
                    value={currentTopic.topic_title}
                    onChange={(e) => setCurrentTopic(prev => ({ ...prev, topic_title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter topic title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={currentTopic.description}
                    onChange={(e) => setCurrentTopic(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter topic description"
                  />
                </div>
              </div>
              <button
                onClick={() => selectedModuleId ? addTopic(selectedModuleId) : showNotification("error", "Error", "Please select a module first")}
                disabled={!selectedModuleId}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Topic to Module
              </button>
            </div>

            {getCurrentTopics().length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Topics in Selected Module</h3>
                <div className="space-y-2">
                  {getCurrentTopics().map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <div>
                        <h4 className="font-medium">{topic.topic_title}</h4>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          Module: {modules.find(m => m.id === selectedModuleId)?.name} • 
                          Level: {topic.level_id ? getCurrentLevels().find(l => l.id === topic.level_id)?.level_name : 'Module Level'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Course, Module, Level, and Topic Context */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Course Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Course:</span>
                  <p className="text-green-900">{courseData.name}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Selected Module:</span>
                  <p className="text-green-900">{modules.find(m => m.id === selectedModuleId)?.name || 'No module selected'}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Selected Level:</span>
                  <p className="text-green-900">{getCurrentLevels().find(l => l.id === selectedLevelId)?.level_name || 'No level selected'}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Selected Topic:</span>
                  <p className="text-green-900">{getCurrentTopics().find(t => t.id === selectedTopicId)?.topic_title || 'No topic selected'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Add Subpoint to Topic</h3>
              
              {/* Module Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Module *
                </label>
                <select
                  value={selectedModuleId || ''}
                  onChange={(e) => {
                    const moduleId = parseInt(e.target.value);
                    setSelectedModuleId(moduleId);
                    if (moduleId) {
                      fetchLevels(moduleId);
                      fetchTopics(moduleId);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a module</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Topic *
                </label>
                <select
                  value={selectedTopicId || ''}
                  onChange={(e) => setSelectedTopicId(parseInt(e.target.value) || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a topic</option>
                                    {getCurrentTopics().map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.topic_title} {topic.level_id ? `(${getCurrentLevels().find(l => l.id === topic.level_id)?.level_name})` : '(Module Level)'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subpoint Content *
                </label>
                <textarea
                  value={currentSubpoint.subpoint}
                  onChange={(e) => setCurrentSubpoint(prev => ({ ...prev, subpoint: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subpoint content"
                />
              </div>
              <button
                onClick={() => selectedTopicId ? addSubpoint(selectedTopicId) : showNotification("error", "Error", "Please select a topic first")}
                disabled={!selectedTopicId}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Subpoint to Topic
              </button>
            </div>

            {getCurrentSubpoints().length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Subpoints in Selected Topic</h3>
                <div className="space-y-2">
                  {getCurrentSubpoints().map((subpoint, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm">{subpoint.subpoint}</p>
                        <p className="text-xs text-green-600 mt-1">
                          Topic: {getCurrentTopics().find(t => t.id === selectedTopicId)?.topic_title} • 
                          Module: {modules.find(m => m.id === selectedModuleId)?.name} • 
                          Level: {getCurrentTopics().find(t => t.id === selectedTopicId)?.level_id ? 
                            getCurrentLevels().find(l => l.id === getCurrentTopics().find(t => t.id === selectedTopicId)?.level_id)?.level_name : 'Module Level'}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Course Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-800">Course Overview</h3>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700">Course Name</label>
                  <p className="text-blue-900 font-medium">{courseData.name || 'Not set'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700">Level Range</label>
                  <p className="text-blue-900">{courseData.level_range || 'Not set'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-blue-700">Description</label>
                  <p className="text-blue-900">{courseData.description || 'No description provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    courseData.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {courseData.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modules Review */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-green-800">Modules ({modules.length})</h3>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
              {modules.length > 0 ? (
                <div className="space-y-3">
                  {modules.map((module, index) => (
                    <div key={module.id} className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{module.name}</h4>
                          <p className="text-sm text-gray-600">Duration: {module.duration}</p>
                          <p className="text-xs text-gray-500">Has Levels: {module.has_levels ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-600">
                            {levelsByModule[module.id || 0]?.length || 0} levels
                          </p>
                          <p className="text-sm text-green-600">
                            {topicsByModule[module.id || 0]?.length || 0} topics
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-700 italic">No modules added yet</p>
              )}
            </div>

            {/* Levels Review */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-purple-800">Levels ({Object.values(levelsByModule).flat().length})</h3>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
              {Object.values(levelsByModule).flat().length > 0 ? (
                <div className="space-y-3">
                  {modules.map((module) => {
                    const moduleLevels = levelsByModule[module.id || 0] || [];
                    if (moduleLevels.length === 0) return null;
                    
                    return (
                      <div key={module.id} className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">{module.name}</h4>
                        <div className="space-y-2">
                          {moduleLevels.map((level, index) => (
                            <div key={level.id} className="ml-4 p-2 bg-gray-50 rounded">
                              <p className="font-medium text-sm">{level.level_name}</p>
                              <p className="text-xs text-gray-600">Duration: {level.duration} • Range: {level.level_range}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-purple-700 italic">No levels added yet</p>
              )}
            </div>

            {/* Topics Review */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-orange-800">Topics ({Object.values(topicsByModule).flat().length})</h3>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
              {Object.values(topicsByModule).flat().length > 0 ? (
                <div className="space-y-3">
                  {modules.map((module) => {
                    const moduleTopics = topicsByModule[module.id || 0] || [];
                    if (moduleTopics.length === 0) return null;
                    
                    return (
                      <div key={module.id} className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">{module.name}</h4>
                        <div className="space-y-2">
                          {moduleTopics.map((topic, index) => {
                            const level = topic.level_id ? 
                              Object.values(levelsByModule).flat().find(l => l.id === topic.level_id) : null;
                            
                            return (
                              <div key={topic.id} className="ml-4 p-2 bg-gray-50 rounded">
                                <p className="font-medium text-sm">{topic.topic_title}</p>
                                <p className="text-xs text-gray-600">{topic.description}</p>
                                <p className="text-xs text-orange-600">
                                  Level: {level ? level.level_name : 'Module Level'}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-orange-700 italic">No topics added yet</p>
              )}
            </div>

            {/* Subpoints Review */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-red-800">Subpoints ({Object.values(subpointsByTopic).flat().length})</h3>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
              {Object.values(subpointsByTopic).flat().length > 0 ? (
                <div className="space-y-3">
                  {modules.map((module) => {
                    const moduleTopics = topicsByModule[module.id || 0] || [];
                    if (moduleTopics.length === 0) return null;
                    
                    return (
                      <div key={module.id} className="bg-white p-4 rounded-lg border">
                        <h4 className="font-medium text-gray-900 mb-2">{module.name}</h4>
                        <div className="space-y-2">
                          {moduleTopics.map((topic) => {
                            const topicSubpoints = subpointsByTopic[topic.id || 0] || [];
                            if (topicSubpoints.length === 0) return null;
                            
                            return (
                              <div key={topic.id} className="ml-4 p-2 bg-gray-50 rounded">
                                <p className="font-medium text-sm text-gray-700">{topic.topic_title}</p>
                                <div className="ml-4 mt-1 space-y-1">
                                  {topicSubpoints.map((subpoint, index) => (
                                    <div key={subpoint.id} className="text-xs text-gray-600">
                                      • {subpoint.subpoint}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-700 italic">No subpoints added yet</p>
              )}
            </div>

            {/* Summary Statistics */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{modules.length}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Object.values(levelsByModule).flat().length}</div>
                  <div className="text-sm text-gray-600">Levels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{Object.values(topicsByModule).flat().length}</div>
                  <div className="text-sm text-gray-600">Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{Object.values(subpointsByTopic).flat().length}</div>
                  <div className="text-sm text-gray-600">Subpoints</div>
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
        return courseData.name.trim() !== '' && courseData.description.trim() !== '' && courseData.level_range !== '';
      case 2:
        return courseData.id; // Only require course to be saved, modules are optional for now
      case 3:
        return courseData.id && modules.length > 0 && Object.values(levelsByModule).flat().length > 0;
      case 4:
        return courseData.id && modules.length > 0; // Topics are optional for now
      case 5:
        return courseData.id && modules.length > 0 && Object.values(topicsByModule).flat().length > 0; // Subpoints are optional for now
      case 6:
        return courseData.name && courseData.description && courseData.level_range && 
               courseData.id && modules.length > 0 && Object.values(levelsByModule).flat().length > 0 && Object.values(topicsByModule).flat().length > 0 && Object.values(subpointsByTopic).flat().length > 0;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? 'Edit Course' : 'Course Builder'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEditMode ? 'Update course details' : 'Build your complete course step by step'}
              </p>
              {autoSaving && (
                <div className="flex items-center mt-2 text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Auto-saving...
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/hr/course-management')}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Courses
              </button>
              
              <button
                onClick={() => navigate('/hr/course-management/drafts')}
                className="flex items-center px-3 py-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-md transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Draft Courses
              </button>
              
              {courseData.id && (
                <button
                  onClick={() => navigate(`/hr/course-management/${courseData.id}`)}
                  className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Course
                </button>
              )}
            </div>
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
                  <div className={`w-12 h-0.5 mx-2 ${
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
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Previous
                </button>
              )}
              <button
                onClick={() => saveDraft(false)}
                disabled={saving || !courseData.id}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
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
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={!isStepValid() || loading}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
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

export default CourseBuilder; 