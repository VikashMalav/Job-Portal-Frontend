import { Briefcase, ChevronRight, Info, LogOut, Settings, User, X, HelpCircle, Bookmark, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen, handleLogout }) {
  const { user } = useSelector((state) => state.auth);

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
    <div
      className={`
        fixed lg:sticky lg:relative top-0 left-0 h-full w-80 lg:w-72 bg-white shadow-2xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:flex lg:flex-col
      `}
    >
      <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-3 ">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobSphere</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-between p-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>

          {/* Settings */}
          <div className="mt-8 pt-6 border-t border-gray-200" onClick={() => setSidebarOpen(false)}>
            <Link to="/settings" className="w-full flex items-center justify-between p-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-200">
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
