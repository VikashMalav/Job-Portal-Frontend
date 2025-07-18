import React, { useState, useEffect } from "react";
import { Home, Users, Settings, Menu, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";


const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when sidebar is open (mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logout Successfully");
    navigate('/login', { replace: true });
  };

  const location = useLocation();
  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-200 ease-in-out
        fixed md:static md:translate-x-0 md:flex md:flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 text-2xl font-extrabold border-b border-gray-800 tracking-wide flex items-center gap-2">
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors font-medium ${location.pathname === '/admin/dashboard' || location.pathname === '/admin' ? 'bg-gray-800' : ''}`}
          >
            <Home className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link
            to="/admin/users"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors font-medium ${location.pathname === '/admin/users' ? 'bg-gray-800' : ''}`}
          >
            <Users className="w-5 h-5 mr-3" /> Users
          </Link>
          <Link
            to="/admin/settings"
            onClick={() => setIsOpen(false)}
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors font-medium ${location.pathname === '/admin/settings' ? 'bg-gray-800' : ''}`}
          >
            <Settings className="w-5 h-5 mr-3" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
