import React from "react";
import { LogOut, User } from "lucide-react";

interface UserProfilePopupProps {
  name: string;
  email: string;
  onViewProfile?: () => void;
  onLogout?: () => void;
}

const getInitial = (name: string) => {
  if (!name) return "";
  return name.trim().charAt(0).toUpperCase();
};

const UserProfilePopup: React.FC<UserProfilePopupProps> = ({
  name,
  email,
  onViewProfile,
  onLogout,
}) => {
  return (
    <div className="w-80 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-gray-100">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg mb-4">
        {getInitial(name)}
      </div>
      <div className="text-center mb-6">
        <div className="text-lg font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500 mt-1">{email}</div>
      </div>
      <div className="w-full space-y-3">
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 text-base shadow-md flex items-center justify-center gap-2"
          onClick={onViewProfile}
        >
          <User size={18} />
          View Profile
        </button>
        <button
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 text-base shadow-md flex items-center justify-center gap-2"
          onClick={onLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup; 