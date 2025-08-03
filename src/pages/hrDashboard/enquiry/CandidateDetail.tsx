import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCandidateUrl } from '../../../config/api';

// Define TypeScript interface for Candidate
interface Candidate {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  alternateContactNumber?: string;
  currentCity: string;
  homeTown: string;
  dateOfBirth: string;
  gender: string;
  willingToRelocate: boolean;
  languages: string[];
  linkedinLink?: string;
  githubLink?: string;
  resumePath?: string;
  academicDocsPath?: string;
  highestQualification: string;
  courseName: string;
  collegeUniversity: string;
  affiliatedUniversity: string;
  yearOfPassing: number;
  aggregateMarks: number;
  allSemestersCleared: boolean;
  skills: string[];
  internshipProjectExperience: boolean;
  projectDescription?: string;
  preferredRole: string;
  expectedCTC?: number;
  immediateJoining: boolean;
  openToShifts: boolean;
  opportunitySource: string;
  availableForOnlineTests: boolean;
  hasLaptopInternet: boolean;
  aadharNumber?: string;
  panNo?: string;
  passportAvailable: boolean;
  certificateName?: string;
}

// Define interface for API response
interface ApiResponse {
  success: boolean;
  data: Candidate;
}

const CandidateDetail: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!candidateId) {
      setError('No candidate ID provided in the URL.');
      setLoading(false);
      return;
    }
    const fetchCandidate = async () => {
      try {
        const response = await axios.get<ApiResponse>(getCandidateUrl(`/${candidateId}`));
        if (response.data.success) {
          setCandidate(response.data.data);
          setLoading(false);
        } else {
          setError('Candidate not found');
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch candidate');
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [candidateId]);

  // Function to handle all external link clicks
  const handleExternalLinkClick = (url: string | undefined) => {
    if (!url) return;

    // Ensure the link has https:// prefix
    let formattedUrl = url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    window.open(formattedUrl, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto my-8 text-center">
        <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 mb-6">
          <h2 className="text-2xl font-bold">{error}</h2>
        </div>
        <button
          onClick={() => navigate('/hr/enquiry')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Back to Candidates List
        </button>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto my-8 text-center">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-400 p-4 mb-6">
          <h2 className="text-2xl font-bold">No candidate found</h2>
        </div>
        <button
          onClick={() => navigate('/hr/enquiry')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Back to Candidates List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{candidate.fullName}</h1>
              <p className="text-blue-100 mt-1">{candidate.preferredRole}</p>
            </div>
            <span className="bg-white dark:bg-gray-100 text-blue-800 dark:text-blue-900 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mt-2 sm:mt-0">
              ID: {candidateId}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          {/* Contact & Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Email:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.email}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Mobile:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.mobileNumber}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Alternate Contact:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.alternateContactNumber || 'N/A'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Current City:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.currentCity}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Home Town:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.homeTown}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Personal Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Date of Birth:</span> <span className="text-gray-900 dark:text-gray-100">{new Date(candidate.dateOfBirth).toLocaleDateString()}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Gender:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.gender}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Willing to Relocate:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.willingToRelocate ? 'Yes' : 'No'}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Professional Links</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-blue-900 dark:text-blue-300">LinkedIn:</span>
                  {candidate.linkedinLink ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.linkedinLink)}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Profile
                    </button>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">N/A</span>
                  )}
                </p>
                <p>
                  <span className="font-medium text-blue-900 dark:text-blue-300">GitHub:</span>
                  {candidate.githubLink ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.githubLink)}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Profile
                    </button>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">N/A</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 sm:mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium text-blue-900 dark:text-blue-300">Resume:</span>
                  {candidate.resumePath ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.resumePath)}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      Download Resume
                    </button>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">N/A</span>
                  )}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium text-blue-900 dark:text-blue-300">Academic Documents:</span>
                  {candidate.academicDocsPath ? (
                    <button
                      onClick={() => handleExternalLinkClick(candidate.academicDocsPath)}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2 bg-transparent border-none cursor-pointer p-0"
                    >
                      View Documents
                    </button>
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">N/A</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Education & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Education Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Highest Qualification:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.highestQualification}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Course:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.courseName}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">College/University:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.collegeUniversity}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Affiliated University:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.affiliatedUniversity}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Year of Passing:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.yearOfPassing}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Aggregate Marks:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.aggregateMarks}%</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">All Semesters Cleared:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.allSemestersCleared ? 'Yes' : 'No'}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Skills & Experience</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-blue-900 dark:text-blue-300">Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {candidate.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </p>
                <p>
                  <span className="font-medium text-blue-900 dark:text-blue-300">Project Experience:</span>{' '}
                  <span className="text-gray-900 dark:text-gray-100">{candidate.internshipProjectExperience ? 'Yes' : 'No'}</span>
                </p>
                {candidate.projectDescription && (
                  <p>
                    <span className="font-medium text-blue-900 dark:text-blue-300">Project Description:</span>{' '}
                    <span className="text-gray-900 dark:text-gray-100">{candidate.projectDescription}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Preferences & Other Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Job Preferences</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Preferred Role:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.preferredRole}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Expected CTC:</span> <span className="text-gray-900 dark:text-gray-100">₹{candidate.expectedCTC || 'N/A'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Immediate Joining:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.immediateJoining ? 'Yes' : 'No'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Open to Shifts:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.openToShifts ? 'Yes' : 'No'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Opportunity Source:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.opportunitySource}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2 mb-3">Other Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Available for Online Tests:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.availableForOnlineTests ? 'Yes' : 'No'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Has Laptop/Internet:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.hasLaptopInternet ? 'Yes' : 'No'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Aadhar Number:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.aadharNumber || 'N/A'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">PAN Number:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.panNo || 'N/A'}</span></p>
                <p><span className="font-medium text-blue-900 dark:text-blue-300">Passport Available:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.passportAvailable ? 'Yes' : 'No'}</span></p>
                {candidate.certificateName && (
                  <p><span className="font-medium text-blue-900 dark:text-blue-300">Certificate Name:</span> <span className="text-gray-900 dark:text-gray-100">{candidate.certificateName}</span></p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-6 gap-2 sm:gap-4">
            <button
              onClick={() => navigate('/hr/enquiry')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition duration-300"
            >
              Back to Candidates List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;