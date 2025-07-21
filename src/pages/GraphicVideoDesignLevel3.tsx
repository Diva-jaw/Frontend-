import React, { useState } from 'react';
import EnrollmentModal from '../components/ui/EnrollmentModal';
import { motion } from 'framer-motion';
import { 
  Image, 
  Video, 
  Play, 
  Share2, 
  CheckCircle,
  Clock,
  Star,
  Palette,
  BookOpen,
  Users,
  BarChart2,
  Target
} from 'lucide-react';

const GraphicVideoDesignLevel3 = () => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const curriculum = [
    {
      title: "Creative Direction & Leadership",
      description: "Lead creative projects and develop comprehensive design strategies for brands and organizations.",
      topics: ["Creative Strategy", "Team Leadership", "Project Management", "Brand Development", "Creative Briefs"],
      icon: Users,
      color: "orange"
    },
    {
      title: "Advanced Production Techniques",
      description: "Master sophisticated production techniques for high-end visual content and campaigns.",
      topics: ["Advanced Compositing", "3D Integration", "Visual Effects", "Color Grading", "Audio Design"],
      icon: Video,
      color: "orange"
    },
    {
      title: "Industry Standards & Best Practices",
      description: "Learn industry standards and best practices for professional design and production workflows.",
      topics: ["Industry Standards", "Workflow Optimization", "Quality Assurance", "Client Communication", "Project Delivery"],
      icon: Target,
      color: "orange"
    },
    {
      title: "Digital Marketing Integration",
      description: "Integrate design and video content with digital marketing strategies for maximum impact.",
      topics: ["Marketing Strategy", "Content Optimization", "Analytics", "A/B Testing", "ROI Measurement"],
      icon: BarChart2,
      color: "orange"
    }
  ];

  const outcomes = [
    'Lead creative teams and manage complex design projects from concept to completion.',
    'Create sophisticated visual content using advanced production techniques and industry tools.',
    'Implement industry standards and best practices for professional design workflows.',
    'Integrate design and video content with comprehensive digital marketing strategies.',
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
                fill="#60A5FA"
              />
            </svg>
            Graphic & Video Content Design Level 3
          </h1>
          <a
            href="https://www.adobe.com/creativecloud.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Official Resources
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Course Tag */}
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg mb-6">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm font-medium">Design & Creative</span>
                </div>

                {/* Course Title */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Level 3: Creative Direction & Advanced Production
                </h1>

                {/* Course Description */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Lead creative projects and master advanced production techniques. Develop comprehensive design strategies and create sophisticated visual content for professional environments.
                </p>

                {/* Course Info */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">6 Weeks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700 font-medium">Advanced to Expert</span>
                  </div>
                </div>

                {/* Enroll Button */}
                <motion.button
                  onClick={() => setShowEnrollmentModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enroll Now
                </motion.button>
              </motion.div>

              {/* Curriculum Section */}
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="space-y-4">
                  {curriculum.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Learning Outcomes */}
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Learning Outcomes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {outcomes.map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{outcome}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Course Overview */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Course Overview</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-blue-600 font-semibold">6 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Level</span>
                    <span className="text-blue-600 font-semibold">Advanced to Expert</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Projects</span>
                    <span className="text-blue-600 font-semibold">4 Projects</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Tools</span>
                    <span className="text-blue-600 font-semibold">Professional Suite</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Certificate</span>
                    <span className="text-blue-600 font-semibold">Yes</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Expert Tools You'll Master</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Advanced After Effects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Cinema 4D</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">DaVinci Resolve</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Project Management</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Lead Creative Projects?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Master advanced design and production techniques to lead creative teams and create sophisticated visual content.
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
        courseName="Graphic & Video Design"
        levelName="Level 3"
      />
    </div>
  );
};

export default GraphicVideoDesignLevel3;