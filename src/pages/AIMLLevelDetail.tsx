import React from 'react';
import { useParams } from 'react-router-dom';

const levelDetails: Record<string, { title: string; description: string }> = {
  'level-1': {
    title: 'Level 1: AI Launchpad: Unlocking Intelligence with Python & ML',
    description: 'This level introduces the foundations of AI, Python programming, and basic machine learning concepts. You will learn about data handling, basic algorithms, and practical ML applications.',
  },
  'level-2': {
    title: 'Level 2: AI Accelerator: Mastering Deep Learning and Deployment',
    description: 'Dive deeper into deep learning, neural networks, and model deployment. This level covers advanced ML techniques, frameworks, and real-world deployment strategies.',
  },
  'level-3': {
    title: 'Level 3: AI Architect Academy: The LLM Forge – Building Custom Language Models from Scratch',
    description: 'Focus on building, training, and deploying custom large language models (LLMs). Learn about NLP, transformer architectures, and end-to-end AI project workflows.',
  },
};

const AIMLLevelDetail = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const detail = levelDetails[levelId || 'level-1'];

  if (!detail) return <div className="p-8">Level not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{detail.title}</h1>
      <p className="text-gray-700 mb-6">{detail.description}</p>
      <div className="text-gray-500">(Add more detailed curriculum, outcomes, and project info here.)</div>
    </div>
  );
};

export default AIMLLevelDetail; 