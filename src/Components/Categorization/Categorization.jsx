import React from 'react';

const Categorization = () => {
    const [selectedCategory, setSelectedCategory] = React.useState({
        brand: '',
        category: '',
        priceRange: ''
    });

    const handleCategoryChange = (e) => {
        setSelectedCategory({
            ...selectedCategory,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select name="brand" value={selectedCategory.brand || ''} onChange={handleCategoryChange}>
                    <option value="">All Brands</option>
                    <option value="Brand A">Brand A</option>
                    <option value="Brand B">Brand B</option>
                </select>

                <select name="category" value={selectedCategory.category || ''} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                </select>

                <select name="priceRange" value={selectedCategory.priceRange || ''} onChange={handleCategoryChange}>
                    <option value="">All Price Ranges</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                </select>
            </div>
        </div>
    );
};

export default Categorization;
