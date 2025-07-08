import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Info, Eye } from 'lucide-react';

const acceptOptions = [
  'Round 1',
  'Round 2',
  'Round 3',
  'Final Round',
  'HR Round',
];

const rejectOptions = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

// Placeholder applied forms data
const appliedForms = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 4, name: 'Michael Brown', email: 'michael.brown@example.com' },
  { id: 5, name: 'Priya Patel', email: 'priya.patel@example.com' },
  { id: 6, name: 'Wei Chen', email: 'wei.chen@example.com' },
  { id: 7, name: 'Fatima Al-Farsi', email: 'fatima.alfarsi@example.com' },
  { id: 8, name: 'Carlos Garcia', email: 'carlos.garcia@example.com' },
  { id: 9, name: 'Sophie Dubois', email: 'sophie.dubois@example.com' },
  { id: 10, name: "Liam O'Connor", email: 'liam.oconnor@example.com' },
];

const defaultAcceptDraft = {
  greeting: 'Dear Candidate,\n\nCongratulations! You have been shortlisted for the next round.',
  link: 'https://your-test-link.com',
  editMode: false,
  image: null as File | null,
};
const defaultRejectDraft = {
  greeting: 'Dear Candidate,\n\nWe regret to inform you that you have not been selected.',
  link: 'https://your-test-link.com',
  editMode: false,
  image: null as File | null,
};

const candidateDetailsMock: Record<string, any> = {
  '1': {
    // Personal Details
    fullName: 'Divya',
    dob: '2001-07-09',
    gender: 'Female',
    mobile: '7676767676',
    altMobile: '',
    email: 'divyabhardwaj290@gmail.com',
    // Location
    currentCity: 'Rohtak',
    homeTown: 'Ambala',
    willingToRelocate: 'Yes',
    // Education
    qualification: 'BTech',
    course: 'Btech',
    college: 'Bhagat Phool Singh Vishwavidyalaya',
    affiliatedUniv: '',
    graduationYear: '2024',
    marks: '8',
    allSemCleared: 'Yes',
    // Skills
    techSkills: ['Python', 'Java'],
    otherTechSkills: '',
    certifications: '',
    // Experience
    hasInternship: 'Yes',
    projectDesc: 'ttuyesfnhfeh',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    // Preferences
    preferredRole: 'Software Developer',
    joining: 'Yes',
    shifts: 'Yes',
    expectedCTC: '40000',
    // General
    source: 'Linked In',
    onlineTest: 'Yes',
    laptop: 'Yes',
    languages: ['English'],
    aadhar: '758575757575',
    pan: 'DFGHJ567HG',
    passport: '78787878',
    // Documents
    resume: 'Resume.pdf',
    academics: '',
  },
};

const StepAppliedFormsList: React.FC = () => {
  const { department, step } = useParams<{ department: string; step: string }>();
  const navigate = useNavigate();
  const [acceptDropdown, setAcceptDropdown] = useState<{ [id: number]: string }>({});
  const [rejectDropdown, setRejectDropdown] = useState<{ [id: number]: string }>({});
  const [acceptDraft, setAcceptDraft] = useState({ ...defaultAcceptDraft });
  const [rejectDraft, setRejectDraft] = useState({ ...defaultRejectDraft });
  const [showAcceptSelect, setShowAcceptSelect] = useState(false);
  const [showRejectSelect, setShowRejectSelect] = useState(false);
  const [selectedAcceptId, setSelectedAcceptId] = useState<number | null>(null);
  const [selectedRejectId, setSelectedRejectId] = useState<number | null>(null);
  const [showDetailsId, setShowDetailsId] = useState<number | null>(null);
  const [showMailModal, setShowMailModal] = useState<{id: number, status: string} | null>(null);
  const [mailMessage, setMailMessage] = useState('');
  const [mailLink, setMailLink] = useState('');

  // Accept/Reject candidate lists
  const acceptedCandidates = appliedForms.filter(f => acceptDropdown[f.id]);
  const rejectedCandidates = appliedForms.filter(f => rejectDropdown[f.id]);

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

  // Placeholder send handlers
  const handleSendAll = (draftType: 'accept' | 'reject') => {
    const list = draftType === 'accept' ? acceptedCandidates : rejectedCandidates;
    alert(`Send to all (${draftType === 'accept' ? 'Accepted' : 'Rejected'}) candidates: ` + list.map(c => c.name).join(', '));
  };
  const handleSendOne = (draftType: 'accept' | 'reject') => {
    if (draftType === 'accept' && selectedAcceptId) {
      setShowAcceptSelect(true);
    } else if (draftType === 'reject' && selectedRejectId) {
      setShowRejectSelect(true);
    }
  };
  const handleSendToSelected = (draftType: 'accept' | 'reject') => {
    let candidate = null;
    if (draftType === 'accept' && selectedAcceptId) {
      candidate = appliedForms.find(f => f.id === selectedAcceptId);
    } else if (draftType === 'reject' && selectedRejectId) {
      candidate = appliedForms.find(f => f.id === selectedRejectId);
    }
    if (candidate) {
      alert(`Send to ${candidate.name} (${draftType === 'accept' ? 'Accepted' : 'Rejected'})`);
    }
    setShowAcceptSelect(false);
    setShowRejectSelect(false);
    setSelectedAcceptId(null);
    setSelectedRejectId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 capitalize tracking-tight">
            {department} - {step?.replace(/-/g, ' ')}
          </h2>
          <p className="text-lg text-gray-600 font-medium">Applied Forms Management</p>
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
                {appliedForms.map((form, idx) => {
                  const status = acceptDropdown[form.id] || '';
                  return (
                    <tr key={form.id} className={`hover:bg-gray-50 transition-colors duration-200 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}>
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
                          onChange={(e) => setAcceptDropdown({ ...acceptDropdown, [form.id]: e.target.value })}
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
                            value={form.moveTo || ''}
                            onChange={(e) => {
                              // You may want to store this in state if needed
                              // For now, just a placeholder
                            }}
                          >
                            <option value="">Select Round</option>
                            <option value="Resume Screening">📋 Resume Screening</option>
                            <option value="Round 1">🎯 Round 1</option>
                            <option value="Round 2">🎯 Round 2</option>
                            <option value="Final Round">🏆 Final Round</option>
                            <option value="HR Round">👥 HR Round</option>
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
                            title={status ? "Send Mail" : "Select Status first"}
                            onClick={() => status && setShowMailModal({id: form.id, status: status})}
                            disabled={!status}
                          >
                            📧 Send Mail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
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
                &times;
              </button>
            </div>
            {candidateDetailsMock[String(showDetailsId)] ? (
              <div className="space-y-8 max-h-[80vh] overflow-y-auto pt-6 pb-10 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                <section className="border-b border-gray-200 pb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                    Personal Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <Detail label="Full Name" value={<span className="font-bold text-blue-900">{candidateDetailsMock[String(showDetailsId)].fullName}</span>} />
                    <Detail label="Date of Birth" value={candidateDetailsMock[String(showDetailsId)].dob} />
                    <Detail label="Gender" value={candidateDetailsMock[String(showDetailsId)].gender} />
                    <Detail label="Mobile" value={<span className="font-bold text-blue-800">{candidateDetailsMock[String(showDetailsId)].mobile}</span>} />
                    <Detail label="Alternate Contact Number" value={candidateDetailsMock[String(showDetailsId)].altMobile || '—'} />
                    <Detail label="Email" value={<a href={`mailto:${candidateDetailsMock[String(showDetailsId)].email}`} className="font-bold text-blue-700 underline break-words">{candidateDetailsMock[String(showDetailsId)].email}</a>} />
                  </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                    <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                    Location Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <Detail label="Current City" value={candidateDetailsMock[String(showDetailsId)].currentCity} />
                    <Detail label="Home Town / Permanent Address" value={candidateDetailsMock[String(showDetailsId)].homeTown} />
                    <Detail label="Willing to Relocate?" value={candidateDetailsMock[String(showDetailsId)].willingToRelocate} />
                  </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                    <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                    Educational Background
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <Detail label="Highest Qualification" value={candidateDetailsMock[String(showDetailsId)].qualification} />
                    <Detail label="Course Name & Specialization" value={candidateDetailsMock[String(showDetailsId)].course} />
                    <Detail label="College/Institute Name" value={candidateDetailsMock[String(showDetailsId)].college} />
                    <Detail label="Affiliated University" value={candidateDetailsMock[String(showDetailsId)].affiliatedUniv || '—'} />
                    <Detail label="Year of Passing / Expected Graduation" value={candidateDetailsMock[String(showDetailsId)].graduationYear} />
                    <Detail label="Aggregate Marks / CGPA (Till Now)" value={candidateDetailsMock[String(showDetailsId)].marks} />
                    <Detail label="Are all semesters cleared?" value={candidateDetailsMock[String(showDetailsId)].allSemCleared} />
                  </div>
                </section>
                <section className="pt-2 pb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 tracking-wide flex items-center">
                    <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
                    Resume & Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <Detail label="Resume" value={candidateDetailsMock[String(showDetailsId)].resume || '—'} />
                    <Detail label="Academic Documents" value={candidateDetailsMock[String(showDetailsId)].academics || '—'} />
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-8">No details available.</div>
            )}
          </div>
        </div>
      )}
      
      {showMailModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              onClick={() => { setShowMailModal(null); setMailMessage(''); setMailLink(''); }}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                showMailModal.status === 'Reject' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                {showMailModal.status === 'Reject' ? (
                  <span className="text-2xl">❌</span>
                ) : (
                  <span className="text-2xl">✅</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {showMailModal.status === 'Reject' ? 'Send Rejection Mail' : 'Send Acceptance Mail'}
              </h3>
              <p className="text-gray-600">Customize your message for {appliedForms.find(f => f.id === showMailModal.id)?.name}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Message:</label>
                <textarea
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                  rows={4}
                  value={mailMessage}
                  onChange={e => setMailMessage(e.target.value)}
                  placeholder={showMailModal.status === 'Reject' ? 'Enter rejection message...' : 'Enter acceptance message...'}
                />
              </div>
              
              {showMailModal.status === 'Accept' && (
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Link:</label>
                  <input
                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={mailLink}
                    onChange={e => setMailLink(e.target.value)}
                    placeholder="Enter test or next round link..."
                  />
                </div>
              )}
              
              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 transform hover:scale-105 ${
                  showMailModal.status === 'Reject' 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                }`}
                onClick={() => {
                  // Implement send logic here
                  alert(`Mail sent to ${appliedForms.find(f => f.id === showMailModal.id)?.name} (${showMailModal.status})\nMessage: ${mailMessage}${showMailModal.status === 'Accept' ? `\nLink: ${mailLink}` : ''}`);
                  setShowMailModal(null); setMailMessage(''); setMailLink('');
                }}
              >
                📧 Send Mail
              </button>
            </div>
          </div>
        </div>
      )}
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
      ) : value}
    </span>
  </div>
);

export default StepAppliedFormsList; 