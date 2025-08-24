import { getApiUrl } from '../config/api';

/**
 * Helper function to construct API URLs for course management endpoints
 * This replaces hardcoded localhost URLs with centralized configuration
 */
export const getCourseManagementUrl = (endpoint: string) => {
  return getApiUrl(`/api/course-management${endpoint}`);
};

/**
 * Helper function to construct API URLs for application endpoints
 * This replaces hardcoded localhost URLs with centralized configuration
 */
export const getApplicationUrl = (endpoint: string) => {
  return getApiUrl(`/application${endpoint}`);
};

/**
 * Helper function to construct API URLs for user endpoints
 * This replaces hardcoded localhost URLs with centralized configuration
 */
export const getUserUrl = (endpoint: string) => {
  return getApiUrl(`/api/user${endpoint}`);
};

/**
 * Helper function to construct API URLs for course endpoints
 * This replaces hardcoded localhost URLs with centralized configuration
 */
export const getCourseUrl = (endpoint: string) => {
  return getApiUrl(`/api/courses${endpoint}`);
};
