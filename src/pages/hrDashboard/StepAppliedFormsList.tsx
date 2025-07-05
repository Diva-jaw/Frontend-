import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Info, CheckCircle } from 'lucide-react';

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

const defaultDraft = (candidateName: string, action: string) => ({
  greeting: `Dear ${candidateName},\n\n${action === 'accept' ? 'Congratulations! You have been shortlisted for the next round.' : 'We regret to inform you that you have not been selected.'}`,
  link: 'https://your-test-link.com',
  editMode: false,
  image: null as File | null,
  showDraft: true,
});

const StepAppliedFormsList: React.FC = () => {
  const { department, step } = useParams<{ department: string; step: string }>();
  const [acceptDropdown, setAcceptDropdown] = useState<{ [id: number]: string }>({});
  const [rejectDropdown, setRejectDropdown] = useState<{ [id: number]: string }>({});
  const [acceptDrafts, setAcceptDrafts] = useState<{
    [id: number]: {
      greeting: string;
      link: string;
      editMode: boolean;
      image: File | null;
      showDraft: boolean;
    };
  }>({});
  const [rejectDrafts, setRejectDrafts] = useState<{
    [id: number]: {
      greeting: string;
      link: string;
      editMode: boolean;
      image: File | null;
      showDraft: boolean;
    };
  }>({});

  const handleAcceptChange = (id: number, candidateName: string, value: string) => {
    setAcceptDropdown({ ...acceptDropdown, [id]: value });
    if (value && acceptOptions.includes(value)) {
      setAcceptDrafts((prev) => ({
        ...prev,
        [id]: prev[id] && prev[id].greeting && prev[id].link
          ? { ...prev[id], editMode: false, showDraft: true }
          : { ...defaultDraft(candidateName, 'accept'), editMode: false, showDraft: true },
      }));
    } else {
      setAcceptDrafts((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleRejectChange = (id: number, candidateName: string, value: string) => {
    setRejectDropdown({ ...rejectDropdown, [id]: value });
    if (value && rejectOptions.includes(value)) {
      setRejectDrafts((prev) => ({
        ...prev,
        [id]: prev[id] && prev[id].greeting && prev[id].link
          ? { ...prev[id], editMode: false, showDraft: true }
          : { ...defaultDraft(candidateName, 'reject'), editMode: false, showDraft: true },
      }));
    } else {
      setRejectDrafts((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleDraftEdit = (draftType: 'accept' | 'reject', id: number, field: 'greeting' | 'link', value: string) => {
    if (draftType === 'accept') {
      setAcceptDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    } else {
      setRejectDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
    }
  };

  const toggleEditMode = (draftType: 'accept' | 'reject', id: number) => {
    if (draftType === 'accept') {
      setAcceptDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], editMode: !prev[id].editMode },
      }));
    } else {
      setRejectDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], editMode: !prev[id].editMode },
      }));
    }
  };

  const handleImageChange = (draftType: 'accept' | 'reject', id: number, file: File | null) => {
    if (draftType === 'accept') {
      setAcceptDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], image: file },
      }));
    } else {
      setRejectDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], image: file },
      }));
    }
  };

  const toggleShowDraft = (draftType: 'accept' | 'reject', id: number) => {
    if (draftType === 'accept') {
      setAcceptDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], showDraft: !prev[id].showDraft },
      }));
    } else {
      setRejectDrafts((prev) => ({
        ...prev,
        [id]: { ...prev[id], showDraft: !prev[id].showDraft },
      }));
    }
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
                          onChange={(e) => handleAcceptChange(form.id, form.name, e.target.value)}
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
                          onChange={(e) => handleRejectChange(form.id, form.name, e.target.value)}
                        >
                          <option value="">Reject</option>
                          {rejectOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200" title="See candidate info">
                          <Info size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Column 3: Email Drafts */}
            <div>
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr>
                    <th className="px-4 py-3 text-center text-blue-800 font-bold text-lg">Email Draft</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedForms.map((form) => (
                    <tr key={form.id}>
                      <td className="px-4 py-3">
                        {/* Accept Draft */}
                        {acceptDropdown[form.id] && acceptOptions.includes(acceptDropdown[form.id]) && acceptDrafts[form.id] && acceptDrafts[form.id].showDraft && (
                          <div className="mb-6 p-4 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-2xl shadow-lg flex flex-col gap-2 border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-blue-800 flex items-center gap-2">Draft for {form.name} <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold">Accept</span></span>
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-green-600 hover:text-green-800 transition-colors duration-200"
                                  title="Show/Hide Draft"
                                  onClick={() => toggleShowDraft('accept', form.id)}
                                >
                                  <CheckCircle size={22} />
                                </button>
                                <button
                                  className="text-blue-600 hover:underline text-sm font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                  onClick={() => toggleEditMode('accept', form.id)}
                                >
                                  {acceptDrafts[form.id].editMode ? 'Save' : 'Edit'}
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div>
                                <label className="block text-blue-700 text-sm font-medium mb-1">Image for Email (optional):</label>
                                {acceptDrafts[form.id].editMode ? (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange('accept', form.id, e.target.files ? e.target.files[0] : null)}
                                  />
                                ) : acceptDrafts[form.id].image && acceptDrafts[form.id].image instanceof File ? (
                                  <img src={URL.createObjectURL(acceptDrafts[form.id].image)} alt="Uploaded" className="max-h-24 rounded shadow" />
                                ) : (
                                  <span className="text-gray-400 text-xs">No image uploaded</span>
                                )}
                              </div>
                              <div>
                                <label className="block text-blue-700 text-sm font-medium mb-1">Text for Email:</label>
                                {acceptDrafts[form.id].editMode ? (
                                  <textarea
                                    className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                    rows={3}
                                    value={acceptDrafts[form.id].greeting}
                                    onChange={(e) => handleDraftEdit('accept', form.id, 'greeting', e.target.value)}
                                  />
                                ) : (
                                  <div className="bg-white rounded px-2 py-1 min-h-[48px] text-gray-800 whitespace-pre-line">{acceptDrafts[form.id].greeting}</div>
                                )}
                              </div>
                              <div>
                                <label className="block text-blue-700 text-sm font-medium mb-1">Link for Test:</label>
                                {acceptDrafts[form.id].editMode ? (
                                  <input
                                    className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={acceptDrafts[form.id].link}
                                    onChange={(e) => handleDraftEdit('accept', form.id, 'link', e.target.value)}
                                  />
                                ) : (
                                  <div className="bg-white rounded px-2 py-1 min-h-[40px] text-gray-800 break-all">{acceptDrafts[form.id].link}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Reject Draft */}
                        {rejectDropdown[form.id] && rejectOptions.includes(rejectDropdown[form.id]) && rejectDrafts[form.id] && rejectDrafts[form.id].showDraft && (
                          <div className="mb-6 p-4 bg-gradient-to-br from-red-100 via-white to-red-50 rounded-2xl shadow-lg flex flex-col gap-2 border-2 border-red-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-red-800 flex items-center gap-2">Draft for {form.name} <span className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-bold">Reject</span></span>
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                  title="Show/Hide Draft"
                                  onClick={() => toggleShowDraft('reject', form.id)}
                                >
                                  <CheckCircle size={22} />
                                </button>
                                <button
                                  className="text-blue-600 hover:underline text-sm font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                                  onClick={() => toggleEditMode('reject', form.id)}
                                >
                                  {rejectDrafts[form.id].editMode ? 'Save' : 'Edit'}
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div>
                                <label className="block text-red-700 text-sm font-medium mb-1">Image for Email (optional):</label>
                                {rejectDrafts[form.id].editMode ? (
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange('reject', form.id, e.target.files ? e.target.files[0] : null)}
                                  />
                                ) : rejectDrafts[form.id].image && rejectDrafts[form.id].image instanceof File ? (
                                  <img src={URL.createObjectURL(rejectDrafts[form.id].image)} alt="Uploaded" className="max-h-24 rounded shadow" />
                                ) : (
                                  <span className="text-gray-400 text-xs">No image uploaded</span>
                                )}
                              </div>
                              <div>
                                <label className="block text-red-700 text-sm font-medium mb-1">Text for Email:</label>
                                {rejectDrafts[form.id].editMode ? (
                                  <textarea
                                    className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                                    rows={3}
                                    value={rejectDrafts[form.id].greeting}
                                    onChange={(e) => handleDraftEdit('reject', form.id, 'greeting', e.target.value)}
                                  />
                                ) : (
                                  <div className="bg-white rounded px-2 py-1 min-h-[48px] text-gray-800 whitespace-pre-line">{rejectDrafts[form.id].greeting}</div>
                                )}
                              </div>
                              <div>
                                <label className="block text-red-700 text-sm font-medium mb-1">Link for Test:</label>
                                {rejectDrafts[form.id].editMode ? (
                                  <input
                                    className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    value={rejectDrafts[form.id].link}
                                    onChange={(e) => handleDraftEdit('reject', form.id, 'link', e.target.value)}
                                  />
                                ) : (
                                  <div className="bg-white rounded px-2 py-1 min-h-[40px] text-gray-800 break-all">{rejectDrafts[form.id].link}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAppliedFormsList; 