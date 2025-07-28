import React, { useState, useEffect } from "react";

const EmployeeTestimonials: React.FC = () => {
  const [currentOneLiner, setCurrentOneLiner] = useState(0);
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sandhya",
      role: "HR Manager",
      photo: "/sandhya.jpg",
      text: '"Working here has been incredibly fulfilling. The people-first culture, open communication, and strong team values make every day engaging and meaningful."',
      rating: 4,
    },
    {
      id: 2,
      name: "Nikhil",
      role: "General Manager",
      photo: "/sudhanshu.jpg",
      text: '"Leading such a dynamic and driven team is a privilege. The culture here encourages innovation, accountability, and continuous growth."',
      rating: 5,
    },
    {
      id: 3,
      name: "Anshika",
      role: "Assistant Developer",
      photo: "/anshika.jpg",
      text: '"As an Assistant Developer, I\'ve been given real opportunities to grow my skills and contribute meaningfully. The mentorship and team support make it a great place to learn and thrive."',
      rating: 4,
    },
    {
      id: 4,
      name: "Riya Girotra",
      role: "QA & CRM Specialist",
      photo: "/Riya Girotra.jpg",
      text: '"Working across Quality Assurance and Customer Relationship Management has given me a unique perspective. The team\'s commitment to excellence and user satisfaction makes every task impactful."',
      rating: 4,
    },
    {
      id: 5,
      name: "Divya",
      role: "SDE & Product Lead",
      photo: "/divya.jpg",
      text: '"From building scalable backend systems to leading product strategy, the journey here has been both challenging and rewarding. The culture fosters continuous learning, innovation, and true ownership."',
      rating: 5,
    },
    {
      id: 6,
      name: "Riya Singh",
      role: "Junior Developer",
      photo: "/Riya Singh.jpg",
      text: '"As a Junior Developer, I\'ve had the chance to work on real projects from day one. The guidance from senior team members and the collaborative culture make it the perfect environment to grow."',
      rating: 5,
    },
    {
      id: 7,
      name: "Sadaf",
      role: "Assistant Developer",
      photo: "/sadaf.jpg",
      text: '"Joining as an Assistant Developer has been an amazing experience. The team\'s support and the hands-on learning environment have helped me build confidence and sharpen my skills every day."',
      rating: 4,
    },
    {
      id: 8,
      name: "Anirudh",
      role: "Assistant Developer",
      photo: "/anirudhh.jpg",
      text: '"As an Assistant Developer, I\'ve been exposed to a wide range of technologies and real-world coding practices. It\'s a great place to build a strong foundation and grow with the team."',
      rating: 5,
    },
    {
      id: 9,
      name: "Ronit",
      role: "AI Engineer",
      photo: "/ronit.jpg",
      text: '"Working on AI-driven solutions here has been an exciting journey. The access to advanced tools, real-world datasets, and a collaborative environment keeps me inspired to push the boundaries of what\'s possible."',
      rating: 4,
    },
  ];

  const oneLiners = [
    '"Innovation is not just encouraged here - it\'s expected!"',
    '"Best company culture I\'ve ever experienced."',
    '"They invest in people, not just projects."',
    '"Work feels like play when you love what you do."',
    '"Growth opportunities are endless here."',
    '"Flexible hours, maximum impact."',
    '"Where talent meets opportunity."',
  ];

  const stats = [
    { number: "95%", label: "Employee Satisfaction" },
    { number: "4.8/5", label: "Glassdoor Rating" },
    { number: "92%", label: "Retention Rate" },
    { number: "3+", label: "Years Average Tenure" },
  ];

  const showOneLiner = (index: number) => {
    setCurrentOneLiner(index);
  };

  const nextOneLiner = () => {
    setCurrentOneLiner((prev) => (prev + 1) % oneLiners.length);
  };

  const highlightCard = (id: number) => {
    setHighlightedCard(id);
    setTimeout(() => setHighlightedCard(null), 2000);
  };

  // Auto-rotate one-liners
  useEffect(() => {
    const interval = setInterval(nextOneLiner, 4000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      "from-pink-400 to-red-500",
      "from-blue-400 to-purple-500",
      "from-green-400 to-teal-500",
      "from-yellow-400 to-orange-500",
      "from-indigo-400 to-blue-500",
      "from-purple-400 to-pink-500",
      "from-teal-400 to-green-500",
      "from-orange-400 to-red-500",
      "from-cyan-400 to-blue-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 text-blue-900 dark:text-blue-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-5 py-20">
        {/* Header */}
        <div className="text-center mb-16 opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-900 dark:text-blue-100 drop-shadow-lg">
            What Our Employees Say
          </h1>
          <p className="text-xl md:text-2xl text-blue-900 dark:text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover why our team loves working with us through their authentic
            voices and experiences
        </p>
      </div>

      {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 cursor-pointer relative overflow-hidden group hover:bg-white/15 hover:-translate-y-4 hover:shadow-2xl hover:scale-[1.02] ${
                highlightedCard === testimonial.id
                  ? "scale-105 shadow-2xl bg-white/20"
                  : ""
              }`}
              onClick={() => highlightCard(testimonial.id)}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Photo Section - Large and Prominent */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class=\"w-full h-full bg-gradient-to-br ${getGradientColor(
                            index
                          )} flex items-center justify-center text-3xl font-bold text-blue-900 dark:text-blue-100 shadow-inner\">${getInitials(
                            testimonial.name
                          )}</div>`;
                        }
                      }}
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-white/20 animate-pulse"></div>
        </div>

                {/* Name and Role */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-100 drop-shadow-sm">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-800 dark:text-blue-100 font-medium text-lg">
                    {testimonial.role}
                  </p>
        </div>
                {/* Star Rating */}
                <div className="flex justify-center mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
        </div>
              </div>

              {/* Testimonial Text */}
              <div className="text-center">
                <p className="text-lg leading-relaxed text-blue-900 dark:text-blue-100 italic font-light">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* One Liners Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 mb-10">
          <h2 className="text-4xl font-bold text-center mb-10 text-blue-900 dark:text-blue-100">
            Employee One-Liners
          </h2>

          <div className="relative h-32 overflow-hidden mb-8">
          {oneLiners.map((oneLiner, index) => (
            <div
              key={index}
                className={`absolute w-full text-center text-2xl md:text-3xl font-light transition-all duration-800 ${
                currentOneLiner === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } text-blue-900 dark:text-blue-100`}
            >
              {oneLiner}
            </div>
          ))}
        </div>
        
          <div className="flex justify-center gap-3">
          {oneLiners.map((_, index) => (
              <button
              key={index}
                onClick={() => showOneLiner(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                currentOneLiner === index
                    ? "bg-blue-900 dark:bg-blue-100 scale-125 shadow-lg"
                    : "bg-blue-300 dark:bg-blue-700 hover:bg-blue-400 dark:hover:bg-blue-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 hover:shadow-xl"
            >
              <div className="text-4xl md:text-5xl font-bold mb-3 text-blue-900 dark:text-blue-100">
                {stat.number}
          </div>
              <div className="text-blue-800 dark:text-blue-100 font-medium">
                {stat.label}
        </div>
          </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeTestimonials;
