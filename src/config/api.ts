// API Configuration for Frontend
const BASE_URL_RAW = import.meta.env.VITE_API_BASE_URL || 'https://rftsystemsbackend-testing.up.railway.app';
// Remove trailing slash to prevent double slashes
const BASE_URL = BASE_URL_RAW.endsWith('/') ? BASE_URL_RAW.slice(0, -1) : BASE_URL_RAW;

export const API_CONFIG = {
  BASE_URL,
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: '/api/auth',
    
    // Form/Upload endpoints
    UPLOAD: '/upload',
    APPLICATION_UPLOAD: '/application/upload',
    
    // Job endpoints
    JOBS: '/api/jobs',
    
    // Candidate/Application endpoints
    CANDIDATES: '/api/candidates',
    CANDIDATE_BY_ID: '/candidate',
    APPLICANTS: '/application/api/applicants',
    
    // Message endpoints
    MESSAGES: '/api/messages',
    
    // Health check
    HEALTH: '/health'
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Authentication API URLs
export const getAuthUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH}${endpoint}`;
};

// Job API URLs
export const getJobUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.JOBS}${endpoint}`;
};

// Applicant API URLs
export const getApplicantUrl = (department: string) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPLICANTS}/${department}`;
};

// Candidate API URLs
export const getCandidateUrl = (endpoint: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CANDIDATES}${endpoint}`;
};

// Message API URLs
export const getMessageUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MESSAGES}`;
}; 