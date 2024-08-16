import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center mt-4">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="p-2 bg-gray-300 rounded-lg">
                Previous
            </button>

            <span>{currentPage} / {totalPages}</span>

            <button onClick={handleNext} disabled={currentPage === totalPages} className="p-2 bg-gray-300 rounded-lg">
                Next
            </button>
        </div>
    );
};

export default Pagination;
