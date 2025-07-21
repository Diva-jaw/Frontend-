// API Configuration for Frontend
const BASE_URL_RAW = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
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