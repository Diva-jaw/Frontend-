import { API_CONFIG } from '../config/api';

// Create API client using fetch
const apiClient = {
  get: async (endpoint: string) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return { data: await response.json() };
  },
  
  post: async (endpoint: string, data: any) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return { data: await response.json() };
  }
};

export interface LevelRichDetails {
  course: {
    id: number;
    name: string;
    description: string;
    level_range: string;
  };
  module: {
    id: number;
    name: string;
    duration: string;
    has_levels: boolean;
  };
  level: {
    id: number;
    level_name: string;
    duration: string;
    level_range: string;
  };
  rich_content: {
    learning_objectives?: string;
    hands_on_projects?: string;
    internship_opportunity?: string;
    path_ahead?: string;
  };
  tools: Array<{
    icon: string;
    name: string;
    description: string;
  }>;
  learning_topics: Array<{
    id: number;
    topic_title: string;
    description: string;
    subpoints: string[];
  }>;
  enrollmentCount: number;
  userEnrollment: {
    id: number;
    status: string;
    created_at: string;
  } | null;
  metadata: {
    totalTopics: number;
    totalSubpoints: number;
    totalTools: number;
    estimatedDuration: string;
    difficulty: string;
  };
}

class LevelEnrollmentService {
  // Get comprehensive level details with rich content
  async getLevelRichDetails(courseId: number, moduleId: number, levelId: number): Promise<LevelRichDetails> {
    try {
      const response = await apiClient.get(`/courses/${courseId}/modules/${moduleId}/levels/${levelId}/rich-details`);
      return response.data;
    } catch (error) {
      console.error('Error fetching level rich details:', error);
      throw new Error('Failed to fetch level details');
    }
  }

  // Enroll user in a level
  async enrollInLevel(courseId: number, moduleId: number, levelId: number, enrollmentData: any): Promise<any> {
    try {
      const response = await apiClient.post(`/courses/${courseId}/modules/${moduleId}/levels/enroll`, enrollmentData);
      return response.data;
    } catch (error) {
      console.error('Error enrolling in level:', error);
      throw new Error('Failed to enroll in level');
    }
  }

  // Get user's enrollment status for a specific level
  async getUserEnrollmentStatus(courseId: number, moduleId: number, levelId: number): Promise<any> {
    try {
      const response = await apiClient.get(`/courses/enrollments/user`);
      const userEnrollments = response.data;
      
      // Find the specific enrollment
      const enrollment = userEnrollments.find((enrollment: any) => 
        enrollment.course_id === courseId && 
        enrollment.module_id === moduleId && 
        enrollment.level_id === levelId
      );
      
      return enrollment || null;
    } catch (error) {
      console.error('Error fetching user enrollment status:', error);
      return null;
    }
  }

  // Get enrollment statistics for a level
  async getLevelEnrollmentStats(courseId: number, moduleId: number, levelId: number): Promise<any> {
    try {
      const levelDetails = await this.getLevelRichDetails(courseId, moduleId, levelId);
      return {
        totalEnrolled: levelDetails.enrollmentCount,
        userEnrolled: !!levelDetails.userEnrollment,
        enrollmentStatus: levelDetails.userEnrollment?.status || null
      };
    } catch (error) {
      console.error('Error fetching enrollment stats:', error);
      return {
        totalEnrolled: 0,
        userEnrolled: false,
        enrollmentStatus: null
      };
    }
  }
}

export const levelEnrollmentService = new LevelEnrollmentService(); 