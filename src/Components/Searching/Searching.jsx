import React from 'react';

const Searching = ({ setSearchTerm }) => {
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search products..."
                onChange={handleSearch}
                className="border p-2 w-full rounded-lg"
            />
        </div>
    );
};

export default Searching;