import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Target, 
  BookOpen,
  Award,
  Zap,
  ArrowRight,
  Code,
  Code2,
  Database,
  Cpu,
  Megaphone,
  Globe,
  Smartphone,
  Search,
  Building
} from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const DigitalMarketingLevel3 = () => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 lg:mt-16">
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
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Digital Marketing</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                 Strategic Marketing Leadership
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master strategic marketing leadership, advanced analytics, and enterprise-level 
                marketing strategies to drive business growth and ROI.
              </p>

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

              <motion.button
                onClick={() => setShowEnrollmentModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-blue-600 font-semibold">6 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-indigo-600 font-semibold">Advanced to Expert</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Projects</span>
                      <span className="text-purple-600 font-semibold">4 Projects</span>
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
              Expert-Level Curriculum
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive curriculum covers strategic marketing leadership, advanced analytics, 
              and enterprise-level marketing strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Marketing Leadership",
                topics: [
                  "Marketing strategy development",
                  "Brand positioning and management",
                  "Market analysis and insights",
                  "Competitive intelligence",
                  "Marketing budget planning"
                ],
                icon: Building,
                color: "blue"
              },
              {
                title: "Advanced Analytics & Attribution",
                topics: [
                  "Multi-touch attribution modeling",
                  "Customer lifetime value analysis",
                  "Predictive analytics",
                  "Marketing mix modeling",
                  "ROI optimization strategies"
                ],
                icon: BarChart3,
                color: "indigo"
              },
              {
                title: "Enterprise Marketing Technology",
                topics: [
                  "Marketing technology stack design",
                  "CRM and marketing automation",
                  "Data management platforms",
                  "Customer data platforms",
                  "Marketing operations optimization"
                ],
                icon: Code,
                color: "purple"
              },
              {
                title: "Digital Transformation",
                topics: [
                  "Digital transformation strategies",
                  "Omnichannel marketing",
                  "Customer experience design",
                  "Digital innovation",
                  "Change management"
                ],
                icon: Globe,
                color: "green"
              },
              {
                title: "Growth Marketing",
                topics: [
                  "Growth hacking methodologies",
                  "Viral marketing strategies",
                  "Product-led growth",
                  "Scaling marketing operations",
                  "Growth team management"
                ],
                icon: TrendingUp,
                color: "orange"
              },
              {
                title: "Marketing Leadership",
                topics: [
                  "Team leadership and management",
                  "Stakeholder communication",
                  "Marketing performance metrics",
                  "Strategic planning",
                  "Executive presentation skills"
                ],
                icon: Award,
                color: "red"
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
                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What You'll Learn
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              By the end of this course, you'll have mastered strategic marketing leadership 
              and enterprise-level marketing strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Leadership",
                description: "Lead marketing teams and develop comprehensive marketing strategies.",
                icon: Building
              },
              {
                title: "Advanced Analytics",
                description: "Use advanced analytics to drive marketing decisions and optimize ROI.",
                icon: BarChart3
              },
              {
                title: "Marketing Technology",
                description: "Design and implement enterprise marketing technology stacks.",
                icon: Code
              },
              {
                title: "Digital Transformation",
                description: "Lead digital transformation initiatives and omnichannel strategies.",
                icon: Globe
              },
              {
                title: "Growth Marketing",
                description: "Implement growth hacking and scaling strategies for rapid growth.",
                icon: TrendingUp
              },
              {
                title: "Executive Leadership",
                description: "Develop executive-level marketing leadership and communication skills.",
                icon: Award
              }
            ].map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <outcome.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{outcome.title}</h3>
                <p className="text-gray-600">{outcome.description}</p>
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
              Senior Career Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock senior-level positions in strategic marketing leadership 
              across enterprise organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Marketing Director",
                salary: "₹15-30 LPA",
                description: "Lead marketing teams and develop strategic initiatives"
              },
              {
                title: "Digital Marketing Manager",
                salary: "₹12-25 LPA",
                description: "Manage digital marketing strategies and campaigns"
              },
              {
                title: "Growth Marketing Manager",
                salary: "₹14-28 LPA",
                description: "Implement growth strategies and scaling initiatives"
              },
              {
                title: "Marketing Strategy Consultant",
                salary: "₹18-35 LPA",
                description: "Provide strategic marketing consulting services"
              }
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-blue-600 font-semibold mb-3">{role.salary}</p>
                <p className="text-gray-600 text-sm">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Enterprise Tools & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master enterprise-level tools and technologies used by marketing leaders 
              and strategic marketing professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Salesforce", "HubSpot", "Marketo", "Pardot", "Adobe Experience Cloud", "Google Analytics 360",
              "Tableau", "Power BI", "Looker", "Mixpanel", "Amplitude", "Segment",
              "Optimizely", "VWO", "Hotjar", "FullStory", "Gainsight", "Intercom"
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-gray-700 font-medium text-sm">{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Lead Strategic Marketing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Become a strategic marketing leader with our comprehensive 
              Level 3 program.
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
        courseName="Digital Marketing"
        levelName="Level 3"
      />
    </div>
  );
};

export default DigitalMarketingLevel3; 