import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Clock, Star } from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const WebUIDesignLevel3 = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const curriculum = [
    {
      title: 'Webflow Development',
      description: 'Master Webflow to create professional, no-code websites with advanced interactions and animations.',
      topics: ['Webflow Interface', 'CMS & Dynamic Content', 'Advanced Interactions', 'E-commerce Setup', 'Custom Code Integration'],
    },
    {
      title: 'UX Research & Testing',
      description: 'Learn comprehensive UX research methods including user interviews, usability testing, and data analysis.',
      topics: ['User Interviews', 'Usability Testing', 'A/B Testing', 'Analytics & Metrics', 'Research Synthesis'],
    },
    {
      title: 'Portfolio Development',
      description: 'Create a professional design portfolio that showcases your skills and attracts potential employers.',
      topics: ['Portfolio Strategy', 'Case Studies', 'Project Documentation', 'Personal Branding', 'Presentation Skills'],
    },
    {
      title: 'Advanced Web Experience',
      description: 'Design and develop sophisticated web experiences with advanced animations, micro-interactions, and performance optimization.',
      topics: ['Advanced Animations', 'Micro-interactions', 'Performance Optimization', 'Accessibility', 'Progressive Web Apps'],
    },
  ];

  const outcomes = [
    'Build professional websites using Webflow with advanced functionality and interactions.',
    'Conduct comprehensive UX research and usability testing to inform design decisions.',
    'Create compelling design portfolios that showcase skills and attract opportunities.',
    'Design sophisticated web experiences with advanced animations and performance optimization.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4L8 12L16 20L24 12L16 4Z"
                fill="#4F46E5"
              />
              <path
                d="M16 12L8 20L16 28L24 20L16 12Z"
                fill="#3B82F6"
              />
            </svg>
            Web & UI/UX Design Level 3
          </h1>
          <a
            href="https://webflow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Official Resources
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-blue-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Web & UI/UX Design</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                 Design Leadership & Advanced UX Strategy
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Lead design teams and develop advanced UX strategies. Master design systems, 
                user research methodologies, and design leadership principles.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">6 Weeks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Advanced</span>
                </div>
              </div>

              <motion.button
                onClick={() => setShowEnrollmentModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-blue-600 font-semibold">6 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-blue-600 font-semibold">Advanced</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-200 rounded-lg">
                      <span className="text-gray-700 font-medium">Projects</span>
                      <span className="text-blue-600 font-semibold">5 Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">What You'll Learn</h2>
          <div className="space-y-4">
            {curriculum.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-5 bg-blue-50 hover:bg-blue-100 transition-colors flex justify-between items-center"
                  onClick={() => toggleSection(index)}
                >
                  <span className="text-xl font-medium text-blue-800">{item.title}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${activeSection === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeSection === index && (
                  <div className="p-5 bg-white">
                    <p className="text-blue-700 mb-3">{item.description}</p>
                    <ul className="list-disc pl-6 text-blue-700">
                      {item.topics.map((topic, idx) => (
                        <li key={idx} className="mb-1">{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">Learning Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start">
                <svg
                  className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-blue-800 text-lg">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">Career Opportunities with Advanced Design Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Job Roles</h3>
              <ul className="text-blue-700 space-y-1 text-center">
                <li>Senior UI/UX Designer</li>
                <li>UX Researcher</li>
                <li>Webflow Developer</li>
                <li>Design Director</li>
                <li>Product Designer</li>
                <li>Design Consultant</li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Industries & Companies</h3>
              <ul className="text-blue-700 space-y-1 text-center">
                <li>Design Agencies</li>
                <li>Tech Companies</li>
                <li>Consulting Firms</li>
                <li>E-commerce Platforms</li>
                <li>Startups</li>
                <li>Freelance Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Design Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">Advanced Design Tools & Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://webflow.com/favicon.ico" alt="Webflow" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Webflow</h3>
              <p className="text-blue-700 text-center text-sm">No-code website development platform.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.figma.com/favicon.ico" alt="Figma" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Figma</h3>
              <p className="text-blue-700 text-center text-sm">Advanced UI/UX design and prototyping.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.hotjar.com/favicon.ico" alt="Hotjar" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Hotjar</h3>
              <p className="text-blue-700 text-center text-sm">User behavior analytics and heatmaps.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.optimizely.com/favicon.ico" alt="Optimizely" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Optimizely</h3>
              <p className="text-blue-700 text-center text-sm">A/B testing and experimentation platform.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.usertesting.com/favicon.ico" alt="UserTesting" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">UserTesting</h3>
              <p className="text-blue-700 text-center text-sm">Remote user research and testing platform.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.maze.co/favicon.ico" alt="Maze" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Maze</h3>
              <p className="text-blue-700 text-center text-sm">User research and testing platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Create Portfolio-Ready Web Experiences?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Master Webflow development and UX research to build professional websites and advance your design career.
            </p>
            <motion.button
              onClick={() => setShowEnrollmentModal(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        courseName="Web & UI/UX Design"
        levelName="Level 3"
      />
    </div>
  );
};

export default WebUIDesignLevel3; 