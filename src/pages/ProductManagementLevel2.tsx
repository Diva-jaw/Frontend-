import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  Star, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Target, 
  BarChart3,
  BookOpen,
  Award,
  Zap,
  ArrowRight,
  Lightbulb,
  Globe,
  Shield,
  Calendar
} from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const ProductManagementLevel2 = () => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-blue-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Product Management</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
               Strategic Product Leadership and Vision
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Advance your product management skills with strategic leadership, advanced analytics, 
                and organizational impact. Learn to drive product vision and lead high-performing teams.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">3 Months</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Intermediate to Advanced</span>
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
                    <Lightbulb className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-blue-600 font-semibold">3 Months</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-blue-600 font-semibold">Intermediate to Advanced</span>
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
              Master advanced product management concepts including strategic leadership, 
              organizational impact, and high-level decision making.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Product Leadership",
                topics: [
                  "Executive-level product strategy",
                  "Organizational vision and mission alignment",
                  "Stakeholder management at C-level",
                  "Board presentation and communication",
                  "Strategic planning and execution"
                ],
                icon: Target,
                color: "blue"
              },
              {
                title: "Advanced Analytics & Insights",
                topics: [
                  "Predictive analytics and modeling",
                  "Advanced data science for products",
                  "Machine learning applications",
                  "Business intelligence and reporting",
                  "ROI optimization strategies"
                ],
                icon: BarChart3,
                color: "blue"
              },
              {
                title: "Product Portfolio Management",
                topics: [
                  "Multi-product strategy development",
                  "Portfolio optimization and prioritization",
                  "Resource allocation and budgeting",
                  "Cross-product synergies",
                  "Portfolio performance measurement"
                ],
                icon: BookOpen,
                color: "blue"
              },
              {
                title: "Organizational Leadership",
                topics: [
                  "Team building and leadership",
                  "Change management strategies",
                  "Culture development and maintenance",
                  "Conflict resolution and negotiation",
                  "Executive coaching and mentoring"
                ],
                icon: Users,
                color: "blue"
              },
              {
                title: "Market Expansion & Growth",
                topics: [
                  "International market entry strategies",
                  "Global product localization",
                  "Partnership and alliance management",
                  "Merger and acquisition strategies",
                  "Market penetration techniques"
                ],
                icon: Globe,
                color: "blue"
              },
              {
                title: "Risk Management & Governance",
                topics: [
                  "Product risk assessment and mitigation",
                  "Compliance and regulatory requirements",
                  "Crisis management and response",
                  "Governance frameworks and policies",
                  "Security and privacy considerations"
                ],
                icon: Shield,
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
              Develop executive-level skills and strategic thinking capabilities 
              to lead product organizations effectively.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Leadership",
                description: "Develop executive-level strategic thinking and leadership skills to drive organizational success.",
                icon: Target
              },
              {
                title: "Advanced Analytics",
                description: "Master advanced data analytics and predictive modeling for strategic decision making.",
                icon: BarChart3
              },
              {
                title: "Portfolio Management",
                description: "Learn to manage complex product portfolios and optimize resource allocation across multiple products.",
                icon: BookOpen
              },
              {
                title: "Organizational Impact",
                description: "Develop skills to create lasting organizational change and build high-performing teams.",
                icon: Users
              },
              {
                title: "Global Strategy",
                description: "Master international market expansion and global product strategy development.",
                icon: Globe
              },
              {
                title: "Risk & Governance",
                description: "Learn advanced risk management and governance frameworks for complex product organizations.",
                icon: Shield
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
              Advanced Career Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock senior-level positions and executive opportunities in product management 
              across global organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Senior Product Manager",
                salary: "₹25-40 LPA",
                description: "Lead complex products and mentor junior product managers"
              },
              {
                title: "Product Director",
                salary: "₹40-60 LPA",
                description: "Oversee product portfolios and strategic direction"
              },
              {
                title: "VP of Product",
                salary: "₹60-100 LPA",
                description: "Executive leadership of entire product organization"
              },
              {
                title: "Chief Product Officer",
                salary: "₹100+ LPA",
                description: "C-level product strategy and organizational leadership"
              }
            ].map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100"
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
              Advanced Tools & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master enterprise-level tools and advanced technologies used by senior product managers 
              in global organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Tableau", "Power BI", "Looker", "Snowflake", "Databricks", "Python",
              "R", "SQL", "AWS", "Azure", "GCP", "Kubernetes",
              "Docker", "GitLab", "Jenkins", "Splunk", "New Relic", "Datadog"
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
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Lead Product Strategy?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Advance your career to senior leadership positions with our comprehensive 
              strategic product management program.
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
        courseName="Product Management"
        levelName="Level 2"
      />

     
    </div>
  );
};

export default ProductManagementLevel2;