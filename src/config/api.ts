// API Configuration for Frontend
const BASE_URL_RAW = import.meta.env.VITE_API_BASE_URL || 'http://3.11.0.0'; // Replace with your actual EC2 IP
// Remove trailing slash to prevent double slashes
const BASE_URL = BASE_URL_RAW.endsWith('/') ? BASE_URL_RAW.slice(0, -1) : BASE_URL_RAW;

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: '/api/auth',
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP: '/api/auth/verify-otp',
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    
    // Form/Upload endpoints - Form routes (candidate enquiry)
    UPLOAD: '/upload',
    HEALTH: '/health',
    
    // Application endpoints - Application routes (job applications)
    APPLICATION_UPLOAD: '/application/upload',
    APPLICATION_HEALTH: '/application/health',
    APPLICATION_SEND_EMAIL: '/application/api/send-email',
    
    // Job endpoints
    JOBS: '/api/jobs',
    
    // Candidate endpoints (enquiry form submissions)
    CANDIDATES: '/api/candidates',
    CANDIDATE_BY_ID: '/candidate',
    CANDIDATES_REJECT: '/api/candidates/{id}/reject',
    CANDIDATES_SEND_ACCEPTANCE: '/api/candidates/send-acceptance',
    
    // Applicant endpoints (job applications)
    APPLICANTS: '/application/api/applicants',
    APPLICANTS_BY_DEPARTMENT: '/application/api/applicants/{department}',
    APPLICANTS_MOVE: '/application/api/applicants/{department}/{applicantId}/move',
    
    // Department-specific applicant endpoints
    ENGINEERING_APPLICANTS: '/application/api/applicants/engineering',
    DESIGN_APPLICANTS: '/application/api/applicants/design',
    MARKETING_APPLICANTS: '/application/api/applicants/marketing',
    SALES_APPLICANTS: '/application/api/applicants/sales',
    HR_APPLICANTS: '/application/api/applicants/hr',
    FINANCE_APPLICANTS: '/application/api/applicants/finance',
    OPERATIONS_APPLICANTS: '/application/api/applicants/operations',
    
    // Message/Contact endpoints
    MESSAGES: '/api/messages',
    
    // Course enrollment endpoints
    ENROLLMENTS: '/api/enrollments',
    
    // Course endpoints
    COURSES: '/api/courses',
    COURSE_DETAILS: '/api/courses/{courseId}',
    COURSE_MODULES: '/api/courses/{courseId}/modules',
    MODULE_LEVELS: '/api/courses/{courseId}/modules/{moduleId}/levels',
    LEVEL_TOPICS: '/api/courses/{courseId}/modules/{moduleId}/levels/{levelId}/topics',
    TOPIC_SUBPOINTS: '/api/courses/{courseId}/modules/{moduleId}/levels/{levelId}/topics/{topicId}/subpoints',
    COURSE_ENROLLMENT: '/api/courses/{courseId}/modules/{moduleId}/levels/enroll',
    COURSE_SEARCH: '/api/courses/search',

    // Course Management endpoints
    COURSE_MANAGEMENT: '/api/course-management',
    COURSE_MANAGEMENT_COURSES: '/api/course-management/courses',
    COURSE_MANAGEMENT_COURSE_DETAILS: '/api/course-management/courses/{courseId}',
    COURSE_MANAGEMENT_COURSE_MODULES: '/api/course-management/courses/{courseId}/modules',
    COURSE_MANAGEMENT_MODULE_DETAILS: '/api/course-management/courses/{courseId}/modules/{moduleId}',
    COURSE_MANAGEMENT_MODULE_LEVELS: '/api/course-management/modules/{moduleId}/levels',
    COURSE_MANAGEMENT_LEVEL_DETAILS: '/api/course-management/courses/{courseId}/modules/{moduleId}/levels/{levelId}',
    COURSE_MANAGEMENT_MODULE_TOPICS: '/api/course-management/modules/{moduleId}/topics',
    COURSE_MANAGEMENT_TOPIC_SUBPOINTS: '/api/course-management/topics/{topicId}/subpoints',

    // File serving
    UPLOADS: '/uploads'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Authentication API URLs
export const getAuthUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}${endpoint}`;
};

// Job API URLs
export const getJobUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.JOBS}${endpoint}`;
};

// Applicant API URLs (for job applications)
export const getApplicantUrl = (department: string = '', endpoint: string = '') => {
  if (department) {
    return `${API_CONFIG.BASE_URL}/application/api/applicants/${department}${endpoint}`;
  }
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPLICANTS}${endpoint}`;
};

// Candidate API URLs (for enquiry forms)
export const getCandidateUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATES}${endpoint}`;
};

// Message API URLs
export const getMessageUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MESSAGES}${endpoint}`;
}; 

// Course enrollment API URLs
export const getEnrollmentUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ENROLLMENTS}${endpoint}`;
};

// Course API URLs
export const getCourseUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSES}${endpoint}`;
};

export const getCourseDetailsUrl = (courseId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_DETAILS.replace('{courseId}', courseId.toString())}`;
};

export const getCourseModulesUrl = (courseId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MODULES.replace('{courseId}', courseId.toString())}`;
};

export const getModuleLevelsUrl = (courseId: number, moduleId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MODULE_LEVELS
    .replace('{courseId}', courseId.toString())
    .replace('{moduleId}', moduleId.toString())}`;
};

export const getLevelTopicsUrl = (courseId: number, moduleId: number, levelId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LEVEL_TOPICS
    .replace('{courseId}', courseId.toString())
    .replace('{moduleId}', moduleId.toString())
    .replace('{levelId}', levelId.toString())}`;
};

export const getTopicSubpointsUrl = (courseId: number, moduleId: number, levelId: number, topicId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TOPIC_SUBPOINTS
    .replace('{courseId}', courseId.toString())
    .replace('{moduleId}', moduleId.toString())
    .replace('{levelId}', levelId.toString())
    .replace('{topicId}', topicId.toString())}`;
};

export const getCourseEnrollmentUrl = (courseId: number, moduleId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_ENROLLMENT
    .replace('{courseId}', courseId.toString())
    .replace('{moduleId}', moduleId.toString())}`;
};

export const getCourseSearchUrl = (query: string) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_SEARCH}?q=${encodeURIComponent(query)}`;
};

// Course Management API URLs
export const getCourseManagementUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT}${endpoint}`;
};

export const getCourseManagementCoursesUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_COURSES}`;
};

export const getCourseManagementCourseDetailsUrl = (courseId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_COURSE_DETAILS.replace('{courseId}', courseId.toString())}`;
};

export const getCourseManagementCourseModulesUrl = (courseId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_COURSE_MODULES.replace('{courseId}', courseId.toString())}`;
};

export const getCourseManagementModuleDetailsUrl = (courseId: number, moduleId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_MODULE_DETAILS
    .replace('{courseId}', courseId.toString())
    .replace('{moduleId}', moduleId.toString())}`;
};

export const getCourseManagementModuleLevelsUrl = (moduleId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_MODULE_LEVELS.replace('{moduleId}', moduleId.toString())}`;
};

export const getCourseManagementLevelDetailsUrl = (courseId: number, moduleId: number, levelId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_LEVEL_DETAILS
    .replace('{courseId}', courseId.toString())
    .replace('{moduleId}', moduleId.toString())
    .replace('{levelId}', levelId.toString())}`;
};

export const getCourseManagementModuleTopicsUrl = (moduleId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_MODULE_TOPICS.replace('{moduleId}', moduleId.toString())}`;
};

export const getCourseManagementTopicSubpointsUrl = (topicId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COURSE_MANAGEMENT_TOPIC_SUBPOINTS.replace('{topicId}', topicId.toString())}`;
};

// Upload file URLs
export const getUploadUrl = (type: 'form' | 'application' = 'form') => {
  if (type === 'application') {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPLICATION_UPLOAD}`;
  }
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD}`;
};

// Get uploaded file URL
export const getFileUrl = (filename: string) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOADS}/${filename}`;
};

// Health check URLs
export const getHealthUrl = (type: 'form' | 'application' = 'form') => {
  if (type === 'application') {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPLICATION_HEALTH}`;
  }
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`;
};

// Department-specific applicant management URLs
export const getDepartmentApplicantUrl = (department: string, applicantId?: number, action?: string) => {
  let url = `${API_CONFIG.BASE_URL}/application/api/applicants/${department}`;
  if (applicantId && action) {
    url += `/${applicantId}/${action}`;
  }
  return url;
};

// Email sending URL for applications
export const getEmailUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPLICATION_SEND_EMAIL}`;
};