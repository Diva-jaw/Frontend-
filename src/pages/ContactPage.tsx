import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Send, Phone, MessageSquare, MapPin, Building, Calendar, FileText, CheckCircle, ChevronLeft, ChevronRight, Upload, GraduationCap, Briefcase, Globe, Layers, ListChecks, ClipboardCheck, FilePlus, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- User Interface ---
interface User {
  name: string;
  email: string;
}

// --- AuthModal ---
const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
  darkMode: boolean;
}> = ({ isOpen, onClose, onLogin, onSignup, darkMode }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (isLoginMode) {
        onLogin(formData.email, formData.password);
      } else {
        onSignup(formData.name, formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${darkMode ? 'dark' : ''}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200 ${darkMode ? 'dark' : ''}`}>
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${darkMode ? 'dark' : ''}`}
        >
          <X size={24} />
        </button>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-2 ${darkMode ? 'dark' : ''}`}>
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 ${darkMode ? 'dark' : ''}`}>
              {isLoginMode ? 'Sign in to submit your queries' : 'Join us to get started'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginMode && (
              <div>
                <label className={`block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 ${darkMode ? 'dark' : ''}`}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-black dark:text-white ${darkMode ? 'dark' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            <div>
              <label className={`block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 ${darkMode ? 'dark' : ''}`}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-black dark:text-white ${darkMode ? 'dark' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className={`block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 ${darkMode ? 'dark' : ''}`}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-black dark:text-white ${darkMode ? 'dark' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${darkMode ? 'dark' : ''}`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {!isLoginMode && (
              <div>
                <label className={`block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 ${darkMode ? 'dark' : ''}`}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-black dark:text-white ${darkMode ? 'dark' : ''}`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${darkMode ? 'dark' : ''}`}
            >
              {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Create Account')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className={`text-gray-600 dark:text-gray-300 ${darkMode ? 'dark' : ''}`}>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setErrors({});
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className={`text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors ${darkMode ? 'dark' : ''}`}
              >
                {isLoginMode ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Header ---
const Header: React.FC<{
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}> = ({ user, onAuthClick, onLogout, darkMode, toggleDarkMode }) => (
  <header className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 ${darkMode ? 'dark' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <img
                src="/logo1.jpg"
                alt="Ruhil Future Technologies Logo"
                className="w-12 h-12 object-contain rounded-full border-4 border-blue-600 bg-white dark:bg-gray-700 shadow-md"
              />
            </div>
            <div>
              <h1 className={`text-xl font-bold text-gray-900 dark:text-white ml-3 ${darkMode ? 'dark' : ''}`}>Ruhil Future Technologies</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className={`text-sm font-medium text-gray-900 dark:text-white ${darkMode ? 'dark' : ''}`}>{user.name}</p>
                <p className={`text-xs text-gray-500 dark:text-gray-400 ${darkMode ? 'dark' : ''}`}>{user.email}</p>
              </div>
              <div className={`w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center ${darkMode ? 'dark' : ''}`}>
                <User className="text-blue-600 dark:text-blue-300" size={16} />
              </div>
              <button
                onClick={onLogout}
                className={`p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors ${darkMode ? 'dark' : ''}`}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors ${darkMode ? 'dark' : ''}`}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  </header>
);

// --- ContactForm ---
interface ContactFormProps {
  user: { name: string; email: string } | null;
  darkMode: boolean;
}

const initialFormData = {
  fullName: '',
  dob: '',
  gender: '',
  mobile: '',
  altMobile: '',
  email: '',
  currentCity: '',
  homeTown: '',
  willingToRelocate: '',
  qualification: '',
  course: '',
  college: '',
  affiliatedUniv: '',
  graduationYear: '',
  marks: '',
  allSemCleared: '',
  techSkills: [] as string[],
  otherTechSkills: '',
  certifications: '',
  hasInternship: '',
  projectDesc: '',
  github: '',
  linkedin: '',
  preferredRole: '',
  preferredLocations: [] as string[],
  joining: '',
  shifts: '',
  expectedCTC: '',
  source: '',
  onlineTest: '',
  laptop: '',
  resume: null as File | null,
  academics: null as File | null,
  languages: [] as string[],
  aadhar: '',
  pan: '',
  passport: '',
  agree: false,
};

const steps = [
  'Personal Details',
  'Location Details',
  'Education',
  'Skills',
  'Experience',
  'Preferences',
  'General',
  'Documents',
  'Declaration',
];

const techSkillOptions = [
  'Python', 'Java', 'C++', 'JavaScript', 'Web Development', 'SQL/Databases',
  'Data Structures & Algorithms', 'Cloud/DevOps', 'Machine Learning/AI', 'Cybersecurity', 'Others'
];
const qualificationOptions = [
  'Diploma', 'B.Tech', 'B.Sc', 'B.Com', 'BA', 'M.Tech', 'M.Sc', 'MBA', 'Others'
];
const genderOptions = ['Male', 'Female', 'Other'];
const yesNoOptions = ['Yes', 'No'];
const shiftOptions = ['Yes', 'No'];
const joiningOptions = ['Yes', 'No', 'Notice Period'];
const locationOptions = [
  'Rohtak', 'Gurgaon', 'North India', 'East India', 'Central India', 'West India', 'South India', 'All over India'
];
const languageOptions = [
  'English', 'Hindi'
];

const ContactForm: React.FC<ContactFormProps> = ({ user, darkMode }) => {
  const [formData, setFormData] = useState<
    typeof initialFormData & { [key: string]: any }
  >({
    ...initialFormData,
    fullName: user?.name || '',
    email: user?.email || '',
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let loaded = { ...initialFormData };
    if (user && user.email) {
      const saved = localStorage.getItem(`formData_${user.email}`);
      if (saved) {
        loaded = { ...loaded, ...JSON.parse(saved) };
      }
      loaded.fullName = user.name;
      loaded.email = user.email;
    }
    setFormData(loaded);
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`formData_${user.email}`,
        JSON.stringify({ ...formData, resume: undefined, academics: undefined })
      );
    }
  }, [formData, user]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
      if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Enter valid 10-digit number';
      if (formData.altMobile && !/^\d{10}$/.test(formData.altMobile)) newErrors.altMobile = 'Enter valid 10-digit number';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    }
    if (step === 1) {
      if (!formData.currentCity.trim()) newErrors.currentCity = 'Current City is required';
      if (!formData.homeTown.trim()) newErrors.homeTown = 'Home Town is required';
      if (!formData.willingToRelocate) newErrors.willingToRelocate = 'This field is required';
    }
    if (step === 2) {
      if (!formData.qualification) newErrors.qualification = 'Qualification is required';
      if (!formData.course.trim()) newErrors.course = 'Course Name is required';
      if (!formData.college.trim()) newErrors.college = 'College/University is required';
      if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Year of Passing is required';
      else if (!/^\d{4}$/.test(formData.graduationYear) || parseInt(formData.graduationYear) < 1050 || parseInt(formData.graduationYear) > 2030)
        newErrors.graduationYear = 'Year must be between 1050 and 2025';
      if (!formData.marks.trim()) newErrors.marks = 'Aggregate Marks/CGPA is required';
      else if (!/^\d{1,2}(\.\d{1,2})?$/.test(formData.marks) || parseFloat(formData.marks) < 0 || parseFloat(formData.marks) > 101)
        newErrors.marks = 'Marks must be between 0 and 100';
      if (!formData.allSemCleared) newErrors.allSemCleared = 'This field is required';
    }
    if (step === 3) {
      if (formData.techSkills.length === 0) newErrors.techSkills = 'Select at least one skill';
    }
    if (step === 4) {
      if (!formData.hasInternship) newErrors.hasInternship = 'This field is required';
      if (formData.hasInternship === 'Yes' && !formData.projectDesc.trim()) newErrors.projectDesc = 'Description required';
    }
    if (step === 5) {
      if (!formData.preferredRole.trim()) newErrors.preferredRole = 'Preferred Role is required';
      if (formData.preferredLocations.length === 0) newErrors.preferredLocations = 'Select at least one location';
      if (!formData.joining) newErrors.joining = 'This field is required';
      if (!formData.shifts) newErrors.shifts = 'This field is required';
      if (formData.expectedCTC && (!/^\d+$/.test(formData.expectedCTC) || parseInt(formData.expectedCTC) < 0 || parseInt(formData.expectedCTC) > 10000000))
        newErrors.expectedCTC = 'CTC must be an integer between 0 and 1,00,00,000';
    }
    if (step === 6) {
      if (!formData.source.trim()) newErrors.source = 'This field is required';
      if (!formData.onlineTest) newErrors.onlineTest = 'This field is required';
      if (!formData.laptop) newErrors.laptop = 'This field is required';
      if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = 'Aadhar must be 12 digits';
      if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = 'PAN must be 10 characters (e.g., ABCDE1234F)';
      if (formData.passport && !/^[A-Z0-9]{8,9}$/i.test(formData.passport)) newErrors.passport = 'Passport should be 8-9 alphanumeric characters';
    }
    if (step === 7) {
      if (!formData.resume) newErrors.resume = 'Resume is required';
    }
    if (step === 8) {
      if (!formData.agree) newErrors.agree = 'You must agree to the declaration';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSubmitted(false);
    navigate('/');
    setFormData({ ...initialFormData, fullName: user?.name || '', email: user?.email || '' });
    setStep(0);
    if (user && user.email) {
      localStorage.removeItem(`formData_${user.email}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      if (formData.resume) formDataToSend.append('resume', formData.resume);
      if (formData.academics) formDataToSend.append('academics', formData.academics);
      const { resume, academics, ...fieldsToSend } = formData;
      formDataToSend.append('data', JSON.stringify(fieldsToSend));
      const response = await axios.post('http://localhost:5000/upload', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitted(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        handleClosePopup();
      }, 3000);
    } catch (error) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && !showPopup) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center ${darkMode ? 'dark' : ''}`}>
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="text-green-600 dark:text-green-300" size={32} />
        </div>
        <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 ${darkMode ? 'dark' : ''}`}>Form Submitted Successfully!</h3>
        <p className={`text-gray-600 dark:text-gray-300 mb-6 ${darkMode ? 'dark' : ''}`}>
          Thank you for your enquiry. We will get back to you soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
          }}
          className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${darkMode ? 'dark' : ''}`}
        >
          Fill Another Form
        </button>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><User className="mr-2" />Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="As per Aadhaar or ID"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={e => handleInputChange('dob', e.target.value)}
                  max="2020-12-31"
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Gender *</label>
                <select
                  value={formData.gender}
                  onChange={e => handleInputChange('gender', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Mobile Number *</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    handleInputChange('mobile', value);
                  }}
                  onKeyDown={e => {
                    if (formData.mobile.length >= 10 && e.key !== 'Backspace' && e.key !== 'Tab') {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="Primary Mobile"
                  maxLength={10}
                />
                {formData.mobile.length === 10 && (
                  <p className="text-yellow-500 text-sm mt-1" aria-live="polite">Maximum 10 digits allowed</p>
                )}
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Alternate Contact Number</label>
                <input
                  type="tel"
                  value={formData.altMobile}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                    handleInputChange('altMobile', value);
                  }}
                  onKeyDown={e => {
                    if (formData.altMobile.length >= 10 && e.key !== 'Backspace' && e.key !== 'Tab') {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="Optional"
                  maxLength={10}
                />
                {formData.altMobile.length === 10 && (
                  <p className="text-yellow-500 text-sm mt-1" aria-live="polite">Maximum 10 digits allowed</p>
                )}
                {errors.altMobile && <p className="text-red-500 text-sm">{errors.altMobile}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="Official / Personal"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><MapPin className="mr-2" />Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Current City *</label>
                <input
                  type="text"
                  value={formData.currentCity}
                  onChange={e => handleInputChange('currentCity', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.currentCity && <p className="text-red-500 text-sm">{errors.currentCity}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Home Town / Permanent Address *</label>
                <input
                  type="text"
                  value={formData.homeTown}
                  onChange={e => handleInputChange('homeTown', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.homeTown && <p className="text-red-500 text-sm">{errors.homeTown}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Willing to Relocate? *</label>
                <select
                  value={formData.willingToRelocate}
                  onChange={e => handleInputChange('willingToRelocate', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.willingToRelocate && <p className="text-red-500 text-sm">{errors.willingToRelocate}</p>}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><GraduationCap className="mr-2" />Educational Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Highest Qualification *</label>
                <select
                  value={formData.qualification}
                  onChange={e => handleInputChange('qualification', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {qualificationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Course Name & Specialization *</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={e => handleInputChange('course', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>College/Institute Name *</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={e => handleInputChange('college', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Affiliated University (if applicable)</label>
                <input
                  type="text"
                  value={formData.affiliatedUniv}
                  onChange={e => handleInputChange('affiliatedUniv', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Year of Passing / Expected Graduation *</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                    handleInputChange('graduationYear', value);
                  }}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="YYYY"
                  maxLength={4}
                />
                {errors.graduationYear && <p className="text-red-500 text-sm">{errors.graduationYear}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Aggregate Marks / CGPA (Till Now) *</label>
                <input
                  type="text"
                  value={formData.marks}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    handleInputChange('marks', value);
                  }}
                  onBlur={() => {
                    if (formData.marks && (!/^\d{1,2}(\.\d{1,2})?$/.test(formData.marks) || parseFloat(formData.marks) < 0 || parseFloat(formData.marks) > 100)) {
                      setErrors(prev => ({ ...prev, marks: 'Marks must be between 0 and 100' }));
                    } else if (errors.marks) {
                      setErrors(prev => ({ ...prev, marks: '' }));
                    }
                  }}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="e.g., 85 or 8.5"
                />
                {errors.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Are all semesters cleared? *</label>
                <select
                  value={formData.allSemCleared}
                  onChange={e => handleInputChange('allSemCleared', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.allSemCleared && <p className="text-red-500 text-sm">{errors.allSemCleared}</p>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><Layers className="mr-2" />Technical / Domain Skills</h2>
            <div className="mb-4">
              <label className={`block mb-1 font-medium text-black dark:text-white`}>Which technical skills do you possess? *</label>
              <div className="flex flex-wrap gap-3">
                {techSkillOptions.map(skill => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.techSkills.includes(skill)}
                      onChange={() => handleCheckboxChange('techSkills', skill)}
                      className="accent-blue-600"
                    />
                    <span className={darkMode ? 'text-gray-200' : ''}>{skill}</span>
                  </label>
                ))}
              </div>
              {errors.techSkills && <p className="text-red-500 text-sm">{errors.techSkills}</p>}
            </div>
            {formData.techSkills.includes('Others') && (
              <div className="mb-4">
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Other Technical Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.otherTechSkills}
                  onChange={e => handleInputChange('otherTechSkills', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="e.g., TypeScript, React Native, AWS"
                />
              </div>
            )}
            <div>
              <label className={`block mb-1 font-medium text-black dark:text-white`}>Any certification courses completed? (Optional)</label>
              <input
                type="text"
                value={formData.certifications}
                onChange={e => handleInputChange('certifications', e.target.value)}
                className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><Briefcase className="mr-2" />Internship or Project Experience</h2>
            <div className="mb-4">
              <label className={`block mb-1 font-medium text-black dark:text-white`}>Have you done any internship or major project? *</label>
              <select
                value={formData.hasInternship}
                onChange={e => handleInputChange('hasInternship', e.target.value)}
                className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              >
                <option value="">Select</option>
                {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {errors.hasInternship && <p className="text-red-500 text-sm">{errors.hasInternship}</p>}
            </div>
            {formData.hasInternship === 'Yes' && (
              <div className="mb-4">
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Brief Description of Project / Internship *</label>
                <textarea
                  value={formData.projectDesc}
                  onChange={e => handleInputChange('projectDesc', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  rows={4}
                />
                {errors.projectDesc && <p className="text-red-500 text-sm">{errors.projectDesc}</p>}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>GitHub Profile (Optional)</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={e => handleInputChange('github', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>LinkedIn Profile (Optional)</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={e => handleInputChange('linkedin', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><ClipboardCheck className="mr-2" />Job Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Preferred Role / Function Area *</label>
                <input
                  type="text"
                  value={formData.preferredRole}
                  onChange={e => handleInputChange('preferredRole', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="e.g., Software Developer"
                />
                {errors.preferredRole && <p className="text-red-500 text-sm">{errors.preferredRole}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Preferred Job Location(s) *</label>
                <div className="flex flex-wrap gap-3">
                  {locationOptions.map(loc => (
                    <label key={loc} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.preferredLocations.includes(loc)}
                        onChange={() => handleCheckboxChange('preferredLocations', loc)}
                        className="accent-blue-600"
                      />
                      <span className={darkMode ? 'text-gray-200' : ''}>{loc}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredLocations && <p className="text-red-500 text-sm">{errors.preferredLocations}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Immediate Joining Availability? *</label>
                <select
                  value={formData.joining}
                  onChange={e => handleInputChange('joining', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {joiningOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.joining && <p className="text-red-500 text-sm">{errors.joining}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Open to work in rotational/night shifts? *</label>
                <select
                  value={formData.shifts}
                  onChange={e => handleInputChange('shifts', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {shiftOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.shifts && <p className="text-red-500 text-sm">{errors.shifts}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Expected CTC (if applicable)</label>
                <input
                  type="text"
                  value={formData.expectedCTC}
                  onChange={e => {
                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
                    handleInputChange('expectedCTC', value);
                  }}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="e.g., 500000"
                />
                {errors.expectedCTC && <p className="text-red-500 text-sm">{errors.expectedCTC}</p>}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><ListChecks className="mr-2" />General Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>How did you hear about this opportunity? *</label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={e => handleInputChange('source', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.source && <p className="text-red-500 text-sm">{errors.source}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Are you available for online tests and interviews? *</label>
                <select
                  value={formData.onlineTest}
                  onChange={e => handleInputChange('onlineTest', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.onlineTest && <p className="text-red-500 text-sm">{errors.onlineTest}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Do you have a working laptop and stable internet connection? *</label>
                <select
                  value={formData.laptop}
                  onChange={e => handleInputChange('laptop', e.target.value)}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.laptop && <p className="text-red-500 text-sm">{errors.laptop}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Languages Known (Optional)</label>
                <div className="flex flex-wrap gap-3">
                  {languageOptions.map(lang => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={() => handleCheckboxChange('languages', lang)}
                        className="accent-blue-600"
                      />
                      <span className={darkMode ? 'text-gray-200' : ''}>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Aadhar Number (Optional)</label>
                <input
                  type="text"
                  value={formData.aadhar}
                  onChange={e => handleInputChange('aadhar', e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="12-digit Aadhar"
                  maxLength={12}
                />
                {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>PAN Number (Optional)</label>
                <input
                  type="text"
                  value={formData.pan}
                  onChange={e => handleInputChange('pan', e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10))}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
              </div>
              <div>
                <label className={`block mb-1 font-medium text-black dark:text-white`}>Passport Number (Optional)</label>
                <input
                  type="text"
                  value={formData.passport}
                  onChange={e => handleInputChange('passport', e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 9))}
                  className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
                  placeholder="8-9 alphanumeric"
                  maxLength={9}
                />
                {errors.passport && <p className="text-red-500 text-sm">{errors.passport}</p>}
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><FilePlus className="mr-2" />Resume & Documents</h2>
            <div className="mb-4">
              <label className={`block mb-1 font-medium text-black dark:text-white`}>Upload Resume (PDF) *</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => handleFileChange('resume', e.target.files ? e.target.files[0] : null)}
                className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
              {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
            </div>
            <div className="mb-4">
              <label className={`block mb-1 font-medium text-black dark:text-white`}>Upload Academic Documents (Optional, PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => handleFileChange('academics', e.target.files ? e.target.files[0] : null)}
                className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              />
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <h2 className={`text-2xl font-bold mb-4 flex items-center ${darkMode ? 'dark:text-white' : ''}`}><CheckCircle className="mr-2" />Declaration</h2>
            <div className="mb-4">
              <p className={`mb-2 ${darkMode ? 'text-gray-300' : ''}`}>"I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any misrepresentation may lead to disqualification."</p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={e => handleInputChange('agree', e.target.checked)}
                  className="accent-blue-600"
                />
                <span className={darkMode ? 'text-gray-300' : ''}>I agree to be contacted via, Phone, WhatsApp, and Email regarding hiring process and could be considered for any future opprotunities and programs.</span>
              </label>
              {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-xl shadow-2xl z-50 text-lg font-semibold flex items-center animate-bounce">
          <span>🎉 Your form was submitted successfully!</span>
          <button
            onClick={handleClosePopup}
            className="ml-4 p-1 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Close popup"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <div className={`w-full max-w-lg md:max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 sm:p-4 md:p-8`}>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white`}>Enquiry Form</h2>
            <span className={`text-gray-500 dark:text-gray-400`}>Step {step + 1} of {steps.length}</span>
          </div>
          <div className="flex space-x-2 mb-6">
            {steps.map((s, i) => (
              <div key={s} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`}></div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button 
                type="button" 
                onClick={handleBack} 
                disabled={isSubmitting}
                className={`flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 ${darkMode ? 'dark' : ''}`}
              >
                <ChevronLeft className="mr-2" /> Back
              </button>
            )}
            <div className="flex-1"></div>
            {step < steps.length - 1 && (
              <button 
                type="button" 
                onClick={handleNext} 
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ml-auto disabled:opacity-50 ${darkMode ? 'dark' : ''}`}
              >
                Next <ChevronRight className="ml-2" />
              </button>
            )}
            {step === steps.length - 1 && (
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className={`flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors ml-auto disabled:opacity-50 ${darkMode ? 'dark' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" /> Submit
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

// --- ContactPage ---
const ContactPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would verify credentials with your backend
    setUser({ name: 'Demo User', email });
    setIsAuthModalOpen(false);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // In a real app, you would create a new user in your backend
    setUser({ name, email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Header 
        user={user} 
        onAuthClick={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
        onSignup={handleSignup} 
        darkMode={darkMode}
      />
      
      <main className="w-full px-2 sm:px-4 md:px-8 py-8 mt-24">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            Candidate Enquiry Form
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-black">
            Please fill out the form below to submit your enquiry.
          </p>
        </div>
        <ContactForm user={user} darkMode={darkMode} />
      </main>
    </div>
  );
};

export default ContactPage;

export { ContactForm };