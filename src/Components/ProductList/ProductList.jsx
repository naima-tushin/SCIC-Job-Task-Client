import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For storing search, price, brand, and category filtered results
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // To store search input
  const [minPrice, setMinPrice] = useState(''); // To store minimum price filter
  const [maxPrice, setMaxPrice] = useState(''); // To store maximum price filter
  const [selectedBrand, setSelectedBrand] = useState(''); // To store selected brand
  const [selectedCategory, setSelectedCategory] = useState(''); // To store selected category
  const [brandNames, setBrandNames] = useState([]); // To store brand names
  const [categoryNames, setCategoryNames] = useState([]); // To store category names

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?page=${page}&limit=10`);
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
        setFilteredProducts(data.products); // Set filtered products initially to all products
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
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBrand && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchQuery, minPrice, maxPrice, selectedBrand, selectedCategory, products]);

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
    <div>
      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search Input */}
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
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} /> // Use ProductCard here
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
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${page === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
