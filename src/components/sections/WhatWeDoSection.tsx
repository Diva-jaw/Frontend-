import { useState } from 'react';
import { ChevronDown, ChevronUp, Rocket, Brain, GraduationCap } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface DropdownItemProps {
  title: string;
  icon: React.ReactNode;
  content: {
    description: string;
    features: string[];
  };
  isOpen: boolean;
  onClick: () => void;
}

const DropdownItem = ({ title, icon, content, isOpen, onClick }: DropdownItemProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-xl font-semibold text-black dark:text-white">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="text-blue-500 dark:text-blue-400" /> : <ChevronDown className="text-blue-500 dark:text-blue-400" />}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{content.description}</p>
          <ul className="space-y-2">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const WhatWeDoSection = () => {
  const [openSection, setOpenSection] = useState<string | null>("incubation");
  const { theme } = useTheme();

  const sections = {
    incubation: {
      title: "Incubation Centre",
      icon: <Rocket className="text-blue-500 dark:text-blue-400" size={24} />,
      content: {
        description: "We transform promising startups into successful unicorns through our comprehensive incubation program.",
        features: [
          "State-of-the-art facilities and workspace",
          "Mentorship from industry experts and successful entrepreneurs",
          "Access to funding networks and investor connections",
          "Strategic partnerships with leading tech companies",
          "Regular workshops and networking events",
          "MoUs signed with top universities and research institutions",
          "Legal and intellectual property support",
          "Market research and business development assistance"
        ]
      }
    },
    aiLabs: {
      title: "AI Labs",
      icon: <Brain className="text-blue-500 dark:text-blue-400" size={24} />,
      content: {
        description: "Our cutting-edge AI labs are equipped with the latest technology and staffed by expert researchers.",
        features: [
          "Advanced GPU computing infrastructure",
          "Natural Language Processing research facilities",
          "Computer Vision and Image Processing labs",
          "Robotics and Automation testing environment",
          "Deep Learning and Neural Network development",
          "Big Data Analytics capabilities",
          "Cloud-based AI development platforms",
          "Research collaboration opportunities"
        ]
      }
    },
    training: {
      title: "Trainings",
      icon: <GraduationCap className="text-blue-500 dark:text-blue-400" size={24} />,
      content: {
        description: "Comprehensive training programs designed to create the next generation of AI professionals.",
        features: [
          "Machine Learning and Deep Learning courses",
          "Natural Language Processing workshops",
          "Computer Vision training programs",
          "AI for Business executives",
          "Data Science certification courses",
          "Hands-on project-based learning",
          "Industry-recognized certifications",
          "Placement assistance and career guidance"
        ]
      }
    }
  };

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section id="what-we-do" className="py-20 bg-gray-50 dark:bg-gray-900 pt-32 animate-fadeIn">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">What We Do</h2>
          <div className="w-20 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover our comprehensive range of services and facilities designed to foster innovation and growth.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="animate-slideUp" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            <DropdownItem
              title={sections.incubation.title}
              icon={sections.incubation.icon}
              content={sections.incubation.content}
              isOpen={openSection === "incubation"}
              onClick={() => handleSectionClick("incubation")}
            />
          </div>
          <div className="animate-slideUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
            <DropdownItem
              title={sections.aiLabs.title}
              icon={sections.aiLabs.icon}
              content={sections.aiLabs.content}
              isOpen={openSection === "aiLabs"}
              onClick={() => handleSectionClick("aiLabs")}
            />
          </div>
          <div className="animate-slideUp" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <DropdownItem
              title={sections.training.title}
              icon={sections.training.icon}
              content={sections.training.content}
              isOpen={openSection === "training"}
              onClick={() => handleSectionClick("training")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;