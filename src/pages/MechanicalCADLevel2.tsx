import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Clock, Star } from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const MechanicalCADLevel2 = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const curriculum = [
    {
      title: '3D Modeling Fundamentals',
      description: 'Master 3D modeling techniques and principles for mechanical design and product development.',
      topics: ['3D Modeling Techniques', 'Parametric Design', 'Feature-Based Modeling', 'Assembly Design', 'Part Modeling'],
    },
    {
      title: 'SolidWorks Mastery',
      description: 'Learn advanced SolidWorks features for complex mechanical design and engineering.',
      topics: ['Advanced Modeling', 'Assembly Management', 'Drawing Creation', 'Simulation', 'Design Tables'],
    },
    {
      title: 'Fusion 360 Design',
      description: 'Master Fusion 360 for cloud-based 3D modeling, simulation, and manufacturing.',
      topics: ['Cloud-Based Design', 'Simulation Tools', 'Manufacturing Prep', 'Collaboration', 'Version Control'],
    },
    {
      title: 'Product Design Process',
      description: 'Understand the complete product design process from concept to manufacturing.',
      topics: ['Design Process', 'Prototyping', 'Manufacturing Considerations', 'Quality Control', 'Documentation'],
    },
  ];

  const outcomes = [
    'Create complex 3D models using SolidWorks and Fusion 360.',
    'Master parametric design and assembly modeling techniques.',
    'Apply engineering principles to product design and development.',
    'Prepare designs for manufacturing and production processes.',
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
                fill="#4F46E5"
              />
            </svg>
            Mechanical & CAD Design Level 2
          </h1>
          <a
            href="https://www.solidworks.com/"
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
                  <Box className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Mechanical & CAD Design</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Level 2: 3D Modeling & Advanced CAD Techniques
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master advanced 3D modeling techniques and professional CAD workflows. Learn to create 
                complex mechanical assemblies and detailed engineering designs.
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
                    <Box className="w-12 h-12 text-white" />
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Advanced Curriculum
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Master advanced 3D modeling techniques and professional CAD workflows.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Learning Outcomes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Develop advanced skills for 3D modeling and engineering design.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Career Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Unlock advanced opportunities in mechanical engineering and 3D design.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg shadow p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Job Roles</h3>
                <ul className="text-blue-700 space-y-1 text-center">
                  <li>Mechanical Designer</li>
                  <li>Product Designer</li>
                  <li>CAD Engineer</li>
                  <li>Design Engineer</li>
                  <li>Manufacturing Engineer</li>
                  <li>R&D Engineer</li>
                </ul>
              </div>
              <div className="bg-blue-100 rounded-lg shadow p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Industries & Companies</h3>
                <ul className="text-blue-700 space-y-1 text-center">
                  <li>Manufacturing</li>
                  <li>Automotive Industry</li>
                  <li>Aerospace & Defense</li>
                  <li>Consumer Products</li>
                  <li>Medical Devices</li>
                  <li>Industrial Equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CAD Tools Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Advanced CAD Tools & Software
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Master professional 3D modeling and design software.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.solidworks.com/favicon.ico" alt="SolidWorks" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-blue-800 mb-1">SolidWorks</h3>
                <p className="text-blue-700 text-center text-sm">Professional 3D CAD software.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.autodesk.com/favicon.ico" alt="Fusion 360" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-blue-800 mb-1">Fusion 360</h3>
                <p className="text-blue-700 text-center text-sm">Cloud-based 3D CAD/CAM software.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.autodesk.com/favicon.ico" alt="Inventor" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-blue-800 mb-1">Autodesk Inventor</h3>
                <p className="text-blue-700 text-center text-sm">Professional 3D mechanical design.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.ptc.com/favicon.ico" alt="Creo" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-blue-800 mb-1">PTC Creo</h3>
                <p className="text-blue-700 text-center text-sm">3D CAD/CAM/CAE software.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.siemens.com/favicon.ico" alt="NX" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-blue-800 mb-1">Siemens NX</h3>
                <p className="text-blue-700 text-center text-sm">Advanced CAD/CAM/CAE software.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.dassault-systemes.com/favicon.ico" alt="CATIA" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-blue-800 mb-1">CATIA</h3>
                <p className="text-blue-700 text-center text-sm">High-end 3D CAD software.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Master 3D Modeling?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of successful engineers who have transformed their careers 
                with our advanced CAD training program.
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
        courseName="Mechanical & CAD Design"
        levelName="Level 2"
      />
      </div>
    );
};

export default MechanicalCADLevel2; 