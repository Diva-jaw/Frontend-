import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Download, 
  Eye,
  Award,
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react';

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Mock user data
  const user = {
    name: 'Riya Singh',
    email: 'riya.singh@example.com',
    phone: '+91 98765 43210',
    joinDate: 'March 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  };

  // Mock application data
  const applications = [
    { id: 1, title: 'Frontend Developer', company: 'TechCorp Inc.', status: 'Under Review', appliedDate: '2024-03-15', type: 'pending' },
    { id: 2, title: 'React Developer', company: 'StartupXYZ', status: 'Interview Scheduled', appliedDate: '2024-03-10', type: 'interview' },
    { id: 3, title: 'Full Stack Developer', company: 'Innovation Labs', status: 'Rejected', appliedDate: '2024-03-05', type: 'rejected' },
    { id: 4, title: 'UI/UX Developer', company: 'Design Studio', status: 'Accepted', appliedDate: '2024-03-01', type: 'accepted' }
  ];

  // Mock courses data (assuming applied courses are tracked)
  const appliedCourses = [
    { id: 1, title: 'React.js Fundamentals', appliedDate: '2024-03-15' },
    { id: 2, title: 'Node.js Backend Development', appliedDate: '2024-03-10' },
    { id: 3, title: 'Python for Data Science', appliedDate: '2024-03-05' },
    { id: 4, title: 'Angular Advanced Concepts', appliedDate: '2024-03-01' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Review': return <Clock className="w-4 h-4" />;
      case 'Interview Scheduled': return <Calendar className="w-4 h-4" />;
      case 'Accepted': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Data for charts
  const applicationStats = {
    'Under Review': applications.filter(a => a.status === 'Under Review').length,
    'Interview Scheduled': applications.filter(a => a.status === 'Interview Scheduled').length,
    'Accepted': applications.filter(a => a.status === 'Accepted').length,
    'Rejected': applications.filter(a => a.status === 'Rejected').length
  };

  const courseApplicationStats = {
    'Applied Courses': appliedCourses.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SkillSync</h1>
          </motion.div>

          {/* Navigation & Time */}
          <div className="flex items-center space-x-6">
          <nav className="hidden lg:flex space-x-6">
            <a href="#overview" className="text-gray-600 hover:text-blue-600 font-medium">Overview</a>
            <a href="#applications" className="text-gray-600 hover:text-blue-600 font-medium">Applications</a>
            <a href="#courses" className="text-gray-600 hover:text-blue-600 font-medium">Courses</a>
          </nav>
            <div className="text-sm text-gray-600 hidden md:block">
              {new Date('2025-07-17T10:06:00+05:30').toLocaleString('en-US', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={() => setShowFallback(true)}
              />
              {showFallback && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold absolute top-0 left-0">
                  {user.name.charAt(0)}
                </div>
              )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">{user.name.split(' ')[0]}</span>
            </motion.button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 ring-1 ring-gray-200"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="relative inline-block">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg"
                    onError={() => setShowFallback(true)}
                  />
                  {showFallback && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl absolute top-0 left-0">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-2 sm:mt-4">{user.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base">Active Member</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 text-sm sm:text-base">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 text-sm sm:text-base">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 text-sm sm:text-base">Member since {user.joinDate}</span>
                </div>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2"
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">Edit Profile</span>
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Stats</h3>

              <div className="flex items-center justify-between p-2 sm:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Track Applications</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">15</p>
                    </div>
                  </div>
                </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Courses Applied</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">{appliedCourses.length}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Certificates</p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900">8</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Eye },
                  { id: 'applications', label: ' Track Applications', icon: BookOpen },
                  { id: 'courses', label: 'Track Courses', icon: Award }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Dashboard Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Application Tracking */}
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <h4 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-4">Application Tracking</h4>
                      <button
                        onClick={() => {
                          const canvas = document.createElement('canvas');
                          canvas.width = 300;
                          canvas.height = 200;
                          const ctx = canvas.getContext('2d');
                          if (ctx) {
                            ctx.fillStyle = '#f3f4f6';
                            ctx.fillRect(0, 0, 300, 200);
                            ctx.fillStyle = '#1e40af';
                            let x = 50;
                            Object.entries(applicationStats).forEach(([status, count]) => {
                              ctx.fillRect(x, 150 - count * 20, 40, count * 20);
                              ctx.fillStyle = '#000';
                              ctx.fillText(status.slice(0, 3), x, 170);
                              ctx.fillText(count.toString(), x, 150 - count * 20 - 5);
                              x += 60;
                            });
                          }
                          document.body.appendChild(canvas);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base mb-2"
                      >
                        View Chart
                      </button>
                      <div className="text-sm sm:text-base text-blue-800">
                        {Object.entries(applicationStats).map(([status, count]) => (
                          <div key={status} className="flex justify-between">
                            <span>{status}</span>
                            <span>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Course Application Tracking */}
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <h4 className="text-base sm:text-lg font-semibold text-green-900 mb-2 sm:mb-4">Course Applications</h4>
                      <button
                        onClick={() => {
                          const canvas = document.createElement('canvas');
                          canvas.width = 300;
                          canvas.height = 200;
                          const ctx = canvas.getContext('2d');
                          if (ctx) {
                            ctx.fillStyle = '#f3f4f6';
                            ctx.fillRect(0, 0, 300, 200);
                            ctx.fillStyle = '#10b981';
                            const totalApplied = appliedCourses.length;
                            ctx.fillRect(50, 150 - totalApplied * 20, 40, totalApplied * 20);
                            ctx.fillStyle = '#000';
                            ctx.fillText('Applied', 50, 170);
                            ctx.fillText(totalApplied.toString(), 50, 150 - totalApplied * 20 - 5);
                          }
                          document.body.appendChild(canvas);
                        }}
                        className="text-green-600 hover:text-green-700 font-medium text-sm sm:text-base mb-2"
                      >
                        View Chart
                      </button>
                      <div className="text-sm sm:text-base text-green-800">
                        <div className="flex justify-between">
                          <span>Applied Courses</span>
                          <span>{appliedCourses.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Job Applications</h3>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">View All</button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {applications.map((app, index) => (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                          <div className="flex-1 mb-2 sm:mb-0">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{app.title}</h4>
                            <p className="text-gray-600 text-xs sm:text-sm">{app.company}</p>
                            <p className="text-gray-500 text-xs sm:text-sm">Applied on {app.appliedDate}</p>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(app.status)}`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(app.status)}
                                <span>{app.status}</span>
                              </div>
                            </span>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">My Courses</h3>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">Browse Courses</button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {appliedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{course.title}</h4>
                            <p className="text-gray-600 text-xs sm:text-sm">Applied on {course.appliedDate}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 max-w-sm w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              
              <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;