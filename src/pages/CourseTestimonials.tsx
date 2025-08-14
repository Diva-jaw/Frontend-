import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Testimonial {
  id: number;
  name: string;
  course: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
  rating: number;
  completionDate: string;
}

const CourseTestimonials: React.FC = () => {
  const [videoStates, setVideoStates] = useState<{ [key: number]: {
    isPlaying: boolean;
    isMuted: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    showControls: boolean;
    playbackRate: number;
    showSettings: boolean;
  } }>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const controlsTimeoutRefs = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});
  const autoPlayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Neha",
      course: "App Development Course",
      videoUrl: "/videos/neha1.mp4",
      thumbnail: "",
      duration: "",
      description: "The app development course completely transformed my career. I went from knowing nothing about coding to building full-stack applications. The hands-on projects and mentorship were incredible!",
      rating: 5,
      completionDate: "March 2024"
    },
    {
      id: 2,
      name: "Sadaf",
      course: "Web Development Course",
      videoUrl: "/videos/sadaf2.mp4",
      
      thumbnail: "",
      duration: "",
      description: "The web development course was challenging but incredibly rewarding. I learned practical skills that I use daily in my job. The instructors were experts in their field.",
      rating: 5,
      completionDate: "February 2024"
    },
    {
      id: 3,
      name: "Likhita",
      course: "Data Science and AI Course",
      videoUrl: "/videos/likhita.mp4",
      thumbnail: "",
      duration: "",
      description: "The data science and AI course was incredibly comprehensive. I learned practical machine learning skills and now work on cutting-edge AI projects. The instructors were experts in their field.",
      rating: 5,
      completionDate: "January 2024"
    },

  ];

  // Course images for the carousel
  const courseImages = [
    '/course/img1.jpeg',
    '/course/img2.jpeg',
    '/course/img3.jpeg',
    '/course/img4.jpeg',
    '/course/img5.jpeg',
    '/course/img6.jpeg',
    '/course/img7.jpeg',
    '/course/img8.jpeg',
    '/course/img9.jpeg'
  ];

  // Auto-play functionality for image carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % courseImages.length);
      }, 4000);
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, courseImages.length]);

  // Pause auto-play on hover
  const handleCarouselMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleCarouselMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions for image carousel
  const goToPrevious = () => {
    setCurrentImageIndex(prev => (prev - 1 + courseImages.length) % courseImages.length);
  };

  const goToNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % courseImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Initialize video state for a testimonial
  const initializeVideoState = (id: number) => {
    if (!videoStates[id]) {
      setVideoStates(prev => ({
        ...prev,
        [id]: {
          isPlaying: false,
          isMuted: false,
          currentTime: 0,
          duration: 0,
          volume: 1,
          showControls: true,
          playbackRate: 1,
          showSettings: false,
        }
      }));
    }
  };

  // Initialize video states for all testimonials
  useEffect(() => {
    testimonials.forEach(testimonial => {
      if (!videoStates[testimonial.id]) {
        initializeVideoState(testimonial.id);
      }
    });
  }, []);

  // Auto-hide controls for a specific video
  useEffect(() => {
    Object.keys(videoStates).forEach(id => {
      const videoId = parseInt(id);
      const state = videoStates[videoId];
      
      if (state.showControls && state.isPlaying) {
        controlsTimeoutRefs.current[videoId] = setTimeout(() => {
          setVideoStates(prev => ({
            ...prev,
            [videoId]: { ...prev[videoId], showControls: false }
          }));
        }, 3000);
      }
    });

    return () => {
      Object.values(controlsTimeoutRefs.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [videoStates]);

  const togglePlay = (videoId: number) => {
    const video = videoRefs.current[videoId];
    if (video) {
      const currentState = videoStates[videoId];
      if (currentState.isPlaying) {
        video.pause();
      } else {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach(id => {
          const otherVideo = videoRefs.current[parseInt(id)];
          if (otherVideo && parseInt(id) !== videoId) {
            otherVideo.pause();
            setVideoStates(prev => ({
              ...prev,
              [parseInt(id)]: { ...prev[parseInt(id)], isPlaying: false }
            }));
          }
        });
        video.play();
      }
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], isPlaying: !currentState.isPlaying }
      }));
    }
  };

  const toggleMute = (videoId: number) => {
    const video = videoRefs.current[videoId];
    if (video) {
      const currentState = videoStates[videoId];
      video.muted = !currentState.isMuted;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], isMuted: !currentState.isMuted }
      }));
    }
  };

  const handleVolumeChange = (videoId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRefs.current[videoId];
    if (video) {
      video.volume = newVolume;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], volume: newVolume }
      }));
    }
  };

  const handleTimeUpdate = (videoId: number, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video && !isNaN(video.currentTime) && !isNaN(video.duration)) {
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { 
          ...prev[videoId], 
          currentTime: video.currentTime,
          duration: video.duration
        }
      }));
    }
  };

  const handleSeek = (videoId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    const video = videoRefs.current[videoId];
    if (video && !isNaN(newTime)) {
      video.currentTime = newTime;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], currentTime: newTime }
      }));
    }
  };

  const skipTime = (videoId: number, seconds: number) => {
    const video = videoRefs.current[videoId];
    if (video && !isNaN(video.currentTime)) {
      video.currentTime += seconds;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], currentTime: video.currentTime }
      }));
    }
  };

  const handlePlaybackRateChange = (videoId: number, rate: number) => {
    const video = videoRefs.current[videoId];
    if (video) {
      video.playbackRate = rate;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { 
          ...prev[videoId], 
          playbackRate: rate,
          showSettings: false
        }
      }));
    }
  };

  const toggleFullscreen = (videoId: number) => {
    const video = videoRefs.current[videoId];
    if (video) {
      try {
        if (!document.fullscreenElement) {
          video.requestFullscreen().catch((err) => {
            console.log('Fullscreen request failed:', err);
            // Fallback: try to make the video container fullscreen
            const videoContainer = video.closest('.relative') as HTMLElement;
            if (videoContainer) {
              videoContainer.style.position = 'fixed';
              videoContainer.style.top = '0';
              videoContainer.style.left = '0';
              videoContainer.style.width = '100vw';
              videoContainer.style.height = '100vh';
              videoContainer.style.zIndex = '9999';
              videoContainer.style.backgroundColor = 'black';
            }
          });
        } else {
          document.exitFullscreen().catch((err) => {
            console.log('Exit fullscreen failed:', err);
          });
        }
      } catch (error) {
        console.log('Fullscreen not supported:', error);
      }
    }
  };

  const handleVideoClick = (videoId: number) => {
    const currentState = videoStates[videoId];
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], showControls: !currentState.showControls }
    }));
    
    if (currentState.showControls && currentState.isPlaying) {
      if (controlsTimeoutRefs.current[videoId]) {
        clearTimeout(controlsTimeoutRefs.current[videoId]);
      }
    }
  };

  // Close settings menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.settings-menu') && !target.closest('.settings-button')) {
        setVideoStates(prev => {
          const newStates = { ...prev };
          Object.keys(newStates).forEach(id => {
            if (newStates[parseInt(id)].showSettings) {
              newStates[parseInt(id)].showSettings = false;
            }
          });
          return newStates;
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const toggleDescription = (testimonialId: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [testimonialId]: !prev[testimonialId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
             {/* Image Carousel Section */}
         <div className="relative pt-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-center mb-6"
           >
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 mt-10">
               Course Success Stories
             </h1>
             <div className="flex justify-center space-x-4 mb-8">
               <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
                 <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                   {testimonials.length}+
                 </span>
                 <span className="text-gray-600 dark:text-gray-300 ml-2">Success Stories</span>
               </div>
               <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
                 <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                   100%
                 </span>
                 <span className="text-gray-600 dark:text-gray-300 ml-2">Satisfaction Rate</span>
               </div>
             </div>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               Take a visual journey through our comprehensive course materials and learning environments
             </p>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="relative max-w-4xl mx-auto"
             onMouseEnter={handleCarouselMouseEnter}
             onMouseLeave={handleCarouselMouseLeave}
           >
             {/* Main Image Container */}
             <div className="relative overflow-hidden rounded-2xl shadow-2xl">
               <motion.img
                 key={currentImageIndex}
                 src={courseImages[currentImageIndex]}
                 alt={`Course Image ${currentImageIndex + 1}`}
                 className="w-full h-72 md:h-96 object-cover"
                 initial={{ opacity: 0, scale: 1.1 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
               />
               
               {/* Overlay gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
               
               {/* Navigation Buttons */}
               <button
                 onClick={goToPrevious}
                 className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 hover:scale-110"
                 aria-label="Previous image"
               >
                 <ChevronLeft size={24} />
               </button>
               
               <button
                 onClick={goToNext}
                 className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 hover:scale-110"
                 aria-label="Next image"
               >
                 <ChevronRight size={24} />
               </button>
               
               {/* Image Counter */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                 {currentImageIndex + 1} / {courseImages.length}
               </div>
             </div>
             
             {/* Thumbnail Navigation */}
             <div className="flex justify-center space-x-2 mt-6">
               {courseImages.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => goToImage(index)}
                   className={`w-3 h-3 rounded-full transition-all duration-200 ${
                     index === currentImageIndex
                       ? 'bg-blue-600 scale-125'
                       : 'bg-gray-300 hover:bg-gray-400'
                   }`}
                   aria-label={`Go to image ${index + 1}`}
                 />
               ))}
             </div>
             
             {/* Auto-play indicator */}
             <div className="flex justify-center mt-4">
               <button
                 onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                   isAutoPlaying
                     ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                     : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                 }`}
               >
                 {isAutoPlaying ? 'Auto-play On' : 'Auto-play Off'}
               </button>
             </div>
           </motion.div>
         </div>
       </div>

       {/* Video Success Stories Section */}
       <div className="relative py-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-center mb-6"
           >
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
               Watch Our Video Success Stories
             </h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               Hear directly from our students about their transformative learning experiences and career breakthroughs
             </p>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="relative max-w-6xl mx-auto"
           >
             {/* Video Statistics */}
             <div className="flex justify-center space-x-8 mb-8">
               <div className="text-center">
                 <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                   {testimonials.length}
                 </div>
                 <div className="text-sm text-gray-600 dark:text-gray-300">
                   Video Testimonials
                 </div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                   100%
                 </div>
                 <div className="text-sm text-gray-600 dark:text-gray-300">
                   Success Rate
                 </div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                   5★
                 </div>
                 <div className="text-sm text-gray-600 dark:text-gray-300">
                   Average Rating
                 </div>
               </div>
             </div>
           </motion.div>
         </div>
       </div>



             {/* Testimonials Grid */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
         >
                     {testimonials.map((testimonial, index) => {
             const videoState = videoStates[testimonial.id] || {};
             const isPlaying = videoState.isPlaying || false;
             const isMuted = videoState.isMuted || false;
             const currentTime = videoState.currentTime || 0;
             const duration = videoState.duration || 0;
             const volume = videoState.volume || 1;
             const showControls = videoState.showControls || false;
             const playbackRate = videoState.playbackRate || 1;
             const showSettings = videoState.showSettings || false;

            return (
                                                           <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 group mx-2 sm:mx-4 transform hover:-translate-y-2 hover:scale-105 border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                                 <div className="relative overflow-hidden rounded-t-xl group-hover:shadow-inner">
                   {/* Video Player */}
                   <div className="relative">
                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                                                                                    <video
                        ref={(el) => { videoRefs.current[testimonial.id] = el; }}
                        className="w-full h-80 sm:h-96 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                        src={testimonial.videoUrl}
                       preload="metadata"
                       playsInline
                       onTimeUpdate={(e) => handleTimeUpdate(testimonial.id, e)}
                                               onLoadedMetadata={(e) => {
                          const video = e.currentTarget;
                          if (video && !isNaN(video.duration)) {
                            setVideoStates(prev => ({
                              ...prev,
                              [testimonial.id]: { 
                                ...prev[testimonial.id], 
                                duration: video.duration 
                              }
                            }));
                          }
                        }}
                       onPlay={() => {
                         setVideoStates(prev => ({
                           ...prev,
                           [testimonial.id]: { ...prev[testimonial.id], isPlaying: true }
                         }));
                       }}
                       onPause={() => {
                         setVideoStates(prev => ({
                           ...prev,
                           [testimonial.id]: { ...prev[testimonial.id], isPlaying: false }
                         }));
                       }}
                       onEnded={() => {
                         setVideoStates(prev => ({
                           ...prev,
                           [testimonial.id]: { ...prev[testimonial.id], isPlaying: false }
                         }));
                       }}
                       onClick={() => handleVideoClick(testimonial.id)}
                       muted={isMuted}
                     />
                    
                                                               {/* Video Controls Overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
                       onMouseEnter={() => {
                         setVideoStates(prev => ({
                           ...prev,
                           [testimonial.id]: { ...prev[testimonial.id], showControls: true }
                         }));
                       }}
                       onMouseLeave={() => {
                         if (isPlaying) {
                           setTimeout(() => {
                             setVideoStates(prev => ({
                               ...prev,
                               [testimonial.id]: { ...prev[testimonial.id], showControls: false }
                             }));
                           }, 2000);
                         }
                       }}
                     >
                                             {/* Top Controls */}
                       <div className="absolute top-2 right-2 flex items-center space-x-2">
                         <button
                           onClick={(e) => {
                             e.stopPropagation();
                             console.log('Settings clicked for video:', testimonial.id);
                             setVideoStates(prev => ({
                               ...prev,
                               [testimonial.id]: { ...prev[testimonial.id], showSettings: !showSettings }
                             }));
                           }}
                           className="settings-button text-white hover:text-blue-400 transition-colors p-1.5 sm:p-2 rounded-full bg-black/70 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                           title="Playback Speed Settings"
                           style={{ zIndex: 1000 }}
                         >
                           <Settings size={16} className="sm:w-[18px] sm:h-[18px]" />
                         </button>
                         <button
                           onClick={(e) => {
                             e.stopPropagation();
                             console.log('Fullscreen clicked for video:', testimonial.id);
                             toggleFullscreen(testimonial.id);
                           }}
                           className="text-white hover:text-blue-400 transition-colors p-1.5 sm:p-2 rounded-full bg-black/70 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                           title="Toggle Fullscreen"
                           style={{ zIndex: 1000 }}
                         >
                           <Maximize2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                         </button>
                       </div>

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => togglePlay(testimonial.id)}
                          className="text-white hover:text-blue-400 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm"
                        >
                          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                        </button>
                      </div>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 space-y-2">
                        {/* Progress Bar */}
                        <div className="relative">
                                                     <input
                             type="range"
                             min="0"
                             max={duration && !isNaN(duration) ? duration : 0}
                             value={currentTime && !isNaN(currentTime) ? currentTime : 0}
                             onChange={(e) => handleSeek(testimonial.id, e)}
                             className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                           />
                        </div>
                        
                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => skipTime(testimonial.id, -10)}
                              className="text-white hover:text-blue-400 transition-colors p-1 rounded-full bg-black/50 hover:bg-black/70"
                            >
                              <SkipBack size={16} />
                            </button>
                            <button
                              onClick={() => togglePlay(testimonial.id)}
                              className="text-white hover:text-blue-400 transition-colors p-1 rounded-full bg-black/50 hover:bg-black/70"
                            >
                              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                            <button
                              onClick={() => skipTime(testimonial.id, 10)}
                              className="text-white hover:text-blue-400 transition-colors p-1 rounded-full bg-black/50 hover:bg-black/70"
                            >
                              <SkipForward size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {/* Volume Control */}
                            <div className="hidden sm:flex items-center space-x-1">
                              <button
                                onClick={() => toggleMute(testimonial.id)}
                                className="text-white hover:text-blue-400 transition-colors"
                              >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => handleVolumeChange(testimonial.id, e)}
                                className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                              />
                            </div>
                            
                            {/* Mobile Volume Button */}
                            <button
                              onClick={() => toggleMute(testimonial.id)}
                              className="sm:hidden text-white hover:text-blue-400 transition-colors p-1 rounded-full bg-black/50 hover:bg-black/70"
                            >
                              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            
                            {/* Time Display */}
                            <span className="text-white text-xs font-mono">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                          </div>
                        </div>
                      </div>

                                                                    {/* Settings Menu */}
                       {showSettings && (
                         <div className="settings-menu absolute top-12 right-2 bg-black/95 rounded-lg p-2 backdrop-blur-sm border border-gray-500 shadow-2xl z-50 min-w-[120px] max-w-[140px] sm:min-w-[130px] sm:max-w-[150px] transform -translate-x-1/2 sm:translate-x-0">
                                                        <div className="text-white text-xs space-y-1">
                               <div className="font-semibold mb-1 text-center border-b border-gray-600 pb-1 text-[9px] sm:text-[10px]">
                                 Speed
                               </div>
                               <div className="grid grid-cols-2 gap-0.5">
                                 {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                   <button
                                     key={rate}
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       console.log('Setting playback rate to:', rate, 'for video:', testimonial.id);
                                       handlePlaybackRateChange(testimonial.id, rate);
                                     }}
                                     className={`px-1 py-0.5 rounded text-center transition-colors text-[9px] sm:text-[10px] ${
                                       playbackRate === rate 
                                         ? 'bg-blue-600 text-white font-semibold' 
                                         : 'hover:bg-white/20 text-gray-200'
                                     }`}
                                     title={`${rate}x speed`}
                                   >
                                     {rate}x
                                   </button>
                                 ))}
                               </div>
                               <div className="text-center text-gray-400 text-[7px] sm:text-[8px] mt-1 pt-1 border-t border-gray-600">
                                 {playbackRate}x
                               </div>
                             </div>
                         </div>
                       )}
                    </div>
                  </div>
                  
                  
                </div>
                
                                 <div className="p-6 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-gray-700 dark:group-hover:to-gray-800 transition-all duration-500">
                   <div className="flex items-start justify-between mb-3">
                     <div>
                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                         {testimonial.name}
                       </h3>
                       <p className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                         {testimonial.course}
                       </p>
                     </div>
                                         <div className="flex items-center space-x-1 group-hover:scale-110 transition-transform duration-300">
                       {renderStars(testimonial.rating)}
                     </div>
                  </div>
                  
                                                                           <div className="mb-4">
                      <p className={`text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 ${
                        expandedDescriptions[testimonial.id] ? '' : 'line-clamp-3'
                      }`}>
                        {testimonial.description}
                      </p>
                      {testimonial.description.length > 120 && (
                        <button
                          onClick={() => toggleDescription(testimonial.id)}
                          className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:text-blue-700 dark:hover:text-blue-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mt-1"
                        >
                          {expandedDescriptions[testimonial.id] ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                    
                   <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                     <span className="group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">Completed: {testimonial.completionDate}</span>
                     <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:scale-105 transition-all duration-300 transform">
                       Success Story
                     </span>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Journey Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Company Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the inspiring story of how our company was built from the ground up. 
              Watch our journey video to see our growth, challenges, and the vision that drives us forward.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Video Container */}
              <div className="relative aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster=""
                  onLoadedData={(e) => {
                    // Generate poster from video frame
                    const video = e.currentTarget;
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      canvas.width = video.videoWidth;
                      canvas.height = video.videoHeight;
                      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                      const posterUrl = canvas.toDataURL('image/jpeg', 0.8);
                      video.poster = posterUrl;
                    }
                  }}
                >
                  <source src="/journey/Journey.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Play Button Overlay (shown when video is paused) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/30">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  From Vision to Reality: Our Story
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  This journey video tells the story of our company's evolution - from a small startup 
                  with big dreams to a leading educational institution. Witness our milestones, 
                  challenges overcome, and the passionate team that makes it all possible.
                </p>
                
                {/* Journey Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Foundation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Building from the ground up</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Growth</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Expanding our reach</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Success</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Leading the industry</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Join thousands of students who have transformed their careers with our courses
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/courses" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block text-center">
                 Explore Courses
               </Link>
                             <Link to="/#contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 inline-block text-center">
                 Contact Us
               </Link>
            </div>
          </motion.div>
        </div>
      </div>

             <style>{`
         .slider::-webkit-slider-thumb {
           appearance: none;
           height: 16px;
           width: 16px;
           border-radius: 50%;
           background: #3b82f6;
           cursor: pointer;
           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
         }
         
         .slider::-moz-range-thumb {
           height: 16px;
           width: 16px;
           border-radius: 50%;
           background: #3b82f6;
           cursor: pointer;
           border: none;
           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
         }
         
         .slider::-webkit-slider-track {
           background: rgba(255,255,255,0.3);
           border-radius: 8px;
           height: 8px;
         }
         
         .slider::-moz-range-track {
           background: rgba(255,255,255,0.3);
           border-radius: 8px;
           height: 8px;
         }
         
         .line-clamp-3 {
           display: -webkit-box;
           -webkit-line-clamp: 3;
           -webkit-box-orient: vertical;
           overflow: hidden;
         }
         
         /* Card hover glow effect */
         .group:hover {
           box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
         }
         
         @media (max-width: 640px) {
           .video-controls {
             padding: 0.5rem;
           }
           
           .control-button {
             padding: 0.5rem;
             font-size: 0.875rem;
           }
         }
       `}</style>
    </div>
  );
};

export default CourseTestimonials;
