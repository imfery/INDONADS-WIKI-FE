import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}) => {
  const resultsPerPage = 10;
  const start = (currentPage - 1) * resultsPerPage + 1;
  const end = Math.min(currentPage * resultsPerPage, totalResults);

  console.log('currentPage * resultsPerPage = ' + currentPage * resultsPerPage);
  console.log('totalResults = ' + totalResults);
  console.log('start: ' + start + ' end: ' + end);

  return (
    <nav
      className='flex items-center justify-center flex-col pt-4'
      aria-label='Table navigation'
    >
      <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mb-4'>
        <li>
          <button
            onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === i + 1
                  ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() =>
              onPageChange(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
      <span className='text-sm font-normal text-gray-500'>
        {`Showing ${start}-${end} of ${totalResults} results`}
      </span>
    </nav>
  );
};

export default Pagination;
