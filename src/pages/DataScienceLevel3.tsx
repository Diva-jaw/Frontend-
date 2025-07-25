import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
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
  Code,
  Code2,
  Brain,
  Cloud,
  Server
} from 'lucide-react';
import EnrollmentModal from '../components/ui/EnrollmentModal';

const DataScienceLevel3 = () => {
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
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-600 font-semibold">Data Science</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                 Big Data & Data Engineering – Hadoop, Hive & PySpark
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Master big data technologies and data engineering principles with Hadoop, Hive, PySpark, 
                and cloud-based solutions for enterprise-scale data processing.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">4 Weeks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">Advanced to Expert</span>
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
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Server className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Duration</span>
                      <span className="text-blue-600 font-semibold">4 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Level</span>
                      <span className="text-blue-600 font-semibold">Advanced to Expert</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Projects</span>
                      <span className="text-blue-600 font-semibold">5 Projects</span>
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
              Master enterprise-level big data technologies and data engineering principles 
              for scalable data processing and analytics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Hadoop Ecosystem",
                topics: [
                  "HDFS architecture and operations",
                  "MapReduce programming model",
                  "YARN resource management",
                  "Hadoop cluster administration",
                  "Performance optimization"
                ],
                icon: Server,
                color: "blue"
              },
              {
                title: "Apache Hive",
                topics: [
                  "HiveQL and data warehousing",
                  "Partitioning and bucketing",
                  "Optimization techniques",
                  "UDF development",
                  "Performance tuning"
                ],
                icon: Database,
                color: "blue"
              },
              {
                title: "Apache Spark & PySpark",
                topics: [
                  "Spark architecture and RDDs",
                  "DataFrames and Spark SQL",
                  "Streaming with Spark Streaming",
                  "MLlib for machine learning",
                  "Performance optimization"
                ],
                icon: Zap,
                color: "blue"
              },
              {
                title: "Big Data Architecture",
                topics: [
                  "Lambda and Kappa architectures",
                  "Data lake design patterns",
                  "ETL/ELT pipeline development",
                  "Real-time processing systems",
                  "Scalable data infrastructure"
                ],
                icon: Cloud,
                color: "green"
              },
              {
                title: "Data Engineering",
                topics: [
                  "Data pipeline orchestration",
                  "Workflow management with Airflow",
                  "Data quality and monitoring",
                  "CI/CD for data pipelines",
                  "Infrastructure as Code"
                ],
                icon: Code2,
                color: "orange"
              },
              {
                title: "Cloud Platforms",
                topics: [
                  "AWS EMR and Glue",
                  "Google Cloud Dataproc",
                  "Azure HDInsight",
                  "Cloud-native data services",
                  "Multi-cloud strategies"
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
              Expert-Level Learning Outcomes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Develop enterprise-level skills in big data processing, data engineering, 
              and cloud-based data solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Big Data Processing",
                description: "Master Hadoop ecosystem and distributed computing for large-scale data processing.",
                icon: Server
              },
              {
                title: "Data Engineering",
                description: "Design and implement scalable data pipelines and ETL/ELT processes.",
                icon: Database
              },
              {
                title: "Cloud Architecture",
                description: "Deploy and manage big data solutions on cloud platforms like AWS, GCP, and Azure.",
                icon: Cloud
              },
              {
                title: "Spark Development",
                description: "Build high-performance data processing applications using Apache Spark and PySpark.",
                icon: Zap
              },
              {
                title: "Data Infrastructure",
                description: "Design and maintain enterprise-grade data infrastructure and monitoring systems.",
                icon: Code2
              },
              {
                title: "Performance Optimization",
                description: "Optimize big data systems for performance, scalability, and cost efficiency.",
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
              Unlock senior-level positions in data engineering and big data processing 
              across enterprise organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Data Engineer",
                salary: "₹12-25 LPA",
                description: "Build and maintain data infrastructure and pipelines"
              },
              {
                title: "Big Data Engineer",
                salary: "₹15-30 LPA",
                description: "Design and implement big data solutions"
              },
              {
                title: "Senior Data Scientist",
                salary: "₹18-35 LPA",
                description: "Lead advanced analytics and ML projects"
              },
              {
                title: "Data Architecture Lead",
                salary: "₹20-40 LPA",
                description: "Design enterprise data architecture"
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
              Enterprise Tools & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master enterprise-level tools and technologies used by big data engineers 
              and data architects.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Hadoop", "Hive", "Spark", "PySpark", "HDFS", "YARN",
              "Airflow", "Kafka", "Zookeeper", "HBase", "Pig", "Sqoop",
              "AWS EMR", "GCP Dataproc", "Azure HDInsight", "Docker", "Kubernetes", "Terraform"
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Master Big Data Engineering?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Become an expert in big data technologies and data engineering 
              with our comprehensive Level 3 program.
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
        courseName="Data Science"
        levelName="Level 3"
      />
    </div>
  );
};

export default DataScienceLevel3; 