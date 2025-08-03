import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getApplicantUrl } from '../../config/api';
import { apiService } from '../../services/api';

interface Applicant {
  applicant_id: number;
  user_id: number;
  full_name: string;
  date_of_birth: string;
  gender: string;
  highest_qualification: string;
  status: number;
  round: number;
  job_title: string;
  job_type: string;
  applied_at: string;
}

const EngineeringApplications: React.FC = () => {
  const [department] = useState('engineering');
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assume round is a prop or state, or default to 'Round 1'
        const round = 'Round 1';
        const data = await apiService.fetchApplicantsByDepartment(department, round, 1, 10);
        setApplicants(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError('Failed to fetch applicants.');
        setApplicants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [department]);

  // Get unique job titles, job types, and genders from applicants
  const jobTitles = Array.from(new Set(applicants.map(app => app.job_title).filter(Boolean)));
  const jobTypes = Array.from(new Set(applicants.map(app => app.job_type).filter(Boolean)));
  const genders = Array.from(new Set(applicants.map(app => app.gender).filter(Boolean)));

  useEffect(() => {
    let filteredList = applicants;
    if (jobTitle) {
      filteredList = filteredList.filter(app => app.job_title === jobTitle);
    }
    if (jobType) {
      filteredList = filteredList.filter(app => app.job_type === jobType);
    }
    if (gender) {
      filteredList = filteredList.filter(app => app.gender === gender);
    }
    if (date) {
      filteredList = filteredList.filter(app => app.applied_at && new Date(app.applied_at).toISOString().slice(0, 10) === date);
    }
    setFiltered(filteredList);
  }, [jobTitle, jobType, gender, date, applicants]);

  // Status badge helper
  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return <span className="inline-block px-2 py-1 text-xs font-semibold rounded shadow border border-green-300 bg-green-100 text-green-700">Active</span>;
    } else {
      return <span className="inline-block px-2 py-1 text-xs font-semibold rounded shadow border border-gray-300 bg-gray-100 text-gray-600">Inactive</span>;
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-8 sm:py-12 px-2 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-full sm:max-w-7xl bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 flex flex-col items-center border border-blue-100 dark:border-gray-700 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100 mb-6 text-center tracking-tight drop-shadow">Applications</h1>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8 w-full p-2 sm:p-4 rounded-xl bg-gradient-to-r from-blue-100 via-white to-blue-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 shadow">
          <div>
            <label className="block text-sm font-bold mb-1 text-blue-900 dark:text-blue-100">Job Title</label>
            <select value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="rounded-lg px-4 py-2 border border-blue-200 dark:border-blue-600 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 text-blue-900 dark:text-blue-100 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none">
              <option value="">All</option>
              {jobTitles.map(title => <option key={title} value={title}>{title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-blue-900 dark:text-blue-100">Job Type</label>
            <select value={jobType} onChange={e => setJobType(e.target.value)} className="rounded-lg px-4 py-2 border border-blue-200 dark:border-blue-600 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 text-blue-900 dark:text-blue-100 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none">
              <option value="">All</option>
              {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-blue-900 dark:text-blue-100">Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)} className="rounded-lg px-4 py-2 border border-blue-200 dark:border-blue-600 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 text-blue-900 dark:text-blue-100 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none">
              <option value="">All</option>
              {genders.map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1 text-blue-900 dark:text-blue-100">Applied Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="rounded-lg px-4 py-2 border border-blue-200 dark:border-blue-600 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 text-blue-900 dark:text-blue-100 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 outline-none" />
          </div>
        </div>
        {loading ? (
          <div className="text-blue-600 dark:text-blue-400 font-semibold py-8">Loading...</div>
        ) : error ? (
          <div className="text-red-500 dark:text-red-400 font-semibold py-8">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 italic py-8">No applicants found.</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left rounded-xl overflow-hidden shadow-lg min-w-[700px]">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">DOB</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Qualification</th>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Job Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Round</th>
                  <th className="px-4 py-3">Applied At</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => (
                  <tr key={app.applicant_id} className="border-b border-blue-100 dark:border-gray-700 hover:bg-blue-100/80 dark:hover:bg-gray-700/80 hover:shadow-md transition text-blue-900 dark:text-blue-100 group">
                    <td className="px-4 py-3 font-semibold text-blue-700 dark:text-blue-300 group-hover:text-blue-900 dark:group-hover:text-blue-100 group-hover:underline group-hover:shadow-blue-200 group-hover:drop-shadow cursor-pointer transition whitespace-nowrap">{app.full_name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap capitalize">{app.gender}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{app.highest_qualification}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{app.job_title}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{app.job_type}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(app.status)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{app.round}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineeringApplications; 