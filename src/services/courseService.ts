import { 
  getCourseUrl, 
  getCourseDetailsUrl, 
  getCourseModulesUrl, 
  getModuleLevelsUrl,
  getLevelTopicsUrl,
  getTopicSubpointsUrl,
  getCourseEnrollmentUrl,
  getCourseSearchUrl
} from '../config/api';

// Course-related interfaces
export interface Course {
  id: number;
  name: string;
  description: string;
  level_range: string;
  status?: 'draft' | 'published';
  created_at: string;
  updated_at?: string;
}

export interface CourseModule {
  id: number;
  name: string;
  description?: string;
  duration: string;
  has_levels: boolean;
  course_id: number;
  levels?: ModuleLevel[];
}

export interface ModuleLevel {
  id: number;
  level_name: string;
  duration: string;
  level_range: string;
  module_id: number;
  topics?: ModuleTopic[];
}

export interface ModuleTopic {
  id: number;
  topic_title: string;
  description?: string;
  level_id: number;
  subpoints?: TopicSubpoint[];
}

export interface TopicSubpoint {
  id: number;
  subpoint: string;
  topic_id: number;
}

export interface CourseDetails {
  id: number;
  name: string;
  description: string;
  level_range: string;
  created_at: string;
  modules: (CourseModule & { levels: ModuleLevel[] })[];
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  module_id: number;
  level_id: number;
  status: 'requested' | 'contacted' | 'enrolled' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseWithModulesAndLevels extends Course {
  modules: (CourseModule & { levels: ModuleLevel[] })[];
}

class CourseService {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // If JSON parsing fails, try to get text content
          try {
            const textContent = await response.text();
            console.error('Response text:', textContent);
            if (textContent.includes('<!DOCTYPE')) {
              errorMessage = 'Server returned HTML instead of JSON. Please check if the server is running correctly.';
            } else {
              errorMessage = `Server error: ${textContent.substring(0, 200)}...`;
            }
          } catch (textError) {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
        }
        
        console.error(`API Error: ${response.status} - ${errorMessage}`);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Network error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    try {
      const url = getCourseUrl('/list');
      
      const courses = await this.makeRequest<Course[]>(url);
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Return empty array instead of throwing to prevent crashes
      return [];
    }
  }

  // Get course details with modules and levels
  async getCourseDetails(courseId: number): Promise<CourseDetails> {
    try {
      const courseDetails = await this.makeRequest<CourseDetails>(getCourseDetailsUrl(courseId));
      return courseDetails;
    } catch (error) {
      console.error(`Error fetching course details for ID ${courseId}:`, error);
      throw error;
    }
  }

  // Get modules for a specific course
  async getCourseModules(courseId: number): Promise<CourseModule[]> {
    try {
      const modules = await this.makeRequest<CourseModule[]>(getCourseModulesUrl(courseId));
      return modules;
    } catch (error) {
      console.error(`Error fetching modules for course ID ${courseId}:`, error);
      throw error;
    }
  }

  // Get levels for a specific module
  async getModuleLevels(courseId: number, moduleId: number): Promise<ModuleLevel[]> {
    try {
      const levels = await this.makeRequest<ModuleLevel[]>(getModuleLevelsUrl(courseId, moduleId));
      return levels;
    } catch (error) {
      console.error(`Error fetching levels for course ID ${courseId}, module ID ${moduleId}:`, error);
      throw error;
    }
  }

  // Get topics for a specific level
  async getLevelTopics(courseId: number, moduleId: number, levelId: number): Promise<ModuleTopic[]> {
    try {
      const topics = await this.makeRequest<ModuleTopic[]>(getLevelTopicsUrl(courseId, moduleId, levelId));
      return topics;
    } catch (error) {
      console.error(`Error fetching topics for course ID ${courseId}, module ID ${moduleId}, level ID ${levelId}:`, error);
      throw error;
    }
  }

  // Get subpoints for a specific topic
  async getTopicSubpoints(courseId: number, moduleId: number, levelId: number, topicId: number): Promise<TopicSubpoint[]> {
    try {
      const subpoints = await this.makeRequest<TopicSubpoint[]>(getTopicSubpointsUrl(courseId, moduleId, levelId, topicId));
      return subpoints;
    } catch (error) {
      console.error(`Error fetching subpoints for course ID ${courseId}, module ID ${moduleId}, level ID ${levelId}, topic ID ${topicId}:`, error);
      throw error;
    }
  }

  // Search courses
  async searchCourses(query: string): Promise<Course[]> {
    try {
      const courses = await this.makeRequest<Course[]>(getCourseSearchUrl(query));
      return courses;
    } catch (error) {
      console.error(`Error searching courses with query "${query}":`, error);
      throw error;
    }
  }

  // Enroll in a course module level
  async enrollInCourse(courseId: number, moduleId: number, levelId: number): Promise<{ message: string; enrollmentId: number }> {
    try {
      const result = await this.makeRequest<{ message: string; enrollmentId: number }>(
        getCourseEnrollmentUrl(courseId, moduleId),
        {
          method: 'POST',
          body: JSON.stringify({ levelId }),
        }
      );
      return result;
    } catch (error) {
      console.error(`Error enrolling in course ID ${courseId}, module ID ${moduleId}, level ID ${levelId}:`, error);
      throw error;
    }
  }

  // Enroll in a course module level with additional user details
  async enrollInCourseWithDetails(
    courseId: number, 
    moduleId: number, 
    levelId: number, 
    userDetails: {
      name: string;
      email: string;
      phone_no: string;
      college?: string;
      department?: string;
      year?: string;
    }
  ): Promise<{ message: string; enrollmentId: number }> {
    try {
      const result = await this.makeRequest<{ message: string; enrollmentId: number }>(
        getCourseEnrollmentUrl(courseId, moduleId),
        {
          method: 'POST',
          body: JSON.stringify({ 
            levelId,
            userDetails 
          }),
        }
      );
      return result;
    } catch (error) {
      console.error(`Error enrolling in course ID ${courseId}, module ID ${moduleId}, level ID ${levelId} with details:`, error);
      throw error;
    }
  }

  // Get user enrollments
  async getUserEnrollments(): Promise<Enrollment[]> {
    try {
      const enrollments = await this.makeRequest<Enrollment[]>(getCourseUrl('/enrollments/user'));
      return enrollments;
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      throw error;
    }
  }

  // Cancel enrollment
  async cancelEnrollment(enrollmentId: number): Promise<{ message: string }> {
    try {
      const result = await this.makeRequest<{ message: string }>(
        getCourseUrl(`/enrollments/${enrollmentId}/cancel`),
        {
          method: 'DELETE',
        }
      );
      return result;
    } catch (error) {
      console.error(`Error canceling enrollment ID ${enrollmentId}:`, error);
      throw error;
    }
  }

  // Get all enrollments (admin/HR only)
  async getAllEnrollments(): Promise<Enrollment[]> {
    try {
      const enrollments = await this.makeRequest<Enrollment[]>(getCourseUrl('/enrollments/all'));
      return enrollments;
    } catch (error) {
      console.error('Error fetching all enrollments:', error);
      throw error;
    }
  }

  // Update enrollment status (admin/HR only)
  async updateEnrollmentStatus(
    enrollmentId: number, 
    status: 'requested' | 'contacted' | 'enrolled' | 'cancelled',
    notes?: string
  ): Promise<{ message: string }> {
    try {
      const result = await this.makeRequest<{ message: string }>(
        getCourseUrl(`/enrollments/${enrollmentId}/status`),
        {
          method: 'PUT',
          body: JSON.stringify({ status, notes }),
        }
      );
      return result;
    } catch (error) {
      console.error(`Error updating enrollment ID ${enrollmentId} status to ${status}:`, error);
      throw error;
    }
  }

  // Fetch all courses with modules and levels (nested)
  async getAllCoursesWithModulesAndLevels(): Promise<CourseWithModulesAndLevels[]> {
    const url = getCourseUrl('/all-details');
    return this.makeRequest<CourseWithModulesAndLevels[]>(url);
  }
}

export const courseService = new CourseService(); 