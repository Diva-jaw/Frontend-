import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  Target, 
  BarChart3,
  BookOpen,
  Award,
  Zap,
  ArrowRight,
  Code,
  Code2
} from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const DigitalMarketingLevel2 = () => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 lg:mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-blue-400/20 dark:from-blue-600/10 dark:to-blue-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">Digital Marketing</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                 Advanced Digital Marketing Strategy
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Master advanced digital marketing strategies, automation tools, and data-driven 
                approaches to drive business growth.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">6 Weeks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Intermediate to Advanced</span>
                </div>
              </div>

              <motion.button
                onClick={() => setShowEnrollmentModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Duration</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">6 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Level</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">Intermediate to Advanced</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-200 dark:bg-blue-900/40 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Projects</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">4 Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Curriculum
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced curriculum covers sophisticated digital marketing strategies, 
              automation tools, and data-driven approaches.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced SEO Strategies",
                topics: [
                  "Technical SEO optimization",
                  "Local SEO and Google My Business",
                  "E-commerce SEO",
                  "Voice search optimization",
                  "Core Web Vitals"
                ],
                icon: Target,
                color: "blue"
              },
              {
                title: "Paid Advertising Mastery",
                topics: [
                  "Google Ads advanced features",
                  "Facebook/Instagram advertising",
                  "LinkedIn advertising",
                  "Retargeting strategies",
                  "Ad copy optimization"
                ],
                icon: TrendingUp,
                color: "indigo"
              },
              {
                title: "Marketing Automation",
                topics: [
                  "Email marketing automation",
                  "CRM integration",
                  "Lead nurturing workflows",
                  "Marketing funnel optimization",
                  "A/B testing strategies"
                ],
                icon: Zap,
                color: "purple"
              },
              {
                title: "Content Marketing",
                topics: [
                  "Content strategy development",
                  "SEO content creation",
                  "Video marketing",
                  "Influencer partnerships",
                  "Content distribution"
                ],
                icon: BookOpen,
                color: "green"
              },
              {
                title: "Analytics & Reporting",
                topics: [
                  "Google Analytics 4",
                  "Conversion tracking",
                  "ROI measurement",
                  "Data visualization",
                  "Performance reporting"
                ],
                icon: BarChart3,
                color: "teal"
              },
              {
                title: "Social Media Strategy",
                topics: [
                  "Platform-specific strategies",
                  "Community management",
                  "Social media advertising",
                  "Influencer marketing",
                  "Crisis management"
                ],
                icon: Users,
                color: "orange"
              }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${module.color}-100 dark:bg-${module.color}-900/30 rounded-xl flex items-center justify-center mr-4`}>
                    <module.icon className={`w-6 h-6 text-${module.color}-600 dark:text-${module.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{module.title}</h3>
                </div>
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What You'll Learn
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              By the end of this course, you'll have mastered advanced digital marketing techniques 
              and be ready to drive business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Advanced SEO",
                description: "Master technical SEO and optimization strategies."
              },
              {
                icon: TrendingUp,
                title: "Paid Advertising",
                description: "Run effective paid advertising campaigns."
              },
              {
                icon: Zap,
                title: "Marketing Automation",
                description: "Automate marketing processes and workflows."
              },
              {
                icon: BookOpen,
                title: "Content Strategy",
                description: "Develop comprehensive content marketing strategies."
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description: "Measure and optimize marketing performance."
              },
              {
                icon: Users,
                title: "Social Media",
                description: "Build effective social media strategies."
              }
            ].map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <outcome.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{outcome.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Career Opportunities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced digital marketing skills are in high demand across industries. 
              Here are some exciting career paths you can pursue.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Digital Marketing Manager",
                salary: "₹8-18 LPA",
                description: "Lead digital marketing strategies and teams"
              },
              {
                title: "SEO Specialist",
                salary: "₹6-15 LPA",
                description: "Optimize websites for search engines"
              },
              {
                title: "PPC Specialist",
                salary: "₹7-16 LPA",
                description: "Manage paid advertising campaigns"
              },
              {
                title: "Marketing Automation Specialist",
                salary: "₹8-20 LPA",
                description: "Implement marketing automation solutions"
              }
            ].map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{career.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{career.salary}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{career.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Tools & Technologies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master the advanced tools and technologies used in modern digital marketing.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Google Analytics", icon: "📊" },
              { name: "Google Ads", icon: "💰" },
              { name: "Facebook Ads", icon: "📱" },
              { name: "Mailchimp", icon: "📧" },
              { name: "HubSpot", icon: "🔄" },
              { name: "SEMrush", icon: "🔍" },
              { name: "Ahrefs", icon: "📈" },
              { name: "Canva", icon: "🎨" },
              { name: "Hootsuite", icon: "📢" },
              { name: "Buffer", icon: "⏰" },
              { name: "Zapier", icon: "🔗" },
              { name: "Hotjar", icon: "🔥" }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 text-center shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        courseName="Digital Marketing"
        levelName="Level 2"
      />
    </div>
  );
};

export default DigitalMarketingLevel2; 