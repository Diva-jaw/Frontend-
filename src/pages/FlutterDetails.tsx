import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Clock, 
  Star, 
  CheckCircle, 
  X,
  Calendar,
  Users,
  Briefcase,
  Zap,
  Globe,
  Code,
  Database,
  Shield,
  GitBranch,
  Cloud,
  Package,
  Layers,
  Palette
} from 'lucide-react';

const FlutterDetails = () => {
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
    console.log('Enrollment form submitted:', formData);
    setSubmitted(true);
    setShowEnrollmentModal(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-indigo-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Flutter Development</span>
        </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Master Flutter Development
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Build beautiful, native mobile applications with Flutter. Master cross-platform development for iOS and Android with a single codebase.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">4 Months</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Beginner to Expert</span>
                </div>
              </div>

              <motion.button
                onClick={() => setShowEnrollmentModal(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-blue-600 font-semibold">4 Months</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-indigo-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-indigo-600 font-semibold">Beginner to Expert</span>
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
              Comprehensive Curriculum
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master Flutter from fundamentals to advanced concepts with hands-on projects and real-world applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Flutter Fundamentals",
                description: "Master the core concepts of Flutter including widgets, state management, and navigation.",
                topics: ["Widgets & Components", "State Management", "Navigation & Routing", "Material Design", "Custom Widgets"],
                icon: Code,
                color: "blue"
              },
              {
                title: "Advanced Flutter",
                description: "Learn advanced Flutter techniques for complex applications and performance optimization.",
                topics: ["Provider & Riverpod", "Custom Animations", "Platform Channels", "Performance Optimization", "Testing"],
                icon: Zap,
                color: "blue"
              },
              {
                title: "UI/UX Design",
                description: "Create beautiful and responsive user interfaces with Flutter's design system.",
                topics: ["Material Design", "Cupertino Design", "Custom Themes", "Responsive Layouts", "Animations"],
                icon: Palette,
                color: "blue"
              },
              {
                title: "Deployment & Publishing",
                description: "Deploy and publish your Flutter applications to app stores and production.",
                topics: ["App Store Deployment", "Google Play Deployment", "CI/CD Pipeline", "App Signing", "Release Management"],
                icon: Cloud,
                color: "blue"
              }
            ].map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 bg-${module.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <module.icon className={`w-6 h-6 text-${module.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{module.title}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
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
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              By the end of this course, you'll be able to build professional mobile applications with Flutter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Build cross-platform mobile applications for iOS and Android",
              "Master Flutter widgets and state management patterns",
              "Create beautiful and responsive user interfaces",
              "Implement advanced features like animations and platform channels",
              "Deploy applications to app stores and production",
              "Work with Flutter ecosystem tools and libraries"
            ].map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{outcome}</p>
                </div>
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
              Career Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Flutter skills open doors to exciting career opportunities in mobile development.
            </p>
          </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Job Roles</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Flutter Developer",
                  "Mobile App Developer",
                  "Cross-Platform Developer",
                  "UI/UX Developer",
                  "Mobile Engineer",
                  "App Developer"
                ].map((role, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">{role}</span>
                  </li>
                ))}
                </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-indigo-600" />
                <h3 className="text-2xl font-bold text-gray-900">Industries</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Technology Startups",
                  "Mobile App Companies",
                  "E-commerce Platforms",
                  "FinTech & Banking",
                  "Healthcare IT",
                  "Entertainment & Gaming"
                ].map((industry, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-indigo-500" />
                    <span className="text-gray-700">{industry}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            </div>
          </div>
        </section>

      {/* Tools & Technologies */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Tools & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the essential tools and technologies in the Flutter ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Flutter SDK",
                description: "Complete Flutter development kit and tools",
                icon: Package,
                color: "blue"
              },
              {
                name: "Dart Language",
                description: "Programming language for Flutter development",
                icon: Code,
                color: "purple"
              },
              {
                name: "Provider/Riverpod",
                description: "State management solutions for Flutter",
                icon: Database,
                color: "indigo"
              },
              {
                name: "Firebase",
                description: "Backend services for Flutter applications",
                icon: Cloud,
                color: "orange"
              },
              {
                name: "Android Studio",
                description: "IDE for Android development and Flutter",
                icon: Shield,
                color: "green"
              },
              {
                name: "Xcode",
                description: "IDE for iOS development and Flutter",
                icon: Package,
                color: "blue"
              }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-${tool.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </motion.div>
            ))}
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
              Ready to Start Your Flutter Development Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of successful developers who have transformed their careers with our comprehensive Flutter training program.
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
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Enroll in Flutter Course</h3>
                <button
                onClick={() => setShowEnrollmentModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
                </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                      required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                      required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                      required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
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
                    placeholder="Any specific questions or requirements?"
                  />
                </div>
                    <button
                      type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                    >
                  Submit Enrollment
                    </button>
                  </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enrollment Submitted!</h3>
                <p className="text-gray-600 mb-6">Thank you for your interest. We'll contact you soon with course details.</p>
                <button
                  onClick={() => setShowEnrollmentModal(false)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
            </div>
          )}
    </div>
  );
};

export default FlutterDetails;