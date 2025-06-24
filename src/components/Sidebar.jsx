import { Briefcase, ChevronRight, Info, LogOut, Settings, User, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar({sidebarOpen,setSidebarOpen,handleLogout}) {
   const {user}=useSelector(state=>state.auth)
 
  
  const baseClass = "block px-4 py-2 rounded hover:bg-blue-500 hover:text-white";
  const activeClass = "bg-blue-500 font-semibold text-white";

  const navItems = [
  
    { label: 'My Jobs', path: '/my-jobs', icon: Briefcase },
    { label: 'About', path: '/about', icon: Info },
  ];
  return (
     <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">JobSphere</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* User Profile Section */}
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

          {/* Navigation */}
          <nav className="flex-1 p-6">
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

            {/* Additional Menu Items */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-200">
            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) }
          </div>
        </div>
      </div>

  );
}
