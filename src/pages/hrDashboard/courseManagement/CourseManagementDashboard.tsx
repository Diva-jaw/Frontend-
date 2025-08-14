import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  TrendingUp,
  FileText,
  List,
  Search,
  Loader2,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  AlertTriangle,
  X,
} from "lucide-react";
import { useAuth } from "../../../components/AuthContext";
import NotificationPopup from "../../../components/ui/NotificationPopup";
import { courseService, Course } from "../../../services/courseService";
import { apiService } from "../../../services/api";

const CourseManagementDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(8);
  const [enrollmentCounts, setEnrollmentCounts] = useState({
    requested: 0,
    enrolled: 0,
    contacted: 0,
    cancelled: 0,
    completed: 0
  });
  
  const [courseEnrollmentCounts, setCourseEnrollmentCounts] = useState<Array<{
    course_id: number;
    course_name: string;
    counts: {
      requested: number;
      enrolled: number;
      contacted: number;
      cancelled: number;
      completed: number;
    };
  }>>([]);
  
  const [countsLoading, setCountsLoading] = useState(true);
  const [courseCountsLoading, setCourseCountsLoading] = useState(true);
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

  const fetchEnrollmentCounts = async () => {
    try {
      setCountsLoading(true);
      const counts = await apiService.getEnrollmentCountsByStatus();
      console.log("Overall enrollment counts:", counts);
      setEnrollmentCounts(counts);
    } catch (error) {
      console.error("Error fetching enrollment counts:", error);
      showNotification(
        "error",
        "Error",
        "Failed to fetch enrollment counts"
      );
    } finally {
      setCountsLoading(false);
    }
  };

  const fetchCourseEnrollmentCounts = async () => {
    try {
      setCourseCountsLoading(true);
      const courseCounts = await apiService.getEnrollmentCountsByCourse();
      console.log("Course enrollment counts:", courseCounts);
      setCourseEnrollmentCounts(courseCounts);
    } catch (error) {
      console.error("Error fetching course enrollment counts:", error);
      showNotification(
        "error",
        "Error",
        "Failed to fetch course enrollment counts"
      );
    } finally {
      setCourseCountsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/course-management/courses`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result); // Debug log
        // Ensure we always set an array, even if the response is unexpected
        const coursesData = Array.isArray(result.data) ? result.data : 
                          Array.isArray(result) ? result : [];
        console.log('Processed courses data:', coursesData); // Debug log
        setCourses(coursesData);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      showNotification(
        "error",
        "Error",
        "Failed to fetch courses"
      );
      // Ensure we always have an array even on error
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollmentCounts();
    fetchCourseEnrollmentCounts();
  }, []);

  const filteredCourses = loading ? [] : (courses || []).filter(course =>
    (course.name && course.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCourse = () => {
    navigate("/hr/course-management/builder");
  };

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
        showNotification("success", "Success", "Course deleted successfully");
        // Refresh the courses list and enrollment counts
        fetchCourses();
        fetchEnrollmentCounts();
        fetchCourseEnrollmentCounts();
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

  // Helper function to get enrollment counts for a specific course
  const getCourseCounts = (courseId: number) => {
    const courseCount = courseEnrollmentCounts.find(c => c.course_id === courseId);
    const counts = courseCount ? courseCount.counts : {
      requested: 0,
      enrolled: 0,
      contacted: 0,
      cancelled: 0,
      completed: 0
    };
    console.log(`Course ${courseId} counts:`, counts);
    return counts;
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Course Management
              </h1>
            </div>
            <button
              onClick={handleCreateCourse}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Course
            </button>
          </div>
          
          {/* Enrollment Count Notifications */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Enrollment Status:</span>
            </div>
            
            {/* Requested - Green */}
            <div className="relative">
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Requested</span>
                {!countsLoading && (
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {enrollmentCounts.requested}
                  </span>
                )}
              </div>
            </div>

            {/* Enrolled - Blue */}
            <div className="relative">
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Enrolled</span>
                {!countsLoading && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {enrollmentCounts.enrolled}
                  </span>
                )}
              </div>
            </div>

            {/* Contacted - Pink */}
            <div className="relative">
              <div className="flex items-center space-x-2 bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Contacted</span>
                {!countsLoading && (
                  <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {enrollmentCounts.contacted}
                  </span>
                )}
              </div>
            </div>

            {/* Loading indicator */}
            {countsLoading && (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                <span className="text-sm text-gray-500">Loading counts...</span>
              </div>
            )}
            
            {/* Refresh button */}
            {!countsLoading && (
              <button
                onClick={() => {
                  fetchEnrollmentCounts();
                  fetchCourseEnrollmentCounts();
                }}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Refresh counts"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-xs">Refresh</span>
              </button>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Manage your courses, modules, levels, topics, and subpoints from one central location.
          </p>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Create Course</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Add a new course to the curriculum
              </p>
              <button
                onClick={handleCreateCourse}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Get Started →
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-2">
                <Edit className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Draft Courses</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Continue editing incomplete courses
              </p>
              <button
                onClick={() => navigate('/hr/course-management/drafts')}
                className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 text-sm font-medium"
              >
                View Drafts →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Courses List */}
                 <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
         >
           <div className="p-6 border-b border-gray-200 dark:border-gray-700">
             <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
               All Courses ({filteredCourses.length})
             </h2>
           </div>

                     {loading ? (
             <div className="p-8 text-center">
               <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
               <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
             </div>
           ) : currentCourses.length === 0 ? (
             <div className="p-8 text-center">
               <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                 {searchTerm ? "No courses found" : "No courses yet"}
               </h3>
               <p className="text-gray-600 dark:text-gray-400 mb-4">
                 {searchTerm 
                   ? "Try adjusting your search terms"
                   : "Get started by creating your first course"
                 }
               </p>
              {!searchTerm && (
                <button
                  onClick={handleCreateCourse}
                  className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Course
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCourses.map((course) => {
                const courseCounts = getCourseCounts(course.id);
                return (
                  <div key={course.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-green-100 dark:border-green-900/30 relative">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl relative">
                        <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                        
                        {/* Enrollment Count Notifications */}
                        {!courseCountsLoading && (
                          <>
                            {/* Requested - Green */}
                            {courseCounts.requested > 0 && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {courseCounts.requested}
                              </div>
                            )}
                            
                            {/* Contacted - Pink */}
                            {courseCounts.contacted > 0 && (
                              <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {courseCounts.contacted}
                              </div>
                            )}
                            
                            {/* Enrolled - Blue */}
                            {courseCounts.enrolled > 0 && (
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {courseCounts.enrolled}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{course.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 dark:text-green-400 font-medium">View Levels</span>
                      <ChevronRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    
                    {/* Course Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'published' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                          : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {course.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                      {course.status === 'draft' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCourse(course.id);
                          }}
                          className="p-1 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                          title="Edit Course"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCourse(course.id);
                        }}
                        className="p-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Course"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCourse(course.id, course.name);
                        }}
                        className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredCourses.length > coursesPerPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-between"
            >
              {/* Results info */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {indexOfFirstCourse + 1} to {Math.min(indexOfLastCourse, filteredCourses.length)} of {filteredCourses.length} courses
              </div>

              {/* Pagination controls */}
              <div className="flex items-center space-x-2">
                {/* First page */}
                <button
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Previous page */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;
                    const isNearCurrent = Math.abs(pageNumber - currentPage) <= 1;
                    const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;

                    // Show page number if it's current, near current, first, or last
                    if (isCurrentPage || isNearCurrent || isFirstOrLast) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                            isCurrentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      // Show ellipsis
                      return (
                        <span key={pageNumber} className="px-2 text-gray-400 dark:text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next page */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last page */}
                <button
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
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
             className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4"
           >
             <div className="p-6">
               <div className="flex items-center mb-4">
                 <div className="flex-shrink-0">
                   <AlertTriangle className="w-6 h-6 text-red-600" />
                 </div>
                 <div className="ml-3">
                   <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                     {deleteConfirmation.step === 1 ? 'Delete Course?' : 'Final Confirmation'}
                   </h3>
                 </div>
                 <button
                   onClick={handleCancelDelete}
                   className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>

               <div className="mb-6">
                 {deleteConfirmation.step === 1 ? (
                   <div>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                       Are you sure you want to delete the course <strong>"{deleteConfirmation.courseName}"</strong>?
                     </p>
                     <p className="text-sm text-gray-500 dark:text-gray-400">
                       This action will permanently remove the course and all its associated data (modules, levels, topics, and subpoints).
                     </p>
                   </div>
                 ) : (
                   <div>
                     <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                       <strong>Warning:</strong> This is your final confirmation to delete the course <strong>"{deleteConfirmation.courseName}"</strong>.
                     </p>
                     <p className="text-sm text-red-500 dark:text-red-400">
                       This action cannot be undone. All course data will be permanently deleted.
                     </p>
                   </div>
                 )}
               </div>

               <div className="flex justify-end space-x-3">
                 <button
                   onClick={handleCancelDelete}
                   className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
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
                   {deleteConfirmation.step === 1 ? 'Delete Course' : 'Confirm Delete'}
                 </button>
               </div>
             </div>
           </motion.div>
         </div>
       )}
    </div>
  );
};

export default CourseManagementDashboard; 