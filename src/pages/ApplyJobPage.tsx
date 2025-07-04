import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, MapPin, GraduationCap, Layers, Briefcase, ClipboardCheck, ListChecks, FilePlus, CheckCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useToast } from '../components/ToastContext';
import { getApiUrl } from '../config/api';

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

const ApplyJobPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  // Read job info from location.state or localStorage
  const jobTitle = location.state?.jobTitle || localStorage.getItem('jobTitle') || '';
  const jobpost_id = location.state?.jobpost_id || localStorage.getItem('jobpost_id');

  // Store job info in localStorage if present in location.state
  useEffect(() => {
    if (location.state?.jobTitle && location.state?.jobpost_id) {
      localStorage.setItem('jobTitle', location.state.jobTitle);
      localStorage.setItem('jobpost_id', location.state.jobpost_id);
    }
  }, [location.state]);

  const [formData, setFormData] = useState<typeof initialFormData & { [key: string]: any }>({ ...initialFormData });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [jobError, setJobError] = useState('');
  const { setToast } = useToast();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  // Redirect to job board if jobpost_id is missing after both checks
  useEffect(() => {
    if (!jobpost_id) {
      setJobError('No job selected. Please apply from the Job Board.');
      setTimeout(() => {
        navigate('/job-board');
      }, 2500);
    }
  }, [jobpost_id, navigate]);

  // Auto-fill fullName and email if user is logged in and fields are empty
  useEffect(() => {
    if (user) {
      if (user.name && !formData.fullName) {
        setFormData(prev => ({ ...prev, fullName: user.name }));
      }
      if (user.email && !formData.email) {
        setFormData(prev => ({ ...prev, email: user.email }));
      }
    }
  }, [user, formData.fullName, formData.email]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (isSubmitting) return;
    if (!jobpost_id) {
      setJobError('No job selected. Please apply from the Job Board.');
      return;
    }
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      if (formData.resume) formDataToSend.append('resume', formData.resume);
      if (formData.academics) formDataToSend.append('academics', formData.academics);
      const { resume, academics, ...fieldsToSend } = formData;
      formDataToSend.append('data', JSON.stringify({ ...fieldsToSend, jobTitle, user_id: user?.id, jobpost_id }));
              await axios.post(getApiUrl('/application/upload'), formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setToast({
        message: 'Application submitted successfully! We will contact you soon.',
        icon: <CheckCircle className="text-green-500" size={28} />
      });
      setSubmitted(true);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setSubmitted(false);
        setStep(0);
        setFormData({ ...initialFormData });
        navigate('/');
      }, 3000);
    } catch (error) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><User className="mr-2" />Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-black">Full Name *</label>
                <input type="text" value={formData.fullName} onChange={e => handleInputChange('fullName', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="As per Aadhaar or ID" />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Date of Birth *</label>
                <input type="date" value={formData.dob} onChange={e => handleInputChange('dob', e.target.value)} max="2020-12-31" className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Gender *</label>
                <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select</option>
                  {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Mobile Number *</label>
                <input type="tel" value={formData.mobile} onChange={e => { const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10); handleInputChange('mobile', value); }} onKeyDown={e => { if (formData.mobile.length >= 10 && e.key !== 'Backspace' && e.key !== 'Tab') { e.preventDefault(); } }} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="Primary Mobile" maxLength={10} />
                {formData.mobile.length === 10 && (<p className="text-yellow-500 text-sm mt-1" aria-live="polite">Maximum 10 digits allowed</p>)}
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Alternate Contact Number</label>
                <input type="tel" value={formData.altMobile} onChange={e => { const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10); handleInputChange('altMobile', value); }} onKeyDown={e => { if (formData.altMobile.length >= 10 && e.key !== 'Backspace' && e.key !== 'Tab') { e.preventDefault(); } }} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="Optional" maxLength={10} />
                {formData.altMobile.length === 10 && (<p className="text-yellow-500 text-sm mt-1" aria-live="polite">Maximum 10 digits allowed</p>)}
                {errors.altMobile && <p className="text-red-500 text-sm">{errors.altMobile}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Email Address *</label>
                <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="Official / Personal" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><MapPin className="mr-2" />Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-black">Current City *</label>
                <input type="text" value={formData.currentCity} onChange={e => handleInputChange('currentCity', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                {errors.currentCity && <p className="text-red-500 text-sm">{errors.currentCity}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Home Town / Permanent Address *</label>
                <input type="text" value={formData.homeTown} onChange={e => handleInputChange('homeTown', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                {errors.homeTown && <p className="text-red-500 text-sm">{errors.homeTown}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Willing to Relocate? *</label>
                <select value={formData.willingToRelocate} onChange={e => handleInputChange('willingToRelocate', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
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
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><GraduationCap className="mr-2" />Educational Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-black">Highest Qualification *</label>
                <select value={formData.qualification} onChange={e => handleInputChange('qualification', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select</option>
                  {qualificationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Course Name & Specialization *</label>
                <input type="text" value={formData.course} onChange={e => handleInputChange('course', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">College/Institute Name *</label>
                <input type="text" value={formData.college} onChange={e => handleInputChange('college', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                {errors.college && <p className="text-red-500 text-sm">{errors.college}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Affiliated University (if applicable)</label>
                <input type="text" value={formData.affiliatedUniv} onChange={e => handleInputChange('affiliatedUniv', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Year of Passing / Expected Graduation *</label>
                <input type="text" value={formData.graduationYear} onChange={e => { const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4); handleInputChange('graduationYear', value); }} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="YYYY" maxLength={4} />
                {errors.graduationYear && <p className="text-red-500 text-sm">{errors.graduationYear}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Aggregate Marks / CGPA (Till Now) *</label>
                <input type="text" value={formData.marks} onChange={e => { const value = e.target.value.replace(/[^0-9.]/g, ''); handleInputChange('marks', value); }} onBlur={() => { if (formData.marks && (!/^\d{1,2}(\.\d{1,2})?$/.test(formData.marks) || parseFloat(formData.marks) < 0 || parseFloat(formData.marks) > 100)) { setErrors(prev => ({ ...prev, marks: 'Marks must be between 0 and 100' })); } else if (errors.marks) { setErrors(prev => ({ ...prev, marks: '' })); } }} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="e.g., 85 or 8.5" />
                {errors.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Are all semesters cleared? *</label>
                <select value={formData.allSemCleared} onChange={e => handleInputChange('allSemCleared', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
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
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><Layers className="mr-2" />Technical / Domain Skills</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-black">Which technical skills do you possess? *</label>
              <div className="flex flex-wrap gap-3">
                {techSkillOptions.map(skill => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input type="checkbox" checked={formData.techSkills.includes(skill)} onChange={() => handleCheckboxChange('techSkills', skill)} className="accent-blue-600" />
                    <span className="text-black">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.techSkills && <p className="text-red-500 text-sm">{errors.techSkills}</p>}
            </div>
            {formData.techSkills.includes('Others') && (
              <div className="mb-4">
                <label className="block mb-1 font-medium text-black">Other Technical Skills (comma-separated)</label>
                <input type="text" value={formData.otherTechSkills} onChange={e => handleInputChange('otherTechSkills', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="e.g., TypeScript, React Native, AWS" />
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium text-black">Any certification courses completed? (Optional)</label>
              <input type="text" value={formData.certifications} onChange={e => handleInputChange('certifications', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><Briefcase className="mr-2" />Internship or Project Experience</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-black">Have you done any internship or major project? *</label>
              <select value={formData.hasInternship} onChange={e => handleInputChange('hasInternship', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option value="">Select</option>
                {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {errors.hasInternship && <p className="text-red-500 text-sm">{errors.hasInternship}</p>}
            </div>
            {formData.hasInternship === 'Yes' && (
              <div className="mb-4">
                <label className="block mb-1 font-medium text-black">Brief Description of Project / Internship *</label>
                <textarea value={formData.projectDesc} onChange={e => handleInputChange('projectDesc', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" rows={4} />
                {errors.projectDesc && <p className="text-red-500 text-sm">{errors.projectDesc}</p>}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-black">GitHub Profile (Optional)</label>
                <input type="url" value={formData.github} onChange={e => handleInputChange('github', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="https://github.com/username" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">LinkedIn Profile (Optional)</label>
                <input type="url" value={formData.linkedin} onChange={e => handleInputChange('linkedin', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="https://linkedin.com/in/username" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><ClipboardCheck className="mr-2" />Job Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-black">Preferred Role / Function Area *</label>
                <input type="text" value={formData.preferredRole} onChange={e => handleInputChange('preferredRole', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="e.g., Software Developer" />
                {errors.preferredRole && <p className="text-red-500 text-sm">{errors.preferredRole}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Preferred Job Location(s) *</label>
                <div className="flex flex-wrap gap-3">
                  {locationOptions.map(loc => (
                    <label key={loc} className="flex items-center space-x-2">
                      <input type="checkbox" checked={formData.preferredLocations.includes(loc)} onChange={() => handleCheckboxChange('preferredLocations', loc)} className="accent-blue-600" />
                      <span className="text-black">{loc}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredLocations && <p className="text-red-500 text-sm">{errors.preferredLocations}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Immediate Joining Availability? *</label>
                <select value={formData.joining} onChange={e => handleInputChange('joining', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select</option>
                  {joiningOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.joining && <p className="text-red-500 text-sm">{errors.joining}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Open to work in rotational/night shifts? *</label>
                <select value={formData.shifts} onChange={e => handleInputChange('shifts', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select</option>
                  {shiftOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.shifts && <p className="text-red-500 text-sm">{errors.shifts}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Expected CTC (if applicable)</label>
                <input type="text" value={formData.expectedCTC} onChange={e => { const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 8); handleInputChange('expectedCTC', value); }} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="e.g., 500000" />
                {errors.expectedCTC && <p className="text-red-500 text-sm">{errors.expectedCTC}</p>}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><ListChecks className="mr-2" />General Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-black">How did you hear about this opportunity? *</label>
                <input type="text" value={formData.source} onChange={e => handleInputChange('source', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                {errors.source && <p className="text-red-500 text-sm">{errors.source}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Are you available for online tests and interviews? *</label>
                <select value={formData.onlineTest} onChange={e => handleInputChange('onlineTest', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.onlineTest && <p className="text-red-500 text-sm">{errors.onlineTest}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Do you have a working laptop and stable internet connection? *</label>
                <select value={formData.laptop} onChange={e => handleInputChange('laptop', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                  <option value="">Select</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.laptop && <p className="text-red-500 text-sm">{errors.laptop}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Languages Known (Optional)</label>
                <div className="flex flex-wrap gap-3">
                  {languageOptions.map(lang => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input type="checkbox" checked={formData.languages.includes(lang)} onChange={() => handleCheckboxChange('languages', lang)} className="accent-blue-600" />
                      <span className="text-black">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Aadhar Number (Optional)</label>
                <input type="text" value={formData.aadhar} onChange={e => handleInputChange('aadhar', e.target.value.replace(/[^0-9]/g, '').slice(0, 12))} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="12-digit Aadhar" maxLength={12} />
                {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">PAN Number (Optional)</label>
                <input type="text" value={formData.pan} onChange={e => handleInputChange('pan', e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10))} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="ABCDE1234F" maxLength={10} />
                {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-black">Passport Number (Optional)</label>
                <input type="text" value={formData.passport} onChange={e => handleInputChange('passport', e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 9))} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500" placeholder="8-9 alphanumeric" maxLength={9} />
                {errors.passport && <p className="text-red-500 text-sm">{errors.passport}</p>}
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><FilePlus className="mr-2" />Resume & Documents</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-black">Upload Resume (PDF) *</label>
              <input type="file" accept="application/pdf" onChange={e => handleFileChange('resume', e.target.files ? e.target.files[0] : null)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-black">Upload Academic Documents (Optional, PDF)</label>
              <input type="file" accept="application/pdf" onChange={e => handleFileChange('academics', e.target.files ? e.target.files[0] : null)} className="w-full p-2 border border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center text-black"><CheckCircle className="mr-2" />Declaration</h2>
            <div className="mb-4">
              <p className="mb-2 text-black">"I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any misrepresentation may lead to disqualification."</p>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.agree} onChange={e => handleInputChange('agree', e.target.checked)} className="accent-blue-600" />
                <span className="text-black">I agree to be contacted via, Phone, WhatsApp, and Email regarding hiring process and could be considered for any future opprotunities and programs.</span>
              </label>
              {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (submitted && !showPopup) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="text-green-600" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Form Submitted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your application. We will get back to you soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Fill Another Form
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Please log in to apply for a job.</h2>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/signin')}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 md:px-0 flex flex-col items-center">
      {jobError && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center max-w-lg">
          {jobError}
        </div>
      )}
      <div className="w-full max-w-lg md:max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-2 sm:p-4 md:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">Job Application Form</h2>
          </div>
          {jobTitle && (
            <div className="mb-4 text-blue-700 font-semibold text-xl">Applying for: <span className="font-bold">{jobTitle}</span></div>
          )}
          <div className="flex space-x-2 mb-6">
            {steps.map((s, i) => (
              <div key={s} className={`flex-1 h-2 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <button type="button" onClick={handleBack} disabled={isSubmitting} className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50">
                <ChevronLeft className="mr-2" /> Back
              </button>
            )}
            <div className="flex-1"></div>
            {step < steps.length - 1 && (
              <button type="button" onClick={handleNext} disabled={isSubmitting} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ml-auto disabled:opacity-50">
                Next <ChevronRight className="ml-2" />
              </button>
            )}
            {step === steps.length - 1 && (
              <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors ml-auto disabled:opacity-50">
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
    </div>
  );
};

export default ApplyJobPage; 