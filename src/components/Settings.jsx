import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        {/* User Info with Dark Mode Toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <User className="w-8 h-8 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold dark:text-gray-100">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>


        
        </div>

        {/* Settings Links */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/settings/profile"
              className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <User className="w-5 h-5" />
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              to="/change-password"
              className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              <Lock className="w-5 h-5" />
              Change Password
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Settings;
