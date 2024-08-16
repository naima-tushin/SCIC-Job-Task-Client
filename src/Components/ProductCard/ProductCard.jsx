import React from 'react';

const ProductCard = () => {
    const product = {
        image: 'https://via.placeholder.com/150',  // Replace with actual image URL
        name: 'Sample Product',
        description: 'This is a sample product description.',
        price: 29.99,
        ratings: 4.5,
        createdAt: '2024-08-17T10:30:00', // Sample creation date
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
            <div className="text-gray-500 text-sm">
                {new Date(product.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default ProductCard;
