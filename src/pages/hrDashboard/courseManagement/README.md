# Course Management System

This directory contains the frontend pages for managing courses, modules, levels, topics, and subpoints in the RFT learning management system.

## Pages Overview

### 1. CourseManagementDashboard
- **Route**: `/hr/course-management`
- **Purpose**: Main dashboard showing all courses with search functionality
- **Features**:
  - View all courses
  - Search courses by name or description
  - Quick actions to create courses and add modules
  - Navigation to individual course management

### 2. CreateCourse
- **Route**: `/hr/course-management/create`
- **Purpose**: Create new courses
- **Form Fields**:
  - Course Name (required)
  - Course Description (required)
  - Level Range (optional)

### 3. AddModule
- **Route**: `/hr/course-management/:courseId/add-module`
- **Purpose**: Add modules to existing courses
- **Form Fields**:
  - Module Name (required)
  - Duration (optional)
  - Has Levels (checkbox)

### 4. AddLevel
- **Route**: `/hr/course-management/:courseId/:moduleId/add-level`
- **Purpose**: Add levels to modules
- **Form Fields**:
  - Level Name (required)
  - Duration (optional)
  - Level Range (optional)

### 5. AddTopic
- **Route**: `/hr/course-management/:courseId/:moduleId/add-topic`
- **Purpose**: Add topics to modules or levels
- **Form Fields**:
  - Topic Title (required)
  - Topic Description (optional)
  - Level (optional dropdown if module has levels)

### 6. AddSubpoint
- **Route**: `/hr/course-management/:courseId/:moduleId/:levelId/:topicId/add-subpoint`
- **Purpose**: Add subpoints to topics
- **Form Fields**:
  - Subpoint Content (required)

## API Endpoints Used

The pages interact with the following API endpoints:

1. **Create Course**: `POST /api/courses`
2. **Add Module**: `POST /api/courses/{course_id}/modules`
3. **Add Level**: `POST /api/modules/{module_id}/levels`
4. **Add Topic**: `POST /api/modules/{module_id}/topics`
5. **Add Subpoint**: `POST /api/topics/{topic_id}/subpoints`

## Navigation Flow

1. **Dashboard** → View all courses
2. **Create Course** → Add new course
3. **View Course** → See course details and modules
4. **Add Module** → Add modules to course
5. **Add Level** → Add levels to module
6. **Add Topic** → Add topics to module/level
7. **Add Subpoint** → Add subpoints to topic

## Features

- **Authentication**: All pages require HR role access
- **Form Validation**: Required fields are validated
- **Error Handling**: Comprehensive error messages
- **Loading States**: Loading indicators during API calls
- **Success Notifications**: Success messages after operations
- **Responsive Design**: Works on all screen sizes
- **Breadcrumb Navigation**: Easy navigation between pages

## Usage

1. Navigate to `/hr/course-management` to access the main dashboard
2. Use the "Create Course" button to add new courses
3. Click "View" on any course to see its details
4. Use "Add Module" to add modules to courses
5. Navigate through the hierarchy to add levels, topics, and subpoints

## Dependencies

- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling
- Course service for API calls
- Auth context for authentication
- Notification popup for user feedback 