import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PythonFlaskFastAPIDetails = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollData, setEnrollData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const curriculum = [
    {
      title: 'Python Web Development Fundamentals',
      description: 'Learn the basics of Python web development, HTTP protocols, and RESTful API design principles.',
      topics: ['Python Basics', 'HTTP & REST APIs', 'Web Development Concepts', 'Request/Response Handling'],
    },
    {
      title: 'Flask Framework',
      description: 'Master Flask, the lightweight and flexible micro-framework for building web applications and APIs.',
      topics: ['Flask Setup & Configuration', 'Routing & Views', 'Templates & Jinja2', 'Flask Extensions'],
    },
    {
      title: 'FastAPI Framework',
      description: 'Explore FastAPI, the modern, fast web framework for building APIs with automatic documentation.',
      topics: ['FastAPI Setup', 'Pydantic Models', 'Automatic API Documentation', 'Async/Await Support'],
    },
    {
      title: 'Database Integration & Deployment',
      description: 'Connect to databases, handle data persistence, and deploy your Python web applications.',
      topics: ['SQLAlchemy ORM', 'PostgreSQL Integration', 'Docker Deployment', 'Cloud Platforms'],
    },
  ];

  const outcomes = [
    'Build high-performance web applications with Python.',
    'Create RESTful APIs using Flask and FastAPI frameworks.',
    'Integrate databases and handle data persistence efficiently.',
    'Deploy Python web applications to production environments.',
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-white flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4L8 12L16 20L24 12L16 4Z"
                fill="#3776AB"
              />
              <path
                d="M16 12L8 20L16 28L24 20L16 12Z"
                fill="#FFD43B"
              />
            </svg>
            Python Web Development
          </h1>
          <a
            href="https://flask.palletsprojects.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Official Docs
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-200 via-emerald-100 to-white text-green-900 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-pulse">Build Web Applications with Python</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Master web development with Python using Flask and FastAPI frameworks. Create powerful APIs, web applications, and microservices.
            </p>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">What You'll Learn</h2>
            <div className="space-y-4">
              {curriculum.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full text-left p-5 bg-green-50 hover:bg-green-100 transition-colors flex justify-between items-center"
                    onClick={() => toggleSection(index)}
                  >
                    <span className="text-xl font-medium text-green-800">{item.title}</span>
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
                      <p className="text-green-700 mb-3">{item.description}</p>
                      <ul className="list-disc pl-6 text-green-700">
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
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Learning Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-emerald-400 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-800 text-lg">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Opportunities Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Career Opportunities with Python Web Development</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-lg shadow p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">Job Roles</h3>
                <ul className="text-green-700 space-y-1 text-center">
                  <li>Python Web Developer</li>
                  <li>Backend Developer</li>
                  <li>API Developer</li>
                  <li>Full Stack Developer</li>
                  <li>DevOps Engineer</li>
                  <li>Software Engineer</li>
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-lg shadow p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Industries & Companies</h3>
                <ul className="text-emerald-700 space-y-1 text-center">
                  <li>Tech Startups</li>
                  <li>FinTech & Banking</li>
                  <li>E-commerce Platforms</li>
                  <li>Healthcare IT</li>
                  <li>Data Science Companies</li>
                  <li>AI/ML Organizations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Python Web Ecosystem & Tools Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 via-emerald-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-emerald-700 mb-8 text-center">Python Web Ecosystem & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.python.org/static/favicon.ico" alt="Python" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-green-800 mb-1">Python</h3>
                <p className="text-green-700 text-center text-sm">Versatile programming language for web development.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://flask.palletsprojects.com/favicon.ico" alt="Flask" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-green-800 mb-1">Flask</h3>
                <p className="text-green-700 text-center text-sm">Lightweight micro-framework for web applications.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://fastapi.tiangolo.com/favicon.ico" alt="FastAPI" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-emerald-800 mb-1">FastAPI</h3>
                <p className="text-emerald-700 text-center text-sm">Modern, fast web framework for APIs.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.sqlalchemy.org/favicon.ico" alt="SQLAlchemy" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-emerald-800 mb-1">SQLAlchemy</h3>
                <p className="text-emerald-700 text-center text-sm">Python SQL toolkit and ORM.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://www.docker.com/favicon.ico" alt="Docker" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-green-800 mb-1">Docker</h3>
                <p className="text-green-700 text-center text-sm">Containerization for deployment and scaling.</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src="https://cloud.google.com/favicon.ico" alt="Google Cloud" className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-emerald-800 mb-1">Google Cloud</h3>
                <p className="text-emerald-700 text-center text-sm">Cloud platform for hosting Python apps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Framework Comparison Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Flask vs FastAPI Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Flask Framework</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700">Lightweight and flexible</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700">Minimal boilerplate code</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700">Large ecosystem of extensions</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700">Great for small to medium projects</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700">Easy to learn and use</span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-emerald-800 mb-4 text-center">FastAPI Framework</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-700">High performance and speed</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-700">Automatic API documentation</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-700">Built-in data validation</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-700">Async/await support</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-700">Ideal for modern APIs</span>
                  </div>
                </div>
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
                Ready to Start Your Python Web Development Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of successful developers who have transformed their careers with our comprehensive Python Flask & FastAPI training program.
              </p>
              <motion.button
                onClick={() => setShowEnrollModal(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enroll Now
              </motion.button>
            </motion.div>
          </div>
          {/* Enroll Modal */}
          {showEnrollModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                  onClick={() => {
                    setShowEnrollModal(false);
                    setSubmitted(false);
                    setEnrollData({ name: '', email: '', phone: '' });
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
                <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">Enroll in Python Web Development Course</h3>
                {submitted ? (
                  <div className="text-center text-emerald-600 font-semibold py-8">Thank you for enrolling! We will contact you soon.</div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      value={enrollData.name}
                      onChange={(e) => setEnrollData({ ...enrollData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={enrollData.email}
                      onChange={(e) => setEnrollData({ ...enrollData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={enrollData.phone}
                      onChange={(e) => setEnrollData({ ...enrollData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PythonFlaskFastAPIDetails; 