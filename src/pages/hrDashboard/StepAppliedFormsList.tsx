import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
    preferredLocations: ['Rohtak'],
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
  const [acceptDropdown, setAcceptDropdown] = useState<{ [id: number]: string }>({});
  const [rejectDropdown, setRejectDropdown] = useState<{ [id: number]: string }>({});
  const [acceptDraft, setAcceptDraft] = useState({ ...defaultAcceptDraft });
  const [rejectDraft, setRejectDraft] = useState({ ...defaultRejectDraft });
  const [showAcceptSelect, setShowAcceptSelect] = useState(false);
  const [showRejectSelect, setShowRejectSelect] = useState(false);
  const [selectedAcceptId, setSelectedAcceptId] = useState<number | null>(null);
  const [selectedRejectId, setSelectedRejectId] = useState<number | null>(null);
  const [showDetailsId, setShowDetailsId] = useState<number | null>(null);

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
    <div className="min-h-screen bg-gray-50 py-4 px-2 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-blue-900 capitalize tracking-tight drop-shadow">{department} - {step?.replace(/-/g, ' ')}: Applied Forms</h2>
      <div className="w-full max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-blue-100">
            {/* Column 1: Candidate Info */}
            <div>
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-blue-800 font-bold text-lg">Name</th>
                    <th className="px-4 py-3 text-left text-blue-800 font-bold text-lg">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedForms.map((form, idx) => (
                    <tr key={form.id} className={idx % 2 === 0 ? 'bg-white/80' : 'bg-blue-50/60'}>
                      <td className="px-4 py-3 font-semibold text-blue-900 transition-colors duration-150">{form.name}</td>
                      <td className="px-4 py-3 text-blue-700 transition-colors duration-150">{form.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Column 2: Actions */}
            <div>
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr>
                    <th className="px-4 py-3 text-center text-blue-800 font-bold text-lg">Accept</th>
                    <th className="px-4 py-3 text-center text-blue-800 font-bold text-lg">Reject</th>
                    <th className="px-4 py-3 text-center text-blue-800 font-bold text-lg">Info</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedForms.map((form, idx) => (
                    <tr key={form.id} className={idx % 2 === 0 ? 'bg-white/80' : 'bg-blue-50/60'}>
                      <td className="px-4 py-3 text-center">
                        <select
                          className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
                          value={acceptDropdown[form.id] || ''}
                          onChange={(e) => setAcceptDropdown({ ...acceptDropdown, [form.id]: e.target.value })}
                        >
                          <option value="">Accept</option>
                          {acceptOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <select
                          className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 shadow-sm hover:shadow-md"
                          value={rejectDropdown[form.id] || ''}
                          onChange={(e) => setRejectDropdown({ ...rejectDropdown, [form.id]: e.target.value })}
                        >
                          <option value="">Reject</option>
                          {rejectOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          title="See candidate info"
                          onClick={() => setShowDetailsId(form.id)}
                        >
                          <Eye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Column 3: Email Drafts */}
            <div>
              <div className="mb-8">
                {/* Accept Draft */}
                <div className="mb-6 p-4 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-2xl shadow-lg flex flex-col gap-2 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-800 flex items-center gap-2">Accept Email Draft <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold">Accept</span></span>
                    <button
                      className="text-blue-600 hover:underline text-sm font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                      onClick={() => toggleEditMode('accept')}
                    >
                      {acceptDraft.editMode ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label className="block text-blue-700 text-sm font-medium mb-1">Image for Email (optional):</label>
                      {acceptDraft.editMode ? (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange('accept', e.target.files ? e.target.files[0] : null)}
                        />
                      ) : acceptDraft.image && acceptDraft.image instanceof File ? (
                        <img src={URL.createObjectURL(acceptDraft.image)} alt="Uploaded" className="max-h-24 rounded shadow" />
                      ) : (
                        <span className="text-gray-400 text-xs">No image uploaded</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-blue-700 text-sm font-medium mb-1">Text for Email:</label>
                      {acceptDraft.editMode ? (
                        <textarea
                          className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          rows={3}
                          value={acceptDraft.greeting}
                          onChange={(e) => handleDraftEdit('accept', 'greeting', e.target.value)}
                        />
                      ) : (
                        <div className="bg-white rounded px-2 py-1 min-h-[48px] text-gray-800 whitespace-pre-line">{acceptDraft.greeting}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-blue-700 text-sm font-medium mb-1">Link for Test:</label>
                      {acceptDraft.editMode ? (
                        <input
                          className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={acceptDraft.link}
                          onChange={(e) => handleDraftEdit('accept', 'link', e.target.value)}
                        />
                      ) : (
                        <div className="bg-white rounded px-2 py-1 min-h-[40px] text-gray-800 break-all">{acceptDraft.link}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200"
                      onClick={() => handleSendAll('accept')}
                    >
                      Send to all
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200"
                      onClick={() => handleSendOne('accept')}
                    >
                      Send to one
                    </button>
                  </div>
                  {showAcceptSelect && (
                    <div className="mt-2 flex gap-2 items-center">
                      <select
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedAcceptId || ''}
                        onChange={e => setSelectedAcceptId(Number(e.target.value))}
                      >
                        <option value="">Select candidate</option>
                        {acceptedCandidates.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded shadow transition-all duration-200"
                        onClick={() => handleSendToSelected('accept')}
                        disabled={!selectedAcceptId}
                      >
                        Send
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 ml-2"
                        onClick={() => { setShowAcceptSelect(false); setSelectedAcceptId(null); }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                {/* Reject Draft */}
                <div className="mb-6 p-4 bg-gradient-to-br from-red-100 via-white to-red-50 rounded-2xl shadow-lg flex flex-col gap-2 border-2 border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-red-800 flex items-center gap-2">Reject Email Draft <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-bold">Reject</span></span>
                    <button
                      className="text-blue-600 hover:underline text-sm font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                      onClick={() => toggleEditMode('reject')}
                    >
                      {rejectDraft.editMode ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label className="block text-red-700 text-sm font-medium mb-1">Image for Email (optional):</label>
                      {rejectDraft.editMode ? (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange('reject', e.target.files ? e.target.files[0] : null)}
                        />
                      ) : rejectDraft.image && rejectDraft.image instanceof File ? (
                        <img src={URL.createObjectURL(rejectDraft.image)} alt="Uploaded" className="max-h-24 rounded shadow" />
                      ) : (
                        <span className="text-gray-400 text-xs">No image uploaded</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-red-700 text-sm font-medium mb-1">Text for Email:</label>
                      {rejectDraft.editMode ? (
                        <textarea
                          className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                          rows={3}
                          value={rejectDraft.greeting}
                          onChange={(e) => handleDraftEdit('reject', 'greeting', e.target.value)}
                        />
                      ) : (
                        <div className="bg-white rounded px-2 py-1 min-h-[48px] text-gray-800 whitespace-pre-line">{rejectDraft.greeting}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-red-700 text-sm font-medium mb-1">Link for Test:</label>
                      {rejectDraft.editMode ? (
                        <input
                          className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                          value={rejectDraft.link}
                          onChange={(e) => handleDraftEdit('reject', 'link', e.target.value)}
                        />
                      ) : (
                        <div className="bg-white rounded px-2 py-1 min-h-[40px] text-gray-800 break-all">{rejectDraft.link}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200"
                      onClick={() => handleSendAll('reject')}
                    >
                      Send to all
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200"
                      onClick={() => handleSendOne('reject')}
                    >
                      Send to one
                    </button>
                  </div>
                  {showRejectSelect && (
                    <div className="mt-2 flex gap-2 items-center">
                      <select
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                        value={selectedRejectId || ''}
                        onChange={e => setSelectedRejectId(Number(e.target.value))}
                      >
                        <option value="">Select candidate</option>
                        {rejectedCandidates.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded shadow transition-all duration-200"
                        onClick={() => handleSendToSelected('reject')}
                        disabled={!selectedRejectId}
                      >
                        Send
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 ml-2"
                        onClick={() => { setShowRejectSelect(false); setSelectedRejectId(null); }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDetailsId && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-[900px] mx-auto relative mt-20 flex flex-col p-6 sm:p-8">
            <div className="sticky top-0 z-10 bg-white rounded-t-3xl px-0 pt-0 pb-4 flex items-center justify-between border-b border-blue-100">
              <h3 className="text-2xl font-extrabold text-blue-900 tracking-tight">Candidate Details</h3>
              <button
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setShowDetailsId(null)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            {candidateDetailsMock[String(showDetailsId)] ? (
              <div className="space-y-12 max-h-[80vh] overflow-y-auto pt-4 pb-10 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
                <section className="border-b border-blue-100 pb-6 mb-8">
                  <h4 className="text-lg font-bold text-blue-800 mb-6 tracking-wide">Personal Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                    <Detail label="Full Name" value={<span className="font-bold text-blue-900">{candidateDetailsMock[String(showDetailsId)].fullName}</span>} />
                    <Detail label="Date of Birth" value={candidateDetailsMock[String(showDetailsId)].dob} />
                    <Detail label="Gender" value={candidateDetailsMock[String(showDetailsId)].gender} />
                    <Detail label="Mobile" value={<span className="font-bold text-blue-800">{candidateDetailsMock[String(showDetailsId)].mobile}</span>} />
                    <Detail label="Alternate Contact Number" value={candidateDetailsMock[String(showDetailsId)].altMobile || '—'} />
                    <Detail label="Email" value={<a href={`mailto:${candidateDetailsMock[String(showDetailsId)].email}`} className="font-bold text-blue-700 underline break-words">{candidateDetailsMock[String(showDetailsId)].email}</a>} />
                  </div>
                </section>
                <section className="border-b border-blue-100 pb-6 mb-8">
                  <h4 className="text-lg font-bold text-blue-800 mb-6 tracking-wide">Location Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                    <Detail label="Current City" value={candidateDetailsMock[String(showDetailsId)].currentCity} />
                    <Detail label="Home Town / Permanent Address" value={candidateDetailsMock[String(showDetailsId)].homeTown} />
                    <Detail label="Willing to Relocate?" value={candidateDetailsMock[String(showDetailsId)].willingToRelocate} />
                  </div>
                </section>
                <section className="border-b border-blue-100 pb-6 mb-8">
                  <h4 className="text-lg font-bold text-blue-800 mb-6 tracking-wide">Educational Background</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
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
                  <h4 className="text-lg font-bold text-blue-800 mb-6 tracking-wide">Resume & Documents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                    <Detail label="Resume" value={candidateDetailsMock[String(showDetailsId)].resume || '—'} />
                    <Detail label="Academic Documents" value={candidateDetailsMock[String(showDetailsId)].academics || '—'} />
                  </div>
                </section>
              </div>
            ) : (
              <div className="text-gray-500">No details available.</div>
            )}
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