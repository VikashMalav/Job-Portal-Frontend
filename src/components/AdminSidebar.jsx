import React, { useState } from "react";
import { Home, Users, Settings, Menu, X, LogOut } from "lucide-react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
   
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

    
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:flex`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Home className="w-5 h-5 mr-2" /> Dashboard
            </a>
            <a
              href="/users"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Users className="w-5 h-5 mr-2" /> Users
            </a>
            <a
              href="/settings"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Settings className="w-5 h-5 mr-2" /> Settings
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center w-full p-2 rounded hover:bg-gray-700">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
