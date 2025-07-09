import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

// Define acceptOptions for "Move to" dropdown
const acceptOptions = ['Round 1', 'Round 2', 'Round 3', 'Final Round', 'HR Round'];

// Types for data
interface Candidate {
  id: number;
  name: string;
  email: string;
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
  const [acceptDropdown, setAcceptDropdown] = useState<{ [id: number]: string }>({});
  const [rejectDropdown, setRejectDropdown] = useState<{ [id: number]: string }>({});
  const [moveToDropdown, setMoveToDropdown] = useState<{ [id: number]: string }>({});
  const [acceptDraft, setAcceptDraft] = useState<Draft>({ ...defaultAcceptDraft });
  const [rejectDraft, setRejectDraft] = useState<Draft>({ ...defaultRejectDraft });
  const [showDetailsId, setShowDetailsId] = useState<number | null>(null);
  const [showMailModal, setShowMailModal] = useState<{ id: number; status: string } | null>(null);
  const [mailMessage, setMailMessage] = useState<string>('');
  const [mailLink, setMailLink] = useState<string>('');

  // Fetch candidate details
  const fetchCandidateDetails = async (candidateId: number) => {
    try {
      setDetailsError(null);
      const response = await fetch(`/api/candidate-details/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Replace with your auth logic
        },
      });
      if (!response.ok) throw new Error('Failed to fetch candidate details');
      const data: CandidateDetails = await response.json();
      setCandidateDetails((prev) => ({ ...prev, [candidateId]: data }));
    } catch (err) {
      setDetailsError('Error fetching candidate details. Please try again.');
      console.error(`Error fetching details for candidate ${candidateId}:`, err);
    }
  };

  // Fetch candidates with pagination
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/candidates?department=${department}&step=${step}&page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Replace with your auth logic
          },
        });
        if (!response.ok) throw new Error('Failed to fetch candidates');
        const data: { candidates: Candidate[]; total: number } = await response.json();
        setAppliedForms(data.candidates);
        setTotalPages(Math.ceil(data.total / limit));
      } catch (err) {
        setError('Error fetching candidates. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [department, step, page]);

  // Fetch details when showDetailsId changes
  useEffect(() => {
    if (showDetailsId && !candidateDetails[showDetailsId]) {
      fetchCandidateDetails(showDetailsId);
    }
  }, [showDetailsId]);

  // Accept/Reject candidate lists
  const acceptedCandidates = appliedForms.filter((f) => acceptDropdown[f.id]);
  const rejectedCandidates = appliedForms.filter((f) => rejectDropdown[f.id]);

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
          const formData = new FormData();
          formData.append('email', candidate.email);
          formData.append('message', draft.greeting);
          if (draftType === 'accept') formData.append('link', draft.link);
          if (draft.image) formData.append('image', draft.image);
          return fetch('/api/send-email', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Replace with your auth logic
            },
            body: formData,
          });
        })
      );
      alert(`Emails sent to ${list.length} candidates!`);
    } catch (error) {
      alert('Error sending emails');
    }
  };

  const handleStatusChange = (id: number, value: string) => {
    if (value === 'Accept') {
      setAcceptDropdown((prev) => ({ ...prev, [id]: value }));
      setRejectDropdown((prev) => ({ ...prev, [id]: '' }));
    } else if (value === 'Reject') {
      setRejectDropdown((prev) => ({ ...prev, [id]: value }));
      setAcceptDropdown((prev) => ({ ...prev, [id]: '' }));
    } else {
      setAcceptDropdown((prev) => ({ ...prev, [id]: '' }));
      setRejectDropdown((prev) => ({ ...prev, [id]: '' }));
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 capitalize tracking-tight">
            {department} - {step?.replace(/-/g, ' ')}
          </h2>
          <p className="text-lg text-gray-600 font-medium">Applied Forms Management</p>
        </div>

        {/* Draft Editing UI */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Acceptance Draft</h3>
            <textarea
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-4"
              rows={4}
              value={acceptDraft.greeting}
              onChange={(e) => handleDraftEdit('accept', 'greeting', e.target.value)}
              disabled={!acceptDraft.editMode}
            />
            <input
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-4"
              value={acceptDraft.link}
              onChange={(e) => handleDraftEdit('accept', 'link', e.target.value)}
              disabled={!acceptDraft.editMode}
              placeholder="Enter test link..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('accept', e.target.files?.[0] || null)}
              disabled={!acceptDraft.editMode}
              className="mb-4"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => toggleEditMode('accept')}
            >
              {acceptDraft.editMode ? 'Save' : 'Edit'}
            </button>
            <button
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => handleSendAll('accept')}
              disabled={acceptedCandidates.length === 0}
            >
              Send to All Accepted
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Rejection Draft</h3>
            <textarea
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 mb-4"
              rows={4}
              value={rejectDraft.greeting}
              onChange={(e) => handleDraftEdit('reject', 'greeting', e.target.value)}
              disabled={!rejectDraft.editMode}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('reject', e.target.files?.[0] || null)}
              disabled={!rejectDraft.editMode}
              className="mb-4"
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => toggleEditMode('reject')}
            >
              {rejectDraft.editMode ? 'Save' : 'Edit'}
            </button>
            <button
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => handleSendAll('reject')}
              disabled={rejectedCandidates.length === 0}
            >
              Send to All Rejected
            </button>
          </div>
        </div>

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
                    const status = acceptDropdown[form.id] || rejectDropdown[form.id] || '';
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
                          <select
                            className={`w-full max-w-xs border-2 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium ${
                              status === 'Accept'
                                ? 'border-green-300 bg-green-50 text-green-800'
                                : status === 'Reject'
                                ? 'border-red-300 bg-red-50 text-red-800'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                            }`}
                            value={status}
                            onChange={(e) => handleStatusChange(form.id, e.target.value)}
                          >
                            <option value="">Select Status</option>
                            <option value="Accept">✅ Accept</option>
                            <option value="Reject">❌ Reject</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {status !== 'Reject' && (
                            <select
                              className="w-full max-w-xs border-2 border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium bg-white text-gray-700 hover:border-blue-400"
                              value={moveToDropdown[form.id] || ''}
                              onChange={(e) => setMoveToDropdown({ ...moveToDropdown, [form.id]: e.target.value })}
                            >
                              <option value="">Select Round</option>
                              {acceptOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="View candidate details"
                              onClick={() => setShowDetailsId(form.id)}
                            >
                              <Eye size={20} />
                            </button>
                            <button
                              className={`px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm ${
                                status
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white cursor-pointer transform hover:scale-105'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                              title={status ? 'Send Mail' : 'Select Status first'}
                              onClick={() => {
                                if (status) {
                                  setShowMailModal({ id: form.id, status });
                                  setMailMessage(status === 'Accept' ? acceptDraft.greeting : rejectDraft.greeting);
                                  setMailLink(status === 'Accept' ? acceptDraft.link : '');
                                }
                              }}
                              disabled={!status}
                            >
                              📧 Send Mail
                            </button>
                          </div>
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
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                    rows={4}
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    placeholder={showMailModal.status === 'Reject' ? 'Enter rejection message...' : 'Enter acceptance message...'}
                  />
                </div>

                {showMailModal.status === 'Accept' && (
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Link:</label>
                    <input
                      className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={mailLink}
                      onChange={(e) => setMailLink(e.target.value)}
                      placeholder="Enter test or next round link..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Attach Image (Optional):</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(showMailModal.status === 'Accept' ? 'accept' : 'reject', e.target.files?.[0] || null)}
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-105 ${
                    showMailModal.status === 'Reject'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }`}
                  onClick={async () => {
                    const candidate = appliedForms.find((f) => f.id === showMailModal.id);
                    if (candidate) {
                      try {
                        const formData = new FormData();
                        formData.append('email', candidate.email);
                        formData.append('message', mailMessage);
                        if (showMailModal.status === 'Accept') formData.append('link', mailLink);
                        if (showMailModal.status === 'Accept' ? acceptDraft.image : rejectDraft.image)
                          formData.append('image', showMailModal.status === 'Accept' ? acceptDraft.image! : rejectDraft.image!);
                        await fetch('/api/send-email', {
                          method: 'POST',
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`, // Replace with your auth logic
                          },
                          body: formData,
                        });
                        alert(`Mail sent to ${candidate.name} (${showMailModal.status})`);
                      } catch (error) {
                        alert('Error sending email');
                      }
                    }
                    setShowMailModal(null);
                    setMailMessage('');
                    setMailLink('');
                  }}
                >
                  📧 Send Mail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for details row
const Detail = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-1">
    <span className="font-medium text-blue-900 whitespace-nowrap mr-4 mb-1 sm:mb-0 tracking-wide">{label}</span>
    <span className="text-blue-700 text-left sm:text-right break-words max-w-full">
      {typeof value === 'string' && value.endsWith('.pdf') ? (
        <a href="#" className="text-blue-700 underline break-words">{value}</a>
      ) : (
        value
      )}
    </span>
  </div>
);

export default StepAppliedFormsList;