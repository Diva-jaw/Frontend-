import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Users,
  Clock,
  Star,
  Loader2,
  ChevronRight,
  Mail,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { courseService } from "../../services/courseService";
import {
  Course,
  CourseModule,
  ModuleLevel,
} from "../../services/courseService";
import { useAuth } from "../../components/AuthContext";
import NotificationPopup from "../../components/ui/NotificationPopup";
import { Search } from "lucide-react";

interface EnrolledUser {
  id: number;
  name: string;
  email: string;
  phone_no?: string;
  university?: string;
  department?: string;
  enrollment_status: string;
  enrollment_date: string;
  notes?: string;
  enrollment_id: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const HRCourseManagement = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, levelId } = useParams<{
    courseId?: string;
    moduleId?: string;
    levelId?: string;
  }>();
  const { user, isLoggedIn } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(
    null
  );
  const [levels, setLevels] = useState<ModuleLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<ModuleLevel | null>(null);
  const [enrolledUsers, setEnrolledUsers] = useState<EnrolledUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [sendingEmail, setSendingEmail] = useState<number | null>(null);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<EnrolledUser[]>([]);

  // Get payment status based on enrollment status
  const getPaymentStatus = (status: string) => {
    switch (status) {
      case "requested":
        return {
          text: "Pending",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
      case "contacted":
        return {
          text: "Pending",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
      case "enrolled":
        return {
          text: "Done",
          color: "bg-green-100 text-green-800 border-green-200",
        };
      case "cancelled":
        return {
          text: "Never",
          color: "bg-red-100 text-red-800 border-red-200",
        };
      default:
        return {
          text: "Unknown",
          color: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "enrolled":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Check if email can be sent
  const canSendEmail = (status: string) => {
    return status === "enrolled";
  };

  // Update enrollment status
  const handleStatusUpdate = async (
    enrollmentId: number,
    newStatus: string
  ) => {
    try {
      setUpdatingStatus(enrollmentId);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `/api/courses/enrollments/${enrollmentId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        // Update local state
        setEnrolledUsers((prev) =>
          prev.map((user) =>
            user.enrollment_id === enrollmentId
              ? { ...user, enrollment_status: newStatus }
              : user
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Send congratulatory email
  const handleSendEmail = async (enrollmentId: number) => {
    try {
      setSendingEmail(enrollmentId);
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `/api/courses/hr/enrollments/${enrollmentId}/send-success-email`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update the local state to reflect the status change
        setEnrolledUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.enrollment_id === enrollmentId
              ? { ...user, enrollment_status: "enrolled" }
              : user
          )
        );

        setNotification({
          isOpen: true,
          type: "success",
          title: "Email Sent Successfully!",
          message:
            "The congratulatory email has been sent to the user successfully and their status has been updated to Enrolled.",
        });

        // Refresh the data to ensure consistency
        if (courseId && moduleId && levelId) {
          fetchEnrolledUsers();
        }
      } else {
        const errorData = await response.json();
        setNotification({
          isOpen: true,
          type: "error",
          title: "Failed to Send Email",
          message:
            errorData.error ||
            "An error occurred while sending the email. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setNotification({
        isOpen: true,
        type: "error",
        title: "Network Error",
        message:
          "Failed to send email due to a network error. Please check your connection and try again.",
      });
    } finally {
      setSendingEmail(null);
    }
  };

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await courseService.getAllCourses();
        setCourses(fetchedCourses);

        // Set selected course if courseId is in URL
        if (courseId) {
          const course = fetchedCourses.find(
            (c) => c.id === parseInt(courseId)
          );
          if (course) {
            setSelectedCourse(course);
          }
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [courseId]);

  // Fetch modules when course is selected
  useEffect(() => {
    if (courseId) {
      const fetchModules = async () => {
        try {
          const fetchedModules = await courseService.getCourseModules(
            parseInt(courseId)
          );
          setModules(fetchedModules);

          // Set selected module if moduleId is in URL
          if (moduleId) {
            const module = fetchedModules.find(
              (m) => m.id === parseInt(moduleId)
            );
            if (module) {
              setSelectedModule(module);
            }
          }
        } catch (err) {
          console.error("Error fetching modules:", err);
        }
      };
      fetchModules();
    }
  }, [courseId, moduleId]);

  // Fetch levels when module is selected
  useEffect(() => {
    if (courseId && moduleId) {
      const fetchLevels = async () => {
        try {
          const fetchedLevels = await courseService.getModuleLevels(
            parseInt(courseId),
            parseInt(moduleId)
          );
          setLevels(fetchedLevels);

          // Set selected level if levelId is in URL
          if (levelId) {
            const level = fetchedLevels.find((l) => l.id === parseInt(levelId));
            if (level) {
              setSelectedLevel(level);
            }
          }
        } catch (err) {
          console.error("Error fetching levels:", err);
        }
      };
      fetchLevels();
    }
  }, [courseId, moduleId, levelId]);

  // Fetch enrolled users for the current level
  const fetchEnrolledUsers = async () => {
    if (
      !courseId ||
      !moduleId ||
      !levelId ||
      !isLoggedIn ||
      user?.role !== "hr"
    )
      return;

    try {
      const token = localStorage.getItem("authToken");
      const searchQuery = searchTerm
        ? `&search=${encodeURIComponent(searchTerm)}`
        : "";
      const response = await fetch(
        `/api/courses/hr/enrolled-users/${courseId}/${moduleId}/${levelId}/paginated?page=${currentPage}&limit=10${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEnrolledUsers(data.users);
        setPagination(data.pagination);
      } else {
        console.error(
          "Failed to fetch enrolled users:",
          response.status,
          response.statusText
        );
      }
    } catch (err) {
      console.error("Error fetching enrolled users:", err);
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchEnrolledUsers();
  };

  // Handle search input change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear existing timeout
    if ((window as any).searchTimeout) {
      clearTimeout((window as any).searchTimeout);
    }

    // Set new timeout for debounced search
    (window as any).searchTimeout = setTimeout(() => {
      setCurrentPage(1);
      fetchEnrolledUsers();
    }, 500); // 500ms delay
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    fetchEnrolledUsers();
  };

  // Fetch enrolled users when level is selected
  useEffect(() => {
    fetchEnrolledUsers();
  }, [
    courseId,
    moduleId,
    levelId,
    isLoggedIn,
    user?.role,
    currentPage,
    searchTerm,
  ]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setSelectedModule(null);
    setSelectedLevel(null);
    setEnrolledUsers([]);
    setPagination(null);
    setCurrentPage(1);
    navigate(`/hr/applied-courses/${course.id}`);
  };

  const handleModuleClick = (module: CourseModule) => {
    setSelectedModule(module);
    setSelectedLevel(null);
    setEnrolledUsers([]);
    setPagination(null);
    setCurrentPage(1);
    navigate(`/hr/applied-courses/${courseId}/${module.id}`);
  };

  const handleLevelClick = (level: ModuleLevel) => {
    setSelectedLevel(level);
    setCurrentPage(1);
    navigate(`/hr/applied-courses/${courseId}/${moduleId}/${level.id}`);
  };

  const handleBackClick = () => {
    if (levelId && moduleId) {
      // Go back to modules
      navigate(`/hr/applied-courses/${courseId}`);
    } else if (moduleId) {
      // Go back to courses
      navigate("/hr/applied-courses");
    } else {
      // Go back to HR dashboard
      navigate("/hr");
    }
  };

  // Check if user is authenticated and has HR role
  if (!isLoggedIn || user?.role !== "hr") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in as an HR user to access this page.
          </p>
          <button
            onClick={() => navigate("/hr/signin")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to HR Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:bg-white transition-all duration-200 text-gray-700 hover:text-blue-600"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back</span>
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Course Management
              </h1>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Courses</span>
              {selectedCourse && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-blue-600 font-medium">
                    {selectedCourse.name}
                  </span>
                </>
              )}
              {selectedModule && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-blue-600 font-medium">
                    {selectedModule.name}
                  </span>
                </>
              )}
              {selectedLevel && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-blue-600 font-medium">
                    {selectedLevel.level_name}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {!courseId ? (
          // Show courses
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-blue-100"
                onClick={() => handleCourseClick(course)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {course.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">
                    View Modules
                  </span>
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : !moduleId ? (
          // Show modules
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-green-100"
                onClick={() => handleModuleClick(module)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {module.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {module.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium">
                    View Levels
                  </span>
                  <ChevronRight className="w-5 h-5 text-green-600" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : !levelId ? (
          // Show levels
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-purple-100"
                onClick={() => handleLevelClick(level)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {level.level_name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {level.level_range}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-medium">
                    View Enrollments
                  </span>
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Show enrolled users
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email... (type to search automatically)"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  />
                </div>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2 text-sm text-gray-600">
                  Searching for:{" "}
                  <span className="font-medium">"{searchTerm}"</span>
                </div>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Enrolled Users - {selectedLevel?.level_name}
                {searchTerm && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    (Searching: "{searchTerm}")
                  </span>
                )}
              </h2>

              {enrolledUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    No users enrolled in this level yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          University
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Enrolled Date
                        </th>
                        <th className="text-left py-4 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                          Send Mail
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {enrolledUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">{user.email}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">
                              {user.phone_no || "N/A"}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">
                              {user.university || "N/A"}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">
                              {user.department || "N/A"}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {user.enrollment_status === "cancelled" ? (
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                                  user.enrollment_status
                                )}`}
                              >
                                Cancelled
                              </span>
                            ) : (
                              <select
                                value={user.enrollment_status}
                                onChange={(e) =>
                                  handleStatusUpdate(
                                    user.enrollment_id,
                                    e.target.value
                                  )
                                }
                                disabled={updatingStatus === user.enrollment_id}
                                className={`px-3 py-1 rounded-full text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusBadge(
                                  user.enrollment_status
                                )}`}
                              >
                                <option value="requested">Requested</option>
                                <option value="contacted">Contacted</option>
                                <option value="enrolled">Enrolled</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            )}
                            {updatingStatus === user.enrollment_id && (
                              <Loader2 className="w-4 h-4 animate-spin ml-2 inline" />
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                                getPaymentStatus(user.enrollment_status).color
                              }`}
                            >
                              <DollarSign className="w-3 h-3 mr-1" />
                              {getPaymentStatus(user.enrollment_status).text}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">
                              {new Date(
                                user.enrollment_date
                              ).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() =>
                                handleSendEmail(user.enrollment_id)
                              }
                              disabled={
                                !canSendEmail(user.enrollment_status) ||
                                sendingEmail === user.enrollment_id
                              }
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                                canSendEmail(user.enrollment_status)
                                  ? "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200"
                                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                              }`}
                            >
                              <Mail className="w-3 h-3 mr-1" />
                              {sendingEmail === user.enrollment_id
                                ? "Sending..."
                                : "Send Mail"}
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-700">
                    Showing page {pagination.currentPage} of{" "}
                    {pagination.totalPages}({pagination.totalItems} total users)
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>
                    <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                      {pagination.currentPage}
                    </span>
                    <button
                      onClick={() => setCurrentPage(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={notification.isOpen}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  );
};

export default HRCourseManagement;
