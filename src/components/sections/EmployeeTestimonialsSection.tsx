import React, { useState, useEffect } from 'react';

const EmployeeTestimonialsSection: React.FC = () => {
  const [currentOneLiner, setCurrentOneLiner] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Riya Singh',
      role: 'Product Manager',
      photo: '/Riya Singh.jpg',
      text: '"The work-life balance here is exceptional. Management truly cares about employee wellbeing and provides the flexibility we need to thrive."'
    },
    {
      id: 2,
      name: 'Riya Girotra',
      role: 'UX Designer',
      photo: '/Riya Girotra.jpg',
      text: '"I\'ve never felt more supported in my professional growth. The mentorship programs and learning opportunities are outstanding."'
    },
    {
      id: 3,
      name: 'Anshika',
      role: 'Marketing Specialist',
      photo: '/anshika.jpg',
      text: '"The diversity and inclusion initiatives here aren\'t just talk - they\'re lived values that make everyone feel valued and heard."'
    }
  ];

  const oneLiners = [
    '"Innovation is not just encouraged here - it\'s expected!"',
    '"Best company culture I\'ve ever experienced."',
    '"They invest in people, not just projects."',
    '"Work feels like play when you love what you do."',
    '"Growth opportunities are endless here."'
  ];

  const nextOneLiner = () => {
    setCurrentOneLiner((prev) => (prev + 1) % oneLiners.length);
  };

  // Auto-rotate one-liners
  useEffect(() => {
    const interval = setInterval(nextOneLiner, 4000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      'from-blue-400 to-purple-500',
      'from-indigo-400 to-blue-500',
      'from-cyan-400 to-blue-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 text-white rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">What Our Employees Say</h2>
        <p className="text-blue-100 text-lg">
          Discover why our team loves working with us
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Photo Section */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/30 shadow-lg mb-3">
                <img 
                  src={testimonial.photo} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${getGradientColor(index)} flex items-center justify-center text-xl font-bold text-white">${getInitials(testimonial.name)}</div>`;
                    }
                  }}
                />
              </div>
              
              {/* Name and Role */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                <p className="text-white/80 text-sm">{testimonial.role}</p>
              </div>
            </div>
            
            {/* Testimonial Text */}
            <div className="text-center">
              <p className="text-sm leading-relaxed text-white/95 italic">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* One Liners Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-bold text-center mb-4">Employee One-Liners</h3>
        
        <div className="relative h-16 overflow-hidden mb-4">
          {oneLiners.map((oneLiner, index) => (
            <div
              key={index}
              className={`absolute w-full text-center text-lg font-light transition-all duration-500 ${
                currentOneLiner === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {oneLiner}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-2">
          {oneLiners.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentOneLiner === index
                  ? 'bg-white scale-125'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
          <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            95%
          </div>
          <div className="text-white/90 text-sm">Employee Satisfaction</div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
          <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            4.8/5
          </div>
          <div className="text-white/90 text-sm">Glassdoor Rating</div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-6">
        <a
          href="/employee-says"
          className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
        >
          View All Testimonials
        </a>
      </div>
    </div>
  );
};

export default EmployeeTestimonialsSection; 