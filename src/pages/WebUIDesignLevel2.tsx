import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Clock, Star } from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const WebUIDesignLevel2 = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const curriculum = [
    {
      title: 'Responsive Web Design',
      description: 'Master responsive design principles to create websites that work perfectly on all devices and screen sizes.',
      topics: ['Mobile-First Design', 'Breakpoints', 'Flexbox & Grid', 'Responsive Images', 'Touch Interactions'],
    },
    {
      title: 'Advanced Figma Techniques',
      description: 'Learn advanced Figma features including auto-layout, constraints, and complex prototyping.',
      topics: ['Auto Layout', 'Constraints', 'Advanced Prototyping', 'Design Systems', 'Component Libraries'],
    },
    {
      title: 'Adobe XD Mastery',
      description: 'Master Adobe XD for UI/UX design, including prototyping, animations, and design handoff.',
      topics: ['XD Interface', 'Prototyping', 'Animations', 'Design Handoff', 'Collaboration'],
    },
    {
      title: 'App Design Principles',
      description: 'Learn mobile app design principles, patterns, and best practices for iOS and Android.',
      topics: ['Mobile Patterns', 'iOS Guidelines', 'Material Design', 'App Navigation', 'User Flows'],
    },
  ];

  const outcomes = [
    'Create responsive web designs that work across all devices and screen sizes.',
    'Master advanced Figma and Adobe XD techniques for professional UI design.',
    'Design mobile apps following platform-specific guidelines and best practices.',
    'Build comprehensive design systems and component libraries.',
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
                fill="#10B981"
              />
              <path
                d="M16 12L8 20L16 28L24 20L16 12Z"
                fill="#059669"
              />
            </svg>
            Web & UI/UX Design Level 2
          </h1>
          <a
            href="https://www.adobe.com/products/xd.html"
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
             Advanced UI/UX Design & Interactive Web Development
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master advanced UI/UX design principles and interactive web development. Learn to create 
                sophisticated user interfaces and engaging user experiences.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">5 Weeks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Intermediate to Advanced</span>
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
                      <span className="text-blue-600 font-semibold">5 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-blue-600 font-semibold">Intermediate to Advanced</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-200 rounded-lg">
                      <span className="text-gray-700 font-medium">Projects</span>
                      <span className="text-blue-600 font-semibold">4 Projects</span>
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
          <h2 className="text-3xl font-semibold text-blue-700 mb-8 text-center">Career Opportunities with Responsive Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Job Roles</h3>
              <ul className="text-blue-700 space-y-1 text-center">
                <li>UI/UX Designer</li>
                <li>Web Designer</li>
                <li>Mobile App Designer</li>
                <li>Product Designer</li>
                <li>Frontend Designer</li>
                <li>Design Lead</li>
              </ul>
            </div>
            <div className="bg-blue-100 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Industries & Companies</h3>
              <ul className="text-blue-700 space-y-1 text-center">
                <li>Tech Companies</li>
                <li>Digital Agencies</li>
                <li>E-commerce Platforms</li>
                <li>Mobile App Startups</li>
                <li>SaaS Companies</li>
                <li>Design Studios</li>
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
              <img src="https://www.figma.com/favicon.ico" alt="Figma" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Figma</h3>
              <p className="text-blue-700 text-center text-sm">Advanced UI/UX design and prototyping.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.adobe.com/favicon.ico" alt="Adobe XD" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Adobe XD</h3>
              <p className="text-blue-700 text-center text-sm">UI/UX design and prototyping tool.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.sketch.com/favicon.ico" alt="Sketch" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Sketch</h3>
              <p className="text-blue-700 text-center text-sm">Digital design tool for Mac.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.invisionapp.com/favicon.ico" alt="InVision" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">InVision</h3>
              <p className="text-blue-700 text-center text-sm">Prototyping and collaboration.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.zeplin.io/favicon.ico" alt="Zeplin" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Zeplin</h3>
              <p className="text-blue-700 text-center text-sm">Design handoff and collaboration.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.abstract.com/favicon.ico" alt="Abstract" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-blue-800 mb-1">Abstract</h3>
              <p className="text-blue-700 text-center text-sm">Design version control and collaboration.</p>
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
              Ready to Master Responsive Design?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Take your design skills to the next level with responsive web and app design techniques.
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
        levelName="Level 2"
      />
    </div>
  );
};

export default WebUIDesignLevel2; 