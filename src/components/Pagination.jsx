import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const PaginationBar = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange = () => {},
  showFirstLast = true,
  maxVisiblePages = 5 
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 select-none">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* First Page */}
      {showFirstLast && visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            1
          </button>
          {showStartEllipsis && (
            <div className="flex items-center justify-center w-9 h-9">
              <MoreHorizontal size={18} className="text-gray-400" />
            </div>
          )}
        </>
      )}

      {/* Visible Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors font-medium ${
            page === currentPage
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {showFirstLast && visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {showEndEllipsis && (
            <div className="flex items-center justify-center w-9 h-9">
              <MoreHorizontal size={18} className="text-gray-400" />
            </div>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

// Demo component to show the pagination in action
const PaginationDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Pagination Component Demo</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Current Page: <span className="font-semibold text-blue-600">{currentPage}</span> of {totalPages}
          </p>
          
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Pages
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={totalPages}
                onChange={(e) => setTotalPages(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Go to Page
              </label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(Math.min(totalPages, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center py-8 border-t border-gray-200">
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>
    </div>
  );
};

export default PaginationDemo;