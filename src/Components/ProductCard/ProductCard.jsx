import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div key={product._id} className="border p-6 bg-white rounded-lg shadow-md">
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
        className="w-full h-52 object-cover"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <p className="text-gray-600">Brand: {product.brand}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-600 font-semibold">${product.price}</span>
        <span className="text-yellow-500">⭐ {product.ratings}</span>
      </div>
      <div className="text-gray-500 text-sm">
        {new Date(product.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ProductCard;
