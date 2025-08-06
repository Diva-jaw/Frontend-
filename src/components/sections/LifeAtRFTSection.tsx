import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, ChevronRight, Star, Users, Zap, Heart, Coffee, Award, Globe } from 'lucide-react';

// Background images for rotation - Different workspace types
const backgroundImages = [
  '/pexels-googledeepmind-17485657.jpg', // Modern office space
  '/pexels-rahulp9800-1933900.jpg', // Collaborative workspace
  '/pexels-tara-winstead-8386440.jpg', // Innovation lab
  '/pexels-pavel-danilyuk-8438918.jpg', // Tech environment
];

// Workspace images
const workspaceImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=800&h=600&fit=crop&crop=center',
];

const workspaces = [
  {
    id: 1,
    title: 'Open Collaboration',
    subtitle: 'Where ideas flourish',
    description: 'Spacious open areas designed for seamless team collaboration and creative brainstorming sessions.',
    image: workspaceImages[0],
  },
  {
    id: 2,
    title: 'Innovation Labs',
    subtitle: 'Future is built here',
    description: 'State-of-the-art research facilities equipped with cutting-edge technology for breakthrough innovations.',
    image: workspaceImages[1],
  },
  {
    id: 3,
    title: 'Wellness Spaces',
    subtitle: 'Balance & harmony',
    description: 'Dedicated areas for relaxation, meditation, and maintaining work-life balance.',
    image: workspaceImages[2],
  },
  {
    id: 4,
    title: 'Social Hubs',
    subtitle: 'Connect & unwind',
    description: 'Comfortable lounges and cafes where teams bond and create lasting professional relationships.',
    image: workspaceImages[3],
  },
];

const perks = [
  {
    icon: <Coffee className="w-6 h-6" />,
    title: 'Premium Amenities',
    description: 'Free gourmet coffee, healthy meals, and snacks available throughout the day.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Latest Technology',
    description: 'Top-tier equipment, high-speed internet, and access to cutting-edge development tools.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Health & Wellness',
    description: 'On-site gym, meditation rooms, and comprehensive health insurance coverage.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Remote Flexibility',
    description: 'Work from anywhere with our hybrid model supporting work-life balance.',
  },
];

const values = [
  {
    icon: <Star className="w-8 h-8" />,
    title: 'Excellence',
    description: 'We strive for perfection in every project, pushing boundaries and setting new industry standards.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Collaboration',
    description: 'Teamwork drives our success. We believe diverse perspectives create breakthrough solutions.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Innovation',
    description: 'We embrace change, experiment with new technologies, and foster creative problem-solving.',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Growth',
    description: 'Continuous learning and development opportunities help our team members reach their full potential.',
  },
];

const stats = [
  { number: '500+', label: 'Team Members', description: 'Talented professionals' },
  { number: '150+', label: 'Projects', description: 'Successfully delivered' },
  { number: '25+', label: 'Countries', description: 'Global presence' },
  { number: '99%', label: 'Satisfaction', description: 'Client happiness rate' },
];

const LifeAtRFTSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeWorkspace, setActiveWorkspace] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const bgIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Background image rotation effect
  useEffect(() => {
    bgIntervalRef.current = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % backgroundImages.length);
    }, 3000); // Change background every 3 seconds

    return () => {
      if (bgIntervalRef.current) clearInterval(bgIntervalRef.current);
    };
  }, []);

  // Auto-rotate workspaces
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkspace((prev) => (prev + 1) % workspaces.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate counters
  useEffect(() => {
    const targets = [500, 150, 25, 99];
    const duration = 2000;
    const steps = 60;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      
      if (progress >= 1) {
        setCounters(targets);
        clearInterval(timer);
      } else {
        setCounters(targets.map(target => Math.floor(target * progress)));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image Rotation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Rotation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgroundImages[currentBgImage]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </AnimatePresence>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-indigo-900/60 to-blue-900/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-50"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">
              Life at{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Ruhil Future Technologies
              </span>
            </h1>
                         <p className="text-xl md:text-2xl text-black-600 mb-8 max-w-3xl mx-auto font-bold">
               Join a team where innovation thrives, careers flourish, and every day brings new opportunities to make an impact.
             </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/insights')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
              >
                Explore Our Team
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workspaces Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Workspaces</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every space is thoughtfully designed to inspire creativity and foster collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Display */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeWorkspace}
                    src={workspaces[activeWorkspace].image}
                    alt={workspaces[activeWorkspace].title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex gap-2">
                  {workspaces.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveWorkspace(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === activeWorkspace ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWorkspace}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-blue-600 font-medium text-lg">
                    {workspaces[activeWorkspace].subtitle}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {workspaces[activeWorkspace].title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {workspaces[activeWorkspace].description}
                  </p>
                </motion.div>
          </AnimatePresence>

              {/* Navigation */}
              <div className="space-y-3">
                {workspaces.map((workspace, index) => (
                  <button
                    key={workspace.id}
                    onClick={() => setActiveWorkspace(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between ${
                      index === activeWorkspace
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <span className={`font-medium ${index === activeWorkspace ? 'text-blue-700' : 'text-gray-700'}`}>
                      {workspace.title}
                    </span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      index === activeWorkspace ? 'text-blue-600 rotate-90' : 'text-gray-400'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
              </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why You'll Love Working Here
            </h2>
            <p className="text-xl text-gray-600">
              We believe in taking care of our team with exceptional benefits and perks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{perk.description}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100"
              >
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
                  ))}
                </div>
              </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">RFT by Numbers</h2>
            <p className="text-xl text-blue-100">Our growth story speaks for itself</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {index < 2 ? `${counters[index]}+` : index === 2 ? `${counters[index]}+` : `${counters[index]}%`}
                </div>
                <div className="text-lg font-semibold text-blue-100 mb-1">{stat.label}</div>
                <div className="text-sm text-blue-200">{stat.description}</div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our team of innovators and help us build the future. Your next great opportunity awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            View Open Positions
              </motion.button>
              
             
            </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtRFTSection;