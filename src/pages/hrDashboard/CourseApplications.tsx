import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Search, Filter, Mail, Phone, User, Calendar, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface CourseApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  course_name: string;
  level: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  message?: string;
}

const CourseApplications: React.FC = () => {
  const { courseName, level, moduleName, category } = useParams<{ 
    courseName: string; 
    level?: string; 
    moduleName?: string; 
    category?: string 
  }>();

  // Determine if this is a level-based route (AI/ML) or module-based route (Full Stack)
  const isLevelRoute = level && (level === 'level-1' || level === 'level-2' || level === 'level-3');
  const [applications, setApplications] = useState<CourseApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData: CourseApplication[] = [
          {
            id: 1,
            name: 'Rahul Kumar',
            email: 'rahul.kumar@example.com',
            phone: '+91 9876543210',
            college: 'IIT Delhi',
            department: 'Computer Science',
            year: '3rd Year',
            course_name: getCourseDisplayName(courseName || ''),
            level: getLevelDisplayName(level || moduleName || category || ''),
            status: 'pending',
            created_at: '2024-01-15T10:30:00Z',
            message: 'Interested in machine learning and AI applications'
          },
          {
            id: 2,
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            phone: '+91 9876543211',
            college: 'BITS Pilani',
            department: 'Data Science',
            year: '2nd Year',
            course_name: getCourseDisplayName(courseName || ''),
            level: getLevelDisplayName(level || moduleName || category || ''),
            status: 'approved',
            created_at: '2024-01-14T14:20:00Z',
            message: 'Want to pursue AI/ML career in tech industry'
          },
          {
            id: 3,
            name: 'Amit Patel',
            email: 'amit.patel@example.com',
            phone: '+91 9876543212',
            college: 'NIT Surat',
            department: 'Information Technology',
            year: '4th Year',
            course_name: getCourseDisplayName(courseName || ''),
            level: getLevelDisplayName(level || moduleName || category || ''),
            status: 'rejected',
            created_at: '2024-01-13T09:15:00Z',
            message: 'Looking to transition from software to AI/ML'
          },
          {
            id: 4,
            name: 'Neha Singh',
            email: 'neha.singh@example.com',
            phone: '+91 9876543213',
            college: 'DTU Delhi',
            department: 'Computer Science',
            year: '3rd Year',
            course_name: getCourseDisplayName(courseName || ''),
            level: getLevelDisplayName(level || moduleName || category || ''),
            status: 'pending',
            created_at: '2024-01-12T16:45:00Z',
            message: 'Passionate about neural networks and deep learning'
          },
          {
            id: 5,
            name: 'Vikram Malhotra',
            email: 'vikram.malhotra@example.com',
            phone: '+91 9876543214',
            college: 'IIIT Hyderabad',
            department: 'Data Science',
            year: '2nd Year',
            course_name: getCourseDisplayName(courseName || ''),
            level: getLevelDisplayName(level || moduleName || category || ''),
            status: 'approved',
            created_at: '2024-01-11T11:20:00Z',
            message: 'Interested in computer vision and NLP applications'
          }
        ];
        
        setApplications(mockData);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [courseName, level, moduleName, category]);

  const getCourseDisplayName = (courseName: string) => {
    return courseName?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Course';
  };

  const getLevelDisplayName = (level: string) => {
    if (level === 'level-1') return 'Level 1';
    if (level === 'level-2') return 'Level 2';
    if (level === 'level-3') return 'Level 3';
    return level?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Level';
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch = 
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link
                to={isLevelRoute ? `/hr/applied-courses/${courseName}` : "/hr/applied-courses"}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">{isLevelRoute ? 'Back to Levels' : 'Back to Courses'}</span>
              </Link>
              <div className="flex items-center space-x-3">
                <GraduationCap size={24} className="text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {getCourseDisplayName(courseName || '')} - {getLevelDisplayName(level || moduleName || category || '')}
                  </h1>
                  <p className="text-blue-100 text-sm">Course Applications Management</p>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, or college..."
                  className="w-full pl-10 pr-4 py-3 bg-white/90 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-800 placeholder-gray-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 bg-white/90 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-600 px-6 py-4 rounded-t-xl">
            <div className="grid grid-cols-12 gap-4 text-white font-semibold">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Move to</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white rounded-b-xl">
            {filteredApplications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <GraduationCap size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No candidates found for this course and level.</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Name */}
                      <div className="col-span-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{application.name}</p>
                            <p className="text-sm text-gray-500">{application.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-span-3">
                        <div className="flex items-center space-x-2">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-700">{application.email}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{application.college}</p>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </div>
                      </div>

                      {/* Move to */}
                      <div className="col-span-2">
                        <select className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                          <option value="">Select...</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                          <option value="pending">Keep Pending</option>
                        </select>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                            <CheckCircle size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseApplications; 