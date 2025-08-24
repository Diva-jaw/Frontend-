import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../components/AuthContext';

// Define acceptOptions for "Move to" dropdown
const acceptOptions = ['Round 1', 'Round 2', 'Final Round', 'HR Round'];

// Types for data
interface Candidate {
  id: number;
  name: string;
  email: string;
  round_status: string;
  jobTitle: string;
  applied_date?: string;
}

interface CandidateDetails {
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  altMobile: string;
  email: string;
  currentCity: string;
  homeTown: string;
  willingToRelocate: string;
  qualification: string;
  course: string;
  college: string;
  affiliatedUniv: string;
  graduationYear: string;
  marks: string;
  allSemCleared: string;
  techSkills: string[];
  otherTechSkills: string;
  certifications: string;
  hasInternship: string;
  projectDesc: string;
  github: string;
  linkedin: string;
  preferredRole: string;
  joining: string;
  shifts: string;
  expectedCTC: string;
  source: string;
  onlineTest: string;
  laptop: string;
  languages: string[];
  aadhar: string;
  pan: string;
  passport: string;
  resume: string;
  academics: string;
  jobTitle: string;
}

interface Draft {
  greeting: string;
  link: string;
  editMode: boolean;
  image: File | null;
}

// Default draft states
const defaultAcceptDraft: Draft = {
  greeting: 'Dear Candidate,\n\nCongratulations! You have been shortlisted for the next round.',
  link: 'https://your-test-link.com',
  editMode: false,
  image: null,
};

const defaultRejectDraft: Draft = {
  greeting: 'Dear Candidate,\n\nWe regret to inform you that you have not been selected.',
  link: '',
  editMode: false,
  image: null,
};

import { getApiUrl } from '../../config/api';

// Helper to get full URL for resume/docs
const getFullUrl = (file: string) => {
  if (!file) return '#';
  if (file.startsWith('http')) return file;
  const baseUrl = getApiUrl('');
  // Remove leading slash if present
  const path = file.startsWith('/') ? file : `/${file}`;
  return `${baseUrl}${path}`;
};

const StepAppliedFormsList: React.FC = () => {
  const { department, step } = useParams<{ department: string; step: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for dynamic data
  const [appliedForms, setAppliedForms] = useState<Candidate[]>([]);
  const [candidateDetails, setCandidateDetails] = useState<Record<string, CandidateDetails>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of candidates per page

  // State for UI interactions
  const [statusDropdown, setStatusDropdown] = useState<{ [id: number]: string }>({});
  const [rejectDropdown, setRejectDropdown] = useState<{ [id: number]: string }>({});
  const [moveToDropdown, setMoveToDropdown] = useState<{ [id: number]: string }>({});
  const [acceptDraft, setAcceptDraft] = useState<Draft>({ ...defaultAcceptDraft });
  const [rejectDraft, setRejectDraft] = useState<Draft>({ ...defaultRejectDraft });
  const [showDetailsId, setShowDetailsId] = useState<number | null>(null);
  const [showMailModal, setShowMailModal] = useState<{ id: number; status: string } | null>(null);
  const [mailMessage, setMailMessage] = useState<string>('');
  const [mailLink, setMailLink] = useState<string>('');
  const [sendingMail, setSendingMail] = useState(false);
  const [mailSentFor, setMailSentFor] = useState<{ [id: number]: boolean }>({});
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState<{ name: string; status: string } | null>(null);
  const mailLinkRef = useRef("");

  // Search state
  const [searchName, setSearchName] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [filteredForms, setFilteredForms] = useState<Candidate[]>([]);

  // Filter candidates based on search
  useEffect(() => {
    const filtered = appliedForms.filter(form => {
      const nameMatch = form.name.toLowerCase().includes(searchName.toLowerCase());
      const emailMatch = form.email.toLowerCase().includes(searchEmail.toLowerCase());
      return nameMatch && emailMatch;
    });
    setFilteredForms(filtered);
  }, [appliedForms, searchName, searchEmail]);

  // Click-away logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // Map route param to round name
  const roundNameMap: Record<string, string> = {
    'applied': 'Applied',
    'resume-screening': 'Resume Screening',
    'round-1': 'Round 1',
    'round-2': 'Round 2',
    'final-round': 'Final Round',
    'hr-round': 'HR Round',
    'selected': 'Selected',
    'rejected': 'Rejected'
  };
  const roundParam = step ? roundNameMap[step] || step : '';

  // Helper to map backend applicant details to frontend keys
  function mapApplicantDetails(raw: any) {
    // The backend already returns the correct field names, so we can use them directly
    return {
      fullName: raw.fullName,
      dob: raw.dob,
      gender: raw.gender,
      mobile: raw.mobile,
      altMobile: raw.altMobile,
      email: raw.email,
      currentCity: raw.currentCity,
      homeTown: raw.homeTown,
      willingToRelocate: raw.willingToRelocate,
      qualification: raw.qualification,
      course: raw.course,
      college: raw.college,
      affiliatedUniv: raw.affiliatedUniv,
      graduationYear: raw.graduationYear,
      marks: raw.marks,
      allSemCleared: raw.allSemCleared,
      techSkills: raw.techSkills || [],
      otherTechSkills: raw.otherTechSkills,
      certifications: raw.certifications,
      hasInternship: raw.hasInternship,
      projectDesc: raw.projectDesc,
      github: raw.github,
      linkedin: raw.linkedin,
      preferredRole: raw.preferredRole,
      joining: raw.joining,
      shifts: raw.shifts,
      expectedCTC: raw.expectedCTC,
      source: raw.source,
      onlineTest: raw.onlineTest,
      laptop: raw.laptop,
      languages: raw.languages || [],
      aadhar: raw.aadhar,
      pan: raw.pan,
      passport: raw.passport,
      resume: raw.resume,
      academics: raw.academics,
      jobTitle: raw.jobTitle,
    };
  }

  // Fetch candidate details
  const fetchCandidateDetails = async (applicantId: number) => {
    try {
      setDetailsError(null);
      const baseUrl = getApiUrl('');
      const response = await fetch(`${baseUrl}/application/api/applicants/${applicantId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch applicant details');
      const data = await response.json();
      const mappedData = mapApplicantDetails(data);
      setCandidateDetails((prev) => ({ ...prev, [applicantId]: mappedData }));
    } catch (err) {
      setDetailsError('Error fetching applicant details. Please try again.');
      console.error(`Error fetching details for applicant ${applicantId}:`, err);
    }
  };

  // Fetch candidates with pagination
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!department || !step) throw new Error('Missing department or step');
        const data = await apiService.fetchApplicantsByDepartment(department, roundParam, page, limit);
        // Map backend data to Candidate[]
        setAppliedForms(
          data.data.map((app: any) => ({
            id: app.applicant_id,
            name: app.full_name,
            email: app.email || '', // fallback if email is missing
            round_status: app.round_status || 'in_progress', // add round_status
            jobTitle: app.job_title || '—',
            applied_date: app.applied_at || app.created_at, // include applied date
          }))
        );
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        setError('Error fetching candidates. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [department, step, page]);

  // Add a function to move applicant to next round
  const moveApplicant = async (id: number, toRound: string, status: 'cleared' | 'rejected') => {
    if (!department) return;
    try {
      await apiService.moveApplicantToRound(department, id, toRound, status);
      // Optionally refetch applicants or update UI
    } catch (err) {
      alert('Failed to move applicant');
    }
  };

  // Fetch details when showDetailsId changes
  useEffect(() => {
    if (showDetailsId && !candidateDetails[showDetailsId]) {
      fetchCandidateDetails(showDetailsId);
    }
  }, [showDetailsId]);

  // Accept/Reject candidate lists
  const acceptedCandidates = appliedForms.filter((f) => statusDropdown[f.id] === 'Accept');
  const rejectedCandidates = appliedForms.filter((f) => statusDropdown[f.id] === 'Reject');

  // Draft edit handlers
  const handleDraftEdit = (draftType: 'accept' | 'reject', field: 'greeting' | 'link', value: string) => {
    if (draftType === 'accept') {
      setAcceptDraft((prev) => ({ ...prev, [field]: value }));
    } else {
      setRejectDraft((prev) => ({ ...prev, [field]: value }));
    }
  };

  const toggleEditMode = (draftType: 'accept' | 'reject') => {
    if (draftType === 'accept') {
      setAcceptDraft((prev) => ({ ...prev, editMode: !prev.editMode }));
    } else {
      setRejectDraft((prev) => ({ ...prev, editMode: !prev.editMode }));
    }
  };

  const handleImageChange = (draftType: 'accept' | 'reject', file: File | null) => {
    if (draftType === 'accept') {
      setAcceptDraft((prev) => ({ ...prev, image: file }));
    } else {
      setRejectDraft((prev) => ({ ...prev, image: file }));
    }
  };

  // Send email handlers
  const handleSendAll = async (draftType: 'accept' | 'reject') => {
    const list = draftType === 'accept' ? acceptedCandidates : rejectedCandidates;
    const draft = draftType === 'accept' ? acceptDraft : rejectDraft;
    const baseUrl = getApiUrl('');
    try {
      await Promise.all(
        list.map((candidate) => {
          return fetch(`${baseUrl}/application/api/send-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
            },
            body: JSON.stringify({
              email: candidate.email,
              message: draft.greeting,
              link: draftType === 'accept' ? draft.link : undefined,
            }),
          });
        })
      );
      alert(`Emails sent to ${list.length} candidates!`);
    } catch (error) {
      alert('Error sending emails');
    }
  };

  const handleStatusChange = (id: number, value: string) => {
    setStatusDropdown((prev) => ({ ...prev, [id]: value }));
    if (value === 'Reject') {
      setMoveToDropdown((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSendMail = async (candidate: Candidate, status: string, moveTo: string) => {
    try {
      const baseUrl = getApiUrl('');
      console.log('Sending mail with link:', mailLinkRef.current); // Debug log
      const movePromise = status === 'Accept'
        ? moveApplicant(candidate.id, moveTo, 'cleared')
        : moveApplicant(candidate.id, roundParam, 'rejected');
      const mailPromise = fetch(`${baseUrl}/application/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
        body: JSON.stringify({
          email: candidate.email,
          message: mailMessage,
          link: mailLinkRef.current,
          status: status === 'Accept' ? 'accept' : 'reject',
        }),
      });
      const [moveRes, mailRes] = await Promise.all([movePromise, mailPromise]);
      if (!mailRes.ok) throw new Error('Mail send failed');
      setMailSentFor(prev => ({ ...prev, [candidate.id]: true }));
      setShowSuccessPopup({ name: candidate.name, status });
      setTimeout(() => setShowSuccessPopup(null), 3000);
    } catch (error) {
      alert('Error sending email or updating status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading candidates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 capitalize tracking-tight">
            {department} - {step?.replace(/-/g, ' ') === 'final round' ? 'Round 3' : step?.replace(/-/g, ' ')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Applied Forms Management</p>
        </div>

        {/* Draft Editing UI */}
        {/* REMOVE the global Acceptance Draft and Rejection Draft boxes here */}

        {/* Search Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search by Name</label>
              <input
                type="text"
                placeholder="Enter candidate name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search by Email</label>
              <input
                type="text"
                placeholder="Enter candidate email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="w-[15%] px-6 py-4 text-left text-white font-bold text-lg tracking-wide">Job Title</th>
                  <th className="w-[12%] px-6 py-4 text-left text-white font-bold text-lg tracking-wide">Name</th>
                  <th className="w-[18%] px-6 py-4 text-left text-white font-bold text-lg tracking-wide">Email</th>
                  <th className="w-[12%] px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Date Applied</th>
                  <th className="w-[12%] px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Status</th>
                  <th className="w-[12%] px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Move to</th>
                  <th className="w-[12%] px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredForms.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      {appliedForms.length === 0 ? 'No candidates found for this department and step.' : 'No candidates match your search criteria.'}
                    </td>
                  </tr>
                ) : (
                  filteredForms.map((form, idx) => {
                    const status = statusDropdown[form.id];
                    // Use round_status from backend
                    const roundStatus = form.round_status;
                    const jobTitle = form.jobTitle || '—';
                    return (
                      <tr
                        key={form.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-25 dark:bg-gray-750'}`}
                      >
                        <td className="px-6 py-4 font-semibold text-blue-900 dark:text-blue-300 whitespace-nowrap">{jobTitle}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                              {form.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white text-lg">{form.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{form.email}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {form.applied_date ? new Date(form.applied_date).toLocaleDateString() : '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {roundStatus === 'cleared' ? (
                            <span className="px-4 py-2 rounded-lg font-semibold bg-green-100 text-green-800">
                              ✅ Accepted
                            </span>
                          ) : roundStatus === 'rejected' ? (
                            <span className="px-4 py-2 rounded-lg font-semibold bg-red-100 text-red-800">
                              ❌ Rejected
                            </span>
                          ) : (
                            <select
                              className={`w-full border-2 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium ${
                                status === 'Accept'
                                  ? 'border-green-300 bg-green-50 text-green-800'
                                  : status === 'Reject'
                                  ? 'border-red-300 bg-red-50 text-red-800'
                                  : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                              }`}
                              value={status || ''}
                              onChange={(e) => handleStatusChange(form.id, e.target.value)}
                            >
                              <option value="">Select Status</option>
                              <option value="Accept">✅ Accept</option>
                              <option value="Reject">❌ Reject</option>
                            </select>
                          )}
                        </td>
                        {/* Conditionally render Move to dropdown only if status is not Reject and roundStatus is not cleared/rejected */}
                        {roundStatus === 'in_progress' && status !== 'Reject' ? (
                          <td className="px-6 py-4 text-center">
                            <select
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium bg-white text-gray-700 hover:border-blue-400"
                              value={moveToDropdown[form.id] || ''}
                              onChange={(e) => setMoveToDropdown({ ...moveToDropdown, [form.id]: e.target.value })}
                            >
                              <option value="">Select Round</option>
                              {acceptOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option === 'Final Round' ? 'Round 3' : option}
                                </option>
                              ))}
                            </select>
                          </td>
                        ) : (
                          <td className="px-6 py-4 text-center"></td>
                        )}
                        <td className="px-6 py-4 text-center flex items-center justify-center gap-2">
                          {/* Eye icon for details */}
                          <button
                            className="text-blue-600 hover:text-blue-800 focus:outline-none mr-2"
                            onClick={() => setShowDetailsId(form.id)}
                            title="View Details"
                          >
                            <Eye size={22} />
                          </button>
                          {/* Send Mail button logic */}
                          <button
                            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-white shadow transition-all duration-200 ${
                              (status === 'Reject' || (status === 'Accept' && moveToDropdown[form.id]))
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 cursor-pointer'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={mailSentFor[form.id] || !(status === 'Reject' || (status === 'Accept' && moveToDropdown[form.id]))}
                            onClick={() => {
                              if (status === 'Reject' || (status === 'Accept' && moveToDropdown[form.id])) {
                                setShowMailModal({ id: form.id, status });
                              }
                            }}
                          >
                            <span role="img" aria-label="mail">📧</span> Send Mail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="mx-4 py-2">Page {page} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}

        {showDetailsId && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-gray-900/60 backdrop-blur-[2px] pt-4 pb-12 px-4">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-[1100px] mx-auto relative flex flex-col transform transition-all duration-200">
    <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-t-xl px-8 py-6 flex items-center justify-between border-b border-gray-200/80 dark:border-gray-700/80">
      <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">Applicant Details</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-[15px] font-medium">Complete profile information</p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl p-2 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 rounded-lg transition-all duration-150 -mr-2 hover:rotate-90" 
                  onClick={() => setShowDetailsId(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-10 overflow-y-auto px-8 py-7 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-500 scrollbar-track-transparent">
                <section className="border-b border-gray-200/80 dark:border-gray-700/80 pb-9">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-blue-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Personal Details</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1.5 group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg px-3 transition-all duration-200">
                      <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-150 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-tight min-w-[180px]">
                        Full Name
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 text-left sm:text-right break-words flex-1">
                        <span className="font-semibold">{candidateDetails[String(showDetailsId)]?.fullName}</span>
                      </span>
                    </div>
                    <Detail label="Date of Birth" value={candidateDetails[String(showDetailsId)]?.dob} />
                    <Detail label="Gender" value={candidateDetails[String(showDetailsId)]?.gender} />
                    <Detail
                      label="Mobile"
                      value={<span className="font-bold text-blue-800">{candidateDetails[String(showDetailsId)]?.mobile}</span>}
                    />
                    <Detail
                      label="Alternate Contact Number"
                      value={candidateDetails[String(showDetailsId)]?.altMobile || '—'}
                    />
                    <Detail
                      label="Email"
                      value={
                        <a
                          href={`mailto:${candidateDetails[String(showDetailsId)]?.email}`}
                          className="font-bold text-blue-700 underline break-words"
                        >
                          {candidateDetails[String(showDetailsId)]?.email}
                        </a>
                      }
                    />
                    <Detail label="Job Title" value={candidateDetails[String(showDetailsId)]?.jobTitle || '—'} />
                  </div>
                </section>

                <section className="border-b border-gray-200/80 dark:border-gray-700/80 pb-9">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-green-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Location Details</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <Detail label="Current City" value={candidateDetails[String(showDetailsId)]?.currentCity} />
                    <Detail label="Home Town / Permanent Address" value={candidateDetails[String(showDetailsId)]?.homeTown} />
                    <Detail 
  label="Willing to Relocate?" 
  value={Number(candidateDetails[String(showDetailsId)]?.willingToRelocate) === 1 ? 'Yes' : 'No'} 
/>
                  </div>
                </section>

                <section className="border-b border-gray-200/80 dark:border-gray-700/80 pb-9">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-purple-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Educational Background</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <Detail label="Highest Qualification" value={candidateDetails[String(showDetailsId)]?.qualification} />
                    <Detail label="Course Name & Specialization" value={candidateDetails[String(showDetailsId)]?.course} />
                    <Detail label="College/Institute Name" value={candidateDetails[String(showDetailsId)]?.college} />
                    <Detail
                      label="Affiliated University"
                      value={candidateDetails[String(showDetailsId)]?.affiliatedUniv || '—'}
                    />
                    <Detail
                      label="Year of Passing / Expected Graduation"
                      value={candidateDetails[String(showDetailsId)]?.graduationYear}
                    />
                    <Detail label="Aggregate Marks / CGPA (Till Now)" value={candidateDetails[String(showDetailsId)]?.marks} />
                    <Detail 
  label="Are all semesters cleared?" 
  value={Number(candidateDetails[String(showDetailsId)]?.allSemCleared) === 1 ? 'Yes' : 'No'} 
/>
                  </div>
                </section>

                <section className="border-b border-gray-200/80 dark:border-gray-700/80 pb-9">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-orange-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Technical Skills & Experience</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1.5 group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg px-3 transition-all duration-200">
                      <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-150 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-tight min-w-[180px]">
                        Technical Skills
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 text-left sm:text-right break-words flex-1">
                        {candidateDetails[String(showDetailsId)]?.techSkills && candidateDetails[String(showDetailsId)]?.techSkills.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {candidateDetails[String(showDetailsId)]?.techSkills.map((skill: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          '—'
                        )}
                      </span>
                    </div>
                    <Detail label="Other Technical Skills" value={candidateDetails[String(showDetailsId)]?.otherTechSkills || '—'} />
                    <Detail label="Certifications" value={candidateDetails[String(showDetailsId)]?.certifications || '—'} />
                    <Detail 
                      label="Internship Experience" 
                      value={Number(candidateDetails[String(showDetailsId)]?.hasInternship) === 1 ? 'Yes' : 'No'} 
                    />
                    <div className="lg:col-span-2">
                      <Detail label="Project Description" value={candidateDetails[String(showDetailsId)]?.projectDesc || '—'} />
                    </div>
                    <Detail 
                      label="GitHub Profile" 
                      value={candidateDetails[String(showDetailsId)]?.github ? (
                        <a 
                          href={candidateDetails[String(showDetailsId)]?.github}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-words font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View GitHub Profile
                        </a>
                      ) : '—'} 
                    />
                    <Detail 
                      label="LinkedIn Profile" 
                      value={candidateDetails[String(showDetailsId)]?.linkedin ? (
                        <a 
                          href={candidateDetails[String(showDetailsId)]?.linkedin}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-words font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View LinkedIn Profile
                        </a>
                      ) : '—'} 
                    />
                  </div>
                </section>

                <section className="border-b border-gray-200/80 dark:border-gray-700/80 pb-9">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-indigo-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Professional Information</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <Detail label="Preferred Role" value={candidateDetails[String(showDetailsId)]?.preferredRole || '—'} />
                    <Detail 
                      label="Immediate Joining" 
                      value={Number(candidateDetails[String(showDetailsId)]?.joining) === 1 ? 'Yes' : 'No'} 
                    />
                    <Detail 
                      label="Open to Shifts" 
                      value={Number(candidateDetails[String(showDetailsId)]?.shifts) === 1 ? 'Yes' : 'No'} 
                    />
                    <Detail label="Expected CTC" value={candidateDetails[String(showDetailsId)]?.expectedCTC || '—'} />
                    <Detail label="Opportunity Source" value={candidateDetails[String(showDetailsId)]?.source || '—'} />
                    <Detail 
                      label="Available for Online Tests" 
                      value={Number(candidateDetails[String(showDetailsId)]?.onlineTest) === 1 ? 'Yes' : 'No'} 
                    />
                    <Detail 
                      label="Has Laptop & Internet" 
                      value={Number(candidateDetails[String(showDetailsId)]?.laptop) === 1 ? 'Yes' : 'No'} 
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1.5 group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg px-3 transition-all duration-200">
                      <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-150 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-tight min-w-[180px]">
                        Languages Known
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 text-left sm:text-right break-words flex-1">
                        {candidateDetails[String(showDetailsId)]?.languages && candidateDetails[String(showDetailsId)]?.languages.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {candidateDetails[String(showDetailsId)]?.languages.map((language: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                {language}
                              </span>
                            ))}
                          </div>
                        ) : (
                          '—'
                        )}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="border-b border-gray-200/80 dark:border-gray-700/80 pb-9">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-red-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Identity Documents</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <Detail label="Aadhar Number" value={candidateDetails[String(showDetailsId)]?.aadhar || '—'} />
                    <Detail label="PAN Number" value={candidateDetails[String(showDetailsId)]?.pan || '—'} />
                    <Detail 
                      label="Passport Available" 
                      value={Number(candidateDetails[String(showDetailsId)]?.passport) === 1 ? 'Yes' : 'No'} 
                    />
                  </div>
                </section>

                <section className="pb-6">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 tracking-tight flex items-center group">
                    <span className="w-1 h-6 bg-teal-600 rounded-full mr-3 shadow-sm group-hover:h-7 transition-all duration-200"></span>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">Resume & Documents</span>
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1.5 group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg px-3 transition-all duration-200">
                      <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-150 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-tight min-w-[180px]">
                        Resume
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 text-left sm:text-right break-words flex-1">
                        <a 
                          href={getFullUrl(candidateDetails[String(showDetailsId)]?.resume)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-words font-medium hover:decoration-2 transition-all duration-150 inline-flex items-center gap-1 hover:gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-1.5 group hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg px-3 transition-all duration-200">
                      <span className="font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-150 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-tight min-w-[180px]">
                        Academic Documents
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 text-left sm:text-right break-words flex-1">
                        {candidateDetails[String(showDetailsId)]?.academics ? (
                          <a 
                            href={getFullUrl(candidateDetails[String(showDetailsId)]?.academics)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-words font-medium hover:decoration-2 transition-all duration-150 inline-flex items-center gap-1 hover:gap-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Documents
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          '—'
                        )}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {showMailModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md mx-auto p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl font-bold p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
                onClick={() => {
                  setShowMailModal(null);
                  setMailMessage('');
                  setMailLink('');
                  mailLinkRef.current = ''; // Reset ref
                }}
                aria-label="Close"
              >
                ×
              </button>
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    showMailModal.status === 'Reject' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-green-100 dark:bg-green-900/20'
                  }`}
                >
                  {showMailModal.status === 'Reject' ? <span className="text-2xl">❌</span> : <span className="text-2xl">✅</span>}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {showMailModal.status === 'Reject' ? 'Send Rejection Mail' : 'Send Acceptance Mail'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Customize your message for {appliedForms.find((f) => f.id === showMailModal.id)?.name}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Message:</label>
                  <textarea
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 text-black dark:text-white dark:bg-gray-700"
                    rows={4}
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    placeholder={showMailModal.status === 'Reject' ? 'Enter rejection message...' : 'Enter acceptance message...'}
                  />
                </div>
                {/* Show Link field for both Accept and Reject, but make it optional */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Link (optional):</label>
                  <input
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black dark:text-white dark:bg-gray-700"
                    value={mailLink}
                    onChange={(e) => {
                      setMailLink(e.target.value);
                      mailLinkRef.current = e.target.value;
                    }}
                    placeholder="Enter test or next round link..."
                  />
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-105 ${
                    showMailModal.status === 'Reject'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }`}
                  onClick={async () => {
                    setSendingMail(true);
                    const candidate = appliedForms.find((f) => f.id === showMailModal.id);
                    if (candidate) {
                      await handleSendMail(candidate, showMailModal.status, moveToDropdown[candidate.id]);
                    }
                    setShowMailModal(null);
                    setMailMessage('');
                    setMailLink('');
                    mailLinkRef.current = ''; // Reset ref
                    setSendingMail(false);
                  }}
                  disabled={sendingMail}
                >
                  {sendingMail
                    ? (showMailModal.status === 'Reject' ? 'Sending Rejection Mail...' : 'Sending Acceptance Mail...')
                    : (showMailModal.status === 'Reject' ? 'Send Rejection Mail' : 'Send Acceptance Mail')}
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccessPopup && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[99999]">
            <div className="px-8 py-4 rounded-2xl shadow-2xl text-center text-blue-900 font-bold text-xl animate-fadeIn"
              style={{
                background: 'rgba(173, 216, 230, 0.85)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
                borderRadius: '2rem',
                fontFamily: 'inherit',
                letterSpacing: '0.03em',
              }}>
              {showSuccessPopup.status === 'Reject' ? 'Rejection mail sent to ' : 'Acceptance mail sent to '}{showSuccessPopup.name}!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for details row
const Detail = ({ label, value }: { label: string; value: React.ReactNode }) => {
  // Helper to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  let displayValue = value;
  if (label === 'Date of Birth' && typeof value === 'string') {
    displayValue = formatDate(value);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-2 group hover:bg-gradient-to-r hover:from-slate-50 dark:hover:from-gray-700 hover:to-transparent rounded-lg px-3 transition-all duration-200">
      <span className="font-medium text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-gray-200 transition-colors duration-150 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-tight min-w-[180px]">
        {label}
      </span>
      <span className="text-slate-800 dark:text-gray-100 text-left sm:text-right break-words flex-1">
        {typeof displayValue === 'string' && displayValue.endsWith('.pdf') && (label === 'Resume' || label === 'Academic Documents') ? (
          <a href={getFullUrl(displayValue)} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1.5 hover:gap-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 px-3 py-1 rounded-full transition-all duration-150" target="_blank" rel="noopener noreferrer">
            View {label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          displayValue
        )}
      </span>
    </div>
  );
};

export default StepAppliedFormsList;