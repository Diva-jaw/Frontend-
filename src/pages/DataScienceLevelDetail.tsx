import React from 'react';
import { useParams } from 'react-router-dom';

const levelDetails: Record<string, {}> = {
  'level-1': {},
  'level-2': {},
  'level-3': {},
};

const DataScienceLevelDetail = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const detail = levelDetails[levelId || 'level-1'];

  if (!detail) return <div className="p-8">Level not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Level {levelId?.replace('level-', '')}</h1>
      <p className="text-gray-700 mb-6">Details for this level are not specified.</p>
      <div className="text-gray-500">(Add more detailed curriculum, outcomes, and project info here.)</div>
    </div>
  );
};

export default DataScienceLevelDetail;