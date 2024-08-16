// frontend/src/Components/ProductCard/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="border p-4 bg-white rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-semibold">${product.price}</span>
                <span className="text-yellow-500">⭐ {product.ratings}</span>
            </div>
        </div>
    );
};

export default ProductCard;
