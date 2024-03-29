// Pagination.js
import { useEffect, useState } from "react";

const FrontPagination = ({ currentPage, totalPages, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);
  const pagesToShow = 5;
  const handlePageChange = (page) => {
    onPageChange(page);
    // Add your logic to fetch data or perform other actions based on the new page
  };
  useEffect(() => {
    const calculateVisiblePages = () => {
      const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      const newVisiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
      setVisiblePages(newVisiblePages);
    };

    calculateVisiblePages();
  }, [currentPage, totalPages, pagesToShow]);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex">
      {/* Previous page button */}
      <button
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-2 lg:px-4 py-1 lg:py-2 mx-1 text-gray-700 transition-colors duration-300 transform rounded-md rtl:-scale-x-100 ${
          currentPage === 1
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-blue-500 hover:text-white"
        }`}
        onClick={handlePrevClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Render pagination links */}
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? "bg-blue-500 text-textColor"
              : "text-gray-700 hover:bg-blue-500 hover:text-white bg-white"
          } px-2 lg:px-4 py-1 lg:py-2 mx-[1px] lg:mx-1 transition-colors duration-300 transform rounded-md`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next page button */}
      <button
        className="flex items-center justify-center px-2 lg:px-4 py-1 lg:py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 hover:bg-blue-500 hover:text-white"
        onClick={handleNextClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default FrontPagination;
