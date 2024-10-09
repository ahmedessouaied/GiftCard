import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();

  const dummyProduct = {
    id: id,
    name: `Gift Card ${id}`,
    price: 25,
    image: '/api/placeholder/400/400',
    description: `This is the description for Gift Card ${id}`
  };

  const { name, price, image, description } = dummyProduct;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            
            {/* Product Description */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">{name}</h1>
              <p className="text-gray-600 mb-4">{description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-6">${price}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;