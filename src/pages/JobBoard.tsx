import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Constants for sidebar and list widths
const DEFAULT_SIDEBAR_WIDTH = 260;
const DEFAULT_LIST_WIDTH = 320;
const MIN_SIDEBAR_WIDTH = 180;
const MAX_SIDEBAR_WIDTH = 400;
const MIN_LIST_WIDTH = 200;
const MAX_LIST_WIDTH = 600;

// Define Job type based on API responses
interface JobSummary {
  id: number;
  job_title: string;
  department: string;
  job_type: string;
  location: string;
  salary_range: string;
  job_summary: string;
  experience_level: number;
  application_deadline: string;
  equal_opportunity_statement: string;
  how_to_apply: string;
  created_at: string;
}

interface JobDetails extends JobSummary {
  responsibilities?: string[] | null;
  required_qualifications?: string[] | null;
  preferred_skills?: string[] | null;
}

const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [listWidth, setListWidth] = useState(DEFAULT_LIST_WIDTH);
  const draggingSidebar = useRef(false);
  const draggingList = useRef(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobSummary[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedWorkLevels, setSelectedWorkLevels] = useState<string[]>([]);
  const navigate = useNavigate();

  const salaryLpaRanges = [
    { label: '2 - 5 LPA', min: 2, max: 5 },
    { label: '5 - 10 LPA', min: 5, max: 10 },
    { label: '10 - 20 LPA', min: 10, max: 20 },
    { label: '20 - 35 LPA', min: 20, max: 35 },
    { label: '35 - 50 LPA', min: 35, max: 50 },
  ];

  // Fetch initial job list
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
        if (response.data.length > 0) {
          await fetchJobDetails(response.data[0].id); // Fetch details for the first job
        }
      } catch (err) {
        setError('Failed to load jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Fetch job details when a job is selected
  const fetchJobDetails = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setSelectedJob(response.data);
    } catch (err) {
      setError('Failed to load job details.');
    }
  };

  useEffect(() => {
    let filtered = jobs;
    if (selectedDepartment) {
      filtered = filtered.filter(job => job.department === selectedDepartment);
    }
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(job => selectedJobTypes.some(type => job.job_type && job.job_type.trim().toLowerCase() === type.trim().toLowerCase()));
    }
    if (selectedSalaryRanges.length > 0) {
      filtered = filtered.filter(job => {
        const match = job.salary_range?.match(/(\d+)[^\d]+(\d+)/);
        if (match) {
          const min = parseInt(match[1], 10);
          const max = parseInt(match[2], 10);
          return selectedSalaryRanges.some(label => {
            const range = salaryLpaRanges.find(r => r.label === label);
            return range && min <= range.max && max >= range.min;
          });
        }
        return false;
      });
    }
    if (selectedWorkLevels.length > 0) {
      filtered = filtered.filter(job => selectedWorkLevels.includes(job.experience_level.toString()));
    }
    if (searchTitle.trim()) {
      filtered = filtered.filter(job => job.job_title.toLowerCase().includes(searchTitle.trim().toLowerCase()));
    }
    setFilteredJobs(filtered);
    if (filtered.length > 0) {
      fetchJobDetails(filtered[0].id); // Fetch details for the first filtered job
    } else {
      setSelectedJob(null); // Clear selected job if no jobs match filters
    }
  }, [jobs, selectedDepartment, selectedJobTypes, selectedSalaryRanges, selectedWorkLevels, searchTitle]);

  useEffect(() => {
    const moveSidebar = (e: MouseEvent) => {
      if (!draggingSidebar.current) return;
      const newWidth = Math.min(Math.max(e.clientX, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
      setSidebarWidth(newWidth);
    };
    const upSidebar = () => {
      draggingSidebar.current = false;
      document.body.style.cursor = '';
    };
    if (draggingSidebar.current) {
      window.addEventListener('mousemove', moveSidebar);
      window.addEventListener('mouseup', upSidebar);
    }
    return () => {
      window.removeEventListener('mousemove', moveSidebar);
      window.removeEventListener('mouseup', upSidebar);
    };
  }, [draggingSidebar.current]);

  useEffect(() => {
    const moveList = (e: MouseEvent) => {
      if (!draggingList.current) return;
      const newWidth = Math.min(Math.max(e.clientX - sidebarWidth, MIN_LIST_WIDTH), MAX_LIST_WIDTH);
      setListWidth(newWidth);
    };
    const upList = () => {
      draggingList.current = false;
      document.body.style.cursor = '';
    };
    if (draggingList.current) {
      window.addEventListener('mousemove', moveList);
      window.addEventListener('mouseup', upList);
    }
    return () => {
      window.removeEventListener('mousemove', moveList);
      window.removeEventListener('mouseup', upList);
    };
  }, [draggingList.current, sidebarWidth]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading jobs...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const onSidebarMouseDown = () => {
    draggingSidebar.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const onListMouseDown = () => {
    draggingList.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const departmentOptions = Array.from(new Set(jobs.map(job => job.department)));

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white px-4 md:px-10 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-bold text-xl tracking-wide">Milao</span>
        </div>
        <nav className="flex-1 flex justify-center gap-8 text-base font-medium">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Find Job</a>
          <a href="#" className="hover:text-blue-700">Company Review</a>
          <a href="#" className="hover:text-blue-700">Find Salaries</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          <span className="hidden md:inline">Suhayol A. Nasim</span>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row bg-gray-100 min-w-0 min-h-0 h-full">
        <aside
          className="w-full md:w-[260px] flex-shrink-0 border-r border-gray-200 flex min-w-[120px] max-w-full md:max-w-xs hidden md:flex h-full min-h-0 bg-white"
          style={{ width: sidebarWidth }}
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 w-full flex flex-col gap-8">
            <div>
              <h3 className="font-semibold mb-2">Department / Team</h3>
              <select
                className="w-full px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none"
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departmentOptions.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Job Type</h3>
              <div className="flex flex-wrap gap-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'On-site', 'Hybrid'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedJobTypes.includes(type)}
                      onChange={e => {
                        setSelectedJobTypes(prev =>
                          e.target.checked ? [...prev, type] : prev.filter(t => t !== type)
                        );
                      }}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Salary Range (LPA)</h3>
              <div className="flex flex-col gap-2">
                {salaryLpaRanges.map(range => (
                  <label key={range.label} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedSalaryRanges.includes(range.label)}
                      onChange={e => {
                        setSelectedSalaryRanges(prev =>
                          e.target.checked ? [...prev, range.label] : prev.filter(l => l !== range.label)
                        );
                      }}
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Work Level / Seniority</h3>
              <div className="flex flex-wrap gap-2">
                {['Entry Level', 'Mid Level', 'Senior Level', 'Directors', 'VP or Above'].map(level => (
                  <label key={level} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      checked={selectedWorkLevels.includes(level)}
                      onChange={e => {
                        setSelectedWorkLevels(prev =>
                          e.target.checked ? [...prev, level] : prev.filter(l => l !== level)
                        );
                      }}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <div
          className="hidden md:block cursor-col-resize bg-[#23263a] hover:bg-blue-500 transition-colors duration-150"
          style={{ width: 6, minWidth: 6, maxWidth: 12 }}
          onMouseDown={onSidebarMouseDown}
        />
        <section className="flex-1 flex flex-col md:flex-row min-w-0">
          <div
            className="bg-white p-4 flex flex-col gap-2 min-w-[150px] max-w-full md:max-w-md overflow-y-auto h-full min-h-0 scrollbar-thin scrollbar-thumb-blue-700/60 scrollbar-track-transparent"
            style={{ width: listWidth }}
          >
            <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
              <input
                type="text"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                placeholder="Search Job Title..."
                className="flex-1 px-3 py-2 rounded bg-white text-gray-900 border border-gray-300 focus:outline-none"
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors"
              >
                Search
              </button>
            </div>
            {filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-gray-200 shadow-lg min-h-[300px]">
                <svg
                  width="64"
                  height="64"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mb-4 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v2m0-2a4 4 0 01-4-4V7a4 4 0 018 0v6a4 4 0 01-4 4z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  It looks like there are no jobs matching your current filters. Try adjusting your search criteria or clearing some filters to see more opportunities.
                </p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div
                  key={job.id}
                  className={`rounded-2xl border transition-all min-w-0 mb-4 p-4 cursor-pointer shadow-md
                    ${selectedJob?.id === job.id
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400 border-blue-400'
                      : 'bg-white text-gray-900 hover:bg-blue-50 hover:border-blue-300 border-gray-200'}
                  `}
                  onClick={() => fetchJobDetails(job.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {job.job_title.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`font-semibold text-base truncate underline cursor-pointer ${selectedJob?.id === job.id ? 'text-white' : 'text-gray-900'}`}
                        onClick={e => {
                          e.stopPropagation();
                          navigate('/apply-job', { state: { jobTitle: job.job_title, jobpost_id: job.id } });
                        }}
                      >
                        {job.job_title}
                      </div>
                      <div className={`text-xs truncate ${selectedJob?.id === job.id ? 'text-blue-100' : 'text-gray-500'}`}>{job.location}</div>
                    </div>
                    <button className="ml-auto" onClick={e => { e.stopPropagation(); toggleLike(job.id); }}>
                      {liked.includes(job.id)
                        ? <FaHeart className={selectedJob?.id === job.id ? 'text-red-200' : 'text-red-500'} />
                        : <FiHeart className={selectedJob?.id === job.id ? 'text-blue-100' : 'text-gray-400'} />}
                    </button>
                  </div>
                  <div className={`flex justify-between text-xs ${selectedJob?.id === job.id ? 'text-blue-100' : 'text-gray-500'}`}> 
                    <span>Now</span>
                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className="hidden md:block cursor-col-resize bg-[#23263a] hover:bg-blue-500 transition-colors duration-150"
            style={{ width: 6, minWidth: 6, maxWidth: 12 }}
            onMouseDown={onListMouseDown}
          />
          <div className="flex-1 h-full flex flex-col min-w-0 min-h-0">
            {selectedJob && (
              <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-md shadow-lg p-6 h-full flex flex-col overflow-y-auto min-w-0 min-h-0 text-gray-900">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                      {selectedJob.job_title.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold mb-1 truncate">{selectedJob.job_title}</h2>
                      <div className="text-blue-600 font-semibold truncate">
                        {selectedJob.department} <span className="text-gray-500">• {selectedJob.location}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {selectedJob.department && <span>{selectedJob.department} | </span>}
                        Posted {new Date(selectedJob.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 text-lg"
                    onClick={() => navigate('/apply-job', { state: { jobTitle: selectedJob.job_title, jobpost_id: selectedJob.id } })}
                  >
                    Apply
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500">Experience</div>
                    <div className="font-semibold text-gray-900">{selectedJob.experience_level} years</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500">Work Level</div>
                    <div className="font-semibold text-gray-900">
                      {selectedJob.experience_level <= 1 ? 'Entry Level' :
                       selectedJob.experience_level <= 3 ? 'Mid Level' :
                       selectedJob.experience_level <= 5 ? 'Senior Level' :
                       selectedJob.experience_level <= 7 ? 'Directors' : 'VP or Above'}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500">Employee Type</div>
                    <div className="font-semibold text-gray-900">{selectedJob.job_type}</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500">Offer Salary</div>
                    <div className="font-semibold text-gray-900">{selectedJob.salary_range}</div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-gray-700 text-sm">{selectedJob.job_summary || 'No summary available'}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Key Responsibilities</h3>
                  {Array.isArray(selectedJob.responsibilities) && selectedJob.responsibilities.length > 0 ? (
                    <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                      {selectedJob.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No responsibilities specified</p>
                  )}
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Required Qualifications</h3>
                  {Array.isArray(selectedJob.required_qualifications) && selectedJob.required_qualifications.length > 0 ? (
                    <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                      {selectedJob.required_qualifications.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No qualifications specified</p>
                  )}
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Preferred Skills</h3>
                  {Array.isArray(selectedJob.preferred_skills) && selectedJob.preferred_skills.length > 0 ? (
                    <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                      {selectedJob.preferred_skills.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No preferred skills specified</p>
                  )}
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Application Deadline</h3>
                  <p className="text-gray-700 text-sm">
                    {selectedJob.application_deadline
                      ? new Date(selectedJob.application_deadline).toLocaleDateString()
                      : 'No deadline specified'}
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Equal Opportunity Statement</h3>
                  <p className="text-gray-700 text-sm">
                    {selectedJob.equal_opportunity_statement || 'No statement provided'}
                  </p>
                </div>
                {selectedJob.how_to_apply && (
                  <button
                    className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold text-sm"
                    onClick={() => navigate('/apply-job', { state: { jobTitle: selectedJob.job_title, jobpost_id: selectedJob.id } })}
                  >
                    Apply Online
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobBoard;