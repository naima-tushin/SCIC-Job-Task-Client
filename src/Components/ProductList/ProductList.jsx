import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brandNames, setBrandNames] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [sortOption, setSortOption] = useState(''); // New state for sorting

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://scic-job-task-server-fkp1opp6h-naima-tushins-projects.vercel.app/api/products?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Extract unique brands and categories from the products
        const uniqueBrands = [...new Set(data.products.map(product => product.brand))];
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];

        setBrandNames(uniqueBrands);
        setCategoryNames(uniqueCategories);
        setProducts(data.products);
        setFilteredProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    // Filter products based on search query, price range, brand, and category
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;

      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBrand && matchesCategory ;
    });

    // Sort products based on selected option
    if (sortOption === 'priceAsc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'dateDesc') {
      filtered = filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, minPrice, maxPrice, selectedCategory, selectedBrand, sortOption, products]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className='pt-5 pb-10 w-[90%] mx-auto'>
      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-7 gap-4 lg:flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by product name..."
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Minimum Price Input */}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price"
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Maximum Price Input */}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categoryNames.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Brand Filter Dropdown */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">All Brands</option>
          {brandNames.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Sorting Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="dateDesc">Date Added: Newest First</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className={`px-4 py-2 bg-[#808080] text-white rounded-lg ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`px-4 py-2 bg-[#808080] text-white rounded-lg ${page === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
