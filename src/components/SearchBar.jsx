import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobSearch } from '../features/Job/jobSlice';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { searchList } = useSelector((state) => state.jobs);
  const wrapperRef = useRef(null);

  // Trigger search with debounce
  useEffect(() => {
    if (!query) {
      setShowDropdown(false);
      return;
    }

    const handler = setTimeout(() => {
      dispatch(jobSearch(query));
      setShowDropdown(true);
    }, 500);

    return () => clearTimeout(handler);
  }, [query, dispatch]);

  // Submit handler (optional, if someone presses enter)
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(jobSearch(query));
      setShowDropdown(true);
    }
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex relative">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full py-1.5 pl-4 pr-10 rounded-full text-sm bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query) setShowDropdown(true);
          }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-600 hover:text-indigo-600"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Dropdown with results */}
      {showDropdown && query && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchList.length > 0 ? (
            <ul>
              {searchList.map((item) => (
                <Link
                  to={`/jobs/${item._id}`}
                  key={item._id}
                  onClick={() => {setShowDropdown(false);setQuery('')}}
                >
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800">
                    {item.title}
                    <br />
                    <b className="text-gray-500 text-xs">{item.company?.name}</b>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <ul>
              <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
