import React, { useState } from 'react';
import {
  Briefcase,
  Menu,
  X,
  LogOut,
  Search,
  User,
  Info,
  Settings,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import SearchBar from './SearchBar';
import Sidebar from './SideBar';


// Mock components for demo
// const Link = ({ to, children, className, onClick }) => (
//   <a href={to} className={className} onClick={(e) => { e.preventDefault(); onClick && onClick(); }}>
//     {children}
//   </a>
// );

// const SearchBar = () => (
//   <div className="relative w-full max-w-md">
//     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//     <input
//       type="text"
//       placeholder="Search jobs..."
//       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//     />
//   </div>
// );

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())

  };



  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left Section - Logo and Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="hidden sm:block">JobSphere</span>
              </Link>
            </div>

            {/* Center Section - Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Right Section - Desktop Nav & User Menu */}
            <div className="flex items-center gap-4">



              {/* User Actions */}
              <div className="flex items-center gap-2">

                {/* Search Button (Mobile) */}
                <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Search className="w-5 h-5 text-gray-600" onClick={() => setShowSearchBar((prev) => !prev)} />
                </button>

                {user && (
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:block">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearchBar === true && <div className="md:hidden pb-4">
            <SearchBar />
          </div>}
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />


    </>
  );
};

export default Header;