import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Modern Open Office',
    desc: 'Collaborative spaces designed for creativity and innovation with state-of-the-art technology',
    bg: 'bg-gradient-to-br from-blue-500 to-indigo-800',
    emoji: '🏢',
  },
  {
    title: 'Recreation Zone',
    desc: 'Game rooms, relaxation areas, and wellness spaces for work-life balance',
    bg: 'bg-gradient-to-br from-purple-600 to-pink-500',
    emoji: '🎮',
  },
  {
    title: 'Innovation Labs',
    desc: 'Cutting-edge facilities for research, development, and prototype testing',
    bg: 'bg-gradient-to-br from-pink-500 to-blue-400',
    emoji: '💡',
  },
  {
    title: 'Cafeteria & Lounge',
    desc: 'Gourmet dining experiences and comfortable social spaces for team bonding',
    bg: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    emoji: '☕',
  },
];

const features = [
  {
    icon: '🏢',
    title: 'Premium Infrastructure',
    desc: 'World-class facilities with ergonomic furniture, high-speed internet, and advanced climate control systems.',
  },
  {
    icon: '☕',
    title: 'Unlimited Refreshments',
    desc: 'Complimentary gourmet coffee, healthy snacks, and catered meals to keep you energized throughout the day.',
  },
  {
    icon: '🎮',
    title: 'Recreation Facilities',
    desc: 'Gaming zones, fitness center, meditation rooms, and outdoor terraces for relaxation and team building.',
  },
];

const culture = [
  { emoji: '🚀', title: 'Innovation First', desc: 'We encourage creative thinking and provide the freedom to experiment with cutting-edge technologies.' },
  { emoji: '🤝', title: 'Collaborative Spirit', desc: 'Cross-functional teams working together to achieve extraordinary results through shared knowledge.' },
  { emoji: '📈', title: 'Continuous Growth', desc: 'Professional development programs, skill enhancement workshops, and mentorship opportunities.' },
  { emoji: '🌍', title: 'Global Impact', desc: 'Working on projects that make a difference in communities worldwide through technology solutions.' },
  { emoji: '⚡', title: 'Work-Life Balance', desc: 'Flexible working hours, remote work options, and comprehensive wellness programs for our team.' },
  { emoji: '🎯', title: 'Results Driven', desc: 'Performance-based recognition, competitive compensation, and opportunities for rapid career advancement.' },
];

const projects = [
  {
    icon: '🤖',
    title: 'AI-Powered Solutions',
    desc: 'Developing next-generation artificial intelligence platforms for healthcare, finance, and automation industries.',
    tags: ['Machine Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
  },
  {
    icon: '🌐',
    title: 'Cloud Infrastructure',
    desc: 'Building scalable, secure cloud platforms that handle millions of users with 99.99% uptime reliability.',
    tags: ['AWS', 'Kubernetes', 'Microservices', 'DevOps'],
  },
  {
    icon: '📱',
    title: 'Mobile Innovation',
    desc: 'Creating revolutionary mobile applications with augmented reality, IoT integration, and seamless user experiences.',
    tags: ['React Native', 'Flutter', 'AR/VR', 'IoT'],
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity Suite',
    desc: 'Advanced security solutions protecting enterprises from emerging threats with real-time monitoring and AI-driven detection.',
    tags: ['Threat Detection', 'Blockchain', 'Encryption', 'Zero Trust'],
  },
  {
    icon: '📊',
    title: 'Data Analytics Platform',
    desc: 'Real-time business intelligence solutions that transform raw data into actionable insights for Fortune 500 companies.',
    tags: ['Big Data', 'Apache Spark', 'Data Mining', 'Visualization'],
  },
  {
    icon: '🏥',
    title: 'HealthTech Solutions',
    desc: 'Revolutionary healthcare management systems improving patient outcomes through digital transformation and telemedicine.',
    tags: ['Telemedicine', 'HIPAA Compliant', 'Electronic Health Records', 'Medical AI'],
  },
];

const stats = [
  { label: 'Talented Employees', value: 500 },
  { label: 'Projects Delivered', value: 150 },
  { label: 'Countries Served', value: 25 },
  { label: '% Client Satisfaction', value: 99 },
];

const LifeAtRFTSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 2000;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCounters(stats.map((stat) => Math.floor(progress * stat.value)));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setCounters(stats.map((stat) => stat.value));
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full font-sans" style={{ scrollBehavior: 'smooth' }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-50"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 py-24"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-2xl">
            Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">RFT</span>
          </h1>
          <p className="text-xl md:text-3xl mb-8 font-light tracking-wide animate-pulse">Where Innovation Fuels Your Future</p>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
            className="inline-block"
          >
            <Link
              to="/insights"
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
                transform: "none"
              }}
            >
              Discover Our World
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Offices Slider Section */}
      <section className="py-24 max-w-7xl mx-auto px-4" id="offices">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
        >
          Inspiring Workspaces
        </motion.h2>
        <motion.div
          className="relative h-[500px] rounded-3xl shadow-2xl overflow-hidden mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {slides.map((slide, idx) => (
              idx === currentSlide && (
                <motion.div
                  key={slide.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center ${slide.bg} bg-blend-multiply`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                    className="text-8xl mb-6 drop-shadow-2xl"
                  >
                    {slide.emoji}
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-lg text-white/90 max-w-md mx-auto px-4"
                  >
                    {slide.desc}
                  </motion.p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                  idx === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-gray-200 hover:border-blue-300 transition-colors duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
        >
          Our Culture & Values
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {culture.map((item) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-gray-200 hover:border-purple-300 transition-colors duration-300"
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white drop-shadow-lg"
        >
          Projects We're Building
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors duration-300"
            >
              <div className="h-40 flex items-center justify-center text-6xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                {project.icon}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white text-center relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16"
        >
          RFT by the Numbers
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              <span className="text-5xl font-extrabold block mb-2">{counters[i]}</span>
              <span className="text-lg opacity-90">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Careers CTA */}
      <section className="py-24 max-w-4xl mx-auto px-4" id="careers">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"
        >
          Join Our Journey
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-lg mb-8 text-gray-600">
            Ready to shape the future of technology? Join our passionate team and make an impact.
          </p>
          <motion.a
            href="/apply"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            View Open Positions
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default LifeAtRFTSection;