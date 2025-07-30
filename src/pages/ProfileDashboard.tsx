import React, { useState, useEffect, useRef } from 'react';
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
import { useAuth } from '../components/AuthContext';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

// --- Add TypeScript interfaces ---
interface Profile {
  id: number;
  name: string;
  email: string;
  phone_no?: string;
  university?: string;
  department?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

interface Application {
  applicant_id?: number;
  job_title?: string;
  department?: string;
  application_date?: string;
  current_stage?: string;
  final_status?: string;
}

interface CourseEnrollment {
  id?: number;
  name?: string;
  description?: string;
  level_range?: string;
  updated_at?: string;
}

const ProfileDashboard = () => {
  const { user: authUser, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [showAppChartModal, setShowAppChartModal] = useState(false);
  const [showCourseChartModal, setShowCourseChartModal] = useState(false);
  const appChartModalRef = useRef<HTMLDivElement>(null);
  const courseChartModalRef = useRef<HTMLDivElement>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const navigate = useNavigate();

  // Dynamic state
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [appliedCourses, setAppliedCourses] = useState<CourseEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editProfileData, setEditProfileData] = useState<{ name: string; phone_no: string; university: string; department: string }>({ name: '', phone_no: '', university: '', department: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Mobile number validation function
  const validateMobileNumber = (phone: string): boolean => {
    if (!phone.trim()) return true; // Allow empty phone number
    const phoneRegex = /^[0-9]{10,10}$/;
    return phoneRegex.test(phone.trim());
  };

  // Handle phone number change with validation
  const handlePhoneChange = (value: string) => {
    setEditProfileData(d => ({ ...d, phone_no: value }));
    
    // Clear error if field is empty or valid
    if (!value.trim() || validateMobileNumber(value)) {
      setPhoneError('');
    } else {
      setPhoneError('Please enter a valid 10-digit mobile number');
    }
  };

  // Modal close on ESC and click outside
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowAppChartModal(false);
        setShowCourseChartModal(false);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (showAppChartModal && appChartModalRef.current && !appChartModalRef.current.contains(e.target as Node)) {
        setShowAppChartModal(false);
      }
      if (showCourseChartModal && courseChartModalRef.current && !courseChartModalRef.current.contains(e.target as Node)) {
        setShowCourseChartModal(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAppChartModal, showCourseChartModal]);

  useEffect(() => {
    if (!authUser) return;
    setLoading(true);
    window.scrollTo(0, 0);
    setError('');
    Promise.all([
      apiService.getUserProfile(authUser.id),
      apiService.getUserApplications(authUser.id),
      apiService.getUserCourseEnrollments(authUser.id)
    ])
      .then(([profileData, apps, courses]) => {
        setProfile(profileData);
        setEditProfileData({
          name: profileData.name || '',
          phone_no: profileData.phone_no || '',
          university: profileData.university || '',
          department: profileData.department || ''
        });
        setApplications(apps);
        setAppliedCourses(courses);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load profile data.');
        setLoading(false);
      });
  }, [authUser]);

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800';
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'Under Review': return <Clock className="w-4 h-4" />;
      case 'Interview Scheduled': return <Calendar className="w-4 h-4" />;
      case 'Accepted': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Quick Stats (dynamic)
  const totalApplications = applications.length;
  const totalCourses = appliedCourses.length;
  const totalCertificates = 0; // Set to 0 or fetch dynamically if available

  // Ensure applications is always an array
  console.log("applications",applications);
  const normalizedApplications = Array.isArray(applications) ? applications : applications ? [applications] : [];
console.log("normalizedApplications",normalizedApplications);

  // Dashboard Overview (dynamic)
  const applicationStats = {
    'Under Review': normalizedApplications.filter(a => a.final_status === 'Pending').length,
    'Interview Scheduled': normalizedApplications.filter(a => a.current_stage === 'Interview Scheduled').length,
    'Accepted': normalizedApplications.filter(a => a.final_status === 'Selected' || a.current_stage === 'Accepted').length,
    'Rejected': normalizedApplications.filter(a => a.final_status === 'Rejected' || a.current_stage === 'Rejected').length
  };
  const courseApplicationStats = {
    'Applied Courses': appliedCourses.length
  };

  // Chart bar colors
  const appBarColors = ['#facc15', '#60a5fa', '#34d399', '#f87171'];
  const courseBarColors = ['#34d399'];

  if (!authUser) return <div className="min-h-screen flex items-center justify-center text-red-600">User not authenticated.</div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SkillSync</h1>
          </motion.div>

          {/* Navigation & Time */}
          <div className="flex items-center space-x-6">
          <nav className="hidden lg:flex space-x-6">
            <a href="#overview" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Overview</a>
            <a href="#applications" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Applications</a>
            <a href="#courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Courses</a>
          </nav>
            <div className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
              {new Date().toLocaleString('en-US', {
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
              className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Avatar fallback logic can be improved if you store avatar URLs */}
                <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center text-white font-bold">
                  {profile.name.charAt(0)}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline">{profile.name.split(' ')[0]}</span>
            </motion.button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 ring-1 ring-gray-200 dark:ring-gray-800"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2">
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-800"
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-2 sm:mt-4">{profile.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Active Member</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">{profile.phone_no || 'Add your phone number'}</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">Member since {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</span>
                </div>
                {/* <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 text-sm sm:text-base">{profile.university || 'N/A'}</span>
                </div> */}
                {/* <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-gray-700 text-sm sm:text-base">{profile.department || 'N/A'}</span>
                </div> */}
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2"
              >
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">Edit Profile</span>
              </button>
              {editSuccess && <div className="text-green-600 text-sm mt-2">Edit Success: {editSuccess}</div>}
              {editError && <div className="text-red-600 text-sm mt-2">Edit Error: {editError}</div>}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Quick Stats</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg shadow border border-purple-200 dark:border-purple-700 bg-purple-100 dark:bg-gray-800">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-purple-800 dark:text-purple-200">Track Applications</p>
                      <p className="text-lg sm:text-xl font-bold text-purple-900 dark:text-white">{totalApplications}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg shadow border border-blue-200 dark:border-blue-700 bg-blue-100 dark:bg-gray-800">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-200">Courses Applied</p>
                      <p className="text-lg sm:text-xl font-bold text-blue-900 dark:text-white">{totalCourses}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg shadow border border-green-200 dark:border-green-700 bg-green-100 dark:bg-gray-800">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-200">Certificates</p>
                      <p className="text-lg sm:text-xl font-bold text-green-900 dark:text-white">{totalCertificates}</p>
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Eye },
                  { id: 'applications', label: ' Track Applications', icon: BookOpen },
                  { id: 'courses', label: 'Courses Applied', icon: Award }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
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
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-800"
            >
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Dashboard Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Application Tracking */}
                    <div className="p-4 sm:p-6 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
                      <h4 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-200 mb-2 sm:mb-4 tracking-wide">Application Tracking</h4>
                      <button
                        onClick={() => setShowAppChartModal(true)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 font-semibold text-sm sm:text-base mb-2 underline underline-offset-2"
                      >
                        View Chart
                      </button>
                                             {showAppChartModal && (
                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all">
                           <div ref={appChartModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-fade-in">
                             <h4 className="text-xl font-bold mb-4 text-center text-blue-900 dark:text-blue-100 bg-blue-50 py-2 px-4 rounded-lg border-b-2 border-blue-200">Application Status Chart</h4>
                            <div className="flex items-end h-48 space-x-4 justify-center">
                              {Object.entries(applicationStats).map(([status, count], i) => (
                                <div key={status} className="flex flex-col items-center">
                                  <div
                                    className="w-10 rounded-t-lg"
                                    style={{
                                      height: `${Math.max(Number(count) * 20, 8)}px`,
                                      background: appBarColors[i % appBarColors.length],
                                      transition: 'height 0.3s',
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                    }}
                                    title={`${status}: ${count}`}
                                  ></div>
                                  <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{status}</span>
                                  <span className="text-xs text-gray-500">{count}</span>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => setShowAppChartModal(false)}
                              className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="text-sm sm:text-base text-blue-900 dark:text-blue-100 font-medium space-y-1 mt-2">
                        {Object.entries(applicationStats).map(([status, count]) => (
                          <div key={status} className="flex justify-between">
                            <span>{status}</span>
                            <span>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Course Application Tracking */}
                    <div className="p-4 sm:p-6 rounded-xl shadow-lg border border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900">
                      <h4 className="text-base sm:text-lg font-bold text-green-900 dark:text-green-200 mb-2 sm:mb-4 tracking-wide">Course Applications</h4>
                      <button
                        onClick={() => setShowCourseChartModal(true)}
                        className="text-green-600 hover:text-green-700 dark:text-green-300 dark:hover:text-green-400 font-semibold text-sm sm:text-base mb-2 underline underline-offset-2"
                      >
                        View Chart
                      </button>
                                             {showCourseChartModal && (
                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all">
                           <div ref={courseChartModalRef} className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs mx-4 animate-fade-in">
                             <h4 className="text-xl font-bold mb-4 text-center text-green-900 dark:text-green-100 bg-green-50 py-2 px-4 rounded-lg border-b-2 border-green-200">Course Applications Chart</h4>
                            <div className="flex items-end h-48 space-x-4 justify-center">
                              {Object.entries(courseApplicationStats).map(([label, count], i) => (
                                <div key={label} className="flex flex-col items-center">
                                  <div
                                    className="w-12 rounded-t-lg"
                                    style={{
                                      height: `${Math.max(Number(count) * 20, 8)}px`,
                                      background: courseBarColors[i % courseBarColors.length],
                                      transition: 'height 0.3s',
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                    }}
                                    title={`${label}: ${count}`}
                                  ></div>
                                  <span className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{label}</span>
                                  <span className="text-xs text-gray-500">{count}</span>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => setShowCourseChartModal(false)}
                              className="mt-6 w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="text-sm sm:text-base text-green-900 dark:text-green-100 font-medium space-y-1 mt-2">
                        {Object.entries(courseApplicationStats).map(([label, count]) => (
                          <div key={label} className="flex justify-between">
                            <span>{label}</span>
                            <span>{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Job Applications</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-4 max-h-72 overflow-y-auto pr-2">
                    {normalizedApplications.map((app, index) => (
                      <motion.div
                        key={app.applicant_id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border border-gray-200 dark:border-gray-800 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                          <div className="flex-1 mb-2 sm:mb-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{app.job_title || 'N/A'}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{app.department || 'N/A'}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Applied on {app.application_date ? new Date(app.application_date).toLocaleDateString() : 'N/A'}</p>
                          </div>
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(app.current_stage)}`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(app.current_stage)}
                                <span>{app.current_stage || 'N/A'}</span>
                              </div>
                            </span>
                            <button className="text-blue-600 hover:text-blue-700">
                              {/* <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> */}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Minimal email note */}
                  <div className="mt-4 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 text-blue-800 dark:text-blue-200 font-semibold shadow-sm border border-blue-200 dark:border-blue-800 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4m0-4V8" /></svg>
                      <span>Catch up updates via email</span>
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div>
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">My Courses</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Manage your course enrollments and track your progress</p>
                    </div>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      onClick={() => navigate('/courses')}
                    >
                      <span className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Enroll in New Course</span>
                      </span>
                    </button>
                  </div>
                  
                  {showEnrollModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all">
                      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-fade-in">
                        <h4 className="text-lg font-bold mb-4 text-center">Enroll in a Course</h4>
                        <div className="text-gray-500 text-center mb-4">(Enrollment modal logic to be implemented)</div>
                        <button
                          onClick={() => setShowEnrollModal(false)}
                          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4 sm:space-y-6 max-h-72 overflow-y-auto pr-2">
                    {loading ? (
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your courses...</p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                          <p className="text-red-600 font-medium">{error}</p>
                        </div>
                      </div>
                    ) : appliedCourses.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Courses Yet</h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">You haven't enrolled in any courses yet. Start your learning journey today!</p>
                          <button
                            onClick={() => navigate('/courses')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Browse Courses
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {appliedCourses.map((course, index) => (
                          <motion.div
                            key={course.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 overflow-hidden"
                          >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 dark:group-hover:from-blue-900/10 dark:group-hover:to-purple-900/10 transition-all duration-300"></div>
                            
                            <div className="relative">
                              {/* Course header */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                      <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{course.name || 'N/A'}</h4>
                                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                                        {course.level_range || 'N/A'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Course description */}
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{course.description || 'N/A'}</p>
                              
                              {/* Course details */}
                              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>Enrolled: {course.updated_at ? new Date(course.updated_at).toLocaleDateString() : 'N/A'}</span>
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
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
            <form
              className="space-y-3 sm:space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!authUser) return;
                
                // Validate phone number before submission
                if (editProfileData.phone_no && !validateMobileNumber(editProfileData.phone_no)) {
                  setPhoneError('Please enter a valid 10-digit mobile number');
                  return;
                }
                
                setEditLoading(true);
                setEditError('');
                setEditSuccess('');
                setPhoneError('');
                
                try {
                  await apiService.updateUserProfile(authUser.id, editProfileData);
                  setEditSuccess('Profile updated successfully!');
                  setShowEditModal(false);
                  // Optionally refetch profile
                  const updated = await apiService.getUserProfile(authUser.id);
                  setProfile(updated);
                  updateUser(updated);
                } catch (err) {
                  setEditError('Failed to update profile.');
                } finally {
                  setEditLoading(false);
                }
              }}
            >
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Full Name</label>
                <input
                  type="text"
                  value={editProfileData.name}
                  onChange={e => setEditProfileData(d => ({ ...d, name: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Phone Number 
                </label>
                <input
                  type="tel"
                  value={editProfileData.phone_no}
                  onChange={e => handlePhoneChange(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 ${
                    phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {phoneError && <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {phoneError}
                </p>}
              </div>
              {/* <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">University</label>
                <input
                  type="text"
                  value={editProfileData.university}
                  onChange={e => setEditProfileData(d => ({ ...d, university: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div> */}
              {/* <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2">Department</label>
                <input
                  type="text"
                  value={editProfileData.department}
                  onChange={e => setEditProfileData(d => ({ ...d, department: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div> */}
              <div className="flex space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  disabled={editLoading}
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
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