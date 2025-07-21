import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { apiService } from '../../services/api';
import { getApplicantUrl, getEmailUrl, getFileUrl } from '../../config/api';
import { useAuth } from '../../components/AuthContext';

// Define acceptOptions for "Move to" dropdown
const acceptOptions = ['Round 1', 'Round 2', 'Final Round', 'HR Round'];

// Types for data
interface Candidate {
  id: number;
  name: string;
  email: string;
  round_status: string; // add this line
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
    // General snake_case to camelCase
    const camel: any = {};
    for (const key in raw) {
      const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
      camel[camelKey] = raw[key];
    }
    // Explicit mapping for fields your UI expects
    return {
      fullName: camel.fullName,
      dob: camel.dateOfBirth,
      gender: camel.gender,
      mobile: camel.mobileNumber,
      altMobile: camel.alternateContactNumber,
      email: camel.email,
      currentCity: camel.currentCity,
      homeTown: camel.homeTown,
      willingToRelocate: camel.willingToRelocate,
      qualification: camel.highestQualification,
      course: camel.courseName,
      college: camel.collegeUniversity,
      affiliatedUniv: camel.affiliatedUniversity,
      graduationYear: camel.yearOfPassing,
      marks: camel.aggregateMarks,
      allSemCleared: camel.allSemestersCleared,
      techSkills: camel.techSkills || [],
      otherTechSkills: camel.otherTechSkills,
      certifications: camel.certificateName,
      hasInternship: camel.internshipProjectExperience,
      projectDesc: camel.projectDescription,
      github: camel.githubLink,
      linkedin: camel.linkedinLink,
      preferredRole: camel.preferredRole,
      joining: camel.immediateJoining,
      shifts: camel.openToShifts,
      expectedCTC: camel.expectedCtc,
      source: camel.opportunitySource,
      onlineTest: camel.availableForOnlineTests,
      laptop: camel.hasLaptopInternet,
      languages: camel.languages || [],
      aadhar: camel.aadharNumber,
      pan: camel.panNo,
      passport: camel.passportAvailable,
      resume: camel.resumePath,
      academics: camel.academicDocsPath,
      // Add any other fields as needed
    };
  }

  // Fetch candidate details
  const fetchCandidateDetails = async (applicantId: number) => {
    try {
      setDetailsError(null);
      const response = await fetch(getApplicantUrl('', `/${applicantId}`), {
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
    try {
      await Promise.all(
        list.map((candidate) => {
          return fetch(getEmailUrl(), {
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
      console.log('Sending mail with link:', mailLinkRef.current); // Debug log
      const movePromise = status === 'Accept'
        ? moveApplicant(candidate.id, moveTo, 'cleared')
        : moveApplicant(candidate.id, roundParam, 'rejected');
      const mailPromise = fetch(getEmailUrl(), {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <p className="text-lg text-gray-600">Loading candidates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 capitalize tracking-tight">
            {department} - {step?.replace(/-/g, ' ') === 'final round' ? 'Round 3' : step?.replace(/-/g, ' ')}
          </h2>
          <p className="text-lg text-gray-600 font-medium">Applied Forms Management</p>
        </div>

        {/* Draft Editing UI */}
        {/* REMOVE the global Acceptance Draft and Rejection Draft boxes here */}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold text-lg tracking-wide">Name</th>
                  <th className="px-6 py-4 text-left text-white font-bold text-lg tracking-wide">Email</th>
                  <th className="px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Status</th>
                  <th className="px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Move to</th>
                  <th className="px-6 py-4 text-center text-white font-bold text-lg tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appliedForms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No candidates found for this department and step.
                    </td>
                  </tr>
                ) : (
                  appliedForms.map((form, idx) => {
                    const status = statusDropdown[form.id];
                    // Use round_status from backend
                    const roundStatus = form.round_status;
                    return (
                      <tr
                        key={form.id}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                              {form.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-900 text-lg">{form.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-700 font-medium">{form.email}</span>
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
                              className={`w-full max-w-xs border-2 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium ${
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
                              className="w-full max-w-xs border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium bg-white text-gray-700 hover:border-blue-400"
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
          <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[900px] mx-auto relative mt-20 flex flex-col p-8">
              <div className="sticky top-0 z-10 bg-white rounded-t-3xl px-0 pt-0 pb-6 flex items-center justify-between border-b border-gray-200">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Candidate Details</h3>
                  <p className="text-gray-600 mt-1">Complete profile information</p>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-700 text-3xl font-bold p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                  onClick={() => setShowDetailsId(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              {candidateDetails[String(showDetailsId)] ? (
                <div className="space-y-8 max-h-[80vh] overflow-y-auto pt-6 pb-10 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                  <section className="border-b border-gray-200 pb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                      <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                      Personal Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <Detail
                        label="Full Name"
                        value={<span className="font-bold text-blue-900">{candidateDetails[String(showDetailsId)].fullName}</span>}
                      />
                      <Detail label="Date of Birth" value={candidateDetails[String(showDetailsId)].dob} />
                      <Detail label="Gender" value={candidateDetails[String(showDetailsId)].gender} />
                      <Detail
                        label="Mobile"
                        value={<span className="font-bold text-blue-800">{candidateDetails[String(showDetailsId)].mobile}</span>}
                      />
                      <Detail
                        label="Alternate Contact Number"
                        value={candidateDetails[String(showDetailsId)].altMobile || '—'}
                      />
                      <Detail
                        label="Email"
                        value={
                          <a
                            href={`mailto:${candidateDetails[String(showDetailsId)].email}`}
                            className="font-bold text-blue-700 underline break-words"
                          >
                            {candidateDetails[String(showDetailsId)].email}
                          </a>
                        }
                      />
                    </div>
                  </section>
                  <section className="border-b border-gray-200 pb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                      <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                      Location Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <Detail label="Current City" value={candidateDetails[String(showDetailsId)].currentCity} />
                      <Detail label="Home Town / Permanent Address" value={candidateDetails[String(showDetailsId)].homeTown} />
                      <Detail label="Willing to Relocate?" value={candidateDetails[String(showDetailsId)].willingToRelocate} />
                    </div>
                  </section>
                  <section className="border-b border-gray-200 pb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                      <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                      Educational Background
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <Detail label="Highest Qualification" value={candidateDetails[String(showDetailsId)].qualification} />
                      <Detail label="Course Name & Specialization" value={candidateDetails[String(showDetailsId)].course} />
                      <Detail label="College/Institute Name" value={candidateDetails[String(showDetailsId)].college} />
                      <Detail
                        label="Affiliated University"
                        value={candidateDetails[String(showDetailsId)].affiliatedUniv || '—'}
                      />
                      <Detail
                        label="Year of Passing / Expected Graduation"
                        value={candidateDetails[String(showDetailsId)].graduationYear}
                      />
                      <Detail label="Aggregate Marks / CGPA (Till Now)" value={candidateDetails[String(showDetailsId)].marks} />
                      <Detail label="Are all semesters cleared?" value={candidateDetails[String(showDetailsId)].allSemCleared} />
                    </div>
                  </section>
                  <section className="pt-2 pb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                      <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
                      Resume & Documents
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      <Detail label="Resume" value={candidateDetails[String(showDetailsId)].resume || '—'} />
                      <Detail label="Academic Documents" value={candidateDetails[String(showDetailsId)].academics || '—'} />
                    </div>
                  </section>
                </div>
              ) : detailsError ? (
                <div className="text-red-500 text-center py-8">{detailsError}</div>
              ) : (
                <div className="text-gray-500 text-center py-8">Loading details...</div>
              )}
            </div>
          </div>
        )}

        {showMailModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
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
                    showMailModal.status === 'Reject' ? 'bg-red-100' : 'bg-green-100'
                  }`}
                >
                  {showMailModal.status === 'Reject' ? <span className="text-2xl">❌</span> : <span className="text-2xl">✅</span>}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {showMailModal.status === 'Reject' ? 'Send Rejection Mail' : 'Send Acceptance Mail'}
                </h3>
                <p className="text-gray-600">Customize your message for {appliedForms.find((f) => f.id === showMailModal.id)?.name}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Message:</label>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 text-black"
                    rows={4}
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    placeholder={showMailModal.status === 'Reject' ? 'Enter rejection message...' : 'Enter acceptance message...'}
                  />
                </div>
                {/* Show Link field for both Accept and Reject, but make it optional */}
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Link (optional):</label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black"
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
  // Helper to get full URL for resume/docs
  const getFullUrl = (file: string) => {
    if (!file) return '#';
    if (file.startsWith('http')) return file;
    // Remove leading slash if present and get filename
    const filename = file.startsWith('/') ? file.substring(1) : file;
    return getFileUrl(filename);
  };

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
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1">
      <span className="font-medium text-blue-900 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-wide">{label}</span>
      <span className="text-blue-700 text-left sm:text-right break-words max-w-full">
        {typeof displayValue === 'string' && displayValue.endsWith('.pdf') && (label === 'Resume' || label === 'Academic Documents') ? (
          <a href={getFullUrl(displayValue)} className="text-blue-700 underline break-words" target="_blank" rel="noopener noreferrer">{label}</a>
        ) : (
          displayValue
        )}
      </span>
    </div>
  );
};

export default StepAppliedFormsList;