import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { courseService, Course, CourseDetails, CourseModule, ModuleLevel, CourseWithModulesAndLevels } from '../services/courseService';

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  getCourseDetails: (courseId: number) => Promise<CourseDetails | null>;
  getCourseModules: (courseId: number) => Promise<CourseModule[] | null>;
  getModuleLevels: (courseId: number, moduleId: number) => Promise<ModuleLevel[] | null>;
  getAllCoursesWithModulesAndLevels: () => Promise<CourseWithModulesAndLevels[]>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contextError, setContextError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCourses = await courseService.getAllCourses();
      setCourses(fetchedCourses);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch courses';
      console.error('CourseContext: Error fetching courses:', err);
      setError(errorMessage);
      // Don't throw error, just set it in state
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCourseDetails = useCallback(async (courseId: number): Promise<CourseDetails | null> => {
    try {
      setError(null);
      const courseDetails = await courseService.getCourseDetails(courseId);
      return courseDetails;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch course details';
      console.error(`CourseContext: Error fetching course details for ID ${courseId}:`, err);
      setError(errorMessage);
      return null;
    }
  }, []);

  const getCourseModules = useCallback(async (courseId: number): Promise<CourseModule[] | null> => {
    try {
      setError(null);
      const modules = await courseService.getCourseModules(courseId);
      return modules;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch course modules';
      console.error(`CourseContext: Error fetching course modules for ID ${courseId}:`, err);
      setError(errorMessage);
      return null;
    }
  }, []);

  const getModuleLevels = useCallback(async (courseId: number, moduleId: number): Promise<ModuleLevel[] | null> => {
    try {
      setError(null);
      const levels = await courseService.getModuleLevels(courseId, moduleId);
      return levels;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch module levels';
      console.error(`CourseContext: Error fetching module levels for course ID ${courseId}, module ID ${moduleId}:`, err);
      setError(errorMessage);
      return null;
    }
  }, []);

  // Add this function to context
  const getAllCoursesWithModulesAndLevels = useCallback(async (): Promise<CourseWithModulesAndLevels[]> => {
    return courseService.getAllCoursesWithModulesAndLevels();
  }, []);

  useEffect(() => {
    try {
      fetchCourses();
    } catch (err) {
      console.error('CourseContext: Error in useEffect:', err);
      // Don't set context error for network issues, just log it
      // setContextError(err instanceof Error ? err.message : 'Context initialization error');
    }
  }, [fetchCourses]);

  // Error boundary for context - only show for critical errors
  if (contextError && !contextError.includes('Network error') && !contextError.includes('Failed to fetch')) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Course Context Error
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{contextError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const value: CourseContextType = {
    courses,
    loading,
    error,
    fetchCourses,
    getCourseDetails,
    getCourseModules,
    getModuleLevels,
    getAllCoursesWithModulesAndLevels,
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        fetchCourses,
        getCourseDetails,
        getCourseModules,
        getModuleLevels,
        getAllCoursesWithModulesAndLevels,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}; 