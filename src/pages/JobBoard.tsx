import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getJobUrl } from '../config/api';
import { FaHeart } from 'react-icons/fa';
import { FiHeart, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobSummary[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedWorkLevels, setSelectedWorkLevels] = useState<string[]>([]);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [showLikedJobs, setShowLikedJobs] = useState(false);
  const navigate = useNavigate();

  const salaryLpaRanges = [
    { label: '2 - 5 LPA', min: 2, max: 5 },
    { label: '5 - 10 LPA', min: 5, max: 10 },
    { label: '10 - 20 LPA', min: 10, max: 20 },
    { label: '20 - 35 LPA', min: 20, max: 35 },
    { label: '35 - 50 LPA', min: 35, max: 50 },
  ];

  const workLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Directors', 'VP or Above'];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(getJobUrl());
        setJobs(response.data);
        setFilteredJobs(response.data);
        if (response.data.length > 0) {
          await fetchJobDetails(response.data[0].id);
        }
      } catch (err) {
        setError('Failed to load jobs.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const fetchJobDetails = async (id: number) => {
    try {
      const response = await axios.get(getJobUrl(`/${id}`));
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
      filtered = filtered.filter(job =>
        selectedJobTypes.some(type => job.job_type.toLowerCase() === type.toLowerCase())
      );
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
      filtered = filtered.filter(job =>
        selectedWorkLevels.includes(workLevels[job.experience_level] || '')
      );
    }
    if (searchTitle.trim()) {
      filtered = filtered.filter(job => job.job_title.toLowerCase().includes(searchTitle.trim().toLowerCase()));
    }
    setFilteredJobs(filtered);
    if (filtered.length > 0) {
      fetchJobDetails(filtered[0].id);
    } else {
      setSelectedJob(null);
    }
  }, [jobs, selectedDepartment, selectedJobTypes, selectedSalaryRanges, selectedWorkLevels, searchTitle]);

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const departmentOptions = Array.from(new Set(jobs.map(job => job.department)));

  if (loading) return <div className="flex justify-center items-center min-h-screen text-blue-600 dark:text-blue-400 text-xl">Loading jobs...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 dark:text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      
      {/* Header */}
      <div className="top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg dark:shadow-gray-800/20 px-8 py-4 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        {/* Header Content */}
        <div className="flex justify-between items-center mb-4 pt-24">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 text-transparent bg-clip-text tracking-tight">
            Job Board
          </h1>
          <button
            onClick={() => setShowLikedJobs(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow hover:scale-105 transition-all"
          >
            Liked Jobs ({liked.length})
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Department */}
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm appearance-none pr-10 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departmentOptions.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>

          {/* Job Type */}
          <div className="flex gap-2 flex-wrap items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 transition-colors duration-300">
            {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
              <label key={type} className="flex items-center gap-1 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="accent-blue-600 dark:accent-blue-400"
                  checked={selectedJobTypes.includes(type)}
                  onChange={(e) => {
                    setSelectedJobTypes((prev) =>
                      e.target.checked ? [...prev, type] : prev.filter((t) => t !== type)
                    );
                  }}
                />
                {type}
              </label>
            ))}
          </div>

          {/* Salary */}
          <div className="relative">
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm appearance-none pr-10 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
              onChange={(e) => setSelectedSalaryRanges(e.target.value ? [e.target.value] : [])}
            >
              <option value="">Salary Range</option>
              {salaryLpaRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>

          {/* Work Level - Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm flex justify-between items-center focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            >
              {selectedWorkLevels.length > 0 ? `${selectedWorkLevels.length} Selected` : 'Select Work Level'}
              <FiChevronDown className={`transition-transform ${workDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {workDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-300 dark:border-gray-600 z-50 p-3"
                >
                  {workLevels.map((level) => (
                    <label key={level} className="flex items-center gap-2 text-sm py-1 text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        className="accent-blue-500 dark:accent-blue-400"
                        checked={selectedWorkLevels.includes(level)}
                        onChange={(e) => {
                          setSelectedWorkLevels((prev) =>
                            e.target.checked ? [...prev, level] : prev.filter((l) => l !== level)
                          );
                        }}
                      />
                      {level}
                    </label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <main className="flex flex-col md:flex-row gap-6 px-4 md:px-6 pt-2 pb-10">
        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/20 p-4 overflow-y-auto h-auto md:h-[80vh] border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          {/* Search */}
          <div className="flex items-center mb-4 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 transition-colors duration-300">
            <span className="text-gray-400 dark:text-gray-500 mr-2">🔍</span>
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search jobs..."
              className="w-full py-3 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Job Cards */}
          {filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center text-gray-500 dark:text-gray-400 py-10 flex flex-col items-center gap-4"
            >
              <p className="text-lg font-semibold">No jobs found for the selected filters.</p>
              <p className="text-sm mb-4">Try adjusting your filters or resetting them.</p>

              {/* Reset Filters Button */}
              <button
                onClick={() => {
                  setSelectedDepartment('');
                  setSelectedJobTypes([]);
                  setSelectedSalaryRanges([]);
                  setSelectedWorkLevels([]);
                  setSearchTitle('');
                  setFilteredJobs(jobs); // Reset to all jobs
                }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
              >
                🔄 Reset Filters
              </button>

              {/* Back to All Jobs Link */}
              <button
                onClick={() => {
                  setShowLikedJobs(false);
                  setFilteredJobs(jobs);
                }}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-2"
              >
                View All Jobs →
              </button>
            </motion.div>
          ) : (
            filteredJobs.map(job => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.03 }}
                className={`p-4 mb-4 rounded-xl border transition-all cursor-pointer ${
                  selectedJob?.id === job.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:text-white hover:shadow-lg border-gray-200 dark:border-gray-600'
                }`}
                onClick={() => fetchJobDetails(job.id)}
                onMouseEnter={() => {
                  // Optional: Add delay to avoid rapid switching
                  setTimeout(() => fetchJobDetails(job.id), 300);
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{job.job_title}</h4>
                    <p className="text-sm">{job.location}</p>
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">{job.job_type}</span>
                      <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">{job.salary_range}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(job.id); }}
                    className="text-xl hover:scale-125 transition"
                  >
                    {liked.includes(job.id) ? <FaHeart className="text-red-500" /> : <FiHeart className="text-gray-400 dark:text-gray-500" />}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Right Panel - Job Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-800/20 p-6 md:p-8 overflow-y-auto h-auto md:h-[80vh] border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          {selectedJob && (
            <div className="space-y-8">
              {/* Job Header */}
              <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedJob.job_title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {selectedJob.department} • {selectedJob.location} • {selectedJob.job_type}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    Posted on {new Date(selectedJob.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    localStorage.setItem('jobTitle', selectedJob.job_title);
                    localStorage.setItem('jobpost_id', String(selectedJob.id));
                    navigate('/apply-job', { state: { jobTitle: selectedJob.job_title, jobpost_id: selectedJob.id } });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition-colors duration-300"
                >
                  Apply Now
                </button>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-inner">
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Experience</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedJob.experience_level} years</p>
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Work Level</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedJob.experience_level <= 1
                      ? 'Entry Level'
                      : selectedJob.experience_level <= 4
                      ? 'Mid Level'
                      : 'Senior Level'}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Employee Type</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedJob.job_type}</p>
                </div>
                <div>
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold">Offer Salary</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedJob.salary_range}</p>
                </div>
              </div>

              {/* Overview */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedJob.job_summary}</p>
              </section>

              {/* Responsibilities */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {selectedJob.responsibilities && selectedJob.responsibilities.length > 0
                    ? selectedJob.responsibilities.map((item, i) => <li key={i}>{item}</li>)
                    : <li>No responsibilities specified</li>}
                </ul>
              </section>

              {/* Required Qualifications */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Required Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {selectedJob.required_qualifications && selectedJob.required_qualifications.length > 0
                    ? selectedJob.required_qualifications.map((item, i) => <li key={i}>{item}</li>)
                    : <li>No qualifications specified</li>}
                </ul>
              </section>

              {/* Preferred Skills */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Preferred Skills</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {selectedJob.preferred_skills && selectedJob.preferred_skills.length > 0
                    ? selectedJob.preferred_skills.map((item, i) => <li key={i}>{item}</li>)
                    : <li>No preferred skills specified</li>}
                </ul>
              </section>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow">
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-lg mb-2">Application Deadline</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.application_deadline}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow">
                  <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-lg mb-2">Equal Opportunity Statement</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedJob.equal_opportunity_statement}</p>
                </div>
              </div>
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => {
                    localStorage.setItem('jobTitle', selectedJob.job_title);
                    localStorage.setItem('jobpost_id', String(selectedJob.id));
                    navigate('/apply-job', {
                      state: { jobTitle: selectedJob.job_title, jobpost_id: selectedJob.id },
                    });
                  }}
                  className="w-1/3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-base shadow-md transition-transform hover:scale-105"
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <AnimatePresence>
        {showLikedJobs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-800/20 p-6 w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">Liked Jobs</h2>
                <button
                  onClick={() => setShowLikedJobs(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-xl transition-colors duration-300"
                >
                  ✖
                </button>
              </div>

              {liked.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">No liked jobs yet!</p>
              ) : (
                <div className="space-y-4">
                  {jobs.filter(job => liked.includes(job.id)).map(job => (
                    <div
                      key={job.id}
                      className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 hover:text-white transition-all flex justify-between items-center border-gray-200 dark:border-gray-600"
                    >
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          fetchJobDetails(job.id);
                          setShowLikedJobs(false);
                        }}
                      >
                        <h4 className="font-semibold">{job.job_title}</h4>
                        <p className="text-sm">{job.location}</p>
                        <p className="text-xs">{job.salary_range}</p>
                      </div>

                      {/* Heart Icon for Liking/Unliking */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid triggering job details
                          toggleLike(job.id);
                        }}
                        className="text-2xl hover:scale-125 transition"
                      >
                        {liked.includes(job.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FiHeart className="text-gray-400 dark:text-gray-500" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobBoard;