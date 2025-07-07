import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCandidateUrl } from '../../../config/api';
import { useNavigate, Link } from 'react-router-dom';
import { User, ChevronLeft, ChevronRight, ArrowLeft, Mail, MapPin, FileText, Download, Eye, Trash2 } from 'lucide-react';
import debounce from 'lodash.debounce';

// Define TypeScript interfaces
interface Candidate {
  id: number;
  fullName: string;
  email: string;
  preferredRole: string;
  skills: string[];
  languages: string[];
  resumePath?: string;
  academicDocsPath?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCandidates: number;
  limit: number;
}

interface Filters {
  email: string;
  fullName: string;
}

interface ApiResponse {
  data: Candidate[];
  pagination: Pagination;
}

const EnquiryDashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalCandidates: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState<Filters>({ email: '', fullName: '' });
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const navigate = useNavigate();
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [debouncedStartDate, setDebouncedStartDate] = useState(startDate);
  const [debouncedEndDate, setDebouncedEndDate] = useState(endDate);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  // Debounce filter and date changes
  const debounceFilters = useCallback(
    debounce((filters: Filters, start: string, end: string) => {
      setDebouncedFilters(filters);
      setDebouncedStartDate(start);
      setDebouncedEndDate(end);
    }, 500),
    []
  );

  useEffect(() => {
    debounceFilters(filters, startDate, endDate);
    // Cleanup debounce on unmount
    return () => debounceFilters.cancel();
  }, [filters, startDate, endDate, debounceFilters]);

  useEffect(() => {
    fetchCandidates();
    // eslint-disable-next-line
  }, [pagination.currentPage, debouncedFilters, debouncedStartDate, debouncedEndDate]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: pagination.currentPage,
        limit: pagination.limit,
      };
      if (debouncedFilters.email) params.email = debouncedFilters.email;
      if (debouncedFilters.fullName) params.name = debouncedFilters.fullName;
      if (debouncedStartDate) params.createdAt_gte = new Date(debouncedStartDate).toISOString();
      if (debouncedEndDate) params.createdAt_lte = new Date(debouncedEndDate).toISOString();

      console.log('Fetching candidates with params:', params);

      const response = await axios.get<ApiResponse>(getCandidateUrl(''), {
        params,
        // Comment out Cache-Control to avoid CORS preflight issues
        // headers: {
        //   'Cache-Control': 'no-cache',
        // },
      });

      console.log('API response:', response.data);

      setCandidates(response.data.data);
      setPagination(response.data.pagination);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      const errorMessage = err.response?.data?.error
        ? typeof err.response.data.error === 'string'
          ? err.response.data.error
          : JSON.stringify(err.response.data.error)
        : 'Failed to fetch candidates';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') setStartDate(value);
    if (type === 'end') setEndDate(value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleViewMore = (candidateId: number) => {
    navigate(`/hr/candidate/${candidateId}`);
  };

  // Delete handler
  const handleDeleteCandidate = async () => {
    if (!candidateToDelete) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
              await axios.delete(getCandidateUrl(`/${candidateToDelete.id}`));
      setDeleteSuccess('Candidate deleted successfully!');
      setDeleteModalOpen(false);
      setCandidateToDelete(null);
      setSelectedCandidate(null);
      fetchCandidates();
    } catch (err: any) {
      setDeleteError('Failed to delete candidate.');
    } finally {
      setDeleteLoading(false);
      setTimeout(() => setDeleteSuccess(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600">{error || 'An error occurred'}</h2>
          <Link
            to="/hr"
            className="mt-4 flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Back to HR Dashboard"
          >
            <ArrowLeft size={20} />
            <span>Back to HR Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/hr"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Back to HR Dashboard"
              >
                <ArrowLeft size={20} />
                <span>Back to HR Dashboard</span>
              </Link>
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">Candidate Enquiries</h1>
              <p className="text-gray-600">View all candidate enquiries and applications</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.totalCandidates}</p>
              </div>
              <User className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Page</p>
                <p className="text-2xl font-bold text-green-600">{pagination.currentPage}</p>
              </div>
              <FileText className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Pages</p>
                <p className="text-2xl font-bold text-purple-600">{pagination.totalPages}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Filter Candidates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Filter by Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={filters.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('email', e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter email..."
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Filter by Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={filters.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFilterChange('fullName', e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter name..."
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                max={endDate || undefined}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                min={startDate || undefined}
              />
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="space-y-4 sm:space-y-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto pr-1 sm:pr-2">
          {candidates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <User className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-600">No candidates match your current filters.</p>
            </div>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition-shadow flex items-center justify-between mb-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="text-blue-600" size={18} />
                    <span className="font-semibold text-gray-900 truncate max-w-[120px]">{candidate.fullName}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">ID: {candidate.id}</span>
                    <span className="text-gray-500 text-xs truncate max-w-[120px] ml-2">{candidate.email}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                    <span className="flex items-center gap-1"><FileText size={14} />{candidate.preferredRole}</span>
                    {candidate.skills.length > 0 && (
                      <span className="flex items-center gap-1"><strong>Skills:</strong> {candidate.skills.join(', ')}</span>
                    )}
                    {candidate.languages.length > 0 && (
                      <span className="flex items-center gap-1"><strong>Lang:</strong> {Array.isArray(candidate.languages) ? candidate.languages.join(', ') : ''}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {candidate.resumePath && (
                      <a
                        href={candidate.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200 transition-colors"
                      >
                        <Download size={12} />
                        <span>Resume</span>
                      </a>
                    )}
                    {candidate.academicDocsPath && (
                      <a
                        href={candidate.academicDocsPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 transition-colors"
                      >
                        <FileText size={12} />
                        <span>Docs</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-4">
                  <button
                    onClick={() => setSelectedCandidate(candidate)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => handleViewMore(candidate.id)}
                    className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => { setCandidateToDelete(candidate); setDeleteModalOpen(true); }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Candidate"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center space-x-2 mt-6 sm:mt-8">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-full sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">{selectedCandidate.fullName}</h2>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-2">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-black">
                    <div>
                      <strong>Email:</strong> {selectedCandidate.email}
                    </div>
                    <div>
                      <strong>ID:</strong> {selectedCandidate.id}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">Professional Details</h3>
                  <div className="space-y-2 text-sm text-black">
                    <div>
                      <strong>Preferred Role:</strong> {selectedCandidate.preferredRole}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t">
                  {selectedCandidate.resumePath && (
                    <a
                      href={selectedCandidate.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Download size={16} />
                      <span>View Resume</span>
                    </a>
                  )}
                  {selectedCandidate.academicDocsPath && (
                    <a
                      href={selectedCandidate.academicDocsPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <FileText size={16} />
                      <span>View Academic Docs</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => { setCandidateToDelete(selectedCandidate); setDeleteModalOpen(true); }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && candidateToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2 sm:p-0">
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-full sm:max-w-md w-full text-center animate-fade-in">
            <Trash2 size={40} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Candidate?</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete <span className="font-semibold text-black">{candidateToDelete.fullName}</span>? This action cannot be undone.</p>
            {deleteError && <div className="text-red-600 mb-2">{deleteError}</div>}
            {deleteSuccess && <div className="text-green-600 mb-2">{deleteSuccess}</div>}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCandidate}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center justify-center"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryDashboard;