import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
// import Pagination from '../Pagination/Pagination';
import Sorting from '../Sorting/Sorting';
import Categorization from '../Categorization/Categorization';
import Searching from '../Searching/Searching';

const ProductList = () => {
    const [allProducts, setAllProducts] = useState([]); // All products fetched
    const [filteredProducts, setFilteredProducts] = useState([]); // Products to display
    const [currentPage, setCurrentPage] = useState(0); // Manage current page
    const [totalPages, setTotalPages] = useState(2); // Manage total pages
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [selectedFilters, setSelectedFilters] = useState({ brand: '', category: '', priceRange: '' }); // Selected filters
    const [sortOption, setSortOption] = useState(''); // Sort option

    const limit = 10; // Products per page

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products`, {
                params: {
                    page: currentPage, 
                    
                },
            });

            const allFetchedProducts = response.data.products || [];
            setAllProducts(allFetchedProducts);
            console.log(allFetchedProducts);
            setTotalPages(response.data.totalPages || 1); 
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    // Apply filters, search, and sorting to the fetched products
    const applyFiltersAndSorting = () => {
        let tempProducts = [...allProducts];

        // Search filter
        if (searchTerm) {
            tempProducts = tempProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Brand filter
        if (selectedFilters.brand) {
            tempProducts = tempProducts.filter(
                (product) => product.brand === selectedFilters.brand
            );
        }

        // Category filter
        if (selectedFilters.category) {
            tempProducts = tempProducts.filter(
                (product) => product.category === selectedFilters.category
            );
        }

        // Price range filter
        if (selectedFilters.priceRange) {
            const [minPrice, maxPrice] = selectedFilters.priceRange.split('-').map(Number);
            tempProducts = tempProducts.filter(
                (product) => product.price >= minPrice && product.price <= maxPrice
            );
        }

        // Sorting
        if (sortOption === 'priceAsc') {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceDesc') {
            tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        }

        // Pagination logic
        // const startIndex = (currentPage - 1) * limit;
        // const endIndex = startIndex + limit;
        // setFilteredProducts(tempProducts.slice(startIndex, endIndex));
    };

    // Fetch products when component mounts or page changes
    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    // Apply filters and sorting when any of these change: search, filters, sorting, or allProducts
    useEffect(() => {
        applyFiltersAndSorting();
    }, [searchTerm, selectedFilters, sortOption, allProducts, currentPage]);

    return (
        <div className="container mx-auto p-4">
            {/* Search bar component */}
            <Searching setSearchTerm={setSearchTerm} />

            {/* Filter by category, brand, price, etc. */}
            <Categorization selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />

            {/* Sorting component */}
            <Sorting setSortOption={setSortOption} />
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products found</p> // Message when no products are available
                )}
            </div>
            
            {/* Pagination component */}
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} /> */}
        </div>
    );
};

export default ProductList;
