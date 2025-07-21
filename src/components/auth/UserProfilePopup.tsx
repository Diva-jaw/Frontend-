import React from "react";

interface UserProfilePopupProps {
  name: string;
  email: string;
  onViewProfile?: () => void;
}

const getInitial = (name: string) => {
  if (!name) return "";
  return name.trim().charAt(0).toUpperCase();
};

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({
  name,
  email,
  onViewProfile,
}) => {
  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-gray-100">
      <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-white shadow mb-4">
        {getInitial(name)}
      </div>
      <div className="text-center mb-6">
        <div className="text-lg font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500 mt-1">{email}</div>
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-base shadow"
        onClick={onViewProfile}
      >
        View Profile
      </button>
    </div>
  );
};

export default UserProfilePopup; 