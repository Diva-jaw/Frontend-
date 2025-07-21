import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Clock, Star } from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const MechanicalCADLevel1 = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const curriculum = [
    {
      title: '2D Drafting Fundamentals',
      description: 'Learn the basics of 2D technical drawing and drafting principles for mechanical design.',
      topics: ['Technical Drawing', 'Orthographic Projections', 'Dimensioning', 'Tolerances', 'Assembly Drawings'],
    },
    {
      title: 'AutoCAD Basics',
      description: 'Master AutoCAD for 2D drafting, including drawing tools, layers, and annotation.',
      topics: ['AutoCAD Interface', 'Drawing Tools', 'Layers & Properties', 'Annotation', 'Plotting'],
    },
    {
      title: 'TinkerCAD Introduction',
      description: 'Learn TinkerCAD for 3D modeling and design, perfect for beginners in CAD.',
      topics: ['3D Modeling Basics', 'Shape Creation', 'Boolean Operations', 'File Export', 'Design Workflow'],
    },
    {
      title: 'Engineering Standards',
      description: 'Understand engineering drawing standards and best practices for professional CAD work.',
      topics: ['ASME Standards', 'ISO Standards', 'Drawing Conventions', 'Quality Control', 'Documentation'],
    },
  ];

  const outcomes = [
    'Create professional 2D technical drawings using AutoCAD.',
    'Master fundamental drafting principles and engineering standards.',
    'Design 3D models using TinkerCAD for prototyping and visualization.',
    'Apply engineering drawing standards and best practices.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4L8 12L16 20L24 12L16 4Z"
                fill="#6B7280"
              />
              <path
                d="M16 12L8 20L16 28L24 20L16 12Z"
                fill="#4B5563"
              />
            </svg>
            Mechanical & CAD Design Level 1
          </h1>
          <a
            href="https://www.autodesk.com/products/autocad"
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
                Level 1: CAD Fundamentals & 2D Design
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master the fundamentals of Computer-Aided Design (CAD) and 2D drafting techniques. 
                Learn to create precise technical drawings and engineering designs.
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
                    <Box className="w-12 h-12 text-white" />
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
              Comprehensive Curriculum
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our structured curriculum covers all essential aspects of CAD design, 
              from 2D drafting fundamentals to advanced engineering techniques.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculum.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full text-left p-5 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={() => toggleSection(index)}
                >
                  <span className="text-xl font-medium text-gray-800">{item.title}</span>
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
                    <p className="text-gray-700 mb-3">{item.description}</p>
                    <ul className="list-disc pl-6 text-gray-700">
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
              Develop essential skills for CAD design and engineering applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-start">
                <svg
                  className="w-6 h-6 text-slate-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-800 text-lg">{outcome}</span>
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
              Unlock opportunities in mechanical engineering and CAD design across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Job Roles</h3>
              <ul className="text-gray-700 space-y-1 text-center">
                <li>CAD Drafter</li>
                <li>Mechanical Designer</li>
                <li>Design Engineer</li>
                <li>Product Designer</li>
                <li>Technical Illustrator</li>
                <li>Engineering Technician</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg shadow p-6 flex flex-col items-center">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Industries & Companies</h3>
              <ul className="text-slate-700 space-y-1 text-center">
                <li>Manufacturing</li>
                <li>Automotive Industry</li>
                <li>Aerospace & Defense</li>
                <li>Construction</li>
                <li>Product Development</li>
                <li>Engineering Services</li>
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
              CAD Tools & Software
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the tools used in professional CAD design and engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.autodesk.com/favicon.ico" alt="AutoCAD" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">AutoCAD</h3>
              <p className="text-gray-700 text-center text-sm">Professional 2D and 3D CAD software.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.tinkercad.com/favicon.ico" alt="TinkerCAD" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">TinkerCAD</h3>
              <p className="text-gray-700 text-center text-sm">3D modeling and design platform.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.autodesk.com/favicon.ico" alt="AutoCAD LT" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">AutoCAD LT</h3>
              <p className="text-slate-700 text-center text-sm">2D drafting software for professionals.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.freecad.org/favicon.ico" alt="FreeCAD" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">FreeCAD</h3>
              <p className="text-slate-700 text-center text-sm">Open-source 3D parametric modeling.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.openscad.org/favicon.ico" alt="OpenSCAD" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">OpenSCAD</h3>
              <p className="text-gray-700 text-center text-sm">Programmatic 3D modeling software.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="https://www.sketchup.com/favicon.ico" alt="SketchUp" className="w-12 h-12 mb-2" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">SketchUp</h3>
              <p className="text-slate-700 text-center text-sm">3D modeling software for design and architecture.</p>
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
              Ready to Master CAD Design?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of successful engineers who have transformed their careers with our comprehensive CAD training program.
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
        levelName="Level 1"
      />
    </div>
  );
};

export default MechanicalCADLevel1; 