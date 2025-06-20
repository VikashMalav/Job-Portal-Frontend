import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, LogOut, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import SearchBar from './SearchBar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out successfully!');
    navigate('/login');
  };



  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-sm border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center gap-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-indigo-700"
        >
          <Briefcase className="w-5 h-5" />
          JobSphere
        </NavLink>

        {/* Search Bar - Desktop */}
        <SearchBar />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `font-medium transition hover:text-pink-500 ${isActive ? 'underline underline-offset-4 text-pink-600' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 font-medium text-sm text-gray-700 hover:text-red-500 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-medium hover:text-indigo-700 transition"
            >
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none text-indigo-700"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-4 bg-white border-t border-indigo-100">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full py-2 pl-4 pr-10 rounded-full text-sm bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:text-pink-600"
            >
              <Search size={18} />
            </button>
          </form>

          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium text-gray-700 hover:text-pink-500 ${isActive ? 'underline underline-offset-4 text-pink-600' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-left text-sm font-medium text-red-500 hover:text-red-600"
            >
              <LogOut className="inline-block w-4 h-4 mr-1" />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-indigo-700"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
