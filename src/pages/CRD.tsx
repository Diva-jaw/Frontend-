import React, { useEffect, useState } from 'react';
import { useTheme } from '../components/ThemeContext';

const glimpses = [
  { src: '/crd1.jpg' },
  { src: '/crd2.jpg' },
  { src: '/crd4.jpg' },
  { src: '/crd5.jpg' },
  { src: '/crd6.jpg' },
  { src: '/crd7.jpg' },
  { src: '/crd8.jpg' },
  { src: '/crd9.jpg' },
  { src: '/crd10.jpg' },
  { src: '/crd11.jpg' },
  { src: '/crd12.jpg' },
  { src: '/crd13.jpg' },
  { src: '/crd14.jpg' },
  { src: '/crd15.jpg' },
  { src: '/crd16.jpg' },
  { src: '/crd17.jpg' },
  { src: '/crd18.jpg' },
  { src: '/crd19.jpg' },
  { src: '/crd20.jpg' },
];

const CRDPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    [...cards, ...galleryItems].forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .stat-number {
          animation: float 3s ease-in-out infinite;
        }
        .stat-number:nth-child(2) { animation-delay: 0.5s; }
        .stat-number:nth-child(3) { animation-delay: 1s; }
        .stat-number:nth-child(4) { animation-delay: 1.5s; }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 transition-colors duration-300">
        <div className="container mx-auto p-0 md:p-8">
          <header className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-lg rounded-none md:rounded-2xl p-8 md:p-12 mb-8 text-center shadow-2xl md:mt-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-serif tracking-wider drop-shadow-lg text-blue-900 dark:text-blue-100">
              CRD Artificial Intelligence Program
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Hands-on Experience in AI for Industrial Readiness
            </p>
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                CRD
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">+</div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                Ruhil Future Technologies
              </div>
            </div>
            <div className="mt-6 text-xl font-bold text-blue-800 dark:text-blue-200">
              Ruhil Future Technologies are providing AI Course
            </div>
          </header>
          <section className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Empowering the Next Generation of AI Professionals
            </h2>
            <p className="max-w-4xl mx-auto text-gray-600 mb-8">
              Our comprehensive AI program combines academic excellence with industry expertise, providing students with cutting-edge knowledge and practical skills in Machine Learning, AI Agent development, and real-world project implementation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat">
                <div className="stat-number text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">200+</div>
                <div className="stat-label text-gray-500 mt-2">Students Enrolled</div>
              </div>
              <div className="stat">
                <div className="stat-number text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">25+</div>
                <div className="stat-label text-gray-500 mt-2">AI Projects</div>
              </div>
              <div className="stat">
                <div className="stat-number text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">8+</div>
                <div className="stat-label text-gray-500 mt-2">Industry Experts</div>
              </div>
              <div className="stat">
                <div className="stat-number text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">10</div>
                <div className="stat-label text-gray-500 mt-2">Weeks Program</div>
              </div>
            </div>
          </section>

          <main className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="icon w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md">🤖</span>
                Machine Learning Mastery
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Supervised and Unsupervised Learning</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Deep Learning with Neural Networks</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Computer Vision and NLP</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Model Optimization and Deployment</li>
              </ul>
            </div>
            <div className="card bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="icon w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md">🧠</span>
                AI Agent Development
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Intelligent Agent Architecture</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Reinforcement Learning</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Multi-agent Systems & Conversational AI</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Autonomous Decision Making</li>
              </ul>
            </div>
            <div className="card bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="icon w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md">💼</span>
                Industry-Ready Projects
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>End-to-end AI Solutions</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Business Problem Solving & API Development</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Cloud Deployment Strategies</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Portfolio Development</li>
              </ul>
            </div>
            <div className="card bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-transform hover:-translate-y-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="icon w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md">🎓</span>
                Academic Excellence
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>CRD Faculty Collaboration</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Research-oriented Approach</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Peer Learning & Regular Assessments</li>
                <li className="flex items-center gap-3"><span className="text-green-500 font-bold">✓</span>Certification upon Completion</li>
              </ul>
            </div>
          </main>

          <section className="highlight-section bg-white/95 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Program Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="gallery-item">
                <div className="gallery-icon w-16 h-16 text-3xl flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mx-auto mb-4">🎯</div>
                <h3 className="font-bold text-lg mb-2">Practical Learning</h3>
                <p className="text-gray-600">Hands-on coding sessions with real-world applications</p>
              </div>
              <div className="gallery-item">
                <div className="gallery-icon w-16 h-16 text-3xl flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mx-auto mb-4">👥</div>
                <h3 className="font-bold text-lg mb-2">Expert Mentorship</h3>
                <p className="text-gray-600">Industry professionals and academic experts as mentors</p>
              </div>
              <div className="gallery-item">
                <div className="gallery-icon w-16 h-16 text-3xl flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mx-auto mb-4">🏆</div>
                <h3 className="font-bold text-lg mb-2">Project Showcase</h3>
                <p className="text-gray-600">Present your AI projects to industry leaders</p>
              </div>
              <div className="gallery-item">
                <div className="gallery-icon w-16 h-16 text-3xl flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl mx-auto mb-4">🌐</div>
                <h3 className="font-bold text-lg mb-2">Industry Connections</h3>
                <p className="text-gray-600">Network with professionals and potential employers</p>
              </div>
            </div>
          </section>

          <section className="gallery-section bg-white/95 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Glimpses of the Program</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {glimpses.map((img, index) => (
                <div
                  key={index}
                  className="gallery-item group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setModalImg(img.src);
                    setModalOpen(true);
                  }}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
            {modalOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeInUp"
                onClick={() => setModalOpen(false)}
              >
                <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                  <button
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 font-bold"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <img src={modalImg!} alt="" className="max-h-[70vh] w-auto rounded-lg mb-4" />
                </div>
              </div>
            )}
          </section>

          <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-2xl mt-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Shape the Future with AI?</h2>
            <p className="mb-6">Join our comprehensive AI program and transform your career with cutting-edge skills and industry-relevant projects. Limited seats available!</p>
            <button
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105"
              onClick={() => alert('Contact: Ruhil Future Technologies for enrollment details')}
            >
              Enroll Now
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CRDPage; 