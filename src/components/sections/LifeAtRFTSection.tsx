import React, { useEffect, useRef, useState } from 'react';

const slides = [
  {
    title: 'Modern Open Office',
    desc: 'Collaborative spaces designed for creativity and innovation with state-of-the-art technology',
    bg: 'bg-gradient-to-br from-blue-400 to-indigo-700',
    emoji: '🏢',
  },
  {
    title: 'Recreation Zone',
    desc: 'Game rooms, relaxation areas, and wellness spaces for work-life balance',
    bg: 'bg-gradient-to-br from-purple-500 to-pink-400',
    emoji: '🎮',
  },
  {
    title: 'Innovation Labs',
    desc: 'Cutting-edge facilities for research, development, and prototype testing',
    bg: 'bg-gradient-to-br from-pink-400 to-blue-300',
    emoji: '💡',
  },
  {
    title: 'Cafeteria & Lounge',
    desc: 'Gourmet dining experiences and comfortable social spaces for team bonding',
    bg: 'bg-gradient-to-br from-cyan-400 to-blue-400',
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="w-full" style={{ scrollBehavior: 'smooth' }}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0f3460] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/5 bottom-0 w-1/3 h-1/3 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute right-1/4 top-0 w-1/4 h-1/4 bg-pink-400/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 text-center text-white py-24 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeInUp">Life At Ruhil Future Technologies (RFT)</h1>
          <p className="text-2xl md:text-3xl mb-8 animate-fadeInUp delay-200">Where Innovation Meets Exceptional Culture</p>
          <a href="#offices" className="inline-block px-8 py-4 bg-white/20 border-2 border-white/30 rounded-full text-white font-semibold text-lg shadow-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-md animate-fadeInUp delay-400">Explore Our World</a>
        </div>
      
      </section>

      {/* Offices Slider Section */}
      <section className="section py-20 max-w-7xl mx-auto" id="offices">
        <h2 className="text-4xl font-bold text-center mb-12">Our Inspiring Workspaces</h2>
        <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden mb-10">
          {slides.map((slide, idx) => (
            <div
              key={slide.title}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} ${slide.bg}`}
              style={{ backgroundBlendMode: 'multiply' }}
            >
              <div className="text-7xl mb-4 drop-shadow-lg">{slide.emoji}</div>
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{slide.title}</h3>
              <p className="text-lg text-white/90 max-w-xl mx-auto drop-shadow">{slide.desc}</p>
            </div>
          ))}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${idx === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/60'}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 text-white">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Culture & Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {culture.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="text-xl font-bold mb-2 text-blue-900">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 relative overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">Projects We're Building</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.title} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-40 flex items-center justify-center text-5xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">{project.icon}</div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 text-blue-900">{project.title}</h3>
                <p className="text-gray-600 mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#0f3460] text-white text-center relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-12">RFT by the Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div key={stat.label} className="p-8">
              <span className="text-5xl font-extrabold block mb-2">{counters[i]}</span>
              <span className="text-lg opacity-90">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-20 section max-w-4xl mx-auto" id="careers">
        <h2 className="text-4xl font-bold text-center mb-8">Join Our Journey</h2>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-lg mb-8 text-gray-700 dark:text-white">
            Ready to be part of something extraordinary? We're always looking for passionate individuals who want to shape the future of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/apply" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">View Open Positions</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtRFTSection;
