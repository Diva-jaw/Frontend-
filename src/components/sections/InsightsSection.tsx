import Header from '../layout/Header';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, X } from 'lucide-react';

const GalleryImages = [
  "/7.jpg", "/2.jpg", "/10.jpg",
  "/WhatsApp Image 2025-06-01 at 14.10.21_8cdcc59d.jpg",
  "/1.jpg", "/11.jpg", "/4.jpg",
  "/8.jpg", "/12.jpg", "/3.jpg", "/9.jpg",
  "/5.jpg", "/6.jpg", "/13.jpg", "/14.jpg",
  "/15.jpg", "/16.jpg", "/17.jpg", "/18.jpg",
  "/19.jpg", "/20.jpg", "/21.jpg", "/22.jpg",
];

const InsightsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openModal = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  const downloadImg = (src: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" as const } },
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 min-h-screen flex flex-col">
      <Header isScrolled={false} />

      <motion.main
        className="flex-grow py-20 pt-32 pb-32 overflow-visible"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 md:px-8">
          {/* Title */}
          <motion.div className="text-center max-w-4xl mx-auto mb-16" variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-normal"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Insights & Gallery
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our journey through innovation, achievements, and the remarkable moments that define Ruhil Future Technologies.
            </motion.p>
          </motion.div>

          {/* Gallery */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {GalleryImages.map((src, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => openModal(src)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(src);
                    }}
                  >
                    <Eye className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    className="p-3 bg-white rounded-full hover:bg-gray-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImg(src);
                    }}
                  >
                    <Download className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.main>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden z-[10000]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                onClick={closeModal}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-4 flex justify-center">
                <img
                  src={modalImg!}
                  alt="Full view"
                  className="max-h-[80vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="flex justify-center gap-4 mt-4 mb-6">
                <motion.button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  onClick={() => downloadImg(modalImg!)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsightsSection;