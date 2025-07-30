import { Briefcase, ChevronRight, Info, LogOut, Settings, User, X, HelpCircle, Bookmark, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function Sidebar({ sidebarOpen, setSidebarOpen, handleLogout }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Base nav items
  const navItems = [
    { label: "Saved Jobs", path: "/saved-jobs", icon: Bookmark },
    { label: "Applied Jobs", path: "/applied-jobs", icon: Send },
    { label: "About", path: "/about", icon: Info }
  ];

  // Role-based dashboard nav
  if (user?.role === "employer") {
    navItems.unshift({ label: "Employer Dashboard", path: "/employer-dashboard", icon: Briefcase });
  } else if (user?.role === "admin") {
    navItems.unshift({ label: "Admin Panel", path: "/admin-panel", icon: Briefcase });
  }

  return (
    <>
      {/* Overlay for mobile: closes sidebar on click */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-4/5 max-w-xs bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-2xl border-r border-gray-200
          transform transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:relative lg:top-0 lg:h-screen lg:w-60 lg:translate-x-0 lg:flex lg:flex-col lg:shadow-none
        `}
        style={{ touchAction: 'manipulation', overflowY: 'auto' }}
      >
        <div className="flex flex-col h-full scrollbar-thin scrollbar-thumb-gray-400">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-3 ">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Briefcase className="w-7 h-7 text-indigo-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobSphere</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-7 h-7 text-gray-500" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-lg">
                {getInitials(user.name)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 truncate max-w-[120px]">{user.name}</h3>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map(({ label, path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-xl text-gray-700 transition-colors font-medium text-base
                    ${isActive ? 'bg-indigo-100 text-indigo-700 font-semibold shadow' : 'hover:bg-gray-50'}`}
                  style={{ minHeight: 48 }}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-6 h-6" />
                    <span>{label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              );
            })}
          </div>

          {/* Settings */}
          <div className="mt-8 pt-6 border-t border-gray-200" onClick={() => setSidebarOpen(false)}>
            <Link to="/settings" className={`w-full flex items-center justify-between p-4 rounded-xl text-gray-700 transition-colors font-medium text-base
              ${location.pathname === '/settings' ? 'bg-indigo-100 text-indigo-700 font-semibold shadow' : 'hover:bg-gray-50'}`}
              style={{ minHeight: 48 }}
            >
              <div className="flex items-center gap-4">
                <Settings className="w-6 h-6" />
                <span>Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium text-base"
              style={{ minHeight: 48 }}
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default Sidebar;
