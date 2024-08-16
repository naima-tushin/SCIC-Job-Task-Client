import React from 'react';

const Sorting = ({ setSortOption }) => {
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="mb-4">
            <select onChange={handleSortChange} className="border p-2 w-full rounded-lg">
                <option value="">Sort By</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="dateDesc">Newest First</option>
            </select>
        </div>
    );
};

export default Sorting;