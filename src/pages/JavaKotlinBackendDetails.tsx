import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, // Icon for Java & Kotlin Fundamentals
  Server, // Icon for Spring Boot Framework
  Smartphone, // Icon for Mobile Backend Development
  Database, // Icon for Database Integration & Deployment
  CheckCircle,
  Clock,
  Star,
  X,
  Calendar
} from 'lucide-react';

const JavaKotlinBackendDetails = () => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Enrollment form submitted:', formData);
    setSubmitted(true);
    setShowEnrollmentModal(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const curriculum = [
    {
      title: 'Java & Kotlin Fundamentals',
      description: 'Learn the basics of Java and Kotlin programming for backend development and mobile backend services.',
      topics: ['Java Core Concepts', 'Kotlin Language Features', 'Object-Oriented Programming', 'Functional Programming'],
      icon: Code,
    },
    {
      title: 'Spring Boot Framework',
      description: 'Master Spring Boot for building robust, scalable backend applications and RESTful APIs.',
      topics: ['Spring Boot Setup', 'REST Controllers', 'Dependency Injection', 'Spring Security'],
      icon: Server,
    },
    {
      title: 'Mobile Backend Development',
      description: 'Build backend services specifically designed for mobile applications with authentication and data synchronization.',
      topics: ['Mobile API Design', 'Push Notifications', 'Data Synchronization', 'Mobile Security'],
      icon: Smartphone,
    },
    {
      title: 'Database Integration & Deployment',
      description: 'Connect to databases, handle data persistence, and deploy your Java/Kotlin backend applications.',
      topics: ['JPA/Hibernate', 'PostgreSQL Integration', 'Docker Deployment', 'Cloud Platforms'],
      icon: Database,
    },
  ];

  const outcomes = [
    'Build high-performance backend applications with Java and Kotlin.',
    'Create RESTful APIs using Spring Boot framework.',
    'Develop mobile-specific backend services and APIs.',
    'Deploy Java/Kotlin backend applications to production environments.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-blue-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" /> {/* Icon for Java & Kotlin */}
                </div>
                <span className="text-blue-600 font-semibold">Java & Kotlin Backend Development</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Build Mobile Backend with Java & Kotlin
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master backend development with Java and Kotlin using Spring Boot. Create powerful APIs and mobile backend services.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">3 Months</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Intermediate</span>
                </div>
              </div>

              <motion.button
                onClick={() => setShowEnrollmentModal(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Code className="w-12 h-12 text-white" /> {/* Icon for Java & Kotlin */}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-blue-600 font-semibold">3 Months</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-blue-600 font-semibold">Intermediate</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Master Java, Kotlin, Spring Boot, mobile backend development, and database integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {curriculum.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <module.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{module.title}</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Advanced Learning Outcomes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Develop skills to build and deploy robust backend applications with Java and Kotlin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{outcome}</h3>
                {/* No additional description needed as per GraphicVideoDesignLevel2 structure */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Career Opportunities with Java & Kotlin Backend
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock intermediate to senior roles in backend development across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[
              {
                title: "Job Roles",
                items: ["Java Backend Developer", "Kotlin Backend Developer", "Spring Boot Developer", "Mobile Backend Engineer", "Full Stack Developer", "API Developer"],
                background: "from-blue-50 to-blue-100"
              },
              {
                title: "Industries & Companies",
                items: ["Enterprise Software", "FinTech & Banking", "Mobile App Companies", "E-commerce Platforms", "Healthcare IT", "Government & Defense"],
                background: "from-blue-50 to-blue-100"
              }
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${role.background} rounded-xl p-6 border border-blue-100`}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{role.title}</h3>
                <ul className="text-blue-700 space-y-1 text-center">
                  {role.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Java & Kotlin Ecosystem & Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the tools and platforms used in backend development.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {[
              { name: "Java", icon: Code },
              { name: "Kotlin", icon: Code },
              { name: "Spring Boot", icon: Server },
              { name: "Hibernate", icon: Database },
              { name: "Docker", icon: Server },
              { name: "AWS", icon: Server }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <tool.icon className="w-12 h-12 text-blue-600 mb-2" />
                <span className="text-gray-700 font-medium text-sm">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Build Mobile Backends?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Start your journey as a Java/Kotlin backend developer. Master Spring Boot and mobile backend development!
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
      {showEnrollmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Enroll in Java & Kotlin Backend Course</h3>
              <button
                onClick={() => { setShowEnrollmentModal(false); setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {submitted ? (
                <div className="text-center text-blue-600 font-semibold py-8">Thank you for enrolling! We will contact you soon.</div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Course Details</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="flex justify-between">
                        <span>Course:</span>
                        <span>Java & Kotlin Backend Development</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>3 Months</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    Submit Enrollment
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      )}

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Java & Kotlin Backend Development Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of successful developers who have transformed their careers with our comprehensive Java & Kotlin training program.
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
    </div>
  );
};

export default JavaKotlinBackendDetails;