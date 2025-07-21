import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Clock, Star } from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const WebUIDesignLevel1 = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const curriculum = [
    {
      title: 'UI Design Fundamentals',
      description: 'Learn the core principles of user interface design, including layout, typography, color theory, and visual hierarchy.',
      topics: ['Design Principles', 'Color Theory', 'Typography', 'Visual Hierarchy', 'Layout Design'],
    },
    {
      title: 'Figma Mastery',
      description: 'Master Figma for UI design, including components, prototyping, and collaboration features.',
      topics: ['Figma Interface', 'Components & Libraries', 'Prototyping', 'Collaboration', 'Design Systems'],
    },
    {
      title: 'Canva for Design',
      description: 'Learn to create professional designs using Canva for various marketing and branding materials.',
      topics: ['Canva Interface', 'Templates & Elements', 'Brand Kit', 'Social Media Design', 'Print Materials'],
    },
    {
      title: 'User Experience Basics',
      description: 'Introduction to UX principles, user research, and creating user-centered designs.',
      topics: ['UX Principles', 'User Research', 'Personas', 'User Journey Mapping', 'Usability Testing'],
    },
  ];

  const outcomes = [
    'Create professional UI designs using Figma and Canva.',
    'Apply fundamental design principles to create visually appealing interfaces.',
    'Understand basic UX concepts and user-centered design approaches.',
    'Develop a strong foundation in digital design tools and workflows.',
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
                fill="#3B82F6"
              />
              <path
                d="M16 12L8 20L16 28L24 20L16 12Z"
                fill="#1D4ED8"
              />
            </svg>
            Web & UI/UX Design 
          </h1>
          <a
            href="https://www.figma.com/"
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
                 Web Design Fundamentals & UI/UX Basics
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master the fundamentals of web design and user interface design. Learn HTML, CSS, 
                and basic UI/UX principles to create engaging digital experiences.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">4 Weeks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Beginner to Intermediate</span>
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
                      <span className="text-blue-600 font-semibold">4 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-blue-600 font-semibold">Beginner to Intermediate</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-200 rounded-lg">
                      <span className="text-gray-700 font-medium">Projects</span>
                      <span className="text-blue-600 font-semibold">3 Projects</span>
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
                  className="w-6 h-6 text-indigo-400 mr-3 flex-shrink-0"
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
          <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">Career Opportunities with UI/UX Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Job Roles</h3>
              <ul className="text-blue-700 space-y-1 text-center">
                <li>UI Designer</li>
                <li>UX Designer</li>
                <li>Web Designer</li>
                <li>Graphic Designer</li>
                <li>Digital Designer</li>
                <li>Design Intern</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Industries & Companies</h3>
              <ul className="text-indigo-700 space-y-1 text-center">
                <li>Digital Agencies</li>
                <li>Tech Startups</li>
                <li>E-commerce Companies</li>
                <li>Software Companies</li>
                <li>Marketing Agencies</li>
                <li>Freelance Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tools Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-8 text-center">Design Tools & Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.figma.com/favicon.ico" alt="Figma" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Figma</h3>
              <p className="text-blue-700 text-center text-sm">Professional UI/UX design and prototyping tool.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.canva.com/favicon.ico" alt="Canva" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Canva</h3>
              <p className="text-blue-700 text-center text-sm">Graphic design platform for marketing materials.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.adobe.com/favicon.ico" alt="Adobe Creative Suite" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1">Adobe Creative Suite</h3>
              <p className="text-indigo-700 text-center text-sm">Professional design software suite.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.sketch.com/favicon.ico" alt="Sketch" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1">Sketch</h3>
              <p className="text-indigo-700 text-center text-sm">Digital design tool for Mac users.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.invisionapp.com/favicon.ico" alt="InVision" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">InVision</h3>
              <p className="text-blue-700 text-center text-sm">Prototyping and collaboration platform.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.zeplin.io/favicon.ico" alt="Zeplin" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1">Zeplin</h3>
              <p className="text-indigo-700 text-center text-sm">Design handoff and collaboration tool.</p>
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
              Ready to Start Your UI/UX Design Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of successful designers who have transformed their careers with our comprehensive UI/UX design training program.
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
        levelName="Level 1"
      />
    </div>
  );
};

export default WebUIDesignLevel1; 